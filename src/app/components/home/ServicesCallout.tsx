import { useNavigate } from "react-router";
import { Smartphone, Zap, Wallet } from "lucide-react";

export default function ServicesCallout() {
  const navigate = useNavigate();

  const services = [
    {
      id: "pulsa",
      icon: <Smartphone className="w-8 h-8" />,
      title: "Pulsa & Data",
      description: "Isi pulsa dan paket data semua operator dengan harga termurah",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "pln",
      icon: <Zap className="w-8 h-8" />,
      title: "Token PLN",
      description: "Beli token listrik PLN dengan proses instant 24 jam",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "ewallet",
      icon: <Wallet className="w-8 h-8" />,
      title: "E-Wallet",
      description: "Top up GoPay, OVO, DANA, dan e-wallet lainnya",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Semua Kebutuhan Digital
          </h2>
          <p className="text-xl text-gray-600">
            Tidak hanya game, kami juga melayani kebutuhan digital lainnya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}
              >
                {service.icon}
              </div>
              
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-2xl font-bold text-gray-900 mb-3"
              >
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              <button
                onClick={() => navigate(`/topup?tab=${service.id}`)}
                className={`w-full py-3 bg-gradient-to-br ${service.gradient} text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Top Up Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
