import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Star, Shield, Package, Tag, Settings, LogOut,
  ChevronRight, TrendingUp, Wallet, Clock, CheckCircle,
  AlertCircle, Edit3, Bell, Lock, HelpCircle, Camera,
  Trophy, Zap, Copy, ExternalLink, X
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
  { id: "LST-001", game: "Free Fire", title: "Akun Grandmaster FF Full Bundle", rank: "Grandmaster", price: 1200000, status: "pending", views: 34, date: "10 Mei 2026" },
  { id: "LST-002", game: "PUBG Mobile", title: "Akun Ace PUBG Full Outfit", rank: "Ace", price: 1950000, status: "active", views: 87, date: "01 Mei 2026" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.prof-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

/* Hero Section */
.prof-hero {
  position: relative; padding: 44px 0 40px; overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prof-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(234,88,12,0.05) 40%, transparent 100%);
}
.prof-hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size: 40px 40px;
}

/* Avatar */
.prof-avatar {
  width: 80px; height: 80px; border-radius: 20px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700;
  color: #fff; box-shadow: 0 8px 24px rgba(220,38,38,0.3);
  position: relative;
}
.prof-avatar-cam {
  position: absolute; bottom: -4px; right: -4px;
  width: 28px; height: 28px; background: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer;
  transition: all 0.2s;
}
.prof-avatar-cam:hover { background: #f0f0f0; transform: scale(1.05); }
.prof-badge-verified {
  position: absolute; top: -4px; right: -4px;
  width: 24px; height: 24px; background: #3B82F6;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(59,130,246,0.3);
}

/* Tabs */
.prof-tabs {
  display: flex; gap: 4px; background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
  padding: 4px; width: fit-content; margin-bottom: 24px;
}
.prof-tab {
  display: flex; align-items: center; gap: 8px; padding: 10px 18px;
  border-radius: 8px; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.4);
  background: transparent; border: none;
}
.prof-tab.active {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  color: #fff; box-shadow: 0 4px 12px rgba(220,38,38,0.3);
}
.prof-tab:hover:not(.active) { color: rgba(255,255,255,0.7); }

/* Filter Buttons */
.prof-filter-btn {
  padding: 10px 16px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; font-family: 'Barlow', sans-serif;
}
.prof-filter-btn.active {
  background: linear-gradient(135deg, #DC2626, #EA580C);
  border-color: #DC2626; color: #fff;
}
.prof-filter-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); }

/* Transaction Item */
.prof-tx-item {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.2s;
  cursor: pointer;
}
.prof-tx-item:hover { background: rgba(255,255,255,0.02); }
.prof-tx-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.prof-tx-info { flex: 1; min-width: 0; }
.prof-tx-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.prof-tx-meta { font-size: 11px; color: rgba(255,255,255,0.3); }
.prof-tx-amount { font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; text-align: right; }
.prof-tx-status { font-size: 11px; margin-top: 6px; text-align: right; display: flex; justify-content: flex-end; }

/* Card */
.prof-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 20px;
}
.prof-card-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prof-card-title { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }

/* Input */
.prof-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.prof-input::placeholder { color: rgba(255,255,255,0.15); }
.prof-input:focus { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

/* Label */
.prof-label {
  display: block; font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.35); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.06em;
}

/* Toggle Switch */
.prof-toggle {
  position: relative; width: 44px; height: 24px; border-radius: 12px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer; transition: all 0.3s; flex-shrink: 0;
}
.prof-toggle.on { background: #DC2626; border-color: #DC2626; }
.prof-toggle-circle {
  position: absolute; width: 20px; height: 20px;
  border-radius: 10px; background: #fff; top: 2px; left: 2px;
  transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.prof-toggle.on .prof-toggle-circle { transform: translateX(20px); }

/* Status Badge */
.prof-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; padding: 5px 10px; border-radius: 6px;
  font-weight: 700; white-space: nowrap;
}
.prof-badge-success { background: rgba(16,185,129,0.15); color: #10B981; }
.prof-badge-amber { background: rgba(245,158,11,0.15); color: #F59E0B; }
.prof-badge-blue { background: rgba(59,130,246,0.15); color: #3B82F6; }

/* Button */
.prof-btn {
  padding: 11px 18px; border-radius: 10px; border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: inline-flex;
  align-items: center; justify-content: center; gap: 6px;
}
.prof-btn-primary {
  background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff;
  box-shadow: 0 4px 12px rgba(220,38,38,0.3);
}
.prof-btn-primary:hover { box-shadow: 0 8px 20px rgba(220,38,38,0.5); }
.prof-btn-secondary {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
}
.prof-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #fff; }

/* Listing Card */
.prof-listing {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 16px; margin-bottom: 16px;
  transition: all 0.2s;
}
.prof-listing:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.035); }

/* Settings Item */
.prof-setting-item {
  padding: 16px; border-radius: 10px; cursor: pointer;
  transition: all 0.2s; border: none; background: transparent;
  width: 100%; text-align: left; display: flex; align-items: center; gap: 12px;
}
.prof-setting-item:hover { background: rgba(255,255,255,0.04); }
.prof-setting-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.04); display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
}
.prof-setting-item:hover .prof-setting-icon { background: rgba(220,38,38,0.1); }

/* Danger Zone */
.prof-danger {
  background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 14px; padding: 16px;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.prof-animate { animation: fadeIn 0.3s ease; }
`;

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const getStatusBadge = (status: string) => {
  if (status === "success") return <span className="prof-badge prof-badge-success"><CheckCircle className="w-3 h-3" />Berhasil</span>;
  if (status === "escrow") return <span className="prof-badge prof-badge-amber"><Shield className="w-3 h-3" />Escrow</span>;
  if (status === "pending") return <span className="prof-badge prof-badge-blue"><Clock className="w-3 h-3" />Menunggu</span>;
  if (status === "active") return <span className="prof-badge prof-badge-success">Aktif</span>;
  return <span className="prof-badge">{status}</span>;
};

const getTypeIcon = (type: string) => {
  if (type === "topup") return <Zap className="w-4 h-4" color="#3B82F6" />;
  if (type === "buy") return <Package className="w-4 h-4" color="#A78BFA" />;
  if (type === "sell") return <Tag className="w-4 h-4" color="#10B981" />;
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
    navigator.clipboard.writeText("OKG-US12345");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalSpent = transactions.filter((t) => t.status === "success" && t.type !== "sell").reduce((a, b) => a + b.amount, 0);
  const totalEarned = transactions.filter((t) => t.type === "sell" && t.status === "success").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="prof-root">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="prof-hero">
        <div className="prof-hero-bg" />
        <div className="prof-hero-grid" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Profile Header */}
            <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Avatar */}
              <div className="prof-avatar" style={{ position: "relative" }}>
                {user.avatar}
                <div className="prof-avatar-cam"><Camera className="w-4 h-4" color="#666" /></div>
                {user.verified && (
                  <div className="prof-badge-verified"><CheckCircle className="w-4 h-4" color="#fff" /></div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", margin: 0 }}>
                    {user.name}
                  </h1>
                  <span style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B", fontSize: 11, padding: "4px 10px", borderRadius: 6, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Trophy className="w-3 h-3" /> {user.level}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 12px" }}>
                  {user.email} · Bergabung {user.joinDate}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#F59E0B" }}>
                    <Star className="w-4 h-4" fill="#F59E0B" />
                    <span style={{ fontWeight: 700 }}>{user.rating}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Rating</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}><strong style={{ color: "#fff" }}>{user.totalSales}</strong> Penjualan</span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}><strong style={{ color: "#fff" }}>{user.totalBuy}</strong> Pembelian</span>
                </div>
              </div>

              {/* Balance */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 16, textAlign: "right", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8, justifyContent: "flex-end" }}>
                  <Wallet className="w-3.5 h-3.5" /> Saldo OkeGass
                </div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 24, fontWeight: 700, color: "#10B981", marginBottom: 8 }}>
                  {formatRupiah(user.balance)}
                </div>
                <button style={{ background: "none", border: "none", color: "#EA580C", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  + Top Up Saldo
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { label: "Total Pengeluaran", value: formatRupiah(totalSpent), icon: TrendingUp, color: "#3B82F6" },
                { label: "Total Pendapatan", value: formatRupiah(totalEarned), icon: Wallet, color: "#10B981" },
                { label: "Transaksi Aktif", value: `${transactions.filter((t) => t.status === "escrow" || t.status === "pending").length} Transaksi`, icon: Clock, color: "#F59E0B" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: stat.color, marginBottom: 6 }}>
                      <Icon className="w-3.5 h-3.5" /> {stat.label}
                    </div>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Tabs */}
        <div className="prof-tabs">
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
                className={`prof-tab ${activeTab === tab.id ? "active" : ""}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="prof-animate">
            {/* Filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {txFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f)}
                  className={`prof-filter-btn ${txFilter === f ? "active" : ""}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Transaction List */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
              {filteredTx.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <Package className="w-12 h-12" style={{ color: "rgba(255,255,255,0.1)", margin: "0 auto 12px", display: "block" }} />
                  <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>Tidak ada transaksi</p>
                </div>
              ) : (
                filteredTx.map((tx) => (
                  <div key={tx.id} className="prof-tx-item">
                    <div className="prof-tx-icon">{getTypeIcon(tx.type)}</div>
                    <div className="prof-tx-info">
                      <div className="prof-tx-title">{getTypeLabel(tx.type)} · {tx.game}</div>
                      <div className="prof-tx-meta">{tx.item} · {tx.date} {tx.time}</div>
                    </div>
                    <div style={{ textAlign: "right", flex: "0 0 auto" }}>
                      <div className="prof-tx-amount" style={{ color: tx.type === "sell" ? "#10B981" : "#fff" }}>
                        {tx.type === "sell" ? "+" : "-"}{formatRupiah(tx.amount)}
                      </div>
                      <div className="prof-tx-status">{getStatusBadge(tx.status)}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.1)", flex: "0 0 auto" }} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="prof-animate">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>{myListings.length} listing aktif</p>
              <button
                onClick={() => navigate("/marketplace/sell")}
                className="prof-btn prof-btn-primary"
              >
                <Zap className="w-4 h-4" /> + Jual Akun Baru
              </button>
            </div>

            {myListings.length === 0 ? (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, textAlign: "center", padding: "60px 20px" }}>
                <Tag className="w-12 h-12" style={{ color: "rgba(255,255,255,0.1)", margin: "0 auto 12px", display: "block" }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: 8 }}>Belum ada listing</p>
                <button onClick={() => navigate("/marketplace/sell")} style={{ background: "none", border: "none", color: "#DC2626", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Mulai jual akun →
                </button>
              </div>
            ) : (
              myListings.map((listing) => (
                <div key={listing.id} className="prof-listing">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 4 }}>
                        {listing.game} · {listing.rank}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                        {listing.title}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                        Dibuat {listing.date} · {listing.views} views
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flex: "0 0 auto" }}>
                      {getStatusBadge(listing.status)}
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 16, fontWeight: 700, color: "#DC2626", marginTop: 6 }}>
                        {formatRupiah(listing.price)}
                      </div>
                    </div>
                  </div>

                  {listing.status === "pending" && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: 10, marginBottom: 12 }}>
                      <AlertCircle className="w-4 h-4" style={{ color: "#3B82F6", flex: "0 0 auto", marginTop: 1 }} />
                      <p style={{ fontSize: 11, color: "rgba(59,130,246,0.8)", margin: 0 }}>Listing sedang dalam proses verifikasi (1x24 jam)</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="prof-btn prof-btn-secondary">
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button className="prof-btn prof-btn-secondary">
                      <ExternalLink className="w-3.5 h-3.5" /> Lihat
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="prof-animate" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Profile Settings */}
            <div className="prof-card">
              <div className="prof-card-header">
                <h3 className="prof-card-title">Informasi Profil</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`prof-btn ${editMode ? "prof-btn-primary" : "prof-btn-secondary"}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {editMode ? "Simpan" : "Edit"}
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name */}
                <div>
                  <label className="prof-label">Nama Pengguna</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="prof-input"
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                      <span style={{ color: "#fff", fontWeight: 700 }}>{formName}</span>
                      <User className="w-4 h-4" color="rgba(255,255,255,0.2)" />
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="prof-label">Email</label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                    <span style={{ color: "#fff", fontWeight: 700 }}>{user.email}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle className="w-4 h-4" color="#10B981" />
                      <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>Terverifikasi</span>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="prof-label">Nomor WhatsApp</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="prof-input"
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                      <span style={{ color: "#fff", fontWeight: 700 }}>{formPhone}</span>
                    </div>
                  )}
                </div>

                {/* Referral */}
                <div>
                  <label className="prof-label">ID Referral</label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontFamily: "monospace" }}>OKG-US12345</span>
                    <button onClick={handleCopyId} style={{ background: "none", border: "none", color: "#DC2626", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? "Disalin!" : "Salin"}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>Bagikan ke teman untuk mendapatkan komisi referral</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="prof-card">
              <div className="prof-card-header">
                <h3 className="prof-card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Bell className="w-5 h-5" /> Notifikasi
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Notifikasi Top Up", desc: "Status top up dan konfirmasi pembayaran", value: notifTopup, set: setNotifTopup },
                  { label: "Notifikasi Transaksi Akun", desc: "Update status listing dan pembelian akun", value: notifSell, set: setNotifSell },
                  { label: "Promo & Penawaran", desc: "Diskon, cashback, dan event spesial", value: notifPromo, set: setNotifPromo },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className={`prof-toggle ${item.value ? "on" : ""}`}
                    >
                      <span className="prof-toggle-circle" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="prof-card">
              <div className="prof-card-header">
                <h3 className="prof-card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Lock className="w-5 h-5" /> Keamanan
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Ganti Password", icon: Lock, desc: "Terakhir diubah 3 bulan lalu" },
                  { label: "Verifikasi 2 Faktor", icon: Shield, desc: "Belum aktif - Direkomendasikan" },
                  { label: "Riwayat Login", icon: HelpCircle, desc: "Lihat aktivitas login terakhir" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} className="prof-setting-item" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div className="prof-setting-icon">
                        <Icon className="w-4 h-4" style={{ color: "#DC2626" }} />
                      </div>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4" color="rgba(255,255,255,0.2)" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="prof-danger">
              <button
                onClick={() => navigate("/")}
                style={{ background: "none", border: "none", color: "#DC2626", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
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