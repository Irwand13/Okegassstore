import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Tag, ChevronRight, ChevronLeft, CheckCircle, Upload,
  Shield, AlertCircle, Info, Camera, Gamepad2, DollarSign,
  FileText, Star
} from "lucide-react";

const games = [
  { id: "ml", name: "Mobile Legends", emoji: "⚔️", color: "#1E88E5" },
  { id: "ff", name: "Free Fire", emoji: "🔥", color: "#FF6F00" },
  { id: "pubg", name: "PUBG Mobile", emoji: "🎯", color: "#3949AB" },
  { id: "genshin", name: "Genshin Impact", emoji: "✨", color: "#7B2FFF" },
  { id: "valorant", name: "Valorant", emoji: "💀", color: "#FF4655" },
  { id: "hok", name: "Honor of Kings", emoji: "👑", color: "#D4AF37" },
  { id: "cod", name: "Call of Duty Mobile", emoji: "💥", color: "#2E7D32" },
  { id: "other", name: "Lainnya", emoji: "🎮", color: "#78909C" },
];

const ranksByGame: Record<string, string[]> = {
  ml: ["Warrior", "Elite", "Master", "Grandmaster", "Epic", "Legend", "Mythic", "Mythic Honor", "Mythic Glory"],
  ff: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Heroic", "Grandmaster"],
  pubg: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown", "Ace", "Conqueror"],
  genshin: ["AR 1-29", "AR 30-39", "AR 40-44", "AR 45-49", "AR 50-54", "AR 55+", "AR 60"],
  valorant: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"],
  hok: ["Warrior", "Sentinel", "Militia", "Veteran", "Elite", "Master", "Grandmaster", "Supreme Legend"],
  cod: ["Rookie", "Veteran", "Pro", "Master", "Legendary"],
  other: ["Rendah", "Sedang", "Tinggi", "Sangat Tinggi"],
};

const steps = [
  { id: 1, label: "Info Game", icon: Gamepad2 },
  { id: 2, label: "Detail Akun", icon: FileText },
  { id: 3, label: "Foto & Harga", icon: Camera },
  { id: 4, label: "Review", icon: Star },
];

interface FormData {
  game: string;
  rank: string;
  title: string;
  description: string;
  heroes: string;
  skins: string;
  battlePass: string;
  email: string;
  price: string;
  negotiable: boolean;
  photos: string[];
  whatsapp: string;
  agreeTerms: boolean;
}

export default function SellAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    game: "",
    rank: "",
    title: "",
    description: "",
    heroes: "",
    skins: "",
    battlePass: "",
    email: "",
    price: "",
    negotiable: false,
    photos: [],
    whatsapp: "",
    agreeTerms: false,
  });

  const update = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedGame = games.find((g) => g.id === form.game);
  const ranks = form.game ? ranksByGame[form.game] || [] : [];

  const canProceed = () => {
    if (step === 1) return !!form.game && !!form.rank;
    if (step === 2) return !!form.title && !!form.description && form.title.length >= 10;
    if (step === 3) return !!form.price && !!form.whatsapp;
    if (step === 4) return form.agreeTerms;
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handlePhotoAdd = () => {
    const mockPhotos = [
      "📸 Screenshot Rank",
      "📸 Screenshot Koleksi Hero",
      "📸 Screenshot Skin",
    ];
    update("photos", mockPhotos.slice(0, form.photos.length + 1));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold text-gray-900 mb-3">
            Listing Berhasil Dikirim!
          </h1>
          <p className="text-gray-600 mb-2">
            Akun <strong>{selectedGame?.name}</strong> ({form.rank}) kamu sedang dalam proses verifikasi.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Tim kami akan meninjau dalam <strong>1x24 jam</strong>. Notifikasi akan dikirim via WhatsApp.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-blue-900 text-sm mb-1">Langkah Selanjutnya</div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ Cek WhatsApp untuk konfirmasi</li>
                  <li>✅ Pantau status di halaman Profile</li>
                  <li>✅ Akun akan aktif setelah verifikasi</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ game: "", rank: "", title: "", description: "", heroes: "", skins: "", battlePass: "", email: "", price: "", negotiable: false, photos: [], whatsapp: "", agreeTerms: false }); }}
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-red-400 hover:text-red-600 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Jual Akun Lagi
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Lihat Listing Saya
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-7 h-7 text-[#EA580C]" />
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold">
              Jual Akun Game
            </h1>
          </div>
          <p className="text-gray-400">Listing akun kamu dan temukan pembeli yang tepat dengan aman</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div
              className="h-full bg-gradient-to-r from-[#DC2626] to-[#EA580C] transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  done ? "bg-gradient-to-r from-[#DC2626] to-[#EA580C] border-[#DC2626] text-white" :
                  active ? "bg-white border-[#DC2626] text-[#DC2626]" :
                  "bg-white border-gray-200 text-gray-400"
                }`}>
                  {done ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${active ? "text-[#DC2626]" : done ? "text-gray-700" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom duration-400">

          {/* Step 1: Game Info */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900 mb-1">Pilih Game</h2>
              <p className="text-gray-500 text-sm mb-6">Pilih game yang akunnya ingin kamu jual</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {games.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { update("game", g.id); update("rank", ""); }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                      form.game === g.id
                        ? "border-[#DC2626] bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-3xl">{g.emoji}</span>
                    <span className="text-xs font-bold text-gray-700 text-center leading-tight">{g.name}</span>
                    {form.game === g.id && <CheckCircle className="w-4 h-4 text-[#DC2626]" />}
                  </button>
                ))}
              </div>

              {form.game && (
                <div className="animate-in fade-in slide-in-from-top duration-300">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Rank / Tingkatan Akun *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ranks.map((r) => (
                      <button
                        key={r}
                        onClick={() => update("rank", r)}
                        className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                          form.rank === r
                            ? "border-[#DC2626] bg-red-50 text-[#DC2626]"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900 mb-1">Detail Akun</h2>
                <p className="text-gray-500 text-sm mb-6">Berikan informasi lengkap agar pembeli tertarik</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Judul Listing *
                  <span className="text-gray-400 font-normal ml-1">(min. 10 karakter)</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder={`Contoh: Akun ${selectedGame?.name} ${form.rank} Full Skin Lengkap`}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
                />
                <div className="text-xs text-gray-400 mt-1">{form.title.length} karakter</div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Akun *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Jelaskan detail akun: jumlah hero, skin rare, event terbatas, dll. Semakin detail semakin menarik pembeli!"
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Hero / Karakter</label>
                  <input
                    type="text"
                    value={form.heroes}
                    onChange={(e) => update("heroes", e.target.value)}
                    placeholder="Contoh: 120+"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Skin</label>
                  <input
                    type="text"
                    value={form.skins}
                    onChange={(e) => update("skins", e.target.value)}
                    placeholder="Contoh: 200+"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Battle Pass</label>
                  <input
                    type="text"
                    value={form.battlePass}
                    onChange={(e) => update("battlePass", e.target.value)}
                    placeholder="Contoh: Season 30"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Akun (opsional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@gmail.com (tidak ditampilkan publik)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                />
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Email hanya untuk verifikasi internal, tidak publik
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Photos & Price */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900 mb-1">Foto & Harga</h2>
                <p className="text-gray-500 text-sm mb-6">Upload screenshot dan tentukan harga yang kompetitif</p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Screenshot Akun <span className="text-gray-400 font-normal">(maks. 5 foto)</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {form.photos.map((photo, i) => (
                    <div key={i} className="aspect-square bg-green-50 border-2 border-green-200 rounded-xl flex items-center justify-center text-center p-2">
                      <div>
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <div className="text-xs text-green-700 font-semibold">{photo}</div>
                      </div>
                    </div>
                  ))}
                  {form.photos.length < 5 && (
                    <button
                      onClick={handlePhotoAdd}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#DC2626] hover:bg-red-50 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#DC2626]" />
                      <span className="text-xs text-gray-400 group-hover:text-[#DC2626] font-semibold">Tambah Foto</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Upload screenshot rank, koleksi hero/skin, dan profile
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Harga Jual (Rp) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="Contoh: 2500000"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
                  />
                </div>
                {form.price && (
                  <p className="text-sm text-gray-600 mt-1">
                    = <strong className="text-[#DC2626]">Rp {parseInt(form.price).toLocaleString("id-ID")}</strong>
                  </p>
                )}
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${form.negotiable ? "bg-[#DC2626] border-[#DC2626]" : "border-gray-300"}`}
                    onClick={() => update("negotiable", !form.negotiable)}
                  >
                    {form.negotiable && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">Harga bisa negosiasi</span>
                </label>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626]"
                />
                <p className="text-xs text-gray-400 mt-1">Untuk notifikasi dan komunikasi dengan pembeli</p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-gray-900 mb-1">Review Listing</h2>
                <p className="text-gray-500 text-sm mb-6">Periksa kembali informasi sebelum submit</p>
              </div>

              {/* Summary Card */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <span className="text-3xl">{selectedGame?.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-900">{selectedGame?.name}</div>
                    <div className="text-sm text-gray-500">Rank: {form.rank}</div>
                  </div>
                </div>

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Judul</span>
                    <span className="font-semibold text-gray-900 text-right max-w-[200px]">{form.title || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hero / Karakter</span>
                    <span className="font-semibold text-gray-900">{form.heroes || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Skin</span>
                    <span className="font-semibold text-gray-900">{form.skins || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Battle Pass</span>
                    <span className="font-semibold text-gray-900">{form.battlePass || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Foto</span>
                    <span className="font-semibold text-gray-900">{form.photos.length} foto</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Harga</span>
                    <span style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-[#DC2626]">
                      Rp {form.price ? parseInt(form.price).toLocaleString("id-ID") : "-"}
                      {form.negotiable && <span className="text-sm text-gray-500 ml-1">(nego)</span>}
                    </span>
                  </div>
                </div>
              </div>

              {/* Escrow Info */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-blue-900 mb-1">Dilindungi Sistem Escrow</div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Dana pembeli ditahan OkeGass hingga akun diterima</li>
                      <li>• Jika terjadi sengketa, tim OkeGass mediasi</li>
                      <li>• Komisi platform 5% dari harga jual</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-900 mb-1">Syarat & Ketentuan</div>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Akun yang dijual adalah milik kamu sendiri</li>
                      <li>• Tidak boleh menjual akun hasil hack / curian</li>
                      <li>• Informasi harus akurat dan sesuai kenyataan</li>
                      <li>• Pelanggaran akan dikenakan ban permanen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Agree */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${form.agreeTerms ? "bg-[#DC2626] border-[#DC2626]" : "border-gray-300 group-hover:border-red-300"}`}
                  onClick={() => update("agreeTerms", !form.agreeTerms)}
                >
                  {form.agreeTerms && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm text-gray-700">
                  Saya menyetujui <span className="text-[#DC2626] font-semibold">Syarat & Ketentuan</span> dan <span className="text-[#DC2626] font-semibold">Kebijakan Privasi</span> OkeGass Store. Saya memastikan semua informasi yang diberikan adalah benar dan akun adalah milik saya sendiri.
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
            )}
            <button
              onClick={() => step < 4 ? setStep((s) => s + 1) : handleSubmit()}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-500/30 transition-all ml-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step < 4 ? (
                <><span>Lanjut</span><ChevronRight className="w-4 h-4" /></>
              ) : (
                <><span>Submit Listing</span><CheckCircle className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
