'use client';

import { Eye, Plus, Minus } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import type { MenuItem } from '@/types';

const ingredientEmojis: Record<string, string> = {
  tomate: '🍅', tomato: '🍅', pomodoro: '🍅',
  queso: '🧀', cheese: '🧀', mozzarella: '🧀', parmesano: '🧀', parmesan: '🧀', emmental: '🧀', provolone: '🧀', burrata: '🧀', formaggi: '🧀',
  carne: '🥩', meat: '🥩', res: '🥩', beef: '🥩', solomo: '🥩', cerdo: '🥩', pork: '🥩',
  pollo: '🍗', chicken: '🍗', pechuga: '🍗',
  camarones: '🦐', shrimp: '🦐', gamberi: '🦐', mariscos: '🦐', seafood: '🦐',
  salmón: '🐟', salmon: '🐟', trucha: '🐟', trout: '🐟', pescado: '🐟', fish: '🐟',
  champiñones: '🍄', mushroom: '🍄', hongos: '🍄', portobello: '🍄', funghi: '🍄', setas: '🍄',
  albahaca: '🌿', basil: '🌿', pesto: '🌿', rúgula: '🌿', arugula: '🌿',
  ajo: '🧄', garlic: '🧄',
  aceite: '🫒', olive: '🫒', oliva: '🫒', aceitunas: '🫒', olives: '🫒',
  limón: '🍋', lemon: '🍋',
  huevo: '🥚', egg: '🥚',
  jamón: '🥓', ham: '🥓', tocineta: '🥓', bacon: '🥓', prosciutto: '🥓', chorizo: '🌭',
  pan: '🍞', bread: '🍞',
  café: '☕', coffee: '☕', mascarpone: '☕',
  chocolate: '🍫',
  crema: '🍦', cream: '🍦',
  ají: '🌶️', chili: '🌶️', picante: '🌶️',
  calabacín: '🥒', zucchini: '🥒',
  cebolla: '🧅', onion: '🧅',
  lechuga: '🥬', lettuce: '🥬',
  verduras: '🥗', vegetables: '🥗',
  trufa: '🍄', truffle: '🍄',
  brandy: '🥃', vodka: '🥃',
  alcaparras: '🫒', capers: '🫒',
  atún: '🐟', tuna: '🐟',
  arroz: '🍚', rice: '🍚',
};

function getEmoji(ingredient: string): string {
  const lower = ingredient.toLowerCase();
  for (const [key, emoji] of Object.entries(ingredientEmojis)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
}

function formatIngredients(ingredients: string): { text: string; emoji: string }[] {
  if (!ingredients) return [];
  return ingredients.split(',').map(i => {
    const trimmed = i.trim();
    return { text: trimmed, emoji: getEmoji(trimmed) };
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

interface ProductCardProps {
  item: MenuItem;
  onViewDish: (item: MenuItem) => void;
}

export function ProductCard({ item, onViewDish }: ProductCardProps) {
  const { lang, t } = useLang();
  const { items: cartItems, addItem, updateQuantity } = useCart();
  const ingredients = formatIngredients(lang === 'en' ? item.ingredientsEn : item.ingredientsEs);
  const cartItem = cartItems.find(ci => ci.menuItem.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden flex flex-col h-[270px] md:h-[290px]">
      {/* Placeholder image area */}
      <div className="h-24 md:h-28 bg-dark-lighter flex items-center justify-center relative">
        <span className="text-3xl opacity-30">🍽️</span>
        {item.weight && (
          <span className="absolute top-2 right-2 bg-gold/80 text-dark text-[10px] px-2 py-0.5 rounded-full font-medium">
            {item.weight}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col min-h-0">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-1">{item.name}</h3>

        {ingredients.length > 0 && (
          <p className="text-white/50 text-xs leading-relaxed line-clamp-2 flex-1">
            {ingredients.map((ing, i) => (
              <span key={i}>
                {ing.emoji} {ing.text}
                {i < ingredients.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}

        {/* Price aligned at bottom with ingredients */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gold font-bold text-sm">{formatPrice(item.price)}</span>
            {item.weight && (
              <span className="text-white/30 text-[10px]">{item.weight}</span>
            )}
          </div>

          {/* Action buttons - expanded */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewDish(item)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors text-xs"
            >
              <Eye size={14} />
              {t('Ver plato', 'Vedi piatto', 'View')}
            </button>

            {qty === 0 ? (
              <button
                onClick={() => addItem(item)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold transition-colors text-xs font-medium"
              >
                <Plus size={14} weight="bold" />
                {t('Agregar', 'Aggiungi', 'Add')}
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-dark-lighter rounded-lg">
                <button
                  onClick={() => updateQuantity(cartItem!.cartId, -1)}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs font-bold w-5 text-center">{qty}</span>
                <button
                  onClick={() => updateQuantity(cartItem!.cartId, 1)}
                  className="p-1 rounded bg-gold/20 hover:bg-gold/30 text-gold transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
