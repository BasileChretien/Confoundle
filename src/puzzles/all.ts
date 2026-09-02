/**
 * Every puzzle, eagerly, validated at module load. FOR TESTS, TOOLING AND THE
 * PRERENDER ONLY.
 *
 * THE APP MUST NEVER IMPORT THIS, and unlike the sibling rule for the
 * dictionaries, that is now checked rather than trusted: `shellSplit.test.ts`
 * walks the static import graph from `app/main.tsx` and fails if this module
 * is reachable. It is worth the file because the failure is invisible. One
 * `import { puzzles } from "./all.ts"` added to a view puts 765 kB of puzzle
 * content back into the app shell, everything still works, every test passes,
 * and the only symptom is a heavier install and a build that eventually stops
 * on workbox's precache ceiling for reasons nobody can trace to the commit
 * that caused it.
 *
 * `./index.ts` reaches this through a DYNAMIC import, so it lands in its own
 * chunk, is excluded from the precache manifest and is cached at runtime the
 * first time it is fetched. That is exactly what `app/translations/index.ts`
 * does with the ten dictionaries, for exactly the same reason.
 *
 * Tests import from here rather than from `./index`, because a test wants the
 * whole registry synchronously and has no shell to keep light.
 */
import { z } from "zod";
import { Puzzle, type Puzzle as PuzzleType } from "./schema.ts";
import { kidneyStones } from "./data/kidney-stones.ts";
import { baseRate } from "./data/base-rate.ts";
import { correlationCausation } from "./data/correlation-causation.ts";
import { survivorship } from "./data/survivorship.ts";
import { prosecutorsFallacy } from "./data/prosecutors-fallacy.ts";
import { willRogers } from "./data/will-rogers.ts";
import { leadTime } from "./data/lead-time.ts";
import { spectrumBias } from "./data/spectrum-bias.ts";
import { berkson } from "./data/berkson.ts";
import { relativeRisk } from "./data/relative-risk.ts";
import { confoundingIndication } from "./data/confounding-indication.ts";
import { lengthTime } from "./data/length-time.ts";
import { publicationBias } from "./data/publication-bias.ts";
import { intentionToTreat } from "./data/intention-to-treat.ts";
import { recallBias } from "./data/recall-bias.ts";
import { immortalTime } from "./data/immortal-time.ts";
import { nocebo } from "./data/nocebo.ts";
import { misclassification } from "./data/misclassification.ts";
import { detectionBias } from "./data/detection-bias.ts";
import { statisticalSignificance } from "./data/statistical-significance.ts";
import { ecologicalFallacy } from "./data/ecological-fallacy.ts";
import { framingEffect } from "./data/framing-effect.ts";
import { regressionMean } from "./data/regression-mean.ts";
import { effectModification } from "./data/effect-modification.ts";
import { misleadingAxis } from "./data/misleading-axis.ts";
import { meanVsMedian } from "./data/mean-vs-median.ts";
import { illusoryTruth } from "./data/illusory-truth.ts";
import { anchoring } from "./data/anchoring.ts";
import { gerrymandering } from "./data/gerrymandering.ts";
import { literaryDigest } from "./data/literary-digest.ts";
import { misinformationEffect } from "./data/misinformation-effect.ts";
import { statisticalPower } from "./data/statistical-power.ts";
import { allocationConcealment } from "./data/allocation-concealment.ts";
import { hawthorneEffect } from "./data/hawthorne-effect.ts";
import { sponsorshipBias } from "./data/sponsorship-bias.ts";
import { availabilityHeuristic } from "./data/availability-heuristic.ts";
import { multipleComparisons } from "./data/multiple-comparisons.ts";
import { conjunctionFallacy } from "./data/conjunction-fallacy.ts";
import { selfAppliedLabel } from "./data/self-applied-label.ts";
import { metaphorFraming } from "./data/metaphor-framing.ts";
import { complianceSequencing } from "./data/compliance-sequencing.ts";
import { falseBalance } from "./data/false-balance.ts";
import { continuedInfluence } from "./data/continued-influence.ts";
import { sleeperEffect } from "./data/sleeper-effect.ts";
import { paltering } from "./data/paltering.ts";
import { thirdPersonEffect } from "./data/third-person-effect.ts";
import { innuendoEffect } from "./data/innuendo-effect.ts";
import { confirmationBias } from "./data/confirmation-bias.ts";
import { thresholdBunching } from "./data/threshold-bunching.ts";
import { whataboutism } from "./data/whataboutism.ts";
import { boomerangEffect } from "./data/boomerang-effect.ts";
import { prebunking } from "./data/prebunking.ts";
import { magnitudeCompression } from "./data/magnitude-compression.ts";
import { projectionDistortion } from "./data/projection-distortion.ts";
import { campbellsLaw } from "./data/campbells-law.ts";
import { pollsShapeOpinion } from "./data/polls-shape-opinion.ts";
import { reportingRate } from "./data/reporting-rate.ts";
import { marginOfError } from "./data/margin-of-error.ts";
import { floorAndCeiling } from "./data/floor-and-ceiling.ts";
import { sourceCountIllusion } from "./data/source-count-illusion.ts";
import { compositeEndpoints } from "./data/composite-endpoints.ts";
import { fearAppeals } from "./data/fear-appeals.ts";
import { shelfLife } from "./data/shelf-life.ts";
import { overdiagnosis } from "./data/overdiagnosis.ts";
import { attrition } from "./data/attrition.ts";
import { pygmalion } from "./data/pygmalion.ts";
import { performanceBias } from "./data/performance-bias.ts";
import { healthyAdherer } from "./data/healthy-adherer.ts";
import { surrogateEndpoints } from "./data/surrogate-endpoints.ts";
import { reverseCausality } from "./data/reverse-causality.ts";
import { haloEffect } from "./data/halo-effect.ts";
import { serialPosition } from "./data/serial-position.ts";
import { raterLeniency } from "./data/rater-leniency.ts";
import { proxyTarget } from "./data/proxy-target.ts";
import { competingRisks } from "./data/competing-risks.ts";
import { fairnessImpossibility } from "./data/fairness-impossibility.ts";
import { crossSiteGeneralisation } from "./data/cross-site-generalisation.ts";
import { prevalentUserBias } from "./data/prevalent-user-bias.ts";

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
  proxyTarget,
  competingRisks,
  fairnessImpossibility,
  crossSiteGeneralisation,
  prevalentUserBias,
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
