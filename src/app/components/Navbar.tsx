import { Link, useLocation } from "react-router";
import { Menu, X, User, LogOut, Tag, Zap, ChevronDown, Shield, Trophy, Wallet, Bell, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";


const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

/* ─── Root ─────────────────────────────────────────────────────────────── */
.nb2-root {
  position: sticky; top: 0; z-index: 100;
  font-family: 'Barlow', sans-serif;
  transition: all 0.35s ease;
}

/* ─── Ambient top glow line ─────────────────────────────────────────────── */
.nb2-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(220,38,38,0.6) 20%,
    rgba(234,88,12,0.8) 50%,
    rgba(220,38,38,0.6) 80%,
    transparent 100%);
  z-index: 2;
}

/* Scrolled state */
.nb2-root.scrolled {
  background: rgba(8,8,10,0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.055);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.04),
    0 8px 40px rgba(0,0,0,0.6);
}
.nb2-root.top {
  background: rgba(8,8,10,0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

/* ─── Inner ─────────────────────────────────────────────────────────────── */
.nb2-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 0 24px; height: 66px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
  position: relative; z-index: 1;
}

/* ─── Logo ──────────────────────────────────────────────────────────────── */
.nb2-logo {
  display: flex; align-items: center; gap: 11px;
  text-decoration: none; flex-shrink: 0;
  position: relative;
}
.nb2-logo-gem {
  width: 40px; height: 40px; border-radius: 12px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
  box-shadow:
    0 4px 16px rgba(220,38,38,0.4),
    inset 0 1px 0 rgba(255,255,255,0.2),
    inset 0 -1px 0 rgba(0,0,0,0.2);
  position: relative; overflow: hidden;
  transition: all 0.3s ease;
}
.nb2-logo-gem::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 45%;
  background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%);
}
.nb2-logo:hover .nb2-logo-gem {
  box-shadow: 0 6px 24px rgba(220,38,38,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
  transform: translateY(-1px) scale(1.04);
}
.nb2-logo-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px; font-weight: 700; color: #fff;
  letter-spacing: 0.03em; line-height: 1;
}
.nb2-logo-sub {
  font-size: 9px; font-weight: 600; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.25); text-transform: uppercase;
  margin-top: 3px;
}

/* ─── Nav links ─────────────────────────────────────────────────────────── */
.nb2-links {
  display: flex; align-items: center; gap: 2px; flex: 1;
  justify-content: center;
}
.nb2-link {
  position: relative; padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45); text-decoration: none;
  transition: all 0.22s ease;
  overflow: hidden;
}
.nb2-link::before {
  content: '';
  position: absolute; inset: 0; border-radius: 10px;
  background: linear-gradient(135deg, rgba(220,38,38,0.12), rgba(234,88,12,0.08));
  opacity: 0; transition: opacity 0.22s;
}
.nb2-link::after {
  content: '';
  position: absolute; bottom: 5px; left: 50%; right: 50%;
  height: 1.5px; background: linear-gradient(90deg, #DC2626, #EA580C);
  border-radius: 1px; transition: all 0.25s ease;
}
.nb2-link:hover { color: #fff; }
.nb2-link:hover::before { opacity: 1; }
.nb2-link:hover::after { left: 16px; right: 16px; }
.nb2-link.active { color: #fff; }
.nb2-link.active::before { opacity: 1; }
.nb2-link.active::after { left: 16px; right: 16px; }

/* ─── Right side ────────────────────────────────────────────────────────── */
.nb2-right {
  display: flex; align-items: center; gap: 10px; flex-shrink: 0;
}

/* ─── Login btn ─────────────────────────────────────────────────────────── */
.nb2-login-btn {
  padding: 8px 20px; border-radius: 9px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.55); cursor: pointer;
  letter-spacing: 0.04em; transition: all 0.22s ease;
}
.nb2-login-btn:hover {
  border-color: rgba(255,255,255,0.22);
  color: #fff; background: rgba(255,255,255,0.05);
}

/* ─── Register btn ──────────────────────────────────────────────────────── */
.nb2-register-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 20px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: #fff; cursor: pointer; letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: all 0.25s ease; position: relative; overflow: hidden;
}
.nb2-register-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
}
.nb2-register-btn:hover {
  box-shadow: 0 6px 24px rgba(220,38,38,0.55);
  transform: translateY(-1px);
}
.nb2-register-btn:active { transform: translateY(0); }

/* ─── User pill ─────────────────────────────────────────────────────────── */
.nb2-user-pill {
  display: flex; align-items: center; gap: 9px;
  padding: 5px 12px 5px 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; cursor: pointer;
  transition: all 0.22s ease;
  position: relative;
}
.nb2-user-pill:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.14);
}
.nb2-user-pill.open {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.25);
}
.nb2-user-avatar {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 700; color: #fff;
  font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 2px 8px rgba(220,38,38,0.3);
  flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-user-avatar::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-user-info { display: flex; flex-direction: column; }
.nb2-user-name {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88);
  line-height: 1; letter-spacing: 0.02em;
}
.nb2-user-level {
  font-size: 10px; font-weight: 700; color: rgba(245,158,11,0.75);
  margin-top: 2px; letter-spacing: 0.05em; text-transform: uppercase;
}
.nb2-chevron {
  color: rgba(255,255,255,0.3);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}
.nb2-chevron.open { transform: rotate(180deg); }

/* ─── Notification bell ─────────────────────────────────────────────────── */
.nb2-bell {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.22s ease;
  color: rgba(255,255,255,0.35); position: relative;
}
.nb2-bell:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.7);
}
.nb2-bell-dot {
  position: absolute; top: 7px; right: 7px;
  width: 7px; height: 7px; border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 0 1.5px #0f0f12;
  animation: nb2-pulse 2s ease-in-out infinite;
}
@keyframes nb2-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.7; }
}

/* ─── Dropdown ──────────────────────────────────────────────────────────── */
.nb2-dropdown {
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 220px;
  background: #111115;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px; overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.03);
  animation: nb2-drop 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes nb2-drop {
  from { opacity:0; transform: translateY(-10px) scale(0.97); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}

/* User card inside dropdown */
.nb2-dd-user {
  padding: 14px 16px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 10px;
}
.nb2-dd-avatar-lg {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 700; color: #fff;
  font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35);
  flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-dd-avatar-lg::before {
  content: '';
  position: absolute; top:0; left:0; right:0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-dd-name {
  font-size: 13px; font-weight: 700; color: #fff; line-height: 1; letter-spacing: 0.02em;
}
.nb2-dd-email {
  font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 3px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px;
}

/* Balance row */
.nb2-dd-balance {
  margin: 8px 10px;
  background: rgba(16,185,129,0.07);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px; padding: 9px 12px;
  display: flex; align-items: center; justify-content: space-between;
}
.nb2-dd-balance-label {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 700; color: rgba(16,185,129,0.6);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.nb2-dd-balance-val {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700; color: #10B981;
}

/* Dropdown items */
.nb2-dd-section { padding: 6px 6px; }
.nb2-dd-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 9px;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.5); text-decoration: none;
  cursor: pointer; background: transparent; border: none; width: 100%;
  text-align: left; transition: all 0.18s ease; letter-spacing: 0.02em;
}
.nb2-dd-item-icon {
  width: 28px; height: 28px; border-radius: 7px;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.18s ease;
}
.nb2-dd-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
.nb2-dd-item:hover .nb2-dd-item-icon {
  background: rgba(220,38,38,0.12); color: #DC2626;
}
.nb2-dd-item.danger { color: rgba(220,60,60,0.6); }
.nb2-dd-item.danger:hover { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-dd-item.danger:hover .nb2-dd-item-icon { background: rgba(220,38,38,0.12); }
.nb2-dd-divider {
  height: 1px; background: rgba(255,255,255,0.05); margin: 4px 10px;
}

/* ─── Hamburger ─────────────────────────────────────────────────────────── */
.nb2-hamburger {
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,0.5);
  transition: all 0.22s ease;
}
.nb2-hamburger:hover {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.3); color: #DC2626;
}
.nb2-hamburger.open {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.25); color: #DC2626;
}

/* ─── Mobile menu ───────────────────────────────────────────────────────── */
.nb2-mobile {
  background: rgba(8,8,10,0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 12px 20px 24px;
  animation: nb2-mobile-in 0.25s cubic-bezier(0.34,1.2,0.64,1);
}
@keyframes nb2-mobile-in {
  from { opacity:0; transform: translateY(-12px); }
  to   { opacity:1; transform: translateY(0); }
}
.nb2-mobile-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 14px; border-radius: 11px; margin-bottom: 4px;
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.45);
  text-decoration: none; cursor: pointer; background: transparent;
  border: none; width: 100%; text-align: left; font-family: 'Barlow', sans-serif;
  transition: all 0.2s ease; letter-spacing: 0.03em;
}
.nb2-mobile-link:hover { background: rgba(255,255,255,0.04); color: #fff; }
.nb2-mobile-link.active { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-mobile-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 8px 0; }
.nb2-mobile-auth { display: flex; gap: 10px; margin-top: 12px; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (min-width: 768px) { .nb2-mobile-only { display: none !important; } }
@media (max-width: 767px) { .nb2-desktop-only { display: none !important; } }
`;

const formatRp = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Top Up", to: "/topup" },
    { label: "Jual Beli Akun", to: "/marketplace" },
    { label: "Bantuan", to: "/Bantuan" },
  ];

  const isActive = (to: string) => location.pathname === to;

  const openAuth = () => {
    setShowAuthModal(true);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{STYLES}</style>

      <nav className={`nb2-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nb2-topline" />

        <div className="nb2-inner">

          {/* Logo */}
          <Link to="/" className="nb2-logo">
            <div className="nb2-logo-gem">🎮</div>
            <div>
              <div className="nb2-logo-text">OkeGass</div>
              <div className="nb2-logo-sub">Game Store</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="nb2-links nb2-desktop-only">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`nb2-link ${isActive(l.to) ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="nb2-right nb2-desktop-only">
            {user ? (
              <>
                {/* Bell */}
                <button type="button" className="nb2-bell" aria-label="Notifikasi">
                  <Bell size={16} />
                  <span className="nb2-bell-dot" />
                </button>

                {/* User pill + dropdown */}
                <div ref={userMenuRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className={`nb2-user-pill ${userMenuOpen ? "open" : ""}`}
                    onClick={() => setUserMenuOpen((v) => !v)}
                    aria-label="Menu pengguna"
                  >
                    <div className="nb2-user-avatar">{user.avatar}</div>
                    <div className="nb2-user-info">
                      <div className="nb2-user-name">{user.name}</div>
                      <div className="nb2-user-level">⚡ Trusted Seller</div>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`nb2-chevron ${userMenuOpen ? "open" : ""}`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="nb2-dropdown">
                      {/* User card */}
                      <div className="nb2-dd-user">
                        <div className="nb2-dd-avatar-lg">{user.avatar}</div>
                        <div>
                          <div className="nb2-dd-name">{user.name}</div>
                          <div className="nb2-dd-email">{user.email}</div>
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="nb2-dd-balance">
                        <div className="nb2-dd-balance-label">
                          <Wallet size={11} /> Saldo
                        </div>
                        <div className="nb2-dd-balance-val">{formatRp(250000)}</div>
                      </div>

                      {/* Items */}
                      <div className="nb2-dd-section">
                        <Link
                          to="/profile"
                          className="nb2-dd-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="nb2-dd-item-icon"><User size={13} /></div>
                          Profil Saya
                        </Link>
                        <Link
                          to="/marketplace/sell"
                          className="nb2-dd-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="nb2-dd-item-icon"><Tag size={13} /></div>
                          Jual Akun
                        </Link>
                        <Link
                          to="/profile"
                          className="nb2-dd-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="nb2-dd-item-icon"><Settings size={13} /></div>
                          Pengaturan
                        </Link>

                        <div className="nb2-dd-divider" />

                        <button
                          type="button"
                          className="nb2-dd-item danger"
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                        >
                          <div className="nb2-dd-item-icon"><LogOut size={13} /></div>
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="nb2-login-btn"
                  onClick={openAuth}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  className="nb2-register-btn"
                  onClick={openAuth}
                >
                  <Zap size={13} fill="white" />
                  Daftar
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className={`nb2-hamburger nb2-mobile-only ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="nb2-mobile nb2-mobile-only">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`nb2-mobile-link ${isActive(l.to) ? "active" : ""}`}
              >
                {l.label}
                <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
              </Link>
            ))}

            <div className="nb2-mobile-divider" />

            {user ? (
              <>
                {/* Mini user card */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 14px", marginBottom: 6,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 11,
                }}>
                  <div className="nb2-user-avatar" style={{ width: 36, height: 36, fontSize: 16, borderRadius: 9 }}>
                    {user.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{user.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(16,185,129,0.7)", fontWeight: 700 }}>
                      Saldo: {formatRp(250000)}
                    </div>
                  </div>
                </div>

                <Link to="/profile" className="nb2-mobile-link">
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <User size={15} /> Profil Saya
                  </span>
                  <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
                </Link>
                <Link to="/marketplace/sell" className="nb2-mobile-link">
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag size={15} /> Jual Akun
                  </span>
                  <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
                </Link>

                <div className="nb2-mobile-divider" />

                <button
                  type="button"
                  className="nb2-mobile-link danger"
                  style={{ color: "rgba(220,60,60,0.7)", border: "none", background: "transparent", cursor: "pointer", width: "100%" }}
                  onClick={() => { logout(); setMobileOpen(false); }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <LogOut size={15} /> Keluar
                  </span>
                </button>
              </>
            ) : (
              <div className="nb2-mobile-auth">
                <button
                  type="button"
                  className="nb2-login-btn"
                  style={{ flex: 1 }}
                  onClick={openAuth}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  className="nb2-register-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={openAuth}
                >
                  <Zap size={13} fill="white" /> Daftar
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal />
    </>
  );
}