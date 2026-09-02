import { describe, it, expect } from "vitest";
import type { EstimationData } from "../../puzzles/schema";
import {
  barFraction,
  formatValue,
  higherGroup,
  lowerGroup,
  ratioBetween,
  restrictEstimation,
  shareOfTruth,
  truthOverBest,
} from "./estimation";

const text = (en: string) => ({ en });

const data: EstimationData = {
  type: "estimation",
  label: text("What people guessed"),
  trueValue: 40320,
  trueLabel: text("The actual product"),
  statNote: text("published medians"),
  groups: [
    {
      id: "ascending",
      label: text("Ascending"),
      promptText: text("1 x 2 x 3 x 4 x 5 x 6 x 7 x 8"),
      estimate: 512,
    },
    {
      id: "descending",
      label: text("Descending"),
      promptText: text("8 x 7 x 6 x 5 x 4 x 3 x 2 x 1"),
      estimate: 2250,
    },
  ],
};

describe("estimation derivation", () => {
  it("derives how far apart the two guesses are", () => {
    expect(ratioBetween(data)).toBeCloseTo(2250 / 512, 10);
    // Was asserted through a `formatTimes` helper that nothing called and that
    // localised nothing; the claim was always about the number.
    expect(Number(ratioBetween(data).toFixed(1))).toBe(4.4);
  });

  it("derives how far short of the answer each one falls", () => {
    expect(shareOfTruth(data.groups[0], data)).toBeCloseTo(512 / 40320, 10);
    expect(shareOfTruth(data.groups[1], data)).toBeCloseTo(2250 / 40320, 10);
    // Both are a rounding error against the truth, which is the second reveal.
    expect(shareOfTruth(data.groups[0], data)).toBeLessThan(0.02);
    expect(shareOfTruth(data.groups[1], data)).toBeLessThan(0.06);
  });

  it("says how far out even the more generous guess was", () => {
    expect(truthOverBest(data)).toBeCloseTo(40320 / 2250, 10);
    expect(Number(truthOverBest(data).toFixed(1))).toBe(17.9);
  });

  it("names which group guessed higher without the caller assuming an order", () => {
    expect(higherGroup(data).id).toBe("descending");
    expect(lowerGroup(data).id).toBe("ascending");
  });

  it("collapses both guesses to slivers once the truth shares the axis", () => {
    // This is the whole reason the shape exists. Against each other the two
    // guesses are visibly different; against the answer they are both nothing.
    const aloneHi = barFraction(2250, data, false);
    const aloneLo = barFraction(512, data, false);
    expect(aloneHi).toBe(1);
    expect(aloneLo).toBeCloseTo(512 / 2250, 10);

    const truthHi = barFraction(2250, data, true);
    const truthLo = barFraction(512, data, true);
    expect(truthHi).toBeLessThan(0.06);
    expect(truthLo).toBeLessThan(0.02);
    expect(barFraction(40320, data, true)).toBe(1);
  });

  it("restricts to one guess without touching the authored data", () => {
    const one = restrictEstimation(data, { groupIds: ["ascending"] });
    expect(one.groups.map((g) => g.id)).toEqual(["ascending"]);
    expect(data.groups).toHaveLength(2);
    expect(restrictEstimation(data).groups).toHaveLength(2);
  });

  it("formats big numbers so they read as numbers", () => {
    expect(formatValue(40320, "en")).toBe("40,320");
    expect(formatValue(512, "en")).toBe("512");
  });

  it("groups them the way the reader's language groups them", () => {
    // This was `toLocaleString("en-US")`, which pinned English grouping in all
    // ten languages. French separates with a space, Hindi groups by two after
    // the first three, and Bengali does both that and its own digits.
    //
    // The French separator is U+202F NARROW NO-BREAK SPACE and is written as
    // an escape here rather than pasted, because it is indistinguishable from
    // an ordinary space in a diff and this assertion is about which character
    // it is. A plain space would also be wrong on screen: it would let 40 320
    // break across two lines.
    expect(formatValue(40320, "fr")).toBe("40\u202f320");
    expect(formatValue(12000000, "hi")).toBe("1,20,00,000");
    expect(formatValue(40320, "bn")).toBe("৪০,৩২০");
  });
});
