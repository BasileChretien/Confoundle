import { describe, expect, it } from "vitest";
import { continuedInfluence } from "./continued-influence";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Kassin and Sommers (1997), read from the rendered pages because the PDF is a
 * scan with no text layer at all: `pdftotext` returns nothing but the library's
 * download stamp.
 *
 * The counts are reconstructed, which this project normally refuses, so these
 * tests carry every constraint that made the reconstruction safe. Six printed
 * quantities are checked, and the two chi-square statistics are recomputed from
 * scratch rather than asserted, because nothing was fitted to them and they are
 * therefore the real proof. If a single count here is wrong, both chi-squares
 * move and this file fails.
 */
const raw = continuedInfluence.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

/** Pearson chi-square for a set of [successes, n] rows against one proportion. */
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

const rows = ["control", "admissible", "due-process", "unreliable"].map(cell) as Array<
  [number, number]
>;

describe("continued influence data", () => {
  it("carries the four reconstructed counts", () => {
    expect(cell("control")).toEqual([5, 21]);
    expect(cell("admissible")).toEqual([15, 19]);
    expect(cell("due-process")).toEqual([11, 20]);
    expect(cell("unreliable")).toEqual([5, 21]);
  });

  it("recovers the four printed conviction rates", () => {
    expect(rows.map(([a, n]) => Math.round((100 * a) / n))).toEqual([24, 79, 55, 24]);
  });

  it("recovers the three printed totals", () => {
    // 81 participants, 36 guilty, 44.4 per cent overall. All printed, none used
    // to derive the counts, so all three are independent checks.
    const n = rows.reduce((s, r) => s + r[1], 0);
    const guilty = rows.reduce((s, r) => s + r[0], 0);
    expect(n).toBe(81);
    expect(guilty).toBe(36);
    expect(Number(((100 * guilty) / n).toFixed(1))).toBe(44.4);
  });

  it("keeps every group inside the printed range of 19 to 21", () => {
    for (const [, size] of rows) {
      expect(size).toBeGreaterThanOrEqual(19);
      expect(size).toBeLessThanOrEqual(21);
    }
  });

  it("matches the two group totals the manipulation checks pin", () => {
    // "58 out of 60 correctly recalled the judge's ruling" fixes the three
    // experimental groups at 60, and "39 out of 41 in the two inadmissible
    // groups" fixes those two at 41. Together with 81 these give the control
    // and admitted group sizes without touching a percentage.
    const [, control] = cell("control");
    const [, admissible] = cell("admissible");
    const [, dueProcess] = cell("due-process");
    const [, unreliable] = cell("unreliable");
    expect(admissible + dueProcess + unreliable).toBe(60);
    expect(dueProcess + unreliable).toBe(41);
    expect(control).toBe(81 - 60);
  });

  it("reproduces the published chi-square of 17.31", () => {
    // The strongest available check, and nothing was fitted to it.
    expect(Number(chiSquare(rows).toFixed(2))).toBe(17.31);
  });

  it("reproduces the published chi-square of 14.56 for citing the wiretap", () => {
    // A separate printed analysis over the same three experimental groups:
    // 63, 15 and 14 per cent named the wiretap as a factor in their verdict.
    // It recovers only if the group sizes 19, 20 and 21 are right.
    const cited: Array<[number, number]> = [
      [12, 19],
      [3, 20],
      [3, 21],
    ];
    expect(cited.map(([a, n]) => Math.round((100 * a) / n))).toEqual([63, 15, 14]);
    expect(Number(chiSquare(cited).toFixed(2))).toBe(14.56);
  });

  it("shows that no other split of the two disregard groups works", () => {
    // 41 split as 21 and 20 rather than 20 and 21 is the only alternative in
    // range, and 55 per cent recovers no whole number against 21.
    const near = [11 / 21, 12 / 21].map((r) => Math.round(100 * r));
    expect(near).not.toContain(55);
    expect(Math.round((100 * 11) / 20)).toBe(55);
  });

  it("keeps the finding the puzzle turns on", () => {
    // The unreliable group is the control group, verdict for verdict, and the
    // due-process group is more than twice either. Without both the reveal
    // says something else.
    expect(cell("unreliable")).toEqual(cell("control"));
    const rate = (g: string) => {
      const [a, n] = cell(g);
      return a / n;
    };
    expect(rate("due-process")).toBeGreaterThan(2 * rate("control"));
    expect(rate("admissible")).toBeGreaterThan(rate("due-process"));
  });

  it("crowns nobody, because a conviction is not a win", () => {
    expect(data.crownWinner).toBe(false);
    expect(data.higherIsBetter).toBe(false);
  });
});

describe("continued influence framing", () => {
  it("shows only the control and admitted bars at the setup", () => {
    expect(continuedInfluence.setup.initialView.groupIds).toEqual([
      "control",
      "admissible",
    ]);
  });

  it("really withholds the two disregard bars", () => {
    const shown = restrictRates(
      continuedInfluence.setup.data as never,
      continuedInfluence.setup.initialView,
    );
    expect(shown.observations).toHaveLength(2);
    const revealed = restrictRates(
      continuedInfluence.setup.data as never,
      continuedInfluence.reveal.view,
    );
    expect(revealed.observations).toHaveLength(4);
  });

  it("states both reasons for exclusion, which is what makes the beat answerable", () => {
    // Without both reasons in the framing the hedge would be the honest answer
    // and marking it wrong would be exactly the failure the policy forbids.
    const framing = continuedInfluence.setup.framing.en;
    expect(framing).toContain("without a proper warrant");
    expect(framing).toContain("barely audible");
    expect(framing).toContain("identical");
  });

  it("offers exactly one band saying the reason mattered", () => {
    const discriminating = continuedInfluence.choices.filter((c) =>
      /illegally obtained|unreliable/i.test(c.label.en),
    );
    expect(discriminating).toHaveLength(1);
    expect(discriminating[0].isCorrect).toBe(true);
    // The other two both say the reason made no difference, which is allowed:
    // they are the two poles a reasoner could land on, and both are wrong.
    const neither = continuedInfluence.choices.filter((c) => /^Neither\./.test(c.label.en));
    expect(neither).toHaveLength(2);
    expect(neither.every((c) => !c.isCorrect)).toBe(true);
    const hedge = continuedInfluence.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
  });

  it("marks the unring-a-bell answer as the intuitive trap", () => {
    expect(continuedInfluence.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("both-high");
  });

  it("refuses the popular reading that corrections never work", () => {
    const body = continuedInfluence.reveal.body?.en ?? "";
    expect(body).toContain("One correction worked perfectly");
    expect(body).toContain("discounted it sincerely");
  });
});

describe("continued influence lesson", () => {
  it("gives the replacement-account test rather than telling the reader to be sceptical", () => {
    const how = continuedInfluence.lesson.howItWorks?.en ?? "";
    expect(how).toContain("supplies a replacement account");
    expect(how).toContain("grounds not to mention it");
  });

  it("names why the ineffective kind of retraction is the common kind", () => {
    const body = continuedInfluence.lesson.body?.en ?? "";
    expect(body).toContain("does not require admitting the thing was wrong");
  });
});

describe("continued influence provenance note", () => {
  const note = continuedInfluence.provenance.note?.en ?? "";

  it("declares the counts reconstructed instead of presenting them as printed", () => {
    expect(note).toContain("reconstructed");
    expect(note).toContain("normally refuses");
  });

  it("lists the six recovered quantities and the chi-squares", () => {
    expect(note).toContain("17.31");
    expect(note).toContain("14.56");
    expect(note).toContain("none of them fitted to");
  });

  it("says why this passed where backlog entry 12's papers failed", () => {
    expect(note).toContain("several readings survived and none landed exactly");
  });

  it("concedes it is a mock jury and not a real one", () => {
    expect(note).toContain("laboratory simulation");
    expect(note).toContain("does not establish what real juries do");
  });
});
