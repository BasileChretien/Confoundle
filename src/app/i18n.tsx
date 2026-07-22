import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LocalizedText } from "../puzzles/schema";
import { localeInfo, matchLocale, LOCALE_CODES } from "./locales";

export const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "cf.locale";

interface LocaleContextValue {
  locale: string;
  setLocale: (code: string) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

function readStored(): string | undefined {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && LOCALE_CODES.includes(v) ? v : undefined;
  } catch {
    return undefined;
  }
}

/** First run: stored choice, else the browser's language, else English. */
function initialLocale(): string {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  return (
    readStored() ??
    matchLocale(navigator.language) ??
    matchLocale(navigator.languages?.[0]) ??
    DEFAULT_LOCALE
  );
}

export function LocaleProvider({
  locale: fixedLocale,
  children,
}: {
  locale?: string; // pin a locale (tests/demos); omit to detect + let the user switch
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<string>(
    () => fixedLocale ?? initialLocale(),
  );

  const setLocale = useCallback((code: string) => {
    if (!LOCALE_CODES.includes(code)) return;
    setLocaleState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable (private mode, quota); the choice still applies this session
    }
  }, []);

  // Keep the document in sync so screen readers, fonts and RTL layout are correct.
  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = localeInfo(locale).dir;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): string {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (code: string) => void {
  return useContext(LocaleContext).setLocale;
}

/** Resolve a localized string, falling back to English. */
export function translate(text: LocalizedText, locale: string): string {
  return text[locale] ?? text[DEFAULT_LOCALE];
}

/** Hook returning a `t()` bound to the active locale. */
export function useT(): (text: LocalizedText) => string {
  const locale = useLocale();
  return useCallback((text: LocalizedText) => translate(text, locale), [locale]);
}
