import { WEAPON_IDS, type WeaponId } from "./content";
import {
  simulate,
  type Controller,
  type Dir,
  type Driver,
  type RunResult,
  type RunView,
} from "./sim";
import { stream } from "./rng";

/**
 * Recording a run, replaying it, and asking what would have happened without
 * a weapon.
 *
 * THE PAIRED DESIGN IS THE POINT OF THIS FILE, and it is the part that would
 * have been got wrong by writing the obvious thing. The obvious thing is to
 * take the run that happened, re-run it three hundred times without the knife,
 * and print the middle number. That compares one sample of one world against
 * three hundred samples of three hundred other worlds, so most of the spread
 * it reports is the spawn seed rather than the knife, and the game would be
 * committing the exact error it exists to teach people to spot, on its own
 * scoreboard, in the one screen everybody reads.
 *
 * So every arm runs over THE SAME set of seeds, including the arm with nothing
 * removed. The quantity the death screen shows is a paired difference: the
 * same world, twice, once with the weapon and once without.
 *
 * CENSORING IS REPORTED RATHER THAN HIDDEN. A counterfactual replays the
 * player's recorded inputs, so it cannot run past the end of the log. Usually
 * that does not bite, because taking a weapon away makes runs shorter. When it
 * does bite, the honest statement is "at least this long" and not a number, so
 * `Arm.censored` marks those and `summarise` refuses to hand back a median
 * that lands inside the censored region.
 */

export interface RunLog {
  readonly spawnSeed: number;
  readonly offerSeed: number;
  /** Only the changes: [tick, direction]. */
  readonly moves: readonly (readonly [number, Dir])[];
  readonly cuts: readonly (readonly [number, WeaponId])[];
  /**
   * The weapon chosen at each level up, in order. The weapon rather than the
   * index into the offers, because a log that says "index 2" is unreadable and
   * silently means something different if the offer stream ever changes.
   */
  readonly upgrades: readonly WeaponId[];
  /** How many ticks the log covers. No replay of it may run longer. */
  readonly ticks: number;
}

/**
 * Wraps any controller and writes down what it did, so a live player and a
 * scripted policy produce the same kind of artefact and the counterfactual
 * machinery does not care which one it is looking at.
 */
export interface Recorder {
  /** Wraps the caller's driver. Pass this to `createRun`. */
  readonly driver: Driver;
  /**
   * Called with whatever level up was actually applied. Separate from the
   * driver because a live player answers a level up through the stepper's
   * `chooseUpgrade` and never goes through a controller at all.
   */
  noteUpgrade(id: WeaponId): void;
  log(): RunLog;
}

export function recorder(
  inner: Driver,
  seeds: { spawnSeed: number; offerSeed: number },
): Recorder {
  const moves: [number, Dir][] = [];
  const cuts: [number, WeaponId][] = [];
  const upgrades: WeaponId[] = [];
  let last: Dir | null = null;
  let ticks = 0;

  return {
    driver: {
      move(view) {
        const d = inner.move(view);
        if (d !== last) {
          moves.push([view.tick, d]);
          last = d;
        }
        if (view.tick + 1 > ticks) ticks = view.tick + 1;
        return d;
      },
      cut(view) {
        const c = inner.cut(view);
        // Recorded only when the simulation will actually honour it, so a
        // replay does not spend a cut the original run never spent.
        if (c !== null && view.cutsLeft > 0 && view.cutUntil[c] <= view.tick) {
          cuts.push([view.tick, c]);
        }
        return c;
      },
    },
    noteUpgrade(id) {
      upgrades.push(id);
    },
    log: () => ({ ...seeds, moves, cuts, upgrades, ticks }),
  };
}

/** The scripted form: a controller in, a controller out. */
export function recording(
  inner: Controller,
  seeds: { spawnSeed: number; offerSeed: number },
): { controller: Controller; log: () => RunLog } {
  const rec = recorder(inner, seeds);
  return {
    controller: {
      move: rec.driver.move,
      cut: rec.driver.cut,
      chooseUpgrade(view, offers) {
        const w = inner.chooseUpgrade(view, offers);
        const valid = offers.includes(w) ? w : offers[0]!;
        rec.noteUpgrade(valid);
        return valid;
      },
    },
    log: rec.log,
  };
}

/** Plays a log back. Outside the log's span it stands still and does nothing. */
export function replayController(log: RunLog): Controller {
  const moveAt = new Map<number, Dir>();
  for (const [t, d] of log.moves) moveAt.set(t, d);
  const cutAt = new Map<number, WeaponId>();
  for (const [t, w] of log.cuts) cutAt.set(t, w);
  let held: Dir = 0;
  let nextUpgrade = 0;

  return {
    move(view) {
      const d = moveAt.get(view.tick);
      if (d !== undefined) held = d;
      return held;
    },
    cut(view) {
      return cutAt.get(view.tick) ?? null;
    },
    chooseUpgrade(_view, offers) {
      const want = log.upgrades[nextUpgrade++];
      return want !== undefined && offers.includes(want) ? want : offers[0]!;
    },
  };
}

/** Re-runs a log exactly as it was recorded. */
export function replay(log: RunLog, spawnSeed = log.spawnSeed): RunResult {
  return simulate({
    spawnSeed,
    offerSeed: log.offerSeed,
    controller: replayController(log),
    maxTicks: log.ticks,
  });
}

export interface Arm {
  /** null is the arm with nothing taken away. */
  readonly without: WeaponId | null;
  readonly ticks: readonly number[];
  /** Reached the end of the log still alive, so its true length is unknown. */
  readonly censored: readonly boolean[];
}

export interface CounterfactualStudy {
  readonly seeds: readonly number[];
  /** The run that really happened, at the seed it really happened on. */
  readonly actual: number;
  readonly baseline: Arm;
  readonly arms: readonly Arm[];
}

/**
 * The seeds every arm is measured on. Derived from the log so the study is
 * reproducible, and starting with the run's own seed so the baseline contains
 * the world the player actually played.
 */
export function seedsFor(log: RunLog, count: number): number[] {
  const rng = stream(log.spawnSeed ^ 0x9e3779b9);
  const out = [log.spawnSeed];
  while (out.length < count) out.push(Math.floor(rng() * 0xffffffff));
  return out;
}

function arm(log: RunLog, without: WeaponId | null, seeds: readonly number[]): Arm {
  const ticks: number[] = [];
  const censored: boolean[] = [];
  for (const seed of seeds) {
    const r = simulate({
      spawnSeed: seed,
      offerSeed: log.offerSeed,
      controller: replayController(log),
      without: without === null ? undefined : [without],
      maxTicks: log.ticks,
    });
    ticks.push(r.ticks);
    censored.push(r.stoppedAtLimit);
  }
  return { without, ticks, censored };
}

export function study(log: RunLog, seedCount: number): CounterfactualStudy {
  const seeds = seedsFor(log, seedCount);
  return {
    seeds,
    actual: replay(log).ticks,
    baseline: arm(log, null, seeds),
    arms: WEAPON_IDS.map((id) => arm(log, id, seeds)),
  };
}

/**
 * The same study, one arm at a time, so a browser can draw a progress bar
 * instead of freezing.
 *
 * Seven arms over a few dozen seeds is minutes of arithmetic on a phone, and
 * it lands at the exact moment the player has just died and is looking at the
 * screen. Yielding between arms is the difference between a pause and a
 * hang. The arms are computed in the same order and on the same seeds as
 * `study`, so the two agree exactly; `replay.test.ts` checks that they do.
 */
export function* studyByArm(
  log: RunLog,
  seedCount: number,
): Generator<{ done: number; total: number }, CounterfactualStudy, void> {
  const seeds = seedsFor(log, seedCount);
  const total = WEAPON_IDS.length + 1;
  const actual = replay(log).ticks;
  const baseline = arm(log, null, seeds);
  yield { done: 1, total };
  const arms: Arm[] = [];
  for (const id of WEAPON_IDS) {
    arms.push(arm(log, id, seeds));
    yield { done: arms.length + 1, total };
  }
  return { seeds, actual, baseline, arms };
}

export interface Summary {
  /** Middle of the arm, in ticks. */
  readonly median: number;
  /**
   * True when the median falls among runs that were still alive at the end of
   * the log, so the real median is at least this and nobody knows by how much.
   */
  readonly medianCensored: boolean;
  readonly low: number;
  readonly high: number;
  readonly censoredShare: number;
}

/** The interval is the middle 80%, which is what a bar with a soft end draws. */
export function summarise(a: Arm): Summary {
  const order = a.ticks.map((t, i) => [t, i] as const).sort((p, q) => p[0] - q[0]);
  const at = (q: number): readonly [number, number] =>
    order[Math.min(order.length - 1, Math.max(0, Math.floor(q * (order.length - 1) + 0.5)))]!;
  const mid = at(0.5);
  let censoredCount = 0;
  for (const c of a.censored) if (c) censoredCount += 1;
  return {
    median: mid[0],
    medianCensored: a.censored[mid[1]]!,
    low: at(0.1)[0],
    high: at(0.9)[0],
    censoredShare: censoredCount / a.censored.length,
  };
}

/**
 * What the death screen ranks by: how much shorter the same worlds got when
 * this weapon was taken out of them. Paired, so the spawn seed cancels.
 */
export function pairedLoss(baseline: Arm, a: Arm): number {
  let total = 0;
  for (let i = 0; i < a.ticks.length; i++) total += baseline.ticks[i]! - a.ticks[i]!;
  return total / a.ticks.length;
}

/** A controller that stands still and never does anything. For tests. */
export const IDLE: Controller = {
  move: () => 0,
  cut: () => null,
  chooseUpgrade: (_v: RunView, offers) => offers[0]!,
};
