import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Smartphone, Zap, Wallet, ChevronDown, CheckCircle2, ArrowRight, Search } from "lucide-react";

/* ─── Types ─── */
type TabId = "pulsa" | "pln" | "ewallet";

/* ─── Data ─── */
const OPERATORS = [
  { id: "telkomsel", label: "Telkomsel", color: "#EF4444", logo: "🔴" },
  { id: "xl",       label: "XL Axiata", color: "#3B82F6", logo: "🔵" },
  { id: "indosat",  label: "Indosat",   color: "#F59E0B", logo: "🟡" },
  { id: "tri",      label: "Tri",       color: "#8B5CF6", logo: "🟣" },
  { id: "smartfren",label: "Smartfren", color: "#10B981", logo: "🟢" },
  { id: "axis",     label: "Axis",      color: "#EC4899", logo: "🩷" },
];

const PULSA_NOMINAL = [
  { val: 5000,   label: "Rp 5.000",   price: 6000 },
  { val: 10000,  label: "Rp 10.000",  price: 11000 },
  { val: 20000,  label: "Rp 20.000",  price: 21500 },
  { val: 25000,  label: "Rp 25.000",  price: 26500 },
  { val: 50000,  label: "Rp 50.000",  price: 52000 },
  { val: 100000, label: "Rp 100.000", price: 103000 },
];

const DATA_PACKAGES = [
  { id: "d1", label: "1 GB / 7 hari",  price: 13000,  tag: "Populer" },
  { id: "d2", label: "2 GB / 30 hari", price: 25000,  tag: "" },
  { id: "d3", label: "5 GB / 30 hari", price: 55000,  tag: "Hemat" },
  { id: "d4", label: "10 GB / 30 hari",price: 95000,  tag: "" },
  { id: "d5", label: "15 GB / 30 hari",price: 130000, tag: "" },
  { id: "d6", label: "Unlimited 30 hr",price: 160000, tag: "Best Value" },
];

const PLN_NOMINAL = [
  { val: 20000,  price: 21500,  label: "20.000 token" },
  { val: 50000,  price: 51500,  label: "50.000 token" },
  { val: 100000, price: 102000, label: "100.000 token" },
  { val: 200000, price: 202500, label: "200.000 token" },
  { val: 500000, price: 503000, label: "500.000 token" },
  { val: 1000000,price: 1004000,label: "1.000.000 token" },
];

const EWALLETS = [
  { id: "gopay",     label: "GoPay",      color: "#00ADE0", logo: "💙" },
  { id: "ovo",       label: "OVO",        color: "#5A2D81", logo: "💜" },
  { id: "dana",      label: "DANA",       color: "#1189CC", logo: "💎" },
  { id: "shopeepay", label: "ShopeePay",  color: "#EF4444", logo: "🧡" },
  { id: "linkaja",   label: "LinkAja",    color: "#E91E63", logo: "❤️" },
  { id: "jenius",    label: "Jenius",     color: "#0EA5E9", logo: "🔷" },
];

const EWALLET_NOMINAL = [
  { val: 10000,  price: 11500 },
  { val: 20000,  price: 21500 },
  { val: 50000,  price: 51500 },
  { val: 100000, price: 102000 },
  { val: 200000, price: 202500 },
  { val: 500000, price: 502500 },
];

const fmtRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

type PulsaMode = "pulsa" | "data";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap');

.topup-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; color: #fff; }

/* Hero */
.topup-hero {
  position: relative; padding: 44px 0 40px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.topup-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%); }
.topup-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}

/* Tabs */
.topup-tabs {
  display: flex; gap: 8px; margin-bottom: 32px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 6px; width: fit-content;
}
.topup-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 20px; border-radius: 8px;
  font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
  border: none; cursor: pointer; transition: all 0.2s;
  background: transparent; color: rgba(255,255,255,0.4);
  font-family: 'Barlow', sans-serif;
}
.topup-tab.active { color: #fff; }
.topup-tab:hover:not(.active) { color: rgba(255,255,255,0.6); }

/* Card */
.topup-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 28px;
}
.topup-card-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px; font-weight: 700; letter-spacing: 0.04em;
  color: #fff; margin-bottom: 24px;
}

/* Label */
.topup-label {
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
  margin-bottom: 12px;
}

/* Grid */
.topup-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
@media (max-width: 600px) { .topup-grid { grid-template-columns: repeat(2, 1fr); } }

.topup-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 14px; border-radius: 11px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.5);
  font-size: 12px; font-weight: 700; font-family: 'Barlow', sans-serif;
}
.topup-btn:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
.topup-btn.active { color: #fff; }
.topup-logo { font-size: 22px; }

/* Toggle */
.topup-toggle {
  display: flex; gap: 6px; margin-bottom: 24px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 9px; padding: 4px;
}
.topup-toggle-btn {
  flex: 1; padding: 9px; border-radius: 6px; border: none;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  background: transparent; color: rgba(255,255,255,0.4);
  font-family: 'Barlow', sans-serif;
}
.topup-toggle-btn.active { background: rgba(59,130,246,0.2); color: #60A5FA; }

/* Input */
.topup-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-size: 13px; font-weight: 500;
  font-family: 'Barlow', sans-serif; outline: none; transition: all 0.2s;
  margin-bottom: 16px;
}
.topup-input::placeholder { color: rgba(255,255,255,0.15); }
.topup-input:focus { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

/* Summary */
.topup-summary {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px;
  position: sticky; top: 100px;
}
.topup-sum-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 12px;
}
.topup-sum-row.total {
  font-size: 15px; font-weight: 700; color: #fff;
  padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07); margin-top: 4px;
}
.topup-sum-val { font-weight: 700; color: rgba(255,255,255,0.85); }

/* Button */
.topup-btn-primary {
  width: 100%; padding: 13px; border-radius: 11px; border: none;
  font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: flex;
  align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; box-shadow: 0 4px 14px rgba(220,38,38,0.3);
  margin-top: 18px;
}
.topup-btn-primary:hover:not(:disabled) { box-shadow: 0 8px 24px rgba(220,38,38,0.5); }
.topup-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

/* Success */
.topup-success {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 40px 20px; text-align: center;
}

/* List */
.topup-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.topup-list-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 14px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  cursor: pointer; transition: all 0.2s;
  font-size: 13px; font-weight: 700;
}
.topup-list-item:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
.topup-list-item.active { color: #fff; }

/* Layout */
.topup-layout {
  display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
}
@media (max-width: 1000px) { .topup-layout { grid-template-columns: 1fr; } }
`;

export default function TopUpPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Get tab from URL, default to pulsa
  const initTab = (params.get("tab") as TabId) || "pulsa";
  
  const [tab, setTab] = useState<TabId>(initTab);
  const [pulsaMode, setPulsaMode] = useState<PulsaMode>("pulsa");
  const [operator, setOperator] = useState("");
  const [ewallet, setEwallet] = useState("");
  const [nominal, setNominal] = useState<number | null>(null);
  const [dataPkg, setDataPkg] = useState("");
  const [phone, setPhone] = useState("");
  const [meter, setMeter] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update URL when tab changes
  useEffect(() => {
    const urlTab = params.get("tab") as TabId;
    if (urlTab && ["pulsa", "pln", "ewallet"].includes(urlTab)) {
      setTab(urlTab);
    }
  }, [params]);

  const resetForm = () => {
    setOperator("");
    setEwallet("");
    setNominal(null);
    setDataPkg("");
    setPhone("");
    setMeter("");
    setOrdered(false);
  };

  // Fix: Navigate with correct URL structure
  const switchTab = (newTab: TabId) => {
    resetForm();
    setTab(newTab);
    // Navigate with proper URL
    window.history.pushState(null, "", `/topup?tab=${newTab}`);
  };

  const canOrder = () => {
    if (tab === "pulsa" && pulsaMode === "pulsa") return operator && nominal && phone.length >= 10;
    if (tab === "pulsa" && pulsaMode === "data") return operator && dataPkg && phone.length >= 10;
    if (tab === "pln") return nominal && meter.length >= 11;
    if (tab === "ewallet") return ewallet && nominal && phone.length >= 10;
    return false;
  };

  const handleOrder = () => {
    if (!canOrder()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrdered(true);
    }, 1800);
  };

  const selectedPrice = () => {
    if (tab === "pulsa" && pulsaMode === "pulsa" && nominal)
      return PULSA_NOMINAL.find(n => n.val === nominal)?.price ?? 0;
    if (tab === "pulsa" && pulsaMode === "data" && dataPkg)
      return DATA_PACKAGES.find(d => d.id === dataPkg)?.price ?? 0;
    if (tab === "pln" && nominal)
      return PLN_NOMINAL.find(n => n.val === nominal)?.price ?? 0;
    if (tab === "ewallet" && nominal)
      return EWALLET_NOMINAL.find(n => n.val === nominal)?.price ?? 0;
    return 0;
  };

  const TABS = [
    { id: "pulsa" as TabId, label: "Pulsa & Data", icon: <Smartphone size={16} />, color: "#3B82F6" },
    { id: "pln" as TabId, label: "Token PLN", icon: <Zap size={16} />, color: "#F59E0B" },
    { id: "ewallet" as TabId, label: "E-Wallet", icon: <Wallet size={16} />, color: "#10B981" },
  ];

  const activeColor = TABS.find(t => t.id === tab)?.color ?? "#DC2626";

  return (
    <div className="topup-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="topup-hero">
        <div className="topup-hero-bg" />
        <div className="topup-hero-grid" />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 6, padding: "4px 12px", marginBottom: 14 }}>
            <Zap size={12} color="#DC2626" fill="#DC2626" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", textTransform: "uppercase" }}>
              Layanan Digital
            </span>
          </div>
          <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 10 }}>
            Top Up <span style={{ color: "#DC2626" }}>Pulsa, Token & E-Wallet</span>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 520, lineHeight: 1.65 }}>
            Proses instan, harga termurah, tersedia 24 jam. Pilih layanan yang kamu butuhkan.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 80px" }}>

        {/* Tabs */}
        <div className="topup-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`topup-tab ${tab === t.id ? "active" : ""}`}
              style={tab === t.id ? { background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color } : {}}
              onClick={() => switchTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className="topup-layout">

          {/* LEFT: Form */}
          <div>

            {/* PULSA & DATA */}
            {tab === "pulsa" && (
              <div className="topup-card">
                <div className="topup-card-title">Pulsa & Paket Data</div>

                {/* Mode toggle */}
                <div className="topup-toggle">
                  <button
                    className={`topup-toggle-btn ${pulsaMode === "pulsa" ? "active" : ""}`}
                    onClick={() => { setPulsaMode("pulsa"); setDataPkg(""); setNominal(null); }}
                  >
                    📶 Pulsa
                  </button>
                  <button
                    className={`topup-toggle-btn ${pulsaMode === "data" ? "active" : ""}`}
                    onClick={() => { setPulsaMode("data"); setNominal(null); }}
                  >
                    📡 Paket Data
                  </button>
                </div>

                {/* Operator */}
                <div className="topup-label">Pilih Operator</div>
                <div className="topup-grid">
                  {OPERATORS.map(op => (
                    <button
                      key={op.id}
                      className={`topup-btn ${operator === op.id ? "active" : ""}`}
                      style={operator === op.id ? { borderColor: `${op.color}60`, background: `${op.color}15`, color: "#fff" } : {}}
                      onClick={() => { setOperator(op.id); setNominal(null); setDataPkg(""); }}
                    >
                      <span className="topup-logo">{op.logo}</span>
                      {op.label}
                    </button>
                  ))}
                </div>

                {/* Nominal / Package */}
                {pulsaMode === "pulsa" ? (
                  <>
                    <div className="topup-label">Pilih Nominal</div>
                    <div className="topup-grid">
                      {PULSA_NOMINAL.map(n => (
                        <button
                          key={n.val}
                          className={`topup-btn ${nominal === n.val ? "active" : ""}`}
                          style={nominal === n.val ? { borderColor: `${activeColor}60`, background: `${activeColor}15` } : {}}
                          onClick={() => setNominal(n.val)}
                        >
                          <span>{n.label}</span>
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{fmtRp(n.price)}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="topup-label">Pilih Paket Data</div>
                    <div className="topup-list">
                      {DATA_PACKAGES.map(pkg => (
                        <button
                          key={pkg.id}
                          className={`topup-list-item ${dataPkg === pkg.id ? "active" : ""}`}
                          style={dataPkg === pkg.id ? { borderColor: `${activeColor}60`, background: `${activeColor}15` } : {}}
                          onClick={() => setDataPkg(pkg.id)}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {pkg.label}
                            {pkg.tag && (
                              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${activeColor}20`, color: activeColor }}>
                                {pkg.tag}
                              </span>
                            )}
                          </span>
                          <span style={{ color: activeColor }}>{fmtRp(pkg.price)}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Phone */}
                <div className="topup-label">Nomor HP</div>
                <input
                  className="topup-input"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  maxLength={14}
                />
              </div>
            )}

            {/* TOKEN PLN */}
            {tab === "pln" && (
              <div className="topup-card">
                <div className="topup-card-title">Token Listrik PLN</div>

                {/* Meter */}
                <div className="topup-label">Nomor Meter / ID Pelanggan</div>
                <input
                  className="topup-input"
                  type="text"
                  placeholder="Contoh: 12345678910"
                  value={meter}
                  onChange={e => setMeter(e.target.value.replace(/\D/g, ""))}
                  maxLength={13}
                />

                {/* Nominal */}
                <div className="topup-label">Pilih Nominal Token</div>
                <div className="topup-grid">
                  {PLN_NOMINAL.map(n => (
                    <button
                      key={n.val}
                      className={`topup-btn ${nominal === n.val ? "active" : ""}`}
                      style={nominal === n.val ? { borderColor: "rgba(245,158,11,0.6)", background: "rgba(245,158,11,0.15)" } : {}}
                      onClick={() => setNominal(n.val)}
                    >
                      <span style={{ color: nominal === n.val ? "#F59E0B" : "rgba(255,255,255,0.5)" }}>{fmtRp(n.val)}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{n.label}</span>
                    </button>
                  ))}
                </div>

                {/* Info */}
                <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 12, color: "rgba(245,158,11,0.8)", lineHeight: 1.6 }}>
                  💡 Token akan dikirim ke nomor HP yang terdaftar di PLN dan ditampilkan di layar ini setelah pembayaran berhasil.
                </div>
              </div>
            )}

            {/* E-WALLET */}
            {tab === "ewallet" && (
              <div className="topup-card">
                <div className="topup-card-title">Top Up E-Wallet</div>

                {/* E-wallet */}
                <div className="topup-label">Pilih E-Wallet</div>
                <div className="topup-grid">
                  {EWALLETS.map(ew => (
                    <button
                      key={ew.id}
                      className={`topup-btn ${ewallet === ew.id ? "active" : ""}`}
                      style={ewallet === ew.id ? { borderColor: `${ew.color}60`, background: `${ew.color}15`, color: "#fff" } : {}}
                      onClick={() => { setEwallet(ew.id); setNominal(null); }}
                    >
                      <span className="topup-logo">{ew.logo}</span>
                      {ew.label}
                    </button>
                  ))}
                </div>

                {/* Nominal */}
                <div className="topup-label">Pilih Nominal</div>
                <div className="topup-grid">
                  {EWALLET_NOMINAL.map(n => (
                    <button
                      key={n.val}
                      className={`topup-btn ${nominal === n.val ? "active" : ""}`}
                      style={nominal === n.val ? { borderColor: `${activeColor}60`, background: `${activeColor}15` } : {}}
                      onClick={() => setNominal(n.val)}
                    >
                      <span style={{ color: nominal === n.val ? activeColor : "rgba(255,255,255,0.5)" }}>{fmtRp(n.val)}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{fmtRp(n.price)}</span>
                    </button>
                  ))}
                </div>

                {/* Phone */}
                <div className="topup-label">Nomor HP / Akun E-Wallet</div>
                <input
                  className="topup-input"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  maxLength={14}
                />
              </div>
            )}
          </div>

          {/* RIGHT: Summary */}
          <div>
            {ordered ? (
              <div className="topup-summary">
                <div className="topup-success">
                  <CheckCircle2 size={56} color="#10B981" />
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "#10B981" }}>
                    Pesanan Berhasil!
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                    Transaksi sedang diproses. Token / saldo akan masuk dalam beberapa detik.
                  </p>
                  <button
                    className="topup-btn-primary"
                    style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", color: "#10B981", marginTop: 8 }}
                    onClick={resetForm}
                  >
                    Transaksi Baru
                  </button>
                </div>
              </div>
            ) : (
              <div className="topup-summary">
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 20, color: "rgba(255,255,255,0.9)" }}>
                  Ringkasan Pesanan
                </div>

                {/* Summary rows */}
                {tab === "pulsa" && operator && (
                  <div className="topup-sum-row">
                    <span>Operator</span>
                    <span className="topup-sum-val">{OPERATORS.find(o => o.id === operator)?.label}</span>
                  </div>
                )}
                {tab === "pulsa" && pulsaMode === "pulsa" && nominal && (
                  <div className="topup-sum-row">
                    <span>Nominal</span>
                    <span className="topup-sum-val">{fmtRp(nominal)}</span>
                  </div>
                )}
                {tab === "pulsa" && pulsaMode === "data" && dataPkg && (
                  <div className="topup-sum-row">
                    <span>Paket</span>
                    <span className="topup-sum-val">{DATA_PACKAGES.find(d => d.id === dataPkg)?.label}</span>
                  </div>
                )}
                {tab === "pln" && meter && (
                  <div className="topup-sum-row">
                    <span>No. Meter</span>
                    <span className="topup-sum-val">{meter}</span>
                  </div>
                )}
                {tab === "pln" && nominal && (
                  <div className="topup-sum-row">
                    <span>Token</span>
                    <span className="topup-sum-val">{fmtRp(nominal)}</span>
                  </div>
                )}
                {tab === "ewallet" && ewallet && (
                  <div className="topup-sum-row">
                    <span>E-Wallet</span>
                    <span className="topup-sum-val">{EWALLETS.find(e => e.id === ewallet)?.label}</span>
                  </div>
                )}
                {tab === "ewallet" && nominal && (
                  <div className="topup-sum-row">
                    <span>Nominal</span>
                    <span className="topup-sum-val">{fmtRp(nominal)}</span>
                  </div>
                )}
                {(phone || meter) && (
                  <div className="topup-sum-row">
                    <span>{tab === "pln" ? "No. Meter" : "No. HP"}</span>
                    <span className="topup-sum-val">{tab === "pln" ? meter : phone}</span>
                  </div>
                )}

                {/* Total */}
                {selectedPrice() > 0 && (
                  <>
                    <div className="topup-sum-row">
                      <span>Biaya Admin</span>
                      <span className="topup-sum-val" style={{ color: "rgba(255,255,255,0.4)" }}>Gratis</span>
                    </div>
                    <div className="topup-sum-row total">
                      <span>Total Bayar</span>
                      <span style={{ color: activeColor, fontFamily: "'Rajdhani',sans-serif", fontSize: 18 }}>
                        {fmtRp(selectedPrice())}
                      </span>
                    </div>
                  </>
                )}

                {!selectedPrice() && (
                  <div style={{ textAlign: "center", padding: "28px 0", fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
                    Pilih layanan & nominal<br />untuk melihat ringkasan
                  </div>
                )}

                {/* CTA */}
                <button
                  className="topup-btn-primary"
                  disabled={!canOrder() || loading}
                  style={{
                    background: canOrder() ? `linear-gradient(135deg, ${activeColor}cc, ${activeColor}88)` : "rgba(255,255,255,0.06)",
                    border: canOrder() ? `1px solid ${activeColor}60` : "1px solid rgba(255,255,255,0.08)",
                    color: canOrder() ? "#fff" : "rgba(255,255,255,0.25)",
                  }}
                  onClick={handleOrder}
                >
                  {loading ? (
                    <>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Bayar Sekarang <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Trust */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
                  {["🔒 Transaksi terenkripsi SSL", "⚡ Proses otomatis real-time", "💳 Bayar pakai semua metode"].map(t => (
                    <div key={t} style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}