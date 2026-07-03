import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import swan from '@assets/generated_images/swan_line_art.png';

gsap.registerPlugin(ScrollTrigger);

export default function SwanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swanRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-swan-word]', {
        opacity: 0,
        scale: 1.15,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from(swanRef.current, {
        x: -160,
        y: 40,
        opacity: 0,
        rotate: -10,
        duration: 1.6,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        onComplete: () => {
          if (swanRef.current) {
            gsap.to(swanRef.current, {
              y: '+=18',
              rotate: 1.5,
              duration: 4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          }
        },
      });

      gsap.from('[data-swan-copy]', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40 bg-gradient-to-b from-white via-[hsl(var(--c-rose)/0.05)] to-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[hsl(var(--c-rose)/0.10)] blur-[140px]" />
      </div>

      {/* Giant faded word */}
      <div
        data-swan-word
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[22vw] font-display font-bold leading-none z-0 pointer-events-none select-none"
        style={{ color: 'hsl(var(--luxury) / 0.06)' }}
      >
        GRACE
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <span
          data-swan-copy
          className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[hsl(var(--luxury))] font-medium mb-8"
        >
          The Spirit of SWAN
        </span>

        <img
          ref={swanRef}
          src={swan}
          alt="SWAN emblem"
          className="w-52 sm:w-64 md:w-80 h-auto object-contain drop-shadow-2xl mb-10"
          draggable={false}
        />

        <h2
          data-swan-copy
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.05] mb-6"
        >
          Grace, distilled into
          <span className="text-luxury"> every single drop.</span>
        </h2>

        <p
          data-swan-copy
          className="max-w-xl text-base md:text-lg font-light text-foreground/70 leading-relaxed"
        >
          The swan moves without effort, yet leaves nothing but calm in its wake.
          It is our promise — skincare that glides into your ritual and leaves
          only quiet, luminous confidence behind.
        </p>
      </div>
    </section>
  );
}
