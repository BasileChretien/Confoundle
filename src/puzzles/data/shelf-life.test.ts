import { describe, expect, it } from "vitest";
import { shelfLife } from "./shelf-life";
import { points, restrictRatings } from "../../engine/charts/ratings";

/**
 * Moss et al. (2023), Therapeutic Advances in Gastroenterology, Table 2, read at
 * source from the published PDF.
 *
 * The table prints its own two columns, so nothing here is recomputed. What this
 * file checks is that the six authored figures are the printed ones, that the
 * arm counts reconcile against the paper's own totals by two independent routes,
 * and that the claim the whole reveal rests on, that the corrected figure falls
 * below every earlier period, is derived rather than asserted.
 */
const raw = shelfLife.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const obs = (id: string) => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o;
};
const mean = (id: string) => obs(id).mean;
const arms = (id: string) => obs(id).n;

/** Printed in the paper, used only to reconcile against. */
const TOTAL_ARMS = 67;
const TOTAL_TRIALS = 38;
const VONOPRAZAN_ARMS_IN_TABLE_1 = 5;

const EARLIER = ["pre-2001", "y2001-2005", "y2006-2010", "y2011-2015"] as const;

describe("Table 2 as printed", () => {
  it("carries the five all-regimen periods", () => {
    expect(mean("pre-2001")).toBe(83.04);
    expect(mean("y2001-2005")).toBe(82.33);
    expect(mean("y2006-2010")).toBe(79.14);
    expect(mean("y2011-2015")).toBe(75.02);
    expect(mean("post-2015-all")).toBe(82.0);
  });

  it("carries the corrected final period from the neighbouring column", () => {
    expect(mean("post-2015-old-drugs")).toBe(72.43);
  });

  it("draws no dispersion, because the source prints intervals and not deviations", () => {
    // `RatingsView` draws mean plus and minus one standard deviation. Putting a
    // confidence half-width in that field would draw a different quantity from
    // the one the label promises, so the intervals stay in the prose.
    expect(data.observations.every((o) => o.sd === undefined)).toBe(true);
    expect(data.dispersionLabel).toBeUndefined();
    expect(shelfLife.provenance.source).toContain("95% CI 77.99 to 87.12");
  });
});

describe("two independent reconciliations of the arm counts", () => {
  it("sums the five periods to the total the paper reports", () => {
    const drawnAtSetup = shelfLife.setup.initialView.groupIds ?? [];
    const total = drawnAtSetup.reduce((s, id) => s + arms(id), 0);
    expect(total).toBe(TOTAL_ARMS);
    expect(shelfLife.provenance.source).toContain(`${TOTAL_ARMS} study arms`);
    expect(shelfLife.provenance.source).toContain(`${TOTAL_TRIALS} randomised trials`);
  });

  it("loses exactly the five vonoprazan arms Table 1 lists individually", () => {
    // The single check that proves the two columns are the same data. If this
    // ever failed, the reveal would be comparing different sets of trials.
    expect(arms("post-2015-all") - arms("post-2015-old-drugs")).toBe(
      VONOPRAZAN_ARMS_IN_TABLE_1,
    );
    const note = shelfLife.provenance.note?.en ?? "";
    for (const study of ["Murakami 2016", "Maruyama 2017", "Sue 2018", "Suzuki 2020", "Chey 2022"])
      expect(note).toContain(study);
  });
});

describe("the finding the puzzle turns on", () => {
  it("has the uncorrected final period land back among the earliest", () => {
    // This is the illusion: 82.00 sits within a point of the 82.33 of 2001 to
    // 2005 and inside a point and a half of the pre-2001 figure.
    expect(Math.abs(mean("post-2015-all") - mean("y2001-2005"))).toBeLessThan(0.5);
    expect(Math.abs(mean("post-2015-all") - mean("pre-2001"))).toBeLessThan(1.5);
  });

  it("puts the corrected figure below EVERY earlier period, derived not asserted", () => {
    const corrected = mean("post-2015-old-drugs");
    for (const id of EARLIER) expect(corrected).toBeLessThan(mean(id));
    // And below the one that had looked like the floor, which is what makes the
    // correct band qualitatively different from its neighbour rather than just
    // a smaller number.
    expect(mean("y2011-2015")).toBe(Math.min(...EARLIER.map(mean)));
    expect(corrected).toBeLessThan(mean("y2011-2015"));
  });

  it("costs nearly ten points, which is what the reveal claims", () => {
    const drop = mean("post-2015-all") - mean("post-2015-old-drugs");
    expect(Number(drop.toFixed(2))).toBe(9.57);
    expect(shelfLife.reveal.explanation.en).toContain("nearly ten points");
  });

  it("has the earlier series decline monotonically before the apparent recovery", () => {
    const series = EARLIER.map(mean);
    for (let i = 1; i < series.length; i++)
      expect(series[i]).toBeLessThan(series[i - 1]);
  });
});

describe("the beats", () => {
  it("shows the five all-regimen periods at the setup", () => {
    expect(shelfLife.setup.initialView.kind).toBe("bothratings");
    const shown = points(
      restrictRatings(data, { groupIds: shelfLife.setup.initialView.groupIds }),
    );
    expect(shown.map((p) => p.seriesId)).toEqual([
      "pre-2001",
      "y2001-2005",
      "y2006-2010",
      "y2011-2015",
      "post-2015-all",
    ]);
  });

  it("adds exactly one marker at the reveal", () => {
    expect(shelfLife.reveal.view.kind).toBe("bothratings");
    expect(shelfLife.reveal.view.groupIds).toBeUndefined();
    expect(points(data)).toHaveLength(6);
    expect(points(data)[5].seriesId).toBe("post-2015-old-drugs");
  });

  it("KEEPS EVERY DRAWN ROW THE SAME COLOUR ACROSS BOTH BEATS", () => {
    // RatingsView colours by index into the series array AFTER filtering, so
    // the five drawn first must lead the array or a marker changes colour
    // between the beats and the reader loses what the two views share.
    const shownAtSetup = shelfLife.setup.initialView.groupIds ?? [];
    const restricted = restrictRatings(data, { groupIds: shownAtSetup });
    for (const id of shownAtSetup)
      expect({ id, i: restricted.series.findIndex((s) => s.id === id) }).toEqual({
        id,
        i: data.series.findIndex((s) => s.id === id),
      });
  });

  it("says the count beside a marker is arms and not patients", () => {
    // The `n` field means participants in every other puzzle on this shape.
    expect(data.metricLabel.en).toContain("study arms pooled, not patients");
  });
});

describe("the commit beat stays answerable", () => {
  it("prints all five earlier figures in the framing", () => {
    const framing = shelfLife.setup.framing.en;
    for (const v of ["83.04", "82.33", "79.14", "75.02", "82.00"])
      expect(framing).toContain(v);
  });

  it("tells the reader that five of the eleven arms used a newer drug", () => {
    // Without this the question is unanswerable rather than hard.
    expect(shelfLife.setup.framing.en).toContain(
      "Five of the eleven arms in that final group used a newer kind of acid suppressant",
    );
  });

  it("names the first four periods as a steady fall, which is the discriminator", () => {
    // The hedge audit turns on this sentence. What the setup licenses is a
    // DIRECTION: did the fall continue once the new drug came out? Without the
    // trend named, "around 79" and "around 72" are both just "lower", and a
    // player reasoning correctly about direction gets marked wrong on a
    // magnitude the setup never gave them. See the band-separation test below.
    expect(shelfLife.setup.framing.en).toContain("The first four groups fall steadily");
  });

  it("does not claim the pooled arms were a fixed prescription", () => {
    // An earlier draft said "same antibiotics, same doses, same lengths". The
    // review pooled five to fourteen day courses across six acid suppression
    // backbones and says it could not correct for that, so only the antibiotic
    // pair is constant. Asserting otherwise oversold the puzzle's own logic.
    const framing = shelfLife.setup.framing.en;
    expect(framing).not.toContain("same doses");
    expect(framing).not.toContain("same lengths");
    expect(framing).toContain("The antibiotics are the part that never changed");
    expect(framing).toContain("could not adjust for that");
  });

  it("makes the durable-result reading the trap", () => {
    const correct = shelfLife.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("below-everything");
    expect(shelfLife.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("unchanged");
  });

  it("puts the four bands at four distinct places", () => {
    // unchanged at 82, mid-pack at 79, below-everything at 72, and higher.
    expect(shelfLife.choices.map((c) => c.id)).toEqual([
      "unchanged",
      "mid-pack",
      "below-everything",
      "higher",
    ]);
  });

  it("lets exactly ONE band say the fall continued", () => {
    // The hedge audit rule in CLAUDE.md: no two bands may share the direction
    // the skill licenses. The setup prints a fall from 83.04 to 75.02, so the
    // direction on offer is whether that fall carried on past 75.02. Only
    // `below-everything` says it did; the other three all assert a reversal,
    // at three different sizes. An earlier draft failed this: `mid-pack` was
    // worded "continuing the gentle slide" while sitting at 79, ABOVE the
    // 75.02 it claimed to be continuing from, so it read as the disciplined
    // answer to anyone who had the direction right.
    const continuesTheFall = shelfLife.choices.filter((c) =>
      /the fall never stopped|below every earlier period/i.test(c.label.en),
    );
    expect(continuesTheFall.map((c) => c.id)).toEqual(["below-everything"]);
    expect(continuesTheFall[0].isCorrect).toBe(true);

    // And no other band may describe itself as continuing, sliding or falling,
    // which is the exact wording trap that let the earlier draft through.
    const others = shelfLife.choices.filter((c) => c.id !== "below-everything");
    for (const c of others)
      expect(`${c.label.en} ${c.sublabel?.en ?? ""}`).not.toMatch(
        /continuing|slide|keeps falling/i,
      );
  });

  it("NO BAND ASSERTS A NULL", () => {
    const nullish = /\bno (gap|difference|effect|change)\b|\bnothing at all\b/i;
    const offenders = shelfLife.choices.filter((c) =>
      nullish.test(`${c.label.en} ${c.sublabel?.en ?? ""}`),
    );
    expect(offenders.map((c) => c.id)).toEqual([]);
  });
});

describe("the honesty items", () => {
  const note = shelfLife.provenance.note?.en ?? "";

  it("explains why percentages are drawn although Table 1 prints counts", () => {
    expect(note).toContain("random-effects pooled estimates rather than sums");
    expect(note).toContain("would be the wrong way round");
  });

  it("records that nothing is drawn from Figure 2, and why", () => {
    expect(note).toContain("nothing on this card is drawn from Figure 2");
    expect(note).toContain("could not be aligned with confidence");
  });

  it("records that the time axis is publication year, not treatment year", () => {
    expect(note).toContain("year of publication, not the year patients were treated");
  });

  it("records how thin the late groups are and which intervals overlap", () => {
    expect(note).toContain("only 6 for the corrected post-2015 figure");
    expect(note).toContain("does not overlap the pre-2001 interval");
  });

  it("declines to claim the newer drug will itself hold up", () => {
    expect(note).toContain("durability is untested here");
    expect(shelfLife.reveal.body?.en ?? "").toContain(
      "cannot tell you whether the newer drug will itself hold up",
    );
  });
});

describe("the lesson", () => {
  it("separates an expired finding from a failed replication", () => {
    // The distinction the whole skill turns on, and the reason it is not just
    // another disaggregation puzzle.
    const how = shelfLife.lesson.howItWorks?.en ?? "";
    expect(how).toContain("A failed replication and an expired finding look identical");
    expect(how).toContain("opposite responses");
  });

  it("insists nobody was wrong at the time", () => {
    expect(shelfLife.lesson.takeaway.en).toContain("without anybody being wrong at the time");
    expect(shelfLife.lesson.body?.en ?? "").toContain("Nobody made a mistake");
  });

  it("names the pooling failure mode as well as the decay", () => {
    expect(shelfLife.lesson.howItWorks?.en ?? "").toContain(
      "what is in the recent end of it that was not in the old end",
    );
  });

  it("is its own skill and not a second disaggregation puzzle", () => {
    expect(shelfLife.reasoningSkill).toBe("temporal-validity");
    expect(shelfLife.lesson.howItWorks?.en ?? "").toContain(
      "look for its date before you look at its size",
    );
  });
});

describe("the heterogeneity the review could not adjust for", () => {
  // Added after review caught the setup asserting a fixed prescription. The
  // paper states verbatim: "It was not feasible to correct for the heterogeneity
  // of dosage and duration of treatment in multivariable models due to the
  // limited amount of data." The composition effect the puzzle turns on is a
  // printed contrast between two columns of one table, not an adjusted estimate,
  // and every beat has to say so rather than implying a controlled comparison.
  it("discloses it in the reveal rather than only in the notes", () => {
    expect(shelfLife.reveal.explanation.en).toContain("not offered as the whole account");
    expect(shelfLife.reveal.explanation.en).toMatch(/could not correct for that heterogeneity/i);
  });

  it("records the six backbones and the four course lengths in the notes", () => {
    const note = shelfLife.provenance.note?.en ?? "";
    for (const backbone of [
      "vonoprazan",
      "rabeprazole",
      "lansoprazole",
      "esomeprazole",
      "omeprazole",
    ])
      expect(note).toContain(backbone);
    expect(note).toContain("five, seven, ten and fourteen days");
    expect(note).toContain("heterogeneity of dosage and duration of treatment");
  });

  it("calls the trend an observed association, not an adjusted one", () => {
    expect(shelfLife.provenance.note?.en ?? "").toContain(
      "observed temporal association",
    );
  });
});
