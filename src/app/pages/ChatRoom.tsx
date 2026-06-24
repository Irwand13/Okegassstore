import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Send, Shield, Loader2, User, CheckCircle } from "lucide-react";

export default function ChatRoom() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { session } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [chat, setChat]         = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [order, setOrder]       = useState<any>(null);
  const [input, setInput]       = useState("");
  const [sending, setSending]   = useState(false);
  const [loading, setLoading]   = useState(true);
  const [confirming, setConfirming] = useState(false);

  // Load chat → then messages + order in parallel
  useEffect(() => {
    if (!chatId || !session) return;

    supabase
      .from("chats")
      .select(`
        *,
        listing:listing_id (title, price),
        buyer:buyer_id (full_name, username, avatar_url),
        seller:seller_id (full_name, username, avatar_url)
      `)
      .eq("id", chatId)
      .single()
      .then(async ({ data: chatData }) => {
        setChat(chatData);

        const [msgRes, orderRes] = await Promise.all([
          supabase
            .from("chat_messages")
            .select("*, sender:sender_id (full_name, username, avatar_url)")
            .eq("chat_id", chatId)
            .order("created_at", { ascending: true }),

          supabase
            .from("orders")
            .select("*")
            .eq("listing_id", chatData?.listing_id)
            .eq("buyer_id", chatData?.buyer_id)
            .in("status", ["paid", "completed"])
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        setMessages(msgRes.data ?? []);
        setOrder(orderRes.data ?? null);
        setLoading(false);
      });

    // Realtime subscription
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          supabase
            .from("chat_messages")
            .select("*, sender:sender_id (full_name, username, avatar_url)")
            .eq("id", payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) setMessages((prev) => [...prev, data]);
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, session]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !session || sending) return;
    setSending(true);
    setInput("");

    await supabase.from("chat_messages").insert({
      chat_id: chatId,
      sender_id: session.user.id,
      message: text,
    });

    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleConfirmReceived = async () => {
    if (!order || !session?.user) return;
    const confirmed = window.confirm(
      "Konfirmasi bahwa kamu sudah menerima akun dengan baik?\nDana akan langsung dikirim ke seller dan tidak bisa dibatalkan."
    );
    if (!confirmed) return;

    setConfirming(true);

    const { error } = await supabase.rpc("release_escrow_to_seller", {
      p_order_id: order.id,
      p_buyer_id: session.user.id,
    });

    if (error) {
      const msg = error.message ?? "";
      if (msg.includes("ORDER_NOT_RELEASABLE")) {
        alert("Order ini sudah selesai atau tidak bisa dikonfirmasi.");
      } else if (msg.includes("UNAUTHORIZED")) {
        alert("Kamu bukan pembeli order ini.");
      } else {
        alert("Gagal konfirmasi: " + msg);
      }
      setConfirming(false);
      return;
    }

    setOrder((prev: any) => ({ ...prev, status: "completed" }));
    setConfirming(false);
    alert("✅ Dana berhasil dikirim ke seller!");
  };

  // ─── Loading ───────────────────────────────────────────────
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader2
          size={32}
          color="#DC2626"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
      </div>
    );

  if (!chat)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        Chat tidak ditemukan.
      </div>
    );

  const isBuyer = session?.user?.id === chat.buyer_id;
  const other   = isBuyer ? chat.seller : chat.buyer;
  const myId    = session?.user?.id;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "16px 20px",
          background: "rgba(255,255,255,0.025)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: 4,
            display: "flex",
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "linear-gradient(135deg,#DC2626,#EA580C)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {other?.avatar_url ? (
            <img
              src={other.avatar_url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <User size={18} color="#fff" />
          )}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>
            {other?.full_name || other?.username || "User"}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {chat.listing?.title}
          </div>
        </div>
      </div>

      {/* ── Escrow notice ── */}
      <div
        style={{
          margin: "16px 20px 0",
          padding: "12px 14px",
          background: "rgba(16,185,129,0.07)",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: 10,
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <Shield size={14} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: 12, color: "rgba(16,185,129,0.8)", lineHeight: 1.6 }}>
          Dana dalam escrow. Seller, kirim data akun di sini. Buyer, konfirmasi
          setelah akun berhasil diterima.
        </p>
      </div>

      {/* ── Tombol Konfirmasi (buyer + status paid) ── */}
      {isBuyer && order?.status === "paid" && (
        <div style={{ margin: "12px 20px 0" }}>
          <button
            onClick={handleConfirmReceived}
            disabled={confirming}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              border: "none",
              background: confirming
                ? "rgba(255,255,255,0.08)"
                : "linear-gradient(135deg,#10B981,#059669)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: confirming ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
          >
            {confirming ? (
              <>
                <Loader2
                  size={15}
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                Konfirmasi Akun Diterima — Cairkan Dana ke Seller
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Badge completed ── */}
      {order?.status === "completed" && (
        <div
          style={{
            margin: "12px 20px 0",
            padding: "10px 14px",
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: 10,
            textAlign: "center",
            color: "#10B981",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <CheckCircle size={14} />
          Transaksi selesai — Dana sudah dikirim ke seller
        </div>
      )}

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: 13,
              marginTop: 40,
            }}
          >
            Belum ada pesan. Mulai percakapan!
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender_id === myId;
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px 14px",
                  borderRadius: isMe
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  background: isMe
                    ? "linear-gradient(135deg,#DC2626,#EA580C)"
                    : "rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontSize: 14,
                  lineHeight: 1.6,
                  wordBreak: "break-word",
                }}
              >
                {msg.message}
                <div
                  style={{
                    fontSize: 10,
                    color: isMe
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(255,255,255,0.3)",
                    marginTop: 4,
                    textAlign: "right",
                  }}
                >
                  {new Date(msg.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.025)",
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ketik pesan... (Enter untuk kirim)"
          rows={1}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "10px 14px",
            color: "#fff",
            fontSize: 14,
            fontFamily: "'Barlow',sans-serif",
            resize: "none",
            outline: "none",
            lineHeight: 1.5,
            maxHeight: 120,
            overflowY: "auto",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: "none",
            flexShrink: 0,
            background: input.trim()
              ? "linear-gradient(135deg,#DC2626,#EA580C)"
              : "rgba(255,255,255,0.07)",
            color: "#fff",
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}