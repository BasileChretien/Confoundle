import { describe, expect, it } from "vitest";
import { puzzles } from "../../puzzles/index";
import type {
  DriftData,
  EstimationData,
  ForestData,
  PublishedData,
  RatingsData,
  SeriesData,
  YieldData,
} from "../../puzzles/schema";
import { GROUP_PALETTE, colorFor, declaredColors } from "./palette";
import { restrictPublished } from "./published";
import { restrictForest } from "./forest";
import { restrictRatings } from "./ratings";
import { restrictSeries } from "./series";
import { restrictDrift } from "./drift";
import { restrictEstimation } from "./estimation";
import { restrictYield } from "./yield";

/**
 * The colour a beat gives an item must come from the puzzle, not from the beat.
 *
 * Every slice-drawing shape hands its renderer a RESTRICTED copy of the data,
 * and the list the renderer maps over is the one `restrict*` just filtered. Its
 * indices therefore describe the beat. Colour by them and an item drawn alone
 * at the setup takes slot 0, then moves to its real slot when the reveal brings
 * the others in, handing slot 0 to whichever item arrives first. The reader
 * tracking a colour across the two beats is tracking two different things.
 *
 * That is not hypothetical and it is not new: `reporting-rate-violent-crime`
 * shipped with it, and the last test here is the specific case.
 *
 * These tests are pure because the project has no DOM test setup, so they
 * cannot watch a component paint. What they can do is pin the contract of the
 * one function every affected renderer now colours through, prove on real
 * puzzle data that the contract and the old rule genuinely disagree, and then
 * read the renderers' source to check they all go through it. The source scan
 * is the load-bearing one: without it a renderer could quietly go back to
 * indexing its loop and nothing else here would notice.
 */

const puzzleData = <T>(type: string): T => {
  const found = puzzles.find((p) => p.setup.data.type === type);
  if (!found) throw new Error(`no shipped puzzle of shape ${type} to test against`);
  return found.setup.data as T;
};

/**
 * Each slice-drawing shape, as the renderer sees it: the list that carries the
 * colours, and the restriction a beat applies to that same list.
 */
const SHAPES = [
  {
    type: "published",
    /** `restrictPublished` filters `arms`, which is what the trap needs. */
    declared: (d: PublishedData) => d.arms,
    drawn: (d: PublishedData, ids: string[]) =>
      restrictPublished(d, { strataIds: ids }).arms,
  },
  {
    type: "forest",
    declared: (d: ForestData) => d.rows,
    drawn: (d: ForestData, ids: string[]) => restrictForest(d, { groupIds: ids }).rows,
  },
  {
    type: "ratings",
    declared: (d: RatingsData) => d.series,
    drawn: (d: RatingsData, ids: string[]) => restrictRatings(d, { groupIds: ids }).series,
  },
  {
    type: "series",
    declared: (d: SeriesData) => d.lines,
    drawn: (d: SeriesData, ids: string[]) => restrictSeries(d, { groupIds: ids }).lines,
  },
  {
    type: "drift",
    declared: (d: DriftData) => d.series,
    drawn: (d: DriftData, ids: string[]) => restrictDrift(d, { groupIds: ids }).series,
  },
  {
    type: "estimation",
    declared: (d: EstimationData) => d.groups,
    drawn: (d: EstimationData, ids: string[]) =>
      restrictEstimation(d, { groupIds: ids }).groups,
  },
] as const;

describe("declaredColors", () => {
  it("gives an item the slot its DECLARED position names, not its drawn one", () => {
    const declared = [{ id: "first" }, { id: "second" }, { id: "third" }];
    const colorOf = declaredColors(declared);
    expect(colorOf("first")).toBe(GROUP_PALETTE[0]);
    expect(colorOf("second")).toBe(GROUP_PALETTE[1]);
    expect(colorOf("third")).toBe(GROUP_PALETTE[2]);
  });

  /**
   * A miss means a caller passed the restricted list, which is the mistake this
   * exists to prevent. It must still paint something: `colorFor(-1)` does not.
   */
  it("falls back to the first slot rather than to no colour at all", () => {
    expect(declaredColors([{ id: "a" }])("absent")).toBe(GROUP_PALETTE[0]);
    expect(colorFor(-1)).toBeUndefined();
  });

  /**
   * The test the fix was written for, run against every shape that can hide
   * part of its data: hold back everything but the SECOND-declared item, which
   * is the arrangement that makes the drawn index lie, and check the colour is
   * the one the reveal will use.
   */
  it.each(SHAPES.map((s) => [s.type, s] as const))(
    "keeps a %s item's colour when a beat draws only the second-declared one",
    (_type, shape) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const full = puzzleData<any>(shape.type);
      const declared = shape.declared(full);
      expect(declared.length).toBeGreaterThan(1);

      const second = declared[1]!;
      const atSetup = shape.drawn(full, [second.id]);
      const atReveal = shape.drawn(full, declared.map((x: { id: string }) => x.id));

      // Both beats resolve colour against the same declared list, so the item
      // keeps the slot the data file gave it whichever beat is on screen.
      const colorOf = declaredColors(declared);
      expect(atSetup.map((x: { id: string }) => colorOf(x.id))).toEqual([GROUP_PALETTE[1]]);
      expect(atReveal.map((x: { id: string }) => colorOf(x.id))).toEqual(
        declared.map((_x: unknown, i: number) => colorFor(i)),
      );

      // And the rule this replaced, so the fixture is known to exercise the
      // trap rather than merely to pass: indexing the DRAWN list gives the same
      // item two different colours across the two beats.
      const byDrawnIndex = (list: { id: string }[], id: string) =>
        colorFor(list.findIndex((x) => x.id === id));
      expect(byDrawnIndex(atSetup, second.id)).toBe(GROUP_PALETTE[0]);
      expect(byDrawnIndex(atReveal, second.id)).toBe(GROUP_PALETTE[1]);
      expect(byDrawnIndex(atSetup, second.id)).not.toBe(byDrawnIndex(atReveal, second.id));
    },
  );

  /**
   * `yield` restricts ROWS rather than arms, so its arms are already stable and
   * this asserts that rather than a change. It is here because the shape
   * colours by arm, so the day `restrictYield` learns to hold an arm back is
   * the day it joins the list above, and this is what will notice.
   */
  it("leaves yield arms alone, since that shape restricts rows instead", () => {
    const full = puzzleData<YieldData>("yield");
    const rowIds = full.rows.map((r) => r.id);
    const setup = restrictYield(full, { groupIds: [rowIds[rowIds.length - 1]!] });
    expect(setup.arms.map((a) => a.id)).toEqual(full.arms.map((a) => a.id));
  });

  /**
   * The shipped case, named, because it is the reason for all of the above.
   *
   * `reporting-rate-violent-crime` opens on `{ groupIds: ["police"] }`, and
   * `police` is the SECOND line the data file declares. So the setup drew it in
   * slot 0 (teal), and the reveal moved it to slot 1 (rust) while handing teal
   * to the crime-survey line arriving beside it. The figure's whole lesson is
   * that the two instruments disagree, told by watching one line and then the
   * other, and the reader was watching the colour.
   */
  it("holds the police line's colour across the beats of the crime puzzle", () => {
    const puzzle = puzzles.find((p) => p.id === "reporting-rate-violent-crime");
    expect(puzzle).toBeDefined();
    const full = puzzle!.setup.data as SeriesData;
    expect(full.lines.map((l) => l.id)).toEqual(["survey", "police"]);
    expect(puzzle!.setup.initialView.groupIds).toEqual(["police"]);

    const colorOf = declaredColors(full.lines);
    const setup = restrictSeries(full, { groupIds: ["police"] });
    expect(colorOf("police")).toBe(GROUP_PALETTE[1]);
    expect(colorOf("survey")).toBe(GROUP_PALETTE[0]);

    // What shipped: alone on screen, the police line took the survey's colour.
    expect(setup.lines.findIndex((l) => l.id === "police")).toBe(0);
    expect(colorFor(0)).not.toBe(colorOf("police"));
  });
});

/**
 * And the rule at the call sites, which is where it actually has to hold.
 *
 * The tests above pin what the function does; nothing in them can see whether a
 * renderer calls it. That gap is exactly how the bug survived, since a renderer
 * indexing its own loop looks completely ordinary and the figure it draws stays
 * internally consistent. So this reads the source, the way
 * `translations/inlineChrome.test.ts` does and for the same reason: the call
 * site is the only place the mistake is visible.
 *
 * THE RULE IS ABOUT WHERE A PALETTE SLOT COMES FROM, not about which props a
 * renderer takes. A fixed slot is fine and several figures are right to use one
 * (`colorFor(0)` for the single line a shape draws, `colorFor(1)` for the thing
 * it is set against, `colorFor(past ? 1 : 0)` for the two sides of a threshold)
 * because none of those is a position in a list. What must never come back is a
 * slot read out of the list the renderer is looping over, because in a sliced
 * renderer that list is the restricted one.
 */
describe("slice-drawing renderers", () => {
  const SOURCES = import.meta.glob("./*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const sourceOf = (name: string): string => {
    const hit = Object.entries(SOURCES).find(([path]) => path.endsWith(`/${name}.tsx`));
    if (!hit) throw new Error(`${name}.tsx not found; was it renamed?`);
    return hit[1];
  };

  /**
   * Which renderers those are is READ OFF `DataViewRenderer`, never listed here.
   * A hand-kept list would cover exactly the shapes that existed the day it was
   * written, and the whole point of this file is the shape that has not been
   * built yet: whoever adds one gets the check without knowing it exists.
   */
  const SLICED = [
    ...sourceOf("DataViewRenderer").matchAll(/<(\w+View)\b([\s\S]{0,500}?)\/>/g),
  ]
    .filter((m) => /data=\{restrict/.test(m[2]!))
    .map((m) => m[1]!)
    .filter((name, i, all) => all.indexOf(name) === i)
    .sort();

  it("finds the renderers that are handed a restricted copy of the data", () => {
    // A parse that quietly matched nothing would pass every check below, and
    // this list is the only place the scan's reach is legible.
    expect(SLICED).toEqual([
      "BunchingView",
      "CrossedView",
      "DistributionView",
      "DoseView",
      "DriftView",
      "EstimationView",
      "ForestView",
      "PublishedView",
      "RatingsView",
      "SalienceView",
      "SeriesView",
      "YieldView",
    ]);
  });

  /** Every argument to `colorFor`, matched by balancing its brackets rather
   *  than by a regex, so a nested call is read whole instead of cut in half. */
  const paletteArgs = (src: string): string[] => {
    const args: string[] = [];
    const needle = "colorFor(";
    for (let at = src.indexOf(needle); at !== -1; at = src.indexOf(needle, at + 1)) {
      let depth = 1;
      let i = at + needle.length;
      while (i < src.length && depth > 0) {
        if (src[i] === "(") depth++;
        else if (src[i] === ")") depth--;
        if (depth > 0) i++;
      }
      args.push(src.slice(at + needle.length, i));
    }
    return args;
  };

  /**
   * A slot is fine when the numbers themselves are written down. A condition in
   * front of them is fine too: `past ? 1 : 0` picks between two literal slots
   * on which side of a threshold a bin falls, which is a fact about the bin and
   * not a position in a list. So the test looks only at what is chosen BETWEEN.
   */
  const chosenSlots = (arg: string) =>
    arg.includes("?") ? arg.slice(arg.indexOf("?") + 1) : arg;

  it.each(SLICED)("%s takes every palette slot from the declared order", (name) => {
    const offenders = paletteArgs(sourceOf(name)).filter(
      (arg) =>
        !/^[\s\d:]*$/.test(chosenSlots(arg)) &&
        // `declaredSlot` resolves against the unrestricted list by
        // construction, so a slot derived from it is what this wants to see.
        // Shapes spending one colour per item use `declaredColors` and reach
        // `colorFor` not at all.
        !arg.includes("slotOf("),
    );
    expect(offenders).toEqual([]);
  });

  /**
   * And the mistake the fix itself could make: building the lookup from the
   * restricted copy, which would look right and change nothing.
   */
  it("builds every colour lookup from the unrestricted data", () => {
    const wrong = Object.entries(SOURCES).flatMap(([path, src]) =>
      [...src.matchAll(/\bdeclared(?:Colors|Slot)\(([^)]*)\)/g)]
        .filter((m) => !m[1]!.startsWith("full."))
        .map((m) => `${path}: ${m[0]}`),
    );
    expect(wrong).toEqual([]);
  });
});
