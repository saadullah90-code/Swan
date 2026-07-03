import React, { useState } from 'react';
import { Link } from 'wouter';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'py-3 md:py-4 glossy' : 'py-5 md:py-7 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 hidden md:flex items-center gap-10">
            {['Shop', 'Philosophy', 'Ritual', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.22em] font-medium text-foreground/75 hover:text-[hsl(var(--luxury))] relative group overflow-hidden transition-colors"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[hsl(var(--luxury))] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex justify-start md:justify-center">
            <Link href="/" className="inline-flex">
              <img
                src={logo}
                alt="SWAN"
                className={`transition-all duration-500 object-contain drop-shadow-md ${isScrolled ? 'h-9 md:h-11' : 'h-12 md:h-16'}`}
              />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-3 text-foreground/80 hover:text-[hsl(var(--luxury))] transition-colors group"
            >
              <span className="hidden md:block text-[11px] uppercase tracking-[0.22em] font-medium">Bag</span>
              <div id="cart-fly-target" className="relative">
                <ShoppingBag strokeWidth={1.5} size={20} className="group-hover:scale-110 transition-transform" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[hsl(var(--luxury))] text-white flex items-center justify-center text-[9px] font-bold shadow-lg shadow-primary/30 animate-in zoom-in">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </button>
            <button
              className="md:hidden text-foreground/80 hover:text-[hsl(var(--luxury))] active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-aurora opacity-50" />

        <button
          className="absolute top-6 right-6 p-2 text-foreground/80 hover:text-[hsl(var(--luxury))] active:scale-90 transition-transform z-10 glass rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X strokeWidth={1.5} size={24} />
        </button>

        <div className="relative h-full flex flex-col justify-center items-center gap-8 px-6">
          <Sparkles className="w-8 h-8 text-primary/40 mb-4 animate-pulse" />
          {['Shop', 'Philosophy', 'Ritual', 'Reviews', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl sm:text-5xl font-display font-medium text-foreground hover:text-[hsl(var(--luxury))] transition-all duration-300"
              style={{
                transitionDelay: `${i * 50}ms`,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
