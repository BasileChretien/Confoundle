import type { Puzzle as PuzzleType } from "./schema";

/**
 * The registry, loaded on demand.
 *
 * WHY THIS FILE IS A CACHE AND NOT A LIST. Every puzzle's content, 765 kB of
 * it, used to sit in the app shell and therefore in the precache manifest, so
 * installing the app pulled down all 73 cards whether or not anyone opened
 * one, and each new card pushed the shell closer to workbox's 2 MiB per-file
 * ceiling. At 73 puzzles the shell measured 94.8% of it. The ceiling is a
 * useful signal and raising it would have traded a loud build error for a
 * silently heavier install, so the content moved behind a dynamic import
 * instead, the way the dictionaries already had.
 *
 * THE ACCESSORS STAY SYNCHRONOUS, because they are called during render and
 * from `main.tsx` before React exists. That is what the cache is for: the
 * entry point awaits `loadPuzzles()` once and everything afterwards reads the
 * cache without awaiting anything. `LocaleProvider` does the same with its
 * dictionary.
 *
 * A FAILED LOAD IS FATAL HERE, and that is the difference from the
 * dictionaries. A dictionary that will not load falls back to English and the
 * app still works; a registry that will not load leaves an app with nothing in
 * it, so `loadPuzzles` rejects and the caller shows the error boundary rather
 * than painting an empty shell that looks like a bug in the content.
 */

let cache: readonly PuzzleType[] | undefined;
let inFlight: Promise<readonly PuzzleType[]> | undefined;

/**
 * Fetch the registry once and keep it.
 *
 * The in-flight promise is shared rather than re-entered, so two callers
 * racing at startup make one request. Note that it is NOT cleared on
 * rejection: a dynamic `import()` that fails is terminal for the document,
 * recorded in the realm's module map against that specifier, and every later
 * `import()` of it rejects from the map with no network request at all. The
 * same fact is written up at greater length in `app/translations/index.ts`,
 * where it was measured. Retrying here would re-enter, be rejected instantly
 * by the module map, and look like a network attempt that never happened.
 */
export function loadPuzzles(): Promise<readonly PuzzleType[]> {
  if (cache) return Promise.resolve(cache);
  if (inFlight) return inFlight;
  inFlight = import("./all").then((m) => {
    cache = m.puzzles;
    return m.puzzles;
  });
  return inFlight;
}

/**
 * The registry, for callers that run after `loadPuzzles()` has resolved.
 *
 * Throws rather than returning an empty array, because every caller here is
 * rendering something and an empty registry would paint a plausible screen: a
 * catalogue with no lessons, a progress panel reading zero of zero. That is a
 * bug wearing the costume of a legitimate state, and it would reach a reader
 * before it reached anybody who could recognise it.
 */
export function puzzles(): readonly PuzzleType[] {
  if (!cache)
    throw new Error(
      "puzzles() before loadPuzzles() resolved: the entry point must await it",
    );
  return cache;
}

/** Whether the registry is in memory, for a caller that can render without it. */
export function puzzlesLoaded(): boolean {
  return cache !== undefined;
}

/**
 * The number a shared result line carries, one-based in registry order.
 *
 * IT USED TO BE THE DAY, AND THE DAY IS NOT WHAT ANYBODY COMPARES. `session.ts`
 * computed it as days since launch, so every player who finished any puzzle on
 * the same date emitted the same "Confoundle #142", and `FriendsBoard` grouped
 * by that number and ranked the results against each other. Two friends who
 * played different cards were shown a leaderboard of their scores, and score
 * depends on which card and what the player staked. That is a comparison across
 * different denominators presented as a ranking, which is the mistake this deck
 * exists to teach against, made by the deck.
 *
 * A Wordle number means the day because Wordle has exactly one puzzle a day.
 * This app has 73 and lets you open any of them, so here the number has to name
 * the card. Now #7 means the seventh puzzle, a friend comparing #7 played the
 * same one, and the scores are like-for-like.
 *
 * THE ORDER IS THEREFORE PART OF THE PRODUCT, not an implementation detail.
 * Inserting a puzzle in the middle of the registry would renumber everything
 * after it and quietly change what already-shared lines refer to, so
 * `registryOrder.test.ts` pins the sequence and new puzzles are appended.
 */
export function puzzleNumberOf(slug: string): number | undefined {
  const i = puzzles().findIndex((p) => p.slug === slug);
  return i === -1 ? undefined : i + 1;
}

export function getPuzzleBySlug(slug: string): PuzzleType | undefined {
  return puzzles().find((p) => p.slug === slug);
}

/**
 * Deterministic daily selection (Wordle-style): everyone sees the same puzzle
 * on the same day, cycling through the registry. Pure in `dayIndex` so it's
 * testable; `getTodaysPuzzle` supplies today's day number.
 */
export function puzzleForDay(dayIndex: number): PuzzleType {
  const all = puzzles();
  const n = all.length;
  const i = ((dayIndex % n) + n) % n;
  return all[i]!;
}

export function getTodaysPuzzle(): PuzzleType {
  return puzzleForDay(Math.floor(Date.now() / 86_400_000));
}

/**
 * The puzzle a first-time visitor lands on.
 *
 * WHY THIS IS A NAMED DECISION rather than "whichever comes first in the
 * registry". The app used to open a newcomer on roughly 197 words of pitch,
 * and the button out of it led to the first unlearned puzzle, which is
 * `kidney-stones`. That one is marked `difficulty: "hard"` and its correct
 * answer is "Neither yet, ask how the patients were split first". It is a
 * superb puzzle and the hedge rule is working exactly as designed there, and
 * it is still the wrong first thirty seconds: a newcomer commits, stakes their
 * confidence, and is told both concrete answers were wrong and the right move
 * was to decline the question. That reads as a trick question rather than as a
 * hidden variable, and a first impression is the one thing you cannot retry.
 *
 * THREE PROPERTIES MAKE AN OPENER, and `openerRules.test.ts` checks each one:
 *
 *  1. The correct answer is CONCRETE rather than a refusal. The reveal should
 *     flip the reader's intuition, not withdraw the question.
 *  2. It is the gentlest thing in the deck, so the mechanic gets demonstrated
 *     before the difficulty does.
 *  3. The figure genuinely CHANGES between the two beats, because the promise
 *     is two views of one dataset, and an opener that fails to show that
 *     teaches a newcomer the wrong thing about what this app is.
 *
 * Messerli's chocolate and Nobel prizes meets all three, and is additionally
 * funny, famous and non-partisan, which matters more here than anywhere else
 * in the deck.
 */
export const OPENING_SLUG = "chocolate-nobel";

export function getOpeningPuzzle(): PuzzleType {
  // Falls back rather than throwing: a mistyped slug must not be a white
  // screen for every first-time visitor. The test is what stops it silently
  // becoming the fallback.
  return getPuzzleBySlug(OPENING_SLUG) ?? puzzles()[0]!;
}
