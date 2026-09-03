import type { SpotTheTell, TestItem } from "../puzzles/testItems";

/**
 * The clause-level question: having called a scenario a trap, point at the
 * sentence that does the damage.
 *
 * Pure, with no React and no DOM, like every other module in this directory, so
 * the drawing and the grading can be tested without rendering and a future
 * Remotion template could reuse them.
 */

/** An item that carries the annotation, narrowed so callers keep the type. */
export type SpottableItem = TestItem & { spot: SpotTheTell };

export function hasSpot(item: TestItem): item is SpottableItem {
  return item.spot !== undefined;
}

export function spottable(items: readonly TestItem[]): SpottableItem[] {
  return items.filter(hasSpot);
}

/**
 * Whether the clause a player tapped is the one that does the damage.
 *
 * Takes an index rather than a string. The alternative, comparing the tapped
 * text against the tell's text, would call two segments that happen to read the
 * same a match, and a scenario may legitimately repeat a clause.
 */
export function gradeSpot(
  item: SpottableItem,
  picked: number,
): { correct: boolean; tell: number } {
  return { correct: picked === item.spot.tell, tell: item.spot.tell };
}

/**
 * Where the clauses are separated by a space and where they are not.
 *
 * The segments are rendered inline, in order, so something has to sit between
 * them, and what sits between them is a fact about the writing system rather
 * than about the item. Japanese and Chinese set clauses without an inter-word
 * space; the other eight locales do not.
 *
 * IT IS A FUNCTION OF THE LOCALE AND NOT OF THE TEXT, which is the point: a
 * renderer that guessed by looking for spaces in the string would get a
 * one-clause Japanese segment wrong, and one that always inserted a space would
 * put a gap in front of every Japanese full stop. The English case is checked
 * twice over, because `TestItem`'s refinement already requires the English
 * segments to join with a single space back into the scenario.
 */
const NO_INTERWORD_SPACE = new Set(["ja", "zh"]);

export function segmentJoin(locale: string): string {
  // Matched on the language subtag so a regional code cannot slip past.
  const language = locale.toLowerCase().split(/[-_]/)[0] ?? locale;
  return NO_INTERWORD_SPACE.has(language) ? "" : " ";
}

/**
 * The share of a set of items that can ask the clause question.
 *
 * Exposed because it is the number that decides whether the mode is worth
 * offering, and because a round that silently never reaches the second beat
 * would look like a bug in the view rather than an empty pool.
 */
export function spottableShare(items: readonly TestItem[]): number {
  if (items.length === 0) return 0;
  return spottable(items).length / items.length;
}

/**
 * Guarantee a round reaches the clause question at least once.
 *
 * WHY THE DRAW IS NOT CHANGED INSTEAD. `drawRound` is shared: the daily run
 * seeds it so that everybody alive plays the same eight, and the friends board
 * has no denominator without that. Teaching it to prefer a subset would change
 * what "the same eight" means for a feature that exists to be identical, and it
 * would do so silently, on a day nobody was looking. So the preference lives
 * here and only Trap Hunt calls it, which is the mode that is free to change
 * because it is unscheduled, unscored and shared with nobody.
 *
 * WHY A GUARANTEE AT ALL, rather than letting chance decide. With a dozen
 * annotated items in a bank of a thousand, an eight-item round meets one about
 * once in ten, so a player would have to grind ten rounds to see the second
 * verb once and would reasonably conclude it did not exist. The swap costs one
 * ordinary item out of eight and buys a mode that demonstrates itself.
 *
 * Returns the items unchanged when one is already present, when the bank has
 * none to offer, or when every candidate is already in the round.
 */
export function withOneSpot(
  items: readonly TestItem[],
  random: () => number,
  bank: readonly TestItem[],
): TestItem[] {
  const drawn = [...items];
  if (drawn.some(hasSpot)) return drawn;

  /*
    The id filter is kept for legibility and is redundant today: the early
    return above means a draw reaching this line contains no annotated item, so
    no candidate can already be in it. Said out loud because a test asserting
    "never introduces a duplicate" would pass with this line deleted, and a
    green test that reads like an isolation check is worse than no check.
  */
  const present = new Set(drawn.map((i) => i.id));
  const candidates = spottable(bank).filter((i) => !present.has(i.id));
  if (candidates.length === 0) return drawn;

  const replaceable = drawn.map((_, i) => i).filter((i) => !hasSpot(drawn[i]!));
  if (replaceable.length === 0) return drawn;

  const chosen = candidates[Math.min(Math.floor(random() * candidates.length), candidates.length - 1)]!;
  const slot = replaceable[Math.min(Math.floor(random() * replaceable.length), replaceable.length - 1)]!;
  drawn[slot] = chosen;
  return drawn;
}
