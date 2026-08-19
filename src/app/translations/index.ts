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
 * A FAILED LOAD IS CACHED, AND HAS TO BE, because the browser has already made
 * the decision for us.
 *
 * A previous version of this comment argued the opposite at length: that
 * caching `{}` pinned a locale to English for the session, that a reader whose
 * request drops on a train is stuck until they reload, and that leaving the
 * cache untouched lets the next call try again. The first two are true. The
 * third is not, and it is the one the change rested on.
 *
 * A dynamic `import()` THAT FAILS IS TERMINAL FOR THE DOCUMENT. The failure is
 * recorded in the realm's module map against that specifier, and every later
 * `import()` of it rejects from the map with no network request at all.
 * Measured here rather than assumed: three sequential imports of a missing
 * module produced three rejections and exactly ONE request in the network log.
 * So the "retry" re-entered this function, re-invoked the loader, was rejected
 * instantly by the module map, and swallowed the same error again. It could
 * never have fetched anything. The train case is not fixable from this
 * function, and nothing that only edits these few lines can fix it.
 *
 * Caching the failure is therefore not a lost opportunity but a correct record
 * of a settled fact, and it pays for itself twice. `cachedDictionary` returns
 * `{}`, which every lookup already treats as "English for now" because
 * `translate` reaches for the default locale on a miss. And `LocaleProvider`
 * initialises `ready` from the cache, so returning to a locale whose load
 * failed short-circuits instead of dropping `ready` to false, which would
 * unmount the whole subtree under the provider, auth and puzzle state with it.
 *
 * If this ever needs to genuinely recover, it will take a different mechanism
 * (a fresh URL, or a reload offered to the reader) and a different file. It
 * does not belong in a `catch`.
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
      // remember the failure: the module map will refuse the same specifier
      // for the life of the document, so asking again costs a re-render and
      // buys nothing. See the note above.
      cache.set(locale, {});
    })
    .finally(() => {
      inFlight.delete(locale);
    });

  inFlight.set(locale, pending);
  return pending;
}
