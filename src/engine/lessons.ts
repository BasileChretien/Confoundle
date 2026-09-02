import type { Puzzle } from "../puzzles/schema";

/**
 * Pure helpers for browsing and searching the lesson catalogue. Kept out of the
 * components so the filtering can be unit-tested and so the home search and the
 * All-lessons screen filter identically.
 */

/** A category id ("causal-reasoning") as a display word ("Causal reasoning").
 * The result is looked up in the dictionaries like any other English string. */
/**
 * A category id as a heading, e.g. "causal-reasoning" into "Causal reasoning".
 *
 * THE ONE COPY. `SetupView` and `ShareCard` each had a private `humanize` with
 * the identical body, and all three feed `t({ en: ... })`, so the three of them
 * had to keep agreeing on a string that is also a DICTIONARY KEY: one of them
 * drifting by a character would fall back to English forever without failing
 * anything. Nothing was verifying that agreement, so folding them together
 * loses no check and `categoryLabels.test.ts` now covers all three call sites
 * at once.
 *
 * That test exists because this function is the same kind of hole
 * `charts/scopeLabels.test.ts` closed: a COMPUTED `t()` argument, invisible to
 * `inlineChrome.test.ts`, which reads the source for the literal form, and to
 * `coverage.test.ts`, which walks authored puzzle content. All four categories
 * the deck uses happen to be translated, so nothing was broken; what was
 * missing was anything that would notice if a fifth arrived. Writing this card
 * nearly supplied one, and "Study design" is in no dictionary at all.
 */
export function humanizeCategory(category: string): string {
  const spaced = category.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Distinct categories, in registry order (so the filter chips are stable). */
export function lessonCategories(list: readonly Puzzle[]): string[] {
  const seen: string[] = [];
  for (const p of list) if (!seen.includes(p.category)) seen.push(p.category);
  return seen;
}

/**
 * Filter by category and a free-text query. `searchable` turns a puzzle into the
 * lowercased text to match against (built by the caller from translated fields,
 * so search works in the reader's language). An empty query matches everything
 * in the category; a null category matches every category.
 */
export function filterLessons(
  list: readonly Puzzle[],
  opts: { category: string | null; query: string },
  searchable: (p: Puzzle) => string,
): Puzzle[] {
  const q = opts.query.trim().toLowerCase();
  return list.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (!q) return true;
    return searchable(p).includes(q);
  });
}
