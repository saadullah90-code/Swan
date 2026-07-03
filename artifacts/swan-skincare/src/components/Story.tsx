import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Text stagger reveal
      const words = Array.from(textRef.current!.querySelectorAll('.word'));
      gsap.fromTo(words, 
        { opacity: 0, y: 40, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Visual element float
      gsap.to(visualRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="py-24 md:py-40 bg-background relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--c-sky)/0.1)] to-[hsl(var(--c-rose)/0.1)] opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Visual Side */}
        <div className="w-full lg:w-1/2 relative aspect-square max-w-md mx-auto" ref={visualRef}>
          <div className="absolute inset-0 bg-[hsl(var(--c-violet)/0.2)] blur-[100px] rounded-full" />
          <div className="glass-heavy w-full h-full rounded-[3rem] p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-aurora opacity-40 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Promise</span>
              <h3 className="font-display text-3xl md:text-4xl mt-4 font-medium leading-tight">Crafted for the delicate moments.</h3>
            </div>
            <div className="relative z-10 text-sm font-light text-foreground/70 leading-relaxed">
              We source the rarest botanicals and pair them with clinical-grade actives. No compromises, no shortcuts. Just pure, luminous results.
            </div>
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -top-8 -right-8 w-24 h-24 glass rounded-full flex items-center justify-center text-primary shadow-lg shadow-primary/20 animate-bounce" style={{animationDuration: '4s'}}>
            <span className="text-xs font-bold uppercase tracking-widest text-center">100%<br/>Vegan</span>
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-foreground leading-[1.1] perspective-[1000px]"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2">
              {"Uncompromising attention to detail.".split(' ').map((word, i) => (
                <span key={i} className="word inline-block origin-bottom">{word}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 mt-2 md:mt-4">
              <span className="word inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent origin-bottom">Unhurried</span>
              <span className="word inline-block origin-bottom">rituals.</span>
            </div>
          </h2>
          
          <p className="mt-8 md:mt-12 text-base md:text-lg font-light text-foreground/70 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
            Your skin is a living canvas. We treat it with the reverence it deserves. Every drop of our serum is formulated in Paris to transform your daily routine into a moment of pure indulgence.
          </p>
        </div>
      </div>
    </section>
  );
}
