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
  | { kind: "spread" };

export function policy(feed: Feed): Controller {
  const taken = {} as Record<WeaponId, number>;
  for (const id of WEAPON_IDS) taken[id] = 0;

  return {
    move: awayFromTheCrowd,
    cut: () => null,
    chooseUpgrade(view, offers) {
      if (feed.kind === "fixed") {
        return offers.includes(feed.weapon) ? feed.weapon : offers[0]!;
      }
      if (feed.kind === "biggestBar") {
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
