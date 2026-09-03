import { describe, expect, it } from "vitest";
import { tableTwoFallacy } from "./table-two-fallacy";
import { forestRows, restrictForest, rowAt } from "../../engine/charts/forest";

/**
 * Bandoli et al. (2018), free author manuscript at eScholarship, read at source.
 *
 * Nothing here is recomputed: the source prints risk ratios from modified
 * Poisson regression. What this file checks is that the seven authored figures
 * are the printed ones, that the claim the reveal makes about intervals is
 * DERIVED rather than asserted, that the four counts beside the rows are the
 * ones Table 1 prints, and that the commit beat stays answerable from the
 * framing alone.
 */
const raw = tableTwoFallacy.setup.data;
if (raw.type !== "forest") throw new Error("expected forest data");
const data = raw;

const PRINTED = ["preeclampsia", "pptb-printed", "alcohol-printed", "education-printed"];
const PAIRS: [string, string][] = [
  ["pptb-printed", "pptb-total"],
  ["alcohol-printed", "alcohol-total"],
  ["education-printed", "education-total"],
];

describe("the figures as printed in Table 2", () => {
  it("carries the four rows of the published table", () => {
    const of = (id: string) => {
      const r = rowAt(data, id);
      return [r.estimate, r.ciLow, r.ciHigh];
    };
    expect(of("preeclampsia")).toEqual([4.65, 4.59, 4.7]);
    expect(of("pptb-printed")).toEqual([3.56, 3.47, 3.66]);
    expect(of("alcohol-printed")).toEqual([1.49, 1.42, 1.56]);
    expect(of("education-printed")).toEqual([1.12, 1.11, 1.14]);
  });

  it("carries the three re-estimated rows", () => {
    const of = (id: string) => {
      const r = rowAt(data, id);
      return [r.estimate, r.ciLow, r.ciHigh];
    };
    expect(of("pptb-total")).toEqual([3.91, 3.81, 4]);
    expect(of("alcohol-total")).toEqual([1.15, 1.1, 1.22]);
    expect(of("education-total")).toEqual([1.13, 1.12, 1.14]);
  });

  it("carries the counts Table 1 prints, not the cohort size repeated", () => {
    // How many of the 2,963,888 women had each characteristic. A column of
    // identical cohort sizes would be a number with no information in it.
    const k = (id: string) => rowAt(data, id).k;
    expect(k("preeclampsia")).toBe(102545);
    expect(k("pptb-printed")).toBe(20032);
    expect(k("alcohol-printed")).toBe(13214);
    expect(k("education-printed")).toBe(708807);
  });

  it("gives each pair the same count, since it is the same women twice", () => {
    for (const [printed, total] of PAIRS) {
      expect(rowAt(data, total).k).toBe(rowAt(data, printed).k);
    }
  });

  it("puts the null at 1 and reads above it as harm, since preterm birth is the bad outcome", () => {
    expect(data.nullValue).toBe(1);
    expect(data.higherIsWorse).toBe(true);
    expect(rowAt(data, "preeclampsia").side).toBe("worse");
  });

  it("draws no benchmark, because there is no yardstick row here", () => {
    // The shape gained `benchmarkId` for the prevalent-user card. This figure
    // compares each row with ITSELF, so a single reference line would be a
    // borrowed mechanism claiming a comparison the data does not make.
    expect(data.benchmarkId).toBeUndefined();
  });
});

describe("the claim the reveal makes, derived", () => {
  it("has both moved rows land outside their printed intervals", () => {
    // The reveal says "neither new interval overlaps the printed one". That is
    // a claim about the data, so it is computed rather than trusted.
    const disjoint = (a: string, b: string) => {
      const x = rowAt(data, a);
      const y = rowAt(data, b);
      return x.ciHigh < y.ciLow || y.ciHigh < x.ciLow;
    };
    expect(disjoint("pptb-printed", "pptb-total")).toBe(true);
    expect(disjoint("alcohol-printed", "alcohol-total")).toBe(true);
  });

  it("has the unmoved row's intervals overlap, which is the other half of the claim", () => {
    const a = rowAt(data, "education-printed");
    const b = rowAt(data, "education-total");
    expect(a.ciHigh >= b.ciLow && b.ciHigh >= a.ciLow).toBe(true);
  });

  it("moves the two rows by the percentages the reveal quotes", () => {
    const change = (a: string, b: string) =>
      (rowAt(data, b).estimate - rowAt(data, a).estimate) / rowAt(data, a).estimate;
    // "strengthens by 10 per cent" and "falls by 23 per cent".
    expect(Math.round(change("pptb-printed", "pptb-total") * 100)).toBe(10);
    expect(Math.round(change("alcohol-printed", "alcohol-total") * 100)).toBe(-23);
    // "less than one per cent".
    expect(Math.abs(change("education-printed", "education-total"))).toBeLessThan(0.01);
  });

  it("moves them in OPPOSITE directions, which is why one rule cannot cover both", () => {
    // A blocked mediated path and an omitted confounder are different defects
    // and here they push opposite ways. A card that said "covariate rows are
    // inflated" would be wrong about half its own figure.
    const pptb = rowAt(data, "pptb-total").estimate - rowAt(data, "pptb-printed").estimate;
    const alcohol =
      rowAt(data, "alcohol-total").estimate - rowAt(data, "alcohol-printed").estimate;
    expect(pptb).toBeGreaterThan(0);
    expect(alcohol).toBeLessThan(0);
  });

  it("keeps every interval inside the axis, so nothing is drawn clipped", () => {
    for (const r of forestRows(data)) {
      expect(r.ciLow).toBeGreaterThanOrEqual(data.axisMin);
      expect(r.ciHigh).toBeLessThanOrEqual(data.axisMax);
    }
  });
});

describe("the beats", () => {
  it("draws the published table at the setup and withholds every re-estimate", () => {
    const view = tableTwoFallacy.setup.initialView;
    expect(view.kind).toBe("whatisknown");
    expect(view.groupIds).toEqual(PRINTED);
    const shown = restrictForest(data, { groupIds: view.groupIds }).rows.map((r) => r.id);
    expect(shown).toEqual(PRINTED);
  });

  it("adds all three re-estimates at the reveal", () => {
    expect(tableTwoFallacy.reveal.view.kind).toBe("themissingrow");
    const shown = restrictForest(data, {
      groupIds: tableTwoFallacy.reveal.view.groupIds,
    }).rows.map((r) => r.id);
    expect(shown).toHaveLength(7);
    for (const [, total] of PAIRS) expect(shown).toContain(total);
  });

  it("authors each re-estimate DIRECTLY AFTER its printed row", () => {
    // The reveal is a superset drawn in authored order, so interleaving is the
    // only thing that puts a pair together rather than appending three loose
    // rows under the table they belong to.
    const order = data.rows.map((r) => r.id);
    for (const [printed, total] of PAIRS) {
      expect(order.indexOf(total)).toBe(order.indexOf(printed) + 1);
    }
  });

  it("keeps one axis and one null line across the beats", () => {
    const setup = restrictForest(data, {
      groupIds: tableTwoFallacy.setup.initialView.groupIds,
    });
    expect([setup.axisMin, setup.axisMax, setup.nullValue]).toEqual([
      data.axisMin,
      data.axisMax,
      data.nullValue,
    ]);
  });
});

describe("the commit beat, which has to be answerable without the numbers", () => {
  const framing = tableTwoFallacy.setup.framing.en;
  const choices = tableTwoFallacy.choices;

  it("puts the whole causal story in the framing, since no table can show it", () => {
    // Each clause is what rules exactly one row in or out. Without all three
    // the question has no determinate answer and the puzzle would be marking a
    // careful reader wrong.
    expect(framing).toMatch(/cause of preeclampsia as well as of preterm birth/i);
    expect(framing).toMatch(/travels with drug abuse, and only alcohol is in the model/i);
    expect(framing).toMatch(/nothing to do with preeclampsia/i);
    // And the premise that stops the nihilist band from being defensible.
    expect(framing).toMatch(/take the study's own causal assumptions as given/i);
  });

  it("has exactly one correct band, naming both readable rows and no others", () => {
    const correct = choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["two-of-them"]);
  });

  it("makes the fallacy itself the trap", () => {
    const trap = choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["all-four"]);
    expect(trap[0]!.label.en).toMatch(/fitted at once/i);
  });

  it("offers four bands that name four DIFFERENT sets of rows", () => {
    // The hedge rule's operational test. A magnitude question here would put
    // two bands on the same side of the only thing the framing licenses; these
    // four are mutually exclusive answers to a question about which rows, not
    // about how much.
    expect(choices).toHaveLength(4);
    expect(new Set(choices.map((c) => c.id)).size).toBe(4);
    expect(choices.map((c) => c.id)).toEqual([
      "all-four",
      "exposure-only",
      "two-of-them",
      "none",
    ]);
  });
});

describe("what the card refuses to claim", () => {
  const revealBody = tableTwoFallacy.reveal.body!.en;
  const howItWorks = tableTwoFallacy.lesson.howItWorks!.en;

  it("does not call the model or the study wrong", () => {
    expect(revealBody).toMatch(/the model is not wrong/i);
    expect(revealBody).toMatch(/teaching paper/i);
    expect(revealBody).toMatch(/exactly what it claims to be/i);
  });

  it("concedes that the changes are modest, as the authors do", () => {
    expect(revealBody).toMatch(/modest/i);
  });

  it("warns that removing the exposure is not the fix, with the number", () => {
    // The third alcohol figure, which the paper reports and does not tabulate.
    expect(howItWorks).toMatch(/1\.61/);
    expect(tableTwoFallacy.lesson.examples![0]!.summary.en).toMatch(/1\.61/);
  });
});

describe("provenance", () => {
  it("names the paper, what was read, and where each number came from", () => {
    const p = tableTwoFallacy.provenance;
    expect(p.doi).toBe("10.1111/ppe.12474");
    expect(p.year).toBe(2018);
    expect(p.source).toMatch(/Table 2 as printed/i);
    expect(p.source).toMatch(/are Table 1/i);
  });

  it("cites the source for the example separately from the card", () => {
    const example = tableTwoFallacy.lesson.examples![0]!;
    expect(example.provenance.doi).toBe("10.1111/ppe.12474");
    expect(example.provenance.source).toMatch(/Model 3/);
  });
});
