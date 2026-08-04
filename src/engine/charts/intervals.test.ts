import { describe, expect, it } from "vitest";
import { PuzzleData, type IntervalData } from "../../puzzles/schema";
import {
  gapClearsItsMargin,
  gapMargin,
  gapSize,
  independentSampleMargin,
  intervalShares,
  marginRatio,
} from "./intervals";

/** Made up, but internally consistent. The real poll is proved in its own test. */
const data: IntervalData = {
  type: "interval",
  label: { en: "A poll" },
  metricLabel: { en: "Share of all respondents" },
  statNote: { en: "Made up" },
  sampleSize: 1000,
  publishedMargin: 3.1,
  options: [
    { id: "a", label: { en: "A" }, percent: 45 },
    { id: "b", label: { en: "B" }, percent: 41 },
    { id: "c", label: { en: "C" }, percent: 14 },
  ],
  gapBetween: ["a", "b"],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);

describe("the shares as drawn", () => {
  it("gives every share the one margin the poll printed", () => {
    const bars = intervalShares(data);
    expect(bars.map((b) => b.margin)).toEqual([3.1, 3.1, 3.1]);
    expect(bars.map((b) => b.percent)).toEqual([45, 41, 14]);
  });
});

describe("the gap and its own margin, both derived", () => {
  it("measures the lead from the shares rather than taking it on trust", () => {
    expect(gapSize(data)).toBeCloseTo(4, 10);
  });

  it("is close to twice the printed margin, not root two times it", () => {
    // Var = [0.45 + 0.41 - 0.04^2] / 1000 = 8.584e-4, sd = 0.029299,
    // margin = 1.96 * 0.029299 = 0.057426, so 5.74 points.
    expect(gapMargin(data)).toBeCloseTo(5.7426, 3);
    expect(marginRatio(data)).toBeCloseTo(1.852, 3);
    // And the wrong answer this shape exists to catch is meaningfully apart
    // from the right one, so the puzzle is not splitting hairs.
    expect(independentSampleMargin(data)).toBeCloseTo(4.384, 3);
    expect(gapMargin(data) - independentSampleMargin(data)).toBeGreaterThan(1);
  });

  it("scales the gap margin by the design effect when the source applied one", () => {
    const weighted = { ...data, sampleSize: 1490, designEffect: 1.49, publishedMargin: 3.1 };
    // Same printed margin, bigger sample, because the deff eats the difference.
    // The margin on the gap has to move the same way or the two beats would be
    // drawn on inconsistent assumptions.
    expect(gapMargin(weighted)).toBeCloseTo(gapMargin(data) * Math.sqrt((1.49 / 1490) / (1 / 1000)), 6);
  });

  it("says whether the lead clears its own margin, and abstains at the edge", () => {
    expect(gapClearsItsMargin(data)).toBe(false);
    const wide = { ...data, options: [{ ...data.options[0], percent: 52 }, { ...data.options[1], percent: 34 }, data.options[2]] };
    expect(gapClearsItsMargin(wide)).toBe(true);
  });
});

describe("the schema refuses data that would make the lesson wrong", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a printed margin the sample size cannot produce", () => {
    // The nastiest authoring error in this shape: a margin lifted from one poll
    // and a sample size from another. Everything the reveal derives scales with
    // that assumption, so it has to fail loudly rather than draw quietly.
    expect(parse({ ...data, publishedMargin: 2.2 }).success).toBe(false);
    expect(parse({ ...data, sampleSize: 600 }).success).toBe(false);
  });

  it("accepts a margin that reproduces only once the design effect is applied", () => {
    expect(parse({ ...data, sampleSize: 1490, designEffect: 1.49 }).success).toBe(true);
    // And rejects the same sample size with the design effect left off.
    expect(parse({ ...data, sampleSize: 1490 }).success).toBe(false);
  });

  it("rejects a gap named between an option that does not exist", () => {
    expect(parse({ ...data, gapBetween: ["a", "nope"] }).success).toBe(false);
  });

  it("rejects a gap named with the trailing option first", () => {
    expect(parse({ ...data, gapBetween: ["b", "a"] }).success).toBe(false);
  });

  it("rejects shares of one sample that sum to more than everybody", () => {
    expect(
      parse({
        ...data,
        options: [...data.options, { id: "d", label: { en: "D" }, percent: 30 }],
      }).success,
    ).toBe(false);
  });
});
