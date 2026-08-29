import type { TestItem } from "./testItems";

/**
 * The Trap Hunt bank, loaded on demand.
 *
 * WHY THIS IS SEPARATE FROM THE REGISTRY. The bank is 517 kB of the bundle,
 * and unlike the puzzles it is not needed to paint anything. A reader who
 * opens the app, plays the day's card and leaves never touches a single item:
 * the bank is only read by the review session, the Trap Hunt round and the
 * calibration run, all of which are behind a deliberate tap. So this one is
 * not fetched at startup at all, and for most visits it is never fetched.
 *
 * That makes it the only half of the shell split that actually reduces the
 * bytes a typical first visit costs. Moving the puzzle content out shrinks the
 * INSTALL and lifts the precache ceiling, but the app loads it immediately
 * anyway. Moving the bank out removes it from most sessions entirely.
 *
 * The shape is deliberately the same as `puzzles/index.ts` and
 * `app/translations/index.ts`: one cache, one shared in-flight promise, a
 * synchronous accessor for callers already past the await. Three modules doing
 * the same thing three different ways would be worse than the repetition.
 */

let cache: readonly TestItem[] | undefined;
let inFlight: Promise<readonly TestItem[]> | undefined;

/**
 * Fetch the bank once and keep it.
 *
 * Not cleared on rejection, for the reason written up at length in
 * `app/translations/index.ts`: a dynamic `import()` that fails is terminal for
 * the document, so a retry is refused by the realm's module map without ever
 * reaching the network. A caller that wants to recover needs a reload, not a
 * second call.
 */
export function loadItemBank(): Promise<readonly TestItem[]> {
  if (cache) return Promise.resolve(cache);
  if (inFlight) return inFlight;
  inFlight = import("./testItems").then((m) => {
    cache = m.TEST_ITEMS;
    return m.TEST_ITEMS;
  });
  return inFlight;
}

/**
 * The bank, for callers that run after `loadItemBank()` has resolved.
 *
 * Throws rather than returning an empty array. An empty bank does not look
 * like a failure from the outside: a review session with nothing due, a Trap
 * Hunt round with no cards, a calibration run that ends immediately. Each of
 * those is a legitimate state the app can genuinely be in, so returning `[]`
 * would hand a reader a plausible screen built on a missing file.
 */
export function itemBank(): readonly TestItem[] {
  if (!cache)
    throw new Error(
      "itemBank() before loadItemBank() resolved: await it before rendering",
    );
  return cache;
}

/** Whether the bank is in memory, for a surface that must decide what to show. */
export function itemBankLoaded(): boolean {
  return cache !== undefined;
}
