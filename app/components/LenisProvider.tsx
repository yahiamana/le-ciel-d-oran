"use client";

import { useEffect, useRef, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LenisInstance = any;

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisInstance>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let destroyed = false;

    const init = async () => {
      const LenisModule = await import("lenis");
      const Lenis = LenisModule.default;
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default || gsapModule;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      destroyed = true;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
