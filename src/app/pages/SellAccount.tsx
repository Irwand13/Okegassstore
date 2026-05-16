import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Tag, ChevronRight, ChevronLeft, CheckCircle, Upload,
  Shield, AlertCircle, Info, Camera, Gamepad2, DollarSign,
  FileText, Star, X, Zap
} from "lucide-react";

const games = [
  { id: "ml", name: "Mobile Legends", color: "#1E88E5", glow: "rgba(30,136,229,0.3)" },
  { id: "ff", name: "Free Fire", color: "#FF6F00", glow: "rgba(255,111,0,0.3)" },
  { id: "pubg", name: "PUBG Mobile", color: "#6366F1", glow: "rgba(99,102,241,0.3)" },
  { id: "genshin", name: "Genshin Impact", color: "#A78BFA", glow: "rgba(167,139,250,0.3)" },
  { id: "valorant", name: "Valorant", color: "#FF4655", glow: "rgba(255,70,85,0.3)" },
  { id: "hok", name: "Honor of Kings", color: "#D4AF37", glow: "rgba(212,175,55,0.3)" },
  { id: "cod", name: "Call of Duty Mobile", color: "#2E7D32", glow: "rgba(46,125,50,0.3)" },
  { id: "other", name: "Lainnya", color: "#78909C", glow: "rgba(120,144,156,0.3)" },
];

const ranksByGame: Record<string, string[]> = {
  ml: ["Warrior", "Elite", "Master", "Grandmaster", "Epic", "Legend", "Mythic", "Mythic Honor", "Mythic Glory"],
  ff: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Heroic", "Grandmaster"],
  pubg: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown", "Ace", "Conqueror"],
  genshin: ["AR 1-29", "AR 30-39", "AR 40-44", "AR 45-49", "AR 50-54", "AR 55+", "AR 60"],
  valorant: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"],
  hok: ["Warrior", "Sentinel", "Militia", "Veteran", "Elite", "Master", "Grandmaster", "Supreme Legend"],
  cod: ["Rookie", "Veteran", "Pro", "Master", "Legendary"],
  other: ["Rendah", "Sedang", "Tinggi", "Sangat Tinggi"],
};

const steps = [
  { id: 1, label: "Info Game", icon: Gamepad2 },
  { id: 2, label: "Detail Akun", icon: FileText },
  { id: 3, label: "Foto & Harga", icon: Camera },
  { id: 4, label: "Review", icon: Star },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.sell-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero */
.sell-hero {
  position: relative; padding: 44px 0 36px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.sell-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.sell-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}
.sell-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent); }

/* Steps */
.sell-steps { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; position: relative; }
.sell-steps-line { position: absolute; top: 20px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(220,38,38,0.4), rgba(255,255,255,0.1)); z-index: 0; }
.sell-steps-progress {
  position: absolute; top: 20px; left: 0; height: 1px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
  transition: width 0.5s ease; z-index: 1;
}
.sell-step {
  display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; z-index: 10;
}
.sell-step-circle {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; font-size: 0;
}
.sell-step.done .sell-step-circle { background: linear-gradient(135deg, #DC2626, #EA580C); border-color: #DC2626; }
.sell-step.active .sell-step-circle { background: #fff; border-color: #DC2626; color: #DC2626; }
.sell-step.active .sell-step-label { color: #DC2626; font-weight: 700; }
.sell-step-label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: rgba(255,255,255,0.25); }

/* Card */
.sell-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 28px; animation: fadeInUp 0.4s ease;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

/* Section */
.sell-section { margin-bottom: 28px; }
.sell-section-title { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.sell-section-desc { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 20px; }

/* Input */
.sell-input-wrap { margin-bottom: 16px; }
.sell-input-label {
  display: block; font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.45); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.sell-input, .sell-textarea, .sell-select {
  width: 100%; padding: 11px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.sell-input::placeholder, .sell-textarea::placeholder { color: rgba(255,255,255,0.15); }
.sell-input:focus, .sell-textarea:focus, .sell-select:focus {
  border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
}
.sell-textarea { resize: vertical; min-height: 100px; }
.sell-select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 10px center; background-size: 16px; padding-right: 36px; cursor: pointer; }

/* Game selector */
.sell-game-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 12px; margin-bottom: 20px; }
.sell-game-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 12px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.25s;
  text-decoration: none;
}
.sell-game-btn:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
.sell-game-btn.active {
  border-color: #DC2626; background: rgba(220,38,38,0.1);
}
.sell-game-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.sell-game-name { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.2; }

/* Rank grid */
.sell-rank-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)); gap: 8px; }
.sell-rank-btn {
  padding: 8px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; text-align: center;
}
.sell-rank-btn:hover { border-color: rgba(255,255,255,0.15); }
.sell-rank-btn.active { background: rgba(220,38,38,0.12); border-color: #DC2626; color: #DC2626; }

/* Photo upload */
.sell-photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
.sell-photo-item {
  aspect-ratio: 1; border-radius: 10px; display: flex;
  align-items: center; justify-content: center; flex-direction: column;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
}
.sell-photo-item.filled { background: rgba(16,185,129,0.07); border-color: rgba(16,185,129,0.3); }
.sell-photo-item.upload-btn { border: 2px dashed rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s; }
.sell-photo-item.upload-btn:hover { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

/* Checkbox */
.sell-checkbox { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; margin-bottom: 12px; }
.sell-check-box {
  width: 18px; height: 18px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
  transition: all 0.2s; margin-top: 1px;
}
.sell-checkbox input:checked ~ .sell-check-box { background: linear-gradient(135deg, #DC2626, #EA580C); border-color: #DC2626; }
.sell-checkbox-label { font-size: 13px; color: rgba(255,255,255,0.5); transition: color 0.2s; }
.sell-checkbox:hover .sell-checkbox-label { color: rgba(255,255,255,0.8); }

/* Info boxes */
.sell-info-box {
  display: flex; gap: 12px; padding: 14px; border-radius: 12px;
  margin-bottom: 16px; font-size: 12px;
}
.sell-info-box.blue { background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.2); }
.sell-info-box.amber { background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.2); }
.sell-info-icon { width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px; }
.sell-info-title { font-weight: 700; margin-bottom: 4px; }
.sell-info-list { list-style: none; padding: 0; margin: 0; }
.sell-info-list li { padding: 2px 0; }

/* Success screen */
.sell-success {
  text-align: center; padding: 60px 20px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.sell-success-icon {
  width: 80px; height: 80px; background: rgba(16,185,129,0.1);
  border: 2px solid rgba(16,185,129,0.3); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}

/* Buttons */
.sell-btn {
  padding: 11px 18px; border-radius: 10px; border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: inline-flex;
  align-items: center; justify-content: center; gap: 6px;
}
.sell-btn-primary {
  background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff;
  box-shadow: 0 4px 14px rgba(220,38,38,0.3);
}
.sell-btn-primary:hover { box-shadow: 0 8px 24px rgba(220,38,38,0.5); transform: translateY(-1px); }
.sell-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.sell-btn-secondary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
}
.sell-btn-secondary:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); color: #fff; }

/* Summary card */
.sell-summary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 16px; margin-bottom: 16px;
}
.sell-summary-row {
  display: flex; justify-content: space-between;
  padding: 8px 0; font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.sell-summary-row:last-child { border-bottom: none; }
.sell-summary-label { color: rgba(255,255,255,0.35); }
.sell-summary-value { color: rgba(255,255,255,0.8); font-weight: 600; font-family: 'Rajdhani', sans-serif; }
.sell-summary-row.total .sell-summary-value { color: #DC2626; font-size: 18px; }

/* Helper text */
.sell-helper { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 5px; display: flex; align-items: center; gap: 4px; }

/* Button group */
.sell-btn-group { display: flex; gap: 10px; margin-top: 24px; }
.sell-btn-group .sell-btn { flex: 1; }
`;

interface FormData {
  game: string;
  rank: string;
  title: string;
  description: string;
  heroes: string;
  skins: string;
  battlePass: string;
  email: string;
  price: string;
  negotiable: boolean;
  photos: string[];
  whatsapp: string;
  agreeTerms: boolean;
}

export default function SellAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    game: "",
    rank: "",
    title: "",
    description: "",
    heroes: "",
    skins: "",
    battlePass: "",
    email: "",
    price: "",
    negotiable: false,
    photos: [],
    whatsapp: "",
    agreeTerms: false,
  });

  const update = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedGame = games.find((g) => g.id === form.game);
  const ranks = form.game ? ranksByGame[form.game] || [] : [];

  const canProceed = () => {
    if (step === 1) return !!form.game && !!form.rank;
    if (step === 2) return !!form.title && !!form.description && form.title.length >= 10;
    if (step === 3) return !!form.price && !!form.whatsapp;
    if (step === 4) return form.agreeTerms;
    return false;
  };

  const handleSubmit = () => setSubmitted(true);

  const handlePhotoAdd = () => {
    if (form.photos.length < 5) {
      update("photos", [...form.photos, `Photo ${form.photos.length + 1}`]);
    }
  };

  if (submitted) {
    return (
      <div className="sell-root">
        <style>{STYLES}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="sell-success" style={{ maxWidth: 480 }}>
            <div className="sell-success-icon">
              <CheckCircle size={40} color="#10B981" />
            </div>
            <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
              Listing Berhasil!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 8px" }}>
              Akun <strong style={{ color: "#fff" }}>{selectedGame?.name} ({form.rank})</strong> sedang dalam proses verifikasi
            </p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: "0 0 24px" }}>
              Tim kami akan meninjau dalam <strong>1x24 jam</strong>. Notifikasi akan dikirim via WhatsApp.
            </p>

            <div className="sell-info-box blue" style={{ display: "block", marginBottom: 24 }}>
              <div className="sell-info-title" style={{ color: "#10B981", textAlign: "left" }}>Langkah Selanjutnya</div>
              <ul className="sell-info-list" style={{ color: "rgba(16,185,129,0.7)", fontSize: 12, textAlign: "left", marginTop: 8 }}>
                <li>✓ Cek WhatsApp untuk konfirmasi</li>
                <li>✓ Pantau status di halaman Profile</li>
                <li>✓ Akun akan aktif setelah verifikasi</li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm({
                    game: "", rank: "", title: "", description: "", heroes: "",
                    skins: "", battlePass: "", email: "", price: "", negotiable: false,
                    photos: [], whatsapp: "", agreeTerms: false,
                  });
                }}
                className="sell-btn sell-btn-secondary"
                style={{ flex: 1 }}
              >
                Jual Akun Lagi
              </button>
              <button onClick={() => navigate("/profile")} className="sell-btn sell-btn-primary" style={{ flex: 1 }}>
                <Zap size={14} />
                Lihat Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="sell-hero">
        <div className="sell-hero-bg" />
        <div className="sell-hero-grid" />
        <div className="sell-hero-line" />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 6, padding: "4px 12px", marginBottom: 14 }}>
            <Tag size={14} color="#DC2626" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", textTransform: "uppercase", fontFamily: "'Barlow',sans-serif" }}>
              Jual Akun
            </span>
          </div>
          <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
            Jual Akun <span style={{ color: "#DC2626" }}>Game Kamu</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0, fontFamily: "'Barlow',sans-serif" }}>
            Listing akun dengan aman menggunakan sistem Escrow terpercaya
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Steps */}
        <div className="sell-steps">
          <div className="sell-steps-line" />
          <div className="sell-steps-progress" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />

          {steps.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;

            return (
              <div key={s.id} className={`sell-step ${done ? "done" : ""} ${active ? "active" : ""}`}>
                <div className="sell-step-circle">
                  {done ? <CheckCircle size={16} color="#fff" /> : <Icon size={16} />}
                </div>
                <span className="sell-step-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="sell-card">

          {/* STEP 1: Game & Rank */}
          {step === 1 && (
            <div>
              <div className="sell-section-title">Pilih Game</div>
              <div className="sell-section-desc">Pilih game yang akunnya ingin kamu jual</div>

              <div className="sell-game-grid">
                {games.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      update("game", g.id);
                      update("rank", "");
                    }}
                    className={`sell-game-btn ${form.game === g.id ? "active" : ""}`}
                    style={form.game === g.id ? { borderColor: g.color, background: g.glow } : {}}
                  >
                    <div className="sell-game-icon" style={form.game === g.id ? { background: g.color + "20" } : {}}>
                      {g.name.charAt(0)}
                    </div>
                    <span className="sell-game-name" style={form.game === g.id ? { color: g.color } : {}}>
                      {g.name}
                    </span>
                    {form.game === g.id && <CheckCircle size={12} color={g.color} />}
                  </button>
                ))}
              </div>

              {form.game && (
                <div style={{ marginTop: 20, animation: "fadeInUp 0.3s ease" }}>
                  <div className="sell-input-label">Rank / Tingkatan Akun *</div>
                  <div className="sell-rank-grid">
                    {ranks.map((r) => (
                      <button
                        key={r}
                        onClick={() => update("rank", r)}
                        className={`sell-rank-btn ${form.rank === r ? "active" : ""}`}
                        style={form.rank === r ? { borderColor: selectedGame?.color } : {}}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <div>
              <div className="sell-section-title">Detail Akun</div>
              <div className="sell-section-desc">Berikan informasi lengkap agar pembeli tertarik</div>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Judul Listing * (min. 10 karakter)</label>
                <input
                  type="text"
                  className="sell-input"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder={`Akun ${selectedGame?.name} ${form.rank} Full Skin Lengkap`}
                />
                <div className="sell-helper">
                  {form.title.length} karakter
                </div>
              </div>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Deskripsi Akun *</label>
                <textarea
                  className="sell-textarea"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Jelaskan detail akun: jumlah hero, skin rare, event terbatas, dll..."
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
                <div className="sell-input-wrap" style={{ marginBottom: 0 }}>
                  <label className="sell-input-label">Heroes</label>
                  <input
                    type="text"
                    className="sell-input"
                    value={form.heroes}
                    onChange={(e) => update("heroes", e.target.value)}
                    placeholder="120+"
                  />
                </div>
                <div className="sell-input-wrap" style={{ marginBottom: 0 }}>
                  <label className="sell-input-label">Skins</label>
                  <input
                    type="text"
                    className="sell-input"
                    value={form.skins}
                    onChange={(e) => update("skins", e.target.value)}
                    placeholder="200+"
                  />
                </div>
                <div className="sell-input-wrap" style={{ marginBottom: 0 }}>
                  <label className="sell-input-label">Battle Pass</label>
                  <input
                    type="text"
                    className="sell-input"
                    value={form.battlePass}
                    onChange={(e) => update("battlePass", e.target.value)}
                    placeholder="Season 30"
                  />
                </div>
              </div>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Email Akun (Opsional)</label>
                <input
                  type="email"
                  className="sell-input"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@gmail.com"
                />
                <div className="sell-helper">
                  <Shield size={12} /> Email tidak ditampilkan publik
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Photos & Price */}
          {step === 3 && (
            <div>
              <div className="sell-section-title">Foto & Harga</div>
              <div className="sell-section-desc">Upload screenshot dan tentukan harga</div>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Screenshot Akun (Maks. 5 foto)</label>
                <div className="sell-photo-grid">
                  {form.photos.map((_, i) => (
                    <div key={i} className="sell-photo-item filled">
                      <CheckCircle size={20} color="#10B981" />
                      <div style={{ fontSize: 9, color: "#10B981", marginTop: 4, fontWeight: 700 }}>
                        Foto {i + 1}
                      </div>
                    </div>
                  ))}
                  {form.photos.length < 5 && (
                    <button onClick={handlePhotoAdd} className="sell-photo-item upload-btn">
                      <Upload size={18} color="rgba(255,255,255,0.2)" />
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 4, fontWeight: 700 }}>
                        Tambah Foto
                      </div>
                    </button>
                  )}
                </div>
                <div className="sell-helper">
                  <Info size={12} /> Upload screenshot rank, koleksi hero/skin
                </div>
              </div>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Harga Jual (Rp) *</label>
                <input
                  type="number"
                  className="sell-input"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="2500000"
                  style={{ paddingLeft: 14 }}
                />
                {form.price && (
                  <div style={{ fontSize: 12, color: "#DC2626", fontWeight: 700, marginTop: 6, fontFamily: "'Rajdhani',sans-serif" }}>
                    = Rp {parseInt(form.price).toLocaleString("id-ID")}
                  </div>
                )}
              </div>

              <label className="sell-checkbox">
                <input
                  type="checkbox"
                  checked={form.negotiable}
                  onChange={(e) => update("negotiable", e.target.checked)}
                  style={{ display: "none" }}
                />
                <span className="sell-check-box" />
                <span className="sell-checkbox-label">Harga bisa dinegosiasikan</span>
              </label>

              <div className="sell-input-wrap">
                <label className="sell-input-label">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  className="sell-input"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="08123456789"
                />
                <div className="sell-helper">Untuk notifikasi dan komunikasi dengan pembeli</div>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div>
              <div className="sell-section-title">Review Listing</div>
              <div className="sell-section-desc">Periksa kembali informasi sebelum submit</div>

              <div className="sell-summary">
                <div className="sell-summary-row">
                  <span className="sell-summary-label">Game</span>
                  <span className="sell-summary-value">{selectedGame?.name} - {form.rank}</span>
                </div>
                <div className="sell-summary-row">
                  <span className="sell-summary-label">Judul</span>
                  <span className="sell-summary-value" style={{ textAlign: "right", maxWidth: 200 }}>{form.title || "-"}</span>
                </div>
                <div className="sell-summary-row">
                  <span className="sell-summary-label">Heroes</span>
                  <span className="sell-summary-value">{form.heroes || "-"}</span>
                </div>
                <div className="sell-summary-row">
                  <span className="sell-summary-label">Skins</span>
                  <span className="sell-summary-value">{form.skins || "-"}</span>
                </div>
                <div className="sell-summary-row">
                  <span className="sell-summary-label">Foto</span>
                  <span className="sell-summary-value">{form.photos.length} foto</span>
                </div>
                <div className="sell-summary-row total">
                  <span className="sell-summary-label">Harga</span>
                  <span className="sell-summary-value">
                    Rp {form.price ? parseInt(form.price).toLocaleString("id-ID") : "-"}
                    {form.negotiable && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}> (nego)</span>}
                  </span>
                </div>
              </div>

              <div className="sell-info-box blue">
                <Shield size={16} color="#10B981" />
                <div>
                  <div className="sell-info-title" style={{ color: "#10B981" }}>Dilindungi Sistem Escrow</div>
                  <ul className="sell-info-list" style={{ color: "rgba(16,185,129,0.7)" }}>
                    <li>• Dana pembeli ditahan hingga akun diterima</li>
                    <li>• Jika sengketa, tim mediasi</li>
                    <li>• Komisi 5% dari harga jual</li>
                  </ul>
                </div>
              </div>

              <div className="sell-info-box amber">
                <AlertCircle size={16} color="#F59E0B" />
                <div>
                  <div className="sell-info-title" style={{ color: "#F59E0B" }}>Syarat & Ketentuan</div>
                  <ul className="sell-info-list" style={{ color: "rgba(245,158,11,0.7)" }}>
                    <li>• Akun harus milik kamu sendiri</li>
                    <li>• Tidak boleh hasil hack/curian</li>
                    <li>• Informasi harus akurat</li>
                    <li>• Pelanggaran = ban permanen</li>
                  </ul>
                </div>
              </div>

              <label className="sell-checkbox">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  style={{ display: "none" }}
                />
                <span className="sell-check-box" />
                <span className="sell-checkbox-label">
                  Saya menyetujui <strong>Syarat & Ketentuan</strong> dan <strong>Kebijakan Privasi</strong> OkeGass Store
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="sell-btn-group">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="sell-btn sell-btn-secondary">
                <ChevronLeft size={14} /> Kembali
              </button>
            )}
            <button
              onClick={() => (step < 4 ? setStep(s => s + 1) : handleSubmit())}
              disabled={!canProceed()}
              className="sell-btn sell-btn-primary"
              style={{ marginLeft: "auto" }}
            >
              {step < 4 ? (
                <>
                  Lanjut <ChevronRight size={14} />
                </>
              ) : (
                <>
                  <CheckCircle size={14} /> Submit Listing
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}