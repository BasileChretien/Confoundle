import { z } from "zod";

/* ---------------------------------------------------------------------------
 * i18n primitive
 * Every user-facing string is a locale-keyed object. `en` is required; any
 * other locale (fr, ja, …) is optional and additive. This keeps the whole
 * content model translatable without a runtime i18n library.
 * ------------------------------------------------------------------------- */
export const LocalizedText = z
  .object({ en: z.string().min(1) })
  .catchall(z.string());
export type LocalizedText = z.infer<typeof LocalizedText>;

/* ---------------------------------------------------------------------------
 * Generic data model
 * The numbers live here ONCE (single source of truth). The engine derives
 * aggregate + stratified rates from these observations, the paradox itself
 * lives in that derivation, so we compute it rather than hardcode "78%".
 * `type` is a discriminant so a future puzzle can ship a completely different
 * data shape (e.g. type: "correlation") without touching existing renderers.
 * ------------------------------------------------------------------------- */
export const Group = z.object({
  id: z.string().min(1), // stable key, e.g. "A"
  label: LocalizedText, // "Treatment A, open surgery"
  short: LocalizedText.optional(), // "A" (for compact chart labels)
});
export type Group = z.infer<typeof Group>;

export const Stratum = z.object({
  id: z.string().min(1), // "small" | "large"
  label: LocalizedText, // "Small stones"
});
export type Stratum = z.infer<typeof Stratum>;

export const Observation = z.object({
  groupId: z.string().min(1),
  stratumId: z.string().min(1),
  numerator: z.number().int().nonnegative(), // successes
  denominator: z.number().int().positive(), // n
});
export type Observation = z.infer<typeof Observation>;

const RatesData = z.object({
  type: z.literal("rates"),
  metricLabel: LocalizedText, // "Success rate"
  higherIsBetter: z.boolean().default(true),
  /**
   * Whether the taller bar is a winner worth marking. Not every rate is a
   * contest: "share of these people who also had a second disease" has no good
   * side, and crowning the higher bar would assert a finding the data does not
   * support. Off means no bar is marked in any view.
   */
  crownWinner: z.boolean().optional(),
  /**
   * Normally the strata partition one population (small stones / large
   * stones), so pooling them is meaningful and their sizes are a case mix.
   * Set this when they are instead separate samples set side by side, possibly
   * overlapping or nested (hospital patients inside a community survey). Then
   * pooling them would be nonsense and stacking their sizes into one bar would
   * be a lie, so the engine does neither.
   */
  strataAreSeparateSamples: z.boolean().optional(),
  groups: z.array(Group).min(2),
  strata: z.array(Stratum).min(1), // a single stratum => a non-stratified puzzle
  observations: z.array(Observation).min(1),
});
export type RatesData = z.infer<typeof RatesData>;

/**
 * Natural-frequency data (base-rate / diagnostic puzzles): a rare condition and
 * a test, authored as counts out of `total` so the numbers stay exact. The
 * engine derives the positive predictive value and the true/false-positive mix.
 */
const FrequenciesData = z.object({
  type: z.literal("frequencies"),
  label: LocalizedText, // figure title, e.g. "In 1,000 people"
  total: z.number().int().positive(),
  conditionLabel: LocalizedText, // "have the disease"
  positiveLabel: LocalizedText, // "test positive"
  withCondition: z.number().int().nonnegative(), // base-rate count
  positiveGivenCondition: z.number().int().nonnegative(), // true positives
  positiveGivenNoCondition: z.number().int().nonnegative(), // false positives
});
export type FrequenciesData = z.infer<typeof FrequenciesData>;

/**
 * Causal-structure data (correlation ≠ causation puzzles): a claimed cause X, an
 * effect Y, and the lurking common cause Z that actually drives both. Labels are
 * short (they sit in a trend chart and a causal diagram).
 */
const CausalData = z.object({
  type: z.literal("causal"),
  label: LocalizedText, // figure title, e.g. "Across 23 countries"
  cause: LocalizedText, // X, the claimed cause, e.g. "Chocolate eaten"
  effect: LocalizedText, // Y, the effect, e.g. "Nobel prizes"
  commonCause: LocalizedText, // Z, the real driver, e.g. "A country's wealth"
  correlationNote: LocalizedText.optional(), // e.g. "r ≈ 0.79"
});
export type CausalData = z.infer<typeof CausalData>;

/**
 * Survivorship-bias data: the visible sample is filtered (only survivors are
 * observed). The seed renders a WWII bomber damage-map, hits cluster where a
 * plane can be shot and still return, so the *un-hit* areas are the vulnerable
 * ones. Labels are authored; the plane layout lives in the renderer.
 */
const SurvivorshipData = z.object({
  type: z.literal("survivorship"),
  label: LocalizedText, // figure title, e.g. "Returning bombers"
  hitLabel: LocalizedText, // "hits on planes that came back"
  armorLabel: LocalizedText, // "armour here"
});
export type SurvivorshipData = z.infer<typeof SurvivorshipData>;

/**
 * One life on an axis, drawn once per track. Lead-time bias cannot be told with
 * rates: the claim is not "which group did better" but "the clock started
 * earlier", so it needs the same span of time shown two ways. Screening moves
 * `detectedAt` earlier; `diedAt` is what the puzzle turns on.
 *
 * The figure is schematic (like the bomber diagram), so the numbers here are an
 * illustration, not a measurement. The puzzle's factual claim still needs
 * `provenance`, and a puzzle-level test proves the property it teaches.
 */
export const TimelineTrack = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Found by screening"
  onsetAt: z.number().nonnegative(), // when the disease actually began
  detectedAt: z.number().nonnegative(), // when it was found
  diedAt: z.number().nonnegative(), // when the person died
  /**
   * The instant a person genuinely joined the group they were counted in, when
   * that is later than the start of their track. Everything before it is
   * IMMORTAL time: stretch counted towards a group during which the person
   * could not possibly have died, because dying would have kept them out of
   * that group.
   *
   * Optional, and absent from every existing puzzle. Lead-time and length-time
   * have no such stretch; immortal time bias is nothing but that stretch.
   */
  immortalUntil: z.number().nonnegative().optional(),
});
export type TimelineTrack = z.infer<typeof TimelineTrack>;

const TimelineData = z.object({
  type: z.literal("timeline"),
  label: LocalizedText, // figure title
  unit: LocalizedText, // "years"
  span: z.number().positive(), // total axis length
  onsetLabel: LocalizedText, // "disease begins"
  detectedLabel: LocalizedText, // "diagnosed"
  diedLabel: LocalizedText, // "died"
  survivalLabel: LocalizedText, // "survival after diagnosis"
  /** Names the shaded stretch, e.g. "counted, but could not yet have died". */
  immortalLabel: LocalizedText.optional(),
  tracks: z.array(TimelineTrack).min(2),
});
export type TimelineData = z.infer<typeof TimelineData>;

/**
 * A two-arm risk comparison, for the relative-versus-absolute puzzles.
 *
 * This needs its own shape because one bar chart cannot be both things at
 * once. The `relative` view scales the treated arm against the control arm, so
 * a third fewer events fills a third of the bar, which is exactly how such a
 * result gets sold. The `absolute` view puts both arms on a true 0 to 100
 * scale, where the same result is two nearly identical slivers. Same counts,
 * two honest pictures, opposite feelings.
 *
 * Everything shown is derived from the four integers (see engine/charts/risk.ts):
 * the two risks, the relative reduction, the absolute reduction, and the number
 * needed to treat. The captions are authored so no number is ever interpolated
 * into a sentence, which keeps all ten locales grammatical.
 */
export const RiskArm = z.object({
  label: LocalizedText, // "Placebo"
  short: LocalizedText.optional(), // compact chart label
  events: z.number().int().nonnegative(),
  n: z.number().int().positive(),
});
export type RiskArm = z.infer<typeof RiskArm>;

const RiskData = z.object({
  type: z.literal("risk"),
  label: LocalizedText, // figure title
  outcomeLabel: LocalizedText, // "had a heart attack or died of heart disease"
  control: RiskArm,
  treated: RiskArm,
  /** The "per how many people" the absolute view speaks in, e.g. 1000. */
  scale: z.number().int().positive(),
  relativeCaption: LocalizedText, // under the big relative number: "lower risk"
  absoluteCaption: LocalizedText, // "spared, per 1,000 men"
  nntCaption: LocalizedText, // "treated for five years to spare one"
});
export type RiskData = z.infer<typeof RiskData>;

/**
 * Two measurements of the same people, and how far apart they are.
 *
 * Needed because misclassification cannot be told with a rate chart. The claim
 * is not "this group has a higher rate", it is "this group's answers changed",
 * and the only way to show that honestly is to put each group's later answers
 * next to what those same people said earlier. A rates chart can show one
 * reading or the other, never the gap between them, so the reveal would just
 * restate the setup.
 *
 * `repeated` is a subset of `reportedBefore`, so what was forgotten is derived
 * rather than authored, and `invented` counts answers that appeared only at the
 * second measurement with nothing behind them the first time.
 */
const AgreementGroup = z.object({
  label: LocalizedText, // "Healthy child"
  short: LocalizedText.optional(), // compact chart label
  /** People in this group. */
  n: z.number().int().positive(),
  /** Positive answers at the first measurement. */
  reportedBefore: z.number().int().nonnegative(),
  /** Of those, the ones repeated identically at the second measurement. */
  repeated: z.number().int().nonnegative(),
  /** Positive answers at the second measurement with no first-measurement record. */
  invented: z.number().int().nonnegative(),
});
export type AgreementGroup = z.infer<typeof AgreementGroup>;

const AgreementData = z
  .object({
    type: z.literal("agreement"),
    label: LocalizedText, // figure title
    /** What each measurement was, named so the chart cannot imply a gold standard it lacks. */
    beforeLabel: LocalizedText, // "Recorded during pregnancy"
    afterLabel: LocalizedText, // "Recalled after delivery"
    repeatedLabel: LocalizedText, // "Repeated identically"
    forgottenLabel: LocalizedText, // "Not repeated"
    inventedLabel: LocalizedText, // "Reported only afterwards"
    /** What a positive answer was about, e.g. "took a drug in early pregnancy". */
    itemLabel: LocalizedText,
    groups: z.array(AgreementGroup).min(2),
  })
  .superRefine((data, ctx) => {
    data.groups.forEach((g, i) => {
      if (g.repeated > g.reportedBefore) {
        ctx.addIssue({
          code: "custom",
          path: ["groups", i, "repeated"],
          message:
            "repeated counts answers that were also reported before, so it cannot exceed reportedBefore",
        });
      }
      if (g.reportedBefore > g.n) {
        ctx.addIssue({
          code: "custom",
          path: ["groups", i, "reportedBefore"],
          message: "more positive answers than people in the group",
        });
      }
    });
  });
export type AgreementData = z.infer<typeof AgreementData>;

/**
 * Regression-to-the-mean data: one or more groups selected because their FIRST
 * measurement was extreme, and where each landed on a SECOND measurement, both
 * read against the population mean.
 *
 * Needed because regression to the mean cannot be told with a rate chart or a
 * risk chart. The claim is not "one group beat another" but "a group picked for
 * being extreme drifted back toward the average on its own, with nothing done to
 * it". That needs the mean drawn as a fixed reference and each group shown at two
 * measurements against it, so the reveal can show the second measurement sitting
 * closer to the mean than the first. A single bar of either measurement cannot
 * carry the pull toward the middle, so the reveal would only restate the setup.
 *
 * The values are group means on a real scale (Galton's inches), not counts, so
 * `first` and `second` are plain numbers, and `mean` is the level everything
 * reverts toward. `reverted` (how far back toward the mean the second
 * measurement fell) is derived, never authored.
 */
export const RegressionGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "The tallest parents"
  short: LocalizedText.optional(),
  /** The first, selected-on measurement (the extreme one). */
  first: z.number(),
  /** The same group's second measurement. */
  second: z.number(),
  /** People in the group, shown for honesty about how solid each mean is. */
  n: z.number().int().positive().optional(),
});
export type RegressionGroup = z.infer<typeof RegressionGroup>;

const RegressionData = z.object({
  type: z.literal("regression"),
  label: LocalizedText, // figure title
  unit: LocalizedText, // "inches"
  axisMin: z.number(),
  axisMax: z.number(),
  /** The population average, the line the second measurement reverts toward. */
  mean: z.number(),
  meanLabel: LocalizedText, // "Everyone's average height"
  firstLabel: LocalizedText, // "The parents"
  secondLabel: LocalizedText, // "Their grown children"
  groups: z.array(RegressionGroup).min(1),
});
export type RegressionData = z.infer<typeof RegressionData>;

/**
 * Effect-modification data: a 2x2 of exposure against outcome, given once per
 * stratum of a third variable (the potential modifier), as raw head-counts.
 *
 * Needed because the difference between confounding and effect modification
 * cannot be told with a rates chart or a risk chart. Both of those pool. The
 * whole lesson is that pooling, or adjusting, is right for a confounder and
 * wrong for a modifier: the claim is not "which group is higher" but "the effect
 * itself differs across the strata, so a single number describes no one". That
 * needs the odds ratio computed inside each stratum and set against the crude
 * (pooled) one, so the reveal can show the stratum ratios flying apart while the
 * crude sits uselessly between them.
 *
 * Counts are authored as the four cells of each stratum's 2x2; the odds ratios,
 * the crude odds ratio, and the Mantel-Haenszel adjusted odds ratio are all
 * derived (see engine/charts/interaction.ts), so nothing can drift.
 */
export const InteractionStratum = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Current drinkers"
  short: LocalizedText.optional(),
  exposedCases: z.number().int().nonnegative(),
  exposedControls: z.number().int().nonnegative(),
  unexposedCases: z.number().int().nonnegative(),
  unexposedControls: z.number().int().nonnegative(),
});
export type InteractionStratum = z.infer<typeof InteractionStratum>;

const InteractionData = z.object({
  type: z.literal("interaction"),
  label: LocalizedText, // figure title
  exposureLabel: LocalizedText, // the chart eyebrow, e.g. "Odds of cancer with the variant"
  modifierLabel: LocalizedText, // "Alcohol drinking"
  /** Row label for the pooled (crude) odds ratio, e.g. "Ignoring drinking". */
  crudeLabel: LocalizedText,
  /** Row label for the Mantel-Haenszel adjusted odds ratio. */
  adjustedLabel: LocalizedText,
  /** Marks the odds-ratio-of-1 line, e.g. "no effect". */
  noEffectLabel: LocalizedText,
  strata: z.array(InteractionStratum).min(2),
});
export type InteractionData = z.infer<typeof InteractionData>;

/**
 * One estimated difference, its confidence interval, and the quantity it is a
 * slice of.
 *
 * Needed because "statistically significant is not clinically significant"
 * cannot be told with any shape that already exists. Every other shape compares
 * groups; this lesson compares a result against TWO YARDSTICKS. Measured against
 * zero, the interval sits clear of no-difference and the p-value is tiny, so the
 * effect is certainly real. Measured against the thing it is supposed to fix, the
 * same number is a sliver. Same estimate, same interval, two scales, opposite
 * feelings, which is the design tenet exactly.
 *
 * It is deliberately NOT the relative-versus-absolute shape. That one is about
 * expressing one effect two ways; this one is about a p-value answering "could
 * this be chance" while saying nothing about "is this worth having", which is
 * why a large enough study makes a trivial difference overwhelmingly significant.
 *
 * The p-value and the sample description are authored strings, not numbers to
 * compute with: they come from the paper and are never recalculated here.
 */
const EffectData = z
  .object({
    type: z.literal("effect"),
    label: LocalizedText, // figure title
    unit: LocalizedText, // "hours"
    /** The point estimate of the difference, in `unit`. */
    estimate: z.number(),
    ciLow: z.number(),
    ciHigh: z.number(),
    /** As printed in the source, e.g. "P < 0.001". Never derived. */
    pValueLabel: LocalizedText,
    /** How much evidence sits behind it, e.g. "20 trials, 9,623 people". */
    sampleLabel: LocalizedText,
    noEffectLabel: LocalizedText, // "No difference"
    /** The whole quantity the effect is a slice of, in the same `unit`. */
    reference: z.number().positive(),
    referenceLabel: LocalizedText, // "Without the drug"
    /** The same quantity with the effect applied; derived, never authored. */
    treatedLabel: LocalizedText, // "With the drug"
    /** Names the benchmark the magnitude view measures against. */
    scaleLabel: LocalizedText, // "Against the whole illness"
  })
  .superRefine((d, ctx) => {
    if (d.ciLow > d.estimate || d.ciHigh < d.estimate) {
      ctx.addIssue({
        code: "custom",
        path: ["estimate"],
        message: `estimate (${d.estimate}) must lie inside its interval (${d.ciLow} to ${d.ciHigh})`,
      });
    }
    // The magnitude view draws the effect as a slice of the reference, so an
    // effect larger than the whole would draw a negative bar and, worse, would
    // mean the puzzle's own claim ("this is a sliver") is false.
    if (Math.abs(d.estimate) > d.reference) {
      ctx.addIssue({
        code: "custom",
        path: ["estimate"],
        message: `estimate (${d.estimate}) exceeds the reference quantity (${d.reference})`,
      });
    }
  });
export type EffectData = z.infer<typeof EffectData>;

/**
 * One relationship, measured at two different units of analysis.
 *
 * The ecological fallacy cannot be told with any existing shape, because every
 * other shape compares groups of the SAME kind of thing. Here the setup counts
 * places and the reveal counts people, and the whole lesson is that the answer
 * flips when the unit does. A rates chart cannot change what a row means
 * halfway through.
 *
 * The group level is authored as the correlation the source printed, drawn as a
 * slope rather than as points, because the source publishes the coefficient and
 * not the per-unit figures. Inventing plausible dots would be inventing data.
 * The person level is authored as real counts and its rates are derived, so the
 * two bars can never drift from the arithmetic.
 */
const EcologicalGroup = z.object({
  label: LocalizedText, // "People born abroad"
  short: LocalizedText.optional(),
  /** People with the outcome, in whatever unit `scaleNote` declares. */
  affected: z.number().int().nonnegative(),
  total: z.number().int().positive(),
});
export type EcologicalGroup = z.infer<typeof EcologicalGroup>;

const EcologicalData = z
  .object({
    type: z.literal("ecological"),
    label: LocalizedText, // figure title
    outcomeLabel: LocalizedText, // "could not read or write"
    /** What one dot is at the group level, e.g. "one state". */
    unitLabel: LocalizedText,
    xLabel: LocalizedText, // "share of people born abroad"
    yLabel: LocalizedText, // "share who could not read"
    /** The printed group-level correlation, e.g. -0.53. */
    groupCorrelation: z.number().min(-1).max(1),
    /** The printed person-level correlation, e.g. 0.118. */
    personCorrelation: z.number().min(-1).max(1),
    /** Says plainly that the slope is drawn, not measured point by point. */
    schematicNote: LocalizedText,
    /** Names the unit the counts are in, e.g. "thousands of people". */
    scaleNote: LocalizedText,
    groups: z.array(EcologicalGroup).min(2),
  })
  .superRefine((d, ctx) => {
    d.groups.forEach((g, i) => {
      if (g.affected > g.total) {
        ctx.addIssue({
          code: "custom",
          path: ["groups", i, "affected"],
          message: `affected (${g.affected}) exceeds the group total (${g.total})`,
        });
      }
    });
    // The puzzle only exists when the two levels disagree in sign. If they ever
    // agreed, the reveal would restate the setup and teach nothing.
    if (Math.sign(d.groupCorrelation) === Math.sign(d.personCorrelation)) {
      ctx.addIssue({
        code: "custom",
        path: ["groupCorrelation"],
        message:
          "the two levels must point opposite ways, otherwise there is no fallacy to show",
      });
    }
  });
export type EcologicalData = z.infer<typeof EcologicalData>;

/**
 * One choice, put to people twice in different words.
 *
 * Needed because no existing shape can hold this. Every other shape compares
 * outcomes; here the outcomes are IDENTICAL by construction and the only thing
 * that differs is the wording, so what is being measured is the audience, not
 * the world. The reveal is not new data, it is the same decision reworded.
 *
 * Authored as PERCENTAGES with the sample size, not as counts, and that is a
 * deliberate exception to this project's usual rule. The source prints
 * percentages and N and never the numerators: 72 per cent of 152 is 109.44, so
 * there is no integer to author. Rounding to a plausible count would be
 * inventing data, so the shape takes what was actually published and
 * `percentNote` states that on the figure.
 */
const FramingFrame = z.object({
  id: z.string().min(1),
  /** How this version was worded, e.g. "Described as lives saved". */
  label: LocalizedText,
  short: LocalizedText.optional(),
  /** The certain option as this version put it. */
  sureText: LocalizedText,
  /** The gamble as this version put it. */
  gambleText: LocalizedText,
  /** Percentages as printed in the source, never recomputed. */
  surePercent: z.number().min(0).max(100),
  gamblePercent: z.number().min(0).max(100),
  n: z.number().int().positive(),
});
export type FramingFrame = z.infer<typeof FramingFrame>;

const FramingData = z
  .object({
    type: z.literal("framing"),
    label: LocalizedText, // figure title
    /** What is at stake, identical in both versions. */
    stakeLabel: LocalizedText,
    sureLabel: LocalizedText, // "The certain option"
    gambleLabel: LocalizedText, // "The gamble"
    /** Says on the figure that these are published percentages, not counts. */
    percentNote: LocalizedText,
    frames: z.array(FramingFrame).length(2),
  })
  .superRefine((d, ctx) => {
    d.frames.forEach((f, i) => {
      // Respondents chose one or the other, so the two shares account for
      // everyone. Allow a point of slack: sources round each share separately.
      const total = f.surePercent + f.gamblePercent;
      if (Math.abs(total - 100) > 1) {
        ctx.addIssue({
          code: "custom",
          path: ["frames", i, "surePercent"],
          message: `the two shares come to ${total}, which is not everyone`,
        });
      }
    });
    // Without a reversal there is no lesson: the puzzle exists to show that
    // rewording the SAME choice flips which option wins.
    const [a, b] = d.frames;
    const aPrefersSure = a.surePercent > a.gamblePercent;
    const bPrefersSure = b.surePercent > b.gamblePercent;
    if (aPrefersSure === bPrefersSure) {
      ctx.addIssue({
        code: "custom",
        path: ["frames"],
        message:
          "both wordings favour the same option, so there is no reversal to reveal",
      });
    }
  });
export type FramingData = z.infer<typeof FramingData>;

/**
 * One published arithmetic mean, and how much of the thing it summarises falls
 * below it.
 *
 * Needed because no existing shape can hold this. Every other shape compares
 * two or more quantities; this lesson compares ONE number against the spread it
 * came from. The claim is not "this group beat that group" but "this single
 * number sits in the wrong place inside its own distribution", and the reveal is
 * not new data, it is the position of the number already shown. A rates chart
 * can draw the mean or the share, never the mean's place among the values, so
 * the reveal would only restate the setup.
 *
 * Authored as the PERCENTAGE below the mean, with the mean, exactly as the
 * source prints them, and never as counts. That is the same deliberate
 * exception the `framing` shape makes: recovering counts would need the number
 * of items behind each percentage, which is not published per journal here, and
 * multiplying a percentage by an assumed denominator would be inventing data.
 * `percentNote` states that on the figure.
 */
export const DistributionGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Science"
  short: LocalizedText.optional(),
  /** The published arithmetic mean, e.g. a journal impact factor. */
  mean: z.number().positive(),
  /** Share of items falling BELOW that mean, as printed in the source. */
  percentBelowMean: z.number().min(0).max(100),
});
export type DistributionGroup = z.infer<typeof DistributionGroup>;

const DistributionData = z
  .object({
    type: z.literal("distribution"),
    label: LocalizedText, // figure title
    /** What one item is, e.g. "papers published in 2013 and 2014". */
    itemLabel: LocalizedText,
    /** What is counted per item, e.g. "citations received in 2015". */
    valueLabel: LocalizedText,
    /** Names the mean on the figure, e.g. "the journal's impact factor". */
    meanLabel: LocalizedText,
    belowLabel: LocalizedText, // "below their own journal's average"
    aboveLabel: LocalizedText, // "reached it"
    /** Says on the figure that these are published percentages, not counts. */
    percentNote: LocalizedText,
    groups: z.array(DistributionGroup).min(1),
  })
  .superRefine((d, ctx) => {
    d.groups.forEach((g, i) => {
      // The whole lesson is that the mean describes a minority. If a group ever
      // had most of its items at or above the mean, the puzzle's own claim would
      // be false for that group and the reveal would contradict the lesson.
      if (g.percentBelowMean <= 50) {
        ctx.addIssue({
          code: "custom",
          path: ["groups", i, "percentBelowMean"],
          message: `${g.percentBelowMean} per cent below the mean means the mean is not unrepresentative here, so there is nothing to reveal`,
        });
      }
    });
  });
export type DistributionData = z.infer<typeof DistributionData>;

/**
 * One outcome measured at several doses of the same thing.
 *
 * Needed because the lesson is the SHAPE of a curve rather than the size of a
 * gap, and no existing shape can carry a shape. Every other shape compares two
 * or three quantities; this one asks what happens between them. The setup can
 * show the two ends, which read as a tidy steady climb, and the reveal adds the
 * points in between, where the climb turns out to have been over almost
 * immediately. Same published numbers, and the reveal is the middle of them.
 *
 * `dose` is the real quantity, not a position in a list, and the renderer must
 * place points in proportion to it. Spacing doses evenly because they arrive
 * evenly in the array would stretch the gap between 0 and 1 to the same width as
 * the gap between 9 and 27, which is precisely the distortion the
 * `misleading-axis` puzzle exists to teach. A test pins that.
 *
 * Authored as PUBLISHED MEANS on a stated scale, never as counts, in the same
 * deliberate spirit as `framing` and `distribution`: the source reports rating
 * means, and inventing the counts behind them would be inventing data.
 */
export const DoseStep = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "seen 27 times"
  short: LocalizedText.optional(),
  /** How much of the thing, e.g. how many prior exposures. */
  dose: z.number().nonnegative(),
  /** The published mean outcome at this dose. */
  mean: z.number(),
  /** As printed, shown so the reader can see how solid each point is. */
  sd: z.number().nonnegative().optional(),
});
export type DoseStep = z.infer<typeof DoseStep>;

const DoseData = z
  .object({
    type: z.literal("dose"),
    label: LocalizedText, // figure title
    /** Names the horizontal quantity, e.g. "times seen a week earlier". */
    doseLabel: LocalizedText,
    /** Names the vertical one, e.g. "average rating that it is true". */
    outcomeLabel: LocalizedText,
    scaleMin: z.number(),
    scaleMax: z.number(),
    /** How much evidence sits behind it, e.g. "57 people". */
    sampleLabel: LocalizedText,
    /** Says on the figure that these are published means, not counts. */
    meansNote: LocalizedText,
    steps: z.array(DoseStep).min(3),
  })
  .superRefine((d, ctx) => {
    if (!(d.scaleMin < d.scaleMax)) {
      ctx.addIssue({
        code: "custom",
        path: ["scaleMax"],
        message: `scaleMax (${d.scaleMax}) must exceed scaleMin (${d.scaleMin})`,
      });
    }
    // The first step is the untreated baseline; without it there is no gain to
    // take a share of, and the reveal has nothing to measure against.
    if (d.steps[0]?.dose !== 0) {
      ctx.addIssue({
        code: "custom",
        path: ["steps", 0, "dose"],
        message: "the first step must be the zero-dose baseline",
      });
    }
    const seen = new Set<number>();
    d.steps.forEach((s, i) => {
      if (seen.has(s.dose)) {
        ctx.addIssue({
          code: "custom",
          path: ["steps", i, "dose"],
          message: `duplicate dose ${s.dose}`,
        });
      }
      seen.add(s.dose);
      if (i > 0 && s.dose <= d.steps[i - 1].dose) {
        ctx.addIssue({
          code: "custom",
          path: ["steps", i, "dose"],
          message: `doses must ascend; ${s.dose} follows ${d.steps[i - 1].dose}`,
        });
      }
      if (s.mean < d.scaleMin || s.mean > d.scaleMax) {
        ctx.addIssue({
          code: "custom",
          path: ["steps", i, "mean"],
          message: `mean (${s.mean}) falls outside the scale (${d.scaleMin} to ${d.scaleMax})`,
        });
      }
    });
    // The puzzle only exists when the curve front-loads. If the first step ever
    // stopped carrying most of the climb, the reveal would show an ordinary
    // straight line and the lesson would be false.
    const first = d.steps[0];
    const last = d.steps[d.steps.length - 1];
    const total = last.mean - first.mean;
    if (total > 0) {
      const share = (d.steps[1].mean - first.mean) / total;
      if (share < 0.4) {
        ctx.addIssue({
          code: "custom",
          path: ["steps", 1, "mean"],
          message: `the first step carries only ${Math.round(share * 100)} per cent of the climb, so there is no front-loading to reveal`,
        });
      }
    }
  });
export type DoseData = z.infer<typeof DoseData>;

/**
 * Two groups estimating the SAME quantity, and the answer they were both
 * reaching for.
 *
 * Needed because no existing shape can hold an estimate against a known truth.
 * Every other shape either compares groups to each other (`rates`, `framing`)
 * or one estimate to a benchmark (`effect`), and this lesson needs both at
 * once: the two guesses differ from each other, and both are hopeless against
 * the real answer. Drawing only the first is the setup; adding the second is
 * the reveal, and it is the same published numbers throughout.
 *
 * The scale does the teaching. Laid out against the true value, two guesses
 * that differ from each other by a factor of four both collapse into slivers,
 * which is the second half of the point and cannot be shown any other way.
 *
 * Authored as the PUBLISHED central estimates, never as counts, in the same
 * deliberate spirit as `framing`, `distribution` and `dose`. `statNote` states
 * on the figure what kind of average they are and what the source did not
 * print, because a source that gives no spread must not be drawn as though it
 * had.
 */
export const EstimateGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Shown the numbers ascending"
  short: LocalizedText.optional(),
  /** How the same quantity was put to this group, e.g. the expression as written. */
  promptText: LocalizedText,
  /** The published central estimate for this group. */
  estimate: z.number().positive(),
});
export type EstimateGroup = z.infer<typeof EstimateGroup>;

const EstimationData = z
  .object({
    type: z.literal("estimation"),
    label: LocalizedText, // figure title
    /** The checkable right answer both groups were estimating. */
    trueValue: z.number().positive(),
    trueLabel: LocalizedText, // "The actual product"
    /** Says what kind of average these are, and what the source did not print. */
    statNote: LocalizedText,
    groups: z.array(EstimateGroup).length(2),
  })
  .superRefine((d, ctx) => {
    const [a, b] = d.groups;
    // Both groups were estimating the same thing, so if their estimates ever
    // matched there would be no ordering effect to reveal.
    if (a.estimate === b.estimate) {
      ctx.addIssue({
        code: "custom",
        path: ["groups"],
        message: "both groups gave the same estimate, so there is nothing to reveal",
      });
    }
    // The second half of the lesson is that both guesses are far below the
    // truth. If either ever reached it, the figure would contradict the copy.
    d.groups.forEach((g, i) => {
      if (g.estimate >= d.trueValue) {
        ctx.addIssue({
          code: "custom",
          path: ["groups", i, "estimate"],
          message: `estimate (${g.estimate}) is not below the true value (${d.trueValue}), so there is no underestimation to show`,
        });
      }
    });
  });
export type EstimationData = z.infer<typeof EstimationData>;

/** Discriminated by `type`. Add new members here to support new data shapes. */
export const PuzzleData = z.discriminatedUnion("type", [
  RatesData,
  FrequenciesData,
  CausalData,
  SurvivorshipData,
  TimelineData,
  RiskData,
  AgreementData,
  RegressionData,
  InteractionData,
  EffectData,
  EcologicalData,
  FramingData,
  DistributionData,
  DoseData,
  EstimationData,
]);
export type PuzzleData = z.infer<typeof PuzzleData>;

/* ---------------------------------------------------------------------------
 * Data views, how a beat renders the data. The engine dispatches on `kind`.
 * ------------------------------------------------------------------------- */
/**
 * Fields every view carries. `groupIds` / `strataIds` draw only part of the
 * data: a setup beat often needs to show the slice that creates the illusion
 * and hold the rest back for the reveal (Berkson's bias is exactly this, the
 * hospital sample looks damning until the community sample lands beside it).
 * Omitted means "draw everything", so existing puzzles are untouched.
 */
const viewFields = {
  caption: LocalizedText.optional(),
  groupIds: z.array(z.string().min(1)).min(1).optional(),
  strataIds: z.array(z.string().min(1)).min(1).optional(),
};

export const DataView = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("aggregate"), ...viewFields }),
  z.object({ kind: z.literal("stratified"), ...viewFields }),
  z.object({ kind: z.literal("headline"), ...viewFields }),
  z.object({ kind: z.literal("breakdown"), ...viewFields }),
  z.object({ kind: z.literal("trend"), ...viewFields }),
  z.object({ kind: z.literal("cause"), ...viewFields }),
  z.object({ kind: z.literal("damage"), ...viewFields }),
  z.object({ kind: z.literal("armor"), ...viewFields }),
  z.object({ kind: z.literal("survival"), ...viewFields }),
  z.object({ kind: z.literal("lifespan"), ...viewFields }),
  z.object({ kind: z.literal("relative"), ...viewFields }),
  z.object({ kind: z.literal("absolute"), ...viewFields }),
  z.object({ kind: z.literal("counted"), ...viewFields }),
  z.object({ kind: z.literal("immortal"), ...viewFields }),
  z.object({ kind: z.literal("invented"), ...viewFields }),
  z.object({ kind: z.literal("agreement"), ...viewFields }),
  z.object({ kind: z.literal("extremes"), ...viewFields }),
  z.object({ kind: z.literal("reversion"), ...viewFields }),
  z.object({ kind: z.literal("crude"), ...viewFields }),
  z.object({ kind: z.literal("bystratum"), ...viewFields }),
  z.object({ kind: z.literal("significance"), ...viewFields }),
  z.object({ kind: z.literal("magnitude"), ...viewFields }),
  z.object({ kind: z.literal("byplace"), ...viewFields }),
  z.object({ kind: z.literal("byperson"), ...viewFields }),
  z.object({ kind: z.literal("onewording"), ...viewFields }),
  z.object({ kind: z.literal("bothwordings"), ...viewFields }),
  z.object({ kind: z.literal("average"), ...viewFields }),
  z.object({ kind: z.literal("spread"), ...viewFields }),
  z.object({ kind: z.literal("partial"), ...viewFields }),
  z.object({ kind: z.literal("curve"), ...viewFields }),
  z.object({ kind: z.literal("oneguess"), ...viewFields }),
  z.object({ kind: z.literal("withtruth"), ...viewFields }),
]);
export type DataView = z.infer<typeof DataView>;
export type DataViewKind = DataView["kind"];

/* ---------------------------------------------------------------------------
 * Beats
 * ------------------------------------------------------------------------- */
export const Choice = z.object({
  id: z.string().min(1), // must match a group id
  label: LocalizedText,
  sublabel: LocalizedText.optional(),
  isCorrect: z.boolean(), // the answer the evidence supports
  isIntuitiveTrap: z.boolean(), // the intuitive-but-wrong pick
});
export type Choice = z.infer<typeof Choice>;

export const Provenance = z
  .object({
    source: z.string().min(1), // full primary-literature citation
    year: z.number().int(),
    url: z.url().optional(),
    doi: z.string().optional(),
    note: LocalizedText.optional(),
  })
  .refine((p) => Boolean(p.url || p.doi), {
    error: "provenance requires a url or doi",
  });
export type Provenance = z.infer<typeof Provenance>;

/** A real-world instance of the same skill, for the optional deep-dive. Each
 * example is sourced to primary literature, same bar as the puzzle itself. */
export const Example = z.object({
  title: LocalizedText,
  summary: LocalizedText,
  provenance: Provenance,
});
export type Example = z.infer<typeof Example>;

/* ---------------------------------------------------------------------------
 * Tags, who a bias is most relevant to (audience) and where it shows up
 * (domain). A puzzle carries one or more, so a library of biases can be browsed
 * and filtered by relevance. The schema pins only the controlled vocabulary;
 * display metadata (labels, grouping, order) lives in ./tags.ts.
 * ------------------------------------------------------------------------- */
export const TAG_IDS = [
  // audience, who most needs this
  "everyday",
  "clinical",
  "research",
  // method, cross-cutting
  "statistics",
  // medicine
  "diagnosis",
  "screening",
  "epidemiology",
  "pharmacology",
  // sciences
  "psychology",
  "biology",
  "technology",
  // social sciences
  "economics",
  "politics",
  "education",
  // applied
  "finance",
  "business",
  "law",
  "sports",
  // humanities
  "history",
  "media",
] as const;
export const TagId = z.enum(TAG_IDS);
export type TagId = z.infer<typeof TagId>;

export const Puzzle = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string().min(1),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, "slug must be kebab-case (a-z, 0-9, -)"),
    // Free kebab strings (not enums) so a new puzzle never requires an engine edit.
    category: z.string().min(1), // "causal-reasoning"
    reasoningSkill: z.string().min(1), // "simpsons-paradox"
    difficulty: z.enum(["easy", "medium", "hard"]),
    // Audience/domain tags (≥1); see TAG_IDS. A bias can carry several.
    tags: z.array(TagId).min(1),
    supportedLocales: z.array(z.string()).default(["en"]),

    setup: z.object({
      headline: LocalizedText,
      framing: LocalizedText,
      question: LocalizedText,
      data: PuzzleData,
      initialView: DataView, // usually { kind: "aggregate" }
    }),

    choices: z.array(Choice).min(2),

    reveal: z.object({
      headline: LocalizedText,
      // The gold callout's heading, names the mechanism/insight behind the
      // reveal (the confounder for Simpson's, the base rate for base-rate
      // neglect, etc.). Not confounding-specific.
      mechanismName: LocalizedText,
      explanation: LocalizedText,
      view: DataView, // usually { kind: "stratified" }
      body: LocalizedText.optional(),
      // The callout's small eyebrow above it (default "The lurking variable").
      mechanismLabel: LocalizedText.optional(),
      // Heading over the case-mix bars, which are only drawn for stratified
      // rates data (default "Who each treatment actually treated"). Not every
      // stratified puzzle is comparing treatments.
      caseMixLabel: LocalizedText.optional(),
    }),

    lesson: z.object({
      skillName: LocalizedText,
      takeaway: LocalizedText,
      body: LocalizedText.optional(),
      // Optional "learn more" deep-dive, shown collapsed on the lesson screen.
      howItWorks: LocalizedText.optional(),
      examples: z.array(Example).optional(),
    }),

    share: z.object({
      title: LocalizedText,
      // Plain-language explanation of the skill for the share card, written for
      // anyone, not just scientists. Longer/looser than the lesson takeaway.
      explainer: LocalizedText,
      captions: z.object({
        competitive: LocalizedText,
        selfDeprecating: LocalizedText,
      }),
    }),

    provenance: Provenance,
    goDeeperUrl: z.url().optional(),
  })
  .superRefine((p, ctx) => {
    // exactly one correct choice, at least one trap
    const correct = p.choices.filter((c) => c.isCorrect);
    if (correct.length !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["choices"],
        message: `exactly one choice must have isCorrect: true (found ${correct.length})`,
      });
    }
    if (!p.choices.some((c) => c.isIntuitiveTrap)) {
      ctx.addIssue({
        code: "custom",
        path: ["choices"],
        message: "at least one choice must be flagged isIntuitiveTrap: true",
      });
    }

    if (p.setup.data.type === "rates") {
      const d = p.setup.data;
      const groupIds = new Set(d.groups.map((g) => g.id));
      const stratumIds = new Set(d.strata.map((s) => s.id));
      const seen = new Set<string>();

      d.observations.forEach((o, i) => {
        if (o.numerator > o.denominator) {
          ctx.addIssue({
            code: "custom",
            path: ["setup", "data", "observations", i],
            message: `numerator ${o.numerator} exceeds denominator ${o.denominator}`,
          });
        }
        if (!groupIds.has(o.groupId)) {
          ctx.addIssue({
            code: "custom",
            path: ["setup", "data", "observations", i, "groupId"],
            message: `unknown group id "${o.groupId}"`,
          });
        }
        if (!stratumIds.has(o.stratumId)) {
          ctx.addIssue({
            code: "custom",
            path: ["setup", "data", "observations", i, "stratumId"],
            message: `unknown stratum id "${o.stratumId}"`,
          });
        }
        const key = `${o.groupId}::${o.stratumId}`;
        if (seen.has(key)) {
          ctx.addIssue({
            code: "custom",
            path: ["setup", "data", "observations", i],
            message: `duplicate observation for ${key}`,
          });
        }
        seen.add(key);
      });

      // every group × stratum cell must be present
      for (const g of d.groups) {
        for (const s of d.strata) {
          if (!seen.has(`${g.id}::${s.id}`)) {
            ctx.addIssue({
              code: "custom",
              path: ["setup", "data", "observations"],
              message: `missing observation for group "${g.id}" × stratum "${s.id}"`,
            });
          }
        }
      }

      // Separate samples must never be pooled: an "overall" bar across a
      // community survey and the hospital subset inside it counts people twice
      // and means nothing.
      if (d.strataAreSeparateSamples) {
        for (const [where, view] of [
          ["initialView", p.setup.initialView],
          ["reveal.view", p.reveal.view],
        ] as const) {
          if (view.kind === "aggregate") {
            ctx.addIssue({
              code: "custom",
              path: [where, "kind"],
              message:
                "cannot pool strata that are separate samples (strataAreSeparateSamples is set)",
            });
          }
        }
      }

      // A view that filters to a group or stratum must name one that exists,
      // otherwise the beat silently renders an empty chart.
      for (const [where, view] of [
        ["initialView", p.setup.initialView],
        ["reveal.view", p.reveal.view],
      ] as const) {
        for (const id of view.groupIds ?? []) {
          if (!groupIds.has(id)) {
            ctx.addIssue({
              code: "custom",
              path: [where, "groupIds"],
              message: `unknown group id "${id}"`,
            });
          }
        }
        for (const id of view.strataIds ?? []) {
          if (!stratumIds.has(id)) {
            ctx.addIssue({
              code: "custom",
              path: [where, "strataIds"],
              message: `unknown stratum id "${id}"`,
            });
          }
        }
      }

      // Choice ids deliberately need NOT name a group. Some paradoxes have no
      // winning group: the Will Rogers phenomenon's honest answer is "nothing
      // changed". Nothing in the renderers resolves a choice id to a group
      // (the charts highlight via bestGroupId, computed from the data alone),
      // so requiring it would only rule out valid puzzles.
    }

    if (p.setup.data.type === "frequencies") {
      const d = p.setup.data;
      const path = ["setup", "data"] as const;
      if (d.withCondition > d.total) {
        ctx.addIssue({
          code: "custom",
          path: [...path, "withCondition"],
          message: `withCondition (${d.withCondition}) exceeds total (${d.total})`,
        });
      }
      if (d.positiveGivenCondition > d.withCondition) {
        ctx.addIssue({
          code: "custom",
          path: [...path, "positiveGivenCondition"],
          message: `true positives (${d.positiveGivenCondition}) exceed those with the condition (${d.withCondition})`,
        });
      }
      const without = d.total - d.withCondition;
      if (d.positiveGivenNoCondition > without) {
        ctx.addIssue({
          code: "custom",
          path: [...path, "positiveGivenNoCondition"],
          message: `false positives (${d.positiveGivenNoCondition}) exceed those without the condition (${without})`,
        });
      }
    }

    if (p.setup.data.type === "risk") {
      const d = p.setup.data;
      for (const arm of ["control", "treated"] as const) {
        if (d[arm].events > d[arm].n) {
          ctx.addIssue({
            code: "custom",
            path: ["setup", "data", arm, "events"],
            message: `events (${d[arm].events}) exceed the arm size (${d[arm].n})`,
          });
        }
      }
      // Without events in the control arm there is no risk to reduce, and the
      // relative view would divide by zero.
      if (d.control.events === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["setup", "data", "control", "events"],
          message: "the control arm needs at least one event to compare against",
        });
      }
    }

    if (p.setup.data.type === "timeline") {
      const d = p.setup.data;
      const seen = new Set<string>();
      d.tracks.forEach((tr, i) => {
        const at = (k: string) => ["setup", "data", "tracks", i, k];
        if (seen.has(tr.id)) {
          ctx.addIssue({
            code: "custom",
            path: at("id"),
            message: `duplicate track id "${tr.id}"`,
          });
        }
        seen.add(tr.id);
        // A life runs one way: it starts, it is found, it ends, inside the axis.
        // Which of those instants differ between tracks is the puzzle's business
        // (and its test's); that they are ordered at all is structural.
        if (!(tr.onsetAt <= tr.detectedAt)) {
          ctx.addIssue({
            code: "custom",
            path: at("detectedAt"),
            message: `detectedAt (${tr.detectedAt}) precedes onsetAt (${tr.onsetAt})`,
          });
        }
        if (!(tr.detectedAt <= tr.diedAt)) {
          ctx.addIssue({
            code: "custom",
            path: at("diedAt"),
            message: `diedAt (${tr.diedAt}) precedes detectedAt (${tr.detectedAt})`,
          });
        }
        if (!(tr.diedAt <= d.span)) {
          ctx.addIssue({
            code: "custom",
            path: at("diedAt"),
            message: `diedAt (${tr.diedAt}) runs past the axis span (${d.span})`,
          });
        }
        // Immortal time is a stretch of the track, so it has to lie on it. A
        // stretch running past the death would be claiming a person was
        // guaranteed alive after they died.
        if (tr.immortalUntil !== undefined) {
          if (tr.immortalUntil < tr.onsetAt || tr.immortalUntil > tr.diedAt) {
            ctx.addIssue({
              code: "custom",
              path: at("immortalUntil"),
              message: `immortalUntil (${tr.immortalUntil}) falls outside the track (${tr.onsetAt} to ${tr.diedAt})`,
            });
          }
        }
      });

      // A view that shades immortal time needs at least one track to have some,
      // or the reveal draws nothing and the beat is empty.
      const shadesImmortal = [p.setup.initialView, p.reveal.view].some(
        (v) => v.kind === "immortal",
      );
      if (shadesImmortal && !d.tracks.some((tr) => tr.immortalUntil !== undefined)) {
        ctx.addIssue({
          code: "custom",
          path: ["setup", "data", "tracks"],
          message: "an immortal view needs at least one track with immortalUntil",
        });
      }
    }

    if (p.setup.data.type === "regression") {
      const d = p.setup.data;
      const at = (...k: (string | number)[]) => ["setup", "data", ...k];
      if (!(d.axisMin < d.axisMax)) {
        ctx.addIssue({
          code: "custom",
          path: at("axisMax"),
          message: `axisMax (${d.axisMax}) must be greater than axisMin (${d.axisMin})`,
        });
      }
      if (d.mean < d.axisMin || d.mean > d.axisMax) {
        ctx.addIssue({
          code: "custom",
          path: at("mean"),
          message: `mean (${d.mean}) falls outside the axis (${d.axisMin} to ${d.axisMax})`,
        });
      }
      const seen = new Set<string>();
      d.groups.forEach((g, i) => {
        if (seen.has(g.id)) {
          ctx.addIssue({
            code: "custom",
            path: at("groups", i, "id"),
            message: `duplicate group id "${g.id}"`,
          });
        }
        seen.add(g.id);
        for (const key of ["first", "second"] as const) {
          if (g[key] < d.axisMin || g[key] > d.axisMax) {
            ctx.addIssue({
              code: "custom",
              path: at("groups", i, key),
              message: `${key} (${g[key]}) falls outside the axis (${d.axisMin} to ${d.axisMax})`,
            });
          }
        }
      });
    }

    if (p.setup.data.type === "interaction") {
      const d = p.setup.data;
      const seen = new Set<string>();
      d.strata.forEach((s, i) => {
        const at = (k: string) => ["setup", "data", "strata", i, k];
        if (seen.has(s.id)) {
          ctx.addIssue({
            code: "custom",
            path: at("id"),
            message: `duplicate stratum id "${s.id}"`,
          });
        }
        seen.add(s.id);
        // The odds ratio divides by unexposedCases and exposedControls, and a
        // zero in any cell makes an odds ratio 0 or infinite, which the chart
        // cannot place. Real 2x2 modification data fills every cell.
        for (const cell of [
          "exposedCases",
          "exposedControls",
          "unexposedCases",
          "unexposedControls",
        ] as const) {
          if (s[cell] <= 0) {
            ctx.addIssue({
              code: "custom",
              path: at(cell),
              message: `${cell} must be positive for an odds ratio to be defined`,
            });
          }
        }
      });
    }
  });
export type Puzzle = z.infer<typeof Puzzle>;
