import { Link } from "react-router";
import { ArrowRight, Sparkles, Zap, Flame } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Particle Component
const ParticleField = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6; // Hanya untuk hero section
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.maxOpacity = this.opacity;
      }

      update(mouseX, mouseY) {
        // Random movement
        this.x += this.speedX * 0.3;
        this.y += this.speedY * 0.3;

        // Mouse repel effect
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 150;

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 2;
          this.y -= Math.sin(angle) * 2;
          this.opacity = this.maxOpacity;
        } else {
          this.opacity = Math.max(this.opacity - 0.01, this.maxOpacity * 0.3);
        }

        // Boundary wrapping
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas dengan slight fade
      ctx.fillStyle = "rgba(26, 26, 46, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update dan draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx =
            particlesRef.current[i].x - particlesRef.current[j].x;
          const dy =
            particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full opacity-40"
      style={{ height: "600px" }}
    />
  );
};

// Game Icon Component
const GameIcon = ({ Icon, label, delay, index, totalIcons }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Staggered hover animation
    ref.current.addEventListener("mouseenter", () => {
      gsap.to(ref.current, {
        scale: 1.3,
        boxShadow: "0 0 30px rgba(220, 38, 38, 0.6)",
        duration: 0.4,
        ease: "back.out",
      });
    });

    ref.current.addEventListener("mouseleave", () => {
      gsap.to(ref.current, {
        scale: 1,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        duration: 0.4,
        ease: "back.out",
      });
    });

    // Floating animation
    gsap.to(ref.current, {
      y: -15 + Math.sin(index * 0.5) * 5,
      duration: 2.5 + index * 0.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: delay * 0.15,
    });
  }, [delay, index]);

  return (
    <div
      ref={ref}
      className="group w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border border-white/20 hover:border-red-500/60"
      title={label}
    >
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-orange-300 transition-colors" />
    </div>
  );
};

export default function HeroSectionAdvanced() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const orbitRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const gameIcons = [
    { Icon: Zap, label: "Mobile Legends", index: 0 },
    { Icon: Flame, label: "Free Fire", index: 1 },
    { Icon: Sparkles, label: "PUBG", index: 2 },
    { Icon: Zap, label: "Valorant", index: 3 },
    { Icon: Sparkles, label: "Genshin Impact", index: 4 },
    { Icon: Flame, label: "COD Mobile", index: 5 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Mouse tracking untuk elemen background
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      // Update background gradient
      const gradient = containerRef.current.querySelector(".gradient-bg");
      if (gradient) {
        gsap.to(gradient, {
          x: (x - rect.width / 2) * 0.08,
          y: (y - rect.height / 2) * 0.08,
          duration: 0.8,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Main entrance timeline
    const tl = gsap.timeline();

    // Stagger content entrance
    tl.from(contentRef.current?.querySelector("h1"), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
    }, 0)
      .from(
        contentRef.current?.querySelector(".tagline"),
        { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
        0.15
      )
      .from(
        contentRef.current?.querySelector("p"),
        { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
        0.3
      )
      .from(
        contentRef.current?.querySelector(".button-group"),
        { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
        0.45
      );

    // Orbit animation
    if (orbitRef.current) {
      const icons = orbitRef.current.querySelectorAll("[data-orbit-icon]");
      tl.from(icons, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        stagger: 0.06,
      }, 0.4);

      // Continuous rotation
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }

    // Stats reveal
    const stats = containerRef.current?.querySelectorAll("[data-stat]");
    if (stats) {
      gsap.from(stats, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.9,
      });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#0a0a14] via-[#1a1a2e] to-[#0f0f1e] text-white overflow-hidden min-h-screen flex items-center pt-20"
    >
      {/* Interactive Particle Background */}
      <ParticleField />

      {/* Gradient Background Effects */}
      <div
        className="gradient-bg absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(96, 6, 6, 0.15), transparent 80%),
            radial-gradient(200px at top right, rgba(234, 88, 12, 0.1), transparent),
            radial-gradient(300px at bottom left, rgba(220, 38, 38, 0.05), transparent)
          `,
        }}
      ></div>

      {/* Static gradient orbs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl opacity-30"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section */}
          <div ref={contentRef} className="space-y-8">
            {/* Tagline Badge */}
            <div className="tagline inline-flex items-center gap-2 bg-white/8 backdrop-blur-md px-4 py-2.5 rounded-full text-sm border border-white/15 hover:border-orange-500/40 transition-all group cursor-default">
              <Sparkles className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors" />
              <span className="bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent font-semibold">
                Dipercaya 3 Gamers Indonesia
              </span>
            </div>

            {/* Main Title */}
            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight"
            >
              <span className="block">
                <span className="bg-gradient-to-r from-white via-orange-200 to-orange-300 bg-clip-text text-transparent">
                  TOP UP GAME
                </span>
              </span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  TERMURAH!
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl font-light">
              Platform Topup dan Jual Beli Akun Terpercaya di Indonesia. Transaksi instan, harga kompetitif, dan keamanan berlapis untuk setiap pelanggan.
            </p>

            {/* CTA Buttons */}
            <div className="button-group flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/topup"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #bc2727, #e43232)",
                  fontFamily: 'var(--font-display)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Top Up Sekarang
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/marketplace"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/20 hover:border-orange-500/60 transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Jual Beli Akun
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 border-opacity-50">
              <div data-stat className="group">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  19 Juta+
                </div>
                <div className="text-sm text-gray-400 mt-1">Transaksi Sukses</div>
              </div>
              <div data-stat className="group">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="text-sm text-gray-400 mt-1">Pengguna Aktif</div>
              </div>
              <div data-stat className="group">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  &lt;1 Min
                </div>
                <div className="text-sm text-gray-400 mt-1">Proses Instan</div>
              </div>
            </div>
          </div>

          {/* Right Section - Game Orbit (Desktop) */}
          <div className="relative h-[520px] hidden md:flex items-center justify-center">
            <div
              ref={orbitRef}
              className="relative w-96 h-96"
            >
              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-28 h-28 bg-gradient-to-br from-red-600 via-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                  <Zap className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Orbiting Icons */}
              {gameIcons.map((game, index) => {
                const angle = (index / gameIcons.length) * 360;
                const radius = 150;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={index}
                    data-orbit-icon
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                   <GameIcon Icon={game.Icon} label={game.label} delay={index} index={index} totalIcons={gameIcons.length} />
                  </div>
                );
              })}

              {/* Orbit Path Ring */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DC2626" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="url(#orbitGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="8,4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}