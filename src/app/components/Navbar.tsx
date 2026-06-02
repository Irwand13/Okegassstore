import { Link, useLocation } from "react-router";
import { Menu, X, User, LogOut, Tag, Zap, ChevronDown, Wallet, Bell, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const LOGO_URL = "https://i.pinimg.com/736x/ad/14/4a/ad144a58f41774b689ee453ed420ca77.jpg";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

.nb2-root {
  position: sticky; top: 0; z-index: 100;
  font-family: 'Barlow', sans-serif;
  transition: all 0.35s ease;
}
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
.nb2-root.scrolled {
  background: rgba(8,8,10,0.94);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.055);
  box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6);
}
.nb2-root.top {
  background: rgba(8,8,10,0.7);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.nb2-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 0 24px; height: 66px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
  position: relative; z-index: 1;
}
.nb2-logo {
  display: flex; align-items: center; gap: 11px;
  text-decoration: none; flex-shrink: 0;
}
.nb2-logo-wolf {
  width: 42px; height: 42px; border-radius: 11px;
  overflow: hidden; flex-shrink: 0; position: relative;
  cursor: pointer; transform-style: preserve-3d; will-change: transform;
  box-shadow:
    0 0 0 1.5px rgba(220,38,38,0.45),
    0 0 0 4px rgba(220,38,38,0.07),
    0 0 18px rgba(220,38,38,0.28),
    0 4px 16px rgba(0,0,0,0.6);
  transition: box-shadow 0.3s ease;
}
.nb2-logo-wolf:hover {
  box-shadow:
    0 0 0 1.5px rgba(220,38,38,0.65),
    0 0 0 5px rgba(220,38,38,0.10),
    0 0 28px rgba(220,38,38,0.45),
    0 6px 20px rgba(0,0,0,0.7);
}
.nb2-logo-wolf img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  border-radius: 11px; filter: saturate(1.1) contrast(1.05);
  pointer-events: none; user-select: none;
}
.nb2-logo-shimmer {
  position: absolute; inset: 0; border-radius: 11px;
  pointer-events: none; mix-blend-mode: screen;
}
.nb2-logo-vignette {
  position: absolute; inset: 0; border-radius: 11px;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.22) 100%);
  pointer-events: none;
}
.nb2-logo-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px; font-weight: 700; color: #fff;
  letter-spacing: 0.03em; line-height: 1;
}
.nb2-logo-sub {
  font-size: 9px; font-weight: 600; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.25); text-transform: uppercase; margin-top: 3px;
}
.nb2-links {
  display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center;
}
.nb2-link {
  position: relative; padding: 8px 16px; border-radius: 10px;
  font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45); text-decoration: none;
  transition: all 0.22s ease; overflow: hidden;
}
.nb2-link::before {
  content: ''; position: absolute; inset: 0; border-radius: 10px;
  background: linear-gradient(135deg, rgba(220,38,38,0.12), rgba(234,88,12,0.08));
  opacity: 0; transition: opacity 0.22s;
}
.nb2-link::after {
  content: ''; position: absolute; bottom: 5px; left: 50%; right: 50%;
  height: 1.5px; background: linear-gradient(90deg, #DC2626, #EA580C);
  border-radius: 1px; transition: all 0.25s ease;
}
.nb2-link:hover { color: #fff; }
.nb2-link:hover::before { opacity: 1; }
.nb2-link:hover::after { left: 16px; right: 16px; }
.nb2-link.active { color: #fff; }
.nb2-link.active::before { opacity: 1; }
.nb2-link.active::after { left: 16px; right: 16px; }
.nb2-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.nb2-login-btn {
  padding: 8px 20px; border-radius: 9px;
  background: transparent; border: 1px solid rgba(255,255,255,0.1);
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: rgba(255,255,255,0.55); cursor: pointer;
  letter-spacing: 0.04em; transition: all 0.22s ease;
}
.nb2-login-btn:hover {
  border-color: rgba(255,255,255,0.22); color: #fff; background: rgba(255,255,255,0.05);
}
.nb2-register-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 20px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
  border: none; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  color: #fff; cursor: pointer; letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: all 0.25s ease; position: relative; overflow: hidden;
}
.nb2-register-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
}
.nb2-register-btn:hover { box-shadow: 0 6px 24px rgba(220,38,38,0.55); transform: translateY(-1px); }
.nb2-register-btn:active { transform: translateY(0); }
.nb2-user-pill {
  display: flex; align-items: center; gap: 9px;
  padding: 5px 12px 5px 6px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; cursor: pointer; transition: all 0.22s ease; position: relative;
}
.nb2-user-pill:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14); }
.nb2-user-pill.open { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.25); }
.nb2-user-avatar {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #fff; font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 2px 8px rgba(220,38,38,0.3); flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-user-avatar::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-user-info { display: flex; flex-direction: column; }
.nb2-user-name { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); line-height: 1; letter-spacing: 0.02em; }
.nb2-user-level { font-size: 10px; font-weight: 700; color: rgba(245,158,11,0.75); margin-top: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.nb2-chevron { color: rgba(255,255,255,0.3); transition: transform 0.25s ease; flex-shrink: 0; }
.nb2-chevron.open { transform: rotate(180deg); }
.nb2-bell {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.22s ease; color: rgba(255,255,255,0.35); position: relative;
}
.nb2-bell:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.7); }
.nb2-bell-dot {
  position: absolute; top: 7px; right: 7px;
  width: 7px; height: 7px; border-radius: 50%;
  background: #DC2626; box-shadow: 0 0 0 1.5px #0f0f12;
  animation: nb2-pulse 2s ease-in-out infinite;
}
@keyframes nb2-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }
.nb2-dropdown {
  position: absolute; top: calc(100% + 10px); right: 0; width: 220px;
  background: #111115; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03);
  animation: nb2-drop 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes nb2-drop { from{opacity:0;transform:translateY(-10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.nb2-dd-user {
  padding: 14px 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 10px;
}
.nb2-dd-avatar-lg {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 700; color: #fff; font-family: 'Rajdhani', sans-serif;
  box-shadow: 0 4px 12px rgba(220,38,38,0.35); flex-shrink: 0; position: relative; overflow: hidden;
}
.nb2-dd-avatar-lg::before {
  content: ''; position: absolute; top:0; left:0; right:0; height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
}
.nb2-dd-name { font-size: 13px; font-weight: 700; color: #fff; line-height: 1; letter-spacing: 0.02em; }
.nb2-dd-email { font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; }
.nb2-dd-balance {
  margin: 8px 10px; background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px; padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
}
.nb2-dd-balance-label { display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; color: rgba(16,185,129,0.6); text-transform: uppercase; letter-spacing: 0.06em; }
.nb2-dd-balance-val { font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; color: #10B981; }
.nb2-dd-section { padding: 6px 6px; }
.nb2-dd-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.5); text-decoration: none; cursor: pointer;
  background: transparent; border: none; width: 100%; text-align: left;
  transition: all 0.18s ease; letter-spacing: 0.02em;
}
.nb2-dd-item-icon {
  width: 28px; height: 28px; border-radius: 7px; background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.18s ease;
}
.nb2-dd-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
.nb2-dd-item:hover .nb2-dd-item-icon { background: rgba(220,38,38,0.12); color: #DC2626; }
.nb2-dd-item.danger { color: rgba(220,60,60,0.6); }
.nb2-dd-item.danger:hover { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-dd-item.danger:hover .nb2-dd-item-icon { background: rgba(220,38,38,0.12); }
.nb2-dd-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 10px; }
.nb2-hamburger {
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,0.5); transition: all 0.22s ease;
}
.nb2-hamburger:hover { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.3); color: #DC2626; }
.nb2-hamburger.open { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.25); color: #DC2626; }
.nb2-mobile {
  background: rgba(8,8,10,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.05); padding: 12px 20px 24px;
  animation: nb2-mobile-in 0.25s cubic-bezier(0.34,1.2,0.64,1);
}
@keyframes nb2-mobile-in { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
.nb2-mobile-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 14px; border-radius: 11px; margin-bottom: 4px;
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.45);
  text-decoration: none; cursor: pointer; background: transparent; border: none;
  width: 100%; text-align: left; font-family: 'Barlow', sans-serif;
  transition: all 0.2s ease; letter-spacing: 0.03em;
}
.nb2-mobile-link:hover { background: rgba(255,255,255,0.04); color: #fff; }
.nb2-mobile-link.active { color: #DC2626; background: rgba(220,38,38,0.07); }
.nb2-mobile-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 8px 0; }
.nb2-mobile-auth { display: flex; gap: 10px; margin-top: 12px; }
.nb2-skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: nb2-shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes nb2-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

@media (min-width: 768px) { .nb2-mobile-only { display: none !important; } }
@media (max-width: 767px) { .nb2-desktop-only { display: none !important; } }
`;

const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

// Ambil inisial nama untuk avatar
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function NavLogo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shimRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0.5, y: 0.5 });
  const cur     = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const MAX_TILT = 14;
    const onMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouse.current.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      mouse.current.y = Math.max(0, Math.min(1, (e.clientY - rect.top)  / rect.height));
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const targetRX = -(my - 0.5) * MAX_TILT * 2;
      const targetRY =  (mx - 0.5) * MAX_TILT * 2;
      const k = 0.1;
      cur.current.rx += (targetRX - cur.current.rx) * k;
      cur.current.ry += (targetRY - cur.current.ry) * k;
      cur.current.sx += (mx * 100 - cur.current.sx) * k;
      cur.current.sy += (my * 100 - cur.current.sy) * k;

      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(400px) rotateX(${cur.current.rx.toFixed(2)}deg) rotateY(${cur.current.ry.toFixed(2)}deg) scale3d(1.06,1.06,1.06)`;
      }
      if (shimRef.current) {
        const dist = Math.sqrt((mx - 0.5) ** 2 + (my - 0.5) ** 2);
        const intensity = Math.min(dist * 2.2, 1);
        shimRef.current.style.background = `
          radial-gradient(
            circle at ${cur.current.sx.toFixed(1)}% ${cur.current.sy.toFixed(1)}%,
            rgba(255,255,255,${(0.20 + intensity * 0.14).toFixed(2)}) 0%,
            rgba(255,200,100,${(0.10 + intensity * 0.07).toFixed(2)}) 28%,
            transparent 60%
          )`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="nb2-logo-wolf">
      <img src={LOGO_URL} alt="OkeGas" draggable={false} />
      <div ref={shimRef} className="nb2-logo-shimmer" />
      <div className="nb2-logo-vignette" />
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  // ✅ Tambah profile & loading dari AuthContext
  const { user, profile, loading, logout, setShowAuthModal } = useAuth();

  const location    = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Derived display values — prioritaskan profile Supabase
  const displayName    = profile?.full_name || profile?.username || user?.name || "User";
  const displayBalance = profile?.balance ?? user?.balance ?? 0;
  const displayEmail   = user?.email || "";
  const displayInitials = displayName !== "User" ? getInitials(displayName) : "👤";
  const isVerified     = profile?.is_verified_seller || user?.verified || false;

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

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Top Up",          to: "/topup" },
    { label: "Jual Beli Akun",  to: "/marketplace" },
    { label: "Layanan Digital", to: "/layanandigital" },
    { label: "Bantuan",         to: "/Bantuan" },
  ];
  const isActive = (to: string) => location.pathname === to;
  const openAuth = () => { setShowAuthModal(true); setMobileOpen(false); };

  // Loading skeleton saat cek session
  const UserSkeleton = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="nb2-skeleton" style={{ width: 32, height: 32, borderRadius: 9 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div className="nb2-skeleton" style={{ width: 64, height: 10 }} />
        <div className="nb2-skeleton" style={{ width: 44, height: 8 }} />
      </div>
    </div>
  );

  return (
    <>
      <style>{STYLES}</style>

      <nav className={`nb2-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nb2-topline" />

        <div className="nb2-inner">

          {/* ── Logo ── */}
          <Link to="/" className="nb2-logo">
            <NavLogo />
            <div>
              <div className="nb2-logo-text">OkeGass</div>
              <div className="nb2-logo-sub">Game Store</div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="nb2-links nb2-desktop-only">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className={`nb2-link ${isActive(l.to) ? "active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop right ── */}
          <div className="nb2-right nb2-desktop-only">

            {/* Loading state */}
            {loading ? (
              <UserSkeleton />
            ) : user ? (
              <>
                <button type="button" className="nb2-bell" aria-label="Notifikasi">
                  <Bell size={16} />
                  <span className="nb2-bell-dot" />
                </button>

                <div ref={userMenuRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className={`nb2-user-pill ${userMenuOpen ? "open" : ""}`}
                    onClick={() => setUserMenuOpen((v) => !v)}
                  >
                    {/* ✅ Avatar pakai inisial nama asli */}
                    <div className="nb2-user-avatar">
                      {displayInitials}
                    </div>
                    <div className="nb2-user-info">
                      {/* ✅ Nama dari profile Supabase */}
                      <div className="nb2-user-name">{displayName}</div>
                      <div className="nb2-user-level">
                        {isVerified ? "⚡ Trusted Seller" : "🎮 Member"}
                      </div>
                    </div>
                    <ChevronDown size={14} className={`nb2-chevron ${userMenuOpen ? "open" : ""}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="nb2-dropdown">
                      <div className="nb2-dd-user">
                        <div className="nb2-dd-avatar-lg">{displayInitials}</div>
                        <div>
                          {/* ✅ Nama & email dari Supabase */}
                          <div className="nb2-dd-name">{displayName}</div>
                          <div className="nb2-dd-email">{displayEmail}</div>
                        </div>
                      </div>

                      {/* ✅ Saldo dari profile Supabase */}
                      <div className="nb2-dd-balance">
                        <div className="nb2-dd-balance-label"><Wallet size={11} /> Saldo</div>
                        <div className="nb2-dd-balance-val">{formatRp(displayBalance)}</div>
                      </div>

                      <div className="nb2-dd-section">
                        <Link to="/profile" className="nb2-dd-item" onClick={() => setUserMenuOpen(false)}>
                          <div className="nb2-dd-item-icon"><User size={13} /></div> Profil Saya
                        </Link>
                        <Link to="/marketplace/sell" className="nb2-dd-item" onClick={() => setUserMenuOpen(false)}>
                          <div className="nb2-dd-item-icon"><Tag size={13} /></div> Jual Akun
                        </Link>
                        <Link to="/wallet" className="nb2-dd-item" onClick={() => setUserMenuOpen(false)}>
                          <div className="nb2-dd-item-icon"><Wallet size={13} /></div> Wallet
                        </Link>
                        <Link to="/profile" className="nb2-dd-item" onClick={() => setUserMenuOpen(false)}>
                          <div className="nb2-dd-item-icon"><Settings size={13} /></div> Pengaturan
                        </Link>
                        <div className="nb2-dd-divider" />
                        <button
                          type="button"
                          className="nb2-dd-item danger"
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                        >
                          <div className="nb2-dd-item-icon"><LogOut size={13} /></div> Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button type="button" className="nb2-login-btn" onClick={openAuth}>Masuk</button>
                <button type="button" className="nb2-register-btn" onClick={openAuth}>
                  <Zap size={13} fill="white" /> Daftar
                </button>
              </>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            type="button"
            className={`nb2-hamburger nb2-mobile-only ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="nb2-mobile nb2-mobile-only">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className={`nb2-mobile-link ${isActive(l.to) ? "active" : ""}`}>
                {l.label}
                <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
              </Link>
            ))}

            <div className="nb2-mobile-divider" />

            {loading ? (
              <UserSkeleton />
            ) : user ? (
              <>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 14px", marginBottom: 6,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)", borderRadius: 11,
                }}>
                  <div className="nb2-user-avatar" style={{ width: 36, height: 36, fontSize: 13, borderRadius: 9 }}>
                    {displayInitials}
                  </div>
                  <div>
                    {/* ✅ Nama & saldo dari Supabase */}
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{displayName}</div>
                    <div style={{ fontSize: 10, color: "rgba(16,185,129,0.7)", fontWeight: 700 }}>
                      Saldo: {formatRp(displayBalance)}
                    </div>
                  </div>
                </div>

                <Link to="/profile" className="nb2-mobile-link">
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}><User size={15} /> Profil Saya</span>
                  <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
                </Link>
                <Link to="/marketplace/sell" className="nb2-mobile-link">
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Tag size={15} /> Jual Akun</span>
                  <ChevronDown size={14} style={{ transform: "rotate(-90deg)", opacity: 0.3 }} />
                </Link>
                <div className="nb2-mobile-divider" />
                <button
                  type="button"
                  className="nb2-mobile-link"
                  style={{ color: "rgba(220,60,60,0.7)", border: "none", background: "transparent", cursor: "pointer", width: "100%" }}
                  onClick={() => { logout(); setMobileOpen(false); }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}><LogOut size={15} /> Keluar</span>
                </button>
              </>
            ) : (
              <div className="nb2-mobile-auth">
                <button type="button" className="nb2-login-btn" style={{ flex: 1 }} onClick={openAuth}>Masuk</button>
                <button type="button" className="nb2-register-btn" style={{ flex: 1, justifyContent: "center" }} onClick={openAuth}>
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