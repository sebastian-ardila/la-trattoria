'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'es' | 'it' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (es: string, it: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const langOrder: Lang[] = ['es', 'it', 'en'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((es: string, it: string, en: string) => {
    if (lang === 'it') return it;
    if (lang === 'en') return en;
    return es;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { langOrder };

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
