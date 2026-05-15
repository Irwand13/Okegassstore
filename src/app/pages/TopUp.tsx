import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Zap, ChevronRight, Shield, Clock, CreditCard, Wallet,
  Smartphone, CheckCircle, User, Hash, AlertCircle
} from "lucide-react";

const games = [
  { id: "ml", name: "Mobile Legends", emoji: "⚔️", color: "#1E88E5", currency: "Diamonds" },
  { id: "ff", name: "Free Fire", emoji: "🔥", color: "#FF6F00", currency: "Diamonds" },
  { id: "pubg", name: "PUBG Mobile", emoji: "🎯", color: "#3949AB", currency: "UC" },
  { id: "genshin", name: "Genshin Impact", emoji: "✨", color: "#7B2FFF", currency: "Genesis Crystals" },
  { id: "valorant", name: "Valorant", emoji: "💀", color: "#FF4655", currency: "VP" },
  { id: "hok", name: "Honor of Kings", emoji: "👑", color: "#D4AF37", currency: "Tokens" },
];

const denominations: Record<string, { id: string; amount: number; label: string; price: number; bonus?: number; popular?: boolean }[]> = {
  ml: [
    { id: "ml1", amount: 50, label: "50 Diamonds", price: 14000 },
    { id: "ml2", amount: 75, label: "75 Diamonds", price: 20000 },
    { id: "ml3", amount: 150, label: "150 Diamonds", price: 38000, bonus: 15 },
    { id: "ml4", amount: 250, label: "250 Diamonds", price: 60000, popular: true },
    { id: "ml5", amount: 500, label: "500 Diamonds", price: 115000, bonus: 50 },
    { id: "ml6", amount: 750, label: "750 Diamonds", price: 165000 },
    { id: "ml7", amount: 1000, label: "1000 Diamonds", price: 210000, bonus: 100, popular: true },
    { id: "ml8", amount: 2000, label: "2000 Diamonds", price: 405000, bonus: 200 },
    { id: "ml9", amount: 5000, label: "5000 Diamonds", price: 990000, bonus: 500 },
    { id: "ml10", amount: 10000, label: "10000 Diamonds", price: 1950000, bonus: 1000 },
    { id: "ml11", amount: 500, label: "Twilight Pass", price: 65000 },
    { id: "ml12", amount: 300, label: "Weekly Diamond Pass", price: 32000 },
  ],
  ff: [
    { id: "ff1", amount: 70, label: "70 Diamonds", price: 17000 },
    { id: "ff2", amount: 140, label: "140 Diamonds", price: 32000 },
    { id: "ff3", amount: 355, label: "355 Diamonds", price: 79000, popular: true },
    { id: "ff4", amount: 720, label: "720 Diamonds", price: 155000, bonus: 72 },
    { id: "ff5", amount: 1450, label: "1450 Diamonds", price: 300000, bonus: 145, popular: true },
    { id: "ff6", amount: 2900, label: "2900 Diamonds", price: 590000, bonus: 290 },
  ],
  pubg: [
    { id: "pubg1", amount: 60, label: "60 UC", price: 14000 },
    { id: "pubg2", amount: 180, label: "180 UC", price: 38000 },
    { id: "pubg3", amount: 325, label: "325 UC", price: 68000, popular: true },
    { id: "pubg4", amount: 660, label: "660 UC", price: 135000, bonus: 60 },
    { id: "pubg5", amount: 1800, label: "1800 UC", price: 365000, bonus: 180, popular: true },
    { id: "pubg6", amount: 3850, label: "3850 UC", price: 750000, bonus: 350 },
  ],
  genshin: [
    { id: "gen1", amount: 60, label: "60 Crystals", price: 15000 },
    { id: "gen2", amount: 300, label: "300 Crystals", price: 72000, bonus: 30 },
    { id: "gen3", amount: 980, label: "980 Crystals", price: 232000, bonus: 110, popular: true },
    { id: "gen4", amount: 1980, label: "1980 Crystals", price: 462000, bonus: 260 },
    { id: "gen5", amount: 3280, label: "3280 Crystals", price: 762000, bonus: 600, popular: true },
    { id: "gen6", amount: 6480, label: "6480 Crystals", price: 1502000, bonus: 1600 },
  ],
  valorant: [
    { id: "val1", amount: 475, label: "475 VP", price: 50000 },
    { id: "val2", amount: 1000, label: "1000 VP", price: 100000 },
    { id: "val3", amount: 2050, label: "2050 VP", price: 200000, popular: true },
    { id: "val4", amount: 3650, label: "3650 VP", price: 350000, bonus: 100 },
    { id: "val5", amount: 5350, label: "5350 VP", price: 500000, bonus: 250, popular: true },
    { id: "val6", amount: 11000, label: "11000 VP", price: 1000000, bonus: 1000 },
  ],
  hok: [
    { id: "hok1", amount: 70, label: "70 Tokens", price: 15000 },
    { id: "hok2", amount: 180, label: "180 Tokens", price: 38000 },
    { id: "hok3", amount: 360, label: "360 Tokens", price: 75000, popular: true },
    { id: "hok4", amount: 750, label: "750 Tokens", price: 150000 },
    { id: "hok5", amount: 1500, label: "1500 Tokens", price: 290000, bonus: 100, popular: true },
    { id: "hok6", amount: 3000, label: "3000 Tokens", price: 570000, bonus: 300 },
  ],
};

const paymentMethods = [
  { id: "gopay", name: "GoPay", icon: "💚", category: "E-Wallet" },
  { id: "ovo", name: "OVO", icon: "💜", category: "E-Wallet" },
  { id: "dana", name: "DANA", icon: "💙", category: "E-Wallet" },
  { id: "shopeepay", name: "ShopeePay", icon: "🧡", category: "E-Wallet" },
  { id: "bca", name: "BCA Virtual Account", icon: "🏦", category: "Bank Transfer" },
  { id: "bni", name: "BNI Virtual Account", icon: "🏦", category: "Bank Transfer" },
  { id: "mandiri", name: "Mandiri Virtual Account", icon: "🏦", category: "Bank Transfer" },
  { id: "qris", name: "QRIS", icon: "📱", category: "QR Code" },
  { id: "alfamart", name: "Alfamart", icon: "🏪", category: "Minimarket" },
  { id: "indomaret", name: "Indomaret", icon: "🏪", category: "Minimarket" },
];

const formatRupiah = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

export default function TopUp() {
  const [searchParams] = useSearchParams();
  const defaultGame = searchParams.get("game") || "ml";

  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [selectedDenom, setSelectedDenom] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isLoading, setIsLoading] = useState(false);

  const currentGame = games.find((g) => g.id === selectedGame)!;
  const currentDenoms = denominations[selectedGame] || [];
  const selectedDenomData = currentDenoms.find((d) => d.id === selectedDenom);

  const paymentCategories = [...new Set(paymentMethods.map((p) => p.category))];

  const handleProceed = () => {
    if (!userId || !selectedDenom || !selectedPayment) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 2000);
  };

  const handleReset = () => {
    setStep("form");
    setSelectedDenom(null);
    setSelectedPayment(null);
    setUserId("");
    setServerId("");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold text-gray-900 mb-3">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-600 mb-2">
            {selectedDenomData?.label} untuk {currentGame.name}
          </p>
          <p className="text-gray-500 text-sm mb-2">
            ID: <span className="font-bold text-gray-800">{userId}{serverId ? `(${serverId})` : ""}</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Diamond akan masuk dalam <strong>{"< 1 menit"}</strong>. Cek inbox game kamu!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Top Up Lagi
            </button>
            <button
              onClick={() => window.location.href = "/profile"}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-red-400 hover:text-red-600 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Lihat Riwayat
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    const payment = paymentMethods.find((p) => p.id === selectedPayment);
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900 mb-6">
              Konfirmasi Pesanan
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Game</span>
                <span className="font-semibold text-gray-900">{currentGame.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">User ID</span>
                <span className="font-semibold text-gray-900">{userId}{serverId ? ` (${serverId})` : ""}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Item</span>
                <span className="font-semibold text-gray-900">{selectedDenomData?.label}</span>
              </div>
              {selectedDenomData?.bonus && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bonus</span>
                  <span className="font-semibold text-green-600">+{selectedDenomData.bonus} {currentGame.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Metode Bayar</span>
                <span className="font-semibold text-gray-900">{payment?.icon} {payment?.name}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-[#DC2626]">
                  {formatRupiah(selectedDenomData?.price || 0)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                Pastikan User ID sudah benar. Kesalahan ID tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kembali
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-70"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isLoading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-7 h-7" />
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold">
              Top Up Game
            </h1>
          </div>
          <p className="text-white/80">Proses instan, harga terbaik, 100% aman</p>

          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4" /> Proses {"< 1 menit"}
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <Shield className="w-4 h-4" /> 100% Aman
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <CreditCard className="w-4 h-4" /> 10+ Metode Bayar
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Game + Denom + Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Game */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Pilih Game
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => { setSelectedGame(game.id); setSelectedDenom(null); }}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedGame === game.id
                        ? "border-[#DC2626] bg-red-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-2xl">{game.emoji}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{game.name}</div>
                      <div className="text-xs text-gray-500">{game.currency}</div>
                    </div>
                    {selectedGame === game.id && (
                      <CheckCircle className="w-4 h-4 text-[#DC2626] ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Enter User ID */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Masukkan User ID
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" /> User ID *
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={`Contoh: 123456789`}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all"
                  />
                </div>
                {(selectedGame === "ml" || selectedGame === "hok") && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-1" /> Server ID
                    </label>
                    <input
                      type="text"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      placeholder="Contoh: 1234"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Pastikan User ID benar sebelum melanjutkan
              </p>
            </div>

            {/* Step 3: Select Denomination */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Pilih Nominal
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentDenoms.map((denom) => (
                  <button
                    key={denom.id}
                    onClick={() => setSelectedDenom(denom.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                      selectedDenom === denom.id
                        ? "border-[#DC2626] bg-red-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {denom.popular && (
                      <span className="absolute -top-2 left-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white text-xs px-2 py-0.5 rounded-full">
                        Populer
                      </span>
                    )}
                    <div className="text-sm font-bold text-gray-900">{denom.label}</div>
                    {denom.bonus && (
                      <div className="text-xs text-green-600 font-semibold">+{denom.bonus} Bonus</div>
                    )}
                    <div style={{ fontFamily: "var(--font-display)" }} className="text-lg font-bold text-[#DC2626] mt-1">
                      {formatRupiah(denom.price)}
                    </div>
                    {selectedDenom === denom.id && (
                      <CheckCircle className="w-4 h-4 text-[#DC2626] absolute top-3 right-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Metode Pembayaran
              </h2>
              <div className="space-y-4">
                {paymentCategories.map((cat) => (
                  <div key={cat}>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      {cat === "E-Wallet" && <Wallet className="w-3.5 h-3.5" />}
                      {cat === "Bank Transfer" && <CreditCard className="w-3.5 h-3.5" />}
                      {cat === "QR Code" && <Smartphone className="w-3.5 h-3.5" />}
                      {cat}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {paymentMethods.filter((p) => p.category === cat).map((pm) => (
                        <button
                          key={pm.id}
                          onClick={() => setSelectedPayment(pm.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                            selectedPayment === pm.id
                              ? "border-[#DC2626] bg-red-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <span className="text-xl">{pm.icon}</span>
                          <span className="text-sm font-semibold text-gray-800">{pm.name}</span>
                          {selectedPayment === pm.id && (
                            <CheckCircle className="w-4 h-4 text-[#DC2626] ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6">
              <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-gray-900 mb-6">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Game</span>
                  <span className="font-semibold text-gray-900">
                    {currentGame.emoji} {currentGame.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">User ID</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[140px]">
                    {userId || <span className="text-gray-400">Belum diisi</span>}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Item</span>
                  <span className="font-semibold text-gray-900">
                    {selectedDenomData?.label || <span className="text-gray-400">Belum dipilih</span>}
                  </span>
                </div>
                {selectedDenomData?.bonus && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bonus</span>
                    <span className="font-semibold text-green-600">+{selectedDenomData.bonus}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pembayaran</span>
                  <span className="font-semibold text-gray-900">
                    {paymentMethods.find((p) => p.id === selectedPayment)?.name || (
                      <span className="text-gray-400">Belum dipilih</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-[#DC2626]">
                    {selectedDenomData ? formatRupiah(selectedDenomData.price) : "Rp 0"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={!userId || !selectedDenom || !selectedPayment}
                className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Lanjut ke Pembayaran
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  Transaksi dienkripsi SSL
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Proses otomatis 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
