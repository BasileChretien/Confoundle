import {
  CUT_TICKS,
  PLAYER_RADIUS,
  TICK_HZ,
  WEAPONS,
  type EnemyKind,
  type WeaponId,
} from "./content";
import type { RunView } from "./sim";

/**
 * Drawing a tick.
 *
 * REWRITTEN BECAUSE THE FIRST VERSION WAS NOT A GAME TO LOOK AT. It drew
 * enemies as dots that vanished, and weapons as abstract rings expanding from
 * the player that never touched anything. So killing had no feedback, being
 * hit had no feedback, and the screen never told you your weapons were
 * connecting. The reference game is 90% feedback: everything flashes, pops,
 * and scatters, and that is most of why it is compulsive.
 *
 * Four things carry that here. Weapons are drawn AT WHAT THEY HIT, from the
 * simulation's own record of where damage landed, so the screen shows the
 * fight rather than an animation of the player. Anything struck flashes white
 * for four ticks. Anything killed bursts into shards that fly outwards and
 * fade. And gems glint on the floor where things died, which is the only
 * reason to walk anywhere.
 *
 * THE GRID IS NOT DECORATION either. The camera is locked to the player, so
 * without something fixed in the world behind them the player is a dot that
 * never moves while the scenery pours past.
 *
 * The particles are the one piece of state the renderer owns. They carry no
 * meaning, nothing reads them back, and they are seeded from the simulation's
 * deterministic death list, so two people watching the same run see the same
 * thing without the simulation having to know they exist.
 */

export const WEAPON_COLOR: Readonly<Record<WeaponId, string>> = {
  lightning: "#FDE047",
  knife: "#E2E8F0",
  fire: "#FB923C",
  ice: "#67E8F9",
  poison: "#A3E635",
  orb: "#C084FC",
};

const ENEMY_COLOR: Readonly<Record<EnemyKind, string>> = {
  chaff: "#7C8BA1",
  hunter: "#F87171",
  brute: "#DC2626",
};

/**
 * World units across the smaller side of the screen. Tighter than the first
 * version, which showed so much ground that a swarm of two hundred read as
 * scattered specks instead of a wall coming at you.
 */
const VIEWPORT = 430;

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  color: string;
  size: number;
}

export interface Pulse {
  weapon: WeaponId;
  tick: number;
}

const PULSE_TICKS = 8;
const PARTICLE_TICKS = 26;
export const MAX_PARTICLES = 260;

export interface Frame {
  readonly view: RunView;
  readonly pulses: readonly Pulse[];
  readonly particles: readonly Particle[];
  readonly width: number;
  readonly height: number;
  /** Pixels of screen shake, decaying, applied to everything in the world. */
  readonly shake: number;
}

/**
 * Turns this tick's deaths into shards. Called by the game loop rather than by
 * the drawing, because particles outlive the tick that made them.
 */
export function spawnDeathParticles(view: RunView, into: Particle[]): void {
  for (const d of view.deathsThisTick) {
    const many = d.kind === "brute" ? 10 : d.kind === "hunter" ? 6 : 4;
    for (let i = 0; i < many; i++) {
      // A cheap fixed fan rather than a random one: no stream to consult, and
      // the simulation stays the only thing that owns randomness.
      const a = (i / many) * 6.283185307179586;
      const speed = 55 + (i % 3) * 26;
      into.push({
        x: d.x,
        y: d.y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        born: view.tick,
        color: ENEMY_COLOR[d.kind],
        size: d.kind === "brute" ? 3.4 : 2.2,
      });
    }
  }
  if (into.length > MAX_PARTICLES) into.splice(0, into.length - MAX_PARTICLES);
}

export function stepParticles(particles: Particle[], view: RunView): void {
  let w = 0;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]!;
    if (view.tick - p.born > PARTICLE_TICKS) continue;
    p.x += p.vx / TICK_HZ;
    p.y += p.vy / TICK_HZ;
    p.vx *= 0.9;
    p.vy *= 0.9;
    particles[w++] = p;
  }
  particles.length = w;
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: Frame): void {
  const { view, width, height } = frame;
  const scale = Math.min(width, height) / VIEWPORT;
  const shakeX = frame.shake === 0 ? 0 : ((view.tick % 2) * 2 - 1) * frame.shake;
  const shakeY = frame.shake === 0 ? 0 : (((view.tick + 1) % 2) * 2 - 1) * frame.shake;
  const cx = width / 2 + shakeX;
  const cy = height / 2 + shakeY;
  const sx = (wx: number) => cx + (wx - view.x) * scale;
  const sy = (wy: number) => cy + (wy - view.y) * scale;

  ctx.fillStyle = "#070A0E";
  ctx.fillRect(0, 0, width, height);

  drawGrid(ctx, view, scale, width, height, shakeX, shakeY);

  // GEMS, under everything, glinting. The only reason to walk anywhere.
  for (const g of view.gems) {
    const gx = sx(g.x);
    const gy = sy(g.y);
    if (gx < -8 || gy < -8 || gx > width + 8 || gy > height + 8) continue;
    const r = (g.value >= 18 ? 4.6 : g.value >= 4 ? 3.4 : 2.6) * scale;
    ctx.fillStyle = g.value >= 18 ? "#FDE047" : g.value >= 4 ? "#7DD3FC" : "#34D399";
    ctx.beginPath();
    ctx.moveTo(gx, gy - r);
    ctx.lineTo(gx + r, gy);
    ctx.lineTo(gx, gy + r);
    ctx.lineTo(gx - r, gy);
    ctx.closePath();
    ctx.fill();
  }

  // ENEMIES.
  for (const e of view.enemies) {
    const ex = sx(e.x);
    const ey = sy(e.y);
    const r = enemyRadius(e.kind) * scale;
    if (ex < -r || ey < -r || ex > width + r || ey > height + r) continue;

    const flashing = view.tick < e.flashUntil;
    ctx.fillStyle = flashing ? "#FFFFFF" : ENEMY_COLOR[e.kind];
    ctx.beginPath();
    if (e.kind === "chaff") {
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
    } else if (e.kind === "hunter") {
      ctx.moveTo(ex, ey - r);
      ctx.lineTo(ex + r, ey + r * 0.8);
      ctx.lineTo(ex - r, ey + r * 0.8);
      ctx.closePath();
    } else {
      ctx.rect(ex - r, ey - r, r * 2, r * 2);
    }
    ctx.fill();

    if (view.tick < e.slowUntil) {
      ctx.strokeStyle = WEAPON_COLOR.ice;
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ex, ey, r + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // WHERE THE WEAPONS ACTUALLY LANDED. Drawn from the simulation's own record,
  // so what is on screen is the fight rather than a decoration of the player.
  for (const h of view.hitsThisTick) {
    const hx = sx(h.x);
    const hy = sy(h.y);
    const color = WEAPON_COLOR[h.weapon];
    ctx.strokeStyle = color;
    ctx.lineWidth = h.killed ? 2.5 : 1.5;
    ctx.globalAlpha = 0.95;
    if (h.weapon === "lightning") {
      // A jagged bolt from the player, so a wide weapon looks wide.
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const mx = (cx + hx) / 2;
      const my = (cy + hy) / 2;
      ctx.lineTo(mx + (hy - cy) * 0.12, my - (hx - cx) * 0.12);
      ctx.lineTo(hx, hy);
      ctx.stroke();
    } else if (h.weapon === "knife") {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(hx, hy);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(hx, hy, (h.killed ? 9 : 6) * scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // The area weapons still get a ring, so their reach is legible.
  for (const p of frame.pulses) {
    const age = view.tick - p.tick;
    if (age < 0 || age > PULSE_TICKS) continue;
    if (p.weapon === "knife" || p.weapon === "lightning") continue;
    const t = age / PULSE_TICKS;
    const spec = WEAPONS[p.weapon];
    ctx.strokeStyle = WEAPON_COLOR[p.weapon];
    ctx.globalAlpha = 0.3 * (1 - t);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, (spec.minRange + (spec.maxRange - spec.minRange) * t) * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // SHARDS from anything that died.
  for (const p of frame.particles) {
    const age = view.tick - p.born;
    if (age < 0 || age > PARTICLE_TICKS) continue;
    ctx.globalAlpha = 1 - age / PARTICLE_TICKS;
    ctx.fillStyle = p.color;
    const r = p.size * scale;
    ctx.fillRect(sx(p.x) - r / 2, sy(p.y) - r / 2, r, r);
  }
  ctx.globalAlpha = 1;

  // THE PLAYER, last, so nothing is ever drawn over them.
  ctx.fillStyle = view.hurtThisTick ? "#FCA5A5" : "#FFFFFF";
  ctx.beginPath();
  ctx.arc(cx, cy, PLAYER_RADIUS * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = view.hurtThisTick ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.3)";
  ctx.lineWidth = view.hurtThisTick ? 2.5 : 1;
  ctx.beginPath();
  ctx.arc(cx, cy, (PLAYER_RADIUS + 5) * scale, 0, Math.PI * 2);
  ctx.stroke();
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  scale: number,
  width: number,
  height: number,
  shakeX: number,
  shakeY: number,
): void {
  const step = 70 * scale;
  ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const ox = (((width / 2 + shakeX - view.x * scale) % step) + step) % step;
  const oy = (((height / 2 + shakeY - view.y * scale) % step) + step) % step;
  for (let x = ox; x < width; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = oy; y < height; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

function enemyRadius(kind: EnemyKind): number {
  return kind === "brute" ? 16 : kind === "hunter" ? 9 : 7;
}

/** Whether a weapon is currently cut, and how far through the eight seconds. */
export function cutProgress(view: RunView, id: WeaponId): number | null {
  const until = view.cutUntil[id];
  if (until <= view.tick) return null;
  return 1 - (until - view.tick) / CUT_TICKS;
}

export function secondsOf(ticks: number): { m: number; s: number } {
  const whole = Math.floor(ticks / TICK_HZ);
  return { m: Math.floor(whole / 60), s: whole % 60 };
}
