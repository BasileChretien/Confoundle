import type { TimelineData, TimelineTrack } from "../../puzzles/schema";

/**
 * Pure derivation for the timeline shape. No React, no DOM, importable by the
 * web engine and (later) by Remotion templates, so every surface shows exactly
 * the same durations. Lead-time bias lives in the gap between these two
 * measurements of the very same life:
 *
 *   survivalFromDiagnosis = diedAt - detectedAt   (what survival statistics count)
 *   lifeFromOnset         = diedAt - onsetAt      (what actually happened)
 *
 * Move `detectedAt` earlier and the first number grows while the second does
 * not budge. That is the whole trick, computed rather than asserted.
 */

export interface TrackDurations {
  trackId: string;
  survivalFromDiagnosis: number;
  lifeFromOnset: number;
  diedAt: number;
}

export function trackDurations(track: TimelineTrack): TrackDurations {
  return {
    trackId: track.id,
    survivalFromDiagnosis: track.diedAt - track.detectedAt,
    lifeFromOnset: track.diedAt - track.onsetAt,
    diedAt: track.diedAt,
  };
}

export function timelineDurations(data: TimelineData): TrackDurations[] {
  return data.tracks.map(trackDurations);
}

/** True when every track ends at the same instant: nobody lived any longer. */
export function deathsAligned(data: TimelineData): boolean {
  const [first, ...rest] = data.tracks;
  return first != null && rest.every((t) => t.diedAt === first.diedAt);
}

/** The longest survival-from-diagnosis minus the shortest: the apparent gain. */
export function leadTimeSpread(data: TimelineData): number {
  const durations = timelineDurations(data).map((d) => d.survivalFromDiagnosis);
  if (durations.length === 0) return 0;
  return Math.max(...durations) - Math.min(...durations);
}

/** Format a duration for display, dropping a trailing ".0". */
export function formatDuration(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
