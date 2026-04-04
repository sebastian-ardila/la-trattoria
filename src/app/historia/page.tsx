import { HistoriaContent } from '@/components/shared/HistoriaContent';
import { CTASection } from '@/components/shared/CTASection';

export default function HistoriaPage() {
  return (
    <>
      <HistoriaContent />
      <CTASection secondaryLabel="Reservar" secondaryLabelIt="Prenota" secondaryLabelEn="Reserve" secondaryHref="/reservas" />
    </>
  );
}
