import { z } from "zod";
import { Puzzle, type Puzzle as PuzzleType } from "./schema";
import { kidneyStones } from "./data/kidney-stones";
import { baseRate } from "./data/base-rate";
import { correlationCausation } from "./data/correlation-causation";
import { survivorship } from "./data/survivorship";
import { prosecutorsFallacy } from "./data/prosecutors-fallacy";
import { willRogers } from "./data/will-rogers";
import { leadTime } from "./data/lead-time";
import { spectrumBias } from "./data/spectrum-bias";
import { berkson } from "./data/berkson";
import { relativeRisk } from "./data/relative-risk";
import { confoundingIndication } from "./data/confounding-indication";
import { lengthTime } from "./data/length-time";
import { publicationBias } from "./data/publication-bias";
import { intentionToTreat } from "./data/intention-to-treat";
import { recallBias } from "./data/recall-bias";
import { immortalTime } from "./data/immortal-time";
import { nocebo } from "./data/nocebo";
import { misclassification } from "./data/misclassification";
import { detectionBias } from "./data/detection-bias";
import { statisticalSignificance } from "./data/statistical-significance";
import { ecologicalFallacy } from "./data/ecological-fallacy";
import { framingEffect } from "./data/framing-effect";
import { regressionMean } from "./data/regression-mean";
import { effectModification } from "./data/effect-modification";
import { misleadingAxis } from "./data/misleading-axis";

/**
 * The puzzle registry. Adding a puzzle = import its data file and add it to
 * this array. Every entry is validated against the schema at module load, so a
 * malformed or self-contradictory puzzle fails fast (in dev, build, and tests)
 * rather than shipping a broken beat.
 */
const rawPuzzles: unknown[] = [
  kidneyStones,
  baseRate,
  correlationCausation,
  survivorship,
  prosecutorsFallacy,
  willRogers,
  leadTime,
  spectrumBias,
  berkson,
  relativeRisk,
  confoundingIndication,
  lengthTime,
  publicationBias,
  intentionToTreat,
  recallBias,
  immortalTime,
  nocebo,
  misclassification,
  regressionMean,
  effectModification,
  detectionBias,
  statisticalSignificance,
  ecologicalFallacy,
  framingEffect,
  misleadingAxis,
];

export const puzzles: PuzzleType[] = rawPuzzles.map((p, i) => {
  const result = Puzzle.safeParse(p);
  if (!result.success) {
    // prettifyError reads far better than the old nested format() tree: it
    // prints one line per problem with its path, which is what someone who has
    // just mistyped a count in a data file actually needs to see.
    throw new Error(
      `Invalid puzzle at index ${i}:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
});

export function getPuzzleBySlug(slug: string): PuzzleType | undefined {
  return puzzles.find((p) => p.slug === slug);
}

/**
 * Deterministic daily selection (Wordle-style): everyone sees the same puzzle
 * on the same day, cycling through the registry. Pure in `dayIndex` so it's
 * testable; `getTodaysPuzzle` supplies today's day number.
 */
export function puzzleForDay(dayIndex: number): PuzzleType {
  const n = puzzles.length;
  const i = ((dayIndex % n) + n) % n;
  return puzzles[i];
}

export function getTodaysPuzzle(): PuzzleType {
  return puzzleForDay(Math.floor(Date.now() / 86_400_000));
}
