import type { FrequenciesData } from "../../puzzles/schema";

/**
 * Pure derivation of the natural-frequency breakdown (base-rate puzzles). No
 * React/DOM — reusable by the web engine and future Remotion templates. The
 * paradox lives in the positive predictive value: when the condition is rare,
 * false positives swamp the true ones.
 */
export interface FrequencyBreakdown {
  total: number;
  withCondition: number;
  withoutCondition: number;
  truePositive: number;
  falseNegative: number;
  falsePositive: number;
  trueNegative: number;
  allPositive: number;
  ppv: number; // P(condition | positive)
  sensitivity: number; // P(positive | condition)
  falsePositiveRate: number; // P(positive | no condition)
}

export function frequencyBreakdown(data: FrequenciesData): FrequencyBreakdown {
  const withCondition = data.withCondition;
  const withoutCondition = data.total - withCondition;
  const truePositive = data.positiveGivenCondition;
  const falseNegative = withCondition - truePositive;
  const falsePositive = data.positiveGivenNoCondition;
  const trueNegative = withoutCondition - falsePositive;
  const allPositive = truePositive + falsePositive;

  return {
    total: data.total,
    withCondition,
    withoutCondition,
    truePositive,
    falseNegative,
    falsePositive,
    trueNegative,
    allPositive,
    ppv: allPositive > 0 ? truePositive / allPositive : 0,
    sensitivity: withCondition > 0 ? truePositive / withCondition : 0,
    falsePositiveRate:
      withoutCondition > 0 ? falsePositive / withoutCondition : 0,
  };
}
