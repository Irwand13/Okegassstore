import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getMyChats, supabase } from "@/lib/supabase";
import {
  MessageCircle, User, Shield, Loader2,
  ArrowLeft, ShoppingBag, Tag, ChevronRight,
  Inbox
} from "lucide-react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

@keyframes spin    { to { transform: rotate(360deg); } }
@keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

.cl-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
}

/* Tab bar */
.cl-tab {
  flex: 1;
  padding: 9px 0;
  background: none;
  border: none;
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.03em;
}
.cl-tab.active {
  color: #fff;
  border-bottom-color: #DC2626;
}
.cl-tab:hover:not(.active) {
  color: rgba(255,255,255,0.6);
}

/* Chat row */
.cl-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.18s;
  position: relative;
}
.cl-row:hover {
  background: rgba(255,255,255,0.03);
}
.cl-row:last-child {
  border-bottom: none;
}

/* Avatar */
.cl-avatar {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}
.cl-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cl-unread-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #DC2626;
  border-radius: 50%;
  border: 2px solid #0d0d0f;
  animation: pulse 2s infinite;
}

/* Status badge on row */
.cl-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Card container */
.cl-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
}

.cl-animate {
  animation: fadeUp 0.35s ease forwards;
  opacity: 0;
}
`;

const orderStatusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid:         { label: "Dibayar",    color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  processing:   { label: "Diproses",   color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  delivered:    { label: "Dikirim",    color: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  completed:    { label: "Selesai",    color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  disputed:     { label: "Sengketa",   color: "#DC2626", bg: "rgba(220,38,38,0.1)" },
  refunded:     { label: "Refund",     color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  cancelled:    { label: "Dibatalkan", color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.05)" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return "Baru saja";
  if (mins < 60)  return `${mins}m lalu`;
  if (hours < 24) return `${hours}j lalu`;
  if (days < 7)   return `${days}h lalu`;
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function ChatList() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const [chats, setChats]     = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState<"semua" | "beli" | "jual">("semua");

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getMyChats(userId).then(({ data }) => {
      setChats(data ?? []);
      setLoading(false);
    });

    // Realtime: update list when new chat created
    const channel = supabase
      .channel("inbox-chats")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "chats",
       filter: `buyer_id=eq.${userId}`,
      }, () => {
        // Refetch on new chat
        getMyChats(userId).then(({ data }) => setChats(data ?? []));
      })
     .on("postgres_changes", {
      event: "INSERT",
       schema: "public",
       table: "chats",
       filter: `seller_id=eq.${userId}`,
     }, () => {
       getMyChats(userId).then(({ data }) => setChats(data ?? []));
     })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
   }, [userId]);

  if (!session) {
    return (
      <div className="cl-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{STYLES}</style>
        <div style={{ textAlign: "center", padding: 24 }}>
          <MessageCircle size={40} color="rgba(255,255,255,0.1)" style={{ marginBottom: 16 }} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 16px" }}>
            Login untuk melihat pesan kamu
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 24px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg,#DC2626,#EA580C)",
              color: "#fff", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Barlow',sans-serif", fontSize: 14,
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Filter by tab
  const filtered = chats.filter((c) => {
    if (tab === "beli") return c.buyer_id === userId;
    if (tab === "jual") return c.seller_id === userId;
    return true;
  });

  const buyCount  = chats.filter(c => c.buyer_id  === userId).length;
  const sellCount = chats.filter(c => c.seller_id === userId).length;

  return (
    <div className="cl-root">
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        padding: "16px 20px",
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, display: "flex" }}
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
            Pesan
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
            {chats.length} percakapan aktif
          </div>
        </div>
        {/* Escrow badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: 8, padding: "5px 10px",
        }}>
          <Shield size={12} color="#10B981" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981" }}>Escrow</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
        padding: "0 20px",
      }}>
        {([
          { key: "semua", label: `Semua (${chats.length})` },
          { key: "beli",  label: `Pembelian (${buyCount})` },
          { key: "jual",  label: `Penjualan (${sellCount})` },
        ] as const).map((t) => (
          <button
            key={t.key}
            className={`cl-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px 60px" }}>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <Loader2 size={28} color="#DC2626" style={{ animation: "spin 0.8s linear infinite" }} />
          </div>

        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{
              width: 72, height: 72,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Inbox size={30} color="rgba(255,255,255,0.12)" />
            </div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
              Belum ada pesan
            </div>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, margin: "0 0 24px", lineHeight: 1.6 }}>
              {tab === "beli"
                ? "Beli akun di marketplace untuk mulai chat dengan seller."
                : tab === "jual"
                ? "Chat akan muncul saat ada pembeli untuk listing kamu."
                : "Chat akan muncul setelah transaksi berhasil."}
            </p>
            {tab !== "jual" && (
              <button
                onClick={() => navigate("/marketplace")}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg,#DC2626,#EA580C)",
                  color: "#fff", fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Barlow',sans-serif", fontSize: 13,
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <ShoppingBag size={14} /> Ke Marketplace
              </button>
            )}
          </div>

        ) : (
          <div className="cl-card">
            {filtered.map((chat, i) => {
              const isBuyer  = chat.buyer_id === userId;
              const other    = isBuyer ? chat.seller : chat.buyer;
              const status   = orderStatusMap[chat.order?.status] ?? orderStatusMap.paid;
              const listing  = chat.listing;
              const thumb    = Array.isArray(listing?.images) && listing.images.length > 0
                               ? listing.images[0] : null;

              return (
                <div
                  key={chat.id}
                  className="cl-row cl-animate"
                  style={{ animationDelay: `${i * 55}ms` }}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                >
                  {/* Avatar */}
                  <div className="cl-avatar">
                    {other?.avatar_url
                      ? <img src={other.avatar_url} alt="" />
                      : <User size={20} color="#fff" />
                    }
                  </div>

                  {/* Main content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Row 1: name + time */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <div style={{
                        fontWeight: 700, fontSize: 14, color: "#fff",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        fontFamily: "'Rajdhani',sans-serif",
                      }}>
                        {other?.full_name || other?.username || "User"}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", flexShrink: 0, marginLeft: 8 }}>
                        {timeAgo(chat.created_at)}
                      </div>
                    </div>

                    {/* Row 2: listing title */}
                    <div style={{
                      fontSize: 12, color: "rgba(255,255,255,0.35)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      marginBottom: 6, display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <Tag size={10} style={{ flexShrink: 0 }} />
                      {listing?.title || "Listing"}
                    </div>

                    {/* Row 3: role badge + order status */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {/* Role */}
                      <span className="cl-status-pill" style={{
                        color: isBuyer ? "#3B82F6" : "#10B981",
                        background: isBuyer ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.1)",
                      }}>
                        {isBuyer ? <ShoppingBag size={9} /> : <Tag size={9} />}
                        {isBuyer ? "Pembeli" : "Penjual"}
                      </span>
                      {/* Order status */}
                      <span className="cl-status-pill" style={{
                        color: status.color,
                        background: status.bg,
                      }}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Listing thumbnail + chevron */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    {thumb && (
                      <div style={{
                        width: 38, height: 38, borderRadius: 9,
                        overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)",
                        flexShrink: 0,
                      }}>
                        <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    <ChevronRight size={16} color="rgba(255,255,255,0.15)" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Escrow info footer */}
        {filtered.length > 0 && (
          <div style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "14px 16px",
            background: "rgba(16,185,129,0.05)",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 12, marginTop: 4,
          }}>
            <Shield size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 12, color: "rgba(16,185,129,0.7)", lineHeight: 1.6 }}>
              Semua transaksi dilindungi escrow OkeGass. Dana baru diteruskan ke seller setelah kamu konfirmasi akun diterima.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}