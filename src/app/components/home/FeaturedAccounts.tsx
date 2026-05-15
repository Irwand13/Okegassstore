import { useNavigate } from "react-router";
import { User, ArrowRight } from "lucide-react";

export default function FeaturedAccounts() {
  const navigate = useNavigate();

  const accounts = [
    {
      id: 1,
      game: "Mobile Legends",
      gameColor: "#1E88E5",
      title: "Akun Mythic 800+ Points",
      rank: "Mythic Glory",
      heroes: "120+ Heroes",
      skins: "200+ Skins",
      seller: "ProGamer99",
      sellerRating: 4.9,
      price: "Rp 2.500.000",
      status: "available",
    },
    {
      id: 2,
      game: "PUBG Mobile",
      gameColor: "#3949AB",
      title: "Conqueror Season 25",
      rank: "Conqueror",
      heroes: "50+ Outfits",
      skins: "100+ Skins",
      seller: "PUBGKing",
      sellerRating: 5.0,
      price: "Rp 3.200.000",
      status: "escrow",
    },
    {
      id: 3,
      game: "Genshin Impact",
      gameColor: "#7B2FFF",
      title: "AR 60 All 5-Star Characters",
      rank: "AR 60",
      heroes: "All 5★",
      skins: "Premium BP",
      seller: "TravelerMain",
      sellerRating: 4.8,
      price: "Rp 5.000.000",
      status: "available",
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "available") {
      return <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">✅ Available</span>;
    }
    if (status === "escrow") {
      return <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full">🔒 In Escrow</span>;
    }
    return <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full">✗ Sold</span>;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Akun Unggulan
          </h2>
          <p className="text-xl text-gray-600">
            Akun game berkualitas tinggi dengan harga terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => navigate("/marketplace")}
            >
              {/* Game Banner */}
              <div
                className="h-3"
                style={{ backgroundColor: account.gameColor }}
              ></div>
              
              <div className="p-6">
                {/* Game Name */}
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  {account.game}
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl font-bold text-gray-900 mb-4"
                >
                  {account.title}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Rank</div>
                    <div className="text-sm font-bold text-gray-900">{account.rank}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Heroes</div>
                    <div className="text-sm font-bold text-gray-900">{account.heroes}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Skins</div>
                    <div className="text-sm font-bold text-gray-900">{account.skins}</div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{account.seller}</div>
                    <div className="text-xs text-gray-500">⭐ {account.sellerRating} Rating</div>
                  </div>
                </div>

                {/* Price & Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Harga</div>
                    <div
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="text-2xl font-bold text-[#DC2626]"
                    >
                      {account.price}
                    </div>
                  </div>
                  {getStatusBadge(account.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <button
            onClick={() => navigate("/marketplace")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lihat Semua Akun
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
