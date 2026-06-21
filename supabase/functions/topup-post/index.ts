import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DIGI_USERNAME = Deno.env.get("DIGIFLAZZ_USERNAME")!;
const DIGI_API_KEY  = Deno.env.get("DIGIFLAZZ_API_KEY")!;
const DIGI_API_URL  = "https://api.digiflazz.com/v1/transaction";
const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY  = Deno.env.get("SB_SERVICE_ROLE_KEY")!;

// Lebih eksplisit — set env variable DIGIFLAZZ_ENV=development atau production
const IS_DEV = Deno.env.get("DIGIFLAZZ_ENV") === "development";

const cors = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function md5(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const auth = req.headers.get("Authorization");
    if (!auth) throw new Error("Unauthorized");

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { user }, error } = await supabase.auth.getUser(auth.replace("Bearer ", ""));
    if (error || !user) throw new Error("Unauthorized");

    const { sku, target, serverId } = await req.json();
    if (!sku || !target) throw new Error("SKU dan target wajib diisi");

    const [{ data: profile }, { data: product }] = await Promise.all([
      supabase.from("profiles").select("balance").eq("id", user.id).single(),
      supabase.from("topup_products").select("*").eq("sku", sku).eq("is_active", true).single(),
    ]);

    if (!product) throw new Error("Produk tidak ditemukan");
    const balanceBefore = profile?.balance || 0;
    if (balanceBefore < product.price) {
      throw new Error(`Saldo tidak cukup. Butuh Rp ${product.price.toLocaleString("id-ID")}`);
    }

    const refId      = `OKG-${Date.now()}-${user.id.slice(0,6)}`;
    const sign       = await md5(DIGI_USERNAME + DIGI_API_KEY + refId);
    const customerNo = serverId ? `${target}${serverId}` : target;

    // ✅ Kirim ke Digiflazz DULU sebelum potong saldo
    const res = await fetch(DIGI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: DIGI_USERNAME,
        buyer_sku_code: sku,
        customer_no: customerNo,
        ref_id: refId,
        sign,
        testing: IS_DEV,
      }),
    });

    // Log raw response untuk debug
    const rawBody = await res.text();
    console.log("Digiflazz raw response:", rawBody);
    const d = JSON.parse(rawBody).data;

    if (!d) throw new Error("Response Digiflazz tidak valid");

    const status = d.status === "Sukses" ? "success"
      : d.status === "Gagal" ? "failed" : "pending";

    // ✅ Kalau langsung gagal, jangan potong saldo sama sekali
    if (status === "failed") {
      throw new Error(d.message || "Top up gagal dari provider");
    }

    // ✅ Baru potong saldo kalau sukses atau pending
    await Promise.all([
      supabase.from("topup_game_transactions").insert({
        id: refId, user_id: user.id, sku,
        product_name: product.name, game_id: product.game_id,
        target, server_id: serverId || null,
        price: product.price, status,
        digiflazz_ref: d.sn || null,
        message: d.message || null,
      }),
      supabase.from("profiles")
        .update({ balance: balanceBefore - product.price })
        .eq("id", user.id),
      supabase.from("wallet_logs").insert({
        user_id: user.id, action: "spend",
        amount: product.price,
        balance_before: balanceBefore,
        balance_after: balanceBefore - product.price,
        note: `Top Up ${product.name} → ${customerNo}`,
      }),
    ]);

    await supabase.from("notifications").insert({
      user_id: user.id,
      type:    status === "success" ? "topup_game_success" : "topup_game_pending",
      title:   status === "success" ? "Top Up Berhasil! ✅" : "Top Up Diproses ⏳",
      message: status === "success"
        ? `${product.name} berhasil masuk ke ${customerNo}`
        : `${product.name} sedang diproses, tunggu beberapa menit.`,
    });

    return new Response(
      JSON.stringify({ success: true, status, ref_id: refId, message: d.message }),
      { headers: { ...cors, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Edge function error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});