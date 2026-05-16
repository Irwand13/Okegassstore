import { useState } from "react";
import {
  ChevronDown, MessageCircle, Mail, Phone,
  Zap, Package, Shield, CreditCard, RefreshCw,
  Search, ExternalLink, Clock, CheckCircle,
} from "lucide-react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');

.hlp-root {
  min-height: 100vh;
  background: #0d0d0f;
  font-family: 'Barlow', sans-serif;
  color: #fff;
}

/* ── Hero ── */
.hlp-hero {
  position: relative; padding: 72px 24px 64px;
  text-align: center; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.hlp-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.13) 0%, transparent 70%);
}
.hlp-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 0%, transparent 75%);
}

.hlp-hero-content { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
.hlp-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 20px; padding: 5px 14px; margin-bottom: 20px;
  font-size: 11px; font-weight: 700; color: rgba(220,38,38,0.85);
  letter-spacing: 0.08em; text-transform: uppercase;
}
.hlp-hero-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 700; color: #fff;
  line-height: 1.05; margin-bottom: 14px;
}
.hlp-hero-title span {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hlp-hero-sub {
  font-size: 15px; color: rgba(255,255,255,0.38);
  line-height: 1.7; margin-bottom: 32px;
}

/* ── Search ── */
.hlp-search-wrap {
  position: relative; max-width: 440px; margin: 0 auto;
}
.hlp-search-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: rgba(255,255,255,0.2); pointer-events: none;
}
.hlp-search {
  width: 100%; padding: 14px 16px 14px 46px; box-sizing: border-box;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 14px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 14px; outline: none; transition: all 0.22s;
}
.hlp-search::placeholder { color: rgba(255,255,255,0.18); }
.hlp-search:focus {
  border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.05);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.09);
}

/* ── Body ── */
.hlp-body {
  max-width: 880px; margin: 0 auto; padding: 56px 24px 80px;
}

/* ── Section title ── */
.hlp-section-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px; font-weight: 700; color: #fff;
  margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
}
.hlp-section-title::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.07), transparent);
}

/* ── Quick topics ── */
.hlp-topics {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 52px;
}
.hlp-topic {
  display: flex; flex-direction: column; align-items: center;
  gap: 10px; padding: 20px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; cursor: pointer;
  transition: all 0.22s ease; text-decoration: none;
}
.hlp-topic:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
.hlp-topic.active {
  background: rgba(220,38,38,0.09);
  border-color: rgba(220,38,38,0.28);
}
.hlp-topic-icon {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.05);
  transition: all 0.22s;
}
.hlp-topic:hover .hlp-topic-icon,
.hlp-topic.active .hlp-topic-icon {
  background: rgba(220,38,38,0.12);
}
.hlp-topic-label {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45);
  text-align: center; letter-spacing: 0.03em;
  transition: color 0.22s;
}
.hlp-topic:hover .hlp-topic-label,
.hlp-topic.active .hlp-topic-label { color: #fff; }

/* ── FAQ ── */
.hlp-faq-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 52px; }
.hlp-faq-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; overflow: hidden;
  transition: border-color 0.22s;
}
.hlp-faq-item.open {
  border-color: rgba(220,38,38,0.22);
  background: rgba(220,38,38,0.04);
}
.hlp-faq-q {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 18px 20px;
  cursor: pointer; background: transparent; border: none;
  width: 100%; text-align: left; font-family: 'Barlow', sans-serif;
}
.hlp-faq-q-text {
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.75);
  line-height: 1.45; transition: color 0.2s;
}
.hlp-faq-item.open .hlp-faq-q-text { color: #fff; }
.hlp-faq-chevron {
  flex-shrink: 0; color: rgba(255,255,255,0.2);
  transition: transform 0.28s ease, color 0.2s;
}
.hlp-faq-item.open .hlp-faq-chevron {
  transform: rotate(180deg); color: #DC2626;
}
.hlp-faq-a {
  max-height: 0; overflow: hidden;
  transition: max-height 0.35s ease, padding 0.25s ease;
}
.hlp-faq-item.open .hlp-faq-a { max-height: 400px; }
.hlp-faq-a-inner {
  padding: 0 20px 18px;
  font-size: 13px; color: rgba(255,255,255,0.45);
  line-height: 1.75; border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 14px;
}
.hlp-faq-a-inner a { color: #EA580C; text-decoration: none; }
.hlp-faq-a-inner a:hover { color: #DC2626; }

/* ── Contact cards ── */
.hlp-contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px; margin-bottom: 52px;
}
.hlp-contact-card {
  padding: 22px 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; cursor: pointer; text-decoration: none;
  transition: all 0.22s ease; display: block;
}
.hlp-contact-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
.hlp-contact-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
}
.hlp-contact-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px; font-weight: 700; color: #fff;
  margin-bottom: 4px;
}
.hlp-contact-desc {
  font-size: 12px; color: rgba(255,255,255,0.35);
  line-height: 1.6; margin-bottom: 12px;
}
.hlp-contact-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 6px; letter-spacing: 0.04em;
}

/* ── Status banner ── */
.hlp-status {
  background: rgba(16,185,129,0.07);
  border: 1px solid rgba(16,185,129,0.18);
  border-radius: 14px; padding: 16px 20px;
  display: flex; align-items: center; gap: 14px;
}
.hlp-status-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #10B981; flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.2);
  animation: hlp-pulse 2.5s ease-in-out infinite;
}
@keyframes hlp-pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0.08); }
}
.hlp-status-text {
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.7);
}
.hlp-status-text span { color: #10B981; }

/* ── Animations ── */
@keyframes hlp-fade-up {
  from { opacity:0; transform: translateY(16px); }
  to   { opacity:1; transform: translateY(0); }
}
.hlp-animate { animation: hlp-fade-up 0.45s ease both; }
.hlp-animate-1 { animation-delay: 0.05s; }
.hlp-animate-2 { animation-delay: 0.12s; }
.hlp-animate-3 { animation-delay: 0.19s; }
.hlp-animate-4 { animation-delay: 0.26s; }
`;

const topics = [
  { icon: <Zap size={20} color="#3B82F6" />, label: "Top Up" },
  { icon: <Package size={20} color="#A78BFA" />, label: "Jual Beli Akun" },
  { icon: <CreditCard size={20} color="#10B981" />, label: "Pembayaran" },
  { icon: <Shield size={20} color="#F59E0B" />, label: "Keamanan" },
  { icon: <RefreshCw size={20} color="#EA580C" />, label: "Refund" },
];

const allFaqs = [
  {
    topic: "Top Up",
    q: "Berapa lama proses top up setelah pembayaran?",
    a: "Top up biasanya diproses secara otomatis dalam 1–5 menit setelah pembayaran dikonfirmasi. Jika lebih dari 15 menit belum masuk, silakan hubungi CS kami.",
  },
  {
    topic: "Top Up",
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Kami menerima transfer bank (BCA, BNI, BRI, Mandiri), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS, dan minimarket (Alfamart, Indomaret).",
  },
  {
    topic: "Jual Beli Akun",
    q: "Bagaimana sistem escrow bekerja?",
    a: "Dana pembeli ditahan oleh OkeGass hingga pembeli mengkonfirmasi akun diterima dan berfungsi dengan baik. Setelah konfirmasi, dana diteruskan ke penjual. Ini melindungi kedua belah pihak.",
  },
  {
    topic: "Jual Beli Akun",
    q: "Berapa lama listing saya diverifikasi?",
    a: "Tim kami memverifikasi setiap listing dalam 1×24 jam. Kamu akan mendapat notifikasi setelah listing aktif dan bisa dilihat pembeli.",
  },
  {
    topic: "Pembayaran",
    q: "Apakah ada biaya tambahan saat transaksi?",
    a: "Untuk top up tidak ada biaya tambahan. Untuk jual beli akun, OkeGass mengambil komisi 5% dari nilai transaksi sebagai biaya layanan dan escrow.",
  },
  {
    topic: "Pembayaran",
    q: "Bagaimana cara mencairkan saldo OkeGass?",
    a: "Saldo bisa dicairkan ke rekening bank atau e-wallet kapan saja. Proses pencairan membutuhkan waktu 1×24 jam di hari kerja. Minimum pencairan Rp 50.000.",
  },
  {
    topic: "Keamanan",
    q: "Apakah data akun saya aman?",
    a: "Ya, semua data dienkripsi dengan standar AES-256. Kami tidak pernah menyimpan password akun game kamu secara plaintext. Aktifkan 2FA di pengaturan untuk keamanan ekstra.",
  },
  {
    topic: "Refund",
    q: "Bagaimana jika top up tidak masuk setelah 1 jam?",
    a: "Hubungi CS kami via WhatsApp atau email dengan menyertakan ID transaksi dan bukti pembayaran. Kami akan memproses refund atau meneruskan top up dalam 24 jam.",
  },
  {
    topic: "Refund",
    q: "Apakah akun yang sudah dibeli bisa dikembalikan?",
    a: "Pengembalian akun hanya bisa dilakukan dalam 24 jam setelah transaksi selesai, jika terbukti data akun tidak sesuai deskripsi penjual. Ajukan dispute melalui halaman transaksi.",
  },
];

export default function Bantuan() {
  const [activeTopic, setActiveTopic] = useState("Semua");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = allFaqs.filter((f) => {
    const matchTopic = activeTopic === "Semua" || f.topic === activeTopic;
    const matchSearch =
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div className="hlp-root">
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <div className="hlp-hero">
        <div className="hlp-hero-bg" />
        <div className="hlp-hero-grid" />
        <div className="hlp-hero-content hlp-animate">
          <div className="hlp-hero-badge">
            <MessageCircle size={11} /> Pusat Bantuan
          </div>
          <h1 className="hlp-hero-title">
            Ada yang bisa<br />
            <span>kami bantu?</span>
          </h1>
          <p className="hlp-hero-sub">
            Temukan jawaban cepat dari FAQ kami, atau hubungi tim support yang siap membantu 24/7.
          </p>

          {/* Search */}
          <div className="hlp-search-wrap">
            <Search size={16} className="hlp-search-icon" />
            <input
              type="text"
              className="hlp-search"
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveTopic("Semua");
                setOpenFaq(null);
              }}
            />
          </div>
        </div>
      </div>

      <div className="hlp-body">

        {/* ── Status ── */}
        <div className="hlp-status hlp-animate hlp-animate-1" style={{ marginBottom: 48 }}>
          <div className="hlp-status-dot" />
          <div>
            <div className="hlp-status-text">
              <span>Semua sistem berjalan normal.</span> Tim support aktif dan siap membantu.
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
              <Clock size={11} /> Terakhir dicek: hari ini, 14:00 WIB
            </div>
          </div>
        </div>

        {/* ── Topics ── */}
        <div className="hlp-animate hlp-animate-2">
          <div className="hlp-section-title">Topik Bantuan</div>
          <div className="hlp-topics">
            {/* All button */}
            <button
              className={`hlp-topic ${activeTopic === "Semua" ? "active" : ""}`}
              onClick={() => { setActiveTopic("Semua"); setOpenFaq(null); }}
            >
              <div className="hlp-topic-icon">
                <MessageCircle size={20} color={activeTopic === "Semua" ? "#DC2626" : "rgba(255,255,255,0.4)"} />
              </div>
              <span className="hlp-topic-label">Semua</span>
            </button>

            {topics.map((t) => (
              <button
                key={t.label}
                className={`hlp-topic ${activeTopic === t.label ? "active" : ""}`}
                onClick={() => { setActiveTopic(t.label); setOpenFaq(null); }}
              >
                <div className="hlp-topic-icon">{t.icon}</div>
                <span className="hlp-topic-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="hlp-animate hlp-animate-3">
          <div className="hlp-section-title">Pertanyaan Umum</div>
          <div className="hlp-faq-list">
            {filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "48px 20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
              }}>
                <Search size={32} style={{ color: "rgba(255,255,255,0.1)", marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, margin: 0 }}>
                  Tidak ada hasil untuk "{search}"
                </p>
                <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, marginTop: 6 }}>
                  Coba kata kunci lain atau hubungi CS kami
                </p>
              </div>
            ) : (
              filtered.map((faq, i) => (
                <div
                  key={i}
                  className={`hlp-faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    className="hlp-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="hlp-faq-q-text">{faq.q}</span>
                    <ChevronDown size={16} className="hlp-faq-chevron" />
                  </button>
                  <div className="hlp-faq-a">
                    <div className="hlp-faq-a-inner">{faq.a}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="hlp-animate hlp-animate-4">
          <div className="hlp-section-title">Hubungi Kami</div>
          <div className="hlp-contact-grid">

            {/* WhatsApp */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hlp-contact-card">
              <div className="hlp-contact-icon" style={{ background: "rgba(37,211,102,0.1)" }}>
                <Phone size={20} color="#25D366" />
              </div>
              <div className="hlp-contact-name">WhatsApp</div>
              <div className="hlp-contact-desc">Chat langsung dengan tim support kami. Respons tercepat.</div>
              <span className="hlp-contact-tag" style={{ background: "rgba(37,211,102,0.1)", color: "#25D366" }}>
                <CheckCircle size={11} /> Online 24/7
              </span>
            </a>

            {/* Email */}
            <a href="mailto:cs@okegass.com" className="hlp-contact-card">
              <div className="hlp-contact-icon" style={{ background: "rgba(59,130,246,0.1)" }}>
                <Mail size={20} color="#3B82F6" />
              </div>
              <div className="hlp-contact-name">Email</div>
              <div className="hlp-contact-desc">Kirim detail masalah kamu, kami balas dalam 1×24 jam.</div>
              <span className="hlp-contact-tag" style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}>
                <Clock size={11} /> cs@okegass.com
              </span>
            </a>

            {/* Live Chat */}
            <a href="#" className="hlp-contact-card">
              <div className="hlp-contact-icon" style={{ background: "rgba(220,38,38,0.1)" }}>
                <MessageCircle size={20} color="#DC2626" />
              </div>
              <div className="hlp-contact-name">Live Chat</div>
              <div className="hlp-contact-desc">Chat langsung di platform tanpa perlu keluar halaman.</div>
              <span className="hlp-contact-tag" style={{ background: "rgba(220,38,38,0.1)", color: "#DC2626" }}>
                <ExternalLink size={11} /> Buka Chat
              </span>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}