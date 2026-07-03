import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/store/useCartStore';

import haBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_49_PM-Photoroom_1783077232627.png';
import vcBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_37_36_PM-Photoroom_1783077232628.png';
import rBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

const products: Product[] = [
  {
    id: 'ha-serum',
    name: 'Hyaluronic Acid Serum',
    subtitle: 'Deep Hydration & Plump Skin',
    description: 'A multi-molecular weight hyaluronic acid complex that penetrates deep into the epidermis, delivering lasting hydration and visible plumpness.',
    price: 68,
    size: '30ml / 1.01 fl. oz',
    image: haBottle,
    colorType: 'blue'
  },
  {
    id: 'vc-serum',
    name: 'Vitamin C Serum',
    subtitle: 'Brightening & Antioxidant',
    description: 'A potent 15% L-ascorbic acid formula stabilized with ferulic acid. Dramatically brightens complexion and defends against environmental stressors.',
    price: 72,
    size: '30ml / 1.01 fl. oz',
    image: vcBottle,
    colorType: 'pink'
  },
  {
    id: 'retinol-serum',
    name: 'Retinol Serum',
    subtitle: 'Anti-Aging & Skin Renewal',
    description: 'Micro-encapsulated retinol blended with soothing botanicals to accelerate cellular turnover without the typical irritation.',
    price: 76,
    size: '30ml / 1.01 fl. oz',
    image: rBottle,
    colorType: 'rose'
  }
];

export default function Products() {
  return (
    <section id="shop" className="py-32 bg-[#fdfafb] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">The Core Collection</h2>
          <p className="text-lg text-foreground/60 font-light">
            Everything your skin needs. Nothing it doesn't. Three essential serums designed to work in harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
