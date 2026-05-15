import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#DC2626] via-[#DC2626] to-[#EA580C] text-white overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10+ Gamers</span>
            </div>
            
            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              TOP UP GAME<br />TERMURAH!
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90">
              Proses instan, harga terbaik, dan 100% aman untuk semua kebutuhan gaming kamu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/topup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#DC2626] rounded-lg font-bold hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Top Up Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#DC2626] transition-all duration-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Jual Beli Akun
              </Link>
            </div>
          </div>

          {/* Right Content - Animated Game Icons */}
          <div className="relative h-[400px] hidden md:block animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbiting Icons */}
              <div className="relative w-80 h-80">
                {[
                  { emoji: "🎮", delay: 0, rotation: 0 },
                  { emoji: "🔥", delay: 1, rotation: 60 },
                  { emoji: "⚔️", delay: 2, rotation: 120 },
                  { emoji: "🏆", delay: 3, rotation: 180 },
                  { emoji: "💎", delay: 4, rotation: 240 },
                  { emoji: "⭐", delay: 5, rotation: 300 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbit 20s linear infinite`,
                      animationDelay: `-${item.delay * 3.33}s`,
                    }}
                  >
                    <div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition-transform"
                      style={{
                        transform: `rotate(${item.rotation}deg) translateX(150px) rotate(-${item.rotation}deg)`,
                      }}
                    >
                      {item.emoji}
                    </div>
                  </div>
                ))}
                
                {/* Center Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl animate-pulse">
                  🎮
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <div className="text-center">
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold">
              19 Juta+
            </div>
            <div className="text-white/80 mt-1">Transaksi</div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold">
              3
            </div>
            <div className="text-white/80 mt-1">Pengguna</div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold">
              &lt; 1 Menit
            </div>
            <div className="text-white/80 mt-1">Proses</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
