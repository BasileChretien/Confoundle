import type { SurrogateData } from "../../puzzles/schema";

/**
 * Pure derivation for the `surrogate` shape. No JSX, no formatting, so the
 * Remotion templates and the tests can reuse it.
 *
 * TWO THINGS THIS DELIBERATELY WILL NOT DO.
 *
 * It never computes a rate for a run-in stage against anything but `entered`,
 * because the stages are a partition of the people who walked in, and a
 * denominator of "those who responded" would turn the funnel into a claim about
 * efficacy that the run-in cannot support.
 *
 * And it never puts the marker response and an endpoint rate on one scale. They
 * are proportions of different populations, measured on different things, and
 * the entire lesson of this shape is that people read them as if they were
 * commensurable. Making that easy in code would be building the error in.
 */

export interface StageShare {
  id: string;
  count: number;
  /** Of everyone who entered the run-in. */
  share: number;
  qualified: boolean;
}

export interface EndpointRate {
  endpointId: string;
  armId: string;
  events: number;
  n: number;
  /** Of that arm. */
  rate: number;
}

/** The run-in funnel, as shares of everyone who entered. */
export function stageShares(data: SurrogateData): StageShare[] {
  return data.stages.map((s) => ({
    id: s.id,
    count: s.count,
    share: s.count / data.entered,
    qualified: s.qualified === true,
  }));
}

/** The single stage that qualified people for randomisation. */
export function qualifyingStage(data: SurrogateData): StageShare {
  const q = stageShares(data).find((s) => s.qualified);
  if (!q) throw new Error("no qualifying stage; the schema should have rejected this");
  return q;
}

export function endpointRates(data: SurrogateData): EndpointRate[] {
  return data.endpoints.flatMap((e) =>
    data.arms.map((a) => {
      const o = data.observations.find((x) => x.endpointId === e.id && x.armId === a.id);
      if (!o)
        throw new Error(
          `no observation for endpoint ${e.id} in arm ${a.id}; the schema should have rejected this`,
        );
      return { endpointId: e.id, armId: a.id, events: o.events, n: a.n, rate: o.events / a.n };
    }),
  );
}

export function rateOn(data: SurrogateData, endpointId: string, armId: string): number {
  const r = endpointRates(data).find(
    (x) => x.endpointId === endpointId && x.armId === armId,
  );
  if (!r) throw new Error(`no rate for ${endpointId} in ${armId}`);
  return r.rate;
}

/**
 * Treated rate divided by control rate on one endpoint. Above 1 means the arm
 * whose marker kept responding did worse, which is this shape's whole subject.
 *
 * Returns null rather than Infinity when the control arm had no events, since a
 * card must not print a ratio it cannot defend.
 */
export function riskRatioOn(data: SurrogateData, endpointId: string): number | null {
  const [treated, control] = data.arms;
  if (!treated || !control) return null;
  const c = rateOn(data, endpointId, control.id);
  if (c === 0) return null;
  return rateOn(data, endpointId, treated.id) / c;
}

/** The largest endpoint rate in the data, for a shared axis across arms. */
export function endpointAxisMax(data: SurrogateData): number {
  return Math.max(...endpointRates(data).map((r) => r.rate));
}

/**
 * Whether a beat draws the randomised outcome. The setup draws the funnel only,
 * the reveal draws the funnel AND the outcome, so the reveal is a superset by
 * construction rather than by an author remembering to make it one.
 */
export function showsOutcome(kind: "markeronly" | "andoutcome"): boolean {
  return kind === "andoutcome";
}
