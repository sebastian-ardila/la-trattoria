'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from '@phosphor-icons/react';
import { useLang, type Lang } from '@/context/LanguageContext';
import type { Icon } from '@phosphor-icons/react';

interface NavItem {
  href: string;
  iconEl: Icon;
  labelEs: string;
  labelIt: string;
  labelEn: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const langFlags: { code: Lang; flag: string; label: string }[] = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
];

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const { lang, setLang, t, localePath } = useLang();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-dark flex flex-col">
      <div className="flex items-center justify-between px-6 h-16 border-b border-dark-border">
        <span className="font-display text-xl font-semibold">La Trattoria</span>
        <button onClick={onClose} className="p-2 text-white/70 hover:text-white" aria-label="Close menu">
          <X size={28} />
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2 px-6">
        {navItems.map(item => {
          const isActive = pathname === localePath(item.href);
          return (
            <Link
              key={item.href}
              href={localePath(item.href)}
              onClick={onClose}
              className={`flex items-center gap-4 px-4 py-5 text-xl transition-colors ${
                isActive ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              <item.iconEl size={28} weight={isActive ? 'fill' : 'regular'} />
              {t(item.labelEs, item.labelIt, item.labelEn)}
            </Link>
          );
        })}

        {/* Language flags */}
        <div className="flex items-center gap-3 px-4 pt-6 mt-4 border-t border-dark-border">
          {langFlags.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => { setLang(code); onClose(); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base transition-all ${
                lang === code
                  ? 'text-white bg-white/10'
                  : 'text-white/40 grayscale hover:text-white/60'
              }`}
            >
              <span className="text-xl">{flag}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
