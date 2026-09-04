import { beforeAll, describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { puzzles } from "../../puzzles/all";
import { PuzzleData } from "../../puzzles/schema";
import type { ForestData } from "../../puzzles/schema";
import { ForestView } from "./ForestView";
import { restrictForest } from "./forest";

/**
 * The count column, which only exists when a source printed counts.
 *
 * `k` became optional so a forest could draw one study's subgroup estimates
 * where the stratum sizes are inside a figure rather than a table. The gate
 * that hides the column lives in the component, so no pure test can see it,
 * and `forest.test.ts` would stay green with the column drawing empty cells on
 * every row of every puzzle.
 *
 * The second test is the one that cost thought. The gate reads the
 * UNRESTRICTED rows, because reading the restricted copy lets the column
 * appear at one beat and vanish at the other on a figure whose whole promise
 * is that the two beats are the same picture with more of it shown.
 */

const forestOf = (id: string): ForestData => {
  const p = puzzles.find((x) => x.id === id);
  if (!p) throw new Error(`no puzzle ${id}`);
  if (p.setup.data.type !== "forest") throw new Error(`${id} is not a forest`);
  return p.setup.data;
};

const render = (full: ForestData, groupIds?: string[]) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: "en" as const,
      children: createElement(ForestView, {
        data: restrictForest(full, { groupIds }),
        full,
        kind: "whatisknown" as const,
      }),
    }),
  );

/** The column is a fixed-width span; count how many a row carries. */
const countCells = (html: string) => html.split("w-8 shrink-0 text-right").length - 1;

beforeAll(async () => {
  await loadDictionary("en");
}, 60_000);

describe("a forest whose source printed counts", () => {
  const withCounts = forestOf("count-it-differently");

  it("draws one count cell per row", () => {
    expect(countCells(render(withCounts))).toBe(withCounts.rows.length);
  });

  it("prints the counts themselves", () => {
    const html = render(withCounts);
    for (const r of withCounts.rows) {
      expect(r.k).toBeDefined();
      expect(html).toContain(String(r.k));
    }
  });
});

describe("a forest whose source printed none", () => {
  const countless = forestOf("collider-stratification-birthweight");

  it("draws no count cell at all, rather than blank ones", () => {
    expect(countless.rows.every((r) => r.k === undefined)).toBe(true);
    expect(countCells(render(countless))).toBe(0);
  });

  /**
   * The gate reads `full`, so a beat drawing one row of four must agree with
   * the beat drawing all four about whether the column exists.
   */
  it("agrees between the beats about whether the column exists", () => {
    const setup = countCells(render(countless, ["lbw"]));
    const reveal = countCells(render(countless));
    expect({ setup, reveal }).toEqual({ setup: 0, reveal: 0 });
  });

  it("still draws every row it was given", () => {
    // A gate that hid the rows instead of the column would also score zero
    // above, so the figure has to be shown to still contain its content.
    const html = render(countless, ["lbw"]);
    expect(html).toContain("Under 2,500 g");
    expect(html).not.toContain("All babies");
    expect(render(countless)).toContain("All babies");
  });
});

describe("the same agreement holds for a forest that has counts", () => {
  /**
   * The mirror of the case above, and the one that fails if the gate is moved
   * from `full` to `data`: a beat that draws only rows carrying counts would
   * still show the column, so the bug is invisible on this puzzle unless the
   * comparison is made across beats.
   */
  it("keeps the column at both beats", () => {
    const withCounts = forestOf("count-it-differently");
    const first = withCounts.rows[0]!.id;
    expect(countCells(render(withCounts, [first]))).toBe(1);
    expect(countCells(render(withCounts))).toBe(withCounts.rows.length);
  });
});

/**
 * THE CASE NO SHIPPED PUZZLE EXERCISES, and the reason this block exists.
 *
 * Every forest in the deck either has a count on all four rows or on none, so
 * the two candidate gates, `full.rows.some(...)` and `data.rows.some(...)`,
 * agree on every real card at every beat. A mutation run swapped `full` for
 * `data` and the whole suite stayed green. The difference only shows on a
 * MIXED forest whose beat draws the countless rows, so the fixture has to be
 * built rather than found.
 */
describe("a forest where only some rows carry a count", () => {
  const t = (en: string) => ({ en });
  const mixed: ForestData = {
    type: "forest",
    label: t("A figure"),
    unit: t("odds ratio"),
    metricLabel: t("Estimate"),
    nullValue: 1,
    nullLabel: t("No effect"),
    worseLabel: t("Worse"),
    betterLabel: t("Better"),
    axisMin: 0.5,
    axisMax: 2,
    rows: [
      { id: "counted", label: t("The pooled row"), estimate: 1.4, ciLow: 1.2, ciHigh: 1.6, k: 12 },
      { id: "bare-a", label: t("A stratum"), estimate: 0.8, ciLow: 0.7, ciHigh: 0.9 },
      { id: "bare-b", label: t("Another stratum"), estimate: 1.7, ciLow: 1.5, ciHigh: 1.9 },
    ],
  };

  it("is a valid shape, so the fixture is testing the renderer and not zod", () => {
    expect(PuzzleData.safeParse(mixed).success).toBe(true);
  });

  it("keeps the column on a beat that draws only the countless rows", () => {
    // Reading the RESTRICTED rows here would find no count and drop the
    // column, so every row would jump sideways between this beat and the next.
    expect(countCells(render(mixed, ["bare-a", "bare-b"]))).toBe(2);
    expect(countCells(render(mixed))).toBe(3);
  });

  it("leaves the countless cells empty rather than printing a zero", () => {
    const html = render(mixed, ["bare-a"]);
    expect(countCells(html)).toBe(1);
    expect(html).not.toContain(">0<");
  });
});
