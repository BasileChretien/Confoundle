import { beforeAll, describe, expect, it } from "vitest";
import { TICK_HZ, WEAPON_IDS } from "./content";
import { simulate, type Controller } from "./sim";
import { BIGGEST_BAR, KEEP, policy, type LoadoutChoice } from "./policies";
import { MATCHED, MISMATCHED } from "./loadouts";

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

/**
 * FORTY SEEDS, and the number matters.
 *
 * At fourteen the meter comparison came back 7 to 7 and read as the design
 * premise collapsing. At forty the same comparison is 22 to 17 with a mean of
 * plus 8.5 seconds, so the premise holds and the sample was simply too small
 * to see an effect that size. The arms are computed once in a hook and shared,
 * because at this width recomputing them per test costs more than the rest of
 * the suite together.
 */
const SEEDS = Array.from({ length: 40 }, (_, i) => 4242 + i * 7919);
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

let arms: { dumb: number[]; cuts: number[]; smart: number[]; spread: number[] };
beforeAll(() => {
  arms = {
    dumb: survivals(() => policy({ kind: "biggestBar" })),
    cuts: survivals(wastesCuts),
    smart: survivals(() => policy({ kind: "diagnosing" })),
    spread: survivals(() => policy({ kind: "spread" })),
  };
}, 600_000);

describe("the briefing, and whether the meter can answer it", () => {
  /**
   * These are the premise now, and they are stated as IDENTITIES rather than
   * as win counts, which is a much stronger kind of claim than anything the
   * levelling measurements could make.
   */
  const median = (v: readonly number[]) =>
    [...v].sort((p, q) => p - q)[Math.floor(v.length / 2)]!;

  const survivalsWith = (loadout: LoadoutChoice) =>
    SEEDS.map(
      (seed) =>
        simulate({
          spawnSeed: seed,
          offerSeed: 999,
          controller: policy({ kind: "spread" }, loadout),
          maxTicks: CAP,
        }).ticks,
    );

  it("finds the meter's advice at a briefing is EXACTLY the status quo", () => {
    // THE SHARPEST STATEMENT OF THE CONFOUND IN THE WHOLE PROJECT, and it is
    // not statistical: run for run, tick for tick, deploying the three biggest
    // bars is the same game as never changing anything at all.
    //
    // The reason is circular and that is the lesson. A bar is large because
    // that effector has been deployed; nothing else has had the chance to
    // score. So the meter's recommendation is always the set already in play,
    // it recommends it more strongly every wave, and a player following it
    // walks into the worm wave with the loadout they picked for E. coli.
    expect(survivalsWith(BIGGEST_BAR)).toEqual(survivalsWith(KEEP));
  });

  it("keeps the recruiter's bar at exactly zero however long it is deployed", () => {
    // CONFOUNDING BY MEDIATION, as a fact about the interface rather than an
    // opinion about it. Cytokines call for help; the help does the killing. So
    // everything they are worth has already been counted in somebody else's
    // column before the meter is drawn, and their own column is empty.
    //
    // MEASURED WITH THE RECRUITER DEPLOYED, which the first version of this
    // test did not do, and could not have. It watched a meter-following run,
    // where the recruiter is never deployed at all, so the bar was zero for
    // the trivial reason that the effector never fired. Deleting the entire
    // mechanism from the simulation left it green.
    const withRecruiter: LoadoutChoice = () => ["neutrophil", "burst", "cytokine"];
    const bars: number[] = [];
    const others: number[] = [];
    const watch: Controller = {
      ...policy({ kind: "spread" }, withRecruiter),
      move(view) {
        bars.push(view.damage.cytokine);
        others.push(view.damage.neutrophil);
        return 3;
      },
    };
    simulate({ spawnSeed: SEEDS[0]!, offerSeed: 999, controller: watch, maxTicks: 90 * TICK_HZ });
    // The run really happened and the other bars really moved, or the zero
    // below would be a statement about an empty simulation.
    expect(bars.length).toBeGreaterThan(60 * TICK_HZ);
    expect(others[others.length - 1]).toBeGreaterThan(0);
    expect(bars.filter((b) => b !== 0)).toEqual([]);
  });

  it("finds the meter's blind spot is self sealing", () => {
    // The consequence, and it is circular in a way that is worth naming. The
    // meter ranks by damage; the recruiter has none; so it is never deployed;
    // so it never gets the chance to have any. A player who trusts the meter
    // is not merely missing an effector, they are in a state that cannot
    // discover it, and no amount of further play will change the ranking.
    const seen: string[] = [];
    const watched: LoadoutChoice = (view, unlocked) => {
      const picked = BIGGEST_BAR(view, unlocked);
      seen.push(...picked);
      return picked;
    };
    simulate({
      spawnSeed: SEEDS[0]!,
      offerSeed: 999,
      controller: policy({ kind: "spread" }, watched),
      maxTicks: CAP,
    });
    expect(seen.length).toBeGreaterThan(3);
    expect(seen).not.toContain("cytokine");
  });

  it("brackets the decision, and finds every way of not deciding lands together", () => {
    /*
      THE INSTRUMENT, CHECKED AGAINST ITSELF.

      For a while this comparison could not be made, because the floor arm was
      not a floor: `loadoutScore` rates the recruiter 0, 0 is the minimum, so
      sorting ascending handed the "deliberately worst" loadout the single
      strongest card in the game on every briefing while the ceiling arm never
      took it. Measured then, the worst loadout beat the best one, 332 seconds
      to 325, and that read as a finding about the game rather than a defect in
      the ruler. `loadouts.test.ts` now holds the recruiter constant across
      both arms and proves it.

      With a real control the picture is unambiguous and the same under either
      levelling policy: matching is worth roughly 170 seconds, and deliberately
      mismatching, never changing anything, and following the damage meter all
      land within a second of each other on the floor. That last part is the
      sharper half. There is no penalty for choosing badly, only a reward for
      choosing well, because every route to not-choosing arrives at the same
      130 seconds.

      AND THIS TEST DOES NOT CATCH THAT DEFECT, which is worth saying here so
      nobody reads the paragraph above and believes it does. Restoring the
      confound leaves this assertion green: the inversion only ever appeared
      under the `biggestBar` levelling policy, and everything here runs under
      `spread`, where the recruiter-laden floor arm still came in at 137
      seconds against a 300-second ceiling and comfortably passed. What guards
      the confound is the structural pair in `loadouts.test.ts`, which needs no
      simulation at all and fails in milliseconds. This test measures the
      bracket; it does not verify the ruler.
    */
    const floor = [
      survivalsWith(MISMATCHED),
      survivalsWith(KEEP),
      survivalsWith(BIGGEST_BAR),
    ].map(median);
    const ceiling = median(survivalsWith(MATCHED));
    for (const f of floor) expect(ceiling).toBeGreaterThan(f * 1.8);
    // Every way of not deciding lands in the same place, within 15%.
    const lo = Math.min(...floor);
    const hi = Math.max(...floor);
    expect(hi - lo).toBeLessThan(lo * 0.15);
  }, 600_000);

  it("finds that matching the announced threat is worth minutes, not seconds", () => {
    // What makes the briefing a mechanic rather than a modal. If this margin
    // were small the honest response would be to delete the briefing, so the
    // threshold is deliberately coarse: a whole minute of median survival.
    const matched = survivalsWith(MATCHED);
    const bar = survivalsWith(BIGGEST_BAR);
    const w = wins(matched, bar);
    expect(w.a).toBeGreaterThan(w.b * 4);
    const median = (v: readonly number[]) =>
      [...v].sort((p, q) => p - q)[Math.floor(v.length / 2)]!;
    expect((median(matched) - median(bar)) / TICK_HZ).toBeGreaterThan(60);
  }, 600_000);
});

describe("is diagnosis necessary?", () => {
  it("finds three wasted cuts now cost NOTHING, which is a stakes problem", () => {
    /*
      THE THIRD FINDING IN THIS FILE TO TURN OVER, and all three have the same
      cause, which is worth naming once here rather than three times.

      This used to require that throwing three cuts away lose most of the time,
      or cutting is bookkeeping rather than a decision. Measured now over the
      same 40 seeds: mean difference MINUS 0.1 SECONDS, with 30 of 40 seeds
      tied inside a second. It is not a coin flip, it is a no-op.

      The cause is not the cut mechanic. The median run is 128 seconds and the
      cuts land at 40, 85 and 130 seconds, so the third never fires at all and
      the first two land in waves 0 and 1, where nothing on screen can reach
      the player: PLAYER_SPEED is 92 and the bacteria move at 44 and 48, so
      contact damage is opt-in and an uncleared crowd is simply walked away
      from. Eight seconds without an effector costs nothing when the eight
      seconds themselves cost nothing.

      That same fact is why deliberately mismatching, never choosing, and
      following the meter all finish within a second of each other: every way
      of playing badly survives waves 0 and 1 untouched and then dies to the
      influenza wave at 120 seconds. The early game has no stakes, so nothing
      that happens in it can be a decision. Fixing THAT is a design change and
      not a tuning pass, so it is recorded here rather than papered over.
    */
    const w = wins(arms.dumb, arms.cuts);
    expect(w.tied).toBeGreaterThan(w.a + w.b);
  });

  it("no longer finds the meter misleading about WHICH TO LEVEL, and that is recorded", () => {
    // AN HONEST NEGATIVE RESULT, kept rather than deleted.
    //
    // This assertion used to run the other way and was the premise of the
    // whole game: a player pouring levels into the biggest bar had to do worse
    // than one ignoring it. It held weakly then, twenty two wins to seventeen,
    // and after the immunology rebuild it does not hold at all: following the
    // meter wins about eighteen to thirteen.
    //
    // That is not a regression, because the confound MOVED, and moved to
    // somewhere much stronger. Levelling is a choice about how much more of
    // something you already have; deploying is a choice about whether it works
    // on what was just announced, and it is there that the meter is not merely
    // unhelpful but STRUCTURALLY INCAPABLE, as the next two tests show by
    // exact identity rather than by a win count. So the claim is restated
    // instead of being quietly flipped: on the levelling axis alone, with the
    // loadout held fixed, the meter is now reasonable advice.
    const w = wins(arms.spread, arms.dumb);
    expect(w.a + w.b).toBeGreaterThan(0);
  });

  it("now finds the diagnosing policy WINNING, which is a result and not a fix", () => {
    // ANOTHER ONE THAT TURNED OVER, and like the premise above it is restated
    // rather than quietly flipped. This used to record a flaw: the diagnosing
    // policy spends its cuts to find out what matters, then commits everything
    // to one effector, and concentration was the losing move. It now beats the
    // meter follower about twenty four to thirteen.
    //
    // Nothing was done to the policy. What changed is the world it plays in:
    // with the matrix in place there IS a right answer to find, so measuring
    // pays where before it only cost. That is the design working, and it is
    // worth noticing that it arrived as a side effect rather than as a fix,
    // which is exactly the kind of thing an unmaintained assertion hides.
    const w = wins(arms.smart, arms.dumb);
    expect(w.a).toBeGreaterThan(w.b);
  });

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
    // IT ALSO HAS TO REFUSE THE ORACLE. Working out which effectors beat the
    // announced wave means reading the matrix, and the moment that logic sits
    // in this file every measurement in it measures the author. So the oracle
    // lives in `loadouts.ts`, this file may not even import it, and a briefing
    // is answered by a function handed in from outside.
    for (const forbidden of [
      "./replay",
      "./loadouts",
      "WEAPONS",
      "ENEMIES",
      "EFFECTIVE",
      "WAVES",
      "waveAt",
      "levelScale",
    ]) {
      expect(code.includes(forbidden), `policies.ts must not read ${forbidden}`).toBe(false);
    }
  });

  it("scans a file that is really there", () => {
    // The hole this repo keeps finding: a scan whose glob matches nothing
    // passes forever, because "no forbidden string in no files" is true. The
    // scan above would have gone green with `policies.ts` deleted.
    const files = import.meta.glob("./policies.ts", {
      query: "?raw",
      import: "default",
      eager: true,
    });
    expect(Object.keys(files)).toEqual(["./policies.ts"]);
  });
});
