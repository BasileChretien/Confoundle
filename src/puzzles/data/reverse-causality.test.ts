import { describe, expect, it } from "vitest";
import { reverseCausality } from "./reverse-causality";
import { AttenuationData } from "../schema";
import {
  controlOutcome,
  journeyTowardsOne,
  primaryOutcome,
  ratiosFor,
} from "../../engine/charts/attenuation";

/**
 * Transcribed from Kivimäki 2015 (Thorax 71:84-85) rather than from any summary
 * of it, so the assertions below check the card against the source and not
 * against themselves.
 *
 * The smoking split is included because it is the paper's own internal check on
 * the same table, and reproducing it is the cheapest available evidence that the
 * counts were read correctly rather than approximately.
 */
const PAPER = {
  cohort: 19019,
  analysed: 18823,
  respiratoryDeaths: 2139,
  coronaryDeaths: 4461,
  adjustedHazard: { start: 1.55, end: 1.14 },
  /** [non-smokers, smokers, printed total] for respiratory deaths. */
  smokingSplit: {
    underweight: [
      [44, 124, 168],
      [39, 85, 124],
      [19, 34, 53],
    ],
    normal: [
      [494, 652, 1146],
      [457, 552, 1009],
      [289, 256, 545],
    ],
  },
} as const;

const data = reverseCausality.setup.data;
if (data.type !== "attenuation") throw new Error("expected the attenuation shape");
const d: AttenuationData = data;

describe("the counts match the paper", () => {
  it("carries the printed deaths and denominators for both outcomes", () => {
    const grid = Object.fromEntries(
      d.observations.map((o) => [`${o.windowId}|${o.groupId}|${o.outcomeId}`, [o.events, o.n]]),
    );
    expect(grid).toEqual({
      "all|underweight|respiratory": [168, 934],
      "all|normal|respiratory": [1146, 9397],
      "drop15|underweight|respiratory": [124, 704],
      "drop15|normal|respiratory": [1009, 7774],
      "drop30|underweight|respiratory": [53, 361],
      "drop30|normal|respiratory": [545, 4436],
      "all|underweight|coronary": [158, 934],
      "all|normal|coronary": [2017, 9397],
      "drop15|underweight|coronary": [106, 704],
      "drop15|normal|coronary": [1442, 7774],
      "drop30|underweight|coronary": [36, 361],
      "drop30|normal|coronary": [563, 4436],
    });
  });

  it("reproduces the paper's own smoking split of the respiratory deaths", () => {
    // The paper's internal check, and the cheapest evidence the table was read
    // correctly. Denominators are deliberately NOT checked this way: their
    // smoking split is short by one or two men in three cells, the paper does
    // not explain it, and nothing this card draws uses it.
    for (const [group, rows] of Object.entries(PAPER.smokingSplit)) {
      rows.forEach(([nonSmokers, smokers, printedTotal], i) => {
        expect(nonSmokers + smokers, `${group} window ${i}`).toBe(printedTotal);
      });
    }
    const respiratory = ratiosFor(d, "respiratory");
    expect(respiratory.map((r) => r.exposedEvents)).toEqual(
      PAPER.smokingSplit.underweight.map((r) => r[2]),
    );
    expect(respiratory.map((r) => r.referenceEvents)).toEqual(
      PAPER.smokingSplit.normal.map((r) => r[2]),
    );
  });

  it("keeps the windows nested, so nobody reappears as more follow-up is discarded", () => {
    for (const outcomeId of ["respiratory", "coronary"]) {
      const r = ratiosFor(d, outcomeId);
      for (let i = 1; i < r.length; i++) {
        expect(r[i]!.exposedN).toBeLessThan(r[i - 1]!.exposedN);
        expect(r[i]!.referenceN).toBeLessThan(r[i - 1]!.referenceN);
      }
    }
  });
});

describe("the association melts and the control does not", () => {
  it("walks the respiratory risk ratio down towards 1", () => {
    const r = ratiosFor(d, "respiratory").map((x) => Number(x.riskRatio.toFixed(3)));
    expect(r).toEqual([1.475, 1.357, 1.195]);
  });

  it("leaves the coronary risk ratio where it started", () => {
    const r = ratiosFor(d, "coronary").map((x) => Number(x.riskRatio.toFixed(3)));
    expect(r).toEqual([0.788, 0.812, 0.786]);
  });

  it("moves the primary outcome most of the way to 1 and the control almost nowhere", () => {
    // The single number the reveal argues about, derived rather than asserted.
    expect(journeyTowardsOne(d, "respiratory")).toBeGreaterThan(0.55);
    expect(Math.abs(journeyTowardsOne(d, "coronary"))).toBeLessThan(0.05);
  });

  it("moves the same way as the paper's published hazard ratios", () => {
    // Crude risk ratios are NOT the paper's adjusted hazard ratios, and the card
    // says so. What is checked is that they agree about the direction and about
    // roughly how far, which is the only claim the card makes of them.
    const crude = ratiosFor(d, "respiratory");
    const crudeDrop = crude[0]!.riskRatio - crude[crude.length - 1]!.riskRatio;
    const publishedDrop = PAPER.adjustedHazard.start - PAPER.adjustedHazard.end;
    expect(crudeDrop).toBeGreaterThan(0);
    expect(publishedDrop).toBeGreaterThan(0);
    expect(crudeDrop).toBeLessThan(publishedDrop);
  });

  it("names respiratory as primary and coronary as the control", () => {
    expect(primaryOutcome(d).id).toBe("respiratory");
    expect(controlOutcome(d)?.id).toBe("coronary");
  });

  it("states the attrition correctly in the reveal", () => {
    // The reveal concedes how much of the cohort the last window throws away,
    // because that is the objection the control exists to answer. It first said
    // "three quarters", which the authored counts do not support: 361 + 4,436
    // of 934 + 9,397 remain, so it is closer to half. A user-facing number, so
    // it is pinned here rather than left to prose.
    const r = ratiosFor(d, "respiratory");
    const first = r[0]!;
    const last = r[r.length - 1]!;
    const started = first.exposedN + first.referenceN;
    const left = last.exposedN + last.referenceN;
    expect(started).toBe(10331);
    expect(left).toBe(4797);
    expect(left / started).toBeGreaterThan(0.4);
    expect(left / started).toBeLessThan(0.5);

    const explanation = reverseCausality.reveal.explanation.en ?? "";
    expect(explanation).toMatch(/more than half the cohort is gone/i);
    expect(explanation).toContain(left.toLocaleString("en"));
    expect(explanation).toContain(started.toLocaleString("en"));
    expect(explanation).not.toMatch(/three quarters of the cohort/i);
  });
});

describe("the puzzle is answerable and does not punish good reasoning", () => {
  it("makes the reverse-causation reading the correct one", () => {
    const correct = reverseCausality.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0]?.id).toBe("already-ill");
  });

  it("gives the four bands four different explanations", () => {
    const ids = reverseCausality.choices.map((c) => c.id);
    expect(new Set(ids)).toEqual(
      new Set(["thin-lungs", "smoking-explains", "already-ill", "too-few"]),
    );
  });

  it("supplies the discriminator in the framing rather than expecting a guess", () => {
    // The hedge decision, pinned so a reword cannot quietly turn the commit beat
    // into a coin flip. The setup licenses no direction by itself, so the
    // framing has to say that lung disease develops over decades and that
    // weight loss is a feature of it.
    const framing = reverseCausality.setup.framing.en ?? "";
    expect(framing).toMatch(/decades/i);
    expect(framing).toMatch(/losing weight is one of its well-known features/i);
  });

  it("refutes the smoking band in the framing instead of ignoring it", () => {
    // Adjustment alone would NOT make that band wrong, since it only handles
    // recorded smoking status. What makes it answerable is the paper's
    // within-stratum result, so the framing must carry it.
    const framing = reverseCausality.setup.framing.en ?? "";
    expect(framing).toMatch(/separately among the smokers and among the non-smokers/i);
    const band = reverseCausality.choices.find((c) => c.id === "smoking-explains");
    expect(band?.label.en).toMatch(/would make the gap go away/i);
  });

  it("marks the trap as the reading with a clinical consequence", () => {
    const trap = reverseCausality.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap).toHaveLength(1);
    expect(trap[0]?.id).toBe("thin-lungs");
  });
});

describe("the beats are two views of one dataset", () => {
  it("draws the first window at setup and every window at the reveal", () => {
    expect(reverseCausality.setup.initialView.kind).toBe("atbaseline");
    expect(reverseCausality.reveal.view.kind).toBe("astrimmed");
  });

  it("names no ids on either beat, because this shape filters nothing", () => {
    for (const view of [reverseCausality.setup.initialView, reverseCausality.reveal.view]) {
      expect(view.groupIds).toBeUndefined();
      expect(view.strataIds).toBeUndefined();
    }
  });

  it("keeps the setup row unchanged inside the reveal", () => {
    // The superset property, checked rather than assumed.
    const first = ratiosFor(d, "respiratory")[0];
    expect(first?.exposedEvents).toBe(168);
    expect(first?.referenceEvents).toBe(1146);
  });
});

describe("the shape rejects data it cannot honestly draw", () => {
  const base = () => JSON.parse(JSON.stringify(d)) as Record<string, unknown>;

  it("rejects an association that does not attenuate", () => {
    const broken = base();
    for (const o of broken.observations as { windowId: string; outcomeId: string; events: number }[])
      if (o.outcomeId === "respiratory" && o.windowId === "drop30") o.events = 80;
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("rejects a control that moves as much as the primary outcome", () => {
    const broken = base();
    for (const o of broken.observations as { windowId: string; outcomeId: string; groupId: string; events: number }[])
      if (o.outcomeId === "coronary" && o.windowId === "drop30" && o.groupId === "underweight")
        o.events = 60;
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("rejects windows that do not widen in order", () => {
    const broken = base();
    (broken.windows as { excludedYears: number }[])[2]!.excludedYears = 5;
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("rejects a group that grows as the window widens", () => {
    const broken = base();
    for (const o of broken.observations as { windowId: string; groupId: string; n: number }[])
      if (o.windowId === "drop30" && o.groupId === "underweight") o.n = 2000;
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("rejects a hole in the grid", () => {
    const broken = base();
    broken.observations = (broken.observations as unknown[]).slice(1);
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("rejects more events than people", () => {
    const broken = base();
    (broken.observations as { events: number; n: number }[])[0]!.events = 99999;
    expect(AttenuationData.safeParse(broken).success).toBe(false);
  });

  it("accepts the puzzle as authored", () => {
    expect(AttenuationData.safeParse(d).success).toBe(true);
  });
});
