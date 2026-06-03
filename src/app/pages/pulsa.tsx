import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Smartphone, Zap, Wallet, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";
import telkomselLogo from "../../img/telkomsel.png";
import xlLogo from "../../img/xl.png";
import indosatLogo from "../../img/indosat.png";
import triLogo from "../../img/tri.png";
import smartfrenLogo from "../../img/smartfren.png";
import axisLogo from "../../img/axis.png";

/* ─── Types ─── */
type TabId = "pulsa" | "pln" | "ewallet";
type PulsaMode = "pulsa" | "data";

/* ─── Data ─── */
const OPERATORS = [
  { id: "telkomsel", label: "Telkomsel", color: "#EF4444", logo: telkomselLogo },
  { id: "xl",        label: "XL Axiata", color: "#3B82F6", logo: xlLogo },
  { id: "indosat",   label: "Indosat",   color: "#F59E0B", logo: indosatLogo },
  { id: "tri",       label: "Tri",       color: "#8B5CF6", logo: triLogo },
  { id: "smartfren", label: "Smartfren", color: "#10B981", logo: smartfrenLogo },
  { id: "axis",      label: "Axis",      color: "#EC4899", logo: axisLogo },
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
  { id: "d1", label: "1 GB / 7 hari",   price: 13000,  tag: "Populer" },
  { id: "d2", label: "2 GB / 30 hari",  price: 25000,  tag: "" },
  { id: "d3", label: "5 GB / 30 hari",  price: 55000,  tag: "Hemat" },
  { id: "d4", label: "10 GB / 30 hari", price: 95000,  tag: "" },
  { id: "d5", label: "15 GB / 30 hari", price: 130000, tag: "" },
  { id: "d6", label: "Unlimited 30 hr", price: 160000, tag: "Best Value" },
];

const PLN_NOMINAL = [
  { val: 20000,   price: 21500,   label: "20.000 token" },
  { val: 50000,   price: 51500,   label: "50.000 token" },
  { val: 100000,  price: 102000,  label: "100.000 token" },
  { val: 200000,  price: 202500,  label: "200.000 token" },
  { val: 500000,  price: 503000,  label: "500.000 token" },
  { val: 1000000, price: 1004000, label: "1.000.000 token" },
];

const EWALLETS = [
  { id: "gopay",     label: "GoPay",     color: "#00ADE0", logo: "💙" },
  { id: "ovo",       label: "OVO",       color: "#5A2D81", logo: "💜" },
  { id: "dana",      label: "DANA",      color: "#1189CC", logo: "💎" },
  { id: "shopeepay", label: "ShopeePay", color: "#EF4444", logo: "🧡" },
  { id: "linkaja",   label: "LinkAja",   color: "#E91E63", logo: "❤️" },
  { id: "jenius",    label: "Jenius",    color: "#0EA5E9", logo: "🔷" },
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

/* ─── Component ─── */
export default function TopUpPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const initTab = (params.get("tab") as TabId) || "pulsa";
  const [tab, setTab]             = useState<TabId>(initTab);
  const [pulsaMode, setPulsaMode] = useState<PulsaMode>("pulsa");
  const [operator, setOperator]   = useState("");
  const [ewallet, setEwallet]     = useState("");
  const [nominal, setNominal]     = useState<number | null>(null);
  const [dataPkg, setDataPkg]     = useState("");
  const [phone, setPhone]         = useState("");
  const [meter, setMeter]         = useState("");
  const [ordered, setOrdered]     = useState(false);
  const [loading, setLoading]     = useState(false);

  // Wallet state
  const [balance, setBalance]               = useState(profile?.balance ?? 0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  // Fetch balance terbaru saat mount
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("balance")
      .eq("id", user.id)
      .single()
      .then(({ data }) => { if (data) setBalance(data.balance); });
  }, [user]);

  // Reset insufficient funds warning saat nominal berubah
  useEffect(() => {
    setInsufficientFunds(false);
  }, [nominal, dataPkg, tab]);

  // Sync tab dari URL
  useEffect(() => {
    const t = params.get("tab") as TabId;
    if (t && ["pulsa", "pln", "ewallet"].includes(t)) setTab(t);
  }, [params]);

  const resetForm = () => {
    setOperator(""); setEwallet(""); setNominal(null);
    setDataPkg(""); setPhone(""); setMeter("");
    setOrdered(false); setInsufficientFunds(false);
  };

  const switchTab = (t: TabId) => {
    setTab(t);
    navigate(`/topup?tab=${t}`, { replace: true });
    resetForm();
  };

  const canOrder = () => {
    if (tab === "pulsa" && pulsaMode === "pulsa") return operator && nominal && phone.length >= 10;
    if (tab === "pulsa" && pulsaMode === "data")  return operator && dataPkg && phone.length >= 10;
    if (tab === "pln")                            return nominal && meter.length >= 11;
    if (tab === "ewallet")                        return ewallet && nominal && phone.length >= 10;
    return false;
  };

  const selectedPrice = (): number => {
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

  const buildOrderNote = (): string => {
    if (tab === "pulsa" && pulsaMode === "pulsa") {
      const op = OPERATORS.find(o => o.id === operator)?.label ?? operator;
      return `Pulsa ${op} ${fmtRp(nominal!)} → ${phone}`;
    }
    if (tab === "pulsa" && pulsaMode === "data") {
      const op  = OPERATORS.find(o => o.id === operator)?.label ?? operator;
      const pkg = DATA_PACKAGES.find(d => d.id === dataPkg)?.label ?? dataPkg;
      return `Paket Data ${op} ${pkg} → ${phone}`;
    }
    if (tab === "pln") return `Token PLN ${fmtRp(nominal!)} → Meter ${meter}`;
    if (tab === "ewallet") {
      const ew = EWALLETS.find(e => e.id === ewallet)?.label ?? ewallet;
      return `Top Up ${ew} ${fmtRp(nominal!)} → ${phone}`;
    }
    return "Transaksi";
  };

  const handleOrder = async () => {
    if (!canOrder() || !user) return;
    const price = selectedPrice();

    // Cek saldo cukup
    if (balance < price) {
      setInsufficientFunds(true);
      return;
    }
    setInsufficientFunds(false);
    setLoading(true);

    // ── DUMMY MODE ────────────────────────────────────────────────
    // TODO: Ganti dengan call ke provider API (pulsa/PLN/e-wallet)
    //   sebelum potong saldo, tunggu konfirmasi provider dulu.
    //   Di production, potong saldo sebaiknya dilakukan dari
    //   webhook/Edge Function, bukan dari client.
    await new Promise(r => setTimeout(r, 1800));
    // ─────────────────────────────────────────────────────────────

    const newBalance = balance - price;

    await supabase.from("wallet_logs").insert({
      user_id:        user.id,
      action:         "spend",
      amount:         price,
      balance_before: balance,
      balance_after:  newBalance,
      note:           buildOrderNote(),
    });

    await supabase.from("profiles")
      .update({ balance: newBalance })
      .eq("id", user.id);

    setBalance(newBalance);
    setLoading(false);
    setOrdered(true);
  };

  const TABS: { id: TabId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "pulsa",   label: "Pulsa & Data", icon: <Smartphone size={16} strokeWidth={1.8} />, color: "#3B82F6" },
    { id: "pln",     label: "Token PLN",    icon: <Zap size={16} strokeWidth={1.8} />,        color: "#F59E0B" },
    { id: "ewallet", label: "E-Wallet",     icon: <Wallet size={16} strokeWidth={1.8} />,     color: "#10B981" },
  ];

  const activeColor = TABS.find(t => t.id === tab)?.color ?? "#DC2626";
  const price       = selectedPrice();
  const isShort     = price > 0 && balance < price;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tp-root {
          min-height: 100vh;
          background: #080810;
          font-family: 'Barlow', sans-serif;
          color: #fff;
          padding-bottom: 80px;
        }

        .tp-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #0d0d18 0%, #0a0a12 100%);
          padding: 56px 24px 52px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .tp-banner::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: repeating-linear-gradient(58deg, transparent 0 50px, rgba(220,40,10,.018) 50px 51px);
        }
        .tp-banner-orb {
          position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
        }

        .tp-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        .tp-tabs {
          display: flex; gap: 8px; flex-wrap: wrap;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px; padding: 6px;
          margin-bottom: 36px;
        }
        .tp-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 9px;
          font-size: 14px; font-weight: 700; letter-spacing: .04em;
          border: none; cursor: pointer; transition: all .22s ease;
          background: transparent; color: rgba(255,255,255,.4);
          font-family: 'Barlow', sans-serif;
          flex: 1; justify-content: center;
        }
        .tp-tab.active { color: #fff; }
        .tp-tab:not(.active):hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.7); }

        .tp-layout {
          display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
        }
        @media (max-width: 900px) { .tp-layout { grid-template-columns: 1fr; } }

        .tp-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px; padding: 28px;
        }
        .tp-card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700; letter-spacing: .04em;
          color: rgba(255,255,255,.9); margin-bottom: 22px;
        }

        .tp-label {
          font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
          margin-bottom: 10px;
        }

        .tp-op-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 24px; }
        @media (max-width: 500px) { .tp-op-grid { grid-template-columns: repeat(2, 1fr); } }

        .tp-op-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 14px 8px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease; color: rgba(255,255,255,.6);
          font-size: 12px; font-weight: 600; letter-spacing: .03em;
          font-family: 'Barlow', sans-serif;
        }
        .tp-op-btn.active { color: #fff; }
        .tp-op-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-op-logo { width: 42px; height: 42px; object-fit: contain; display: block; }

        .tp-mode-toggle {
          display: flex; gap: 6px; margin-bottom: 22px;
          background: rgba(255,255,255,.04); border-radius: 9px; padding: 4px;
          border: 1px solid rgba(255,255,255,.06);
        }
        .tp-mode-btn {
          flex: 1; padding: 8px; border-radius: 6px;
          font-size: 13px; font-weight: 700; letter-spacing: .04em;
          border: none; cursor: pointer; transition: all .2s ease;
          background: transparent; color: rgba(255,255,255,.4);
          font-family: 'Barlow', sans-serif;
        }
        .tp-mode-btn.active { background: rgba(59,130,246,.2); color: #60A5FA; border: 1px solid rgba(59,130,246,.3); }

        .tp-nom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 24px; }
        @media (max-width: 500px) { .tp-nom-grid { grid-template-columns: repeat(2, 1fr); } }

        .tp-nom-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 12px 6px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease;
          font-family: 'Barlow', sans-serif; text-align: center;
          position: relative;
        }
        .tp-nom-btn.active { color: #fff; }
        .tp-nom-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-nom-val { font-size: 13px; font-weight: 700; }
        .tp-nom-price { font-size: 10px; color: rgba(255,255,255,.35); font-weight: 500; }
        .tp-nom-tag {
          position: absolute; top: -8px; left: 50%; transform: translateX(-50%);
          font-size: 9px; font-weight: 700; letter-spacing: .06em;
          padding: 2px 8px; border-radius: 4px; white-space: nowrap;
        }

        .tp-pkg-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .tp-pkg-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          cursor: pointer; transition: all .2s ease;
          font-family: 'Barlow', sans-serif;
        }
        .tp-pkg-btn.active { color: #fff; }
        .tp-pkg-btn:not(.active):hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.06); }
        .tp-pkg-name { font-size: 13px; font-weight: 700; }
        .tp-pkg-price { font-size: 13px; font-weight: 700; }
        .tp-pkg-tag {
          font-size: 9px; font-weight: 700; letter-spacing: .06em;
          padding: 2px 8px; border-radius: 4px; margin-left: 8px;
        }

        .tp-input-wrap { position: relative; margin-bottom: 20px; }
        .tp-input {
          width: 100%; padding: 13px 16px; border-radius: 10px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: #fff; font-size: 14px; font-weight: 500;
          font-family: 'Barlow', sans-serif; outline: none;
          transition: border-color .2s, background .2s;
        }
        .tp-input::placeholder { color: rgba(255,255,255,.25); }
        .tp-input:focus { border-color: rgba(255,255,255,.24); background: rgba(255,255,255,.07); }

        .tp-summary {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px; padding: 24px;
          position: sticky; top: 88px;
        }
        .tp-sum-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: rgba(255,255,255,.5); margin-bottom: 10px;
        }
        .tp-sum-row.total {
          font-size: 15px; font-weight: 700; color: #fff;
          padding-top: 12px; border-top: 1px solid rgba(255,255,255,.07); margin-top: 4px;
        }
        .tp-sum-val { font-weight: 700; color: rgba(255,255,255,.85); }

        .tp-cta {
          width: 100%; padding: 15px; border-radius: 11px;
          border: none; cursor: pointer;
          font-family: 'Rajdhani', sans-serif; font-size: 17px; font-weight: 700; letter-spacing: .06em;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all .22s ease; margin-top: 18px;
          position: relative; overflow: hidden;
        }
        .tp-cta:disabled { opacity: .45; cursor: not-allowed; }
        .tp-cta:not(:disabled):hover { transform: translateY(-1px); }
        .tp-cta::after {
          content:''; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          transform:skewX(-18deg); transition:left .45s;
        }
        .tp-cta:not(:disabled):hover::after { left:130%; }

        .tp-success {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 40px 20px; text-align: center;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .tp-spinner {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          animation: spin .7s linear infinite;
        }

        .tp-trust { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        .tp-trust-pill {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 100px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,.35); letter-spacing: .05em;
        }
      `}</style>

      <div className="tp-root">

        {/* Banner */}
        <div className="tp-banner">
          <div className="tp-banner-orb" style={{ width:500,height:500,top:-100,right:-100,background:"rgba(220,38,38,.06)" }} />
          <div className="tp-banner-orb" style={{ width:300,height:300,bottom:-80,left:-50,background:"rgba(59,130,246,.05)" }} />
          <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background:"rgba(220,38,38,.1)", border:"1px solid rgba(220,38,38,.3)",
              borderRadius:6, padding:"4px 12px", marginBottom:14,
            }}>
              <Zap size={11} color="#DC2626" fill="#DC2626" />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", color:"#DC2626", textTransform:"uppercase" }}>
                Layanan Digital
              </span>
            </div>
            <h1 style={{
              fontFamily:"'Rajdhani',sans-serif", fontSize:"clamp(28px,5vw,48px)",
              fontWeight:700, lineHeight:1.05, letterSpacing:"-.01em", marginBottom:10,
            }}>
              Top Up <span style={{ color:"#DC2626" }}>Pulsa, Token &amp; E-Wallet</span>
            </h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,.4)", maxWidth:520, lineHeight:1.65, marginBottom:24 }}>
              Proses instan, harga termurah, tersedia 24 jam. Pilih layanan yang kamu butuhkan.
            </p>
            <div className="tp-trust">
              {["⚡ Proses < 1 Menit","🔒 Transaksi Aman","💳 Bayar Pakai Saldo OkeGass","⭐ 4.9 / 5 Rating"].map(t=>(
                <div key={t} className="tp-trust-pill">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="tp-inner" style={{ marginTop:36 }}>

          {/* Tabs */}
          <div className="tp-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`tp-tab ${tab === t.id ? "active" : ""}`}
                style={tab === t.id ? { background:`${t.color}20`, border:`1px solid ${t.color}40`, color:t.color } : {}}
                onClick={() => switchTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <div className="tp-layout">

            {/* ── LEFT: form ── */}
            <div>

              {/* PULSA & DATA */}
              {tab === "pulsa" && (
                <div className="tp-card">
                  <div className="tp-card-title">Pulsa &amp; Paket Data</div>

                  <div className="tp-mode-toggle">
                    <button className={`tp-mode-btn ${pulsaMode==="pulsa"?"active":""}`} onClick={()=>{ setPulsaMode("pulsa"); setNominal(null); setDataPkg(""); }}>📶 Pulsa</button>
                    <button className={`tp-mode-btn ${pulsaMode==="data"?"active":""}`}  onClick={()=>{ setPulsaMode("data");  setNominal(null); setDataPkg(""); }}>📡 Paket Data</button>
                  </div>

                  <div className="tp-label">Pilih Operator</div>
                  <div className="tp-op-grid">
                    {OPERATORS.map(op => (
                      <button
                        key={op.id}
                        className={`tp-op-btn ${operator===op.id?"active":""}`}
                        style={operator===op.id ? { borderColor:`${op.color}60`, background:`${op.color}15`, color:"#fff" } : {}}
                        onClick={() => { setOperator(op.id); setNominal(null); setDataPkg(""); }}
                      >
                        <img src={op.logo} alt={op.label} className="tp-op-logo" />
                        {op.label}
                      </button>
                    ))}
                  </div>

                  {pulsaMode === "pulsa" ? (
                    <>
                      <div className="tp-label">Pilih Nominal</div>
                      <div className="tp-nom-grid">
                        {PULSA_NOMINAL.map(n => (
                          <button
                            key={n.val}
                            className={`tp-nom-btn ${nominal===n.val?"active":""}`}
                            style={nominal===n.val ? { borderColor:`${activeColor}60`, background:`${activeColor}15` } : {}}
                            onClick={() => setNominal(n.val)}
                          >
                            <span className="tp-nom-val">{n.label}</span>
                            <span className="tp-nom-price">{fmtRp(n.price)}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="tp-label">Pilih Paket Data</div>
                      <div className="tp-pkg-list">
                        {DATA_PACKAGES.map(pkg => (
                          <button
                            key={pkg.id}
                            className={`tp-pkg-btn ${dataPkg===pkg.id?"active":""}`}
                            style={dataPkg===pkg.id ? { borderColor:`${activeColor}60`, background:`${activeColor}15` } : {}}
                            onClick={() => setDataPkg(pkg.id)}
                          >
                            <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span className="tp-pkg-name">{pkg.label}</span>
                              {pkg.tag && (
                                <span className="tp-pkg-tag" style={{ background:`${activeColor}20`, color:activeColor, border:`1px solid ${activeColor}40` }}>
                                  {pkg.tag}
                                </span>
                              )}
                            </span>
                            <span className="tp-pkg-price" style={dataPkg===pkg.id?{color:activeColor}:{color:"rgba(255,255,255,.5)"}}>
                              {fmtRp(pkg.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="tp-label">Nomor HP</div>
                  <div className="tp-input-wrap">
                    <input
                      className="tp-input"
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g,""))}
                      maxLength={14}
                    />
                  </div>
                </div>
              )}

              {/* TOKEN PLN */}
              {tab === "pln" && (
                <div className="tp-card">
                  <div className="tp-card-title">Token Listrik PLN</div>

                  <div className="tp-label">Nomor Meter / ID Pelanggan</div>
                  <div className="tp-input-wrap">
                    <input
                      className="tp-input"
                      type="text"
                      placeholder="Contoh: 12345678910"
                      value={meter}
                      onChange={e => setMeter(e.target.value.replace(/\D/g,""))}
                      maxLength={13}
                      style={{ borderColor: meter.length >= 11 ? "rgba(245,158,11,.4)" : undefined }}
                    />
                  </div>

                  <div className="tp-label">Pilih Nominal Token</div>
                  <div className="tp-nom-grid">
                    {PLN_NOMINAL.map(n => (
                      <button
                        key={n.val}
                        className={`tp-nom-btn ${nominal===n.val?"active":""}`}
                        style={nominal===n.val ? { borderColor:"rgba(245,158,11,.6)", background:"rgba(245,158,11,.15)" } : {}}
                        onClick={() => setNominal(n.val)}
                      >
                        <span className="tp-nom-val" style={nominal===n.val?{color:"#F59E0B"}:{}}>{fmtRp(n.val)}</span>
                        <span className="tp-nom-price">{n.label}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{
                    padding:"12px 14px", borderRadius:10, marginTop:4,
                    background:"rgba(245,158,11,.07)", border:"1px solid rgba(245,158,11,.2)",
                    fontSize:12, color:"rgba(245,158,11,.8)", lineHeight:1.6,
                  }}>
                    💡 Token akan dikirim ke nomor HP yang terdaftar di PLN dan ditampilkan di layar ini setelah pembayaran berhasil.
                  </div>
                </div>
              )}

              {/* E-WALLET */}
              {tab === "ewallet" && (
                <div className="tp-card">
                  <div className="tp-card-title">Top Up E-Wallet</div>

                  <div className="tp-label">Pilih E-Wallet</div>
                  <div className="tp-op-grid">
                    {EWALLETS.map(ew => (
                      <button
                        key={ew.id}
                        className={`tp-op-btn ${ewallet===ew.id?"active":""}`}
                        style={ewallet===ew.id ? { borderColor:`${ew.color}60`, background:`${ew.color}15`, color:"#fff" } : {}}
                        onClick={() => { setEwallet(ew.id); setNominal(null); }}
                      >
                        <span style={{ fontSize:28 }}>{ew.logo}</span>
                        {ew.label}
                      </button>
                    ))}
                  </div>

                  <div className="tp-label">Pilih Nominal</div>
                  <div className="tp-nom-grid">
                    {EWALLET_NOMINAL.map(n => (
                      <button
                        key={n.val}
                        className={`tp-nom-btn ${nominal===n.val?"active":""}`}
                        style={nominal===n.val ? { borderColor:`${activeColor}60`, background:`${activeColor}15` } : {}}
                        onClick={() => setNominal(n.val)}
                      >
                        <span className="tp-nom-val" style={nominal===n.val?{color:activeColor}:{}}>{fmtRp(n.val)}</span>
                        <span className="tp-nom-price">{fmtRp(n.price)}</span>
                      </button>
                    ))}
                  </div>

                  <div className="tp-label">Nomor HP / Akun E-Wallet</div>
                  <div className="tp-input-wrap">
                    <input
                      className="tp-input"
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g,""))}
                      maxLength={14}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: summary ── */}
            <div>
              {ordered ? (
                <div className="tp-summary">
                  <div className="tp-success">
                    <CheckCircle2 size={56} color="#10B981" />
                    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#10B981" }}>
                      Pesanan Berhasil!
                    </div>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.65 }}>
                      Transaksi sedang diproses. Token / saldo akan masuk dalam beberapa detik.
                    </p>
                    {/* Saldo setelah transaksi */}
                    <div style={{
                      width:"100%", padding:"12px 16px", borderRadius:10, marginTop:4,
                      background:"rgba(16,185,129,.07)", border:"1px solid rgba(16,185,129,.2)",
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <Wallet size={13} color="#10B981" />
                        <span style={{ fontSize:12, color:"rgba(255,255,255,.4)", fontWeight:600 }}>Saldo tersisa</span>
                      </div>
                      <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700, color:"#10B981" }}>
                        {fmtRp(balance)}
                      </span>
                    </div>
                    <button
                      className="tp-cta"
                      style={{ background:"rgba(16,185,129,.15)", border:"1px solid rgba(16,185,129,.35)", color:"#10B981", marginTop:8 }}
                      onClick={resetForm}
                    >
                      Transaksi Baru
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tp-summary">
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:17, fontWeight:700, marginBottom:16, color:"rgba(255,255,255,.9)" }}>
                    Ringkasan Pesanan
                  </div>

                  {/* ── Wallet balance strip ── */}
                  <div style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"10px 14px", borderRadius:10, marginBottom:16,
                    background: isShort ? "rgba(248,113,113,.06)" : "rgba(255,255,255,.04)",
                    border: `1px solid ${isShort ? "rgba(248,113,113,.35)" : "rgba(255,255,255,.07)"}`,
                    transition:"all .2s",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Wallet size={13} color={isShort ? "#F87171" : "#DC2626"} />
                      <span style={{ fontSize:12, color:"rgba(255,255,255,.4)", fontWeight:600 }}>Saldo OkeGass</span>
                    </div>
                    <span style={{
                      fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700,
                      color: isShort ? "#F87171" : "#fff",
                    }}>
                      {fmtRp(balance)}
                    </span>
                  </div>

                  {/* Insufficient funds warning */}
                  {insufficientFunds && (
                    <div style={{
                      display:"flex", gap:8, alignItems:"flex-start",
                      padding:"10px 12px", borderRadius:9, marginBottom:14,
                      background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.3)",
                      fontSize:12, color:"#F87171", lineHeight:1.55,
                    }}>
                      <AlertCircle size={13} style={{ flexShrink:0, marginTop:1 }} />
                      <span>
                        Saldo tidak cukup.{" "}
                        <button
                          onClick={() => navigate("/wallet")}
                          style={{ background:"none", border:"none", cursor:"pointer", color:"#DC2626", fontWeight:700, fontSize:12, padding:0, fontFamily:"'Barlow',sans-serif", textDecoration:"underline" }}
                        >
                          Top Up dulu →
                        </button>
                      </span>
                    </div>
                  )}

                  {/* Summary rows */}
                  {tab === "pulsa" && operator && (
                    <div className="tp-sum-row">
                      <span>Operator</span>
                      <span className="tp-sum-val">{OPERATORS.find(o=>o.id===operator)?.label}</span>
                    </div>
                  )}
                  {tab === "pulsa" && pulsaMode === "pulsa" && nominal && (
                    <div className="tp-sum-row">
                      <span>Nominal</span>
                      <span className="tp-sum-val">{fmtRp(nominal)}</span>
                    </div>
                  )}
                  {tab === "pulsa" && pulsaMode === "data" && dataPkg && (
                    <div className="tp-sum-row">
                      <span>Paket</span>
                      <span className="tp-sum-val">{DATA_PACKAGES.find(d=>d.id===dataPkg)?.label}</span>
                    </div>
                  )}
                  {tab === "pln" && meter && (
                    <div className="tp-sum-row">
                      <span>No. Meter</span>
                      <span className="tp-sum-val">{meter}</span>
                    </div>
                  )}
                  {tab === "pln" && nominal && (
                    <div className="tp-sum-row">
                      <span>Token</span>
                      <span className="tp-sum-val">{fmtRp(nominal)}</span>
                    </div>
                  )}
                  {tab === "ewallet" && ewallet && (
                    <div className="tp-sum-row">
                      <span>E-Wallet</span>
                      <span className="tp-sum-val">{EWALLETS.find(e=>e.id===ewallet)?.label}</span>
                    </div>
                  )}
                  {tab === "ewallet" && nominal && (
                    <div className="tp-sum-row">
                      <span>Nominal</span>
                      <span className="tp-sum-val">{fmtRp(nominal)}</span>
                    </div>
                  )}
                  {(phone || meter) && (
                    <div className="tp-sum-row">
                      <span>{tab === "pln" ? "No. Meter" : "No. HP"}</span>
                      <span className="tp-sum-val">{tab === "pln" ? meter : phone}</span>
                    </div>
                  )}

                  {price > 0 && (
                    <>
                      <div className="tp-sum-row">
                        <span>Biaya Admin</span>
                        <span className="tp-sum-val" style={{ color:"rgba(255,255,255,.4)" }}>Gratis</span>
                      </div>
                      <div className="tp-sum-row total">
                        <span>Total Bayar</span>
                        <span style={{ color: isShort ? "#F87171" : activeColor, fontFamily:"'Rajdhani',sans-serif", fontSize:18 }}>
                          {fmtRp(price)}
                        </span>
                      </div>
                      {/* Saldo setelah jika cukup */}
                      {!isShort && (
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"rgba(255,255,255,.25)", marginTop:6 }}>
                          <span>Saldo setelah bayar</span>
                          <span>{fmtRp(balance - price)}</span>
                        </div>
                      )}
                    </>
                  )}

                  {!price && (
                    <div style={{ textAlign:"center", padding:"28px 0", fontSize:13, color:"rgba(255,255,255,.2)" }}>
                      Pilih layanan &amp; nominal<br/>untuk melihat ringkasan
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    className="tp-cta"
                    disabled={!canOrder() || loading}
                    style={{
                      background: canOrder()
                        ? `linear-gradient(135deg, ${activeColor}cc, ${activeColor}88)`
                        : "rgba(255,255,255,.06)",
                      border: canOrder()
                        ? `1px solid ${activeColor}60`
                        : "1px solid rgba(255,255,255,.08)",
                      color: canOrder() ? "#fff" : "rgba(255,255,255,.25)",
                    }}
                    onClick={handleOrder}
                  >
                    {loading ? (
                      <><div className="tp-spinner" /> Memproses...</>
                    ) : (
                      <>Bayar Pakai Saldo <ArrowRight size={16} /></>
                    )}
                  </button>

                  <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:18 }}>
                    {["🔒 Transaksi terenkripsi SSL","⚡ Proses otomatis real-time","💰 Saldo terpotong otomatis"].map(t => (
                      <div key={t} style={{ fontSize:11, color:"rgba(255,255,255,.25)", display:"flex", alignItems:"center", gap:6 }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}