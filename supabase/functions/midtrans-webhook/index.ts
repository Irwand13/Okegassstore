import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MIDTRANS_SERVER_KEY  = Deno.env.get("MIDTRANS_SERVER_KEY")!;
const SUPABASE_URL         = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  try {
    const body = await req.json();

    const {
      order_id,
      transaction_status,
      fraud_status,
      payment_type,
      signature_key,
      gross_amount,
      status_code,
    } = body;

    // Verifikasi signature dari Midtrans
    const rawString  = `${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`;
    const hashBuffer = await crypto.subtle.digest(
      "SHA-512",
      new TextEncoder().encode(rawString)
    );
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    if (hashHex !== signature_key) {
      return new Response("Invalid signature", { status: 401 });
    }

    // Hanya proses top up transactions
    if (!order_id.startsWith("TU-")) {
      return new Response("OK", { status: 200 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Tentukan status final
    const isSuccess =
      (transaction_status === "capture" && fraud_status === "accept") ||
      transaction_status === "settlement";
    const isFailed  =
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire";

    if (isSuccess) {
      // Ambil data transaksi
      const { data: txn } = await supabase
        .from("topup_transactions")
        .select("*")
        .eq("id", order_id)
        .eq("status", "pending")  // hanya proses sekali
        .single();

      if (!txn) {
        return new Response("Already processed", { status: 200 });
      }

      // Update status transaksi
      await supabase
        .from("topup_transactions")
        .update({
          status:          "success",
          payment_type,
          midtrans_status: transaction_status,
          paid_at:         new Date().toISOString(),
        })
        .eq("id", order_id);

      // Tambah saldo user
      const { data: profile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", txn.user_id)
        .single();

      const balanceBefore = profile?.balance || 0;
      const balanceAfter  = balanceBefore + txn.amount;

      await supabase
        .from("profiles")
        .update({ balance: balanceAfter })
        .eq("id", txn.user_id);

      // Catat di wallet_logs
      await supabase.from("wallet_logs").insert({
        user_id:        txn.user_id,
        action:         "topup",
        amount:         txn.amount,
        balance_before: balanceBefore,
        balance_after:  balanceAfter,
        note:           `Top up via ${payment_type} · ${order_id}`,
      });

      // Kirim notifikasi ke user
      await supabase.from("notifications").insert({
        user_id: txn.user_id,
        type:    "topup_success",
        title:   "Top Up Berhasil! 💰",
        message: `Saldo kamu bertambah Rp ${txn.amount.toLocaleString("id-ID")} via ${payment_type}`,
      });

    } else if (isFailed) {
      await supabase
        .from("topup_transactions")
        .update({
          status:          "failed",
          midtrans_status: transaction_status,
        })
        .eq("id", order_id);
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Error", { status: 500 });
  }
});