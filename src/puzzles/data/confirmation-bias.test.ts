import { describe, expect, it } from "vitest";
import { confirmationBias } from "./confirmation-bias";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Griggs and Cox (1982), Experiment 3. Table 5 on page 416, read from the
 * rendered page rather than from extracted text, which scrambles it.
 *
 * The counts are printed, so these tests carry the checks that confirm the
 * reading: the column sums, the printed percentage, and both published
 * chi-square statistics, recomputed from scratch rather than asserted. A
 * single misread cell moves at least one of them.
 */
const raw = confirmationBias.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

/**
 * Table 5, by selection combination: p, p+q, p+q+notq, p+notq (the correct
 * one), other. One column per problem type and trial.
 */
const TABLE5 = {
  thematicT1: [5, 0, 1, 14, 0],
  thematicT2: [3, 0, 0, 15, 2],
  abstractT1: [3, 8, 1, 0, 8],
  abstractT2: [0, 13, 0, 0, 7],
} as const;

/** Pearson chi-square with Yates continuity correction, which the paper used. */
const yates = (a: number, b: number, c: number, d: number): number => {
  const n = a + b + c + d;
  return (
    (n * (Math.abs(a * d - b * c) - n / 2) ** 2) /
    ((a + b) * (c + d) * (a + c) * (b + d))
  );
};

describe("confirmation bias data", () => {
  it("carries the two counts the puzzle turns on", () => {
    expect(cell("abstract")).toEqual([0, 40]);
    expect(cell("thematic")).toEqual([29, 40]);
  });

  it("has every column of Table 5 sum to the stated group size of 20", () => {
    for (const [name, col] of Object.entries(TABLE5)) {
      // The generic is needed because `as const` types each cell as its own
      // literal, which the default accumulator type cannot widen.
      const total = col.reduce<number>((s, x) => s + x, 0);
      expect({ name, total }).toEqual({ name, total: 20 });
    }
  });

  it("builds each bar from the correct row of both trials", () => {
    // The correct combination is p plus not-q, the fourth row.
    expect(TABLE5.thematicT1[3] + TABLE5.thematicT2[3]).toBe(
      cell("thematic")[0],
    );
    expect(TABLE5.abstractT1[3] + TABLE5.abstractT2[3]).toBe(
      cell("abstract")[0],
    );
  });

  it("recovers the printed seventy-three per cent", () => {
    const [a, n] = cell("thematic");
    expect(Math.round((100 * a) / n)).toBe(73);
  });

  it("reproduces both published chi-squares once corrected", () => {
    // 18.6 and 20.9, printed in the text. Nothing was fitted to them, and the
    // continuity correction is what the paper used: without it they come out
    // at 21.5 and 23.3.
    expect(Number(yates(14, 6, 0, 20).toFixed(1))).toBe(18.6);
    expect(Number(yates(15, 5, 0, 20).toFixed(1))).toBe(20.9);
  });

  it("keeps the finding the reveal turns on", () => {
    // Zero on one version is what makes the other astonishing, so it is worth
    // an assertion of its own rather than only living in the counts.
    expect(cell("abstract")[0]).toBe(0);
    expect(cell("thematic")[0]).toBeGreaterThan(cell("thematic")[1] / 2);
  });

  it("crowns nobody, because both bars are the same forty people", () => {
    expect(data.crownWinner).toBe(false);
    expect(cell("abstract")[1]).toBe(cell("thematic")[1]);
  });
});

describe("confirmation bias framing", () => {
  it("shows only the abstract bar at the setup", () => {
    expect(confirmationBias.setup.initialView.groupIds).toEqual(["abstract"]);
  });

  it("really withholds the drinking-age bar", () => {
    const shown = restrictRates(
      confirmationBias.setup.data as never,
      confirmationBias.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    const revealed = restrictRates(
      confirmationBias.setup.data as never,
      confirmationBias.reveal.view,
    );
    expect(revealed.observations).toHaveLength(2);
  });

  it("gives the reader the answer to the card problem rather than testing it", () => {
    // The puzzle is not "can you solve the selection task". Withholding the
    // answer would make the commit beat about the reader's own logic instead
    // of about what forty people did.
    const framing = confirmationBias.setup.framing.en;
    expect(framing).toContain("The correct answer is D and 7");
    expect(framing).toContain("only a D with something other than a 3");
  });

  it("says the two problems are the same rule and the same people", () => {
    expect(confirmationBias.setup.question.en).toContain("same forty people");
    expect(confirmationBias.setup.question.en).toContain("same logic");
  });

  it("offers exactly one band saying they did better", () => {
    const better = confirmationBias.choices.filter((c) =>
      /Much better/i.test(c.label.en),
    );
    expect(better).toHaveLength(1);
    expect(better[0].isCorrect).toBe(true);
    expect(confirmationBias.choices.find((c) => c.isIntuitiveTrap)?.id).toBe(
      "same",
    );
    const hedge = confirmationBias.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(confirmationBias.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("puts the mechanism in the reveal, not just the gap", () => {
    const body = confirmationBias.reveal.body?.en ?? "";
    expect(body).toContain("29 of the 40 turned the 3");
    expect(body).toContain("Only 14 turned the 7");
    expect(body).toContain("no transfer");
  });
});

describe("confirmation bias lesson", () => {
  it("separates the bias from motivated reasoning", () => {
    const body = confirmationBias.lesson.body?.en ?? "";
    expect(body).toContain("nobody has a stake in whether Ds have 3s");
  });

  it("gives a procedure rather than an instruction to be open-minded", () => {
    const how = confirmationBias.lesson.howItWorks?.en ?? "";
    expect(how).toContain("name the thing that would prove you wrong");
    expect(how).toContain("you are not testing anything");
  });

  it("uses the transfer null against the reader", () => {
    expect(confirmationBias.lesson.howItWorks?.en ?? "").toContain(
      "before you feel clever",
    );
  });

  it("carries the two failed replications as the deep dive", () => {
    const examples = confirmationBias.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("2 of 16");
    expect(examples[0].summary.en).toContain("Familiar wording is not enough");
    expect(examples[0].provenance.doi).toBe(
      "10.1111/j.2044-8295.1982.tb01823.x",
    );
  });
});

describe("confirmation bias provenance note", () => {
  const note = confirmationBias.provenance.note?.en ?? "";

  it("lists the four checks on the reading", () => {
    expect(note).toContain("sums to 20");
    expect(note).toContain("seventy-three per cent");
    expect(note).toContain("18.6");
    expect(note).toContain("20.9");
  });

  it("refuses the famous one-in-ten figure the deck already investigated", () => {
    expect(note).toContain("fewer than one person in ten");
    expect(note).toContain("cites that to a review");
  });

  it("states the effect is narrower than the popular version", () => {
    expect(note).toContain("failed twice to reproduce it");
    expect(note).toContain("calls it elusive");
  });
});
