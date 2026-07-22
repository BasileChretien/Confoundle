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
 * aggregate + stratified rates from these observations — the paradox itself
 * lives in that derivation, so we compute it rather than hardcode "78%".
 * `type` is a discriminant so a future puzzle can ship a completely different
 * data shape (e.g. type: "correlation") without touching existing renderers.
 * ------------------------------------------------------------------------- */
export const Group = z.object({
  id: z.string().min(1), // stable key, e.g. "A"
  label: LocalizedText, // "Treatment A — open surgery"
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
  groups: z.array(Group).min(2),
  strata: z.array(Stratum).min(1), // a single stratum => a non-stratified puzzle
  observations: z.array(Observation).min(1),
});
export type RatesData = z.infer<typeof RatesData>;

/** Discriminated by `type`. Add new members here to support new data shapes. */
export const PuzzleData = z.discriminatedUnion("type", [RatesData]);
export type PuzzleData = z.infer<typeof PuzzleData>;

/* ---------------------------------------------------------------------------
 * Data views — how a beat renders the data. The engine dispatches on `kind`.
 * ------------------------------------------------------------------------- */
export const DataView = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("aggregate"), caption: LocalizedText.optional() }),
  z.object({ kind: z.literal("stratified"), caption: LocalizedText.optional() }),
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
    url: z.string().url().optional(),
    doi: z.string().optional(),
    note: LocalizedText.optional(),
  })
  .refine((p) => Boolean(p.url || p.doi), {
    message: "provenance requires a url or doi",
  });
export type Provenance = z.infer<typeof Provenance>;

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
      confounderName: LocalizedText,
      explanation: LocalizedText,
      view: DataView, // usually { kind: "stratified" }
      body: LocalizedText.optional(),
    }),

    lesson: z.object({
      skillName: LocalizedText,
      takeaway: LocalizedText,
      body: LocalizedText.optional(),
    }),

    share: z.object({
      title: LocalizedText,
      // Plain-language explanation of the skill for the share card — written for
      // anyone, not just scientists. Longer/looser than the lesson takeaway.
      explainer: LocalizedText,
      captions: z.object({
        competitive: LocalizedText,
        selfDeprecating: LocalizedText,
      }),
    }),

    provenance: Provenance,
    goDeeperUrl: z.string().url().optional(),
  })
  .superRefine((p, ctx) => {
    // exactly one correct choice, at least one trap
    const correct = p.choices.filter((c) => c.isCorrect);
    if (correct.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["choices"],
        message: `exactly one choice must have isCorrect: true (found ${correct.length})`,
      });
    }
    if (!p.choices.some((c) => c.isIntuitiveTrap)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
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
            code: z.ZodIssueCode.custom,
            path: ["setup", "data", "observations", i],
            message: `numerator ${o.numerator} exceeds denominator ${o.denominator}`,
          });
        }
        if (!groupIds.has(o.groupId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["setup", "data", "observations", i, "groupId"],
            message: `unknown group id "${o.groupId}"`,
          });
        }
        if (!stratumIds.has(o.stratumId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["setup", "data", "observations", i, "stratumId"],
            message: `unknown stratum id "${o.stratumId}"`,
          });
        }
        const key = `${o.groupId}::${o.stratumId}`;
        if (seen.has(key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
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
              code: z.ZodIssueCode.custom,
              path: ["setup", "data", "observations"],
              message: `missing observation for group "${g.id}" × stratum "${s.id}"`,
            });
          }
        }
      }

      // every choice id must reference a real group so the reveal can highlight it
      p.choices.forEach((c, i) => {
        if (!groupIds.has(c.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["choices", i, "id"],
            message: `choice id "${c.id}" does not match any group id`,
          });
        }
      });
    }
  });
export type Puzzle = z.infer<typeof Puzzle>;
