import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import lady from '@assets/optimized/lady_serum_ritual.webp';
import { getProduct } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const retinol = getProduct('retinol-serum')!;

const points = [
  'Clinically-loved active ingredients',
  'Dermatologist tested & cruelty-free',
  'Silky, fast-absorbing textures',
];

export default function RitualFace() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ritual-img]', {
        y: 90,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('[data-ritual-copy]', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 bg-white border-y border-foreground/5"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-8%] w-[42vw] h-[42vw] rounded-full bg-[hsl(var(--c-peach)/0.14)] blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-6%] w-[38vw] h-[38vw] rounded-full bg-[hsl(var(--c-rose)/0.12)] blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <span
            data-ritual-copy
            className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[hsl(var(--luxury))] font-medium mb-6 block"
          >
            The Ritual
          </span>
          <h2
            data-ritual-copy
            className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6"
          >
            A drop of
            <span className="text-luxury"> pure devotion.</span>
          </h2>
          <p
            data-ritual-copy
            className="text-base md:text-lg font-light text-foreground/70 leading-relaxed max-w-lg mb-8"
          >
            Two or three drops, pressed gently into the skin. A moment that
            belongs entirely to you — where potent, considered formulas melt in
            and leave behind a soft, lit-from-within glow.
          </p>
          <ul className="flex flex-col gap-4">
            {points.map((p) => (
              <li
                key={p}
                data-ritual-copy
                className="flex items-center gap-3 text-foreground/80"
              >
                <span className="grid place-items-center w-7 h-7 rounded-full bg-[hsl(var(--luxury)/0.1)] text-[hsl(var(--luxury))]">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span className="text-sm md:text-base font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image + floating product pedestal (bottle slot) */}
        <div data-ritual-img className="order-1 md:order-2 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden luxury-shadow">
            <img
              src={lady}
              alt="A woman applying SWAN serum"
              className="w-full h-full object-cover aspect-[3/4]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--luxury)/0.25)] via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 md:-left-8 bottom-10 glass rounded-3xl p-4 luxury-shadow flex flex-col items-center gap-2">
            <div
              data-bottle-slot="3"
              className="relative w-24 sm:w-28 aspect-[0.72]"
            >
              <img
                src={retinol.image}
                alt=""
                className="slot-static absolute inset-0 w-full h-full object-contain drop-shadow-xl"
                draggable={false}
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground/70">
              Retinol Serum
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
