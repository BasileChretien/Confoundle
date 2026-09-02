import type { ShortcutData } from "../../puzzles/schema";

/**
 * Pure derivation for the shortcut shape. No React, no DOM.
 *
 * Several predictors of one thing, scored on one pooled test set, where the
 * parts of that set differ in how often the thing happens. The setup shows
 * only the predictors that were allowed to look at the evidence, and their
 * score is impressive. The reveal adds one that was not, and most of the
 * impressive score turns out to be available without looking.
 *
 * THE DERIVED QUANTITY IS A SHARE OF THE DISCRIMINATION, not a difference
 * between the scores, and the distinction is the whole reading. Two areas
 * under a curve differing by 0.07 sounds like a rounding argument. What the
 * figure is actually claiming is that of everything the good model knows
 * beyond a coin toss, most was obtainable from a label on the door, and that
 * is a ratio measured from the chance line rather than from zero.
 */

/** How far above chance a score reaches. Negative is possible and meaningful. */
export function aboveChance(data: ShortcutData, score: number): number {
  return score - data.chance;
}

export function withEvidence(data: ShortcutData): readonly ShortcutData["models"][number][] {
  return data.models.filter((m) => m.usesEvidence);
}

export function withoutEvidence(data: ShortcutData): readonly ShortcutData["models"][number][] {
  return data.models.filter((m) => !m.usesEvidence);
}

/** The strongest model of each kind, which is what the comparison is between. */
export function bestWithEvidence(data: ShortcutData): ShortcutData["models"][number] {
  return withEvidence(data).reduce((a, b) => (b.score > a.score ? b : a));
}

export function bestWithoutEvidence(data: ShortcutData): ShortcutData["models"][number] {
  return withoutEvidence(data).reduce((a, b) => (b.score > a.score ? b : a));
}

/**
 * The share of the best model's discrimination that a model denied the
 * evidence also reaches.
 *
 * Null when the model that saw the evidence is itself at or below chance,
 * where the ratio would be a division by zero or a negative fraction dressed
 * up as a percentage. A figure has nothing to say about how much of nothing
 * was a shortcut.
 */
export function shortcutShare(data: ShortcutData): number | null {
  const top = aboveChance(data, bestWithEvidence(data).score);
  if (top <= 0) return null;
  return aboveChance(data, bestWithoutEvidence(data).score) / top;
}

/**
 * How many times commoner the outcome is in the site where it is commonest
 * than where it is rarest. The reason the shortcut is worth anything.
 *
 * Null when the rarest site is at zero, where a ratio would be an infinity
 * standing in for a measurement.
 */
export function prevalenceRatio(data: ShortcutData): number | null {
  const values = data.sites.map((s) => s.prevalence);
  const low = Math.min(...values);
  return low > 0 ? Math.max(...values) / low : null;
}

/** The outcome rate over the whole pooled set, weighted by collection size. */
export function pooledPrevalence(data: ShortcutData): number {
  const n = data.sites.reduce((sum, s) => sum + s.n, 0);
  return data.sites.reduce((sum, s) => sum + (s.prevalence * s.n) / n, 0);
}

/** Every collection with the share of the pooled set it contributes. */
export function siteShares(
  data: ShortcutData,
): readonly { readonly id: string; readonly share: number }[] {
  const n = data.sites.reduce((sum, s) => sum + s.n, 0);
  return data.sites.map((s) => ({ id: s.id, share: s.n / n }));
}

/**
 * The slice each beat draws.
 *
 * NAMED `restrict*` SO THE COLOUR GUARD SEES IT, and unlike the first draft of
 * `classifier.ts` this one earns the name: the setup genuinely receives fewer
 * models than the reveal, so a renderer colouring by position in the list it
 * is handed would give the shortcut model whatever colour the real model had
 * at the setup. That is the exact drift `declaredColors` exists to stop.
 */
export function restrictShortcut(
  data: ShortcutData,
  opts: { readonly showWithoutEvidence: boolean },
): ShortcutData {
  return opts.showWithoutEvidence
    ? data
    : { ...data, models: data.models.filter((m) => m.usesEvidence) };
}
