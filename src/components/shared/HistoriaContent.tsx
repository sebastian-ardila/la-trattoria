'use client';

import { useLang } from '@/context/LanguageContext';

export function HistoriaContent() {
  const { t } = useLang();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{t('Nuestra Historia', 'La Nostra Storia', 'Our Story')}</h1>

      <div className="space-y-6 text-white/70 leading-relaxed">
        <p className="text-lg">
          {t(
            'La Trattoria nació de un sueño: llevar los sabores auténticos de Italia a la ciudad de Pereira. Lo que comenzó como una pequeña cocina con recetas familiares se ha convertido en un referente de la gastronomía italiana en el Eje Cafetero.',
            'La Trattoria è nata da un sogno: portare gli autentici sapori dell\'Italia nella città di Pereira. Quello che è iniziato come una piccola cucina con ricette di famiglia è diventato un punto di riferimento della gastronomia italiana nell\'Eje Cafetero.',
            'La Trattoria was born from a dream: to bring the authentic flavors of Italy to the city of Pereira. What started as a small kitchen with family recipes has become a benchmark for Italian cuisine in the Coffee Region.'
          )}
        </p>

        <p>
          {t(
            'Cada plato que servimos cuenta una historia. Nuestras pastas son artesanales, preparadas a diario con los mejores ingredientes. Nuestras pizzas, horneadas en horno de leña, llevan el sello de la tradición napolitana. Y nuestros cortes premium, cocinados sobre piedra volcánica a más de 400°C, son una experiencia única que solo encontrarás en La Trattoria.',
            'Ogni piatto che serviamo racconta una storia. Le nostre paste sono artigianali, preparate ogni giorno con i migliori ingredienti. Le nostre pizze, cotte nel forno a legna, portano il sigillo della tradizione napoletana. E i nostri tagli premium, cucinati su pietra vulcanica a oltre 400°C, sono un\'esperienza unica che troverai solo a La Trattoria.',
            'Every dish we serve tells a story. Our pastas are handmade, prepared daily with the finest ingredients. Our pizzas, baked in a wood-fired oven, carry the seal of Neapolitan tradition. And our premium cuts, cooked on volcanic stone at over 400°C, are a unique experience you\'ll only find at La Trattoria.'
          )}
        </p>

        <p>
          {t(
            'Creemos que la buena comida va más allá del plato. Es la calidez del servicio, el ambiente que envuelve cada mesa y la pasión que ponemos en cada detalle. En La Trattoria no solo vienes a comer — vienes a vivir Italia.',
            'Crediamo che il buon cibo vada oltre il piatto. È il calore del servizio, l\'atmosfera che avvolge ogni tavolo e la passione che mettiamo in ogni dettaglio. A La Trattoria non vieni solo a mangiare — vieni a vivere l\'Italia.',
            'We believe great food goes beyond the plate. It\'s the warmth of the service, the atmosphere that surrounds every table, and the passion we put into every detail. At La Trattoria, you don\'t just come to eat — you come to experience Italy.'
          )}
        </p>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6 mt-8">
          <p className="font-display text-xl italic text-center text-white/80">
            &ldquo;{t(
              'La vera cucina italiana, nel cuore della Colombia.',
              'La vera cucina italiana, nel cuore della Colombia.',
              'True Italian cuisine, in the heart of Colombia.'
            )}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
