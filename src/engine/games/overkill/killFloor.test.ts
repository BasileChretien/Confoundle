import { describe, expect, it } from "vitest";
import { EFFECTIVE, ENEMIES, WEAPONS, effectiveDamage, killFloor } from "./content";
import { createRun, type Controller } from "./sim";
import { policy, type LoadoutChoice } from "./policies";
import { MISMATCHED } from "./loadouts";

/**
 * THE WRONG TOOL NEVER FINISHES THE JOB.
 *
 * `killFloor` exists because the matrix was a minority term in its own
 * equation. Raw throughput varies 4.6x between effectors before the matrix is
 * consulted and `levelScale` adds 3.75x on top, so roughly 17x of non-matrix
 * spread sat against a matrix penalty of 8.3x: a level 6 complement out-damaged
 * a level 1 eosinophil against the helminth the eosinophil is the answer to, by
 * six times. The thing the game wants learned was worth less than the thing the
 * player is not supposed to be thinking about.
 *
 * A ceiling fixes that in a way no multiplier can, because it does not enter
 * the race at all.
 */

describe("the floor itself", () => {
  it("lets a principal defence finish and stops everything else", () => {
    expect(killFloor(1)).toBe(0);
    expect(killFloor(0.35)).toBeGreaterThan(0);
    expect(killFloor(0.12)).toBeGreaterThan(killFloor(0.35));
  });

  it("puts the boundary exactly where the matrix puts its tiers", () => {
    // A tier that is "contributes" in the data and "kills outright" in the
    // simulation would be a lie about sufficiency, and 0.35 is a tier
    // boundary, so it must be INCLUDED in the contributing band rather than
    // falling through to the useless one.
    expect(killFloor(0.35)).toBe(killFloor(0.5));
    expect(killFloor(0.34)).toBe(killFloor(0.12));
  });

  it("never lets a mismatched effector out-finish a matched one at any level", () => {
    // THE INVERSION THAT PROMPTED THIS, stated as the property rather than as
    // the one example. Whatever the damage numbers do, the mismatched effector
    // cannot take the target below its floor and the matched one can take it
    // to zero, so no amount of levelling reorders them on the only axis that
    // decides a run.
    const worm = ENEMIES.worm;
    const wrongAtMaxLevel = effectiveDamage(
      WEAPONS.complement.poisonDps! * 100,
      worm.armour,
      true,
      EFFECTIVE.complement.helminth,
    );
    expect(wrongAtMaxLevel).toBeGreaterThan(worm.hp);
    // It could kill twice over on damage alone, and still cannot finish.
    expect(killFloor(EFFECTIVE.complement.helminth)).toBeGreaterThan(0);
    expect(killFloor(EFFECTIVE.eosinophil.helminth)).toBe(0);
  });
});

describe("what it does to a run", () => {
  const SEEDS = [1000, 7151, 13302];
  const CAP = 130 * 60;

  /**
   * ASSERTED AS THE RULE, NOT AS A CONSEQUENCE OF IT.
   *
   * The first version of this block measured downstream statistics: the crowd
   * roughly doubles under a mismatched loadout, and the level curve stalls.
   * Both are true, both are the point of the mechanic, and BOTH PASSED WITH
   * THE MECHANIC DELETED. Mutation testing set `floor = 0` in the simulation
   * and all five tests stayed green, because a mismatched loadout already
   * killed slowly enough to let the crowd build before any cap existed. The
   * numbers moved from 2.5x to 4x, and a threshold of 1.8x could not tell the
   * difference between a design working and a design absent.
   *
   * So the guard is now the rule itself, read off the simulation's own record
   * of every hit it resolved: nothing below a principal defence may ever land
   * a killing blow. That cannot pass with the mechanic removed, it needs no
   * threshold anybody has to justify, and it is the sentence the design is.
   */
  /*
    STEPPED BY HAND, because a driver cannot see this.

    `move()` is called in step 3 of the tick and the weapons fire in step 6, so
    a controller reading `view.hitsThisTick` reads the PREVIOUS tick's record,
    and on the first tick it reads an empty list. The first version of this
    helper did exactly that and collected zero hits across an entire run, which
    at least failed loudly rather than quietly asserting nothing.
  */
  function everyHit(loadout: LoadoutChoice, seed: number, ticks: number) {
    const c: Controller = policy({ kind: "spread" }, loadout);
    const run = createRun({ spawnSeed: seed, offerSeed: 999, driver: c, maxTicks: ticks });
    const seen: { match: number; killed: boolean }[] = [];
    let peak = 0;
    for (;;) {
      const status = run.step();
      if (status === "over") break;
      if (status === "awaitingUpgrade") {
        run.chooseUpgrade(c.chooseUpgrade(run.view, run.offers));
        continue;
      }
      if (status === "awaitingLoadout") {
        run.chooseLoadout(c.chooseLoadout(run.view, run.view.unlocked));
        continue;
      }
      peak = Math.max(peak, run.view.enemies.length);
      for (const h of run.view.hitsThisTick) seen.push({ match: h.match, killed: h.killed });
    }
    return { seen, peak };
  }

  it("never lets anything but a principal defence land a killing blow", () => {
    for (const seed of SEEDS) {
      const { seen } = everyHit(MISMATCHED, seed, CAP);
      // The run really happened, or "no bad kills" is a claim about nothing.
      expect(seen.length, `seed ${seed}`).toBeGreaterThan(500);
      expect(seen.some((h) => h.match < 1), `seed ${seed}`).toBe(true);
      const wrongKills = seen.filter((h) => h.match < 1 && h.killed);
      expect(wrongKills, `seed ${seed} let ${wrongKills.length} wrong hits kill`).toEqual([]);
    }
  }, 300_000);

  it("still lets the wrong tool land and be felt, which is the other half", () => {
    // The floor must not become a no-op. `effectiveDamage` keeps a trickle on
    // purpose so a player SEES the wrong tool arrive and fail; a cap that also
    // suppressed the hit would put the game back to nothing happening, which
    // reads as a broken weapon rather than as the wrong answer.
    const { seen } = everyHit(MISMATCHED, SEEDS[0]!, CAP);
    expect(seen.filter((h) => h.match < 0.35).length).toBeGreaterThan(100);
  }, 300_000);

  it("hurts a player nothing is anywhere near, because the infection is uncleared", () => {
    /*
      THE STAKES MECHANIC, ASSERTED GEOMETRICALLY.

      Two earlier versions of this test were wrong in instructive ways. The
      first compared peak crowd sizes between the arms, which was true and also
      passed with the mechanic deleted, since a mismatched loadout already let
      the crowd build. The second tried to separate contact damage from
      infection damage using `hurtThisTick`, and could not: `mutView.hp` is
      assigned near the TOP of a tick and the contact block runs near the
      bottom, so a contact drop surfaces in the view one tick later, by which
      point the flag has been reset. That version counted every drop as
      non-contact and would have passed on a game with no such mechanic at all.

      So the separation is done in space, where there is no ordering to get
      wrong: only count health lost on ticks where the NEAREST pathogen, this
      tick and last, was further away than anything could possibly reach. What
      is left cannot be contact, and it is the only pressure a player who
      outruns every pathogen has no answer to except killing.
    */
    // Contact reach is the player's 9 plus the largest pathogen's 19, so 28.
    // Forty five is comfortably past it, and past it by more than anything can
    // close in one tick: the fastest pathogen moves 1.7 units per tick and the
    // player 1.5, so a 45 unit gap cannot become a touch before the next
    // sample. That is what makes the one tick of lag in `view.hp` harmless
    // here, where it silently defeated the previous version of this test.
    const FAR = 45;
    // NOT GUARDED HERE: whether the drain sits inside or outside the contact
    // cooldown. Putting it back inside, which was the original bug, leaves
    // this green, because a mismatched run registers only ONE contact tick in
    // its whole life, so an 18 tick suppression window has almost nothing to
    // suppress. The placement matters in a run that is being touched often,
    // and nothing in the suite currently produces one.
    const c: Controller = policy({ kind: "spread" }, MISMATCHED);
    const run = createRun({ spawnSeed: SEEDS[0]!, offerSeed: 999, driver: c, maxTicks: CAP });
    let lostWhileAlone = 0;
    let overloaded = 0;
    let hp = 100;
    let wasAlone = true;
    for (;;) {
      const st = run.step();
      if (st === "over") break;
      if (st === "awaitingUpgrade") {
        run.chooseUpgrade(c.chooseUpgrade(run.view, run.offers));
        continue;
      }
      if (st === "awaitingLoadout") {
        run.chooseLoadout(c.chooseLoadout(run.view, run.view.unlocked));
        continue;
      }
      const v = run.view;
      let nearest = Infinity;
      for (const e of v.enemies) {
        const dx = e.x - v.x;
        const dy = e.y - v.y;
        nearest = Math.min(nearest, Math.sqrt(dx * dx + dy * dy));
      }
      const alone = nearest > FAR;
      if (v.overload > 0) overloaded += 1;
      if (alone && wasAlone && v.hp < hp) lostWhileAlone += hp - v.hp;
      wasAlone = alone;
      hp = v.hp;
    }
    expect(overloaded, "the crowd never ran past what the wave should hold").toBeGreaterThan(300);
    expect(
      Math.round(lostWhileAlone),
      "no health was lost with every pathogen out of reach",
    ).toBeGreaterThan(20);
  }, 300_000);
});
