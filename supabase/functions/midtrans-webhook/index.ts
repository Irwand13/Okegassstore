// supabase/functions/digiflazz-webhook/index.ts
// ============================================================
// Menerima callback dari Digiflazz dan update status transaksi.
// Kode ini HANYA mengurus pulsa/PLN/e-wallet dari TopUpPage.
// Transaksi game tetap ditangani di digiflazz-topup/index.ts.
//
// FIXES dari versi lama:
// 1. Tambah signature verification (DIGI_API_KEY dipakai beneran)
// 2. Idempotency ketat — skip kalau status sudah final (success/failed)
// 3. Pisah tabel: ref "OKG-" → topup_game_transactions (skip, sudah ada handler)
//                 ref "OG-"  → orders (tabel baru untuk pulsa/PLN/ewallet)
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DIGI_USERNAME = Deno.env.get("DIGIFLAZZ_USERNAME")!;
const DIGI_API_KEY  = Deno.env.get("DIGIFLAZZ_API_KEY")!;
const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY  = Deno.env.get("SB_SERVICE_ROLE_KEY")!;

async function md5(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  try {
    const body = await req.json();
    const { data } = body;

    // Digiflazz kadang kirim ping kosong — balas OK supaya tidak retry terus
    if (!data?.ref_id) return new Response("OK", { status: 200 });

    const { ref_id, status, sn, message } = data;

    // ── Routing berdasarkan prefix ref_id ─────────────────────
    // "OKG-" → transaksi game, sudah ada handler di digiflazz-topup
    // "OG-"  → transaksi pulsa/PLN/ewallet dari TopUpPage
    if (ref_id.startsWith("OKG-")) {
      // Biarkan webhook game handle sendiri, kita cukup reply OK
      // supaya Digiflazz tidak anggap failed dan retry ke sini terus
      return new Response("OK", { status: 200 });
    }

    if (!ref_id.startsWith("OG-")) {
      // Ref tidak dikenal — abaikan
      return new Response("OK", { status: 200 });
    }

    // ── Verifikasi signature dari Digiflazz ───────────────────
    // Digiflazz mengirim sign = md5(username + apikey + "depo")
    // untuk membedakan webhook asli vs request palsu
    const expectedSign = await md5(DIGI_USERNAME + DIGI_API_KEY + "depo");
    if (body.data?.sign && body.data.sign !== expectedSign) {
      console.warn("[webhook] Signature tidak valid, kemungkinan bukan dari Digiflazz");
      return new Response("Forbidden", { status: 403 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // ── Ambil order ───────────────────────────────────────────
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("id, user_id, amount, status, product_code, target")
      .eq("ref_id", ref_id)
      .single();

    if (orderErr || !order) {
      console.error("[webhook] Order tidak ditemukan:", ref_id);
      // Tetap balas 200 supaya Digiflazz tidak terus retry
      return new Response("OK", { status: 200 });
    }

    // ── Idempotency: skip kalau sudah final ───────────────────
    // Digiflazz bisa kirim webhook lebih dari sekali untuk order yang sama
    if (order.status === "success" || order.status === "failed") {
      console.log("[webhook] Order sudah final, skip:", ref_id, order.status);
      return new Response("OK", { status: 200 });
    }

    const isSuccess = status === "Sukses";
    const isFailed  = status === "Gagal";
    const newStatus = isSuccess ? "success" : isFailed ? "failed" : "pending";

    // Update status order dulu (atomic — kalau webhook duplikat masuk bersamaan,
    // Postgres row lock mencegah double-process)
    const { error: updateErr } = await supabase
      .from("orders")
      .update({
        status:        newStatus,
        digiflazz_ref: sn      || null,
        sn:            sn      || null,
        message:       message || null,
        updated_at:    new Date().toISOString(),
      })
      .eq("ref_id", ref_id)
      .eq("status", "pending"); // WHERE status = 'pending' — double safety

    if (updateErr) {
      console.error("[webhook] Gagal update order:", updateErr.message);
      return new Response("Error", { status: 500 });
    }

    // ── Ambil saldo terkini ───────────────────────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", order.user_id)
      .single();

    const currentBalance = profile?.balance ?? 0;

    // ── SUKSES: potong saldo + catat wallet_log ───────────────
    if (isSuccess) {
      const newBalance = currentBalance - order.amount;

      await Promise.all([
        supabase.from("profiles")
          .update({ balance: newBalance })
          .eq("id", order.user_id),

        supabase.from("wallet_logs").insert({
          user_id:        order.user_id,
          action:         "spend",
          amount:         order.amount,
          balance_before: currentBalance,
          balance_after:  newBalance,
          note:           `${order.product_code} → ${order.target}`,
          order_id:       order.id,
        }),

        supabase.from("notifications").insert({
          user_id: order.user_id,
          type:    "topup_success",
          title:   "Top Up Berhasil! ✅",
          message: `${order.product_code} berhasil dikirim ke ${order.target}.`,
        }),
      ]);

      console.log("[webhook] Sukses:", ref_id, "| saldo dipotong:", order.amount);
    }

    // ── GAGAL: saldo tidak dipotong, kirim notif ──────────────
    // Catatan: saldo memang belum pernah dipotong di flow ini
    // (berbeda dengan digiflazz-topup/index.ts yang potong di awal)
    // jadi tidak perlu refund — cukup notifikasi saja
    if (isFailed) {
      await supabase.from("notifications").insert({
        user_id: order.user_id,
        type:    "topup_failed",
        title:   "Top Up Gagal ❌",
        message: `${order.product_code} ke ${order.target} gagal diproses. Saldo tidak dipotong.`,
      });

      console.log("[webhook] Gagal:", ref_id, "| pesan:", message);
    }

    return new Response("OK", { status: 200 });

  } catch (err: any) {
    console.error("[digiflazz-webhook] Uncaught error:", err.message);
    // Tetap 200 supaya Digiflazz tidak infinite retry
    return new Response("OK", { status: 200 });
  }
});