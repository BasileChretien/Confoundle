import { describe, expect, it } from "vitest";
import { compositeEndpoints } from "./composite-endpoints";
import {
  forestRows,
  restrictForest,
  rowAt,
  showsBenefit,
  showsHarm,
} from "../../engine/charts/forest";

/**
 * Kip et al. (2008), JACC, read at source on ScienceDirect.
 *
 * Nothing here is recomputed from counts: the source prints adjusted hazard
 * ratios from a Cox model. What this file checks is that the eight authored
 * figures are the printed ones, that the claim the whole card rests on (the two
 * findings TRADE PLACES rather than both moving one way) is DERIVED from which
 * intervals clear the null line, and that the card's limitations are stated
 * rather than assumed.
 */
const raw = compositeEndpoints.setup.data;
if (raw.type !== "forest") throw new Error("expected forest data");
const data = raw;

const COHORT = 6922;
const SAFETY_EVENTS = 362;
const WIDER_EVENTS = 674;

describe("the figures as printed", () => {
  it("carries both safety-definition rows", () => {
    const mi = rowAt(data, "mi-safety");
    const multi = rowAt(data, "multi-safety");
    expect([mi.estimate, mi.ciLow, mi.ciHigh]).toEqual([1.75, 1.31, 2.34]);
    expect([multi.estimate, multi.ciLow, multi.ciHigh]).toEqual([1.06, 0.77, 1.48]);
  });

  it("carries both wider-definition rows", () => {
    const mi = rowAt(data, "mi-wide");
    const multi = rowAt(data, "multi-wide");
    expect([mi.estimate, mi.ciLow, mi.ciHigh]).toEqual([1.2, 0.95, 1.51]);
    expect([multi.estimate, multi.ciLow, multi.ciHigh]).toEqual([1.41, 1.13, 1.75]);
  });

  it("puts the null line at 1, because these are ratios", () => {
    expect(data.nullValue).toBe(1);
    expect(data.higherIsWorse).toBe(true);
  });

  it("carries the cohort and the two event counts in the framing", () => {
    const f = compositeEndpoints.setup.framing.en;
    expect(f).toContain("6,922");
    expect(f).toContain(String(SAFETY_EVENTS));
    expect(f).toContain(String(WIDER_EVENTS));
  });
});

describe("the finding the card turns on, derived not asserted", () => {
  it("has the heart attack finding LOSE its clearance when the definition widens", () => {
    expect(showsHarm(data, "mi-safety")).toBe(true);
    expect(showsHarm(data, "mi-wide")).toBe(false);
    // and specifically because the interval now contains the null
    expect(rowAt(data, "mi-wide").clearsNull).toBe(false);
  });

  it("has the several-lesions finding GAIN clearance when the definition widens", () => {
    expect(showsHarm(data, "multi-safety")).toBe(false);
    expect(rowAt(data, "multi-safety").clearsNull).toBe(false);
    expect(showsHarm(data, "multi-wide")).toBe(true);
  });

  it("THEY TRADE PLACES, which is what makes this card not about dilution", () => {
    // If both rows moved the same way the lesson would be that adding a common
    // component waters things down. The whole point is that they cross.
    const before = ["mi-safety", "multi-safety"].map((id) => showsHarm(data, id));
    const after = ["mi-wide", "multi-wide"].map((id) => showsHarm(data, id));
    expect(before).toEqual([true, false]);
    expect(after).toEqual([false, true]);
  });

  it("reads the ratio direction correctly, since above 1 is harm here", () => {
    // Guards the `higherIsWorse` flag. Without it a hazard ratio of 1.75 would
    // be derived as a BENEFIT and every claim above would invert.
    expect(rowAt(data, "mi-safety").side).toBe("worse");
    expect(showsBenefit(data, "mi-safety")).toBe(false);
  });
});

describe("the commit beat separates on pattern, not on magnitude", () => {
  it("offers four distinct patterns across the two rows", () => {
    expect(compositeEndpoints.choices.map((c) => c.id)).toEqual([
      "both-sharper",
      "both-diluted",
      "they-swap",
      "only-mi",
    ]);
  });

  it("makes the more-events-more-power belief the trap", () => {
    // The paper names this belief itself, which is why it is the trap rather
    // than an invented distractor.
    const trap = compositeEndpoints.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("both-sharper");
    expect(trap?.label.en).toContain("more power");
  });

  it("has exactly one correct band and it is the swap", () => {
    const correct = compositeEndpoints.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("they-swap");
  });

  it("lets exactly ONE band describe both rows moving the same way", () => {
    // `both-sharper` and `both-diluted` are the two same-direction readings and
    // they differ in direction from each other, so no two bands share a pattern.
    const sameDirection = compositeEndpoints.choices.filter((c) =>
      /^Both /.test(c.label.en),
    );
    expect(sameDirection.map((c) => c.id)).toEqual(["both-sharper", "both-diluted"]);
    expect(sameDirection.every((c) => !c.isCorrect)).toBe(true);
  });

  it("tells the reader what the added component IS and that it is commoner", () => {
    // Without both facts the swap is unguessable rather than hard.
    const f = compositeEndpoints.setup.framing.en;
    expect(f).toContain("repeat revascularisation");
    expect(f).toContain("much more common");
  });
});

describe("the beats", () => {
  it("shows only the safety-definition rows at the setup", () => {
    expect(compositeEndpoints.setup.initialView.kind).toBe("whatisknown");
    const shown = restrictForest(data, {
      groupIds: compositeEndpoints.setup.initialView.groupIds,
    });
    expect(shown.rows.map((r) => r.id)).toEqual(["mi-safety", "multi-safety"]);
  });

  it("adds the two wider rows at the reveal", () => {
    expect(compositeEndpoints.reveal.view.kind).toBe("themissingrow");
    expect(compositeEndpoints.reveal.view.groupIds).toBeUndefined();
    expect(data.rows).toHaveLength(4);
  });

  it("KEEPS EVERY DRAWN ROW THE SAME COLOUR ACROSS BOTH BEATS", () => {
    const shownAtSetup = compositeEndpoints.setup.initialView.groupIds ?? [];
    const restricted = restrictForest(data, { groupIds: shownAtSetup });
    for (const id of shownAtSetup)
      expect({ id, i: restricted.rows.findIndex((r) => r.id === id) }).toEqual({
        id,
        i: data.rows.findIndex((r) => r.id === id),
      });
  });

  it("keeps one axis and one null line across the beats", () => {
    const restricted = restrictForest(data, {
      groupIds: compositeEndpoints.setup.initialView.groupIds,
    });
    expect([restricted.axisMin, restricted.axisMax, restricted.nullValue]).toEqual([
      data.axisMin,
      data.axisMax,
      data.nullValue,
    ]);
  });

  it("marks no row as pooled, because none of these pools the others", () => {
    expect(forestRows(data).every((r) => !r.isPooled)).toBe(true);
  });
});

describe("the honesty items", () => {
  const note = compositeEndpoints.provenance.note?.en ?? "";

  it("says it is a registry and not a trial, in the note AND in a beat", () => {
    expect(note).toContain("not a randomised trial");
    expect(compositeEndpoints.reveal.body?.en ?? "").toContain("not a randomised trial");
  });

  it("explains why the card's claim survives the registry design", () => {
    // The specific reason: both definitions ran on the same people under the
    // same adjustment, so residual confounding is identical in both rows.
    expect(note).toContain("cannot be what makes them differ");
  });

  it("discloses the industry funding", () => {
    expect(note).toContain("Cordis");
  });

  it("records why the third definition is quoted but not drawn", () => {
    expect(note).toContain("no corresponding figure");
    expect(compositeEndpoints.reveal.body?.en ?? "").toContain("868");
  });

  it("says the counts beside rows are cohort-wide, matching the metric label", () => {
    expect(note).toContain("cohort-wide totals");
    expect(data.metricLabel.en).toContain("across the whole cohort");
    expect(rowAt(data, "mi-safety").k).toBe(SAFETY_EVENTS);
    expect(rowAt(data, "multi-wide").k).toBe(WIDER_EVENTS);
  });

  it("keeps the cohort figure consistent between framing and source", () => {
    expect(compositeEndpoints.provenance.source).toContain(COHORT.toLocaleString("en-US"));
  });
});
