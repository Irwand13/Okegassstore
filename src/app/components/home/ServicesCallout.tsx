import { useNavigate } from "react-router";
import { Smartphone, Zap, Wallet, ArrowRight } from "lucide-react";

export default function ServicesCallout() {
  const navigate = useNavigate();

  const services = [
    {
      id: "pulsa",
      icon: <Smartphone strokeWidth={1.5} />,
      title: "Pulsa & Data",
      description: "Isi pulsa dan paket data semua operator dengan harga termurah. Telkomsel, XL, Indosat, dan lainnya.",
      color: "#3B82F6",
      glow: "rgba(59,130,246,0.35)",
      tag: "20+ Operator",
      providers: ["Telkomsel", "XL", "Indosat", "Tri"],
    },
    {
      id: "pln",
      icon: <Zap strokeWidth={1.5} />,
      title: "Token PLN",
      description: "Beli token listrik PLN proses otomatis 24 jam. Token langsung dikirim ke nomor meter kamu.",
      color: "#F59E0B",
      glow: "rgba(245,158,11,0.35)",
      tag: "Instan 24 Jam",
      providers: ["PLN Prabayar", "PLN Pascabayar"],
    },
    {
      id: "ewallet",
      icon: <Wallet strokeWidth={1.5} />,
      title: "E-Wallet",
      description: "Top up GoPay, OVO, DANA, ShopeePay dan berbagai e-wallet lainnya dengan mudah.",
      color: "#10B981",
      glow: "rgba(16,185,129,0.35)",
      tag: "6+ E-Wallet",
      providers: ["GoPay", "OVO", "DANA", "ShopeePay"],
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #0d0d0f 0%, #0f1015 100%)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .svc-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .svc-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.14);
        }

        .svc-card:hover::before {
          opacity: 1;
        }

        .svc-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          transition: transform 0.3s ease;
        }

        .svc-card:hover .svc-icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        .svc-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Barlow', sans-serif;
          margin-bottom: 14px;
        }

        .svc-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px;
          letter-spacing: 0.01em;
          line-height: 1.1;
        }

        .svc-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin: 0 0 20px;
          font-weight: 400;
        }

        .svc-providers {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .svc-provider-chip {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          transition: all 0.2s;
        }

        .svc-card:hover .svc-provider-chip {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.7);
        }

        .svc-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 13px 18px;
          border-radius: 10px;
          border: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: auto;
        }

        .svc-btn-arrow {
          transition: transform 0.25s ease;
        }

        .svc-btn:hover .svc-btn-arrow {
          transform: translateX(4px);
        }

        .svc-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 24px;
        }

        /* Bottom glow per card */
        .svc-bottom-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 80px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .svc-card:hover .svc-bottom-glow {
          opacity: 1;
        }

        /* Horizontal rule line */
        .svc-top-line {
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 1px;
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 1px;
        }

        .svc-card:hover .svc-top-line {
          opacity: 1;
        }

        @keyframes svcFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .svc-animate {
          animation: svcFadeUp 0.55s ease forwards;
          opacity: 0;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        @media (min-width: 768px) {
          .svc-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      {/* Background glow orbs */}
      <div style={{
        position: "absolute", top: "30%", left: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: "#3B82F6", filter: "blur(100px)",
        opacity: 0.04, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: 250, height: 250, borderRadius: "50%",
        background: "#10B981", filter: "blur(100px)",
        opacity: 0.05, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 16,
          }}>
            <Zap size={12} color="#DC2626" fill="#DC2626" />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              color: "#DC2626", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase",
            }}>Layanan Digital</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700, color: "#ffffff", margin: 0,
                lineHeight: 1.1, letterSpacing: "-0.01em",
              }}>
                Semua Kebutuhan{" "}
                <span style={{ color: "#DC2626" }}>Digital</span>
              </h2>
              <p style={{
                margin: "10px 0 0", color: "rgba(255,255,255,0.4)",
                fontSize: 14, fontFamily: "'Barlow', sans-serif", fontWeight: 400,
              }}>
                Tidak hanya game — semua layanan digital dalam satu platform
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="svc-grid">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className="svc-card svc-animate"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Per-card styles via inline override */}
              <style>{`
                .svc-card:nth-child(${i + 1})::before {
                  background: radial-gradient(ellipse at 50% 120%, ${svc.glow} 0%, transparent 65%);
                }
              `}</style>

              {/* Top accent line */}
              <div className="svc-top-line" style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }} />

              {/* Bottom glow */}
              <div className="svc-bottom-glow" style={{ background: svc.color }} />

              {/* Tag */}
              <div className="svc-tag" style={{
                background: `${svc.color}18`,
                border: `1px solid ${svc.color}40`,
                color: svc.color,
              }}>
                <span>●</span> {svc.tag}
              </div>

              {/* Icon */}
              <div className="svc-icon-wrap" style={{
                background: `${svc.color}15`,
                border: `1px solid ${svc.color}30`,
                color: svc.color,
              }}>
                <div style={{ width: 28, height: 28, color: svc.color }}>
                  {svc.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="svc-title">{svc.title}</h3>

              {/* Desc */}
              <p className="svc-desc">{svc.description}</p>

              {/* Divider */}
              <div className="svc-divider" />

              {/* Provider chips */}
              <div className="svc-providers">
                {svc.providers.map((p) => (
                  <span key={p} className="svc-provider-chip">{p}</span>
                ))}
                <span className="svc-provider-chip" style={{ color: `${svc.color}99`, borderColor: `${svc.color}30` }}>
                  +lainnya
                </span>
              </div>

              {/* CTA Button */}
              <button
                className="svc-btn"
                onClick={() => navigate(`/layanandigital`)}
                style={{
                  background: `${svc.color}18`,
                  border: `1px solid ${svc.color}40`,
                  color: svc.color,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${svc.color}28`;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${svc.color}80`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${svc.color}18`;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${svc.color}40`;
                }}
              >
                <span>Top Up Sekarang</span>
                <ArrowRight size={16} className="svc-btn-arrow" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}