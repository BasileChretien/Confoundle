import { describe, expect, it } from "vitest";
import { colliderStratification } from "./collider-stratification";
import {
  benchmarkRow,
  forestRows,
  reachesBenchmark,
  restrictForest,
  rowAt,
  showsBenefit,
  showsHarm,
} from "../../engine/charts/forest";

/**
 * Hernández-Díaz, Schisterman and Hernán, AJE 2006, read at source.
 *
 * The source prints rate ratios from logistic regression rather than counts, so
 * unlike most cards in this deck nothing here is recomputed. What this file
 * checks instead is that the four authored figures are the printed ones, that
 * the claim the card rests on (the stratum estimate points the OTHER WAY from
 * the whole population, not merely a smaller way) is derived from which
 * intervals clear the null, and that the card says out loud where its numbers
 * cannot be reconciled.
 */
const raw = colliderStratification.setup.data;
if (raw.type !== "forest") throw new Error("expected forest data");
const data = raw;

const IMR_SMOKERS = 1235;
const IMR_NONSMOKERS = 805;
const LIVEBIRTHS = 3001621;

describe("the figures as printed", () => {
  it("carries all four estimates with their intervals", () => {
    const of = (id: string) => {
      const r = rowAt(data, id);
      return [r.estimate, r.ciLow, r.ciHigh];
    };
    expect(of("lbw")).toEqual([0.79, 0.76, 0.82]);
    expect(of("overall")).toEqual([1.55, 1.5, 1.59]);
    expect(of("normal")).toEqual([1.8, 1.72, 1.88]);
    expect(of("adjusted")).toEqual([1.09, 1.05, 1.12]);
  });

  it("puts the null at 1 and reads above it as harm, since these are deaths", () => {
    expect(data.nullValue).toBe(1);
    expect(data.higherIsWorse).toBe(true);
  });

  it("carries the population and both mortality rates in the framing or provenance", () => {
    const f = colliderStratification.setup.framing.en;
    expect(f).toContain(LIVEBIRTHS.toLocaleString("en-US"));
    expect(f).toContain("11.4");
    expect(f).toContain("6.4");
    const h = colliderStratification.reveal.headline.en;
    expect(h).toContain(IMR_SMOKERS.toLocaleString("en-US"));
    expect(h).toContain(String(IMR_NONSMOKERS));
  });
});

describe("the finding the card turns on, derived not asserted", () => {
  it("has the underweight stratum point the OPPOSITE way from everyone", () => {
    // Not "a smaller effect": the sign flips, and the interval clears the null
    // on the other side. That is what makes it a paradox rather than dilution.
    expect(showsBenefit(data, "lbw")).toBe(true);
    expect(showsHarm(data, "overall")).toBe(true);
    expect(rowAt(data, "lbw").side).toBe("better");
    expect(rowAt(data, "overall").side).toBe("worse");
  });

  it("has the normal-weight stratum point the same way as everyone, only harder", () => {
    // Both strata cannot be better off than the whole, and this is the row that
    // shows the reader where the missing harm went.
    expect(showsHarm(data, "normal")).toBe(true);
    expect(rowAt(data, "normal").estimate).toBeGreaterThan(rowAt(data, "overall").estimate);
  });

  it("has adjustment do the same damage as splitting, less visibly", () => {
    // 1.55 to 1.09: still harm, but most of it gone, which is the reading the
    // fourth band offers and the reveal refutes.
    expect(showsHarm(data, "adjusted")).toBe(true);
    expect(rowAt(data, "adjusted").estimate).toBeLessThan(rowAt(data, "overall").estimate);
  });

  it("draws the whole-population estimate as the benchmark the strata miss", () => {
    expect(data.benchmarkId).toBe("overall");
    expect(benchmarkRow(data)?.id).toBe("overall");
    // Neither stratum's interval reaches the overall estimate, which is the
    // stronger claim than "they differ".
    expect(reachesBenchmark(data, "lbw")).toBe(false);
    expect(reachesBenchmark(data, "normal")).toBe(false);
  });
});

describe("what the card refuses to compute", () => {
  /**
   * THE REASON THE PROVENANCE NOTE EXISTS, pinned so nobody later "fixes" the
   * card by deriving the rate ratio from the two rates. The source estimates
   * the ratio by logistic regression, so the printed rate ratio is not the
   * quotient of the printed rates, and the difference is real rather than
   * rounding.
   */
  it("does not derive 1.55 from the two mortality rates, because it cannot", () => {
    const quotient = IMR_SMOKERS / IMR_NONSMOKERS;
    expect(quotient).toBeCloseTo(1.534, 3);
    expect(Math.round(quotient * 100) / 100).not.toBe(rowAt(data, "overall").estimate);
    expect(colliderStratification.provenance.note?.en ?? "").toContain(
      "different estimators",
    );
  });

  it("carries no row count, and says why", () => {
    // The stratum sizes are inside a figure in the source, not in a table.
    expect(forestRows(data).every((r) => r.k === undefined)).toBe(true);
    expect(colliderStratification.provenance.note?.en ?? "").toContain("no count column");
  });

  it("says the crossover curves are not drawn, rather than drawing invented ones", () => {
    expect(colliderStratification.provenance.note?.en ?? "").toContain("not drawn");
  });
});

describe("the commit beat", () => {
  it("has exactly one correct band, and it is about how the group was formed", () => {
    const correct = colliderStratification.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0]!.id).toBe("different-reasons");
    expect(correct[0]!.label.en).toContain("different reasons");
  });

  it("makes reading the stratum as an effect the trap", () => {
    const trap = colliderStratification.choices.find((c) => c.isIntuitiveTrap);
    expect(trap?.id).toBe("protective");
  });

  /**
   * Three bands draw a substantive conclusion about smoking from the stratified
   * numbers and are wrong in the same way; only the fourth says what the
   * comparison is between. What the hedge rule forbids is two bands a player
   * could both defend, and no band but the third survives the overall 1.55.
   */
  it("leaves only one band that does not claim an effect of smoking", () => {
    const claimsAnEffect = colliderStratification.choices.filter((c) =>
      /smoking (protects|only harms)|harm of smoking/.test(c.label.en),
    );
    expect(claimsAnEffect.map((c) => c.id)).toEqual([
      "protective",
      "only-normal",
      "smaller-harm",
    ]);
    expect(claimsAnEffect.every((c) => !c.isCorrect)).toBe(true);
  });

  it("tells the reader that smoking causes the smallness, before asking", () => {
    // Without that fact the answer is unguessable rather than hard: the whole
    // reasoning is that the exposure is one of the reasons for being in the
    // group, and the framing states it with both prevalences.
    expect(colliderStratification.setup.framing.en).toContain("Smoking makes babies smaller");
  });
});

describe("the beats", () => {
  it("opens on the underweight stratum alone", () => {
    expect(colliderStratification.setup.initialView.kind).toBe("whatisknown");
    const shown = restrictForest(data, {
      groupIds: colliderStratification.setup.initialView.groupIds,
    });
    expect(shown.rows.map((r) => r.id)).toEqual(["lbw"]);
  });

  it("adds the other three rows at the reveal", () => {
    expect(colliderStratification.reveal.view.kind).toBe("themissingrow");
    expect(colliderStratification.reveal.view.groupIds).toBeUndefined();
    expect(data.rows).toHaveLength(4);
  });

  it("keeps the benchmark line off the setup, since its row is not drawn there", () => {
    const shown = restrictForest(data, {
      groupIds: colliderStratification.setup.initialView.groupIds,
    });
    expect(benchmarkRow(shown)).toBeNull();
  });

  it("keeps one axis across both beats", () => {
    const shown = restrictForest(data, {
      groupIds: colliderStratification.setup.initialView.groupIds,
    });
    expect([shown.axisMin, shown.axisMax, shown.nullValue]).toEqual([
      data.axisMin,
      data.axisMax,
      data.nullValue,
    ]);
  });
});

describe("the honesty items", () => {
  it("says the trap is not that smoking is harmless", () => {
    // A reader who leaves believing the study exonerates tobacco has learned
    // the opposite of the lesson.
    const h = colliderStratification.reveal.headline.en;
    expect(h).toContain("No group is better off");
  });

  it("names the mechanism as conditioning rather than as confounding", () => {
    expect(colliderStratification.reveal.mechanismName.en).toContain("collider");
    expect(colliderStratification.lesson.howItWorks?.en ?? "").toContain(
      "affected by the exposure",
    );
  });

  it("records that a collider need not be a mediator", () => {
    // The distinction the paper draws explicitly, and the one that makes this
    // more than "do not adjust for things on the causal path".
    expect(colliderStratification.lesson.howItWorks?.en ?? "").toContain(
      "does not have to sit on the causal path",
    );
  });
});
