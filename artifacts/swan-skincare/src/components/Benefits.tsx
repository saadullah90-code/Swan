import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(textRef1.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
      gsap.to(textRef2.current, {
        xPercent: 30,
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

  const phrases1 = [
    "Formulated in Paris", "Cruelty Free", "Clean Ingredients", "Luminous Skin",
    "Formulated in Paris", "Cruelty Free", "Clean Ingredients", "Luminous Skin"
  ];
  
  const phrases2 = [
    "Dermatologist Tested", "Vegan", "No Parabens", "Radiant Glow",
    "Dermatologist Tested", "Vegan", "No Parabens", "Radiant Glow"
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-gradient-to-b from-background via-[hsl(var(--c-rose)/0.05)] to-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none bg-aurora opacity-30 mix-blend-multiply" />
      
      <div className="flex flex-col gap-6 md:gap-10 relative z-10 w-[200vw] -ml-[50vw]">
        {/* Top Marquee */}
        <div className="whitespace-nowrap flex items-center">
          <div ref={textRef1} className="flex items-center gap-6 md:gap-12">
            {phrases1.map((phrase, i) => (
              <React.Fragment key={`t1-${i}`}>
                <span className="text-[12vw] md:text-[8vw] font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary/40 to-secondary/40 uppercase tracking-tight leading-none px-4">
                  {phrase}
                </span>
                <Star className="w-8 h-8 md:w-12 md:h-12 text-accent/50 fill-accent/50 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Bottom Marquee (Reverse) */}
        <div className="whitespace-nowrap flex items-center">
          <div ref={textRef2} className="flex items-center gap-6 md:gap-12 -ml-[20%]">
            {phrases2.map((phrase, i) => (
              <React.Fragment key={`t2-${i}`}>
                <span className="text-[12vw] md:text-[8vw] font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent/40 to-primary/40 uppercase tracking-tight leading-none px-4">
                  {phrase}
                </span>
                <Star className="w-8 h-8 md:w-12 md:h-12 text-secondary/50 fill-secondary/50 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
