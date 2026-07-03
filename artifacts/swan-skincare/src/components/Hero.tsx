import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight, Plus, ShieldCheck, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/components/FeaturedProducts';
import retinolBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoading: boolean;
}

const stats = [
  { value: '50k+', label: 'Bottles sold' },
  { value: '4.9', label: 'Average rating' },
  { value: '100%', label: 'Vegan & cruelty-free' },
];

export default function Hero({ isLoading }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const productWrapRef = useRef<HTMLDivElement>(null);
  const productInnerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addItem = useCartStore((s) => s.addItem);
  const retinol = products.find((p) => p.id === 'retinol-serum');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-fade]', { opacity: 0, y: 40 });
      gsap.set('[data-hero-badge]', { opacity: 0, y: 20 });
      gsap.set(productInnerRef.current, { opacity: 0, y: -90 });
      gsap.set('[data-hero-float]', { opacity: 0, scale: 0.9, y: 20 });
      gsap.set('[data-hero-orb]', { opacity: 0 });
      gsap.set('[data-hero-particle]', { opacity: 0 });

      gsap.to(bgTextRef.current, {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('[data-hero-orb]', { opacity: 1, duration: 1.6 }, 0)
        .to(productInnerRef.current, { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' }, 0.15)
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.5)
        .to('[data-hero-badge]', { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .to('[data-hero-float]', { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15 }, '-=0.7')
        .to('[data-hero-particle]', { opacity: 1, duration: 1.2, stagger: 0.05 }, '-=0.9');

      gsap.to(productWrapRef.current, {
        y: '+=20',
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });

      gsap.utils.toArray<HTMLElement>('[data-hero-float]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? '+=14' : '-=14',
          duration: 3 + i * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8 + i * 0.2,
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-hero-particle]').forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -1 : 1) * (20 + (i % 4) * 8),
          x: (i % 3 === 0 ? -1 : 1) * (10 + (i % 3) * 6),
          duration: 4 + (i % 5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.6 + i * 0.15,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-[#06070A] pt-28 pb-16 lg:py-0"
    >
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div data-hero-orb className="orb-1 top-[-15%] left-[-10%]" />
        <div data-hero-orb className="orb-2 bottom-[-25%] right-[-15%]" />
        <div
          data-hero-orb
          className="absolute top-[30%] right-[20%] w-[420px] h-[420px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, rgba(0,0,0,0) 70%)' }}
        />
      </div>

      {/* Oversized bleeding background typography */}
      <h1
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-[-4%] text-[19vw] font-display font-semibold text-white/[0.03] leading-none whitespace-nowrap z-[1] pointer-events-none select-none"
        aria-hidden
      >
        SWAN SKINCARE
      </h1>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="max-w-xl">
            <div
              data-hero-fade
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/70">
                Formulated in Paris
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl xl:text-7xl font-display font-semibold text-white leading-[1.05] tracking-tight mb-7">
              <span data-hero-fade className="block">Luminous skin,</span>
              <span data-hero-fade className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-400">
                  engineered
                </span>{' '}
                to glow.
              </span>
            </h2>

            <p data-hero-fade className="text-white/60 font-sans text-lg leading-relaxed mb-6 max-w-md">
              High-performance serums powered by micro-encapsulated actives. Clinical results,
              weightless texture, quiet luxury.
            </p>

            {/* rating */}
            <div data-hero-fade className="flex items-center gap-3 mb-9">
              <div className="flex items-center gap-0.5 text-amber-300">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm text-white/60 font-sans">
                <span className="text-white font-medium">4.9</span>/5 from 2,000+ reviews
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                data-hero-fade
                onClick={() => retinol && addItem(retinol)}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white text-sm font-semibold tracking-wide overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-[0_10px_40px_-8px_rgba(139,92,246,0.6)]"
              >
                <Plus size={16} />
                <span>Add best-seller — $76</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>
              <button
                data-hero-fade
                onClick={() => scrollTo('#shop')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/25 transition-colors"
              >
                Explore collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* trust badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
              <div data-hero-badge className="flex items-center gap-2 text-white/50 text-sm font-sans">
                <ShieldCheck size={16} className="text-cyan-400" />
                Dermatologist tested
              </div>
              <div data-hero-badge className="flex items-center gap-2 text-white/50 text-sm font-sans">
                <Leaf size={16} className="text-emerald-400" />
                Clean, vegan formula
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label} data-hero-badge>
                  <div className="text-2xl md:text-3xl font-display font-semibold text-white">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating product */}
          <div className="relative flex items-center justify-center min-h-[420px] lg:min-h-[640px]">
            {/* particles */}
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                data-hero-particle
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${4 + (i % 4) * 3}px`,
                  height: `${4 + (i % 4) * 3}px`,
                  top: `${(i * 53) % 100}%`,
                  left: `${(i * 37) % 100}%`,
                  background:
                    i % 3 === 0
                      ? 'rgba(34,211,238,0.7)'
                      : i % 3 === 1
                      ? 'rgba(168,85,247,0.7)'
                      : 'rgba(236,72,153,0.6)',
                  boxShadow: '0 0 12px currentColor',
                }}
              />
            ))}

            <div ref={productWrapRef} className="relative z-10 will-change-transform">
              {/* glow behind bottle */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full blur-[90px]"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(34,211,238,0.12) 45%, rgba(0,0,0,0) 70%)' }}
                aria-hidden
              />
              <div ref={productInnerRef} className="relative will-change-transform">
                <img
                  src={retinolBottle}
                  alt="SWAN Retinol Serum"
                  className="relative z-10 h-[380px] lg:h-[560px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] mx-auto"
                />
              </div>
            </div>

            {/* floating annotation cards */}
            <div
              data-hero-float
              className="absolute top-[8%] left-0 lg:left-[-4%] glass-card rounded-2xl px-5 py-4 z-20 will-change-transform"
            >
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 mb-1">Actives</div>
              <div className="font-display text-lg text-white">Micro-encapsulated</div>
            </div>

            <div
              data-hero-float
              className="absolute bottom-[14%] right-0 lg:right-[-2%] glass-card rounded-2xl px-5 py-4 z-20 will-change-transform"
            >
              <div className="text-[10px] uppercase tracking-widest text-fuchsia-400 mb-1">Purity</div>
              <div className="font-display text-lg text-white">0% synthetics</div>
            </div>

            <div
              data-hero-float
              className="absolute top-[46%] right-[6%] hidden md:flex items-center gap-2 glass-card rounded-full px-4 py-2 z-20 will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/80 font-sans">Absorbs in 30s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
