/**
 * Presentation-only group colors (kept out of rates.ts so the pure logic stays
 * render-agnostic). Colors are assigned by a group's index in data.groups and
 * stay constant across the aggregate and stratified views, so the eye can track
 * the same group as the bars regroup during the reveal.
 *
 * The teal/rust pair is validated for colorblind separation, chroma, and
 * contrast on the paper surface (dataviz palette validator). Neither reads as
 * "right" or "wrong" before the reveal — the gold winner marker carries that.
 */
export const GROUP_PALETTE = [
  "#0E8C7A", // teal   — group A / brand
  "#BE4A2F", // rust   — group B
  "#3E5C79", // slate  — future
  "#7A3B69", // plum   — future
  "#5B6B2E", // olive  — future
] as const;

/** The "lurking variable" accent — marks the winner and the confounder. */
export const WINNER_GOLD = "#9A6B12";

export function colorFor(groupIndex: number): string {
  return GROUP_PALETTE[groupIndex % GROUP_PALETTE.length];
}

/**
 * Ordinal ramp for strata (case-mix bars): light sand → dark, so an ordered
 * lurking variable reads low→high / easy→hard. Warm neutrals, kept clearly
 * distinct from the teal/rust group colors.
 */
const STRATUM_LIGHT = [0xe0, 0xcf, 0xa6];
const STRATUM_DARK = [0x4a, 0x42, 0x36];

export function stratumColor(index: number, count: number): string {
  const t = count <= 1 ? 0 : index / (count - 1);
  const c = STRATUM_LIGHT.map((l, i) => Math.round(l + (STRATUM_DARK[i] - l) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

/** Whether a stratum segment is dark enough to need light text on top. */
export function stratumIsDark(index: number, count: number): boolean {
  const t = count <= 1 ? 0 : index / (count - 1);
  return t > 0.45;
}
