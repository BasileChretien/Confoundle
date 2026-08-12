/**
 * Presentation-only group colors (kept out of rates.ts so the pure logic stays
 * render-agnostic). Colors are assigned by a group's index in data.groups and
 * stay constant across the aggregate and stratified views, so the eye can track
 * the same group as the bars regroup during the reveal.
 *
 * The teal/rust pair is validated for colorblind separation, chroma, and
 * contrast on the paper surface (dataviz palette validator). Neither reads as
 * "right" or "wrong" before the reveal, the gold winner marker carries that.
 */
export const GROUP_PALETTE = [
  "#0E8C7A", // teal, group A / brand
  "#BE4A2F", // rust, group B
  "#3E5C79", // slate, future
  "#7A3B69", // plum, future
  "#5B6B2E", // olive, future
] as const;

/** The "lurking variable" accent, marks the winner and the confounder. */
export const WINNER_GOLD = "#9A6B12";

export function colorFor(groupIndex: number): string {
  return GROUP_PALETTE[groupIndex % GROUP_PALETTE.length];
}

/**
 * THE ONE SEAM EVERY SLICE-DRAWING FIGURE MUST COLOUR THROUGH, and the reason
 * it exists is a bug that shipped.
 *
 * A shape whose beats differ by how many series are on screen hands its
 * renderer a RESTRICTED copy of the data: `restrictSeries`, `restrictPublished`
 * and the rest filter the very list the renderer then maps over. Colouring by
 * the index of that map is the obvious thing to write and it is wrong, because
 * the index is a position in the list a beat happens to DRAW rather than in the
 * list the data file DECLARES. A setup that shows only the second-declared item
 * gives it slot 0; the reveal gives the same item slot 1 and hands slot 0 to
 * the item that just arrived. So the line the reader was tracking changes
 * colour at the exact moment a second line appears wearing its old one, which
 * is the precise opposite of the promise the setup and the reveal make: that
 * they are two views of the SAME data. `reporting-rate-violent-crime` shipped
 * that way, its police line teal at the setup and rust at the reveal, and
 * nothing failed, because the legend recoloured in step with the plot and the
 * figure stayed internally consistent while telling the reader the wrong story.
 *
 * Hence: build the lookup from the UNRESTRICTED list once, then colour by id
 * rather than by loop index. A renderer given only the restricted copy has no
 * declared list to build it from, so the fix is a required prop and forgetting
 * it is a type error rather than a silent recolour.
 */
export function declaredSlot(
  declared: readonly { id: string }[],
): (id: string) => number {
  const slot = new Map(declared.map((d, i) => [d.id, i]));
  // Every drawn id is a member of the declared list, since the drawn list is a
  // filter of it, so a miss means a caller passed the restricted list by
  // mistake. Fall back to the first slot: a wrong colour is recoverable, and
  // `colorFor(-1)` is undefined and would paint nothing at all.
  return (id) => slot.get(id) ?? 0;
}

/**
 * The usual form of the above: one colour per item. Reach for `declaredSlot`
 * only where a figure spends more than one palette entry per item, the way
 * `salience` gives each comparison a pair.
 */
export function declaredColors(
  declared: readonly { id: string }[],
): (id: string) => string {
  const slotOf = declaredSlot(declared);
  return (id) => colorFor(slotOf(id));
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
