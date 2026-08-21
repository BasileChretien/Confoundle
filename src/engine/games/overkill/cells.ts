import { type WeaponId } from "./content";
import { WEAPON_COLOR } from "./palette";

/**
 * THE IMMUNE SIDE, DRAWN.
 *
 * Why this file exists: the game shipped with five of its eight effectors
 * invisible. The oxidative burst was an orange gradient, complement was
 * nothing at all, and the NK cell, the eosinophil and the cytokines were not
 * drawn in any form. Two more were abstract dots orbiting at different radii.
 * A player could not name one thing on their own side of the screen, which
 * made the briefing a choice between glyphs and the reveal a change in
 * numbers. The proof was that explaining the game required a legend of eight
 * icons, and a wordless game that needs a legend is not wordless, it is
 * unreadable.
 *
 * THE FIX IS THAT EVERY DEPLOYED EFFECTOR IS A THING YOU CAN SEE, and that the
 * thing you pick in the briefing is the same drawing as the thing fighting
 * beside you a second later. One module, called by both, so they cannot drift.
 *
 * WHAT MAKES THEM TELLABLE APART IS THE NUCLEUS, which is not an arbitrary art
 * choice: it is how these cells are actually identified down a microscope. An
 * eosinophil is a bilobed nucleus and coarse bright granules. A cytotoxic T
 * cell is a small lymphocyte whose dark nucleus nearly fills it. An NK cell is
 * a LARGE GRANULAR lymphocyte, the same outline with obvious granules and a
 * kidney-shaped nucleus. A plasma cell has its nucleus shoved to one side with
 * a pale Golgi beside it. Drawing the real thing means the picture teaches
 * something before the mechanic does, and means nobody has to invent a visual
 * language and then explain it in ten languages.
 *
 * TWO OF THESE ARE NOT CELLS AND MUST NOT LOOK LIKE CELLS. Complement is
 * plasma protein that assembles into a pore; cytokines are signalling
 * molecules. Drawing either as a blob with a nucleus would be a lie the rest
 * of the game then has to work around, so they are drawn as what they are and
 * the difference is meant to be obvious at a glance.
 */

const TAU = Math.PI * 2;

export interface EffectorLook {
  /** Mid-attack: the cell leans in, the pore drills, the pulse expands. */
  readonly firing?: boolean;
  /** The wrong tool. Drained of colour, because it is about to fail. */
  readonly failed?: boolean;
  /** Which way it is facing, in radians. */
  readonly angle?: number;
}

/**
 * Draws one effector centred at (x, y) with radius r.
 *
 * `r` is in device pixels, so the caller multiplies by whatever scale it works
 * in. The briefing passes a large r and the arena a small one, and nothing
 * else differs between them.
 */
export function drawEffector(
  ctx: CanvasRenderingContext2D,
  id: WeaponId,
  x: number,
  y: number,
  r: number,
  tick: number,
  look: EffectorLook = {},
): void {
  const colour = look.failed === true ? "#64748B" : WEAPON_COLOR[id];
  const angle = look.angle ?? 0;
  const lean = look.firing === true ? 1 : 0;

  switch (id) {
    case "neutrophil":
      return drawLobed(ctx, x, y, r, tick, colour, lean, angle);
    case "eosinophil":
      return drawEosinophil(ctx, x, y, r, tick, colour, lean);
    case "nk":
      return drawNK(ctx, x, y, r, tick, colour, lean);
    case "killerT":
      return drawKillerT(ctx, x, y, r, tick, colour, lean, angle);
    case "antibody":
      return drawPlasmaCell(ctx, x, y, r, tick, colour, lean, angle);
    case "complement":
      return drawComplement(ctx, x, y, r, tick, colour, lean);
    case "burst":
      return drawBurst(ctx, x, y, r, tick, colour, lean);
    case "cytokine":
      return drawCytokine(ctx, x, y, r, tick, colour, lean);
  }
}

/** The pale cytoplasm every white cell shares, so they read as one team. */
function cytoplasm(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  wobbleAmount = 0.07,
): void {
  ctx.fillStyle = colour;
  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  for (let i = 0; i <= 22; i++) {
    const a = (i / 22) * TAU;
    const wob = 1 + Math.sin(a * 3 + tick / 22) * wobbleAmount;
    const px = x + Math.cos(a) * r * wob;
    const py = y + Math.sin(a) * r * wob;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1, r * 0.14);
  ctx.stroke();
}

/**
 * A neutrophil: POLYMORPHONUCLEAR, which is the whole name. Three to five
 * lobes strung together. The commonest white cell in blood, and the one the
 * player is, so calling more of them in is what the slot means.
 */
function drawLobed(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
  angle: number,
): void {
  cytoplasm(ctx, x, y, r, tick, colour);
  // A pseudopod when it is engulfing something, which is what it does.
  if (lean === 1) {
    ctx.fillStyle = colour;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.ellipse(
      x + Math.cos(angle) * r * 0.85,
      y + Math.sin(angle) * r * 0.85,
      r * 0.55,
      r * 0.4,
      angle,
      0,
      TAU,
    );
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = colour;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + tick / 130;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.42, r * 0.28, 0, TAU);
    ctx.fill();
  }
}

/**
 * An eosinophil: a BILOBED nucleus, two lobes like a pair of spectacles, and
 * coarse bright granules filling the cytoplasm. The most recognisable white
 * cell on a slide, and the only thing in the deck that kills a worm.
 */
function drawEosinophil(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
): void {
  cytoplasm(ctx, x, y, r, tick, colour);
  // Degranulating when it fires: that IS the kill mechanism, so the granules
  // leave the cell rather than sitting inside it.
  ctx.fillStyle = colour;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU + tick / 60;
    const spread = lean === 1 ? 1.15 + Math.sin(tick / 6) * 0.15 : 0.7;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * r * spread, y + Math.sin(a) * r * spread, r * 0.17, 0, TAU);
    ctx.fill();
  }
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1.4, r * 0.24);
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(x + side * r * 0.34, y, r * 0.3, 0, TAU);
    ctx.stroke();
  }
}

/**
 * An NK cell: a LARGE GRANULAR LYMPHOCYTE, which is what the textbooks call
 * it. Bigger than a T cell, kidney-shaped nucleus, granules you can see.
 */
function drawNK(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
): void {
  cytoplasm(ctx, x, y, r, tick, colour, 0.05);
  /*
    The kidney: a disc with a bite out of it. It also reads as looking for what
    is missing, which is exactly what this cell does.

    BUILT AS ONE PATH, NOT PUNCHED OUT WITH `destination-out`. The first
    version composited the bite, which does not cut a notch in a nucleus: it
    erases a hole through the CANVAS, taking the plasma background and anything
    already drawn underneath with it, so an NK cell in the arena would have
    shown a hole down to the page behind. It looked right in the briefing only
    because that canvas is transparent to begin with, which is the kind of
    difference between two call sites that a shared drawing is supposed to
    remove. Two arcs, the second reversed, is the same shape and composites
    with nothing.
  */
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x - r * 0.06, y, r * 0.52, 0.62, TAU - 0.62);
  ctx.arc(x + r * 0.44, y, r * 0.3, TAU - 2.3, 2.3, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = colour;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU - tick / 50;
    const d = lean === 1 ? 0.92 : 0.78;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * r * d, y + Math.sin(a) * r * d, r * 0.13, 0, TAU);
    ctx.fill();
  }
}

/**
 * A cytotoxic T cell: a SMALL lymphocyte, drawn small on purpose, whose dark
 * round nucleus nearly fills it and leaves only a rim of cytoplasm.
 *
 * When it fires it polarises: the lytic granules move to the face touching the
 * target. That is the actual mechanism, and it reads as the cell taking aim.
 */
function drawKillerT(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
  angle: number,
): void {
  cytoplasm(ctx, x, y, r * 0.86, tick, colour, 0.04);
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.62, 0, TAU);
  ctx.fill();
  if (lean === 1) {
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < 3; i++) {
      const spread = (i - 1) * 0.35;
      ctx.beginPath();
      ctx.arc(
        x + Math.cos(angle + spread) * r * 0.72,
        y + Math.sin(angle + spread) * r * 0.72,
        r * 0.11,
        0,
        TAU,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

/**
 * A plasma cell, and the antibody it is secreting.
 *
 * THE CELL IS DRAWN, NOT ONLY THE Y. Antibody used to be six Y glyphs on an
 * orbit with nothing producing them, which made the most important adaptive
 * effector in the game look like ambient decoration. Antibody comes from a
 * cell: eccentric nucleus pushed to one side, pale perinuclear Golgi, and a
 * stream of immunoglobulin leaving it.
 */
function drawPlasmaCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
  angle: number,
): void {
  cytoplasm(ctx, x, y, r, tick, colour, 0.05);
  // Nucleus shoved off centre, which is what makes a plasma cell obvious.
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x - r * 0.34, y - r * 0.16, r * 0.42, 0, TAU);
  ctx.fill();
  // The pale Golgi, where the immunoglobulin is assembled.
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(x + r * 0.28, y + r * 0.24, r * 0.26, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;
  // And the product, leaving the cell.
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1, r * 0.11);
  const n = lean === 1 ? 3 : 2;
  for (let i = 0; i < n; i++) {
    const a = angle + (i - (n - 1) / 2) * 0.5;
    const d = r * (1.25 + ((tick / 14 + i * 3) % 5) * 0.16);
    drawY(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, r * 0.3, a);
  }
}

/** The Y everybody recognises. */
export function drawY(
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
  const stem = at(-size, 0);
  const mid = at(0, 0);
  const left = at(size * 0.8, -size * 0.8);
  const right = at(size * 0.8, size * 0.8);
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
 * Complement: NOT A CELL, and it must not look like one.
 *
 * It is plasma protein that assembles on a surface into the membrane attack
 * complex, a ring of subunits that punches a hole. So it is drawn as a ring of
 * discrete subunits closing up around a hole: the exact object whose failure
 * against a thick peptidoglycan wall is the lesson of wave two.
 */
function drawComplement(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
): void {
  const subunits = 9;
  ctx.fillStyle = colour;
  const gather = lean === 1 ? 0.62 : 0.78 + Math.sin(tick / 30) * 0.05;
  for (let i = 0; i < subunits; i++) {
    const a = (i / subunits) * TAU + tick / 40;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * r * gather, y + Math.sin(a) * r * gather, r * 0.19, 0, TAU);
    ctx.fill();
  }
  // The pore itself, drawn as a hole.
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1, r * 0.1);
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.34, 0, TAU);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/**
 * The oxidative burst: also not a cell. Reactive oxygen thrown outward, so it
 * is drawn as radiating spits rather than as a soft glow. The old version was
 * a radial gradient, which reads as lighting rather than as a weapon.
 */
function drawBurst(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
): void {
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(1.2, r * 0.16);
  ctx.lineCap = "round";
  const reach = lean === 1 ? 1.25 : 0.95;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + tick / 25;
    const inner = r * 0.34;
    const outer = r * reach * (0.8 + ((i * 7 + tick / 4) % 10) * 0.02);
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * inner, y + Math.sin(a) * inner);
    ctx.lineTo(x + Math.cos(a) * outer, y + Math.sin(a) * outer);
    ctx.stroke();
  }
  ctx.lineCap = "butt";
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.2, 0, TAU);
  ctx.fill();
}

/**
 * Cytokines: signalling molecules, so concentric waves going out and nothing
 * coming back. Nothing here ever touches a pathogen, which is the point. This
 * is the effector whose entire contribution lands in somebody else's column,
 * and the drawing says so before the death screen does.
 */
function drawCytokine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  tick: number,
  colour: string,
  lean: number,
): void {
  ctx.strokeStyle = colour;
  // FIRING CHANGES THE SIZE, NOT ONLY THE RATE. It used to change only how
  // fast the rings cycled, which means that in any single frame a recruiting
  // cytokine and an idle one were the same picture. This is the one effector
  // whose EFFECT is deliberately invisible, all of it landing in somebody
  // else's column; making its ACTION invisible too leaves the player with a
  // slot that never appears to do anything at all, which is a different and
  // much worse lesson than the intended one.
  const reach = lean === 1 ? 1.5 : 0.95;
  for (let i = 0; i < 3; i++) {
    const phase = (tick / (lean === 1 ? 12 : 26) + i / 3) % 1;
    ctx.globalAlpha = (lean === 1 ? 0.9 : 0.55) * (1 - phase);
    ctx.lineWidth = Math.max(1, r * (lean === 1 ? 0.2 : 0.11));
    ctx.beginPath();
    ctx.arc(x, y, r * (0.3 + phase * reach), 0, TAU);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.22, 0, TAU);
  ctx.fill();
}
