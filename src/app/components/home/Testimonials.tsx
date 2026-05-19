import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Zap, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const testimonials = [
    {
      id: 1,
      initials: "LIS",
      name: "Lionel Irwan Subianto",
      game: "Mobile Legends",
      gameColor: "#1E88E5",
      location: "Lamongan",
      rating: 5,
      text: "Proses top up sangat cepat! Diamond masuk kurang dari 1 menit. Harga juga paling murah dibanding yang lain. Udah langganan di sini terus.",
    },
    {
      id: 2,
      initials: "DVS",
      name: "Dominik Vio Szoboslzai",
      game: "Free Fire",
      gameColor: "#FF4500",
      location: "Lumajang",
      rating: 5,
      text: "Sudah langganan di OkeGass dari tahun lalu. Selalu dapat harga terbaik dan pelayanan ramah. Recommended banget buat yang sering top up!",
    },
    {
      id: 3,
      initials: "CDA",
      name: "Cristiano Dafa Alfino",
      game: "PUBG Mobile",
      gameColor: "#6366F1",
      location: "Kediri",
      rating: 5,
      text: "Beli akun PUBG pakai sistem escrow, aman banget! Dana baru keluar setelah akun saya terima dan verifikasi. Top markotop!",
    },
    {
      id: 4,
      initials: "DP",
      name: "Dewi Persik",
      game: "Genshin Impact",
      gameColor: "#A78BFA",
      location: "Jakarta",
      rating: 5,
      text: "Top up Genesis Crystal lancar jaya. Customer service responsif 24/7. Pokoknya gak nyesel deh pindah ke OkeGass!",
    },
    {
      id: 5,
      initials: "DT",
      name: "Donald Trump",
      game: "Valorant",
      gameColor: "#FF4655",
      location: "Ngawi",
      rating: 5,
      text: "Jual akun Valorant di sini, prosesnya cepat dan aman. Uang langsung masuk setelah pembeli konfirmasi. Sistem escrow-nya bikin tenang.",
    },
  ];

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 280);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % testimonials.length;
      goTo(next, "right");
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  const next = () => goTo((currentIndex + 1) % testimonials.length, "right");
  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length, "left");

  const current = testimonials[currentIndex];

  return (
    <section style={{
      background: "linear-gradient(180deg, #111318 0%, #0d0d0f 100%)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .tm-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 52px;
          overflow: hidden;
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .tm-card.animating-right {
          opacity: 0;
          transform: translateX(40px);
        }

        .tm-card.animating-left {
          opacity: 0;
          transform: translateX(-40px);
        }

        .tm-card.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tm-card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--game-color), transparent);
          opacity: 0.6;
        }

        .tm-card-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 250px; height: 250px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.06;
          pointer-events: none;
        }

        .tm-quote-icon {
          position: absolute;
          top: 28px; right: 36px;
          opacity: 0.06;
          color: #fff;
        }

        .tm-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }

        .tm-text {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          font-weight: 400;
          font-style: italic;
          margin: 0 0 32px;
        }

        .tm-author {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .tm-avatar {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          position: relative;
        }

        .tm-avatar-ring {
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          border: 1px solid;
          opacity: 0.4;
        }

        .tm-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #fff; margin: 0;
          letter-spacing: 0.02em;
        }

        .tm-meta {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin: 3px 0 0;
          font-weight: 500;
        }

        .tm-game-chip {
          margin-left: auto;
          padding: 5px 12px;
          border-radius: 6px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        /* nav buttons */
        .tm-nav-btn {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .tm-nav-btn:hover {
          background: rgba(220,38,38,0.12);
          border-color: rgba(220,38,38,0.35);
          color: #DC2626;
        }

        /* dots */
        .tm-dot {
          height: 4px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.12);
        }

        .tm-dot.active {
          background: #DC2626;
          box-shadow: 0 0 8px rgba(220,38,38,0.6);
        }

        .tm-dot:hover:not(.active) {
          background: rgba(255,255,255,0.25);
        }

        /* side cards preview */
        .tm-side-card {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 200px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 20px;
          opacity: 0.4;
          filter: blur(1px);
          pointer-events: none;
        }

        @keyframes tmFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tm-animate { animation: tmFadeUp 0.6s ease forwards; }
      `}</style>

      {/* BG glow orbs */}
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: 400, height: 300, borderRadius: "50%",
        background: "#DC2626", filter: "blur(120px)",
        opacity: 0.04, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }} className="tm-animate">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)",
            borderRadius: 6, padding: "4px 12px", marginBottom: 16,
          }}>
            <Star size={11} color="#DC2626" fill="#DC2626" />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              color: "#DC2626", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase",
            }}>Testimoni</span>
          </div>
          <h2 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700, color: "#fff",
            margin: 0, lineHeight: 1.1,
          }}>
            Apa Kata{" "}
            <span style={{ color: "#DC2626" }}>Mereka?</span>
          </h2>
          <p style={{
            margin: "12px 0 0",
            color: "rgba(255,255,255,0.4)",
            fontSize: 14, fontFamily: "'Barlow', sans-serif",
          }}>
            Testimoni dari ribuan pengguna setia OkeGass Store
          </p>
        </div>

        {/* Card */}
        <div
          className={`tm-card ${animating ? (direction === "right" ? "animating-right" : "animating-left") : "visible"}`}
          style={{ ["--game-color" as string]: current.gameColor } as React.CSSProperties}
        >
          <div className="tm-card-top-line" />
          <div className="tm-card-glow" style={{ background: current.gameColor }} />
          <Quote size={80} className="tm-quote-icon" />

          {/* Stars */}
          <div className="tm-stars">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>

          {/* Text */}
          <p className="tm-text">"{current.text}"</p>

          {/* Author */}
          <div className="tm-author">
            <div className="tm-avatar" style={{ background: `${current.gameColor}22` }}>
              <div className="tm-avatar-ring" style={{ borderColor: current.gameColor }} />
              <span style={{ color: current.gameColor }}>{current.initials}</span>
            </div>
            <div>
              <p className="tm-name">{current.name}</p>
              <p className="tm-meta">📍 {current.location}</p>
            </div>
            <div className="tm-game-chip" style={{
              background: `${current.gameColor}15`,
              border: `1px solid ${current.gameColor}35`,
              color: current.gameColor,
            }}>
              {current.game}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 28,
          gap: 16,
        }}>
          {/* Prev */}
          <button className="tm-nav-btn" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, justifyContent: "center" }}>
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`tm-dot ${i === currentIndex ? "active" : ""}`}
                style={{ width: i === currentIndex ? 28 : 16 }}
                onClick={() => goTo(i, i > currentIndex ? "right" : "left")}
              />
            ))}
          </div>

          {/* Next */}
          <button className="tm-nav-btn" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Counter */}
        <div style={{
          textAlign: "center",
          marginTop: 20,
          fontFamily: "'Barlow', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.08em",
        }}>
          {String(currentIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </div>

      </div>
    </section>
  );
}