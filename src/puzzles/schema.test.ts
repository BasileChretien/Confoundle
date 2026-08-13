import { describe, expect, it } from "vitest";
import { Puzzle, PuzzleData } from "./schema";
import { haloEffect } from "./data/halo-effect";
import { sleeperEffect } from "./data/sleeper-effect";
import { thirdPersonEffect } from "./data/third-person-effect";
import { meanVsMedian } from "./data/mean-vs-median";
import { illusoryTruth } from "./data/illusory-truth";
import { anchoring } from "./data/anchoring";
import { availabilityHeuristic } from "./data/availability-heuristic";
import { baseRate } from "./data/base-rate";
import { kidneyStones } from "./data/kidney-stones";
import { thresholdBunching } from "./data/threshold-bunching";

/**
 * The two shapes added in this stack, `drift` and `ratings`, brought about 210
 * lines of `superRefine` validation with them and no tests. That validation is
 * the only thing standing between a mistyped data file and a chart that draws
 * something untrue, so it is worth testing directly rather than only through
 * the puzzles that happen to use it today.
 *
 * Every case below is a mistake somebody could plausibly make while authoring.
 */
const t = (en: string) => ({ en });

const drift = {
  type: "drift" as const,
  label: t("Movement"),
  metricLabel: t("Net movers"),
  baselineLabel: t("Where they started"),
  series: [
    { id: "a", label: t("A") },
    { id: "b", label: t("B") },
  ],
  checkpoints: [
    { id: "t1", label: t("Then") },
    { id: "t2", label: t("Later") },
  ],
  observations: [
    { seriesId: "a", checkpointId: "t1", net: 4, denominator: 10 },
    { seriesId: "a", checkpointId: "t2", net: -2, denominator: 10 },
    { seriesId: "b", checkpointId: "t1", net: 1, denominator: 10 },
    { seriesId: "b", checkpointId: "t2", net: 3, denominator: 10 },
  ],
};

const ratings = {
  type: "ratings" as const,
  label: t("Ratings"),
  metricLabel: t("Mean rating"),
  scale: {
    min: 0,
    max: 10,
    minLabel: t("0, bad"),
    maxLabel: t("10, good"),
  },
  series: [
    { id: "a", label: t("A") },
    { id: "b", label: t("B") },
  ],
  observations: [
    { seriesId: "a", mean: 3.2, n: 100 },
    { seriesId: "b", mean: 4.8, n: 100 },
  ],
};

/** Parses a shape and returns the messages, so a test can assert on them. */
const problems = (data: unknown): string[] => {
  const result = PuzzleData.safeParse(data);
  if (result.success) return [];
  return result.error.issues.map((i) => i.message);
};

describe("drift validation", () => {
  it("accepts a well-formed shape", () => {
    expect(problems(drift)).toEqual([]);
  });

  it("accepts a negative net, which is the whole reason the shape exists", () => {
    expect(problems(drift)).toEqual([]);
    expect(drift.observations.some((o) => o.net < 0)).toBe(true);
  });

  it("rejects an observation naming a series that does not exist", () => {
    const bad = {
      ...drift,
      observations: [{ ...drift.observations[0], seriesId: "typo" }, ...drift.observations.slice(1)],
    };
    expect(problems(bad).join(" ")).toContain("no series with id typo");
  });

  it("rejects an observation naming a checkpoint that does not exist", () => {
    const bad = {
      ...drift,
      observations: [
        { ...drift.observations[0], checkpointId: "typo" },
        ...drift.observations.slice(1),
      ],
    };
    expect(problems(bad).join(" ")).toContain("no checkpoint with id typo");
  });

  it("rejects a net larger than the people it was measured over", () => {
    // A sign slip or a mistyped denominator, and the bar would run off the end.
    const bad = {
      ...drift,
      observations: [{ ...drift.observations[0], net: 11 }, ...drift.observations.slice(1)],
    };
    expect(problems(bad).join(" ")).toContain("larger than the 10 people");
  });

  it("rejects a net more negative than the people it was measured over", () => {
    const bad = {
      ...drift,
      observations: [{ ...drift.observations[0], net: -11 }, ...drift.observations.slice(1)],
    };
    expect(problems(bad).join(" ")).toContain("larger than the 10 people");
  });

  it("rejects a missing cell, which would silently drop half a comparison", () => {
    const bad = { ...drift, observations: drift.observations.slice(0, 3) };
    expect(problems(bad).join(" ")).toContain("no observation for series b at checkpoint t2");
  });
});

describe("ratings validation", () => {
  it("accepts a well-formed shape", () => {
    expect(problems(ratings)).toEqual([]);
  });

  it("accepts a shape with no dispersion, since papers vary in what they print", () => {
    expect(ratings.observations.every((o) => !("sd" in o))).toBe(true);
    expect(problems(ratings)).toEqual([]);
  });

  it("rejects a scale whose ends are the wrong way round", () => {
    const bad = { ...ratings, scale: { ...ratings.scale, min: 10, max: 0 } };
    expect(problems(bad).join(" ")).toContain("scale max must be above scale min");
  });

  it("rejects an anchor drawn without a label", () => {
    const bad = { ...ratings, scale: { ...ratings.scale, anchorAt: 5 } };
    expect(problems(bad).join(" ")).toContain("without a label tells the reader nothing");
  });

  it("rejects a label with no anchor to describe", () => {
    // Caught while reviewing this stack. RatingsView prints the label whenever
    // it exists but draws the line only when anchorAt does, so this
    // combination puts a sentence on screen about a mark nobody can see.
    const bad = { ...ratings, scale: { ...ratings.scale, anchorLabel: t("the middle") } };
    expect(problems(bad).join(" ")).toContain("anchorAt has to say where it goes");
  });

  it("accepts an anchor with its label", () => {
    const good = {
      ...ratings,
      scale: { ...ratings.scale, anchorAt: 5, anchorLabel: t("the middle") },
    };
    expect(problems(good)).toEqual([]);
  });

  it("rejects an anchor off the end of its own scale", () => {
    const bad = {
      ...ratings,
      scale: { ...ratings.scale, anchorAt: 12, anchorLabel: t("nowhere") },
    };
    expect(problems(bad).join(" ")).toContain("anchor must sit on the scale");
  });

  it("rejects a mean outside the scale it was measured on", () => {
    const bad = {
      ...ratings,
      observations: [{ seriesId: "a", mean: 11, n: 100 }, ratings.observations[1]],
    };
    expect(problems(bad).join(" ")).toContain("outside the 0 to 10 scale");
  });

  it("rejects an observation naming a series that does not exist", () => {
    const bad = {
      ...ratings,
      observations: [{ seriesId: "typo", mean: 3, n: 10 }, ratings.observations[1]],
    };
    expect(problems(bad).join(" ")).toContain("no series with id typo");
  });

  it("rejects two observations for the same series", () => {
    // Copy-paste while adding a row, and the chart would draw one series twice
    // and another not at all.
    const bad = {
      ...ratings,
      observations: [...ratings.observations, { seriesId: "a", mean: 9, n: 100 }],
    };
    expect(problems(bad).join(" ")).toContain("two observations for series a");
  });

  it("rejects a series with no observation", () => {
    const bad = {
      ...ratings,
      series: [...ratings.series, { id: "c", label: t("C") }],
    };
    expect(problems(bad).join(" ")).toContain("no observation for series c");
  });
});

/**
 * `bunching`, the third shape added this way. Its guards are different in kind
 * from the others: two of them are about the bins being an axis rather than a
 * set, and one refuses data where the lesson would not be true.
 */
const bunching = {
  type: "bunching" as const,
  label: t("Counts by bin"),
  metricLabel: t("Items in each bin"),
  itemLabel: t("One bin"),
  thresholdLabel: t("The line"),
  bins: [
    { id: "a", label: t("a"), count: 100, past: false },
    { id: "b", label: t("b"), count: 98, past: false },
    { id: "c", label: t("c"), count: 70, past: true },
  ],
};

describe("bunching data", () => {
  it("accepts a well-formed shape", () => {
    expect(problems(bunching)).toEqual([]);
  });

  it("accepts the shipped puzzle's data unchanged", () => {
    expect(problems(thresholdBunching.setup.data)).toEqual([]);
  });

  it("rejects duplicate bin ids", () => {
    const bad = {
      ...bunching,
      bins: [...bunching.bins, { id: "a", label: t("again"), count: 60, past: true }],
    };
    expect(problems(bad).join(" ")).toContain('duplicate bin id "a"');
  });

  it("rejects bins that are all on one side of the line", () => {
    const noPast = {
      ...bunching,
      bins: bunching.bins.map((b) => ({ ...b, past: false })),
    };
    expect(problems(noPast).join(" ")).toContain("bins on both sides");
    const allPast = {
      ...bunching,
      bins: bunching.bins.map((b) => ({ ...b, past: true })),
    };
    expect(problems(allPast).join(" ")).toContain("bins on both sides");
  });

  it("rejects bins that cross back over the line", () => {
    // The array is the axis, so a `past` flag that alternates would draw a
    // threshold in two places at once.
    const bad = {
      ...bunching,
      bins: [
        { id: "a", label: t("a"), count: 100, past: false },
        { id: "b", label: t("b"), count: 70, past: true },
        { id: "c", label: t("c"), count: 98, past: false },
      ],
    };
    expect(problems(bad).join(" ")).toContain("out of order");
  });

  it("refuses data where nothing actually bunches", () => {
    // If the count does not fall across the line, the reveal would restate the
    // setup, so the shape declines to draw it at all.
    const flat = {
      ...bunching,
      bins: [
        { id: "a", label: t("a"), count: 100, past: false },
        { id: "b", label: t("b"), count: 98, past: false },
        { id: "c", label: t("c"), count: 98, past: true },
      ],
    };
    expect(problems(flat).join(" ")).toContain("nothing bunches at the threshold");
  });

  it("needs at least three bins to show a step at all", () => {
    const bad = {
      ...bunching,
      bins: bunching.bins.slice(0, 2),
    };
    expect(problems(bad).length).toBeGreaterThan(0);
  });
});

/**
 * The view-filter guard, which the rates branch has had for a long time and
 * the two new shapes shipped without. Its own comment in `schema.ts` says why
 * it matters: a view naming an id that does not exist renders an empty beat
 * and nothing fails. These start from the shipped puzzles and break one field,
 * so they stay honest if the puzzles are ever rewritten.
 */
const puzzleProblems = (p: unknown): string[] => {
  const result = Puzzle.safeParse(p);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

describe("view filters must name data that exists", () => {
  it("accepts the shipped drift puzzle unchanged", () => {
    expect(puzzleProblems(sleeperEffect)).toEqual([]);
  });

  it("accepts the shipped ratings puzzle unchanged", () => {
    expect(puzzleProblems(thirdPersonEffect)).toEqual([]);
  });

  it("rejects a drift view filtering to a checkpoint that does not exist", () => {
    const bad = {
      ...sleeperEffect,
      setup: {
        ...sleeperEffect.setup,
        initialView: { ...sleeperEffect.setup.initialView, strataIds: ["typo"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain('unknown checkpoint id "typo"');
  });

  it("rejects a drift view filtering to a series that does not exist", () => {
    const bad = {
      ...sleeperEffect,
      reveal: {
        ...sleeperEffect.reveal,
        view: { ...sleeperEffect.reveal.view, groupIds: ["typo"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain('unknown series id "typo"');
  });

  it("rejects a ratings view filtering to a series that does not exist", () => {
    const bad = {
      ...thirdPersonEffect,
      setup: {
        ...thirdPersonEffect.setup,
        initialView: { ...thirdPersonEffect.setup.initialView, groupIds: ["typo"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain('unknown series id "typo"');
  });

  it("rejects strataIds on a ratings puzzle, which has no strata to filter", () => {
    const bad = {
      ...thirdPersonEffect,
      setup: {
        ...thirdPersonEffect.setup,
        initialView: { ...thirdPersonEffect.setup.initialView, strataIds: ["anything"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain("ratings has no strata");
  });
});

/**
 * The four shapes that could always be filtered and never had the guard, plus
 * one that cannot be filtered at all. Each case names a real shipped puzzle and
 * breaks one field, so the test says something about the engine rather than
 * about a fixture invented to pass.
 *
 * Each shape calls its filterable collection something different, which is
 * exactly why the guard is keyed by type rather than duck-typed on `groups`.
 */
describe("the view filter guard covers every filterable shape", () => {
  const cases = [
    { name: "distribution", puzzle: meanVsMedian, word: "group" },
    { name: "dose", puzzle: illusoryTruth, word: "step" },
    { name: "estimation", puzzle: anchoring, word: "group" },
    { name: "salience", puzzle: availabilityHeuristic, word: "comparison" },
  ] as const;

  for (const { name, puzzle, word } of cases) {
    it(`accepts the shipped ${name} puzzle unchanged`, () => {
      expect(puzzleProblems(puzzle)).toEqual([]);
    });

    it(`rejects a ${name} view filtering to an id that does not exist`, () => {
      const bad = {
        ...puzzle,
        setup: {
          ...puzzle.setup,
          initialView: { ...puzzle.setup.initialView, groupIds: ["typo"] },
        },
      };
      expect(puzzleProblems(bad).join(" ")).toContain(`unknown ${word} id "typo"`);
    });

    it(`rejects strataIds on ${name}, which has no second axis`, () => {
      const bad = {
        ...puzzle,
        setup: {
          ...puzzle.setup,
          initialView: { ...puzzle.setup.initialView, strataIds: ["anything"] },
        },
      };
      expect(puzzleProblems(bad).join(" ")).toContain("has no strata");
    });
  }

  it("rejects a filter on a shape that cannot be filtered at all", () => {
    // frequencies draws one fixed diagram; there is no id a view could name,
    // so a groupIds on it is always a mistake rather than an unknown id.
    const bad = {
      ...baseRate,
      setup: {
        ...baseRate.setup,
        initialView: { ...baseRate.setup.initialView, groupIds: ["anything"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain("cannot be filtered");
  });

  it("still guards rates, which is where this check started", () => {
    // The refactor moved this check out of the rates branch, so the case it
    // was originally written for has to keep working.
    expect(puzzleProblems(kidneyStones)).toEqual([]);
    const badGroup = {
      ...kidneyStones,
      setup: {
        ...kidneyStones.setup,
        initialView: { ...kidneyStones.setup.initialView, groupIds: ["typo"] },
      },
    };
    expect(puzzleProblems(badGroup).join(" ")).toContain('unknown group id "typo"');
    const badStratum = {
      ...kidneyStones,
      reveal: {
        ...kidneyStones.reveal,
        view: { ...kidneyStones.reveal.view, strataIds: ["typo"] },
      },
    };
    expect(puzzleProblems(badStratum).join(" ")).toContain('unknown stratum id "typo"');
  });

  it("accepts the shipped bunching puzzle unchanged", () => {
    expect(puzzleProblems(thresholdBunching)).toEqual([]);
  });

  it("rejects a bunching view filtering to a bin that does not exist", () => {
    const bad = {
      ...thresholdBunching,
      setup: {
        ...thresholdBunching.setup,
        initialView: {
          ...thresholdBunching.setup.initialView,
          groupIds: ["359", "typo"],
        },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain('unknown bin id "typo"');
  });

  it("rejects a bunching view trying to filter by stratum", () => {
    // There are no strata in this shape, so naming one is always a mistake.
    const bad = {
      ...thresholdBunching,
      reveal: {
        ...thresholdBunching.reveal,
        view: { ...thresholdBunching.reveal.view, strataIds: ["anything"] },
      },
    };
    expect(puzzleProblems(bad).join(" ")).toContain(
      "bunching has no strata, so strataIds filters nothing",
    );
  });
});

describe("conditional validation", () => {
  /**
   * A minimal well-formed grid: two rows, three columns, one row flat and the
   * other spread, which is the whole precondition this shape exists to enforce.
   */
  const conditional = {
    type: "conditional",
    label: { en: "Score" },
    metricLabel: { en: "Mean score" },
    factorLabel: { en: "The cue" },
    meanNote: { en: "Means as published." },
    scale: { min: 1, max: 9, minLabel: { en: "low" }, maxLabel: { en: "high" } },
    rows: [
      { id: "strong", label: { en: "Strong" } },
      { id: "weak", label: { en: "Weak" } },
    ],
    columns: [
      { id: "up", label: { en: "Up" } },
      { id: "none", label: { en: "None" }, isBaseline: true },
      { id: "down", label: { en: "Down" } },
    ],
    cells: [
      { rowId: "strong", columnId: "up", mean: 6.7, n: 10 },
      { rowId: "strong", columnId: "none", mean: 6.6, n: 10 },
      { rowId: "strong", columnId: "down", mean: 5.9, n: 10 },
      { rowId: "weak", columnId: "up", mean: 5.2, n: 10 },
      { rowId: "weak", columnId: "none", mean: 4.7, n: 10 },
      { rowId: "weak", columnId: "down", mean: 2.7, n: 10 },
    ],
  };

  it("accepts a well-formed shape", () => {
    expect(problems(conditional)).toEqual([]);
  });

  it("rejects a grid that is flat in every row", () => {
    // Regression. Flat everywhere makes widest and narrowest both 0, and the
    // ratio test reads "0 < 2 * 0", which is false, so this passed and a chart
    // with no variation at all would have shipped as an interaction chart.
    const flat = {
      ...conditional,
      cells: conditional.cells.map((c) => ({ ...c, mean: 5 })),
    };
    expect(problems(flat).join(" ")).toContain("every row is flat");
  });

  it("still rejects a real but too-similar interaction", () => {
    // The flat guard must not have swallowed the ratio guard it precedes.
    const shallow = {
      ...conditional,
      cells: conditional.cells.map((c) =>
        c.rowId === "weak" && c.columnId === "down" ? { ...c, mean: 5.4 } : c,
      ),
    };
    expect(problems(shallow).join(" ")).toContain("no interaction for this shape to reveal");
  });

  it("does not confuse two different cells whose ids contain a separator", () => {
    // Regression. Keys were built as `rowId|columnId`, so ("a|b","c") and
    // ("a","b|c") collided: the duplicate check fired on a correct grid and,
    // worse, the completeness check accepted one with a hole.
    const piped = {
      ...conditional,
      rows: [
        { id: "a|b", label: { en: "A" } },
        { id: "a", label: { en: "B" } },
      ],
      columns: [
        { id: "c", label: { en: "C" } },
        { id: "b|c", label: { en: "D" } },
      ],
      cells: [
        { rowId: "a|b", columnId: "c", mean: 2, n: 5 },
        { rowId: "a|b", columnId: "b|c", mean: 8, n: 5 },
        { rowId: "a", columnId: "c", mean: 5, n: 5 },
        { rowId: "a", columnId: "b|c", mean: 5.5, n: 5 },
      ],
    };
    const found = problems(piped).join(" ");
    expect(found).not.toContain("two cells for");
    expect(found).not.toContain("no cell for");
  });

  it("still catches a hole when the ids contain a separator", () => {
    // The half above only proves the old collision no longer fires a FALSE
    // positive. The dangerous half was the opposite: with `a|b` + `c` and `a` +
    // `b|c` colliding on one key, a grid genuinely missing a cell looked
    // complete, because the other pair had already marked that key seen. So
    // drop one cell from the same fixture and require the complaint.
    const holed = {
      ...conditional,
      rows: [
        { id: "a|b", label: { en: "A" } },
        { id: "a", label: { en: "B" } },
      ],
      columns: [
        { id: "c", label: { en: "C" } },
        { id: "b|c", label: { en: "D" } },
      ],
      cells: [
        { rowId: "a|b", columnId: "c", mean: 2, n: 5 },
        { rowId: "a|b", columnId: "b|c", mean: 8, n: 5 },
        { rowId: "a", columnId: "c", mean: 5, n: 5 },
        // ("a", "b|c") deliberately absent. Under the old key scheme this was
        // indistinguishable from ("a|b", "c"), which is present, so the hole
        // went unreported.
      ],
    };
    expect(problems(holed).join(" ")).toContain("no cell for row a, column b|c");
  });

  it("rejects a mean outside the authored scale", () => {
    const bad = {
      ...conditional,
      cells: conditional.cells.map((c, i) => (i === 0 ? { ...c, mean: 99 } : c)),
    };
    expect(problems(bad).join(" ")).toContain("outside the scale");
  });

  it("rejects a grid with a missing cell", () => {
    const holed = { ...conditional, cells: conditional.cells.slice(1) };
    expect(problems(holed).join(" ")).toContain("no cell for row");
  });
});

describe("conditional view semantics", () => {
  /**
   * These go through `Puzzle`, not `PuzzleData`. The view guards live in the
   * puzzle-level superRefine, because they compare the view against the data,
   * so a `PuzzleData.safeParse` case cannot reach them and would pass while
   * testing nothing. That is exactly what the first version of these tests did.
   */
  const puzzleProblems = (p: unknown): string[] => {
    const result = Puzzle.safeParse(p);
    if (result.success) return [];
    return result.error.issues.map((i) => i.message);
  };

  const withViews = (initialView: unknown, revealView: unknown) => ({
    ...haloEffect,
    setup: { ...haloEffect.setup, initialView },
    reveal: { ...haloEffect.reveal, view: revealView },
  });

  it("accepts the shipped pairing, so the guards are not simply always firing", () => {
    expect(puzzleProblems(haloEffect)).toEqual([]);
  });

  it("rejects onerow that names no row, which would draw every row", () => {
    const bad = withViews(
      { kind: "onerow", caption: { en: "x" } },
      haloEffect.reveal.view,
    );
    expect(puzzleProblems(bad).join(" ")).toContain("onerow must name exactly one row");
  });

  it("rejects onerow that names more than one row", () => {
    const bad = withViews(
      { kind: "onerow", groupIds: ["good", "poor"], caption: { en: "x" } },
      haloEffect.reveal.view,
    );
    expect(puzzleProblems(bad).join(" ")).toContain("onerow must name exactly one row");
  });

  it("rejects bothrows carrying groupIds, which would draw fewer rows than it says", () => {
    const bad = withViews(haloEffect.setup.initialView, {
      kind: "bothrows",
      groupIds: ["good"],
      caption: { en: "x" },
    });
    expect(puzzleProblems(bad).join(" ")).toContain("groupIds would contradict it");
  });

  it("rejects a view kind that DataViewRenderer would render as nothing", () => {
    const bad = withViews(
      { kind: "aggregate", caption: { en: "x" } },
      haloEffect.reveal.view,
    );
    expect(puzzleProblems(bad).join(" ")).toContain("cannot be drawn as");
  });
});
