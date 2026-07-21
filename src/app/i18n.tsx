import { createContext, useContext, type ReactNode } from "react";
import type { LocalizedText } from "../puzzles/schema";

export const DEFAULT_LOCALE = "en";

const LocaleContext = createContext<string>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale = DEFAULT_LOCALE,
  children,
}: {
  locale?: string;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): string {
  return useContext(LocaleContext);
}

/** Resolve a localized string, falling back to English. */
export function translate(text: LocalizedText, locale: string): string {
  return text[locale] ?? text[DEFAULT_LOCALE];
}

/** Hook returning a `t()` bound to the active locale. */
export function useT(): (text: LocalizedText) => string {
  const locale = useLocale();
  return (text: LocalizedText) => translate(text, locale);
}
