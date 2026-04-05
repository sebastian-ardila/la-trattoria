'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  List,
  CalendarBlank,
  Clock,
  BookOpen,
  Envelope,
  ShoppingCart,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { useLang, type Lang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { assetPath } from '@/utils/basePath';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { href: '/reservas', iconEl: CalendarBlank, labelEs: 'Reservas', labelIt: 'Prenotazioni', labelEn: 'Reservations' },
  { href: '/horarios', iconEl: Clock, labelEs: 'Horarios', labelIt: 'Orari', labelEn: 'Hours' },
  { href: '/historia', iconEl: BookOpen, labelEs: 'Historia', labelIt: 'Storia', labelEn: 'History' },
  { href: '/contacto', iconEl: Envelope, labelEs: 'Contacto', labelIt: 'Contatto', labelEn: 'Contact' },
];

const langFlags: { code: Lang; flag: string }[] = [
  { code: 'es', flag: '🇪🇸' },
  { code: 'it', flag: '🇮🇹' },
  { code: 'en', flag: '🇬🇧' },
];

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t, localePath } = useLang();
  const { totalItems, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={localePath('/')} className="flex items-center gap-2 shrink-0">
            <Image src={assetPath('/trattoria-logo.webp')} alt="La Trattoria" width={40} height={40} className="rounded-full" />
            <span className="font-display text-lg font-semibold hidden sm:block">La Trattoria</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0">
            {navItems.map(item => {
              const isActive = pathname === localePath(item.href);
              return (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  className={`flex items-center gap-1.5 px-4 py-4 text-sm transition-colors relative ${
                    isActive
                      ? 'text-gold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <item.iconEl size={18} weight={isActive ? 'fill' : 'regular'} />
                  {t(item.labelEs, item.labelIt, item.labelEn)}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language flags */}
            <div className="flex items-center gap-0.5">
              {langFlags.map(({ code, flag }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    lang === code
                      ? 'bg-white/10 text-white'
                      : 'text-white/30 grayscale opacity-60 hover:opacity-90 hover:text-white/50'
                  }`}
                  aria-label={code.toUpperCase()}
                >
                  <span className="text-sm leading-none">{flag}</span>
                  <span className="uppercase">{code}</span>
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
              aria-label={t('Carrito', 'Carrello', 'Cart')}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-dark text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} />

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
