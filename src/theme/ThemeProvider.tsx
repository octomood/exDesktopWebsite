import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';
/** Viewport point the new theme should spread from, usually the theme button. */
export type ThemeOrigin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  toggle: (origin?: ThemeOrigin) => void;
  setTheme: (theme: Theme) => void;
};

type ViewTransition = {
  finished: Promise<void>;
  skipTransition: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'exd-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#F7F5F1', dark: '#0F0E0D' };
const FALLBACK_MS = 400;

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const current = document.documentElement.dataset.theme;
  if (current === 'light' || current === 'dark') return current;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((tag) => {
    tag.content = THEME_COLORS[theme];
  });
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage may be blocked; the theme still applies for this visit */
  }
}

function paintTransitionOrigin(origin?: ThemeOrigin) {
  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth - 44;
  const y = origin?.y ?? 28;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.style.setProperty('--theme-x', `${Math.round(x)}px`);
  root.style.setProperty('--theme-y', `${Math.round(y)}px`);
  root.style.setProperty('--theme-r', `${Math.ceil(radius)}px`);
}

function clearTransitionOrigin() {
  const root = document.documentElement;
  root.style.removeProperty('--theme-x');
  root.style.removeProperty('--theme-y');
  root.style.removeProperty('--theme-r');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);
  const fallbackTimer = useRef(0);
  const runningTransition = useRef<ViewTransition | null>(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      window.clearTimeout(fallbackTimer.current);
      clearTransitionOrigin();
    };
  }, []);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === 'light' || stored === 'dark') return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setThemeState(event.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  /* Swap the palette smoothly: a View Transition wipes the new theme in from the
     toggle button, older browsers get a plain colour cross-fade. */
  const commitTheme = useCallback((next: Theme, origin?: ThemeOrigin) => {
    const root = document.documentElement;
    const startViewTransition = (document as ViewTransitionDocument).startViewTransition;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!startViewTransition || reduceMotion) {
      if (!startViewTransition) {
        root.classList.remove('theme-switching');
        void root.offsetWidth; /* restart the fallback transition from the current palette */
        root.classList.add('theme-switching');
        window.clearTimeout(fallbackTimer.current);
        fallbackTimer.current = window.setTimeout(() => root.classList.remove('theme-switching'), FALLBACK_MS);
      }
      applyTheme(next);
      setThemeState(next);
      return;
    }

    paintTransitionOrigin(origin);

    const transition = startViewTransition.call(document, () => {
      applyTheme(next);
      flushSync(() => setThemeState(next));
    });

    runningTransition.current = transition;
    transition.finished.finally(() => {
      if (runningTransition.current !== transition) return;
      runningTransition.current = null;
      clearTransitionOrigin();
    });
  }, []);

  const setTheme = useCallback((next: Theme) => commitTheme(next), [commitTheme]);
  const toggle = useCallback(
    (origin?: ThemeOrigin) => commitTheme(theme === 'dark' ? 'light' : 'dark', origin),
    [commitTheme, theme],
  );

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
