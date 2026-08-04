import { describe, expect, it } from "vitest";
import { PuzzleData, type MagnitudeData } from "../../puzzles/schema";
import {
  compressionSpan,
  furthestByGap,
  magnitudeShape,
  mostDistortedByFactor,
  ratioBetween,
} from "./magnitudes";

/** A small, made-up set. The real numbers are proved in the puzzle's own test. */
const data: MagnitudeData = {
  type: "magnitude",
  label: { en: "Sizes" },
  scaleLabel: { en: "big thing = 1,000" },
  estimatedLabel: { en: "Guessed" },
  actualLabel: { en: "Actual" },
  statNote: { en: "Made up" },
  items: [
    { id: "tiny", label: { en: "Tiny" }, actual: 10, estimated: 200 },
    { id: "mid", label: { en: "Mid" }, actual: 100, estimated: 150 },
    { id: "big", label: { en: "Big" }, actual: 1000, estimated: 500 },
  ],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);

describe("magnitudeShape", () => {
  it("derives the ratio from the two authored numbers", () => {
    const { rows } = magnitudeShape(data);
    expect(rows.map((r) => r.ratio)).toEqual([20, 1.5, 0.5]);
  });

  it("scales every bar against the largest number anywhere in the data", () => {
    const { rows, peak } = magnitudeShape(data);
    // 1000 is Big's ACTUAL, which the setup never draws. It still sets the
    // scale, so the guess bars do not move when the reveal adds the truths.
    expect(peak).toBe(1000);
    expect(rows[0].estimatedWidth).toBeCloseTo(0.2, 10);
    expect(rows[0].actualWidth).toBeCloseTo(0.01, 10);
    expect(rows[2].actualWidth).toBe(1);
  });

  it("never emits a width above 1, so no bar can overflow its track", () => {
    const { rows } = magnitudeShape(data);
    for (const r of rows) {
      expect(r.estimatedWidth).toBeLessThanOrEqual(1);
      expect(r.actualWidth).toBeLessThanOrEqual(1);
    }
  });
});

describe("which item is 'furthest from the truth' has two answers", () => {
  it("ranks by factor with over and under treated alike", () => {
    // Tiny is 20 times out; Big is half, so 2 times out. Ranking on `ratio`
    // alone would be the same answer here, so check the under-side explicitly
    // below rather than trusting this case.
    expect(mostDistortedByFactor(data)?.id).toBe("tiny");
  });

  it("does not let an overestimate win on ratio alone", () => {
    const underHeavy: MagnitudeData = {
      ...data,
      items: [
        { id: "a", label: { en: "A" }, actual: 10, estimated: 12 },
        { id: "b", label: { en: "B" }, actual: 100, estimated: 150 },
        { id: "c", label: { en: "C" }, actual: 1000, estimated: 10 },
      ],
    };
    // C is out by a factor of 100 downwards, B by 1.5 upwards.
    expect(mostDistortedByFactor(underHeavy)?.id).toBe("c");
  });

  it("ranks by raw gap differently, which is why the framing has to choose", () => {
    // Tiny is out by 190 units, Big by 500. So a reader who reads "furthest
    // from the truth" as a distance rather than a multiple would answer Big.
    // Any puzzle where these two disagree must pin which one it means.
    expect(furthestByGap(data)?.id).toBe("big");
    expect(mostDistortedByFactor(data)?.id).not.toBe(furthestByGap(data)?.id);
  });
});

describe("compressionSpan and ratioBetween", () => {
  it("reads the two ends off the ascending array", () => {
    const span = compressionSpan(data);
    expect(span?.smallest.id).toBe("tiny");
    expect(span?.largest.id).toBe("big");
    expect(span?.smallest.ratio).toBeGreaterThan(span!.largest.ratio);
  });

  it("contrasts the guessed spread with the real one", () => {
    const r = ratioBetween(data, "tiny", "big");
    // Guessed 500 against 200, so two and a half times. Actually 100 times.
    expect(r).toEqual({ guessed: 2.5, actual: 100 });
  });

  it("returns null for an id that is not there rather than guessing", () => {
    expect(ratioBetween(data, "tiny", "nope")).toBeNull();
  });
});

describe("the schema refuses data that would make the reveal empty", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects items out of ascending order", () => {
    const out = parse({
      ...data,
      items: [data.items[1], data.items[0], data.items[2]],
    });
    expect(out.success).toBe(false);
  });

  it("rejects a duplicate id", () => {
    const out = parse({
      ...data,
      items: [data.items[0], { ...data.items[1], id: "tiny" }, data.items[2]],
    });
    expect(out.success).toBe(false);
  });

  it("rejects data with no compression, where the reveal would restate the setup", () => {
    const out = parse({
      ...data,
      items: [
        { id: "tiny", label: { en: "Tiny" }, actual: 10, estimated: 8 },
        { id: "mid", label: { en: "Mid" }, actual: 100, estimated: 150 },
        { id: "big", label: { en: "Big" }, actual: 1000, estimated: 5000 },
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects data where nothing is underestimated", () => {
    const out = parse({
      ...data,
      items: [
        { id: "tiny", label: { en: "Tiny" }, actual: 10, estimated: 900 },
        { id: "mid", label: { en: "Mid" }, actual: 100, estimated: 900 },
        { id: "big", label: { en: "Big" }, actual: 1000, estimated: 1001 },
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects a zero or negative value, which cannot be a size", () => {
    expect(
      parse({
        ...data,
        items: [{ ...data.items[0], actual: 0 }, data.items[1], data.items[2]],
      }).success,
    ).toBe(false);
  });
});
