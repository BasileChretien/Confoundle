import {
  CUTS_PER_RUN,
  CUT_TICKS,
  DESPAWN_RADIUS,
  DT,
  FORWARD_BIAS,
  ENEMIES,
  HURT_COOLDOWN,
  MAX_ENEMIES,
  MAX_LEVEL,
  OFFER_SIZE,
  PLAYER_HP,
  PLAYER_RADIUS,
  PLAYER_SPEED,
  SPAWN_RADIUS,
  TICK_HZ,
  WEAPONS,
  WEAPON_IDS,
  type EnemyKind,
  type WeaponId,
  effectiveDamage,
  GEM_SPEED,
  MAGNET_RADIUS,
  MAX_GEMS,
  PICKUP_RADIUS,
  XP_VALUE,
  levelScale,
  xpToNext,
  phaseAt,
} from "./content";
import { foldSpawn, stream, unitVector, weightedIndex } from "./rng";

/**
 * The deterministic simulation. Everything the game is depends on this file
 * being reproducible to the last bit, because the death screen is not an
 * animation: it is this same simulation, re-run with one weapon switched off,
 * and the difference between the two is the only claim the game makes.
 *
 * THE RULES THIS FILE OBEYS, all of them for that reason:
 *
 *   - Fixed timestep. `DT` is a constant, never a frame delta. A simulation
 *     that advances by however long the last frame took is a different
 *     simulation on every machine and cannot be replayed anywhere.
 *   - No clock. No `Date`, no `performance`, nothing that knows what time it
 *     is. The only time here is `tick`, an integer.
 *   - No `Math.random`. Every draw comes from a named stream in `rng.ts`.
 *   - No trigonometry. See the note in `rng.ts`.
 *   - Every branch is a function of state, never of iteration order over a
 *     `Set` or object whose order is not pinned.
 *
 * ONE PLACE MUTATES, and it is here. Enemies are held in a reused array and
 * updated in place. A run of four minutes is 14,400 ticks with up to 220
 * enemies alive, so rebuilding the world every tick would allocate several
 * million objects per run and the death screen runs the whole thing dozens of
 * times over. The buffer never escapes: `RunResult` is plain numbers, and the
 * live view handed to a controller is documented below as valid only for the
 * call it arrives in.
 *
 * THE PLAYER'S PATH IS A PURE FUNCTION OF THE INPUT LOG, which is a stronger
 * property than it looks and the counterfactual leans on it entirely. Nothing
 * in the game pushes the player around: no knockback, no stuns. So replaying
 * the same inputs puts the player on exactly the same trajectory whatever is
 * switched off, spawns land in exactly the same places, and the only thing
 * that can differ between a run and its counterfactual is which enemies died
 * and when. That is the clean comparison the design asks for, and
 * `sim.test.ts` pins it.
 */

export type Dir = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const S = Math.SQRT1_2;

/** 0 is standing still; 1 is up, then clockwise. */
const DIRS: readonly (readonly [number, number])[] = [
  [0, 0],
  [0, -1],
  [S, -S],
  [1, 0],
  [S, S],
  [0, 1],
  [-S, S],
  [-1, 0],
  [-S, -S],
];

export interface EnemyView {
  readonly id: number;
  readonly kind: EnemyKind;
  readonly x: number;
  readonly y: number;
  readonly hp: number;
  /** The tick this enemy stops being slowed. Zero if it never was. */
  readonly slowUntil: number;
  /** The tick this enemy stops flashing from a hit. */
  readonly flashUntil: number;
}

/**
 * What a controller sees. VALID ONLY DURING THE CALL IT IS PASSED TO: the
 * arrays behind it are the simulation's own buffers and will be overwritten on
 * the next tick. A controller that keeps one is reading a future it has not
 * seen yet.
 */
export interface RunView {
  readonly tick: number;
  readonly hp: number;
  readonly x: number;
  readonly y: number;
  readonly enemies: readonly EnemyView[];
  readonly levels: Readonly<Record<WeaponId, number>>;
  readonly damage: Readonly<Record<WeaponId, number>>;
  readonly cutsLeft: number;
  readonly cutUntil: Readonly<Record<WeaponId, number>>;
  /**
   * Which weapons went off on this tick, and whether the player was hit. Both
   * are for the renderer and neither is read by the simulation: a run is the
   * same run whether or not anybody is looking at it.
   */
  readonly firedThisTick: readonly WeaponId[];
  readonly hurtThisTick: boolean;
  /** Where each weapon actually landed this tick, so the renderer can draw it. */
  readonly hitsThisTick: readonly Landed[];
  /** Where something died this tick, so the renderer can make it pop. */
  readonly deathsThisTick: readonly Died[];
  readonly gems: readonly GemView[];
  readonly level: number;
  readonly xp: number;
  readonly xpNeeded: number;
}

export interface Landed {
  readonly weapon: WeaponId;
  readonly x: number;
  readonly y: number;
  readonly killed: boolean;
}

export interface Died {
  readonly kind: EnemyKind;
  readonly x: number;
  readonly y: number;
}

export interface GemView {
  readonly x: number;
  readonly y: number;
  readonly value: number;
}

/**
 * The seam that lets one simulation serve four callers: a live player, a
 * replay reading a log, a counterfactual, and a scripted policy being measured
 * headless. Test 3 in the plan is a driver and nothing else.
 *
 * What the simulation needs on every tick. A thumb can supply this.
 */
export interface Driver {
  move(view: RunView): Dir;
  /** A weapon to switch off for eight seconds, or null. */
  cut(view: RunView): WeaponId | null;
}

/**
 * A driver that also answers the level up without being asked twice, which a
 * script can do and a person cannot. See `StepStatus`.
 */
export interface Controller extends Driver {
  chooseUpgrade(view: RunView, offers: readonly WeaponId[]): WeaponId;
}

export interface RunOptions {
  readonly spawnSeed: number;
  readonly offerSeed: number;
  readonly driver: Driver;
  /** The counterfactual: these never fire at all. */
  readonly without?: readonly WeaponId[];
  readonly maxTicks?: number;
}

export interface SimOptions extends Omit<RunOptions, "driver"> {
  readonly controller: Controller;
}

/**
 * `awaitingUpgrade` is the whole reason this is a stepper rather than a loop.
 *
 * A script answers a level up in the same breath as the tick it happens on.
 * A person has to be shown three cards and given as long as they want, and
 * the browser has to be handed back in the meantime. So the tick stops half
 * finished, the offers are already drawn and readable, and nothing else
 * advances until `chooseUpgrade` resolves it.
 *
 * The offers are drawn BEFORE the pause rather than after it, so the draw
 * count per level up is the same whoever is playing, and a recorded run
 * replays identically under a script.
 */
export type StepStatus = "ran" | "awaitingUpgrade" | "over";

export interface Run {
  /** Live. Valid until the next `step`, and never to be retained. */
  readonly view: RunView;
  /** The three cards, meaningful only while the last step said it was waiting. */
  readonly offers: readonly WeaponId[];
  step(): StepStatus;
  chooseUpgrade(id: WeaponId): void;
  result(): RunResult;
}

export interface RunResult {
  /** Ticks survived. Divide by TICK_HZ for seconds. */
  readonly ticks: number;
  readonly died: boolean;
  /**
   * True when the run hit `maxTicks` still alive. For a counterfactual that
   * means the log ran out before the player did, so the honest reading is
   * "at least this long" rather than a number.
   */
  readonly stoppedAtLimit: boolean;
  readonly finalHp: number;
  readonly damage: Readonly<Record<WeaponId, number>>;
  /** Damage that landed on an enemy already below that much hp. */
  readonly overkill: Readonly<Record<WeaponId, number>>;
  readonly kills: Readonly<Record<WeaponId, number>>;
  readonly levels: Readonly<Record<WeaponId, number>>;
  readonly spawned: number;
  /**
   * How many times the spawn stream was consulted. Differs from the number
   * spawned exactly when the ceiling turned an attempt away. Two runs of the same
   * length must agree here whatever is switched off, which is a sharper
   * statement than the digest can make on its own.
   */
  readonly spawnAttempts: number;
  /**
   * A running fold over every spawn: tick, kind, and position to a thousandth.
   * Two runs of the same seed agree here or the streams have leaked into each
   * other, which is the one bug that would quietly invalidate every
   * counterfactual the game shows.
   */
  readonly spawnDigest: number;
  /**
   * The running digest and the running count of enemies actually admitted,
   * sampled once a second.
   *
   * WHY A SERIES AND NOT JUST THE TOTAL. A counterfactual usually dies EARLIER
   * than the run it came from, which is the entire point of it, so comparing
   * end-of-run totals compares two different numbers of spawns and says
   * nothing. Comparing the common prefix asks the question that actually
   * matters: over the stretch both worlds existed for, did they meet the same
   * enemies? The determinism guard in `sim.test.ts` leans on this, and the
   * version of it that compared totals could only pass in windows nobody died
   * in, which is to say in windows where the game was not happening.
   */
  readonly digestAt: readonly number[];
  readonly spawnedAt: readonly number[];
  /**
   * The running count of times the spawn stream was consulted, sampled once a
   * second. Must match between a run and its counterfactual over the stretch
   * both existed for, whatever is switched off, because the draw happens
   * before the ceiling is consulted and the ceiling is the only thing combat
   * can influence.
   */
  readonly attemptsAt: readonly number[];
}

interface Enemy {
  id: number;
  kind: EnemyKind;
  x: number;
  y: number;
  hp: number;
  radius: number;
  speed: number;
  damage: number;
  armour: number;
  slowUntil: number;
  slowFactor: number;
  poisonUntil: number;
  poisonDps: number;
  flashUntil: number;
}

interface Gem {
  x: number;
  y: number;
  value: number;
}

const DEFAULT_MAX_TICKS = 6 * 60 * TICK_HZ;

function zeroed(): Record<WeaponId, number> {
  const out = {} as Record<WeaponId, number>;
  for (const id of WEAPON_IDS) out[id] = 0;
  return out;
}

/**
 * Runs the whole thing to the end, answering level ups from a script. This is
 * what every headless caller wants: the tests, the counterfactual study, and
 * the balance policies.
 */
export function simulate(opts: SimOptions): RunResult {
  const run = createRun({ ...opts, driver: opts.controller });
  for (;;) {
    const status = run.step();
    if (status === "over") return run.result();
    if (status === "awaitingUpgrade") {
      run.chooseUpgrade(opts.controller.chooseUpgrade(run.view, run.offers));
    }
  }
}

export function createRun(opts: RunOptions): Run {
  const maxTicks = opts.maxTicks ?? DEFAULT_MAX_TICKS;
  const spawnRng = stream(opts.spawnSeed);
  const off = new Set<WeaponId>(opts.without ?? []);

  const damage = zeroed();
  const overkill = zeroed();
  const kills = zeroed();
  const levels = zeroed();
  const nextFire = zeroed();
  const cutUntil = zeroed();
  for (const id of WEAPON_IDS) levels[id] = 1;

  let cutsLeft = CUTS_PER_RUN;
  let px = 0;
  let py = 0;
  let hp = PLAYER_HP;
  let hurtUntil = 0;
  let nextId = 1;
  let spawned = 0;
  let spawnAttempts = 0;
  let spawnDigest = 0;
  let faceX = 0;
  let faceY = 0;
  const digestAt: number[] = [];
  const spawnedAt: number[] = [];
  const attemptsAt: number[] = [];

  const enemies: Enemy[] = [];
  const gems: Gem[] = [];
  const d2: number[] = [];
  const firedThisTick: WeaponId[] = [];
  const hitsThisTick: Landed[] = [];
  const deathsThisTick: Died[] = [];
  let level = 1;
  let xp = 0;
  let pendingLevels = 0;
  const view: RunView = {
    tick: 0,
    hp,
    x: px,
    y: py,
    enemies,
    levels,
    damage,
    cutsLeft,
    cutUntil,
    firedThisTick,
    hurtThisTick: false,
    hitsThisTick,
    deathsThisTick,
    gems,
    level: 1,
    xp: 0,
    xpNeeded: xpToNext(1),
  };
  const mutView = view as {
    tick: number;
    hp: number;
    x: number;
    y: number;
    cutsLeft: number;
    hurtThisTick: boolean;
    level: number;
    xp: number;
    xpNeeded: number;
  };

  const offers: WeaponId[] = [];
  let tick = 0;
  let died = false;
  let over = false;
  /** The tick whose level up has already been drawn and applied. */
  let upgradeDoneAt = -1;
  /** The tick whose offers are on the table, waiting for somebody to choose. */
  let offeringAt = -1;

  /**
   * Applies damage and books it. `pierces` is poison, which ignores armour;
   * that exemption is the whole reason poison is the only answer to a brute.
   *
   * The meter is fed the damage that LANDED, after armour. A weapon doing
   * nothing at all to a brute therefore reports nothing, honestly, and the
   * thing the meter still cannot tell you is that the brute is what is about
   * to kill you.
   */
  const hit = (e: Enemy, raw: number, by: WeaponId, pierces = false): void => {
    if (e.hp <= 0) return;
    const amount = effectiveDamage(raw, e.armour, pierces);
    if (amount <= 0) return;
    damage[by] += amount;
    if (amount > e.hp) overkill[by] += amount - e.hp;
    e.hp -= amount;
    e.flashUntil = tick + 4;
    const killed = e.hp <= 0;
    if (killed) {
      kills[by] += 1;
      deathsThisTick.push({ kind: e.kind, x: e.x, y: e.y });
      if (gems.length < MAX_GEMS) gems.push({ x: e.x, y: e.y, value: XP_VALUE[e.kind] });
    }
    hitsThisTick.push({ weapon: by, x: e.x, y: e.y, killed });
  };

  const step = (): StepStatus => {
    if (over) return "over";
    if (tick >= maxTicks) {
      over = true;
      return "over";
    }

    mutView.tick = tick;
    mutView.hp = hp;
    mutView.x = px;
    mutView.y = py;
    mutView.cutsLeft = cutsLeft;

    // 1. UPGRADES, before anything moves, because the choice is about the
    //    tick that follows it.
    if (pendingLevels > 0 && upgradeDoneAt !== tick) {
      if (offeringAt !== tick) {
        offers.length = 0;
        /*
          A FRESH STREAM PER LEVEL, KEYED TO THE LEVEL NUMBER.

          Levels are earned by killing now, so WHEN the fifth one arrives
          depends on how the fight went, and a counterfactual that removes a
          weapon reaches it later. Drawing the cards from one running stream
          would then deal a different hand at every level in the two runs, and
          the difference the reveal reports would stop being the decision.

          Keying the draw to the level index instead makes the Nth level up
          offer the same three cards in every world. What legitimately differs
          between them is how long it took to get there, which is a real
          consequence of the intervention rather than an artefact of the deal.
        */
        const cards = stream((opts.offerSeed ^ Math.imul(level, 0x9e3779b9)) >>> 0);
        /*
          THE BAG IS ALWAYS EVERY WEAPON, and never a pool filtered by what
          the player has already levelled.

          This is the spawn-stream argument again, one level up. An upgrade
          counterfactual asks what would have happened had you taken a
          different card, and that question is only answerable if the LATER
          cards are the same either way. Filtering the bag by which weapons
          are maxed makes the offer sequence depend on the choices, so the
          moment any weapon reaches the ceiling the two runs are being dealt
          different hands and the difference between them is no longer the
          decision being studied.

          The cost is that a maxed weapon can be offered, which is a dead card.
          That is a real cost and it is the smaller one: a dead card is
          visible and annoying, where a contaminated counterfactual is
          invisible and wrong.
        */
        const bag = WEAPON_IDS.slice();
        for (let k = 0; k < OFFER_SIZE; k++) {
          const r = cards();
          if (bag.length === 0) continue;
          const pick = Math.min(bag.length - 1, Math.floor(r * bag.length));
          offers.push(bag[pick]!);
          bag.splice(pick, 1);
        }
        offeringAt = tick;
      }
      if (offers.length > 0) return "awaitingUpgrade";
      upgradeDoneAt = tick;
      pendingLevels -= 1;
    }

    firedThisTick.length = 0;
    hitsThisTick.length = 0;
    deathsThisTick.length = 0;
    mutView.hurtThisTick = false;

    // 2. CUTS.
    const wants = opts.driver.cut(view);
    if (wants !== null && cutsLeft > 0 && cutUntil[wants] <= tick) {
      cutUntil[wants] = tick + CUT_TICKS;
      cutsLeft -= 1;
    }

    // 3. THE PLAYER, whose path is a pure function of these directions.
    const dir = DIRS[opts.driver.move(view)] ?? DIRS[0]!;
    px += dir[0]! * PLAYER_SPEED * DT;
    py += dir[1]! * PLAYER_SPEED * DT;
    if (dir[0] !== 0 || dir[1] !== 0) {
      faceX = dir[0]!;
      faceY = dir[1]!;
    }

    // 4. SPAWNING. The draws happen BEFORE the cap is consulted, so a run that
    //    is going badly enough to sit at the ceiling still consumes the stream
    //    at the same rate as one that is not. Deciding first and drawing
    //    second would tie the spawn sequence to combat outcomes and every
    //    counterfactual in the game would be comparing two different worlds.
    const phase = phaseAt(tick);
    if (tick % phase.everyTicks === 0) {
      const weights = phase.mix.map((m) => m[1]);
      const kind = phase.mix[weightedIndex(spawnRng, weights)]![0];
      const u = unitVector(spawnRng);
      // Drawn unconditionally, even when the player is standing still and it
      // cannot change anything, so the number of draws per spawn is a
      // constant and the sequence never depends on how the run is going.
      const roll = spawnRng();
      let ux = u.x;
      let uy = u.y;
      if ((faceX !== 0 || faceY !== 0) && roll < FORWARD_BIAS && ux * faceX + uy * faceY < 0) {
        ux = -ux;
        uy = -uy;
      }
      spawnAttempts += 1;
      const ex = px + ux * SPAWN_RADIUS;
      const ey = py + uy * SPAWN_RADIUS;
      spawnDigest = foldSpawn(
        spawnDigest,
        tick,
        phase.mix.findIndex((m) => m[0] === kind),
        ex,
        ey,
      );
      if (enemies.length < MAX_ENEMIES) {
        const spec = ENEMIES[kind];
        enemies.push({
          id: nextId++,
          kind,
          x: ex,
          y: ey,
          hp: spec.hp,
          radius: spec.radius,
          speed: spec.speed,
          damage: spec.damage,
          armour: spec.armour,
          slowUntil: 0,
          slowFactor: 1,
          poisonUntil: 0,
          poisonDps: 0,
          flashUntil: 0,
        });
        spawned += 1;
      }
    }

    // 5. ENEMIES MOVE, and their distance to the player is measured once for
    //    every weapon that will ask about it this tick.
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i]!;
      const dx = px - e.x;
      const dy = py - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1e-6) {
        const factor = tick < e.slowUntil ? e.slowFactor : 1;
        const step = e.speed * factor * DT;
        e.x += (dx / dist) * step;
        e.y += (dy / dist) * step;
      }
      const ndx = px - e.x;
      const ndy = py - e.y;
      d2[i] = ndx * ndx + ndy * ndy;
    }

    // 6. WEAPONS, in the fixed order of the WEAPONS table.
    for (const id of WEAPON_IDS) {
      if (off.has(id)) continue;
      if (tick < cutUntil[id]) continue;
      if (tick < nextFire[id]) continue;
      const spec = WEAPONS[id];
      nextFire[id] = tick + spec.cooldown;
      firedThisTick.push(id);
      const scale = levelScale(levels[id]);
      const lo = spec.minRange * spec.minRange;
      const hi = spec.maxRange * spec.maxRange;

      if (spec.prefer === "nearest") {
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < enemies.length; i++) {
          const dd = d2[i]!;
          if (enemies[i]!.hp <= 0 || dd < lo || dd > hi) continue;
          if (dd < bestD) {
            bestD = dd;
            best = i;
          }
        }
        if (best >= 0) applyTo(enemies[best]!, id, spec, scale, tick, hit);
        continue;
      }

      if (spec.prefer === "toughest") {
        // A small fixed selection rather than a sort: maxTargets is three.
        const chosen: number[] = [];
        for (let i = 0; i < enemies.length; i++) {
          const dd = d2[i]!;
          if (enemies[i]!.hp <= 0 || dd < lo || dd > hi) continue;
          chosen.push(i);
          if (chosen.length > spec.maxTargets) {
            let worst = 0;
            for (let k = 1; k < chosen.length; k++) {
              // Ties go to the later index, which is the younger enemy, so the
              // survivor is always the oldest of the equally tough.
              if (enemies[chosen[k]!]!.hp <= enemies[chosen[worst]!]!.hp) worst = k;
            }
            chosen.splice(worst, 1);
          }
        }
        for (const i of chosen) applyTo(enemies[i]!, id, spec, scale, tick, hit);
        continue;
      }

      let taken = 0;
      for (let i = 0; i < enemies.length && taken < spec.maxTargets; i++) {
        const dd = d2[i]!;
        if (enemies[i]!.hp <= 0 || dd < lo || dd > hi) continue;
        applyTo(enemies[i]!, id, spec, scale, tick, hit);
        taken += 1;
      }
    }

    // 7. POISON, which is the only damage that lands outside its weapon's turn.
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i]!;
      if (e.hp > 0 && tick < e.poisonUntil) hit(e, e.poisonDps * DT, "poison", true);
    }

    // 8. CONTACT. Everything touching you lands at once, so a crowd is worse
    //    than one thing, which is the entire reason a weapon that only slows
    //    people down can be load bearing.
    if (tick >= hurtUntil) {
      let incoming = 0;
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i]!;
        if (e.hp <= 0) continue;
        const reach = PLAYER_RADIUS + e.radius;
        if (d2[i]! <= reach * reach) incoming += e.damage;
      }
      if (incoming > 0) {
        hp -= incoming;
        hurtUntil = tick + HURT_COOLDOWN;
        mutView.hurtThisTick = true;
      }
    }

    // 8b. GEMS. They sit where the thing died until the player comes near, so
    //     collecting experience means walking into the place the fighting
    //     just happened. That is the reference game's core tension and the
    //     first version of this file had no equivalent at all.
    {
      let g = 0;
      for (let i = 0; i < gems.length; i++) {
        const gem = gems[i]!;
        const dx = px - gem.x;
        const dy = py - gem.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= PICKUP_RADIUS) {
          xp += gem.value;
          continue;
        }
        if (dist < MAGNET_RADIUS && dist > 1e-6) {
          // Faster the closer it gets, so a pickup finishes with a snap.
          const pull = GEM_SPEED * (1.15 - dist / MAGNET_RADIUS) * DT;
          gem.x += (dx / dist) * pull;
          gem.y += (dy / dist) * pull;
        }
        gems[g++] = gem;
      }
      gems.length = g;

      let need = xpToNext(level);
      while (xp >= need) {
        xp -= need;
        level += 1;
        pendingLevels += 1;
        need = xpToNext(level);
      }
      mutView.level = level;
      mutView.xp = xp;
      mutView.xpNeeded = need;
    }

    // 9. COMPACTION, stable, so the array stays in id order and "any" targeting
    //    means "the oldest things in range" rather than "whatever the last
    //    removal happened to swap into place".
    let w = 0;
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i]!;
      if (e.hp <= 0) continue;
      if (d2[i]! > DESPAWN_RADIUS * DESPAWN_RADIUS) continue;
      enemies[w++] = e;
    }
    enemies.length = w;

    if (tick % TICK_HZ === TICK_HZ - 1) {
      digestAt.push(spawnDigest);
      spawnedAt.push(spawned);
      attemptsAt.push(spawnAttempts);
    }

    if (hp <= 0) {
      died = true;
      tick += 1;
      over = true;
      mutView.tick = tick;
      mutView.hp = hp;
      return "over";
    }

    tick += 1;
    return "ran";
  };

  return {
    view,
    offers,
    step,
    chooseUpgrade(id: WeaponId) {
      // Ignored unless a level up is genuinely on the table right now, so a
      // stray tap between rounds cannot hand out a free level.
      if (offeringAt !== tick || upgradeDoneAt === tick || offers.length === 0) return;
      const valid = offers.includes(id) ? id : offers[0]!;
      levels[valid] = Math.min(MAX_LEVEL, levels[valid] + 1);
      upgradeDoneAt = tick;
      // SPENDING THE LEVEL, which the first version forgot to do. Without it
      // `upgradeDoneAt` blocks a second card on the same tick and nothing
      // blocks one on the next, so a single earned level hands out a card
      // every tick forever: measured at forty two thousand level ups in a
      // twelve minute run, with every weapon maxed inside a second.
      pendingLevels -= 1;
    },
    result: (): RunResult => ({
      ticks: tick,
      died,
      stoppedAtLimit: !died && tick >= maxTicks,
      finalHp: hp,
      damage,
      overkill,
      kills,
      levels,
      spawned,
      spawnAttempts,
      spawnDigest,
      digestAt,
      spawnedAt,
      attemptsAt,
    }),
  };
}

function applyTo(
  e: Enemy,
  id: WeaponId,
  spec: (typeof WEAPONS)[WeaponId],
  scale: number,
  tick: number,
  hit: (e: Enemy, amount: number, by: WeaponId, pierces?: boolean) => void,
): void {
  if (spec.damage > 0) hit(e, spec.damage * scale, id);
  if (spec.slowFactor !== undefined && spec.slowTicks !== undefined) {
    /*
      A LEVEL MAKES THE SLOW DEEPER, not just longer.

      Scaling only the duration is the wrong lever, measured: past the
      cooldown, extra duration buys nothing at all, so a level spent on ice
      bought almost nothing while a level spent on lightning compounded.

      HONEST ABOUT WHAT THIS DID NOT FIX. It was changed while chasing the
      result in `policies.test.ts`, that following the meter is the best
      investment strategy in the game, and it did not move that: only-ice went
      from 261s to 283s against a meter follower reaching the ceiling. The
      change is kept because the reasoning stands on its own, not because it
      achieved what it was reached for. The real gap is described in that
      file and is not a tuning problem.
    */
    e.slowFactor = spec.slowFactor / (1 + 0.19 * (scale - 1));
    e.slowUntil = tick + Math.round(spec.slowTicks * Math.min(scale, 1.6));
  }
  if (spec.poisonDps !== undefined && spec.poisonTicks !== undefined) {
    e.poisonDps = spec.poisonDps * scale;
    e.poisonUntil = tick + spec.poisonTicks;
  }
}
