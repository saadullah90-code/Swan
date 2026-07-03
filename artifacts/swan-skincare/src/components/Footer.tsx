import React from 'react';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#06070A] pt-32 pb-12 relative border-t border-white/10 z-50 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-4">
            <img src={logo} alt="SWAN" className="w-32 object-contain mb-8 filter brightness-0 invert" />
            <p className="text-white/50 font-sans text-sm max-w-xs leading-relaxed">
              Elevating the daily ritual. High-performance, clinically proven skincare formulated for visible results.
            </p>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-white mb-6">Discover</h4>
            <ul className="space-y-4 font-sans text-sm text-white/60">
              <li><a href="#shop" className="hover:text-white transition-colors">The Collection</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Our Philosophy</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-white mb-6">Support</h4>
            <ul className="space-y-4 font-sans text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Returns</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-4 glass-card p-8 rounded-3xl border border-white/10">
            <h4 className="font-display font-medium text-white mb-4 text-xl">The Inner Circle</h4>
            <p className="text-sm font-sans text-white/60 mb-6 leading-relaxed">Subscribe for early access to new formulations and exclusive rituals.</p>
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
              />
              <button type="submit" className="absolute right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs font-sans text-white/40">
          <p>© {new Date().getFullYear()} SWAN Skincare. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="mt-4 md:mt-0 font-medium text-white/60">Developed by BranX</p>
        </div>
      </div>
    </footer>
  );
}
