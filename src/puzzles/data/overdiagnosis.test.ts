import { describe, expect, it } from "vitest";
import { overdiagnosis } from "./overdiagnosis";
import {
  differenceOn,
  overlappingRows,
  pairAt,
  relativeExcessOn,
  restrictYield,
  separatedOn,
  separatedRows,
} from "../../engine/charts/yield";

/**
 * Schilling et al. (2021), JNCI Cancer Spectrum, PMC8259619, read at source
 * through the Europe PMC full-text endpoint together with the supplementary
 * PDF.
 *
 * Nothing here is recomputed from counts: the paper prints cumulative rates per
 * 100,000 births with 95 per cent intervals, and prints no birth denominators
 * anywhere. What this file checks is that the six authored figures are the
 * printed ones, that the claim the whole card rests on (the programme found a
 * great deal more disease while the metastatic rate and the death rate did NOT
 * move) is DERIVED from which intervals separate rather than asserted in prose,
 * and that the card's limitations are stated rather than assumed.
 *
 * The counts below are the supplement's, and they are here because they are the
 * evidence that the paper's own Results section misassigns two of them. They
 * are not drawn on the card.
 */
const raw = overdiagnosis.setup.data;
if (raw.type !== "yield") throw new Error("expected yield data");
const data = raw;

/** Supplementary Figures 1 and 2, patient counts aged 12 to 71 months. */
const SCREENED = { stages13: 219, stage4: 133, all: 352 };
const CONTROL = { stages13: 84, stage4: 105, all: 189 };

/**
 * `body` is optional on both beats in the schema. These accessors THROW rather
 * than defaulting to an empty string, because every check below is a
 * prohibition on what the prose may say, and a silent "" would pass all of them
 * by having no prose at all.
 */
const revealBody = (): string => {
  const b = overdiagnosis.reveal.body?.en;
  if (!b) throw new Error("the reveal must carry a body: the caveats live there");
  return b;
};
const lessonBody = (): string => {
  const b = overdiagnosis.lesson.body?.en;
  if (!b) throw new Error("the lesson must carry a body: it separates the three screening biases");
  return b;
};

describe("the rates as printed", () => {
  it("carries all-neuroblastoma incidence for both areas", () => {
    const p = pairAt(data, "any");
    expect(p.values.map((v) => [v.rate, v.ciLow, v.ciHigh])).toEqual([
      [13.4, 12.2, 14.6],
      [9.3, 8.2, 10.3],
    ]);
  });

  it("carries stage 4 incidence for both areas, identical to a decimal place", () => {
    const p = pairAt(data, "stage4");
    expect(p.values.map((v) => [v.rate, v.ciLow, v.ciHigh])).toEqual([
      [5.0, 4.3, 5.7],
      [5.0, 4.2, 5.8],
    ]);
  });

  it("carries ten-year mortality for both areas", () => {
    const p = pairAt(data, "died");
    expect(p.values.map((v) => [v.rate, v.ciLow, v.ciHigh])).toEqual([
      [3.5, 2.9, 4.1],
      [3.8, 3.1, 4.5],
    ]);
  });

  it("names the screened area first on every row, so the sign of every gap means one thing", () => {
    expect(data.arms.map((a) => a.id)).toEqual(["screened", "control"]);
    for (const p of [pairAt(data, "any"), pairAt(data, "stage4"), pairAt(data, "died")])
      expect(p.values.map((v) => v.armId)).toEqual(["screened", "control"]);
  });
});

describe("the finding the card turns on, derived not asserted", () => {
  it("separates the two areas on how much disease was found", () => {
    expect(separatedOn(data, "any")).toBe(true);
    expect(differenceOn(data, "any")).toBeCloseTo(4.1, 10);
  });

  it("reproduces the 44 percent excess quoted in the framing", () => {
    // The paper states the screening area is "44.1% higher" than the control.
    expect(relativeExcessOn(data, "any") * 100).toBeCloseTo(44.1, 1);
    expect(overdiagnosis.setup.framing.en).toContain("44 percent");
  });

  it("does NOT separate them on metastatic disease or on death", () => {
    expect(separatedRows(data)).toEqual(["any"]);
    expect(overlappingRows(data)).toEqual(["stage4", "died"]);
  });

  it("has stage 4 identical, which is what makes the commit beat answerable", () => {
    expect(differenceOn(data, "stage4")).toBe(0);
  });

  it("has a mortality gap the trial cannot separate, pointing slightly the screened way", () => {
    // This is the fact the card's wording has to respect, and an earlier
    // comment here got it backwards. The difference is NEGATIVE, which means
    // the screened area's point estimate is the LOWER of the two: 3.5 against
    // 3.8. So the rates are not equal, and they do not favour the control area
    // either. What the overlapping intervals establish is that this trial found
    // no reduction, which is a weaker claim than either.
    expect(differenceOn(data, "died")).toBeCloseTo(-0.3, 10);
    expect(separatedOn(data, "died")).toBe(false);
  });
});

describe("the beats", () => {
  it("shows the incidence and stage 4 rows at the setup, and holds mortality back", () => {
    const view = overdiagnosis.setup.initialView;
    expect(view.kind).toBe("whatitfound");
    expect(view.groupIds).toEqual(["any", "stage4"]);
    const shown = restrictYield(data, { groupIds: view.groupIds });
    expect(shown.rows.map((r) => r.id)).toEqual(["any", "stage4"]);
  });

  it("adds the mortality row at the reveal without moving the scale", () => {
    expect(overdiagnosis.reveal.view.kind).toBe("whatitchanged");
    expect(overdiagnosis.reveal.view.groupIds).toBeUndefined();
    const setup = restrictYield(data, { groupIds: overdiagnosis.setup.initialView.groupIds });
    expect(setup.axisMax).toBe(data.axisMax);
  });

  it("gives the setup a row that separates and one that does not, so the question is real", () => {
    const setup = restrictYield(data, { groupIds: overdiagnosis.setup.initialView.groupIds });
    expect(separatedRows(setup)).toEqual(["any"]);
    expect(overlappingRows(setup)).toEqual(["stage4"]);
  });

  it("keeps exactly one correct answer and marks the intuitive trap", () => {
    expect(overdiagnosis.choices.filter((c) => c.isCorrect)).toHaveLength(1);
    expect(overdiagnosis.choices.find((c) => c.isCorrect)?.id).toBe("no-detectable-reduction");
    expect(overdiagnosis.choices.filter((c) => c.isIntuitiveTrap)).toHaveLength(1);
    expect(overdiagnosis.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("halved");
  });

  it("offers four distinct readings rather than four guesses at one number", () => {
    expect(overdiagnosis.choices.map((c) => c.id)).toEqual([
      "halved",
      "fell-substantially",
      "no-detectable-reduction",
      "rose",
    ]);
  });

  it("does not let a wrong band be satisfied by the printed numbers", () => {
    // The trap this catches is the nastiest one in the hedge audit: a distractor
    // that is ALSO right. The screened area's mortality point estimate is the
    // lower of the two, so any band claiming merely that deaths fell somewhat is
    // consistent with the figures on screen and would mark a careful reader
    // wrong. The surviving fall-band must therefore carry a magnitude the data
    // refutes, and it is sized against the 44 per cent excess.
    const fall = overdiagnosis.choices.find((c) => c.id === "fell-substantially");
    expect(fall?.isCorrect).toBe(false);
    expect(fall?.label.en).toMatch(/substantially/);
    expect(fall?.label.en).toMatch(/44 percent/);
    // A 3.8 to 3.5 move is an 8 per cent relative fall, nowhere near "in step
    // with" a 44 per cent excess, which is what makes the band refutable.
    const relative = Math.abs(differenceOn(data, "died")) / 3.8;
    expect(relative).toBeLessThan(0.1);
    expect(relativeExcessOn(data, "any")).toBeGreaterThan(0.4);
  });
});

describe("the supplement's counts, and the discrepancy they expose", () => {
  it("has the stage counts sum to the all-stages total in both areas", () => {
    expect(SCREENED.stages13 + SCREENED.stage4).toBe(SCREENED.all);
    expect(CONTROL.stages13 + CONTROL.stage4).toBe(CONTROL.all);
  });

  it("reproduces the all-stages totals from the per-birth-year averages", () => {
    // Supplementary Table 4: 58.7 and 31.5 cases per birth year, six birth
    // years 1994 to 1999. This is the third independent route to 352 and 189.
    expect(58.7 * 6).toBeCloseTo(SCREENED.all, 0);
    expect(31.5 * 6).toBeCloseTo(CONTROL.all, 0);
  });

  it("confirms 133 and not 219 is the stage 4 count, from the published survival", () => {
    // The Results section says 80 of the screening area's stage 4 patients
    // died, and Supplementary Figure 2 gives their ten-year overall survival as
    // 40.6 per cent. Only one of the two candidate denominators is consistent
    // with that, which is what settles the misassignment.
    const survivalIf = (n: number) => ((n - 80) / n) * 100;
    // 133 lands within a point of the published 40.6; 219 misses it by 23.
    expect(Math.abs(survivalIf(SCREENED.stage4) - 40.6)).toBeLessThan(1);
    expect(Math.abs(survivalIf(219) - 40.6)).toBeGreaterThan(20);
  });

  it("records the discrepancy in the provenance note rather than silently fixing it", () => {
    const note = overdiagnosis.provenance.note?.en ?? "";
    expect(note).toContain("352");
    expect(note).toContain("219");
    expect(note).toContain("133");
  });
});

describe("what the card must not overclaim", () => {
  it("says on the figure that the areas were not randomised", () => {
    expect(data.rateNote.en).toContain("not randomised");
  });

  it("states the participation rate somewhere the player reads it", () => {
    expect(overdiagnosis.setup.framing.en).toContain("61 percent");
  });

  it("refuses the claim that screening killed children, and says why", () => {
    const body = revealBody();
    expect(body).toContain("did not notably increase");
    // The claim has to be DENIED on the card, not merely left unsaid: a reader
    // who has just learned the extra children were treated for nothing will
    // reach for it on their own, so the card meets it head on.
    expect(body).toMatch(/does not show that the screening killed/i);
    // And the 4-against-0 toxic deaths must never appear without the pre-study
    // rate that defuses them.
    expect(body).toContain("101 patients");
  });

  it("reports the subgroup that may have benefited rather than burying it", () => {
    const body = revealBody();
    expect(body).toContain("Eighteen");
    expect(body).toContain("94");
  });

  it("never says the two mortality rates were EQUAL, anywhere a player reads", () => {
    /**
     * This replaces a guard that was too narrow to do its job. The old version
     * only looked for phrases like "no difference was proven", and the card
     * shipped to review with a correct answer reading "Deaths were the same in
     * both areas" and a reveal headline reading "Nothing moved". Both sailed
     * past it.
     *
     * Overlapping intervals with P = .78 establish that this trial found no
     * reduction, not that the rates match, and `yield.ts` says so about its own
     * derivation. So the card may say a reduction was not found and must never
     * say the numbers were the same. Note the scope: stage 4 IS printed as 5.0
     * in both areas, so equality language about that row describes the figures
     * and is allowed. This check therefore runs over the mortality sentences.
     */
    const surfaces = [
      overdiagnosis.reveal.headline.en,
      overdiagnosis.reveal.explanation.en,
      revealBody(),
      overdiagnosis.share.explainer.en,
      ...overdiagnosis.choices.map((c) => `${c.label.en} ${c.sublabel?.en ?? ""}`),
    ];

    /**
     * An explicit denylist, because a generic "equality word near a death word"
     * scan was tried first and caught only one of the four phrasings that
     * actually shipped: sentence splitting loses "Nothing moved." from the
     * rates in the sentence after it, "so was the death rate" carries the
     * claim anaphorically with no equality word in it at all, and "children
     * dead" is not the word "death".
     */
    const BANNED = [
      /deaths? (?:were|was) the same/i,
      /nothing moved/i,
      /so (?:was|were) the (?:death|mortality)/i,
      /same number of children (?:dead|who died)/i,
      /(?:death|mortality)[^.]{0,50}\bunchanged\b/i,
      /\bunchanged\b[^.]{0,50}(?:death|mortality)/i,
      /(?:death|mortality)[^.]{0,50}\bidentical\b/i,
    ];

    // The guard proves itself before it is trusted. Every one of these is real
    // wording this card carried into review; a version of this test that could
    // not flag them would be worth nothing, and the first version could not.
    const HISTORICAL = [
      "Deaths were the same in both areas: 3.5 per 100,000 births against 3.8",
      "Nothing moved. 3.5 deaths per 100,000 births where screening ran, 3.8 where it did not.",
      "And so was the death rate: 3.5 against 3.8.",
      "1.5 million children screened, a great many extra diagnoses, and the same number of children dead.",
    ];
    for (const old of HISTORICAL)
      expect({ old, caught: BANNED.some((re) => re.test(old)) }).toEqual({ old, caught: true });

    // Stage 4 genuinely IS printed as 5.0 in both areas, so equality language
    // about that row is a description of the figures and must stay legal.
    expect(
      BANNED.some((re) =>
        re.test("the rate of stage 4 disease, the form that kills, was identical: 5.0 in both"),
      ),
    ).toBe(false);

    const offenders = surfaces.flatMap((s) =>
      BANNED.filter((re) => re.test(s)).map((re) => `${re}  ::  ${s.slice(0, 90)}`),
    );
    expect(offenders).toEqual([]);
  });

  it("still states the null result positively, so the card has a finding", () => {
    // The mirror of the check above: refusing to claim equality must not leave
    // the card saying nothing at all. It has to assert that no reduction was
    // found, and carry both printed rates so the reader can see the gap.
    const all = [overdiagnosis.reveal.headline.en, overdiagnosis.reveal.explanation.en].join(" ");
    expect(all).toMatch(/no reduction|could not tell from chance/i);
    expect(all).toContain("3.5");
    expect(all).toContain("3.8");
  });

  it("carries provenance with a resolvable identifier", () => {
    expect(overdiagnosis.provenance.doi).toBe("10.1093/jncics/pkab041");
    expect(overdiagnosis.provenance.year).toBe(2021);
  });
});

describe("separation from the screening puzzles already shipped", () => {
  it("turns on the excess sitting in the non-fatal stages, not on survival time", () => {
    // Lead-time bias is about survival measured from diagnosis; length-time is
    // about which cases get caught. This card never uses either quantity: its
    // whole argument is two population rates that did not move.
    const explanation = overdiagnosis.reveal.explanation.en;
    expect(explanation).toContain("regresses");
    expect(lessonBody()).toContain("Lead-time bias");
    expect(lessonBody()).toContain("Length-time bias");
  });
});
