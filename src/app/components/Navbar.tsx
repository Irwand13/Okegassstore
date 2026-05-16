import { Link } from "react-router";
import { Menu, X, User, LogOut, Tag, Zap, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Top Up", to: "/topup" },
    { label: "Jual Beli Akun", to: "/marketplace" },
    { label: "Bantuan", to: "/" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .nb-root {
          position: sticky;
          top: 0;
          z-index: 50;
          transition: all 0.3s ease;
        }

        .nb-root.scrolled {
          background: rgba(10,10,12,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5);
        }

        .nb-root.top {
          background: rgba(10,10,12,0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        /* top red line */
        .nb-top-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #DC2626 30%, #EA580C 50%, #DC2626 70%, transparent 100%);
          opacity: 0.7;
        }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Logo */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 14px rgba(220,38,38,0.35);
          flex-shrink: 0;
          transition: box-shadow 0.2s ease;
        }

        .nb-logo:hover .nb-logo-icon {
          box-shadow: 0 6px 20px rgba(220,38,38,0.55);
        }

        .nb-logo-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }

        /* Nav links */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nb-link {
          position: relative;
          padding: 6px 14px;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }

        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 14px; right: 14px;
          height: 1px;
          background: #DC2626;
          transform: scaleX(0);
          transition: transform 0.2s ease;
          border-radius: 1px;
        }

        .nb-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .nb-link:hover::after {
          transform: scaleX(1);
        }

        /* Auth buttons */
        .nb-login-btn {
          padding: 7px 18px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.03em;
        }

        .nb-login-btn:hover {
          border-color: rgba(255,255,255,0.25);
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .nb-register-btn {
          padding: 7px 20px;
          border-radius: 8px;
          background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
          border: none;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(220,38,38,0.3);
          display: flex; align-items: center; gap: 6px;
        }

        .nb-register-btn:hover {
          box-shadow: 0 6px 22px rgba(220,38,38,0.5);
          transform: translateY(-1px);
        }

        /* User dropdown */
        .nb-user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 8px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: all 0.2s ease;
          color: #fff;
        }

        .nb-user-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }

        .nb-user-avatar {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, #DC2626, #EA580C);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .nb-user-name {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
        }

        .nb-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          background: #141418;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          animation: dropdownIn 0.18s ease;
        }

        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          transition: all 0.15s ease;
        }

        .nb-dropdown-item:hover {
          background: rgba(255,255,255,0.04);
          color: #fff;
        }

        .nb-dropdown-item.danger:hover {
          background: rgba(220,38,38,0.08);
          color: #DC2626;
        }

        .nb-dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 4px 0;
        }

        /* Mobile menu */
        .nb-mobile-menu {
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(10,10,12,0.97);
          backdrop-filter: blur(16px);
          animation: mobileIn 0.22s ease;
        }

        @keyframes mobileIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb-mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 0;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s;
        }

        .nb-mobile-link:hover {
          color: #DC2626;
        }

        .nb-hamburger {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s;
        }

        .nb-hamburger:hover {
          background: rgba(220,38,38,0.1);
          border-color: rgba(220,38,38,0.3);
          color: #DC2626;
        }

        @media (min-width: 768px) {
          .nb-mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .nb-desktop-only { display: none !important; }
        }
      `}</style>

      <nav className={`nb-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nb-top-line" />

        <div className="nb-inner">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">🎮</div>
            <span className="nb-logo-text">OkeGass Store</span>
          </Link>

          {/* Desktop links */}
          <div className="nb-links nb-desktop-only">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className="nb-link">{l.label}</Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="nb-desktop-only" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user ? (
              <div ref={userMenuRef} style={{ position: "relative" }}>
                <button className="nb-user-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <div className="nb-user-avatar">{user.avatar}</div>
                  <span className="nb-user-name">{user.name}</span>
                  <ChevronDown size={14} style={{
                    color: "rgba(255,255,255,0.4)",
                    transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }} />
                </button>

                {userMenuOpen && (
                  <div className="nb-dropdown">
                    <Link to="/profile" className="nb-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <User size={14} /> Profile
                    </Link>
                    <Link to="/marketplace/sell" className="nb-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <Tag size={14} /> Jual Akun
                    </Link>
                    <div className="nb-dropdown-divider" />
                    <button
                      className="nb-dropdown-item danger"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="nb-login-btn" onClick={() => setShowAuthModal(true)}>
                  Login
                </button>
                <button className="nb-register-btn" onClick={() => setShowAuthModal(true)}>
                  <Zap size={13} fill="white" />
                  Register
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="nb-hamburger nb-mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="nb-mobile-menu nb-mobile-only">
            <div style={{ padding: "8px 24px 20px" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="nb-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link to="/profile" className="nb-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    <User size={15} /> Profile
                  </Link>
                  <Link to="/marketplace/sell" className="nb-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    <Tag size={15} /> Jual Akun
                  </Link>
                  <button
                    className="nb-mobile-link"
                    style={{ color: "#DC2626", border: "none", background: "transparent", width: "100%", cursor: "pointer" }}
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </>
              ) : (
                <div style={{ paddingTop: 12, display: "flex", gap: 10 }}>
                  <button
                    className="nb-login-btn"
                    style={{ flex: 1 }}
                    onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                  >
                    Login
                  </button>
                  <button
                    className="nb-register-btn"
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                  >
                    <Zap size={13} fill="white" /> Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal />
    </>
  );
}