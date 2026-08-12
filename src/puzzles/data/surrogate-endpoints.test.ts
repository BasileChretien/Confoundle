import { describe, expect, it } from "vitest";
import { surrogateEndpoints } from "./surrogate-endpoints";
import { SurrogateData } from "../schema";
import {
  endpointRates,
  qualifyingStage,
  rateOn,
  riskRatioOn,
  stageShares,
} from "../../engine/charts/surrogate";

/**
 * The numbers CAST printed, transcribed from the paper (N Engl J Med
 * 1989;321:406-412) rather than from any summary of it, so the assertions below
 * check the card against the source and not against themselves.
 */
const PAPER = {
  entered: 2309,
  suppressedPct: 75,
  failedPct: 19,
  partialPct: 6,
  arrhythmic: { drug: "4.5", placebo: "1.2", rr: 3.6 },
  anycause: { drug: "7.7", placebo: "3.0", rr: 2.5 },
} as const;

const data = surrogateEndpoints.setup.data;
if (data.type !== "surrogate") throw new Error("expected the surrogate shape");
const d: SurrogateData = data;

describe("the CAST funnel reconciles with the paper", () => {
  it("accounts for every patient who entered titration", () => {
    // 1,727 + 447 + 135 = 2,309, stated in the paper and enforced by the shape.
    const summed = d.stages.reduce((t, s) => t + s.count, 0);
    expect(summed).toBe(PAPER.entered);
    expect(d.entered).toBe(PAPER.entered);
  });

  it("reproduces the three printed percentages of the run-in", () => {
    const share = (id: string) => {
      const s = stageShares(d).find((x) => x.id === id);
      if (!s) throw new Error(`no stage ${id}`);
      return s.share * 100;
    };
    expect(Math.round(share("suppressed"))).toBe(PAPER.suppressedPct);
    expect(Math.round(share("failed"))).toBe(PAPER.failedPct);
    expect(Math.round(share("partial"))).toBe(PAPER.partialPct);
    // And to one decimal, which is what the entry in the backlog records.
    expect(share("suppressed")).toBeCloseTo(74.8, 1);
    expect(share("failed")).toBeCloseTo(19.4, 1);
    expect(share("partial")).toBeCloseTo(5.8, 1);
  });

  it("marks exactly the stage that qualified people for randomisation", () => {
    const q = qualifyingStage(d);
    expect(q.id).toBe("suppressed");
    expect(q.count).toBe(1727);
    expect(d.stages.filter((s) => s.qualified).length).toBe(1);
  });

  it("keeps the randomised arms inside the qualifying stage, and records the gap", () => {
    const randomised = d.arms.reduce((t, a) => t + a.n, 0);
    expect(randomised).toBe(1455);
    expect(randomised).toBeLessThan(qualifyingStage(d).count);
    // The 272 missing are the moricizine comparison, whose outcomes the paper
    // does not report because the investigators stayed blinded to it. The
    // provenance note says so, and this asserts the arithmetic behind it.
    expect(qualifyingStage(d).count - randomised).toBe(272);
  });
});

describe("the randomised outcome reconciles with the paper", () => {
  it("reproduces every printed event percentage", () => {
    expect((rateOn(d, "arrhythmic", "drug") * 100).toFixed(1)).toBe(PAPER.arrhythmic.drug);
    expect((rateOn(d, "arrhythmic", "placebo") * 100).toFixed(1)).toBe(
      PAPER.arrhythmic.placebo,
    );
    expect((rateOn(d, "anycause", "drug") * 100).toFixed(1)).toBe(PAPER.anycause.drug);
    expect((rateOn(d, "anycause", "placebo") * 100).toFixed(1)).toBe(PAPER.anycause.placebo);
  });

  it("reproduces both printed relative risks to one decimal", () => {
    const arrhythmic = riskRatioOn(d, "arrhythmic");
    const anycause = riskRatioOn(d, "anycause");
    expect(arrhythmic).not.toBeNull();
    expect(anycause).not.toBeNull();
    expect((arrhythmic as number).toFixed(1)).toBe(String(PAPER.arrhythmic.rr));
    expect((anycause as number).toFixed(1)).toBe(String(PAPER.anycause.rr));
  });

  it("carries the raw counts rather than the percentages", () => {
    // The point of authoring counts: nothing here can contradict a printed
    // percentage, because every percentage is derived.
    const events = Object.fromEntries(
      endpointRates(d).map((r) => [`${r.endpointId}|${r.armId}`, r.events]),
    );
    expect(events).toEqual({
      "arrhythmic|drug": 33,
      "arrhythmic|placebo": 9,
      "anycause|drug": 56,
      "anycause|placebo": 22,
    });
  });

  it("has every arrhythmic death also counted in deaths from any cause", () => {
    // Not stated as such in the paper, but it must hold for any coherent
    // reading of the two endpoints, and a card that violated it would be
    // printing an impossible table.
    for (const arm of d.arms) {
      expect(rateOn(d, "anycause", arm.id)).toBeGreaterThan(rateOn(d, "arrhythmic", arm.id));
    }
  });
});

describe("the puzzle is answerable and does not punish good reasoning", () => {
  it("makes 'you cannot tell' the correct answer", () => {
    const correct = surrogateEndpoints.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0]?.id).toBe("cannot-tell");
  });

  it("gives the three wrong answers three DIFFERENT directions", () => {
    // The hedge rule: no two bands may share the direction the setup licenses.
    // Here the setup licenses none, so each wrong band must claim a distinct
    // direction and the correct one must claim no direction at all.
    const wrong = surrogateEndpoints.choices.filter((c) => !c.isCorrect).map((c) => c.id);
    expect(new Set(wrong)).toEqual(new Set(["fewer-deaths", "same-deaths", "more-deaths"]));
  });

  it("marks the trap as the reasoning the trial itself was built on", () => {
    const trap = surrogateEndpoints.choices.filter((c) => c.isIntuitiveTrap);
    expect(trap).toHaveLength(1);
    expect(trap[0]?.id).toBe("fewer-deaths");
  });

  it("asks what the suppression licenses, not what happened", () => {
    // If the question asked what happened, a player answering "more deaths"
    // would be right and be marked wrong, which is the one thing the deck
    // must never do.
    const q = surrogateEndpoints.setup.question.en ?? "";
    expect(q).toMatch(/on its own/i);
    expect(q).not.toMatch(/what happened/i);
  });
});

describe("the beats are two views of one dataset", () => {
  it("draws the funnel at the setup and the funnel plus the outcome at the reveal", () => {
    expect(surrogateEndpoints.setup.initialView.kind).toBe("markeronly");
    expect(surrogateEndpoints.reveal.view.kind).toBe("andoutcome");
  });

  it("names no ids on either beat, because this shape filters nothing", () => {
    for (const view of [surrogateEndpoints.setup.initialView, surrogateEndpoints.reveal.view]) {
      expect(view.groupIds).toBeUndefined();
      expect(view.strataIds).toBeUndefined();
    }
  });
});

describe("the shape rejects data it cannot honestly draw", () => {
  const base = () => JSON.parse(JSON.stringify(d)) as Record<string, unknown>;

  it("rejects a funnel that does not account for everybody", () => {
    const broken = base();
    (broken.stages as { count: number }[])[1]!.count = 1;
    expect(SurrogateData.safeParse(broken).success).toBe(false);
  });

  it("rejects more than one qualifying stage", () => {
    const broken = base();
    (broken.stages as { qualified?: boolean }[])[1]!.qualified = true;
    expect(SurrogateData.safeParse(broken).success).toBe(false);
  });

  it("rejects arms holding more people than qualified", () => {
    const broken = base();
    (broken.arms as { n: number }[])[0]!.n = 1700;
    expect(SurrogateData.safeParse(broken).success).toBe(false);
  });

  it("rejects a treated arm that is better on every endpoint, which is a different card", () => {
    const broken = base();
    for (const o of broken.observations as { armId: string; events: number }[])
      if (o.armId === "drug") o.events = 1;
    expect(SurrogateData.safeParse(broken).success).toBe(false);
  });

  it("accepts the puzzle as authored", () => {
    expect(SurrogateData.safeParse(d).success).toBe(true);
  });
});
