import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        xPercent: -50,
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
    <section ref={containerRef} className="py-24 bg-primary/5 relative overflow-hidden">
      <div className="flex flex-col gap-12">
        <div className="whitespace-nowrap overflow-hidden">
          <div ref={textRef} className="inline-block text-[8vw] font-serif text-primary/30 uppercase tracking-widest">
            — Formulated in Paris — Cruelty Free — Clean Ingredients — Luminous Skin — Formulated in Paris — Cruelty Free — Clean Ingredients
          </div>
        </div>
      </div>
    </section>
  );
}
