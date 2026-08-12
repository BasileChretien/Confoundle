import { describe, expect, it } from "vitest";
import { PuzzleData, type PublishedData } from "../../puzzles/schema";
import {
  adjustedGradientIn,
  armGapOn,
  axisFraction,
  gradientIn,
  gradientRemovedByAdjustment,
  publishedPairs,
  restrictPublished,
} from "./published";

/** Table 1 of the Coronary Drug Project, which is the figure this shape exists for. */
const data: PublishedData = {
  type: "published",
  label: { en: "Five-year mortality by how reliably the capsules were taken" },
  metricLabel: { en: "Each row is an adherence level, measured in both arms." },
  perLabel: { en: "Per cent dead within five years" },
  rateNote: { en: "Rates as published; the table prints no death counts." },
  adjustedLabel: { en: "Adjusted for 40 baseline characteristics" },
  dispersionLabel: { en: "Whisker is one standard error, as printed." },
  axisMax: 35,
  arms: [
    { id: "clofibrate", label: { en: "Given clofibrate" } },
    { id: "placebo", label: { en: "Given placebo" } },
  ],
  rows: [
    { id: "poor", label: { en: "Took under 80 per cent" } },
    { id: "good", label: { en: "Took 80 per cent or more" } },
  ],
  observations: [
    { rowId: "poor", armId: "clofibrate", rate: 24.6, se: 2.3, n: 357, adjusted: 22.5 },
    { rowId: "poor", armId: "placebo", rate: 28.2, se: 1.5, n: 882, adjusted: 25.8 },
    { rowId: "good", armId: "clofibrate", rate: 15.0, se: 1.3, n: 708, adjusted: 15.7 },
    { rowId: "good", armId: "placebo", rate: 15.1, se: 0.8, n: 1813, adjusted: 16.4 },
  ],
};

const clone = (): PublishedData => JSON.parse(JSON.stringify(data)) as PublishedData;

describe("published derivation", () => {
  it("draws every row in declaration order, with every arm", () => {
    const pairs = publishedPairs(data);
    expect(pairs.map((p) => p.rowId)).toEqual(["poor", "good"]);
    for (const p of pairs)
      expect(p.values.map((v) => v.armId)).toEqual(["clofibrate", "placebo"]);
  });

  it("takes the gradient as the first row minus the second, within an arm", () => {
    expect(gradientIn(data, "clofibrate")).toBeCloseTo(9.6, 10);
    expect(gradientIn(data, "placebo")).toBeCloseTo(13.1, 10);
  });

  /**
   * The whole card in one assertion: the arm with nothing in the capsule has
   * the LARGER gradient, so whatever produces it is not the drug.
   */
  it("finds the placebo gradient at least as large as the treated one", () => {
    expect(gradientIn(data, "placebo")).toBeGreaterThan(gradientIn(data, "clofibrate"));
  });

  it("takes the adjusted gradient the same way round", () => {
    expect(adjustedGradientIn(data, "placebo")).toBeCloseTo(9.4, 10);
    expect(adjustedGradientIn(data, "clofibrate")).toBeCloseTo(6.8, 10);
  });

  it("reports how little of the gradient the source's adjustment removed", () => {
    // 13.1 unadjusted to 9.4 adjusted: 28 per cent of it, so most survives.
    const removed = gradientRemovedByAdjustment(data, "placebo");
    expect(removed).not.toBeNull();
    expect(removed!).toBeGreaterThan(0.25);
    expect(removed!).toBeLessThan(0.3);
  });

  it("returns null rather than guessing when no adjusted figures were published", () => {
    const d = clone();
    for (const o of d.observations) delete o.adjusted;
    delete d.adjustedLabel;
    expect(adjustedGradientIn(d, "placebo")).toBeNull();
    expect(gradientRemovedByAdjustment(d, "placebo")).toBeNull();
  });

  it("takes the gap between arms within a row", () => {
    expect(armGapOn(data, "poor")).toBeCloseTo(-3.6, 10);
    expect(armGapOn(data, "good")).toBeCloseTo(-0.1, 10);
  });

  it("throws rather than guessing when asked for a cell that is not there", () => {
    expect(() => armGapOn(data, "middling")).toThrow(/no observation for row middling/);
  });

  it("places a value on the axis as a fraction of the maximum", () => {
    expect(axisFraction(data, 0)).toBeCloseTo(0, 10);
    expect(axisFraction(data, 35)).toBeCloseTo(1, 10);
    expect(axisFraction(data, 17.5)).toBeCloseTo(0.5, 10);
  });

  it("draws only the named arm, and every arm when none is named", () => {
    const setup = restrictPublished(data, { strataIds: ["clofibrate"] });
    expect(setup.arms.map((a) => a.id)).toEqual(["clofibrate"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictPublished(data, {}).arms).toHaveLength(2);
    expect(restrictPublished(data, { strataIds: [] }).arms).toHaveLength(2);
  });

  it("shares the axis across the restriction, so nothing already drawn moves", () => {
    const setup = restrictPublished(data, { strataIds: ["clofibrate"] });
    expect(setup.axisMax).toBe(data.axisMax);
    expect(axisFraction(setup, 24.6)).toBe(axisFraction(data, 24.6));
  });

  /**
   * The deliberate absence. This shape must never hand back a count, because
   * for its own source one of the four numerators is genuinely ambiguous.
   */
  it("exposes no way to turn a published rate back into a count", () => {
    const pair = publishedPairs(data)[0]!;
    expect(Object.keys(pair.values[0]!).sort()).toEqual(["adjusted", "armId", "n", "rate", "se"]);
    // 273 and 274 both print as 15.1 per cent of 1813, which is why.
    expect(+((273 / 1813) * 100).toFixed(1)).toBe(15.1);
    expect(+((274 / 1813) * 100).toFixed(1)).toBe(15.1);
  });
});

describe("published schema", () => {
  const parse = (d: PublishedData) => PuzzleData.safeParse(d);

  it("accepts the fixture", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a whisker that would be drawn off the end of the axis", () => {
    const d = clone();
    d.axisMax = 29;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/past the axis maximum of 29/);
  });

  it("rejects a row missing one of its arms", () => {
    const d = clone();
    d.observations = d.observations.filter(
      (o) => !(o.rowId === "good" && o.armId === "placebo"),
    );
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(
      /row good has no observation for arm placebo/,
    );
  });

  it("rejects adjusted figures on some cells but not others", () => {
    const d = clone();
    delete d.observations[0]!.adjusted;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(
      /some cells carry an adjusted rate and some do not/,
    );
  });

  it("rejects adjusted figures with nothing saying what they adjust for", () => {
    const d = clone();
    delete d.adjustedLabel;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(
      /has to say what they were adjusted for/,
    );
  });

  /** The check the shape exists for. */
  it("rejects a gradient that reverses between arms", () => {
    const d = clone();
    d.observations[1]!.rate = 10; // placebo poor adherers now the healthiest
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(
      /runs one way in one arm and the other way in another/,
    );
  });

  it("rejects an arm with no gradient at all", () => {
    const d = clone();
    d.observations[2]!.rate = 24.6; // clofibrate rows now equal
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/no gap at all between the first two/);
  });

  it("rejects duplicate ids and unknown references", () => {
    const d = clone();
    d.rows.push({ id: "poor", label: { en: "again" } });
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/duplicate row id/);
    const e = clone();
    e.observations[0]!.armId = "nothing";
    expect(JSON.stringify(parse(e).error?.issues)).toMatch(/no arm with id nothing/);
  });
});
