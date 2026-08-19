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
import { cachedDictionary, loadDictionary } from "./translations";

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

/**
 * First run: stored choice, else the browser's language, else English.
 *
 * EXPORTED FOR THE ERROR BOUNDARY, which cannot use `useLocale`. It sits above
 * `LocaleProvider` so that a failure inside the provider is still caught, and a
 * fallback that could only speak English would tell nine readers in ten that
 * something broke, in a language they did not choose, at the one moment the app
 * has nothing else to offer them.
 */
export function initialLocale(): string {
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

  /**
   * Dictionaries load on demand, so the first render in a non-English locale
   * would otherwise paint English and then swap. We hold the paint instead.
   *
   * The trade is deliberate. Blocking costs one chunk fetch, and only on a
   * first visit, because the service worker caches the chunk afterwards. Not
   * blocking would cost every first-time non-English visitor a flash of the
   * wrong language, and a first-time visitor is exactly who you least want to
   * show it to. English readers wait for nothing either way, since English is
   * the source text and has no dictionary.
   */
  const [ready, setReady] = useState(
    () => cachedDictionary(locale) != null || locale === DEFAULT_LOCALE,
  );

  useEffect(() => {
    if (cachedDictionary(locale) != null || locale === DEFAULT_LOCALE) {
      setReady(true);
      return;
    }
    let cancelled = false;
    setReady(false);
    loadDictionary(locale).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

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
    <LocaleContext.Provider value={value}>
      {/* Held back only while a non-English dictionary is in flight, which is
          a first visit in that language and nothing after it. The paper
          background is already painted by the document, so this reads as the
          page still loading rather than as a blank failure. */}
      {ready ? children : null}
    </LocaleContext.Provider>
  );
}

export function useLocale(): string {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (code: string) => void {
  return useContext(LocaleContext).setLocale;
}

/**
 * Resolve a localized string. An inline locale key wins (used for the few UI
 * frame strings); otherwise we look the English text up in that locale's
 * dictionary; otherwise English. This keeps puzzle data files English-only
 * while translations live in one file per language.
 */
export function translate(text: LocalizedText, locale: string): string {
  const inline = text[locale];
  if (inline != null) return inline;
  const fromDict = cachedDictionary(locale)?.[text[DEFAULT_LOCALE]];
  if (fromDict != null) return fromDict;
  return text[DEFAULT_LOCALE];
}

/** Hook returning a `t()` bound to the active locale. */
export function useT(): (text: LocalizedText) => string {
  const locale = useLocale();
  return useCallback((text: LocalizedText) => translate(text, locale), [locale]);
}
