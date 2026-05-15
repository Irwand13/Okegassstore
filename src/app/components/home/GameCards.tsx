import { useNavigate } from "react-router";
import { ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

export default function GameCards() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const games = [
    {
      id: "ml",
      name: "Mobile Legends",
      currency: "Diamond",
      color: "#1E88E5",
      glowColor: "rgba(30,136,229,0.4)",
      label: "POPULER",
      labelColor: "#1E88E5",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M20 4L36 14V26L20 36L4 26V14L20 4Z" stroke="#1E88E5" strokeWidth="2" fill="rgba(30,136,229,0.15)" />
          <path d="M20 10L30 16V24L20 30L10 24V16L20 10Z" fill="#1E88E5" opacity="0.6" />
          <circle cx="20" cy="20" r="4" fill="#1E88E5" />
        </svg>
      ),
    },
    {
      id: "ff",
      name: "Free Fire",
      currency: "Diamond",
      color: "#FF4500",
      glowColor: "rgba(255,69,0,0.4)",
      label: "HOT",
      labelColor: "#FF4500",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M20 4C20 4 28 12 28 20C28 28 24 34 20 36C16 34 12 28 12 20C12 12 20 4 20 4Z" fill="rgba(255,69,0,0.2)" stroke="#FF4500" strokeWidth="2" />
          <path d="M20 14C20 14 24 18 24 22C24 26 22 29 20 30C18 29 16 26 16 22C16 18 20 14 20 14Z" fill="#FF4500" opacity="0.7" />
          <circle cx="20" cy="22" r="3" fill="#FF6530" />
        </svg>
      ),
    },
    {
      id: "pubg",
      name: "PUBG Mobile",
      currency: "UC",
      color: "#F59E0B",
      glowColor: "rgba(245,158,11,0.4)",
      label: "TERLARIS",
      labelColor: "#F59E0B",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <circle cx="20" cy="20" r="14" stroke="#F59E0B" strokeWidth="2" fill="rgba(245,158,11,0.1)" />
          <path d="M14 16H18V24H14V16ZM22 16H26V24H22V16ZM14 18H26" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" fill="#F59E0B" />
        </svg>
      ),
    },
    {
      id: "genshin",
      name: "Genshin Impact",
      currency: "Genesis Crystal",
      color: "#A78BFA",
      glowColor: "rgba(167,139,250,0.4)",
      label: "BARU",
      labelColor: "#A78BFA",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M20 6L22 14H30L23.5 19L26 27L20 22L14 27L16.5 19L10 14H18L20 6Z" fill="rgba(167,139,250,0.2)" stroke="#A78BFA" strokeWidth="1.5" />
          <path d="M20 12L21.2 16H25.5L22 18.5L23.2 22.5L20 20L16.8 22.5L18 18.5L14.5 16H18.8L20 12Z" fill="#A78BFA" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: "valorant",
      name: "Valorant",
      currency: "VP",
      color: "#FF4655",
      glowColor: "rgba(255,70,85,0.4)",
      label: "TRENDING",
      labelColor: "#FF4655",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M8 10L20 34L32 10H24L20 20L16 10H8Z" fill="rgba(255,70,85,0.15)" stroke="#FF4655" strokeWidth="1.5" />
          <path d="M13 10L20 26L27 10H22L20 16L18 10H13Z" fill="#FF4655" opacity="0.7" />
        </svg>
      ),
    },
    {
      id: "cod",
      name: "Call of Duty",
      currency: "CP",
      color: "#10B981",
      glowColor: "rgba(16,185,129,0.4)",
      label: null,
      labelColor: "#10B981",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <rect x="8" y="18" width="24" height="8" rx="2" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.5" />
          <rect x="6" y="20" width="5" height="4" rx="1" fill="#10B981" opacity="0.6" />
          <rect x="20" y="14" width="6" height="4" rx="1" fill="#10B981" opacity="0.6" />
          <circle cx="14" cy="22" r="2.5" fill="#10B981" />
          <circle cx="26" cy="22" r="2.5" fill="#10B981" />
        </svg>
      ),
    },
    {
      id: "aov",
      name: "Arena of Valor",
      currency: "Voucher",
      color: "#F97316",
      glowColor: "rgba(249,115,22,0.4)",
      label: null,
      labelColor: "#F97316",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <path d="M20 6L26 14H34L28 20L30 30L20 24L10 30L12 20L6 14H14L20 6Z" fill="rgba(249,115,22,0.15)" stroke="#F97316" strokeWidth="1.5" />
          <path d="M20 12L24 17H30L25 21L27 27L20 22.5L13 27L15 21L10 17H16L20 12Z" fill="#F97316" opacity="0.6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0d0d0f 0%, #111318 50%, #0d0d0f 100%)",
        fontFamily: "'Rajdhani', 'Barlow Condensed', sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500&display=swap');

        .game-card {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
          backdrop-filter: blur(10px);
        }

        .game-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .game-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .game-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(255,255,255,0.15);
        }

        .game-card:hover::before {
          opacity: 1;
        }

        .game-card:hover::after {
          opacity: 1;
        }

        .icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.3s ease;
        }

        .game-card:hover .icon-wrap {
          transform: scale(1.1) rotate(-3deg);
        }

        .badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 7px;
          border-radius: 4px;
          font-family: 'Barlow', sans-serif;
        }

        .scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          );
          pointer-events: none;
          border-radius: 16px;
        }

        .topup-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 12px;
          border-radius: 6px;
          margin-top: 4px;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.25s ease 0.05s;
          font-family: 'Barlow', sans-serif;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
        }

        .game-card:hover .topup-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .more-card {
          background: linear-gradient(135deg, #DC2626 0%, #b91c1c 40%, #EA580C 100%);
          border: none;
          position: relative;
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .more-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(220,38,38,0.4);
        }

        .more-card-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.15;
        }

        .section-title-accent {
          display: inline-block;
          position: relative;
        }

        .section-title-accent::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #DC2626, #EA580C, transparent);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-card {
          animation: fadeSlideUp 0.5s ease forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background Grid */}
      <div className="grid-bg" />

      {/* Glow Orbs */}
      <div className="glow-orb" style={{ width: 400, height: 400, top: -100, left: -100, background: "#DC2626" }} />
      <div className="glow-orb" style={{ width: 300, height: 300, bottom: -100, right: 200, background: "#1E88E5" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: 6,
              padding: "4px 12px",
              marginBottom: 16,
            }}>
              <Zap size={12} color="#DC2626" fill="#DC2626" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#DC2626", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase" }}>
                Top Up Instan
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              fontFamily: "'Rajdhani', sans-serif",
            }}>
              <span className="section-title-accent">Pilih Game</span>{" "}
              <span style={{ color: "#DC2626" }}>Favorit</span>{" "}
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7em" }}>Kamu</span>
            </h2>
            <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>
              Proses otomatis • Harga terbaik • Aman & terpercaya
            </p>
          </div>

          <button
            onClick={() => navigate("/topup")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "1px solid rgba(220,38,38,0.4)",
              borderRadius: 8,
              padding: "10px 20px",
              color: "#DC2626",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Barlow', sans-serif",
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(220,38,38,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Lihat Semua <ArrowRight size={14} />
          </button>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}>
          {games.map((game, index) => (
            <button
              key={game.id}
              className="game-card animate-card"
              style={{
                animationDelay: `${index * 60}ms`,
                ["--glow" as string]: game.glowColor,
                ["--accent" as string]: game.color,
              } as React.CSSProperties}
              onClick={() => navigate(`/topup?game=${game.id}`)}
              onMouseEnter={() => setHoveredId(game.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Scanlines overlay */}
              <div className="scanline" />

              {/* Glow on hover via pseudo element — handled by CSS var */}
              <style>{`
                .game-card[data-id="${game.id}"]::before {
                  background: radial-gradient(ellipse at center, ${game.glowColor} 0%, transparent 70%);
                }
                .game-card[data-id="${game.id}"]::after {
                  background: linear-gradient(90deg, transparent, ${game.color}, transparent);
                }
              `}</style>

              {/* Badge */}
              {game.label && (
                <div className="badge" style={{
                  background: `${game.color}20`,
                  border: `1px solid ${game.color}50`,
                  color: game.color,
                }}>
                  {game.label}
                </div>
              )}

              {/* Icon */}
              <div className="icon-wrap" style={{ background: `${game.color}18`, border: `1px solid ${game.color}30` }}>
                {game.icon}
              </div>

              {/* Name */}
              <div>
                <p style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.2,
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.02em",
                }}>
                  {game.name}
                </p>
                <p style={{
                  fontSize: 12,
                  color: `${game.color}cc`,
                  margin: "4px 0 0",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                }}>
                  {game.currency}
                </p>
              </div>

              {/* CTA */}
              <div className="topup-btn" style={{
                background: `${game.color}20`,
                color: game.color,
                border: `1px solid ${game.color}40`,
              }}>
                <Zap size={10} fill={game.color} />
                Top Up
              </div>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${game.color}, transparent)`,
                opacity: hoveredId === game.id ? 1 : 0,
                transition: "opacity 0.3s ease",
                borderRadius: "0 0 16px 16px",
              }} />
            </button>
          ))}

          {/* More Card */}
          <button
            className="more-card animate-card"
            style={{ animationDelay: `${games.length * 60}ms` } as React.CSSProperties}
            onClick={() => navigate("/topup")}
          >
            <div className="more-card-noise" />
            <div style={{
              width: 56, height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              position: "relative",
            }}>
              ➕
            </div>
            <div>
              <p style={{
                fontSize: 16, fontWeight: 700,
                color: "#ffffff", margin: 0,
                fontFamily: "'Rajdhani', sans-serif",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
              }}>
                Game Lainnya
              </p>
              <p style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                margin: "4px 0 0",
                fontFamily: "'Barlow', sans-serif",
              }}>
                50+ game tersedia
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center",
              gap: 6, color: "rgba(255,255,255,0.9)",
              fontSize: 11, fontWeight: 600,
              fontFamily: "'Barlow', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Lihat Semua <ArrowRight size={12} />
            </div>
          </button>
        </div>

        {/* Bottom stats bar */}
        <div style={{
          marginTop: 40,
          padding: "20px 28px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 16,
        }}>
          {[
            { val: "50+", label: "Game Tersedia" },
            { val: "< 1 Menit", label: "Proses Otomatis" },
            { val: "3 Juta+", label: "Pelanggan Puas" },
            { val: "24/7", label: "Layanan Aktif" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontSize: 22, fontWeight: 700,
                color: "#DC2626", margin: 0,
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.02em",
              }}>
                {stat.val}
              </p>
              <p style={{
                fontSize: 12, color: "rgba(255,255,255,0.4)",
                margin: "2px 0 0",
                fontFamily: "'Barlow', sans-serif",
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}