import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      avatar: "👨",
      name: "Rizky Pratama",
      game: "Mobile Legends",
      rating: 5,
      text: "Proses top up sangat cepat! Diamond masuk kurang dari 1 menit. Harga juga paling murah dibanding yang lain.",
    },
    {
      id: 2,
      avatar: "👩",
      name: "Siti Nurhaliza",
      game: "Free Fire",
      rating: 5,
      text: "Sudah langganan di OkeGass dari tahun lalu. Selalu dapat harga terbaik dan pelayanan ramah. Recommended!",
    },
    {
      id: 3,
      avatar: "👨",
      name: "Budi Santoso",
      game: "PUBG Mobile",
      rating: 5,
      text: "Beli akun PUBG pakai sistem escrow, aman banget! Dana baru keluar setelah akun saya terima. Top!",
    },
    {
      id: 4,
      avatar: "👩",
      name: "Dewi Lestari",
      game: "Genshin Impact",
      rating: 5,
      text: "Top up Genesis Crystal lancar jaya. Customer service responsif 24/7. Pokoknya gak nyesel deh!",
    },
    {
      id: 5,
      avatar: "👨",
      name: "Ahmad Fauzi",
      game: "Valorant",
      rating: 5,
      text: "Jual akun Valorant di sini, prosesnya cepat dan aman. Uang langsung masuk setelah pembeli konfirmasi.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Apa Kata Mereka?
          </h2>
          <p className="text-xl text-gray-600">
            Testimoni dari ribuan pengguna setia OkeGass
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-500">
            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-center mb-8">
              <p className="text-xl md:text-2xl text-gray-700 italic">
                "{current.text}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#EA580C] rounded-full flex items-center justify-center text-3xl">
                {current.avatar}
              </div>
              <div className="text-left">
                <div
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl font-bold text-gray-900"
                >
                  {current.name}
                </div>
                <div className="text-gray-500">{current.game} Player</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#DC2626] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
