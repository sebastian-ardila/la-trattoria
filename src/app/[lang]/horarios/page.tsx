import { HorariosContent } from '@/components/shared/HorariosContent';
import { CTASection } from '@/components/shared/CTASection';

export default function HorariosPage() {
  return (
    <>
      <HorariosContent />
      <CTASection secondaryLabel="Reservar" secondaryLabelIt="Prenota" secondaryLabelEn="Reserve" secondaryHref="/reservas" />
    </>
  );
}
