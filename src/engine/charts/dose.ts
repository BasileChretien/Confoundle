import type { DoseData, DoseStep } from "../../puzzles/schema";

/**
 * Pure derivation for the dose shape. No React, no DOM, so the web engine and
 * any future Remotion template read the same numbers.
 *
 * The load-bearing function here is `plotX`. Points are placed in proportion to
 * the DOSE, never to their index in the array. Doses of 0, 1, 9, 18 and 27
 * arrive evenly spaced in the data and are wildly uneven in reality, so spacing
 * them by index would stretch the 0-to-1 step to the same width as the 9-to-27
 * step and make a front-loaded curve look like a straight line. That is exactly
 * the distortion the misleading-axis puzzle teaches, and this deck should not
 * commit it while explaining it.
 */

export interface DosePoint {
  step: DoseStep;
  /** 0..1 across the dose range, proportional to the dose itself. */
  x: number;
  /** 0..1 up the outcome scale. */
  y: number;
}

export function plotX(dose: number, data: DoseData): number {
  const max = data.steps[data.steps.length - 1].dose;
  const min = data.steps[0].dose;
  return max === min ? 0 : (dose - min) / (max - min);
}

export function plotY(mean: number, data: DoseData): number {
  const span = data.scaleMax - data.scaleMin;
  return span === 0 ? 0 : (mean - data.scaleMin) / span;
}

export function points(data: DoseData): DosePoint[] {
  return data.steps.map((step) => ({
    step,
    x: plotX(step.dose, data),
    y: plotY(step.mean, data),
  }));
}

/**
 * A view can ask for part of the data (see `DataView.groupIds`). The setup shows
 * only the two ends, which is what makes the reveal the middle. Immutable: the
 * authored data is never touched.
 */
export function restrictDose(
  data: DoseData,
  filter?: { groupIds?: string[] },
): DoseData {
  const want = filter?.groupIds;
  if (!want) return data;
  return { ...data, steps: data.steps.filter((s) => want.includes(s.id)) };
}

/** The whole climb, from the zero-dose baseline to the largest dose. */
export function totalGain(data: DoseData): number {
  const first = data.steps[0];
  const last = data.steps[data.steps.length - 1];
  return last.mean - first.mean;
}

/** What the single first dose adds, on its own. */
export function firstStepGain(data: DoseData): number {
  return data.steps[1].mean - data.steps[0].mean;
}

/**
 * The share of the whole climb bought by the very first dose, 0..1. This is the
 * number the lesson turns on, so it is derived here rather than authored, and
 * can never drift from the means it comes from.
 */
export function firstStepShare(data: DoseData): number {
  const total = totalGain(data);
  return total === 0 ? 0 : firstStepGain(data) / total;
}

/** How many further doses the rest of the climb is spread over. */
export function remainingDoses(data: DoseData): number {
  const last = data.steps[data.steps.length - 1];
  return last.dose - data.steps[1].dose;
}

export function formatMean(mean: number): string {
  return mean.toFixed(2);
}

export function formatShare(share: number): string {
  return `${Math.round(share * 100)}%`;
}
