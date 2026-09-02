import type { Puzzle } from "../puzzles/schema.ts";

/**
 * What a lesson page should offer next, computed at build time.
 *
 * THE PAGES WERE 730 ISOLATED LEAVES. Each one rendered exactly three links:
 * its source, and twice the site root. Nothing pointed at another lesson page,
 * so a crawler arriving at one had nowhere to go and the set had no internal
 * structure at all, on the only surface of this product a stranger can find
 * without being sent.
 *
 * AND THE CALL TO ACTION WAS A DEAD END. It pointed at `/`, which serves every
 * newcomer the same opening puzzle. So somebody who arrived from a search about
 * Berkson's paradox, read the whole explanation, and clicked the button was
 * offered chocolate and Nobel prizes. The page had just spoiled its own puzzle
 * and then handed the reader an unrelated one.
 *
 * A SIBLING SHARES A TAG AND NOT A SKILL. Sharing a tag means the reader who
 * came for clinical evidence gets more of it; differing in skill means the next
 * card teaches something the page they just read did not. It is computed here
 * rather than authored, because 73 puzzles times a hand-picked list is 73
 * chances to leave one stale.
 *
 * DETERMINISTIC, because these are static files: the same input must give the
 * same page on every build or the diff is noise and the crawl looks unstable.
 * No randomness, and ties broken by slug.
 */
export function siblingsFor(
  puzzle: Puzzle,
  all: readonly Puzzle[],
  count = 3,
): Puzzle[] {
  const tags = new Set(puzzle.tags);
  const scored = all
    .filter((p) => p.slug !== puzzle.slug)
    .filter((p) => p.reasoningSkill !== puzzle.reasoningSkill)
    .map((p) => ({
      puzzle: p,
      shared: p.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.puzzle.slug.localeCompare(b.puzzle.slug));

  // A puzzle whose tags are unique to it would otherwise get nothing, which
  // puts the leaf straight back. Fall back to the rest of the deck, still
  // excluding its own skill, still ordered by slug.
  if (scored.length < count) {
    const seen = new Set(scored.map((x) => x.puzzle.slug));
    for (const p of [...all].sort((a, b) => a.slug.localeCompare(b.slug))) {
      if (scored.length >= count) break;
      if (p.slug === puzzle.slug || seen.has(p.slug)) continue;
      if (p.reasoningSkill === puzzle.reasoningSkill) continue;
      scored.push({ puzzle: p, shared: 0 });
      seen.add(p.slug);
    }
  }

  return scored.slice(0, count).map((x) => x.puzzle);
}
