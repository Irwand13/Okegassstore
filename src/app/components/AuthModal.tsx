import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                🎮
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold">
                  OkeGass
                </div>
                <div className="text-sm opacity-90">Top Up Game Termurah</div>
              </div>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 font-semibold transition-colors ${
              isLogin
                ? "text-[#DC2626] border-b-2 border-[#DC2626]"
                : "text-gray-500"
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 font-semibold transition-colors ${
              !isLogin
                ? "text-[#DC2626] border-b-2 border-[#DC2626]"
                : "text-gray-500"
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Daftar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
                placeholder="Masukkan nama lengkap"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-lg focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <strong>Demo:</strong> demo@okegass.com / password
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {isLogin ? "Masuk" : "Daftar Sekarang"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">🔵</span>
            Lanjutkan dengan Google
          </button>
        </form>
      </div>
    </div>
  );
}
