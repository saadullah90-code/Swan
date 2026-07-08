import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  size: string;
  colorType: 'blue' | 'pink' | 'rose';
  /* Rich detail used on the product page (optional) */
  tagline?: string;
  longDescription?: string;
  benefits?: string[];
  howToUse?: string[];
  keyIngredients?: { name: string; desc: string }[];
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
    set({ isOpen: true });
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  updateQuantity: (id, quantity) => {
    if (quantity === 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
  toggleCart: () => set({ isOpen: !get().isOpen }),
  clearCart: () => set({ items: [] }),
}));
