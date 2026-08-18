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
import { meanVsMedian } from "./data/mean-vs-median";
import { illusoryTruth } from "./data/illusory-truth";
import { anchoring } from "./data/anchoring";
import { gerrymandering } from "./data/gerrymandering";
import { literaryDigest } from "./data/literary-digest";
import { misinformationEffect } from "./data/misinformation-effect";
import { statisticalPower } from "./data/statistical-power";
import { allocationConcealment } from "./data/allocation-concealment";
import { hawthorneEffect } from "./data/hawthorne-effect";
import { sponsorshipBias } from "./data/sponsorship-bias";
import { availabilityHeuristic } from "./data/availability-heuristic";
import { multipleComparisons } from "./data/multiple-comparisons";
import { conjunctionFallacy } from "./data/conjunction-fallacy";
import { selfAppliedLabel } from "./data/self-applied-label";
import { metaphorFraming } from "./data/metaphor-framing";
import { complianceSequencing } from "./data/compliance-sequencing";
import { falseBalance } from "./data/false-balance";
import { continuedInfluence } from "./data/continued-influence";
import { sleeperEffect } from "./data/sleeper-effect";
import { paltering } from "./data/paltering";
import { thirdPersonEffect } from "./data/third-person-effect";
import { innuendoEffect } from "./data/innuendo-effect";
import { confirmationBias } from "./data/confirmation-bias";
import { thresholdBunching } from "./data/threshold-bunching";
import { whataboutism } from "./data/whataboutism";
import { boomerangEffect } from "./data/boomerang-effect";
import { prebunking } from "./data/prebunking";
import { magnitudeCompression } from "./data/magnitude-compression";
import { projectionDistortion } from "./data/projection-distortion";
import { campbellsLaw } from "./data/campbells-law";
import { pollsShapeOpinion } from "./data/polls-shape-opinion";
import { reportingRate } from "./data/reporting-rate";
import { marginOfError } from "./data/margin-of-error";
import { floorAndCeiling } from "./data/floor-and-ceiling";
import { sourceCountIllusion } from "./data/source-count-illusion";
import { compositeEndpoints } from "./data/composite-endpoints";
import { fearAppeals } from "./data/fear-appeals";
import { shelfLife } from "./data/shelf-life";
import { overdiagnosis } from "./data/overdiagnosis";
import { attrition } from "./data/attrition";
import { pygmalion } from "./data/pygmalion";
import { performanceBias } from "./data/performance-bias";
import { healthyAdherer } from "./data/healthy-adherer";
import { surrogateEndpoints } from "./data/surrogate-endpoints";
import { reverseCausality } from "./data/reverse-causality";
import { haloEffect } from "./data/halo-effect";
import { serialPosition } from "./data/serial-position";
import { raterLeniency } from "./data/rater-leniency";

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
  meanVsMedian,
  illusoryTruth,
  anchoring,
  gerrymandering,
  literaryDigest,
  misinformationEffect,
  statisticalPower,
  allocationConcealment,
  hawthorneEffect,
  sponsorshipBias,
  availabilityHeuristic,
  multipleComparisons,
  conjunctionFallacy,
  selfAppliedLabel,
  metaphorFraming,
  complianceSequencing,
  falseBalance,
  continuedInfluence,
  sleeperEffect,
  paltering,
  thirdPersonEffect,
  innuendoEffect,
  confirmationBias,
  thresholdBunching,
  whataboutism,
  boomerangEffect,
  prebunking,
  magnitudeCompression,
  projectionDistortion,
  campbellsLaw,
  pollsShapeOpinion,
  reportingRate,
  marginOfError,
  floorAndCeiling,
  sourceCountIllusion,
  shelfLife,
  fearAppeals,
  compositeEndpoints,
  overdiagnosis,
  attrition,
  pygmalion,
  performanceBias,
  healthyAdherer,
  surrogateEndpoints,
  reverseCausality,
  haloEffect,
  serialPosition,
  raterLeniency,
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
  const i = puzzles.findIndex((p) => p.slug === slug);
  return i === -1 ? undefined : i + 1;
}

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
  return getPuzzleBySlug(OPENING_SLUG) ?? puzzles[0];
}
