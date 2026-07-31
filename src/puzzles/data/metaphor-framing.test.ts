import { describe, expect, it } from "vitest";
import { metaphorFraming } from "./metaphor-framing";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Thibodeau and Boroditsky (2011), Table 1 on page 5, read from the rendered
 * page. The three anchors below come from Experiment 1, whose counts the puzzle
 * deliberately does not use because they are fractional; they exist here to
 * check that the table was read correctly at all.
 */
const raw = metaphorFraming.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string, stratumId: string): [number, number] => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return [o.numerator, o.denominator];
};

const pct = (n: number, d: number) => Number(((100 * n) / d).toFixed(1));

describe("metaphor framing data", () => {
  it("carries the Experiment 2 and Experiment 3 counts Table 1 prints", () => {
    expect(cell("beast", "word-only")).toEqual([75, 118]);
    expect(cell("virus", "word-only")).toEqual([66, 102]);
    expect(cell("beast", "in-report")).toEqual([80, 113]);
    expect(cell("virus", "in-report")).toEqual([72, 133]);
  });

  it("derives denominators that match the printed enforce and social split", () => {
    // Table 1 prints the two response categories, not the totals, so every
    // denominator here is a sum and a misread cell would break it.
    expect(75 + 43).toBe(118);
    expect(66 + 36).toBe(102);
    expect(80 + 33).toBe(113);
    expect(72 + 61).toBe(133);
  });

  it("reproduces Experiment 1's three printed percentages from its counts", () => {
    // The strongest available check on the reading of the table, and the reason
    // Experiment 1 is quoted in the provenance despite supplying no data.
    expect(pct(170, 231)).toBe(73.6); // printed 74
    // Printed 56, and the exact value is 56.5, so the paper rounded this one
    // down. Asserting the raw value rather than a rounding of it, because
    // rounding 56.5 in JavaScript gives 57 and would fail against the paper.
    expect(pct(126.5, 224)).toBe(56.5);
    expect(pct(296.5, 455)).toBe(65.2); // printed 65
  });

  it("uses no fractional counts, which is why Experiment 1 is excluded", () => {
    for (const o of data.observations) {
      expect(Number.isInteger(o.numerator)).toBe(true);
      expect(Number.isInteger(o.denominator)).toBe(true);
    }
  });

  it("keeps the effect the puzzle turns on, about seventeen points", () => {
    const gap =
      pct(...cell("beast", "in-report")) - pct(...cell("virus", "in-report"));
    expect(Math.round(gap)).toBe(17);
  });

  it("keeps the null that makes the setup work", () => {
    // If priming the bare word had moved anything, the setup would not
    // establish that this is more than word association.
    const gap =
      pct(...cell("beast", "word-only")) - pct(...cell("virus", "word-only"));
    expect(Math.abs(gap)).toBeLessThan(2);
  });

  it("marks no winner and pools nothing, because neither answer is correct", () => {
    // Enforcement against social reform is a real political disagreement. A
    // crown would tell the reader one side of it is right.
    expect(data.crownWinner).toBe(false);
    expect(data.strataAreSeparateSamples).toBe(true);
  });
});

describe("metaphor framing framing", () => {
  it("shows only the word-primed stratum at the setup", () => {
    expect(metaphorFraming.setup.initialView.strataIds).toEqual(["word-only"]);
  });

  it("really withholds the in-report bars", () => {
    const shown = restrictRates(
      metaphorFraming.setup.data as never,
      metaphorFraming.setup.initialView,
    );
    expect(shown.observations).toHaveLength(2);
    expect(shown.strata.map((s) => s.id)).toEqual(["word-only"]);
    const revealed = restrictRates(
      metaphorFraming.setup.data as never,
      metaphorFraming.reveal.view,
    );
    expect(revealed.observations).toHaveLength(4);
  });

  it("tells the reader the report itself was identical", () => {
    const framing = metaphorFraming.setup.framing.en;
    expect(framing).toContain("identical");
    expect(framing).toContain("mentioned neither");
  });

  it("marks the nothing-happened answer as the intuitive trap and keeps a hedge", () => {
    const trap = metaphorFraming.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("nothing");
    const hedge = metaphorFraming.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(metaphorFraming.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("keeps the finding that introspection did not help", () => {
    const body = metaphorFraming.reveal.body?.en ?? "";
    expect(body).toContain("Almost nobody named the metaphor");
    expect(body).toContain("introspection is not a defence");
  });
});

describe("metaphor framing lesson", () => {
  it("distinguishes itself from the deck's framing puzzle", () => {
    const body = metaphorFraming.lesson.body?.en ?? "";
    expect(body).toContain("gain or as a loss");
    expect(body).toContain("no number moves");
  });

  it("gives a procedural defence rather than telling the reader to be sceptical", () => {
    const how = metaphorFraming.lesson.howItWorks?.en ?? "";
    expect(how).toContain("try the swap");
    expect(how).toContain("procedural rather than attitudinal");
  });

  it("carries the deep dive on the authors killing their own alternative", () => {
    const examples = metaphorFraming.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("run as a condition");
    expect(examples[0].provenance.doi).toBe("10.1371/journal.pone.0016782");
  });
});

describe("metaphor framing provenance note", () => {
  const note = metaphorFraming.provenance.note?.en ?? "";

  it("explains why the famous experiment supplies no data", () => {
    expect(note).toContain("Half a person is not a count");
  });

  it("records the coded-response shortfall without explaining it away", () => {
    expect(note).toContain("seven short");
    expect(note).toContain("left unexplained");
  });

  it("concedes the replication record it has not read", () => {
    expect(note).toContain("mixed results");
    expect(note).toContain("this project has not read them");
  });

  it("states that the deck takes no side on the underlying politics", () => {
    expect(note).toContain("takes no side");
    expect(note).toContain("No winner is marked");
  });
});
