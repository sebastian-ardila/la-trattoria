'use client';

import { X, Trash, ArrowLeft } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CartItem } from './CartItem';
import { CheckoutForm } from './CheckoutForm';
import { formatPrice } from '@/components/menu/ProductCard';

export function CartDrawer() {
  const { t } = useLang();
  const { items, isCartOpen, setCartOpen, cartStep, setCartStep, clearCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" onClick={() => setCartOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-dark-card border-l border-dark-border flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
          {cartStep === 2 ? (
            <button onClick={() => setCartStep(1)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              {t('Volver', 'Indietro', 'Back')}
            </button>
          ) : (
            <h2 className="font-display text-xl font-semibold">{t('Tu Pedido', 'Il Tuo Ordine', 'Your Order')}</h2>
          )}
          <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cartStep === 1 ? (
            items.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/40 text-lg">{t('Tu pedido está vacío', 'Il tuo ordine è vuoto', 'Your order is empty')}</p>
              </div>
            ) : (
              <div className="p-5 space-y-3">
                {items.map(item => (
                  <CartItem key={item.cartId} item={item} />
                ))}
              </div>
            )
          ) : (
            <CheckoutForm />
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && cartStep === 1 && (
          <div className="border-t border-dark-border p-5 space-y-3">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-gold">{formatPrice(totalPrice)}</span>
            </div>
            <button
              onClick={() => setCartStep(2)}
              className="w-full py-3 bg-gold hover:bg-gold-dark text-dark font-semibold rounded-lg transition-colors"
            >
              {t('Continuar', 'Continua', 'Continue')}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-white/40 hover:text-gold/80 transition-colors text-sm"
            >
              <Trash size={16} />
              {t('Eliminar tu pedido', 'Elimina il tuo ordine', 'Delete your order')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
