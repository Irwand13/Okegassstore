import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  User, Star, Shield, Package, Tag, Settings, LogOut,
  ChevronRight, TrendingUp, Wallet, Clock, CheckCircle,
  AlertCircle, Edit3, Bell, Lock, HelpCircle, Camera,
  Trophy, Zap, Copy, ExternalLink, Loader2, X, Trash2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyListings, getMyOrders, updateProfile, changePassword, supabase } from "../../lib/supabase";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

.prof-root { min-height: 100vh; background: #0d0d0f; font-family: 'Barlow', sans-serif; }

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

.prof-avatar {
  width: 80px; height: 80px; border-radius: 20px;
  background: linear-gradient(135deg, #DC2626, #EA580C);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700;
  color: #fff; box-shadow: 0 8px 24px rgba(220,38,38,0.3);
  position: relative; overflow: hidden; flex-shrink: 0;
}
.prof-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
.prof-avatar-cam {
  position: absolute; bottom: -4px; right: -4px;
  width: 28px; height: 28px; background: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer; transition: all 0.2s;
}
.prof-avatar-cam:hover { background: #f0f0f0; transform: scale(1.05); }
.prof-badge-verified {
  position: absolute; top: -4px; right: -4px;
  width: 24px; height: 24px; background: #3B82F6;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(59,130,246,0.3);
}

.prof-tabs {
  display: flex; gap: 4px; background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
  padding: 4px; width: fit-content; margin-bottom: 24px; flex-wrap: wrap;
}
.prof-tab {
  display: flex; align-items: center; gap: 8px; padding: 10px 18px;
  border-radius: 8px; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.4);
  background: transparent; border: none; font-family: 'Barlow', sans-serif;
}
.prof-tab.active { background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
.prof-tab:hover:not(.active) { color: rgba(255,255,255,0.7); }

.prof-filter-btn {
  padding: 10px 16px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; font-family: 'Barlow', sans-serif;
}
.prof-filter-btn.active { background: linear-gradient(135deg, #DC2626, #EA580C); border-color: #DC2626; color: #fff; }
.prof-filter-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); }

.prof-tx-item {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.2s; cursor: pointer;
}
.prof-tx-item:last-child { border-bottom: none; }
.prof-tx-item:hover { background: rgba(255,255,255,0.02); }
.prof-tx-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.prof-card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; margin-bottom: 20px;
}
.prof-card-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.prof-card-title { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }

.prof-input {
  width: 100%; padding: 12px 14px; box-sizing: border-box;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 13px; outline: none; transition: all 0.2s;
}
.prof-input::placeholder { color: rgba(255,255,255,0.15); }
.prof-input:focus { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.04); }

.prof-label {
  display: block; font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.35); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.06em;
}

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

.prof-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; padding: 5px 10px; border-radius: 6px; font-weight: 700; white-space: nowrap;
}
.prof-badge-success { background: rgba(16,185,129,0.15); color: #10B981; }
.prof-badge-amber { background: rgba(245,158,11,0.15); color: #F59E0B; }
.prof-badge-blue { background: rgba(59,130,246,0.15); color: #3B82F6; }
.prof-badge-red { background: rgba(220,38,38,0.15); color: #DC2626; }

.prof-btn {
  padding: 11px 18px; border-radius: 10px; border: none;
  font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.25s; display: inline-flex;
  align-items: center; justify-content: center; gap: 6px;
}
.prof-btn-primary { background: linear-gradient(135deg, #DC2626, #EA580C); color: #fff; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
.prof-btn-primary:hover { box-shadow: 0 8px 20px rgba(220,38,38,0.5); }
.prof-btn-secondary { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1) !important; color: rgba(255,255,255,0.6); }
.prof-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #fff; }

.prof-listing {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 16px; margin-bottom: 16px; transition: all 0.2s;
}
.prof-listing:hover { border-color: rgba(255,255,255,0.15); }

.prof-setting-item {
  padding: 16px; border-radius: 10px; cursor: pointer; transition: all 0.2s;
  border: none; background: transparent; width: 100%; text-align: left;
  display: flex; align-items: center; gap: 12px;
}
.prof-setting-item:hover { background: rgba(255,255,255,0.04); }
.prof-setting-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.prof-danger {
  background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2);
  border-radius: 14px; padding: 16px;
}

.prof-skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.prof-animate { animation: fadeIn 0.3s ease; }
@keyframes spin { to { transform: rotate(360deg); } }
`;

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) +
    " · " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
};

const getStatusBadge = (status: string) => {
  const map: Record<string, { cls: string; label: string; icon?: React.ReactNode }> = {
    success:         { cls: "prof-badge-success", label: "Berhasil",    icon: <CheckCircle className="w-3 h-3" /> },
    completed:       { cls: "prof-badge-success", label: "Selesai",     icon: <CheckCircle className="w-3 h-3" /> },
    delivered:       { cls: "prof-badge-success", label: "Terkirim",    icon: <CheckCircle className="w-3 h-3" /> },
    paid:            { cls: "prof-badge-blue",    label: "Dibayar",     icon: <Shield className="w-3 h-3" /> },
    processing:      { cls: "prof-badge-blue",    label: "Diproses",    icon: <Clock className="w-3 h-3" /> },
    waiting_payment: { cls: "prof-badge-amber",   label: "Menunggu",    icon: <Clock className="w-3 h-3" /> },
    pending:         { cls: "prof-badge-amber",   label: "Menunggu",    icon: <Clock className="w-3 h-3" /> },
    escrow:          { cls: "prof-badge-amber",   label: "Escrow",      icon: <Shield className="w-3 h-3" /> },
    active:          { cls: "prof-badge-success", label: "Aktif" },
    disputed:        { cls: "prof-badge-red",     label: "Dispute",     icon: <AlertCircle className="w-3 h-3" /> },
    cancelled:       { cls: "prof-badge-red",     label: "Dibatalkan" },
    refunded:        { cls: "prof-badge-red",     label: "Refund" },
    draft:           { cls: "prof-badge-amber",   label: "Draft" },
    sold:            { cls: "prof-badge-blue",    label: "Terjual" },
  };
  const s = map[status] || { cls: "", label: status };
  return <span className={`prof-badge ${s.cls}`}>{s.icon}{s.label}</span>;
};

type Tab = "transactions" | "listings" | "settings";

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, session, logout } = useAuth();

  const [activeTab, setActiveTab]   = useState<Tab>("transactions");
  const [txFilter, setTxFilter]     = useState("Semua");
  const [copied, setCopied]         = useState(false);
  const [editMode, setEditMode]     = useState(false);
  const [saving, setSaving]         = useState(false);
  const [saveMsg, setSaveMsg]       = useState("");

  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ new: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting]         = useState(false);

  // Logout Modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Form state
  const [formName,  setFormName]  = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBio,   setFormBio]   = useState("");

  // Notification toggles (local UI only — bisa disambungkan ke DB)
  const [notifTopup, setNotifTopup]   = useState(true);
  const [notifSell,  setNotifSell]    = useState(true);
  const [notifPromo, setNotifPromo]   = useState(false);

  // Data from Supabase
  const [orders,   setOrders]   = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loadingOrders,   setLoadingOrders]   = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);

  // Isi form dari profile
  useEffect(() => {
    if (profile) {
      setFormName(profile.full_name  || "");
      setFormPhone(profile.phone     || "");
      setFormBio(profile.bio         || "");
    }
  }, [profile]);

  // Fetch orders
  useEffect(() => {
    if (!session?.user?.id) return;
    setLoadingOrders(true);
    getMyOrders(session.user.id, "buyer").then(({ data }) => {
      setOrders(data || []);
      setLoadingOrders(false);
    });
  }, [session?.user?.id]);

  // Fetch listings
  useEffect(() => {
    if (!session?.user?.id) return;
    setLoadingListings(true);
    getMyListings(session.user.id).then(({ data }) => {
      setListings(data || []);
      setLoadingListings(false);
    });
  }, [session?.user?.id]);

  // Redirect kalau belum login
  useEffect(() => {
    if (!session && !user) navigate("/");
  }, [session, user]);

  const handleCopyId = () => {
    const uid = session?.user?.id?.slice(0, 8).toUpperCase() || "UNKNOWN";
    navigator.clipboard.writeText(`OKG-${uid}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = async () => {
    if (!session?.user?.id) return;
    setSaving(true);
    const { error } = await updateProfile(session.user.id, {
      full_name: formName,
      phone:     formPhone,
      bio:       formBio,
    });
    setSaving(false);
    if (!error) {
      setSaveMsg("✅ Profil berhasil disimpan");
      setEditMode(false);
      setTimeout(() => setSaveMsg(""), 3000);
    } else {
      setSaveMsg("❌ Gagal menyimpan: " + error.message);
    }
  };

  const handleDeleteListing = async () => {
  if (!deleteTarget) return;
  setDeleting(true);

  const { error } = await supabase
    .from("listings")
    .update({ status: "deleted" })
    .eq("id", deleteTarget.id)
    .eq("seller_id", session?.user?.id); // pastikan hanya bisa hapus milik sendiri

  setDeleting(false);

  if (!error) {
    setListings(prev => prev.filter(l => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    setLogoutLoading(false);
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleChangePassword = async () => {
    // Validation
    if (!passwordForm.new || !passwordForm.confirm) {
      setPasswordMsg("❌ Password baru dan konfirmasi harus diisi");
      return;
    }

    if (passwordForm.new.length < 6) {
      setPasswordMsg("❌ Password baru minimal 6 karakter");
      return;
    }

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMsg("❌ Password baru tidak cocok");
      return;
    }

    setPasswordLoading(true);
    setPasswordMsg("");

    // Update password langsung (Supabase handle verifikasi di server)
    const { error } = await changePassword(passwordForm.new);

    setPasswordLoading(false);

    if (!error) {
      setPasswordMsg("✅ Password berhasil diubah!");
      // Close modal immediately dengan delay minimal untuk user feedback
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordForm({ new: "", confirm: "" });
        setPasswordMsg("");
      }, 500);
    } else {
      setPasswordMsg("❌ " + ((error as any)?.message || "Gagal mengubah password"));
    }
  };

  // Derived stats
  const txFilters   = ["Semua", "Beli", "Jual"];
  const filteredTx  = orders.filter((o) => {
    if (txFilter === "Beli") return o.buyer_id === session?.user?.id;
    if (txFilter === "Jual") return o.seller_id === session?.user?.id;
    return true;
  });

  const totalSpent  = orders.filter((o) => o.buyer_id  === session?.user?.id && ["completed","delivered"].includes(o.status)).reduce((a: number, b: any) => a + b.price, 0);
  const totalEarned = orders.filter((o) => o.seller_id === session?.user?.id && ["completed","delivered"].includes(o.status)).reduce((a: number, b: any) => a + b.seller_amount, 0);
  const activeCount = orders.filter((o) => ["paid","processing","waiting_payment","delivered"].includes(o.status)).length;

  const displayName  = profile?.full_name || profile?.username || user?.name || "User";
  const displayEmail = session?.user?.email || user?.email || "";
  const displayAvatar = displayName.charAt(0).toUpperCase();
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" }) : "";

  if (!user && !session) return null;

  return (
    <div className="prof-root">
      <style>{STYLES}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="prof-hero">
        <div className="prof-hero-bg" />
        <div className="prof-hero-grid" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Profile Header */}
            <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Avatar */}
              <div className="prof-avatar" style={{ position: "relative" }}>
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt={displayName} />
                  : displayAvatar
                }
                <div className="prof-avatar-cam"><Camera className="w-4 h-4" color="#666" /></div>
                {profile?.is_verified_seller && (
                  <div className="prof-badge-verified"><CheckCircle className="w-4 h-4" color="#fff" /></div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", margin: 0 }}>
                    {displayName}
                  </h1>
                  {profile?.is_verified_seller && (
                    <span style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B", fontSize: 11, padding: "4px 10px", borderRadius: 6, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <Trophy className="w-3 h-3" /> Verified Seller
                    </span>
                  )}
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 12px" }}>
                  {displayEmail}{joinDate ? ` · Bergabung ${joinDate}` : ""}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
                  {profile?.rating_sum && profile?.total_reviews && profile.total_reviews > 0 && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#F59E0B" }}>
                        <Star className="w-4 h-4" fill="#F59E0B" />
                        <span style={{ fontWeight: 700 }}>
                          {(profile.rating_sum / profile.total_reviews).toFixed(1)}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>({profile.total_reviews} ulasan)</span>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                    </>
                  )}
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong style={{ color: "#fff" }}>{profile?.total_sales ?? 0}</strong> Penjualan
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    <strong style={{ color: "#fff" }}>{orders.length}</strong> Pembelian
                  </span>
                  {profile?.username && (
                    <>
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>@{profile.username}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Balance */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 16, textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8, justifyContent: "flex-end" }}>
                  <Wallet className="w-3.5 h-3.5" /> Saldo OkeGass
                </div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 24, fontWeight: 700, color: "#10B981", marginBottom: 8 }}>
                  {formatRupiah(profile?.balance ?? 0)}
                </div>
              <button style={{ background: "none", border: "none", color: "#EA580C", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                onClick={() => navigate("/wallet")} >
                + Top Up Saldo
              </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {[
                { label: "Total Pengeluaran", value: loadingOrders ? "..." : formatRupiah(totalSpent), icon: TrendingUp, color: "#3B82F6" },
                { label: "Total Pendapatan",  value: loadingOrders ? "..." : formatRupiah(totalEarned), icon: Wallet,     color: "#10B981" },
                { label: "Transaksi Aktif",   value: loadingOrders ? "..." : `${activeCount} Transaksi`, icon: Clock,      color: "#F59E0B" },
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

      {/* ── Content ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Tabs */}
        <div className="prof-tabs">
          {([
            { id: "transactions", label: "Transaksi",    icon: Package },
            { id: "listings",     label: "Listing Saya", icon: Tag },
            { id: "settings",     label: "Pengaturan",   icon: Settings },
          ] as { id: Tab; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`prof-tab ${activeTab === id ? "active" : ""}`}>
              <Icon className="w-4 h-4" /> {label}
              {id === "transactions" && orders.length > 0 && (
                <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "1px 7px", fontSize: 11 }}>
                  {orders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TRANSACTIONS TAB ─────────────────────────────── */}
        {activeTab === "transactions" && (
          <div className="prof-animate">
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {txFilters.map((f) => (
                <button key={f} onClick={() => setTxFilter(f)} className={`prof-filter-btn ${txFilter === f ? "active" : ""}`}>{f}</button>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
              {loadingOrders ? (
                <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
                  <Loader2 className="w-8 h-8" style={{ color: "#DC2626", animation: "spin 0.7s linear infinite" }} />
                </div>
              ) : filteredTx.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <Package className="w-12 h-12" style={{ color: "rgba(255,255,255,0.1)", margin: "0 auto 12px", display: "block" }} />
                  <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>Belum ada transaksi</p>
                </div>
              ) : (
                filteredTx.map((order: any) => {
                  const isBuyer  = order.buyer_id === session?.user?.id;
                  const gameInfo = order.listings?.game_categories;
                  const title    = order.listings?.title || "Akun Game";
                  return (
                    <div key={order.id} className="prof-tx-item">
                      <div className="prof-tx-icon">
                        {isBuyer
                          ? <Package className="w-4 h-4" style={{ color: "#A78BFA" }} />
                          : <Tag     className="w-4 h-4" style={{ color: "#10B981" }} />
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {isBuyer ? "Beli" : "Jual"} · {gameInfo?.name || "Game"} {gameInfo?.icon || ""}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {title} · {formatDate(order.created_at)}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 700, color: isBuyer ? "#fff" : "#10B981" }}>
                          {isBuyer ? "-" : "+"}{formatRupiah(isBuyer ? order.price : order.seller_amount)}
                        </div>
                        <div style={{ marginTop: 4, display: "flex", justifyContent: "flex-end" }}>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── LISTINGS TAB ─────────────────────────────────── */}
        {activeTab === "listings" && (
          <div className="prof-animate">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                {listings.length} listing
              </p>
              <button onClick={() => navigate("/marketplace/sell")} className="prof-btn prof-btn-primary">
                <Zap className="w-4 h-4" /> + Jual Akun Baru
              </button>
            </div>

            {loadingListings ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                <Loader2 className="w-8 h-8" style={{ color: "#DC2626", animation: "spin 0.7s linear infinite" }} />
              </div>
            ) : listings.length === 0 ? (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, textAlign: "center", padding: "60px 20px" }}>
                <Tag className="w-12 h-12" style={{ color: "rgba(255,255,255,0.1)", margin: "0 auto 12px", display: "block" }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: 8 }}>Belum ada listing</p>
                <button onClick={() => navigate("/marketplace/sell")} style={{ background: "none", border: "none", color: "#DC2626", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Mulai jual akun →
                </button>
              </div>
            ) : (
              listings.map((listing: any) => (
                <div key={listing.id} className="prof-listing">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, marginBottom: 4 }}>
                        {listing.game_categories?.name || "Game"} {listing.game_categories?.icon || ""}
                        {listing.account_rank ? ` · ${listing.account_rank}` : ""}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                        {listing.title}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                        {formatDate(listing.created_at)} · {listing.view_count} views
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {getStatusBadge(listing.status)}
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 16, fontWeight: 700, color: "#DC2626", marginTop: 6 }}>
                        {formatRupiah(listing.price)}
                      </div>
                    </div>
                  </div>

                  {listing.status === "draft" && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: 10, marginBottom: 12 }}>
                      <AlertCircle className="w-4 h-4" style={{ color: "#3B82F6", flexShrink: 0, marginTop: 1 }} />
                      <p style={{ fontSize: 11, color: "rgba(59,130,246,0.8)", margin: 0 }}>Listing masih draft, belum tampil di marketplace</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="prof-btn prof-btn-secondary">
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      className="prof-btn prof-btn-secondary"
                      onClick={() => navigate(`/marketplace/${listing.id}`)}
                    >
                      <ExternalLink size={13} /> Lihat
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ id: listing.id, title: listing.title })}
                      style={{
                        padding: "11px 14px", borderRadius: 10,
                        background: "rgba(220,38,38,0.07)",
                        border: "1px solid rgba(220,38,38,0.2)",
                        color: "#DC2626", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── SETTINGS TAB ─────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="prof-animate" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Feedback message */}
            {saveMsg && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: saveMsg.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(220,38,38,0.1)", border: `1px solid ${saveMsg.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(220,38,38,0.3)"}`, color: saveMsg.startsWith("✅") ? "#10B981" : "#DC2626", fontSize: 13, fontWeight: 600 }}>
                {saveMsg}
              </div>
            )}

            {/* Profile Info */}
            <div className="prof-card">
              <div className="prof-card-header">
                <h3 className="prof-card-title">Informasi Profil</h3>
                <button
                  onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                  className={`prof-btn ${editMode ? "prof-btn-primary" : "prof-btn-secondary"}`}
                  disabled={saving}
                >
                  {saving
                    ? <><Loader2 className="w-3.5 h-3.5" style={{ animation: "spin 0.7s linear infinite" }} /> Menyimpan...</>
                    : <><Edit3 className="w-3.5 h-3.5" /> {editMode ? "Simpan" : "Edit"}</>
                  }
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Full Name */}
                <div>
                  <label className="prof-label">Nama Lengkap</label>
                  {editMode
                    ? <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="prof-input" placeholder="Nama lengkap kamu" />
                    : <InfoRow value={formName || displayName} icon={<User className="w-4 h-4" color="rgba(255,255,255,0.2)" />} />
                  }
                </div>

                {/* Username */}
                <div>
                  <label className="prof-label">Username</label>
                  <InfoRow value={profile?.username ? `@${profile.username}` : "-"} />
                </div>

                {/* Email */}
                <div>
                  <label className="prof-label">Email</label>
                  <InfoRow
                    value={displayEmail}
                    suffix={
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle className="w-4 h-4" color="#10B981" />
                        <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>Terverifikasi</span>
                      </div>
                    }
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="prof-label">Nomor WhatsApp</label>
                  {editMode
                    ? <input type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="prof-input" placeholder="08xxxxxxxxxx" />
                    : <InfoRow value={formPhone || "Belum diisi"} />
                  }
                </div>

                {/* Bio */}
                <div>
                  <label className="prof-label">Bio</label>
                  {editMode
                    ? <textarea value={formBio} onChange={(e) => setFormBio(e.target.value)} className="prof-input" rows={3} placeholder="Ceritakan sedikit tentang kamu..." style={{ resize: "vertical" }} />
                    : <InfoRow value={formBio || "Belum ada bio"} />
                  }
                </div>

                {/* Referral ID */}
                <div>
                  <label className="prof-label">ID Pengguna</label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>
                      OKG-{session?.user?.id?.slice(0, 8).toUpperCase()}
                    </span>
                    <button onClick={handleCopyId} style={{ background: "none", border: "none", color: "#DC2626", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? "Disalin!" : "Salin"}
                    </button>
                  </div>
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
                  { label: "Notifikasi Top Up",         desc: "Status top up dan konfirmasi pembayaran",     value: notifTopup, set: setNotifTopup },
                  { label: "Notifikasi Transaksi Akun", desc: "Update status listing dan pembelian akun",    value: notifSell,  set: setNotifSell },
                  { label: "Promo & Penawaran",         desc: "Diskon, cashback, dan event spesial",         value: notifPromo, set: setNotifPromo },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.desc}</div>
                    </div>
                    <button onClick={() => item.set(!item.value)} className={`prof-toggle ${item.value ? "on" : ""}`}>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Ganti Password",    icon: Lock,       desc: "Ubah password akun kamu", action: () => setShowPasswordModal(true) },
                  { label: "Verifikasi 2FA",    icon: Shield,     desc: "Aktifkan untuk keamanan ekstra" },
                  { label: "Riwayat Login",     icon: HelpCircle, desc: "Lihat aktivitas login terakhir" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} onClick={item.action} className="prof-setting-item" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div className="prof-setting-icon"><Icon className="w-4 h-4" style={{ color: "#DC2626" }} /></div>
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

            {/* Logout */}
            <div className="prof-danger">
              <button onClick={() => setShowLogoutModal(true)} style={{ background: "none", border: "none", color: "#DC2626", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <LogOut className="w-4 h-4" /> Keluar dari Akun
              </button>
            </div>

          </div>
        )}
      </div>

      {/* ── PASSWORD MODAL ──────────────────────────────── */} 
      {showPasswordModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#0d0d0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }} className="prof-animate">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Ganti Password</h2>
              <button onClick={() => { setShowPasswordModal(false); setPasswordMsg(""); setPasswordForm({ new: "", confirm: "" }); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 8, display: "flex", alignItems: "center" }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message */}
            {passwordMsg && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: passwordMsg.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(220,38,38,0.1)", border: `1px solid ${passwordMsg.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(220,38,38,0.3)"}`, color: passwordMsg.startsWith("✅") ? "#10B981" : "#DC2626", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                {passwordMsg}
              </div>
            )}

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              {/* New Password */}
              <div>
                <label className="prof-label">Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  className="prof-input"
                  placeholder="Masukkan password baru (min. 6 karakter)"
                  disabled={passwordLoading}
                  autoFocus
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="prof-label">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="prof-input"
                  placeholder="Ulangi password baru"
                  disabled={passwordLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !passwordLoading) {
                      handleChangePassword();
                    }
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 11, color: "rgba(59,130,246,0.8)", display: "flex", gap: 8 }}>
                  <AlertCircle className="w-4 h-4" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>Password minimal 6 karakter. Gunakan kombinasi huruf besar, kecil, angka, dan simbol untuk keamanan lebih baik.</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { setShowPasswordModal(false); setPasswordMsg(""); setPasswordForm({ new: "", confirm: "" }); }} className="prof-btn prof-btn-secondary" style={{ flex: 1 }} disabled={passwordLoading}>
                Batal
              </button>
              <button onClick={handleChangePassword} className="prof-btn prof-btn-primary" style={{ flex: 1 }} disabled={passwordLoading}>
                {passwordLoading
                  ? <><Loader2 className="w-3.5 h-3.5" style={{ animation: "spin 0.7s linear infinite" }} /> Menyimpan...</>
                  : "Ganti Password"
                }
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Hapus Listing */}
    {deleteTarget && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  }}>
    <div style={{
      width: "100%", maxWidth: 400,
      background: "#111115", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, overflow: "hidden",
    }}>
      <div style={{ height: 3, background: "linear-gradient(90deg,#DC2626,#EA580C)" }} />
      <div style={{ padding: "24px 24px 20px" }}>
        <div style={{ width: 52, height: 52, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Trash2 size={22} color="#DC2626" />
        </div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Hapus Listing?
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 6px", lineHeight: 1.6 }}>
          Listing <strong style={{ color: "rgba(255,255,255,0.8)" }}>"{deleteTarget.title}"</strong> akan dihapus dari marketplace.
        </p>
        <p style={{ fontSize: 12, color: "rgba(220,38,38,0.7)", margin: "0 0 24px" }}>
          ⚠️ Tindakan ini tidak bisa dibatalkan.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
            style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Batal
          </button>
          <button
            onClick={handleDeleteListing}
            disabled={deleting}
            style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#DC2626,#b91c1c)", color: "#fff", fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: deleting ? 0.6 : 1 }}
          >
            {deleting
              ? <><Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} /> Menghapus...</>
              : <><Trash2 size={13} /> Ya, Hapus</>
            }
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* ── LOGOUT MODAL ─────────────────────────────── */}
      {showLogoutModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#0d0d0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }} className="prof-animate">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Keluar dari Akun</h2>
              <button onClick={() => setShowLogoutModal(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 8, display: "flex", alignItems: "center" }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 16 }}>
                Apakah Anda yakin ingin keluar dari akun? Anda akan perlu login kembali untuk mengakses profil dan transaksi.
              </div>
              <div style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 12, color: "rgba(220,38,38,0.8)", display: "flex", gap: 8 }}>
                  <AlertCircle className="w-4 h-4" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>Pastikan tidak ada transaksi penting yang sedang berlangsung.</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowLogoutModal(false)} className="prof-btn prof-btn-secondary" style={{ flex: 1 }} disabled={logoutLoading}>
                Batal
              </button>
              <button onClick={handleLogout} className="prof-btn prof-btn-primary" style={{ flex: 1, background: "linear-gradient(135deg, #DC2626, #EA580C)" }} disabled={logoutLoading}>
                {logoutLoading
                  ? <><Loader2 className="w-3.5 h-3.5" style={{ animation: "spin 0.7s linear infinite" }} /> Keluar...</>
                  : <>Keluar dari Akun</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helper component ─────────────────────────────────────────────
function InfoRow({ value, icon, suffix }: { value: string; icon?: React.ReactNode; suffix?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
      <span style={{ color: value ? "#fff" : "rgba(255,255,255,0.25)", fontWeight: 600, fontSize: 13 }}>{value}</span>
      {suffix || icon}
    </div>
  );
}