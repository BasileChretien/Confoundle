import { LOCALES } from "./locales";
import { useLocale, useSetLocale, useT } from "./i18n";
import { UI } from "./ui";

/**
 * Language picker. A native <select> so it stays accessible, keyboard-friendly
 * and compact on mobile, and works right-to-left without extra plumbing.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useT();

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{t(UI.language)}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label={t(UI.language)}
        className="cursor-pointer rounded-md border border-rule bg-paper-2 px-2 py-1 font-sans text-[11px] font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.endonym}
          </option>
        ))}
      </select>
    </label>
  );
}
