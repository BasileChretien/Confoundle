import { describe, expect, it } from "vitest";
import { PuzzleData, type CeilingData } from "../../puzzles/schema";
import {
  armMean,
  ceilingCurves,
  differenceAt,
  differenceCurve,
  largestDifference,
  overallDifference,
  peakOffsetInHalfWidths,
  peakReachesNeutral,
  roomToBound,
  roomiestBin,
} from "./ceiling";

/**
 * Made up, but internally consistent and squeezed the way the shape requires:
 * both arms pinned near the floor at the left, near the ceiling at the right,
 * free to separate only in between. The real study is proved in its own test.
 */
const data: CeilingData = {
  type: "ceiling",
  label: { en: "A measure with two ends" },
  metricLabel: { en: "Share answering yes" },
  differenceLabel: { en: "How much the second arm gained" },
  statNote: { en: "Made up" },
  bounds: {
    min: 0,
    max: 1,
    minLabel: { en: "0" },
    maxLabel: { en: "1" },
  },
  axis: { min: 0, max: 1, label: { en: "Where the item started" } },
  neutralPoint: 0.5,
  neutralLabel: { en: "Where a constant effect would peak" },
  peak: { at: 0.52, low: 0.47, high: 0.57, label: { en: "Measured peak" } },
  arms: [
    { id: "before", label: { en: "Before" } },
    { id: "after", label: { en: "After" } },
  ],
  bins: [
    { id: "b1", label: { en: "Lowest" }, at: 0.1 },
    { id: "b2", label: { en: "Low" }, at: 0.3 },
    { id: "b3", label: { en: "Middle" }, at: 0.5 },
    { id: "b4", label: { en: "High" }, at: 0.7 },
    { id: "b5", label: { en: "Highest" }, at: 0.9 },
  ],
  observations: [
    { binId: "b1", armId: "before", value: 0.1 },
    { binId: "b1", armId: "after", value: 0.12 },
    { binId: "b2", armId: "before", value: 0.3 },
    { binId: "b2", armId: "after", value: 0.36 },
    { binId: "b3", armId: "before", value: 0.5 },
    { binId: "b3", armId: "after", value: 0.6 },
    { binId: "b4", armId: "before", value: 0.72 },
    { binId: "b4", armId: "after", value: 0.78 },
    { binId: "b5", armId: "before", value: 0.9 },
    { binId: "b5", armId: "after", value: 0.92 },
  ],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);
const without = (binId: string, armId: string): CeilingData => ({
  ...data,
  observations: data.observations.filter(
    (o) => !(o.binId === binId && o.armId === armId),
  ),
});
const withValue = (binId: string, armId: string, value: number): CeilingData => ({
  ...data,
  observations: data.observations.map((o) =>
    o.binId === binId && o.armId === armId ? { ...o, value } : o,
  ),
});

describe("both arms, placed against the bounds", () => {
  it("scales height by the span between the floor and the ceiling", () => {
    const [before, after] = ceilingCurves(data);
    expect(before.points.map((p) => p.y)).toEqual([0.1, 0.3, 0.5, 0.72, 0.9]);
    expect(after.points.map((p) => p.value)).toEqual([0.12, 0.36, 0.6, 0.78, 0.92]);
  });

  it("places bins by where they sit on the axis, not by their order", () => {
    const [before] = ceilingCurves(data);
    expect(before.points.map((p) => p.x)).toEqual([0.1, 0.3, 0.5, 0.7, 0.9]);
    // Bunch the bins to one side and the drawing has to follow.
    const skewed: CeilingData = {
      ...data,
      bins: data.bins.map((b, i) => ({ ...b, at: [0.1, 0.15, 0.5, 0.85, 0.9][i] })),
    };
    expect(ceilingCurves(skewed)[0].points.map((p) => p.x)).toEqual([
      0.1, 0.15, 0.5, 0.85, 0.9,
    ]);
  });

  it("uses the real bounds rather than assuming zero to one", () => {
    const scored: CeilingData = {
      ...data,
      bounds: { ...data.bounds, min: 1, max: 5 },
      observations: data.observations.map((o) => ({ ...o, value: 1 + o.value * 4 })),
    };
    expect(
      ceilingCurves(scored)[0].points.map((p) => Number(p.y.toFixed(3))),
    ).toEqual([0.1, 0.3, 0.5, 0.72, 0.9]);
  });
});

describe("the difference, which is derived and never authored", () => {
  it("subtracts the first arm from the second, bin by bin", () => {
    const diffs = differenceCurve(data).map((d) => Number(d.difference.toFixed(2)));
    expect(diffs).toEqual([0.02, 0.06, 0.1, 0.06, 0.02]);
  });

  it("scales the curve against its own peak, or the setup draws a flat line", () => {
    // Ten hundredths on a zero-to-one axis is invisible, and the setup beat is
    // nothing but this curve.
    const ys = differenceCurve(data).map((d) => Number(d.y.toFixed(2)));
    expect(ys).toEqual([0.2, 0.6, 1, 0.6, 0.2]);
  });

  it("finds the largest difference by looking, not by being told", () => {
    expect(largestDifference(data)?.binId).toBe("b3");
    expect(differenceAt(data, "b1")).toBeCloseTo(0.02, 10);
    expect(differenceAt(data, "nope")).toBeNull();
  });

  it("averages each arm over the bins and takes the overall gap from that", () => {
    expect(armMean(data, "before")).toBeCloseTo(0.504, 10);
    expect(armMean(data, "after")).toBeCloseTo(0.556, 10);
    expect(overallDifference(data)).toBeCloseTo(0.052, 10);
  });
});

describe("the room each bin has before it meets a bound", () => {
  it("measures to the nearer bound, whichever that is", () => {
    // The lowest bin is 0.1 from the floor; the highest is 0.08 from the
    // ceiling, which is the smaller distance even though the value is larger.
    expect(roomToBound(data, "b1")).toBeCloseTo(0.1, 10);
    expect(roomToBound(data, "b5")).toBeCloseTo(0.08, 10);
    expect(roomToBound(data, "b3")).toBeCloseTo(0.4, 10);
  });

  it("finds the bin with the most room, which is where the gap opens", () => {
    expect(roomiestBin(data)?.binId).toBe("b3");
    expect(largestDifference(data)?.binId).toBe(roomiestBin(data)?.binId);
  });
});

describe("the verdict on the peak", () => {
  it("says whether the interval reaches the point a constant effect would peak at", () => {
    expect(peakReachesNeutral(data)).toBe(true);
    expect(peakOffsetInHalfWidths(data)).toBeCloseTo(0.4, 10);
  });

  it("says no when the interval clears the neutral point", () => {
    const shifted: CeilingData = {
      ...data,
      peak: { ...data.peak, at: 0.7, low: 0.62, high: 0.78 },
    };
    expect(peakReachesNeutral(shifted)).toBe(false);
    expect(peakOffsetInHalfWidths(shifted)).toBeCloseTo(2.5, 10);
  });
});

describe("the schema refuses data that would make the lesson wrong", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a value outside the bounds it claims to be squeezed by", () => {
    expect(parse(withValue("b5", "after", 1.04)).success).toBe(false);
    expect(parse(withValue("b1", "before", -0.01)).success).toBe(false);
  });

  it("rejects a missing cell, which would leave a bin with no difference", () => {
    expect(parse(without("b3", "after")).success).toBe(false);
  });

  it("rejects bins that do not run up the axis in order", () => {
    expect(
      parse({
        ...data,
        bins: [data.bins[1], data.bins[0], ...data.bins.slice(2)],
      }).success,
    ).toBe(false);
  });

  it("rejects the arms named the wrong way round", () => {
    // The second arm is the one the effect acts on, so it may not dip below the
    // first. This is exactly where `series` goes the other way and REQUIRES the
    // two lines to swap places, which is why that shape could not carry this.
    expect(parse(withValue("b2", "after", 0.24)).success).toBe(false);
  });

  it("rejects a difference that fails to fall away at either end", () => {
    // Largest at the right-hand end: the axis has run out before the squeeze
    // has, so the bounds are not the explanation for anything.
    expect(parse(withValue("b5", "before", 0.8)).success).toBe(false);
    // And a tie at the left-hand end fails for the same reason, which is why
    // the check compares against both ends rather than looking up an index.
    expect(parse(withValue("b1", "after", 0.2)).success).toBe(false);
  });

  it("rejects a peak its own interval does not contain", () => {
    expect(
      parse({ ...data, peak: { ...data.peak, at: 0.8 } }).success,
    ).toBe(false);
  });

  it("rejects a neutral point that is not on the axis", () => {
    expect(parse({ ...data, neutralPoint: 1.2 }).success).toBe(false);
  });
});
