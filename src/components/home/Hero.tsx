'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AppleLogo, GoogleLogo } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { businessInfo } from '@/data/businessInfo';
import { TripAdvisorIcon, WazeIcon, GoogleMapsIcon } from '@/components/shared/BrandIcons';

export function Hero() {
  const { t } = useLang();

  const scrollToMenu = () => {
    const el = document.getElementById('carta');
    if (!el) return;
    const navbar = document.querySelector('nav');
    const offset = navbar ? navbar.offsetHeight + 16 : 80;
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="./trattoria-logo.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="./video-hero.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Blurred dark circle behind ALL content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full bg-black/70 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="./trattoria-logo.webp"
            alt="La Trattoria"
            width={500}
            height={261}
            className="drop-shadow-2xl w-[340px] md:w-[440px]"
            priority
          />
        </div>

        {/* Taglines as small description */}
        <p className="text-white/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-1">
          {businessInfo.tagline}
        </p>
        <p className="text-white/45 text-[11px] md:text-xs italic mb-8">
          {businessInfo.tagline2}
        </p>

        {/* Opinion buttons */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <a
            href={businessInfo.tripadvisor}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-green-100/60 hover:text-green-100/90 hover:bg-white/15 transition-all text-xs"
          >
            <TripAdvisorIcon size={14} />
            TripAdvisor
          </a>
          <a
            href={businessInfo.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-blue-100/60 hover:text-blue-100/90 hover:bg-white/15 transition-all text-xs"
          >
            <GoogleLogo size={14} />
            Google
          </a>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="px-8 py-3 bg-accent-light hover:bg-accent text-white font-semibold rounded-lg transition-colors text-lg"
          >
            {t('Ver nuestra carta', 'Scopri il nostro menu', 'View our menu')}
          </button>
          <Link
            href="/reservas"
            className="px-8 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors text-lg hover:bg-white/5"
          >
            {t('Reservar mesa', 'Prenota un tavolo', 'Reserve a table')}
          </Link>
        </div>

        {/* How to get here - subtle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href={businessInfo.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors text-[11px]"
          >
            <GoogleMapsIcon size={11} />
            Google Maps
          </a>
          <span className="text-white/15">|</span>
          <a
            href={businessInfo.waze}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors text-[11px]"
          >
            <WazeIcon size={11} />
            Waze
          </a>
          <span className="text-white/15">|</span>
          <a
            href={businessInfo.appleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors text-[11px]"
          >
            <AppleLogo size={11} />
            Apple Maps
          </a>
        </div>
      </div>
    </section>
  );
}
