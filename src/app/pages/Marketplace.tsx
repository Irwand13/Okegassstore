import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, User, Star, Shield, Tag,
  ChevronDown, ChevronRight, X, ArrowUpDown, CheckCircle,
  Eye, MessageCircle, Heart, TrendingUp, Filter, Zap, SlidersHorizontal
} from "lucide-react";

const games = ["Semua Game", "Mobile Legends", "PUBG Mobile", "Genshin Impact", "Free Fire", "Valorant", "Honor of Kings"];
const ranks = ["Semua Rank", "Mythic Glory", "Mythic", "Legend", "Epic", "Grandmaster", "Master", "Platinum", "Gold"];
const sortOptions = ["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Penjual", "Terpopuler"];

const accounts = [
  { id: 1, game: "Mobile Legends", gameColor: "#1E88E5", glow: "rgba(30,136,229,0.3)", icon: "⚔️", title: "Akun Mythic Glory 1500+ Points", rank: "Mythic Glory", heroes: "150+ Heroes", skins: "250+ Skins", seller: "ProGamer99", sellerRating: 4.9, sellerSales: 234, price: 3500000, status: "available", views: 1240, favorites: 89, badge: "HOT" },
  { id: 2, game: "PUBG Mobile", gameColor: "#6366F1", glow: "rgba(99,102,241,0.3)", icon: "🎯", title: "Conqueror Season 29 Full Set", rank: "Conqueror", heroes: "80+ Outfits", skins: "150+ Skins", seller: "PUBGKing", sellerRating: 5.0, sellerSales: 178, price: 4200000, status: "escrow", views: 876, favorites: 67, badge: "ESCROW" },
  { id: 3, game: "Genshin Impact", gameColor: "#A78BFA", glow: "rgba(167,139,250,0.3)", icon: "✨", title: "AR 60 — Semua 5-Star Characters", rank: "AR 60", heroes: "All 5★", skins: "Premium BP", seller: "TravelerMain", sellerRating: 4.8, sellerSales: 45, price: 5500000, status: "available", views: 2340, favorites: 198, badge: "PREMIUM" },
  { id: 4, game: "Free Fire", gameColor: "#FF4500", glow: "rgba(255,69,0,0.3)", icon: "🔥", title: "Grandmaster Season 30, Rare Bundles", rank: "Grandmaster", heroes: "60+ Bundles", skins: "100+ Skins", seller: "FFlegend", sellerRating: 4.7, sellerSales: 123, price: 1200000, status: "available", views: 543, favorites: 34, badge: null },
  { id: 5, game: "Mobile Legends", gameColor: "#1E88E5", glow: "rgba(30,136,229,0.3)", icon: "⚔️", title: "Mythic 500 Points, All Core Heroes", rank: "Mythic", heroes: "120+ Heroes", skins: "180+ Skins", seller: "MLBBpro", sellerRating: 4.6, sellerSales: 89, price: 2100000, status: "available", views: 765, favorites: 52, badge: null },
  { id: 6, game: "Valorant", gameColor: "#FF4655", glow: "rgba(255,70,85,0.3)", icon: "💀", title: "Immortal 3 | Radiant Skins Collector", rank: "Immortal 3", heroes: "20+ Agents", skins: "50+ Skins", seller: "ValorantKing", sellerRating: 4.9, sellerSales: 312, price: 6800000, status: "available", views: 1890, favorites: 145, badge: "TOP SELLER" },
  { id: 7, game: "Genshin Impact", gameColor: "#A78BFA", glow: "rgba(167,139,250,0.3)", icon: "✨", title: "AR 55, Raiden + Hu Tao + Ayaka", rank: "AR 55", heroes: "3 Main DPS", skins: "Battle Pass", seller: "Paimon_Lover", sellerRating: 4.5, sellerSales: 28, price: 2800000, status: "available", views: 423, favorites: 31, badge: null },
  { id: 8, game: "Honor of Kings", gameColor: "#D4AF37", glow: "rgba(212,175,55,0.3)", icon: "👑", title: "Supreme Legend Season 12", rank: "Supreme Legend", heroes: "90+ Heroes", skins: "120+ Skins", seller: "HOKmaster", sellerRating: 4.8, sellerSales: 67, price: 1800000, status: "available", views: 320, favorites: 22, badge: null },
  { id: 9, game: "PUBG Mobile", gameColor: "#6366F1", glow: "rgba(99,102,241,0.3)", icon: "🎯", title: "Ace + Full Premium Outfits", rank: "Ace", heroes: "60+ Outfits", skins: "80+ Skins", seller: "PUBG_Ace99", sellerRating: 4.7, sellerSales: 55, price: 1950000, status: "available", views: 430, favorites: 29, badge: null },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const badgeConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  HOT:        { label: "HOT",        color: "#FF4500", bg: "rgba(255,69,0,0.15)",      border: "rgba(255,69,0,0.4)" },
  ESCROW:     { label: "ESCROW",     color: "#F59E0B", bg: "rgba(245,158,11,0.15)",   border: "rgba(245,158,11,0.4)" },
  PREMIUM:    { label: "PREMIUM",    color: "#A78BFA", bg: "rgba(167,139,250,0.15)",  border: "rgba(167,139,250,0.4)" },
  "TOP SELLER":{ label: "TOP SELLER",color: "#1E88E5", bg: "rgba(30,136,229,0.15)",   border: "rgba(30,136,229,0.4)" },
};

const statusConfig: Record<string, { label: string; color: string; dot?: string }> = {
  available: { label: "Tersedia",  color: "#10B981", dot: "#10B981" },
  escrow:    { label: "In Escrow", color: "#F59E0B" },
  sold:      { label: "Terjual",   color: "rgba(255,255,255,0.2)" },
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.mp-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero */
.mp-hero {
  position: relative; padding: 44px 0 36px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mp-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.mp-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}
.mp-hero-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent); }

/* Search bar */
.mp-search-wrap { position: relative; }
.mp-search-input {
  width: 100%; padding: 12px 16px 12px 44px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; color: #fff; font-family:'Barlow',sans-serif; font-size:14px;
  outline: none; transition: all 0.2s; box-sizing: border-box;
}
.mp-search-input::placeholder { color: rgba(255,255,255,0.2); }
.mp-search-input:focus { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.04); box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }

.mp-select {
  padding: 11px 36px 11px 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; color: rgba(255,255,255,0.7); font-family:'Barlow',sans-serif; font-size:13px;
  outline: none; cursor: pointer; appearance: none; transition: all 0.2s;
}
.mp-select:focus { border-color: rgba(220,38,38,0.4); }
option { background: #1a1a1f; }

.mp-filter-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 18px; border-radius: 12px;
  font-family:'Barlow',sans-serif; font-size:13px; font-weight:700;
  cursor: pointer; transition: all 0.2s; white-space:nowrap;
}
.mp-filter-btn.off { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
.mp-filter-btn.off:hover { border-color: rgba(255,255,255,0.15); color: #fff; }
.mp-filter-btn.on { background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.4); color: #DC2626; }

.mp-sell-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 20px; border-radius: 12px; border: none;
  background: linear-gradient(135deg,#DC2626,#EA580C); color:#fff;
  font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
  cursor:pointer; white-space:nowrap; letter-spacing:0.03em;
  transition: all 0.25s; box-shadow: 0 4px 14px rgba(220,38,38,0.3);
}
.mp-sell-btn:hover { box-shadow: 0 8px 24px rgba(220,38,38,0.5); transform: translateY(-1px); }

/* Filter panel */
.mp-filter-panel {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 20px;
  animation: mpFadeDown 0.22s ease;
}
@keyframes mpFadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

.mp-filter-label { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:10px; font-family:'Barlow',sans-serif; }

.mp-check-row { display:flex; align-items:center; gap:8px; cursor:pointer; padding:5px 0; }
.mp-check-box {
  width:15px; height:15px; border-radius:4px; border:1px solid rgba(255,255,255,0.15);
  display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s;
}
.mp-check-box.checked { background:#DC2626; border-color:#DC2626; }
.mp-check-label { font-family:'Barlow',sans-serif; font-size:13px; color:rgba(255,255,255,0.5); transition:color 0.15s; }
.mp-check-row:hover .mp-check-label { color:rgba(255,255,255,0.8); }

.mp-filter-input {
  width:100%; padding:10px 12px; border-radius:10px; box-sizing:border-box;
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  color:#fff; font-family:'Barlow',sans-serif; font-size:13px; outline:none; transition:all 0.2s;
}
.mp-filter-input::placeholder { color:rgba(255,255,255,0.15); }
.mp-filter-input:focus { border-color:rgba(220,38,38,0.4); background:rgba(220,38,38,0.03); }

/* Account card */
.mp-card {
  position:relative; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07);
  border-radius:18px; overflow:hidden; cursor:pointer; transition:all 0.35s cubic-bezier(0.23,1,0.32,1);
  display:flex; flex-direction:column;
}
.mp-card:hover { transform:translateY(-6px); border-color:rgba(255,255,255,0.13); }
.mp-card:hover .mp-card-glow { opacity:1; }
.mp-card-glow {
  position:absolute; bottom:-50px; left:50%; transform:translateX(-50%);
  width:160px; height:80px; border-radius:50%; filter:blur(40px);
  opacity:0; pointer-events:none; transition:opacity 0.35s;
}
.mp-card-top-bar { height:2px; width:100%; }
.mp-card-body { padding:18px 18px 16px; flex:1; display:flex; flex-direction:column; gap:12px; }

.mp-stat-chip {
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06);
  border-radius:8px; padding:8px 6px; text-align:center; transition:background 0.2s;
}
.mp-card:hover .mp-stat-chip { background:rgba(255,255,255,0.06); }

.mp-seller-row {
  display:flex; align-items:center; gap:10px;
  padding-top:12px; border-top:1px solid rgba(255,255,255,0.05);
}
.mp-seller-avatar {
  width:30px; height:30px; border-radius:9px;
  background:linear-gradient(135deg,#DC2626,#EA580C);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}

.mp-fav-btn { background:none; border:none; cursor:pointer; padding:4px; transition:all 0.2s; color:rgba(255,255,255,0.2); }
.mp-fav-btn:hover { color:#DC2626; transform:scale(1.15); }
.mp-fav-btn.active { color:#DC2626; }

@keyframes mpFadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
.mp-animate { animation:mpFadeUp 0.45s ease forwards; opacity:0; }

/* Tag pills */
.mp-active-tag {
  display:inline-flex; align-items:center; gap:6px;
  padding:4px 10px; border-radius:6px;
  font-family:'Barlow',sans-serif; font-size:11px; font-weight:700;
  cursor:pointer;
}

/* Modal */
.mp-modal-overlay {
  position:fixed; inset:0; z-index:50;
  display:flex; align-items:center; justify-content:center; padding:16px;
  background:rgba(0,0,0,0.75); backdrop-filter:blur(8px);
}
.mp-modal {
  position:relative; width:100%; max-width:480px; max-height:90vh;
  background:#141418; border:1px solid rgba(255,255,255,0.08);
  border-radius:22px; overflow:hidden; overflow-y:auto;
  animation:mpModalIn 0.25s cubic-bezier(0.23,1,0.32,1);
}
@keyframes mpModalIn { from{opacity:0;transform:scale(0.95)translateY(16px);} to{opacity:1;transform:scale(1)translateY(0);} }

.mp-modal-body { padding:24px; }
.mp-modal-stat { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:14px 10px; text-align:center; }
.mp-modal-escrow { display:flex; gap:12px; align-items:flex-start; padding:16px; background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2); border-radius:12px; margin-bottom:20px; }
.mp-modal-seller { display:flex; align-items:center; gap:12px; padding:16px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:12px; margin-bottom:20px; }

.mp-btn-ghost {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:13px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.55);
  font-family:'Barlow',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s;
}
.mp-btn-ghost:hover { border-color:rgba(255,255,255,0.2); color:#fff; }

.mp-btn-primary {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:13px; border-radius:12px; border:none;
  background:linear-gradient(135deg,#DC2626,#EA580C); color:#fff;
  font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
  cursor:pointer; letter-spacing:0.04em; transition:all 0.25s;
  box-shadow:0 6px 18px rgba(220,38,38,0.3);
}
.mp-btn-primary:hover { box-shadow:0 10px 28px rgba(220,38,38,0.5); transform:translateY(-1px); }

.mp-load-btn {
  padding:12px 32px; border-radius:12px;
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.4); font-family:'Barlow',sans-serif;
  font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s;
}
.mp-load-btn:hover { border-color:rgba(220,38,38,0.4); color:#DC2626; background:rgba(220,38,38,0.06); }

.mp-cards-grid {
  display:grid; gap:16px;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
}
@media(min-width:768px) { .mp-cards-grid { grid-template-columns:repeat(2,1fr); } }
@media(min-width:1100px){ .mp-cards-grid { grid-template-columns:repeat(3,1fr); } }
`;

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("Semua Game");
  const [selectedRank, setSelectedRank] = useState("Semua Rank");
  const [selectedSort, setSelectedSort] = useState("Terbaru");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [favs, setFavs] = useState<number[]>([]);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  const toggleFav = (id: number) => setFavs((p) => p.includes(id) ? p.filter((f) => f !== id) : [...p, id]);

  const filtered = accounts.filter((a) => {
    if (selectedGame !== "Semua Game" && a.game !== selectedGame) return false;
    if (selectedRank !== "Semua Rank" && !a.rank.includes(selectedRank.split(" ")[0])) return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase()) && !a.game.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (minPrice && a.price < parseInt(minPrice.replace(/\D/g, ""))) return false;
    if (maxPrice && a.price > parseInt(maxPrice.replace(/\D/g, ""))) return false;
    return true;
  }).sort((a, b) => {
    if (selectedSort === "Harga Terendah") return a.price - b.price;
    if (selectedSort === "Harga Tertinggi") return b.price - a.price;
    if (selectedSort === "Rating Penjual") return b.sellerRating - a.sellerRating;
    if (selectedSort === "Terpopuler") return b.views - a.views;
    return b.id - a.id;
  });

  const detail = activeDetail !== null ? accounts.find((a) => a.id === activeDetail) : null;
  const hasActiveFilters = selectedGame !== "Semua Game" || selectedRank !== "Semua Rank" || searchQuery;

  return (
    <div className="mp-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="mp-hero">
        <div className="mp-hero-bg" /><div className="mp-hero-grid" /><div className="mp-hero-line" />
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:6, padding:"4px 12px", marginBottom:14 }}>
            <Tag size={11} color="#DC2626" /><span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"#DC2626", textTransform:"uppercase" as const, fontFamily:"'Barlow',sans-serif" }}>Marketplace</span>
          </div>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"clamp(28px,4vw,40px)", fontWeight:700, color:"#fff", margin:"0 0 6px" }}>
            Marketplace <span style={{ color:"#DC2626" }}>Akun Game</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 20px", fontFamily:"'Barlow',sans-serif" }}>
            Beli & jual akun game dengan aman menggunakan sistem Escrow
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" as const }}>
            {[
              { icon:<TrendingUp size={12}/>, label:`${accounts.length}+ Akun Aktif`, color:"#10B981" },
              { icon:<Shield size={12}/>, label:"Escrow Protected", color:"#3B82F6" },
              { icon:<Zap size={12}/>, label:"Transaksi Aman", color:"#DC2626" },
            ].map((b) => (
              <div key={b.label} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"6px 14px", fontSize:12, color:"rgba(255,255,255,0.45)", fontFamily:"'Barlow',sans-serif", fontWeight:600 }}>
                <span style={{ color:b.color }}>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 24px 60px" }}>

        {/* Toolbar */}
        <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" as const }}>
          <div className="mp-search-wrap" style={{ flex:1, minWidth:200 }}>
            <Search size={16} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.2)", pointerEvents:"none" }} />
            <input className="mp-search-input" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari akun game..." />
          </div>

          <div style={{ position:"relative" }}>
            <ArrowUpDown size={13} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", pointerEvents:"none" }} />
            <select className="mp-select" style={{ paddingLeft:32 }} value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
              {sortOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={13} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", pointerEvents:"none" }} />
          </div>

          <button className={`mp-filter-btn ${showFilter ? "on" : "off"}`} onClick={() => setShowFilter(!showFilter)}>
            <SlidersHorizontal size={14} /> Filter
          </button>

          <button className="mp-sell-btn" onClick={() => navigate("/marketplace/sell")}>
            <Zap size={14} fill="white" /> Jual Akun
          </button>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="mp-filter-panel">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:24 }}>
              <div>
                <div className="mp-filter-label">Game</div>
                <div style={{ display:"flex", flexDirection:"column", gap:2, maxHeight:160, overflowY:"auto" }}>
                  {games.map((g) => (
                    <div key={g} className="mp-check-row" onClick={() => setSelectedGame(g)}>
                      <div className={`mp-check-box ${selectedGame === g ? "checked" : ""}`}>
                        {selectedGame === g && <CheckCircle size={10} color="#fff" />}
                      </div>
                      <span className="mp-check-label">{g}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mp-filter-label">Rank</div>
                <div style={{ display:"flex", flexDirection:"column", gap:2, maxHeight:160, overflowY:"auto" }}>
                  {ranks.map((r) => (
                    <div key={r} className="mp-check-row" onClick={() => setSelectedRank(r)}>
                      <div className={`mp-check-box ${selectedRank === r ? "checked" : ""}`}>
                        {selectedRank === r && <CheckCircle size={10} color="#fff" />}
                      </div>
                      <span className="mp-check-label">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mp-filter-label">Harga Min</div>
                <input className="mp-filter-input" type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="500000" />
              </div>
              <div>
                <div className="mp-filter-label">Harga Max</div>
                <input className="mp-filter-input" type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="5000000" />
                <button onClick={() => { setSelectedGame("Semua Game"); setSelectedRank("Semua Rank"); setMinPrice(""); setMaxPrice(""); }} style={{ marginTop:12, fontSize:12, color:"#DC2626", background:"none", border:"none", cursor:"pointer", fontWeight:700, fontFamily:"'Barlow',sans-serif", padding:0 }}>
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:8 }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.3)", margin:0, fontFamily:"'Barlow',sans-serif" }}>
            Menampilkan <strong style={{ color:"rgba(255,255,255,0.7)" }}>{filtered.length}</strong> akun
          </p>
          {hasActiveFilters && (
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {selectedGame !== "Semua Game" && (
                <div className="mp-active-tag" style={{ background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", color:"#DC2626" }} onClick={() => setSelectedGame("Semua Game")}>
                  {selectedGame} <X size={10} />
                </div>
              )}
              {selectedRank !== "Semua Rank" && (
                <div className="mp-active-tag" style={{ background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.3)", color:"#3B82F6" }} onClick={() => setSelectedRank("Semua Rank")}>
                  {selectedRank} <X size={10} />
                </div>
              )}
              {searchQuery && (
                <div className="mp-active-tag" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)" }} onClick={() => setSearchQuery("")}>
                  "{searchQuery}" <X size={10} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, color:"rgba(255,255,255,0.5)", margin:"0 0 8px" }}>Akun tidak ditemukan</h3>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:14, fontFamily:"'Barlow',sans-serif" }}>Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div className="mp-cards-grid">
            {filtered.map((acc, i) => {
              const st = statusConfig[acc.status];
              const bd = acc.badge ? badgeConfig[acc.badge] : null;
              const isFav = favs.includes(acc.id);
              return (
                <div key={acc.id} className="mp-card mp-animate" style={{ animationDelay:`${i*70}ms` }} onClick={() => setActiveDetail(acc.id)}>
                  <div className="mp-card-glow" style={{ background:acc.gameColor }} />

                  {/* Top color bar */}
                  <div className="mp-card-top-bar" style={{ background:`linear-gradient(90deg,${acc.gameColor},${acc.gameColor}88)` }} />

                  <div className="mp-card-body">
                    {/* Row 1: game tag + badge + fav */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:32, height:32, borderRadius:9, background:`${acc.gameColor}18`, border:`1px solid ${acc.gameColor}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                          {acc.icon}
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color:acc.gameColor, fontFamily:"'Barlow',sans-serif", letterSpacing:"0.05em", textTransform:"uppercase" as const }}>
                          {acc.game}
                        </span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        {bd && (
                          <span style={{ fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:4, background:bd.bg, border:`1px solid ${bd.border}`, color:bd.color, fontFamily:"'Barlow',sans-serif", letterSpacing:"0.07em" }}>
                            {bd.label}
                          </span>
                        )}
                        <button className={`mp-fav-btn ${isFav ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); toggleFav(acc.id); }}>
                          <Heart size={15} fill={isFav ? "#DC2626" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:17, fontWeight:700, color:"#fff", margin:0, lineHeight:1.25, letterSpacing:"0.01em" }}>
                      {acc.title}
                    </h3>

                    {/* Stats */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                      {[{ l:"Rank", v:acc.rank },{ l:"Heroes", v:acc.heroes },{ l:"Skins", v:acc.skins }].map((s) => (
                        <div key={s.l} className="mp-stat-chip">
                          <div style={{ fontSize:9, color:"rgba(255,255,255,0.25)", textTransform:"uppercase" as const, letterSpacing:"0.07em", fontFamily:"'Barlow',sans-serif", marginBottom:3 }}>{s.l}</div>
                          <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.75)", fontFamily:"'Rajdhani',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Seller row */}
                    <div className="mp-seller-row">
                      <div className="mp-seller-avatar"><User size={14} color="#fff" /></div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.8)", fontFamily:"'Rajdhani',sans-serif" }}>{acc.seller}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"'Barlow',sans-serif" }}>
                          <Star size={10} fill="#F59E0B" color="#F59E0B" />
                          <span style={{ color:"#F59E0B", fontWeight:600 }}>{acc.sellerRating}</span>
                          · {acc.sellerSales} terjual
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, color:st.color, fontFamily:"'Barlow',sans-serif" }}>
                        {st.dot && <span style={{ width:6, height:6, borderRadius:"50%", background:st.dot, display:"inline-block", boxShadow:`0 0 6px ${st.dot}` }} />}
                        {st.label}
                      </div>
                    </div>

                    {/* Price + views */}
                    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", textTransform:"uppercase" as const, letterSpacing:"0.07em", fontFamily:"'Barlow',sans-serif", marginBottom:2 }}>Harga</div>
                        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#DC2626", lineHeight:1 }}>
                          {formatRupiah(acc.price)}
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:11, color:"rgba(255,255,255,0.2)", fontFamily:"'Barlow',sans-serif" }}>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Eye size={12} /> {acc.views}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:4 }}><Heart size={12} /> {acc.favorites}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <div style={{ textAlign:"center", marginTop:36 }}>
            <button className="mp-load-btn">Muat Lebih Banyak</button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="mp-modal-overlay" onClick={() => setActiveDetail(null)}>
          <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
            {/* modal top color */}
            <div style={{ height:3, background:`linear-gradient(90deg,${detail.gameColor},${detail.gameColor}66)` }} />

            <div className="mp-modal-body">
              {/* Header */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${detail.gameColor}18`, border:`1px solid ${detail.gameColor}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{detail.icon}</div>
                    <span style={{ fontSize:12, fontWeight:700, color:detail.gameColor, fontFamily:"'Barlow',sans-serif", textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>{detail.game}</span>
                    {detail.badge && badgeConfig[detail.badge] && (
                      <span style={{ fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:4, background:badgeConfig[detail.badge].bg, border:`1px solid ${badgeConfig[detail.badge].border}`, color:badgeConfig[detail.badge].color, fontFamily:"'Barlow',sans-serif", letterSpacing:"0.07em" }}>
                        {badgeConfig[detail.badge].label}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#fff", margin:0, lineHeight:1.2 }}>{detail.title}</h2>
                </div>
                <button onClick={() => setActiveDetail(null)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.4)", flexShrink:0 }}>
                  <X size={16} />
                </button>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
                {[{ l:"Rank", v:detail.rank },{ l:"Heroes", v:detail.heroes },{ l:"Skins", v:detail.skins }].map((s) => (
                  <div key={s.l} className="mp-modal-stat">
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", textTransform:"uppercase" as const, letterSpacing:"0.07em", fontFamily:"'Barlow',sans-serif", marginBottom:4 }}>{s.l}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:"rgba(255,255,255,0.85)", fontFamily:"'Rajdhani',sans-serif" }}>{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Escrow banner */}
              <div className="mp-modal-escrow">
                <Shield size={18} color="#10B981" style={{ flexShrink:0, marginTop:1 }} />
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#10B981", fontFamily:"'Rajdhani',sans-serif", marginBottom:2 }}>Dilindungi Escrow OkeGass</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Barlow',sans-serif" }}>Dana aman hingga akun berhasil dipindahkan ke pembeli</div>
                </div>
              </div>

              {/* Seller */}
              <div className="mp-modal-seller">
                <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#DC2626,#EA580C)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <User size={18} color="#fff" />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:700, color:"#fff" }}>{detail.seller}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"rgba(255,255,255,0.35)", fontFamily:"'Barlow',sans-serif" }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color:"#F59E0B", fontWeight:600 }}>{detail.sellerRating}</span>
                    · {detail.sellerSales} Transaksi
                  </div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:statusConfig[detail.status].color, fontFamily:"'Barlow',sans-serif" }}>
                  {statusConfig[detail.status].label}
                </div>
              </div>

              {/* Price */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textTransform:"uppercase" as const, letterSpacing:"0.08em", fontFamily:"'Barlow',sans-serif", marginBottom:4 }}>Harga</div>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:32, fontWeight:700, color:"#DC2626", lineHeight:1 }}>{formatRupiah(detail.price)}</div>
                </div>
                <div style={{ display:"flex", gap:14, fontSize:12, color:"rgba(255,255,255,0.25)", fontFamily:"'Barlow',sans-serif" }}>
                  <span style={{ display:"flex", alignItems:"center", gap:5 }}><Eye size={13} /> {detail.views}</span>
                  <span style={{ display:"flex", alignItems:"center", gap:5 }}><Heart size={13} /> {detail.favorites}</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display:"flex", gap:10 }}>
                <button className="mp-btn-ghost"><MessageCircle size={15} /> Chat Penjual</button>
                <button className="mp-btn-primary"><Zap size={14} fill="white" /> Beli Sekarang <ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}