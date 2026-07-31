import { describe, expect, it } from "vitest";
import { conjunctionFallacy } from "./conjunction-fallacy";

/**
 * Charness, Karni and Levin (2010), Table 1 on page 554, read from the rendered
 * page rather than from extracted text because `pdftotext -layout` shifts the
 * study column against the row descriptions in this table. These tests pin the
 * pairing of counts to conditions, which is exactly what that shift destroys.
 *
 * The strongest check is not any single percentage. It is that the three
 * denominators sum to 361, which the methods section states on a different page
 * as the number of participants, so a count read off the wrong row would have to
 * be wrong in a compensating way to survive.
 */
const raw = conjunctionFallacy.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string, stratumId: string): [number, number] => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return [o.numerator, o.denominator];
};

const [aloneUnpaidE, aloneUnpaidN] = cell("unpaid", "alone");
const [alonePaidE, alonePaidN] = cell("paid", "alone");
const [pairsUnpaidE, pairsUnpaidN] = cell("unpaid", "pairs");
const [pairsPaidE, pairsPaidN] = cell("paid", "pairs");
const [triosUnpaidE, triosUnpaidN] = cell("unpaid", "trios");
const [triosPaidE, triosPaidN] = cell("paid", "trios");

const pct = (e: number, n: number) => Number(((100 * e) / n).toFixed(1));

describe("conjunction fallacy data", () => {
  it("carries the six counts Table 1 prints", () => {
    expect([aloneUnpaidE, aloneUnpaidN]).toEqual([50, 86]);
    expect([alonePaidE, alonePaidN]).toEqual([31, 94]);
    expect([pairsUnpaidE, pairsUnpaidN]).toEqual([27, 56]);
    expect([pairsPaidE, pairsPaidN]).toEqual([5, 38]);
    expect([triosUnpaidE, triosUnpaidN]).toEqual([10, 39]);
    expect([triosPaidE, triosPaidN]).toEqual([5, 48]);
  });

  it("reproduces all six printed percentages", () => {
    expect(pct(aloneUnpaidE, aloneUnpaidN)).toBe(58.1);
    expect(pct(alonePaidE, alonePaidN)).toBe(33.0);
    expect(pct(pairsUnpaidE, pairsUnpaidN)).toBe(48.2);
    expect(pct(pairsPaidE, pairsPaidN)).toBe(13.2);
    expect(pct(triosUnpaidE, triosUnpaidN)).toBe(25.6);
    expect(pct(triosPaidE, triosPaidN)).toBe(10.4);
  });

  it("reproduces the three printed subtotal rows", () => {
    // 81/180 (45.0), 32/94 (34.0), 15/87 (17.2). These are separate printed
    // rows, so hitting them in both numerator and denominator catches a count
    // taken from the wrong line of a table whose columns had shifted.
    expect([aloneUnpaidE + alonePaidE, aloneUnpaidN + alonePaidN]).toEqual([
      81, 180,
    ]);
    expect(pct(81, 180)).toBe(45.0);
    expect([pairsUnpaidE + pairsPaidE, pairsUnpaidN + pairsPaidN]).toEqual([
      32, 94,
    ]);
    expect(pct(32, 94)).toBe(34.0);
    expect([triosUnpaidE + triosPaidE, triosUnpaidN + triosPaidN]).toEqual([
      15, 87,
    ]);
    expect(pct(15, 87)).toBe(17.2);
  });

  it("accounts for every one of the 361 participants", () => {
    // The methods section states 361 on the previous page, so this is an
    // independent check on the reading of the table.
    const total = data.observations.reduce((s, o) => s + o.denominator, 0);
    expect(total).toBe(361);
  });

  it("has the paper's own truth-wins predictions reproduce from these rates", () => {
    // Footnote 11 takes the alone rates as representative and predicts what
    // independent group members would produce: 33.8 and 19.6 per cent from the
    // 58.1 rate, 10.9 and 3.6 per cent from the 33.0 rate. The authors rounded
    // the rate before raising it to a power, so these are computed the same way.
    const unpaid = 0.581;
    const paid = 0.33;
    expect(Number((100 * unpaid ** 2).toFixed(1))).toBe(33.8);
    expect(Number((100 * unpaid ** 3).toFixed(1))).toBe(19.6);
    expect(Number((100 * paid ** 2).toFixed(1))).toBe(10.9);
    expect(Number((100 * paid ** 3).toFixed(1))).toBe(3.6);
  });

  it("keeps the finding the puzzle turns on: unpaid trios beat paid individuals", () => {
    // Without this the correct answer would not be correct.
    expect(triosUnpaidE / triosUnpaidN).toBeLessThan(alonePaidE / alonePaidN);
  });

  it("keeps the nuance that a single partner bought very little", () => {
    // Unpaid pairs did worse than paid individuals, which is why the question
    // asks about threes specifically and the reveal explains the difference.
    expect(pairsUnpaidE / pairsUnpaidN).toBeGreaterThan(alonePaidE / alonePaidN);
  });

  it("falls monotonically with group size in both incentive conditions", () => {
    expect(aloneUnpaidE / aloneUnpaidN).toBeGreaterThan(
      pairsUnpaidE / pairsUnpaidN,
    );
    expect(pairsUnpaidE / pairsUnpaidN).toBeGreaterThan(
      triosUnpaidE / triosUnpaidN,
    );
    expect(alonePaidE / alonePaidN).toBeGreaterThan(pairsPaidE / pairsPaidN);
    expect(pairsPaidE / pairsPaidN).toBeGreaterThan(triosPaidE / triosPaidN);
  });

  it("treats the group sizes as separate samples, because pooling them is an artefact", () => {
    // How many people were sent to each arm was the experimenters' choice, so a
    // pooled bar would measure the assignment rather than anybody's reasoning.
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("counts errors, and crowns nobody", () => {
    expect(data.higherIsBetter).toBe(false);
    // A crown on the paid bar in the setup would answer the question the puzzle
    // is about to ask.
    expect(data.crownWinner).toBe(false);
  });
});

describe("conjunction fallacy framing", () => {
  it("shows only the alone stratum at the setup", () => {
    expect(conjunctionFallacy.setup.initialView.strataIds).toEqual(["alone"]);
  });

  it("drops the filter at the reveal", () => {
    expect(conjunctionFallacy.reveal.view.strataIds).toBeUndefined();
  });

  it("tells the reader up front why the answer cannot be right", () => {
    // The puzzle is not asking them to spot the fallacy, it is asking them what
    // moves the rate, so concealing the logic would make it a different and
    // worse puzzle.
    const framing = conjunctionFallacy.setup.framing.en;
    expect(framing).toContain("sits inside the first");
    expect(framing).toContain("361");
    expect(framing).toContain("$4");
  });

  it("asks about threes specifically, since twos would have a different answer", () => {
    expect(conjunctionFallacy.setup.question.en).toContain("two others");
  });

  it("marks the no-change answer as the intuitive trap and keeps a hedge", () => {
    const trap = conjunctionFallacy.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("no-change");
    const hedge = conjunctionFallacy.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(conjunctionFallacy.choices.filter((c) => c.isCorrect)).toHaveLength(
      1,
    );
  });

  it("gives the arithmetic caveat rather than celebrating the groups", () => {
    const body = conjunctionFallacy.reveal.body?.en ?? "";
    expect(body).toContain("pairs are not the story");
    expect(body).toContain("some of this is arithmetic rather than insight");
    expect(body).toContain("helped less than");
  });
});

describe("conjunction fallacy lesson", () => {
  it("states the rule as a containment, not as a statistic", () => {
    const body = conjunctionFallacy.lesson.body?.en ?? "";
    expect(body).toContain("subset of the people who are A");
  });

  it("carries the competing linguistic reading rather than suppressing it", () => {
    // Camerer's argument is the strongest objection to the whole result and
    // leaving it out would make the lesson a worse one.
    const body = conjunctionFallacy.lesson.body?.en ?? "";
    expect(body).toContain("Camerer");
    expect(body).toContain("may be a reading of English");
  });

  it("generalises past quiz questions", () => {
    const how = conjunctionFallacy.lesson.howItWorks?.en ?? "";
    expect(how).toContain("recession");
    expect(how).toContain("as they get less probable");
  });

  it("teaches the second habit the study itself demonstrates", () => {
    const how = conjunctionFallacy.lesson.howItWorks?.en ?? "";
    expect(how).toContain("famous headline rate");
  });

  it("carries the deep dive on the deleted word", () => {
    const examples = conjunctionFallacy.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("35.8 per cent");
    expect(examples[0].provenance.year).toBe(2010);
    expect(examples[0].provenance.doi).toBe("10.1016/j.geb.2009.09.003");
  });
});

describe("conjunction fallacy provenance note", () => {
  const note = conjunctionFallacy.provenance.note?.en ?? "";

  it("records why the table was read visually", () => {
    expect(note).toContain("rendered as an image");
    expect(note).toContain("shifts the study column");
  });

  it("disclaims the famous 85 per cent instead of borrowing it", () => {
    expect(note).toContain("this project has not read it");
    expect(note).toContain("nothing here rests on it");
  });

  it("reports the authors' conclusion without adopting it", () => {
    expect(note).toContain("reported rather than adopted");
  });

  it("does not use the 1983 figure anywhere in the puzzle's own text", () => {
    // The 121/142 row is these authors reporting someone else's study. It may
    // be described in the provenance note and nowhere else.
    const authored = [
      conjunctionFallacy.setup.headline.en,
      conjunctionFallacy.setup.framing.en,
      conjunctionFallacy.setup.question.en,
      conjunctionFallacy.reveal.explanation.en,
      conjunctionFallacy.reveal.body?.en ?? "",
      conjunctionFallacy.lesson.body?.en ?? "",
      conjunctionFallacy.lesson.howItWorks?.en ?? "",
      ...(conjunctionFallacy.lesson.examples ?? []).map((e) => e.summary.en),
      conjunctionFallacy.share.explainer.en,
    ].join(" ");
    expect(authored).not.toContain("85 per cent");
    expect(authored).not.toContain("121");
  });
});
