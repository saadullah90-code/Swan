import React from 'react';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#f5f0f1] pt-32 pb-12 overflow-hidden border-t border-black/5">
      {/* Decorative large background text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-bold text-black/5 whitespace-nowrap pointer-events-none select-none mt-10">
        SWAN
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="col-span-1 lg:col-span-1 flex flex-col justify-between">
            <img src={logo} alt="SWAN" className="w-32 object-contain mb-8 mix-blend-darken" />
            <p className="text-sm text-foreground/60 font-light max-w-xs">
              Elevating the daily ritual. Formulated in Paris, loved globally.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ingredients</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-serif text-lg mb-6">The Atelier</h4>
            <p className="text-sm text-foreground/70 font-light mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground transition-colors pr-10"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-foreground/10 text-xs text-foreground/40">
          <p>© {new Date().getFullYear()} SWAN Skincare. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
          <p className="mt-4 md:mt-0 italic font-serif">Developed by BranX</p>
        </div>
      </div>
    </footer>
  );
}
