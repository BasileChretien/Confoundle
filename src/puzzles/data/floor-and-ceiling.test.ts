import { describe, expect, it } from "vitest";
import { floorAndCeiling } from "./floor-and-ceiling";
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
} from "../../engine/charts/ceiling";

/**
 * Fazio, Rand and Pennycook (2019), Table 1, read at source.
 *
 * The table prints twenty proportions and their standard deviations and nothing
 * else, so this file's job is threefold. It checks that the twenty authored
 * values are the printed ones. It reconciles them against the paper's other
 * printed figures by two routes that were not used to choose them: the overall
 * means and the effect size. And it pins the design decisions that could
 * silently rot, above all the fact that the tallest bar on the chart is NOT the
 * fitted peak, which is the one thing a careful reader will challenge.
 */
const raw = floorAndCeiling.setup.data;
if (raw.type !== "ceiling") throw new Error("expected ceiling data");
const data = raw;

const value = (binId: string, armId: string): number => {
  const o = data.observations.find((x) => x.binId === binId && x.armId === armId);
  if (!o) throw new Error(`no observation for ${binId} / ${armId}`);
  return o.value;
};
const sd = (binId: string, armId: string): number => {
  const o = data.observations.find((x) => x.binId === binId && x.armId === armId);
  if (o?.sd === undefined) throw new Error(`no sd for ${binId} / ${armId}`);
  return o.sd;
};
const round = (v: number, places = 2) => Number(v.toFixed(places));

/** Printed in the text, and used only to reconcile against. */
const COMPLETED = 503;
const T = 9.19;
const PRINTED_D = 0.41;

describe("Table 1 as printed", () => {
  it("carries the ten new-statement proportions", () => {
    expect(data.bins.map((b) => value(b.id, "new"))).toEqual([
      0.13, 0.2, 0.27, 0.36, 0.44, 0.53, 0.58, 0.68, 0.77, 0.88,
    ]);
  });

  it("carries the ten repeated-statement proportions", () => {
    expect(data.bins.map((b) => value(b.id, "repeated"))).toEqual([
      0.13, 0.23, 0.29, 0.41, 0.5, 0.59, 0.66, 0.72, 0.81, 0.89,
    ]);
  });

  it("carries the printed standard deviations, which one answer band turns on", () => {
    expect(data.bins.map((b) => sd(b.id, "new"))).toEqual([
      0.28, 0.29, 0.31, 0.31, 0.31, 0.32, 0.3, 0.27, 0.26, 0.22,
    ]);
    expect(data.bins.map((b) => sd(b.id, "repeated"))).toEqual([
      0.27, 0.29, 0.32, 0.32, 0.32, 0.32, 0.29, 0.27, 0.25, 0.19,
    ]);
  });
});

describe("the difference column, which the paper does not print", () => {
  it("is derived from the two printed columns and never authored", () => {
    // The source has no difference column at all. If one were ever authored it
    // could contradict the values it came from, which is the single mistake
    // this deck cannot make.
    const source = JSON.stringify(data);
    expect(source).not.toContain("difference:");
    expect(differenceCurve(data).map((d) => round(d.difference))).toEqual([
      0, 0.03, 0.02, 0.05, 0.06, 0.06, 0.08, 0.04, 0.04, 0.01,
    ]);
  });

  it("collapses at both ends and peaks in between, which is the whole setup", () => {
    expect(round(differenceAt(data, "b1") ?? NaN)).toBe(0);
    expect(round(differenceAt(data, "b10") ?? NaN)).toBe(0.01);
    expect(round(largestDifference(data)?.difference ?? NaN)).toBe(0.08);
  });

  it("never has the repeated arm fall below the new one", () => {
    // The property that made `series` the wrong shape: there the two lines are
    // REQUIRED to swap places, and these never do.
    expect(differenceCurve(data).every((d) => d.difference >= 0)).toBe(true);
  });
});

describe("two reconciliations that were not used to pick the numbers", () => {
  it("recovers the printed overall means from the ten printed bins", () => {
    // The paper prints M = .48 for new and .52 for repeated. The unweighted
    // mean of the ten bin means reproduces both at the printed precision. Not
    // an identity, since the paper gives no per-bin item counts, but a real
    // check on the reading of twenty separate cells.
    expect(round(armMean(data, "new"), 3)).toBe(0.484);
    expect(round(armMean(data, "repeated"), 3)).toBe(0.523);
    expect(round(armMean(data, "new"))).toBe(0.48);
    expect(round(armMean(data, "repeated"))).toBe(0.52);
    expect(round(overallDifference(data))).toBe(0.04);
  });

  it("recovers the printed effect size from the printed t and sample size", () => {
    // d = t / sqrt(N) for a within-subject t. 9.19 / sqrt(503) = 0.4098, and
    // the paper prints d = 0.41. Neither figure was used to choose a cell.
    expect(round(T / Math.sqrt(COMPLETED))).toBe(PRINTED_D);
  });
});

describe("the mechanism, as numbers rather than as an assertion", () => {
  it("has both arms sitting within a seventh of a bound at each end", () => {
    expect(roomToBound(data, "b1")).toBeCloseTo(0.13, 10);
    expect(roomToBound(data, "b10")).toBeCloseTo(0.11, 10);
  });

  it("opens the gap exactly where the room is, not where the story wants it", () => {
    // Derived both ways and compared. If the roomiest bin ever stopped being a
    // middle bin, the reveal's explanation would be false.
    const roomiest = roomiestBin(data);
    expect(roomiest?.binId).toBe("b5");
    expect(roomiest?.room).toBeCloseTo(0.44, 10);
    const ends = [roomToBound(data, "b1") ?? 0, roomToBound(data, "b10") ?? 0];
    expect((roomiest?.room ?? 0) / Math.max(...ends)).toBeGreaterThan(3);
  });

  it("keeps the end bins the QUIETEST, which is what refutes the noise band", () => {
    // The `buried-in-noise` distractor says the extremes scatter most. They
    // scatter least, and the framing states it so the reader can check.
    const spread = data.bins.map((b) =>
      Math.max(sd(b.id, "new"), sd(b.id, "repeated")),
    );
    expect(Math.max(spread[0], spread[spread.length - 1])).toBeLessThan(
      Math.max(...spread.slice(1, -1)),
    );
    expect(floorAndCeiling.setup.framing.en).toContain(
      "least variable at the two ends",
    );
    expect(floorAndCeiling.setup.framing.en).toContain(".19 to .28");
  });
});

describe("the verdict the reveal turns on", () => {
  it("has the interval on the fitted peak reach 0.50", () => {
    expect(data.peak.at).toBe(0.53);
    expect([data.peak.low, data.peak.high]).toEqual([0.489, 0.593]);
    expect(data.neutralPoint).toBe(0.5);
    expect(peakReachesNeutral(data)).toBe(true);
  });

  it("keeps the peak well inside its own interval, so the claim is not marginal", () => {
    expect(peakOffsetInHalfWidths(data)).toBeLessThan(0.7);
  });

  it("says out loud that the interval leans right rather than straddling evenly", () => {
    // The lean is real and it points slightly TOWARDS the trap, so burying it
    // would be the deck arguing its own case. It is in the reveal body.
    expect(data.peak.at).toBeGreaterThan(data.neutralPoint);
    expect(floorAndCeiling.reveal.body?.en ?? "").toContain(
      "leans a little to the right of 0.50",
    );
    expect(floorAndCeiling.reveal.body?.en ?? "").toContain(
      "does not prove equality",
    );
  });
});

describe("the tallest bar is not the fitted peak, and the puzzle says so", () => {
  it("has them in different bins, which is expected and not an error", () => {
    // Ten bins summarise eighty statements; the quadratic was fitted to all
    // eighty separately. A reader will notice, so this is pinned rather than
    // hoped for.
    const tallest = largestDifference(data);
    expect(tallest?.binId).toBe("b7");
    expect(data.peak.at).toBeLessThan(tallest?.at ?? 0);
    expect(data.peak.high).toBeLessThan(tallest?.at ?? 0);
  });

  it("explains the discrepancy on the beat where it would matter", () => {
    expect(floorAndCeiling.reveal.body?.en ?? "").toContain(
      "61 to 70 per cent bin",
    );
    expect(floorAndCeiling.reveal.body?.en ?? "").toContain("the blunter one");
  });
});

describe("the beats", () => {
  it("shows only the derived difference at the setup", () => {
    expect(floorAndCeiling.setup.initialView.kind).toBe("thedifference");
    // And no arm is held back, because there is nothing to hold back: the
    // setup's curve already uses every observation.
    expect(floorAndCeiling.setup.initialView.groupIds).toBeUndefined();
  });

  it("reveals the two curves the difference was subtracted from", () => {
    expect(floorAndCeiling.reveal.view.kind).toBe("bothcurves");
    const curves = ceilingCurves(data);
    expect(curves.map((c) => c.armId)).toEqual(["new", "repeated"]);
    expect(curves.every((c) => c.points.length === data.bins.length)).toBe(true);
  });

  it("draws both curves against the bounds the lesson is about", () => {
    expect([data.bounds.min, data.bounds.max]).toEqual([0, 1]);
    const [, repeated] = ceilingCurves(data);
    // Nothing in the data reaches a bound, which is the honest picture: the
    // squeeze is a matter of proximity, not of anything actually hitting a wall.
    expect(Math.max(...repeated.points.map((p) => p.y))).toBeLessThan(1);
    expect(Math.min(...repeated.points.map((p) => p.y))).toBeGreaterThan(0);
  });
});

describe("the commit beat stays answerable", () => {
  it("makes the hedge correct, which is what the hedge audit requires here", () => {
    // Three bands assert something about the extremes and the setup chart
    // licenses none of them, so the band that declines to assert is the one a
    // well-reasoning player reaches.
    const correct = floorAndCeiling.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("cannot-tell");
    expect(floorAndCeiling.choices.find((c) => c.isIntuitiveTrap)?.id).toBe(
      "immune",
    );
  });

  it("PINS THE HEDGE: no second band may also decline to assert", () => {
    // If another band ever said "you cannot tell" in different words, a player
    // picking it would be marked wrong for reasoning correctly. That is the
    // failure mode `docs/hedge-audit.md` exists to catch.
    const hedging = floorAndCeiling.choices.filter((c) =>
      /no way to tell|cannot tell|nothing either way|can't tell|impossible to say/i.test(
        `${c.label.en} ${c.sublabel?.en ?? ""}`,
      ),
    );
    expect(hedging.map((c) => c.id)).toEqual(["cannot-tell"]);
  });

  it("gives the reader what they need to reject the two measurement decoys", () => {
    // The noise band is answered by the standard deviations, which the framing
    // prints. The repetitions band asserts something about dose, and nothing on
    // the chart varies dose, so it is an over-claim of the same kind as the
    // trap rather than a reading of the data.
    const framing = floorAndCeiling.setup.framing.en;
    expect(framing).toContain("one true-or-false press");
    expect(framing).toContain("share of people pressing true");
    expect(floorAndCeiling.choices.map((c) => c.id)).toContain("needs-more-repeats");
  });
});

describe("the provenance note carries both honesty items", () => {
  const note = floorAndCeiling.provenance.note?.en ?? "";

  it("records that the two lowest bins came from a different source", () => {
    expect(note).toContain("fewer than 14 per cent");
    expect(note).toContain("492 participants");
    expect(note).toContain("Pennycook, Cannon and Rand (2018)");
  });

  it("records that the comparison is between-subject at the item level", () => {
    expect(note).toContain("between-subject at the item level");
    expect(note).toContain("never both");
  });

  it("records the proportions-as-published exception and both reconciliations", () => {
    expect(note).toContain("prints proportions and no counts");
    expect(note).toContain(".484");
    expect(note).toContain(".523");
    expect(note).toContain("square root of 503");
  });

  it("records the bins-against-model discrepancy rather than leaving it to be found", () => {
    expect(note).toContain("61 to 70 per cent bin");
    expect(note).toContain("51 to 60 per cent bin");
  });

  it("cites the peer-reviewed paper, not a preprint", () => {
    expect(floorAndCeiling.provenance.doi).toBe("10.3758/s13423-019-01651-4");
    expect(floorAndCeiling.provenance.year).toBe(2019);
    expect(floorAndCeiling.provenance.source).toContain(
      "Psychonomic Bulletin and Review",
    );
  });
});

describe("the lesson is its own skill", () => {
  it("is not a second illusory truth puzzle", () => {
    // `illusory-truth` ships the repetition effect itself. This one is about
    // what a bounded measure does to any effect, and repetition is the example.
    expect(floorAndCeiling.reasoningSkill).toBe("floor-and-ceiling");
    expect(floorAndCeiling.lesson.body?.en ?? "").toContain("out of ten");
  });

  it("gives the reader a check to run rather than a name to recite", () => {
    const how = floorAndCeiling.lesson.howItWorks?.en ?? "";
    expect(how).toContain("what the bounds of the outcome are");
    expect(how).toContain("recorded as a category");
    expect(how).toContain("what the ruler could have shown");
  });
});
