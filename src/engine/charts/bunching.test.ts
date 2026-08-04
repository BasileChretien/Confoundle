import { describe, expect, it } from "vitest";
import type { BunchingData } from "../../puzzles/schema";
import {
  bunchingShape,
  cliffAcross,
  excessBeforeLine,
  restrictBunching,
} from "./bunching";

const bin = (id: string, count: number, past: boolean) => ({
  id,
  label: { en: id },
  count,
  past,
});

/** The shipped counts, so the fixture cannot drift from the puzzle. */
const data: BunchingData = {
  type: "bunching",
  label: { en: "Marathon finishers by minute" },
  metricLabel: { en: "finishers" },
  itemLabel: { en: "one minute" },
  thresholdLabel: { en: "four hours" },
  bins: [
    bin("357", 100_294, false),
    bin("358", 103_018, false),
    bin("359", 97_012, false),
    bin("400", 74_968, true),
    bin("401", 69_648, true),
    bin("402", 67_861, true),
  ],
};

const before = ["357", "358", "359"];

describe("bunching shape", () => {
  it("scales every bar against the tallest bin drawn", () => {
    const s = bunchingShape(data);
    expect(s.peak).toBe(103_018);
    expect(s.bars.find((b) => b.id === "358")?.height).toBe(1);
    expect(s.bars.find((b) => b.id === "402")?.height).toBeCloseTo(
      67_861 / 103_018,
      12,
    );
  });

  it("rescales when only the setup bins are drawn", () => {
    // The setup must not leave a gap where the withheld bars would sit, or the
    // reader can count the missing ones and the reveal is spoiled.
    const s = bunchingShape(restrictBunching(data, { groupIds: before }));
    expect(s.bars).toHaveLength(3);
    expect(s.peak).toBe(103_018);
    expect(s.showsBothSides).toBe(false);
  });

  it("finds the pair either side of the line only when both are drawn", () => {
    const setup = bunchingShape(restrictBunching(data, { groupIds: before }));
    expect(setup.lastBefore).toBeNull();
    expect(setup.firstAfter).toBeNull();

    const full = bunchingShape(data);
    expect(full.lastBefore?.id).toBe("359");
    expect(full.firstAfter?.id).toBe("400");
    expect(full.showsBothSides).toBe(true);
  });

  it("reports no pair when only the far side is drawn", () => {
    const s = bunchingShape(
      restrictBunching(data, { groupIds: ["400", "401"] }),
    );
    expect(s.lastBefore).toBeNull();
    expect(s.firstAfter?.id).toBe("400");
  });

  it("does not emit NaN heights for an empty selection", () => {
    const s = bunchingShape({ ...data, bins: [] });
    expect(s.peak).toBe(0);
    expect(s.bars).toEqual([]);
  });
});

describe("the cliff", () => {
  it("is null at the setup, because the setup cannot see it", () => {
    expect(cliffAcross(restrictBunching(data, { groupIds: before }))).toBeNull();
    expect(excessBeforeLine(restrictBunching(data, { groupIds: before }))).toBeNull();
  });

  it("measures the drop from the last minute before to the first minute after", () => {
    const c = cliffAcross(data);
    expect(c).not.toBeNull();
    expect(c?.before).toBe(97_012);
    expect(c?.after).toBe(74_968);
    expect(c?.drop).toBe(22_044);
    expect(c?.dropFraction).toBeCloseTo(22_044 / 97_012, 12);
  });

  it("keeps the two denominators apart, because they are different claims", () => {
    // 22.7 per cent fewer after the line; 29.4 per cent more before it. Both
    // are true of the same two counts and neither implies the other, which is
    // exactly why a call site must not compute one from the other by hand.
    expect(Math.round(1000 * (cliffAcross(data)?.dropFraction ?? 0)) / 10).toBe(22.7);
    expect(Math.round(1000 * (excessBeforeLine(data) ?? 0)) / 10).toBe(29.4);
  });
});

describe("restrictBunching", () => {
  it("draws everything when no ids are given", () => {
    expect(restrictBunching(data, undefined).bins).toHaveLength(6);
    expect(restrictBunching(data, { groupIds: [] }).bins).toHaveLength(6);
  });

  it("keeps the authored order rather than the order asked for", () => {
    const r = restrictBunching(data, { groupIds: ["402", "357"] });
    expect(r.bins.map((b) => b.id)).toEqual(["357", "402"]);
  });

  it("does not mutate the data it was given", () => {
    const copy = JSON.parse(JSON.stringify(data));
    restrictBunching(data, { groupIds: before });
    expect(data).toEqual(copy);
  });
});
