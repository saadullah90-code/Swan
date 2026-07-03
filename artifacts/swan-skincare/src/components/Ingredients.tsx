import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const ctx = gsap.context(() => {
      if (imageRef1.current) {
        gsap.fromTo(imageRef1.current,
          { y: -50 },
          {
            y: 50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      if (imageRef2.current) {
        gsap.fromTo(imageRef2.current,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-[#fdfafb] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          <div className="w-full md:w-1/2 flex flex-col gap-8 order-2 md:order-1 relative z-10">
            <span className="text-sm uppercase tracking-widest text-primary font-medium">The Elements</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Sourced from nature.<br />
              <span className="italic text-primary/80">Refined by science.</span>
            </h2>
            <p className="text-lg text-foreground/70 font-light max-w-md leading-relaxed">
              We travel the globe to source the most potent, ethically harvested botanicals. These raw elements are then cold-pressed and micro-encapsulated in our Parisian laboratory to preserve their transformative power.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-8 border-t border-foreground/10 pt-8">
              <div>
                <h4 className="font-serif text-xl mb-2">Vegan</h4>
                <p className="text-sm text-foreground/60">100% plant-derived ingredients.</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Cruelty-Free</h4>
                <p className="text-sm text-foreground/60">Never tested on animals.</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Non-Toxic</h4>
                <p className="text-sm text-foreground/60">Free from parabens & sulfates.</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Sustainable</h4>
                <p className="text-sm text-foreground/60">Ethically sourced materials.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative order-1 md:order-2 h-[600px]">
            <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10">
              <img 
                ref={imageRef1}
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000" 
                alt="Botanical ingredients" 
                className="w-full h-[120%] object-cover object-center scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-20">
              <img 
                ref={imageRef2}
                src="https://images.unsplash.com/photo-1608248593842-8021b181db5c?auto=format&fit=crop&q=80&w=1000" 
                alt="Laboratory formulation" 
                className="w-full h-[120%] object-cover object-center scale-110"
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full z-0 pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
