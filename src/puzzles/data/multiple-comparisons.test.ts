import { describe, expect, it } from "vitest";
import { multipleComparisons } from "./multiple-comparisons";

/**
 * ISIS-2 Figure 5(b), astrological birth sign rows, plus the Discussion on
 * page 356. Every number the puzzle shows is printed in the paper, so these
 * tests check a transcription rather than a decoding. The strongest available
 * check is that the counts reproduce the odds reductions the authors computed
 * with their own software and printed in prose, which is what the odds ratio
 * tests below do.
 */
const raw = multipleComparisons.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string, stratumId: string): [number, number] => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return [o.numerator, o.denominator];
};

const [glAspD, glAspN] = cell("aspirin", "gemini-libra");
const [glPlaD, glPlaN] = cell("placebo", "gemini-libra");
const [otAspD, otAspN] = cell("aspirin", "other-signs");
const [otPlaD, otPlaN] = cell("placebo", "other-signs");

/** Odds ratio of death on aspirin against placebo, from the four counts. */
const oddsRatio = (
  aspD: number,
  aspN: number,
  plaD: number,
  plaN: number,
): number => (aspD * (plaN - plaD)) / ((aspN - aspD) * plaD);

describe("multiple comparisons data", () => {
  it("carries the counts Figure 5(b) prints", () => {
    expect([glAspD, glAspN, glPlaD, glPlaN]).toEqual([150, 1357, 147, 1442]);
    expect([otAspD, otAspN, otPlaD, otPlaN]).toEqual([654, 7228, 868, 7157]);
  });

  it("reproduces all four printed percentages", () => {
    const pct = (d: number, n: number) => Number(((100 * d) / n).toFixed(1));
    expect(pct(glAspD, glAspN)).toBe(11.1);
    expect(pct(glPlaD, glPlaN)).toBe(10.2);
    expect(pct(otAspD, otAspN)).toBe(9.0);
    expect(pct(otPlaD, otPlaN)).toBe(12.1);
  });

  it("reproduces the paper's own odds reductions from the counts alone", () => {
    // Page 356 prints "9% SD 13 increase" for Gemini and Libra and "28% SD 5
    // reduction" for the rest. The authors computed those separately, so
    // landing on them from the table is an independent check on the reading.
    const gl = oddsRatio(glAspD, glAspN, glPlaD, glPlaN);
    const ot = oddsRatio(otAspD, otAspN, otPlaD, otPlaN);
    expect(Math.round((gl - 1) * 100)).toBe(9);
    expect(Math.round((1 - ot) * 100)).toBe(28);
  });

  it("has the subgroup pointing the wrong way and the rest pointing right", () => {
    // If this ever stopped holding, the puzzle would have no trap left.
    expect(glAspD / glAspN).toBeGreaterThan(glPlaD / glPlaN);
    expect(otAspD / otAspN).toBeLessThan(otPlaD / otPlaN);
  });

  it("sums the aspirin deaths to the 804 the paper reports for the whole trial", () => {
    expect(glAspD + otAspD).toBe(804);
  });

  it("pins the shortfall against the randomised totals rather than hiding it", () => {
    // The strata do not quite close: two aspirin patients, one placebo patient
    // and one placebo death are missing against the trial totals of 8587, 8600
    // and 1016. Likeliest explanation is a missing date of birth, but the paper
    // does not say, so the note records it unexplained and this pins the size.
    expect(8587 - (glAspN + otAspN)).toBe(2);
    expect(8600 - (glPlaN + otPlaN)).toBe(1);
    expect(1016 - (glPlaD + otPlaD)).toBe(1);
  });

  it("still rounds to the trial's printed overall percentages when pooled", () => {
    const pooled = (d: number, n: number) => Number(((100 * d) / n).toFixed(1));
    expect(pooled(glAspD + otAspD, glAspN + otAspN)).toBe(9.4);
    expect(pooled(glPlaD + otPlaD, glPlaN + otPlaN)).toBe(11.8);
  });

  it("treats the strata as a partition, because birth sign is one", () => {
    // Unlike the Hawthorne and sponsorship puzzles these really do partition
    // the trial, so pooling is meaningful and the flag must stay off.
    expect(data.strataAreSeparateSamples).toBeUndefined();
  });

  it("counts deaths, and crowns nobody", () => {
    expect(data.higherIsBetter).toBe(false);
    // Marking a winner in the setup would commit the exact error the puzzle is
    // about: declaring placebo the victor of a difference that is noise.
    expect(data.crownWinner).toBe(false);
  });
});

describe("multiple comparisons framing", () => {
  it("shows only the Gemini and Libra stratum at the setup", () => {
    expect(multipleComparisons.setup.initialView.strataIds).toEqual([
      "gemini-libra",
    ]);
  });

  it("drops the filter at the reveal", () => {
    expect(multipleComparisons.reveal.view.strataIds).toBeUndefined();
  });

  it("tells the reader up front that the subgroup difference is not significant", () => {
    // Without this the puzzle would be asking them to spot something the setup
    // had concealed, rather than to reason about what a subgroup is worth.
    expect(multipleComparisons.setup.framing.en).toContain(
      "not statistically significant",
    );
    expect(multipleComparisons.setup.framing.en).toContain("17,187");
  });

  it("marks the carry-over answer as the intuitive trap and keeps a hedge", () => {
    const trap = multipleComparisons.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("same");
    const hedge = multipleComparisons.choices.find(
      (c) => c.id === "cannot-tell",
    );
    expect(hedge?.isCorrect).toBe(false);
    expect(multipleComparisons.choices.filter((c) => c.isCorrect)).toHaveLength(
      1,
    );
  });

  it("keeps the investigators' own conclusion in the reveal", () => {
    const body = multipleComparisons.reveal.body?.en ?? "";
    expect(body).toContain("did this on purpose");
    expect(body).toContain("is not the Gemini result, it is the result from everybody");
  });

  it("says the plausible subgroup and the absurd one look identical", () => {
    const body = multipleComparisons.reveal.body?.en ?? "";
    expect(body).toContain("look identical on the page");
  });
});

describe("multiple comparisons lesson", () => {
  it("gives the arithmetic rather than an adjective", () => {
    const body = multipleComparisons.lesson.body?.en ?? "";
    expect(body).toContain("one in twenty");
    expect(body).toContain("run a hundred and you expect five");
  });

  it("does not make the lesson about astrology being silly", () => {
    const body = multipleComparisons.lesson.body?.en ?? "";
    expect(body).toContain(
      "a subgroup you would find plausible produces numbers that look exactly the same",
    );
  });

  it("generalises past medicine", () => {
    const how = multipleComparisons.lesson.howItWorks?.en ?? "";
    expect(how).toContain("dashboard");
    expect(how).toContain("pre-specified");
  });

  it("carries the deep dive on the trial auditing its own subgroups", () => {
    const examples = multipleComparisons.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("58.5 on 50 degrees of freedom");
    expect(examples[0].provenance.year).toBe(1988);
  });
});

describe("multiple comparisons provenance note", () => {
  const note = multipleComparisons.provenance.note?.en ?? "";

  it("explains why the figure was used and not the famous commentary", () => {
    expect(note).toContain("9 per cent plus or minus 13 with no numerators");
  });

  it("records the shortfall without explaining it away", () => {
    expect(note).toContain("Two, one and one short");
    expect(note).toContain("left unexplained");
  });

  it("states what the puzzle is and is not claiming", () => {
    expect(note).toContain("not that astrology is silly");
  });
});
