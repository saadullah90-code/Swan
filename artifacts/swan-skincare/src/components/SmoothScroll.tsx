import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      // Route touch scrolling through Lenis too. This is what makes the mobile
      // experience match the desktop one: the travelling bottle is positioned
      // per-frame from window.scrollY, and without syncTouch the native momentum
      // scroll runs on the compositor thread while the JS bottle lags a frame
      // behind — that lag is the jitter/swim/glitch on phones. Driving touch
      // through the same gsap.ticker keeps scroll and bottle perfectly in phase.
      // (These touch options have no effect on desktop, which scrolls via wheel.)
      syncTouch: true,
      syncTouchLerp: 0.09,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in phase with Lenis so scrubbed animations track smooth scroll precisely.
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
