import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function GameCards() {
  const navigate = useNavigate();

  const games = [
    { id: "ml", name: "Mobile Legends", currency: "Diamond", color: "#1E88E5", emoji: "⚔️" },
    { id: "ff", name: "Free Fire", currency: "Diamond", color: "#EA580C", emoji: "🔥" },
    { id: "pubg", name: "PUBG Mobile", currency: "UC", color: "#3949AB", emoji: "🎯" },
    { id: "genshin", name: "Genshin Impact", currency: "Genesis Crystal", color: "#7B2FFF", emoji: "⭐" },
    { id: "valorant", name: "Valorant", currency: "VP", color: "#FF4655", emoji: "🎮" },
    { id: "cod", name: "Call of Duty", currency: "CP", color: "#166534", emoji: "🔫" },
    { id: "aov", name: "Arena of Valor", currency: "Voucher", color: "#B45309", emoji: "🏆" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Pilih Game Favorit
          </h2>
          <p className="text-xl text-gray-600">
            Top up cepat untuk semua game populer
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <button
              key={game.id}
              onClick={() => navigate(`/topup?game=${game.id}`)}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
              style={{
                animationDelay: `${index * 100}ms`,
                borderTop: `4px solid ${game.color}`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${game.color}20` }}
              >
                {game.emoji}
              </div>
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xl font-bold text-gray-900 mb-1"
              >
                {game.name}
              </h3>
              <p className="text-sm text-gray-500">{game.currency}</p>
            </button>
          ))}

          {/* See More Card */}
          <button
            onClick={() => navigate("/topup")}
            className="group bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-white animate-in fade-in slide-in-from-bottom"
            style={{ animationDelay: `${games.length * 100}ms` }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto transition-transform group-hover:scale-110">
              ➕
            </div>
            <h3
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xl font-bold mb-1"
            >
              Game Lainnya
            </h3>
            <div className="flex items-center justify-center gap-1 text-sm mt-2">
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
