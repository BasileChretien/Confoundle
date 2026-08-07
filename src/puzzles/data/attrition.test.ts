import { describe, expect, it } from "vitest";
import { attrition } from "./attrition";
import {
  correctionDirection,
  correctionFactor,
  correctionIsClear,
  correctionSize,
  resolvedShare,
  tracedShare,
  unobservedShare,
  unresolvedShare,
} from "../../engine/charts/unseen";

/**
 * Holmes et al. (2018), PLoS Medicine, PMC5766235, read at source through the
 * Europe PMC full-text endpoint.
 *
 * This file checks three separable things. That the printed COUNTS are the
 * printed ones and reproduce the percentages the paper states in prose. That
 * the published ESTIMATES are transcribed rather than computed, and that the
 * card's claim is derived from them rather than asserted. And that the card
 * refuses the arithmetic it most invites, namely rebuilding the correction as
 * a product of two shares.
 */
const raw = attrition.setup.data;
if (raw.type !== "unseen") throw new Error("expected unseen data");
const data = raw;

const body = (): string => {
  const b = attrition.reveal.body?.en;
  if (!b) throw new Error("the reveal must carry a body: the limitations live there");
  return b;
};

describe("the counts as printed, and the prose they have to reproduce", () => {
  it("carries Table 1's four counts", () => {
    expect([data.cohort, data.unobserved, data.traced, data.resolved]).toEqual([
      165464, 28111, 2892, 2163,
    ]);
  });

  it("reproduces the 17 percent lost that the Results section states", () => {
    expect(unobservedShare(data) * 100).toBeCloseTo(17.0, 1);
    expect(attrition.setup.framing.en).toContain("17 percent");
    expect(attrition.setup.framing.en).toContain("28,111");
  });

  it("reproduces the 10 percent traced and the 75 percent resolved", () => {
    expect(tracedShare(data) * 100).toBeCloseTo(10.3, 1);
    expect(resolvedShare(data) * 100).toBeCloseTo(74.8, 1);
  });

  it("leaves a quarter of the traced unresolved, which the card must disclose", () => {
    expect(unresolvedShare(data) * 100).toBeCloseTo(25.2, 1);
    expect(body()).toMatch(/quarter were never found|about a quarter/i);
    expect(body()).toContain("2,163");
    expect(body()).toContain("2,892");
  });
});

describe("the estimates as published", () => {
  it("carries the naive and revised two-year mortality with their intervals", () => {
    expect([data.reported.value, data.reported.ciLow, data.reported.ciHigh]).toEqual([1.9, 1.7, 2.0]);
    expect([data.corrected.value, data.corrected.ciLow, data.corrected.ciHigh]).toEqual([
      7.0, 5.7, 8.4,
    ]);
  });

  it("carries the share of the lost found to have died", () => {
    expect([
      data.foundAmongUnobserved.value,
      data.foundAmongUnobserved.ciLow,
      data.foundAmongUnobserved.ciHigh,
    ]).toEqual([17, 15, 19]);
  });

  it("keeps that share off the estimates axis, because its denominator differs", () => {
    // 17 is a share of the 28,111 lost, not of the 165,464 cohort. Drawing it
    // against an axis that tops out at 10 would be a category error, so the
    // schema must not bound it there and the value must genuinely exceed it.
    expect(data.foundAmongUnobserved.value).toBeGreaterThan(data.axisMax);
  });
});

describe("the finding the card turns on, derived not asserted", () => {
  it("has the correction run upward and clear the reported interval", () => {
    expect(correctionDirection(data)).toBe("up");
    expect(correctionIsClear(data)).toBe(true);
  });

  it("reproduces the nearly fourfold move the headline claims", () => {
    expect(correctionFactor(data)).toBeCloseTo(3.68, 2);
    expect(correctionSize(data)).toBeCloseTo(5.1, 10);
    expect(attrition.reveal.headline.en).toContain("1.9");
    expect(attrition.reveal.headline.en).toContain("7.0");
  });

  it("REFUSES the product that looks like it should rebuild the correction", () => {
    /**
     * The single most likely error this card could make. 17 per cent of the
     * cohort missing, 17 per cent of them dead, reads as though it should
     * reconstruct the correction. It gives 2.9 points against a real 5.1,
     * because the published figure is weighted survival over person-time and
     * not two proportions multiplied. The card must therefore never present
     * the correction as arithmetic on its own counts, and must say so.
     */
    const tempting = unobservedShare(data) * data.foundAmongUnobserved.value;
    // 2.888, which the card rounds to 2.9 when it names the wrong answer.
    expect(tempting).toBeCloseTo(2.9, 1);
    expect(Math.abs(tempting - correctionSize(data))).toBeGreaterThan(2);
    const explanation = attrition.reveal.explanation.en;
    expect(explanation).toMatch(/not 17 percent of 17 percent/i);
    expect(explanation).toContain("2.9");
  });
});

describe("the beats", () => {
  it("shows the records at the setup and holds the correction back", () => {
    expect(attrition.setup.initialView.kind).toBe("asrecorded");
    // Nothing is filtered in this shape, so a beat must not try to.
    expect(attrition.setup.initialView.groupIds).toBeUndefined();
  });

  it("adds the correction at the reveal", () => {
    expect(attrition.reveal.view.kind).toBe("afterlooking");
    expect(attrition.reveal.view.groupIds).toBeUndefined();
  });

  it("keeps exactly one correct answer and marks the intuitive trap", () => {
    expect(attrition.choices.filter((c) => c.isCorrect)).toHaveLength(1);
    expect(attrition.choices.find((c) => c.isCorrect)?.id).toBe("fourfold");
    expect(attrition.choices.filter((c) => c.isIntuitiveTrap)).toHaveLength(1);
    expect(attrition.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("barely");
  });

  it("asks about SIZE in the framing, so the bands do not share a direction", () => {
    /**
     * The hedge audit's requirement. Anyone who thinks about who stops
     * attending an HIV clinic will guess the missing did worse, and three of
     * the four bands agree with them on direction. That is only fair if the
     * framing states the question is how MUCH, which it does, in the same way
     * `statistical-power` pins its own size question.
     */
    const f = attrition.setup.framing.en;
    expect(f).toMatch(/how much that changes/i);
    expect(f).toMatch(/almost anyone would guess they did/i);
    expect(attrition.choices.map((c) => c.id)).toEqual([
      "barely",
      "half-again",
      "fourfold",
      "fell",
    ]);
  });

  it("separates the bands by magnitude, so no two describe the same result", () => {
    // barely (about 1.9), half again (about 3), fourfold (7.0), and a fall.
    // The correct band is the only one naming the published pair.
    const correct = attrition.choices.find((c) => c.id === "fourfold");
    expect(correct?.label.en).toContain("1.9");
    expect(correct?.label.en).toContain("7.0");
    const halfAgain = attrition.choices.find((c) => c.id === "half-again");
    expect(halfAgain?.label.en).toMatch(/3 percent/);
  });
});

describe("what the card must not overclaim", () => {
  it("says on the figure that the estimates are weighted, not sample proportions", () => {
    expect(data.rateNote.en).toMatch(/probability-weighted/i);
    expect(data.rateNote.en).toMatch(/not proportions of the traced sample/i);
  });

  it("does not accuse the programme of falsifying anything", () => {
    const all = [attrition.reveal.explanation.en, body()].join(" ");
    expect(all).toMatch(/nothing was falsified/i);
    expect(all).not.toMatch(/\b(fraud|covered up|concealed)\b/i);
  });

  it("credits the correction to the programme's own investigators", () => {
    expect(body()).toMatch(/the people running the programme/i);
  });

  it("reports the counterintuitive provincial pattern as interpretation, not fact", () => {
    expect(body()).toMatch(/Lusaka/);
    expect(body()).toMatch(/authors' reading|interpretation/i);
  });

  it("states that causes of death were not adjudicated", () => {
    expect(body()).toMatch(/causes of death were not adjudicated/i);
  });

  it("carries provenance with a resolvable identifier", () => {
    expect(attrition.provenance.doi).toBe("10.1371/journal.pmed.1002489");
    expect(attrition.provenance.year).toBe(2018);
  });

  it("records the facility-count inconsistency rather than printing a number", () => {
    const note = attrition.provenance.note?.en ?? "";
    expect(note).toMatch(/32 facilities/);
    expect(note).toMatch(/64 facilities/);

    /**
     * The card itself must not assert either count, since the paper contradicts
     * itself and nothing drawn depends on it.
     *
     * The first version of this guard was `/\b(32|64) facilities\b/`, which is
     * a reintroduction guard for one exact phrase rather than a check that no
     * facility count is printed: it misses "64 clinics", "64 health facilities"
     * and "sixty-four facilities". Widened to a count near any of the words a
     * rewrite would reach for, and self-tested below, because a guard whose
     * blind spots are wider than its coverage is worth less than it looks.
     */
    const COUNTED_SITES =
      /\b(\d[\d,]*|thirty[- ]two|sixty[- ]four)\s+(\w+\s+){0,2}(facilit|clinic|site|centre|center|hospital)/i;

    for (const shouldCatch of [
      "a network of 64 facilities across four provinces",
      "we selected a total of 32 facilities",
      "a network of 64 clinics",
      "64 health facilities in Zambia",
      "sixty-four facilities",
    ])
      expect({ shouldCatch, caught: COUNTED_SITES.test(shouldCatch) }).toEqual({
        shouldCatch,
        caught: true,
      });

    // And it must not fire on the wording the card actually uses.
    for (const shouldPass of [
      "165,464 adults on antiretroviral therapy, followed through the clinics that treat them",
      "in four provinces of Zambia",
      "28,111 patients, 17 percent of the whole cohort",
    ])
      expect({ shouldPass, caught: COUNTED_SITES.test(shouldPass) }).toEqual({
        shouldPass,
        caught: false,
      });

    const surfaces = [attrition.setup.framing.en, attrition.reveal.explanation.en, body()].join(" ");
    expect(surfaces).not.toMatch(COUNTED_SITES);
  });
});

describe("separation from the dropout cards already shipped", () => {
  it("turns on outcomes never observed, not on exclusions from an analysis", () => {
    // `intention-to-treat` (STICH) excludes patients whose outcomes are KNOWN.
    // This card is about outcomes nobody ever saw, and the lesson says so.
    const lesson = attrition.lesson.body?.en ?? "";
    expect(lesson).toMatch(/survivorship bias/i);
    expect(lesson).toMatch(/assembled properly and then leaked/i);
    expect(attrition.reveal.explanation.en).toMatch(/removes people from the group it can count/i);
  });
});
