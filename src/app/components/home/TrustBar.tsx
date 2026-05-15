export default function TrustBar() {
  const trustItems = [
    { icon: "⚡", label: "Proses Instan" },
    { icon: "🔒", label: "100% Aman" },
    { icon: "🕐", label: "24/7 Layanan" },
    { icon: "💯", label: "Harga Terbaik" },
    { icon: "✅", label: "Terpercaya" },
    { icon: "🤖", label: "Auto Process" },
    { icon: "🚀", label: "Top Up Cepat" },
    { icon: "🏆", label: "No. 1 Indonesia" },
  ];

  const repeated = [...trustItems, ...trustItems, ...trustItems];

  return (
    <div style={{
      position: "relative",
      background: "linear-gradient(90deg, #0d0d0f 0%, #161018 50%, #0d0d0f 100%)",
      borderTop: "1px solid rgba(220,38,38,0.25)",
      borderBottom: "1px solid rgba(220,38,38,0.25)",
      overflow: "hidden",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');

        @keyframes marquee-trust {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .trust-track {
          display: flex;
          width: max-content;
          animation: marquee-trust 28s linear infinite;
        }

        .trust-track:hover {
          animation-play-state: paused;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          white-space: nowrap;
          position: relative;
        }

        .trust-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #DC2626;
          margin-left: 8px;
          flex-shrink: 0;
          box-shadow: 0 0 6px #DC2626;
        }

        .trust-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s;
        }

        .trust-item:hover .trust-label {
          color: rgba(255,255,255,0.9);
        }

        .trust-icon {
          font-size: 14px;
          line-height: 1;
          filter: grayscale(0.3);
        }

        /* Edge fades */
        .trust-fade-left,
        .trust-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .trust-fade-left {
          left: 0;
          background: linear-gradient(90deg, #0d0d0f 0%, transparent 100%);
        }

        .trust-fade-right {
          right: 0;
          background: linear-gradient(270deg, #0d0d0f 0%, transparent 100%);
        }

        /* Red line top */
        .trust-redline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #DC2626 30%, #EA580C 50%, #DC2626 70%, transparent 100%);
          opacity: 0.6;
        }
      `}</style>

      {/* Top red accent line */}
      <div className="trust-redline" />

      {/* Edge fades */}
      <div className="trust-fade-left" />
      <div className="trust-fade-right" />

      {/* Scrolling track */}
      <div className="trust-track">
        {repeated.map((item, i) => (
          <div className="trust-item" key={i}>
            <span className="trust-icon">{item.icon}</span>
            <span className="trust-label">{item.label}</span>
            <span className="trust-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}