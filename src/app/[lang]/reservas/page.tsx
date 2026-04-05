import { ReservationForm } from '@/components/reservations/ReservationForm';
import { CTASection } from '@/components/shared/CTASection';

export default function ReservasPage() {
  return (
    <>
      <ReservationForm />
      <CTASection secondaryLabel="Contactar" secondaryLabelIt="Contatto" secondaryLabelEn="Contact" secondaryHref="/contacto" />
    </>
  );
}
