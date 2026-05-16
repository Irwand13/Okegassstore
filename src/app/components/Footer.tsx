import { Link } from "react-router";
import { Instagram, Zap, Shield, ArrowRight, MapPin } from "lucide-react";

// WhatsApp icon sebagai SVG karena tidak pakai @mui
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Footer() {
  const socials = [
    { href: "https://www.instagram.com/irwndd._", icon: <Instagram size={17} />, label: "Instagram 1" },
    { href: "https://www.instagram.com/vynurdiansyah", icon: <Instagram size={17} />, label: "Instagram 2" },
    { href: "https://www.instagram.com/dvalfn0", icon: <Instagram size={17} />, label: "Instagram 3" },
    { href: "https://api.whatsapp.com/send/?phone=6289667290516&text&type=phone_number&app_absent=0", icon: <WhatsAppIcon size={17} />, label: "WhatsApp" },
  ];

  const links = {
    Layanan: [
      { label: "Top Up Game", to: "/topup" },
      { label: "Pulsa & Data", to: "/topup" },
      { label: "Token PLN", to: "/topup" },
      { label: "E-Wallet", to: "/topup" },
      { label: "Jual Beli Akun", to: "/marketplace" },
    ],
    Bantuan: [
      { label: "Cara Order", href: "#" },
      { label: "Sistem Escrow", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Hubungi Kami", href: "#" },
      { label: "Lapor Masalah", href: "#" },
    ],
    Informasi: [
      { label: "Tentang Kami", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      { label: "Karir", href: "#" },
      { label: "Blog", href: "#" },
    ],
  };

  return (
    <footer style={{
      background: "linear-gradient(180deg, #0d0d0f 0%, #080809 100%)",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

        .ft-link {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ft-link:hover {
          color: #DC2626;
        }

        .ft-link:hover .ft-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .ft-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }

        .ft-col-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin: 0 0 18px;
        }

        .ft-social {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .ft-social:hover {
          background: rgba(220,38,38,0.15);
          border-color: rgba(220,38,38,0.4);
          color: #DC2626;
          transform: translateY(-2px);
        }

        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin: 48px 0 28px;
        }

        .ft-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulse-dot 2s ease infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #10B981; }
          50% { opacity: 0.6; box-shadow: 0 0 14px #10B981; }
        }

        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 560px) {
          .ft-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Top red accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.4) 30%, rgba(234,88,12,0.4) 50%, rgba(220,38,38,0.4) 70%, transparent 100%)",
      }} />

      {/* BG glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 500, height: 200,
        background: "rgba(220,38,38,0.04)",
        filter: "blur(80px)",
        pointerEvents: "none",
        borderRadius: "50%",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 0", position: "relative" }}>

        <div className="ft-grid">

          {/* Brand col */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 42, height: 42,
                background: "linear-gradient(135deg, #DC2626 0%, #EA580C 100%)",
                borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
                boxShadow: "0 6px 20px rgba(220,38,38,0.3)",
              }}>🎮</div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 22, fontWeight: 700, color: "#fff",
                letterSpacing: "0.02em",
              }}>OkeGass Store</span>
            </div>

            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7, margin: "0 0 20px",
              fontWeight: 400,
            }}>
              Platform top up game dan jual beli akun terpercaya dengan sistem escrow 100% aman di Indonesia.
            </p>

            {/* Trust badges */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 8, marginBottom: 24,
            }}>
              {[
                { icon: <Shield size={12} />, label: "Sistem Escrow Terpercaya" },
                { icon: <Zap size={12} />, label: "Proses Instan < 1 Menit" },
                { icon: <MapPin size={12} />, label: "Melayani Seluruh Indonesia" },
              ].map((b) => (
                <div key={b.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12, color: "rgba(255,255,255,0.3)",
                  fontWeight: 500,
                }}>
                  <span style={{ color: "#DC2626" }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="ft-col-title">{title}</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item.label}>
                    {"to" in item ? (
                      <Link to={item.to} className="ft-link">
                        <ArrowRight size={10} className="ft-link-arrow" />
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="ft-link">
                        <ArrowRight size={10} className="ft-link-arrow" />
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="ft-divider" />

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          paddingBottom: 28,
        }}>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 12, color: "rgba(255,255,255,0.2)",
            margin: 0, fontWeight: 400,
          }}>
            © 2026 OkeGass Store. All rights reserved. Made with ❤️ in Indonesia.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="ft-status-dot" />
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12, color: "rgba(255,255,255,0.25)",
              fontWeight: 500,
            }}>
              Sistem berjalan normal
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}