import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(text1Ref.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      gsap.to(text2Ref.current, {
        xPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#06070A] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-[#06070A] to-[#06070A]" />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="whitespace-nowrap overflow-hidden flex -translate-x-[10%]">
          <div ref={text1Ref} className="text-[6vw] md:text-[4vw] font-display font-medium text-white/20 uppercase tracking-widest flex gap-8 items-center">
            <span>CLINICALLY PROVEN</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span>DERMATOLOGIST TESTED</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span>CRUELTY FREE</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span className="text-white/40">FRAGRANCE FREE</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span>CLINICALLY PROVEN</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span>DERMATOLOGIST TESTED</span>
            <span className="text-cyan-500/40 text-4xl">•</span>
            <span>CRUELTY FREE</span>
          </div>
        </div>
        <div className="whitespace-nowrap overflow-hidden flex -translate-x-[20%]">
          <div ref={text2Ref} className="text-[6vw] md:text-[4vw] font-display font-medium text-white/20 uppercase tracking-widest flex gap-8 items-center">
            <span>100% VEGAN</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span>PARABEN FREE</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span className="text-white/40">BIO-ACTIVE FORMULA</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span>NON-COMEDOGENIC</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span>100% VEGAN</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span>PARABEN FREE</span>
            <span className="text-purple-500/40 text-4xl">•</span>
            <span>BIO-ACTIVE FORMULA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
