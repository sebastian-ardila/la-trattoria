import { ContactForm } from '@/components/contact/ContactForm';
import { CTASection } from '@/components/shared/CTASection';

export default function ContactoPage() {
  return (
    <>
      <ContactForm />
      <CTASection secondaryLabel="Reservar" secondaryLabelIt="Prenota" secondaryLabelEn="Reserve" secondaryHref="/reservas" />
    </>
  );
}
