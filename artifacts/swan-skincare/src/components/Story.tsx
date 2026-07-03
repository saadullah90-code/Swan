import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return undefined;
    const ctx = gsap.context(() => {
      const words = Array.from(textRef.current!.querySelectorAll('.word'));
      gsap.fromTo(words,
        { opacity: 0.1, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "center center",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const text = "Crafted in small batches with uncompromising attention to detail, SWAN serums merge clinical efficacy with a deeply sensory, tactile ritual. The result is unhurried, luminous skin.";

  return (
    <section id="philosophy" ref={containerRef} className="py-32 md:py-48 bg-[#fdfafb] relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <h2 
          ref={textRef} 
          className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3] text-foreground text-center"
        >
          {text.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-2 md:mr-3 lg:mr-4 overflow-hidden py-1">
              <span className="word inline-block">{word}</span>
            </span>
          ))}
        </h2>
        
        <div className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-between gap-12 relative">
          <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-[2rem]">
             <div className="w-full h-full bg-rose-100/50 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(0,0,0,0)_100%)]" />
               <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1000" alt="Texture" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
             </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12 flex flex-col gap-6">
            <span className="text-sm uppercase tracking-widest text-primary font-medium">The Philosophy</span>
            <h3 className="text-3xl md:text-4xl font-serif">Simplicity is the ultimate sophistication.</h3>
            <p className="text-foreground/70 leading-relaxed font-light text-lg">
              We believe skincare shouldn't be a 12-step chore, but a moment of quiet indulgence. Our jewel-like glass vessels protect potent, active ingredients while bringing aesthetic calm to your space.
            </p>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center gap-4 group">
                <span className="text-sm uppercase tracking-widest border-b border-foreground/30 pb-1 group-hover:border-foreground transition-colors">Read the story</span>
                <span className="w-8 h-[1px] bg-foreground group-hover:w-12 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
