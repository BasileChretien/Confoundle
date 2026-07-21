/**
 * Presentation-only group colors (kept out of rates.ts so the pure logic stays
 * render-agnostic). Colors are assigned by a group's index in data.groups and
 * stay constant across the aggregate and stratified views, so the eye can track
 * the same group as the bars regroup during the reveal. Chosen to be visually
 * distinct without either reading as "right" or "wrong" before the reveal.
 */
export const GROUP_PALETTE = [
  "#34d399", // emerald-400
  "#818cf8", // indigo-400
  "#fbbf24", // amber-400
  "#f472b6", // pink-400
  "#22d3ee", // cyan-400
] as const;

export function colorFor(groupIndex: number): string {
  return GROUP_PALETTE[groupIndex % GROUP_PALETTE.length];
}
