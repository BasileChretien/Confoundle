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
 *
 * A FAILURE IS NOT AN ANSWER, so it is not cached.
 *
 * This used to write `{}` into the same map the early return above consults,
 * which meant one dropped chunk pinned that locale to English for the rest of
 * the session with no retry and nothing said. The reader picks Bengali on a
 * train, the request fails once, and the app is in English until they think to
 * reload it: the single most visible thing this project does, undone by the
 * error path of a function whose comment says it is degrading gracefully.
 *
 * Degrading gracefully is still right, and still what happens. The promise
 * resolves either way so no caller blocks, and `cachedDictionary` returning
 * undefined already means "English for now" everywhere it is read. The only
 * change is that the next call tries again instead of being told the answer is
 * already known. Callers are effect-driven, one per locale change, so a retry
 * costs one request and never spins.
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
      // as the source text, so degrade to it instead of blocking the app, and
      // leave the cache untouched so the next call can try again.
    })
    .finally(() => {
      inFlight.delete(locale);
    });

  inFlight.set(locale, pending);
  return pending;
}
