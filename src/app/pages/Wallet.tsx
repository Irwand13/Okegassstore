import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Wallet, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Plus, Minus, Clock, CheckCircle, XCircle, Shield,
  TrendingUp, Zap, ChevronRight, Copy, RefreshCw,
  Building2, CreditCard, Smartphone, AlertCircle, X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";

// ─── TYPES ────────────────────────────────────────────────────────
type TxType = "topup" | "spend" | "refund" | "bonus" | "withdrawal";
type TxStatus = "success" | "pending" | "failed";

interface WalletLog {
  id: string;
  action: TxType;
  amount: number;
  balance_before: number;
  balance_after: number;
  note: string | null;
  created_at: string;
  order_id: string | null;
}

type ModalType = "topup" | "withdraw" | null;

// ─── HELPERS ──────────────────────────────────────────────────────
const formatRp = (n: number) =>
  "Rp " + Math.abs(n).toLocaleString("id-ID");

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const txConfig: Record<TxType, {
  label: string; icon: React.ReactNode;
  color: string; bg: string; border: string; sign: "+" | "-";
}> = {
  topup:      { label: "Top Up",     icon: <ArrowDownLeft size={15} />,  color: "#10B981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)",  sign: "+" },
  spend:      { label: "Pembayaran", icon: <ArrowUpRight size={15} />,   color: "#F87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", sign: "-" },
  refund:     { label: "Refund",     icon: <RefreshCw size={15} />,      color: "#60A5FA", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.25)",  sign: "+" },
  bonus:      { label: "Bonus",      icon: <Zap size={15} />,            color: "#FBBF24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.25)",  sign: "+" },
  withdrawal: { label: "Penarikan",  icon: <Building2 size={15} />,      color: "#C084FC", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.25)", sign: "-" },
};

const TOPUP_AMOUNTS = [25000, 50000, 100000, 200000, 500000, 1000000];

const PAYMENT_METHODS = [
  { id: "gopay",    name: "GoPay",    emoji: "💚", cat: "E-Wallet" },
  { id: "ovo",      name: "OVO",      emoji: "💜", cat: "E-Wallet" },
  { id: "dana",     name: "DANA",     emoji: "💙", cat: "E-Wallet" },
  { id: "qris",     name: "QRIS",     emoji: "📱", cat: "QR Code" },
  { id: "bca",      name: "BCA VA",   emoji: "🏦", cat: "Bank Transfer" },
  { id: "bni",      name: "BNI VA",   emoji: "🏦", cat: "Bank Transfer" },
  { id: "bri",      name: "BRI VA",   emoji: "🏦", cat: "Bank Transfer" },
  { id: "mandiri",  name: "Mandiri",  emoji: "🏦", cat: "Bank Transfer" },
];

const WITHDRAW_BANKS = [
  { id: "bca",     name: "BCA" },
  { id: "bni",     name: "BNI" },
  { id: "bri",     name: "BRI" },
  { id: "mandiri", name: "Mandiri" },
  { id: "cimb",    name: "CIMB Niaga" },
  { id: "danamon", name: "Danamon" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.wl-root { min-height:100vh; background:#0d0d0f; font-family:'Barlow',sans-serif; }

/* Hero */
.wl-hero { position:relative; padding:40px 0 0; overflow:hidden; }
.wl-hero-bg { position:absolute;inset:0; background:linear-gradient(135deg,rgba(220,38,38,0.1) 0%,rgba(192,132,252,0.06) 60%,transparent 100%); }
.wl-hero-grid { position:absolute;inset:0; background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px); background-size:40px 40px; }

/* Balance card */
.wl-balance-card {
  position:relative;
  background:linear-gradient(135deg,rgba(220,38,38,0.15) 0%,rgba(234,88,12,0.08) 50%,rgba(192,132,252,0.06) 100%);
  border:1px solid rgba(220,38,38,0.25);
  border-radius:24px;
  padding:32px 36px;
  overflow:hidden;
  margin-bottom:20px;
}
.wl-balance-card::before { content:''; position:absolute; top:0;left:0;right:0;height:2px; background:linear-gradient(90deg,#DC2626,#EA580C,#C084FC); }
.wl-balance-glow { position:absolute; top:-40px;right:-40px; width:200px;height:200px; border-radius:50%; background:rgba(220,38,38,0.08); filter:blur(60px); pointer-events:none; }

/* Stat cards */
.wl-stat { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:20px; flex:1; }

/* Action buttons */
.wl-action-btn {
  display:flex; align-items:center; justify-content:center; flex-direction:column; gap:6px;
  padding:16px 12px; border-radius:14px; cursor:pointer; transition:all 0.22s ease;
  border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); flex:1;
}
.wl-action-btn:hover { transform:translateY(-3px); }

/* Main card */
.wl-card { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:18px; overflow:hidden; }
.wl-card-header { padding:20px 24px; border-bottom:1px solid rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:space-between; }

/* TX item */
.wl-tx-item { display:flex; align-items:center; gap:14px; padding:14px 24px; border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; cursor:pointer; }
.wl-tx-item:last-child { border-bottom:none; }
.wl-tx-item:hover { background:rgba(255,255,255,0.02); }
.wl-tx-icon { width:40px;height:40px; border-radius:12px; display:flex;align-items:center;justify-content:center; flex-shrink:0; }

/* Modal */
.wl-modal-overlay { position:fixed;inset:0;z-index:60; display:flex;align-items:center;justify-content:center;padding:16px; }
.wl-modal-bg { position:absolute;inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(10px); }
.wl-modal { position:relative;width:100%;max-width:480px;max-height:90vh;overflow-y:auto; background:#121216; border:1px solid rgba(255,255,255,0.08); border-radius:24px; }
.wl-modal-top-line { height:2px; background:linear-gradient(90deg,#DC2626,#EA580C); border-radius:24px 24px 0 0; }

/* Amount chips */
.wl-amount-chip { padding:10px 0; border-radius:10px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700; color:rgba(255,255,255,0.6); cursor:pointer; transition:all 0.18s; text-align:center; }
.wl-amount-chip:hover { border-color:rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); }
.wl-amount-chip.active { border-color:rgba(220,38,38,0.6); background:rgba(220,38,38,0.08); color:#fff; }

/* Pay method chip */
.wl-pay-chip { display:flex;align-items:center;gap:8px; padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.18s; }
.wl-pay-chip:hover { border-color:rgba(255,255,255,0.14); background:rgba(255,255,255,0.04); }
.wl-pay-chip.active { border-color:rgba(220,38,38,0.5); background:rgba(220,38,38,0.07); }

/* Input */
.wl-input { width:100%; padding:12px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; font-family:'Barlow',sans-serif; font-size:14px; color:#fff; outline:none; transition:all 0.2s; box-sizing:border-box; }
.wl-input::placeholder { color:rgba(255,255,255,0.2); }
.wl-input:focus { border-color:rgba(220,38,38,0.5); background:rgba(220,38,38,0.04); box-shadow:0 0 0 3px rgba(220,38,38,0.08); }
.wl-select { width:100%; padding:12px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; font-family:'Barlow',sans-serif; font-size:14px; color:#fff; outline:none; cursor:pointer; appearance:none; }
.wl-select option { background:#1a1a20; }

/* CTA */
.wl-cta { width:100%; padding:14px; border:none; border-radius:12px; background:linear-gradient(135deg,#DC2626,#EA580C); color:#fff; font-family:'Rajdhani',sans-serif; font-size:16px; font-weight:700; letter-spacing:0.04em; cursor:pointer; display:flex;align-items:center;justify-content:center;gap:8px; transition:all 0.25s; box-shadow:0 6px 20px rgba(220,38,38,0.3); }
.wl-cta:hover:not(:disabled) { box-shadow:0 10px 32px rgba(220,38,38,0.5); transform:translateY(-1px); }
.wl-cta:disabled { opacity:0.35; cursor:not-allowed; box-shadow:none; transform:none; }
.wl-cta-outline { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.6); box-shadow:none; }
.wl-cta-outline:hover:not(:disabled) { background:rgba(255,255,255,0.07); color:#fff; box-shadow:none; transform:none; }

/* Filter tabs */
.wl-filter-tab { padding:6px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.07); background:transparent; font-family:'Barlow',sans-serif; font-size:12px; font-weight:700; color:rgba(255,255,255,0.35); cursor:pointer; transition:all 0.18s; letter-spacing:0.04em; text-transform:uppercase; }
.wl-filter-tab:hover { color:rgba(255,255,255,0.6); border-color:rgba(255,255,255,0.12); }
.wl-filter-tab.active { background:rgba(220,38,38,0.1); border-color:rgba(220,38,38,0.4); color:#DC2626; }

/* Empty state */
.wl-empty { text-align:center; padding:48px 24px; }

/* Label */
.wl-label { font-family:'Barlow',sans-serif; font-size:11px; font-weight:700; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px; display:block; }

@keyframes wlFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.wl-animate { animation:wlFadeUp 0.45s ease forwards; }
@keyframes spin { to{transform:rotate(360deg)} }
.wl-spin { animation:spin 0.7s linear infinite; border-radius:50%; }

.wl-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:900px){ .wl-grid{grid-template-columns:1fr} }
.wl-amounts-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.wl-pay-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
`;

// ─── COMPONENT ────────────────────────────────────────────────────
export default function WalletPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(profile?.balance ?? 0);
  const [logs, setLogs] = useState<WalletLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [filter, setFilter] = useState<TxType | "all">("all");
  const [modal, setModal] = useState<ModalType>(null);
  const [copied, setCopied] = useState(false);

  // Top Up form state
  const [topupAmount, setTopupAmount] = useState<number | null>(null);
  const [topupCustom, setTopupCustom] = useState("");
  const [topupMethod, setTopupMethod] = useState<string | null>(null);
  const [topupLoading, setTopupLoading] = useState(false);

  // Withdraw form state
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState("");
  const [withdrawAccNum, setWithdrawAccNum] = useState("");
  const [withdrawAccName, setWithdrawAccName] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const finalTopupAmount = topupAmount ?? parseInt(topupCustom.replace(/\D/g, "") || "0");
  const withdrawAmountNum = parseInt(withdrawAmount.replace(/\D/g, "") || "0");

  // Stats computed
  const totalIn  = logs.filter(l => ["topup","refund","bonus"].includes(l.action)).reduce((a,b) => a + b.amount, 0);
  const totalOut = logs.filter(l => ["spend","withdrawal"].includes(l.action)).reduce((a,b) => a + b.amount, 0);

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    fetchData();
  }, [user]);

  async function fetchData() {
    setLoadingLogs(true);
    if (!user) return;

    // Fetch balance from profile
    const { data: prof } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", user.id)
      .single();
    if (prof) setBalance(prof.balance);

    // Fetch wallet logs
    const { data } = await supabase
      .from("wallet_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    setLogs((data as WalletLog[]) ?? []);
    setLoadingLogs(false);
  }

  const copyUserId = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopUp = async () => {
  if (!user || finalTopupAmount < 10000 || !topupMethod) return;
  setTopupLoading(true);

  try {
    // Ambil session token dulu
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Sesi tidak ditemukan, silakan login ulang.");

    // Panggil Edge Function dengan token eksplisit
    const { data, error } = await supabase.functions.invoke("midtrans-create", {
      body: { amount: finalTopupAmount },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error || data?.error) {
      throw new Error(data?.error || error?.message || "Gagal membuat transaksi");
    }

    const { token } = data;

    if (!(window as any).snap) {
      throw new Error("Midtrans Snap belum dimuat. Coba refresh halaman.");
    }

    setTopupLoading(false);
    setModal(null);

    (window as any).snap.pay(token, {
      onSuccess: () => { fetchData(); },
      onPending: () => { alert("Pending. Selesaikan pembayaran."); fetchData(); },
      onError:   (err: any) => { console.error(err); alert("Pembayaran gagal."); },
      onClose:   () => { console.log("Popup ditutup"); },
    });

    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
      setTopupLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!user || withdrawAmountNum < 50000 || !withdrawBank || !withdrawAccNum || !withdrawAccName) return;
    if (withdrawAmountNum > balance) return;
    setWithdrawLoading(true);

    // TODO: Integrasi Midtrans Disbursement API
    // 1. Call Edge Function midtrans-disburse
    // 2. Midtrans transfer ke rekening tujuan
    // 3. Webhook konfirmasi → update balance
    //
    // Prototype: simulasi pending
    await new Promise(r => setTimeout(r, 1500));

    await supabase.from("wallet_logs").insert({
      user_id:        user.id,
      action:         "withdrawal",
      amount:         withdrawAmountNum,
      balance_before: balance,
      balance_after:  balance - withdrawAmountNum,
      note:           `Penarikan ke ${withdrawBank} ${withdrawAccNum}`,
    });

    await supabase.from("profiles")
      .update({ balance: balance - withdrawAmountNum })
      .eq("id", user.id);

    setBalance(b => b - withdrawAmountNum);
    setWithdrawLoading(false);
    setModal(null);
    setWithdrawAmount("");
    setWithdrawBank("");
    setWithdrawAccNum("");
    setWithdrawAccName("");
    await fetchData();
  };

  const filteredLogs = filter === "all" ? logs : logs.filter(l => l.action === filter);

  if (!user) return null;

  return (
    <div className="wl-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="wl-hero">
        <div className="wl-hero-bg" /><div className="wl-hero-grid" />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 32px", position: "relative" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 6, padding: "4px 12px" }}>
              <Wallet size={11} color="#DC2626" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", fontFamily: "'Barlow',sans-serif", textTransform: "uppercase" as const }}>OkeGass Wallet</span>
            </div>
          </div>

          <div className="wl-grid">
            {/* Balance card */}
            <div className="wl-balance-card wl-animate">
              <div className="wl-balance-glow" />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <span className="wl-label">Saldo Tersedia</span>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-0.01em" }}>
                    {formatRp(balance)}
                  </div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wallet size={22} color="#DC2626" />
                </div>
              </div>

              {/* User ID */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow',sans-serif" }}>ID:</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.id}</span>
                <button onClick={copyUserId} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#10B981" : "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontFamily: "'Barlow',sans-serif", fontWeight: 600 }}>
                  <Copy size={12} /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "Top Up", icon: <Plus size={18} />, color: "#10B981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", onClick: () => setModal("topup") },
                  { label: "Tarik", icon: <Minus size={18} />, color: "#C084FC", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.3)", onClick: () => setModal("withdraw") },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="wl-action-btn"
                    style={{ background: a.bg, borderColor: a.border }}
                    onClick={a.onClick}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${a.bg}`}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: a.bg, border: `1px solid ${a.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                      {a.icon}
                    </div>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 700, color: a.color, letterSpacing: "0.04em" }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Total Masuk", val: formatRp(totalIn),  icon: <ArrowDownLeft size={16} />, color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
                { label: "Total Keluar", val: formatRp(totalOut), icon: <ArrowUpRight size={16} />, color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
                { label: "Total Transaksi", val: logs.length + "x", icon: <ArrowLeftRight size={16} />, color: "#60A5FA", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)" },
              ].map((s) => (
                <div key={s.label} className="wl-stat wl-animate" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  </div>
                </div>
              ))}

              {/* Security badge */}
              <div style={{ padding: "14px 16px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <Shield size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Saldo Terlindungi</div>
                  <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>Dienkripsi SSL • Diproses oleh Midtrans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        <div className="wl-card wl-animate">
          <div className="wl-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TrendingUp size={16} color="#DC2626" />
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff" }}>Riwayat Transaksi</span>
            </div>
            <button onClick={fetchData} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontFamily: "'Barlow',sans-serif", fontWeight: 600 }}>
              <RefreshCw size={13} /> Refresh
            </button>
          </div>

          {/* Filter tabs */}
          <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {(["all", "topup", "spend", "refund", "bonus", "withdrawal"] as const).map((f) => (
              <button key={f} className={`wl-filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "Semua" : txConfig[f]?.label ?? f}
              </button>
            ))}
          </div>

          {/* Logs */}
          {loadingLogs ? (
            <div style={{ padding: "48px 0", display: "flex", justifyContent: "center" }}>
              <div className="wl-spin" style={{ width: 28, height: 28, border: "3px solid rgba(220,38,38,0.2)", borderTopColor: "#DC2626" }} />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="wl-empty">
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>Belum ada transaksi</h3>
              <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow',sans-serif", fontSize: 13 }}>
                {filter === "all" ? "Top up dulu untuk mulai transaksi" : `Belum ada transaksi ${txConfig[filter as TxType]?.label}`}
              </p>
              {filter === "all" && (
                <button className="wl-cta" style={{ marginTop: 20, width: "auto", padding: "12px 28px" }} onClick={() => setModal("topup")}>
                  <Plus size={15} /> Top Up Sekarang
                </button>
              )}
            </div>
          ) : (
            filteredLogs.map((log) => {
              const cfg = txConfig[log.action];
              const isPositive = ["topup", "refund", "bonus"].includes(log.action);
              return (
                <div key={log.id} className="wl-tx-item">
                  <div className="wl-tx-icon" style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{cfg.label}</div>
                    <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {log.note || `Order: ${log.order_id || "-"}`}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 16, fontWeight: 700, color: isPositive ? "#10B981" : "#F87171", marginBottom: 3 }}>
                      {cfg.sign}{formatRp(log.amount)}
                    </div>
                    <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                      {formatDate(log.created_at)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ─── TOP UP MODAL ─────────────────────────────────────── */}
      {modal === "topup" && (
        <div className="wl-modal-overlay">
          <div className="wl-modal-bg" onClick={() => setModal(null)} />
          <div className="wl-modal">
            <div className="wl-modal-top-line" />
            <div style={{ padding: "24px 28px 32px" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Top Up Wallet</div>
                  <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Saldo saat ini: <strong style={{ color: "#fff" }}>{formatRp(balance)}</strong></div>
                </div>
                <button onClick={() => setModal(null)} style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)" }}>
                  <X size={14} />
                </button>
              </div>

              {/* Amount chips */}
              <label className="wl-label">Pilih Nominal</label>
              <div className="wl-amounts-grid" style={{ marginBottom: 12 }}>
                {TOPUP_AMOUNTS.map((a) => (
                  <button key={a} className={`wl-amount-chip ${topupAmount === a ? "active" : ""}`} onClick={() => { setTopupAmount(a); setTopupCustom(""); }}>
                    {formatRp(a)}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <label className="wl-label" style={{ marginTop: 8 }}>Atau Nominal Lain</label>
              <input
                className="wl-input"
                type="text"
                value={topupCustom}
                onChange={(e) => { setTopupCustom(e.target.value); setTopupAmount(null); }}
                placeholder="Min. Rp 10.000"
                style={{ marginBottom: 20 }}
              />

              {/* Payment method */}
              <label className="wl-label">Metode Pembayaran</label>
              <div className="wl-pay-grid" style={{ marginBottom: 24 }}>
                {PAYMENT_METHODS.map((pm) => (
                  <button key={pm.id} className={`wl-pay-chip ${topupMethod === pm.id ? "active" : ""}`} onClick={() => setTopupMethod(pm.id)}>
                    <span style={{ fontSize: 18 }}>{pm.emoji}</span>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 600, color: topupMethod === pm.id ? "#fff" : "rgba(255,255,255,0.55)", flex: 1, textAlign: "left" as const }}>{pm.name}</span>
                    {topupMethod === pm.id && <CheckCircle size={13} color="#DC2626" />}
                  </button>
                ))}
              </div>

              {/* Midtrans info */}
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, marginBottom: 20 }}>
                <AlertCircle size={14} color="#60A5FA" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>
                  Pembayaran diproses aman via <strong style={{ color: "#60A5FA" }}>Midtrans</strong>. Saldo masuk otomatis setelah pembayaran dikonfirmasi.
                </p>
              </div>

              <button
                className="wl-cta"
                disabled={finalTopupAmount < 10000 || !topupMethod || topupLoading}
                onClick={handleTopUp}
              >
                {topupLoading ? (
                  <><div className="wl-spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} /> Memproses...</>
                ) : (
                  <><Zap size={15} fill="white" /> Bayar {finalTopupAmount >= 10000 ? formatRp(finalTopupAmount) : ""}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── WITHDRAW MODAL ───────────────────────────────────── */}
      {modal === "withdraw" && (
        <div className="wl-modal-overlay">
          <div className="wl-modal-bg" onClick={() => setModal(null)} />
          <div className="wl-modal">
            <div style={{ height: 2, background: "linear-gradient(90deg,#C084FC,#818CF8)", borderRadius: "24px 24px 0 0" }} />
            <div style={{ padding: "24px 28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Tarik Saldo</div>
                  <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Tersedia: <strong style={{ color: "#fff" }}>{formatRp(balance)}</strong></div>
                </div>
                <button onClick={() => setModal(null)} style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)" }}>
                  <X size={14} />
                </button>
              </div>

              <label className="wl-label">Jumlah Penarikan</label>
              <input className="wl-input" type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Min. Rp 50.000" style={{ marginBottom: 4 }} />
              {withdrawAmountNum > balance && (
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "#F87171", margin: "0 0 12px" }}>⚠️ Melebihi saldo tersedia</p>
              )}
              <div style={{ height: 12 }} />

              <label className="wl-label">Bank Tujuan</label>
              <div style={{ position: "relative", marginBottom: 16 }}>
                <select className="wl-select" value={withdrawBank} onChange={(e) => setWithdrawBank(e.target.value)}>
                  <option value="">Pilih Bank</option>
                  {WITHDRAW_BANKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <label className="wl-label">Nomor Rekening</label>
              <input className="wl-input" type="text" value={withdrawAccNum} onChange={(e) => setWithdrawAccNum(e.target.value)} placeholder="Contoh: 1234567890" style={{ marginBottom: 16 }} />

              <label className="wl-label">Nama Pemilik Rekening</label>
              <input className="wl-input" type="text" value={withdrawAccName} onChange={(e) => setWithdrawAccName(e.target.value)} placeholder="Sesuai buku tabungan" style={{ marginBottom: 20 }} />

              {/* Info */}
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, marginBottom: 20 }}>
                <Clock size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>
                  Penarikan diproses via <strong style={{ color: "#F59E0B" }}>Midtrans Disbursement</strong>. Estimasi 1–2 hari kerja. Biaya transfer gratis.
                </p>
              </div>

              <button
                className="wl-cta"
                style={{ background: "linear-gradient(135deg,#7C3AED,#C084FC)", boxShadow: "0 6px 20px rgba(124,58,237,0.3)" }}
                disabled={
                  withdrawAmountNum < 50000 ||
                  withdrawAmountNum > balance ||
                  !withdrawBank || !withdrawAccNum || !withdrawAccName ||
                  withdrawLoading
                }
                onClick={handleWithdraw}
              >
                {withdrawLoading ? (
                  <><div className="wl-spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} /> Memproses...</>
                ) : (
                  <><Building2 size={15} /> Tarik {withdrawAmountNum >= 50000 ? formatRp(withdrawAmountNum) : ""}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}