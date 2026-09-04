import { describe, expect, it } from "vitest";
import { nonInferiority } from "./non-inferiority";
import {
  apparentChange,
  armRate,
  boundTowardMargin,
  crossesNull,
  impliedRatio,
  meetsNonInferiority,
  showsSuperiority,
  verdict,
  worseIsAbove,
  zones,
} from "../../engine/charts/noninferiority";

/**
 * MASAI, Lancet 2026;407(10527):505-514, read at source.
 *
 * The counts are authored and everything else is derived, so this file checks
 * that the authored figures are the printed ones, that the card's claim (the
 * trial established non-inferiority and NOT a reduction) falls out of the
 * numbers rather than being asserted in prose, and that the commit beat is
 * answerable from the framing alone.
 */
const raw = nonInferiority.setup.data;
if (raw.type !== "noninferiority") throw new Error("expected noninferiority data");
const data = raw;

describe("the figures as printed", () => {
  it("carries both arms as counts", () => {
    expect([data.intervention.events, data.intervention.n]).toEqual([82, 53043]);
    expect([data.control.events, data.control.n]).toEqual([93, 52872]);
  });

  it("carries the published ratio, its interval and its p value", () => {
    expect([data.estimate, data.ciLow, data.ciHigh]).toEqual([0.88, 0.65, 1.18]);
    expect(data.pLabel?.en).toContain("0.41");
  });

  it("puts the null at 1 and the margin at 1.20, because these are ratios", () => {
    expect(data.nullValue).toBe(1);
    expect(data.margin).toBe(1.2);
  });

  /** The rates the paper prints, recovered from the counts the card authors. */
  it("derives 1.55 and 1.76 per 1000 from the counts", () => {
    const round = (x: number) => Math.round(x * 100) / 100;
    expect(round(armRate(data.intervention, data.per))).toBe(1.55);
    expect(round(armRate(data.control, data.per))).toBe(1.76);
  });

  it("derives the 0.88 the paper prints from those same counts", () => {
    expect(Math.round(impliedRatio(data)! * 100) / 100).toBe(0.88);
  });

  it("derives the 12 per cent the release quotes", () => {
    expect(Math.round(apparentChange(data) * 100)).toBe(12);
  });
});

describe("what the trial established, derived and not asserted", () => {
  it("met non-inferiority, because 1.18 falls below the margin", () => {
    expect(boundTowardMargin(data)).toBe(1.18);
    expect(meetsNonInferiority(data)).toBe(true);
  });

  it("SHOWED NO REDUCTION, because the interval contains no difference", () => {
    // The whole card. If this ever came out true the puzzle would be teaching
    // the opposite of what its own reveal says.
    expect(crossesNull(data)).toBe(true);
    expect(showsSuperiority(data)).toBe(false);
    expect(verdict(data)).toBe("noninferior");
  });

  it("reads the axis with worse above the null, since these are cancers", () => {
    // Guards the direction. With the margin below the null every claim above
    // would invert, and this is a count of a bad outcome.
    expect(worseIsAbove(data)).toBe(true);
    expect(zones(data).map((z) => z.kind)).toEqual([
      "superior",
      "noninferior",
      "inferior",
    ]);
  });

  it("puts the interval's own ends either side of the null", () => {
    // Not the same as `crossesNull`, which a single degenerate interval could
    // satisfy. Both of these are what makes the reveal's sentence true: the
    // data are compatible with a large benefit AND with harm.
    expect(data.ciLow).toBeLessThan(data.nullValue);
    expect(data.ciHigh).toBeGreaterThan(data.nullValue);
  });
});

describe("the commit beat is answerable before the reveal", () => {
  /**
   * THE HEDGE RULE, which for this card lives entirely in the framing. The
   * reveal draws the confidence interval, so if the framing did not state the
   * design and the margin the only defensible answer would be that there is no
   * way to tell, and the reveal would be an ambush.
   */
  it("states the design and the margin in the framing", () => {
    const f = nonInferiority.setup.framing.en;
    expect(f).toContain("non-inferiority");
    expect(f).toContain("20 per cent");
    expect(f).toContain("before it began");
  });

  it("says what an interval cancer is, so the outcome is not a guess", () => {
    expect(nonInferiority.setup.framing.en).toContain("between screening rounds");
  });

  /**
   * Randomised and analysed are different numbers and the first draft used the
   * second one for both. 105,934 were assigned, 19 were excluded, 105,915 were
   * analysed, and the arm counts on the figure add to the analysed total.
   */
  it("keeps randomised and analysed apart, and adds up", () => {
    const f = nonInferiority.setup.framing.en;
    expect(f).toContain("105,934");
    expect(f).toContain("all but 19");
    expect(data.intervention.n + data.control.n).toBe(105934 - 19);
  });

  it("has exactly one correct band, and it is the bounded claim", () => {
    const correct = nonInferiority.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0]!.id).toBe("not-worse");
  });

  it("makes reading the point estimate as the finding the trap", () => {
    const trap = nonInferiority.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("twelve-per-cent");
    expect(trap?.label.en).toContain("12 per cent");
  });

  /**
   * Two bands claim a reduction and both are wrong the same way, which is
   * allowed. What the rule forbids is two bands a well-reasoning player could
   * both defend, and with p at 0.41 no band except the third can be.
   */
  it("leaves only one band on the ground the design can actually reach", () => {
    const claimsReduction = nonInferiority.choices.filter((c) =>
      /cut (interval cancers|them)/.test(c.label.en),
    );
    expect(claimsReduction.map((c) => c.id)).toEqual([
      "twelve-per-cent",
      "some-reduction",
    ]);
    expect(claimsReduction.every((c) => !c.isCorrect)).toBe(true);
  });

  it("keeps sensitivity out of the bands, where it would be defensible", () => {
    // The trial's genuinely significant finding. A band naming it would be a
    // second correct answer, which is the failure `docs/hedge-audit.md` is
    // about. It belongs in the lesson, and that is where it is.
    const bands = nonInferiority.choices.map((c) => `${c.label.en} ${c.sublabel?.en ?? ""}`);
    expect(bands.some((b) => /sensitivit/i.test(b))).toBe(false);
    expect(nonInferiority.lesson.examples?.[0]?.summary.en).toContain("80.5");
  });
});

describe("the beats", () => {
  it("opens on the estimate as it was announced", () => {
    expect(nonInferiority.setup.initialView.kind).toBe("asclaimed");
  });

  it("brings in the margin at the reveal", () => {
    expect(nonInferiority.reveal.view.kind).toBe("againstmargin");
  });

  it("says in the reveal what the interval actually spans", () => {
    const h = nonInferiority.reveal.headline.en;
    expect(h).toContain("35 per cent");
    expect(h).toContain("18 per cent");
    expect(h).toContain("1.18");
    expect(h).toContain("1.20");
  });

  /** Both ends of the interval, read back off the authored numbers. */
  it("has those two percentages match the authored interval", () => {
    expect(Math.round((1 - data.ciLow) * 100)).toBe(35);
    expect(Math.round((data.ciHigh - 1) * 100)).toBe(18);
  });
});

describe("the honesty items", () => {
  it("names the trial's public funding rather than implying the vendor paid", () => {
    // The press release is the company's; the trial is not. Getting this
    // backwards was one of the two factual errors the sourcing pass caught.
    const s = nonInferiority.provenance.source;
    expect(s).toContain("Swedish Cancer Society");
    expect(s).not.toMatch(/funded by ScreenPoint/i);
  });

  it("records the margin in the provenance, not only in the prose", () => {
    expect(nonInferiority.provenance.source).toContain("margin of 1.20");
    expect(nonInferiority.provenance.source).toContain("p=0.41");
  });

  it("says the trial is not a failure, so the card teaches reading and not cynicism", () => {
    expect(nonInferiority.reveal.body?.en ?? "").toContain("not a failure");
  });

  it("carries the sensitivity result with its own citation", () => {
    const ex = nonInferiority.lesson.examples?.[0];
    expect(ex?.summary.en).toContain("73.8");
    expect(ex?.summary.en).toContain("0.031");
    expect(ex?.provenance?.source ?? "").toContain("specificity 98.5%");
  });

  it("warns about biocreep, which is the failure mode a single card cannot show", () => {
    expect(nonInferiority.lesson.howItWorks?.en ?? "").toContain("biocreep");
  });
});
