/**
 * One dictionary per locale, mapping an English source string to its
 * translation. `translate()` consults these when a string has no inline value
 * for the active locale. Adding a language is adding a file and a line here;
 * the puzzle data files stay English-only and readable.
 *
 * Draft-and-ship: entries can be incomplete. Anything missing falls back to
 * English, so a half-translated locale still works.
 *
 * LOADED ON DEMAND. These are dynamic imports, so each dictionary is a separate
 * chunk and a reader in France never downloads Bengali, Japanese and Russian.
 * Importing them eagerly is what pushed the bundle past workbox's 2 MiB
 * precache ceiling; with ten languages and a growing item bank it would only
 * have got worse.
 *
 * `translate()` stays synchronous, because it is called during render. That is
 * what `cache` is for: the provider awaits the active locale's dictionary and
 * puts it here before painting, so lookups never need to await anything.
 */
export const LOCALE_LOADERS: Record<
  string,
  () => Promise<Record<string, string>>
> = {
  fr: () => import("./fr").then((m) => m.fr),
  es: () => import("./es").then((m) => m.es),
  pt: () => import("./pt").then((m) => m.pt),
  ja: () => import("./ja").then((m) => m.ja),
  zh: () => import("./zh").then((m) => m.zh),
  ru: () => import("./ru").then((m) => m.ru),
  hi: () => import("./hi").then((m) => m.hi),
  bn: () => import("./bn").then((m) => m.bn),
  ar: () => import("./ar").then((m) => m.ar),
};

/** Locales that have a dictionary at all. English needs none. */
export const TRANSLATED_LOCALES = Object.keys(LOCALE_LOADERS);

const cache = new Map<string, Record<string, string>>();
const inFlight = new Map<string, Promise<void>>();

/** The dictionary for a locale, if it has already been fetched. */
export function cachedDictionary(
  locale: string,
): Record<string, string> | undefined {
  return cache.get(locale);
}

/**
 * Fetch a locale's dictionary once and keep it. Resolves immediately for
 * English (which has no dictionary) and for anything already cached, so callers
 * can await unconditionally. A failed chunk load is swallowed: the app then
 * falls back to English rather than refusing to render.
 */
export function loadDictionary(locale: string): Promise<void> {
  if (cache.has(locale)) return Promise.resolve();
  const loader = LOCALE_LOADERS[locale];
  if (!loader) return Promise.resolve();

  const existing = inFlight.get(locale);
  if (existing) return existing;

  const pending = loader()
    .then((dict) => {
      cache.set(locale, dict);
    })
    .catch(() => {
      // Offline, or a chunk that failed to fetch. English is always available
      // as the source text, so degrade to it instead of blocking the app.
      cache.set(locale, {});
    })
    .finally(() => {
      inFlight.delete(locale);
    });

  inFlight.set(locale, pending);
  return pending;
}
