import type { AttenuationData } from "../../puzzles/schema";

/**
 * Pure derivation for the `attenuation` shape. No JSX, no formatting, so the
 * Remotion templates and the tests can reuse it.
 *
 * ON THE NAME OF THE QUANTITY, which this module is fussy about because the
 * card is about reading published numbers carefully. What is computed here is a
 * crude cumulative RISK ratio: events divided by the number of people at risk at
 * the start of the window, one group over the other. It is NOT a rate ratio,
 * because no person-time goes into it, and it is NOT the hazard ratio a paper
 * will have published, because nothing here is adjusted for anything. A card
 * may show a published hazard ratio alongside, but it must say which is which,
 * and this module will not compute one and pretend.
 */

export interface WindowRatio {
  windowId: string;
  outcomeId: string;
  excludedYears: number;
  exposedEvents: number;
  exposedN: number;
  referenceEvents: number;
  referenceN: number;
  exposedRisk: number;
  referenceRisk: number;
  /** Crude cumulative risk ratio, exposed over reference. */
  riskRatio: number;
}

function cell(data: AttenuationData, windowId: string, groupId: string, outcomeId: string) {
  const o = data.observations.find(
    (x) => x.windowId === windowId && x.groupId === groupId && x.outcomeId === outcomeId,
  );
  if (!o)
    throw new Error(
      `no observation for ${windowId}/${groupId}/${outcomeId}; the schema should have rejected this`,
    );
  return o;
}

/** The exposed group is the first declared one. The renderer relies on this too. */
export function exposedGroup(data: AttenuationData) {
  const g = data.groups[0];
  if (!g) throw new Error("a comparison needs two groups");
  return g;
}

export function referenceGroup(data: AttenuationData) {
  const g = data.groups[1];
  if (!g) throw new Error("a comparison needs two groups");
  return g;
}

/** Every window's ratio for one outcome, in the order the windows are authored. */
export function ratiosFor(data: AttenuationData, outcomeId: string): WindowRatio[] {
  const exposed = exposedGroup(data);
  const reference = referenceGroup(data);
  return data.windows.map((w) => {
    const a = cell(data, w.id, exposed.id, outcomeId);
    const b = cell(data, w.id, reference.id, outcomeId);
    const exposedRisk = a.events / a.n;
    const referenceRisk = b.events / b.n;
    return {
      windowId: w.id,
      outcomeId,
      excludedYears: w.excludedYears,
      exposedEvents: a.events,
      exposedN: a.n,
      referenceEvents: b.events,
      referenceN: b.n,
      exposedRisk,
      referenceRisk,
      riskRatio: referenceRisk === 0 ? Number.NaN : exposedRisk / referenceRisk,
    };
  });
}

/** The outcome the setup beat draws: the first that is not the control. */
export function primaryOutcome(data: AttenuationData) {
  const o = data.outcomes.find((x) => !x.isControl);
  if (!o) throw new Error("every outcome is the control; the schema should have rejected this");
  return o;
}

export function controlOutcome(data: AttenuationData) {
  return data.outcomes.find((x) => x.isControl) ?? null;
}

/**
 * How far an outcome's ratio travelled towards 1, as a fraction of how far it
 * started from 1. Around 0 means it held still; around 1 means it collapsed.
 * This is the single number the reveal is arguing about, so it is derived once
 * here rather than recomputed by eye in prose.
 */
export function journeyTowardsOne(data: AttenuationData, outcomeId: string): number {
  const r = ratiosFor(data, outcomeId);
  const first = r[0];
  const last = r[r.length - 1];
  if (!first || !last) return 0;
  const start = Math.abs(first.riskRatio - 1);
  if (start === 0) return 0;
  return (start - Math.abs(last.riskRatio - 1)) / start;
}

/** The axis every series is drawn against, always containing 1. */
export function ratioAxis(data: AttenuationData): { min: number; max: number } {
  const all = data.outcomes.flatMap((o) => ratiosFor(data, o.id).map((r) => r.riskRatio));
  const lo = Math.min(1, ...all);
  const hi = Math.max(1, ...all);
  const pad = Math.max(0.08, (hi - lo) * 0.12);
  return { min: Math.max(0, lo - pad), max: hi + pad };
}

export function axisFraction(data: AttenuationData, ratio: number): number {
  const { min, max } = ratioAxis(data);
  if (max === min) return 0.5;
  return (ratio - min) / (max - min);
}

/** Whether a beat draws every window and the control, or only the first window. */
export function showsAllWindows(kind: "atbaseline" | "astrimmed"): boolean {
  return kind === "astrimmed";
}

/**
 * What a beat draws, so the two beats cannot drift apart. The reveal is a
 * superset by construction: it keeps the primary outcome's first window
 * untouched and adds the later windows and the control.
 */
export function visibleSeries(
  data: AttenuationData,
  kind: "atbaseline" | "astrimmed",
): { outcomeId: string; ratios: WindowRatio[] }[] {
  const all = showsAllWindows(kind);
  const outcomes = all ? data.outcomes : [primaryOutcome(data)];
  return outcomes.map((o) => {
    const ratios = ratiosFor(data, o.id);
    return { outcomeId: o.id, ratios: all ? ratios : ratios.slice(0, 1) };
  });
}
