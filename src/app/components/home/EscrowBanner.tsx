import { Shield, CheckCircle, AlertCircle, ArrowRight, Lock, Zap } from "lucide-react";
import { Link } from "react-router";

export default function EscrowBanner() {
  const stats = [
    { val: "2.500+", label: "Akun Terjual" },
    { val: "0", label: "Kasus Penipuan" },
    { val: "100%", label: "Dana Aman" },
  ];

  const steps = [
    {
      num: "01",
      title: "Pembeli Bayar",
      desc: "Dana masuk ke rekening bersama yang diamankan sistem kami",
      icon: "💳",
    },
    {
      num: "02",
      title: "Penjual Transfer",
      desc: "Akun dikirim ke pembeli untuk diverifikasi terlebih dahulu",
      icon: "📦",
    },
    {
      num: "03",
      title: "Konfirmasi",
      desc: "Setelah pembeli konfirmasi, dana diteruskan ke penjual",
      icon: "✅",
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #0f1015 0%, #0d0d0f 100%)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .escrow-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
        }

        /* Header band */
        .escrow-header {
          position: relative;
          padding: 40px 40px 48px;
          background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%);
          border-bottom: 1px solid rgba(16,185,129,0.15);
          overflow: hidden;
        }

        .escrow-header::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 250px; height: 250px;
          border-radius: 50%;
          background: rgba(16,185,129,0.08);
          filter: blur(60px);
          pointer-events: none;
        }

        .escrow-header-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #10B981, transparent);
          opacity: 0.5;
        }

        .escrow-icon-shield {
          width: 64px; height: 64px;
          border-radius: 16px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #10B981;
        }

        /* Stats row */
        .escrow-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .escrow-stat {
          padding: 28px 24px;
          background: rgba(255,255,255,0.02);
          text-align: center;
          position: relative;
          transition: background 0.25s;
        }

        .escrow-stat:hover {
          background: rgba(16,185,129,0.05);
        }

        .escrow-stat-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #10B981;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .escrow-stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Body */
        .escrow-body {
          padding: 36px 40px 40px;
        }

        /* Steps */
        .escrow-steps-wrap {
          position: relative;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .escrow-step {
          position: relative;
          background: rgba(16,185,129,0.05);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 14px;
          padding: 22px 20px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .escrow-step:hover {
          background: rgba(16,185,129,0.09);
          border-color: rgba(16,185,129,0.25);
          transform: translateY(-3px);
        }

        .escrow-step::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .escrow-step:hover::after {
          opacity: 1;
        }

        .step-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(16,185,129,0.5);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .step-icon-circle {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 14px;
        }

        .step-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px;
          letter-spacing: 0.02em;
        }

        .step-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          margin: 0;
        }

        /* Connector arrow between steps */
        .step-connector {
          display: none;
        }

        @media (min-width: 768px) {
          .step-connector {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(16,185,129,0.3);
          }
        }

        /* Alert */
        .escrow-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 12px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.2);
          margin-bottom: 28px;
        }

        .escrow-alert-icon {
          color: #F59E0B;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .escrow-alert-text {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }

        .escrow-alert-text strong {
          color: #F59E0B;
          font-weight: 600;
        }

        /* CTA */
        .escrow-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(16,185,129,0.2);
          position: relative;
          overflow: hidden;
        }

        .escrow-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .escrow-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(16,185,129,0.35);
        }

        .escrow-cta:hover::before {
          opacity: 1;
        }

        .escrow-cta-arrow {
          transition: transform 0.25s ease;
        }

        .escrow-cta:hover .escrow-cta-arrow {
          transform: translateX(4px);
        }

        @keyframes escrowFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .escrow-animate {
          animation: escrowFadeUp 0.6s ease forwards;
        }
      `}</style>

      {/* BG glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: 600, height: 300,
        background: "rgba(16,185,129,0.04)",
        filter: "blur(80px)",
        pointerEvents: "none",
        borderRadius: "50%",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Section label */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 14,
          }}>
            <Lock size={11} color="#10B981" />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              color: "#10B981", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase",
            }}>Sistem Escrow</span>
          </div>
          <h2 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700, color: "#ffffff", margin: 0,
            lineHeight: 1.1,
          }}>
            Jual Beli Akun{" "}
            <span style={{ color: "#10B981" }}>100% Aman</span>
          </h2>
          <p style={{
            margin: "10px 0 0", color: "rgba(255,255,255,0.4)",
            fontSize: 14, fontFamily: "'Barlow', sans-serif",
          }}>
            Dana Anda dijamin aman sampai transaksi selesai
          </p>
        </div>

        {/* Main card */}
        <div className="escrow-wrap escrow-animate">

          {/* Header */}
          <div className="escrow-header">
            <div className="escrow-header-top-line" />
            <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
              <div className="escrow-icon-shield">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700, color: "#ffffff",
                  margin: 0, letterSpacing: "0.01em",
                }}>
                  Transaksi Dilindungi Sistem Escrow
                </h3>
                <p style={{
                  margin: "6px 0 0",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14, color: "rgba(16,185,129,0.7)", fontWeight: 500,
                }}>
                  Dana tidak langsung ke penjual — disimpan aman sampai kamu konfirmasi
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="escrow-stats">
            {stats.map((s) => (
              <div className="escrow-stat" key={s.label}>
                <div className="escrow-stat-val">{s.val}</div>
                <div className="escrow-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="escrow-body">

            {/* Steps heading */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
            }}>
              <CheckCircle size={18} color="#10B981" />
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 18, fontWeight: 700, color: "#ffffff",
                letterSpacing: "0.02em",
              }}>
                Bagaimana Sistem Escrow Bekerja?
              </span>
            </div>

            {/* Steps */}
            <div className="escrow-steps-wrap">
              {steps.map((step, i) => (
                <div key={step.num} style={{ display: "contents" }}>
                  <div className="escrow-step">
                    <div className="step-num">Step {step.num}</div>
                    <div className="step-icon-circle">{step.icon}</div>
                    <p className="step-title">{step.title}</p>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="step-connector">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Alert */}
            <div className="escrow-alert">
              <AlertCircle size={16} className="escrow-alert-icon" />
              <p className="escrow-alert-text">
                <strong>Penting:</strong> Verifikasi KTP diperlukan untuk menjual akun. Ini untuk melindungi semua pihak dari penipuan dan memastikan keamanan transaksi.
              </p>
            </div>

            {/* CTA */}
            <Link to="/marketplace" className="escrow-cta">
              <Zap size={16} fill="white" />
              Jelajahi Marketplace
              <ArrowRight size={16} className="escrow-cta-arrow" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}