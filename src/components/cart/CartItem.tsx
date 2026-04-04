'use client';

import { Plus, Minus, Trash } from '@phosphor-icons/react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/components/menu/ProductCard';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="bg-dark-lighter rounded-xl p-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.menuItem.name}</h4>
        {item.selectedPasta && (
          <p className="text-white/40 text-xs">{item.selectedPasta}</p>
        )}
        {item.selectedSauce && (
          <p className="text-white/40 text-xs">Salsa: {item.selectedSauce}</p>
        )}
        <p className="text-gold text-sm font-medium mt-0.5">{formatPrice(item.menuItem.price * item.quantity)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.cartId, -1)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.cartId, 1)}
          className="p-1.5 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold transition-colors"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => removeItem(item.cartId)}
          className="p-1.5 rounded-lg hover:bg-orange-500/20 text-white/30 hover:text-orange-400 transition-colors ml-1"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}
