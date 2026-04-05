'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, CaretRight, CalendarBlank, Clock, BookOpen, Envelope } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';

const pageMap: Record<string, { iconEl: typeof House; labelEs: string; labelIt: string; labelEn: string }> = {
  '/reservas': { iconEl: CalendarBlank, labelEs: 'Reservas', labelIt: 'Prenotazioni', labelEn: 'Reservations' },
  '/horarios': { iconEl: Clock, labelEs: 'Horarios y Ubicación', labelIt: 'Orari e Posizione', labelEn: 'Hours & Location' },
  '/historia': { iconEl: BookOpen, labelEs: 'Historia', labelIt: 'Storia', labelEn: 'History' },
  '/contacto': { iconEl: Envelope, labelEs: 'Contacto', labelIt: 'Contatto', labelEn: 'Contact' },
};

export function Breadcrumb() {
  const pathname = usePathname();
  const { t, localePath } = useLang();
  const pathWithoutLang = pathname.replace(/^\/(es|it|en)/, '');
  const page = pageMap[pathWithoutLang];

  if (!page) return null;

  return (
    <div className="sticky top-16 z-40 bg-dark/95 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-sm text-white/60">
        <Link href={localePath('/')} className="flex items-center gap-1 hover:text-white transition-colors">
          <House size={16} />
          {t('Inicio', 'Home', 'Home')}
        </Link>
        <CaretRight size={12} />
        <span className="flex items-center gap-1 text-white/90">
          <page.iconEl size={16} />
          {t(page.labelEs, page.labelIt, page.labelEn)}
        </span>
      </div>
    </div>
  );
}
