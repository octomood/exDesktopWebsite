import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dict, Lang } from './types';
import { ru } from './ru';
import { en } from './en';

const dictionaries: Record<Lang, Dict> = { ru, en };
const STORAGE_KEY = 'exd-lang';

type I18nValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ru' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('ru')) {
    return 'en';
  }
  return 'ru';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.meta.description;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, t]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === 'ru' ? 'en' : 'ru')), []);

  const value = useMemo(() => ({ lang, t, setLang, toggle }), [lang, t, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}

export type { Lang, Dict };
