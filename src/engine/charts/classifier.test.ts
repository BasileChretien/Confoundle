import { describe, expect, it } from "vitest";
import { PuzzleData } from "../../puzzles/schema";
import type { ClassifierData } from "../../puzzles/schema";
import {
  errorRateAtBaseRate,
  identityResidual,
  ratesFor,
  showsTheConflict,
  spreadAmongFlagged,
  spreadBaseRate,
  spreadFlaggedInError,
} from "./classifier";

/**
 * The derivation behind the classifier shape.
 *
 * The card's whole claim is that two correct readings of one table disagree
 * and cannot both be fixed. Every number below is recomputed from the four
 * counts ProPublica printed, and the expected values are the rates THEY
 * printed beside those counts. Where the two agree, the card can cite either.
 */

const text = (en: string) => ({ en });

/** ProPublica's own contingency tables, counts exactly as published. */
const data: ClassifierData = {
  type: "classifier",
  label: text("A risk score, by defendant group"),
  flagLabel: text("labelled higher risk"),
  outcomeLabel: text("was arrested again within two years"),
  amongFlaggedLabel: text("Of those it labelled higher risk"),
  amongUneventfulLabel: text("Of those who were not arrested again"),
  cohortNote: text("Broward County, 2013 to 2014"),
  groups: [
    {
      id: "black",
      label: text("Black defendants"),
      short: text("Black"),
      flaggedAndHappened: 1369,
      flaggedNotHappened: 805,
      notFlaggedButHappened: 532,
      notFlaggedNorHappened: 990,
    },
    {
      id: "white",
      label: text("White defendants"),
      short: text("White"),
      flaggedAndHappened: 505,
      flaggedNotHappened: 349,
      notFlaggedButHappened: 461,
      notFlaggedNorHappened: 1139,
    },
  ],
};

const byId = (id: string) => ratesFor(data).find((r) => r.id === id)!;

describe("the rates, against the ones the source printed", () => {
  it("reproduces every published rate for Black defendants", () => {
    // Printed: FP rate 44.85, FN rate 27.99, PPV 0.63. n is not printed per
    // group, so it is checked against the sum of the four cells instead.
    const r = byId("black");
    expect(r.n).toBe(3696);
    expect(r.flaggedInError * 100).toBeCloseTo(44.85, 2);
    expect(r.missed * 100).toBeCloseTo(27.99, 2);
    expect(r.amongFlagged).toBeCloseTo(0.63, 2);
  });

  it("reproduces every published rate for White defendants", () => {
    // Printed: FP rate 23.45, FN rate 47.72, PPV 0.59.
    const r = byId("white");
    expect(r.n).toBe(2454);
    expect(r.flaggedInError * 100).toBeCloseTo(23.45, 2);
    expect(r.missed * 100).toBeCloseTo(47.72, 2);
    expect(r.amongFlagged).toBeCloseTo(0.59, 2);
  });

  it("puts the base rates far enough apart to matter", () => {
    // Not printed as such by the source, and the whole lesson turns on it, so
    // it is derived here and pinned: 51.4% against 39.4%.
    expect(byId("black").baseRate).toBeCloseTo(0.5143, 4);
    expect(byId("white").baseRate).toBeCloseTo(0.3936, 4);
    expect(spreadBaseRate(data)).toBeCloseTo(0.1207, 4);
  });
});

describe("the two readings of the same table", () => {
  it("agrees to within four points on the reading the setup draws", () => {
    // 63% against 59%. This is the number that made the tool look even-handed
    // and it is not wrong.
    expect(spreadAmongFlagged(data)).toBeCloseTo(0.0384, 4);
  });

  it("differs by twenty one points on the reading the reveal draws", () => {
    // 44.85% against 23.45%, from the same four counts per group.
    expect(spreadFlaggedInError(data)).toBeCloseTo(0.2139, 4);
  });

  it("says this table shows the conflict", () => {
    expect(showsTheConflict(data, { agreeWithin: 0.05, differBy: 0.15 })).toBe(true);
  });

  it("says a table whose readings agree does not", () => {
    // Legal data and a dead puzzle: the reveal would restate the setup. Built
    // by giving both groups the same base rate, which is exactly the condition
    // under which the identity below stops forcing them apart.
    const even: ClassifierData = {
      ...data,
      groups: [
        { ...data.groups[0]!, flaggedAndHappened: 600, flaggedNotHappened: 400,
          notFlaggedButHappened: 400, notFlaggedNorHappened: 600 },
        { ...data.groups[1]!, flaggedAndHappened: 300, flaggedNotHappened: 200,
          notFlaggedButHappened: 200, notFlaggedNorHappened: 300 },
      ],
    };
    expect(spreadAmongFlagged(even)).toBeCloseTo(0, 10);
    expect(spreadFlaggedInError(even)).toBeCloseTo(0, 10);
    expect(showsTheConflict(even, { agreeWithin: 0.05, differBy: 0.15 })).toBe(false);
  });
});

describe("the identity, which is what makes it a theorem and not an oversight", () => {
  it("holds exactly on both groups of the real table", () => {
    /*
      THE STRONGEST CLAIM THIS CARD MAKES, CHECKED RATHER THAN ASSERTED.
      `toBeCloseTo(0, 10)` rather than a looser tolerance on purpose: this is
      an algebraic rearrangement of four integers, not a fitted approximation,
      so anything above floating-point noise would mean the formula is wrong
      rather than imprecise.
    */
    for (const r of ratesFor(data)) {
      expect(Math.abs(identityResidual(r))).toBeLessThan(1e-12);
    }
  });

  it("shows the error rates would have matched had the base rates matched", () => {
    /*
      The counterfactual the reveal rests on. Hold each group's own accuracy
      fixed and give them a common base rate: the error rates converge. So the
      gap is not a flaw somebody left in, it is what the different base rates
      force given equal accuracy.
    */
    const black = byId("black");
    const white = byId("white");
    const common = 0.45;
    const gapAsIs = Math.abs(black.flaggedInError - white.flaggedInError);
    const gapIfEqual = Math.abs(
      errorRateAtBaseRate(black, common) - errorRateAtBaseRate(white, common),
    );
    expect(gapAsIs).toBeGreaterThan(0.2);
    expect(gapIfEqual).toBeLessThan(0.06);
  });

  it("returns each group its own error rate when given its own base rate", () => {
    // Guards the counterfactual against being a different formula that merely
    // happens to converge: at a group's own base rate it must be the identity.
    for (const r of ratesFor(data)) {
      expect(errorRateAtBaseRate(r, r.baseRate)).toBeCloseTo(r.flaggedInError, 12);
    }
  });
});

describe("the schema, which stops a figure that cannot be drawn", () => {
  const parse = (d: unknown) => PuzzleData.safeParse(d);

  it("accepts the shipped table", () => {
    expect(parse(data).success).toBe(true);
  });

  it("refuses a group nobody was flagged in", () => {
    // There is no share-of-the-flagged to draw, so the setup would paint NaN.
    const none = {
      ...data,
      groups: [
        { ...data.groups[0]!, flaggedAndHappened: 0, flaggedNotHappened: 0 },
        data.groups[1]!,
      ],
    };
    expect(parse(none).success).toBe(false);
  });

  it("refuses a group the outcome never spared", () => {
    // No error rate to reveal: everybody had the outcome, so nobody could have
    // been flagged in error.
    const all = {
      ...data,
      groups: [
        { ...data.groups[0]!, flaggedNotHappened: 0, notFlaggedNorHappened: 0 },
        data.groups[1]!,
      ],
    };
    expect(parse(all).success).toBe(false);
  });

  it("refuses two groups with the same id", () => {
    const dup = { ...data, groups: [data.groups[0]!, { ...data.groups[1]!, id: "black" }] };
    expect(parse(dup).success).toBe(false);
  });
});
