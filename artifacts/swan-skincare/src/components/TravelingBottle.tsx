import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProduct } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const bottle = getProduct('retinol-serum')!;
const BASE_W = 320; // base render width in px; scaled per slot

/**
 * A single fixed serum bottle that travels down the whole page, moving
 * between the empty `[data-bottle-slot]` markers as the user scrolls.
 * Position + scale are interpolated from the live on-screen rects of the
 * slots, so it stays glitch-free even with pinned / animated sections.
 */
export default function TravelingBottle({ isLoading }: { isLoading: boolean }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const enteredRef = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    if (isLoading) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const img = imgRef.current;
    if (!outer || !inner || !img) return;

    let slots: HTMLElement[] = [];
    const collect = () => {
      slots = Array.from(
        document.querySelectorAll<HTMLElement>('[data-bottle-slot]'),
      ).sort(
        (a, b) => Number(a.dataset.bottleSlot) - Number(b.dataset.bottleSlot),
      );
    };
    collect();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeInOut = gsap.parseEase('power2.inOut');

    const place = (progress: number) => {
      if (slots.length === 0) return;
      const p = Math.min(Math.max(progress, 0), 1);
      const segs = slots.length - 1;

      let cx: number;
      let cy: number;
      let w: number;

      if (segs <= 0) {
        const r = slots[0].getBoundingClientRect();
        cx = r.left + r.width / 2;
        cy = r.top + r.height / 2;
        w = r.width;
      } else {
        const scaled = p * segs;
        let idx = Math.floor(scaled);
        if (idx >= segs) idx = segs - 1;
        const local = easeInOut(scaled - idx);
        const a = slots[idx].getBoundingClientRect();
        const b = slots[idx + 1].getBoundingClientRect();
        cx = lerp(a.left + a.width / 2, b.left + b.width / 2, local);
        cy = lerp(a.top + a.height / 2, b.top + b.height / 2, local);
        w = lerp(a.width, b.width, local);
      }

      const ow = outer.offsetWidth || BASE_W;
      const oh = outer.offsetHeight || BASE_W;
      const s = w / ow;
      outer.style.transform = `translate(${cx - ow / 2}px, ${cy - oh / 2}px) scale(${s})`;
    };

    // Entrance — rises up from below once, then a gentle infinite float.
    const ctx = gsap.context(() => {
      gsap.set(outer, { opacity: 1 });
      if (!enteredRef.current) {
        enteredRef.current = true;
        gsap.from(inner, { y: 160, opacity: 0, duration: 1.3, ease: 'power4.out' });
        gsap.to(img, {
          y: '+=14',
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    });

    const st = ScrollTrigger.create({
      start: 0,
      end: () => {
        const last = slots[slots.length - 1];
        if (!last) return window.innerHeight;
        const r = last.getBoundingClientRect();
        const y = window.scrollY || window.pageYOffset;
        return Math.max(1, r.top + y + r.height / 2 - window.innerHeight / 2);
      },
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        place(self.progress);
      },
      onRefresh: () => {
        collect();
        place(progressRef.current);
      },
    });

    const onImgLoad = () => {
      ScrollTrigger.refresh();
      place(progressRef.current);
    };
    img.addEventListener('load', onImgLoad);
    if (img.complete) onImgLoad();

    const raf = window.setTimeout(() => {
      ScrollTrigger.refresh();
      place(progressRef.current);
    }, 150);

    return () => {
      st.kill();
      ctx.revert();
      img.removeEventListener('load', onImgLoad);
      window.clearTimeout(raf);
    };
  }, [isLoading]);

  return (
    <div
      ref={outerRef}
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: BASE_W,
        transformOrigin: 'center',
        opacity: 0,
        zIndex: 45,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div ref={innerRef} className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square rounded-full bg-[hsl(var(--c-rose)/0.28)] blur-[70px]" />
        <img
          ref={imgRef}
          src={bottle.image}
          alt=""
          className="relative w-full h-auto drop-shadow-2xl select-none"
          draggable={false}
        />
        <span className="absolute -bottom-1 right-3 z-20 grid place-items-center w-14 h-14 rounded-full bg-foreground text-background text-[11px] font-semibold tracking-wide rotate-[-8deg]">
          30 ml
        </span>
      </div>
    </div>
  );
}
