import {
  CUT_TICKS,
  ENEMIES,
  PLAYER_RADIUS,
  TICK_HZ,
  WEAPONS,
  type EnemyKind,
  type WeaponId,
} from "./content";
import type { RunView } from "./sim";

/**
 * Drawing a tick, as a white blood cell fighting its way through an infection.
 *
 * THE SUBJECT IS THE POINT, not decoration on top of one. A neutrophil against
 * bacteria, viruses and something antibiotics have stopped touching is a scene
 * anybody recognises in a second, and it puts the game's actual question,
 * which of these is doing the work, in the one setting where a reader of this
 * app has met it before. The previous version drew coloured dots fighting
 * other coloured dots, which is legible to nobody.
 *
 * WEAPONS ARE ON SCREEN AT ALL TIMES, which is the other thing that was
 * missing. Before, a weapon existed only as a flash at the instant it hit, so
 * a player could not see what they had, could not see it improve, and had no
 * picture in their head to attach the meter's numbers to. Now the antibodies
 * orbit, the killer T cells circle, the oxidative burst glows, and complement
 * visibly eats whatever it has attached to.
 *
 * The particles are the one piece of state the renderer owns. Nothing reads
 * them back, and they are seeded from the simulation's deterministic death
 * list, so two people watching the same run see the same thing without the
 * simulation having to know they exist.
 */

export const WEAPON_COLOR: Readonly<Record<WeaponId, string>> = {
  /** The neutrophil's own blade, which is how the manga arms them. */
  neutrophil: "#F1F5F9",
  /** The oxidative burst: bleach, essentially, at arm's length. */
  burst: "#FB923C",
  /** Complement: drills a hole and lets the pressure do the rest. */
  complement: "#A3E635",
  /** Antibodies: tag it, slow it, do almost no damage yourself. */
  antibody: "#67E8F9",
  /** A cytotoxic T cell, which only ever has one job. */
  killerT: "#C084FC",
  /** An NK cell, hunting for one of yours that stopped saying hello. */
  nk: "#FDE047",
  /** Eosinophils, named for the dye that stains them, so: rose. */
  eosinophil: "#FB7185",
  /** Cytokines: the shout that brings everyone else. */
  cytokine: "#A5B4FC",
};

/**
 * S. aureus is gold because S. aureus is gold: the name is Latin for golden,
 * after the colour of its colonies. When the fiction and the fact agree for
 * free, take it.
 */
const ENEMY_COLOR: Readonly<Record<EnemyKind, string>> = {
  coli: "#65A30D",
  aureus: "#CA8A04",
  virion: "#DB2777",
  infected: "#9333EA",
  candida: "#D6D3D1",
  worm: "#B45309",
};

/** World units across the smaller side of the screen. */
const VIEWPORT = 430;

const TAU = 6.283185307179586;

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

export function spawnDeathParticles(view: RunView, into: Particle[]): void {
  for (const d of view.deathsThisTick) {
    const many = d.kind === "worm" ? 14 : d.kind === "infected" || d.kind === "candida" ? 9 : 5;
    for (let i = 0; i < many; i++) {
      // A fixed fan rather than a random one: no stream to consult, and the
      // simulation stays the only thing that owns randomness.
      const a = (i / many) * TAU;
      const speed = 60 + (i % 3) * 30;
      into.push({
        x: d.x,
        y: d.y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        born: view.tick,
        color: ENEMY_COLOR[d.kind],
        size: d.kind === "worm" ? 3.8 : 2.4,
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

  // Plasma, not space. Warm and dark, so the cells read as pale against it.
  ctx.fillStyle = "#150A12";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, view, scale, width, height, shakeX, shakeY);

  drawAreaWeapons(ctx, view, scale, cx, cy);

  // EXPERIENCE, dropped where something died. In the fiction it is the debris
  // a cell absorbs, so it looks like a fragment rather than a jewel.
  for (const g of view.gems) {
    const gx = sx(g.x);
    const gy = sy(g.y);
    if (gx < -8 || gy < -8 || gx > width + 8 || gy > height + 8) continue;
    const r = (g.value >= 10 ? 4.8 : g.value >= 3 ? 3.6 : 2.8) * scale;
    // Fading over the last three seconds, so "now or never" is visible rather
    // than something the player finds out by arriving too late.
    const left = g.until - view.tick;
    ctx.globalAlpha = left < 3 * TICK_HZ ? Math.max(0.15, left / (3 * TICK_HZ)) : 1;
    ctx.fillStyle = g.value >= 10 ? "#FCD34D" : g.value >= 3 ? "#7DD3FC" : "#86EFAC";
    ctx.beginPath();
    ctx.moveTo(gx, gy - r);
    ctx.lineTo(gx + r * 0.8, gy);
    ctx.lineTo(gx, gy + r);
    ctx.lineTo(gx - r * 0.8, gy);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  for (const e of view.enemies) {
    const ex = sx(e.x);
    const ey = sy(e.y);
    const r = enemyRadius(e.kind) * scale;
    if (ex < -r * 2 || ey < -r * 2 || ex > width + r * 2 || ey > height + r * 2) continue;
    drawPathogen(ctx, e.kind, ex, ey, r, view.tick, view.tick < e.flashUntil);

    if (view.tick < e.slowUntil) {
      // An antibody stuck to it. The Y is the one shape everybody knows.
      ctx.strokeStyle = WEAPON_COLOR.antibody;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.95;
      drawAntibody(ctx, ex + r * 0.7, ey - r * 0.7, r * 0.9, view.tick / 9);
      ctx.globalAlpha = 1;
    }
    if (view.tick < e.poisonUntil) {
      // Complement: a hole punched in the membrane, widening.
      ctx.strokeStyle = WEAPON_COLOR.complement;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(ex, ey, r * 0.55, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // WHERE THE EFFECTORS LANDED, from the simulation's own record.
  for (const h of view.hitsThisTick) {
    const hx = sx(h.x);
    const hy = sy(h.y);
    ctx.strokeStyle = WEAPON_COLOR[h.weapon];
    ctx.globalAlpha = 0.95;

    if (h.match < 0.35) {
      /*
        THE WRONG TOOL, LANDING AND FAILING. Two short marks skidding off the
        surface, and nothing else.

        This is the most important drawing in the file. The matrix keeps a
        trickle rather than zeroing a mismatched effector precisely so the
        player can SEE it fail, because nothing happening reads as a broken
        weapon rather than as complement meeting a wall it cannot cross.
      */
      const dx = hx - cx;
      const dy = hy - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      ctx.lineWidth = 1.4 * Math.max(0.7, scale);
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(hx + nx * side * 3 * scale, hy + ny * side * 3 * scale);
        ctx.lineTo(
          hx + nx * side * 9 * scale - (dx / len) * 5 * scale,
          hy + ny * side * 9 * scale - (dy / len) * 5 * scale,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      continue;
    }

    ctx.lineWidth = (h.killed ? 2.8 : 1.6) * Math.max(0.7, scale);
    if (h.weapon === "neutrophil") {
      // A slash across the thing, not a line to it.
      const dx = hx - cx;
      const dy = hy - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      ctx.beginPath();
      ctx.moveTo(hx - nx * 10 * scale, hy - ny * 10 * scale);
      ctx.lineTo(hx + nx * 10 * scale, hy + ny * 10 * scale);
      ctx.stroke();
    } else if (h.weapon === "antibody") {
      drawAntibody(ctx, hx, hy, 7 * scale, view.tick / 7);
    } else if (h.weapon === "killerT" || h.weapon === "nk") {
      // A reach from the patrol to the cell it has condemned.
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy, 8 * scale, 0, TAU);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(hx, hy, (h.killed ? 9 : 6) * scale, 0, TAU);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  for (const p of frame.pulses) {
    const age = view.tick - p.tick;
    if (age < 0 || age > PULSE_TICKS) continue;
    if (p.weapon !== "cytokine") continue;
    const t = age / PULSE_TICKS;
    ctx.strokeStyle = WEAPON_COLOR.cytokine;
    ctx.globalAlpha = 0.22 * (1 - t);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, WEAPONS.cytokine.maxRange * t * scale, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (const p of frame.particles) {
    const age = view.tick - p.born;
    if (age < 0 || age > PARTICLE_TICKS) continue;
    ctx.globalAlpha = 1 - age / PARTICLE_TICKS;
    ctx.fillStyle = p.color;
    const r = p.size * scale;
    ctx.fillRect(sx(p.x) - r / 2, sy(p.y) - r / 2, r, r);
  }
  ctx.globalAlpha = 1;

  drawOrbitingWeapons(ctx, view, scale, cx, cy);
  drawNeutrophil(ctx, cx, cy, PLAYER_RADIUS * scale, view);
}

/** The glows and rings that sit under everything and never switch off. */
function drawAreaWeapons(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  scale: number,
  cx: number,
  cy: number,
): void {
  if (deployed(view, "burst")) {
    const r = WEAPONS.burst.maxRange * scale;
    const grad = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
    grad.addColorStop(0, "rgba(251, 146, 60, 0.20)");
    grad.addColorStop(1, "rgba(251, 146, 60, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
  }
  if (deployed(view, "antibody")) {
    ctx.strokeStyle = "rgba(103, 232, 249, 0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, WEAPONS.antibody.maxRange * scale, 0, TAU);
    ctx.stroke();
  }
}

/** Antibodies and killer T cells, circling the player, always visible. */
function drawOrbitingWeapons(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  scale: number,
  cx: number,
  cy: number,
): void {
  if (deployed(view, "antibody")) {
    const n = Math.min(6, 2 + view.levels.antibody);
    const r = WEAPONS.antibody.maxRange * 0.72 * scale;
    ctx.strokeStyle = WEAPON_COLOR.antibody;
    ctx.lineWidth = 1.7;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + view.tick / 70;
      drawAntibody(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 6.5 * scale, a);
    }
  }
  if (deployed(view, "killerT")) {
    const n = Math.min(4, 1 + Math.ceil(view.levels.killerT / 2));
    const r = ((WEAPONS.killerT.minRange + WEAPONS.killerT.maxRange) / 2) * scale;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU - view.tick / 45;
      const tx = cx + Math.cos(a) * r;
      const ty = cy + Math.sin(a) * r;
      ctx.fillStyle = WEAPON_COLOR.killerT;
      ctx.beginPath();
      ctx.arc(tx, ty, 6 * scale, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#3B0764";
      ctx.beginPath();
      ctx.arc(tx, ty, 2.4 * scale, 0, TAU);
      ctx.fill();
    }
  }
}

/** The Y everybody recognises, rotated so it does not read as a stamp. */
function drawAntibody(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
): void {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const at = (dx: number, dy: number): [number, number] => [
    x + dx * c - dy * s,
    y + dx * s + dy * c,
  ];
  const stem = at(0, size);
  const mid = at(0, 0);
  const left = at(-size * 0.8, -size * 0.8);
  const right = at(size * 0.8, -size * 0.8);
  ctx.beginPath();
  ctx.moveTo(stem[0], stem[1]);
  ctx.lineTo(mid[0], mid[1]);
  ctx.moveTo(mid[0], mid[1]);
  ctx.lineTo(left[0], left[1]);
  ctx.moveTo(mid[0], mid[1]);
  ctx.lineTo(right[0], right[1]);
  ctx.stroke();
}

/**
 * The six silhouettes.
 *
 * THE WALL IS DRAWN, and that is the single most important decision here. The
 * load-bearing fact in the whole matrix is that complement lyses a gram
 * negative and cannot lyse a gram positive, because the peptidoglycan is too
 * thick for the membrane attack complex to reach the membrane underneath. That
 * is a stain in a laboratory and a shape here: E. coli gets a hairline outline,
 * S. aureus gets a wall you can see from across the screen. The picture and the
 * mechanism are then the same picture, and no words are needed in any language.
 */
export function drawPathogen(
  ctx: CanvasRenderingContext2D,
  kind: EnemyKind,
  x: number,
  y: number,
  r: number,
  tick: number,
  flashing: boolean,
): void {
  const body = flashing ? "#FFFFFF" : ENEMY_COLOR[kind];
  ctx.fillStyle = body;
  ctx.strokeStyle = body;

  if (kind === "coli") {
    // A rod with a flagellum, and a HAIRLINE wall: thin, and complement knows.
    const wob = Math.sin(tick / 6 + x) * r * 0.3;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.3, r * 0.8, 0, 0, TAU);
    ctx.fill();
    ctx.lineWidth = Math.max(0.8, r * 0.1);
    ctx.strokeStyle = flashing ? "#FFFFFF" : "#BEF264";
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.36, r * 0.86, 0, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = body;
    ctx.lineWidth = Math.max(1, r * 0.2);
    ctx.beginPath();
    ctx.moveTo(x - r * 1.25, y);
    ctx.quadraticCurveTo(x - r * 2, y + wob, x - r * 2.7, y);
    ctx.stroke();
    return;
  }

  if (kind === "aureus") {
    // Staphylo, from the Greek for a bunch of grapes, which is how it grows.
    // And the WALL, drawn thick, because the wall is why complement fails.
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU + tick / 90;
      const bx = x + Math.cos(a) * r * 0.5;
      const by = y + Math.sin(a) * r * 0.5;
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.62, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = flashing ? "#FFFFFF" : "#FEF08A";
      ctx.lineWidth = Math.max(2, r * 0.36);
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.48, 0, TAU);
      ctx.stroke();
    }
    return;
  }

  if (kind === "virion") {
    // The spiked capsid. The one silhouette nobody has to be told.
    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, 0, TAU);
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.2);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + tick / 40;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r * 0.68, y + Math.sin(a) * r * 0.68);
      ctx.lineTo(x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r * 1.36, y + Math.sin(a) * r * 1.36, r * 0.16, 0, TAU);
      ctx.fill();
    }
    return;
  }

  if (kind === "infected") {
    // ONE OF YOUR OWN, and it has to read as one of your own or the moment
    // where killing it is the right answer lands as nothing. Same lobed
    // outline as the player, gone wrong: purple, no eyes, virions inside.
    ctx.fillStyle = flashing ? "#FFFFFF" : ENEMY_COLOR.infected;
    ctx.beginPath();
    for (let i = 0; i <= 20; i++) {
      const a = (i / 20) * TAU;
      const wob = 1 + Math.sin(a * 3 + tick / 18) * 0.09;
      const px = x + Math.cos(a) * r * wob;
      const py = y + Math.sin(a) * r * wob;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = flashing ? "#FFFFFF" : ENEMY_COLOR.virion;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU - tick / 30;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.42, r * 0.19, 0, TAU);
      ctx.fill();
    }
    return;
  }

  if (kind === "candida") {
    // A budding yeast growing a hypha. The filament is the reason a phagocyte
    // cannot simply swallow it.
    ctx.beginPath();
    ctx.ellipse(x, y, r * 0.72, r * 0.9, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r * 0.7, y - r * 0.6, r * 0.36, 0, TAU);
    ctx.fill();
    ctx.lineWidth = Math.max(2, r * 0.3);
    ctx.beginPath();
    ctx.moveTo(x - r * 0.5, y + r * 0.6);
    ctx.quadraticCurveTo(
      x - r * 1.5,
      y + r * 1.1 + Math.sin(tick / 20 + x) * r * 0.2,
      x - r * 2.1,
      y + r * 0.6,
    );
    ctx.stroke();
    return;
  }

  // A worm. Long, segmented, and far too big to be eaten by anything.
  ctx.lineWidth = Math.max(3, r * 0.85);
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    const px = x - r * 1.9 + t * r * 3.8;
    const py = y + Math.sin(t * 5 + tick / 14) * r * 0.55;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.lineCap = "butt";
  ctx.fillStyle = flashing ? "#FFFFFF" : "#FDBA74";
  ctx.beginPath();
  ctx.arc(x + r * 1.9, y + Math.sin(5 + tick / 14) * r * 0.55, r * 0.5, 0, TAU);
  ctx.fill();
}

/** The player: a neutrophil, pale and lobed, with a face. */
function drawNeutrophil(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  view: RunView,
): void {
  const hurt = view.hurtThisTick;
  ctx.fillStyle = hurt ? "#FECACA" : "#F8FAFC";
  ctx.beginPath();
  // A slightly lobed outline, so it reads as a cell rather than a ball.
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * TAU;
    const wob = 1 + Math.sin(a * 3 + view.tick / 22) * 0.07;
    const px = cx + Math.cos(a) * r * 1.35 * wob;
    const py = cy + Math.sin(a) * r * 1.35 * wob;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // The multi-lobed nucleus, which is what makes a neutrophil one.
  ctx.fillStyle = hurt ? "#F87171" : "#C7D2FE";
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU + view.tick / 90;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r * 0.4, cy + Math.sin(a) * r * 0.4, r * 0.42, 0, TAU);
    ctx.fill();
  }

  // Eyes. The manga's whole trick is that these are people.
  ctx.fillStyle = "#0F172A";
  ctx.beginPath();
  ctx.arc(cx - r * 0.42, cy - r * 0.12, r * 0.19, 0, TAU);
  ctx.arc(cx + r * 0.42, cy - r * 0.12, r * 0.19, 0, TAU);
  ctx.fill();
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
  ctx.strokeStyle = "rgba(248, 113, 113, 0.07)";
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
  return ENEMIES[kind].radius;
}

/**
 * On screen right now: deployed for this wave, and not switched off.
 *
 * Both halves matter. An effector left behind at the briefing must be absent
 * rather than dimmed, because the loadout is the decision the whole wave turns
 * on and a player has to see what they brought.
 */
function deployed(view: RunView, id: WeaponId): boolean {
  return view.active.includes(id) && view.cutUntil[id] <= view.tick;
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
