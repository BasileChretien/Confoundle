import { describe, expect, it } from "vitest";
import { marginOfError } from "./margin-of-error";
import {
  gapMargin,
  gapSize,
  independentSampleMargin,
  marginRatio,
} from "../../engine/charts/intervals";

/**
 * Source reconciliation for the Marist Poll of 1,128 national adults, Super
 * Bowl LIX, read at source off the rendered methodology page and the national
 * tables rather than off the write-up.
 *
 * The poll prints shares and margins and no counts, so there is nothing to
 * reconstruct. What this file checks is that the printed margins reproduce from
 * the printed sample sizes (which is what pins the design effect at one), that
 * every number the puzzle asserts follows from the published figures, and that
 * the answer bands land where the arithmetic puts them.
 */

/** Exactly as printed. */
const PRINTED = {
  adults: 1128,
  adultsMargin: 2.9,
  registeredVoters: 1011,
  registeredVotersMargin: 3.1,
  major: 42,
  minor: 37,
  none: 21,
};

const data = marginOfError.setup.data;
if (data.type !== "interval") throw new Error("expected interval data");

const band = (id: string) => marginOfError.choices.find((c) => c.id === id)!;

describe("the published figures are the ones authored", () => {
  it("carries the three shares as printed and no invented fourth", () => {
    expect(data.options.map((o) => o.percent)).toEqual([
      PRINTED.major,
      PRINTED.minor,
      PRINTED.none,
    ]);
    expect(data.sampleSize).toBe(PRINTED.adults);
    expect(data.publishedMargin).toBe(PRINTED.adultsMargin);
    // The fourth category exists in the source at under 1 per cent. It is named
    // on the figure rather than drawn, so the three drawn shares sum to 100.
    expect(data.options.reduce((s, o) => s + o.percent, 0)).toBe(100);
    expect(data.statNote.en).toContain("no opinion");
  });

  it("pins the design effect at one, from both printed margins", () => {
    // This is the check that makes every derived number on the reveal safe.
    // Marist applies a design effect to some surveys and not others, and the
    // margin on the gap scales with the square root of whichever you assume.
    const implied = (n: number) => 1.96 * 0.5 * Math.sqrt(1 / n) * 100;
    expect(implied(PRINTED.adults)).toBeCloseTo(2.918, 3);
    expect(Math.round(implied(PRINTED.adults) * 10) / 10).toBe(PRINTED.adultsMargin);
    // The registered-voter margin reproduces the same way, which is what turns
    // one lucky rounding into a pattern.
    expect(implied(PRINTED.registeredVoters)).toBeCloseTo(3.082, 3);
    expect(Math.round(implied(PRINTED.registeredVoters) * 10) / 10).toBe(
      PRINTED.registeredVotersMargin,
    );
    expect(data.designEffect).toBeUndefined();
  });
});

describe("the arithmetic the lesson turns on", () => {
  it("derives the five point lead rather than authoring it", () => {
    expect(gapSize(data)).toBe(5);
  });

  it("puts the margin on the lead at 5.18 points, nearly twice the printed one", () => {
    expect(gapMargin(data)).toBeCloseTo(5.179, 3);
    expect(marginRatio(data)).toBeCloseTo(1.786, 3);
  });

  it("leaves the lead short of its own margin, and says how short", () => {
    // 0.18 points of headroom. Small enough that the puzzle must not ask for a
    // significance verdict, which is why the question asks for a width.
    expect(gapMargin(data) - gapSize(data)).toBeCloseTo(0.179, 3);
    expect(gapMargin(data)).toBeGreaterThan(gapSize(data));
    expect(marginOfError.setup.question.en).toContain("How wide");
    expect(marginOfError.setup.question.en).not.toMatch(/significant|real|outside/i);
  });

  it("shows why the verdict would have rested on rounding", () => {
    // The shares are printed as integers, so the true lead is in (4, 6). At the
    // top of that interval it clears the margin, so a puzzle whose correct
    // answer was "not significant" would have been resting on the rounding.
    const at = (major: number, minor: number) =>
      gapMargin({ ...data, options: [
        { ...data.options[0], percent: major },
        { ...data.options[1], percent: minor },
        data.options[2],
      ] });
    expect(at(42.49, 36.5)).toBeLessThan(5.99);
    expect(at(41.5, 37.49)).toBeGreaterThan(4.01);
    // And the reveal states that plainly rather than leaving it out.
    expect(marginOfError.reveal.explanation.en).toContain("between four and six");
  });
});

describe("the answer bands are where the arithmetic puts them", () => {
  it("marks the near-double band correct and nothing else", () => {
    const correct = marginOfError.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("double");
    expect(band("double").label.en).toContain("5.2");
    expect(gapMargin(data)).toBeCloseTo(5.2, 1);
  });

  it("quotes the root two band at the value root two would actually give", () => {
    // The distractor has to be genuinely the answer to a different, reasonable
    // question, or it is just a wrong number.
    expect(independentSampleMargin(data)).toBeCloseTo(4.101, 3);
    expect(band("roottwo").label.en).toContain("4.1");
  });

  it("keeps every band a distinct width, so no two share an answer", () => {
    const widths = ["2.9", "4.1", "5.2", "2.1"];
    marginOfError.choices.forEach((c, i) => {
      expect(c.label.en).toContain(widths[i]);
    });
    expect(new Set(widths).size).toBe(4);
    const traps = marginOfError.choices.filter((c) => c.isIntuitiveTrap);
    expect(traps).toHaveLength(1);
    expect(traps[0].id).toBe("same");
  });

  it("puts the discriminator in the framing, so root two is refusable up front", () => {
    // A player who knows the root two rule for independent samples is reasoning
    // well. The setup has to tell them this is not that case, or the puzzle
    // would be marking good reasoning wrong.
    const framing = marginOfError.setup.framing.en;
    expect(framing).toContain("same 1,128 people");
    expect(framing).toContain("did not also say minor");
  });
});

describe("what the puzzle refuses to claim", () => {
  it("never presents this as a random sample", () => {
    expect(data.statNote.en).toContain("panel");
    expect(JSON.stringify(marginOfError.provenance)).toContain("non-probability");
  });

  it("does not blame the pollster", () => {
    expect(marginOfError.reveal.body!.en).toContain("None of this is a complaint about the pollster");
  });
});
