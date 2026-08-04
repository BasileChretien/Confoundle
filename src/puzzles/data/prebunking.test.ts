import { describe, expect, it } from "vitest";
import { prebunking } from "./prebunking";
import { points, restrictRatings } from "../../engine/charts/ratings";

/**
 * Ecker, Lewandowsky and Tang (2010). Figure 1 on page 1091 and Table 1 on page
 * 1092, read off the rendered pages.
 *
 * The figure prints its five means, so nothing is reconstructed. What this file
 * checks instead is the arithmetic that confirms the reading (the paper's two
 * printed degrees of freedom fall out of the design) and the design decisions
 * that could silently rot: the true axis, the absent dispersion, and the fact
 * that the puzzle does not claim the retraction-only gap is a result.
 */
const raw = prebunking.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const mean = (id: string): number => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o.mean;
};

const N_PER_CELL = 25;
const CONDITIONS = 5;
/** Participants dropped from the restricted reanalysis, stated in the text. */
const DROPPED = 32;

describe("prebunking data", () => {
  it("carries the five printed means", () => {
    expect(mean("no-retraction")).toBe(5.06);
    expect(mean("retraction-only")).toBe(4.04);
    expect(mean("general-warning")).toBe(3.36);
    expect(mean("specific-warning")).toBe(2.12);
    expect(mean("alternative")).toBe(2.22);
  });

  it("recovers both printed degrees of freedom from the design", () => {
    // F(1,120) on the full sample and F(1,88) on the restricted one. Neither
    // number was used to pick the means, so this is a check on the reading.
    expect(N_PER_CELL * CONDITIONS - CONDITIONS).toBe(120);
    expect(N_PER_CELL * CONDITIONS - DROPPED - CONDITIONS).toBe(88);
    expect(data.observations.every((o) => o.n === N_PER_CELL)).toBe(true);
  });

  it("uses the scale the measure was actually taken on", () => {
    // The decision recorded in the data file: 0 to 20, not the paper's own
    // 0 to 6, because truncating an axis is what `misleading-axis` is about.
    expect(data.scale.min).toBe(0);
    expect(data.scale.max).toBe(20);
  });

  it("leaves every marker in the lower half, which is the honest picture", () => {
    const positions = points(data).map((p) => p.position);
    expect(Math.max(...positions)).toBeLessThan(0.3);
    expect(Math.min(...positions)).toBeGreaterThan(0.1);
  });

  it("draws no dispersion, because the paper prints none numerically", () => {
    expect(data.observations.every((o) => o.sd === undefined)).toBe(true);
    expect(data.dispersionLabel).toBeUndefined();
  });
});

describe("the finding the puzzle turns on", () => {
  it("has the warning roughly halve reliance without approaching zero", () => {
    const from = mean("retraction-only");
    const to = mean("specific-warning");
    expect(to / from).toBeGreaterThan(0.45);
    expect(to / from).toBeLessThan(0.6);
    // The whole lesson is that it is not zero.
    expect(to).toBeGreaterThan(2);
  });

  it("puts the detailed warning level with the previously known remedy", () => {
    // 2.12 against 2.22. If these ever diverged the reveal's claim that the
    // warning did "about as well" would be false.
    expect(Math.abs(mean("specific-warning") - mean("alternative"))).toBeLessThan(0.2);
  });

  it("keeps the vague warning clearly worse than the detailed one", () => {
    expect(mean("general-warning")).toBeGreaterThan(mean("specific-warning"));
  });

  it("keeps the whole span narrow, which the reveal says out loud", () => {
    const all = data.observations.map((o) => o.mean);
    expect(Math.max(...all)).toBe(5.06);
    expect(Math.min(...all)).toBe(2.12);
    expect(prebunking.reveal.body?.en ?? "").toContain("5.06 down to 2.12");
  });
});

describe("prebunking framing", () => {
  it("shows the retraction-only bar alone at the setup", () => {
    expect(prebunking.setup.initialView.kind).toBe("onerating");
    const shown = points(
      restrictRatings(data, { groupIds: prebunking.setup.initialView.groupIds }),
    );
    expect(shown).toHaveLength(1);
    expect(shown[0].seriesId).toBe("retraction-only");
  });

  it("tells the reader the warning helps, so the question is elimination", () => {
    // Two bands point downward, which the hedge audit forbids unless the
    // framing carries the discriminator. This is it, and it is the paper's
    // own title.
    const framing = prebunking.setup.framing.en;
    expect(framing).toContain("The warning does help");
    expect(framing).toContain("fixes the problem or only shrinks it");
  });

  it("explains what 20 means, or the scale is unreadable", () => {
    expect(prebunking.setup.framing.en).toContain("twenty chances");
    expect(prebunking.setup.framing.en).toContain("0 to 20");
  });

  it("makes the hopeful reading the trap", () => {
    const correct = prebunking.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("halved");
    expect(prebunking.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("eliminated");
  });
});

describe("prebunking lesson", () => {
  it("is not a second continued influence puzzle", () => {
    expect(prebunking.reasoningSkill).toBe("prebunking");
    // The distinguishing feature: this is about a warning given BEFORE.
    expect(prebunking.lesson.body?.en ?? "").toContain("in advance");
  });

  it("says awareness is a discount rather than a shield", () => {
    expect(prebunking.lesson.body?.en ?? "").toContain(
      "awareness is a discount, not a shield",
    );
  });

  it("turns the finding on the deck itself", () => {
    const how = prebunking.lesson.howItWorks?.en ?? "";
    expect(how).toContain("applies to this sentence");
    expect(how).toContain("keep the check external");
  });

  it("still says prebunking is worth doing", () => {
    // Halving an error is a large effect. A lesson that left readers thinking
    // warnings are useless would be wrong about this paper.
    expect(prebunking.lesson.howItWorks?.en ?? "").toContain(
      "prebunking is worth doing",
    );
  });
});

describe("prebunking provenance note", () => {
  const note = prebunking.provenance.note?.en ?? "";

  it("records why the axis is not the paper's own", () => {
    expect(note).toContain("0 to 6");
    expect(note).toContain("misleading-axis");
  });

  it("records why no dispersion is drawn", () => {
    expect(note).toContain("no numeric values for Experiment 1");
  });

  it("refuses to treat the retraction-only gap as a result", () => {
    expect(note).toContain("not statistically significant");
    expect(prebunking.reveal.body?.en ?? "").toContain(
      "not statistically significant",
    );
  });
});
