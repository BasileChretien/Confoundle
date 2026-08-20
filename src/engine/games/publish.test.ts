import { describe, expect, it } from "vitest";
import {
  ALPHA,
  ENDPOINTS,
  TEST_SPACE,
  COHORT_SIZE,
  HYPOTHESES,
  OVERALL,
  analyse,
  cohort,
  replicate,
  twoProportionP,
} from "./publish";

/**
 * THE GAME'S ONE CLAIM IS THAT THERE IS NOTHING IN THE DATA, and everything it
 * teaches depends on that being true rather than asserted.
 *
 * If the generator leaned even slightly, the player's discoveries would be
 * real, replication would confirm some of them, and the game would be a lie
 * told with numbers on a page about lies told with numbers. So the null is
 * measured here: p-values uniform, about one test in twenty significant, and a
 * "finding" surviving replication about as often as any other coin flip.
 *
 * These are statistical properties, so they are asserted with bands rather than
 * equalities, and the bands are wide enough that an honest generator passes
 * every time and narrow enough that a biased one does not. Sample sizes are
 * large on purpose: a flaky test here would be worse than none, because it
 * would train whoever sees it to re-run rather than to look.
 */

describe("the cohort", () => {
  it("enrols the promised number of patients", () => {
    expect(cohort(1)).toHaveLength(COHORT_SIZE);
  });

  it("is the same cohort every time, so a run can be replayed", () => {
    expect(cohort(7)).toEqual(cohort(7));
    expect(cohort(7)).not.toEqual(cohort(8));
  });

  /**
   * THE NULL, CHECKED WHERE IT MATTERS MOST: overall. Pooled across 200
   * cohorts, the two arms must recover at indistinguishable rates.
   */
  it("gives both arms the same recovery rate, pooled over many cohorts", () => {
    let t = { n: 0, events: 0 };
    let c = { n: 0, events: 0 };
    for (let seed = 1; seed <= 200; seed++) {
      const r = analyse(cohort(seed), OVERALL, "recovered");
      t = { n: t.n + r.treated.n, events: t.events + r.treated.events };
      c = { n: c.n + r.control.n, events: c.events + r.control.events };
    }
    const rateT = t.events / t.n;
    const rateC = c.events / c.n;
    // 180,000 patients: a real difference of even half a point would show.
    expect(Math.abs(rateT - rateC)).toBeLessThan(0.01);
    expect(rateT).toBeGreaterThan(0.37);
    expect(rateT).toBeLessThan(0.43);
  });

  /** And no trait is a hidden effect either, which is the subtler way to rig it. */
  it("gives every subgroup the same recovery rate too", () => {
    for (const h of HYPOTHESES) {
      let t = { n: 0, events: 0 };
      let c = { n: 0, events: 0 };
      for (let seed = 1; seed <= 120; seed++) {
        const r = analyse(cohort(seed), h.id, "recovered");
        t = { n: t.n + r.treated.n, events: t.events + r.treated.events };
        c = { n: c.n + r.control.n, events: c.events + r.control.events };
      }
      expect({
        id: h.id,
        gap: Math.abs(t.events / t.n - c.events / c.n) < 0.02,
      }).toEqual({ id: h.id, gap: true });
    }
  });
});

describe("the p-values", () => {
  /** Pinned against known values, since everything downstream divides by these. */
  it("computes a two-proportion p that matches the textbook", () => {
    // Identical proportions: nothing to see.
    expect(twoProportionP(50, 100, 50, 100)).toBeCloseTo(1, 6);
    // 60/100 against 40/100 is z = 2.83, two-sided p just under 0.005.
    const p = twoProportionP(60, 100, 40, 100);
    expect(p).toBeGreaterThan(0.003);
    expect(p).toBeLessThan(0.006);
    // A degenerate group cannot produce a finding.
    expect(twoProportionP(0, 0, 5, 10)).toBe(1);
  });

  /**
   * UNIFORM UNDER THE NULL, which is the property that makes the game fair.
   * Any lean here and the player's hit rate is not the one the ending claims.
   */
  it("is uniform across the whole range", () => {
    const buckets = new Array<number>(10).fill(0);
    let n = 0;
    for (let seed = 1; seed <= 400; seed++) {
      const patients = cohort(seed);
      for (const h of HYPOTHESES)
        for (const e of ENDPOINTS) {
          const { p } = analyse(patients, h.id, e.id);
          buckets[Math.min(9, Math.floor(p * 10))]!++;
          n++;
        }
    }
    const expected = n / 10;
    for (const [i, count] of buckets.entries()) {
      // Each decile within 20% of even. With 7,200 tests that is a wide band
      // for chance and a narrow one for bias.
      expect({ decile: i, ok: Math.abs(count - expected) < expected * 0.2 }).toEqual({
        decile: i,
        ok: true,
      });
    }
  });

  /**
   * AND THE HEADLINE NUMBER THE GAME TELLS THE PLAYER AT THE END: about one
   * test in twenty comes out significant when nothing is going on.
   */
  it("makes about one test in twenty significant", () => {
    let hits = 0;
    let n = 0;
    for (let seed = 1; seed <= 400; seed++) {
      const patients = cohort(seed);
      for (const h of HYPOTHESES)
        for (const e of ENDPOINTS) {
          if (analyse(patients, h.id, e.id).significant) hits++;
          n++;
        }
    }
    const rate = hits / n;
    expect(rate).toBeGreaterThan(0.035);
    expect(rate).toBeLessThan(0.065);
    expect(ALPHA).toBe(0.05);
  });
});

describe("replication", () => {
  /**
   * THE ENDING OF THE GAME, MEASURED. A finding that was chance has only the
   * same one-in-twenty chance of surviving a fresh cohort, so the great
   * majority of what a player publishes must evaporate. If this were much
   * kinder the game would reward p-hacking, which is the opposite of the point.
   */
  it("kills the overwhelming majority of published findings", () => {
    let published = 0;
    let survived = 0;
    for (let seed = 1; seed <= 500; seed++) {
      const patients = cohort(seed);
      for (const h of HYPOTHESES)
        for (const e of ENDPOINTS) {
          if (!analyse(patients, h.id, e.id).significant) continue;
          published++;
          if (replicate(seed, h.id, e.id).significant) survived++;
        }
    }
    expect(published).toBeGreaterThan(200);
    expect(survived / published).toBeLessThan(0.15);
  });

  it("re-tests on a different cohort, not the one that produced the finding", () => {
    const first = analyse(cohort(3), "coffee", "recovered");
    const again = replicate(3, "coffee", "recovered");
    expect(again.hypothesis).toBe("coffee");
    expect(again.treated).not.toEqual(first.treated);
  });
});

describe("the analysis itself", () => {
  it("counts only the patients in the subgroup", () => {
    const patients = cohort(11);
    const all = analyse(patients, OVERALL, "recovered");
    const some = analyse(patients, "left-handed", "recovered");
    expect(all.treated.n + all.control.n).toBe(COHORT_SIZE);
    expect(some.treated.n + some.control.n).toBeLessThan(COHORT_SIZE);
    expect(some.treated.n + some.control.n).toBeGreaterThan(0);
  });

  it("never reports more events than patients", () => {
    for (const h of [...HYPOTHESES.map((x) => x.id), OVERALL]) {
      const r = analyse(cohort(5), h, "recovered");
      expect(r.treated.events).toBeLessThanOrEqual(r.treated.n);
      expect(r.control.events).toBeLessThanOrEqual(r.control.n);
    }
  });

  it("offers enough questions that hunting is the obvious move", () => {
    /*
      THE HAYSTACK HAS TO BE BIG ENOUGH, and this number was measured rather
      than guessed. With eighteen subgroups and ONE endpoint, a player who
      tested every single one still found nothing in 58% of runs, so most
      sessions ended with no payoff and no lesson. Crossing subgroups with
      endpoints is what real researcher degrees of freedom look like, and it
      is the only honest way to widen the search: the alternative was to make
      the null lean, which would have rigged the game it exists to expose.
    */
    expect(HYPOTHESES.length).toBeGreaterThanOrEqual(15);
    expect(ENDPOINTS.length).toBeGreaterThanOrEqual(3);
    expect(TEST_SPACE).toBe(HYPOTHESES.length * ENDPOINTS.length);
    expect(TEST_SPACE).toBeGreaterThanOrEqual(50);
    expect(new Set(HYPOTHESES.map((h) => h.id)).size).toBe(HYPOTHESES.length);
    expect(new Set(ENDPOINTS.map((h) => h.id)).size).toBe(ENDPOINTS.length);
  });
});
