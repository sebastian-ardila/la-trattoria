'use client';

import { useState } from 'react';
import { PaperPlaneTilt, Storefront, Package, Handshake, CalendarStar, Cake, DotsThree } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import type { Icon } from '@phosphor-icons/react';

interface ReasonOption {
  id: string;
  labelEs: string;
  labelIt: string;
  labelEn: string;
  icon: Icon;
}

const reasons: ReasonOption[] = [
  { id: 'franquicia', labelEs: 'Franquicia', labelIt: 'Franchising', labelEn: 'Franchise', icon: Storefront },
  { id: 'proveedor', labelEs: 'Proveedor', labelIt: 'Fornitore', labelEn: 'Supplier', icon: Package },
  { id: 'colaboracion', labelEs: 'Colaboración', labelIt: 'Collaborazione', labelEn: 'Collaboration', icon: Handshake },
  { id: 'eventos', labelEs: 'Eventos', labelIt: 'Eventi', labelEn: 'Events', icon: CalendarStar },
  { id: 'cumpleanos', labelEs: 'Cumpleaños', labelIt: 'Compleanno', labelEn: 'Birthday', icon: Cake },
  { id: 'otros', labelEs: 'Otros', labelIt: 'Altro', labelEn: 'Other', icon: DotsThree },
];

export function ContactForm() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const isValid = name.trim() !== '' && email.trim() !== '' && reason !== '' && message.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!isValid) return;
    setSent(true);
  };

  if (sent) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <div className="bg-dark-card border border-dark-border rounded-xl p-10">
          <PaperPlaneTilt size={48} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold mb-2">{t('Mensaje enviado', 'Messaggio inviato', 'Message sent')}</h2>
          <p className="text-white/60">{t('Gracias por contactarnos. Te responderemos pronto.', 'Grazie per averci contattato. Ti risponderemo presto.', 'Thank you for reaching out. We\'ll get back to you soon.')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{t('Contacto', 'Contatto', 'Contact')}</h1>

      <form noValidate onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-xl p-6">
        {/* Top row: Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
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

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${tried && !email.trim() ? 'text-orange-400' : 'text-white/70'}`}>
              {t('Correo electrónico', 'Email', 'Email')} *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              placeholder={t('tu@email.com', 'tuo@email.com', 'your@email.com')}
              className={`w-full bg-dark-lighter rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                tried && !email.trim() ? 'border border-orange-500/60' : 'border border-dark-border focus:border-gold/50'
              }`}
            />
            {tried && !email.trim() && <p className="text-orange-400 text-xs mt-1">{t('Ingresa tu correo', 'Inserisci la tua email', 'Enter your email')}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">
              {t('Teléfono', 'Telefono', 'Phone')} <span className="text-white/40">({t('opcional', 'opzionale', 'optional')})</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="+57 300 000 0000"
              className="w-full bg-dark-lighter rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none border border-dark-border focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        {/* Reason chips */}
        <div className="mb-5">
          <label className={`block text-sm font-medium mb-2 ${tried && !reason ? 'text-orange-400' : 'text-white/70'}`}>
            {t('Motivo de contacto', 'Motivo del contatto', 'Reason for contact')} *
          </label>
          <div className="flex flex-wrap gap-2">
            {reasons.map(r => {
              const isSelected = reason === r.id;
              const IconComp = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setReason(r.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm transition-all ${
                    isSelected
                      ? 'bg-gold/15 text-gold border border-gold/40 font-medium'
                      : `bg-dark-lighter text-white/60 hover:text-white hover:bg-white/10 ${tried && !reason ? 'border border-orange-500/30' : 'border border-transparent'}`
                  }`}
                >
                  <IconComp size={16} weight={isSelected ? 'fill' : 'regular'} />
                  {t(r.labelEs, r.labelIt, r.labelEn)}
                </button>
              );
            })}
          </div>
          {tried && !reason && <p className="text-orange-400 text-xs mt-1.5">{t('Selecciona un motivo', 'Seleziona un motivo', 'Select a reason')}</p>}
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className={`block text-sm font-medium mb-1.5 ${tried && !message.trim() ? 'text-orange-400' : 'text-white/70'}`}>
            {t('Mensaje', 'Messaggio', 'Message')} *
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t('Escribe tu mensaje...', 'Scrivi il tuo messaggio...', 'Write your message...')}
            rows={5}
            className={`w-full bg-dark-lighter rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-colors resize-none ${
              tried && !message.trim() ? 'border border-orange-500/60' : 'border border-dark-border focus:border-gold/50'
            }`}
          />
          {tried && !message.trim() && <p className="text-orange-400 text-xs mt-1">{t('Ingresa tu mensaje', 'Inserisci il tuo messaggio', 'Enter your message')}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
            isValid ? 'bg-gold hover:bg-gold-dark text-dark' : 'bg-gold/30 text-white/40 cursor-not-allowed'
          }`}
        >
          <PaperPlaneTilt size={20} weight="fill" />
          {t('Enviar mensaje', 'Invia messaggio', 'Send message')}
        </button>
        {tried && !isValid && (
          <p className="text-orange-400 text-xs text-center mt-2">{t('Completa los campos requeridos', 'Completa i campi richiesti', 'Complete required fields')}</p>
        )}
      </form>
    </section>
  );
}
