import { LOADOUT_SIZE, WEAPON_IDS, type WeaponId } from "./content";
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

export interface Decision {
  readonly tick: number;
  readonly offers: readonly WeaponId[];
  readonly chosen: WeaponId;
}

/**
 * One briefing answered: what was on the table and what was deployed.
 *
 * A SEPARATE RECORD FROM A LEVEL UP, because it is a different decision with
 * a different currency. A level up spends experience on more of something you
 * already have; a briefing spends nothing at all and picks which three of your
 * effectors are in the fight, against a threat that has been named. A log that
 * folded them together could not replay either one.
 */
export interface Deployment {
  readonly tick: number;
  readonly waveIndex: number;
  readonly offered: readonly WeaponId[];
  readonly chosen: readonly WeaponId[];
}

export interface RunLog {
  readonly spawnSeed: number;
  readonly offerSeed: number;
  /** Only the changes: [tick, direction]. */
  readonly moves: readonly (readonly [number, Dir])[];
  readonly cuts: readonly (readonly [number, WeaponId])[];
  /**
   * Every level up: when it happened, what the three cards were, and which one
   * was taken.
   *
   * The weapon rather than the index into the offers, because a log that says
   * "index 2" is unreadable and silently means something different if the
   * offer stream ever changes.
   *
   * The offers and the tick are here because the death screen asks about a
   * DECISION, and a decision cannot be described without them: "at 2:30 you
   * took the yellow one over these two" needs all three.
   */
  readonly upgrades: readonly Decision[];
  /** Every briefing answered, in order. */
  readonly deployments: readonly Deployment[];
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
  noteUpgrade(tick: number, offers: readonly WeaponId[], chosen: WeaponId): void;
  noteLoadout(
    tick: number,
    waveIndex: number,
    offered: readonly WeaponId[],
    chosen: readonly WeaponId[],
  ): void;
  log(): RunLog;
}

export function recorder(
  inner: Driver,
  seeds: { spawnSeed: number; offerSeed: number },
): Recorder {
  const moves: [number, Dir][] = [];
  const cuts: [number, WeaponId][] = [];
  const upgrades: Decision[] = [];
  const deployments: Deployment[] = [];
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
    noteUpgrade(tick, offers, chosen) {
      upgrades.push({ tick, offers: [...offers], chosen });
    },
    noteLoadout(tick, waveIndex, offered, chosen) {
      deployments.push({ tick, waveIndex, offered: [...offered], chosen: [...chosen] });
    },
    log: () => ({ ...seeds, moves, cuts, upgrades, deployments, ticks }),
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
        rec.noteUpgrade(view.tick, offers, valid);
        return valid;
      },
      chooseLoadout(view, unlocked) {
        const picked = inner.chooseLoadout(view, unlocked);
        rec.noteLoadout(view.tick, view.waveIndex, unlocked, picked);
        return picked;
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
  let nextDeployment = 0;

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
      const want = log.upgrades[nextUpgrade++]?.chosen;
      return want !== undefined && offers.includes(want) ? want : offers[0]!;
    },
    chooseLoadout(_view, unlocked) {
      // Past the end of the log a counterfactual can still be asked, because
      // taking a weapon away can make a run reach a briefing the original one
      // never got to. Falling back to what is available keeps it alive rather
      // than deadlocking the stepper, and `replay.test.ts` pins the case.
      const want = log.deployments[nextDeployment++]?.chosen;
      if (want === undefined) return unlocked.slice(0, LOADOUT_SIZE);
      const kept = want.filter((id) => unlocked.includes(id));
      return kept.length > 0 ? kept : unlocked.slice(0, LOADOUT_SIZE);
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
  /**
   * Which weapon this arm is about, or null for the run as it was played.
   *
   * Deliberately not called `without`: two studies build these now, one that
   * removes a weapon and one that invests in it, and a field whose meaning
   * depends on which function produced it is the kind of ambiguity that turns
   * into a wrong number on a screen.
   */
  readonly weapon: WeaponId | null;
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

function arm(
  log: RunLog,
  weapon: WeaponId | null,
  seeds: readonly number[],
  how: "remove" | "asPlayed",
): Arm {
  const ticks: number[] = [];
  const censored: boolean[] = [];
  for (const seed of seeds) {
    const r = simulate({
      spawnSeed: seed,
      offerSeed: log.offerSeed,
      controller: replayController(log),
      without: how === "remove" && weapon !== null ? [weapon] : undefined,
      maxTicks: log.ticks,
    });
    ticks.push(r.ticks);
    censored.push(r.stoppedAtLimit);
  }
  return { weapon, ticks, censored };
}

/**
 * Replays the run, but takes a different card at ONE level up.
 *
 * THIS IS THE MARGINAL VALUE OF THE NEXT LEVEL, and it is the only version of
 * that question that is not confounded.
 *
 * The obvious version, and the one written first, is "always take X whenever
 * it is offered". Measured, every such arm loses to the run as played, and it
 * loses for a reason that has nothing to do with which weapon is good: a fixed
 * preference concentrates every level into one weapon while the recorded run
 * spread them, and concentration loses to spread on its own. That comparison
 * cannot say anything about the meter because the two arms differ in two ways
 * at once.
 *
 * Changing exactly one card changes exactly one thing. Everything before it is
 * identical, and everything after it is the honest consequence.
 */
export function switchingController(log: RunLog, at: number, to: WeaponId): Controller {
  const base = replayController(log);
  let seen = 0;
  return {
    move: base.move,
    cut: base.cut,
    chooseLoadout: base.chooseLoadout,
    chooseUpgrade(view, offers) {
      const recorded = base.chooseUpgrade(view, offers);
      const mine = seen++;
      return mine === at && offers.includes(to) ? to : recorded;
    },
  };
}

/**
 * What each of the three cards at one level up was worth.
 *
 * The arm for the card the player actually took is the baseline by
 * construction, and `replay.test.ts` checks that it comes back identical
 * rather than merely close: if it did not, the switch would be changing
 * something other than the decision.
 */
export function decisionStudy(
  log: RunLog,
  at: number,
  seedCount: number,
): CounterfactualStudy & { readonly decision: Decision } {
  const decision = log.upgrades[at]!;
  const seeds = seedsFor(log, seedCount);
  const armFor = (to: WeaponId): Arm => {
    const ticks: number[] = [];
    const censored: boolean[] = [];
    for (const seed of seeds) {
      const r = simulate({
        spawnSeed: seed,
        offerSeed: log.offerSeed,
        controller: switchingController(log, at, to),
        maxTicks: log.ticks,
      });
      ticks.push(r.ticks);
      censored.push(r.stoppedAtLimit);
    }
    return { weapon: to, ticks, censored };
  };
  return {
    decision,
    seeds,
    actual: replay(log).ticks,
    baseline: arm(log, null, seeds, "asPlayed"),
    arms: decision.offers.map(armFor),
  };
}

/**
 * Which level up to ask about: far enough in that the meter has had time to
 * become persuasive, far enough from the end that the answer had time to
 * matter.
 *
 * A third of the way through, and the first decision is never chosen: at the
 * first level up the meter is a few seconds old and there is nothing yet to be
 * misled by.
 */
export function decisionToAskAbout(log: RunLog): number | null {
  if (log.upgrades.length < 2) return null;
  return Math.max(1, Math.round((log.upgrades.length - 1) / 3));
}

export function study(log: RunLog, seedCount: number): CounterfactualStudy {
  const seeds = seedsFor(log, seedCount);
  return {
    seeds,
    actual: replay(log).ticks,
    baseline: arm(log, null, seeds, "asPlayed"),
    arms: WEAPON_IDS.map((id) => arm(log, id, seeds, "remove")),
  };
}

/**
 * The decision study, one arm at a time, so a browser can draw a progress bar
 * instead of freezing.
 *
 * Four arms of a few dozen replays each is seconds of arithmetic on a phone,
 * and it lands at the exact moment the player has just died and is looking at
 * the screen. Yielding between arms is the difference between a pause and a
 * hang. Same order and same seeds as `decisionStudy`, so the two agree
 * exactly; `replay.test.ts` checks that they do.
 */
export function* decisionStudyByArm(
  log: RunLog,
  at: number,
  seedCount: number,
): Generator<{ done: number; total: number }, CounterfactualStudy & { decision: Decision }, void> {
  const decision = log.upgrades[at]!;
  const seeds = seedsFor(log, seedCount);
  const total = decision.offers.length + 1;
  const actual = replay(log).ticks;
  const baseline = arm(log, null, seeds, "asPlayed");
  yield { done: 1, total };
  const arms: Arm[] = [];
  for (const to of decision.offers) {
    const ticks: number[] = [];
    const censored: boolean[] = [];
    for (const seed of seeds) {
      const r = simulate({
        spawnSeed: seed,
        offerSeed: log.offerSeed,
        controller: switchingController(log, at, to),
        maxTicks: log.ticks,
      });
      ticks.push(r.ticks);
      censored.push(r.stoppedAtLimit);
    }
    arms.push({ weapon: to, ticks, censored });
    yield { done: arms.length + 1, total };
  }
  return { decision, seeds, actual, baseline, arms };
}

/**
 * How much longer the same worlds ran when a different card was taken.
 * Positive means the alternative beat what the player actually did.
 *
 * A separate function from `pairedLoss` rather than a negated call to it,
 * because the sign IS the meaning here and a reader should not have to work
 * out which way round a subtraction went to know whether a bar is good news.
 */
export function pairedGain(baseline: Arm, a: Arm): number {
  let total = 0;
  for (let i = 0; i < a.ticks.length; i++) total += a.ticks[i]! - baseline.ticks[i]!;
  return total / a.ticks.length;
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
  chooseLoadout: (_v: RunView, unlocked) => unlocked.slice(0, LOADOUT_SIZE),
};
