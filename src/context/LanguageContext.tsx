'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Lang = 'es' | 'it' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (es: string, it: string, en: string) => string;
  localePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const validLangs: Lang[] = ['es', 'it', 'en'];

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback((newLang: Lang) => {
    // Replace the lang segment in the current path
    const segments = pathname.split('/');
    // segments[0] is '', segments[1] might be basePath, then lang
    // Find the lang segment and replace it
    const langIndex = segments.findIndex(s => validLangs.includes(s as Lang));
    if (langIndex !== -1) {
      segments[langIndex] = newLang;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newLang}`);
    }
  }, [pathname, router]);

  const t = useCallback((es: string, it: string, en: string) => {
    if (lang === 'it') return it;
    if (lang === 'en') return en;
    return es;
  }, [lang]);

  const localePath = useCallback((path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `/${lang}${clean}`;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, localePath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { validLangs as langOrder };

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
