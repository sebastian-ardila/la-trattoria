'use client';

import Image from 'next/image';
import { InstagramLogo, FacebookLogo, WhatsappLogo, MapPin, NavigationArrow } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { businessInfo } from '@/data/businessInfo';
import { assetPath } from '@/utils/basePath';
import { TripAdvisorIcon, GoogleMapsIcon } from '@/components/shared/BrandIcons';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Col 1: Logo + Info */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <Image src={assetPath('/trattoria-logo.webp')} alt="La Trattoria" width={48} height={48} className="rounded-full" />
            <div>
              <h3 className="font-display text-lg font-semibold">La Trattoria</h3>
              <p className="text-white/50 text-sm italic">{businessInfo.tagline}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-white/60 text-sm">
            <MapPin size={18} className="shrink-0 mt-0.5" />
            <p>{businessInfo.address}</p>
          </div>
          <p className="text-white/50 text-sm flex items-center gap-2">
            <NavigationArrow size={16} />
            {t(`Domicilios a todo ${businessInfo.city}`, `Consegne in tutta ${businessInfo.city}`, `Delivery across ${businessInfo.city}`)}
          </p>
        </div>

        {/* Col 2: Horarios */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-center md:text-left">{t('Horarios', 'Orari', 'Hours')}</h4>
          <div className="space-y-2">
            <div className="bg-dark-lighter rounded-lg p-3 text-sm">
              <p className="text-white/80 font-medium">{t('Lunes a Jueves', 'Lunedì a Giovedì', 'Monday to Thursday')}</p>
              <p className="text-white/50">12:00 p.m. – 10:00 p.m.</p>
            </div>
            <div className="bg-dark-lighter rounded-lg p-3 text-sm">
              <p className="text-white/80 font-medium">{t('Viernes y Sábado', 'Venerdì e Sabato', 'Friday & Saturday')}</p>
              <p className="text-white/50">12:00 p.m. – 11:00 p.m.</p>
            </div>
            <div className="bg-dark-lighter rounded-lg p-3 text-sm">
              <p className="text-white/80 font-medium">{t('Domingo', 'Domenica', 'Sunday')}</p>
              <p className="text-white/50">12:00 p.m. – 5:00 p.m.</p>
            </div>
            <div className="border-t border-dark-border pt-2 mt-2">
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('Festivos', 'Festivi', 'Holidays')}</p>
              <div className="bg-dark-lighter rounded-lg p-3 text-sm">
                <p className="text-white/80 font-medium">{t('Lunes festivos', 'Lunedì festivi', 'Holiday Mondays')}</p>
                <p className="text-white/50">12:00 p.m. – 5:00 p.m.</p>
              </div>
              <div className="bg-dark-lighter rounded-lg p-3 text-sm mt-1.5">
                <p className="text-white/80 font-medium">{t('Martes a Viernes festivos', 'Martedì a Venerdì festivi', 'Tuesday to Friday holidays')}</p>
                <p className="text-white/50">12:00 p.m. – 9:00 p.m.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Social */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-center md:text-left">{t('Síguenos', 'Seguici', 'Follow Us')}</h4>
          <div className="space-y-3">
            <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
              <InstagramLogo size={22} />
              {businessInfo.instagramHandle}
            </a>
            <a href={businessInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
              <FacebookLogo size={22} />
              {businessInfo.facebookHandle}
            </a>
            <a href={businessInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
              <WhatsappLogo size={22} />
              {businessInfo.whatsappDisplay}
            </a>
            <a href={businessInfo.tripadvisor} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
              <TripAdvisorIcon size={22} />
              TripAdvisor
            </a>
            <a href={businessInfo.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
              <GoogleMapsIcon size={22} />
              Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>La Trattoria &copy; {new Date().getFullYear()} {t('Todos los derechos reservados', 'Tutti i diritti riservati', 'All rights reserved')}.</p>
          <p>
            {t('Sitio web creado por', 'Sito web creato da', 'Website created by')}{' '}
            <a href="https://sebastianardila.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              sebastianardila.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
