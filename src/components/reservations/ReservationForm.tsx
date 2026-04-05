'use client';

import { useState, useRef } from 'react';
import { Plus, Minus, CalendarBlank, Sun, CloudSun, Moon, WhatsappLogo, MapPin, Clock, AppleLogo } from '@phosphor-icons/react';
import { useLang } from '@/context/LanguageContext';
import { GoogleMapsIcon, WazeIcon } from '@/components/shared/BrandIcons';
import { businessInfo, businessHours, dayKeys, dayNames } from '@/data/businessInfo';

function getTimeSlots(open: string, close: string): string[] {
  const slots: string[] = [];
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  let current = oh * 60 + om;
  const end = ch * 60 + cm;
  while (current < end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    current += 30;
  }
  return slots;
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'p.m.' : 'a.m.';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatDateDisplay(dateStr: string, lang: 'es' | 'it' | 'en'): string {
  const date = new Date(dateStr + 'T12:00:00');
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const locale = lang === 'es' ? 'es-CO' : lang === 'it' ? 'it-IT' : 'en-US';
  const formatted = date.toLocaleDateString(locale, options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function ReservationForm() {
  const { lang, t } = useLang();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [tried, setTried] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Get available times for selected date
  const getDaySchedule = () => {
    if (!date) return null;
    const d = new Date(date + 'T12:00:00');
    const dayIndex = (d.getDay() + 6) % 7; // Monday = 0
    const dayKey = dayKeys[dayIndex];
    return businessHours[dayKey];
  };

  const schedule = getDaySchedule();
  const isClosed = schedule && !schedule.regular;
  const hasHolidayHours = schedule?.holiday != null;
  const timeSlots = schedule?.regular ? getTimeSlots(schedule.regular.open, schedule.regular.close) : [];

  const morningSlots = timeSlots.filter(s => parseInt(s) < 12);
  const afternoonSlots = timeSlots.filter(s => parseInt(s) >= 12 && parseInt(s) < 18);
  const eveningSlots = timeSlots.filter(s => parseInt(s) >= 18);

  const isValid = name.trim() !== '' && date !== '' && time !== '' && !isClosed;

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    try {
      input.showPicker();
    } catch {
      input.focus();
      input.click();
    }
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    // Reset time if no longer valid
    const d = new Date(newDate + 'T12:00:00');
    const dayIndex = (d.getDay() + 6) % 7;
    const dayKey = dayKeys[dayIndex];
    const newSchedule = businessHours[dayKey];
    if (!newSchedule?.regular) {
      setTime('');
      return;
    }
    const newSlots = getTimeSlots(newSchedule.regular.open, newSchedule.regular.close);
    if (!newSlots.includes(time)) setTime('');
  };

  const handleSubmit = () => {
    setTried(true);
    if (!isValid) return;

    const lines = [
      `🍽️ *Reserva - La Trattoria*`,
      '',
      `👤 *Nombre:* ${name}`,
      `👥 *Personas:* ${people}`,
      `📅 *Fecha:* ${formatDateDisplay(date, lang)}`,
      `🕐 *Hora:* ${formatTime(time)}`,
      comments ? `💬 *Comentarios:* ${comments}` : '',
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${businessInfo.phone.replace(/\+|\s/g, '')}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{t('Reservar Mesa', 'Prenota un Tavolo', 'Reserve a Table')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
          {/* Hours card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Clock size={20} className="text-gold" />
              {t('Horarios', 'Orari', 'Hours')}
            </h3>

            {/* Regular hours */}
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">{t('Horario regular', 'Orario regolare', 'Regular hours')}</p>
            <div className="space-y-1.5 text-sm mb-4">
              {dayKeys.map((key, i) => {
                const sched = businessHours[key];
                const dayName = lang === 'es' ? dayNames.es[i] : lang === 'it' ? dayNames.it[i] : dayNames.en[i];
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-white/60">{dayName}</span>
                    <span className="text-white/80">
                      {sched?.regular ? `${formatTime(sched.regular.open)} – ${formatTime(sched.regular.close)}` : t('Cerrado', 'Chiuso', 'Closed')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Holiday hours */}
            <div className="border-t border-dark-border pt-3">
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">{t('Horario festivos', 'Orario festivi', 'Holiday hours')}</p>
              <div className="space-y-1.5 text-sm">
                {dayKeys.map((key, i) => {
                  const sched = businessHours[key];
                  if (!sched?.holiday) return null;
                  const dayName = lang === 'es' ? dayNames.es[i] : lang === 'it' ? dayNames.it[i] : dayNames.en[i];
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-white/60">{dayName}</span>
                      <span className="text-gold/80 text-xs">{formatTime(sched.holiday.open)} – {formatTime(sched.holiday.close)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <MapPin size={20} className="text-gold" />
              {t('Ubicación', 'Posizione', 'Location')}
            </h3>
            <p className="text-white/60 text-sm mb-4">{businessInfo.address}</p>
            <div className="space-y-2">
              <a href={businessInfo.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-dark-lighter rounded-lg text-sm text-white/70 hover:text-white transition-colors">
                <GoogleMapsIcon size={16} /> Google Maps
              </a>
              <a href={businessInfo.waze} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-dark-lighter rounded-lg text-sm text-white/70 hover:text-white transition-colors">
                <WazeIcon size={16} /> Waze
              </a>
              <a href={businessInfo.appleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-dark-lighter rounded-lg text-sm text-white/70 hover:text-white transition-colors">
                <AppleLogo size={16} /> Apple Maps
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <form noValidate onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-6">
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

            {/* People counter */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-white/70">{t('Personas', 'Ospiti', 'Guests')}</label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setPeople(Math.max(1, people - 1))} className="p-2 rounded-lg bg-dark-lighter border border-dark-border hover:bg-white/10 transition-colors">
                  <Minus size={18} />
                </button>
                <span className="text-2xl font-bold w-10 text-center">{people}</span>
                <button type="button" onClick={() => setPeople(people + 1)} className="p-2 rounded-lg bg-dark-lighter border border-dark-border hover:bg-white/10 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Date picker */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${tried && !date ? 'text-orange-400' : 'text-white/70'}`}>
                {t('Fecha', 'Data', 'Date')} *
              </label>
              <div className={`relative flex items-center gap-2 px-4 py-3 rounded-lg text-left w-full transition-colors cursor-pointer ${
                  isClosed
                    ? 'bg-dark-lighter border border-orange-500/50 text-orange-400'
                    : tried && !date
                      ? 'bg-dark-lighter border border-orange-500/60 text-white/60'
                      : 'bg-dark-lighter border border-dark-border text-white/60 hover:border-gold/50'
                }`}>
                <input
                  ref={dateInputRef}
                  type="date"
                  min={today}
                  value={date}
                  onChange={e => handleDateChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <CalendarBlank size={20} />
                {date ? (
                  <span className="text-white">{formatDateDisplay(date, lang)}</span>
                ) : (
                  <span>{t('Seleccionar fecha', 'Seleziona data', 'Select date')}</span>
                )}
              </div>
              {tried && !date && <p className="text-orange-400 text-xs mt-1">{t('Selecciona una fecha', 'Seleziona una data', 'Select a date')}</p>}
              {isClosed && <p className="text-orange-400 text-xs mt-1">{t('No hay servicio este día. Selecciona otra fecha.', 'Nessun servizio oggi. Seleziona un\'altra data.', 'No service this day. Select another date.')}</p>}
              {!isClosed && hasHolidayHours && date && schedule?.holiday && (
                <p className="text-gold/80 text-xs mt-1.5 bg-gold/5 px-3 py-1.5 rounded-lg">
                  {t(
                    `En festivos el horario es ${formatTime(schedule.holiday.open)} – ${formatTime(schedule.holiday.close)}`,
                    `Nei giorni festivi l'orario è ${formatTime(schedule.holiday.open)} – ${formatTime(schedule.holiday.close)}`,
                    `On holidays, hours are ${formatTime(schedule.holiday.open)} – ${formatTime(schedule.holiday.close)}`
                  )}
                </p>
              )}
            </div>

            {/* Time chips */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${tried && !time && date && !isClosed ? 'text-orange-400' : 'text-white/70'}`}>
                {t('Hora', 'Ora', 'Time')} *
              </label>
              {!date ? (
                <button type="button" onClick={openDatePicker} className="px-4 py-3 rounded-lg bg-dark-lighter border border-dark-border text-white/40 text-sm w-full text-left">
                  {t('Selecciona una fecha primero', 'Seleziona prima una data', 'Select a date first')}
                </button>
              ) : isClosed ? (
                <p className="text-orange-400 text-sm">{t('No hay horarios disponibles para este día', 'Nessun orario disponibile per questo giorno', 'No times available for this day')}</p>
              ) : (
                <div className="space-y-4">
                  {morningSlots.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-white/40 uppercase tracking-wider mb-2">
                        <Sun size={14} /> {t('Mañana', 'Mattina', 'Morning')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {morningSlots.map(s => (
                          <button key={s} type="button" onClick={() => setTime(s)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${time === s ? 'bg-gold/15 text-gold border border-gold/40' : 'bg-dark-lighter text-white/60 border border-transparent hover:text-white'}`}>
                            {formatTime(s)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {afternoonSlots.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-white/40 uppercase tracking-wider mb-2">
                        <CloudSun size={14} /> {t('Tarde', 'Pomeriggio', 'Afternoon')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {afternoonSlots.map(s => (
                          <button key={s} type="button" onClick={() => setTime(s)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${time === s ? 'bg-gold/15 text-gold border border-gold/40' : 'bg-dark-lighter text-white/60 border border-transparent hover:text-white'}`}>
                            {formatTime(s)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {eveningSlots.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-white/40 uppercase tracking-wider mb-2">
                        <Moon size={14} /> {t('Noche', 'Sera', 'Evening')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {eveningSlots.map(s => (
                          <button key={s} type="button" onClick={() => setTime(s)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${time === s ? 'bg-gold/15 text-gold border border-gold/40' : 'bg-dark-lighter text-white/60 border border-transparent hover:text-white'}`}>
                            {formatTime(s)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {tried && !time && date && !isClosed && <p className="text-orange-400 text-xs mt-1">{t('Selecciona una hora', 'Seleziona un\'ora', 'Select a time')}</p>}
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-white/70">{t('Comentarios adicionales', 'Commenti aggiuntivi', 'Additional comments')}</label>
              <textarea
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder={t('Alergias, celebraciones, peticiones especiales...', 'Allergie, celebrazioni, richieste speciali...', 'Allergies, celebrations, special requests...')}
                rows={3}
                className="w-full bg-dark-lighter rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none border border-dark-border focus:border-gold/50 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                isValid ? 'bg-gold hover:bg-gold-dark text-dark' : 'bg-gold/30 text-white/40 cursor-not-allowed'
              }`}
            >
              <WhatsappLogo size={22} weight="fill" />
              {t('Enviar reserva por WhatsApp', 'Invia prenotazione via WhatsApp', 'Send reservation via WhatsApp')}
            </button>
            {tried && !isValid && (
              <p className="text-orange-400 text-xs text-center">{t('Completa los campos requeridos', 'Completa i campi richiesti', 'Complete required fields')}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
