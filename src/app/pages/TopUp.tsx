import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
  Zap, ChevronRight, Shield, Clock, CreditCard,
  Wallet, Smartphone, CheckCircle, User, Hash,
  AlertCircle, ArrowLeft, Loader2, RefreshCw, Hourglass
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────
type Product = {
  id: string;
  sku: string;
  name: string;
  game_id: string;
  price: number;
  bonus?: number;
  is_popular?: boolean;
  category?: string;
};

type Game = {
  id: string;
  name: string;
  icon: string;
  color: string;
  currency: string;
  need_server_id: boolean;
};

const GAMES: Game[] = [
  { id: "ml",  name: "Mobile Legends", icon: "⚔️",  color: "#1E88E5", currency: "Diamonds", need_server_id: true  },
  { id: "ff",  name: "Free Fire",      icon: "🔥",  color: "#FF4500", currency: "Diamonds", need_server_id: false },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

// FIX: polling config untuk status pending
const POLL_INTERVAL_MS = 5000;   // cek tiap 5 detik
const POLL_MAX_ATTEMPTS = 24;    // maksimal 2 menit (24 x 5s)

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.tu-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

.tu-hero {
  position: relative; padding: 40px 0 36px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.tu-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(234,88,12,0.08) 50%, transparent 100%); }
.tu-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px); background-size: 40px 40px; }
.tu-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent); }

.tu-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 28px; position: relative; overflow: hidden;
}
.tu-card-top { position: absolute; top: 0; left: 20px; right: 20px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); }

.tu-step-num {
  width: 28px; height: 28px; border-radius: 8px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; color: #fff;
  flex-shrink: 0; box-shadow: 0 4px 12px rgba(220,38,38,0.35);
}
.tu-section-title { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin: 0; }

/* Game buttons */
.tu-game-btn {
  display: flex; align-items: center; gap: 12px; padding: 16px;
  border-radius: 14px; border: 2px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.22s; flex: 1;
}
.tu-game-btn:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
.tu-game-btn.active { border-color: var(--game-color); background: color-mix(in srgb, var(--game-color) 10%, transparent); }

/* Denom grid */
.tu-denom-btn {
  position: relative; padding: 14px; border-radius: 12px;
  border: 1.5px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);
  cursor: pointer; transition: all 0.22s; text-align: left; overflow: hidden;
}
.tu-denom-btn:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }
.tu-denom-btn.active { border-color: rgba(220,38,38,0.6); background: rgba(220,38,38,0.07); }
.tu-denom-btn.active::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#DC2626,transparent); }
.tu-popular-badge { position:absolute; top:-1px; right:12px; background:linear-gradient(135deg,#DC2626,#EA580C); color:#fff; font-size:9px; font-weight:700; padding:3px 8px; border-radius:0 0 6px 6px; letter-spacing:0.06em; text-transform:uppercase; }

/* Input */
.tu-input-label { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; }
.tu-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:12px 14px; font-family:'Barlow',sans-serif; font-size:14px; font-weight:500; color:#fff; outline:none; transition:all 0.2s; box-sizing:border-box; }
.tu-input::placeholder { color:rgba(255,255,255,0.2); }
.tu-input:focus { border-color:rgba(220,38,38,0.5); background:rgba(220,38,38,0.04); box-shadow:0 0 0 3px rgba(220,38,38,0.08); }

/* Summary */
.tu-summary { position:sticky; top:84px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:18px; padding:24px; overflow:hidden; }
.tu-summary-line { position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#DC2626,#EA580C); }
.tu-summary-row { display:flex; justify-content:space-between; align-items:center; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; }
.tu-summary-row:last-of-type { border-bottom:none; }

.tu-proceed-btn {
  width:100%; padding:14px; background:linear-gradient(135deg,#DC2626 0%,#EA580C 100%);
  border:none; border-radius:12px; color:#fff; font-family:'Rajdhani',sans-serif;
  font-size:16px; font-weight:700; letter-spacing:0.04em; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:all 0.25s; box-shadow:0 6px 20px rgba(220,38,38,0.3);
}
.tu-proceed-btn:hover:not(:disabled) { box-shadow:0 10px 32px rgba(220,38,38,0.5); transform:translateY(-1px); }
.tu-proceed-btn:disabled { opacity:0.35; cursor:not-allowed; box-shadow:none; transform:none; }

/* Saldo bar */
.tu-saldo-bar {
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 14px; background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2);
  border-radius:10px; margin-bottom:12px; font-size:13px;
}

/* Status page */
.tu-page-center { min-height:100vh; background:#0d0d0f; display:flex; align-items:center; justify-content:center; padding:24px; }
.tu-status-card { width:100%; max-width:460px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:20px; overflow:hidden; }

.tu-grid-main { display:grid; grid-template-columns:1fr 320px; gap:24px; align-items:start; }
@media(max-width:960px) { .tu-grid-main{grid-template-columns:1fr} .tu-summary{position:static} }

.tu-games-grid { display:flex; gap:12px; flex-wrap:wrap; }
.tu-denoms-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
@media(min-width:600px) { .tu-denoms-grid{grid-template-columns:repeat(3,1fr)} }

@keyframes tuFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.tu-animate { animation:tuFadeUp 0.4s ease forwards; }
@keyframes spin { to{transform:rotate(360deg)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
`;

export default function TopUp() {
  const [searchParams] = useSearchParams();
  const { user, profile, session, setShowAuthModal } = useAuth();

  const [selectedGame,    setSelectedGame]    = useState(searchParams.get("game") || "ml");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userId,          setUserId]          = useState("");
  const [serverId,        setServerId]        = useState("");
  // FIX: tambah state "pending" terpisah dari "failed"
  const [step, setStep] = useState<"form" | "confirm" | "processing" | "success" | "pending" | "failed">("form");
  const [products,        setProducts]        = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [processing,      setProcessing]      = useState(false);
  const [txResult,        setTxResult]        = useState<{ ref_id: string; status: string; message?: string } | null>(null);
  const [checkingStatus,  setCheckingStatus]  = useState(false);
  const [pollAttempts,    setPollAttempts]    = useState(0);

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentGame = GAMES.find(g => g.id === selectedGame)!;
  const saldo       = profile?.balance ?? 0;
  const hasEnough   = selectedProduct ? saldo >= selectedProduct.price : false;

  // Fetch produk dari DB
  useEffect(() => {
    setLoadingProducts(true);
    setSelectedProduct(null);
    supabase
      .from("topup_products")
      .select("*")
      .eq("game_id", selectedGame)
      .eq("is_active", true)
      .order("price", { ascending: true })
      .then(({ data }) => {
        setProducts(data || []);
        setLoadingProducts(false);
      });
  }, [selectedGame]);

  // FIX: auto-poll status saat step === "pending"
  useEffect(() => {
    if (step !== "pending" || !txResult?.ref_id) {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      return;
    }

    pollTimerRef.current = setInterval(async () => {
      setPollAttempts(prev => {
        const next = prev + 1;
        if (next >= POLL_MAX_ATTEMPTS) {
          // Sudah 2 menit, stop auto-poll — biarkan user cek manual
          if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        }
        return next;
      });

      const { data } = await supabase
        .from("topup_game_transactions")
        .select("status, message, digiflazz_ref")
        .eq("id", txResult.ref_id)
        .single();

      if (data && data.status !== "pending") {
        setTxResult(prev => ({ ...prev!, status: data.status, message: data.message }));
        setStep(data.status === "success" ? "success" : "failed");
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      }
    }, POLL_INTERVAL_MS);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [step, txResult?.ref_id]);

  // ── Proses top up ─────────────────────────────────────────────
  const handleProcess = async () => {
    if (!selectedProduct || !userId || !session) return;
    setProcessing(true);
    setStep("processing");

    try {
      const { data: { session: s } } = await supabase.auth.getSession();

      const { data, error } = await supabase.functions.invoke("digiflazz-topup", {
        body: {
          sku:      selectedProduct.sku,
          target:   userId,
          serverId: currentGame.need_server_id ? serverId : undefined,
        },
        headers: { Authorization: `Bearer ${s?.access_token}` },
      });

      if (error || data?.error) throw new Error(data?.error || error?.message);

      setTxResult(data);
      setPollAttempts(0);

      // FIX: pisahkan 3 outcome dengan jelas
      if (data.status === "success") {
        setStep("success");
      } else if (data.status === "failed") {
        setStep("failed");
      } else {
        // pending — mulai auto-poll
        setStep("pending");
      }

    } catch (err: any) {
      setTxResult({ ref_id: "", status: "failed", message: err.message });
      setStep("failed");
    } finally {
      setProcessing(false);
    }
  };

  // ── Cek status manual ─────────────────────────────────────────
  const handleCheckStatus = async () => {
    if (!txResult?.ref_id) return;
    setCheckingStatus(true);
    const { data } = await supabase
      .from("topup_game_transactions")
      .select("status, message, digiflazz_ref")
      .eq("id", txResult.ref_id)
      .single();
    if (data) {
      setTxResult(prev => ({ ...prev!, status: data.status, message: data.message }));
      if (data.status === "success") setStep("success");
      if (data.status === "failed")  setStep("failed");
      // kalau masih "pending", tetap di step "pending" — biarkan auto-poll lanjut
    }
    setCheckingStatus(false);
  };

  const handleReset = () => {
    setStep("form");
    setSelectedProduct(null);
    setUserId("");
    setServerId("");
    setTxResult(null);
    setPollAttempts(0);
  };

  // ── Processing screen ─────────────────────────────────────────
  if (step === "processing") {
    return (
      <div className="tu-page-center">
        <style>{STYLES}</style>
        <div style={{ textAlign:"center" }}>
          <Loader2 size={52} color="#DC2626" style={{ animation:"spin 1s linear infinite", marginBottom:24 }} />
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Memproses Top Up...
          </h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>
            Mengirim {selectedProduct?.name} ke akun {userId}{serverId ? ` (${serverId})` : ""}
          </p>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:12, marginTop:8 }}>
            Jangan tutup halaman ini
          </p>
        </div>
      </div>
    );
  }

  // ── Pending screen — FIX: layar baru, terpisah dari failed ────
  if (step === "pending") {
    const stillPolling = pollAttempts < POLL_MAX_ATTEMPTS;
    return (
      <div className="tu-page-center">
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:420 }}>
          <div style={{
            width:88, height:88, background:"rgba(245,158,11,0.12)",
            border:"1px solid rgba(245,158,11,0.3)", borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px",
            animation: stillPolling ? "pulse 1.6s ease-in-out infinite" : undefined,
          }}>
            <Hourglass size={40} color="#F59E0B" strokeWidth={1.5} />
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#F59E0B", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>
              Sedang Diproses
            </span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:30, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Top Up Dalam Antrian
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 6px" }}>
            {selectedProduct?.name} untuk akun <strong style={{ color:"#fff" }}>{userId}{serverId ? ` (${serverId})` : ""}</strong>
          </p>
          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:13, margin:"0 0 6px" }}>
            Digiflazz masih memproses transaksi ini. Saldo kamu <strong style={{ color:"#10B981" }}>sudah terpotong</strong> dan akan otomatis dikembalikan jika transaksi akhirnya gagal.
          </p>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:12, margin:"0 0 28px" }}>
            Ref: {txResult?.ref_id}
          </p>

          {stillPolling ? (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:20, color:"rgba(255,255,255,0.35)", fontSize:13 }}>
              <Loader2 size={14} style={{ animation:"spin 0.8s linear infinite" }} />
              Memeriksa status otomatis...
            </div>
          ) : (
            <button
              onClick={handleCheckStatus}
              disabled={checkingStatus}
              style={{ display:"flex", alignItems:"center", gap:6, margin:"0 auto 16px", background:"none", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"8px 16px", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:600 }}
            >
              <RefreshCw size={13} style={checkingStatus ? { animation:"spin 0.8s linear infinite" } : {}} />
              Cek Status Sekarang
            </button>
          )}

          <div>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width:"auto", padding:"12px 28px" }}>
              Top Up Lainnya
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Success screen ────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="tu-page-center">
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:420 }}>
          <div style={{ width:88, height:88, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <CheckCircle size={44} color="#10B981" strokeWidth={1.5} />
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#10B981", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Top Up Berhasil</span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:34, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Diamond Terkirim!
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 6px" }}>
            {selectedProduct?.name} berhasil masuk ke akun
          </p>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, margin:"0 0 6px" }}>
            ID: <strong style={{ color:"#fff" }}>{userId}{serverId ? ` (${serverId})` : ""}</strong>
          </p>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:12, margin:"0 0 28px" }}>
            Ref: {txResult?.ref_id}
          </p>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width:"auto", padding:"12px 28px" }}>
              <Zap size={15} fill="white" /> Top Up Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Failed screen ─────────────────────────────────────────────
  if (step === "failed") {
    return (
      <div className="tu-page-center">
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:420 }}>
          <div style={{ width:88, height:88, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <AlertCircle size={44} color="#DC2626" strokeWidth={1.5} />
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:34, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Top Up Gagal
          </h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 8px" }}>
            {txResult?.message || "Terjadi kesalahan saat memproses top up"}
          </p>
          <p style={{ color:"rgba(16,185,129,0.7)", fontSize:13, margin:"0 0 24px" }}>
            ✅ Saldo kamu sudah dikembalikan otomatis
          </p>

          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width:"auto", padding:"12px 28px" }}>
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Confirm screen ────────────────────────────────────────────
  if (step === "confirm") {
    return (
      <div className="tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-status-card tu-animate">
          <div style={{ height:3, background:"linear-gradient(90deg,#DC2626,#EA580C)" }} />
          <div style={{ padding:"24px 28px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.015)" }}>
            <button onClick={() => setStep("form")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:13, fontFamily:"'Barlow',sans-serif", marginBottom:14, padding:0 }}>
              <ArrowLeft size={14} /> Kembali
            </button>
            <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#fff", margin:0 }}>
              Konfirmasi Top Up
            </h2>
          </div>

          <div style={{ padding:"24px 28px" }}>
            {[
              { label:"Game",     value:`${currentGame.icon} ${currentGame.name}` },
              { label:"Item",     value:selectedProduct?.name },
              { label:"User ID",  value:`${userId}${serverId ? ` (${serverId})` : ""}` },
              { label:"Harga",    value:formatRupiah(selectedProduct?.price || 0) },
              { label:"Saldo",    value:formatRupiah(saldo) },
              { label:"Sisa",     value:formatRupiah(saldo - (selectedProduct?.price || 0)), green:true },
            ].map(row => (
              <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:13 }}>
                <span style={{ color:"rgba(255,255,255,0.4)" }}>{row.label}</span>
                <span style={{ color: (row as any).green ? "#10B981" : "rgba(255,255,255,0.85)", fontWeight:600 }}>{row.value}</span>
              </div>
            ))}

            <div style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"14px 16px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, margin:"16px 0" }}>
              <AlertCircle size={15} color="#F59E0B" style={{ flexShrink:0, marginTop:1 }} />
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", margin:0, lineHeight:1.6 }}>
                <strong style={{ color:"#F59E0B" }}>Penting:</strong> Pastikan User ID sudah benar. Kesalahan ID tidak dapat dikembalikan.
              </p>
            </div>

            <button onClick={handleProcess} className="tu-proceed-btn" disabled={processing}>
              <Zap size={16} fill="white" /> Konfirmasi & Bayar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────────
  return (
    <div className="tu-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="tu-hero">
        <div className="tu-hero-bg" /><div className="tu-hero-grid" /><div className="tu-hero-line" />
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <Zap size={11} color="#DC2626" fill="#DC2626" />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#DC2626", textTransform:"uppercase" as const, fontFamily:"'Barlow',sans-serif" }}>Top Up Game</span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"clamp(28px,4vw,40px)", fontWeight:700, color:"#fff", margin:"0 0 6px" }}>
            Top Up <span style={{ color:"#DC2626" }}>Instan</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 20px", fontFamily:"'Barlow',sans-serif" }}>
            Bayar pakai saldo OkeGass · Proses otomatis via DigiFlazz
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" as const }}>
            {[
              { icon:<Clock size={12}/>, label:"Proses < 1 Menit" },
              { icon:<Shield size={12}/>, label:"100% Aman" },
              { icon:<Wallet size={12}/>, label:"Bayar Pakai Saldo" },
            ].map(b => (
              <div key={b.label} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"6px 14px", fontSize:12, color:"rgba(255,255,255,0.5)", fontFamily:"'Barlow',sans-serif", fontWeight:600 }}>
                <span style={{ color:"#DC2626" }}>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 24px 60px" }}>
        <div className="tu-grid-main">

          {/* Left */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Step 1: Pilih Game */}
            <div className="tu-card tu-animate">
              <div className="tu-card-top" />
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div className="tu-step-num">1</div>
                <h2 className="tu-section-title">Pilih Game</h2>
              </div>
              <div className="tu-games-grid">
                {GAMES.map(game => (
                  <button
                    key={game.id}
                    className={`tu-game-btn ${selectedGame === game.id ? "active" : ""}`}
                    style={{ "--game-color": game.color } as React.CSSProperties}
                    onClick={() => { setSelectedGame(game.id); setSelectedProduct(null); }}
                  >
                    <div style={{ width:44, height:44, borderRadius:12, background: selectedGame === game.id ? game.color + "20" : "rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                      {game.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color: selectedGame === game.id ? "#fff" : "rgba(255,255,255,0.7)" }}>
                        {game.name}
                      </div>
                      <div style={{ fontSize:11, color: selectedGame === game.id ? game.color : "rgba(255,255,255,0.3)", marginTop:2, fontWeight:600 }}>
                        {game.currency}
                      </div>
                    </div>
                    {selectedGame === game.id && <CheckCircle size={15} color={game.color} style={{ marginLeft:"auto" }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: User ID */}
            <div className="tu-card tu-animate" style={{ animationDelay:"80ms" }}>
              <div className="tu-card-top" />
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div className="tu-step-num">2</div>
                <h2 className="tu-section-title">Masukkan User ID</h2>
              </div>
              <div style={{ display:"grid", gridTemplateColumns: currentGame.need_server_id ? "1fr 1fr" : "1fr", gap:14 }}>
                <div>
                  <div className="tu-input-label"><User size={11} /> User ID *</div>
                  <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Contoh: 123456789" className="tu-input" />
                </div>
                {currentGame.need_server_id && (
                  <div>
                    <div className="tu-input-label"><Hash size={11} /> Server ID *</div>
                    <input type="text" value={serverId} onChange={e => setServerId(e.target.value)} placeholder="Contoh: 1234" className="tu-input" />
                  </div>
                )}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, fontSize:12, color:"rgba(255,255,255,0.25)" }}>
                <AlertCircle size={12} /> Pastikan User ID benar sebelum melanjutkan
              </div>
            </div>

            {/* Step 3: Pilih Nominal */}
            <div className="tu-card tu-animate" style={{ animationDelay:"160ms" }}>
              <div className="tu-card-top" />
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div className="tu-step-num">3</div>
                <h2 className="tu-section-title">Pilih Nominal</h2>
              </div>

              {loadingProducts ? (
                <div style={{ display:"flex", justifyContent:"center", padding:"32px 0" }}>
                  <Loader2 size={28} color="#DC2626" style={{ animation:"spin 0.8s linear infinite" }} />
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px 0", color:"rgba(255,255,255,0.25)", fontSize:14 }}>
                  Produk belum tersedia untuk game ini
                </div>
              ) : (
                <div className="tu-denoms-grid">
                  {products.map(product => {
                    const active = selectedProduct?.id === product.id;
                    const enough = saldo >= product.price;
                    return (
                      <button
                        key={product.id}
                        className={`tu-denom-btn ${active ? "active" : ""}`}
                        onClick={() => setSelectedProduct(product)}
                        style={!enough ? { opacity:0.5 } : {}}
                      >
                        {product.is_popular && <div className="tu-popular-badge">Populer</div>}
                        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:14, fontWeight:700, color: active ? "#fff" : "rgba(255,255,255,0.75)", marginBottom:2 }}>
                          {product.name}
                        </div>
                        {product.bonus && product.bonus > 0
                          ? (
                            <div style={{ fontSize:11, color:"#10B981", fontWeight:600, marginBottom:4 }}>
                              +{product.bonus} Bonus
                            </div>
                          )
                          : null
                        }
                        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color: active ? "#DC2626" : "rgba(255,255,255,0.5)", marginTop:2 }}>
                          {formatRupiah(product.price)}
                        </div>
                        {!enough && (
                          <div style={{ fontSize:10, color:"#F59E0B", marginTop:4 }}>Saldo tidak cukup</div>
                        )}
                        {active && <CheckCircle size={13} color="#DC2626" style={{ position:"absolute", top:10, right:10 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="tu-summary">
              <div className="tu-summary-line" />
              <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:"0 0 16px" }}>
                Ringkasan
              </h3>

              {/* Saldo */}
              <div className="tu-saldo-bar">
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"rgba(16,185,129,0.7)" }}>
                  <Wallet size={13} /> Saldo OkeGass
                </div>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#10B981" }}>
                  {formatRupiah(saldo)}
                </div>
              </div>

              {[
                { label:"Game",  value:`${currentGame.icon} ${currentGame.name}` },
                { label:"User ID", value: userId || null },
                { label:"Item",  value: selectedProduct?.name || null },
              ].map(row => (
                <div className="tu-summary-row" key={row.label}>
                  <span style={{ color:"rgba(255,255,255,0.35)" }}>{row.label}</span>
                  <span style={{ color: row.value ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)", fontWeight:600, fontSize:13 }}>
                    {row.value || "Belum dipilih"}
                  </span>
                </div>
              ))}

              <div style={{ padding:"16px 0", borderTop:"1px solid rgba(255,255,255,0.08)", borderBottom:"1px solid rgba(255,255,255,0.08)", margin:"8px 0 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#fff" }}>Total</span>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#DC2626" }}>
                  {selectedProduct ? formatRupiah(selectedProduct.price) : "Rp 0"}
                </span>
              </div>

              {!user ? (
                <button onClick={() => setShowAuthModal(true)} className="tu-proceed-btn">
                  Login untuk Top Up
                </button>
              ) : !hasEnough && selectedProduct ? (
                <div>
                  <button className="tu-proceed-btn" disabled>Saldo Tidak Cukup</button>
                  <p style={{ textAlign:"center", fontSize:12, color:"rgba(245,158,11,0.7)", marginTop:10 }}>
                    Butuh tambahan {formatRupiah(selectedProduct.price - saldo)}
                  </p>
                </div>
              ) : (
                <button
                  className="tu-proceed-btn"
                  disabled={!userId || !selectedProduct || !hasEnough}
                  onClick={() => setStep("confirm")}
                >
                  Lanjut ke Konfirmasi <ChevronRight size={16} />
                </button>
              )}

              <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { icon:<Shield size={12} color="#10B981"/>, label:"Diproses via DigiFlazz" },
                  { icon:<Clock size={12} color="#3B82F6"/>, label:"Otomatis 24/7" },
                  { icon:<Wallet size={12} color="#A78BFA"/>, label:"Bayar pakai saldo OkeGass" },
                ].map(b => (
                  <div key={b.label} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"rgba(255,255,255,0.3)" }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}