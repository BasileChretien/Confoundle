import type { DataViewKind, PuzzleData } from "../../puzzles/schema";
import { RateChart } from "./RateChart";

/**
 * The generic seam: dispatch on the data's `type` to the matching renderer.
 * A new data shape (e.g. type: "correlation") is added here and nowhere else —
 * existing puzzles are untouched.
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
    default:
      return null;
  }
}
