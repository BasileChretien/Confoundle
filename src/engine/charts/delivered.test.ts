import { describe, expect, it } from "vitest";
import { PuzzleData, type DeliveredData } from "../../puzzles/schema";
import {
  axisFraction,
  deliveredPairs,
  differenceOn,
  exposureGapOn,
  matchedOn,
  matchedTiers,
  pairAt,
  showsExposure,
  unmatchedTiers,
} from "./delivered";

/**
 * A fixture with the two kinds of tier the shape insists on: one whose arms
 * were given different things, and one whose arms were given the same thing.
 */
const data: DeliveredData = {
  type: "delivered",
  label: { en: "Pain by cream" },
  metricLabel: { en: "pain, rated 0 to 100" },
  scale: {
    min: 0,
    max: 100,
    minLabel: { en: "0, no pain" },
    maxLabel: { en: "100, worst imaginable" },
  },
  exposureLabel: { en: "Heat actually applied" },
  exposureUnit: { en: "°C" },
  arms: [
    { id: "control", label: { en: "Control cream" } },
    { id: "active", label: { en: "Thermedol" } },
  ],
  tiers: [
    { id: "doctors", label: { en: "Doctors, on their own arm" } },
    { id: "patients", label: { en: "Patients" }, note: { en: "same heat both times" } },
  ],
  observations: [
    { tierId: "doctors", armId: "control", mean: 39.8, n: 30, exposure: 48 },
    { tierId: "doctors", armId: "active", mean: 7.6, n: 30, exposure: 43 },
    { tierId: "patients", armId: "control", mean: 32.77, n: 30, exposure: 48 },
    { tierId: "patients", armId: "active", mean: 28.89, n: 30, exposure: 48 },
  ],
};

const clone = (): DeliveredData => JSON.parse(JSON.stringify(data)) as DeliveredData;

describe("delivered derivation", () => {
  it("draws every tier in declaration order, with both arms", () => {
    const pairs = deliveredPairs(data);
    expect(pairs.map((p) => p.tierId)).toEqual(["doctors", "patients"]);
    for (const p of pairs) expect(p.values.map((v) => v.armId)).toEqual(["control", "active"]);
  });

  it("takes the difference as first arm minus second", () => {
    expect(differenceOn(data, "doctors")).toBeCloseTo(32.2, 10);
    expect(differenceOn(data, "patients")).toBeCloseTo(3.88, 10);
  });

  it("takes the exposure gap the same way round", () => {
    expect(exposureGapOn(data, "doctors")).toBe(5);
    expect(exposureGapOn(data, "patients")).toBe(0);
  });

  it("calls a tier matched only when its two exposures are identical", () => {
    expect(matchedOn(data, "doctors")).toBe(false);
    expect(matchedOn(data, "patients")).toBe(true);
    expect(matchedTiers(data)).toEqual(["patients"]);
    expect(unmatchedTiers(data)).toEqual(["doctors"]);
  });

  it("carries the tier note through, since the figure prints it", () => {
    expect(pairAt(data, "patients").note?.en).toBe("same heat both times");
    expect(pairAt(data, "doctors").note).toBeUndefined();
  });

  it("throws rather than guessing when asked for a tier that is not there", () => {
    expect(() => pairAt(data, "nurses")).toThrow(/no delivered tier/);
  });

  it("places a value on the axis as a fraction of the scale", () => {
    expect(axisFraction(data, 0)).toBeCloseTo(0, 10);
    expect(axisFraction(data, 100)).toBeCloseTo(1, 10);
    expect(axisFraction(data, 39.8)).toBeCloseTo(0.398, 10);
  });

  it("handles a scale that does not start at zero", () => {
    const d = clone();
    d.scale = { ...d.scale, min: 20, max: 60 };
    expect(axisFraction(d, 20)).toBeCloseTo(0, 10);
    expect(axisFraction(d, 40)).toBeCloseTo(0.5, 10);
    expect(axisFraction(d, 60)).toBeCloseTo(1, 10);
  });

  it("prints the exposure column on the reveal view and nowhere else", () => {
    expect(showsExposure("asdelivered")).toBe(true);
    expect(showsExposure("asmeasured")).toBe(false);
    // The point of routing this through one function: a view kind nobody has
    // thought about must not default to showing the answer.
    expect(showsExposure("aggregate")).toBe(false);
    expect(showsExposure("")).toBe(false);
  });

  /**
   * The gap this shape exists to make visible. The doctors' 32-point drop was
   * bought with five degrees; the patients' was bought with nothing. Asserting
   * it here keeps the two facts from drifting apart in a data file.
   */
  it("separates a gap the exposure explains from one it does not", () => {
    const bought = pairAt(data, "doctors");
    const unbought = pairAt(data, "patients");
    expect(bought.exposureGap).not.toBe(0);
    expect(unbought.exposureGap).toBe(0);
    expect(Math.abs(bought.difference)).toBeGreaterThan(Math.abs(unbought.difference));
  });
});

describe("delivered schema", () => {
  const parse = (d: DeliveredData) => PuzzleData.safeParse(d);

  it("accepts the fixture", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a mean off the end of its own scale", () => {
    const d = clone();
    d.observations[0]!.mean = 140;
    const r = parse(d);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toMatch(/outside the 0 to 100 scale/);
  });

  it("rejects a tier missing one of its arms", () => {
    const d = clone();
    d.observations = d.observations.filter(
      (o) => !(o.tierId === "patients" && o.armId === "active"),
    );
    const r = parse(d);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toMatch(/tier patients has no observation/);
  });

  it("rejects two observations for the same cell", () => {
    const d = clone();
    d.observations.push({ tierId: "patients", armId: "active", mean: 10, n: 30, exposure: 48 });
    const r = parse(d);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toMatch(/two observations for patients in active/);
  });

  it("rejects an observation naming a tier or arm that does not exist", () => {
    const d = clone();
    d.observations[0]!.tierId = "nurses";
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/no tier with id nurses/);
    const e = clone();
    e.observations[0]!.armId = "placebo";
    expect(JSON.stringify(parse(e).error?.issues)).toMatch(/no arm with id placebo/);
  });

  it("rejects a figure where every tier was given something different", () => {
    const d = clone();
    d.observations[3]!.exposure = 45; // patients no longer matched
    const r = parse(d);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toMatch(/no tier was given the same thing/);
  });

  it("rejects a figure where every tier was given the same thing", () => {
    const d = clone();
    d.observations[1]!.exposure = 48; // doctors now matched too
    const r = parse(d);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toMatch(/every tier was given the same thing/);
  });

  it("rejects an inverted scale", () => {
    const d = clone();
    d.scale = { ...d.scale, min: 100, max: 0 };
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/scale max must be above scale min/);
  });

  it("rejects duplicate tier and arm ids", () => {
    const d = clone();
    d.tiers.push({ id: "doctors", label: { en: "again" } });
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/duplicate tier id/);
    const e = clone();
    e.arms = [e.arms[0]!, { ...e.arms[0]! }];
    expect(JSON.stringify(parse(e).error?.issues)).toMatch(/duplicate arm id/);
  });
});
