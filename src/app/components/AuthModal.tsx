import { useState, useEffect } from "react";
import { X, Eye, EyeOff, CheckCircle, Shield, Zap, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
// ✅ TIDAK ada import supabase di sini — semua lewat AuthContext

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

.am-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  padding: 16px; font-family: 'Barlow', sans-serif;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  animation: am-fade 0.2s ease;
}
.am-modal {
  position: relative; width: 100%; max-width: 460px;
  background: #0f0f12; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06);
  animation: am-up 0.32s cubic-bezier(0.34,1.56,0.64,1);
}
.am-hero { position: relative; padding: 30px 28px 26px; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.05); }
.am-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(220,38,38,0.22) 0%, rgba(234,88,12,0.10) 45%, rgba(0,0,0,0) 100%); }
.am-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px); background-size: 28px 28px; }
.am-hero-glow { position: absolute; top: -60px; left: -60px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%); pointer-events: none; }
.am-hero-glow2 { position: absolute; bottom: -40px; right: -20px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%); pointer-events: none; }
.am-brand { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.am-brand-left { display: flex; align-items: center; gap: 14px; }
.am-brand-icon { width: 52px; height: 52px; border-radius: 16px; background: linear-gradient(135deg, #DC2626, #EA580C); display: flex; align-items: center; justify-content: center; font-size: 26px; box-shadow: 0 8px 24px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.2); position: relative; overflow: hidden; }
.am-brand-icon::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%); border-radius: 16px 16px 0 0; }
.am-brand-name { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: #fff; letter-spacing: 0.5px; line-height: 1; }
.am-brand-tagline { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; letter-spacing: 0.04em; }
.am-close-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s; color: rgba(255,255,255,0.35); position: relative; z-index: 2; }
.am-close-btn:hover { background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.35); color: #DC2626; transform: rotate(90deg); }
.am-trust-row { position: relative; z-index: 2; display: flex; gap: 8px; flex-wrap: wrap; }
.am-trust-badge { display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 5px 11px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.38); transition: all 0.2s; }
.am-trust-badge:hover { border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.6); }
.am-tabs-wrap { padding: 16px 28px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.am-tabs { display: flex; }
.am-tab { flex: 1; padding: 12px 0 14px; font-size: 13px; font-weight: 700; font-family: 'Barlow', sans-serif; background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.28); transition: all 0.2s; position: relative; letter-spacing: 0.03em; }
.am-tab.active { color: #fff; }
.am-tab.active::after { content: ''; position: absolute; bottom: -1px; left: 16px; right: 16px; height: 2px; background: linear-gradient(90deg, #DC2626, #EA580C); border-radius: 2px 2px 0 0; }
.am-tab:hover:not(.active) { color: rgba(255,255,255,0.55); }
.am-body { padding: 22px 28px 28px; display: flex; flex-direction: column; gap: 14px; }
.am-field { display: flex; flex-direction: column; gap: 7px; }
.am-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; }
.am-input-wrap { position: relative; }
.am-input { width: 100%; padding: 12px 14px; box-sizing: border-box; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 11px; color: #fff; font-family: 'Barlow', sans-serif; font-size: 13px; outline: none; transition: all 0.2s; }
.am-input::placeholder { color: rgba(255,255,255,0.13); }
.am-input:focus { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04); box-shadow: 0 0 0 3px rgba(220,38,38,0.09); }
.am-input.has-icon { padding-right: 44px; }
.am-input-icon { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.22); transition: color 0.2s; padding: 0; display: flex; align-items: center; }
.am-input-icon:hover { color: rgba(255,255,255,0.6); }
.am-error { background: rgba(220,38,38,0.07); border: 1px solid rgba(220,38,38,0.2); border-radius: 11px; padding: 11px 14px; font-size: 12px; color: rgba(255,100,100,0.9); font-weight: 600; display: flex; align-items: flex-start; gap: 8px; }
.am-notice { background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.18); border-radius: 11px; padding: 11px 14px; font-size: 12px; color: rgba(16,185,129,0.85); font-weight: 600; display: flex; align-items: center; gap: 8px; }
.am-info { background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18); border-radius: 11px; padding: 11px 14px; font-size: 12px; color: rgba(96,165,250,0.9); font-weight: 600; display: flex; align-items: flex-start; gap: 8px; line-height: 1.6; }
.am-submit { width: 100%; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%); color: #fff; font-family: 'Barlow', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.25s; letter-spacing: 0.04em; box-shadow: 0 4px 18px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; gap: 8px; }
.am-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%); }
.am-submit:hover:not(:disabled) { box-shadow: 0 8px 28px rgba(220,38,38,0.55); transform: translateY(-1px); }
.am-submit:active:not(:disabled) { transform: translateY(0); }
.am-submit.success { background: linear-gradient(135deg, #059669, #10B981) !important; box-shadow: 0 4px 18px rgba(16,185,129,0.35) !important; }
.am-submit:disabled { cursor: not-allowed; opacity: 0.7; }
.am-spinner { width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: am-spin 0.65s linear infinite; flex-shrink: 0; }
.am-divider { display: flex; align-items: center; gap: 12px; }
.am-divider::before, .am-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
.am-divider span { font-size: 11px; color: rgba(255,255,255,0.18); font-weight: 700; letter-spacing: 0.05em; }
.am-google-btn { width: 100%; padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.5); font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px; transition: all 0.2s; letter-spacing: 0.03em; }
.am-google-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.13); color: #fff; }
.am-footer-note { text-align: center; font-size: 11px; color: rgba(255,255,255,0.18); line-height: 1.6; }
.am-footer-note a { color: rgba(220,80,80,0.6); text-decoration: none; }
.am-footer-note a:hover { color: #DC2626; }

@keyframes am-fade { from { opacity:0; } to { opacity:1; } }
@keyframes am-up { from { opacity:0; transform: translateY(28px) scale(0.96); } to { opacity:1; transform: translateY(0) scale(1); } }
@keyframes am-spin { to { transform: rotate(360deg); } }
`;

export default function AuthModal() {
  // ✅ signInWithGoogle dari AuthContext — tidak perlu import supabase langsung
  const { showAuthModal, setShowAuthModal, login, register, signInWithGoogle } = useAuth();

  const [isLogin, setIsLogin]           = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg]     = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [submitState, setSubmitState]   = useState<"idle" | "success">("idle");
  const [formData, setFormData]         = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (!showAuthModal) {
      const t = setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setErrorMessage("");
        setSuccessMsg("");
        setSubmitState("idle");
        setIsLoading(false);
        setIsLogin(true);
        setShowPassword(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setErrorMessage("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMsg("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }
    if (!isLogin && !formData.name.trim()) {
      setErrorMessage("Nama lengkap wajib diisi.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }

    setIsLoading(true);

    if (isLogin) {
      const result = await login(formData.email, formData.password);

      if (!result) {
        setIsLoading(false);
        setErrorMessage("Terjadi kesalahan. Coba lagi.");
        return;
      }

      if (result.error) {
        setIsLoading(false);
        if (result.error.includes("Invalid login credentials")) {
          setErrorMessage("Email atau password salah.");
        } else if (result.error.includes("Email not confirmed")) {
          setErrorMessage("Email belum diverifikasi. Cek inbox kamu.");
        } else if (result.error.includes("Too many requests")) {
          setErrorMessage("Terlalu banyak percobaan. Coba lagi nanti.");
        } else {
          setErrorMessage(result.error);
        }
        return;
      }

      setSubmitState("success");
      setIsLoading(false);
      setTimeout(() => setShowAuthModal(false), 800);

    } else {
      const result = await register(formData.name, formData.email, formData.password);

      if (!result) {
        setIsLoading(false);
        setErrorMessage("Terjadi kesalahan. Coba lagi.");
        return;
      }

      if (result.error) {
        setIsLoading(false);
        if (result.error.includes("already registered") || result.error.includes("already been registered")) {
          setErrorMessage("Email sudah terdaftar. Silakan login.");
        } else if (result.error.includes("Password should be")) {
          setErrorMessage("Password minimal 6 karakter.");
        } else if (result.error.includes("valid email")) {
          setErrorMessage("Format email tidak valid.");
        } else {
          setErrorMessage(result.error);
        }
        return;
      }

      setIsLoading(false);
      setSuccessMsg("Pendaftaran berhasil! Cek email kamu untuk verifikasi akun.");
      setTimeout(() => {
        setIsLogin(true);
        setSuccessMsg("");
        setFormData(f => ({ ...f, password: "" }));
      }, 2500);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(); // ✅ dari AuthContext, tidak import supabase langsung
    } catch (err) {
      setErrorMessage("Google login gagal. Coba lagi.");
    }
  };

  return (
    <div className="am-overlay" onClick={() => setShowAuthModal(false)}>
      <style>{STYLES}</style>

      <div className="am-modal" onClick={(e) => e.stopPropagation()}>
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
            <button type="button" className="am-close-btn" onClick={() => setShowAuthModal(false)}>
              <X size={15} />
            </button>
          </div>
          <div className="am-trust-row">
            <span className="am-trust-badge"><CheckCircle size={11} color="#10B981" /> Transaksi Aman</span>
            <span className="am-trust-badge"><Shield size={11} color="#3B82F6" /> Escrow System</span>
            <span className="am-trust-badge"><Trophy size={11} color="#F59E0B" /> Trusted Seller</span>
          </div>
        </div>

        <div className="am-tabs-wrap">
          <div className="am-tabs">
            <button type="button" className={`am-tab ${isLogin ? "active" : ""}`} onClick={() => switchTab(true)}>Masuk</button>
            <button type="button" className={`am-tab ${!isLogin ? "active" : ""}`} onClick={() => switchTab(false)}>Daftar</button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="am-body">
            {!isLogin && (
              <div className="am-field">
                <label className="am-label">Nama Lengkap</label>
                <div className="am-input-wrap">
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="am-input" placeholder="Masukkan nama lengkap" disabled={isLoading} />
                </div>
              </div>
            )}

            <div className="am-field">
              <label className="am-label">Email</label>
              <div className="am-input-wrap">
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="am-input" placeholder="nama@email.com" required disabled={isLoading} />
              </div>
            </div>

            <div className="am-field">
              <label className="am-label">Password</label>
              <div className="am-input-wrap">
                <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="am-input has-icon" placeholder="••••••••" required disabled={isLoading} />
                <button type="button" className="am-input-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="am-info">
                <Zap size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Setelah daftar, cek <strong>inbox email</strong> kamu untuk verifikasi akun sebelum bisa login.</span>
              </div>
            )}

            {errorMessage && (
              <div className="am-error">
                <span style={{ flexShrink: 0 }}>⚠</span> {errorMessage}
              </div>
            )}

            {successMsg && (
              <div className="am-notice">
                <CheckCircle size={13} style={{ flexShrink: 0 }} /> {successMsg}
              </div>
            )}

            <button type="submit" className={`am-submit ${submitState === "success" ? "success" : ""}`} disabled={isLoading || submitState === "success"}>
              {submitState === "success" ? <>✓ Berhasil Masuk!</> : isLoading ? <><span className="am-spinner" />{isLogin ? "Sedang Masuk..." : "Membuat Akun..."}</> : isLogin ? "Masuk ke OkeGass" : "Daftar Sekarang"}
            </button>

            <div className="am-divider"><span>atau</span></div>

            <button type="button" className="am-google-btn" onClick={handleGoogleLogin} disabled={isLoading}>
              <span style={{ fontSize: 17, lineHeight: 1 }}>🔵</span>
              Lanjutkan dengan Google
            </button>

            <p className="am-footer-note">
              Dengan masuk, kamu menyetujui <a href="#">Syarat &amp; Ketentuan</a> dan <a href="#">Kebijakan Privasi</a> OkeGass.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}