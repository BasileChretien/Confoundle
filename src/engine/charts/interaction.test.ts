import { describe, it, expect } from "vitest";
import type { InteractionData } from "../../puzzles/schema";
import { interactionSummary, stratumOdds, formatOR } from "./interaction";

const text = (en: string) => ({ en });

/**
 * Choi et al. 2021, men's panel: ALDH2 variant (exposed) against esophageal
 * cancer, within current drinkers and nondrinkers. Every count is read from the
 * paper's Table 3 and every expectation below reconciles by hand.
 */
const data: InteractionData = {
  type: "interaction",
  label: text("ALDH2 variant and esophageal cancer, by drinking"),
  exposureLabel: text("Odds of cancer with the variant"),
  modifierLabel: text("Alcohol drinking"),
  crudeLabel: text("Ignoring drinking"),
  adjustedLabel: text("Adjusted for drinking"),
  noEffectLabel: text("no effect"),
  strata: [
    {
      id: "drinkers",
      label: text("Current drinkers"),
      exposedCases: 219,
      exposedControls: 421,
      unexposedCases: 211,
      unexposedControls: 1782,
    },
    {
      id: "nondrinkers",
      label: text("Nondrinkers"),
      exposedCases: 198,
      exposedControls: 718,
      unexposedCases: 123,
      unexposedControls: 556,
    },
  ],
};

describe("effect-modification derivation", () => {
  it("reproduces each stratum's printed odds ratio", () => {
    const s = interactionSummary(data);
    // Drinkers 4.39, nondrinkers 1.25, as printed in Table 3.
    expect(s.strata[0].or).toBeCloseTo(4.39, 2);
    expect(s.strata[1].or).toBeCloseTo(1.25, 2);
    expect(stratumOdds(data.strata[0])).toBeCloseTo(4.39, 2);
  });

  it("computes a crude odds ratio that sits uselessly between them", () => {
    const s = interactionSummary(data);
    // Pooled cells: (417 x 2338) / (334 x 1139).
    expect(s.crudeOR).toBeCloseTo(2.56, 2);
    expect(s.crudeOR).toBeGreaterThan(s.strata[1].or);
    expect(s.crudeOR).toBeLessThan(s.strata[0].or);
  });

  it("computes a Mantel-Haenszel adjusted OR that also hides the split", () => {
    const s = interactionSummary(data);
    expect(s.adjustedOR).toBeCloseTo(2.44, 2);
    // Adjusting for the modifier does NOT recover either real stratum effect.
    expect(s.adjustedOR).toBeGreaterThan(s.strata[1].or);
    expect(s.adjustedOR).toBeLessThan(s.strata[0].or);
  });

  it("measures how far the effect swings across strata", () => {
    const s = interactionSummary(data);
    // 4.39 / 1.25 is more than a threefold swing: that is the modification.
    expect(s.spread).toBeCloseTo(4.39 / 1.25, 1);
    expect(s.spread).toBeGreaterThan(3);
    expect(s.minOR).toBeCloseTo(1.25, 2);
    expect(s.maxOR).toBeCloseTo(4.39, 2);
  });

  it("formats odds ratios for display", () => {
    expect(formatOR(4.393)).toBe("4.39");
    expect(formatOR(1.247)).toBe("1.25");
    expect(formatOR(2.563)).toBe("2.56");
  });
});
