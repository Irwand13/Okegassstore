// supabase/functions/topup-post/index.ts
//
// Tanggung jawab:
//   Menerima response Digiflazz yang sudah didapat browser,
//   lalu update status transaksi + refund jika gagal.
//
// Browser memanggil ini setelah dapat response dari Digiflazz.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SB_SERVICE_ROLE_KEY")!;

const cors = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    // ── Auth ──────────────────────────────────────────────────
    const auth = req.headers.get("Authorization");
    if (!auth) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: cors });
    }
    const { data: { user }, error: authErr } = await supabase.auth.getUser(
      auth.replace("Bearer ", "")
    );
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: cors });
    }

    // ── Input: response Digiflazz dari browser ────────────────
    const { ref_id, digiflazz_response } = await req.json();
    if (!ref_id) {
      return new Response(
        JSON.stringify({ error: "ref_id wajib diisi" }),
        { status: 400, headers: cors }
      );
    }

    // ── Ambil transaksi ───────────────────────────────────────
    const { data: txn, error: txErr } = await supabase
      .from("topup_game_transactions")
      .select("*")
      .eq("id", ref_id)
      .eq("user_id", user.id) // pastikan milik user ini
      .single();

    if (txErr || !txn) {
      return new Response(
        JSON.stringify({ error: "Transaksi tidak ditemukan" }),
        { status: 404, headers: cors }
      );
    }

    // Guard: jangan proses ulang transaksi yang sudah final
    if (txn.status === "success" || txn.status === "failed") {
      return new Response(
        JSON.stringify({ success: txn.status === "success", status: txn.status }),
        { headers: cors }
      );
    }

    // ── Tentukan status dari response Digiflazz ───────────────
    const digiData   = digiflazz_response?.data ?? null;
    const digiStatus = digiData?.status ?? null;

    // Kalau browser tidak bisa reach Digiflazz (network error),
    // biarkan status tetap "pending" — webhook akan update nanti.
    const finalStatus =
      digiStatus === "Sukses" ? "success" :
      digiStatus === "Gagal"  ? "failed"  :
      "pending";

    // ── Update status transaksi ───────────────────────────────
    await supabase
      .from("topup_game_transactions")
      .update({
        status:        finalStatus,
        digiflazz_ref: digiData?.sn      ?? null,
        message:       digiData?.message ?? null,
      })
      .eq("id", ref_id);

    // ── Refund jika gagal ─────────────────────────────────────
    if (finalStatus === "failed") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", user.id)
        .single();

      const currentBalance = profile?.balance ?? 0;

      await Promise.all([
        supabase
          .from("profiles")
          .update({ balance: currentBalance + txn.price })
          .eq("id", user.id),

        supabase.from("wallet_logs").insert({
          user_id:        user.id,
          action:         "refund",
          amount:         txn.price,
          balance_before: currentBalance,
          balance_after:  currentBalance + txn.price,
          note:           `Refund Top Up ${txn.product_name} (gagal)`,
        }),

        supabase.from("notifications").insert({
          user_id: user.id,
          type:    "topup_game_failed",
          title:   "Top Up Gagal ❌",
          message: `${txn.product_name} gagal diproses. Saldo Rp ${txn.price.toLocaleString("id-ID")} dikembalikan.`,
        }),
      ]);
    }

    // ── Notif sukses ──────────────────────────────────────────
    if (finalStatus === "success") {
      await supabase.from("notifications").insert({
        user_id: user.id,
        type:    "topup_game_success",
        title:   "Top Up Berhasil! ✅",
        message: `${txn.product_name} berhasil masuk ke akun ${txn.target}`,
      });
    }

    return new Response(
      JSON.stringify({
        success: finalStatus !== "failed",
        status:  finalStatus,
        ref_id,
        message: digiData?.message ?? (
          finalStatus === "pending"
            ? "Transaksi sedang diproses, cek status beberapa saat lagi."
            : null
        ),
      }),
      { headers: cors }
    );
  } catch (err: any) {
    console.error("[topup-post] Error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: cors }
    );
  }
});