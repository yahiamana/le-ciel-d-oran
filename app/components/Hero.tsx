"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      // Warm ambient glow
      const glow = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time * 0.7) * 100,
        h * 0.4 + Math.cos(time * 0.5) * 60,
        0,
        w * 0.5,
        h * 0.4,
        w * 0.6
      );
      glow.addColorStop(0, "rgba(184, 134, 11, 0.08)");
      glow.addColorStop(0.5, "rgba(184, 134, 11, 0.03)");
      glow.addColorStop(1, "rgba(184, 134, 11, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Second glow
      const glow2 = ctx.createRadialGradient(
        w * 0.7 + Math.cos(time * 0.4) * 80,
        h * 0.6 + Math.sin(time * 0.6) * 50,
        0,
        w * 0.7,
        h * 0.6,
        w * 0.4
      );
      glow2.addColorStop(0, "rgba(212, 168, 67, 0.06)");
      glow2.addColorStop(1, "rgba(212, 168, 67, 0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        const flicker = Math.sin(time * 2 + p.phase) * 0.3 + 0.7;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${p.alpha * flicker})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cleanup = draw();

    const handleResize = () => {
      if (cleanup) cleanup();
      draw();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(184,134,11,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Canvas particles */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold"
        >
          Restaurant gastronomique — Oran
        </motion.p>

        {/* Restaurant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
        >
          <span className="gold-gradient">Le Ciel d&apos;Oran</span>
        </motion.h1>

        {/* Arabic name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-arabic mt-2 text-lg text-muted-foreground md:text-xl"
        >
          لو سيل دي وهران
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="gold-divider my-6"
        />

        {/* Tagline FR */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Cuisine moderne méditerranéenne, ingrédients locaux — une expérience
          culinaire céleste.
        </motion.p>

        {/* Tagline AR */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-arabic mt-2 text-sm text-muted-foreground"
        >
          تجربة طعام سماوية بنكهات البحر الأبيض المتوسط
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a href="#reservation" className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Réserver une table
          </a>
          <a href="#menu" className="btn-outline">
            Découvrir le menu
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-gold"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="8"
              cy="8"
              r="2"
              fill="currentColor"
              animate={{ cy: [8, 14, 8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
