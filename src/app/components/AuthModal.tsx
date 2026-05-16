import { useState, useEffect } from "react";
import { X, Eye, EyeOff, CheckCircle, Shield, Zap, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// ROOT CAUSE FIX:
//   Navbar calls setShowAuthModal(true) via AuthContext.
//   AuthModal MUST read showAuthModal from the SAME AuthContext — not a local stub.
//   Previously the stub had its own useState(true) isolated from Navbar's context.
// ─────────────────────────────────────────────────────────────────────────────

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

/* ── Overlay ── */
.am-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  padding: 16px; font-family: 'Barlow', sans-serif;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: am-fade 0.2s ease;
}

/* ── Modal ── */
.am-modal {
  position: relative; width: 100%; max-width: 460px;
  background: #0f0f12;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px; overflow: hidden;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.9),
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 1px 0 rgba(255,255,255,0.06);
  animation: am-up 0.32s cubic-bezier(0.34,1.56,0.64,1);
}

/* ── Hero ── */
.am-hero {
  position: relative; padding: 30px 28px 26px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.am-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,
    rgba(220,38,38,0.22) 0%,
    rgba(234,88,12,0.10) 45%,
    rgba(0,0,0,0) 100%);
}
.am-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 28px 28px;
}
.am-hero-glow {
  position: absolute; top: -60px; left: -60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.am-hero-glow2 {
  position: absolute; bottom: -40px; right: -20px;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%);
  pointer-events: none;
}

/* ── Brand ── */
.am-brand {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.am-brand-left { display: flex; align-items: center; gap: 14px; }
.am-brand-icon {
  width: 52px; height: 52px; border-radius: 16px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  box-shadow: 0 8px 24px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  position: relative; overflow: hidden;
}
.am-brand-icon::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  border-radius: 16px 16px 0 0;
}
.am-brand-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 28px; font-weight: 700; color: #fff; letter-spacing: 0.5px;
  line-height: 1;
}
.am-brand-tagline { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; letter-spacing: 0.04em; }
.am-close-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.25s; color: rgba(255,255,255,0.35);
  position: relative; z-index: 2;
}
.am-close-btn:hover {
  background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.35);
  color: #DC2626; transform: rotate(90deg);
}

/* ── Trust badges ── */
.am-trust-row {
  position: relative; z-index: 2;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.am-trust-badge {
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 5px 11px;
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.38);
  transition: all 0.2s;
}
.am-trust-badge:hover { border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.6); }

/* ── Tabs ── */
.am-tabs-wrap {
  padding: 16px 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.am-tabs { display: flex; }
.am-tab {
  flex: 1; padding: 12px 0 14px; font-size: 13px; font-weight: 700;
  font-family: 'Barlow', sans-serif;
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.28); transition: all 0.2s;
  position: relative; letter-spacing: 0.03em;
}
.am-tab.active { color: #fff; }
.am-tab.active::after {
  content: ''; position: absolute; bottom: -1px; left: 16px; right: 16px; height: 2px;
  background: linear-gradient(90deg, #DC2626, #EA580C);
  border-radius: 2px 2px 0 0;
}
.am-tab:hover:not(.active) { color: rgba(255,255,255,0.55); }

/* ── Body ── */
.am-body { padding: 22px 28px 28px; display: flex; flex-direction: column; gap: 14px; }

/* ── Field ── */
.am-field { display: flex; flex-direction: column; gap: 7px; }
.am-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase; letter-spacing: 0.08em;
}

/* ── Input ── */
.am-input-wrap { position: relative; }
.am-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.am-input::placeholder { color: rgba(255,255,255,0.13); }
.am-input:focus {
  border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.09);
}
.am-input.has-icon { padding-right: 44px; }
.am-input-icon {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.22); transition: color 0.2s; padding: 0;
  display: flex; align-items: center;
}
.am-input-icon:hover { color: rgba(255,255,255,0.6); }

/* ── Demo hint ── */
.am-demo-hint {
  background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18);
  border-radius: 11px; padding: 13px 14px;
  font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.75;
}
.am-demo-hint strong {
  display: block; color: #60A5FA; font-size: 10px;
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px;
}
.am-demo-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; flex-wrap: wrap;
}
.am-demo-vals { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.am-demo-val {
  font-family: monospace; font-size: 12px;
  background: rgba(59,130,246,0.12); border-radius: 6px;
  padding: 2px 8px; color: rgba(255,255,255,0.65);
}
.am-autofill-btn {
  background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.25);
  border-radius: 7px; padding: 5px 11px; cursor: pointer;
  font-size: 11px; font-weight: 700; color: #60A5FA;
  font-family: 'Barlow', sans-serif; transition: all 0.2s;
  white-space: nowrap; flex-shrink: 0;
}
.am-autofill-btn:hover { background: rgba(59,130,246,0.25); color: #93C5FD; }

/* ── Alerts ── */
.am-error {
  background: rgba(220,38,38,0.07); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 11px; padding: 11px 14px;
  font-size: 12px; color: rgba(255,100,100,0.9); font-weight: 600;
  display: flex; align-items: flex-start; gap: 8px;
}
.am-notice {
  background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.18);
  border-radius: 11px; padding: 11px 14px;
  font-size: 12px; color: rgba(245,158,11,0.8); font-weight: 600;
  display: flex; align-items: center; gap: 8px;
}

/* ── Submit ── */
.am-submit {
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  transition: all 0.25s; letter-spacing: 0.04em;
  box-shadow: 0 4px 18px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  position: relative; overflow: hidden;
}
.am-submit::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
}
.am-submit:hover {
  box-shadow: 0 8px 28px rgba(220,38,38,0.55); transform: translateY(-1px);
}
.am-submit:active { transform: translateY(0); }
.am-submit.success {
  background: linear-gradient(135deg, #059669, #10B981) !important;
  box-shadow: 0 4px 18px rgba(16,185,129,0.35) !important;
}
.am-submit:disabled { cursor: default; }

/* ── Divider ── */
.am-divider { display: flex; align-items: center; gap: 12px; }
.am-divider::before, .am-divider::after {
  content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06);
}
.am-divider span { font-size: 11px; color: rgba(255,255,255,0.18); font-weight: 700; letter-spacing: 0.05em; }

/* ── Google ── */
.am-google-btn {
  width: 100%; padding: 12px; border-radius: 12px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.5); font-family: 'Barlow', sans-serif;
  font-size: 13px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 9px;
  transition: all 0.2s; letter-spacing: 0.03em;
}
.am-google-btn:hover {
  background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.13); color: #fff;
}

/* ── Footer note ── */
.am-footer-note {
  text-align: center; font-size: 11px; color: rgba(255,255,255,0.18);
  line-height: 1.6;
}
.am-footer-note a { color: rgba(220,80,80,0.6); text-decoration: none; }
.am-footer-note a:hover { color: #DC2626; }

/* ── Animations ── */
@keyframes am-fade { from { opacity:0; } to { opacity:1; } }
@keyframes am-up {
  from { opacity:0; transform: translateY(28px) scale(0.96); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}
`;

export default function AuthModal() {
  // ✅ Reads from the same AuthContext as Navbar — this is the fix
  const { showAuthModal, setShowAuthModal, login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Reset state when modal closes
  useEffect(() => {
    if (!showAuthModal) {
      const t = setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setErrorMessage("");
        setSubmitState("idle");
        setIsLogin(true);
        setShowPassword(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const autofillDemo = () => {
    setFormData((f) => ({ ...f, email: "user@okegass.com", password: "password" }));
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (isLogin) {
      if (formData.email === "user@okegass.com" && formData.password === "password") {
        setSubmitState("success");
        setTimeout(() => {
          login(formData.email, formData.password);
          setShowAuthModal(false);
        }, 800);
      } else {
        setErrorMessage("Email atau password salah! Gunakan akun demo yang tersedia.");
      }
    } else {
      setErrorMessage("Pendaftaran akun dinonaktifkan. Gunakan akun demo untuk login.");
    }
  };

  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setErrorMessage("");
  };

  return (
    <div className="am-overlay" onClick={() => setShowAuthModal(false)}>
      <style>{STYLES}</style>

      <div className="am-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Hero ── */}
        <div className="am-hero">
          <div className="am-hero-bg" />
          <div className="am-hero-grid" />
          <div className="am-hero-glow" />
          <div className="am-hero-glow2" />

          <div className="am-brand">
            <div className="am-brand-left">
              <div className="am-brand-icon">🎮</div>
              <div>
                <div className="am-brand-name">OkeGass</div>
                <div className="am-brand-tagline">Top Up Game &amp; Jual Beli Akun</div>
              </div>
            </div>
            <button
              type="button"
              className="am-close-btn"
              onClick={() => setShowAuthModal(false)}
              aria-label="Tutup modal"
            >
              <X size={15} />
            </button>
          </div>

          <div className="am-trust-row">
            <span className="am-trust-badge">
              <CheckCircle size={11} color="#10B981" /> Transaksi Aman
            </span>
            <span className="am-trust-badge">
              <Shield size={11} color="#3B82F6" /> Escrow System
            </span>
            <span className="am-trust-badge">
              <Trophy size={11} color="#F59E0B" /> Trusted Seller
            </span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="am-tabs-wrap">
          <div className="am-tabs">
            <button
              type="button"
              className={`am-tab ${isLogin ? "active" : ""}`}
              onClick={() => switchTab(true)}
            >
              Masuk
            </button>
            <button
              type="button"
              className={`am-tab ${!isLogin ? "active" : ""}`}
              onClick={() => switchTab(false)}
            >
              Daftar
            </button>
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="am-body">

            {/* Name — register only */}
            {!isLogin && (
              <div className="am-field">
                <label className="am-label">Nama Lengkap</label>
                <div className="am-input-wrap">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="am-input"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="am-field">
              <label className="am-label">Email</label>
              <div className="am-input-wrap">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="am-input"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="am-field">
              <label className="am-label">Password</label>
              <div className="am-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="am-input has-icon"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="am-input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Demo hint — login only */}
            {isLogin && (
              <div className="am-demo-hint">
                <strong>Akun Demo</strong>
                <div className="am-demo-row">
                  <div className="am-demo-vals">
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Email:</span>
                    <span className="am-demo-val">user@okegass.com</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Pass:</span>
                    <span className="am-demo-val">password</span>
                  </div>
                  <button type="button" className="am-autofill-btn" onClick={autofillDemo}>
                    ⚡ Isi Otomatis
                  </button>
                </div>
              </div>
            )}

            {/* Register notice */}
            {!isLogin && (
              <div className="am-notice">
                <Zap size={13} style={{ flexShrink: 0 }} />
                Pendaftaran dinonaktifkan. Gunakan akun demo untuk login.
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="am-error">
                <span style={{ flexShrink: 0 }}>⚠</span>
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`am-submit ${submitState === "success" ? "success" : ""}`}
              disabled={submitState === "success"}
            >
              {submitState === "success"
                ? "✓ Berhasil Masuk!"
                : isLogin
                ? "Masuk ke OkeGass"
                : "Daftar Sekarang"}
            </button>

            {/* Divider */}
            <div className="am-divider"><span>atau</span></div>

            {/* Google */}
            <button type="button" className="am-google-btn">
              <span style={{ fontSize: 17, lineHeight: 1 }}>🔵</span>
              Lanjutkan dengan Google
            </button>

            {/* Footer */}
            <p className="am-footer-note">
              Dengan masuk, kamu menyetujui{" "}
              <a href="#">Syarat &amp; Ketentuan</a> dan{" "}
              <a href="#">Kebijakan Privasi</a> OkeGass.
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}