import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Zap, ChevronRight, Shield, Clock, CreditCard, Wallet,
  Smartphone, CheckCircle, User, Hash, AlertCircle, ArrowLeft
} from "lucide-react";

const games = [
  { id: "ml",       name: "Mobile Legends",  color: "#1E88E5", glow: "rgba(30,136,229,0.3)",   currency: "Diamonds",        icon: "⚔️" },
  { id: "ff",       name: "Free Fire",        color: "#FF4500", glow: "rgba(255,69,0,0.3)",      currency: "Diamonds",        icon: "🔥" },
  { id: "pubg",     name: "PUBG Mobile",      color: "#F59E0B", glow: "rgba(245,158,11,0.3)",   currency: "UC",              icon: "🎯" },
  { id: "genshin",  name: "Genshin Impact",   color: "#A78BFA", glow: "rgba(167,139,250,0.3)",  currency: "Genesis Crystals", icon: "✨" },
  { id: "valorant", name: "Valorant",         color: "#FF4655", glow: "rgba(255,70,85,0.3)",    currency: "VP",              icon: "💀" },
  { id: "hok",      name: "Honor of Kings",   color: "#D4AF37", glow: "rgba(212,175,55,0.3)",   currency: "Tokens",          icon: "👑" },
];

const denominations: Record<string, { id: string; amount: number; label: string; price: number; bonus?: number; popular?: boolean }[]> = {
  ml: [
    { id: "ml1",  amount: 50,    label: "50 Diamonds",           price: 14000 },
    { id: "ml2",  amount: 75,    label: "75 Diamonds",           price: 20000 },
    { id: "ml3",  amount: 150,   label: "150 Diamonds",          price: 38000,   bonus: 15 },
    { id: "ml4",  amount: 250,   label: "250 Diamonds",          price: 60000,   popular: true },
    { id: "ml5",  amount: 500,   label: "500 Diamonds",          price: 115000,  bonus: 50 },
    { id: "ml6",  amount: 750,   label: "750 Diamonds",          price: 165000 },
    { id: "ml7",  amount: 1000,  label: "1000 Diamonds",         price: 210000,  bonus: 100, popular: true },
    { id: "ml8",  amount: 2000,  label: "2000 Diamonds",         price: 405000,  bonus: 200 },
    { id: "ml9",  amount: 5000,  label: "5000 Diamonds",         price: 990000,  bonus: 500 },
    { id: "ml10", amount: 10000, label: "10000 Diamonds",        price: 1950000, bonus: 1000 },
    { id: "ml11", amount: 500,   label: "Twilight Pass",         price: 65000 },
    { id: "ml12", amount: 300,   label: "Weekly Diamond Pass",   price: 32000 },
  ],
  ff: [
    { id: "ff1", amount: 70,   label: "70 Diamonds",   price: 17000 },
    { id: "ff2", amount: 140,  label: "140 Diamonds",  price: 32000 },
    { id: "ff3", amount: 355,  label: "355 Diamonds",  price: 79000,  popular: true },
    { id: "ff4", amount: 720,  label: "720 Diamonds",  price: 155000, bonus: 72 },
    { id: "ff5", amount: 1450, label: "1450 Diamonds", price: 300000, bonus: 145, popular: true },
    { id: "ff6", amount: 2900, label: "2900 Diamonds", price: 590000, bonus: 290 },
  ],
  pubg: [
    { id: "pubg1", amount: 60,   label: "60 UC",   price: 14000 },
    { id: "pubg2", amount: 180,  label: "180 UC",  price: 38000 },
    { id: "pubg3", amount: 325,  label: "325 UC",  price: 68000,  popular: true },
    { id: "pubg4", amount: 660,  label: "660 UC",  price: 135000, bonus: 60 },
    { id: "pubg5", amount: 1800, label: "1800 UC", price: 365000, bonus: 180, popular: true },
    { id: "pubg6", amount: 3850, label: "3850 UC", price: 750000, bonus: 350 },
  ],
  genshin: [
    { id: "gen1", amount: 60,   label: "60 Crystals",   price: 15000 },
    { id: "gen2", amount: 300,  label: "300 Crystals",  price: 72000,   bonus: 30 },
    { id: "gen3", amount: 980,  label: "980 Crystals",  price: 232000,  bonus: 110, popular: true },
    { id: "gen4", amount: 1980, label: "1980 Crystals", price: 462000,  bonus: 260 },
    { id: "gen5", amount: 3280, label: "3280 Crystals", price: 762000,  bonus: 600, popular: true },
    { id: "gen6", amount: 6480, label: "6480 Crystals", price: 1502000, bonus: 1600 },
  ],
  valorant: [
    { id: "val1", amount: 475,   label: "475 VP",   price: 50000 },
    { id: "val2", amount: 1000,  label: "1000 VP",  price: 100000 },
    { id: "val3", amount: 2050,  label: "2050 VP",  price: 200000, popular: true },
    { id: "val4", amount: 3650,  label: "3650 VP",  price: 350000, bonus: 100 },
    { id: "val5", amount: 5350,  label: "5350 VP",  price: 500000, bonus: 250, popular: true },
    { id: "val6", amount: 11000, label: "11000 VP", price: 1000000, bonus: 1000 },
  ],
  hok: [
    { id: "hok1", amount: 70,   label: "70 Tokens",   price: 15000 },
    { id: "hok2", amount: 180,  label: "180 Tokens",  price: 38000 },
    { id: "hok3", amount: 360,  label: "360 Tokens",  price: 75000,  popular: true },
    { id: "hok4", amount: 750,  label: "750 Tokens",  price: 150000 },
    { id: "hok5", amount: 1500, label: "1500 Tokens", price: 290000, bonus: 100, popular: true },
    { id: "hok6", amount: 3000, label: "3000 Tokens", price: 570000, bonus: 300 },
  ],
};

const paymentMethods = [
  { id: "gopay",     name: "GoPay",                  emoji: "💚", category: "E-Wallet" },
  { id: "ovo",       name: "OVO",                    emoji: "💜", category: "E-Wallet" },
  { id: "dana",      name: "DANA",                   emoji: "💙", category: "E-Wallet" },
  { id: "shopeepay", name: "ShopeePay",              emoji: "🧡", category: "E-Wallet" },
  { id: "bca",       name: "BCA Virtual Account",   emoji: "🏦", category: "Bank Transfer" },
  { id: "bni",       name: "BNI Virtual Account",   emoji: "🏦", category: "Bank Transfer" },
  { id: "mandiri",   name: "Mandiri Virtual Account", emoji: "🏦", category: "Bank Transfer" },
  { id: "qris",      name: "QRIS",                   emoji: "📱", category: "QR Code" },
  { id: "alfamart",  name: "Alfamart",               emoji: "🏪", category: "Minimarket" },
  { id: "indomaret", name: "Indomaret",              emoji: "🏪", category: "Minimarket" },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.tu-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
}

/* Header */
.tu-hero {
  position: relative;
  padding: 40px 0 36px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.tu-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(234,88,12,0.08) 50%, transparent 100%);
}

.tu-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}

.tu-hero-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);
}

/* Section card */
.tu-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}

.tu-card-top {
  position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}

.tu-step-num {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700; color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35);
}

.tu-section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px; font-weight: 700;
  color: #fff; margin: 0;
  letter-spacing: 0.02em;
}

/* Game cards */
.tu-game-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer;
  transition: all 0.22s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.tu-game-btn:hover {
  border-color: rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
}

.tu-game-btn.active {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.5);
}

.tu-game-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}

/* Denom cards */
.tu-denom-btn {
  position: relative;
  padding: 14px 14px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer;
  transition: all 0.22s ease;
  text-align: left;
  overflow: hidden;
}

.tu-denom-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  transform: translateY(-2px);
}

.tu-denom-btn.active {
  border-color: rgba(220,38,38,0.6);
  background: rgba(220,38,38,0.07);
}

.tu-denom-btn.active::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #DC2626, transparent);
}

.tu-popular-badge {
  position: absolute; top: -1px; right: 12px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff;
  font-size: 9px; font-weight: 700;
  padding: 3px 8px;
  border-radius: 0 0 6px 6px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: 'Barlow', sans-serif;
}

/* Input */
.tu-input-wrap label {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  font-family: 'Barlow', sans-serif;
}

.tu-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 12px 14px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px; font-weight: 500;
  color: #fff;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.tu-input::placeholder { color: rgba(255,255,255,0.2); }

.tu-input:focus {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
}

/* Payment method */
.tu-pay-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: pointer;
  transition: all 0.2s;
}

.tu-pay-btn:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
}

.tu-pay-btn.active {
  border-color: rgba(220,38,38,0.5);
  background: rgba(220,38,38,0.07);
}

.tu-cat-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.1em;
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 8px;
  font-family: 'Barlow', sans-serif;
}

/* Summary card */
.tu-summary {
  position: sticky; top: 84px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 24px;
  overflow: hidden;
}

.tu-summary-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
}

.tu-summary-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}

.tu-summary-row:last-of-type { border-bottom: none; }

.tu-proceed-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none; border-radius: 12px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(220,38,38,0.3);
}

.tu-proceed-btn:not(:disabled):hover {
  box-shadow: 0 10px 32px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}

.tu-proceed-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}

/* Success / Confirm pages */
.tu-page-center {
  min-height: 100vh;
  background: #0d0d0f;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.tu-confirm-card {
  width: 100%; max-width: 460px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
}

.tu-confirm-header {
  padding: 24px 28px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015);
}

.tu-confirm-body { padding: 24px 28px; }

.tu-row {
  display: flex; justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
}

.tu-row:last-child { border-bottom: none; }

.tu-alert {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 14px 16px;
  background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.2);
  border-radius: 10px;
  margin: 20px 0;
}

@keyframes tuFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tu-animate { animation: tuFadeUp 0.4s ease forwards; }

@keyframes successPop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.tu-success-icon { animation: successPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }

.tu-grid-main {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 960px) {
  .tu-grid-main { grid-template-columns: 1fr; }
  .tu-summary { position: static; }
}

.tu-games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (min-width: 600px) {
  .tu-games-grid { grid-template-columns: repeat(3, 1fr); }
}

.tu-denoms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (min-width: 600px) {
  .tu-denoms-grid { grid-template-columns: repeat(3, 1fr); }
}

.tu-pay-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (min-width: 600px) {
  .tu-pay-grid { grid-template-columns: repeat(3, 1fr); }
}
`;

export default function TopUp() {
  const [searchParams] = useSearchParams();
  const defaultGame = searchParams.get("game") || "ml";

  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [selectedDenom, setSelectedDenom] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isLoading, setIsLoading] = useState(false);

  const currentGame = games.find((g) => g.id === selectedGame)!;
  const currentDenoms = denominations[selectedGame] || [];
  const selectedDenomData = currentDenoms.find((d) => d.id === selectedDenom);
  const paymentCategories = [...new Set(paymentMethods.map((p) => p.category))];

  const handleProceed = () => {
    if (!userId || !selectedDenom || !selectedPayment) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep("success"); }, 2000);
  };

  const handleReset = () => {
    setStep("form");
    setSelectedDenom(null);
    setSelectedPayment(null);
    setUserId("");
    setServerId("");
  };

  // ─── SUCCESS ────────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="tu-root tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-animate" style={{ textAlign: "center", maxWidth: 420 }}>
          <div className="tu-success-icon" style={{
            width: 96, height: 96,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
          }}>
            <CheckCircle size={48} color="#10B981" strokeWidth={1.5} />
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#10B981", textTransform: "uppercase" as const }}>
              Transaksi Sukses
            </span>
          </div>

          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Pembayaran Berhasil!
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 6px" }}>
            {selectedDenomData?.label} untuk {currentGame.name}
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 4px" }}>
            ID: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{userId}{serverId ? ` (${serverId})` : ""}</span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 32px" }}>
            Item akan masuk dalam <strong style={{ color: "#10B981" }}>{"< 1 menit"}</strong>. Cek inbox game kamu!
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={handleReset} className="tu-proceed-btn" style={{ width: "auto", padding: "12px 24px" }}>
              <Zap size={15} fill="white" /> Top Up Lagi
            </button>
            <button
              onClick={() => window.location.href = "/profile"}
              style={{
                padding: "12px 24px", borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 15, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
            >
              Lihat Riwayat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── CONFIRM ────────────────────────────────────────────────────────────────
  if (step === "confirm") {
    const payment = paymentMethods.find((p) => p.id === selectedPayment);
    return (
      <div className="tu-root tu-page-center">
        <style>{STYLES}</style>
        <div className="tu-confirm-card tu-animate">
          <div className="tu-confirm-header">
            <button
              onClick={() => setStep("form")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.4)", fontSize: 13,
                fontFamily: "'Barlow', sans-serif", marginBottom: 16,
                padding: 0,
              }}
            >
              <ArrowLeft size={14} /> Kembali
            </button>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>
              Konfirmasi Pesanan
            </h2>
          </div>

          <div className="tu-confirm-body">
            {[
              { label: "Game", val: `${currentGame.icon} ${currentGame.name}` },
              { label: "User ID", val: `${userId}${serverId ? ` (${serverId})` : ""}` },
              { label: "Item", val: selectedDenomData?.label },
              ...(selectedDenomData?.bonus ? [{ label: "Bonus", val: `+${selectedDenomData.bonus} ${currentGame.currency}`, green: true }] : []),
              { label: "Metode Bayar", val: `${payment?.emoji} ${payment?.name}` },
            ].map((row) => (
              <div className="tu-row" key={row.label}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Barlow', sans-serif" }}>{row.label}</span>
                <span style={{
                  color: (row as any).green ? "#10B981" : "rgba(255,255,255,0.85)",
                  fontWeight: 600, fontFamily: "'Barlow', sans-serif", fontSize: 13,
                }}>
                  {row.val}
                </span>
              </div>
            ))}

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 0 0", borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: 4,
            }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                {formatRupiah(selectedDenomData?.price || 0)}
              </span>
            </div>

            <div className="tu-alert">
              <AlertCircle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>
                <strong style={{ color: "#F59E0B" }}>Penting:</strong> Pastikan User ID sudah benar. Kesalahan ID tidak dapat dikembalikan.
              </p>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="tu-proceed-btn"
            >
              {isLoading ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Memproses...
                </>
              ) : (
                <><Zap size={16} fill="white" /> Bayar Sekarang</>
              )}
            </button>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ─── MAIN FORM ──────────────────────────────────────────────────────────────
  return (
    <div className="tu-root">
      <style>{STYLES}</style>

      {/* Hero header */}
      <div className="tu-hero">
        <div className="tu-hero-bg" />
        <div className="tu-hero-grid" />
        <div className="tu-hero-line" />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 14,
          }}>
            <Zap size={11} color="#DC2626" fill="#DC2626" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", textTransform: "uppercase" as const, fontFamily: "'Barlow', sans-serif" }}>
              Top Up Game
            </span>
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
            Top Up <span style={{ color: "#DC2626" }}>Instan</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 20px", fontFamily: "'Barlow', sans-serif" }}>
            Proses otomatis, harga terbaik, 100% aman
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[
              { icon: <Clock size={12} />, label: "Proses < 1 Menit" },
              { icon: <Shield size={12} />, label: "100% Aman" },
              { icon: <CreditCard size={12} />, label: "10+ Metode Bayar" },
            ].map((b) => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "6px 14px",
                fontSize: 12, color: "rgba(255,255,255,0.5)",
                fontFamily: "'Barlow', sans-serif", fontWeight: 600,
              }}>
                <span style={{ color: "#DC2626" }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div className="tu-grid-main">

          {/* Left col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Step 1: Game */}
            <div className="tu-card tu-animate">
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">1</div>
                <h2 className="tu-section-title">Pilih Game</h2>
              </div>
              <div className="tu-games-grid">
                {games.map((game) => {
                  const active = selectedGame === game.id;
                  return (
                    <button
                      key={game.id}
                      className={`tu-game-btn ${active ? "active" : ""}`}
                      style={active ? { borderColor: `${game.color}60`, background: `${game.color}10` } : {}}
                      onClick={() => { setSelectedGame(game.id); setSelectedDenom(null); }}
                    >
                      <div className="tu-game-icon" style={{ background: `${game.color}15` }}>
                        {game.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.7)", lineHeight: 1.2 }}>
                          {game.name}
                        </div>
                        <div style={{ fontSize: 11, color: active ? game.color : "rgba(255,255,255,0.25)", marginTop: 2, fontWeight: 500 }}>
                          {game.currency}
                        </div>
                      </div>
                      {active && <CheckCircle size={14} color={game.color} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: User ID */}
            <div className="tu-card tu-animate" style={{ animationDelay: "80ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">2</div>
                <h2 className="tu-section-title">Masukkan User ID</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: (selectedGame === "ml" || selectedGame === "hok") ? "1fr 1fr" : "1fr", gap: 14 }}>
                <div className="tu-input-wrap">
                  <label><User size={11} /> User ID *</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Contoh: 123456789"
                    className="tu-input"
                  />
                </div>
                {(selectedGame === "ml" || selectedGame === "hok") && (
                  <div className="tu-input-wrap">
                    <label><Hash size={11} /> Server ID</label>
                    <input
                      type="text"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      placeholder="Contoh: 1234"
                      className="tu-input"
                    />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow', sans-serif" }}>
                <AlertCircle size={12} /> Pastikan User ID benar sebelum melanjutkan
              </div>
            </div>

            {/* Step 3: Denom */}
            <div className="tu-card tu-animate" style={{ animationDelay: "160ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">3</div>
                <h2 className="tu-section-title">Pilih Nominal</h2>
              </div>
              <div className="tu-denoms-grid">
                {currentDenoms.map((denom) => {
                  const active = selectedDenom === denom.id;
                  return (
                    <button
                      key={denom.id}
                      className={`tu-denom-btn ${active ? "active" : ""}`}
                      onClick={() => setSelectedDenom(denom.id)}
                    >
                      {denom.popular && <div className="tu-popular-badge">Populer</div>}
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 15, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.75)", marginBottom: 2 }}>
                        {denom.label}
                      </div>
                      {denom.bonus && (
                        <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginBottom: 4, fontFamily: "'Barlow', sans-serif" }}>
                          +{denom.bonus} Bonus
                        </div>
                      )}
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 17, fontWeight: 700, color: active ? "#DC2626" : "rgba(255,255,255,0.5)", marginTop: 2 }}>
                        {formatRupiah(denom.price)}
                      </div>
                      {active && (
                        <CheckCircle size={14} color="#DC2626" style={{ position: "absolute", top: 10, right: 10 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Payment */}
            <div className="tu-card tu-animate" style={{ animationDelay: "240ms" }}>
              <div className="tu-card-top" />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="tu-step-num">4</div>
                <h2 className="tu-section-title">Metode Pembayaran</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {paymentCategories.map((cat) => (
                  <div key={cat}>
                    <div className="tu-cat-label">
                      {cat === "E-Wallet" && <Wallet size={11} />}
                      {cat === "Bank Transfer" && <CreditCard size={11} />}
                      {cat === "QR Code" && <Smartphone size={11} />}
                      {cat}
                    </div>
                    <div className="tu-pay-grid">
                      {paymentMethods.filter((p) => p.category === cat).map((pm) => {
                        const active = selectedPayment === pm.id;
                        return (
                          <button
                            key={pm.id}
                            className={`tu-pay-btn ${active ? "active" : ""}`}
                            onClick={() => setSelectedPayment(pm.id)}
                          >
                            <span style={{ fontSize: 18 }}>{pm.emoji}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'Barlow', sans-serif", flex: 1, textAlign: "left" }}>
                              {pm.name}
                            </span>
                            {active && <CheckCircle size={13} color="#DC2626" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="tu-summary">
              <div className="tu-summary-line" />
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>
                Ringkasan Pesanan
              </h3>

              <div style={{ marginBottom: 16 }}>
                {[
                  { label: "Game", val: `${currentGame.icon} ${currentGame.name}` },
                  { label: "User ID", val: userId || null },
                  { label: "Item", val: selectedDenomData?.label || null },
                  ...(selectedDenomData?.bonus ? [{ label: "Bonus", val: `+${selectedDenomData.bonus}`, green: true }] : []),
                  { label: "Pembayaran", val: paymentMethods.find((p) => p.id === selectedPayment)?.name || null },
                ].map((row) => (
                  <div className="tu-summary-row" key={row.label}>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow', sans-serif" }}>{row.label}</span>
                    <span style={{
                      color: (row as any).green ? "#10B981" : row.val ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      fontWeight: 600, fontSize: 13, fontFamily: "'Barlow', sans-serif",
                      maxWidth: 160, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {row.val || "Belum dipilih"}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: "16px 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                marginBottom: 18,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Total</span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#DC2626" }}>
                  {selectedDenomData ? formatRupiah(selectedDenomData.price) : "Rp 0"}
                </span>
              </div>

              <button
                className="tu-proceed-btn"
                disabled={!userId || !selectedDenom || !selectedPayment}
                onClick={handleProceed}
              >
                Lanjut ke Pembayaran <ChevronRight size={16} />
              </button>

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: <Shield size={12} color="#10B981" />, label: "Transaksi dienkripsi SSL" },
                  { icon: <Clock size={12} color="#3B82F6" />, label: "Proses otomatis 24/7" },
                ].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Barlow', sans-serif" }}>
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