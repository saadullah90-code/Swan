import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Sparkles, SunMoon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Cleanse & Prep",
    desc: "Start with a blank canvas. Gently wash away impurities to allow our active ingredients to penetrate deeply.",
    icon: Droplets,
    color: "text-[hsl(var(--c-sky))]",
    bg: "bg-[hsl(var(--c-sky)/0.1)]",
  },
  {
    num: "02",
    title: "Apply the Serum",
    desc: "Dispense 3-4 drops into your palms. Press gently into face and neck. Feel the immediate luminous surge.",
    icon: Sparkles,
    color: "text-[hsl(var(--c-rose))]",
    bg: "bg-[hsl(var(--c-rose)/0.1)]",
  },
  {
    num: "03",
    title: "Seal the Glow",
    desc: "Follow with your favorite moisturizer to lock in hydration. Radiant, plump skin from morning to night.",
    icon: SunMoon,
    color: "text-[hsl(var(--c-peach))]",
    bg: "bg-[hsl(var(--c-peach)/0.1)]",
  }
];

export default function Routine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ritual" className="py-24 md:py-32 bg-white relative z-10 overflow-hidden border-y border-foreground/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">How to use</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold">The Daily Ritual</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent z-0" />

          {steps.map((step, i) => (
            <div 
              key={step.num}
              ref={el => { cardsRef.current[i] = el; }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-full ${step.bg} flex items-center justify-center mb-8 relative glass shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className={`w-10 h-10 ${step.color}`} strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-sans">
                  {step.num}
                </div>
              </div>
              <h3 className="font-display text-2xl font-medium mb-4">{step.title}</h3>
              <p className="text-sm font-light text-foreground/70 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
