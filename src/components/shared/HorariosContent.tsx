'use client';

import { Clock, MapPin, AppleLogo } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { GoogleMapsIcon, WazeIcon } from '@/components/shared/BrandIcons';
import { businessInfo, businessHours, dayKeys, dayNames } from '@/data/businessInfo';

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'p.m.' : 'a.m.';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function HorariosContent() {
  const { lang, t } = useLang();
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{t('Horarios y Ubicación', 'Orari e Posizione', 'Hours & Location')}</h1>

      {/* Hours */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold flex items-center gap-2 mb-6">
          <Clock size={24} className="text-gold" />
          {t('Horarios', 'Orari', 'Hours')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dayKeys.map((key, i) => {
            const sched = businessHours[key];
            const isToday = i === todayIndex;
            const dayName = lang === 'es' ? dayNames.es[i] : lang === 'it' ? dayNames.it[i] : dayNames.en[i];
            return (
              <div
                key={key}
                className={`bg-dark-card border rounded-xl p-5 transition-colors ${
                  isToday ? 'border-gold/50 bg-gold/5' : 'border-dark-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-lg ${isToday ? 'text-gold' : ''}`}>{dayName}</h3>
                  {isToday && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">{t('Hoy', 'Oggi', 'Today')}</span>
                  )}
                </div>
                <p className="text-white/60 text-lg mt-2">
                  {sched?.regular
                    ? `${formatTime(sched.regular.open)} – ${formatTime(sched.regular.close)}`
                    : t('Cerrado', 'Chiuso', 'Closed')}
                </p>
                {sched?.holiday && (
                  <p className="text-white/40 text-sm mt-1">
                    {t('Festivos', 'Festivi', 'Holidays')}: {formatTime(sched.holiday.open)} – {formatTime(sched.holiday.close)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold flex items-center gap-2 mb-6">
          <MapPin size={24} className="text-gold" />
          {t('Ubicación', 'Posizione', 'Location')}
        </h2>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <p className="text-white/80 text-lg mb-2">{businessInfo.address}</p>
          <p className="text-white/50 mb-6">
            {t(`Domicilios a todo ${businessInfo.city}`, `Consegne in tutta ${businessInfo.city}`, `Delivery across ${businessInfo.city}`)}
          </p>

          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">{t('Cómo llegar', 'Come arrivare', 'How to get here')}</h3>
          <div className="flex flex-wrap gap-3">
            <a href={businessInfo.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-dark-lighter rounded-lg text-white/70 hover:text-white transition-colors">
              <GoogleMapsIcon size={18} /> Google Maps
            </a>
            <a href={businessInfo.waze} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-dark-lighter rounded-lg text-white/70 hover:text-white transition-colors">
              <WazeIcon size={18} /> Waze
            </a>
            <a href={businessInfo.appleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-dark-lighter rounded-lg text-white/70 hover:text-white transition-colors">
              <AppleLogo size={18} /> Apple Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
