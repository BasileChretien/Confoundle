import { describe, expect, it } from "vitest";
import { healthyAdherer } from "./healthy-adherer";
import {
  adjustedGradientIn,
  armGapOn,
  gradientIn,
  gradientRemovedByAdjustment,
  publishedPairs,
  restrictPublished,
} from "../../engine/charts/published";

/**
 * Coronary Drug Project Research Group (1980), N Engl J Med 303:1038-1041,
 * PMID 6999345, read at source.
 *
 * The load-bearing half of this file is the reconciliation, because the card
 * authors published percentages rather than counts and therefore has no
 * numerator to check itself against. What it has instead is Table 1's internal
 * arithmetic, which closes in two directions, and the decoding analysis that
 * establishes WHY no count may be authored. Both are asserted here rather than
 * asserted in a comment.
 *
 * The rest is prohibitions on the prose. The design rests on the setup showing
 * one arm and the reveal supplying the other, so a mention of the placebo arm
 * leaking into the setup would empty the puzzle without breaking anything a
 * type checker or schema could see. Those guards self-test before they are
 * trusted.
 */
const raw = healthyAdherer.setup.data;
if (raw.type !== "published") throw new Error("expected published data");
const data = raw;

/** Table 1 as printed, transcribed once here to check the card against. */
const TABLE1 = {
  clofibrate: { poor: { n: 357, pct: 24.6, adj: 22.5 }, good: { n: 708, pct: 15.0, adj: 15.7 }, total: { n: 1065, pct: 18.2 } },
  placebo: { poor: { n: 882, pct: 28.2, adj: 25.8 }, good: { n: 1813, pct: 15.1, adj: 16.4 }, total: { n: 2695, pct: 19.4 } },
};

const revealBody = (): string => {
  const b = healthyAdherer.reveal.body?.en;
  if (!b) throw new Error("reveal body is missing, so the checks below prove nothing");
  return b;
};

const lessonBody = (): string => {
  const b = healthyAdherer.lesson.body?.en;
  if (!b) throw new Error("lesson body is missing, so the checks below prove nothing");
  return b;
};

describe("healthy adherer: the figures are Table 1", () => {
  it("draws every cell exactly as printed", () => {
    for (const [armId, arm] of Object.entries(TABLE1))
      for (const rowId of ["poor", "good"] as const) {
        const o = data.observations.find((x) => x.armId === armId && x.rowId === rowId);
        expect(o, `${armId} ${rowId}`).toBeDefined();
        expect(o!.rate).toBe(arm[rowId].pct);
        expect(o!.n).toBe(arm[rowId].n);
        expect(o!.adjusted).toBe(arm[rowId].adj);
      }
  });

  /**
   * Table 1's arithmetic, in both directions. This is the only self-check a
   * card of published rates can have, so it is the one that matters.
   */
  it("reproduces the printed arm totals from the subgroup rows", () => {
    for (const [armId, arm] of Object.entries(TABLE1)) {
      const poor = arm.poor;
      const good = arm.good;
      expect(poor.n + good.n, `${armId} denominators`).toBe(arm.total.n);
      const weighted = (poor.n * poor.pct + good.n * good.pct) / (poor.n + good.n);
      expect(weighted, `${armId} weighted rate`).toBeCloseTo(arm.total.pct, 1);
    }
  });

  /**
   * Why no count is authored. Three cells decode to a unique integer; the
   * fourth does not, and it is the one the card turns on.
   */
  it("shows that the placebo good-adherer count cannot be decoded", () => {
    const decode = (n: number, pct: number) => {
      const hits: number[] = [];
      for (let d = 0; d <= n; d++) if (+((d / n) * 100).toFixed(1) === pct) hits.push(d);
      return hits;
    };
    expect(decode(357, 24.6)).toEqual([88]);
    expect(decode(708, 15.0)).toEqual([106]);
    expect(decode(882, 28.2)).toEqual([249]);
    expect(decode(1813, 15.1)).toEqual([273, 274]);
    // And the arm total cannot break the tie either.
    expect(decode(2695, 19.4).length).toBeGreaterThan(1);
    // So nothing in the data file may carry a death count.
    for (const o of data.observations)
      expect(Object.keys(o).sort()).toEqual(["adjusted", "armId", "n", "rate", "rowId", "se"]);
  });

  it("puts the larger gradient in the arm that got nothing", () => {
    expect(gradientIn(data, "placebo")).toBeCloseTo(13.1, 10);
    expect(gradientIn(data, "clofibrate")).toBeCloseTo(9.6, 10);
    expect(gradientIn(data, "placebo")).toBeGreaterThan(gradientIn(data, "clofibrate"));
  });

  it("keeps the two arms close within each adherence row", () => {
    // The gap runs down the rows, not across the arms, which is the card.
    expect(Math.abs(armGapOn(data, "good"))).toBeLessThan(1);
    expect(Math.abs(armGapOn(data, "poor"))).toBeLessThan(
      Math.abs(gradientIn(data, "placebo")),
    );
  });

  it("shows the source's own adjustment leaving most of the gradient standing", () => {
    expect(adjustedGradientIn(data, "placebo")).toBeCloseTo(9.4, 10);
    const removed = gradientRemovedByAdjustment(data, "placebo");
    expect(removed).not.toBeNull();
    // Roughly 28 per cent of it. The card says "barely moved", so this must
    // stay well under a half or that wording stops being true.
    expect(removed!).toBeLessThan(0.4);
  });
});

describe("healthy adherer: the setup withholds the placebo arm", () => {
  it("draws one arm at the setup and both at the reveal", () => {
    expect(healthyAdherer.setup.initialView.kind).toBe("onearm");
    expect(healthyAdherer.setup.initialView.strataIds).toEqual(["clofibrate"]);
    expect(healthyAdherer.reveal.view.kind).toBe("botharms");
    expect(healthyAdherer.reveal.view.strataIds).toBeUndefined();
    expect(restrictPublished(data, { strataIds: ["clofibrate"] }).arms).toHaveLength(1);
    expect(publishedPairs(data)[0]!.values).toHaveLength(2);
  });

  /** The guard the design depends on, self-tested in both directions first. */
  it("never mentions the placebo arm in the setup", () => {
    const placebo = /placebo|dummy|sugar pill|inert/i;
    expect("the placebo arm did the same").toMatch(placebo);
    expect("a dummy capsule").toMatch(placebo);
    expect("men given clofibrate were followed for five years").not.toMatch(placebo);

    for (const s of [
      healthyAdherer.setup.headline.en,
      healthyAdherer.setup.framing.en,
      healthyAdherer.setup.question.en,
      healthyAdherer.setup.initialView.caption?.en ?? "",
      data.label.en,
      data.metricLabel.en,
      ...healthyAdherer.choices.flatMap((c) => [c.label.en, c.sublabel?.en ?? ""]),
    ])
      expect(s).not.toMatch(placebo);
  });

  it("supplies both placebo figures in the reveal", () => {
    const explanation = healthyAdherer.reveal.explanation.en;
    expect(explanation).toMatch(/15\.1/);
    expect(explanation).toMatch(/28\.2/);
    expect(explanation).toMatch(/nothing in the placebo capsules/i);
  });
});

describe("healthy adherer: the answer bands survive a hedge audit", () => {
  it("has exactly one correct choice and one intuitive trap", () => {
    expect(healthyAdherer.choices.filter((c) => c.isCorrect)).toHaveLength(1);
    expect(healthyAdherer.choices.filter((c) => c.isIntuitiveTrap)).toHaveLength(1);
    expect(healthyAdherer.choices.find((c) => c.isCorrect)?.id).toBe("not-randomised");
  });

  /**
   * Four distinct directions: the drug did it, illness did it and is
   * correctable, nothing did it, and something real did it that is not the
   * drug. No two share the direction the setup licenses.
   */
  it("keeps the four bands pointing in four different directions", () => {
    expect(healthyAdherer.choices.map((c) => c.id)).toEqual([
      "drug-works",
      "sicker-men",
      "too-small",
      "not-randomised",
    ]);
  });

  /**
   * The dangerous band. "They were sicker" is a genuinely good objection, and
   * the only thing that refutes it is the authors' own adjustment, so the
   * reveal has to carry that rather than dismiss it.
   */
  it("refutes the confounding band with the source's own adjustment", () => {
    const explanation = healthyAdherer.reveal.explanation.en;
    expect(explanation).toMatch(/40 baseline characteristics/);
    expect(explanation).toMatch(/25\.8/);
    expect(explanation).toMatch(/16\.4/);
    expect(explanation).toMatch(/small portion of the observed difference/);
  });

  /** And the "too small" band needs the trial's own scale against it. */
  it("gives the sizes that make the noise band refutable", () => {
    expect(data.observations.reduce((s, o) => s + o.n, 0)).toBeGreaterThan(3500);
    expect(healthyAdherer.reveal.headline.en).toMatch(/2,695/);
  });
});

describe("healthy adherer: the card states its limits", () => {
  it("says the drug itself did nothing, which is the other half of the point", () => {
    expect(healthyAdherer.reveal.explanation.en).toMatch(/20\.0 per cent dead against 20\.9/);
    expect(healthyAdherer.reveal.explanation.en).toMatch(/p = 0\.55/);
  });

  it("never claims adherence does not matter for a drug that works", () => {
    const body = revealBody();
    expect(body).toMatch(/does not show that adherence is irrelevant/i);
    expect(body).toMatch(/a drug you do not take cannot help you/i);
  });

  it("says who the men were and when, rather than implying it generalises", () => {
    const body = revealBody();
    expect(body).toMatch(/already survived a heart attack/i);
    expect(body).toMatch(/structure of the mistake/i);
  });

  it("separates itself from intention to treat rather than duplicating it", () => {
    const body = lessonBody();
    expect(body).toMatch(/intention-to-treat/);
    expect(body).toMatch(/remedy/i);
  });

  it("names the two cousins the audit row also covers", () => {
    const body = lessonBody();
    expect(body).toMatch(/healthy user effect/i);
    expect(body).toMatch(/healthy worker effect/i);
  });
});
