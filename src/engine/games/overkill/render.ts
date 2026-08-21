import { ENEMY_COLOR, WEAPON_COLOR } from "./palette";
import { drawEffector, drawY } from "./cells";
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
      drawY(ctx, ex + r * 0.7, ey - r * 0.7, r * 0.9, view.tick / 9);
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
        THE WRONG TOOL, LANDING AND FAILING, AND SAYING WHICH TOOL.

        This is the most important drawing in the file, and the first version
        of it was two hairline skid marks that named nothing. A player saw a
        scratch, could not tell which of their three effectors had made it,
        and had no way to connect it to the choice they made at the briefing.
        The matrix keeps a trickle rather than zeroing a mismatched effector
        precisely so this moment is VISIBLE, and then it was drawn invisibly.

        So the effector itself is drawn at the point of failure, greyed out and
        struck through. Same drawing as the one in your squad and the one on
        the card you picked, so the three are unmistakably the same thing: this
        is the cell you chose, this is it arriving, this is it not working.
      */
      const dx = hx - cx;
      const dy = hy - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const g = 7 * Math.max(0.7, scale);
      drawEffector(ctx, h.weapon, hx, hy, g, view.tick, {
        failed: true,
        angle: Math.atan2(dy, dx),
      });
      // Struck through, which is the one mark that reads as "no" without a
      // word in it, and the one thing on screen drawn in flat grey.
      ctx.strokeStyle = "#94A3B8";
      ctx.lineWidth = 1.8 * Math.max(0.7, scale);
      ctx.beginPath();
      ctx.moveTo(hx - g * 0.9, hy - g * 0.9);
      ctx.lineTo(hx + g * 0.9, hy + g * 0.9);
      ctx.stroke();
      // And a skid, so it reads as having arrived rather than as having been
      // placed: the effector reached the pathogen and slid off it.
      const nx = -dy / len;
      const ny = dx / len;
      ctx.lineWidth = 1.4 * Math.max(0.7, scale);
      ctx.globalAlpha = 0.7;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(hx + nx * side * g * 1.1, hy + ny * side * g * 1.1);
        ctx.lineTo(
          hx + nx * side * g * 1.9 - (dx / len) * g,
          hy + ny * side * g * 1.9 - (dy / len) * g,
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
      drawY(ctx, hx, hy, 7 * scale, view.tick / 7);
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

  drawOverload(ctx, view, width, height);
  drawSquad(ctx, view, scale, cx, cy);
  drawNeutrophil(ctx, cx, cy, PLAYER_RADIUS * scale, view);
}

/**
 * How far each deployed effector reaches, as a faint ring on the floor.
 *
 * ONE RING PER DEPLOYED EFFECTOR, read off `view.active` rather than written
 * out for two of them by hand. The old version drew a reach indicator for the
 * burst and the antibody and for nothing else, so six effectors had no way of
 * telling you they had a range at all, and a player standing outside every
 * useful radius had no way to find that out except by dying.
 */
function drawAreaWeapons(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  scale: number,
  cx: number,
  cy: number,
): void {
  for (const id of view.active) {
    if (view.cutUntil[id] > view.tick) continue;
    const spec = WEAPONS[id];
    // The recruiter reaches everywhere and hits nothing, so a reach ring for
    // it would be drawing a weapon that does not exist.
    if (spec.recruits === true) continue;
    ctx.strokeStyle = WEAPON_COLOR[id];
    ctx.globalAlpha = 0.13;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, spec.maxRange * scale, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/**
 * THE INFECTION WINNING, drawn as a stain creeping in from the edges.
 *
 * `view.overload` is health draining with NO POSITION: nothing has touched the
 * player, so there is nothing on screen for the eye to blame, and a health bar
 * falling for no visible reason is indistinguishable from a bug. A player has
 * to be able to see the cause, and the cause is that the screen is full.
 *
 * DELIBERATELY NOT A JOLT. Contact damage already owns the shake and the red
 * flash, and it means "something reached you". This means "you are not
 * clearing this", which is a state rather than an event, so it is drawn as a
 * state: it rises, it stays, and it recedes if the player gets back on top of
 * the wave. Two channels that never say the same thing.
 *
 * Reduced motion is respected by construction, since nothing here moves.
 */
function drawOverload(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  width: number,
  height: number,
): void {
  if (view.overload <= 0) return;
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.28,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.72,
  );
  grad.addColorStop(0, "rgba(120, 8, 40, 0)");
  grad.addColorStop(1, `rgba(120, 8, 40, ${(0.16 + view.overload * 0.5).toFixed(3)})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

/**
 * YOUR SQUAD: the three effectors you deployed, drawn as themselves, always
 * on screen, in the slot order you picked them.
 *
 * This replaces two abstract orbits at different radii which between them
 * covered two of eight effectors and left the other six with no
 * representation at all. The complaint that landed it was exact: you could not
 * tell what was what. You could not, because five of them were not there.
 *
 * ONE RING, EVENLY SPACED, FIXED TO THE SLOT. The radius does not encode range
 * any more, because using position to mean two things at once is how the old
 * version became unreadable: the reach rings below say range, and this ring
 * says WHO IS HERE. A slot keeps its angle for the whole wave, so the squad is
 * a thing you learn the shape of rather than a swarm you re-read every second.
 */
function drawSquad(
  ctx: CanvasRenderingContext2D,
  view: RunView,
  scale: number,
  cx: number,
  cy: number,
): void {
  const live = view.active.filter((id) => view.cutUntil[id] <= view.tick);
  if (live.length === 0) return;
  const ring = 30 * scale;
  // Aim at the nearest pathogen, so a firing cell visibly turns towards what
  // it is about to hit rather than firing into the middle distance.
  let aim = 0;
  let best = Infinity;
  for (const e of view.enemies) {
    const dx = e.x - view.x;
    const dy = e.y - view.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < best) {
      best = d2;
      aim = Math.atan2(dy, dx);
    }
  }
  for (let i = 0; i < live.length; i++) {
    const id = live[i]!;
    const a = (i / live.length) * TAU + view.tick / 260;
    const px = cx + Math.cos(a) * ring;
    const py = cy + Math.sin(a) * ring;
    const firing = view.firedThisTick.includes(id);
    drawEffector(ctx, id, px, py, 8.5 * scale, view.tick, {
      firing,
      angle: view.enemies.length === 0 ? a : aim,
    });
  }
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
