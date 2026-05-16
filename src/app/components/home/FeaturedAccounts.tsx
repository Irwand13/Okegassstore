import { useNavigate } from "react-router";
import { User, ArrowRight, Star, Shield, Zap } from "lucide-react";

import mlImg      from "../../../img/akun-ml.jpg";
import pubgImg    from "../../../img/akun-pubg.png";
import genshinImg from "../../../img/akun-genshin.png";

export default function FeaturedAccounts() {
  const navigate = useNavigate();

  const accounts = [
    {
      id: 1,
      game: "Mobile Legends",
      gameColor: "#1E88E5",
      glowColor: "rgba(30,136,229,0.35)",
      image: mlImg,
      title: "Akun Mythic 800+ Points",
      rank: "Mythic Glory",
      heroes: "120+ Heroes",
      skins: "200+ Skins",
      seller: "ProGamer99",
      sellerRating: 4.9,
      reviewCount: 128,
      price: "Rp 2.500.000",
      status: "available",
    },
    {
      id: 2,
      game: "PUBG Mobile",
      gameColor: "#6366F1",
      glowColor: "rgba(99,102,241,0.35)",
      image: pubgImg,
      title: "Conqueror Season 25",
      rank: "Conqueror",
      heroes: "50+ Outfits",
      skins: "100+ Skins",
      seller: "PUBGKing",
      sellerRating: 5.0,
      reviewCount: 74,
      price: "Rp 3.200.000",
      status: "escrow",
    },
    {
      id: 3,
      game: "Genshin Impact",
      gameColor: "#A78BFA",
      glowColor: "rgba(167,139,250,0.35)",
      image: genshinImg,
      title: "AR 60 All 5-Star Characters",
      rank: "AR 60",
      heroes: "All 5★",
      skins: "Premium BP",
      seller: "TravelerMain",
      sellerRating: 4.8,
      reviewCount: 56,
      price: "Rp 5.000.000",
      status: "available",
    },
  ];

  const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    available: {
      label: "● Tersedia",
      color: "#10B981",
      bg: "rgba(16,185,129,0.12)",
      border: "rgba(16,185,129,0.3)",
    },
    escrow: {
      label: "🔒 In Escrow",
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.3)",
    },
    sold: {
      label: "✕ Terjual",
      color: "rgba(255,255,255,0.3)",
      bg: "rgba(255,255,255,0.05)",
      border: "rgba(255,255,255,0.1)",
    },
  };

  return (
    <section style={{
      background: "linear-gradient(180deg, #0d0d0f 0%, #111318 100%)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .fa-card {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.38s cubic-bezier(0.23,1,0.32,1);
          display: flex;
          flex-direction: column;
        }

        .fa-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.13);
        }

        /* image area */
        .fa-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #1a1a2e;
        }

        .fa-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }

        .fa-card:hover .fa-img-wrap img {
          transform: scale(1.06);
        }

        /* dark gradient over image bottom */
        .fa-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            0deg,
            rgba(13,13,15,0.95) 0%,
            rgba(13,13,15,0.4) 45%,
            transparent 100%
          );
        }

        /* game tag on image */
        .fa-game-tag {
          position: absolute;
          top: 14px; left: 14px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 11px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }

        /* status badge on image */
        .fa-status-badge {
          position: absolute;
          top: 14px; right: 14px;
          padding: 4px 11px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.05em;
          backdrop-filter: blur(8px);
        }

        /* price on image bottom-left */
        .fa-price-overlay {
          position: absolute;
          bottom: 14px; left: 14px;
        }

        /* body */
        .fa-body {
          padding: 20px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        /* stats row */
        .fa-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 8px;
        }

        .fa-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 10px 8px;
          text-align: center;
          transition: all 0.2s;
        }

        .fa-card:hover .fa-stat {
          background: rgba(255,255,255,0.06);
        }

        .fa-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 3px;
          font-weight: 500;
        }

        .fa-stat-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          line-height: 1.1;
        }

        /* seller row */
        .fa-seller {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .fa-seller-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }

        .fa-seller-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 700;
          color: rgba(255,255,255,0.8);
        }

        .fa-seller-rating {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        /* hover glow per card via CSS var */
        .fa-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 100px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .fa-card:hover::after {
          opacity: 0.6;
        }

        /* top accent line */
        .fa-top-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .fa-card:hover .fa-top-line {
          opacity: 1;
        }

        @keyframes faFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fa-animate {
          animation: faFadeUp 0.5s ease forwards;
          opacity: 0;
        }

        .fa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }

        @media (min-width: 960px) {
          .fa-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .fa-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
          border: none; border-radius: 10px;
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px; font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(220,38,38,0.25);
        }

        .fa-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(220,38,38,0.4);
        }

        .fa-cta-arrow { transition: transform 0.25s ease; }
        .fa-cta-btn:hover .fa-cta-arrow { transform: translateX(5px); }
      `}</style>

      {/* BG glow orbs */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: 350, height: 350, borderRadius: "50%",
        background: "#DC2626", filter: "blur(120px)",
        opacity: 0.04, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: 6, padding: "4px 12px", marginBottom: 14,
            }}>
              <Zap size={11} color="#DC2626" fill="#DC2626" />
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                color: "#DC2626", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase",
              }}>Marketplace</span>
            </div>
            <h2 style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1,
            }}>
              Akun{" "}
              <span style={{ color: "#DC2626" }}>Unggulan</span>
            </h2>
            <p style={{
              margin: "10px 0 0", color: "rgba(255,255,255,0.4)",
              fontSize: 14, fontFamily: "'Barlow', sans-serif",
            }}>
              Akun game berkualitas tinggi • Dijamin aman dengan Escrow
            </p>
          </div>

          <button
            onClick={() => navigate("/marketplace")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "transparent",
              border: "1px solid rgba(220,38,38,0.4)",
              borderRadius: 8, padding: "10px 20px",
              color: "#DC2626", fontSize: 13,
              fontWeight: 600, fontFamily: "'Barlow', sans-serif",
              cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.2s ease", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Lihat Semua <ArrowRight size={14} />
          </button>
        </div>

        {/* Cards */}
        <div className="fa-grid" style={{ marginBottom: 40 }}>
          {accounts.map((acc, i) => {
            const st = statusConfig[acc.status];
            return (
              <div
                key={acc.id}
                className="fa-card fa-animate"
                style={{ animationDelay: `${i * 100}ms`, ["--glow" as string]: acc.glowColor } as React.CSSProperties}
                onClick={() => navigate("/marketplace")}
              >
                {/* per-card glow & line via scoped style */}
                <style>{`
                  .fa-card:nth-child(${i + 1})::after { background: ${acc.gameColor}; }
                  .fa-card:nth-child(${i + 1}) .fa-top-line {
                    background: linear-gradient(90deg, transparent, ${acc.gameColor}, transparent);
                  }
                `}</style>

                <div className="fa-top-line" />

                {/* Image */}
                <div className="fa-img-wrap">
                  <img src={acc.image} alt={acc.title} loading="lazy" />
                  <div className="fa-img-overlay" />

                  {/* Game tag */}
                  <div className="fa-game-tag" style={{
                    background: `${acc.gameColor}22`,
                    border: `1px solid ${acc.gameColor}55`,
                    color: acc.gameColor,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: acc.gameColor, display: "inline-block" }} />
                    {acc.game}
                  </div>

                  {/* Status */}
                  <div className="fa-status-badge" style={{
                    background: st.bg, border: `1px solid ${st.border}`, color: st.color,
                    fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 6,
                  }}>
                    {st.label}
                  </div>

                  {/* Price overlay */}
                  <div className="fa-price-overlay">
                    <div style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 10, color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2,
                    }}>Harga</div>
                    <div style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 22, fontWeight: 700, color: "#fff",
                      lineHeight: 1, letterSpacing: "0.01em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    }}>
                      {acc.price}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="fa-body">
                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 18, fontWeight: 700, color: "#fff",
                    margin: 0, letterSpacing: "0.02em", lineHeight: 1.2,
                  }}>
                    {acc.title}
                  </h3>

                  {/* Stats */}
                  <div className="fa-stats">
                    {[
                      { label: "Rank", val: acc.rank },
                      { label: "Heroes", val: acc.heroes },
                      { label: "Skins", val: acc.skins },
                    ].map((s) => (
                      <div key={s.label} className="fa-stat">
                        <div className="fa-stat-label">{s.label}</div>
                        <div className="fa-stat-val">{s.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Seller */}
                  <div className="fa-seller">
                    <div className="fa-seller-avatar">
                      <User size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="fa-seller-name">{acc.seller}</div>
                      <div className="fa-seller-rating">
                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ color: "#F59E0B", fontWeight: 600 }}>{acc.sellerRating}</span>
                        <span>· {acc.reviewCount} ulasan</span>
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      fontSize: 11, color: "#10B981",
                      fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                    }}>
                      <Shield size={11} />
                      Escrow
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <button className="fa-cta-btn" onClick={() => navigate("/marketplace")}>
            <Zap size={16} fill="white" />
            Lihat Semua Akun
            <ArrowRight size={16} className="fa-cta-arrow" />
          </button>
        </div>

      </div>
    </section>
  );
}