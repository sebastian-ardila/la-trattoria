'use client';

import { ShoppingCart } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/components/menu/ProductCard';

export function FloatingCartBar() {
  const { t } = useLang();
  const { totalItems, totalPrice, setCartOpen, isCartOpen } = useCart();

  if (totalItems === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 flex justify-center">
      <button
        onClick={() => setCartOpen(true)}
        className="flex items-center gap-3 px-4 py-2.5 bg-accent-light hover:bg-accent text-white text-sm font-medium rounded-full shadow-lg shadow-black/40 transition-colors"
      >
        <div className="relative">
          <ShoppingCart size={18} weight="bold" />
          <span className="absolute -top-1.5 -right-2 bg-white text-accent-light text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </div>
        <span>{t('Ver carrito', 'Vedi carrello', 'View cart')}</span>
        <span className="border-l border-white/30 pl-3 font-bold">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
}
