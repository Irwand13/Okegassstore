export default function TrustBar() {
  const trustItems = [
    "⚡ Proses Instan",
    "🔒 100% Aman",
    "📱 24/7 Layanan",
    "💯 Harga Terbaik",
    "✅ Terpercaya",
    "🎯 Auto Process",
  ];

  return (
    <div className="bg-[#111827] text-white py-4 overflow-hidden">
      <div className="relative flex">
        {/* First set */}
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {trustItems.map((item, index) => (
            <div
              key={`first-${index}`}
              className="inline-flex items-center gap-2 px-6 py-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-lg font-semibold">{item}</span>
              <span className="text-[#DC2626]">·</span>
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 animate-marquee whitespace-nowrap" aria-hidden="true">
          {trustItems.map((item, index) => (
            <div
              key={`second-${index}`}
              className="inline-flex items-center gap-2 px-6 py-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-lg font-semibold">{item}</span>
              <span className="text-[#DC2626]">·</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
