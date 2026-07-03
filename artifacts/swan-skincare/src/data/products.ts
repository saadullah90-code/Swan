import { Product } from '@/store/useCartStore';

import haBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_49_PM-Photoroom_1783077232627.png';
import vcBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_37_36_PM-Photoroom_1783077232628.png';
import retinolBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

export const products: Product[] = [
  {
    id: 'ha-serum',
    name: 'Hyaluronic Serum',
    subtitle: 'Deep Hydration',
    description: 'Multi-molecular weight hydration.',
    price: 68,
    size: '30ml',
    image: haBottle,
    colorType: 'blue',
    tagline: 'Quench, plump, and hold moisture where skin needs it most.',
    longDescription:
      'A featherlight elixir layering five molecular weights of hyaluronic acid so hydration reaches every depth of the skin. The result is a bouncy, dewy, glass-like finish that lasts from morning ritual to midnight.',
    benefits: [
      'Up to 72 hours of continuous hydration',
      'Visibly plumps fine lines and texture',
      'Strengthens the moisture barrier',
      'Weightless, non-sticky finish',
    ],
    howToUse: [
      'Cleanse and leave skin slightly damp.',
      'Press 3–4 drops into face and neck.',
      'Follow with moisturiser to seal.',
    ],
    keyIngredients: [
      { name: 'Penta-Hyaluronic Acid', desc: 'Five weights for multi-depth hydration.' },
      { name: 'Panthenol (B5)', desc: 'Soothes and reinforces the barrier.' },
      { name: 'Polyglutamic Acid', desc: 'Locks moisture at the surface.' },
    ],
  },
  {
    id: 'retinol-serum',
    name: 'Retinol Serum',
    subtitle: 'Skin Renewal',
    description: 'Micro-encapsulated overnight renewal.',
    price: 76,
    size: '30ml',
    image: retinolBottle,
    colorType: 'rose',
    tagline: 'Overnight renewal for firmer, smoother, luminous skin.',
    longDescription:
      'Time-released micro-encapsulated retinol works while you sleep to accelerate cell turnover — softening lines, refining texture and restoring bounce, all buffered to stay gentle on delicate skin.',
    benefits: [
      'Smooths fine lines and wrinkles',
      'Refines pores and uneven texture',
      'Boosts firmness and elasticity',
      'Encapsulated for low irritation',
    ],
    howToUse: [
      'Use PM only, on clean dry skin.',
      'Apply 2–3 drops, avoiding eye area.',
      'Always wear SPF the next morning.',
    ],
    keyIngredients: [
      { name: 'Encapsulated Retinol', desc: 'Time-released potency, less irritation.' },
      { name: 'Bakuchiol', desc: 'Plant-based retinol companion.' },
      { name: 'Squalane', desc: 'Cushions and comforts skin.' },
    ],
  },
  {
    id: 'vc-serum',
    name: 'Vitamin C Serum',
    subtitle: 'Brightening',
    description: 'Potent 15% L-ascorbic acid.',
    price: 72,
    size: '30ml',
    image: vcBottle,
    colorType: 'pink',
    tagline: 'A potent daily dose of radiance and antioxidant defence.',
    longDescription:
      'A stabilised 15% L-ascorbic acid serum that brightens, evens tone and shields skin from environmental stress. Skin looks visibly more luminous, clear and awake with every use.',
    benefits: [
      'Visibly brightens and evens tone',
      'Fades dark spots over time',
      'Antioxidant environmental defence',
      'Boosts natural collagen support',
    ],
    howToUse: [
      'Use AM on clean skin.',
      'Apply 3–4 drops before moisturiser.',
      'Layer SPF for full protection.',
    ],
    keyIngredients: [
      { name: '15% L-Ascorbic Acid', desc: 'Pure, potent brightening vitamin C.' },
      { name: 'Vitamin E', desc: 'Stabilises and amplifies results.' },
      { name: 'Ferulic Acid', desc: 'Extends antioxidant protection.' },
    ],
  },
];

export const getProduct = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
