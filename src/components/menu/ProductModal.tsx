'use client';

import { X, Plus, Minus } from '@phosphor-icons/react';
import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from './ProductCard';
import type { MenuItem } from '@/types';

const ingredientEmojis: Record<string, string> = {
  tomate: '🍅', queso: '🧀', mozzarella: '🧀', carne: '🥩', pollo: '🍗',
  camarones: '🦐', salmón: '🐟', champiñones: '🍄', albahaca: '🌿',
  ajo: '🧄', aceite: '🫒', limón: '🍋', huevo: '🥚', jamón: '🥓',
  tocineta: '🥓', pan: '🍞', café: '☕', ají: '🌶️', calabacín: '🥒',
  lechuga: '🥬', verduras: '🥗', trufa: '🍄', brandy: '🥃',
  arroz: '🍚', chorizo: '🌭', parmesano: '🧀',
};

function getEmoji(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, emoji] of Object.entries(ingredientEmojis)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
}

interface ProductModalProps {
  item: MenuItem;
  onClose: () => void;
}

export function ProductModal({ item, onClose }: ProductModalProps) {
  const { lang, t } = useLang();
  const { addItem, items: cartItems, updateQuantity } = useCart();
  const [selectedPasta, setSelectedPasta] = useState(item.pastaOptions?.[0] || '');
  const [selectedSauce, setSelectedSauce] = useState(item.sauceOptions?.[0] || '');
  const ingredients = (lang === 'en' ? item.ingredientsEn : item.ingredientsEs).split(',').map(i => i.trim()).filter(Boolean);
  const cartItem = cartItems.find(ci => ci.menuItem.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-dark-card border border-dark-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-dark-card/95 backdrop-blur-sm flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="font-display text-xl font-semibold">{item.name}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Image placeholder */}
        <div className="h-48 bg-dark-lighter flex items-center justify-center relative">
          <span className="text-5xl opacity-30">🍽️</span>
          {item.weight && (
            <span className="absolute top-3 right-3 bg-gold text-dark text-sm px-3 py-1 rounded-full font-medium">{item.weight}</span>
          )}
        </div>

        <div className="p-5 space-y-4">
          {/* Price */}
          <p className="text-gold text-2xl font-bold">{formatPrice(item.price)}</p>

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Ingredientes', 'Ingredienti', 'Ingredients')}</h4>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-dark-lighter px-2.5 py-1 rounded-lg text-sm text-white/70">
                    {getEmoji(ing)} {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pasta options */}
          {item.pastaOptions && (
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Elige tu pasta', 'Scegli la pasta', 'Choose your pasta')}</h4>
              <div className="flex flex-wrap gap-2">
                {item.pastaOptions.map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPasta(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedPasta === p ? 'bg-gold/15 text-gold border border-gold/40' : 'bg-dark-lighter text-white/60 border border-transparent hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauce options */}
          {item.sauceOptions && (
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">{t('Elige tu salsa', 'Scegli la salsa', 'Choose your sauce')}</h4>
              <div className="flex flex-wrap gap-2">
                {item.sauceOptions.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSauce(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedSauce === s ? 'bg-gold/15 text-gold border border-gold/40' : 'bg-dark-lighter text-white/60 border border-transparent hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="flex items-center gap-3 pt-2">
            {qty === 0 ? (
              <button
                onClick={() => addItem(item, selectedPasta || undefined, selectedSauce || undefined)}
                className="flex-1 py-3 bg-gold hover:bg-gold-dark text-dark font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} weight="bold" />
                {t('Agregar al pedido', 'Aggiungi all\'ordine', 'Add to order')}
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-4 py-3 bg-dark-lighter rounded-lg">
                <button onClick={() => updateQuantity(cartItem!.cartId, -1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Minus size={18} />
                </button>
                <span className="text-xl font-bold w-8 text-center">{qty}</span>
                <button onClick={() => updateQuantity(cartItem!.cartId, 1)} className="p-2 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold transition-colors">
                  <Plus size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
