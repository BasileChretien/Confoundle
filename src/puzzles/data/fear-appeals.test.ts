import { describe, expect, it } from "vitest";
import { fearAppeals } from "./fear-appeals";
import {
  forestRows,
  intervalsDisjoint,
  restrictForest,
  rowAt,
  showsBenefit,
  showsHarm,
  timesTheEffect,
  totalK,
  weightedMean,
} from "../../engine/charts/forest";

/**
 * Tannenbaum et al. (2015), Psychological Bulletin, read at source from the
 * Europe PMC full text.
 *
 * Nothing here is recomputed from counts, because the source publishes
 * random-effects pooled estimates and not sums. What this file checks is that
 * the authored figures are the printed ones, that the three rows are consistent
 * with each other by an independent route, and that the claim the whole card
 * rests on, that the missing row never touches zero, is DERIVED rather than
 * asserted anywhere in the prose.
 */
const raw = fearAppeals.setup.data;
if (raw.type !== "forest") throw new Error("expected forest data");
const data = raw;

/** Printed in the paper, used only to reconcile against. */
const TOTAL_SAMPLES = 248;
const TOTAL_PEOPLE = "27,372";
const CLASSIFIED_ON_EFFICACY = 246;

describe("Table 5 and the Results text, as printed", () => {
  it("carries the overall pooled estimate and its interval", () => {
    const r = rowAt(data, "overall");
    expect([r.estimate, r.ciLow, r.ciHigh, r.k]).toEqual([0.29, 0.22, 0.35, TOTAL_SAMPLES]);
  });

  it("carries both efficacy subgroups", () => {
    const withAdvice = rowAt(data, "with-advice");
    const without = rowAt(data, "without-advice");
    expect([withAdvice.estimate, withAdvice.ciLow, withAdvice.ciHigh, withAdvice.k]).toEqual([
      0.43, 0.31, 0.55, 92,
    ]);
    expect([without.estimate, without.ciLow, without.ciHigh, without.k]).toEqual([
      0.21, 0.13, 0.29, 154,
    ]);
  });

  it("puts the paper's own sign convention on the figure", () => {
    expect(data.nullValue).toBe(0);
    expect(data.worseLabel.en).toContain("Backfired");
    expect(data.betterLabel.en).toBe("Worked");
  });

  it("names the sample the framing quotes", () => {
    expect(fearAppeals.setup.framing.en).toContain(TOTAL_PEOPLE);
    expect(fearAppeals.setup.framing.en).toContain("248");
  });
});

describe("the finding the puzzle turns on, derived not asserted", () => {
  it("has the missing row entirely clear of zero", () => {
    // The single check the whole card rests on. If this ever failed, the
    // headline would be false.
    expect(showsBenefit(data, "without-advice")).toBe(true);
    expect(showsHarm(data, "without-advice")).toBe(false);
    expect(rowAt(data, "without-advice").ciLow).toBeGreaterThan(data.nullValue);
  });

  it("has NO row anywhere on the card showing harm", () => {
    // "There are no identified circumstances under which they backfire."
    expect(forestRows(data).filter((r) => showsHarm(data, r.id))).toEqual([]);
  });

  it("makes advice worth roughly double, which is what the reveal claims", () => {
    const ratio = timesTheEffect(data, "with-advice", "without-advice");
    expect(Number(ratio.toFixed(3))).toBe(2.048);
    expect(fearAppeals.reveal.explanation.en).toContain("roughly doubles");
  });

  it("keeps the two subgroup intervals disjoint, so the gap is visible", () => {
    // .31 to .55 against .13 to .29: they do not touch, so a reader does not
    // have to take the point estimates on trust.
    expect(intervalsDisjoint(data, "with-advice", "without-advice")).toBe(true);
  });
});

describe("the reconciliation, which is a check and not an identity", () => {
  it("sums the two subgroups to 246 against a printed 248, and says so", () => {
    expect(totalK(data, ["with-advice", "without-advice"])).toBe(CLASSIFIED_ON_EFFICACY);
    expect(rowAt(data, "overall").k - CLASSIFIED_ON_EFFICACY).toBe(2);
    expect(fearAppeals.provenance.note?.en ?? "").toContain("two samples are unclassified");
  });

  it("lands the k-weighted subgroup mean next to the printed overall", () => {
    const approx = weightedMean(data, ["with-advice", "without-advice"]);
    expect(Number(approx.toFixed(3))).toBe(0.292);
    expect(Math.abs(approx - rowAt(data, "overall").estimate)).toBeLessThan(0.01);
    // And is never presented as exact.
    expect(fearAppeals.provenance.note?.en ?? "").toContain("NOT presented as exact");
  });
});

describe("the commit beat is answerable, which is what clears the hedge audit", () => {
  /**
   * Every wrong band must be arithmetically incompatible with the two figures
   * the framing prints. This is the test that would have caught the failure
   * review found on the previous puzzle, where two bands shared the direction
   * the setup licensed and nothing separated them.
   */
  const impliedOverall = (missingRowValue: number) =>
    (92 * 0.43 + 154 * missingRowValue) / CLASSIFIED_ON_EFFICACY;

  it("reproduces the printed overall ONLY at the correct band's value", () => {
    expect(Number(impliedOverall(0.21).toFixed(2))).toBe(0.29);
  });

  it("excludes every wrong band by the arithmetic the framing supplies", () => {
    // backfired, at any negative value; nothing, at zero; same, at 0.43.
    for (const wrong of [-0.2, 0, 0.43])
      expect(Math.abs(impliedOverall(wrong) - 0.29)).toBeGreaterThan(0.1);
  });

  it("gives the reader both figures the arithmetic needs", () => {
    const framing = fearAppeals.setup.framing.en;
    expect(framing).toContain("0.29");
    expect(framing).toContain("0.43");
    expect(framing).toContain("92");
    expect(framing).toContain("154");
  });

  it("makes the famous objection the trap and exactly one band correct", () => {
    const correct = fearAppeals.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("weaker");
    expect(fearAppeals.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("backfired");
  });

  it("puts exactly ONE band on the harmful side of zero", () => {
    // The licensed dimension here is the SIGN, so only one band may claim it.
    const negative = fearAppeals.choices.filter((c) => /below zero/i.test(c.label.en));
    expect(negative.map((c) => c.id)).toEqual(["backfired"]);
    expect(negative[0].isCorrect).toBe(false);
  });

  it("ALLOWS the null band, because here asserting a null is the error", () => {
    // Other puzzles in this deck forbid a band that asserts a null. This one
    // requires it: the paper's weak hypothesis predicts "less positive or null"
    // effects, so "at zero" is a genuine rival reading that the arithmetic in
    // the framing rules out. It is a distractor, never the answer.
    const nullBand = fearAppeals.choices.find((c) => c.id === "nothing");
    expect(nullBand?.isCorrect).toBe(false);
    expect(nullBand?.label.en).toContain("At zero");
  });
});

describe("the beats", () => {
  it("shows the pooled row and the with-advice row at the setup", () => {
    expect(fearAppeals.setup.initialView.kind).toBe("whatisknown");
    const shown = restrictForest(data, { groupIds: fearAppeals.setup.initialView.groupIds });
    expect(shown.rows.map((r) => r.id)).toEqual(["overall", "with-advice"]);
  });

  it("adds exactly one row at the reveal", () => {
    expect(fearAppeals.reveal.view.kind).toBe("themissingrow");
    expect(fearAppeals.reveal.view.groupIds).toBeUndefined();
    expect(data.rows).toHaveLength(3);
    expect(data.rows[2].id).toBe("without-advice");
  });

  it("KEEPS EVERY DRAWN ROW THE SAME COLOUR ACROSS BOTH BEATS", () => {
    // ForestView colours by index into the array it is handed, and it is handed
    // the RESTRICTED data, so the rows drawn at the setup must lead the array
    // or one of them changes colour when the third arrives.
    const shownAtSetup = fearAppeals.setup.initialView.groupIds ?? [];
    const restricted = restrictForest(data, { groupIds: shownAtSetup });
    for (const id of shownAtSetup)
      expect({ id, i: restricted.rows.findIndex((r) => r.id === id) }).toEqual({
        id,
        i: data.rows.findIndex((r) => r.id === id),
      });
  });

  it("keeps the axis and the null line identical across the beats", () => {
    // Rescaling between beats would make the added row incomparable to the two
    // the reader has already looked at.
    const restricted = restrictForest(data, {
      groupIds: fearAppeals.setup.initialView.groupIds,
    });
    expect([restricted.axisMin, restricted.axisMax, restricted.nullValue]).toEqual([
      data.axisMin,
      data.axisMax,
      data.nullValue,
    ]);
  });

  it("marks only the row that pools the others", () => {
    expect(forestRows(data).filter((r) => r.isPooled).map((r) => r.id)).toEqual(["overall"]);
  });
});

describe("the honesty items", () => {
  const note = fearAppeals.provenance.note?.en ?? "";

  it("records that the behaviour-only interval does include zero", () => {
    // The one figure that could embarrass this card if quoted selectively.
    expect(note).toContain("d = .14");
    expect(note).toContain("[-.05, .33]");
  });

  it("refuses to lean on the curvilinear null", () => {
    expect(note).toContain("straddles zero");
    expect(fearAppeals.reveal.body?.en ?? "").toContain("wide nothing");
    // And it appears nowhere in the answer key.
    for (const c of fearAppeals.choices) expect(c.label.en).not.toContain("-0.05");
  });

  it("records how the paper was actually reached", () => {
    expect(note).toContain("author manuscript");
    expect(note).toContain("bot check that was not worked around");
  });

  it("quotes the paper's own two rival hypotheses in the source field", () => {
    expect(fearAppeals.provenance.source).toContain("will backfire");
    expect(fearAppeals.provenance.source).toContain("disconfirm the strong efficacy hypothesis");
  });
});
