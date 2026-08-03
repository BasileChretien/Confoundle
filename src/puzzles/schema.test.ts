import { describe, expect, it } from "vitest";
import { Puzzle, PuzzleData } from "./schema";
import { sleeperEffect } from "./data/sleeper-effect";
import { thirdPersonEffect } from "./data/third-person-effect";

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
