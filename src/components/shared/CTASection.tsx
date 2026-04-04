'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

interface CTASectionProps {
  secondaryLabel: string;
  secondaryLabelIt: string;
  secondaryLabelEn: string;
  secondaryHref: string;
}

export function CTASection({ secondaryLabel, secondaryLabelIt, secondaryLabelEn, secondaryHref }: CTASectionProps) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden my-8 mx-4 md:mx-auto max-w-7xl rounded-2xl border border-dark-border">
      {/* Background food image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="./cta-bg.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Content */}
      <div className="relative z-10 px-6 py-16 text-center">
        <h3 className="font-display text-2xl font-semibold mb-2">La Trattoria</h3>
        <p className="text-white/60 text-base mb-8 font-light">
          {t('Explora todo lo que tenemos para ti', 'Scopri tutto ciò che abbiamo per te', 'Explore everything we have for you')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-gold hover:bg-gold-dark text-dark font-semibold rounded-lg transition-colors"
          >
            {t('Ver carta', 'Vedi menu', 'View menu')}
          </Link>
          <Link
            href={secondaryHref}
            className="px-8 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors hover:bg-white/5"
          >
            {t(secondaryLabel, secondaryLabelIt, secondaryLabelEn)}
          </Link>
        </div>
      </div>
    </section>
  );
}
