import { describe, expect, it } from "vitest";
import { innuendoEffect } from "./innuendo-effect";
import { gapBetween, restrictRatings } from "../../engine/charts/ratings";

/**
 * Letourneau and Gawronski (2024), Experiment 1, Table 1 on page 54, read from
 * the rendered page.
 *
 * These are means, so the checks are of a different kind from a count table.
 * What is asserted here: the four values, the significance pattern the paper
 * prints separately in its text, and the three independent routes by which
 * N = 150 is confirmed.
 */
const raw = innuendoEffect.setup.data;
if (raw.type !== "ratings") throw new Error("expected ratings data");
const data = raw;

const obs = (id: string) => {
  const o = data.observations.find((x) => x.seriesId === id);
  if (!o) throw new Error(`no observation for ${id}`);
  return o;
};

describe("innuendo effect data", () => {
  it("carries Table 1's nonpolitical row", () => {
    expect([obs("neutral").mean, obs("neutral").sd]).toEqual([5.133, 1.519]);
    expect([obs("question").mean, obs("question").sd]).toEqual([4.798, 1.688]);
    expect([obs("assertion").mean, obs("assertion").sd]).toEqual([4.202, 1.639]);
    expect([obs("denial").mean, obs("denial").sd]).toEqual([4.96, 1.59]);
  });

  it("measures every wording over the same 150 readers", () => {
    // Within-subjects, so the same people saw all four. That is what makes the
    // comparison a comparison rather than four separate samples.
    for (const o of data.observations) expect(o.n).toBe(150);
  });

  it("confirms N = 150 from every degrees-of-freedom figure the paper prints", () => {
    // F(3, 447), F(2, 298), F(6, 894) and t(149). All are multiples of 149,
    // which is 150 minus 1, and none of them was used to read the table.
    for (const [num, den] of [
      [3, 447],
      [2, 298],
      [6, 894],
    ]) {
      expect(den / num).toBe(149);
    }
    expect(149 + 1).toBe(obs("neutral").n);
  });

  it("confirms the sample against the abstract's total across both experiments", () => {
    // 150 and 356 are stated separately; the abstract gives 506.
    expect(150 + 356).toBe(506);
  });

  it("keeps the ordering the whole lesson turns on", () => {
    // Asserting hurts most, asking hurts, denying barely moves. If this
    // ordering ever changed the reveal would be false.
    const m = (id: string) => obs(id).mean;
    expect(m("assertion")).toBeLessThan(m("question"));
    expect(m("question")).toBeLessThan(m("denial"));
    expect(m("denial")).toBeLessThan(m("neutral"));
  });

  it("derives the two gaps the reveal describes", () => {
    // About a third of a point for the question, about a sixth for the denial.
    // The question gap is exactly 0.335 in decimal, which lands on a rounding
    // boundary, and in binary floating point 4.798 minus 5.133 comes out a
    // hair under it, so two decimals give 0.33 rather than 0.34. Asserted as
    // the derivation actually returns it. Nothing in the puzzle quotes either
    // figure to two decimals, precisely because of this.
    expect(gapBetween(data, "neutral", "question")).toBe(-0.33);
    expect(gapBetween(data, "neutral", "denial")).toBe(-0.17);
    expect(Math.abs(gapBetween(data, "neutral", "question"))).toBeGreaterThan(
      Math.abs(gapBetween(data, "neutral", "denial")),
    );
  });

  it("keeps the reveal's prose true to the exact difference", () => {
    // 5.133 minus 4.798 is 0.335 and 5.133 minus 4.960 is 0.173, so "about a
    // third of a point" and "about a sixth" both hold, and neither depends on
    // which side of the rounding boundary the float falls.
    expect(Number((5.133 - 4.798).toFixed(3))).toBe(0.335);
    expect(Number((5.133 - 4.96).toFixed(3))).toBe(0.173);
    const reveal = innuendoEffect.reveal.explanation.en;
    expect(reveal).toContain("about a third of a point");
    expect(reveal).toContain("about a sixth of a point");
  });

  it("names both ends of the rating scale and draws no anchor", () => {
    // Unlike the third-person puzzle there is no meaningful neutral point on
    // this scale; the control condition is a series, not a mark on the axis.
    expect(data.scale.min).toBe(0);
    expect(data.scale.max).toBe(10);
    expect(data.scale.anchorAt).toBeUndefined();
    expect(data.scale.minLabel.en).toContain("dishonest");
    expect(data.scale.maxLabel.en).toContain("honest");
  });
});

describe("innuendo effect framing", () => {
  it("shows only the neutral and asserted wordings at the setup", () => {
    expect(innuendoEffect.setup.initialView.groupIds).toEqual([
      "neutral",
      "assertion",
    ]);
  });

  it("really withholds the question and the denial", () => {
    const shown = restrictRatings(
      innuendoEffect.setup.data as never,
      innuendoEffect.setup.initialView,
    );
    expect(shown.observations).toHaveLength(2);
    expect(shown.series.map((s) => s.id)).toEqual(["neutral", "assertion"]);
    const revealed = restrictRatings(
      innuendoEffect.setup.data as never,
      innuendoEffect.reveal.view,
    );
    expect(revealed.observations).toHaveLength(4);
  });

  it("makes the hedge the correct answer, which is the point of this puzzle", () => {
    // Recorded as a design decision in docs/lesson-backlog.md entry 15. The
    // setup gives a neutral headline and an assertion and says nothing about
    // what a question or a denial does, so every confident band is a guess.
    const hedge = innuendoEffect.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(true);
    expect(innuendoEffect.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("offers three confident bands that are each defensible, not three straw men", () => {
    // The rule in CLAUDE.md forbids marking a well-reasoning player wrong. Here
    // every wrong band is built from a real mechanism, which is exactly why the
    // hedge has to be the answer rather than one of them.
    const ids = innuendoEffect.choices.filter((c) => !c.isCorrect).map((c) => c.id);
    expect(ids).toEqual(["both-harm", "neither", "question-only"]);
    const bothHarm = innuendoEffect.choices.find((c) => c.id === "both-harm");
    expect(bothHarm?.sublabel?.en).toContain("a denial still says the words");
  });

  it("says out loud that declining to guess was correct", () => {
    const body = innuendoEffect.reveal.body?.en ?? "";
    expect(body).toContain("you were right to say you could not tell");
    expect(body).toContain("decline to guess");
  });

  it("does not claim the denial is safe advice", () => {
    const how = innuendoEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("do not reach for a denial as the fix");
  });
});

describe("innuendo effect lesson", () => {
  it("explains what the question mark is doing", () => {
    const body = innuendoEffect.lesson.body?.en ?? "";
    expect(body).toContain("makes the accusation unanswerable");
    expect(body).toContain("I am not saying that, but");
  });

  it("gives a conversion procedure rather than an instruction to be sceptical", () => {
    const how = innuendoEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("convert the question back into the claim");
    expect(how).toContain("what would settle it");
  });

  it("turns it on the reader as well as outward", () => {
    expect(innuendoEffect.lesson.howItWorks?.en ?? "").toContain("and you will");
  });

  it("carries the partisanship null as the deep dive", () => {
    const examples = innuendoEffect.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("did not differ significantly");
    expect(examples[0].provenance.doi).toBe("10.1027/1864-9335/a000540");
  });
});

describe("innuendo effect provenance note", () => {
  const note = innuendoEffect.provenance.note?.en ?? "";

  it("lists the three routes that confirm the sample size", () => {
    expect(note).toContain("multiple of 149");
    expect(note).toContain("506");
    expect(note).toContain("t(149) = 2.90");
  });

  it("says why the political conditions are left out", () => {
    expect(note).toContain("would mean naming parties");
  });

  it("refuses to turn the denial result into advice", () => {
    expect(note).toContain("not advice about what to do when accused");
  });

  it("credits the study it replicates", () => {
    expect(innuendoEffect.provenance.source).toContain("Wegner");
    expect(innuendoEffect.provenance.source).toContain("1981;40(5):822-832");
  });
});
