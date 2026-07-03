import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCartStore, Product } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore(state => state.addItem);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const glowColor = 
    product.colorType === 'blue' ? 'rgba(147, 197, 253, 0.4)' :
    product.colorType === 'pink' ? 'rgba(249, 168, 212, 0.4)' :
    'rgba(251, 113, 133, 0.4)';

  return (
    <motion.div 
      ref={cardRef}
      style={{ y, opacity }}
      className={`relative w-full max-w-sm mx-auto group ${index % 2 === 1 ? 'md:mt-32' : ''}`}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0"
        style={{ backgroundColor: glowColor }}
      />
      
      <div className="relative z-10 p-8 rounded-[2.5rem] bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-xl overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-6 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-foreground/50 ml-1">(128)</span>
        </div>

        {/* Product Image */}
        <div className="relative aspect-[4/5] flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-[80%] h-auto object-contain drop-shadow-xl relative z-10 transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 relative z-20">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">{product.subtitle}</span>
          <h3 className="font-serif text-2xl leading-tight">{product.name}</h3>
          <p className="text-sm text-foreground/60 font-light mt-2 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5">
            <div className="flex flex-col">
              <span className="text-xl font-medium">${product.price}</span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/40">{product.size}</span>
            </div>
            
            <button 
              onClick={() => addItem(product)}
              className="w-12 h-12 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300 group/btn"
            >
              <Plus className="group-hover/btn:rotate-90 transition-transform duration-300" strokeWidth={1.5} size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
