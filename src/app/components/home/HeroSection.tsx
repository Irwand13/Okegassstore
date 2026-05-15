import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Zap, Flame } from "lucide-react";
import gsap from "gsap";

/* =========================
   PARTICLE BACKGROUND
========================= */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;

        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;

        ctx.fill();
      }
    }

    particlesRef.current = Array.from(
      { length: 80 },
      () => new Particle()
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y
        );

        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
    />
  );
};

/* =========================
   GAME ICON
========================= */
const GameIcon = ({
  Icon,
  label,
  delay,
  index,
}: {
  Icon: any;
  label: string;
  delay: number;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: -12,
      repeat: -1,
      yoyo: true,
      duration: 2 + index * 0.2,
      ease: "sine.inOut",
      delay,
    });
  }, [delay, index]);

  return (
    <div
      ref={ref}
      title={label}
      className="group w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl hover:scale-110 hover:border-red-500/50 transition-all duration-300"
    >
      <Icon className="w-10 h-10 text-white group-hover:text-orange-300 transition-colors" />
    </div>
  );
};

/* =========================
   MAIN HERO
========================= */
export default function HeroSectionAdvanced() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const orbitRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const gameIcons = [
    { Icon: Zap, label: "Mobile Legends" },
    { Icon: Flame, label: "Free Fire" },
    { Icon: Sparkles, label: "PUBG" },
    { Icon: Zap, label: "Valorant" },
    { Icon: Sparkles, label: "Genshin Impact" },
    { Icon: Flame, label: "COD Mobile" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect =
        containerRef.current!.getBoundingClientRect();

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tl = gsap.timeline();

    tl.from(contentRef.current?.querySelector("h1"), {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        contentRef.current?.querySelector("p"),
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        0.2
      )
      .from(
        contentRef.current?.querySelector(
          ".button-group"
        ),
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        0.4
      );

    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    }

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b0b12] via-[#141420] to-[#0d0d16] text-white flex items-center"
    >
      {/* PARTICLES */}
      <ParticleField />

      {/* GRADIENT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              600px at ${mousePos.x}px ${mousePos.y}px,
              rgba(220,38,38,0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* ORBS */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
          />
        </svg>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div
            ref={contentRef}
            className="space-y-8"
          >
            {/* TAG */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-orange-400" />

              <span className="text-sm text-orange-200">
                Dipercaya 3 Gamers Indonesia
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                TOP UP GAME
              </span>

              <br />

              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                TERMURAH!
              </span>
            </h1>

            {/* DESC */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
              Platform top up dan jual beli akun game
              terpercaya dengan transaksi instan,
              aman, dan harga terbaik di Indonesia.
            </p>

            {/* BUTTON */}
            <div className="button-group flex flex-col sm:flex-row gap-4">
              <a
                href="/topup"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <Zap className="w-5 h-5" />

                Top Up Sekarang

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/marketplace"
                className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 font-bold flex items-center justify-center"
              >
                Jual Beli Akun
              </a>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-black text-orange-400">
                  19 Juta +
                </div>

                <div className="text-sm text-gray-400">
                  Transaksi
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-orange-400">
                  3
                </div>

                <div className="text-sm text-gray-400">
                  User Aktif
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-orange-400">
                  &lt;1 Menit
                </div>

                <div className="text-sm text-gray-400">
                  Proses
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center justify-center relative h-[550px]">
            <div
              ref={orbitRef}
              className="relative w-[420px] h-[420px]"
            >
              {/* CENTER ICON */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-3xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-2xl border border-white/20 -translate-x-1/2 -translate-y-1/2 z-20">
                <Zap className="w-14 h-14 text-white" />
              </div>

              {/* ICON ORBIT */}
              {gameIcons.map((game, index) => {
                const angle =
                  (index / gameIcons.length) *
                  Math.PI *
                  2;

                const radius = 160;

                const x =
                  Math.cos(angle) * radius;

                const y =
                  Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                  >
                    {/* COUNTER ROTATION */}
                    <div
                      style={{
                        animation:
                          "counterRotate 40s linear infinite",
                      }}
                    >
                      <GameIcon
                        Icon={game.Icon}
                        label={game.label}
                        delay={index * 0.2}
                        index={index}
                      />
                    </div>
                  </div>
                );
              })}

              {/* RING */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 420 420"
              >
                <circle
                  cx="210"
                  cy="210"
                  r="160"
                  fill="none"
                  stroke="url(#orbitGradient)"
                  strokeWidth="2"
                  strokeDasharray="10 8"
                />

                <defs>
                  <linearGradient
                    id="orbitGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ef4444"
                    />

                    <stop
                      offset="100%"
                      stopColor="#f97316"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* FIX ROTATION */}
      <style>
        {`
          @keyframes counterRotate {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(-360deg);
            }
          }
        `}
      </style>
    </section>
  );
}