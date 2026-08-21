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

/*
  THE TWO ARMS MUST DIFFER IN MATCHING AND IN NOTHING ELSE, and for a while
  they did not, which quietly corrupted every measurement taken with them.

  `loadoutScore` returns 0 for the recruiter, deliberately: it kills nothing,
  so it is not a matching choice and scoring it on the matrix would rank it
  first against every wave in the deck. But 0 is also the MINIMUM, so sorting
  descending put it last and sorting ascending put it FIRST. The ceiling arm
  never took it and the floor arm always took it, on every briefing of every
  run. The recruiter is worth about 196 seconds of median survival, so the
  "deliberately worst" loadout was quietly handed the strongest card in the
  game and duly beat the "correct" one, 332 seconds to 325.

  That is a textbook confound and it was sitting inside the instrument built to
  measure a game about confounds. It also went unnoticed because `MISMATCHED`
  had no test of its own anywhere: it was only ever read off in scratch
  measurements, where a surprising number reads as a finding.

  So both arms now choose among KILLERS ONLY. The recruiter is held constant
  across the comparison, at zero, which is what holding a factor constant
  means. What it is worth is a separate question and deserves a separate arm
  rather than a free ride inside this one.
*/
function ranked(sign: number): LoadoutChoice {
  return (view, unlocked) => {
    // Sorted off `WEAPON_IDS` rather than off whatever order `unlocked`
    // happens to be in, so two runs handed the same set in a different order
    // still deploy the same three and the arms stay comparable.
    const order = WEAPON_IDS.filter(
      (id) => unlocked.includes(id) && WEAPONS[id].recruits !== true,
    ).slice();
    order.sort(
      (a, b) => sign * (loadoutScore(a, view.waveIndex) - loadoutScore(b, view.waveIndex)),
    );
    return order.slice(0, LOADOUT_SIZE);
  };
}

/**
 * Deploys the best available answer to the announced threat. The ceiling of
 * the MATCHING decision, which is narrower than the ceiling of play: it never
 * deploys the recruiter, and a real optimum sometimes would.
 */
export const MATCHED: LoadoutChoice = ranked(-1);

/**
 * Deploys the worst available answer. The floor, and the control.
 *
 * Note that on the opening wave the two arms agree, and that is correct rather
 * than a defect: every innate effector is a principal defence against E. coli,
 * so there is no worse choice to make. A wave with no wrong answer is pinned
 * on purpose in `waves.test.ts`, and a control that manufactured a difference
 * there would be inventing one.
 */
export const MISMATCHED: LoadoutChoice = ranked(1);
