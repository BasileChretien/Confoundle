import { describe, expect, it } from "vitest";
import { PuzzleData } from "../../puzzles/schema";
import type { CompetingData } from "../../puzzles/schema";
import {
  competingFates,
  eventFate,
  finalGap,
  gapsOverTime,
  hasSecondCurve,
  overstatementAt,
  restrictCompeting,
  widensWithTime,
} from "./competing";

/**
 * The derivation behind the competing-risk shape.
 *
 * Every number the figure draws comes from here, so the setup's alarming
 * reading and the reveal's smaller one are two summaries of one cohort and
 * cannot disagree with each other.
 */

const text = (en: string) => ({ en });

/** Berry 2010's observed comparison, which the card ships. */
const data: CompetingData = {
  type: "competing",
  label: text("Second hip fracture"),
  timeUnit: text("years"),
  metricLabel: text("Per 100 patients"),
  naiveLabel: text("Standard survival analysis"),
  adjustedLabel: text("Counting death as an outcome"),
  gapLabel: text("reported by treating the dead as still at risk"),
  cohortNote: text("481 people, followed to 2003"),
  points: [
    { t: 1, naive: 3, adjusted: 3 },
    { t: 3, naive: 7, adjusted: 6 },
    { t: 5, naive: 11, adjusted: 8 },
    { t: 10, naive: 21, adjusted: 12 },
  ],
  fates: [
    { id: "again", label: text("Broke a hip again"), share: 15, role: "event" },
    { id: "died", label: text("Died first"), share: 73, role: "competing" },
    { id: "alive", label: text("Still alive"), share: 12, role: "stillfollowed" },
  ],
};

describe("the two estimates", () => {
  it("reproduces the source's stated ten-year overstatement exactly", () => {
    // 21 over 12 is 1.75 on the nose, and the paper independently states "75%
    // greater" in prose. Two routes to the same number off one table.
    expect(overstatementAt(data, 10)).toBe(75);
  });

  it("lands half a point off at five years, because its inputs are rounded", () => {
    /*
      THIS DISAGREEMENT IS THE POINT OF THE TEST, and it is pinned here so
      nobody quietly "fixes" it later. 11 over 8 is 1.375, which rounds to 38,
      while the paper's prose says 37. The paper computed from its own
      unrounded estimates; the figure only ever saw 11 and 8, each already
      rounded to a whole per cent, and half a point is exactly what that costs.

      Neither number is wrong. What follows is a rule for the card: the
      five-year RATIO must never be printed beside the paper's sentence, or
      the page contradicts its own citation over a rounding artefact. The
      reveal quotes the ten-year figure, which is exact, and draws the gap in
      percentage points, which is exact everywhere.
    */
    expect(overstatementAt(data, 5)).toBe(38);
  });

  it("reports no overstatement where the two agree", () => {
    expect(overstatementAt(data, 1)).toBe(0);
  });

  it("refuses a time the source never printed rather than interpolating", () => {
    // These are published estimates at named follow-up times, not a sampled
    // function. A reading at seven years would be invented.
    expect(overstatementAt(data, 7)).toBeNull();
    expect(overstatementAt(data, 0)).toBeNull();
  });

  it("refuses a ratio rather than reporting infinity", () => {
    const zeroed: CompetingData = {
      ...data,
      points: [{ t: 1, naive: 3, adjusted: 0 }, ...data.points.slice(1)],
    };
    expect(gapsOverTime(zeroed)[0]!.ratio).toBeNull();
    expect(overstatementAt(zeroed, 1)).toBeNull();
  });

  it("measures the band in percentage points, widening to nine", () => {
    expect(gapsOverTime(data).map((g) => g.points)).toEqual([0, 1, 3, 9]);
    expect(finalGap(data).t).toBe(10);
    expect(finalGap(data).points).toBe(9);
  });
});

describe("whether the gap widens", () => {
  it("says it does on this cohort, which is the source's own finding", () => {
    expect(widensWithTime(data)).toBe(true);
  });

  it("says it does not when the estimators stay a fixed distance apart", () => {
    // A short follow-up or a small competing risk can look like this, and the
    // shape must still draw it honestly rather than claim a widening.
    const flat: CompetingData = {
      ...data,
      points: [
        { t: 1, naive: 5, adjusted: 4 },
        { t: 3, naive: 7, adjusted: 6 },
        { t: 5, naive: 9, adjusted: 8 },
      ],
    };
    expect(widensWithTime(flat)).toBe(false);
  });

  it("says it does not when the gap narrows partway", () => {
    const narrowing: CompetingData = {
      ...data,
      points: [
        { t: 1, naive: 5, adjusted: 1 },
        { t: 3, naive: 7, adjusted: 6 },
        { t: 5, naive: 20, adjusted: 8 },
      ],
    };
    expect(narrowing.points[1]!.naive - narrowing.points[1]!.adjusted).toBeLessThan(
      narrowing.points[0]!.naive - narrowing.points[0]!.adjusted,
    );
    expect(widensWithTime(narrowing)).toBe(false);
  });
});

describe("what each beat draws", () => {
  it("hides the second curve at the setup, which is the trap as a function", () => {
    const setup = restrictCompeting(data, { showAdjusted: false, showFates: false });
    expect(hasSecondCurve(setup)).toBe(false);
    expect(setup.points.map((p) => p.adjusted)).toEqual([3, 7, 11, 21]);
    expect(setup.fates).toEqual([]);
  });

  it("leaves the naive curve exactly as published when it hides the other", () => {
    // The setup must not move the line the player reads their answer off.
    const setup = restrictCompeting(data, { showAdjusted: false, showFates: false });
    expect(setup.points.map((p) => p.naive)).toEqual(data.points.map((p) => p.naive));
  });

  it("gives the reveal both curves and every fate", () => {
    const reveal = restrictCompeting(data, { showAdjusted: true, showFates: true });
    expect(reveal).toEqual(data);
    expect(hasSecondCurve(reveal)).toBe(true);
  });
});

describe("the fates", () => {
  it("finds the outcome the curves are about, and the ones they are not", () => {
    expect(eventFate(data).id).toBe("again");
    expect(competingFates(data).map((f) => f.id)).toEqual(["died"]);
  });
});

describe("the schema, which is where an impossible figure gets stopped", () => {
  const parse = (d: unknown) => PuzzleData.safeParse(d);

  it("accepts the shipped comparison", () => {
    expect(parse(data).success).toBe(true);
  });

  it("refuses a naive curve below the competing-risk one", () => {
    // Not a house rule. Treating a death as a censoring keeps the patient in
    // the risk set forever, so this ordering is a theorem, and a card drawing
    // the reverse has a transcription error.
    const flipped = {
      ...data,
      points: [...data.points.slice(0, 3), { t: 10, naive: 12, adjusted: 21 }],
    };
    expect(parse(flipped).success).toBe(false);
  });

  it("refuses two estimators that agree everywhere", () => {
    const same = {
      ...data,
      points: data.points.map((p) => ({ ...p, adjusted: p.naive })),
    };
    expect(parse(same).success).toBe(false);
  });

  it("refuses a cumulative incidence that falls", () => {
    const falling = {
      ...data,
      points: [...data.points.slice(0, 3), { t: 10, naive: 21, adjusted: 5 }],
    };
    expect(parse(falling).success).toBe(false);
  });

  it("refuses fates that do not partition the cohort", () => {
    const short = {
      ...data,
      fates: data.fates.map((f) => (f.id === "died" ? { ...f, share: 40 } : f)),
    };
    expect(parse(short).success).toBe(false);
  });

  it("tolerates a total off by rounding, since sources print whole per cents", () => {
    const rounded = {
      ...data,
      fates: [
        { ...data.fates[0]!, share: 15 },
        { ...data.fates[1]!, share: 73 },
        { ...data.fates[2]!, share: 13 },
      ],
    };
    expect(parse(rounded).success).toBe(true);
  });

  it("refuses a shape with no competing event in it", () => {
    const none = {
      ...data,
      fates: [
        { ...data.fates[0]!, share: 50 },
        { ...data.fates[2]!, share: 50 },
      ],
    };
    expect(parse(none).success).toBe(false);
  });
});
