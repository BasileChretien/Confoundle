import { describe, expect, it } from "vitest";
import type { SalienceComparison, SalienceData } from "../../puzzles/schema";
import {
  closenessExplanationFails,
  hitComparisons,
  majoritySide,
  majorityWasRight,
  missedComparisons,
  narrowestHit,
  restrictSalience,
  shareFor,
  widestMiss,
  formatRatio,
} from "./salience";

const cmp = (
  id: string,
  commoner: "a" | "b",
  trueRatio: number,
  percentCorrect: number,
): SalienceComparison => ({
  id,
  optionA: { en: `${id} A` },
  optionB: { en: `${id} B` },
  commoner,
  trueRatio,
  percentCorrect,
});

const data: SalienceData = {
  type: "salience",
  label: { en: "figure" },
  splitLabel: { en: "split" },
  truthLabel: { en: "truth" },
  statNote: { en: "note" },
  comparisons: [
    cmp("close-hit", "b", 1.42, 99),
    cmp("close-miss", "b", 1.85, 20),
    cmp("wide-miss", "b", 20.9, 42),
  ],
};

describe("salience shares", () => {
  it("derives the other side's share so the two always sum to 100", () => {
    for (const c of data.comparisons) {
      expect(shareFor(c, "a") + shareFor(c, "b")).toBe(100);
    }
  });

  it("gives the authored share to the side that is actually commoner", () => {
    const c = cmp("x", "b", 2, 42);
    expect(shareFor(c, "b")).toBe(42);
    expect(shareFor(c, "a")).toBe(58);
  });

  it("names the side the majority picked", () => {
    expect(majoritySide(cmp("x", "b", 2, 42))).toBe("a");
    expect(majoritySide(cmp("x", "b", 2, 99))).toBe("b");
  });

  it("treats an exact tie as the public being right, never as an error", () => {
    // Half is not evidence that people got it wrong, so the conservative
    // reading is the one that does not manufacture a failure.
    const tie = cmp("x", "a", 2, 50);
    expect(majorityWasRight(tie)).toBe(true);
    expect(majoritySide(tie)).toBe("a");
  });
});

describe("salience pattern", () => {
  it("splits the comparisons into the ones the public got right and wrong", () => {
    expect(hitComparisons(data).map((c) => c.id)).toEqual(["close-hit"]);
    expect(missedComparisons(data).map((c) => c.id)).toEqual([
      "close-miss",
      "wide-miss",
    ]);
  });

  it("finds the narrowest margin the public got right", () => {
    expect(narrowestHit(data)?.id).toBe("close-hit");
  });

  it("finds the widest margin the public got wrong", () => {
    expect(widestMiss(data)?.id).toBe("wide-miss");
  });

  it("refutes the closeness explanation when a wider miss exists", () => {
    // 1.42 was answered correctly and 1.85 was not, so "they only fail when it
    // is close" cannot be what is happening.
    expect(closenessExplanationFails(data)).toBe(true);
  });

  it("does not claim the refutation when every miss really was closer", () => {
    const tidy: SalienceData = {
      ...data,
      comparisons: [cmp("hit", "b", 9, 80), cmp("miss", "b", 1.1, 30)],
    };
    expect(closenessExplanationFails(tidy)).toBe(false);
  });
});

describe("salience view filtering", () => {
  it("returns the same object when nothing is filtered", () => {
    expect(restrictSalience(data)).toBe(data);
  });

  it("keeps only the named comparisons and leaves the original untouched", () => {
    const only = restrictSalience(data, { groupIds: ["wide-miss"] });
    expect(only.comparisons.map((c) => c.id)).toEqual(["wide-miss"]);
    expect(data.comparisons).toHaveLength(3);
  });
});

describe("salience formatting", () => {
  it("prints the ratio as authored, so the chart cannot contradict the prose", () => {
    expect(formatRatio(1.42)).toBe("1.42");
    expect(formatRatio(1.85)).toBe("1.85");
    expect(formatRatio(20.9)).toBe("20.9");
    expect(formatRatio(52)).toBe("52");
  });
});
