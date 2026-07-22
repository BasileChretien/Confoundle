/**
 * The locale registry: English plus the world's most-spoken languages and
 * Japanese. `endonym` is each language's own name (shown in the switcher);
 * `dir` drives the document's text direction. Adding a locale here makes it
 * selectable; content and UI strings fall back to English until translated.
 */
export interface LocaleInfo {
  code: string;
  endonym: string; // the language's name in that language
  english: string; // its name in English (for aria labels)
  dir: "ltr" | "rtl";
}

export const LOCALES: LocaleInfo[] = [
  { code: "en", endonym: "English", english: "English", dir: "ltr" },
  { code: "zh", endonym: "中文", english: "Chinese", dir: "ltr" },
  { code: "hi", endonym: "हिन्दी", english: "Hindi", dir: "ltr" },
  { code: "es", endonym: "Español", english: "Spanish", dir: "ltr" },
  { code: "fr", endonym: "Français", english: "French", dir: "ltr" },
  { code: "ar", endonym: "العربية", english: "Arabic", dir: "rtl" },
  { code: "bn", endonym: "বাংলা", english: "Bengali", dir: "ltr" },
  { code: "pt", endonym: "Português", english: "Portuguese", dir: "ltr" },
  { code: "ru", endonym: "Русский", english: "Russian", dir: "ltr" },
  { code: "ja", endonym: "日本語", english: "Japanese", dir: "ltr" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function localeInfo(code: string): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** Best-matching supported locale for a browser language tag (e.g. "pt-BR"). */
export function matchLocale(tag: string | undefined): string | undefined {
  if (!tag) return undefined;
  const base = tag.toLowerCase().split("-")[0];
  return LOCALE_CODES.find((c) => c === base);
}
