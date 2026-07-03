import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

gsap.registerPlugin(ScrollTrigger);

export default function TravelingBottle() {
  const bottleRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bottle = bottleRef.current;
    const glow = glowRef.current;
    if (!bottle) return;

    const ctx = gsap.context(() => {
      // Anchor both bottle and glow as fixed elements whose CENTER we drive
      // with x/y transforms (viewport pixel coordinates).
      gsap.set([bottle, glow], {
        position: 'fixed',
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        pointerEvents: 'none',
      });

      const place = (x: number, y: number, scale: number, rot: number, glowOpacity: number) => {
        gsap.set(bottle, { x, y, scale, rotate: rot });
        if (glow) gsap.set(glow, { x, y, scale: scale * 1.15, opacity: glowOpacity });
      };

      const getSlot = () =>
        document.querySelector('[data-bottle-slot]') as HTMLElement | null;

      const update = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        // Hero anchor (offset right) and Story anchor (offset left)
        const isMobile = vw < 768;
        const heroX = isMobile ? vw * 0.5 : vw * 0.72;
        const heroY = vh * 0.5;
        const storyX = isMobile ? vw * 0.5 : vw * 0.28;
        const storyY = vh * 0.45;

        // Phase 1 ends roughly after the hero has scrolled away
        const p1End = vh * 0.9;

        // Live measurement of the target landing slot (middle product card)
        const slot = getSlot();
        let slotX = vw / 2;
        let slotY = vh / 2;
        let slotScale = 0.75;
        if (slot) {
          const r = slot.getBoundingClientRect();
          slotX = r.left + r.width / 2;
          slotY = r.top + r.height / 2;
          const bh = bottle.offsetHeight || 320;
          slotScale = (r.height * 0.98) / bh;
        }

        if (scrollY <= p1End) {
          // Phase 1: hero (right) -> story (left)
          const t = gsap.utils.clamp(0, 1, scrollY / p1End);
          const e = gsap.parseEase('power1.inOut')(t);
          place(
            gsap.utils.interpolate(heroX, storyX, e),
            gsap.utils.interpolate(heroY, storyY, e),
            gsap.utils.interpolate(1.2, 1.0, e),
            gsap.utils.interpolate(-10, 12, e),
            gsap.utils.interpolate(0.5, 0.35, e),
          );
        } else {
          // Phase 2: converge from story anchor onto the live slot as the
          // products section rises toward centre, then stay glued to the slot.
          const conv = gsap.utils.clamp(0, 1, (vh - slotY) / (vh * 0.5));
          const e = gsap.parseEase('power2.inOut')(conv);
          place(
            gsap.utils.interpolate(storyX, slotX, e),
            gsap.utils.interpolate(storyY, slotY, e),
            gsap.utils.interpolate(1.0, slotScale, e),
            gsap.utils.interpolate(12, 0, e),
            gsap.utils.interpolate(0.35, 0.18, e),
          );
        }
      };

      const st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: update,
        onRefresh: update,
      });

      // Initial placement
      update();

      return () => st.kill();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="w-[320px] h-[320px] bg-rose-300/40 blur-[90px] rounded-full z-30 pointer-events-none"
      />
      <img
        ref={bottleRef}
        src={heroBottle}
        alt="SWAN Retinol Serum"
        className="w-full max-w-[200px] md:max-w-[280px] h-auto z-40 pointer-events-none"
      />
    </>
  );
}
