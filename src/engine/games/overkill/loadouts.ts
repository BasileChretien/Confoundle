import {
  EFFECTIVE,
  ENEMIES,
  LOADOUT_SIZE,
  WEAPONS,
  WEAPON_IDS,
  waveAt,
  type PathogenClass,
  type WeaponId,
} from "./content";
import type { LoadoutChoice } from "./policies";

/**
 * The oracle: what a player who has already learned the immunology would
 * deploy against the wave that was just announced.
 *
 * IT IS DELIBERATELY A CHEAT, and it lives in its own file so that the cheat
 * is visible. `policies.ts` is scanned to prove it never reads the tuning
 * table, because a scripted player that knows the answers measures the author
 * rather than the game. This one knows all of them, on purpose: it is the
 * CEILING of the briefing decision, and `MISMATCHED` is the floor. What a real
 * player is worth sits somewhere between, and the gap between the two is the
 * only evidence that the briefing is a mechanic rather than a modal.
 *
 * If that gap turns out to be small, the honest response is to delete the
 * briefing rather than to ship it.
 */

/**
 * The pathogen classes a wave sends, weighted by how much DANGER each carries,
 * over all phases.
 *
 * BY THREAT AND NOT BY HEADCOUNT, and the first version got this wrong in a
 * way that was visible the moment the picks were printed. The last wave is
 * five parts worm to five parts E. coli, so by headcount the two classes are
 * equal and the oracle answered a wave of schistosomes with complement and
 * antibody, leaving the eosinophil on the bench: the one effector that wave
 * exists to teach. By headcount that is arithmetically correct and as a piece
 * of advice it is nonsense, because a worm has forty six times the health of
 * an E. coli and nearly nine times the contact damage.
 *
 * Health times damage is a crude proxy for how much of the danger a class
 * represents, and crude is enough: it puts the worms at 99.75% of that wave,
 * which is the answer a player arrives at by being hit.
 */
export function classWeights(waveIndex: number): Readonly<Record<string, number>> {
  const wave = waveAt(waveIndex);
  const phases = wave.turnsInto === undefined ? [wave.mix] : [wave.mix, wave.turnsInto.mix];
  const out: Record<string, number> = {};
  for (const mix of phases) {
    const threat = (kind: keyof typeof ENEMIES, n: number) =>
      n * ENEMIES[kind].hp * ENEMIES[kind].damage;
    let total = 0;
    for (const [kind, n] of mix) total += threat(kind, n);
    for (const [kind, n] of mix) {
      const cls: PathogenClass = ENEMIES[kind].cls;
      out[cls] = (out[cls] ?? 0) + threat(kind, n) / total / phases.length;
    }
  }
  return out;
}

/**
 * How much of what is coming an effector can actually kill, weighted by how
 * much of it there is.
 *
 * CYTOKINES SCORE ZERO HERE, and that is a property of this scorer rather than
 * a claim about the game. Their row in the matrix is all ones because those
 * numbers never multiply anything: they recruit and never kill. Counted
 * naively they would rank first against every wave in the deck, and the
 * "matched" arm would quietly become "always take the one that kills nothing".
 * The same trap caught the solvability test in `waves.test.ts`.
 */
export function loadoutScore(id: WeaponId, waveIndex: number): number {
  if (WEAPONS[id].recruits === true) return 0;
  const weights = classWeights(waveIndex);
  let score = 0;
  for (const cls of Object.keys(weights)) {
    score += weights[cls]! * EFFECTIVE[id][cls as PathogenClass];
  }
  return score;
}

function ranked(sign: number): LoadoutChoice {
  return (view, unlocked) => {
    // Sorted off `WEAPON_IDS` rather than off whatever order `unlocked`
    // happens to be in, so two runs handed the same set in a different order
    // still deploy the same three and the arms stay comparable.
    const order = WEAPON_IDS.filter((id) => unlocked.includes(id)).slice();
    order.sort(
      (a, b) => sign * (loadoutScore(a, view.waveIndex) - loadoutScore(b, view.waveIndex)),
    );
    return order.slice(0, LOADOUT_SIZE);
  };
}

/** Deploys the best available answer to the announced threat. The ceiling. */
export const MATCHED: LoadoutChoice = ranked(-1);

/** Deploys the worst available answer. The floor, and the control. */
export const MISMATCHED: LoadoutChoice = ranked(1);
