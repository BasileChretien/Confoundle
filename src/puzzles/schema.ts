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
  });
export type Puzzle = z.infer<typeof Puzzle>;
