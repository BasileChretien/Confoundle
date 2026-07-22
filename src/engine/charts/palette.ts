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
