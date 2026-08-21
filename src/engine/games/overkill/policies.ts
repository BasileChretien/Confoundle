import { WEAPON_IDS, type WeaponId } from "./content";
import type { Controller, Dir, RunView } from "./sim";

/**
 * Scripted players.
 *
 * These exist for the third test in the plan, the one that needs nobody: run
 * dumb policies against the arena headless, and if a dumb one scores anywhere
 * near a considered one, the diagnosis the game is built around is optional,
 * and an optional mechanic is one nobody uses.
 *
 * They are also how the tuning gets measured at all. A number in `content.ts`
 * is only good or bad relative to how somebody plays, and asking a person
 * every time is both slow and, worse, a moving target.
 *
 * THE MOVEMENT IS SHARED ON PURPOSE. Every policy here walks away from the
 * densest crowd nearby, because the interesting variable is what a player
 * INVESTS IN, not how well they dodge. Holding movement fixed across policies
 * is the only way the comparison says anything about the upgrade decision,
 * which is the decision the game is about.
 */

/** Eight directions, so a policy returns the same alphabet a thumb does. */
const OCTANT: readonly Dir[] = [7, 8, 1, 2, 3, 4, 5, 6];

function awayFromTheCrowd(view: RunView): Dir {
  let bx = 0;
  let by = 0;
  for (const e of view.enemies) {
    const dx = view.x - e.x;
    const dy = view.y - e.y;
    const d2 = dx * dx + dy * dy;
    if (d2 > 220 * 220 || d2 < 1e-6) continue;
    // Inverse square, so the thing about to touch you outweighs the crowd
    // behind it rather than being averaged away by it.
    bx += dx / d2;
    by += dy / d2;
  }
  if (bx === 0 && by === 0) return 0;
  const ang = Math.atan2(by, bx);
  const oct = Math.round(((ang + Math.PI) / (2 * Math.PI)) * 8) % 8;
  return OCTANT[oct]!;
}

export type Feed =
  /** The policy the plan names: pour everything into the largest bar. */
  | { kind: "biggestBar" }
  /** Always the same weapon, whatever happens. The control. */
  | { kind: "fixed"; weapon: WeaponId }
  /** Ignores the meter and spreads evenly. */
  | { kind: "spread" }
  /** Spends its cuts to find out, then feeds what it found. See below. */
  | { kind: "diagnosing" };

export function policy(feed: Feed): Controller {
  const taken = {} as Record<WeaponId, number>;
  for (const id of WEAPON_IDS) taken[id] = 0;
  const diag = feed.kind === "diagnosing" ? diagnosis() : null;

  return {
    move: awayFromTheCrowd,
    cut: (view) => (diag === null ? null : diag.cut(view)),
    chooseUpgrade(view, offers) {
      if (feed.kind === "fixed") {
        return offers.includes(feed.weapon) ? feed.weapon : offers[0]!;
      }
      if (feed.kind === "diagnosing") {
        const want = diag!.best(view);
        if (want !== null && offers.includes(want)) return want;
        // Nothing measured yet, or the answer is not on offer: fall through to
        // the meter, which is what a player with no information does.
      }
      if (feed.kind === "biggestBar" || feed.kind === "diagnosing") {
        let best = offers[0]!;
        for (const id of offers) if (view.damage[id] > view.damage[best]) best = id;
        taken[best] += 1;
        return best;
      }
      let least = offers[0]!;
      for (const id of offers) if (taken[id] < taken[least]) least = id;
      taken[least] += 1;
      return least;
    },
  };
}

/**
 * A player who spends the three cuts finding out, and then invests in what
 * they found.
 *
 * THIS IS THE ARM THE WHOLE DESIGN IS BET ON. The plan's third test asks
 * whether diagnosis is NECESSARY, and that question is only answerable against
 * an opponent that actually diagnoses: comparing the meter-follower to a
 * random policy would say nothing at all.
 *
 * It only ever reads what a player can see. Which weapon is switched off, how
 * much health went while it was off, and how close the crowd got. Never the
 * counterfactual study, never `content.ts`.
 *
 * IT CHOOSES CANDIDATES BY POSITION ON THE METER, NEVER BY NAME. Testing "the
 * biggest bar and the two smallest" is a heuristic about ranks that any player
 * could invent. Hard coding "test ice" would bake the answer in and the test
 * would be measuring the author rather than the game.
 *
 * And it can only test three of six, which is the point rather than a
 * limitation: the budget is what turns this from a search into a decision.
 */
function diagnosis() {
  const CUT_AT = [40, 85, 130].map((s) => s * 60);
  /** Long enough after the cut ends to compare like with like. */
  const WINDOW = 8 * 60;

  const harm = new Map<WeaponId, number>();
  let testing: WeaponId | null = null;
  let cutStarted = 0;
  let hpAtCutStart = 0;
  let pressure = 0;
  let done = 0;

  const crowding = (view: RunView): number => {
    let near = 0;
    for (const e of view.enemies) {
      const dx = view.x - e.x;
      const dy = view.y - e.y;
      if (dx * dx + dy * dy < 90 * 90) near += 1;
    }
    return near;
  };

  return {
    cut(view: RunView): WeaponId | null {
      // Score the test that is finishing.
      if (testing !== null && view.tick >= cutStarted + WINDOW) {
        harm.set(testing, hpAtCutStart - view.hp + pressure / WINDOW);
        testing = null;
      }
      if (testing !== null) {
        pressure += crowding(view);
        return null;
      }
      const at = CUT_AT[done];
      if (at === undefined || view.tick < at || view.cutsLeft === 0) return null;

      // Rank the meter, then take the top and the bottom of it. A player who
      // suspects the big number and suspects the ones doing nothing is testing
      // both ends of the same hunch.
      const ranked = [...WEAPON_IDS].sort((a, b) => view.damage[b] - view.damage[a]);
      const order = [ranked[0]!, ranked[ranked.length - 1]!, ranked[ranked.length - 2]!];
      const pick = order.find((id) => !harm.has(id) && view.cutUntil[id] <= view.tick);
      if (pick === undefined) return null;

      testing = pick;
      cutStarted = view.tick;
      hpAtCutStart = view.hp;
      pressure = 0;
      done += 1;
      return pick;
    },

    /** Whichever absence hurt most, once anything has been measured. */
    best(_view: RunView): WeaponId | null {
      let top: WeaponId | null = null;
      let score = -Infinity;
      for (const [id, h] of harm) {
        if (h > score) {
          score = h;
          top = id;
        }
      }
      return top;
    },
  };
}
