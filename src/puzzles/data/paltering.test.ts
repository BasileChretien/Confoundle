import { describe, expect, it } from "vitest";
import { paltering } from "./paltering";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Rogers, Zeckhauser, Gino, Norton and Schweitzer (2017), Study 4B. Tables 4
 * and 5 on page 469, both read from the rendered page because the machine
 * extraction pairs the percentages with the wrong counts.
 *
 * The counts are printed, so nothing here is reconstructed. What these tests
 * carry is the cross-check between the two tables, plus the published
 * chi-square, recomputed from scratch rather than asserted.
 */
const raw = paltering.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

/** Table 4, behaviour by condition: palter, honest, lie, not asked, other. */
const TABLE4 = {
  palterCondition: { palter: 38, honest: 2, lie: 0, notAsked: 3, other: 4 },
  honestCondition: { palter: 10, honest: 26, lie: 3, notAsked: 8, other: 3 },
} as const;

const chiSquare = (rows: ReadonlyArray<readonly [number, number]>): number => {
  const n = rows.reduce((s, r) => s + r[1], 0);
  const a = rows.reduce((s, r) => s + r[0], 0);
  const p = a / n;
  return rows.reduce((sum, [hits, size]) => {
    const eHit = size * p;
    const eMiss = size * (1 - p);
    return sum + (hits - eHit) ** 2 / eHit + (size - hits - eMiss) ** 2 / eMiss;
  }, 0);
};

describe("paltering data", () => {
  it("carries the two impasse counts", () => {
    // Table 5's actual-response rows summed per instructed condition: 6 + 1 and
    // 0 + 1.
    expect(cell("palter")).toEqual([7, 47]);
    expect(cell("honest")).toEqual([1, 51]);
  });

  it("recovers the printed 15 and 2 per cent", () => {
    const pct = (g: string) => {
      const [a, n] = cell(g);
      return Math.round((100 * a) / n);
    };
    expect(pct("palter")).toBe(15);
    expect(pct("honest")).toBe(2);
  });

  it("reproduces the published chi-square of 5.46", () => {
    // Nothing was fitted to this, so it is the real check on the counts.
    expect(Number(chiSquare([cell("palter"), cell("honest")]).toFixed(2))).toBe(5.46);
  });

  it("cross-checks Table 4 against Table 5's eligible dyads", () => {
    // Everyone who actually paltered, across both conditions, is Table 5's 48
    // eligible dyads; everyone who was actually honest is its 28. Two tables
    // agreeing on totals neither of them states as a total.
    const t4 = TABLE4;
    expect(t4.palterCondition.palter + t4.honestCondition.palter).toBe(48);
    expect(t4.palterCondition.honest + t4.honestCondition.honest).toBe(28);
  });

  it("has Table 4's paltering row account for exactly the 47 dyads", () => {
    const row = TABLE4.palterCondition;
    const total = row.palter + row.honest + row.lie + row.notAsked + row.other;
    expect(total).toBe(47);
    expect(total).toBe(cell("palter")[1]);
    expect(Math.round((100 * row.palter) / total)).toBe(81);
  });

  it("records that Table 4's honest row is one person short, without hiding it", () => {
    // The row sums to 50 while Table 5 gives 51 dyads. Every percentage in the
    // row recovers against 51, and so does the printed 49 per cent for
    // non-honest behaviour, so 51 is right and one participant is missing from
    // the breakdown. Asserted so the discrepancy cannot be quietly "fixed".
    const row = TABLE4.honestCondition;
    const listed = row.palter + row.honest + row.lie + row.notAsked + row.other;
    expect(listed).toBe(50);
    expect(cell("honest")[1]).toBe(51);
    const against51 = [row.palter, row.honest, row.lie, row.notAsked, row.other].map(
      (v) => Math.round((100 * v) / 51),
    );
    expect(against51).toEqual([20, 51, 6, 16, 6]);
    expect(Math.round((100 * (51 - row.honest)) / 51)).toBe(49);
  });

  it("keeps the finding the reveal turns on", () => {
    const rate = (g: string) => {
      const [a, n] = cell(g);
      return a / n;
    };
    expect(rate("palter")).toBeGreaterThan(5 * rate("honest"));
  });

  it("crowns nobody, because an impasse is not a scoreline", () => {
    expect(data.crownWinner).toBe(false);
    expect(data.higherIsBetter).toBe(false);
  });
});

describe("paltering framing", () => {
  it("shows only the honest bar at the setup", () => {
    expect(paltering.setup.initialView.groupIds).toEqual(["honest"]);
  });

  it("really withholds the paltering bar", () => {
    const shown = restrictRates(
      paltering.setup.data as never,
      paltering.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    const revealed = restrictRates(
      paltering.setup.data as never,
      paltering.reveal.view,
    );
    expect(revealed.observations).toHaveLength(2);
  });

  it("says plainly that nothing false was said, which is the whole trap", () => {
    const framing = paltering.setup.framing.en;
    expect(framing).toContain("statements that are true");
    expect(framing).toContain("not one told an outright lie");
  });

  it("defines paltering rather than assuming the reader knows the word", () => {
    expect(paltering.setup.framing.en).toContain("which means to answer with");
  });

  it("offers exactly one band saying the deals broke down more", () => {
    const worse = paltering.choices.filter((c) => /Far more often/i.test(c.label.en));
    expect(worse).toHaveLength(1);
    expect(worse[0].isCorrect).toBe(true);
    expect(paltering.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("same");
    const hedge = paltering.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    expect(paltering.choices.filter((c) => c.isCorrect)).toHaveLength(1);
  });

  it("explains that there was no falsehood to catch", () => {
    const explanation = paltering.reveal.explanation.en;
    expect(explanation).toContain("no falsehood to catch");
    expect(explanation).toContain("never lands on the question");
  });

  it("carries the palterers' own view of themselves", () => {
    // Reported as the paper's ratings rather than authored as counts, because
    // they are means, and the puzzle's own data does not rest on them.
    const body = paltering.reveal.body?.en ?? "";
    expect(body).toContain("only somewhat dishonest");
    expect(body).toContain("feels defensible from the inside");
  });
});

describe("paltering lesson", () => {
  it("places it between the two kinds of dishonesty people already name", () => {
    const body = paltering.lesson.body?.en ?? "";
    expect(body).toContain("not a lie");
    expect(body).toContain("not an omission");
  });

  it("gives a procedure, not an instruction to be suspicious", () => {
    const how = paltering.lesson.howItWorks?.en ?? "";
    expect(how).toContain("grading them for responsiveness");
    expect(how).toContain("say the question again");
    expect(how).toContain("cannot survive being asked twice");
  });

  it("turns the finding on the reader rather than only outwards", () => {
    expect(paltering.lesson.howItWorks?.en ?? "").toContain("you will palter too");
  });

  it("carries the deep dive on the honest condition", () => {
    const examples = paltering.lesson.examples ?? [];
    expect(examples).toHaveLength(1);
    expect(examples[0].summary.en).toContain("Only 26 of 51");
    expect(examples[0].provenance.doi).toBe("10.1037/pspi0000081");
  });
});

describe("paltering provenance note", () => {
  const note = paltering.provenance.note?.en ?? "";

  it("states that the counts are printed rather than reconstructed", () => {
    expect(note).toContain("prints its counts");
    expect(note).toContain("nothing here is reconstructed");
  });

  it("records the cross-check and the chi-square", () => {
    expect(note).toContain("48 eligible dyads");
    expect(note).toContain("5.46");
  });

  it("leaves the missing participant on the record", () => {
    expect(note).toContain("one participant is unaccounted for");
    expect(note).toContain("does not explain it and neither will this");
  });

  it("concedes the setting is a simulation", () => {
    expect(note).toContain("not a real sale");
  });
});
