import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY")!;
const MIDTRANS_API_URL    = "https://app.midtrans.com/snap/v1/transactions"; // production
const SUPABASE_URL        = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Ambil user dari JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Unauthorized");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (userError || !user) throw new Error("Unauthorized");

    // Ambil body
    const { amount } = await req.json();
    if (!amount || amount < 10000) throw new Error("Minimal top up Rp 10.000");

    // Ambil profile user
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, username, phone")
      .eq("id", user.id)
      .single();

    // Buat order ID unik
    const orderId = `TU-${Date.now()}-${user.id.slice(0, 8)}`;

    // Simpan dulu ke DB dengan status pending
    await supabase.from("topup_transactions").insert({
      id:      orderId,
      user_id: user.id,
      amount,
      status:  "pending",
    });

    // Request ke Midtrans
    const midtransPayload = {
      transaction_details: {
        order_id:     orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: profile?.full_name || profile?.username || "User",
        email:      user.email,
        phone:      profile?.phone || "",
      },
      item_details: [{
        id:       "TOPUP_SALDO",
        price:    amount,
        quantity: 1,
        name:     `Top Up Saldo OkeGass Rp ${amount.toLocaleString("id-ID")}`,
      }],
      callbacks: {
        finish: `${req.headers.get("origin") || "https://okegassstoreprototipe.vercel.app"}/wallet?status=success`,
      },
    };

    const midtransRes = await fetch(MIDTRANS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${btoa(MIDTRANS_SERVER_KEY + ":")}`,
      },
      body: JSON.stringify(midtransPayload),
    });

    const midtransData = await midtransRes.json();

    if (!midtransData.token) {
      throw new Error(midtransData.error_messages?.join(", ") || "Gagal membuat transaksi");
    }

    // Simpan snap token
    await supabase
      .from("topup_transactions")
      .update({ snap_token: midtransData.token })
      .eq("id", orderId);

    return new Response(
      JSON.stringify({ token: midtransData.token, order_id: orderId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});