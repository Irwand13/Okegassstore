import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Tag, ChevronRight, ChevronLeft, CheckCircle, Upload,
  Shield, AlertCircle, Info, Camera, Gamepad2, DollarSign,
  FileText, Star, Zap, X, Loader2, ImageOff
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase, getGameCategories, createListing } from "@/lib/supabase";

// ─── Static game list (fallback jika DB kosong) ───────────────────
const FALLBACK_GAMES = [
  { id: "ml",       name: "Mobile Legends",      color: "#1E88E5" },
  { id: "ff",       name: "Free Fire",            color: "#FF4500" },
  { id: "pubg",     name: "PUBG Mobile",          color: "#6366F1" },
  { id: "genshin",  name: "Genshin Impact",       color: "#A78BFA" },
  { id: "valorant", name: "Valorant",             color: "#FF4655" },
  { id: "hok",      name: "Honor of Kings",       color: "#D4AF37" },
  { id: "cod",      name: "Call of Duty Mobile",  color: "#2E7D32" },
  { id: "other",    name: "Lainnya",              color: "#78909C" },
];

const RANKS_BY_GAME: Record<string, string[]> = {
  ml:       ["Warrior","Elite","Master","Grandmaster","Epic","Legend","Mythic","Mythic Honor","Mythic Glory"],
  ff:       ["Bronze","Silver","Gold","Platinum","Diamond","Heroic","Grandmaster"],
  pubg:     ["Bronze","Silver","Gold","Platinum","Diamond","Crown","Ace","Conqueror"],
  genshin:  ["AR 1-29","AR 30-39","AR 40-44","AR 45-49","AR 50-54","AR 55+","AR 60"],
  valorant: ["Iron","Bronze","Silver","Gold","Platinum","Diamond","Ascendant","Immortal","Radiant"],
  hok:      ["Warrior","Sentinel","Militia","Veteran","Elite","Master","Grandmaster","Supreme Legend"],
  cod:      ["Rookie","Veteran","Pro","Master","Legendary"],
  other:    ["Rendah","Sedang","Tinggi","Sangat Tinggi"],
};

const STEPS = [
  { id: 1, label: "Info Game",    icon: Gamepad2   },
  { id: 2, label: "Detail Akun", icon: FileText    },
  { id: 3, label: "Foto & Harga",icon: Camera      },
  { id: 4, label: "Review",      icon: Star        },
];

interface FormData {
  gameId:      string;   // UUID dari game_categories
  gameName:    string;
  gameColor:   string;
  rank:        string;
  title:       string;
  description: string;
  heroes:      string;
  skins:       string;
  level:       string;
  server:      string;
  loginType:   string;
  price:       string;
  negotiable:  boolean;
  photos:      File[];
  photoUrls:   string[];  // preview URL lokal
  whatsapp:    string;
  agreeTerms:  boolean;
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.sell-root { min-height:100vh; background:#0d0d0f; font-family:'Barlow',sans-serif; }

.sell-hero { position:relative; padding:44px 0 36px; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.05); }
.sell-hero-bg { position:absolute;inset:0; background:linear-gradient(135deg,rgba(220,38,38,0.1) 0%,rgba(234,88,12,0.05) 40%,transparent 100%); }
.sell-hero-grid { position:absolute;inset:0; background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px); background-size:40px 40px; }
.sell-hero-line { position:absolute;bottom:0;left:0;right:0;height:1px; background:linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent); }

.sell-steps { display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;position:relative; }
.sell-steps-line { position:absolute;top:20px;left:0;right:0;height:1px;background:rgba(255,255,255,0.08);z-index:0; }
.sell-steps-progress { position:absolute;top:20px;left:0;height:1px;background:linear-gradient(90deg,#DC2626,#EA580C);transition:width 0.5s ease;z-index:1; }
.sell-step { display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;z-index:10; }
.sell-step-circle { width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;transition:all 0.3s;background:#0d0d0f; }
.sell-step.done .sell-step-circle { background:linear-gradient(135deg,#DC2626,#EA580C);border-color:#DC2626; }
.sell-step.active .sell-step-circle { background:rgba(220,38,38,0.15);border-color:#DC2626; }
.sell-step-label { font-size:11px;font-weight:600;letter-spacing:0.05em;color:rgba(255,255,255,0.25); }
.sell-step.active .sell-step-label { color:#DC2626;font-weight:700; }
.sell-step.done .sell-step-label { color:rgba(255,255,255,0.5); }

.sell-card { background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:28px;animation:fadeInUp 0.4s ease; }
@keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.sell-section-title { font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:4px; }
.sell-section-desc { font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:20px; }

.sell-label { display:block;font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.07em; }
.sell-input, .sell-textarea, .sell-select {
  width:100%;padding:11px 14px;box-sizing:border-box;
  background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
  border-radius:10px;color:#fff;font-family:'Barlow',sans-serif;font-size:13px;
  outline:none;transition:all 0.2s;
}
.sell-input::placeholder,.sell-textarea::placeholder { color:rgba(255,255,255,0.15); }
.sell-input:focus,.sell-textarea:focus,.sell-select:focus { border-color:rgba(220,38,38,0.45);background:rgba(220,38,38,0.04);box-shadow:0 0 0 3px rgba(220,38,38,0.07); }
.sell-textarea { resize:vertical;min-height:100px; }
.sell-select { appearance:none;cursor:pointer; }
.sell-select option { background:#1a1a20; }

.sell-game-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:10px;margin-bottom:20px; }
.sell-game-btn { display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 8px;border-radius:12px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.22s; }
.sell-game-btn:hover { border-color:rgba(255,255,255,0.15);background:rgba(255,255,255,0.04); }
.sell-game-btn.active { border-color:rgba(220,38,38,0.6);background:rgba(220,38,38,0.08); }
.sell-game-name { font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);text-align:center;line-height:1.3; }

.sell-rank-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(85px,1fr));gap:8px; }
.sell-rank-btn { padding:8px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;cursor:pointer;transition:all 0.18s;text-align:center; }
.sell-rank-btn:hover { border-color:rgba(255,255,255,0.15);color:rgba(255,255,255,0.75); }
.sell-rank-btn.active { background:rgba(220,38,38,0.1);border-color:rgba(220,38,38,0.5);color:#DC2626; }

/* Photo upload */
.sell-photo-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px; }
.sell-photo-slot { aspect-ratio:16/10;border-radius:10px;overflow:hidden;position:relative;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.03); }
.sell-photo-slot img { width:100%;height:100%;object-fit:cover;display:block; }
.sell-photo-remove { position:absolute;top:5px;right:5px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;transition:all 0.2s; }
.sell-photo-remove:hover { background:#DC2626;border-color:#DC2626; }
.sell-photo-add { aspect-ratio:16/10;border-radius:10px;border:2px dashed rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all 0.2s; }
.sell-photo-add:hover { border-color:rgba(220,38,38,0.4);background:rgba(220,38,38,0.04); }

/* Checkbox */
.sell-check-row { display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:12px;padding:4px 0; }
.sell-check-box { width:18px;height:18px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;margin-top:2px; }
.sell-check-box.on { background:linear-gradient(135deg,#DC2626,#EA580C);border-color:#DC2626; }
.sell-check-label { font-size:13px;color:rgba(255,255,255,0.5);line-height:1.5; }

/* Info boxes */
.sell-info { display:flex;gap:12px;padding:14px 16px;border-radius:12px;margin-bottom:14px;font-size:12px; }
.sell-info.green { background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.2); }
.sell-info.amber { background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.2); }

/* Summary */
.sell-summary { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;margin-bottom:16px; }
.sell-summary-row { display:flex;justify-content:space-between;align-items:center;padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px; }
.sell-summary-row:last-child { border-bottom:none; }

/* Buttons */
.sell-btn { padding:11px 20px;border-radius:10px;border:none;font-family:'Barlow',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.25s;display:inline-flex;align-items:center;justify-content:center;gap:6px; }
.sell-btn-primary { background:linear-gradient(135deg,#DC2626,#EA580C);color:#fff;box-shadow:0 4px 14px rgba(220,38,38,0.3); }
.sell-btn-primary:hover:not(:disabled) { box-shadow:0 8px 24px rgba(220,38,38,0.5);transform:translateY(-1px); }
.sell-btn-primary:disabled { opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none; }
.sell-btn-secondary { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1) !important;color:rgba(255,255,255,0.55); }
.sell-btn-secondary:hover { background:rgba(255,255,255,0.07);color:#fff; }

.sell-helper { font-size:11px;color:rgba(255,255,255,0.2);margin-top:5px;display:flex;align-items:center;gap:4px; }

@keyframes spin { to{transform:rotate(360deg)} }
`;

export default function SellAccount() {
  const navigate  = useNavigate();
  const { session, profile, setShowAuthModal } = useAuth();
  const fileRef   = useRef<HTMLInputElement>(null);

  const [step,      setStep]      = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    gameId: "", gameName: "", gameColor: "#DC2626",
    rank: "", title: "", description: "",
    heroes: "", skins: "", level: "", server: "", loginType: "",
    price: "", negotiable: false,
    photos: [], photoUrls: [],
    whatsapp: profile?.phone || "",
    agreeTerms: false,
  });

  const update = (field: keyof FormData, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const ranks = RANKS_BY_GAME[form.gameId] || RANKS_BY_GAME["other"] || [];

  const canProceed = () => {
    if (step === 1) return !!form.gameId && !!form.rank;
    if (step === 2) return form.title.length >= 10 && !!form.description;
    if (step === 3) return !!form.price && parseInt(form.price) >= 10000;
    if (step === 4) return form.agreeTerms;
    return false;
  };

  // ── Handle foto ──────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - form.photos.length;
    const toAdd = files.slice(0, remaining);

    const newPhotos = [...form.photos, ...toAdd];
    const newUrls   = [
      ...form.photoUrls,
      ...toAdd.map(f => URL.createObjectURL(f))
    ];

    update("photos",    newPhotos);
    update("photoUrls", newUrls);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(form.photoUrls[i]);
    update("photos",    form.photos.filter((_,idx) => idx !== i));
    update("photoUrls", form.photoUrls.filter((_,idx) => idx !== i));
  };

  // ── Upload foto ke Supabase Storage ─────────────────────────
  const uploadPhotos = async (): Promise<string[]> => {
    if (form.photos.length === 0) return [];
    const urls: string[] = [];

    for (const file of form.photos) {
      const ext  = file.name.split(".").pop();
      const path = `listings/${session!.user.id}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("listing-images")
        .upload(path, file, { upsert: false });

      if (error) {
        console.warn("Upload error:", error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);

      urls.push(data.publicUrl);
    }

    return urls;
  };

  // ── Submit ke Supabase ───────────────────────────────────────
  const handleSubmit = async () => {
    if (!session?.user) { setShowAuthModal(true); return; }
    setSubmitting(true);
    setSubmitError("");

    try {
      // Cari game_id dari game_categories berdasarkan nama
      const { data: cats } = await supabase
        .from("game_categories")
        .select("id, name")
        .eq("name", form.gameName)
        .maybeSingle();

      // Upload foto
      const imageUrls = await uploadPhotos();

      // Buat listing
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);

      const payload = {
        seller_id:      session.user.id,
        game_id:        cats?.id ?? null,
        title:          form.title.trim(),
        description:    form.description.trim(),
        price:          parseInt(form.price),
        account_rank:   form.rank || null,
        account_level:  form.level ? parseInt(form.level) : null,
        account_server: form.server || null,
        login_type:     form.loginType || null,
        heroes_count:   form.heroes ? parseInt(form.heroes) : null,
        skins_count:    form.skins  ? parseInt(form.skins)  : null,
        images:         imageUrls,
        is_negotiable:  form.negotiable,
        status:         "active" as const,
        view_count:     0,
        wishlist_count: 0,
        published_at:   new Date().toISOString(),
        expires_at:     expires.toISOString(),
      };

      const { data, error } = await createListing(payload);

      if (error) throw new Error(error.message);

      setCreatedId(data?.id ?? null);
      setSubmitted(true);

    } catch (err: any) {
      setSubmitError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Guard: harus login ────────────────────────────────────────
  if (!session) {
    return (
      <div className="sell-root" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:24 }}>
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:400 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>
            Login Diperlukan
          </h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 24px" }}>
            Kamu harus login terlebih dahulu untuk menjual akun.
          </p>
          <button className="sell-btn sell-btn-primary" onClick={() => setShowAuthModal(true)}>
            <Zap size={14} /> Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="sell-root" style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:24 }}>
        <style>{STYLES}</style>
        <div style={{ textAlign:"center", maxWidth:480 }}>
          <div style={{ width:80, height:80, background:"rgba(16,185,129,0.1)", border:"2px solid rgba(16,185,129,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <CheckCircle size={40} color="#10B981" />
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:32, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>
            Listing Berhasil!
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 6px" }}>
            Akun <strong style={{ color:"#fff" }}>{form.gameName} — {form.rank}</strong> sudah aktif di marketplace.
          </p>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:13, margin:"0 0 28px" }}>
            Pembeli bisa langsung melihat dan membeli listing kamu.
          </p>

          <div className="sell-info green" style={{ textAlign:"left", marginBottom:24 }}>
            <Shield size={16} color="#10B981" style={{ flexShrink:0, marginTop:1 }} />
            <div>
              <div style={{ fontWeight:700, color:"#10B981", marginBottom:4 }}>Listing Aktif</div>
              <ul style={{ listStyle:"none", padding:0, margin:0, color:"rgba(16,185,129,0.7)", fontSize:12, lineHeight:1.8 }}>
                <li>✓ Listing sudah tampil di halaman Marketplace</li>
                <li>✓ Dana pembeli akan dijaga oleh Escrow</li>
                <li>✓ Pantau di halaman Profile → Listing Saya</li>
              </ul>
            </div>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ gameId:"",gameName:"",gameColor:"#DC2626",rank:"",title:"",description:"",heroes:"",skins:"",level:"",server:"",loginType:"",price:"",negotiable:false,photos:[],photoUrls:[],whatsapp:profile?.phone||"",agreeTerms:false }); }}
              className="sell-btn sell-btn-secondary"
              style={{ flex:1 }}
            >
              Jual Akun Lagi
            </button>
            {createdId && (
              <button
                onClick={() => navigate(`/marketplace/${createdId}`)}
                className="sell-btn sell-btn-primary"
                style={{ flex:1 }}
              >
                <Zap size={14} /> Lihat Listing
              </button>
            )}
            <button onClick={() => navigate("/profile")} className="sell-btn sell-btn-secondary" style={{ flex:1 }}>
              Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ─────────────────────────────────────────────────
  return (
    <div className="sell-root">
      <style>{STYLES}</style>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display:"none" }}
        onChange={handleFileChange}
      />

      {/* Hero */}
      <div className="sell-hero">
        <div className="sell-hero-bg" /><div className="sell-hero-grid" /><div className="sell-hero-line" />
        <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <Tag size={11} color="#DC2626" />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#DC2626", textTransform:"uppercase" as const, fontFamily:"'Barlow',sans-serif" }}>Jual Akun</span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"clamp(28px,4vw,40px)", fontWeight:700, color:"#fff", margin:"0 0 6px" }}>
            Jual Akun <span style={{ color:"#DC2626" }}>Game Kamu</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:0 }}>
            Listing aman • Escrow terpercaya • Komisi hanya 5%
          </p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"32px 24px 60px" }}>

        {/* Steps indicator */}
        <div className="sell-steps">
          <div className="sell-steps-line" />
          <div className="sell-steps-progress" style={{ width:`${((step-1)/(STEPS.length-1))*100}%` }} />
          {STEPS.map(s => {
            const Icon = s.icon;
            const done   = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className={`sell-step ${done?"done":""} ${active?"active":""}`}>
                <div className="sell-step-circle">
                  {done
                    ? <CheckCircle size={16} color="#fff" />
                    : <Icon size={16} color={active ? "#DC2626" : "rgba(255,255,255,0.3)"} />
                  }
                </div>
                <span className="sell-step-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="sell-card">

          {/* ── STEP 1: Game & Rank ─────────────────────────── */}
          {step === 1 && (
            <div>
              <div className="sell-section-title">Pilih Game</div>
              <div className="sell-section-desc">Pilih game yang akunnya ingin kamu jual</div>

              <div className="sell-game-grid">
                {FALLBACK_GAMES.map(g => (
                  <button
                    key={g.id}
                    className={`sell-game-btn ${form.gameId === g.id ? "active" : ""}`}
                    style={form.gameId === g.id ? { borderColor: g.color, background:`${g.color}12` } : {}}
                    onClick={() => { update("gameId", g.id); update("gameName", g.name); update("gameColor", g.color); update("rank",""); }}
                  >
                    <div style={{ width:32, height:32, borderRadius:8, background:form.gameId===g.id?`${g.color}20`:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, border:`1px solid ${form.gameId===g.id?g.color+"40":"rgba(255,255,255,0.07)"}` }}>
                      {g.name.charAt(0)}
                    </div>
                    <span className="sell-game-name" style={form.gameId===g.id?{color:g.color}:{}}>{g.name}</span>
                    {form.gameId===g.id && <CheckCircle size={11} color={g.color} />}
                  </button>
                ))}
              </div>

              {form.gameId && (
                <div style={{ marginTop:20, animation:"fadeInUp 0.3s ease" }}>
                  <label className="sell-label">Rank / Tingkatan Akun *</label>
                  <div className="sell-rank-grid">
                    {ranks.map(r => (
                      <button
                        key={r}
                        className={`sell-rank-btn ${form.rank===r?"active":""}`}
                        style={form.rank===r?{borderColor:form.gameColor}:{}}
                        onClick={() => update("rank", r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Detail ──────────────────────────────── */}
          {step === 2 && (
            <div>
              <div className="sell-section-title">Detail Akun</div>
              <div className="sell-section-desc">Berikan info lengkap agar pembeli tertarik</div>

              <div style={{ marginBottom:16 }}>
                <label className="sell-label">Judul Listing * (min. 10 karakter)</label>
                <input type="text" className="sell-input" value={form.title} onChange={e=>update("title",e.target.value)} placeholder={`Akun ${form.gameName} ${form.rank} Full Skin`} />
                <div className="sell-helper">{form.title.length} / 100 karakter</div>
              </div>

              <div style={{ marginBottom:16 }}>
                <label className="sell-label">Deskripsi *</label>
                <textarea className="sell-textarea" value={form.description} onChange={e=>update("description",e.target.value)} placeholder="Jelaskan detail akun: hero favorit, skin rare, event terbatas, dll..." rows={4} />
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                <div>
                  <label className="sell-label">Jumlah Hero</label>
                  <input type="number" className="sell-input" value={form.heroes} onChange={e=>update("heroes",e.target.value)} placeholder="120" />
                </div>
                <div>
                  <label className="sell-label">Jumlah Skin</label>
                  <input type="number" className="sell-input" value={form.skins} onChange={e=>update("skins",e.target.value)} placeholder="200" />
                </div>
                <div>
                  <label className="sell-label">Level Akun</label>
                  <input type="number" className="sell-input" value={form.level} onChange={e=>update("level",e.target.value)} placeholder="80" />
                </div>
                <div>
                  <label className="sell-label">Server</label>
                  <input type="text" className="sell-input" value={form.server} onChange={e=>update("server",e.target.value)} placeholder="ID / SEA / Global" />
                </div>
              </div>

              <div style={{ marginBottom:16 }}>
                <label className="sell-label">Tipe Login</label>
                <select className="sell-select" value={form.loginType} onChange={e=>update("loginType",e.target.value)}>
                  <option value="">Pilih tipe login</option>
                  <option value="Email">Email</option>
                  <option value="Google">Google</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Moonton">Akun Moonton</option>
                  <option value="VK">VK</option>
                  <option value="Guest">Guest</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          )}

          {/* ── STEP 3: Foto & Harga ────────────────────────── */}
          {step === 3 && (
            <div>
              <div className="sell-section-title">Foto & Harga</div>
              <div className="sell-section-desc">Upload screenshot dan tentukan harga jual</div>

              {/* Photo upload */}
              <div style={{ marginBottom:20 }}>
                <label className="sell-label">Screenshot Akun (Maks. 5 foto)</label>
                <div className="sell-photo-grid">
                  {form.photoUrls.map((url, i) => (
                    <div key={i} className="sell-photo-slot">
                      <img src={url} alt={`foto ${i+1}`} />
                      <button className="sell-photo-remove" onClick={() => removePhoto(i)}>
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                  {form.photos.length < 5 && (
                    <div className="sell-photo-add" onClick={() => fileRef.current?.click()}>
                      <Upload size={20} color="rgba(255,255,255,0.2)" />
                      <span style={{ fontSize:10, color:"rgba(255,255,255,0.25)", fontWeight:700, textAlign:"center", lineHeight:1.4 }}>
                        Tambah<br />Foto
                      </span>
                    </div>
                  )}
                </div>
                <div className="sell-helper">
                  <Info size={11} /> Foto rank, koleksi skin, dan info akun lainnya
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom:16 }}>
                <label className="sell-label">Harga Jual (Rp) *</label>
                <input
                  type="number"
                  className="sell-input"
                  value={form.price}
                  onChange={e=>update("price",e.target.value)}
                  placeholder="2500000"
                />
                {form.price && parseInt(form.price) >= 10000 && (
                  <div style={{ fontSize:12, color:"#DC2626", fontWeight:700, marginTop:6, fontFamily:"'Rajdhani',sans-serif" }}>
                    = Rp {parseInt(form.price).toLocaleString("id-ID")}
                    <span style={{ color:"rgba(255,255,255,0.25)", fontSize:11, fontWeight:400, marginLeft:8 }}>
                      (kamu terima Rp {Math.floor(parseInt(form.price)*0.95).toLocaleString("id-ID")} setelah komisi 5%)
                    </span>
                  </div>
                )}
                {form.price && parseInt(form.price) < 10000 && (
                  <div className="sell-helper" style={{ color:"#DC2626" }}>
                    <AlertCircle size={11} /> Harga minimum Rp 10.000
                  </div>
                )}
              </div>

              <div className="sell-check-row" onClick={() => update("negotiable", !form.negotiable)}>
                <div className={`sell-check-box ${form.negotiable?"on":""}`}>
                  {form.negotiable && <CheckCircle size={11} color="#fff" />}
                </div>
                <span className="sell-check-label">Harga dapat dinegosiasikan</span>
              </div>

              <div style={{ marginBottom:16, marginTop:8 }}>
                <label className="sell-label">Nomor WhatsApp</label>
                <input type="tel" className="sell-input" value={form.whatsapp} onChange={e=>update("whatsapp",e.target.value)} placeholder="08123456789" />
                <div className="sell-helper">Untuk notifikasi ketika ada pembeli</div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review ──────────────────────────────── */}
          {step === 4 && (
            <div>
              <div className="sell-section-title">Review Listing</div>
              <div className="sell-section-desc">Periksa kembali sebelum submit</div>

              <div className="sell-summary">
                {[
                  { label:"Game",   value:`${form.gameName} — ${form.rank}` },
                  { label:"Judul",  value:form.title },
                  { label:"Level",  value:form.level || "-" },
                  { label:"Hero",   value:form.heroes ? form.heroes+"+" : "-" },
                  { label:"Skin",   value:form.skins  ? form.skins+"+"  : "-" },
                  { label:"Foto",   value:`${form.photos.length} foto` },
                  { label:"Harga",  value:`Rp ${parseInt(form.price||"0").toLocaleString("id-ID")}${form.negotiable?" (nego)":""}`, bold:true },
                ].map(row => (
                  <div key={row.label} className="sell-summary-row">
                    <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>{row.label}</span>
                    <span style={{ color: row.bold?"#DC2626":"rgba(255,255,255,0.75)", fontWeight:row.bold?700:600, fontSize:13, fontFamily:row.bold?"'Rajdhani',sans-serif":undefined, textAlign:"right", maxWidth:240 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="sell-info green">
                <Shield size={16} color="#10B981" style={{ flexShrink:0, marginTop:1 }} />
                <div>
                  <div style={{ fontWeight:700, color:"#10B981", marginBottom:4 }}>Dilindungi Sistem Escrow</div>
                  <ul style={{ listStyle:"none", padding:0, margin:0, color:"rgba(16,185,129,0.7)", fontSize:12, lineHeight:1.8 }}>
                    <li>• Dana pembeli ditahan hingga akun berhasil diterima</li>
                    <li>• Jika sengketa, tim OkeGass akan mediasi</li>
                    <li>• Komisi platform 5% dari harga jual</li>
                  </ul>
                </div>
              </div>

              <div className="sell-info amber">
                <AlertCircle size={16} color="#F59E0B" style={{ flexShrink:0, marginTop:1 }} />
                <div>
                  <div style={{ fontWeight:700, color:"#F59E0B", marginBottom:4 }}>Syarat & Ketentuan</div>
                  <ul style={{ listStyle:"none", padding:0, margin:0, color:"rgba(245,158,11,0.7)", fontSize:12, lineHeight:1.8 }}>
                    <li>• Akun harus milik kamu sendiri — bukan hasil hack/curian</li>
                    <li>• Informasi yang diberikan harus akurat dan jujur</li>
                    <li>• Pelanggaran berujung ban permanen dari platform</li>
                  </ul>
                </div>
              </div>

              {submitError && (
                <div style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"12px 14px", background:"rgba(220,38,38,0.08)", border:"1px solid rgba(220,38,38,0.25)", borderRadius:10, marginBottom:16 }}>
                  <AlertCircle size={14} color="#DC2626" style={{ flexShrink:0, marginTop:1 }} />
                  <span style={{ fontSize:13, color:"rgba(220,38,38,0.9)" }}>{submitError}</span>
                </div>
              )}

              <div className="sell-check-row" onClick={() => update("agreeTerms", !form.agreeTerms)}>
                <div className={`sell-check-box ${form.agreeTerms?"on":""}`}>
                  {form.agreeTerms && <CheckCircle size={11} color="#fff" />}
                </div>
                <span className="sell-check-label">
                  Saya menyetujui <strong style={{ color:"rgba(255,255,255,0.7)" }}>Syarat & Ketentuan</strong> dan <strong style={{ color:"rgba(255,255,255,0.7)" }}>Kebijakan Privasi</strong> OkeGass Store
                </span>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display:"flex", gap:10, marginTop:24 }}>
            {step > 1 && (
              <button onClick={() => setStep(s=>s-1)} className="sell-btn sell-btn-secondary">
                <ChevronLeft size={14} /> Kembali
              </button>
            )}
            <button
              onClick={() => step < 4 ? setStep(s=>s+1) : handleSubmit()}
              disabled={!canProceed() || submitting}
              className="sell-btn sell-btn-primary"
              style={{ marginLeft:"auto" }}
            >
              {submitting ? (
                <><Loader2 size={14} style={{ animation:"spin 0.8s linear infinite" }} /> Menyimpan...</>
              ) : step < 4 ? (
                <>Lanjut <ChevronRight size={14} /></>
              ) : (
                <><CheckCircle size={14} /> Submit Listing</>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}