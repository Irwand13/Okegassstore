import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";

export default function EscrowBanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4 animate-in fade-in slide-in-from-left duration-700">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h2
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Jual Beli Akun – 100% Aman dengan Escrow
                </h2>
                <p className="text-green-100 mt-1">
                  Dana Anda dijamin aman sampai barang diterima
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                <div className="text-4xl font-bold text-green-600" style={{ fontFamily: 'var(--font-display)' }}>
                  2.500+
                </div>
                <div className="text-gray-600 mt-1">Akun Terjual</div>
              </div>
              <div className="text-center animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                <div className="text-4xl font-bold text-green-600" style={{ fontFamily: 'var(--font-display)' }}>
                  0
                </div>
                <div className="text-gray-600 mt-1">Kasus Penipuan</div>
              </div>
              <div className="text-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                <div className="text-4xl font-bold text-green-600" style={{ fontFamily: 'var(--font-display)' }}>
                  100%
                </div>
                <div className="text-gray-600 mt-1">Dana Aman</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                Bagaimana Sistem Escrow Bekerja?
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Pembeli Bayar</div>
                    <div className="text-sm text-gray-600">Dana masuk ke rekening bersama</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Penjual Transfer</div>
                    <div className="text-sm text-gray-600">Akun dikirim ke pembeli</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Konfirmasi</div>
                    <div className="text-sm text-gray-600">Dana diteruskan ke penjual</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <strong>Penting:</strong> Verifikasi KTP diperlukan untuk menjual akun. Ini untuk melindungi semua pihak dari penipuan.
              </div>
            </div>

            <Link
              to="/marketplace"
              className="block w-full md:w-auto md:inline-block text-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700 delay-600"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Jelajahi Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
