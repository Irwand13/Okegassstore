import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Shield, Star, User, CheckCircle, AlertCircle,
  ArrowLeft, Eye, Wallet, Zap, Clock,
  ChevronRight, Loader2, Lock, ImageOff, FileText, MessageCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase, getListingById, incrementViewCount, getOrCreateChat } from "@/lib/supabase";


const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.ld-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

.ld-back-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; margin-bottom: 24px;
}
.ld-back-btn:hover { color: #fff; border-color: rgba(255,255,255,0.15); }

.ld-gallery { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.ld-main-img {
  width: 100%; aspect-ratio: 16/9; border-radius: 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden; display: flex; align-items: center; justify-content: center;
}
.ld-main-img img { width: 100%; height: 100%; object-fit: cover; }
.ld-thumb-row { display: flex; gap: 8px; }
.ld-thumb {
  width: 64px; height: 64px; border-radius: 8px; flex-shrink: 0;
  background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.07);
  overflow: hidden; cursor: pointer; transition: all 0.2s;
}
.ld-thumb:hover { border-color: rgba(255,255,255,0.2); }
.ld-thumb.active { border-color: #DC2626; }
.ld-thumb img { width: 100%; height: 100%; object-fit: cover; }

.ld-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 16px;
}
.ld-card-title {
  font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700;
  color: #fff; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
}

.ld-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.ld-stat {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px; padding: 12px 10px; text-align: center;
}
.ld-stat-label { font-size: 10px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
.ld-stat-value { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.85); }

.ld-buy-box {
  position: sticky; top: 80px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; overflow: hidden;
}
.ld-buy-box-top { height: 3px; background: linear-gradient(90deg, #DC2626, #EA580C); }
.ld-buy-box-body { padding: 24px; }

.ld-buy-btn {
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff;
  font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700;
  cursor: pointer; letter-spacing: 0.04em;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.25s; box-shadow: 0 6px 20px rgba(220,38,38,0.3);
}
.ld-buy-btn:hover:not(:disabled) { box-shadow: 0 10px 30px rgba(220,38,38,0.5); transform: translateY(-1px); }
.ld-buy-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

.ld-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700;
}
.ld-badge-green { background: rgba(16,185,129,0.12); color: #10B981; }
.ld-badge-amber { background: rgba(245,158,11,0.12); color: #F59E0B; }
.ld-badge-red   { background: rgba(220,38,38,0.12);  color: #DC2626; }
.ld-badge-blue  { background: rgba(59,130,246,0.12); color: #3B82F6; }

.ld-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: fadeIn 0.2s ease;
}
.ld-modal {
  width: 100%; max-width: 420px;
  background: #111115; border: 1px solid rgba(255,255,255,0.09);
  border-radius: 20px; overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.ld-modal-header { padding: 20px 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.ld-modal-body { padding: 24px; }
.ld-modal-title { font-family: 'Rajdhani',sans-serif; font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 4px; }
.ld-modal-sub { font-size: 13px; color: rgba(255,255,255,0.35); }

.ld-modal-row {
  display: flex; justify-content: space-between;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;
}
.ld-modal-row:last-child { border-bottom: none; }
.ld-modal-label { color: rgba(255,255,255,0.4); }
.ld-modal-value { color: rgba(255,255,255,0.85); font-weight: 600; }

.ld-alert {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 14px 16px; border-radius: 10px; margin: 16px 0; font-size: 13px;
}
.ld-alert-green { background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.2); }
.ld-alert-amber { background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.2); }
.ld-alert-red   { background: rgba(220,38,38,0.07);  border: 1px solid rgba(220,38,38,0.2); }

.ld-modal-btn {
  flex: 1; padding: 13px; border-radius: 11px; font-family: 'Barlow',sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.ld-modal-btn-primary {
  border: none; background: linear-gradient(135deg,#DC2626,#EA580C);
  color:#fff; box-shadow:0 4px 14px rgba(220,38,38,0.3);
}
.ld-modal-btn-primary:hover:not(:disabled) { box-shadow:0 8px 24px rgba(220,38,38,0.5); }
.ld-modal-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.ld-modal-btn-secondary {
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color:rgba(255,255,255,0.6);
}
.ld-modal-btn-secondary:hover { color:#fff; background:rgba(255,255,255,0.07); }

.ld-grid { display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start; }
@media(max-width: 900px) { .ld-grid { grid-template-columns: 1fr; } .ld-buy-box { position: static; } }

@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes slideUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes spin    { to{transform:rotate(360deg)} }
`;

export default function ListingDetail() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile, session, setShowAuthModal } = useAuth();

  const [listing,     setListing]     = useState<any>(null);
  const [loading,     setLoading]     = useState(true);
  const [activeImg,   setActiveImg]   = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [buying,      setBuying]      = useState(false);
  const [buyError,    setBuyError]    = useState("");
  const [buySuccess,  setBuySuccess]  = useState(false);
  const [successChatId, setSuccessChatId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getListingById(id).then(({ data, error }) => {
      if (error || !data) {
        console.error("Listing not found:", error);
        navigate("/marketplace");
        return;
      }
      setListing(data);
      setLoading(false);
      incrementViewCount(id);
    });
  }, [id]);

  // ── Loading ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="ld-root" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
        <style>{STYLES}</style>
        <Loader2 size={32} color="#DC2626" style={{ animation:"spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!listing) return null;

  const gc        = listing.game_categories;
  const seller    = listing.profiles;
  const images    = Array.isArray(listing.images) && listing.images.length > 0 ? listing.images : [];
  const isSold    = listing.status === "sold";
  const isOwn     = session?.user?.id === listing.seller_id;
  const saldo     = profile?.balance ?? 0;
  const hasEnough = saldo >= listing.price;

  // ── Eksekusi beli ─────────────────────────────────────────────
  const handleBuy = async () => {
    if (!session?.user) return;
    setBuying(true);
    setBuyError("");

    try {
      // 1. Cek listing masih available
      const { data: freshListing } = await supabase
        .from("listings")
        .select("status, price, seller_id")
        .eq("id", listing.id)
        .single();

      if (!freshListing || freshListing.status !== "active") {
        setBuyError("Maaf, akun ini sudah tidak tersedia.");
        setBuying(false);
        return;
      }

      if (freshListing.seller_id === session.user.id) {
        setBuyError("Kamu tidak bisa membeli listing milik sendiri.");
        setBuying(false);
        return;
      }

      // 2. Cek saldo buyer
      const { data: buyerProfile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", session.user.id)
        .single();

      if (!buyerProfile || buyerProfile.balance < freshListing.price) {
        setBuyError("Saldo tidak cukup. Silakan top up terlebih dahulu.");
        setBuying(false);
        return;
      }

      const price        = freshListing.price;
      const platformFee  = Math.floor(price * 5 / 100);
      const sellerAmount = price - platformFee;

      // 3. Kurangi saldo buyer
      const { error: deductError } = await supabase
        .from("profiles")
        .update({ balance: buyerProfile.balance - price })
        .eq("id", session.user.id);

      if (deductError) throw new Error("Gagal memotong saldo: " + deductError.message);

      // 4. Buat order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          listing_id:       listing.id,
          buyer_id:         session.user.id,
          seller_id:        listing.seller_id,
          price,
          platform_fee:     platformFee,
          seller_amount:    sellerAmount,
          payment_method:   "wallet",
          status:           "paid",
          paid_at:          new Date().toISOString(),
          auto_complete_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select("id")
        .single();

      if (orderError) throw new Error("Gagal membuat order: " + orderError.message);

      // 5. Catat wallet log buyer
      await supabase.from("wallet_logs").insert({
        user_id:        session.user.id,
        order_id:       order.id,
        action:         "spend",
        amount:         price,
        balance_before: buyerProfile.balance,
        balance_after:  buyerProfile.balance - price,
        note:           `Beli akun: ${listing.title}`,
      });

      // 6. Update status listing → sold
      await supabase
        .from("listings")
        .update({ status: "sold", sold_at: new Date().toISOString() })
        .eq("id", listing.id);

      // 7. Buat chat room antara buyer dan seller
      const { data: chat, error: chatError } = await getOrCreateChat(
        order.id,
        listing.id,
        session.user.id,
        listing.seller_id
      );

      if (chatError) {
        console.error("Gagal membuat chat:", chatError);
      }

      // 8. Sukses — redirect ke chat
      setBuying(false);
      setBuySuccess(true);
      setShowConfirm(false);
      setListing((prev: any) => ({ ...prev, status: "sold" }));

      // Redirect ke chat setelah 1.5 detik (biar success screen keliatan sebentar)
      if (chat?.id) {
        setSuccessChatId(chat.id);
        setTimeout(() => navigate(`/chat/${chat.id}`), 1500);
      }

    } catch (err: any) {
      setBuyError(err.message || "Terjadi kesalahan. Coba lagi.");
      setBuying(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────
  if (buySuccess) {
    return (
      <div className="ld-root" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:24 }}>
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:440 }}>
          <div style={{ width:80, height:80, background:"rgba(16,185,129,0.1)", border:"2px solid rgba(16,185,129,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <CheckCircle size={40} color="#10B981" />
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:32, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Pembelian Berhasil!
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 8px" }}>
            Kamu membeli <strong style={{ color:"#fff" }}>{listing.title}</strong>
          </p>
          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:13, margin:"0 0 28px" }}>
            Saldo berkurang <strong style={{ color:"#DC2626" }}>{formatRupiah(listing.price)}</strong>.
            Hubungi seller di chat untuk mendapatkan data akun.
          </p>
          <div className="ld-alert ld-alert-green" style={{ textAlign:"left", marginBottom:24 }}>
            <Shield size={16} color="#10B981" style={{ flexShrink:0, marginTop:1 }} />
            <div>
              <div style={{ fontWeight:700, color:"#10B981", marginBottom:4 }}>Dana Aman di Escrow</div>
              <div style={{ fontSize:12, color:"rgba(16,185,129,0.7)", lineHeight:1.6 }}>
                Dana ditahan platform hingga kamu konfirmasi akun sudah diterima.
                Jika ada masalah dalam 3 hari, hubungi tim OkeGass.
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => navigate("/marketplace")} className="ld-modal-btn ld-modal-btn-secondary" style={{ flex:1 }}>
              <ArrowLeft size={14} /> Marketplace
            </button>
            {successChatId ? (
              <button onClick={() => navigate(`/chat/${successChatId}`)} className="ld-modal-btn ld-modal-btn-primary" style={{ flex:1 }}>
                <MessageCircle size={14} /> Chat Seller
              </button>
            ) : (
              <button onClick={() => navigate("/profile")} className="ld-modal-btn ld-modal-btn-primary" style={{ flex:1 }}>
                <Zap size={14} /> Lihat Pesanan
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────
  return (
    <div className="ld-root">
      <style>{STYLES}</style>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="ld-overlay" onClick={() => !buying && setShowConfirm(false)}>
          <div className="ld-modal" onClick={e => e.stopPropagation()}>
            <div style={{ height:3, background:"linear-gradient(90deg,#DC2626,#EA580C)" }} />
            <div className="ld-modal-header">
              <div className="ld-modal-title">Konfirmasi Pembelian</div>
              <div className="ld-modal-sub">Pastikan detail sudah benar</div>
            </div>
            <div className="ld-modal-body">
              {[
                { label:"Game",   value:`${gc?.name || "Game"} · ${listing.account_rank || "-"}` },
                { label:"Item",   value:listing.title },
                { label:"Seller", value:seller?.full_name || seller?.username || "Seller" },
                { label:"Harga",  value:formatRupiah(listing.price) },
                { label:"Saldo",  value:formatRupiah(saldo) },
                { label:"Sisa",   value:formatRupiah(saldo - listing.price) },
              ].map(row => (
                <div key={row.label} className="ld-modal-row">
                  <span className="ld-modal-label">{row.label}</span>
                  <span className="ld-modal-value" style={{
                    color: row.label === "Harga" ? "#DC2626"
                         : row.label === "Sisa"  ? "#10B981"
                         : undefined
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="ld-alert ld-alert-amber">
                <AlertCircle size={14} color="#F59E0B" style={{ flexShrink:0, marginTop:1 }} />
                <div style={{ color:"rgba(245,158,11,0.8)", fontSize:12, lineHeight:1.6 }}>
                  Setelah konfirmasi, saldo langsung terpotong dan transaksi tidak bisa dibatalkan.
                </div>
              </div>

              {buyError && (
                <div className="ld-alert ld-alert-red" style={{ marginTop:0 }}>
                  <AlertCircle size={14} color="#DC2626" style={{ flexShrink:0, marginTop:1 }} />
                  <div style={{ color:"rgba(220,38,38,0.9)", fontSize:12 }}>{buyError}</div>
                </div>
              )}

              <div style={{ display:"flex", gap:10, marginTop:4 }}>
                <button className="ld-modal-btn ld-modal-btn-secondary" onClick={() => setShowConfirm(false)} disabled={buying}>
                  Batal
                </button>
                <button className="ld-modal-btn ld-modal-btn-primary" onClick={handleBuy} disabled={buying}>
                  {buying
                    ? <><Loader2 size={14} style={{ animation:"spin 0.8s linear infinite" }} /> Memproses...</>
                    : <><Zap size={14} /> Bayar {formatRupiah(listing.price)}</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px 80px" }}>
        <button className="ld-back-btn" onClick={() => navigate("/marketplace")}>
          <ArrowLeft size={14} /> Kembali ke Marketplace
        </button>

        <div className="ld-grid">

          {/* ── LEFT ─────────────────────────────────────────── */}
          <div>
            {/* Gallery */}
            <div className="ld-gallery">
              <div className="ld-main-img">
                {images.length > 0
                  ? <img src={images[activeImg]} alt="screenshot akun" />
                  : (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, color:"rgba(255,255,255,0.15)" }}>
                      <ImageOff size={40} />
                      <span style={{ fontSize:13 }}>Tidak ada foto</span>
                    </div>
                  )
                }
              </div>
              {images.length > 1 && (
                <div className="ld-thumb-row">
                  {images.map((img: string, i: number) => (
                    <div key={i} className={`ld-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                      <img src={img} alt={`thumb ${i+1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              {gc && (
                <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", background:"rgba(255,255,255,0.06)", padding:"4px 12px", borderRadius:6, display:"flex", alignItems:"center", gap:6 }}>
                  {gc.icon} {gc.name}
                </span>
              )}
              {listing.account_rank && <span className="ld-badge ld-badge-amber">{listing.account_rank}</span>}
              {isSold
                ? <span className="ld-badge ld-badge-red">Terjual</span>
                : <span className="ld-badge ld-badge-green"><span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", display:"inline-block" }} /> Tersedia</span>
              }
              {listing.is_negotiable && <span className="ld-badge ld-badge-blue">Nego</span>}
            </div>

            {/* Title */}
            <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", margin:"0 0 8px", lineHeight:1.2 }}>
              {listing.title}
            </h1>

            {/* Meta */}
            <div style={{ display:"flex", alignItems:"center", gap:12, fontSize:12, color:"rgba(255,255,255,0.25)", marginBottom:24 }}>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                <Eye size={13} /> {listing.view_count || 0} dilihat
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                <Clock size={13} /> {new Date(listing.created_at).toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" })}
              </span>
            </div>

            {/* Stats */}
            <div className="ld-card">
              <div className="ld-card-title"><CheckCircle size={16} color="#10B981" /> Statistik Akun</div>
              <div className="ld-stats">
                {[
                  { label:"Rank",      value: listing.account_rank   || "-" },
                  { label:"Level",     value: listing.account_level  || "-" },
                  { label:"Hero",      value: listing.heroes_count   ? `${listing.heroes_count}+` : "-" },
                  { label:"Skin",      value: listing.skins_count    ? `${listing.skins_count}+`  : "-" },
                  { label:"Server",    value: listing.account_server || "-" },
                  { label:"Login via", value: listing.login_type     || "-" },
                ].map(s => (
                  <div key={s.label} className="ld-stat">
                    <div className="ld-stat-label">{s.label}</div>
                    <div className="ld-stat-value">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="ld-card">
                <div className="ld-card-title"><FileText size={16} color="#A78BFA" /> Deskripsi</div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.8, margin:0, whiteSpace:"pre-wrap" }}>
                  {listing.description}
                </p>
              </div>
            )}

            {/* Escrow info */}
            <div className="ld-alert ld-alert-green">
              <Shield size={18} color="#10B981" style={{ flexShrink:0, marginTop:1 }} />
              <div>
                <div style={{ fontWeight:700, color:"#10B981", fontSize:14, marginBottom:4, fontFamily:"'Rajdhani',sans-serif" }}>
                  Dilindungi Escrow OkeGass
                </div>
                <div style={{ fontSize:12, color:"rgba(16,185,129,0.7)", lineHeight:1.6 }}>
                  Dana ditahan platform hingga akun berhasil dipindahkan. Jika ada masalah dalam 3 hari, ajukan sengketa dan tim kami akan mediasi.
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Buy Box ──────────────────────────────── */}
          <div>
            <div className="ld-buy-box">
              <div className="ld-buy-box-top" />
              <div className="ld-buy-box-body">

                {/* Price */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Harga</div>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:36, fontWeight:700, color:"#DC2626", lineHeight:1 }}>
                    {formatRupiah(listing.price)}
                  </div>
                  {listing.is_negotiable && (
                    <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:4 }}>Harga dapat dinegosiasikan</div>
                  )}
                </div>

                {/* Saldo */}
                {session && (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"rgba(255,255,255,0.35)" }}>
                      <Wallet size={13} /> Saldo kamu
                    </div>
                    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color: hasEnough ? "#10B981" : "#DC2626" }}>
                      {formatRupiah(saldo)}
                    </div>
                  </div>
                )}

                {/* CTA logic */}
                {!session ? (
                  <div>
                    <button onClick={() => setShowAuthModal(true)} className="ld-buy-btn">
                      <Lock size={15} /> Login untuk Membeli
                    </button>
                    <div style={{ textAlign:"center", fontSize:12, color:"rgba(255,255,255,0.2)", marginTop:10 }}>
                      Butuh akun OkeGass untuk bertransaksi
                    </div>
                  </div>
                ) : isOwn ? (
                  <div style={{ textAlign:"center", padding:"14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12 }}>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)", fontWeight:600 }}>Ini listing milik kamu</div>
                  </div>
                ) : isSold ? (
                  <div style={{ textAlign:"center", padding:"14px", background:"rgba(220,38,38,0.07)", border:"1px solid rgba(220,38,38,0.2)", borderRadius:12 }}>
                    <div style={{ fontSize:13, color:"#DC2626", fontWeight:700 }}>Akun Sudah Terjual</div>
                  </div>
                ) : !hasEnough ? (
                  <div>
                    <button className="ld-buy-btn" disabled>
                      <Wallet size={15} /> Saldo Tidak Cukup
                    </button>
                    <button
                      onClick={() => navigate("/wallet")}
                      style={{ width:"100%", marginTop:10, padding:"11px", borderRadius:10, border:"1px solid rgba(16,185,129,0.3)", background:"rgba(16,185,129,0.07)", color:"#10B981", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"all 0.2s" }}
                    >
                      <Wallet size={13} /> Top Up Saldo
                    </button>
                    <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.2)", marginTop:8 }}>
                      Butuh tambahan {formatRupiah(listing.price - saldo)}
                    </div>
                  </div>
                ) : (
                  <button className="ld-buy-btn" onClick={() => { setBuyError(""); setShowConfirm(true); }}>
                    <Zap size={15} fill="white" /> Beli Sekarang <ChevronRight size={14} />
                  </button>
                )}

                {/* Trust badges */}
                <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { icon:<Shield size={12} color="#10B981" />,      text:"Dana aman dengan escrow" },
                    { icon:<CheckCircle size={12} color="#3B82F6" />,  text:"Auto-complete 3 hari" },
                    { icon:<MessageCircle size={12} color="#A78BFA" />, text:"Chat langsung dengan seller" },
                    { icon:<AlertCircle size={12} color="#F59E0B" />,  text:"Mediasi jika ada sengketa" },
                  ].map(item => (
                    <div key={item.text} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"rgba(255,255,255,0.3)" }}>
                      {item.icon} {item.text}
                    </div>
                  ))}
                </div>

                {/* Seller */}
                <div style={{ marginTop:20, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Penjual</div>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#DC2626,#EA580C)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
                      {seller?.avatar_url
                        ? <img src={seller.avatar_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                        : <User size={18} color="#fff" />
                      }
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#fff" }}>
                        {seller?.full_name || seller?.username || "Seller"}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"rgba(255,255,255,0.3)" }}>
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ color:"#F59E0B", fontWeight:600 }}>
                          {seller?.total_reviews > 0
                            ? (seller.rating_sum / seller.total_reviews).toFixed(1)
                            : "Baru"
                          }
                        </span>
                        · {seller?.total_sales || 0} terjual
                      </div>
                    </div>
                    {seller?.is_verified_seller && (
                      <span className="ld-badge ld-badge-green"><CheckCircle size={10} /> Verified</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}