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
   * Whether the two arms were RANDOMISED, which is what licenses re-dealing
   * the patients into subgroups at random.
   *
   * OPT-IN, AND NOT DERIVABLE FROM THE COUNTS. Randomisation is what makes
   * patients exchangeable between the arms, so a random subgroup of a
   * randomised trial differs from the whole only by chance, which is the point
   * the slicer exists to make. Deal an OBSERVATIONAL comparison the same way
   * and every subgroup silently inherits whatever sorted people into the
   * groups to begin with: the figure would then teach that those differences
   * are chance when they are the opposite of chance. `kidney-stones` is the
   * deck's standing example of that data and must never get this toy.
   *
   * Optional rather than defaulted, because `.default()` makes the inferred
   * type required and would force an edit to every existing puzzle. A puzzle
   * that says nothing gets no toy, which is the safe direction to fail.
   */
  armsAreRandomised: z.boolean().optional(),

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
  /**
   * Whether the base rate is something a reader can meaningfully move.
   *
   * OPT-IN, AND NOT DERIVABLE FROM THE COUNTS. `medical-test` and
   * `courtroom-odds` are the same shape and the same arithmetic, both pass
   * every structural check the toy makes, and only one of them can be dragged:
   * for a screening test the base rate is a property of WHO YOU TEST, which is
   * exactly the clinical choice, while in the courtroom ONE CRIME HAPPENED and
   * "how many couples did it" is not a dial. Inviting a reader to turn that one
   * would teach that the base rate is a matter of opinion. This flag is the
   * only thing that separates them.
   *
   * Optional rather than defaulted, because `.default()` makes the inferred
   * type required and would force an edit to every existing puzzle. A puzzle
   * that says nothing gets no toy, which is the safe direction to fail.
   */
  baseRateCanVary: z.boolean().optional(),
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
  /*
    Says plainly that the rising line is drawn from a published coefficient
    rather than plotted point by point, exactly as `EcologicalData` does and
    for the same reason.

    REQUIRED, not optional, because the figure this shape draws is a trend
    chart and a trend chart reads as measurement. `CausalView` used to scatter
    seven hardcoded points across that line, under a comment describing them as
    "a handful of points sitting near the rising trend line", and nothing on
    the figure or in its aria-label said they were invented. They were the only
    numbers in the deck nobody sourced. The dots are gone and the disclosure is
    mandatory, so a second causal puzzle cannot reintroduce the defect by
    omission: leaving the field out is a tsc error rather than a silent
    unlabelled figure.
  */
  schematicNote: LocalizedText,
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

/**
 * THE PROXY SHAPE: two groups held at one place by a model, weighed twice.
 *
 * A model is trained on a convenient stand-in for the thing anyone actually
 * cares about, because the stand-in is what the data holds. On the scale it was
 * trained on, the groups look alike, and every accuracy check anyone would
 * think to run agrees. On the scale that mattered, they were never alike.
 *
 * WHAT MAKES THIS ITS OWN SHAPE rather than a use of `surrogate` or `target`.
 * `SurrogateData` is a stand-in OUTCOME inside a trial, and carries run-in
 * stages and two arms it does not have here. `TargetData` is about gaming, and
 * needs a deadline and the bunching before it. Neither has anywhere to put the
 * thing this lesson turns on, which is one population measured on two
 * different scales that disagree about whether the groups are the same.
 *
 * A MEASURE IS EITHER `proxy` OR `truth`, and the setup draws only the proxy
 * ones. That is a slice, so `ProxyView` takes the unrestricted data as well and
 * resolves colour through `declaredColors`: without it, a group drawn alone at
 * the setup takes slot 0 and then moves when the reveal brings the others in.
 */
const ProxyGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  /** Short form for an axis, e.g. "White". */
  short: LocalizedText,
});
export type ProxyGroup = z.infer<typeof ProxyGroup>;

const ProxyMeasure = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  /**
   * `proxy` is what the model was trained to predict. `truth` is what anybody
   * actually wanted it to predict. The whole lesson is that these disagree,
   * so a shape with only one of them would have nothing to show.
   */
  scale: z.enum(["proxy", "truth"]),
  /** How the number is printed. Locale formatting happens in the renderer. */
  unit: z.enum(["currency", "count", "percentile"]),
  /** Said under the number when a bare count would be ambiguous. */
  per: LocalizedText.optional(),
});
export type ProxyMeasure = z.infer<typeof ProxyMeasure>;

const ProxyObservation = z.object({
  measureId: z.string().min(1),
  groupId: z.string().min(1),
  value: z.number().nonnegative(),
});
export type ProxyObservation = z.infer<typeof ProxyObservation>;

const ProxyData = z
  .object({
    type: z.literal("proxy"),
    label: LocalizedText,
    /** Names what the model was trained on, on the figure. */
    trainedOnLabel: LocalizedText,
    /** Names what it was supposed to be about, on the figure. */
    mattersLabel: LocalizedText,
    /** Says what the numbers count, e.g. "per patient-year". */
    basisNote: LocalizedText,
    groups: z.array(ProxyGroup).length(2),
    measures: z.array(ProxyMeasure).min(2),
    observations: z.array(ProxyObservation).min(4),
  })
  .superRefine((d, ctx) => {
    const groupIds = new Set(d.groups.map((g) => g.id));
    const measureIds = new Set(d.measures.map((m) => m.id));
    if (groupIds.size !== d.groups.length) {
      ctx.addIssue({ code: "custom", message: "group ids must be unique" });
    }
    if (measureIds.size !== d.measures.length) {
      ctx.addIssue({ code: "custom", message: "measure ids must be unique" });
    }
    // BOTH SCALES OR THERE IS NO LESSON. A figure with only the proxy measures
    // has nothing to reveal, and one with only the truth measures never sets
    // the trap in the first place.
    for (const scale of ["proxy", "truth"] as const) {
      if (!d.measures.some((m) => m.scale === scale)) {
        ctx.addIssue({ code: "custom", message: `needs at least one ${scale} measure` });
      }
    }
    // EVERY CELL EXACTLY ONCE. A missing cell would draw a group as absent
    // rather than as equal, which is a different and much stronger claim.
    for (const m of d.measures) {
      for (const g of d.groups) {
        const n = d.observations.filter(
          (o) => o.measureId === m.id && o.groupId === g.id,
        ).length;
        if (n !== 1) {
          ctx.addIssue({
            code: "custom",
            message: `measure ${m.id} needs exactly one observation for group ${g.id}, found ${n}`,
          });
        }
      }
    }
    for (const o of d.observations) {
      if (!measureIds.has(o.measureId)) {
        ctx.addIssue({ code: "custom", message: `unknown measureId ${o.measureId}` });
      }
      if (!groupIds.has(o.groupId)) {
        ctx.addIssue({ code: "custom", message: `unknown groupId ${o.groupId}` });
      }
    }
  });
export type ProxyData = z.infer<typeof ProxyData>;

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
        message:
          "both groups gave the same estimate, so there is nothing to reveal",
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

/**
 * Salience data: head-to-head comparisons the public was asked to make, with
 * how the answers split and which side was actually right.
 *
 * `estimation` cannot hold this. It carries two groups estimating one quantity
 * against one true value, which is the anchoring design. Here each comparison
 * is its own question with its own answer, and the lesson lives in the pattern
 * across several of them: which ones the public got right, and what the ones
 * they got wrong have in common. The setup draws the split alone, naming no
 * winner, so the reader sees exactly what a survey result looks like before
 * anybody checks it against the world.
 *
 * Shares are authored as the percentage who picked the side that is in fact
 * more frequent, because that is what the source prints. The other side's share
 * is derived, never authored, so the two can never fail to sum to 100.
 */
export const SalienceComparison = z.object({
  id: z.string().min(1),
  /** The two options, worded as they were put to the subjects. */
  optionA: LocalizedText,
  optionB: LocalizedText,
  /** Which of the two actually happens more often. */
  commoner: z.enum(["a", "b"]),
  /** How many times more often, as the source prints it. */
  trueRatio: z.number().positive(),
  /** Percentage of subjects who picked the one that actually happens more. */
  percentCorrect: z.number().min(0).max(100),
});
export type SalienceComparison = z.infer<typeof SalienceComparison>;

const SalienceData = z
  .object({
    type: z.literal("salience"),
    label: LocalizedText, // figure title
    /** What the bars measure, e.g. "Share of people who picked each one". */
    splitLabel: LocalizedText,
    /** What the reveal adds, e.g. "Which one actually kills more". */
    truthLabel: LocalizedText,
    /** Says whose answers these are and what the source did not print. */
    statNote: LocalizedText,
    comparisons: z.array(SalienceComparison).min(2),
  })
  .superRefine((d, ctx) => {
    // A tie has no right answer, so `commoner` would be asserting something the
    // data does not support.
    d.comparisons.forEach((c, i) => {
      if (c.trueRatio === 1) {
        ctx.addIssue({
          code: "custom",
          path: ["comparisons", i, "trueRatio"],
          message:
            "a ratio of 1 means neither option is commoner, so there is nothing to be right about",
        });
      }
    });
    // The whole lesson is the contrast between the ones the public got right
    // and the ones it got wrong. With no majority on each side there is no
    // pattern to find, and the reveal would only restate the setup.
    const missed = d.comparisons.filter((c) => c.percentCorrect < 50);
    const hit = d.comparisons.filter((c) => c.percentCorrect > 50);
    if (missed.length === 0 || hit.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["comparisons"],
        message:
          "needs at least one comparison the majority got right and one it got wrong, or there is no pattern to reveal",
      });
    }
  });
export type SalienceData = z.infer<typeof SalienceData>;

/** Discriminated by `type`. Add new members here to support new data shapes. */
/* ---------------------------------------------------------------------------
 * Signed movement, measured on the same people more than once.
 *
 * Needed because `rates` cannot express this and would misdescribe it even
 * where it could. A net change is movers-toward minus movers-away, so it is a
 * balance rather than a share: it can be negative, and a bar drawn from zero to
 * a proportion would tell the reader that this many people did something, which
 * is not what the number counts. `Observation.numerator` is a nonnegative
 * integer for good reasons, and loosening it would let every existing puzzle
 * express something it should not.
 *
 * The lesson this exists for is the sleeper effect, where the whole point is
 * that one line falls while another rises, so the shape has to hold a direction
 * as well as a size.
 * ------------------------------------------------------------------------- */
const DriftSeries = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(), // compact label for the chart
});
export type DriftSeries = z.infer<typeof DriftSeries>;

const DriftCheckpoint = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Straight afterwards", "Four weeks later"
});
export type DriftCheckpoint = z.infer<typeof DriftCheckpoint>;

const DriftObservation = z.object({
  seriesId: z.string().min(1),
  checkpointId: z.string().min(1),
  /**
   * Signed, and that is the point of the shape. Movers toward the thing minus
   * movers away from it, measured against the baseline the puzzle names.
   */
  net: z.number().int(),
  denominator: z.number().int().positive(),
});
export type DriftObservation = z.infer<typeof DriftObservation>;

const DriftData = z
  .object({
    type: z.literal("drift"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what the signed number counts
    /** Names the zero line, e.g. "where they started before hearing it". */
    baselineLabel: LocalizedText,
    series: z.array(DriftSeries).min(2),
    checkpoints: z.array(DriftCheckpoint).min(2),
    observations: z.array(DriftObservation).min(2),
  })
  .superRefine((d, ctx) => {
    const seriesIds = new Set(d.series.map((s) => s.id));
    const checkpointIds = new Set(d.checkpoints.map((c) => c.id));
    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!seriesIds.has(o.seriesId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "seriesId"],
          message: `no series with id ${o.seriesId}`,
        });
      if (!checkpointIds.has(o.checkpointId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "checkpointId"],
          message: `no checkpoint with id ${o.checkpointId}`,
        });
      // A net cannot exceed the people it was computed over in either
      // direction, so this catches a sign slip or a mistyped denominator.
      if (Math.abs(o.net) > o.denominator)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "net"],
          message: `net ${o.net} is larger than the ${o.denominator} people it was measured over`,
        });
      seen.add(`${o.seriesId}|${o.checkpointId}`);
    });
    // A missing cell would silently drop a line from the chart, which for this
    // shape means losing half of a comparison the whole lesson rests on.
    for (const s of d.series)
      for (const c of d.checkpoints)
        if (!seen.has(`${s.id}|${c.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `no observation for series ${s.id} at checkpoint ${c.id}`,
          });
  });
export type DriftData = z.infer<typeof DriftData>;

/* ---------------------------------------------------------------------------
 * Mean ratings on a bounded scale, with dispersion when the source prints it.
 *
 * The deck has refused several lessons for want of this. Whole literatures
 * measure their outcome as a rating rather than a count: the third-person
 * effect, the innuendo effect, most of persuasion research. `rates` cannot hold
 * a mean, and reconstructing counts from a mean is not possible at all, so
 * those lessons were either dropped or shipped on a neighbouring paradigm that
 * happened to produce a headcount.
 *
 * What makes a mean drawable honestly is the scale. A bar from zero to 3.23
 * says nothing, because zero is not where the scale starts and 3.23 is not a
 * quantity of anything. A position on a labelled axis from 1 to 5, with the
 * point that means "no effect at all" marked, says exactly what the number
 * means. So the scale is required and its endpoints must be named.
 *
 * `sd` is optional because papers vary in what they print, and a puzzle that
 * has one should show it rather than imply a precision the data does not have.
 * ------------------------------------------------------------------------- */
const RatingScale = z.object({
  min: z.number(),
  max: z.number(),
  minLabel: LocalizedText, // "1, a large positive effect"
  maxLabel: LocalizedText, // "5, a large negative effect"
  /** A meaningful point worth drawing, usually the neutral one. */
  anchorAt: z.number().optional(),
  anchorLabel: LocalizedText.optional(), // "3, no effect at all"
});
export type RatingScale = z.infer<typeof RatingScale>;

const RatingSeries = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
});
export type RatingSeries = z.infer<typeof RatingSeries>;

const RatingObservation = z.object({
  seriesId: z.string().min(1),
  mean: z.number(),
  /** Standard deviation, when the source prints one. */
  sd: z.number().positive().optional(),
  n: z.number().int().positive(),
});
export type RatingObservation = z.infer<typeof RatingObservation>;

const RatingsData = z
  .object({
    type: z.literal("ratings"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what was rated
    scale: RatingScale,
    /** Says on the figure what the whisker is, e.g. one standard deviation. */
    dispersionLabel: LocalizedText.optional(),
    series: z.array(RatingSeries).min(2),
    observations: z.array(RatingObservation).min(2),
  })
  .superRefine((d, ctx) => {
    if (d.scale.max <= d.scale.min)
      ctx.addIssue({
        code: "custom",
        path: ["scale", "max"],
        message: "scale max must be above scale min",
      });
    if (d.scale.anchorAt !== undefined) {
      if (d.scale.anchorAt < d.scale.min || d.scale.anchorAt > d.scale.max)
        ctx.addIssue({
          code: "custom",
          path: ["scale", "anchorAt"],
          message: "the anchor must sit on the scale",
        });
      if (!d.scale.anchorLabel)
        ctx.addIssue({
          code: "custom",
          path: ["scale", "anchorLabel"],
          message: "an anchor drawn without a label tells the reader nothing",
        });
    } else if (d.scale.anchorLabel) {
      // The other direction, which is worse. `RatingsView` prints the label
      // whenever it exists but draws the line only when `anchorAt` does, so a
      // label without a position puts a sentence on screen describing a mark
      // the reader cannot see.
      ctx.addIssue({
        code: "custom",
        path: ["scale", "anchorAt"],
        message:
          "anchorLabel describes a mark on the axis, so anchorAt has to say where it goes",
      });
    }
    const ids = new Set(d.series.map((s) => s.id));
    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!ids.has(o.seriesId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "seriesId"],
          message: `no series with id ${o.seriesId}`,
        });
      // A mean off the end of its own scale is a transcription error, and it
      // would draw off the end of the figure too.
      if (o.mean < d.scale.min || o.mean > d.scale.max)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "mean"],
          message: `mean ${o.mean} is outside the ${d.scale.min} to ${d.scale.max} scale`,
        });
      if (seen.has(o.seriesId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "seriesId"],
          message: `two observations for series ${o.seriesId}`,
        });
      seen.add(o.seriesId);
    });
    for (const s of d.series)
      if (!seen.has(s.id))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message: `no observation for series ${s.id}`,
        });
  });
export type RatingsData = z.infer<typeof RatingsData>;

/* ---------------------------------------------------------------------------
 * Counts in ordered bins, with a line drawn somewhere along them.
 *
 * Every other shape in this file compares quantities. This one is about where
 * a quantity suddenly stops being smooth. The lesson is that a threshold in a
 * measurement reshapes the thing measured: people pile up on the good side of
 * an arbitrary line, so the count just short of it is inflated by everyone who
 * pushed, and the count just past it is depleted by the same people.
 *
 * `distribution` cannot hold this. That shape exists to say a mean describes a
 * minority, and its guard actively requires most items to sit below the mean.
 * `dose` is the nearest relative, since it also carries a curve rather than a
 * gap, but its points are doses of something administered, not bins of a
 * measured outcome, and it has no notion of a line that matters.
 *
 * What makes the reveal work is holding the far side back: the setup shows the
 * bins approaching the line, which read as an ordinary gentle slope, and the
 * reveal adds the bins past it. Same counts, drawn twice, which is the whole
 * contract of the deck.
 * ------------------------------------------------------------------------- */
const BunchingBin = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "3:59"
  short: LocalizedText.optional(),
  /** How many items landed in this bin. A count, never a rate. */
  count: z.number().int().nonnegative(),
  /** True once the bin sits past the line. */
  past: z.boolean(),
});
export type BunchingBin = z.infer<typeof BunchingBin>;

const BunchingData = z
  .object({
    type: z.literal("bunching"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what is being counted, e.g. "finishers"
    itemLabel: LocalizedText, // what one bin is, e.g. "one minute"
    /** The line itself, e.g. "four hours". */
    thresholdLabel: LocalizedText,
    /** Why anyone cares about it, e.g. "the commonest time goal". */
    thresholdNote: LocalizedText.optional(),
    /**
     * Caption for the step itself, shown only once both sides are drawn.
     * Takes a `{count}` slot rather than a bare number with a fragment either
     * side of it, because word order around a number is not universal.
     */
    dropLabel: LocalizedText.optional(),
    bins: z.array(BunchingBin).min(3),
  })
  .superRefine((d, ctx) => {
    const ids = new Set<string>();
    d.bins.forEach((b, i) => {
      if (ids.has(b.id))
        ctx.addIssue({
          code: "custom",
          path: ["bins", i, "id"],
          message: `duplicate bin id "${b.id}"`,
        });
      ids.add(b.id);
    });

    const firstPast = d.bins.findIndex((b) => b.past);
    if (firstPast === -1 || d.bins.every((b) => b.past)) {
      ctx.addIssue({
        code: "custom",
        path: ["bins"],
        message:
          "a threshold needs bins on both sides of it, so mark at least one bin past and leave at least one before",
      });
      return;
    }
    // Bins are drawn in array order, so a `past` flag that goes back and forth
    // would render a line that crosses the threshold more than once. The array
    // is the axis; it has to be sorted.
    const strayBefore = d.bins.findIndex((b, i) => i > firstPast && !b.past);
    if (strayBefore !== -1)
      ctx.addIssue({
        code: "custom",
        path: ["bins", strayBefore, "past"],
        message: `bin "${d.bins[strayBefore].id}" comes after the threshold in the array but is not marked past, so the bins are out of order`,
      });

    // If the count does not actually fall across the line there is no cliff,
    // and the reveal would restate the setup. Compare the bin immediately
    // before the line with the one immediately after, which is the pair the
    // lesson is about.
    const lastBefore = d.bins[firstPast - 1];
    const firstAfter = d.bins[firstPast];
    if (lastBefore && firstAfter && firstAfter.count >= lastBefore.count)
      ctx.addIssue({
        code: "custom",
        path: ["bins", firstPast, "count"],
        message: `bin "${firstAfter.id}" (${firstAfter.count}) is not lower than "${lastBefore.id}" (${lastBefore.count}), so nothing bunches at the threshold and there is nothing to reveal`,
      });
  });
export type BunchingData = z.infer<typeof BunchingData>;

/* ---------------------------------------------------------------------------
 * What people think a set of quantities are, against what they are.
 *
 * `estimation` is the near relative and cannot hold this. It carries exactly
 * two groups estimating ONE quantity against one true value, and its guard
 * requires both estimates to fall BELOW the truth, which is the anchoring
 * design. Here there is one group estimating MANY quantities, and the whole
 * lesson is that the errors run in opposite directions at the two ends: small
 * things are guessed far too big and large things too small. A shape that can
 * only express underestimation cannot say that.
 *
 * `salience` is the other near relative and also cannot: its comparisons are
 * binary picks with a share who chose correctly, not magnitudes on a scale.
 *
 * What makes the reveal work is that both views draw the same bars at the same
 * size. The setup shows the guesses alone, which read as a sensible ranking
 * because they are correctly ordered; the reveal adds the true value beside
 * each one without moving anything. So the scale is taken over both series and
 * all items at once, never over the subset a view happens to draw, or the
 * guesses would silently rescale between the two beats and the reader could no
 * longer see it is one set of numbers shown twice.
 *
 * Values are authored on whatever shared scale the source used (the source
 * here sets one country to 1,000 and expresses everything relative to it), so
 * they are plain numbers rather than counts. `scaleLabel` has to name that
 * scale on the figure, because a bar of 140 means nothing without it.
 * ------------------------------------------------------------------------- */
export const MagnitudeItem = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Denmark"
  short: LocalizedText.optional(), // compact chart label
  /** What the thing actually is, on the shared scale. */
  actual: z.number().positive(),
  /** What people said it was, on the same scale. */
  estimated: z.number().positive(),
});
export type MagnitudeItem = z.infer<typeof MagnitudeItem>;

const MagnitudeData = z
  .object({
    type: z.literal("magnitude"),
    label: LocalizedText, // figure title
    /** Names the shared scale, e.g. "the lower 48 states count as 1,000". */
    scaleLabel: LocalizedText,
    estimatedLabel: LocalizedText, // "What people guessed"
    actualLabel: LocalizedText, // "What it actually is"
    /** Whose guesses these are, what kind of average, and how many items the
     * figure is a subset of, when it is one. */
    statNote: LocalizedText,
    items: z.array(MagnitudeItem).min(3),
  })
  .superRefine((d, ctx) => {
    const seen = new Set<string>();
    d.items.forEach((it, i) => {
      if (seen.has(it.id))
        ctx.addIssue({
          code: "custom",
          path: ["items", i, "id"],
          message: `duplicate item id "${it.id}"`,
        });
      seen.add(it.id);
      // Items are drawn in array order and the pattern is only legible if the
      // axis runs small to large, the same reason `dose` requires ascending
      // doses. Out of order, the compression looks like noise.
      if (i > 0 && it.actual <= d.items[i - 1].actual)
        ctx.addIssue({
          code: "custom",
          path: ["items", i, "actual"],
          message: `items must ascend by actual size; ${it.actual} follows ${d.items[i - 1].actual}`,
        });
    });
    // The lesson is that the error depends on size, so the smallest item has to
    // be overestimated by a bigger factor than the largest. Without that the
    // reveal shows scattered error and teaches nothing the setup did not.
    const first = d.items[0];
    const last = d.items[d.items.length - 1];
    if (first && last && first !== last) {
      const smallRatio = first.estimated / first.actual;
      const largeRatio = last.estimated / last.actual;
      if (smallRatio <= largeRatio)
        ctx.addIssue({
          code: "custom",
          path: ["items", 0, "estimated"],
          message: `the smallest item is overestimated by ${smallRatio.toFixed(2)} times and the largest by ${largeRatio.toFixed(2)}, so nothing is compressed and there is nothing to reveal`,
        });
    }
    // Both directions have to be on screen. If every item were overestimated,
    // the honest reading would be "people guess high", not "the error tracks
    // size", and the lesson copy would be overclaiming.
    if (!d.items.some((it) => it.estimated > it.actual))
      ctx.addIssue({
        code: "custom",
        path: ["items"],
        message: "no item is overestimated, so there is no compression to show",
      });
    if (!d.items.some((it) => it.estimated < it.actual))
      ctx.addIssue({
        code: "custom",
        path: ["items"],
        message: "no item is underestimated, so there is no compression to show",
      });
  });
export type MagnitudeData = z.infer<typeof MagnitudeData>;

/* ---------------------------------------------------------------------------
 * Map projections, what each one actually does to area, and what people said it
 * did to area.
 *
 * Needed because no existing shape can hold a claim against the thing the claim
 * is about when the thing is a picture. `salience` is the near relative: it also
 * sets what people said against what is true. But its comparisons are binary
 * picks between two options with a share who chose correctly, and here each
 * projection is judged on its own, the property at stake is a mathematical fact
 * about the projection rather than a frequency in the world, and the figure has
 * to draw the maps themselves, because the whole point is that people are
 * reading the picture and reading it wrong.
 *
 * The reveal works because both views draw the same maps at the same size. The
 * setup shows them and nothing else, so the reader judges them the way the
 * study's participants did, by looking. The reveal keeps the maps exactly as
 * they were and adds two things that were in the data all along: which
 * projections are area-exact, and how many people said each one distorted area.
 *
 * Shares are authored as published, with the number of participants stated, the
 * same deliberate exception made for `framing`, `distribution`, `dose`,
 * `estimation` and `magnitude`. The source prints percentages of 31 people and
 * no counts.
 * ------------------------------------------------------------------------- */
export const ProjectionEntry = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Robinson"
  short: LocalizedText.optional(),
  /** Whether this projection draws every region in exact proportion to its area. */
  equalArea: z.boolean(),
  /** Share of the study's untrained participants who said it distorts area. */
  saidDistorts: z.number().min(0).max(100),
  /**
   * Which stored outline to draw for this projection, when the figure draws it.
   * Absent means the projection appears in the data and the bars but has no map
   * on screen, which is how the study's other projections are carried.
   */
  mapId: z.string().min(1).optional(),
});
export type ProjectionEntry = z.infer<typeof ProjectionEntry>;

const ProjectionData = z
  .object({
    type: z.literal("projection"),
    label: LocalizedText, // figure title
    /** What the bar measures, e.g. "Said this map distorts the sizes". */
    accusedLabel: LocalizedText,
    exactLabel: LocalizedText, // "Areas are exact"
    distortsLabel: LocalizedText, // "Areas are distorted"
    /** Says on the figure whose answers these are and how many there were. */
    percentNote: LocalizedText,
    projections: z.array(ProjectionEntry).min(2),
  })
  .superRefine((d, ctx) => {
    const ids = new Set<string>();
    d.projections.forEach((p, i) => {
      if (ids.has(p.id))
        ctx.addIssue({
          code: "custom",
          path: ["projections", i, "id"],
          message: `duplicate projection id "${p.id}"`,
        });
      ids.add(p.id);
    });
    const exact = d.projections.filter((p) => p.equalArea);
    const notExact = d.projections.filter((p) => !p.equalArea);
    if (exact.length === 0 || notExact.length === 0)
      ctx.addIssue({
        code: "custom",
        path: ["projections"],
        message:
          "needs at least one area-exact projection and at least one that distorts area, or there is nothing to be right or wrong about",
      });
    // The whole lesson is that people accuse the honest maps. If the worst-
    // accused area-exact projection were never accused more than the least-
    // accused distorting one, the reveal would show people getting it right and
    // the copy would be false.
    if (exact.length && notExact.length) {
      const worstExact = Math.max(...exact.map((p) => p.saidDistorts));
      const leastAccusedLiar = Math.min(...notExact.map((p) => p.saidDistorts));
      if (worstExact <= leastAccusedLiar)
        ctx.addIssue({
          code: "custom",
          path: ["projections"],
          message: `the most-accused area-exact projection (${worstExact} per cent) is not accused more than the least-accused distorting one (${leastAccusedLiar} per cent), so people are not mistaking the honest maps for the dishonest ones and there is nothing to reveal`,
        });
    }
    // At least two maps have to be on screen, or the setup is asking the reader
    // to compare pictures it never showed them.
    if (d.projections.filter((p) => p.mapId).length < 2)
      ctx.addIssue({
        code: "custom",
        path: ["projections"],
        message: "at least two projections need a mapId, or there is nothing to look at",
      });
  });
export type ProjectionData = z.infer<typeof ProjectionData>;

/* ---------------------------------------------------------------------------
 * Two performers judged against one imposed threshold, and where inside the
 * allowed stretch each of them actually finishes.
 *
 * Campbell's law needs a shape that can show a target being MET and gamed at the
 * same time, and nothing else here can. `bunching` is the near relative and
 * cannot hold it: its bins are integer counts and its guard compares the two
 * bins either side of a line, whereas this is one cumulative distribution per
 * performer, published as shares. `rates` needs counts. `distribution` exists to
 * say a mean describes a minority and actively requires most items to sit below
 * it. `ratings` would have to call a percentage a mean rating on a scale, which
 * would misdescribe the data on the face of the figure.
 *
 * The reveal works because both views draw the same axis: the share of everyone
 * who came through the door, ordered by how long they took. The setup splits it
 * once, at the deadline, and the two performers look identical because they are
 * identical there. The reveal splits the compliant part again, at the start of
 * the final stretch, and one of them turns out to have a crowd pressed up
 * against the line. Nothing is recomputed and no bar changes length.
 *
 * Authored as PUBLISHED PERCENTAGES with the denominator, never as counts, the
 * same deliberate exception `framing`, `distribution`, `dose`, `estimation` and
 * `magnitude` make. The source prints shares to two decimal places and no bin
 * counts at all; 20.83 per cent of 148,999 is 31,036 point something, so there
 * is no integer to author and rounding to one would be inventing data. It is
 * also the right unit here rather than a compromise, because the two performers
 * are different sizes and counts would compare how big they are.
 *
 * `withinPercent` is DERIVED from `breachPercent`, never authored, so the
 * compliance figure the whole setup turns on cannot drift from the breach rate
 * the source actually printed.
 * ------------------------------------------------------------------------- */
export const TargetPerformer = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Hospital A"
  short: LocalizedText.optional(),
  /** How many went through, printed so the reader can see the shares are real. */
  n: z.number().int().positive(),
  /** Share that missed the deadline, exactly as printed. */
  breachPercent: z.number().min(0).max(100),
  /** Share that finished inside the final stretch before it, exactly as printed. */
  lateSharePercent: z.number().min(0).max(100),
});
export type TargetPerformer = z.infer<typeof TargetPerformer>;

const TargetData = z
  .object({
    type: z.literal("target"),
    label: LocalizedText, // figure title
    /** The rule imposed from outside, e.g. "95 per cent seen within four hours". */
    targetLabel: LocalizedText,
    /** The share that has to finish in time for the target to be met. */
    targetPercent: z.number().min(0).max(100),
    /** Names the compliant part of the bar, e.g. "Seen inside four hours". */
    withinLabel: LocalizedText,
    /** Names the part past the deadline, e.g. "Missed the four hours". */
    breachedLabel: LocalizedText,
    /** Names the final stretch, e.g. "Left in the last twenty minutes". */
    lateLabel: LocalizedText,
    /** Says on the figure that these are published shares, not counts. */
    percentNote: LocalizedText,
    performers: z.array(TargetPerformer).length(2),
  })
  .superRefine((d, ctx) => {
    d.performers.forEach((p, i) => {
      // The premise of the whole puzzle is that BOTH of them passed. If either
      // had failed, the setup's question answers itself and there is no gaming
      // to reveal, only a straightforward shortfall.
      const within = 100 - p.breachPercent;
      if (within < d.targetPercent)
        ctx.addIssue({
          code: "custom",
          path: ["performers", i, "breachPercent"],
          message: `${p.label.en} finishes ${within.toFixed(2)} per cent in time, which misses the ${d.targetPercent} per cent target, so it is not a case of hitting the target and gaming it`,
        });
      // The final stretch is drawn as the tail of the compliant part, so it
      // cannot be wider than the compliant part is.
      if (p.lateSharePercent > within)
        ctx.addIssue({
          code: "custom",
          path: ["performers", i, "lateSharePercent"],
          message: `${p.label.en} cannot have ${p.lateSharePercent} per cent in the final stretch when only ${within.toFixed(2)} per cent finished in time at all`,
        });
    });
    const [a, b] = d.performers;
    if (!a || !b) return;
    // Without a real difference in where they finish, the reveal would redraw
    // the setup with an extra line on it.
    const hi = Math.max(a.lateSharePercent, b.lateSharePercent);
    const lo = Math.min(a.lateSharePercent, b.lateSharePercent);
    if (lo <= 0 || hi / lo < 1.5)
      ctx.addIssue({
        code: "custom",
        path: ["performers"],
        message: `the final-stretch shares are ${a.lateSharePercent} and ${b.lateSharePercent}, too close to be worth revealing`,
      });
    // And if they were visibly different on the headline metric, the setup
    // would already have given the game away.
    if (Math.abs(a.breachPercent - b.breachPercent) > 1)
      ctx.addIssue({
        code: "custom",
        path: ["performers"],
        message: `the two breach rates differ by more than a point, so they do not look alike in the setup`,
      });
  });
export type TargetData = z.infer<typeof TargetData>;

/* ---------------------------------------------------------------------------
 * Two counts of the same thing, measured by different instruments, over time.
 *
 * Needed because no existing shape can hold two independent series of raw
 * counts along a time axis. `rates` needs a denominator for every observation
 * and here there is none: these are estimated totals, not shares of anything.
 * `drift` carries signed movement against a baseline and also needs
 * denominators. `bunching` is counts in ordered bins, but it holds one series
 * and a threshold rather than two series that cross. `dose` requires a zero
 * baseline and a front-loaded curve.
 *
 * The lesson this exists for is what happens when two instruments that are both
 * supposed to measure one reality disagree about its direction. That cannot be
 * drawn with one series, and it cannot be drawn as a rate, so it needs its own
 * shape.
 *
 * The reveal works by holding a whole series back. The setup draws one
 * instrument, which reads as a plain trend in whichever direction it happens to
 * run; the reveal adds the other, crossing it. Both views share one axis scaled
 * over every value in the data, so the first series does not move or rescale
 * when the second arrives.
 *
 * Observations are sparse on purpose. A survey can be suspended for a year, and
 * a missing year has to be drawn as a gap rather than as a zero or as a
 * straight line through it, because both of those would assert a measurement
 * nobody made.
 * ------------------------------------------------------------------------- */
export const SeriesLine = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "The Crime Survey"
  short: LocalizedText.optional(),
});
export type SeriesLine = z.infer<typeof SeriesLine>;

export const SeriesPoint = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "2015-16"
  short: LocalizedText.optional(),
});
export type SeriesPoint = z.infer<typeof SeriesPoint>;

export const SeriesObservation = z.object({
  lineId: z.string().min(1),
  pointId: z.string().min(1),
  /** A raw count, as published. Omit the observation entirely if not measured. */
  count: z.number().nonnegative(),
});
export type SeriesObservation = z.infer<typeof SeriesObservation>;

const SeriesData = z
  .object({
    type: z.literal("series"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what is being counted
    /** Says on the figure where the numbers come from and what is missing. */
    statNote: LocalizedText,
    /** Names the moment the two lines swap places, drawn only in the reveal. */
    crossoverLabel: LocalizedText.optional(),
    lines: z.array(SeriesLine).length(2),
    points: z.array(SeriesPoint).min(3),
    observations: z.array(SeriesObservation).min(6),
  })
  .superRefine((d, ctx) => {
    const lineIds = new Set(d.lines.map((l) => l.id));
    const pointIds = new Set(d.points.map((p) => p.id));
    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!lineIds.has(o.lineId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "lineId"],
          message: `no line with id ${o.lineId}`,
        });
      if (!pointIds.has(o.pointId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "pointId"],
          message: `no point with id ${o.pointId}`,
        });
      const key = `${o.lineId}|${o.pointId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${key}`,
        });
      seen.add(key);
    });

    // The whole lesson is that the two instruments swap places. Find the first
    // and last points where BOTH were measured, and require the ordering to
    // reverse between them. Without that there is no disagreement to reveal,
    // only two lines that happen to differ.
    const both = d.points.filter(
      (p) =>
        d.observations.some((o) => o.pointId === p.id && o.lineId === d.lines[0].id) &&
        d.observations.some((o) => o.pointId === p.id && o.lineId === d.lines[1].id),
    );
    if (both.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["observations"],
        message:
          "at least two points need both lines measured, or the series cannot be compared at all",
      });
      return;
    }
    const at = (lineId: string, pointId: string) =>
      d.observations.find((o) => o.lineId === lineId && o.pointId === pointId)!.count;
    const first = both[0].id;
    const last = both[both.length - 1].id;
    const startGap = at(d.lines[0].id, first) - at(d.lines[1].id, first);
    const endGap = at(d.lines[0].id, last) - at(d.lines[1].id, last);
    if (Math.sign(startGap) === Math.sign(endGap) || startGap === 0 || endGap === 0)
      ctx.addIssue({
        code: "custom",
        path: ["observations"],
        message:
          "the two instruments do not swap places between the first and last points where both were measured, so there is no crossover to reveal",
      });
  });
export type SeriesData = z.infer<typeof SeriesData>;

/* ---------------------------------------------------------------------------
 * A published poll: shares of one sample, each with the margin the source
 * printed, and the gap between two of them with ITS margin.
 *
 * Needed because no existing shape can draw an interval at all. `estimation`
 * holds guesses against a truth, `risk` splits one risk two ways, `rates`
 * derives proportions from counts and draws them bare. None of them has a
 * whisker, and a lesson about how wide a margin is cannot be told without one.
 *
 * The reveal works by drawing the SAME uncertainty a second time, around a
 * different quantity. The setup shows two shares, each with the poll's printed
 * margin, and the obvious reading is that a gap bigger than that margin is a
 * real lead. The reveal draws the gap itself, with the margin that actually
 * belongs to it, which for two shares of one sample is close to twice as wide.
 *
 * Percentages are authored as published rather than derived from counts, the
 * same deliberate exception this project already makes for framing,
 * distribution, dose, estimation, magnitude and target data: polls print shares
 * and margins, never counts, and 42 per cent of 1,128 has no unique integer
 * behind it. What is NOT authored is any margin on a difference, any ratio
 * between two margins, or the gap itself. Those are derived, because a data
 * file that stated them could contradict the shares it drew them from.
 * ------------------------------------------------------------------------- */
export const IntervalOption = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "A major impact"
  short: LocalizedText.optional(),
  /** As published, in per cent. */
  percent: z.number().min(0).max(100),
});
export type IntervalOption = z.infer<typeof IntervalOption>;

const IntervalData = z
  .object({
    type: z.literal("interval"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what the shares are shares of
    /** Says on the figure who was asked, how many, and what the margin means. */
    statNote: LocalizedText,
    /** Named on the reveal, where the gap gets its own margin. */
    gapLabel: LocalizedText.optional(),
    sampleSize: z.number().int().positive(),
    /** The margin the source prints, in percentage points, for one share. */
    publishedMargin: z.number().positive(),
    /**
     * The design effect the source applied, if it applied one. Optional rather
     * than defaulted: a `.default()` would make the field required on the
     * inferred type and force an edit to every other puzzle. Absent means one.
     */
    designEffect: z.number().positive().optional(),
    options: z.array(IntervalOption).min(2),
    /** The two options whose gap the reveal draws, in order. */
    gapBetween: z.tuple([z.string().min(1), z.string().min(1)]),
  })
  .superRefine((d, ctx) => {
    const ids = new Set(d.options.map((o) => o.id));
    if (ids.size !== d.options.length)
      ctx.addIssue({ code: "custom", path: ["options"], message: "duplicate option id" });

    const [aId, bId] = d.gapBetween;
    if (aId === bId)
      ctx.addIssue({
        code: "custom",
        path: ["gapBetween"],
        message: "the gap must be between two different options",
      });
    for (const [i, id] of d.gapBetween.entries())
      if (!ids.has(id))
        ctx.addIssue({
          code: "custom",
          path: ["gapBetween", i],
          message: `no option with id ${id}`,
        });

    const total = d.options.reduce((s, o) => s + o.percent, 0);
    if (total > 100.5)
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: `shares of one sample sum to ${total}, which is over 100`,
      });

    // The printed margin has to reproduce from the sample size and the design
    // effect. This is the check that catches the nastiest authoring error in
    // this shape: taking a margin from one poll and a sample size from another,
    // or silently assuming a design effect of one where the source applied a
    // bigger one. Everything the reveal derives scales with that assumption, so
    // if it is wrong every number on the second beat is wrong with it.
    const deff = d.designEffect ?? 1;
    const implied = 1.96 * 0.5 * Math.sqrt(deff / d.sampleSize) * 100;
    if (Math.abs(implied - d.publishedMargin) > 0.05)
      ctx.addIssue({
        code: "custom",
        path: ["publishedMargin"],
        message: `a sample of ${d.sampleSize} with a design effect of ${deff} implies a margin of ${implied.toFixed(2)}, not the authored ${d.publishedMargin}`,
      });

    const a = d.options.find((o) => o.id === aId);
    const b = d.options.find((o) => o.id === bId);
    if (a && b && a.percent <= b.percent)
      ctx.addIssue({
        code: "custom",
        path: ["gapBetween"],
        message: "name the leading option first, or the gap draws negative",
      });
  });
export type IntervalData = z.infer<typeof IntervalData>;

/* ---------------------------------------------------------------------------
 * An effect measured across a scale, where the outcome itself has hard bounds
 * it cannot pass, plus the published location of the effect's peak with the
 * interval around it.
 *
 * Needed because no existing shape can draw a bound at all, and this lesson is
 * about what a bound does to a measurement. `series` is the near miss and it
 * fails on three counts: its schema REQUIRES the two lines to swap places and
 * these never do, its observations are raw counts with no ceiling to press
 * against, and its vertical axis runs to the largest value in the data rather
 * than to a fixed maximum, which would hide the one thing worth seeing. Giving
 * `series` a no-crossover flag would fix only the first of those, and the
 * lesson would still be undrawable, which is bending the lesson to the shape.
 * `dose` has a bounded-looking curve but requires a zero baseline and a single
 * series. `bunching` holds one series in ordered bins against a threshold.
 * `interval` can draw an interval but only around one quantity, with no scale
 * for it to sit on.
 *
 * The reveal works by drawing what the setup's curve was DERIVED FROM. The
 * setup draws the difference between the two arms, bin by bin, which collapses
 * at both ends and peaks in the middle. The reveal throws that away and draws
 * the two arms themselves against the floor and the ceiling, where the reason
 * for the collapse is visible: both arms are pinned near a bound at each end
 * and have room to separate only in the middle. Nothing is recomputed between
 * the beats. The second picture is the first one's arithmetic, undone.
 *
 * The reveal also carries the published peak of the fitted effect and its
 * confidence interval, drawn against `neutralPoint`, the place on the axis
 * where an effect of CONSTANT size would peak once it had been squeezed by the
 * bounds. That comparison is the whole verdict, and it cannot be derived from
 * binned means, so it is authored as published and its consistency with the
 * bins is a matter for the puzzle's own test.
 *
 * Values are authored as published proportions rather than derived from counts,
 * the same deliberate exception this project already makes for framing,
 * distribution, dose, estimation, magnitude, target and interval data. What is
 * NEVER authored is the difference between the arms, the mean over the bins, or
 * where the collapse happens: all three are derived, because a data file that
 * stated them could contradict the values it drew them from.
 * ------------------------------------------------------------------------- */
export const CeilingArm = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Seen for the first time"
  short: LocalizedText.optional(),
});
export type CeilingArm = z.infer<typeof CeilingArm>;

export const CeilingBin = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "41 to 50%"
  short: LocalizedText.optional(),
  /** Where the bin sits on the axis, in the axis's own units. */
  at: z.number(),
});
export type CeilingBin = z.infer<typeof CeilingBin>;

export const CeilingObservation = z.object({
  binId: z.string().min(1),
  armId: z.string().min(1),
  /** As published, in the outcome's own units. */
  value: z.number(),
  /** The published standard deviation, when the source prints one. */
  sd: z.number().nonnegative().optional(),
});
export type CeilingObservation = z.infer<typeof CeilingObservation>;

const CeilingData = z
  .object({
    type: z.literal("ceiling"),
    label: LocalizedText, // figure title
    metricLabel: LocalizedText, // what the outcome is
    /** Says on the figure who was measured, how many, and on what. */
    statNote: LocalizedText,
    /** Captions the derived difference, which is what the setup draws. */
    differenceLabel: LocalizedText,
    /** The hard bounds the OUTCOME cannot pass, and what they mean. */
    bounds: z.object({
      min: z.number(),
      max: z.number(),
      minLabel: LocalizedText, // "0, nobody called it true"
      maxLabel: LocalizedText, // "1, everybody called it true"
    }),
    /** The scale the bins sit on, which is what the peak is located on. */
    axis: z.object({
      min: z.number(),
      max: z.number(),
      label: LocalizedText,
    }),
    /**
     * Where on the axis an effect of constant size would peak once the bounds
     * had squeezed it. The verdict is whether the measured peak reaches it.
     */
    neutralPoint: z.number(),
    neutralLabel: LocalizedText,
    /** The published peak of the fitted effect, with its interval. */
    peak: z.object({
      at: z.number(),
      low: z.number(),
      high: z.number(),
      label: LocalizedText,
    }),
    /** The baseline arm first, the one the effect acts on second. */
    arms: z.array(CeilingArm).length(2),
    bins: z.array(CeilingBin).min(4),
    observations: z.array(CeilingObservation).min(8),
  })
  .superRefine((d, ctx) => {
    if (!(d.bounds.min < d.bounds.max))
      ctx.addIssue({
        code: "custom",
        path: ["bounds"],
        message: `the ceiling (${d.bounds.max}) must sit above the floor (${d.bounds.min})`,
      });
    if (!(d.axis.min < d.axis.max))
      ctx.addIssue({
        code: "custom",
        path: ["axis"],
        message: `the axis runs from ${d.axis.min} to ${d.axis.max}`,
      });

    const armIds = new Set(d.arms.map((a) => a.id));
    const binIds = new Set(d.bins.map((b) => b.id));
    if (armIds.size !== d.arms.length)
      ctx.addIssue({ code: "custom", path: ["arms"], message: "duplicate arm id" });
    if (binIds.size !== d.bins.length)
      ctx.addIssue({ code: "custom", path: ["bins"], message: "duplicate bin id" });

    d.bins.forEach((b, i) => {
      if (b.at < d.axis.min || b.at > d.axis.max)
        ctx.addIssue({
          code: "custom",
          path: ["bins", i, "at"],
          message: `${b.at} falls outside the axis (${d.axis.min} to ${d.axis.max})`,
        });
      if (i > 0 && b.at <= d.bins[i - 1].at)
        ctx.addIssue({
          code: "custom",
          path: ["bins", i, "at"],
          message: `bins must run up the axis in order; ${b.at} does not follow ${d.bins[i - 1].at}`,
        });
    });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!armIds.has(o.armId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "armId"],
          message: `no arm with id ${o.armId}`,
        });
      if (!binIds.has(o.binId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "binId"],
          message: `no bin with id ${o.binId}`,
        });
      if (o.value < d.bounds.min || o.value > d.bounds.max)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "value"],
          message: `${o.value} falls outside the bounds (${d.bounds.min} to ${d.bounds.max})`,
        });
      const key = `${o.armId}|${o.binId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${key}`,
        });
      seen.add(key);
    });

    // Every cell has to be filled. A missing one would leave a bin with no
    // difference to draw, and the setup's whole curve is differences.
    for (const a of d.arms)
      for (const b of d.bins)
        if (!seen.has(`${a.id}|${b.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `missing observation for arm "${a.id}" in bin "${b.id}"`,
          });

    if (d.neutralPoint <= d.axis.min || d.neutralPoint >= d.axis.max)
      ctx.addIssue({
        code: "custom",
        path: ["neutralPoint"],
        message: `${d.neutralPoint} has to sit inside the axis for the peak to be compared against it`,
      });
    if (!(d.peak.low <= d.peak.at && d.peak.at <= d.peak.high))
      ctx.addIssue({
        code: "custom",
        path: ["peak"],
        message: `the interval ${d.peak.low} to ${d.peak.high} does not contain the peak at ${d.peak.at}`,
      });
    for (const [key, v] of [
      ["at", d.peak.at],
      ["low", d.peak.low],
      ["high", d.peak.high],
    ] as const)
      if (v < d.axis.min || v > d.axis.max)
        ctx.addIssue({
          code: "custom",
          path: ["peak", key],
          message: `${v} falls outside the axis (${d.axis.min} to ${d.axis.max})`,
        });

    if (d.arms.length !== 2 || d.bins.length < 3) return;
    const at = (armId: string, binId: string) =>
      d.observations.find((o) => o.armId === armId && o.binId === binId)?.value ?? null;
    const [base, treated] = d.arms;
    const diffs = d.bins.map((b) => {
      const lo = at(base.id, b.id);
      const hi = at(treated.id, b.id);
      return lo === null || hi === null ? null : hi - lo;
    });
    if (diffs.some((x) => x === null)) return;
    const values = diffs as number[];

    // The second arm is the one the effect acts on, so it may not fall below
    // the baseline anywhere. This is the property that makes `series` the wrong
    // shape: there, the two lines are REQUIRED to swap places.
    values.forEach((v, i) => {
      if (v < 0)
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message: `in bin "${d.bins[i].id}" the second arm falls below the first, so name them the other way round`,
        });
    });

    // And the difference has to collapse at BOTH ends while peaking somewhere
    // in between, or there is no squeeze to reveal, only a curve. Stated as one
    // comparison against both ends so that a tie at either end fails too: a
    // difference matching its own peak at the edge of the axis is exactly the
    // case where the bounds explain nothing.
    const largest = Math.max(...values);
    const first = values[0];
    const last = values[values.length - 1];
    if (!(largest > first && largest > last))
      ctx.addIssue({
        code: "custom",
        path: ["observations"],
        message: `the difference runs ${first} at one end and ${last} at the other against a peak of ${largest}, so it does not fall away at both ends and nothing is being squeezed between two bounds`,
      });
  });
export type CeilingData = z.infer<typeof CeilingData>;

/**
 * Several estimates, each with a confidence interval, drawn against the value
 * that means no effect.
 *
 * Needed because no existing shape can put more than one interval on an axis.
 * `interval` draws published poll shares and derives a gap from them, so its
 * whole arithmetic is poll-specific. `effect` draws exactly one estimate, and
 * its second view measures that estimate against a reference quantity it is a
 * slice of, which is a different lesson. What neither can do is the thing a
 * forest plot exists for: line up several pooled estimates so a reader can see
 * WHICH SIDE OF ZERO each one falls on.
 *
 * That sign is the whole point. A row that shrinks toward the null and a row
 * that crosses it are read as the same event constantly, and they are not: one
 * says the thing helped less, the other says it did harm. So this shape draws
 * `nullValue` as a line, names both sides of it (`worseLabel` / `betterLabel`),
 * and lets a beat add rows rather than recolour them.
 *
 * Estimates are AUTHORED AS PUBLISHED and never recomputed. A meta-analysis
 * prints random-effects pooled estimates whose weights are not the study count,
 * so a subgroup-weighted average of the rows is a consistency check and not an
 * identity. `rows[].k` is therefore how much evidence sits behind a row, for
 * display and for that check, and never a weight this module pools with.
 */
const ForestRow = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  /** The point estimate, on whatever scale `unit` names. */
  estimate: z.number(),
  ciLow: z.number(),
  ciHigh: z.number(),
  /** How many studies or samples sit behind this row. */
  k: z.number().int().positive(),
  /** Set on the row that pools the others, so the renderer can mark it. */
  isPooled: z.boolean().optional(),
});

const ForestData = z
  .object({
    type: z.literal("forest"),
    label: LocalizedText,
    /** What the estimate is measured in, e.g. "standardised mean difference". */
    unit: LocalizedText,
    metricLabel: LocalizedText,
    /** The value meaning no effect: 0 for a difference, 1 for a ratio. */
    nullValue: z.number(),
    nullLabel: LocalizedText,
    /** Names the side of the null line where the intervention did harm. */
    worseLabel: LocalizedText,
    /** And the side where it helped. */
    betterLabel: LocalizedText,
    /**
     * Put the HARMFUL side on the right instead of the left.
     *
     * Optional, and never given a default, because the inferred type would then
     * make it required on every existing puzzle. Omitted keeps the original
     * behaviour, which suits an effect size where more is better.
     *
     * A hazard ratio for an adverse event runs the other way: above the null is
     * worse. Without this the axis would have to be labelled backwards, or the
     * two side labels would have to be swapped in the data file and quietly mean
     * the opposite of their field names, which is the kind of small lie that
     * survives for years.
     */
    higherIsWorse: z.boolean().optional(),
    /** Axis bounds, authored so both beats share one scale. */
    axisMin: z.number(),
    axisMax: z.number(),
    rows: z.array(ForestRow).min(2),
  })
  .superRefine((d, ctx) => {
    if (d.axisMin >= d.axisMax)
      ctx.addIssue({
        code: "custom",
        path: ["axisMin"],
        message: `axisMin (${d.axisMin}) must be below axisMax (${d.axisMax})`,
      });
    if (d.nullValue <= d.axisMin || d.nullValue >= d.axisMax)
      ctx.addIssue({
        code: "custom",
        path: ["nullValue"],
        message: `the null line at ${d.nullValue} must fall inside the axis (${d.axisMin} to ${d.axisMax}), or no row can be seen to cross it`,
      });
    const seen = new Set();
    for (const r of d.rows) {
      if (seen.has(r.id))
        ctx.addIssue({ code: "custom", path: ["rows"], message: `duplicate row id ${r.id}` });
      seen.add(r.id);
      if (r.ciLow > r.estimate || r.ciHigh < r.estimate)
        ctx.addIssue({
          code: "custom",
          path: ["rows"],
          message: `row ${r.id}: estimate ${r.estimate} must lie inside its interval (${r.ciLow} to ${r.ciHigh})`,
        });
      if (r.ciLow < d.axisMin || r.ciHigh > d.axisMax)
        ctx.addIssue({
          code: "custom",
          path: ["rows"],
          message: `row ${r.id}: interval ${r.ciLow} to ${r.ciHigh} runs outside the axis (${d.axisMin} to ${d.axisMax}), so it would be drawn clipped and read as narrower than it is`,
        });
    }
    // BOTH SIDES OF THE LINE MUST BE VISIBLE. The earlier version of this
    // guard demanded that some row actually cross the null, and it was wrong:
    // it rejected the very case this shape is best at, where a row everyone
    // expects to be negative turns out not to be. Absence of crossing is the
    // finding there, so what has to be protected is that a reader can SEE the
    // harmful side and see that nothing reached it. An axis cropped at the null
    // would make that invisible and would flatter every result drawn on it.
    const span = d.axisMax - d.axisMin;
    const worseShare = (d.nullValue - d.axisMin) / span;
    const betterShare = (d.axisMax - d.nullValue) / span;
    const MIN_SHARE = 0.1;
    if (worseShare < MIN_SHARE || betterShare < MIN_SHARE)
      ctx.addIssue({
        code: "custom",
        path: ["axisMin"],
        message: `the null line at ${d.nullValue} leaves only ${Math.round(worseShare * 100)} per cent of the axis on the worse side and ${Math.round(betterShare * 100)} per cent on the better side; both sides must be visible or the figure cannot show which side a row failed to reach`,
      });
  });
export type ForestData = z.infer<typeof ForestData>;

/* ---------------------------------------------------------------------------
 * Two populations, several outcomes, each as a rate over one shared
 * denominator, with the interval the source published around it.
 *
 * Needed because no existing shape can hold ONE PAIR OF POPULATIONS measured on
 * SEVERAL DIFFERENT OUTCOMES at once, and that is the only way this lesson can
 * be drawn. The four near misses each fail on something structural:
 *
 *   `rates` derives every rate from a numerator and a denominator, and the
 *   sources for this lesson publish the rate and its interval while the
 *   denominator (births, person-years) is nowhere printed. Back-computing the
 *   denominator from the rate and then deriving the rate from it again is a
 *   reconciliation that cannot fail, which is worse than no check at all. It
 *   also carries a single `metricLabel`, so it cannot say that one row counts
 *   diagnoses and another counts deaths.
 *
 *   `forest` draws several intervals but each row is ONE estimate measured
 *   against a null line. Cumulative incidence has no null value, and the two
 *   populations here are not an effect: they are two numbers that have to sit
 *   side by side on every row so a reader can see which rows moved apart and
 *   which did not. Recasting the rows as arm-minus-arm differences would give
 *   forest its null at zero, but the interval around a difference is not
 *   published and inventing one is inventing data.
 *
 *   `effect` draws exactly one estimate against a reference it is a slice of.
 *   `interval` derives poll margins from a sample size, so its whole arithmetic
 *   is poll-specific and its shares must sum to a hundred.
 *
 * The reveal works by ADDING ROWS to a figure that is otherwise identical, the
 * same contract `forest` and `ratings` use. Both beats share `axisMax`, so a
 * row that arrives at the reveal lands on the scale the reader was already
 * reading and nothing already on screen moves. Rescaling between beats is the
 * one thing this shape must never do, because the whole verdict is a comparison
 * of how far apart the pairs are.
 *
 * Rates are AUTHORED AS PUBLISHED, the same deliberate exception this project
 * already makes for framing, distribution, dose, estimation, magnitude, target,
 * interval and forest data. What is never authored is which rows moved, whether
 * a pair's intervals overlap, or the size of any gap: all three are derived,
 * because a data file that stated them could contradict the numbers it drew
 * them from, and this is a lesson about exactly that reading.
 * ------------------------------------------------------------------------- */
export const YieldArm = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "The six states that screened"
  short: LocalizedText.optional(),
});
export type YieldArm = z.infer<typeof YieldArm>;

export const YieldRow = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Diagnosed with neuroblastoma"
  short: LocalizedText.optional(),
  /** What this row counts, when the row label alone would be ambiguous. */
  note: LocalizedText.optional(),
});
export type YieldRow = z.infer<typeof YieldRow>;

export const YieldObservation = z.object({
  rowId: z.string().min(1),
  armId: z.string().min(1),
  /** The rate as published, in units of `perLabel`. */
  rate: z.number().nonnegative(),
  ciLow: z.number().nonnegative(),
  ciHigh: z.number().nonnegative(),
});
export type YieldObservation = z.infer<typeof YieldObservation>;

const YieldData = z
  .object({
    type: z.literal("yield"),
    label: LocalizedText,
    /** Names the shared denominator, e.g. "per 100,000 births". */
    perLabel: LocalizedText,
    metricLabel: LocalizedText,
    /** Says on the figure that these are published rates, not counts. */
    rateNote: LocalizedText,
    /** Shared by both beats so nothing moves when the reveal adds a row. */
    axisMax: z.number().positive(),
    arms: z.array(YieldArm).length(2),
    rows: z.array(YieldRow).min(2),
    observations: z.array(YieldObservation).min(4),
  })
  .superRefine((d, ctx) => {
    const armIds = new Set(d.arms.map((a) => a.id));
    const rowIds = new Set(d.rows.map((r) => r.id));
    if (armIds.size !== d.arms.length)
      ctx.addIssue({ code: "custom", path: ["arms"], message: "duplicate arm id" });
    if (rowIds.size !== d.rows.length)
      ctx.addIssue({ code: "custom", path: ["rows"], message: "duplicate row id" });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!armIds.has(o.armId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "armId"],
          message: `no arm with id ${o.armId}`,
        });
      if (!rowIds.has(o.rowId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "rowId"],
          message: `no row with id ${o.rowId}`,
        });
      const key = `${o.rowId}|${o.armId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${o.rowId} in ${o.armId}`,
        });
      seen.add(key);
      if (o.ciLow > o.rate || o.ciHigh < o.rate)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "rate"],
          message: `rate (${o.rate}) must lie inside its interval (${o.ciLow} to ${o.ciHigh})`,
        });
      if (o.ciHigh > d.axisMax)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "ciHigh"],
          message: `interval reaches ${o.ciHigh}, past the axis maximum of ${d.axisMax}, so it would be drawn cut off`,
        });
    });

    // Every row must carry BOTH arms. A row drawn with one arm missing would
    // read as a pair whose second member happened to be zero, which is the
    // most damaging thing this figure could imply.
    for (const r of d.rows)
      for (const a of d.arms)
        if (!seen.has(`${r.id}|${a.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `row ${r.id} has no observation for arm ${a.id}`,
          });

    // The lesson requires both kinds of row to exist: one where the two arms
    // are plainly apart, and one where they are not. A figure whose rows all
    // moved the same way is a figure about a programme that worked, and a
    // figure where nothing moved has no setup. Neither is this shape's lesson,
    // and finding out at authoring time is much cheaper than in review.
    const disjoint = (rowId: string): boolean | null => {
      const [x, y] = d.arms.map((a) =>
        d.observations.find((o) => o.rowId === rowId && o.armId === a.id),
      );
      if (!x || !y) return null;
      return x.ciHigh < y.ciLow || y.ciHigh < x.ciLow;
    };
    const verdicts = d.rows.map((r) => disjoint(r.id)).filter((v) => v !== null);
    if (verdicts.length === d.rows.length) {
      if (!verdicts.some((v) => v === true))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message:
            "no row has intervals that clear one another, so the figure never shows the programme finding anything and there is nothing to set up",
        });
      if (!verdicts.some((v) => v === false))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message:
            "every row separates, so the figure shows a programme that changed everything it measured and there is nothing to reveal",
        });
    }
  });
export type YieldData = z.infer<typeof YieldData>;

/* ---------------------------------------------------------------------------
 * A number that was reported, the part of the population whose outcome nobody
 * observed, and the number after somebody went and looked.
 *
 * Needed because the lessons about MISSING OUTCOMES cannot be drawn with counts,
 * and every count-based shape therefore fails on the same point. When a study
 * chases a random sample of the people who vanished, what it publishes is a
 * probability-WEIGHTED estimate with an interval, because the sample was drawn
 * with unequal probabilities and the weights are the design rather than a
 * nuisance. There is no numerator to recover.
 *
 *   `rates` and `frequencies` both build their rates from a numerator over a
 *   denominator. `frequencies` is the painful near miss: its natural-frequency
 *   tree is exactly this structure (a total, the part that went missing, the
 *   outcome within each part), and it cannot be used, because turning a
 *   weighted estimate back into a count would be inventing the count.
 *
 *   `yield` draws several outcomes in two populations and refuses this on
 *   purpose: it requires at least one row whose pair of intervals overlaps,
 *   since its lesson is "the programme found more and changed nothing". Here
 *   the two estimates must separate, because the lesson is "the number was
 *   wrong". Same picture, opposite verdict, and a shape that accepted both
 *   would assert neither.
 *
 *   `effect` draws one estimate against a reference it is a slice of, and
 *   `interval` derives poll margins from a sample size.
 *
 * What this shape holds that none of them can is the pairing of a COUNTED
 * composition with an ESTIMATED correction. The counts are real and are
 * derived here as shares: how much of the cohort went unobserved, how much of
 * that was chased, how much of the chase resolved. The estimates are authored
 * exactly as published and never recomputed. Keeping both on one figure is the
 * point: the size of the missing group is what makes the correction credible,
 * and a reader who sees only the corrected number has to take it on trust.
 *
 * The reveal works by drawing MORE of the same figure rather than a new one.
 * `asrecorded` draws the composition and the reported estimate, which is the
 * world as the routine records describe it. `afterlooking` keeps both, exactly
 * where they were, and adds what tracing found among the missing plus the
 * corrected estimate. `axisMax` is shared, so the reported estimate does not
 * move when the corrected one lands beside it, which is the one thing this
 * shape must never do: the whole verdict is how far apart they are.
 *
 * NOTE that `foundAmongUnobserved` is on a DIFFERENT SCALE from the two
 * estimates. It is a share of the missing group, not of the cohort, so it must
 * never be drawn on the same axis. The renderer keeps it beside the composition
 * bar, where its denominator is visible.
 * ------------------------------------------------------------------------- */
export const UnseenEstimate = z.object({
  label: LocalizedText,
  short: LocalizedText.optional(),
  /** As published, in the units `perLabel` names. Never recomputed. */
  value: z.number(),
  ciLow: z.number(),
  ciHigh: z.number(),
});
export type UnseenEstimate = z.infer<typeof UnseenEstimate>;

const UnseenData = z
  .object({
    type: z.literal("unseen"),
    label: LocalizedText,
    metricLabel: LocalizedText,
    /** Names the units the two estimates are in. */
    perLabel: LocalizedText,
    /** Says on the figure that these are published estimates, not counts. */
    rateNote: LocalizedText,
    /** Shared by both beats so the reported estimate never moves. */
    axisMax: z.number().positive(),

    /* The counted part. These are real counts and their shares are derived. */
    cohort: z.number().int().positive(),
    cohortLabel: LocalizedText,
    /** People whose outcome the routine record never captured. */
    unobserved: z.number().int().nonnegative(),
    unobservedLabel: LocalizedText,
    /** How many of those were chased. */
    traced: z.number().int().nonnegative(),
    tracedLabel: LocalizedText,
    /** And how many of the chase resolved. The rest stay unknown. */
    resolved: z.number().int().nonnegative(),
    resolvedLabel: LocalizedText,

    /* The estimated part, authored as published. */
    reported: UnseenEstimate,
    corrected: UnseenEstimate,
    /**
     * The share of the MISSING group found to have the outcome. On its own
     * scale, a share of `unobserved` rather than of `cohort`, so the renderer
     * must keep it off the estimates axis.
     */
    foundAmongUnobserved: UnseenEstimate,
  })
  .superRefine((d, ctx) => {
    // The counted funnel has to nest, or the shares derived from it are lies.
    if (d.unobserved > d.cohort)
      ctx.addIssue({
        code: "custom",
        path: ["unobserved"],
        message: `${d.unobserved} unobserved out of a cohort of ${d.cohort}`,
      });
    if (d.traced > d.unobserved)
      ctx.addIssue({
        code: "custom",
        path: ["traced"],
        message: `${d.traced} traced out of ${d.unobserved} who went unobserved`,
      });
    if (d.resolved > d.traced)
      ctx.addIssue({
        code: "custom",
        path: ["resolved"],
        message: `${d.resolved} resolved out of ${d.traced} traced`,
      });

    const named = [
      ["reported", d.reported],
      ["corrected", d.corrected],
      ["foundAmongUnobserved", d.foundAmongUnobserved],
    ] as const;
    for (const [key, e] of named) {
      if (e.ciLow > e.value || e.ciHigh < e.value)
        ctx.addIssue({
          code: "custom",
          path: [key, "value"],
          message: `estimate (${e.value}) must lie inside its interval (${e.ciLow} to ${e.ciHigh})`,
        });
    }
    // Only the two on the shared axis are bounded by it. The third is a share
    // of a different denominator and has no business on that scale.
    for (const [key, e] of [
      ["reported", d.reported],
      ["corrected", d.corrected],
    ] as const)
      if (e.ciHigh > d.axisMax)
        ctx.addIssue({
          code: "custom",
          path: [key, "ciHigh"],
          message: `interval reaches ${e.ciHigh}, past the axis maximum of ${d.axisMax}, so it would be drawn cut off`,
        });

    // The lesson requires the correction to have MOVED the answer, and to have
    // moved it further than the intervals can explain away. Two estimates whose
    // intervals overlap describe a study that looked for missing outcomes and
    // found the reported number was fine, which is a worthwhile result and is
    // not this shape's lesson: there would be nothing for the reveal to reveal.
    const disjoint = d.reported.ciHigh < d.corrected.ciLow || d.corrected.ciHigh < d.reported.ciLow;
    if (!disjoint)
      ctx.addIssue({
        code: "custom",
        path: ["corrected"],
        message: `the reported interval (${d.reported.ciLow} to ${d.reported.ciHigh}) and the corrected one (${d.corrected.ciLow} to ${d.corrected.ciHigh}) overlap, so the figure shows a correction that changed nothing and there is nothing to reveal`,
      });

    // And the missing group has to be big enough to be the explanation. If
    // almost nobody went unobserved, a large correction did not come from them,
    // and the card would be pointing at the wrong cause.
    if (d.cohort > 0 && d.unobserved / d.cohort < 0.02)
      ctx.addIssue({
        code: "custom",
        path: ["unobserved"],
        message: `only ${((d.unobserved / d.cohort) * 100).toFixed(1)} per cent of the cohort went unobserved, too few to account for a correction of this size`,
      });
  });
export type UnseenData = z.infer<typeof UnseenData>;

/* ---------------------------------------------------------------------------
 * An outcome measured in two arms, plus what each arm was actually given.
 *
 * Needed because the lessons about a COMPARISON THAT WAS NEVER LIKE FOR LIKE
 * cannot be drawn by any shape here, and they all fail in the same place. Every
 * existing shape draws the outcome and stops. That is fine when the question is
 * whether the gap is real, and useless when the question is what bought it,
 * because the reader is then being asked to judge a comparison while looking at
 * exactly the half of it that cannot answer the question.
 *
 * `ratings` comes closest and still cannot do it: it is a flat list of series
 * with one mean each, so there is nowhere to put the dose, and nowhere to say
 * that two of the bars were measured under conditions the experimenters had
 * rigged and two were not. Encoding the dose in the series LABEL would put the
 * answer on screen during the setup, which is the beat where it must not be.
 *
 * So the shape carries a third column, `exposure`, and the two views differ by
 * whether it is drawn. `asmeasured` shows the bars alone, which is how such a
 * comparison is normally published and normally read. `asdelivered` prints
 * under each bar what that group was actually given. Nothing moves between the
 * beats; a column appears. That is the whole design, and it is the reason this
 * shape is not filterable: the reveal is not more bars, it is the same bars
 * with the missing column filled in.
 *
 * `tiers` are the groups compared across (doctors and patients, say, or two
 * centres); `arms` are the two conditions each tier was measured under. The
 * refinement below insists on at least one tier whose two exposures are EQUAL
 * and at least one whose two DIFFER, because a figure without both has no
 * lesson: if every tier was given something different the answer is just "the
 * doses differed" and no comparison is left standing to be surprised by, and if
 * every tier was given the same thing the hidden column reveals nothing at all.
 * ------------------------------------------------------------------------- */

export const DeliveredArm = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Thermedol"
  short: LocalizedText.optional(),
});
export type DeliveredArm = z.infer<typeof DeliveredArm>;

export const DeliveredTier = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "The doctors, on their own arm"
  short: LocalizedText.optional(),
  /**
   * What the source reported for this tier's own comparison. The figure draws
   * bare means, so a tier whose difference needs a published interval or test
   * to be read honestly says so here rather than leaving the reader to judge
   * two bars by eye.
   */
  note: LocalizedText.optional(),
});
export type DeliveredTier = z.infer<typeof DeliveredTier>;

export const DeliveredObservation = z.object({
  tierId: z.string().min(1),
  armId: z.string().min(1),
  mean: z.number(),
  /** People (or units) contributing to this cell, as the source counts them. */
  n: z.number().int().positive(),
  /** What was actually delivered here, in units of `exposureUnit`. */
  exposure: z.number(),
});
export type DeliveredObservation = z.infer<typeof DeliveredObservation>;

const DeliveredData = z
  .object({
    type: z.literal("delivered"),
    label: LocalizedText,
    metricLabel: LocalizedText, // "pain, rated 0 to 100"
    scale: z.object({
      min: z.number(),
      max: z.number(),
      minLabel: LocalizedText,
      maxLabel: LocalizedText,
    }),
    /** Names the withheld column, e.g. "heat actually applied". */
    exposureLabel: LocalizedText,
    /** Its unit, printed against every value: degrees, mg, minutes. */
    exposureUnit: LocalizedText,
    arms: z.array(DeliveredArm).length(2),
    tiers: z.array(DeliveredTier).min(2),
    observations: z.array(DeliveredObservation).min(4),
  })
  .superRefine((d, ctx) => {
    if (d.scale.max <= d.scale.min)
      ctx.addIssue({
        code: "custom",
        path: ["scale", "max"],
        message: "scale max must be above scale min",
      });

    const armIds = new Set(d.arms.map((a) => a.id));
    const tierIds = new Set(d.tiers.map((t) => t.id));
    if (armIds.size !== d.arms.length)
      ctx.addIssue({ code: "custom", path: ["arms"], message: "duplicate arm id" });
    if (tierIds.size !== d.tiers.length)
      ctx.addIssue({ code: "custom", path: ["tiers"], message: "duplicate tier id" });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!armIds.has(o.armId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "armId"],
          message: `no arm with id ${o.armId}`,
        });
      if (!tierIds.has(o.tierId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "tierId"],
          message: `no tier with id ${o.tierId}`,
        });
      const key = `${o.tierId}|${o.armId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${o.tierId} in ${o.armId}`,
        });
      seen.add(key);
      if (o.mean < d.scale.min || o.mean > d.scale.max)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "mean"],
          message: `mean ${o.mean} is outside the ${d.scale.min} to ${d.scale.max} scale`,
        });
    });

    // Every tier must carry both arms, for the reason `yield` insists on it: a
    // pair drawn with one member missing reads as a pair whose second member
    // was zero.
    for (const t of d.tiers)
      for (const a of d.arms)
        if (!seen.has(`${t.id}|${a.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `tier ${t.id} has no observation for arm ${a.id}`,
          });

    // And the pair of checks this shape exists for.
    const exposureGap = (tierId: string): number | null => {
      const [x, y] = d.arms.map((a) =>
        d.observations.find((o) => o.tierId === tierId && o.armId === a.id),
      );
      if (!x || !y) return null;
      return x.exposure - y.exposure;
    };
    const gaps = d.tiers.map((t) => exposureGap(t.id)).filter((g) => g !== null);
    if (gaps.length === d.tiers.length) {
      if (!gaps.some((g) => g === 0))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message:
            "no tier was given the same thing in both arms, so the hidden column accounts for every gap in the figure and no comparison is left standing to be surprised by",
        });
      if (!gaps.some((g) => g !== 0))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message:
            "every tier was given the same thing in both arms, so revealing the hidden column changes nothing the reader could not already see",
        });
    }
  });
export type DeliveredData = z.infer<typeof DeliveredData>;

/* ---------------------------------------------------------------------------
 * One continuous outcome measured under two crossed binary factors.
 *
 * Needed because the lessons about a CONFOUNDED COMPARISON, where two things
 * were varied together and the result is credited to only one of them, have no
 * shape here. Every existing shape draws one factor. `delivered` gets closest
 * and cannot do it: it requires at least one tier whose two arms received the
 * same exposure, which is exactly what a fully crossed design never has, so a
 * 2x2 fails its schema by construction rather than by accident.
 *
 * `interaction` is not it either, despite the name. That shape is built for
 * odds ratios, with a crude row, an adjusted row and a no-effect line at one.
 * This is four cell means on a shared continuous axis.
 *
 * THE SETUP DRAWS A DIAGONAL. Two cells that differ in BOTH factors at once
 * are exactly what an uncontrolled comparison looks like, and drawing only
 * those two is drawing the confound. The reveal adds the other two, which vary
 * one factor at a time and so split the gap into its parts. Nothing moves; two
 * points arrive. Cells are filterable by id, so the restriction is data rather
 * than a special case in the renderer.
 *
 * Drawn as points on a shared axis rather than bars, deliberately. The
 * outcomes this shape suits are things like times and scores, whose interesting
 * range sits far from zero, and a bar chart on an axis that starts at 165
 * seconds is the exact figure `misleading-axis` exists to teach against. Points
 * on a labelled axis carry a truncated range honestly; bars do not.
 * ------------------------------------------------------------------------- */

export const CrossedLevel = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Told caffeine"
  short: LocalizedText.optional(),
});
export type CrossedLevel = z.infer<typeof CrossedLevel>;

export const CrossedCell = z.object({
  id: z.string().min(1),
  /** Which level of the first factor this cell sits in. */
  aId: z.string().min(1),
  /** And of the second. */
  bId: z.string().min(1),
  mean: z.number(),
  n: z.number().int().positive(),
  /** What the source says about this cell, printed under it. */
  note: LocalizedText.optional(),
});
export type CrossedCell = z.infer<typeof CrossedCell>;

const CrossedData = z
  .object({
    type: z.literal("crossed"),
    label: LocalizedText,
    metricLabel: LocalizedText,
    /**
     * The axis. `min` and `max` are almost never 0 and the maximum possible
     * value for this shape, so both labels must name their number outright:
     * a reader has to be able to see that the axis is a window.
     */
    scale: z.object({
      min: z.number(),
      max: z.number(),
      minLabel: LocalizedText,
      maxLabel: LocalizedText,
    }),
    /** True when a smaller number is a better result, as with a race time. */
    lowerIsBetter: z.boolean(),
    factorALabel: LocalizedText, // "What they were told"
    factorBLabel: LocalizedText, // "What they were actually given"
    aLevels: z.array(CrossedLevel).length(2),
    bLevels: z.array(CrossedLevel).length(2),
    cells: z.array(CrossedCell).length(4),
    /**
     * An optional comparator drawn as a line rather than a point, for the
     * source's own baseline. Not a fifth cell: it belongs to neither factor.
     */
    reference: z
      .object({ label: LocalizedText, mean: z.number(), note: LocalizedText.optional() })
      .optional(),
  })
  .superRefine((d, ctx) => {
    if (d.scale.max <= d.scale.min)
      ctx.addIssue({
        code: "custom",
        path: ["scale", "max"],
        message: "scale max must be above scale min",
      });

    const aIds = new Set(d.aLevels.map((l) => l.id));
    const bIds = new Set(d.bLevels.map((l) => l.id));
    if (aIds.size !== 2)
      ctx.addIssue({ code: "custom", path: ["aLevels"], message: "duplicate level id" });
    if (bIds.size !== 2)
      ctx.addIssue({ code: "custom", path: ["bLevels"], message: "duplicate level id" });

    const cellIds = new Set(d.cells.map((c) => c.id));
    if (cellIds.size !== d.cells.length)
      ctx.addIssue({ code: "custom", path: ["cells"], message: "duplicate cell id" });

    const seen = new Set<string>();
    d.cells.forEach((c, i) => {
      if (!aIds.has(c.aId))
        ctx.addIssue({
          code: "custom",
          path: ["cells", i, "aId"],
          message: `no level with id ${c.aId} on the first factor`,
        });
      if (!bIds.has(c.bId))
        ctx.addIssue({
          code: "custom",
          path: ["cells", i, "bId"],
          message: `no level with id ${c.bId} on the second factor`,
        });
      const key = `${c.aId}|${c.bId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["cells", i],
          message: `two cells for ${c.aId} with ${c.bId}`,
        });
      seen.add(key);
      if (c.mean < d.scale.min || c.mean > d.scale.max)
        ctx.addIssue({
          code: "custom",
          path: ["cells", i, "mean"],
          message: `mean ${c.mean} is outside the ${d.scale.min} to ${d.scale.max} scale`,
        });
    });

    // A crossed design has all four combinations by definition. A missing one
    // makes it something else, and the shape would be drawing a claim about a
    // design that was never run.
    for (const a of aIds)
      for (const b of bIds)
        if (!seen.has(`${a}|${b}`))
          ctx.addIssue({
            code: "custom",
            path: ["cells"],
            message: `no cell for ${a} with ${b}, so this is not a crossed design`,
          });

    if (d.reference && (d.reference.mean < d.scale.min || d.reference.mean > d.scale.max))
      ctx.addIssue({
        code: "custom",
        path: ["reference", "mean"],
        message: `reference ${d.reference.mean} is outside the ${d.scale.min} to ${d.scale.max} scale`,
      });

    // And the check this shape exists for. The figure has to contain both a
    // visible gap and a near-tie, because the reveal IS the near-tie: it is
    // the pair that shows one of the two factors doing almost nothing. Four
    // cells spread evenly have no reveal, and four cells on top of each other
    // have no setup. Ten to one is a wide bar that a real figure clears
    // easily; it exists to catch a data file that has drifted, not to grade
    // the finding.
    if (d.cells.length === 4) {
      const gaps: number[] = [];
      for (let i = 0; i < d.cells.length; i++)
        for (let j = i + 1; j < d.cells.length; j++)
          gaps.push(Math.abs(d.cells[i]!.mean - d.cells[j]!.mean));
      const widest = Math.max(...gaps);
      const narrowest = Math.min(...gaps);
      if (widest === 0)
        ctx.addIssue({
          code: "custom",
          path: ["cells"],
          message: "all four cells are equal, so the figure shows nothing at either beat",
        });
      else if (narrowest * 10 > widest)
        ctx.addIssue({
          code: "custom",
          path: ["cells"],
          message:
            "the closest pair of cells is not close relative to the widest, so no pair shows a factor doing almost nothing and the reveal has nothing to land",
        });
    }
  });
export type CrossedData = z.infer<typeof CrossedData>;

/* ---------------------------------------------------------------------------
 * Rates a source PUBLISHED, in arms, where the counts behind them were never
 * printed and cannot be recovered.
 *
 * Needed because this deck's first rule is that numbers are authored once as
 * raw counts and every rate is derived, and there exist sources where obeying
 * that rule is impossible rather than merely inconvenient. `rates` requires an
 * integer numerator and denominator. When a table gives denominators and
 * percentages only, three things can happen, and the third is why this shape
 * exists. Sometimes exactly one integer reproduces the printed percentage and
 * the count can be DECODED, which is what `hawthorne-effect` does. Sometimes
 * the source prints counts elsewhere. And sometimes a cell is genuinely
 * ambiguous, two integers round to the same printed figure, and no other
 * published number breaks the tie. Then the percentage IS the primary datum,
 * and pretending otherwise means writing down a number the source does not
 * determine.
 *
 * `yield` already accepts published rates and cannot be used here, for a
 * reason worth stating so nobody tries: it requires at least one row whose
 * intervals clear one another, because it was built for a figure where
 * something moved and something did not. This shape is for the opposite
 * picture, where the SAME gradient appears in every arm, and the refinement
 * below insists on exactly that instead.
 *
 * WHAT THE SHAPE IS FOR. A gradient down the rows that repeats across the arms.
 * The setup draws one arm and invites the reader to explain its gradient with
 * that arm's treatment; the reveal adds an arm where that explanation is not
 * available and the gradient is there anyway. So the check is that the rows
 * fall in the SAME DIRECTION in every arm. A figure where the gradient reverses
 * between arms is a different lesson and must not borrow this one's shape.
 *
 * Carries the source's own adjusted figure per cell where there is one, because
 * for this family the interesting fact is usually how little adjustment moves
 * things, and a reader who is not shown the adjusted number will reasonably
 * assume nobody tried.
 * ------------------------------------------------------------------------- */

export const PublishedArm = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Given clofibrate"
  short: LocalizedText.optional(),
});
export type PublishedArm = z.infer<typeof PublishedArm>;

export const PublishedRow = z.object({
  id: z.string().min(1),
  label: LocalizedText, // "Took under 80 per cent of their capsules"
  short: LocalizedText.optional(),
  note: LocalizedText.optional(),
});
export type PublishedRow = z.infer<typeof PublishedRow>;

export const PublishedObservation = z.object({
  rowId: z.string().min(1),
  armId: z.string().min(1),
  /** The rate as published, in units of `perLabel`. */
  rate: z.number().nonnegative(),
  /** Its standard error, as published. Drawn as a whisker, never widened. */
  se: z.number().positive(),
  /** The denominator, which sources of this kind do print. */
  n: z.number().int().positive(),
  /** The source's OWN adjusted rate, where it published one. */
  adjusted: z.number().nonnegative().optional(),
});
export type PublishedObservation = z.infer<typeof PublishedObservation>;

const PublishedData = z
  .object({
    type: z.literal("published"),
    label: LocalizedText,
    metricLabel: LocalizedText,
    /** Names the units, e.g. "per cent dead within five years". */
    perLabel: LocalizedText,
    /**
     * Says on the figure that these are published rates and why they are not
     * counts. Required, not optional: a reader who assumes a percentage was
     * derived from counts this deck holds is owed the correction on the figure
     * itself and not only in the provenance.
     */
    rateNote: LocalizedText,
    /** What the source adjusted for, printed wherever `adjusted` is drawn. */
    adjustedLabel: LocalizedText.optional(),
    /** Says what the whisker is, since it is one standard error and not a CI. */
    dispersionLabel: LocalizedText,
    /** Shared by both beats so nothing moves when the reveal adds an arm. */
    axisMax: z.number().positive(),
    arms: z.array(PublishedArm).min(2),
    rows: z.array(PublishedRow).min(2),
    observations: z.array(PublishedObservation).min(4),
  })
  .superRefine((d, ctx) => {
    const armIds = new Set(d.arms.map((a) => a.id));
    const rowIds = new Set(d.rows.map((r) => r.id));
    if (armIds.size !== d.arms.length)
      ctx.addIssue({ code: "custom", path: ["arms"], message: "duplicate arm id" });
    if (rowIds.size !== d.rows.length)
      ctx.addIssue({ code: "custom", path: ["rows"], message: "duplicate row id" });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!armIds.has(o.armId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "armId"],
          message: `no arm with id ${o.armId}`,
        });
      if (!rowIds.has(o.rowId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "rowId"],
          message: `no row with id ${o.rowId}`,
        });
      const key = `${o.rowId}|${o.armId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${o.rowId} in ${o.armId}`,
        });
      seen.add(key);
      if (o.rate + o.se > d.axisMax)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "se"],
          message: `rate plus one standard error reaches ${(o.rate + o.se).toFixed(1)}, past the axis maximum of ${d.axisMax}, so the whisker would be drawn cut off`,
        });
      if (o.adjusted !== undefined && o.adjusted > d.axisMax)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "adjusted"],
          message: `adjusted rate ${o.adjusted} is past the axis maximum of ${d.axisMax}`,
        });
    });

    for (const r of d.rows)
      for (const a of d.arms)
        if (!seen.has(`${r.id}|${a.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `row ${r.id} has no observation for arm ${a.id}`,
          });

    /**
     * An adjusted figure in one cell and not its neighbour would invite a
     * reader to compare an adjusted number against an unadjusted one, which is
     * the sort of quiet apples-to-oranges this deck exists to catch.
     */
    const adjustedCount = d.observations.filter((o) => o.adjusted !== undefined).length;
    if (adjustedCount !== 0 && adjustedCount !== d.observations.length)
      ctx.addIssue({
        code: "custom",
        path: ["observations"],
        message:
          "some cells carry an adjusted rate and some do not, so the figure would put adjusted and unadjusted numbers side by side",
      });
    if (adjustedCount > 0 && !d.adjustedLabel)
      ctx.addIssue({
        code: "custom",
        path: ["adjustedLabel"],
        message: "adjusted rates are drawn, so the figure has to say what they were adjusted for",
      });

    // And the check this shape exists for: the gradient must run the same way
    // in every arm, since the reveal is an arm where the reader's explanation
    // of that gradient is not available and it is there regardless.
    const [first, second] = d.rows;
    if (first && second && d.rows.length >= 2) {
      const signs = d.arms.map((a) => {
        const x = d.observations.find((o) => o.rowId === first.id && o.armId === a.id);
        const y = d.observations.find((o) => o.rowId === second.id && o.armId === a.id);
        if (!x || !y) return null;
        return Math.sign(x.rate - y.rate);
      });
      if (signs.every((s) => s !== null)) {
        if (signs.some((s) => s === 0))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message:
              "an arm has no gap at all between the first two rows, so there is no gradient for the other arm to repeat",
          });
        else if (new Set(signs).size > 1)
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message:
              "the gradient between the first two rows runs one way in one arm and the other way in another, which is a different lesson than this shape draws",
          });
      }
    }
  });
export type PublishedData = z.infer<typeof PublishedData>;

/* ---------------------------------------------------------------------------
 * `surrogate`: a run-in that keeps only the people in whom a marker responded,
 * then the randomised comparison of what happened to those people.
 *
 * WHY THIS COULD NOT REUSE A SHAPE. Every two-arm shape in this file draws both
 * arms on every row, and the point here is that the surrogate result HAS no
 * control arm: the marker responding is what got a patient randomised at all,
 * so at that beat there is nobody to compare them against. `yield` requires
 * both arms on every row plus one row where they overlap; `rates` is a single
 * count table grouped and stratified, not a funnel followed by a different
 * table; `published` authors rates with standard errors; `crossed` needs two
 * crossed binary factors. Drawing the surrogate as though it had a control
 * would invent a comparison the source never ran, which on a card about
 * misreading surrogates would be its own punchline.
 * ------------------------------------------------------------------------- */
const RunInStage = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  count: z.number().int().nonnegative(),
  /** Exactly one stage is the one that qualified people for randomisation. */
  qualified: z.boolean().optional(),
});

const SurrogateArm = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  n: z.number().int().positive(),
});

const SurrogateEndpoint = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  note: LocalizedText.optional(),
});

const SurrogateObservation = z.object({
  endpointId: z.string().min(1),
  armId: z.string().min(1),
  events: z.number().int().nonnegative(),
});

export const SurrogateData = z
  .object({
    type: z.literal("surrogate"),
    label: LocalizedText,
    /** What the marker was and what counted as a response, on the figure. */
    criterionLabel: LocalizedText,
    /** Names the run-in population, e.g. "patients who tried the drug". */
    runInLabel: LocalizedText,
    /** Names what the endpoint counts are of, e.g. "of those randomised". */
    endpointLabel: LocalizedText,
    /** Said on the figure, because the asymmetry IS the lesson. */
    noControlNote: LocalizedText,
    entered: z.number().int().positive(),
    stages: z.array(RunInStage).min(2),
    arms: z.array(SurrogateArm).length(2),
    endpoints: z.array(SurrogateEndpoint).min(1),
    observations: z.array(SurrogateObservation).min(2),
  })
  .superRefine((d, ctx) => {
    const armIds = new Set(d.arms.map((a) => a.id));
    const endpointIds = new Set(d.endpoints.map((e) => e.id));
    if (armIds.size !== d.arms.length)
      ctx.addIssue({ code: "custom", path: ["arms"], message: "duplicate arm id" });
    if (endpointIds.size !== d.endpoints.length)
      ctx.addIssue({
        code: "custom",
        path: ["endpoints"],
        message: "duplicate endpoint id",
      });
    if (new Set(d.stages.map((s) => s.id)).size !== d.stages.length)
      ctx.addIssue({ code: "custom", path: ["stages"], message: "duplicate stage id" });

    // The funnel must account for everybody. A stage list that does not sum to
    // the number who entered is a figure with people quietly missing from it,
    // which is the exact reading error `attrition-bias` exists to punish.
    const summed = d.stages.reduce((t, s) => t + s.count, 0);
    if (summed !== d.entered)
      ctx.addIssue({
        code: "custom",
        path: ["stages"],
        message: `stages sum to ${summed} but ${d.entered} entered the run-in, leaving ${Math.abs(d.entered - summed)} people unaccounted for`,
      });

    const qualified = d.stages.filter((s) => s.qualified);
    if (qualified.length !== 1)
      ctx.addIssue({
        code: "custom",
        path: ["stages"],
        message: `exactly one stage must be marked qualified, found ${qualified.length}`,
      });

    // Everyone randomised came out of the qualifying stage, so the arms cannot
    // between them hold more people than that stage produced.
    const randomised = d.arms.reduce((t, a) => t + a.n, 0);
    const q = qualified[0];
    if (q && randomised > q.count)
      ctx.addIssue({
        code: "custom",
        path: ["arms"],
        message: `arms hold ${randomised} people but only ${q.count} qualified`,
      });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!armIds.has(o.armId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "armId"],
          message: `no arm with id ${o.armId}`,
        });
      if (!endpointIds.has(o.endpointId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "endpointId"],
          message: `no endpoint with id ${o.endpointId}`,
        });
      const key = `${o.endpointId}|${o.armId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${o.endpointId} in ${o.armId}`,
        });
      seen.add(key);
      const arm = d.arms.find((a) => a.id === o.armId);
      if (arm && o.events > arm.n)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "events"],
          message: `${o.events} events in an arm of ${arm.n}`,
        });
    });

    for (const e of d.endpoints)
      for (const a of d.arms)
        if (!seen.has(`${e.id}|${a.id}`))
          ctx.addIssue({
            code: "custom",
            path: ["observations"],
            message: `endpoint ${e.id} has no observation for arm ${a.id}`,
          });

    // The reason this shape exists: the marker responded and the outcome went
    // the other way. If the treated arm is better or level on every endpoint,
    // the reveal has nothing to reveal and the card is about a drug that
    // worked, which is a different card. The first-declared arm is the treated
    // one, which the renderer also relies on.
    const [treated, control] = d.arms;
    if (treated && control) {
      const rateIn = (endpointId: string, arm: typeof treated) => {
        const o = d.observations.find(
          (x) => x.endpointId === endpointId && x.armId === arm.id,
        );
        return o ? o.events / arm.n : null;
      };
      const worseSomewhere = d.endpoints.some((e) => {
        const t = rateIn(e.id, treated);
        const c = rateIn(e.id, control);
        return t !== null && c !== null && t > c;
      });
      if (!worseSomewhere)
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message:
            "the treated arm is no worse than the control on any endpoint, so the marker and the outcome agree and this shape has no lesson to draw",
        });
    }
  });
export type SurrogateData = z.infer<typeof SurrogateData>;

/* ---------------------------------------------------------------------------
 * `attenuation`: one association, recomputed on the same cohort after throwing
 * away the earliest deaths, next to a control association put through exactly
 * the same treatment.
 *
 * WHY THIS COULD NOT REUSE A SHAPE. Every other two-group shape here draws one
 * comparison. This one draws the SAME comparison several times over, and the
 * lesson lives in how it changes across those repetitions rather than in any
 * single one of them. `yield` was the near miss: its refinement wants one row
 * where the arms separate and one where they overlap, which is exactly the
 * primary series, but it authors published rates with intervals rather than
 * counts and has nowhere to put the second, control outcome. The control is
 * not decoration. Without it a reader should distrust the whole manoeuvre,
 * since throwing away data shrinks estimates for boring reasons too; the
 * control is what shows this particular shrinkage is not one of them.
 *
 * THE EXCLUSION WINDOWS ARE NESTED, NOT SEPARATE GROUPS. Each window keeps a
 * subset of the people the previous one kept, so the denominators shrink as the
 * window widens, and the schema enforces that rather than trusting an author to
 * notice.
 * ------------------------------------------------------------------------- */
const ExclusionWindow = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  /** Years of follow-up discarded. The first window is normally 0. */
  excludedYears: z.number().int().nonnegative(),
});

const AttenuationGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
});

const AttenuationOutcome = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  note: LocalizedText.optional(),
  /**
   * The outcome that should NOT move, and the reason the reveal is believable.
   * At most one, and it is never the outcome drawn at the setup beat.
   */
  isControl: z.boolean().optional(),
});

const AttenuationObservation = z.object({
  windowId: z.string().min(1),
  groupId: z.string().min(1),
  outcomeId: z.string().min(1),
  events: z.number().int().nonnegative(),
  /** People still at risk at the start of this window. */
  n: z.number().int().positive(),
});

export const AttenuationData = z
  .object({
    type: z.literal("attenuation"),
    label: LocalizedText,
    /** Says what the windows mean, on the figure. */
    windowLabel: LocalizedText,
    /** Says what the ratio is, since it is neither a rate nor a hazard ratio. */
    ratioLabel: LocalizedText,
    /** Says the counts are as published and the ratios are derived from them. */
    rateNote: LocalizedText,
    windows: z.array(ExclusionWindow).min(2),
    /** Exactly two: the first is the exposed group the ratio is built on. */
    groups: z.array(AttenuationGroup).length(2),
    outcomes: z.array(AttenuationOutcome).min(1),
    observations: z.array(AttenuationObservation).min(4),
  })
  .superRefine((d, ctx) => {
    const windowIds = new Set(d.windows.map((w) => w.id));
    const groupIds = new Set(d.groups.map((g) => g.id));
    const outcomeIds = new Set(d.outcomes.map((o) => o.id));
    if (windowIds.size !== d.windows.length)
      ctx.addIssue({ code: "custom", path: ["windows"], message: "duplicate window id" });
    if (groupIds.size !== d.groups.length)
      ctx.addIssue({ code: "custom", path: ["groups"], message: "duplicate group id" });
    if (outcomeIds.size !== d.outcomes.length)
      ctx.addIssue({ code: "custom", path: ["outcomes"], message: "duplicate outcome id" });

    // Windows must be authored widest-last, because the renderer and every
    // derivation read them in order and the whole lesson is a direction.
    for (let i = 1; i < d.windows.length; i++) {
      const prev = d.windows[i - 1];
      const cur = d.windows[i];
      if (prev && cur && cur.excludedYears <= prev.excludedYears)
        ctx.addIssue({
          code: "custom",
          path: ["windows", i, "excludedYears"],
          message: `windows must widen in order: ${cur.excludedYears} does not exceed ${prev.excludedYears}`,
        });
    }

    const controls = d.outcomes.filter((o) => o.isControl);
    if (controls.length > 1)
      ctx.addIssue({
        code: "custom",
        path: ["outcomes"],
        message: `at most one control outcome, found ${controls.length}`,
      });
    if (d.outcomes.filter((o) => !o.isControl).length === 0)
      ctx.addIssue({
        code: "custom",
        path: ["outcomes"],
        message: "every outcome is marked as the control, leaving nothing to attenuate",
      });

    const seen = new Set<string>();
    d.observations.forEach((o, i) => {
      if (!windowIds.has(o.windowId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "windowId"],
          message: `no window with id ${o.windowId}`,
        });
      if (!groupIds.has(o.groupId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "groupId"],
          message: `no group with id ${o.groupId}`,
        });
      if (!outcomeIds.has(o.outcomeId))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "outcomeId"],
          message: `no outcome with id ${o.outcomeId}`,
        });
      const key = `${o.windowId}|${o.groupId}|${o.outcomeId}`;
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["observations", i],
          message: `two observations for ${key}`,
        });
      seen.add(key);
      if (o.events > o.n)
        ctx.addIssue({
          code: "custom",
          path: ["observations", i, "events"],
          message: `${o.events} events among ${o.n} people`,
        });
    });

    // The grid must be complete: a missing cell would draw a series with a
    // silent hole in it, and a reader would price the gap as data.
    for (const w of d.windows)
      for (const g of d.groups)
        for (const o of d.outcomes)
          if (!seen.has(`${w.id}|${g.id}|${o.id}`))
            ctx.addIssue({
              code: "custom",
              path: ["observations"],
              message: `no observation for window ${w.id}, group ${g.id}, outcome ${o.id}`,
            });

    const at = (windowId: string, groupId: string, outcomeId: string) =>
      d.observations.find(
        (o) => o.windowId === windowId && o.groupId === groupId && o.outcomeId === outcomeId,
      );

    // Nested windows: nobody can be added back by discarding more follow-up.
    for (const g of d.groups)
      for (const o of d.outcomes)
        for (let i = 1; i < d.windows.length; i++) {
          const prev = at(d.windows[i - 1]!.id, g.id, o.id);
          const cur = at(d.windows[i]!.id, g.id, o.id);
          if (prev && cur && cur.n > prev.n)
            ctx.addIssue({
              code: "custom",
              path: ["observations"],
              message: `group ${g.id} grows from ${prev.n} to ${cur.n} as the window widens, but the windows are nested`,
            });
        }

    // A reference cell with no events makes the ratio a division by zero, and
    // the derivation would hand the renderer a NaN. The first version of this
    // file merely SKIPPED the checks below in that case, which let such a
    // puzzle validate and then draw NaN on the card. Reject it here instead:
    // this shape's entire output is a ratio, so a reference group that nothing
    // happened to is data this shape cannot draw, whatever else is true of it.
    const [exposedGroup, referenceGroup] = d.groups;
    if (referenceGroup)
      for (const w of d.windows)
        for (const o of d.outcomes) {
          const b = at(w.id, referenceGroup.id, o.id);
          if (b && b.events === 0)
            ctx.addIssue({
              code: "custom",
              path: ["observations"],
              message: `the reference group has no events for window ${w.id}, outcome ${o.id}, so the ratio would divide by zero`,
            });
        }

    const ratio = (windowId: string, outcomeId: string): number | null => {
      if (!exposedGroup || !referenceGroup) return null;
      const a = at(windowId, exposedGroup.id, outcomeId);
      const b = at(windowId, referenceGroup.id, outcomeId);
      if (!a || !b || b.events === 0) return null;
      return a.events / a.n / (b.events / b.n);
    };

    const first = d.windows[0];
    const last = d.windows[d.windows.length - 1];
    if (!first || !last) return;

    // The lesson: the primary association must actually move towards 1, and by
    // a margin worth drawing. A shape whose figure does not attenuate is a
    // figure about a robust association, which is a different card entirely.
    for (const o of d.outcomes.filter((x) => !x.isControl)) {
      const a = ratio(first.id, o.id);
      const b = ratio(last.id, o.id);
      if (a === null || b === null) continue;
      const moved = Math.abs(a - 1) - Math.abs(b - 1);
      if (moved <= 0)
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message: `outcome ${o.id} does not move towards 1 across the windows (${a.toFixed(3)} to ${b.toFixed(3)}), so there is nothing for this shape to reveal`,
        });
      else if (moved < 0.1 * Math.abs(a - 1))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message: `outcome ${o.id} moves only ${(100 * moved) / Math.abs(a - 1)} per cent of the way towards 1, which is too little to read off a chart`,
        });
    }

    // And the control must hold still, or it is not a control.
    //
    // Distance travelled, NOT distance towards 1. A first version measured the
    // latter and would have accepted a control that lurched the other way, from
    // 0.79 to 1.31, which is a control demonstrating that the exclusions do
    // plenty. Either direction of movement destroys the argument the control
    // exists to make, so either direction has to fail here.
    for (const o of controls) {
      const a = ratio(first.id, o.id);
      const b = ratio(last.id, o.id);
      if (a === null || b === null) continue;
      if (Math.abs(b - a) > 0.25 * Math.abs(a - 1))
        ctx.addIssue({
          code: "custom",
          path: ["observations"],
          message: `the control outcome ${o.id} moves from ${a.toFixed(3)} to ${b.toFixed(3)}, which is too far to show that the exclusions are innocent`,
        });
    }
  });
export type AttenuationData = z.infer<typeof AttenuationData>;

/* ---------------------------------------------------------------------------
 * `conditional`: one factor's effect measured at each level of another, drawn
 * as cell means on a rating scale.
 *
 * The lesson is an INTERACTION, and specifically the case where a bias looks
 * absent until you look at the condition where judgement has room to move. So
 * the setup draws one row and the reveal adds the other, which is a filter the
 * engine already supports rather than a second figure.
 *
 * WHY NOT `crossed`, WHICH IS THE NEAR MISS. That shape also takes two crossed
 * factors over a continuous outcome, but its refinement requires the widest
 * pairwise gap to be at least ten times the narrowest, because it exists to
 * draw a setup sitting on a confounded diagonal. Landy and Sigall's four cells
 * run 6.7, 5.9, 5.2, 2.7, a ratio of about six, so `crossed` rejects them, and
 * it rejects them CORRECTLY: relaxing that bound to admit this data would
 * weaken the check the balanced-placebo card depends on. Different lesson,
 * different shape.
 *
 * WHY NOT `interaction`. That one is odds ratios against a no-effect line of 1,
 * crude against Mantel-Haenszel adjusted. This is means on a rating scale.
 * ------------------------------------------------------------------------- */
const ConditionalScale = z.object({
  min: z.number(),
  max: z.number(),
  minLabel: LocalizedText,
  maxLabel: LocalizedText,
});

const ConditionalRow = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  note: LocalizedText.optional(),
});

const ConditionalColumn = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  short: LocalizedText.optional(),
  /** The level that is the comparison, drawn differently. */
  isBaseline: z.boolean().optional(),
});

const ConditionalCell = z.object({
  rowId: z.string().min(1),
  columnId: z.string().min(1),
  mean: z.number(),
  /** As printed. Never derived, and never widened into an interval here. */
  sd: z.number().nonnegative().optional(),
  n: z.number().int().positive(),
});

export const ConditionalData = z
  .object({
    type: z.literal("conditional"),
    label: LocalizedText,
    /** What was rated, and on what, said on the figure. */
    metricLabel: LocalizedText,
    /** Names the factor whose effect is being measured, i.e. the columns. */
    factorLabel: LocalizedText,
    /** Says what the dispersion mark is, e.g. one standard deviation. */
    dispersionLabel: LocalizedText.optional(),
    /** Says the means are as printed and are not derived from counts. */
    meanNote: LocalizedText,
    scale: ConditionalScale,
    rows: z.array(ConditionalRow).min(2),
    columns: z.array(ConditionalColumn).min(2),
    cells: z.array(ConditionalCell).min(4),
  })
  .superRefine((d, ctx) => {
    const rowIds = new Set(d.rows.map((r) => r.id));
    const colIds = new Set(d.columns.map((c) => c.id));
    if (rowIds.size !== d.rows.length)
      ctx.addIssue({ code: "custom", path: ["rows"], message: "duplicate row id" });
    if (colIds.size !== d.columns.length)
      ctx.addIssue({ code: "custom", path: ["columns"], message: "duplicate column id" });
    if (d.scale.max <= d.scale.min)
      ctx.addIssue({ code: "custom", path: ["scale"], message: "scale max must exceed min" });
    if (d.columns.filter((c) => c.isBaseline).length > 1)
      ctx.addIssue({ code: "custom", path: ["columns"], message: "at most one baseline column" });

    /**
     * JSON rather than a joined string. Ids are authored by hand, and a "|"
     * inside one would let two DIFFERENT pairs collide on a single key: the
     * duplicate check would then reject a correct grid, and the completeness
     * check below would accept one with a hole, which is the worse half.
     */
    const cellKey = (rowId: string, columnId: string): string =>
      JSON.stringify([rowId, columnId]);

    const seen = new Set<string>();
    d.cells.forEach((c, i) => {
      if (!rowIds.has(c.rowId))
        ctx.addIssue({ code: "custom", path: ["cells", i, "rowId"], message: `no row ${c.rowId}` });
      if (!colIds.has(c.columnId))
        ctx.addIssue({
          code: "custom",
          path: ["cells", i, "columnId"],
          message: `no column ${c.columnId}`,
        });
      const key = cellKey(c.rowId, c.columnId);
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["cells", i],
          message: `two cells for row ${c.rowId}, column ${c.columnId}`,
        });
      seen.add(key);
      if (c.mean < d.scale.min || c.mean > d.scale.max)
        ctx.addIssue({
          code: "custom",
          path: ["cells", i, "mean"],
          message: `mean ${c.mean} is outside the scale ${d.scale.min} to ${d.scale.max}`,
        });
    });

    // A missing cell would draw a row with a silent hole, which a reader prices
    // as data rather than as absence.
    for (const r of d.rows)
      for (const c of d.columns)
        if (!seen.has(cellKey(r.id, c.id)))
          ctx.addIssue({
            code: "custom",
            path: ["cells"],
            message: `no cell for row ${r.id}, column ${c.id}`,
          });

    // The reason this shape exists: the spread across the columns must differ
    // between the rows, and by a margin worth drawing. If every row shows the
    // same spread there is no interaction, the reveal adds nothing, and the
    // card is about a main effect, which several existing shapes already draw.
    const spread = (rowId: string): number | null => {
      const vals = d.columns
        .map((c) => d.cells.find((x) => x.rowId === rowId && x.columnId === c.id)?.mean)
        .filter((v): v is number => v !== undefined);
      return vals.length < 2 ? null : Math.max(...vals) - Math.min(...vals);
    };
    const spreads = d.rows.map((r) => spread(r.id)).filter((v): v is number => v !== null);
    if (spreads.length === d.rows.length) {
      const widest = Math.max(...spreads);
      const narrowest = Math.min(...spreads);
      // Flat everywhere has to be caught FIRST. With every row flat both
      // numbers are 0, the ratio test below reads "0 < 0" and passes, and a
      // grid with no variation at all would ship as an interaction chart.
      if (widest === 0)
        ctx.addIssue({
          code: "custom",
          path: ["cells"],
          message:
            "every row is flat across the columns, so there is no effect to modify and nothing for the reveal to add",
        });
      else if (widest < 2 * narrowest)
        ctx.addIssue({
          code: "custom",
          path: ["cells"],
          message: `the widest row spans ${widest.toFixed(2)} and the narrowest ${narrowest.toFixed(2)}, less than double, so there is no interaction for this shape to reveal`,
        });
    }
  });
export type ConditionalData = z.infer<typeof ConditionalData>;

/**
 * `raters`: one piece of work, many judges, and the marks they each gave it.
 *
 * WHY THIS IS NOT `ratings`, WHICH IS THE OBVIOUS REUSE AND THE WRONG ONE.
 * `ratings` carries a MEAN per series with an optional standard deviation, so
 * putting this data on it means collapsing the individual marks into an average
 * and a spread. That destroys the entire reveal. The point is not that the marks
 * have a spread, which sounds like measurement noise and invites a shrug; it is
 * that the individual marks fall on BOTH SIDES of a line that decides something,
 * so the same work passes or fails depending on who happened to pick it up. An
 * average cannot straddle a threshold, and a standard deviation cannot say that
 * two of five markers passed it.
 *
 * WHAT MAKES THE SHAPE HONEST, and it is the reason `subject` is required. Marks
 * from different judges mean nothing unless they judged the SAME thing: judges
 * who saw different work differ for reasons that have nothing to do with how
 * they judge. So the shape asks the data file to name the single object every
 * rater saw, and the reveal beat is then a claim about the raters rather than
 * about the work.
 *
 * COLOUR IS A FACT ABOUT THE MARK, NOT A POSITION IN A LIST. Each mark is drawn
 * by which side of `threshold` it falls on, so a rater's colour is identical at
 * the setup and at the reveal no matter which subset is drawn. That is why this
 * shape needs no `declaredColors`: there is no slot to keep stable, because
 * nothing here is coloured by its index.
 */
const Rater = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  /** Which body of judges this one belongs to, when the card draws more than one. */
  groupId: z.string().min(1).optional(),
  mark: z.number(),
});
export type Rater = z.infer<typeof Rater>;

const RaterGroup = z.object({
  id: z.string().min(1),
  label: LocalizedText,
});
export type RaterGroup = z.infer<typeof RaterGroup>;

const RatersData = z
  .object({
    type: z.literal("raters"),
    label: LocalizedText, // figure title
    /** The single thing every rater judged. Required: see the note above. */
    subject: LocalizedText,
    metricLabel: LocalizedText, // "Mark out of 100"
    min: z.number(),
    max: z.number(),
    /** The line that decides the outcome, e.g. the pass mark. */
    threshold: z.number(),
    thresholdLabel: LocalizedText,
    aboveLabel: LocalizedText, // "Passed"
    belowLabel: LocalizedText, // "Failed"
    groups: z.array(RaterGroup).min(1),
    raters: z.array(Rater).min(2),
  })
  .superRefine((d, ctx) => {
    if (d.max <= d.min)
      ctx.addIssue({
        code: "custom",
        path: ["max"],
        message: "the scale's max must be above its min",
      });

    const seen = new Set<string>();
    for (const r of d.raters) {
      if (seen.has(r.id))
        ctx.addIssue({
          code: "custom",
          path: ["raters"],
          message: `two raters share the id "${r.id}", so a view naming it would draw an arbitrary one of them`,
        });
      seen.add(r.id);

      if (r.mark < d.min || r.mark > d.max)
        ctx.addIssue({
          code: "custom",
          path: ["raters"],
          message: `rater "${r.id}" gave ${r.mark}, which is outside the scale ${d.min} to ${d.max}`,
        });

      if (r.groupId !== undefined && !d.groups.some((g) => g.id === r.groupId))
        ctx.addIssue({
          code: "custom",
          path: ["raters"],
          message: `rater "${r.id}" names the group "${r.groupId}", which is not declared`,
        });
    }

    if (d.threshold <= d.min || d.threshold >= d.max)
      ctx.addIssue({
        code: "custom",
        path: ["threshold"],
        message: `the threshold ${d.threshold} is not inside the scale ${d.min} to ${d.max}, so no mark could fall on both sides of it`,
      });

    /*
      The guard that makes the shape mean what it says. If every marker landed
      on one side of the line then they agreed about the outcome, and a reveal
      bringing the others in would show the reader a wider spread and the SAME
      verdict, which is a much weaker claim than this shape exists to make and
      one a reader could fairly shrug at. Refuse it at authoring time rather
      than let a card ship whose reveal quietly does not land.
    */
    const above = d.raters.filter((r) => r.mark >= d.threshold).length;
    if (above === 0 || above === d.raters.length)
      ctx.addIssue({
        code: "custom",
        path: ["raters"],
        message:
          "every rater fell on the same side of the threshold, so the same work got the same verdict from all of them and there is nothing for the reveal to show",
      });
  });
export type RatersData = z.infer<typeof RatersData>;

/* ---------------------------------------------------------------------------
 * A competing risk: one cohort, one outcome, and two estimators of it.
 *
 * The shape exists because no line chart could carry the lesson. `series`
 * draws two lines for two GROUPS and turns on the moment they cross; here the
 * two lines are two ESTIMATORS OF ONE GROUP, and they can never cross, since
 * one minus Kaplan-Meier is greater than or equal to the competing-risk
 * estimate everywhere by construction. Its one distinguishing feature could
 * never fire.
 *
 * What the reveal has to say is also a dimension a line chart does not have.
 * The gap between the curves has to be shown to be DEAD PEOPLE rather than
 * unknowns, so the composition of the cohort has to sit in the same figure
 * that draws the curves. Hence `fates` beside `points`.
 * ------------------------------------------------------------------------- */

/** One time point, carrying both estimates of cumulative incidence per 100. */
const CompetingPoint = z.object({
  /** Time since entry, in `timeUnit`. */
  t: z.number().nonnegative(),
  /** The estimator that treats a death as a censoring, i.e. 1 - Kaplan-Meier. */
  naive: z.number().min(0).max(100),
  /** The estimator that treats a death as an outcome the patient cannot leave. */
  adjusted: z.number().min(0).max(100),
});

/**
 * What became of the cohort, as observed. Not an estimate: these are the
 * counted fates, and they are what makes the reveal a fact rather than a
 * second opinion.
 */
const CompetingFate = z.object({
  id: z.string().min(1),
  label: LocalizedText,
  /** Per 100 of the cohort. */
  share: z.number().min(0).max(100),
  role: z.enum(["event", "competing", "stillfollowed"]),
});

const CompetingData = z
  .object({
    type: z.literal("competing"),
    label: LocalizedText, // figure title
    timeUnit: LocalizedText, // "years"
    metricLabel: LocalizedText, // what the curves count
    naiveLabel: LocalizedText, // names the estimator drawn at the setup
    adjustedLabel: LocalizedText, // names the one added at the reveal
    /** Names the band between the curves. Drawn only at the reveal. */
    gapLabel: LocalizedText,
    /** Says on the figure who these people are and how long they were followed. */
    cohortNote: LocalizedText,
    points: z.array(CompetingPoint).min(2),
    fates: z.array(CompetingFate).min(2),
  })
  .superRefine((d, ctx) => {
    d.points.forEach((p, i) => {
      if (i > 0 && p.t <= d.points[i - 1].t)
        ctx.addIssue({
          code: "custom",
          path: ["points", i, "t"],
          message: "points must run forwards in time",
        });
      /*
        A CUMULATIVE INCIDENCE CANNOT FALL. Both curves count people who have
        ever had the event, so a drop would mean somebody un-had one.
      */
      if (i > 0 && p.naive < d.points[i - 1].naive)
        ctx.addIssue({
          code: "custom",
          path: ["points", i, "naive"],
          message: "a cumulative incidence cannot fall",
        });
      if (i > 0 && p.adjusted < d.points[i - 1].adjusted)
        ctx.addIssue({
          code: "custom",
          path: ["points", i, "adjusted"],
          message: "a cumulative incidence cannot fall",
        });
      /*
        THE ORDERING IS A THEOREM, NOT A FINDING. Treating a death as a
        censoring keeps that patient in the risk set forever, so the naive
        estimate is greater than or equal to the competing-risk one at every
        time. A card drawing the reverse has a transcription error, and the
        figure would be teaching an impossibility.
      */
      if (p.naive < p.adjusted)
        ctx.addIssue({
          code: "custom",
          path: ["points", i],
          message:
            "the naive estimate cannot sit below the competing-risk one; one minus Kaplan-Meier is an upper bound",
        });
    });

    // Equal everywhere is legal arithmetic and a dead puzzle: the reveal would
    // redraw the setup. Separate from the check above, which allows it.
    if (!d.points.some((p) => p.naive > p.adjusted))
      ctx.addIssue({
        code: "custom",
        path: ["points"],
        message:
          "the two estimators agree at every point, so the reveal has nothing to show",
      });

    const ids = new Set<string>();
    d.fates.forEach((f, i) => {
      if (ids.has(f.id))
        ctx.addIssue({ code: "custom", path: ["fates", i, "id"], message: `duplicate fate ${f.id}` });
      ids.add(f.id);
    });

    if (d.fates.filter((f) => f.role === "event").length !== 1)
      ctx.addIssue({
        code: "custom",
        path: ["fates"],
        message: "exactly one fate is the outcome the curves are about",
      });
    if (!d.fates.some((f) => f.role === "competing"))
      ctx.addIssue({
        code: "custom",
        path: ["fates"],
        message: "a competing risk shape with no competing event is not one",
      });

    /*
      THE FATES PARTITION THE COHORT. Everyone ends in exactly one of them, so
      the shares total 100, and a figure whose bar does not fill is a figure
      quietly dropping people. The tolerance is 1.5 rather than 0, because a
      source printing three shares each rounded to a whole per cent can move
      the total by half a point apiece.
    */
    const total = d.fates.reduce((sum, f) => sum + f.share, 0);
    if (Math.abs(total - 100) > 1.5)
      ctx.addIssue({
        code: "custom",
        path: ["fates"],
        message: `the fates total ${total} per cent, so they do not partition the cohort`,
      });
  });
export type CompetingData = z.infer<typeof CompetingData>;

export const PuzzleData = z.discriminatedUnion("type", [
  ProxyData,
  CompetingData,
  RatersData,
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
  SalienceData,
  DriftData,
  RatingsData,
  BunchingData,
  MagnitudeData,
  ProjectionData,
  TargetData,
  SeriesData,
  IntervalData,
  CeilingData,
  ForestData,
  YieldData,
  UnseenData,
  DeliveredData,
  CrossedData,
  PublishedData,
  SurrogateData,
  AttenuationData,
  ConditionalData,
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
  z.object({ kind: z.literal("asguessed"), ...viewFields }),
  z.object({ kind: z.literal("againstfact"), ...viewFields }),
  z.object({ kind: z.literal("atfirst"), ...viewFields }),
  z.object({ kind: z.literal("overtime"), ...viewFields }),
  z.object({ kind: z.literal("onerating"), ...viewFields }),
  z.object({ kind: z.literal("bothratings"), ...viewFields }),
  z.object({ kind: z.literal("approaching"), ...viewFields }),
  z.object({ kind: z.literal("acrossline"), ...viewFields }),
  z.object({ kind: z.literal("asnumbers"), ...viewFields }),
  z.object({ kind: z.literal("againsttruth"), ...viewFields }),
  z.object({ kind: z.literal("asdrawn"), ...viewFields }),
  z.object({ kind: z.literal("whichisexact"), ...viewFields }),
  z.object({ kind: z.literal("oncompliance"), ...viewFields }),
  z.object({ kind: z.literal("insidewindow"), ...viewFields }),
  z.object({ kind: z.literal("oneinstrument"), ...viewFields }),
  z.object({ kind: z.literal("bothinstruments"), ...viewFields }),
  z.object({ kind: z.literal("oneshare"), ...viewFields }),
  z.object({ kind: z.literal("thegap"), ...viewFields }),
  z.object({ kind: z.literal("thedifference"), ...viewFields }),
  z.object({ kind: z.literal("bothcurves"), ...viewFields }),
  z.object({ kind: z.literal("whatisknown"), ...viewFields }),
  z.object({ kind: z.literal("themissingrow"), ...viewFields }),
  z.object({ kind: z.literal("whatitfound"), ...viewFields }),
  z.object({ kind: z.literal("whatitchanged"), ...viewFields }),
  z.object({ kind: z.literal("asrecorded"), ...viewFields }),
  z.object({ kind: z.literal("asestimated"), ...viewFields }),
  z.object({ kind: z.literal("aseveryone"), ...viewFields }),
  z.object({ kind: z.literal("afterlooking"), ...viewFields }),
  z.object({ kind: z.literal("asmeasured"), ...viewFields }),
  z.object({ kind: z.literal("asdelivered"), ...viewFields }),
  z.object({ kind: z.literal("astested"), ...viewFields }),
  z.object({ kind: z.literal("allfourways"), ...viewFields }),
  z.object({ kind: z.literal("onearm"), ...viewFields }),
  z.object({ kind: z.literal("botharms"), ...viewFields }),
  z.object({ kind: z.literal("markeronly"), ...viewFields }),
  z.object({ kind: z.literal("andoutcome"), ...viewFields }),
  z.object({ kind: z.literal("atbaseline"), ...viewFields }),
  z.object({ kind: z.literal("astrimmed"), ...viewFields }),
  z.object({ kind: z.literal("onerow"), ...viewFields }),
  z.object({ kind: z.literal("bothrows"), ...viewFields }),
  z.object({ kind: z.literal("onemarker"), ...viewFields }),
  z.object({ kind: z.literal("everymarker"), ...viewFields }),
  z.object({ kind: z.literal("astrained"), ...viewFields }),
  z.object({ kind: z.literal("asithappened"), ...viewFields }),
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

      // The view-filter guard that used to live here now covers every shape
      // that can be filtered; see `filterableIds` below.

      // Choice ids deliberately need NOT name a group. Some paradoxes have no
      // winning group: the Will Rogers phenomenon's honest answer is "nothing
      // changed". Nothing in the renderers resolves a choice id to a group
      // (the charts highlight via bestGroupId, computed from the data alone),
      // so requiring it would only rule out valid puzzles.
    }

    /**
     * A view that filters must name ids that exist. Getting this wrong renders
     * an empty beat and fails nothing, which is why the check belongs here
     * rather than in any one puzzle's tests.
     *
     * It used to sit inside the `rates` branch, so every shape added after it
     * inherited the hole: `drift` and `ratings` shipped without it, and the
     * four older filterable shapes never had it at all. Keyed by `type` with an
     * explicit `default`, so a new shape has to opt in deliberately rather than
     * silently arriving unguarded the way these six did.
     *
     * `strata: null` means the shape has no second axis, so any `strataIds` on
     * it filters nothing and is a mistake rather than an unknown id.
     */
    const filterableIds = ((): {
      groups: Set<string>;
      groupWord: string;
      strata: Set<string> | null;
      strataWord: string;
    } | null => {
      const d = p.setup.data;
      switch (d.type) {
        case "rates":
          return {
            groups: new Set(d.groups.map((g) => g.id)),
            groupWord: "group",
            strata: new Set(d.strata.map((s) => s.id)),
            strataWord: "stratum",
          };
        case "drift":
          return {
            groups: new Set(d.series.map((s) => s.id)),
            groupWord: "series",
            strata: new Set(d.checkpoints.map((c) => c.id)),
            strataWord: "checkpoint",
          };
        case "ratings":
          return {
            groups: new Set(d.series.map((s) => s.id)),
            groupWord: "series",
            strata: null,
            strataWord: "",
          };
        case "forest":
          return {
            groups: new Set(d.rows.map((r) => r.id)),
            groupWord: "row",
            strata: null,
            strataWord: "",
          };
        case "yield":
          // The setup names the outcomes already public and the reveal names
          // none, which draws them all. Arms are the pairing and are never
          // filtered: a row drawn with one arm missing is the one thing this
          // shape must not render.
          return {
            groups: new Set(d.rows.map((r) => r.id)),
            groupWord: "row",
            strata: null,
            strataWord: "",
          };
        case "series":
          // The setup names one instrument and the reveal names none, which
          // draws both. Points are the time axis and are never filtered.
          return {
            groups: new Set(d.lines.map((l) => l.id)),
            groupWord: "line",
            strata: null,
            strataWord: "",
          };
        case "bunching":
          return {
            groups: new Set(d.bins.map((b) => b.id)),
            groupWord: "bin",
            strata: null,
            strataWord: "",
          };
        case "distribution":
        case "estimation":
          return {
            groups: new Set(d.groups.map((g) => g.id)),
            groupWord: "group",
            strata: null,
            strataWord: "",
          };
        case "dose":
          return {
            groups: new Set(d.steps.map((s) => s.id)),
            groupWord: "step",
            strata: null,
            strataWord: "",
          };
        case "published":
          /**
           * ONLY the arms are filterable. The setup draws one arm and the
           * reveal adds the other, and every row is drawn at both beats
           * because the gradient down the rows IS the figure: a beat showing
           * one adherence level shows nothing at all.
           *
           * So `groups` is deliberately empty rather than listing the rows.
           * `restrictPublished` filters on `strataIds` alone, so a puzzle
           * setting `groupIds` would otherwise pass validation and change
           * nothing, which is precisely the silent no-op this switch exists
           * to catch. Empty means any groupIds is rejected below.
           */
          return {
            groups: new Set<string>(),
            groupWord: "row (this shape draws every row at both beats)",
            strata: new Set(d.arms.map((a) => a.id)),
            strataWord: "arm",
          };
        case "conditional":
          // The ROWS are filterable: the setup names one row and the reveal
          // omits groupIds, so the reveal is a superset by construction.
          return {
            groups: new Set(d.rows.map((r) => r.id)),
            groupWord: "row",
            strata: null,
            strataWord: "",
          };
        case "attenuation":
          /**
           * Nothing is filterable, for the same reason as `surrogate` below:
           * `atbaseline` draws the first window and the primary outcome, and
           * `astrimmed` draws every window and every outcome. That is the view
           * kind's job, so no id could name it and either filter would be a
           * silent no-op.
           */
          return {
            groups: new Set<string>(),
            groupWord: "id (this shape's beats differ by view kind, not by ids)",
            strata: new Set<string>(),
            strataWord: "id (this shape's beats differ by view kind, not by ids)",
          };
        case "surrogate":
          /**
           * NOTHING is filterable, and that is not an oversight.
           *
           * The two beats of this shape differ by which SECTIONS of the figure
           * are drawn, not by which ids are kept: `markeronly` draws the run-in
           * funnel and `andoutcome` draws the funnel plus the endpoint counts.
           * That lives in the view kind, so there is no id a `groupIds` or
           * `strataIds` could name, and either one on a `surrogate` view is a
           * silent no-op. Both sets are therefore empty, which makes the
           * validation below reject them by name.
           *
           * Learned from `published`, which shipped accepting a `groupIds` that
           * filtered nothing, because its restriction function read `strataIds`
           * alone. A beat that names an id and changes nothing is the worst
           * failure this file can allow, since the puzzle looks authored and
           * the reveal silently equals the setup.
           */
          return {
            groups: new Set<string>(),
            groupWord: "id (this shape's beats differ by view kind, not by ids)",
            strata: new Set<string>(),
            strataWord: "id (this shape's beats differ by view kind, not by ids)",
          };
        case "crossed":
          // The setup names the two cells of the confounded diagonal and the
          // reveal omits groupIds, so the reveal is a superset by construction.
          return {
            groups: new Set(d.cells.map((c) => c.id)),
            groupWord: "cell",
            strata: null,
            strataWord: "",
          };
        case "salience":
          return {
            groups: new Set(d.comparisons.map((c) => c.id)),
            groupWord: "comparison",
            strata: null,
            strataWord: "",
          };
        case "raters":
          // The setup names the judges it draws and the reveal omits groupIds,
          // so the reveal brings in the judges who disagreed with them.
          return {
            groups: new Set(d.raters.map((r) => r.id)),
            groupWord: "rater",
            strata: null,
            strataWord: "",
          };
        default:
          // Shapes with nothing to filter. A view on one of these carrying
          // groupIds is caught below, since there is no id it could name.
          return null;
      }
    })();

    for (const [where, view] of [
      ["initialView", p.setup.initialView],
      ["reveal.view", p.reveal.view],
    ] as const) {
      for (const id of view.groupIds ?? []) {
        if (!filterableIds) {
          ctx.addIssue({
            code: "custom",
            path: [where, "groupIds"],
            message: `${p.setup.data.type} cannot be filtered, so groupIds filters nothing`,
          });
        } else if (!filterableIds.groups.has(id)) {
          ctx.addIssue({
            code: "custom",
            path: [where, "groupIds"],
            message: `unknown ${filterableIds.groupWord} id "${id}"`,
          });
        }
      }
      for (const id of view.strataIds ?? []) {
        if (!filterableIds || filterableIds.strata === null) {
          ctx.addIssue({
            code: "custom",
            path: [where, "strataIds"],
            message: `${p.setup.data.type} has no strata, so strataIds filters nothing`,
          });
        } else if (!filterableIds.strata.has(id)) {
          ctx.addIssue({
            code: "custom",
            path: [where, "strataIds"],
            message: `unknown ${filterableIds.strataWord} id "${id}"`,
          });
        }
      }
    }

    /**
     * `conditional` carries the kind and the ids as two halves of one claim,
     * and nothing above checks they agree. `onerow` with no `groupIds` draws
     * every row, so the setup would equal the reveal; `bothrows` WITH ids draws
     * a subset, so the reveal would be smaller than its name promises. Both
     * are the silent no-op the loop above exists to catch, just expressed
     * through the kind rather than through an unknown id.
     */
    if (p.setup.data.type === "conditional") {
      for (const [where, view] of [
        ["initialView", p.setup.initialView],
        ["reveal.view", p.reveal.view],
      ] as const) {
        const ids = view.groupIds ?? [];
        if (view.kind === "onerow" && ids.length !== 1)
          ctx.addIssue({
            code: "custom",
            path: [where, "groupIds"],
            message: `onerow must name exactly one row, but names ${ids.length}`,
          });
        if (view.kind === "bothrows" && ids.length > 0)
          ctx.addIssue({
            code: "custom",
            path: [where, "groupIds"],
            message: "bothrows draws every row, so groupIds would contradict it",
          });
        if (view.kind !== "onerow" && view.kind !== "bothrows")
          ctx.addIssue({
            code: "custom",
            path: [where, "kind"],
            message: `conditional data cannot be drawn as "${view.kind}"; DataViewRenderer would render nothing`,
          });
      }
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
          message:
            "the control arm needs at least one event to compare against",
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
      if (
        shadesImmortal &&
        !d.tracks.some((tr) => tr.immortalUntil !== undefined)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["setup", "data", "tracks"],
          message:
            "an immortal view needs at least one track with immortalUntil",
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
