// supabase/functions/digiflazz-topup/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DIGI_USERNAME = Deno.env.get("DIGIFLAZZ_USERNAME")!;
const DIGI_API_KEY  = Deno.env.get("DIGIFLAZZ_API_KEY")!;
const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY  = Deno.env.get("SB_SERVICE_ROLE_KEY")!;
const PROXY_URL     = Deno.env.get("CLOUDFLARE_PROXY_URL")!;
const PROXY_SECRET  = Deno.env.get("PROXY_SECRET")!;

const cors = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

// Pure-JS MD5 — RFC 1321 compliant, no crypto.subtle needed
function md5(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const len = bytes.length;
  const padLen = (len % 64 < 56) ? (56 - len % 64) : (120 - len % 64);
  const padded = new Uint8Array(len + padLen + 8);
  padded.set(bytes);
  padded[len] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(len + padLen, (len * 8) >>> 0, true);
  view.setUint32(len + padLen + 4, Math.floor(len * 8 / 0x100000000), true);

  const T = [
    0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,
    0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,
    0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,
    0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,
    0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,
    0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,
    0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,
    0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391,
  ];
  const S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];

  function add(x: number, y: number) { return (x + y) | 0; }
  function rol(n: number, s: number) { return (n << s) | (n >>> (32 - s)); }

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  for (let off = 0; off < padded.length; off += 64) {
    const M: number[] = [];
    for (let i = 0; i < 16; i++) M[i] = view.getUint32(off + i * 4, true);
    const [aa, bb, cc, dd] = [a, b, c, d];
    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if      (i < 16) { F = (b & c) | (~b & d); g = i; }
      else if (i < 32) { F = (d & b) | (~d & c); g = (5*i+1)%16; }
      else if (i < 48) { F = b ^ c ^ d;           g = (3*i+5)%16; }
      else             { F = c ^ (b | ~d);         g = (7*i)%16; }
      F = add(add(add(F, a), M[g]), T[i]);
      a = d; d = c; c = b; b = add(b, rol(F, S[i]));
    }
    a = add(a,aa); b = add(b,bb); c = add(c,cc); d = add(d,dd);
  }

  const out = new DataView(new ArrayBuffer(16));
  out.setUint32(0, a>>>0, true); out.setUint32(4, b>>>0, true);
  out.setUint32(8, c>>>0, true); out.setUint32(12, d>>>0, true);
  return Array.from(new Uint8Array(out.buffer)).map(b => b.toString(16).padStart(2,"0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    // ── Auth ──────────────────────────────────────────────────
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: cors });

    const { data: { user }, error: authErr } = await supabase.auth.getUser(auth.replace("Bearer ", ""));
    if (authErr || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: cors });

    // ── Input ─────────────────────────────────────────────────
    const { sku, target, serverId } = await req.json();
    if (!sku || !target) throw new Error("SKU dan target wajib diisi");

    // ── Cek produk & saldo ────────────────────────────────────
    const [{ data: profile, error: profErr }, { data: product, error: prodErr }] = await Promise.all([
      supabase.from("profiles").select("balance").eq("id", user.id).single(),
      supabase.from("topup_products").select("*").eq("sku", sku).eq("is_active", true).single(),
    ]);

    if (profErr || !profile) throw new Error("Profil pengguna tidak ditemukan");
    if (prodErr || !product) throw new Error("Produk tidak ditemukan atau tidak aktif");
    if (profile.balance < product.price) {
      throw new Error(`Saldo tidak cukup. Kamu punya Rp ${profile.balance.toLocaleString("id-ID")}, butuh Rp ${product.price.toLocaleString("id-ID")}`);
    }

    const balanceBefore = profile.balance;
    const refId         = `OKG-${Date.now()}-${user.id.slice(0, 6)}`;
    const sign          = md5(DIGI_USERNAME + DIGI_API_KEY + refId);
    const customerNo    = serverId ? `${target}${serverId}` : target;

    // ── STEP 1: Buat transaksi ────────────────────────────────
    const { error: txErr } = await supabase.from("topup_game_transactions").insert({
      id: refId, user_id: user.id, sku,
      product_name: product.name, game_id: product.game_id,
      target, server_id: serverId || null, price: product.price, status: "pending",
    });
    if (txErr) throw new Error("Gagal membuat transaksi: " + txErr.message);

    // ── STEP 2: Potong saldo ──────────────────────────────────
    const { data: deductResult, error: balErr } = await supabase
      .from("profiles").update({ balance: balanceBefore - product.price })
      .eq("id", user.id).eq("balance", balanceBefore).select("id");

    if (balErr || !deductResult || deductResult.length === 0) {
      await supabase.from("topup_game_transactions").delete().eq("id", refId);
      throw new Error("Saldo berubah saat transaksi diproses, silakan coba lagi.");
    }

    // ── STEP 3: Log wallet ────────────────────────────────────
    await supabase.from("wallet_logs").insert({
      user_id: user.id, action: "spend", amount: product.price,
      balance_before: balanceBefore, balance_after: balanceBefore - product.price,
      note: `Top Up ${product.name} → ${customerNo}`, ref_id: refId,
    });

    // ── STEP 4: Kirim ke Digiflazz VIA PROXY ─────────────────
    let d: any = null;
    let digiError: string | null = null;

    try {
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), 15_000);
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Proxy-Secret": PROXY_SECRET },
        signal: controller.signal,
        body: JSON.stringify({ username: DIGI_USERNAME, buyer_sku_code: sku, customer_no: customerNo, ref_id: refId, sign }),
      });
      clearTimeout(timeout);
      const json = await res.json();
      d = json?.data;
      if (!d) digiError = json?.message || "Response kosong dari Digiflazz";
    } catch (fetchErr: any) {
      digiError = fetchErr.name === "AbortError" ? "Timeout" : fetchErr.message;
    }

    // ── STEP 5: Status final ──────────────────────────────────
    let finalStatus: "success" | "failed" | "pending" =
      digiError ? "pending" : d?.status === "Sukses" ? "success" : d?.status === "Gagal" ? "failed" : "pending";

    await supabase.from("topup_game_transactions")
      .update({ status: finalStatus, digiflazz_ref: d?.sn || null, message: d?.message || digiError || null, rc: d?.rc || null })
      .eq("id", refId);

    // ── STEP 6: Refund jika gagal ─────────────────────────────
    if (finalStatus === "failed") {
      await Promise.all([
        supabase.from("profiles").update({ balance: balanceBefore }).eq("id", user.id),
        supabase.from("wallet_logs").insert({ user_id: user.id, action: "refund", amount: product.price, balance_before: balanceBefore - product.price, balance_after: balanceBefore, note: `Refund Top Up ${product.name} (gagal)`, ref_id: refId }),
        supabase.from("notifications").insert({ user_id: user.id, type: "topup_game_failed", title: "Top Up Gagal ❌", message: `${product.name} gagal diproses. Saldo Rp ${product.price.toLocaleString("id-ID")} dikembalikan.` }),
      ]);
    }

    // ── STEP 7: Notif sukses ──────────────────────────────────
    if (finalStatus === "success") {
      await supabase.from("notifications").insert({ user_id: user.id, type: "topup_game_success", title: "Top Up Berhasil! ✅", message: `${product.name} berhasil masuk ke akun ${customerNo}` });
    }

    // ── STEP 8: Notif pending ─────────────────────────────────
    if (finalStatus === "pending") {
      await supabase.from("notifications").insert({ user_id: user.id, type: "topup_game_pending", title: "Top Up Sedang Diproses ⏳", message: `${product.name} sedang diproses Digiflazz. Cek status dalam beberapa menit.` });
    }

    return new Response(
      JSON.stringify({ success: finalStatus !== "failed", status: finalStatus, ref_id: refId, message: d?.message || (finalStatus === "pending" ? "Transaksi sedang diproses." : null) }),
      { headers: cors }
    );

  } catch (err: any) {
    console.error("[digiflazz-topup] Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: cors });
  }
});