import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    text: "The Retinol serum completely changed my skin texture. It feels like a luxurious spa treatment every night.",
    author: "Sophie M.",
    role: "Verified Buyer",
    color: "from-[hsl(var(--c-rose)/0.15)] to-transparent"
  },
  {
    text: "I've never used a Vitamin C so potent yet so gentle. The glow is instant and lasts all day.",
    author: "Elena R.",
    role: "Verified Buyer",
    color: "from-[hsl(var(--c-peach)/0.15)] to-transparent"
  },
  {
    text: "Hyaluronic Acid that actually sinks in instead of sitting on top. My holy grail hydration step.",
    author: "Claire D.",
    role: "Verified Buyer",
    color: "from-[hsl(var(--c-sky)/0.15)] to-transparent"
  }
];

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
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
    <section ref={sectionRef} id="reviews" className="py-24 md:py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          
          <div className="w-full md:w-1/3 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-10">
              <div data-bottle-slot="4" className="w-28 sm:w-36 aspect-[0.72]" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[hsl(var(--luxury))] font-medium mb-4 block">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-6">Loved by radiant faces.</h2>
            <p className="text-base font-light text-foreground/70 mb-8 max-w-sm mx-auto md:mx-0">
              Don't just take our word for it. Discover what our community has to say about the SWAN experience.
            </p>
            <button className="text-sm font-semibold uppercase tracking-widest border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
              Read all reviews
            </button>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {reviews.map((review, i) => (
              <div 
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className={`glass p-8 md:p-10 rounded-3xl relative overflow-hidden ${i % 2 !== 0 ? 'md:ml-12' : 'md:mr-12'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${review.color} opacity-50`} />
                <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                <div className="relative z-10">
                  <p className="text-lg md:text-xl font-display font-medium leading-relaxed mb-6">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-serif font-bold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{review.author}</h4>
                      <span className="text-xs text-foreground/50">{review.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
