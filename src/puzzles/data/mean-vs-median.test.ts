import { describe, it, expect } from "vitest";
import { meanVsMedian } from "./mean-vs-median";
import { Puzzle } from "../schema";
import {
  belowRange,
  mostSkewed,
  placementOf,
  restrictDistribution,
  splitOf,
} from "../../engine/charts/distribution";

const data = meanVsMedian.setup.data;
if (data.type !== "distribution") {
  throw new Error("meanVsMedian must use the distribution shape");
}

const group = (id: string) => data.groups.find((g) => g.id === id)!;

/**
 * The load-bearing claims are that EVERY journal has most of its papers below
 * its own mean, and that the reveal's headline share is the derived complement
 * of a printed figure rather than a second authored number.
 */
describe("mean-vs-median seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(meanVsMedian).success).toBe(true);
  });

  it("matches the published Table 2 figures", () => {
    expect(group("science")).toMatchObject({ mean: 34.7, percentBelowMean: 75.5 });
    expect(group("nature")).toMatchObject({ mean: 38.1, percentBelowMean: 74.8 });
    expect(group("plos-genet")).toMatchObject({ mean: 6.7, percentBelowMean: 65.3 });
    expect(data.groups).toHaveLength(11);
  });

  it("keeps every authored share inside the range the paper's prose states", () => {
    // The paper says "typically, 65-75% of the articles have fewer citations
    // than indicated by the JIF", which is an independent restatement of the
    // table inside the same document. Nothing may drift outside it.
    const range = belowRange(data)!;
    expect(range.min).toBe(65.3);
    expect(range.max).toBe(75.5);
    for (const g of data.groups) {
      expect(g.percentBelowMean).toBeGreaterThan(65);
      expect(g.percentBelowMean).toBeLessThan(76);
    }
  });

  it("shows the effect it teaches: in every journal the mean describes a minority", () => {
    for (const g of data.groups) {
      const p = placementOf(g);
      expect(p.below).toBeGreaterThan(0.5);
      expect(p.atOrAbove).toBeLessThan(0.5);
    }
    // And the headline case is the starkest, so the reveal is not cherry-picked
    // from the middle of the pack.
    expect(mostSkewed(data)?.id).toBe("science");
  });

  it("derives the reveal's 'about a quarter' rather than authoring it", () => {
    const s = splitOf(group("science"));
    expect(s.belowPercent).toBe(75.5);
    expect(s.abovePercent).toBe(24.5);
    expect(s.belowPercent + s.abovePercent).toBe(100);
    expect(meanVsMedian.reveal.headline.en).toContain("quarter");
    expect(meanVsMedian.reveal.explanation.en).toContain("75.5");
  });

  it("never states a median, because the source prints none", () => {
    // The source publishes no medians. The puzzle may say the median lies BELOW
    // the mean (a deduction from more than half the papers doing so) but must
    // never put a number on it.
    const prose = [
      meanVsMedian.setup.framing.en,
      meanVsMedian.reveal.explanation.en,
      meanVsMedian.reveal.body?.en ?? "",
      meanVsMedian.lesson.takeaway.en,
      meanVsMedian.lesson.body?.en ?? "",
      meanVsMedian.share.explainer.en,
    ].join(" ");
    expect(prose).not.toMatch(/median (?:of|was|is) \d/i);
    expect(meanVsMedian.reveal.body?.en).toContain("median");
    expect(meanVsMedian.provenance.note?.en).toContain("prints no medians");
  });

  it("declares the preprint status where a reader will meet it", () => {
    // The single biggest honesty risk in this puzzle. It must not be buried in
    // the citation string alone.
    expect(meanVsMedian.provenance.note?.en).toContain("not peer reviewed");
    // ...and the peer-reviewed corroboration must actually be cited.
    const example = meanVsMedian.lesson.examples?.[0];
    expect(example?.provenance.source).toContain("BMJ");
    expect(example?.provenance.year).toBe(1997);
  });

  it("gives the framing both facts the deduction needs", () => {
    // Winnability rests entirely on these. Remove either and "well under half"
    // stops being deducible and the hedge quietly becomes correct.
    const framing = meanVsMedian.setup.framing.en;
    expect(framing).toMatch(/cannot be cited fewer than zero|floor/i);
    expect(framing).toContain("orders of magnitude");
  });

  it("marks the hedge wrong and traps the half-above-half-below intuition", () => {
    const hedge = meanVsMedian.choices.find((c) => c.id === "cannot-tell")!;
    expect(hedge.isCorrect).toBe(false);
    expect(meanVsMedian.choices.find((c) => c.isCorrect)!.id).toBe("well-under-half");
    expect(meanVsMedian.choices.find((c) => c.isIntuitiveTrap)!.id).toBe("about-half");
  });

  it("opens on one journal's mean, then shows all eleven with their spread", () => {
    const setup = restrictDistribution(data, meanVsMedian.setup.initialView);
    expect(setup.groups.map((g) => g.id)).toEqual(["science"]);
    expect(meanVsMedian.setup.initialView.kind).toBe("average");
    expect(restrictDistribution(data, meanVsMedian.reveal.view).groups).toHaveLength(11);
    expect(meanVsMedian.reveal.view.kind).toBe("spread");
  });
});
