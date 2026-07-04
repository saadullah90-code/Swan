import React, { useState } from 'react';
import { Link } from 'wouter';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, X, Sparkles, Search, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import logo from '@assets/optimized/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.webp';

const navLinks = ['Shop', 'Philosophy', 'Ritual', 'Contact'];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] px-3 sm:px-5 pt-3 md:pt-5">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`header-pill relative rounded-full flex items-center justify-between transition-all duration-500 px-4 sm:px-6 md:px-8 ${
              isScrolled
                ? 'is-scrolled py-2.5 md:py-3'
                : 'py-3 md:py-4'
            }`}
          >
            {/* Left — desktop nav */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group text-[11px] uppercase tracking-[0.22em] font-medium text-[hsl(40_40%_92%)]/80 hover:text-[hsl(36_62%_70%)] transition-colors"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[hsl(36_62%_66%)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* Left — mobile hamburger */}
            <button
              className="md:hidden text-[hsl(40_40%_92%)]/90 hover:text-[hsl(36_62%_70%)] active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu strokeWidth={1.6} size={22} />
            </button>

            {/* Center — prominent swan logo (overflows the pill) */}
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex"
              aria-label="SWAN Skincare — home"
            >
              <img
                src={logo}
                alt="SWAN Skincare"
                className={`object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-500 ${
                  isScrolled ? 'h-16 md:h-[4.5rem]' : 'h-[4.5rem] md:h-24'
                }`}
              />
            </Link>

            {/* Right — icons */}
            <div className="flex items-center justify-end gap-4 sm:gap-5 md:gap-6 flex-1">
              <button
                className="hidden sm:inline-flex text-[hsl(40_40%_92%)]/85 hover:text-[hsl(36_62%_70%)] transition-colors"
                aria-label="Search"
              >
                <Search strokeWidth={1.6} size={19} />
              </button>
              <button
                className="hidden sm:inline-flex text-[hsl(40_40%_92%)]/85 hover:text-[hsl(36_62%_70%)] transition-colors"
                aria-label="Wishlist"
              >
                <Heart strokeWidth={1.6} size={19} />
              </button>
              <button
                onClick={toggleCart}
                className="relative text-[hsl(40_40%_92%)]/90 hover:text-[hsl(36_62%_70%)] transition-colors group"
                aria-label="Open bag"
              >
                <div id="cart-fly-target" className="relative">
                  <ShoppingBag
                    strokeWidth={1.6}
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[hsl(36_62%_58%)] text-[hsl(344_50%_12%)] flex items-center justify-center text-[9px] font-bold shadow-lg animate-in zoom-in">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
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
          aria-label="Close menu"
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
                opacity: isMobileMenuOpen ? 1 : 0,
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
