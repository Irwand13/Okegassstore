import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, SlidersHorizontal, User, Star, Shield, Tag,
  ChevronDown, ChevronRight, X, ArrowUpDown, CheckCircle,
  Eye, MessageCircle, Heart, TrendingUp, Filter
} from "lucide-react";

const games = ["Semua Game", "Mobile Legends", "PUBG Mobile", "Genshin Impact", "Free Fire", "Valorant", "Honor of Kings"];
const ranks = ["Semua Rank", "Mythic Glory", "Mythic", "Legend", "Epic", "Grandmaster", "Master", "Platinum", "Gold"];
const sortOptions = ["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Penjual", "Terpopuler"];

const accounts = [
  { id: 1, game: "Mobile Legends", gameColor: "#1E88E5", emoji: "⚔️", title: "Akun Mythic Glory 1500+ Points", rank: "Mythic Glory", heroes: "150+ Heroes", skins: "250+ Skins", seller: "ProGamer99", sellerRating: 4.9, sellerSales: 234, price: 3500000, status: "available", views: 1240, favorites: 89, badge: "HOT" },
  { id: 2, game: "PUBG Mobile", gameColor: "#3949AB", emoji: "🎯", title: "Conqueror Season 29 Full Set", rank: "Conqueror", heroes: "80+ Outfits", skins: "150+ Skins", seller: "PUBGKing", sellerRating: 5.0, sellerSales: 178, price: 4200000, status: "escrow", views: 876, favorites: 67, badge: "ESCROW" },
  { id: 3, game: "Genshin Impact", gameColor: "#7B2FFF", emoji: "✨", title: "AR 60 — Semua 5-Star Characters", rank: "AR 60", heroes: "All 5★", skins: "Premium BP", seller: "TravelerMain", sellerRating: 4.8, sellerSales: 45, price: 5500000, status: "available", views: 2340, favorites: 198, badge: "PREMIUM" },
  { id: 4, game: "Free Fire", gameColor: "#FF6F00", emoji: "🔥", title: "Grandmaster Season 30, Rare Bundles", rank: "Grandmaster", heroes: "60+ Bundles", skins: "100+ Skins", seller: "FFlegend", sellerRating: 4.7, sellerSales: 123, price: 1200000, status: "available", views: 543, favorites: 34, badge: null },
  { id: 5, game: "Mobile Legends", gameColor: "#1E88E5", emoji: "⚔️", title: "Mythic 500 Points, All Core Heroes", rank: "Mythic", heroes: "120+ Heroes", skins: "180+ Skins", seller: "MLBBpro", sellerRating: 4.6, sellerSales: 89, price: 2100000, status: "available", views: 765, favorites: 52, badge: null },
  { id: 6, game: "Valorant", gameColor: "#FF4655", emoji: "💀", title: "Immortal 3 | Radiant Skins Collector", rank: "Immortal 3", heroes: "20+ Agents", skins: "50+ Skins", seller: "ValorantKing", sellerRating: 4.9, sellerSales: 312, price: 6800000, status: "available", views: 1890, favorites: 145, badge: "TOP SELLER" },
  { id: 7, game: "Genshin Impact", gameColor: "#7B2FFF", emoji: "✨", title: "AR 55, Raiden + Hu Tao + Ayaka", rank: "AR 55", heroes: "3 Main DPS", skins: "Battle Pass", seller: "Paimon_Lover", sellerRating: 4.5, sellerSales: 28, price: 2800000, status: "available", views: 423, favorites: 31, badge: null },
  { id: 8, game: "Honor of Kings", gameColor: "#D4AF37", emoji: "👑", title: "Supreme Legend Season 12", rank: "Supreme Legend", heroes: "90+ Heroes", skins: "120+ Skins", seller: "HOKmaster", sellerRating: 4.8, sellerSales: 67, price: 1800000, status: "available", views: 320, favorites: 22, badge: null },
  { id: 9, game: "PUBG Mobile", gameColor: "#3949AB", emoji: "🎯", title: "Ace + Full Premium Outfits", rank: "Ace", heroes: "60+ Outfits", skins: "80+ Skins", seller: "PUBG_Ace99", sellerRating: 4.7, sellerSales: 55, price: 1950000, status: "available", views: 430, favorites: 29, badge: null },
];

const formatRupiah = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

const getBadgeStyle = (badge: string | null) => {
  switch (badge) {
    case "HOT": return "bg-red-500 text-white";
    case "ESCROW": return "bg-amber-500 text-white";
    case "PREMIUM": return "bg-purple-600 text-white";
    case "TOP SELLER": return "bg-blue-600 text-white";
    default: return "";
  }
};

const getStatusBadge = (status: string) => {
  if (status === "available") return <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Tersedia</span>;
  if (status === "escrow") return <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><Shield className="w-3 h-3" />Escrow</span>;
  return <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-semibold">Terjual</span>;
};

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

  const toggleFav = (id: number) => {
    setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

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

  const detailAccount = activeDetail !== null ? accounts.find((a) => a.id === activeDetail) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-7 h-7 text-[#EA580C]" />
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold">
              Marketplace Akun
            </h1>
          </div>
          <p className="text-gray-400">Beli & jual akun game dengan aman menggunakan sistem Escrow</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" /> {accounts.length}+ Akun Aktif
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
              <Shield className="w-4 h-4 text-blue-400" /> Escrow Protected
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari akun game..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 shadow-sm"
            />
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="pl-9 pr-8 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#DC2626] appearance-none shadow-sm cursor-pointer"
            >
              {sortOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all shadow-sm ${showFilter ? "bg-[#DC2626] text-white border-[#DC2626]" : "bg-white text-gray-700 border-gray-200 hover:border-red-300"}`}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => navigate("/marketplace/sell")}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            + Jual Akun
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 animate-in fade-in slide-in-from-top duration-300">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Game</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {games.map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedGame === g ? "bg-[#DC2626] border-[#DC2626]" : "border-gray-300 group-hover:border-red-300"}`} onClick={() => setSelectedGame(g)}>
                        {selectedGame === g && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rank</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {ranks.map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedRank === r ? "bg-[#DC2626] border-[#DC2626]" : "border-gray-300 group-hover:border-red-300"}`} onClick={() => setSelectedRank(r)}>
                        {selectedRank === r && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-700">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Harga Minimum</label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Contoh: 500000"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#DC2626]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Harga Maksimum</label>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Contoh: 5000000"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#DC2626]"
                />
                <button
                  onClick={() => { setSelectedGame("Semua Game"); setSelectedRank("Semua Rank"); setMinPrice(""); setMaxPrice(""); }}
                  className="mt-3 text-xs text-red-500 hover:text-red-700 font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Menampilkan <strong className="text-gray-800">{filtered.length}</strong> akun
          </p>
          {(selectedGame !== "Semua Game" || selectedRank !== "Semua Rank" || searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap">
              {selectedGame !== "Semua Game" && (
                <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                  {selectedGame}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGame("Semua Game")} />
                </span>
              )}
              {selectedRank !== "Semua Rank" && (
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                  {selectedRank}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRank("Semua Rank")} />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Accounts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-700 mb-2">Akun tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((account, index) => (
              <div
                key={account.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setActiveDetail(account.id)}
              >
                {/* Game Color Banner */}
                <div className="h-2" style={{ backgroundColor: account.gameColor }} />

                <div className="p-5">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{account.emoji}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{account.game}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {account.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getBadgeStyle(account.badge)}`}>
                          {account.badge}
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFav(account.id); }}
                        className={`transition-all ${favs.includes(account.id) ? "text-red-500" : "text-gray-300 hover:text-red-400"}`}
                      >
                        <Heart className={`w-4 h-4 ${favs.includes(account.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#DC2626] transition-colors">
                    {account.title}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Rank", value: account.rank },
                      { label: "Heroes", value: account.heroes },
                      { label: "Skins", value: account.skins },
                    ].map((s) => (
                      <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-400">{s.label}</div>
                        <div className="text-xs font-bold text-gray-800 truncate">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Seller */}
                  <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                    <div className="w-7 h-7 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-full flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{account.seller}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        {account.sellerRating} · {account.sellerSales} terjual
                      </div>
                    </div>
                    <div className="ml-auto">
                      {getStatusBadge(account.status)}
                    </div>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Harga</div>
                      <div style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-[#DC2626]">
                        {formatRupiah(account.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Eye className="w-3.5 h-3.5" /> {account.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="text-center mt-10">
            <button className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-red-400 hover:text-red-600 transition-all text-sm">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailAccount && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setActiveDetail(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-3 rounded-t-2xl" style={{ backgroundColor: detailAccount.gameColor }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{detailAccount.emoji}</span>
                    <span className="text-sm font-bold text-gray-500">{detailAccount.game}</span>
                    {detailAccount.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getBadgeStyle(detailAccount.badge)}`}>
                        {detailAccount.badge}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900">
                    {detailAccount.title}
                  </h2>
                </div>
                <button onClick={() => setActiveDetail(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Rank", value: detailAccount.rank },
                  { label: "Heroes", value: detailAccount.heroes },
                  { label: "Skins", value: detailAccount.skins },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                    <div className="text-sm font-bold text-gray-800">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 mb-6">
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-blue-900">Dilindungi Escrow OkeGass</div>
                  <div className="text-xs text-blue-700">Dana aman hingga akun berhasil dipindahkan</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{detailAccount.seller}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    {detailAccount.sellerRating} Rating · {detailAccount.sellerSales} Transaksi
                  </div>
                </div>
                {getStatusBadge(detailAccount.status)}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Harga</div>
                  <div style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-[#DC2626]">
                    {formatRupiah(detailAccount.price)}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {detailAccount.views}</span>
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {detailAccount.favorites}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center justify-center gap-2 flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-red-400 hover:text-red-600 transition-all text-sm">
                  <MessageCircle className="w-4 h-4" /> Chat Penjual
                </button>
                <button
                  className="flex items-center justify-center gap-2 flex-1 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Beli Sekarang <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
