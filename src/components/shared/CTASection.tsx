'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
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
    <section className="my-10 mx-4 md:mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background food image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="./cta-bg.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
          aria-hidden="true"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60 md:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Content - left-aligned on desktop, centered on mobile */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 px-6 md:px-10 py-10 md:py-14">
          {/* Left side: text */}
          <div className="text-center md:text-left max-w-lg">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <Image
                src="./trattoria-logo.webp"
                alt="La Trattoria"
                width={48}
                height={48}
                className="rounded-full w-10 h-10 md:w-12 md:h-12"
              />
              <h3 className="font-display text-2xl md:text-3xl font-semibold">La Trattoria</h3>
            </div>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 md:mb-0">
              {t(
                'Descubre el auténtico sabor de Italia. Te esperamos con los mejores platos, preparados con pasión y los ingredientes más frescos.',
                'Scopri il vero sapore dell\'Italia. Ti aspettiamo con i migliori piatti, preparati con passione e gli ingredienti più freschi.',
                'Discover the authentic taste of Italy. We\'re waiting for you with the best dishes, prepared with passion and the freshest ingredients.'
              )}
            </p>
          </div>

          {/* Right side: buttons */}
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 bg-gold hover:bg-gold-dark text-dark font-bold rounded-xl transition-colors text-base md:text-lg shadow-lg shadow-gold/20"
            >
              {t('Ver carta', 'Vedi menu', 'View menu')}
              <ArrowRight size={20} weight="bold" />
            </Link>
            <Link
              href={secondaryHref}
              className="flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold rounded-xl transition-colors text-base md:text-lg border border-white/20"
            >
              {t(secondaryLabel, secondaryLabelIt, secondaryLabelEn)}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
