import { ENEMIES, type EnemyKind, type WeaponId } from "./content";
import { encounterAt, macAt, type Encounter } from "./encounter";
import { drawEffector, drawY } from "./cells";
import { drawPathogen } from "./render";
import { WEAPON_COLOR } from "./palette";

/**
 * THE SIX MECHANISMS, DRAWN.
 *
 * Each one is the same sequence whether it works or not, because that is the
 * rule the whole design rests on: a failure is the success interrupted at the
 * step that cannot complete. There is no `if (failed) drawSomethingElse` in
 * this file and there must never be one. What a blocked encounter gets is the
 * identical motion, stopped, plus the strain of stopping.
 *
 * WHAT EACH VERB HAS TO SAY WITHOUT WORDS:
 *
 *   engulf   this cell wrapped itself around it and dissolved it inside
 *   pore     these proteins built a ring, punched a hole, and it burst
 *   coat     these stuck all over its surface and it stopped being able to act
 *   condemn  it read a badge, found the wrong one, and shut the cell down
 *   burn     it sprayed chemicals over an area and things corroded
 *   spray    it could not swallow this, so it stuck to it and poisoned it
 *   signal   it never touched anything and more of everything else arrived
 *
 * And what each FAILURE has to say, which matters more, because failure is 55%
 * of the matrix and the whole teaching content of the game:
 *
 *   tooLarge  the arms grew around it and could not meet
 *   wall      the ring assembled perfectly and could not reach through
 *   hidden    they arrived at a membrane with nothing on it to hold
 *   noBadge   it went looking for a badge and there was no slot for one
 *   self      it recognised one of yours and turned away
 *   tooSmall  the granules left and drifted past something that never needed them
 *   inert     the chemistry washed over something with no chemistry in it
 */

const TAU = Math.PI * 2;
const BG = "#150A12";

/** Where the effector sits relative to the target, and how big it is. */
const APPROACH = 1.9;
const EFFECTOR_R = 0.44;

export function drawEncounter(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
): void {
  const e = encounterAt(weapon, kind, tick);
  if (e.verb === "pore") {
    drawPore(ctx, kind, cx, cy, r, tick);
    return;
  }
  switch (e.verb) {
    case "engulf":
      return drawEngulf(ctx, weapon, kind, cx, cy, r, tick, e);
    case "coat":
      return drawCoat(ctx, weapon, kind, cx, cy, r, tick, e);
    case "condemn":
      return drawCondemn(ctx, weapon, kind, cx, cy, r, tick, e);
    case "burn":
      return drawBurn(ctx, weapon, kind, cx, cy, r, tick, e);
    case "spray":
      return drawSpray(ctx, weapon, kind, cx, cy, r, tick, e);
    case "signal":
      return drawSignal(ctx, weapon, kind, cx, cy, r, tick, e);
  }
}

/** How far the effector has closed on the target, 0 at the start of `reach`. */
function closed(e: Encounter): number {
  const order = ["reach", "approach", "dock", "charge", "attempt", "secrete"];
  if (order.includes(e.step)) return e.t;
  return 1;
}

/** The target, drawn by the arena's own function so the wall matches the fight. */
function target(
  ctx: CanvasRenderingContext2D,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  alpha = 1,
): void {
  ctx.globalAlpha = alpha;
  drawPathogen(ctx, kind, cx, cy, r, Math.round(tick * 3), false);
  ctx.globalAlpha = 1;
}

/* ------------------------------------------------------------------ engulf */

/**
 * Phagocytosis, and the single most teachable event in immunology.
 *
 * THE FAILURE IS THE SAME FUNCTION. How far the arms can wrap is
 * `1.9 * effector / target`, so whether they meet is decided by the two radii
 * and nothing else. A worm is not a special case with a scripted refusal; it
 * is a number that does not clear a threshold, and the picture of the arms
 * stopping short IS the reason the matrix says what it says.
 */
function drawEngulf(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  const er = r * EFFECTOR_R;
  const phiMax = Math.min(2.4, (1.9 * er) / r);
  const grow =
    e.step === "embrace" ? e.t : e.step === "reach" ? 0 : e.stalled ? 1 : 1;
  const phi = phiMax * grow;
  const meets = !e.stalled && (e.step === "close" || e.step === "digest");
  const eaten = e.step === "digest" ? e.t : 0;

  // The effector comes in from the left and stops at the surface.
  const d = r * (APPROACH - (APPROACH - 1.05) * closed(e));
  const ex = cx - d;

  target(ctx, kind, cx, cy, r * (1 - eaten * 0.9), tick, meets ? 0.5 : 1);

  // The envelope: a membrane that bulges towards the target and, if it can,
  // round it. Drawn as one path so it reads as a cell changing shape.
  ctx.fillStyle = WEAPON_COLOR[weapon];
  ctx.globalAlpha = 0.28;
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * TAU;
    const off = Math.abs(((a + Math.PI) % TAU) - Math.PI);
    let rad = er;
    if (off < phi && phi > 0.01) {
      const s = 1 - off / phi;
      rad = er + (d + r * 1.08 - er) * (s * s * (3 - 2 * s));
    }
    const px = ex + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = WEAPON_COLOR[weapon];
  ctx.lineWidth = Math.max(1, er * 0.14);
  ctx.stroke();

  drawEffector(ctx, weapon, ex, cy, er, tick, { firing: e.step !== "reach", angle: 0 });

  if (e.stalled && e.blocker === "tooLarge") {
    // THE GAP THAT IS THE WHOLE MESSAGE. The arm tips are marked so the eye
    // goes to the distance between them rather than to the cell.
    const tipY = cy + Math.sin(phi) * (d + r);
    ctx.strokeStyle = "#94A3B8";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.2, cy - (tipY - cy));
    ctx.lineTo(cx + r * 0.2, tipY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (e.stalled && e.blocker === "self") {
    drawSelfBadge(ctx, cx, cy, r, tick);
  }

  if (e.step === "digest" && e.kills) {
    // Lysosomes arriving, which is what actually kills the thing inside.
    ctx.fillStyle = "#0F172A";
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU + tick / 9;
      ctx.beginPath();
      ctx.arc(ex + Math.cos(a) * er * 0.4, cy + Math.sin(a) * er * 0.4, er * 0.16, 0, TAU);
      ctx.fill();
    }
  }

  if (e.step === "digest" && !e.kills) {
    // SWALLOWED, NOT KILLED. It sits inside, intact, and nothing happens: no
    // lysosome arrives and the outline never shrinks. A distinct third state
    // and a different lesson from "too big".
    ctx.strokeStyle = "#94A3B8";
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(ex, cy, er * 0.62, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/* -------------------------------------------------------------------- pore */

function drawPore(
  ctx: CanvasRenderingContext2D,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
): void {
  const m = macAt(tick, kind);
  const colour = WEAPON_COLOR.complement;
  const spec = ENEMIES[kind];
  const swollen = r * (1 + m.swell);
  const gone = m.stage === "lyse" && m.penetrates ? Math.max(0, (m.t - 0.62) / 0.38) : 0;

  ctx.save();
  ctx.globalAlpha = 1 - gone;
  drawPathogen(ctx, kind, cx, cy, swollen, Math.round(tick * 3), false);

  if (m.stage === "insert" || m.stage === "stall") {
    // The wall, lit where the pore is working on it. On the thick one this is
    // the moment the whole screen exists for: the ring rests ON the bright
    // band and the dark interior below it is never touched.
    const heat = m.stage === "stall" ? Math.max(0, 1 - m.t * 1.4) : m.t;
    ctx.strokeStyle = "#FFFFFF";
    ctx.globalAlpha = (1 - gone) * 0.9 * heat;
    ctx.lineWidth = Math.max(2, swollen * spec.wall);
    ctx.beginPath();
    ctx.arc(cx, cy, swollen * (1 - spec.wall / 2), -0.8, 0.8);
    ctx.stroke();
    ctx.globalAlpha = 1 - gone;
  }

  const n = 9;
  const ringR = swollen * 0.34;
  for (let i = 0; i < n; i++) {
    const even = (i / n) * TAU;
    const jitter = Math.sin(i * 12.9898) * 1.7;
    const a = even + jitter * m.scatter;
    const fly = m.stage === "deposit" ? 1 + (1 - m.t) * 1.6 : 1;
    const wobble = m.stage === "stall" ? Math.sin(i + m.t * 40) * 1.2 : 0;
    const lost = m.stage === "stall" && i % 4 === 0 ? m.t * 26 : 0;
    ctx.globalAlpha = (1 - gone) * (m.stage === "stall" ? Math.max(0, 1 - m.t * 0.9) : 1);
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(
      cx + Math.cos(a) * ringR * fly + wobble + lost,
      cy + Math.sin(a) * ringR * fly - lost * 0.4,
      swollen * 0.075,
      0,
      TAU,
    );
    ctx.fill();
  }
  ctx.globalAlpha = 1 - gone;

  if (m.penetrates && (m.stage === "insert" || m.stage === "lyse")) {
    // The hole, drawn as a hole. Never `destination-out`, which erases the
    // canvas beneath rather than cutting the shape.
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(cx, cy - swollen * (1 - m.depth) + swollen * 0.02, ringR * 0.55, 0, TAU);
    ctx.fill();
  }

  if (m.stage === "lyse" && m.penetrates) {
    ctx.fillStyle = "#FBCFE8";
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI / 2 + (i - 3) * 0.16;
      const dd = swollen * (0.5 + m.t * 2.4 + i * 0.05);
      ctx.globalAlpha = (1 - gone) * Math.max(0, 1 - m.t * 1.1);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * dd, cy + Math.sin(a) * dd, swollen * 0.05, 0, TAU);
      ctx.fill();
    }
  }
  ctx.restore();
}

/* -------------------------------------------------------------------- coat */

/**
 * Antibody. It binds a surface, and the failure is that there is not one.
 *
 * The blocked version aims the Y glyphs AT THE VIRIONS DRAWN INSIDE the host
 * cell, not at the cell, which is what makes the bounce legible: they are
 * reaching for something visible and stopping at a membrane in the way. The
 * virions keep drifting, undisturbed, and a dashed line from a stuck antibody
 * to one of them terminates in a gap.
 */
function drawCoat(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  target(ctx, kind, cx, cy, r, tick);
  const colour = WEAPON_COLOR[weapon];
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1.2, r * 0.035);

  const n = 7;
  const arrive = e.step === "approach" ? e.t : 1;
  const bound = e.step === "bind" ? e.t : e.step === "approach" ? 0 : 1;

  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + 0.3;
    const far = r * (2.1 - 1.05 * arrive);
    // Bound antibodies sit ON the surface; unbound ones are still incoming.
    const rest = e.stalled ? r * 1.16 : r * 1.04;
    const d = far + (rest - far) * bound;
    const wobble = e.stalled ? Math.sin(tick / 7 + i) * r * 0.03 : 0;
    // A blocked one slides off tangentially instead of seating.
    const slide = e.stalled ? Math.sin(i * 3.1) * 0.5 * e.t : 0;
    drawY(ctx, cx + Math.cos(a + slide) * (d + wobble), cy + Math.sin(a + slide) * (d + wobble), r * 0.16, a + Math.PI + slide);
  }

  if (e.stalled && e.blocker === "hidden") {
    // The membrane stiffens and brightens where each one lands on it.
    ctx.strokeStyle = "#F8FAFC";
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = Math.max(1.5, r * 0.05);
    for (let i = 0; i < n; i += 2) {
      const a = (i / n) * TAU + 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.0, a - 0.22, a + 0.22);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // AND THE POINTER THAT NAMES THE REASON: a dashed reach from a stuck
    // antibody to the virion it is reaching for, ending in a visible gap at
    // the membrane. Without it this reads as "they are stuck outside"; with
    // it, it reads as "they are stuck outside AND the target is in there".
    const va = -0.6;
    ctx.strokeStyle = "#94A3B8";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(va) * r * 1.14, cy + Math.sin(va) * r * 1.14);
    ctx.lineTo(cx + Math.cos(va) * r * 1.02, cy + Math.sin(va) * r * 1.02);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (!e.stalled && e.step === "neutralise") {
    // Covered: the spikes it used to get in are capped, and it slows.
    ctx.strokeStyle = colour;
    ctx.globalAlpha = 0.5 + 0.5 * e.t;
    ctx.lineWidth = Math.max(2, r * 0.08);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.24, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/* ----------------------------------------------------------------- condemn */

/**
 * A cytotoxic T cell or an NK cell, and the badge is the whole idea.
 *
 * Both read the surface for a marker and both kill the same way, which is
 * true: perforin and granzyme either way. What differs is what they are
 * looking for, and the failure against a free virion is that there is no slot
 * to read AT ALL, drawn as empty dashed sockets rather than as wrong ones.
 */
function drawCondemn(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  const er = r * EFFECTOR_R;
  const d = r * (APPROACH - (APPROACH - 1.15) * closed(e));
  const ex = cx - d;
  const dying = e.step === "apoptose" && e.kills ? e.t : 0;

  // Apoptosis, and it must NOT look like an explosion: it shrinks, its
  // membrane stops moving, and it separates into bodies that fade. Nothing
  // sprays, which is the visible difference from lysis and the reason a virus
  // inside it dies with it.
  target(ctx, kind, cx, cy, r * (1 - dying * 0.28), tick, 1 - dying * 0.7);

  // The badges. Filled where there is something to read, dashed and empty
  // where there is not.
  const slots = 3;
  const showBadges = e.step !== "dock" || e.t > 0.5;
  if (showBadges) {
    for (let i = 0; i < slots; i++) {
      const a = Math.PI + (i - 1) * 0.42;
      const bx = cx + Math.cos(a) * r * 1.02;
      const by = cy + Math.sin(a) * r * 1.02;
      ctx.strokeStyle = e.blocker === "noBadge" ? "#94A3B8" : WEAPON_COLOR[weapon];
      ctx.lineWidth = Math.max(1.2, r * 0.035);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.beginPath();
      if (e.blocker === "noBadge") {
        ctx.setLineDash([2, 3]);
        ctx.arc(bx, by, r * 0.06, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        ctx.fillStyle = i === 1 ? "#DB2777" : WEAPON_COLOR[weapon];
        ctx.arc(bx, by, r * 0.06, 0, TAU);
        ctx.fill();
      }
    }
  }

  if (!e.stalled && (e.step === "polarise" || e.step === "apoptose")) {
    // The synapse: a flat contact where the two membranes meet.
    ctx.strokeStyle = "#FFFFFF";
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = Math.max(1.5, r * 0.04);
    ctx.beginPath();
    ctx.moveTo(cx - r * 1.02, cy - r * 0.3);
    ctx.lineTo(cx - r * 1.02, cy + r * 0.3);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  drawEffector(ctx, weapon, ex, cy, er, tick, {
    firing: !e.stalled && (e.step === "polarise" || e.step === "apoptose"),
    failed: e.stalled,
    angle: 0,
  });

  if (dying > 0) {
    // Apoptotic bodies, drifting apart and fading.
    ctx.fillStyle = WEAPON_COLOR[weapon];
    ctx.globalAlpha = 0.5 * (1 - dying);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU + 0.4;
      const dd = r * (0.5 + dying * 0.8);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * dd, cy + Math.sin(a) * dd, r * 0.11, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

/* -------------------------------------------------------------------- burn */

function drawBurn(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  const er = r * EFFECTOR_R;
  const ex = cx - r * APPROACH;
  const pitted = !e.stalled && (e.step === "oxidise" || e.step === "dissolve");
  const gone = e.step === "dissolve" && e.kills ? e.t : 0;

  target(ctx, kind, cx, cy, r, tick, 1 - gone * 0.85);

  // The front: jittered tangential dashes rather than a smooth ring, because
  // a smooth expanding ring reads as a shockwave and this is a chemical.
  if (e.step !== "charge") {
    const spread = e.step === "release" ? e.t : 1;
    const front = (r * APPROACH + r) * spread;
    ctx.strokeStyle = WEAPON_COLOR[weapon];
    ctx.globalAlpha = 0.75 * (1 - Math.max(0, spread - 0.7) / 0.3) + 0.25;
    ctx.lineWidth = Math.max(1.2, r * 0.03);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * TAU;
      const j = Math.sin(i * 7.3 + tick / 6) * r * 0.06;
      const x = ex + Math.cos(a) * (front + j);
      const y = cy + Math.sin(a) * (front + j);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - Math.sin(a) * r * 0.09, y + Math.cos(a) * r * 0.09);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  if (pitted) {
    // Corrosion: the outline develops permanent notches. It does not explode,
    // it dissolves, which is what an oxidant does.
    ctx.fillStyle = BG;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU + 0.7;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r * 0.92, cy + Math.sin(a) * r * 0.92, r * 0.13, 0, TAU);
      ctx.fill();
    }
  }

  if (e.stalled && e.blocker === "inert") {
    // The front washes over and NOTHING happens. The absence has to be held
    // long enough to be noticed, so the target is drawn untouched and bright.
    ctx.strokeStyle = "#94A3B8";
    ctx.setLineDash([3, 5]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.3, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (e.stalled && e.blocker === "self") drawSelfBadge(ctx, cx, cy, r, tick);
  if (e.stalled && e.blocker === "tooLarge") {
    ctx.strokeStyle = "#94A3B8";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.34, -0.9, 0.9);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawEffector(ctx, weapon, ex, cy, er, tick, {
    firing: e.step !== "charge",
    failed: e.stalled,
    angle: 0,
  });
}

/* ------------------------------------------------------------------- spray */

/**
 * An eosinophil, and the first beat is a REFUSAL.
 *
 * It starts to engulf, stops almost immediately and springs back. That one
 * shared beat is what makes the rest mean anything: this thing cannot be
 * eaten, so it is stuck to and poisoned from outside instead. Against
 * something small the same sequence runs and the granules simply drift past,
 * which is a sledgehammer missing a walnut and reads as one.
 */
function drawSpray(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  const er = r * EFFECTOR_R;
  const recoil = e.step === "attempt" ? Math.sin(Math.min(1, e.t * 1.4) * Math.PI) * r * 0.22 : 0;
  const ex = cx - r * (APPROACH - 0.55) - recoil;
  const dead = e.step === "necrose" && e.kills ? e.t : 0;

  target(ctx, kind, cx, cy, r, tick, 1 - dead * 0.4);

  if (e.step === "attempt") {
    // The refusal: two short arms that start and give up.
    ctx.strokeStyle = WEAPON_COLOR[weapon];
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = Math.max(1.4, er * 0.2);
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(ex, cy, er * 1.25, side * 0.3 - 0.35, side * 0.3 + 0.35);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  if (!e.stalled && e.step !== "attempt") {
    // Tethered by antibody: the connectors that make this ADCC rather than
    // spitting at something and hoping.
    ctx.strokeStyle = WEAPON_COLOR.antibody;
    ctx.lineWidth = Math.max(1, r * 0.028);
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(ex + er * 0.8, cy + side * er * 0.4);
      ctx.lineTo(cx - r * 0.95, cy + side * r * 0.3);
      ctx.stroke();
    }
  }

  if (e.step === "degranulate" || e.step === "necrose") {
    const out = e.step === "degranulate" ? e.t : 1;
    ctx.fillStyle = WEAPON_COLOR[weapon];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU;
      // Landing on the surface when it works; drifting past when it does not.
      const land = e.stalled ? r * (1.5 + out * 1.4) : r * (1.0 + 0.02 * Math.sin(i));
      const from = ex + Math.cos(a) * er * 0.6;
      const fy = cy + Math.sin(a) * er * 0.6;
      const tx = e.stalled ? cx + Math.cos(a) * land : cx + Math.cos(a + Math.PI) * land;
      const ty = e.stalled ? cy + Math.sin(a) * land : cy + Math.sin(a + Math.PI) * land;
      ctx.globalAlpha = e.stalled ? Math.max(0, 1 - out) : 1;
      ctx.beginPath();
      ctx.arc(from + (tx - from) * out, fy + (ty - fy) * out, r * 0.055, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  if (dead > 0) {
    // It does not vanish, it goes limp: the outline ragged and the motion
    // decaying, because a worm is a body and bodies do not pop.
    ctx.strokeStyle = "#7C2D12";
    ctx.lineWidth = Math.max(1.5, r * 0.05);
    ctx.beginPath();
    for (let i = 0; i <= 10; i++) {
      const a = (i / 10) * Math.PI - Math.PI / 2;
      const j = Math.sin(i * 3.7) * r * 0.07 * dead;
      const px = cx + Math.cos(a) * (r * 1.02 + j);
      const py = cy + Math.sin(a) * (r * 1.02 + j);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  if (e.stalled && e.blocker === "self") drawSelfBadge(ctx, cx, cy, r, tick);

  drawEffector(ctx, weapon, ex, cy, er, tick, {
    firing: e.step === "degranulate",
    failed: e.stalled,
    angle: 0,
  });
}

/* ------------------------------------------------------------------ signal */

/**
 * Cytokines. The mechanism is RECEPTION, not emission.
 *
 * The teaching risk is that "kills nothing" reads as "does nothing", so what
 * is animated is the listeners: discrete molecules leave, dock onto other
 * effectors, and those brighten and speed up. Nothing here ever touches the
 * pathogen, which is the point and is why its column on the meter is empty.
 */
function drawSignal(
  ctx: CanvasRenderingContext2D,
  weapon: WeaponId,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
  e: Encounter,
): void {
  const er = r * EFFECTOR_R;
  const ex = cx - r * APPROACH;
  target(ctx, kind, cx, cy, r, tick, 1);

  const listeners: [number, number][] = [
    [ex + r * 0.2, cy - r * 1.1],
    [ex - r * 0.5, cy + r * 1.05],
  ];
  const answered = e.step === "answer" ? e.t : 0;
  for (const [lx, ly] of listeners) {
    drawEffector(ctx, "neutrophil", lx, ly, er * 0.85, tick, { firing: answered > 0.2, angle: 0 });
    if (answered > 0) {
      ctx.strokeStyle = "#A5B4FC";
      ctx.globalAlpha = 0.8 * answered;
      ctx.lineWidth = Math.max(1.2, er * 0.1);
      ctx.beginPath();
      ctx.arc(lx, ly, er * 1.15, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Discrete molecules, not a ring: a ring reads as a shockwave and therefore
  // as damage, and this does no damage to anything.
  if (e.step !== "secrete" || e.t > 0.3) {
    const spread = e.step === "diffuse" ? e.t : e.step === "secrete" ? 0 : 1;
    ctx.fillStyle = WEAPON_COLOR[weapon];
    for (let i = 0; i < 10; i++) {
      const target2 = listeners[i % 2]!;
      const px = ex + (target2[0] - ex) * spread + Math.cos(i * 2.1) * r * 0.18;
      const py = cy + (target2[1] - cy) * spread + Math.sin(i * 2.1) * r * 0.18;
      ctx.globalAlpha = spread >= 1 ? 0 : 0.9;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.045, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  drawEffector(ctx, weapon, ex, cy, er, tick, { firing: e.step === "secrete", angle: 0 });
}

/* ------------------------------------------------------------------ shared */

/** The marker that says "this one is yours", for every friendly-fire refusal. */
function drawSelfBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  tick: number,
): void {
  ctx.strokeStyle = "#7DD3FC";
  ctx.globalAlpha = 0.75 + Math.sin(tick / 10) * 0.2;
  ctx.lineWidth = Math.max(1.4, r * 0.04);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + 0.4;
    const bx = cx + Math.cos(a) * r * 1.05;
    const by = cy + Math.sin(a) * r * 1.05;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.92, cy + Math.sin(a) * r * 0.92);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx, by, r * 0.055, 0, TAU);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
