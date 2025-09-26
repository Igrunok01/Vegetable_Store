import { useState } from 'react';
import type { Product, CartItem } from '../../types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        const updated = { ...exist };
        updated.quantity += quantity;
        return prev.map((p) => (p.id === product.id ? updated : p));
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const getItemQuantity = (id: number): number => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const setItemQuantity = (id: number, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  };

  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.quantity * i.price, 0);

  const inc = (id: number) =>
    setCart((prev) => {
      const clicked = prev.find((p) => p.id === id);
      if (clicked) {
        const updated = { ...clicked, quantity: clicked.quantity + 1 };
        return prev.map((p) => (p.id === id ? updated : p));
      }
      return prev;
    });

  const dec = (id: number) =>
    setCart((prev) => {
      const clicked = prev.find((p) => p.id === id);
      if (clicked) {
        const updated = { ...clicked, quantity: clicked.quantity - 1 };
        return updated.quantity > 0
          ? prev.map((p) => (p.id === id ? updated : p))
          : prev.filter((p) => p.id !== id);
      }
      return prev;
    });

  return {
    cart,
    addToCart,
    count,
    total,
    inc,
    dec,
    getItemQuantity,
    setItemQuantity,
  };
}
