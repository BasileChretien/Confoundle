import { describe, expect, it } from "vitest";
import { TICK_HZ, WEAPON_IDS } from "./content";
import { simulate, type Controller } from "./sim";
import { policy } from "./policies";

/**
 * THE PLAN'S THIRD TEST, THE ONE THAT NEEDS NOBODY: is diagnosis necessary?
 *
 * If a dumb policy scores near a considered one, the mechanic the whole game
 * is built around is optional, and an optional mechanic is one nobody uses.
 * This file runs that comparison headless.
 *
 * IT CURRENTLY FAILS, AND THIS FILE IS THE RECORD OF THAT rather than a
 * celebration of a passing suite. Measured paired over 24 seeds with a 25
 * minute ceiling:
 *
 *   dumb (feed the biggest bar, never cut)   median 592s, capped 11/24
 *   dumb but throws three cuts away          median 419s, capped  8/24
 *   diagnosing (cuts, measures, invests)     median 394s, capped  3/24
 *
 *   dumb vs diagnosing:  dumb wins 15, diagnosing wins 6, tied 3
 *   dumb vs wasted cuts: dumb wins 11, cuts wins 9, tied 4
 *
 * Two things follow, and the second is the serious one.
 *
 * THE CUT IS NEARLY FREE. Eleven to nine is a coin flip: three interventions,
 * eight seconds each, cost almost no survival. The plan says a cut has to be
 * long enough to frighten you or it is bookkeeping rather than a choice, and
 * at this tuning it is bookkeeping. That is the assertion this file makes,
 * because it is the cheapest to measure and the most stable at small samples.
 *
 * AND FOLLOWING THE METER IS THE BEST INVESTMENT STRATEGY IN THE GAME, which
 * inverts the premise. The reason is a gap between two different questions
 * that the design had been treating as one. The death screen measures what
 * happens when a weapon is ABSENT. The player's only lever is which weapon
 * gets the NEXT LEVEL. A weapon can be indispensable and a poor investment at
 * the same time, and ice is exactly that: removing it costs 110 seconds, and
 * pouring levels into it loses. So the game teaches its lesson about a
 * quantity the player cannot act on, and the quantity they can act on is one
 * the meter predicts well.
 *
 * None of that is fixed here. Tuning cannot close a gap of this shape; it is
 * a question about what the death screen should measure, and it belongs in
 * the design rather than in `content.ts`.
 *
 * WHEN IT IS FIXED, THIS FILE MUST BE UPDATED RATHER THAN DELETED. Its
 * assertion is deliberately the direction that holds today, so a change that
 * closes the gap fails here and forces whoever made it to write down the new
 * numbers. Same discipline as an at-zero list that may only shrink.
 */

/** Ten seeds and a ten minute ceiling: enough to see it, cheap enough to run. */
const SEEDS = Array.from({ length: 10 }, (_, i) => 4242 + i * 7919);
const CAP = 10 * 60 * TICK_HZ;
const CUT_AT = [40, 85, 130].map((s) => s * 60);

/**
 * Feeds the meter, and throws three cuts away at fixed moments on the weapon
 * that costs the most to lose. The upper bound on what an intervention costs
 * somebody who learns nothing from it.
 */
function wastesCuts(): Controller {
  const inner = policy({ kind: "biggestBar" });
  let done = 0;
  return {
    ...inner,
    cut(view) {
      const at = CUT_AT[done];
      if (at === undefined || view.tick !== at || view.cutsLeft === 0) return null;
      done += 1;
      return [...WEAPON_IDS].sort((a, b) => view.damage[b] - view.damage[a])[0]!;
    },
  };
}

function survivals(make: () => Controller): number[] {
  return SEEDS.map(
    (s) => simulate({ spawnSeed: s, offerSeed: 999, controller: make(), maxTicks: CAP }).ticks,
  );
}

/** Paired, so the seed cancels. The same argument the death screen makes. */
function wins(a: readonly number[], b: readonly number[]): { a: number; b: number; tied: number } {
  let av = 0;
  let bv = 0;
  let tied = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i]! - b[i]!;
    // Within a second is a tie: below that the comparison is reading noise.
    if (Math.abs(d) < TICK_HZ) tied += 1;
    else if (d > 0) av += 1;
    else bv += 1;
  }
  return { a: av, b: bv, tied };
}

describe("is diagnosis necessary?", () => {
  it("finds that three cuts cost almost nothing, so the intervention is not a real decision", () => {
    const dumb = survivals(() => policy({ kind: "biggestBar" }));
    const cuts = survivals(wastesCuts);
    const w = wins(dumb, cuts);

    // The plan's requirement is that a cut is frightening. If it were, the
    // arm that throws three away would lose most of the time. It does not.
    expect(w.a).toBeLessThanOrEqual(Math.ceil(SEEDS.length * 0.7));
    // And the premise of the measurement: the runs really do differ, so this
    // is not passing because both arms are identical.
    expect(w.a + w.b).toBeGreaterThan(0);
  }, 120_000);

  it("finds that following the meter beats diagnosing it, which inverts the premise", () => {
    const dumb = survivals(() => policy({ kind: "biggestBar" }));
    const smart = survivals(() => policy({ kind: "diagnosing" }));
    const w = wins(dumb, smart);

    // Recorded as it stands. The design wants the opposite, and the reason it
    // does not hold is written at the top of this file: the death screen
    // measures absence and the player's lever is investment.
    expect(w.a).toBeGreaterThanOrEqual(w.b);
  }, 120_000);

  it("has a diagnosing policy that actually spends its cuts", () => {
    // Otherwise the comparison above is between two identical strategies and
    // says nothing at all.
    let spent = 0;
    const inner = policy({ kind: "diagnosing" });
    const watched: Controller = {
      ...inner,
      cut(view) {
        const c = inner.cut(view);
        if (c !== null && view.cutsLeft > 0 && view.cutUntil[c] <= view.tick) spent += 1;
        return c;
      },
    };
    simulate({ spawnSeed: SEEDS[0]!, offerSeed: 999, controller: watched, maxTicks: CAP });
    expect(spent).toBeGreaterThan(0);
  }, 60_000);

  it("reads only what a player can see", () => {
    // A policy that peeked at the counterfactual study, or at `content.ts`,
    // would be measuring the author rather than the game. The check is a
    // source scan because the mistake is only visible at the call site.
    const source = Object.entries(
      import.meta.glob("./policies.ts", { query: "?raw", import: "default", eager: true }) as Record<
        string,
        string
      >,
    )[0]![1];
    const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    for (const forbidden of ["./replay", "WEAPONS", "ENEMIES", "PHASES", "levelScale"]) {
      expect(code.includes(forbidden), `policies.ts must not read ${forbidden}`).toBe(false);
    }
  });
});
