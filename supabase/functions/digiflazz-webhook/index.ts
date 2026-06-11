import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DIGI_API_KEY = Deno.env.get("DIGIFLAZZ_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function md5(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

serve(async (req) => {
  try {
    const body = await req.json();
    const { data } = body;
    if (!data) return new Response("OK", { status: 200 });

    const { ref_id, status, sn, message, buyer_sku_code } = data;
    if (!ref_id?.startsWith("OKG-")) return new Response("OK", { status: 200 });

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data: txn } = await supabase
      .from("topup_game_transactions")
      .select("*")
      .eq("id", ref_id)
      .single();

    if (!txn) return new Response("Not found", { status: 200 });

    const isSuccess = status === "Sukses";
    const isFailed  = status === "Gagal";
    const newStatus = isSuccess ? "success" : isFailed ? "failed" : "pending";

    await supabase.from("topup_game_transactions")
      .update({ status: newStatus, digiflazz_ref: sn || null, message: message || null })
      .eq("id", ref_id);

    if (isFailed && txn.status !== "failed") {
      // Refund saldo
      const { data: profile } = await supabase
        .from("profiles").select("balance").eq("id", txn.user_id).single();
      const bal = profile?.balance || 0;

      await Promise.all([
        supabase.from("profiles").update({ balance: bal + txn.price }).eq("id", txn.user_id),
        supabase.from("wallet_logs").insert({
          user_id: txn.user_id, action: "refund",
          amount: txn.price,
          balance_before: bal,
          balance_after: bal + txn.price,
          note: `Refund otomatis: ${txn.product_name}`,
        }),
        supabase.from("notifications").insert({
          user_id: txn.user_id, type: "topup_game_failed",
          title: "Top Up Gagal ❌",
          message: `${txn.product_name} gagal diproses. Saldo dikembalikan.`,
        }),
      ]);
    }

    if (isSuccess && txn.status !== "success") {
      await supabase.from("notifications").insert({
        user_id: txn.user_id, type: "topup_game_success",
        title: "Top Up Berhasil! ✅",
        message: `${txn.product_name} berhasil masuk ke akun ${txn.target}`,
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
});