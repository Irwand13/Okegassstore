import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Smartphone, Zap, Wallet, CheckCircle2, ArrowRight,
  AlertCircle, Loader2, RefreshCw, Hourglass,
  ChevronRight, Shield, Clock, CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────
type TabId   = "pulsa" | "pln" | "ewallet";
type SubMode = "pulsa" | "data";
type Product = {
  id: string; sku: string; name: string;
  price: number; bonus?: number; is_popular?: boolean; game_id: string;
};

// ─── Config ───────────────────────────────────────────────────────
const OPERATORS = [
  { id: "telkomsel", label: "Telkomsel", color: "#EF4444" },
  { id: "xl",        label: "XL Axiata", color: "#3B82F6" },
  { id: "indosat",   label: "Indosat",   color: "#F59E0B" },
  { id: "tri",       label: "Tri",       color: "#8B5CF6" },
  { id: "smartfren", label: "Smartfren", color: "#10B981" },
  { id: "axis",      label: "Axis",      color: "#EC4899" },
];

const EWALLETS = [
  { id: "gopay",     label: "GoPay"     },
  { id: "ovo",       label: "OVO"       },
  { id: "dana",      label: "DANA"      },
  { id: "shopeepay", label: "ShopeePay" },
  { id: "linkaja",   label: "LinkAja"   },
  { id: "jenius",    label: "Jenius"    },
];

const TABS: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: "pulsa",   label: "Pulsa & Data",  icon: "📶", color: "#3B82F6" },
  { id: "pln",     label: "Token PLN",     icon: "⚡", color: "#F59E0B" },
  { id: "ewallet", label: "E-Wallet",      icon: "💳", color: "#10B981" },
];

const fmtRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

const POLL_INTERVAL_MS  = 5000;
const POLL_MAX_ATTEMPTS = 24;

// ─── Styles ───────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.tp-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; color: #fff; padding-bottom: 80px; }

/* Hero */
.tp-hero { position: relative; padding: 44px 0 40px; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.05); }
.tp-hero-bg  { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(245,158,11,0.06) 50%, transparent 100%); }
.tp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px); background-size: 40px 40px; }
.tp-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent); }

/* Container */
.tp-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* Layout */
.tp-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start; margin-top: 32px; }
@media(max-width:920px) { .tp-layout { grid-template-columns: 1fr; } }

/* Tabs */
.tp-tabs { display: flex; gap: 6px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 6px; margin-top: 32px; }
.tp-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 16px; border-radius: 9px; font-size: 13px; font-weight: 700; border: 1px solid transparent; cursor: pointer; transition: all 0.22s; background: transparent; color: rgba(255,255,255,0.38); font-family: 'Barlow', sans-serif; }
.tp-tab:hover:not(.active) { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.65); }
.tp-tab.active { color: #fff; }

/* Card */
.tp-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 28px; position: relative; overflow: hidden; }
.tp-card-top { position: absolute; top: 0; left: 20px; right: 20px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); }
.tp-card-title { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 22px; }

/* Step badge */
.tp-step { width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #DC2626, #EA580C); display: flex; align-items: center; justify-content: center; font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; box-shadow: 0 4px 12px rgba(220,38,38,0.35); }

/* Labels */
.tp-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 10px; }

/* Grid provider/operator buttons */
.tp-grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 22px; }
@media(max-width:500px) { .tp-grid3 { grid-template-columns: repeat(2,1fr); } }
.tp-op-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 700; font-family: 'Barlow', sans-serif; }
.tp-op-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }

/* Nominal / denom buttons */
.tp-nom-btn { position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 14px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.2s; font-family: 'Barlow', sans-serif; text-align: center; overflow: hidden; }
.tp-nom-btn:hover:not(.active) { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }
.tp-nom-btn.active::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--nom-color,#DC2626),transparent); }
.tp-nom-val   { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.8); }
.tp-nom-price { font-size: 10px; color: rgba(255,255,255,0.32); font-weight: 500; }
.tp-nom-bonus { font-size: 10px; color: #10B981; font-weight: 600; }
.tp-nom-popular { position: absolute; top: -1px; right: 10px; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 0 0 6px 6px; background: linear-gradient(135deg,#DC2626,#EA580C); color: #fff; text-transform: uppercase; white-space: nowrap; }

/* Submode toggle */
.tp-mode-toggle { display: flex; gap: 6px; margin-bottom: 22px; background: rgba(255,255,255,0.04); border-radius: 9px; padding: 4px; border: 1px solid rgba(255,255,255,0.06); }
.tp-mode-btn { flex: 1; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 700; border: 1px solid transparent; cursor: pointer; transition: all 0.2s; background: transparent; color: rgba(255,255,255,0.38); font-family: 'Barlow', sans-serif; }
.tp-mode-btn.active { background: rgba(59,130,246,0.18); color: #60A5FA; border-color: rgba(59,130,246,0.3); }

/* Input */
.tp-input { width: 100%; padding: 13px 16px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); color: #fff; font-size: 14px; font-family: 'Barlow', sans-serif; outline: none; transition: all 0.2s; }
.tp-input:focus { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.07); }
.tp-input::placeholder { color: rgba(255,255,255,0.2); }

/* Summary */
.tp-summary { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 24px; position: sticky; top: 88px; overflow: hidden; }
.tp-summary-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
.tp-sum-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
.tp-sum-row:last-of-type { border-bottom: none; }

/* CTA */
.tp-cta { width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.25s; margin-top: 18px; box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
.tp-cta:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; transform: none !important; }
.tp-cta:not(:disabled):hover { transform: translateY(-1px); }

/* Status pages */
.tp-page-center { min-height: 100vh; background: #0d0d0f; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; font-family: 'Barlow', sans-serif; color: #fff; }
.tp-icon-circle { width: 88px; height: 88px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid; margin: 0 auto 24px; }
.tp-ghost-btn { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 0 auto 12px; background: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; color: rgba(255,255,255,0.5); cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; }

@keyframes spin    { to { transform: rotate(360deg); } }
@keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
@keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.spin    { animation: spin 0.8s linear infinite; }
.pulse   { animation: pulse 1.6s ease-in-out infinite; }
.fadeUp  { animation: fadeUp 0.35s ease forwards; }
`;

// ─── Component ────────────────────────────────────────────────────
export default function TopUpPulsaPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Tab & sub-selections
  const [tab,      setTab]      = useState<TabId>("pulsa");
  const [subMode,  setSubMode]  = useState<SubMode>("pulsa");
  const [operator, setOperator] = useState("");
  const [ewallet,  setEwallet]  = useState("");
  const [phone,    setPhone]    = useState("");
  const [meter,    setMeter]    = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products
  const [products,        setProducts]        = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Flow
  const [step,           setStep]           = useState<"form" | "confirm" | "processing" | "success" | "pending" | "failed">("form");
  const [loading,        setLoading]        = useState(false);
  const [txResult,       setTxResult]       = useState<{ ref_id: string; status: string; message?: string } | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [pollAttempts,   setPollAttempts]   = useState(0);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Balance
  const [balance,           setBalance]           = useState(profile?.balance ?? 0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("balance").eq("id", user.id).single()
      .then(({ data }) => { if (data) setBalance(data.balance); });
  }, [user]);

  // ── Resolve game_id ──────────────────────────────────────────
  function resolveGameId(): string {
    if (tab === "pulsa")   return operator ? (subMode === "data" ? `data-${operator}` : operator) : "";
    if (tab === "pln")     return "pln";
    if (tab === "ewallet") return ewallet || "";
    return "";
  }

  // ── Fetch products ───────────────────────────────────────────
  useEffect(() => {
    const gameId = resolveGameId();
    if (!gameId) { setProducts([]); return; }
    setLoadingProducts(true);
    setSelectedProduct(null);
    supabase
      .from("topup_products")
      .select("*")
      .eq("game_id", gameId)
      .eq("is_active", true)
      .order("price", { ascending: true })
      .then(({ data }) => {
        setProducts(data || []);
        setLoadingProducts(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, subMode, operator, ewallet]);

  // ── Auto-poll pending ────────────────────────────────────────
  useEffect(() => {
    if (step !== "pending" || !txResult?.ref_id) {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      return;
    }
    pollTimerRef.current = setInterval(async () => {
      setPollAttempts(prev => {
        const next = prev + 1;
        if (next >= POLL_MAX_ATTEMPTS && pollTimerRef.current) clearInterval(pollTimerRef.current);
        return next;
      });
      const { data } = await supabase
        .from("topup_game_transactions")
        .select("status, message")
        .eq("id", txResult.ref_id)
        .single();
      if (data && data.status !== "pending") {
        setTxResult(prev => ({ ...prev!, status: data.status, message: data.message }));
        setStep(data.status === "success" ? "success" : "failed");
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      }
    }, POLL_INTERVAL_MS);
    return () => { if (pollTimerRef.current) clearInterval(pollTimerRef.current); };
  }, [step, txResult?.ref_id]);

  // ── Helpers ──────────────────────────────────────────────────
  const customerNo = () => (tab === "pln" ? meter : phone);
  const activeColor = TABS.find(t => t.id === tab)?.color ?? "#3B82F6";

  const canOrder = () => {
    if (!selectedProduct) return false;
    if (tab === "pulsa")   return !!operator && phone.length >= 10;
    if (tab === "pln")     return meter.length >= 11;
    if (tab === "ewallet") return !!ewallet && phone.length >= 10;
    return false;
  };

  const isShort = !!selectedProduct && balance < selectedProduct.price;

  const switchTab = (t: TabId) => {
    setTab(t);
    setOperator(""); setEwallet(""); setPhone(""); setMeter("");
    setSelectedProduct(null); setInsufficientFunds(false); setStep("form");
  };

  const resetForm = () => {
    setStep("form");
    setOperator(""); setEwallet(""); setPhone(""); setMeter("");
    setSelectedProduct(null); setTxResult(null);
    setInsufficientFunds(false); setPollAttempts(0);
  };

  // ── Process ──────────────────────────────────────────────────
  const handleOrder = async () => {
    if (!canOrder() || !user || !selectedProduct) return;
    if (balance < selectedProduct.price) { setInsufficientFunds(true); return; }
    setInsufficientFunds(false);
    setLoading(true);
    setStep("processing");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke("digiflazz-topup", {
        body: { sku: selectedProduct.sku, target: customerNo() },
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      setTxResult(data);
      setPollAttempts(0);
      if (data.status === "success") {
        const { data: prof } = await supabase.from("profiles").select("balance").eq("id", user.id).single();
        if (prof) setBalance(prof.balance);
        setStep("success");
      } else if (data.status === "failed") {
        setStep("failed");
      } else {
        setStep("pending");
      }
    } catch (err: any) {
      setTxResult({ ref_id: "", status: "failed", message: err.message });
      setStep("failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!txResult?.ref_id) return;
    setCheckingStatus(true);
    const { data } = await supabase
      .from("topup_game_transactions")
      .select("status, message")
      .eq("id", txResult.ref_id)
      .single();
    if (data) {
      setTxResult(prev => ({ ...prev!, status: data.status, message: data.message }));
      if (data.status === "success") setStep("success");
      if (data.status === "failed")  setStep("failed");
    }
    setCheckingStatus(false);
  };

  // ─── Status Screens ──────────────────────────────────────────

  if (step === "processing") return (
    <div className="tp-page-center">
      <style>{STYLES}</style>
      <Loader2 size={52} color="#DC2626" style={{ animation:"spin 1s linear infinite", marginBottom:24 }} />
      <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>Memproses...</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>Jangan tutup halaman ini</p>
    </div>
  );

  if (step === "pending") {
    const stillPolling = pollAttempts < POLL_MAX_ATTEMPTS;
    return (
      <div className="tp-page-center">
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:420 }}>
          <div className={`tp-icon-circle ${stillPolling ? "pulse" : ""}`}
            style={{ borderColor:"rgba(245,158,11,0.3)", background:"rgba(245,158,11,0.1)" }}>
            <Hourglass size={38} color="#F59E0B" strokeWidth={1.5} />
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#F59E0B", textTransform:"uppercase", letterSpacing:"0.1em" }}>Sedang Diproses</span>
          </div>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>Top Up Dalam Antrian</h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, margin:"0 0 6px" }}>{selectedProduct?.name} ke {customerNo()}</p>
          <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, margin:"0 0 6px" }}>Saldo sudah terpotong dan akan otomatis dikembalikan jika gagal.</p>
          <p style={{ color:"rgba(255,255,255,0.2)", fontSize:11, margin:"0 0 24px" }}>Ref: {txResult?.ref_id}</p>
          {stillPolling ? (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:20, color:"rgba(255,255,255,0.35)", fontSize:13 }}>
              <Loader2 size={14} className="spin" /> Memeriksa status otomatis...
            </div>
          ) : (
            <button onClick={handleCheckStatus} disabled={checkingStatus} className="tp-ghost-btn">
              <RefreshCw size={13} className={checkingStatus ? "spin" : ""} /> Cek Status Manual
            </button>
          )}
          <button onClick={resetForm} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:13, borderRadius:11, border:"1px solid rgba(245,158,11,0.35)", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, background:"rgba(245,158,11,0.12)", color:"#F59E0B" }}>
            Top Up Lainnya
          </button>
        </div>
      </div>
    );
  }

  if (step === "success") return (
    <div className="tp-page-center">
      <style>{STYLES}</style>
      <div style={{ textAlign:"center", maxWidth:420 }}>
        <div className="tp-icon-circle" style={{ borderColor:"rgba(16,185,129,0.3)", background:"rgba(16,185,129,0.1)" }}>
          <CheckCircle size={44} color="#10B981" strokeWidth={1.5} />
        </div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
          <span style={{ fontSize:11, fontWeight:700, color:"#10B981", textTransform:"uppercase", letterSpacing:"0.1em" }}>Berhasil</span>
        </div>
        <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:30, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>Transaksi Sukses!</h2>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, margin:"0 0 4px" }}>{selectedProduct?.name} berhasil dikirim ke {customerNo()}</p>
        <p style={{ color:"rgba(255,255,255,0.2)", fontSize:11, margin:"0 0 24px" }}>Ref: {txResult?.ref_id}</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", borderRadius:10, marginBottom:16, background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.2)" }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>Saldo tersisa</span>
          <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#10B981" }}>{fmtRp(balance)}</span>
        </div>
        <button onClick={resetForm} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:13, borderRadius:11, border:"1px solid rgba(16,185,129,0.35)", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, background:"rgba(16,185,129,0.12)", color:"#10B981" }}>
          Transaksi Baru
        </button>
      </div>
    </div>
  );

  if (step === "failed") return (
    <div className="tp-page-center">
      <style>{STYLES}</style>
      <div style={{ textAlign:"center", maxWidth:420 }}>
        <div className="tp-icon-circle" style={{ borderColor:"rgba(220,38,38,0.3)", background:"rgba(220,38,38,0.1)" }}>
          <AlertCircle size={44} color="#DC2626" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:30, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>Top Up Gagal</h2>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, margin:"0 0 8px" }}>{txResult?.message || "Terjadi kesalahan"}</p>
        <p style={{ color:"rgba(16,185,129,0.7)", fontSize:13, margin:"0 0 24px" }}>✅ Saldo dikembalikan otomatis</p>
        <button onClick={resetForm} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:13, borderRadius:11, border:"none", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, background:"linear-gradient(135deg,#DC2626cc,#DC262688)", color:"#fff" }}>
          Coba Lagi
        </button>
      </div>
    </div>
  );

  // ─── Confirm Screen ──────────────────────────────────────────
  if (step === "confirm") {
    const confirmRows = [
      { label: "Layanan",   value: TABS.find(t => t.id === tab)?.label ?? "" },
      ...(tab === "pulsa" ? [{ label: "Operator", value: OPERATORS.find(o => o.id === operator)?.label ?? "" }] : []),
      ...(tab === "ewallet" ? [{ label: "E-Wallet", value: EWALLETS.find(e => e.id === ewallet)?.label ?? "" }] : []),
      { label: "Produk",   value: selectedProduct?.name ?? "" },
      { label: "Tujuan",   value: customerNo() },
      { label: "Harga",    value: fmtRp(selectedProduct?.price ?? 0) },
      { label: "Saldo",    value: fmtRp(balance) },
      { label: "Sisa",     value: fmtRp(balance - (selectedProduct?.price ?? 0)), green: true },
    ];
    return (
      <div className="tp-page-center">
        <style>{STYLES}</style>
        <div className="fadeUp" style={{ width:"100%", maxWidth:460, background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
          <div style={{ height:3, background:`linear-gradient(90deg,${activeColor},${activeColor}88)` }} />
          <div style={{ padding:"22px 28px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.015)" }}>
            <button onClick={() => setStep("form")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.35)", fontSize:13, fontFamily:"'Barlow',sans-serif", marginBottom:14, padding:0 }}>
              ← Kembali
            </button>
            <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#fff", margin:0 }}>Konfirmasi Pesanan</h2>
          </div>
          <div style={{ padding:"22px 28px 28px" }}>
            {confirmRows.map(row => (
              <div key={row.label} className="tp-sum-row">
                <span style={{ color:"rgba(255,255,255,0.35)" }}>{row.label}</span>
                <span style={{ color:(row as any).green ? "#10B981" : "rgba(255,255,255,0.85)", fontWeight:600 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"12px 14px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, margin:"16px 0" }}>
              <AlertCircle size={14} color="#F59E0B" style={{ flexShrink:0, marginTop:1 }} />
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", margin:0, lineHeight:1.6 }}>
                <strong style={{ color:"#F59E0B" }}>Penting:</strong> Pastikan nomor/ID tujuan sudah benar. Kesalahan tidak dapat dikembalikan.
              </p>
            </div>
            <button
              onClick={handleOrder}
              disabled={loading}
              className="tp-cta"
              style={{ background:`linear-gradient(135deg,${activeColor}cc,${activeColor}88)`, color:"#fff", boxShadow:`0 6px 20px ${activeColor}33` }}
            >
              {loading ? <><Loader2 size={16} className="spin" /> Memproses...</> : <>Konfirmasi & Bayar <ArrowRight size={16} /></>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Form ────────────────────────────────────────────────
  const showNominals = () => {
    if (tab === "pulsa" && !operator) return false;
    if (tab === "ewallet" && !ewallet) return false;
    return true;
  };

  return (
    <div className="tp-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="tp-hero">
        <div className="tp-hero-bg" />
        <div className="tp-hero-grid" />
        <div className="tp-hero-line" />
        <div className="tp-inner" style={{ position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <Smartphone size={11} color="#3B82F6" />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#3B82F6", textTransform:"uppercase", fontFamily:"'Barlow',sans-serif" }}>Pulsa · PLN · E-Wallet</span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:700, color:"#fff", margin:"0 0 8px" }}>
            Top Up <span style={{ color: activeColor }}>Instan</span>
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.6, marginBottom:20 }}>
            Bayar pakai saldo OkeGass · Proses otomatis 24 jam
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { icon:<Clock size={12}/>, label:"Proses Cepat" },
              { icon:<Shield size={12}/>, label:"100% Aman" },
              { icon:<Wallet size={12}/>, label:"Bayar Pakai Saldo" },
            ].map(b => (
              <div key={b.label} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"6px 14px", fontSize:12, color:"rgba(255,255,255,0.45)", fontFamily:"'Barlow',sans-serif", fontWeight:600 }}>
                <span style={{ color: activeColor }}>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tp-inner">
        {/* Tabs — internal, no navigation */}
        <div className="tp-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tp-tab ${tab === t.id ? "active" : ""}`}
              style={tab === t.id ? { background:`${t.color}1A`, borderColor:`${t.color}44`, color: t.color } : {}}
              onClick={() => switchTab(t.id)}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="tp-layout">

          {/* ── LEFT: Form ─────────────────────────────────────── */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* ── PULSA & DATA ── */}
            {tab === "pulsa" && (
              <div className="tp-card fadeUp">
                <div className="tp-card-top" />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div className="tp-step">1</div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:0 }}>Pilih Jenis & Operator</h2>
                </div>

                {/* Pulsa / Data toggle */}
                <div className="tp-mode-toggle">
                  <button className={`tp-mode-btn ${subMode==="pulsa"?"active":""}`}
                    onClick={() => { setSubMode("pulsa"); setSelectedProduct(null); }}>📶 Pulsa</button>
                  <button className={`tp-mode-btn ${subMode==="data"?"active":""}`}
                    onClick={() => { setSubMode("data"); setSelectedProduct(null); }}>📡 Paket Data</button>
                </div>

                <div className="tp-label">Pilih Operator</div>
                <div className="tp-grid3">
                  {OPERATORS.map(op => (
                    <button key={op.id}
                      className={`tp-op-btn ${operator===op.id?"active":""}`}
                      style={operator===op.id ? { borderColor:`${op.color}60`, background:`${op.color}15`, color:"#fff" } : {}}
                      onClick={() => { setOperator(op.id); setSelectedProduct(null); }}>
                      {operator===op.id && <CheckCircle2 size={11} color={op.color} style={{ position:"absolute" as any, top:6, right:6 }} />}
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── PLN ── */}
            {tab === "pln" && (
              <div className="tp-card fadeUp">
                <div className="tp-card-top" />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div className="tp-step">1</div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:0 }}>Nomor Meter / ID Pelanggan</h2>
                </div>
                <input className="tp-input" type="text" placeholder="Contoh: 12345678910"
                  value={meter} onChange={e => setMeter(e.target.value.replace(/\D/g,""))} maxLength={13}
                  style={{ borderColor: meter.length >= 11 ? "rgba(245,158,11,0.4)" : undefined }} />
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.25)", marginTop:8 }}>Masukkan 11–13 digit nomor meter PLN kamu</p>
              </div>
            )}

            {/* ── E-WALLET ── */}
            {tab === "ewallet" && (
              <div className="tp-card fadeUp">
                <div className="tp-card-top" />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div className="tp-step">1</div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:0 }}>Pilih E-Wallet</h2>
                </div>
                <div className="tp-grid3">
                  {EWALLETS.map(ew => (
                    <button key={ew.id}
                      className={`tp-op-btn ${ewallet===ew.id?"active":""}`}
                      style={ewallet===ew.id ? { borderColor:`${activeColor}60`, background:`${activeColor}15`, color:"#fff" } : {}}
                      onClick={() => { setEwallet(ew.id); setSelectedProduct(null); }}>
                      {ew.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Pilih Nominal (semua tab) ── */}
            {showNominals() && (
              <div className="tp-card fadeUp">
                <div className="tp-card-top" />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div className="tp-step">2</div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:0 }}>
                    {tab === "pln" ? "Pilih Nominal Token" : tab === "ewallet" ? "Pilih Nominal" : subMode === "data" ? "Pilih Paket Data" : "Pilih Nominal Pulsa"}
                  </h2>
                </div>
                {loadingProducts ? (
                  <div style={{ display:"flex", justifyContent:"center", padding:"32px 0" }}>
                    <Loader2 size={28} color="#DC2626" className="spin" />
                  </div>
                ) : products.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"28px 0", color:"rgba(255,255,255,0.25)", fontSize:13 }}>
                    Belum ada produk untuk kategori ini. Tambahkan lewat admin panel.
                  </div>
                ) : (
                  <div className="tp-grid3">
                    {products.map(p => {
                      const active = selectedProduct?.id === p.id;
                      return (
                        <button key={p.id}
                          className={`tp-nom-btn ${active?"active":""}`}
                          style={active
                            ? { borderColor:`${activeColor}55`, background:`${activeColor}12`, ["--nom-color" as any]: activeColor }
                            : {}}
                          onClick={() => setSelectedProduct(p)}>
                          {p.is_popular && <div className="tp-nom-popular">Populer</div>}
                          {active && <CheckCircle2 size={12} color={activeColor} style={{ position:"absolute" as any, top:8, right:8 }} />}
                          <span className="tp-nom-val" style={active ? { color:activeColor } : {}}>{p.name}</span>
                          {p.bonus && p.bonus > 0 ? <span className="tp-nom-bonus">+{p.bonus} Bonus</span> : null}
                          <span className="tp-nom-price">{fmtRp(p.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── Step 3: Nomor Tujuan (pulsa & ewallet) ── */}
            {(tab === "pulsa" || tab === "ewallet") && (
              <div className="tp-card fadeUp">
                <div className="tp-card-top" />
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <div className="tp-step">{tab === "ewallet" ? 3 : 3}</div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:0 }}>
                    {tab === "ewallet" ? "Nomor HP / Akun E-Wallet" : "Nomor HP Tujuan"}
                  </h2>
                </div>
                <input className="tp-input" type="tel"
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g,""))}
                  maxLength={14}
                  style={{ borderColor: phone.length >= 10 ? `${activeColor}44` : undefined }}
                />
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.22)", marginTop:8 }}>
                  <AlertCircle size={11} style={{ verticalAlign:"middle", marginRight:4 }} />
                  Pastikan nomor sudah benar sebelum melanjutkan
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: Summary ─────────────────────────────────── */}
          <div>
            <div className="tp-summary">
              <div className="tp-summary-line" style={{ background:`linear-gradient(90deg,${activeColor},${activeColor}66)` }} />

              <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:"#fff", margin:"0 0 16px" }}>
                Ringkasan Pesanan
              </h3>

              {/* Saldo */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, marginBottom:14,
                background: isShort ? "rgba(248,113,113,0.06)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isShort ? "rgba(248,113,113,0.35)" : "rgba(255,255,255,0.07)"}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Wallet size={13} color={isShort ? "#F87171" : activeColor} />
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:600 }}>Saldo OkeGass</span>
                </div>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700, color: isShort ? "#F87171" : "#fff" }}>
                  {fmtRp(balance)}
                </span>
              </div>

              {insufficientFunds && (
                <div style={{ display:"flex", gap:8, padding:"10px 12px", borderRadius:9, marginBottom:14,
                  background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.3)", fontSize:12, color:"#F87171" }}>
                  <AlertCircle size={13} style={{ flexShrink:0 }} />
                  <span>Saldo tidak cukup.{" "}
                    <button onClick={() => navigate("/wallet")}
                      style={{ background:"none", border:"none", cursor:"pointer", color:"#DC2626", fontWeight:700, fontSize:12, textDecoration:"underline" }}>
                      Top Up dulu →
                    </button>
                  </span>
                </div>
              )}

              {/* Summary rows */}
              {selectedProduct ? (
                <>
                  <div className="tp-sum-row">
                    <span style={{ color:"rgba(255,255,255,0.35)" }}>Layanan</span>
                    <span style={{ fontWeight:700, color:"rgba(255,255,255,0.8)", fontSize:13 }}>
                      {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
                    </span>
                  </div>
                  {tab === "pulsa" && operator && (
                    <div className="tp-sum-row">
                      <span style={{ color:"rgba(255,255,255,0.35)" }}>Operator</span>
                      <span style={{ fontWeight:700, color:"rgba(255,255,255,0.8)", fontSize:13 }}>{OPERATORS.find(o => o.id === operator)?.label}</span>
                    </div>
                  )}
                  {tab === "ewallet" && ewallet && (
                    <div className="tp-sum-row">
                      <span style={{ color:"rgba(255,255,255,0.35)" }}>E-Wallet</span>
                      <span style={{ fontWeight:700, color:"rgba(255,255,255,0.8)", fontSize:13 }}>{EWALLETS.find(e => e.id === ewallet)?.label}</span>
                    </div>
                  )}
                  <div className="tp-sum-row">
                    <span style={{ color:"rgba(255,255,255,0.35)" }}>Produk</span>
                    <span style={{ fontWeight:700, color:"rgba(255,255,255,0.8)", fontSize:13 }}>{selectedProduct.name}</span>
                  </div>
                  <div className="tp-sum-row">
                    <span style={{ color:"rgba(255,255,255,0.35)" }}>Tujuan</span>
                    <span style={{ fontWeight:700, color:"rgba(255,255,255,0.8)", fontSize:13 }}>{customerNo() || "—"}</span>
                  </div>
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:14, marginTop:6, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#fff" }}>Total</span>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, color: isShort ? "#F87171" : activeColor }}>
                      {fmtRp(selectedProduct.price)}
                    </span>
                  </div>
                  {!isShort && (
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"rgba(255,255,255,0.22)", marginTop:6, marginBottom:2 }}>
                      <span>Saldo setelah bayar</span>
                      <span>{fmtRp(balance - selectedProduct.price)}</span>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign:"center", padding:"28px 0", fontSize:13, color:"rgba(255,255,255,0.18)" }}>
                  Pilih layanan &amp; nominal
                </div>
              )}

              <button
                className="tp-cta"
                disabled={!canOrder() || loading}
                style={{
                  background: canOrder() ? `linear-gradient(135deg,${activeColor}cc,${activeColor}88)` : "rgba(255,255,255,0.06)",
                  color: canOrder() ? "#fff" : "rgba(255,255,255,0.22)",
                  boxShadow: canOrder() ? `0 6px 20px ${activeColor}33` : "none",
                }}
                onClick={() => setStep("confirm")}
              >
                {loading
                  ? <><Loader2 size={16} className="spin" /> Memproses...</>
                  : <>Lanjut Konfirmasi <ChevronRight size={16} /></>
                }
              </button>

              {/* Trust badges */}
              <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:7 }}>
                {[
                  { icon:<Shield size={11} color="#10B981"/>, label:"Diproses via Digiflazz" },
                  { icon:<Clock size={11} color="#3B82F6"/>, label:"Otomatis 24/7" },
                  { icon:<Wallet size={11} color="#A78BFA"/>, label:"Bayar pakai saldo OkeGass" },
                ].map(b => (
                  <div key={b.label} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"rgba(255,255,255,0.27)" }}>
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