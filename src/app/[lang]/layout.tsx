import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider, type Lang } from '@/context/LanguageContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingCartBar } from '@/components/cart/FloatingCartBar';
import { ScrollButtons } from '@/components/shared/ScrollButtons';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'it' }, { lang: 'en' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (['es', 'it', 'en'].includes(lang) ? lang : 'es') as Lang;

  return (
    <LanguageProvider lang={validLang}>
      <CartProvider>
        <Navbar />
        <Breadcrumb />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingCartBar />
        <ScrollButtons />
      </CartProvider>
    </LanguageProvider>
  );
}
