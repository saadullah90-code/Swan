import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.footer-fade', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="bg-foreground text-background pt-24 md:pt-32 pb-10 relative overflow-hidden z-50">
      {/* Background colorful glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[hsl(var(--c-rose))] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[hsl(var(--c-violet))] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-24">
          
          <div className="lg:col-span-4 footer-fade">
            <img src={logo} alt="SWAN" className="w-32 md:w-40 object-contain mb-6 md:mb-8 brightness-0 invert" />
            <p className="text-background/70 font-light text-sm md:text-base max-w-sm leading-relaxed">
              Elevating the daily ritual. Quiet luxury for luminous, vibrant skin. Formulated with uncompromising standards.
            </p>
          </div>
          
          <div className="lg:col-span-2 footer-fade">
            <h4 className="font-display font-medium text-lg md:text-xl mb-6 text-white">Discover</h4>
            <ul className="space-y-4 font-light text-sm text-background/70">
              <li><a href="#shop" className="hover:text-primary transition-colors">The Collection</a></li>
              <li><a href="#philosophy" className="hover:text-primary transition-colors">Our Philosophy</a></li>
              <li><a href="#ritual" className="hover:text-primary transition-colors">The Ritual</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2 footer-fade">
            <h4 className="font-display font-medium text-lg md:text-xl mb-6 text-white">Support</h4>
            <ul className="space-y-4 font-light text-sm text-background/70">
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-4 footer-fade">
            <h4 className="font-display font-medium text-lg md:text-xl mb-4 text-white">The Atelier Club</h4>
            <p className="text-sm font-light text-background/70 mb-6">Subscribe for exclusive updates, early access to new launches, and skincare secrets.</p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-24 text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-white placeholder:text-white/40"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest font-semibold bg-white text-foreground px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs font-light text-background/50 footer-fade">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} SWAN Skincare. All rights reserved.</p>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="italic font-display text-background/60 text-sm">Developed by BranX</p>
        </div>
      </div>
    </footer>
  );
}
