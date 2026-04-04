'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { MenuItem, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, pasta?: string, sauce?: string) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartStep: 1 | 2;
  setCartStep: (step: 1 | 2) => void;
}

const CartContext = createContext<CartContextType | null>(null);

function buildCartId(item: MenuItem, pasta?: string, sauce?: string) {
  return `${item.id}${pasta ? `-${pasta}` : ''}${sauce ? `-${sauce}` : ''}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<1 | 2>(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('la-trattoria-cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('la-trattoria-cart', JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: MenuItem, pasta?: string, sauce?: string) => {
    const cartId = buildCartId(item, pasta, sauce);
    setItems(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1, selectedPasta: pasta, selectedSauce: sauce, cartId }];
    });
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, delta: number) => {
    setItems(prev => {
      return prev.map(i => {
        if (i.cartId !== cartId) return i;
        const newQty = i.quantity + delta;
        return newQty <= 0 ? null : { ...i, quantity: newQty };
      }).filter(Boolean) as CartItem[];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCartStep(1);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, isCartOpen, setCartOpen, cartStep, setCartStep,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
