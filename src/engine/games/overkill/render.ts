import {
  CUT_TICKS,
  DESPAWN_RADIUS,
  PLAYER_RADIUS,
  TICK_HZ,
  WEAPONS,
  type EnemyKind,
  type WeaponId,
} from "./content";
import type { RunView } from "./sim";

/**
 * Drawing a tick. Pure: hand it a context and a view and it paints, and it
 * reads nothing back out.
 *
 * THE GRID IS NOT DECORATION. The camera is locked to the player, so without
 * something fixed in the world behind them the player is a dot that never
 * moves while the scenery pours past, and holding a direction feels like
 * nothing at all. The grid is the only thing on screen that says you are
 * travelling.
 *
 * SLOWED ENEMIES ARE MARKED, and that is a deliberate choice about what the
 * game hides. It hides nothing. The world in front of the player is honest and
 * complete, and ice visibly holds things back; what misleads is the SUMMARY
 * beside it, which reports damage accurately and is the wrong quantity. A game
 * that hid the slow as well would be a game about hidden information, which is
 * a different and much cheaper lesson.
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
  chaff: "#64748B",
  hunter: "#F87171",
  brute: "#B91C1C",
};

/** World units visible across the smaller side of the screen. */
const VIEWPORT = 560;

/** A weapon that just went off, fading out. Purely visual. */
export interface Pulse {
  weapon: WeaponId;
  tick: number;
}

const PULSE_TICKS = 9;

export interface Frame {
  readonly view: RunView;
  readonly pulses: readonly Pulse[];
  readonly width: number;
  readonly height: number;
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: Frame): void {
  const { view, width, height } = frame;
  const scale = Math.min(width, height) / VIEWPORT;
  const cx = width / 2;
  const cy = height / 2;
  const sx = (wx: number) => cx + (wx - view.x) * scale;
  const sy = (wy: number) => cy + (wy - view.y) * scale;

  ctx.fillStyle = "#080C11";
  ctx.fillRect(0, 0, width, height);

  drawGrid(ctx, view, scale, width, height);

  // The edge of the world the player can see things arrive from, so the arena
  // reads as a place rather than an endless plain.
  ctx.strokeStyle = "rgba(148, 163, 184, 0.10)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, DESPAWN_RADIUS * scale, 0, Math.PI * 2);
  ctx.stroke();

  for (const p of frame.pulses) {
    const age = view.tick - p.tick;
    if (age < 0 || age > PULSE_TICKS) continue;
    const t = age / PULSE_TICKS;
    const spec = WEAPONS[p.weapon];
    ctx.strokeStyle = WEAPON_COLOR[p.weapon];
    ctx.globalAlpha = 0.42 * (1 - t);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, (spec.minRange + (spec.maxRange - spec.minRange) * t) * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (const e of view.enemies) {
    const ex = sx(e.x);
    const ey = sy(e.y);
    const r = enemyRadius(e.kind) * scale;
    if (ex < -r || ey < -r || ex > width + r || ey > height + r) continue;

    ctx.fillStyle = ENEMY_COLOR[e.kind];
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
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ex, ey, r + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // The player last, so nothing is ever drawn over them.
  ctx.fillStyle = view.hurtThisTick ? "#FCA5A5" : "#FFFFFF";
  ctx.beginPath();
  ctx.arc(cx, cy, PLAYER_RADIUS * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
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
): void {
  const step = 80 * scale;
  ctx.strokeStyle = "rgba(148, 163, 184, 0.09)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const ox = ((width / 2 - view.x * scale) % step + step) % step;
  const oy = ((height / 2 - view.y * scale) % step + step) % step;
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
