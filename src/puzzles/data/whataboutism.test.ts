import { describe, expect, it } from "vitest";
import { whataboutism } from "./whataboutism";
import { points, restrictRatings } from "../../engine/charts/ratings";

/**
 * van Eemeren, Meuffels and Verburg (2000). Every figure was read off the
 * rendered pages: the three variant means from page 429, Tables 2 and 3 from
 * page 430, and the scale and sample from page 422.
 *
 * Table 3 is the check on the reading. Its rows average to the variant means
 * printed separately on the previous page, and those in turn average to the
 * total in Table 2. Those are three printed quantities constraining each other,
 * so a misread digit anywhere moves one of them.
 */
const raw = whataboutism.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const mean = (id: string): number => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o.mean;
};

/** Table 3, page 430: mean reasonableness by setting and by type of attack. */
const TABLE3 = {
  domestic: { abusive: 3.29, circumstantial: 4.08, tuquoque: 4.92 },
  political: { abusive: 2.89, circumstantial: 4.19, tuquoque: 4.77 },
  scientific: { abusive: 2.57, circumstantial: 3.43, tuquoque: 3.66 },
} as const;

/** The variant means printed in the prose on page 429. */
const PRINTED_MARGINALS = { tuquoque: 4.45, circumstantial: 3.9, abusive: 2.91 };

const settingMean = (variant: keyof typeof TABLE3.domestic): number =>
  (TABLE3.domestic[variant] +
    TABLE3.political[variant] +
    TABLE3.scientific[variant]) /
  3;

describe("whataboutism data", () => {
  it("carries the four means the puzzle draws", () => {
    expect(mean("abusive")).toBe(2.91);
    expect(mean("circumstantial")).toBe(3.9);
    expect(mean("tuquoque")).toBe(4.45);
    expect(mean("sound")).toBe(5.29);
  });

  it("uses the scale the paper used, with the midpoint marked", () => {
    expect(data.scale.min).toBe(1);
    expect(data.scale.max).toBe(7);
    expect(data.scale.anchorAt).toBe(4);
    expect(data.scale.minLabel.en).toContain("very unreasonable");
    expect(data.scale.maxLabel.en).toContain("very reasonable");
  });

  it("reports the sample the degrees of freedom imply", () => {
    // F tests on 1 and 91, and on 2 and 182, both give 92 respondents, which
    // is also 50 HAVO-4 plus 42 VWO-5 pupils as stated on page 422.
    expect(data.observations.every((o) => o.n === 92)).toBe(true);
    expect(50 + 42).toBe(92);
  });

  it("draws no dispersion, because the paper prints none at this level", () => {
    // SDs exist for the nine cells of Table 3 and for the two totals of Table
    // 2, but not for the three variant means. Showing one series with a
    // whisker and three without would imply a precision that is not there.
    expect(data.observations.every((o) => o.sd === undefined)).toBe(true);
    expect(data.dispersionLabel).toBeUndefined();
  });
});

describe("Table 3, the check on the reading", () => {
  it("averages to the variant means printed on the previous page", () => {
    expect(settingMean("tuquoque")).toBeCloseTo(PRINTED_MARGINALS.tuquoque, 10);
    expect(settingMean("circumstantial")).toBeCloseTo(
      PRINTED_MARGINALS.circumstantial,
      10,
    );
  });

  it("misses by a hundredth on the third, which is the rounding and is recorded", () => {
    // 3.29, 2.89 and 2.57 average to 2.9167, and the paper prints 2.91. This
    // is what rounding cell means to two places does. The note says so rather
    // than the puzzle quietly using 2.92.
    expect(settingMean("abusive")).toBeCloseTo(2.9167, 4);
    expect(PRINTED_MARGINALS.abusive).toBe(2.91);
    expect(Math.abs(settingMean("abusive") - PRINTED_MARGINALS.abusive)).toBeLessThan(0.01);
  });

  it("recovers Table 2's total for all fallacious moves", () => {
    const grand =
      (PRINTED_MARGINALS.tuquoque +
        PRINTED_MARGINALS.circumstantial +
        PRINTED_MARGINALS.abusive) /
      3;
    expect(Number(grand.toFixed(2))).toBe(3.75);
  });

  it("keeps the deep dive's numbers matching Table 3", () => {
    const summary = whataboutism.lesson.examples?.[0]?.summary.en ?? "";
    for (const n of ["4.92", "4.77", "3.66", "3.43", "2.57"])
      expect(summary).toContain(n);
  });
});

describe("the finding the puzzle turns on", () => {
  it("puts the tu quoque alone on the reasonable side of the middle", () => {
    const midpoint = data.scale.anchorAt ?? 4;
    expect(mean("tuquoque")).toBeGreaterThan(midpoint);
    expect(mean("circumstantial")).toBeLessThan(midpoint);
    expect(mean("abusive")).toBeLessThan(midpoint);
  });

  it("still puts a real answer above it", () => {
    // The lesson is that the evasion is tolerated, not that it beats an
    // argument. If this ever flipped, the reveal's last sentence would be false.
    expect(mean("sound")).toBeGreaterThan(mean("tuquoque"));
  });

  it("keeps the one setting where the effect reverses", () => {
    // Within a scientific discussion the tu quoque falls back below the
    // middle, which is what the deep dive is about.
    expect(TABLE3.scientific.tuquoque).toBeLessThan(4);
    expect(TABLE3.domestic.tuquoque).toBeGreaterThan(4);
    expect(TABLE3.political.tuquoque).toBeGreaterThan(4);
  });
});

describe("whataboutism framing", () => {
  it("shows the insult alone at the setup", () => {
    expect(whataboutism.setup.initialView.kind).toBe("onerating");
    const shown = points(
      restrictRatings(data, {
        groupIds: whataboutism.setup.initialView.groupIds,
      }),
    );
    // `onerating` draws the first series, so the insult has to be first or the
    // setup would give the answer away.
    expect(data.series[0].id).toBe("abusive");
    expect(shown[0].seriesId).toBe("abusive");
  });

  it("names the midpoint, because two bands point the same way", () => {
    // The hedge audit forbids two bands sharing the direction the skill
    // licenses unless the framing carries the discriminator. This is it.
    const framing = whataboutism.setup.framing.en;
    expect(framing).toContain("that is the middle of the scale");
    expect(framing).toContain("which side of that middle");
  });

  it("tells the reader the raters were untutored", () => {
    expect(whataboutism.setup.framing.en).toContain(
      "had ever heard of the ad hominem",
    );
  });

  it("offers exactly one correct band, and traps the still-unreasonable reading", () => {
    const correct = whataboutism.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("above-middle");
    expect(whataboutism.choices.find((c) => c.isIntuitiveTrap)?.id).toBe(
      "below-middle",
    );
  });
});

describe("whataboutism lesson", () => {
  it("separates the claim from the claimant", () => {
    const how = whataboutism.lesson.howItWorks?.en ?? "";
    expect(how).toContain("separate the claim from the claimant");
    expect(how).toContain("nobody has to earn the right to make a true statement");
  });

  it("does not overcorrect into saying consistency never matters", () => {
    // A lesson that told people to ignore hypocrisy entirely would be wrong,
    // and would contradict the paper's own discussion of legitimate cases.
    const how = whataboutism.lesson.howItWorks?.en ?? "";
    expect(how).toContain("fair challenge");
    expect(how).toContain("What it never does is answer an argument");
  });
});

describe("whataboutism provenance note", () => {
  const note = whataboutism.provenance.note?.en ?? "";

  it("shows the reconciliation rather than asserting it", () => {
    expect(note).toContain("4.45");
    expect(note).toContain("3.90");
    expect(note).toContain("2.9167");
    expect(note).toContain("3.7533");
  });

  it("records why no dispersion is drawn", () => {
    expect(note).toContain("no dispersion is drawn");
  });

  it("records that the endnote figures were a different experiment", () => {
    expect(note).toContain("3.82");
    expect(note).toContain("different experiment");
  });
});
