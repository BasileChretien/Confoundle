import type {
  DataView,
  DataViewKind,
  LocalizedText,
  PuzzleData,
} from "../../puzzles/schema";
import { RateChart } from "./RateChart";
import { FrequencyView } from "./FrequencyView";
import { CausalView } from "./CausalView";
import { SurvivorshipView } from "./SurvivorshipView";
import { TimelineView } from "./TimelineView";
import { RiskView } from "./RiskView";
import { AgreementView } from "./AgreementView";
import { RegressionView } from "./RegressionView";
import { InteractionView } from "./InteractionView";
import { EffectView } from "./EffectView";

/**
 * The generic seam: dispatch on the data's `type` to the matching renderer.
 * A new data shape is added here and nowhere else, existing puzzles untouched.
 */
export function DataViewRenderer({
  data,
  view,
  animate,
  highlightWinner,
}: {
  data: PuzzleData;
  view: DataView;
  animate: boolean;
  highlightWinner?: boolean;
}) {
  switch (data.type) {
    case "rates":
      // Only the rates chart can draw a slice of its data so far, so it takes
      // the whole view; the others need nothing but the kind.
      return (
        <RateChart
          data={data}
          view={view}
          animate={animate}
          highlightWinner={highlightWinner}
        />
      );
    case "frequencies":
      return <FrequencyView data={data} view={view.kind} animate={animate} />;
    case "causal":
      return <CausalView data={data} view={view.kind} animate={animate} />;
    case "survivorship":
      return <SurvivorshipView data={data} view={view.kind} animate={animate} />;
    case "timeline":
      return <TimelineView data={data} view={view.kind} animate={animate} />;
    case "risk":
      return <RiskView data={data} view={view.kind} animate={animate} />;
    case "agreement":
      // Only two of the view kinds mean anything to this shape; anything else
      // is an authoring mistake and should draw nothing rather than guess.
      return view.kind === "invented" || view.kind === "agreement" ? (
        <AgreementView data={data} kind={view.kind} />
      ) : null;
    case "regression":
      return view.kind === "extremes" || view.kind === "reversion" ? (
        <RegressionView data={data} kind={view.kind} />
      ) : null;
    case "interaction":
      return view.kind === "crude" || view.kind === "bystratum" ? (
        <InteractionView data={data} kind={view.kind} />
      ) : null;
    case "effect":
      return view.kind === "significance" || view.kind === "magnitude" ? (
        <EffectView data={data} kind={view.kind} />
      ) : null;
    default:
      return null;
  }
}

/** Figure title (left of the figcaption), per data type. */
export function dataTitle(data: PuzzleData): LocalizedText {
  return data.type === "rates" ? data.metricLabel : data.label;
}

/**
 * A stable identity for a view, so React can tell two beats apart even when
 * they share a kind and differ only in which slice of the data they draw.
 */
export function viewKey(view: DataView): string {
  const groups = view.groupIds?.join(",") ?? "";
  const strata = view.strataIds?.join(",") ?? "";
  return `${view.kind}|${groups}|${strata}`;
}

/** Scope tag (right of the figcaption), per view kind. A view may override it
 * with its own `caption` when the generic word is too vague. */
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
    case "trend":
      return "Observed";
    case "cause":
      return "Explained";
    case "damage":
      return "Survivors";
    case "armor":
      return "The full picture";
    case "survival":
      return "From diagnosis";
    case "lifespan":
      return "The whole life";
    case "relative":
      return "Compared to the risk";
    case "absolute":
      return "Compared to the people";
    case "counted":
      return "As the study counted it";
    case "immortal":
      return "Time nobody could die in";
    case "invented":
      return "What they said afterwards";
    case "agreement":
      return "Against what they said before";
    case "extremes":
      return "Where they started";
    case "reversion":
      return "Where they landed";
    case "crude":
      return "As one number";
    case "bystratum":
      return "Split by the third factor";
    case "significance":
      return "Against no difference";
    case "magnitude":
      return "Against what it should fix";
    default:
      return "";
  }
}
