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
import { EcologicalView } from "./EcologicalView";
import { FramingView } from "./FramingView";
import { DistributionView } from "./DistributionView";
import { restrictDistribution } from "./distribution";
import { DriftView } from "./DriftView";
import { restrictDrift } from "./drift";
import { RatingsView } from "./RatingsView";
import { restrictRatings } from "./ratings";
import { restrictBunching } from "./bunching";
import { BunchingView } from "./BunchingView";
import { DoseView } from "./DoseView";
import { restrictDose } from "./dose";
import { EstimationView } from "./EstimationView";
import { restrictEstimation } from "./estimation";
import { SalienceView } from "./SalienceView";
import { restrictSalience } from "./salience";
import { MagnitudeView } from "./MagnitudeView";
import { TargetView } from "./TargetView";

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
      return (
        <SurvivorshipView data={data} view={view.kind} animate={animate} />
      );
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
    case "ecological":
      return view.kind === "byplace" || view.kind === "byperson" ? (
        <EcologicalView data={data} kind={view.kind} />
      ) : null;
    case "framing":
      return view.kind === "onewording" || view.kind === "bothwordings" ? (
        <FramingView data={data} kind={view.kind} />
      ) : null;
    case "distribution":
      // Like rates, this shape can draw a slice: the setup quotes one published
      // mean and the reveal sets every other journal beside it.
      return view.kind === "average" || view.kind === "spread" ? (
        <DistributionView
          data={restrictDistribution(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "dose":
      // Also draws a slice: the setup quotes as far along the curve as it wants
      // the reader to see, and the reveal carries on to the end.
      return view.kind === "partial" || view.kind === "curve" ? (
        <DoseView
          data={restrictDose(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "estimation":
      // Another slice-drawer: the setup quotes one group's guess and the reveal
      // adds the other guess and the answer they were both aiming at.
      return view.kind === "oneguess" || view.kind === "withtruth" ? (
        <EstimationView
          data={restrictEstimation(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "salience":
      // Same again: the setup draws the split with no verdict on it, the reveal
      // keeps the identical bars and ticks the side that was actually right.
      return view.kind === "asguessed" || view.kind === "againstfact" ? (
        <SalienceView
          data={restrictSalience(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "drift":
      // Draws a slice like the others, but along time rather than across
      // groups: the setup shows the first checkpoint, which is the result as it
      // was reported, and the reveal adds what the same people looked like
      // later.
      return view.kind === "atfirst" || view.kind === "overtime" ? (
        <DriftView
          data={restrictDrift(data, {
            groupIds: view.groupIds,
            strataIds: view.strataIds,
          })}
          kind={view.kind}
        />
      ) : null;
    case "ratings":
      // Draws a slice like the rest: the setup quotes the one rating that gets
      // quoted, and the reveal puts the others on the same scale beside it.
      return view.kind === "onerating" || view.kind === "bothratings" ? (
        <RatingsView
          data={restrictRatings(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "bunching":
      // Same slicing contract as the rest: the setup draws the bins running up
      // to the line, the reveal adds the ones past it.
      return view.kind === "approaching" || view.kind === "acrossline" ? (
        <BunchingView
          data={restrictBunching(data, { groupIds: view.groupIds })}
          kind={view.kind}
        />
      ) : null;
    case "magnitude":
      // Deliberately NOT a slice-drawer. Both views draw every item; what the
      // reveal adds is the second bar. Filtering items would change the scale
      // between the beats and move the guess bars, which is the one thing this
      // shape has to keep still.
      return view.kind === "asnumbers" || view.kind === "againsttruth" ? (
        <MagnitudeView data={data} kind={view.kind} />
      ) : null;
    case "target":
      // Not a slice-drawer either: both views draw both performers and the
      // whole axis. What the reveal adds is a second cut through bars that are
      // already on screen, so nothing may change length between the beats.
      return view.kind === "oncompliance" || view.kind === "insidewindow" ? (
        <TargetView data={data} kind={view.kind} />
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
    case "byplace":
      return "Counting places";
    case "byperson":
      return "Counting people";
    case "onewording":
      return "As it was put to them";
    case "bothwordings":
      return "Both wordings";
    case "average":
      return "The average on its own";
    case "spread":
      return "Where that average sits";
    case "partial":
      return "As far as it goes";
    case "curve":
      return "The whole curve";
    case "oneguess":
      return "What one group said";
    case "withtruth":
      return "Both, against the answer";
    case "asguessed":
      return "What people picked";
    case "againstfact":
      return "Against what happens";
    case "atfirst":
      return "Measured straight away";
    case "overtime":
      return "And the same people later";
    case "onerating":
      return "One of the two ratings";
    case "bothratings":
      return "Both, on the same scale";
    case "approaching":
      return "Running up to the line";
    case "acrossline":
      return "And just past it";
    case "asnumbers":
      return "What people guessed";
    case "againsttruth":
      return "And the real sizes";
    case "oncompliance":
      return "Against the target";
    case "insidewindow":
      return "And where they finished";
    default:
      return "";
  }
}
