import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Star, Shield, Package, Tag, Settings, LogOut,
  ChevronRight, TrendingUp, Wallet, Clock, CheckCircle,
  AlertCircle, Edit3, Bell, Lock, HelpCircle, Camera,
  Trophy, Zap, Copy, ExternalLink
} from "lucide-react";

const transactions = [
  { id: "TRX-001", type: "topup", game: "Mobile Legends", item: "500 Diamonds", amount: 115000, status: "success", date: "14 Mei 2026", time: "14:32" },
  { id: "TRX-002", type: "buy", game: "PUBG Mobile", item: "Akun Conqueror Season 29", amount: 4200000, status: "escrow", date: "13 Mei 2026", time: "10:15" },
  { id: "TRX-003", type: "topup", game: "Genshin Impact", item: "1980 Genesis Crystals", amount: 462000, status: "success", date: "12 Mei 2026", time: "20:05" },
  { id: "TRX-004", type: "sell", game: "Free Fire", item: "Akun Grandmaster FF", amount: 1200000, status: "pending", date: "10 Mei 2026", time: "09:44" },
  { id: "TRX-005", type: "topup", game: "Free Fire", item: "355 Diamonds", amount: 79000, status: "success", date: "08 Mei 2026", time: "16:50" },
  { id: "TRX-006", type: "buy", game: "Mobile Legends", item: "Akun Mythic Glory ML", amount: 3500000, status: "success", date: "05 Mei 2026", time: "11:30" },
];

const myListings = [
  { id: "LST-001", game: "Free Fire", emoji: "🔥", title: "Akun Grandmaster FF Full Bundle", rank: "Grandmaster", price: 1200000, status: "pending", views: 34, date: "10 Mei 2026" },
  { id: "LST-002", game: "PUBG Mobile", emoji: "🎯", title: "Akun Ace PUBG Full Outfit", rank: "Ace", price: 1950000, status: "active", views: 87, date: "01 Mei 2026" },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success": return <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 whitespace-nowrap"><CheckCircle className="w-3 h-3" />Berhasil</span>;
    case "escrow": return <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 whitespace-nowrap"><Shield className="w-3 h-3" />Escrow</span>;
    case "pending": return <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3" />Menunggu</span>;
    case "active": return <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">Aktif</span>;
    default: return <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-semibold">{status}</span>;
  }
};

const getTypeIcon = (type: string) => {
  if (type === "topup") return <Zap className="w-4 h-4 text-blue-500" />;
  if (type === "buy") return <Package className="w-4 h-4 text-purple-500" />;
  if (type === "sell") return <Tag className="w-4 h-4 text-green-500" />;
  return null;
};

const getTypeLabel = (type: string) => {
  if (type === "topup") return "Top Up";
  if (type === "buy") return "Beli Akun";
  if (type === "sell") return "Jual Akun";
  return type;
};

const user = {
  name: "User",
  email: "user@okegass.com",
  phone: "0812-3456-7890",
  avatar: "U",
  joinDate: "Mei 2026",
  verified: true,
  level: "Trusted Seller",
  rating: 4.8,
  totalSales: 12,
  totalBuy: 5,
  balance: 250000,
};

type Tab = "transactions" | "listings" | "settings";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("transactions");
  const [txFilter, setTxFilter] = useState("Semua");
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formName, setFormName] = useState(user.name);
  const [formPhone, setFormPhone] = useState(user.phone);
  const [notifTopup, setNotifTopup] = useState(true);
  const [notifSell, setNotifSell] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  const txFilters = ["Semua", "Top Up", "Beli Akun", "Jual Akun"];

  const filteredTx = transactions.filter((t) => {
    if (txFilter === "Top Up") return t.type === "topup";
    if (txFilter === "Beli Akun") return t.type === "buy";
    if (txFilter === "Jual Akun") return t.type === "sell";
    return true;
  });

  const handleCopyId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalSpent = transactions.filter((t) => t.status === "success" && t.type !== "sell").reduce((a, b) => a + b.amount, 0);
  const totalEarned = transactions.filter((t) => t.type === "sell" && t.status === "success").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl" style={{ fontFamily: "var(--font-display)" }}>
                {user.avatar}
              </div>
              <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                <Camera className="w-3.5 h-3.5 text-gray-600" />
              </button>
              {user.verified && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold">{user.name}</h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {user.level}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{user.email} · Bergabung {user.joinDate}</p>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{user.rating}</span>
                  <span className="text-gray-400">Rating</span>
                </div>
                <div className="text-gray-400">·</div>
                <div className="text-gray-300">
                  <span className="font-bold text-white">{user.totalSales}</span> Penjualan
                </div>
                <div className="text-gray-400">·</div>
                <div className="text-gray-300">
                  <span className="font-bold text-white">{user.totalBuy}</span> Pembelian
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-white/10 rounded-2xl p-4 text-right backdrop-blur-sm border border-white/10">
              <div className="text-xs text-gray-400 mb-1 flex items-center gap-1 justify-end">
                <Wallet className="w-3.5 h-3.5" /> Saldo OkeGass
              </div>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-green-400">
                {formatRupiah(user.balance)}
              </div>
              <button className="text-xs text-[#EA580C] font-semibold mt-1 hover:text-orange-300 transition-colors">
                + Top Up Saldo
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Total Pengeluaran", value: formatRupiah(totalSpent), icon: TrendingUp, color: "text-blue-400" },
              { label: "Total Pendapatan", value: formatRupiah(totalEarned), icon: Wallet, color: "text-green-400" },
              { label: "Transaksi Aktif", value: `${transactions.filter((t) => t.status === "escrow" || t.status === "pending").length} Transaksi`, icon: Clock, color: "text-amber-400" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className={`flex items-center gap-1.5 text-xs mb-1 ${stat.color}`}>
                    <Icon className="w-3.5 h-3.5" /> {stat.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)" }} className="font-bold text-white text-sm">
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-6 w-fit">
          {[
            { id: "transactions" as Tab, label: "Transaksi", icon: Package },
            { id: "listings" as Tab, label: "Listing Saya", icon: Tag },
            { id: "settings" as Tab, label: "Pengaturan", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div>
            {/* Filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {txFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    txFilter === f
                      ? "bg-[#DC2626] text-white border-[#DC2626]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {filteredTx.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold">Tidak ada transaksi</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredTx.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                      {/* Type Icon */}
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(tx.type)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-gray-400 uppercase">{getTypeLabel(tx.type)}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-400">{tx.game}</span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm truncate">{tx.item}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{tx.date} · {tx.time}</div>
                      </div>

                      {/* Amount + Status */}
                      <div className="text-right flex-shrink-0">
                        <div style={{ fontFamily: "var(--font-display)" }} className={`font-bold ${tx.type === "sell" ? "text-green-600" : "text-gray-900"}`}>
                          {tx.type === "sell" ? "+" : "-"}{formatRupiah(tx.amount)}
                        </div>
                        <div className="mt-1 flex justify-end">{getStatusBadge(tx.status)}</div>
                      </div>

                      {/* Detail Arrow */}
                      <button className="ml-2 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{myListings.length} listing aktif</p>
              <button
                onClick={() => navigate("/marketplace/sell")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-red-500/20 transition-all"
                style={{ fontFamily: "var(--font-display)" }}
              >
                + Jual Akun Baru
              </button>
            </div>

            {myListings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-16">
                <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold mb-2">Belum ada listing</p>
                <button
                  onClick={() => navigate("/marketplace/sell")}
                  className="text-sm text-[#DC2626] font-bold hover:underline"
                >
                  Mulai jual akun →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-3xl">{listing.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">{listing.game} · {listing.rank}</div>
                          <div className="font-bold text-gray-900 truncate">{listing.title}</div>
                          <div className="text-xs text-gray-400 mt-1">Dibuat {listing.date} · {listing.views} views</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {getStatusBadge(listing.status)}
                        <div style={{ fontFamily: "var(--font-display)" }} className="text-lg font-bold text-[#DC2626]">
                          {formatRupiah(listing.price)}
                        </div>
                      </div>
                    </div>

                    {listing.status === "pending" && (
                      <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-3 mt-4">
                        <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <p className="text-xs text-blue-700">Listing sedang dalam proses verifikasi (1x24 jam)</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:border-red-300 hover:text-red-600 transition-all">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:border-gray-400 transition-all">
                        <ExternalLink className="w-3.5 h-3.5" /> Lihat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900">
                  Informasi Profil
                </h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${editMode ? "bg-[#DC2626] text-white" : "border border-gray-200 text-gray-600 hover:border-red-300"}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {editMode ? "Simpan" : "Edit"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Pengguna</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  ) : (
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-900">{formName}</span>
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-900">{user.email}</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-semibold">Terverifikasi</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nomor WhatsApp</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  ) : (
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-900">{formPhone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">ID Referral</label>
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-900 font-mono">OKG-US12345</span>
                    <button onClick={handleCopyId} className="flex items-center gap-1.5 text-xs text-[#DC2626] font-bold hover:text-red-700 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? "Disalin!" : "Salin"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Bagikan ke teman untuk mendapatkan komisi referral</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-600" /> Notifikasi
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Notifikasi Top Up", desc: "Status top up dan konfirmasi pembayaran", value: notifTopup, set: setNotifTopup },
                  { label: "Notifikasi Transaksi Akun", desc: "Update status listing dan pembelian akun", value: notifSell, set: setNotifSell },
                  { label: "Promo & Penawaran", desc: "Diskon, cashback, dan event spesial", value: notifPromo, set: setNotifPromo },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${item.value ? "bg-[#DC2626]" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${item.value ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-600" /> Keamanan
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Ganti Password", icon: Lock, desc: "Terakhir diubah 3 bulan lalu" },
                  { label: "Verifikasi 2 Faktor", icon: Shield, desc: "Belum aktif - Direkomendasikan" },
                  { label: "Riwayat Login", icon: HelpCircle, desc: "Lihat aktivitas login terakhir" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                        <Icon className="w-4.5 h-4.5 text-gray-600 group-hover:text-[#DC2626]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" />
                Keluar dari Akun
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
