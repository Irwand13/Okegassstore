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

// ── Pure-JS MD5 (tidak pakai Web Crypto sama sekali) ──────────
// Kompatibel dengan semua runtime termasuk Deno Edge
function md5(input: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function toUtf8Bytes(str: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 128) { bytes.push(c); }
      else if (c < 2048) { bytes.push((c >> 6) | 192); bytes.push((c & 63) | 128); }
      else { bytes.push((c >> 12) | 224); bytes.push(((c >> 6) & 63) | 128); bytes.push((c & 63) | 128); }
    }
    return bytes;
  }
  function wordsToMd5(m: number[], l: number): number[] {
    m[l >> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < m.length; i += 16) {
      const [oa, ob, oc, od] = [a, b, c, d];
      a = md5ff(a,b,c,d,m[i+0],7,-680876936);   b = md5ff(d,a,b,c,m[i+1],12,-389564586);
      c = md5ff(c,d,a,b,m[i+2],17,606105819);    d = md5ff(b,c,d,a,m[i+3],22,-1044525330);
      a = md5ff(a,b,c,d,m[i+4],7,-176418897);    b = md5ff(d,a,b,c,m[i+5],12,1200080426);
      c = md5ff(c,d,a,b,m[i+6],17,-1473231341);  d = md5ff(b,c,d,a,m[i+7],22,-45705983);
      a = md5ff(a,b,c,d,m[i+8],7,1770035416);    b = md5ff(d,a,b,c,m[i+9],12,-1958414417);
      c = md5ff(c,d,a,b,m[i+10],17,-42063);       d = md5ff(b,c,d,a,m[i+11],22,-1990404162);
      a = md5ff(a,b,c,d,m[i+12],7,1804603682);   b = md5ff(d,a,b,c,m[i+13],12,-40341101);
      c = md5ff(c,d,a,b,m[i+14],17,-1502002290); d = md5ff(b,c,d,a,m[i+15],22,1236535329);
      a = md5gg(a,b,c,d,m[i+1],5,-165796510);    b = md5gg(d,a,b,c,m[i+6],9,-1069501632);
      c = md5gg(c,d,a,b,m[i+11],14,643717713);   d = md5gg(b,c,d,a,m[i+0],20,-373897302);
      a = md5gg(a,b,c,d,m[i+5],5,-701558691);    b = md5gg(d,a,b,c,m[i+10],9,38016083);
      c = md5gg(c,d,a,b,m[i+15],14,-660478335);  d = md5gg(b,c,d,a,m[i+4],20,-405537848);
      a = md5gg(a,b,c,d,m[i+9],5,568446438);     b = md5gg(d,a,b,c,m[i+14],9,-1019803690);
      c = md5gg(c,d,a,b,m[i+3],14,-187363961);   d = md5gg(b,c,d,a,m[i+8],20,1163531501);
      a = md5gg(a,b,c,d,m[i+13],5,-1444681467);  b = md5gg(d,a,b,c,m[i+2],9,-51403784);
      c = md5gg(c,d,a,b,m[i+7],14,1735328473);   d = md5gg(b,c,d,a,m[i+12],20,-1926607734);
      a = md5hh(a,b,c,d,m[i+5],4,-378558);       b = md5hh(d,a,b,c,m[i+8],11,-2022574463);
      c = md5hh(c,d,a,b,m[i+11],16,1839030562);  d = md5hh(b,c,d,a,m[i+14],23,-35309556);
      a = md5hh(a,b,c,d,m[i+1],4,-1530992060);   b = md5hh(d,a,b,c,m[i+4],11,1272893353);
      c = md5hh(c,d,a,b,m[i+7],16,-155497632);   d = md5hh(b,c,d,a,m[i+10],23,-1094730640);
      a = md5hh(a,b,c,d,m[i+13],4,681279174);    b = md5hh(d,a,b,c,m[i+0],11,-358537222);
      c = md5hh(c,d,a,b,m[i+3],16,-722521979);   d = md5hh(b,c,d,a,m[i+6],23,76029189);
      a = md5hh(a,b,c,d,m[i+9],4,-640364487);    b = md5hh(d,a,b,c,m[i+12],11,-421815835);
      c = md5hh(c,d,a,b,m[i+15],16,530742520);   d = md5hh(b,c,d,a,m[i+2],23,-995338651);
      a = md5ii(a,b,c,d,m[i+0],6,-198630844);    b = md5ii(d,a,b,c,m[i+7],10,1126891415);
      c = md5ii(c,d,a,b,m[i+14],15,-1416354905); d = md5ii(b,c,d,a,m[i+5],21,-57434055);
      a = md5ii(a,b,c,d,m[i+12],6,1700485571);   b = md5ii(d,a,b,c,m[i+3],10,-1894986606);
      c = md5ii(c,d,a,b,m[i+10],15,-1051523);    d = md5ii(b,c,d,a,m[i+1],21,-2054922799);
      a = md5ii(a,b,c,d,m[i+8],6,1873313359);    b = md5ii(d,a,b,c,m[i+15],10,-30611744);
      c = md5ii(c,d,a,b,m[i+6],15,-1560198380);  d = md5ii(b,c,d,a,m[i+13],21,1309151649);
      a = md5ii(a,b,c,d,m[i+4],6,-145523070);    b = md5ii(d,a,b,c,m[i+11],10,-1120210379);
      c = md5ii(c,d,a,b,m[i+2],15,718787259);    d = md5ii(b,c,d,a,m[i+9],21,-343485551);
      a = safeAdd(a,oa); b = safeAdd(b,ob); c = safeAdd(c,oc); d = safeAdd(d,od);
    }
    return [a, b, c, d];
  }
  const bytes = toUtf8Bytes(input);
  const words: number[] = [];
  for (let i = 0; i < bytes.length * 8; i += 8) {
    words[i >> 5] |= (bytes[i / 8] & 0xff) << (i % 32);
  }
  const hash = wordsToMd5(words, bytes.length * 8);
  return hash.map(h => {
    const hex = (h >>> 0).toString(16).padStart(8, "0");
    return hex.match(/../g)!.map(b => b[1] + b[0]).join("");
  }).join("").toLowerCase();
}
// ─────────────────────────────────────────────────────────────

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

    // ── Cek produk & saldo (PARALLEL, read-only) ──────────────
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

    const customerNo = serverId ? `${target}(${serverId})` : target;

    // ── STEP 1: Buat transaksi (status: pending) ──────────────
    const { error: txErr } = await supabase.from("topup_game_transactions").insert({
      id:           refId,
      user_id:      user.id,
      sku,
      product_name: product.name,
      game_id:      product.game_id,
      target,
      server_id:    serverId || null,
      price:        product.price,
      status:       "pending",
    });
    if (txErr) throw new Error("Gagal membuat transaksi: " + txErr.message);

    // ── STEP 2: Potong saldo ──────────────────────────────────
    const { error: balErr } = await supabase
      .from("profiles")
      .update({ balance: balanceBefore - product.price })
      .eq("id", user.id);

    if (balErr) {
      await supabase.from("topup_game_transactions").delete().eq("id", refId);
      throw new Error("Gagal memotong saldo: " + balErr.message);
    }

    // ── STEP 3: Log wallet ────────────────────────────────────
    await supabase.from("wallet_logs").insert({
      user_id:        user.id,
      action:         "spend",
      amount:         product.price,
      balance_before: balanceBefore,
      balance_after:  balanceBefore - product.price,
      note:           `Top Up ${product.name} → ${customerNo}`,
      ref_id:         refId,
    });

    // ── STEP 4: Kirim ke Digiflazz VIA CLOUDFLARE PROXY ──────
    let d: any = null;
    let digiError: string | null = null;

    try {
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), 15_000);

      const res = await fetch(PROXY_URL, {
        method:  "POST",
        headers: {
          "Content-Type":   "application/json",
          "X-Proxy-Secret": PROXY_SECRET,
        },
        signal: controller.signal,
        body: JSON.stringify({
          username:       DIGI_USERNAME,
          buyer_sku_code: sku,
          customer_no:    customerNo,
          ref_id:         refId,
          sign,
        }),
      });
      clearTimeout(timeout);

      const json = await res.json();
      d = json?.data;
      if (!d) digiError = json?.message || "Response kosong dari Digiflazz";

    } catch (fetchErr: any) {
      digiError = fetchErr.name === "AbortError" ? "timeout" : fetchErr.message;
    }

    // ── STEP 5: Proses response ───────────────────────────────
    const digiStatus  = d?.status;
    const finalStatus =
      digiStatus === "Sukses" ? "success" :
      digiStatus === "Gagal"  ? "failed"  :
      digiError === "timeout" ? "pending" :
      d === null              ? "pending" :
      "pending";

    await supabase.from("topup_game_transactions")
      .update({
        status:        finalStatus,
        digiflazz_ref: d?.sn      || null,
        message:       d?.message || digiError || null,
      })
      .eq("id", refId);

    // ── STEP 6: Refund jika gagal ─────────────────────────────
    if (finalStatus === "failed") {
      await Promise.all([
        supabase.from("profiles").update({ balance: balanceBefore }).eq("id", user.id),
        supabase.from("wallet_logs").insert({
          user_id:        user.id,
          action:         "refund",
          amount:         product.price,
          balance_before: balanceBefore - product.price,
          balance_after:  balanceBefore,
          note:           `Refund Top Up ${product.name} (gagal)`,
          ref_id:         refId,
        }),
        supabase.from("notifications").insert({
          user_id: user.id,
          type:    "topup_game_failed",
          title:   "Top Up Gagal ❌",
          message: `${product.name} gagal diproses. Saldo Rp ${product.price.toLocaleString("id-ID")} dikembalikan.`,
        }),
      ]);
    }

    // ── STEP 7: Notif sukses ──────────────────────────────────
    if (finalStatus === "success") {
      await supabase.from("notifications").insert({
        user_id: user.id,
        type:    "topup_game_success",
        title:   "Top Up Berhasil! ✅",
        message: `${product.name} berhasil masuk ke akun ${customerNo}`,
      });
    }

    return new Response(
      JSON.stringify({
        success: finalStatus !== "failed",
        status:  finalStatus,
        ref_id:  refId,
        message: d?.message || (finalStatus === "pending" ? "Transaksi sedang diproses, cek status beberapa saat lagi." : null),
      }),
      { headers: cors }
    );

  } catch (err: any) {
    console.error("[digiflazz-topup] Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: cors });
  }
});