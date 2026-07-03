import React from 'react';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

export default function Footer() {
  return (
    <footer id="contact" className="bg-background pt-32 pb-12 relative border-t border-foreground/5 z-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <img src={logo} alt="SWAN" className="w-40 object-contain mb-8" />
            <p className="text-foreground/60 font-light text-sm max-w-xs">
              Elevating the daily ritual. Quiet luxury for luminous skin.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Discover</h4>
            <ul className="space-y-3 font-light text-sm text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">The Collection</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Our Philosophy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Support</h4>
            <ul className="space-y-3 font-light text-sm text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Newsletter</h4>
            <p className="text-sm font-light text-foreground/70 mb-4">Subscribe for exclusive updates.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-foreground/10 text-xs font-light text-foreground/50">
          <p>© {new Date().getFullYear()} SWAN Skincare.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
          <p className="mt-4 md:mt-0 italic font-serif text-foreground/60">Developed by BranX</p>
        </div>
      </div>
    </footer>
  );
}
