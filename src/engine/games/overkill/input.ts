import type { Dir } from "./sim";

/**
 * Turning a thumb or a keyboard into one of nine integers.
 *
 * NINE INTEGERS AND NOT A VECTOR, which is a decision about the recording
 * rather than about the feel. The input log has to replay exactly, and a
 * continuous analogue stick would mean storing a float per tick and trusting
 * it to round trip. Eight directions cost one small number per change of
 * direction, and the whole run compresses to a few thousand of them.
 */

/** Screen-space offset to one of the eight compass directions. */
export function dirFromOffset(dx: number, dy: number, deadZone = 14): Dir {
  if (dx * dx + dy * dy < deadZone * deadZone) return 0;
  // Octant by comparison rather than by angle: no trigonometry, and the
  // boundaries land exactly halfway between the eight directions.
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  // tan(22.5 degrees), the width of a pure-axis octant.
  const T = 0.41421356237309503;
  if (ay <= ax * T) return dx > 0 ? 3 : 7;
  if (ax <= ay * T) return dy > 0 ? 5 : 1;
  if (dx > 0) return dy > 0 ? 4 : 2;
  return dy > 0 ? 6 : 8;
}

const KEYS: Readonly<Record<string, readonly [number, number]>> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
  W: [0, -1],
  S: [0, 1],
  A: [-1, 0],
  D: [1, 0],
  z: [0, -1],
  q: [-1, 0],
  Z: [0, -1],
  Q: [-1, 0],
};

/** Held keys to a direction. Includes ZQSD so an AZERTY keyboard works. */
export function dirFromKeys(held: ReadonlySet<string>): Dir {
  let x = 0;
  let y = 0;
  for (const k of held) {
    const v = KEYS[k];
    if (v === undefined) continue;
    x += v[0];
    y += v[1];
  }
  if (x === 0 && y === 0) return 0;
  return dirFromOffset(x, y, 0);
}

export function isMovementKey(key: string): boolean {
  return KEYS[key] !== undefined;
}
