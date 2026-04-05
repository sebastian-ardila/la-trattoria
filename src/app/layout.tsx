import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingCartBar } from '@/components/cart/FloatingCartBar';

export const metadata: Metadata = {
  title: "La Trattoria - Cucina tradizionale d'Italia",
  description: 'Restaurante italiano en Pereira, Colombia. Comida italiana auténtica y carne a la piedra.',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/trattoria-logo-mini.webp`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <Breadcrumb />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingCartBar />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
