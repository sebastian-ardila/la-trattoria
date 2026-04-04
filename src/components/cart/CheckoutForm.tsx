'use client';

import { useState } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/components/menu/ProductCard';
import { businessInfo } from '@/data/businessInfo';

const paymentMethods = ['Transferencia', 'Tarjeta', 'Efectivo'];
const orderTypes = ['En mesa', 'Domicilio'];

export function CheckoutForm() {
  const { t } = useLang();
  const { items, totalPrice, clearCart, setCartOpen, setCartStep } = useCart();
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');
  const [orderType, setOrderType] = useState('');
  const [tried, setTried] = useState(false);

  const isValid = name.trim() !== '' && payment !== '' && orderType !== '';

  const handleSubmit = () => {
    setTried(true);
    if (!isValid) return;

    const lines = [
      `🍽️ *Pedido - La Trattoria*`,
      '',
      `👤 *Cliente:* ${name}`,
      `💳 *Pago:* ${payment}`,
      `📍 *Tipo:* ${orderType}`,
      '',
      `📋 *Detalle del pedido:*`,
      '',
      ...items.map(item => {
        let line = `${item.quantity}x ${item.menuItem.name}`;
        if (item.selectedPasta) line += ` (${item.selectedPasta})`;
        if (item.selectedSauce) line += ` - Salsa: ${item.selectedSauce}`;
        line += ` — ${formatPrice(item.menuItem.price * item.quantity)}`;
        return line;
      }),
      '',
      `💰 *Total: ${formatPrice(totalPrice)}*`,
    ];

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${businessInfo.phone.replace(/\+|\s/g, '')}?text=${message}`;
    window.open(url, '_blank');
    clearCart();
    setCartOpen(false);
    setCartStep(1);
  };

  return (
    <div className="p-5 space-y-5">
      {/* Name */}
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${tried && !name.trim() ? 'text-orange-400' : 'text-white/70'}`}>
          {t('Nombre', 'Nome', 'Name')} *
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="name"
          placeholder={t('Tu nombre', 'Il tuo nome', 'Your name')}
          className={`w-full bg-dark-lighter rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
            tried && !name.trim() ? 'border border-orange-500/60' : 'border border-dark-border focus:border-gold/50'
          }`}
        />
        {tried && !name.trim() && <p className="text-orange-400 text-xs mt-1">{t('Ingresa tu nombre', 'Inserisci il tuo nome', 'Enter your name')}</p>}
      </div>

      {/* Payment */}
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${tried && !payment ? 'text-orange-400' : 'text-white/70'}`}>
          {t('Método de pago', 'Metodo di pagamento', 'Payment method')} *
        </label>
        <div className="flex flex-wrap gap-2">
          {paymentMethods.map(m => (
            <button
              key={m}
              onClick={() => setPayment(m)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                payment === m
                  ? 'bg-gold/15 text-gold border border-gold/40'
                  : `bg-dark-lighter text-white/60 hover:text-white ${tried && !payment ? 'border border-orange-500/30' : 'border border-transparent'}`
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {tried && !payment && <p className="text-orange-400 text-xs mt-1">{t('Selecciona un método de pago', 'Seleziona un metodo di pagamento', 'Select a payment method')}</p>}
      </div>

      {/* Order type */}
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${tried && !orderType ? 'text-orange-400' : 'text-white/70'}`}>
          {t('Tipo de pedido', 'Tipo di ordine', 'Order type')} *
        </label>
        <div className="flex flex-wrap gap-2">
          {orderTypes.map(o => (
            <button
              key={o}
              onClick={() => setOrderType(o)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                orderType === o
                  ? 'bg-gold/15 text-gold border border-gold/40'
                  : `bg-dark-lighter text-white/60 hover:text-white ${tried && !orderType ? 'border border-orange-500/30' : 'border border-transparent'}`
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        {tried && !orderType && <p className="text-orange-400 text-xs mt-1">{t('Selecciona un tipo de pedido', 'Seleziona un tipo di ordine', 'Select an order type')}</p>}
      </div>

      {/* Order summary card */}
      <div className="bg-dark-lighter rounded-xl p-4">
        <h4 className="text-sm font-medium text-white/50 mb-2">{t('Resumen', 'Riepilogo', 'Summary')}</h4>
        <div className="space-y-1">
          {items.map(item => (
            <div key={item.cartId} className="flex justify-between text-sm">
              <span className="text-white/70">{item.quantity}x {item.menuItem.name}</span>
              <span className="text-white/50">{formatPrice(item.menuItem.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-dark-border">
          <span>Total</span>
          <span className="text-gold">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className={`w-full py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
          isValid
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gold/30 text-white/40 cursor-not-allowed'
        }`}
      >
        <WhatsappLogo size={22} weight="fill" />
        {t('Enviar pedido por WhatsApp', 'Invia ordine via WhatsApp', 'Send order via WhatsApp')}
      </button>
      {tried && !isValid && (
        <p className="text-orange-400 text-xs text-center">{t('Completa los campos requeridos', 'Completa i campi richiesti', 'Complete required fields')}</p>
      )}
    </div>
  );
}
