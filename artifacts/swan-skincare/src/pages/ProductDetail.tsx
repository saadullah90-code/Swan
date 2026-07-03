import React, { useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { ArrowLeft, Plus, Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { getProduct, products } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { flyToCart } from '@/lib/flyToCart';

const accentVar = (colorType: string) =>
  colorType === 'blue' ? '--c-sky' : colorType === 'pink' ? '--c-rose' : '--c-peach';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const product = id ? getProduct(id) : undefined;
  const addItem = useCartStore((s) => s.addItem);
  const [, navigate] = useLocation();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 bg-background text-foreground text-center px-6">
        <h1 className="font-display text-4xl font-semibold">Product not found</h1>
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-widest border-b border-foreground pb-1 hover:text-[hsl(var(--luxury))] hover:border-[hsl(var(--luxury))] transition-colors"
        >
          Back to collection
        </Link>
      </div>
    );
  }

  const accent = accentVar(product.colorType);
  const others = products.filter((p) => p.id !== product.id);

  const handleAdd = () => {
    if (imgRef.current) flyToCart(product.image, imgRef.current.getBoundingClientRect());
    window.setTimeout(() => addItem(product), 750);
  };

  return (
    <div className="bg-background min-h-[100dvh] text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
      <Header />
      <CartDrawer />

      <main className="relative z-10 pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60 hover:text-[hsl(var(--luxury))] transition-colors"
          >
            <ArrowLeft size={16} /> Back to collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-8 items-start">
            {/* Image */}
            <div className="relative rounded-[2.5rem] glass p-8 md:p-12 flex items-center justify-center min-h-[420px] md:min-h-[560px] luxury-shadow md:sticky md:top-28 overflow-hidden">
              <div
                className="absolute inset-0 blur-3xl opacity-40 rounded-full mix-blend-multiply"
                style={{ background: `hsl(var(${accent}))` }}
              />
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                className="relative z-10 max-h-[380px] md:max-h-[460px] object-contain drop-shadow-2xl"
                draggable={false}
              />
              <span className="absolute bottom-6 right-6 z-20 grid place-items-center w-16 h-16 rounded-full bg-foreground text-background text-xs font-semibold tracking-wide rotate-[-8deg]">
                {product.size}
              </span>
            </div>

            {/* Info */}
            <div>
              <span
                className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-4 block"
                style={{ color: `hsl(var(${accent}))` }}
              >
                {product.subtitle}
              </span>
              <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.02] mb-5">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="flex text-[hsl(var(--c-amber))]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
                <span className="text-xs font-medium text-foreground/60">
                  4.9 · 2,400+ reviews
                </span>
              </div>

              <p className="text-lg md:text-xl font-display font-medium text-luxury mb-4">
                {product.tagline}
              </p>
              <p className="text-base font-light text-foreground/70 leading-relaxed mb-8 max-w-lg">
                {product.longDescription}
              </p>

              <div className="flex items-center gap-6 mb-10">
                <span className="font-sans text-3xl font-medium">${product.price}</span>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold bg-[hsl(var(--luxury))] text-white px-8 py-4 rounded-full hover:brightness-110 transition active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Add to bag
                </button>
              </div>

              {/* Benefits */}
              {product.benefits && (
                <div className="mb-10">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/50 mb-4">
                    Why you'll love it
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="grid place-items-center w-6 h-6 rounded-full bg-[hsl(var(--luxury)/0.1)] text-[hsl(var(--luxury))] shrink-0 mt-0.5">
                          <Check size={13} strokeWidth={2.5} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key ingredients */}
              {product.keyIngredients && (
                <div className="mb-10">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/50 mb-4">
                    Key ingredients
                  </h3>
                  <div className="flex flex-col gap-3">
                    {product.keyIngredients.map((ing) => (
                      <div key={ing.name} className="glass rounded-2xl px-5 py-4">
                        <p className="font-display font-medium text-foreground">{ing.name}</p>
                        <p className="text-sm font-light text-foreground/60">{ing.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to use */}
              {product.howToUse && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/50 mb-4">
                    How to use
                  </h3>
                  <ol className="flex flex-col gap-4">
                    {product.howToUse.map((step, i) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="grid place-items-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/80 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Complete the ritual */}
          <div className="mt-28 md:mt-36">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-center mb-12">
              Complete the ritual
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {others.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="glass rounded-[2rem] p-8 flex items-center gap-6 luxury-shadow hover:-translate-y-2 transition-transform duration-500 cursor-pointer group"
                >
                  <div className="relative w-24 h-28 flex items-center justify-center shrink-0">
                    <div
                      className="absolute inset-0 blur-2xl opacity-40 rounded-full mix-blend-multiply"
                      style={{ background: `hsl(var(${accentVar(p.colorType)}))` }}
                    />
                    <img
                      src={p.image}
                      alt={p.name}
                      className="relative z-10 h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground/50 mb-1">
                      {p.subtitle}
                    </p>
                    <h3 className="font-display text-xl font-medium mb-1">{p.name}</h3>
                    <span className="font-sans font-medium">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
