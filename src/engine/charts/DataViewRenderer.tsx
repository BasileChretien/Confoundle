import type {
  DataViewKind,
  LocalizedText,
  PuzzleData,
} from "../../puzzles/schema";
import { RateChart } from "./RateChart";
import { FrequencyView } from "./FrequencyView";

/**
 * The generic seam: dispatch on the data's `type` to the matching renderer.
 * A new data shape is added here and nowhere else — existing puzzles untouched.
 */
export function DataViewRenderer({
  data,
  view,
  animate,
  highlightWinner,
}: {
  data: PuzzleData;
  view: DataViewKind;
  animate: boolean;
  highlightWinner?: boolean;
}) {
  switch (data.type) {
    case "rates":
      return (
        <RateChart
          data={data}
          view={view}
          animate={animate}
          highlightWinner={highlightWinner}
        />
      );
    case "frequencies":
      return <FrequencyView data={data} view={view} animate={animate} />;
    default:
      return null;
  }
}

/** Figure title (left of the figcaption), per data type. */
export function dataTitle(data: PuzzleData): LocalizedText {
  return data.type === "rates" ? data.metricLabel : data.label;
}

/** Scope tag (right of the figcaption), per view kind. */
export function scopeLabel(kind: DataViewKind): string {
  switch (kind) {
    case "aggregate":
      return "Overall";
    case "stratified":
      return "By subgroup";
    case "headline":
      return "The facts";
    case "breakdown":
      return "The reality";
    default:
      return "";
  }
}
