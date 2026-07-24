import type { AgreementData, AgreementGroup } from "../../puzzles/schema";

/**
 * Pure derivation for the agreement shape: how much of what people said the
 * first time survived to the second, and how much appeared out of nowhere.
 *
 * Separate from the view because the numbers are the argument. Whether a
 * difference between two groups is real misclassification or just noise turns
 * entirely on these shares, so they are computed once, here, and tested.
 *
 * Nothing is authored twice. `forgotten` is `reportedBefore - repeated`, so a
 * data file cannot state a total that contradicts its own parts.
 */

export interface AgreementRow {
  label: AgreementGroup["label"];
  short?: AgreementGroup["short"];
  n: number;
  reportedBefore: number;
  repeated: number;
  /** Reported the first time and not repeated the second. Derived. */
  forgotten: number;
  invented: number;
  /** Share of first-measurement answers that survived, 0..1. Null if none to keep. */
  repeatedShare: number | null;
  /**
   * Positive answers at the second measurement that had nothing behind them,
   * as a share of all this group's second-measurement positives. Null if none.
   */
  inventedShare: number | null;
}

export function agreementRows(data: AgreementData): AgreementRow[] {
  return data.groups.map((g) => {
    const forgotten = g.reportedBefore - g.repeated;
    const laterPositives = g.repeated + g.invented;
    return {
      label: g.label,
      short: g.short,
      n: g.n,
      reportedBefore: g.reportedBefore,
      repeated: g.repeated,
      forgotten,
      invented: g.invented,
      repeatedShare: g.reportedBefore === 0 ? null : g.repeated / g.reportedBefore,
      inventedShare: laterPositives === 0 ? null : g.invented / laterPositives,
    };
  });
}

/**
 * The largest number any bar has to represent, so every group is drawn on one
 * scale. Drawing each group to its own maximum would make two very different
 * groups look identical, which is the exact comparison this shape exists for.
 */
export function agreementScale(rows: readonly AgreementRow[]): number {
  return Math.max(1, ...rows.map((r) => Math.max(r.reportedBefore, r.invented)));
}
