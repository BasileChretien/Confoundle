import { describe, expect, it } from "vitest";
import { TICK_HZ, WEAPON_IDS } from "./content";
import { simulate, type Controller } from "./sim";
import { policy } from "./policies";

/**
 * THE PLAN'S THIRD TEST, THE ONE THAT NEEDS NOBODY: is diagnosis necessary?
 *
 * If a dumb policy scores near a considered one, the mechanic the whole game is
 * built around is optional, and an optional mechanic is one nobody uses.
 *
 * IT FAILED BEFORE THE GAME WAS REBUILT AROUND EXPERIENCE, and this file is the
 * record of both readings. Levels used to arrive on a timer, so a run was a
 * fixed number of decisions however it went, nothing dropped on the floor, and
 * running away was strictly correct. Measured paired over 24 seeds then:
 *
 *   dumb (feed the biggest bar, never cut)   dumb 15, diagnosing 6, tied 3
 *   dumb vs the same but wasting three cuts  dumb 11, cuts 9,       tied 4
 *
 * Eleven to nine is a coin flip: the cut cost nothing, so it was bookkeeping
 * rather than the frightening decision the plan requires. And following the
 * meter beat every alternative, which inverts the premise.
 *
 * Measured again over 20 seeds once experience, gems and earned levels went in:
 *
 *   dumb    median 307s      dumb vs wasting three cuts   dumb 16, cuts 4
 *   cuts    median 291s      dumb vs diagnosing           dumb 13, smart 7
 *   smart   median 291s
 *   spread  median 388s
 *
 * TWO THINGS MOVED. Sixteen to four says the cut now costs real survival, so
 * the intervention is a decision. And SPREAD, which ignores the meter entirely
 * and levels everything evenly, beats the meter follower by eighty seconds:
 * for the first time the biggest bar is the wrong thing to feed, which is the
 * premise the whole design rests on.
 *
 * What has NOT been fixed is the diagnosing policy, which still loses. It
 * commits everything to one weapon after measuring, and concentration is what
 * `spread` beating `dumb` says is wrong. That is a flaw in the scripted player
 * rather than in the game, and it is the next thing to try.
 *
 * WHEN THESE NUMBERS MOVE AGAIN, UPDATE THIS FILE RATHER THAN DELETING IT. The
 * assertions are the directions that hold today, so a change fails here and
 * makes whoever made it write down what it did.
 */

/** Ten seeds and a ten minute ceiling: enough to see it, cheap enough to run. */
const SEEDS = Array.from({ length: 14 }, (_, i) => 4242 + i * 7919);
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
  it("finds that three cuts now cost real survival, so the intervention is a decision", () => {
    // THE PLAN'S REQUIREMENT, and it did not hold until levels were earned
    // rather than handed out: an arm that throws three cuts away has to lose
    // most of the time, or cutting is bookkeeping. It used to be a coin flip.
    const dumb = survivals(() => policy({ kind: "biggestBar" }));
    const cuts = survivals(wastesCuts);
    const w = wins(dumb, cuts);
    expect(w.a).toBeGreaterThan(w.b);
    expect(w.a + w.b).toBeGreaterThan(0);
  }, 180_000);

  it("finds that ignoring the meter beats following it, which is the premise holding", () => {
    // The one the whole design rests on. A player who pours levels into the
    // biggest bar must do WORSE than one who ignores it, or the meter is good
    // advice and there is nothing to learn. This failed for the entire life of
    // the timer-driven version.
    const dumb = survivals(() => policy({ kind: "biggestBar" }));
    const spread = survivals(() => policy({ kind: "spread" }));
    expect(wins(spread, dumb).a).toBeGreaterThan(wins(spread, dumb).b);
  }, 180_000);

  it("still finds the diagnosing policy losing, which is a flaw in the policy", () => {
    // Recorded as it stands. It commits everything to one weapon once it has
    // measured, and the test above is what says concentration is the mistake.
    const dumb = survivals(() => policy({ kind: "biggestBar" }));
    const smart = survivals(() => policy({ kind: "diagnosing" }));
    expect(wins(dumb, smart).a).toBeGreaterThanOrEqual(wins(dumb, smart).b);
  }, 180_000);

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
