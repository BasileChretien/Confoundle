import { Puzzle, type Puzzle as PuzzleType } from "./schema";
import { kidneyStones } from "./data/kidney-stones";
import { baseRate } from "./data/base-rate";

/**
 * The puzzle registry. Adding a puzzle = import its data file and add it to
 * this array. Every entry is validated against the schema at module load, so a
 * malformed or self-contradictory puzzle fails fast (in dev, build, and tests)
 * rather than shipping a broken beat.
 */
const rawPuzzles: unknown[] = [kidneyStones, baseRate];

export const puzzles: PuzzleType[] = rawPuzzles.map((p, i) => {
  const result = Puzzle.safeParse(p);
  if (!result.success) {
    throw new Error(
      `Invalid puzzle at index ${i}:\n${JSON.stringify(result.error.format(), null, 2)}`,
    );
  }
  return result.data;
});

export function getPuzzleBySlug(slug: string): PuzzleType | undefined {
  return puzzles.find((p) => p.slug === slug);
}

/**
 * Phase 0 serves a single seed puzzle. Later this becomes a Wordle-style daily
 * selection keyed by date; the app layer owns that scheduling, not the content.
 */
export function getTodaysPuzzle(): PuzzleType {
  return puzzles[0];
}
