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
import { ForestView } from "./ForestView";
import { RatingsView } from "./RatingsView";
import { restrictForest } from "./forest";
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
import { ProjectionView } from "./ProjectionView";
import { TargetView } from "./TargetView";
import { SeriesView } from "./SeriesView";
import { IntervalView } from "./IntervalView";
import { CeilingView } from "./CeilingView";
import { YieldView } from "./YieldView";
import { restrictYield } from "./yield";
import { UnseenView } from "./UnseenView";
import { DeliveredView } from "./DeliveredView";
import { CrossedView } from "./CrossedView";
import { PublishedView } from "./PublishedView";
import { SurrogateView } from "./SurrogateView";
import { AttenuationView } from "./AttenuationView";
import { ConditionalView } from "./ConditionalView";
import { RatersView } from "./RatersView";
import { restrictConditional } from "./conditional";
import { restrictRaters } from "./raters";
import { restrictPublished } from "./published";
import { restrictCrossed } from "./crossed";
import { restrictSeries } from "./series";

/**
 * The generic seam: dispatch on the data's `type` to the matching renderer.
 * A new data shape is added here and nowhere else, existing puzzles untouched.
 *
 * A SLICE-DRAWING SHAPE GETS BOTH COPIES: the restricted one it draws, and
 * `full` for anything that must not move between the beats. Scale was the first
 * such thing (`SeriesView` has taken `full` for that since it was written) and
 * COLOUR is the second, because `restrict*` filters the very list a renderer
 * would otherwise take its colour index from. `declaredColors` in `palette.ts`
 * has the whole argument and the shipped bug that prompted it.
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
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "salience":
      // Same again: the setup draws the split with no verdict on it, the reveal
      // keeps the identical bars and ticks the side that was actually right.
      return view.kind === "asguessed" || view.kind === "againstfact" ? (
        <SalienceView
          data={restrictSalience(data, { groupIds: view.groupIds })}
          full={data}
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
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "ratings":
      // Draws a slice like the rest: the setup quotes the one rating that gets
      // quoted, and the reveal puts the others on the same scale beside it.
      return view.kind === "onerating" || view.kind === "bothratings" ? (
        <RatingsView
          data={restrictRatings(data, { groupIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "forest":
      // Same slicing contract as the rest: the setup draws the rows that are
      // already public, and the reveal adds the row that settles the sign.
      return view.kind === "whatisknown" || view.kind === "themissingrow" ? (
        <ForestView
          data={restrictForest(data, { groupIds: view.groupIds })}
          full={data}
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
    case "projection":
      // Not a slice-drawer: both views draw the same maps at the same size, and
      // the reveal adds the verdict and the accusation bars. Rescaling or
      // dropping a map between the beats would change what the reader is
      // comparing, which is the one thing this shape has to hold still.
      return view.kind === "asdrawn" || view.kind === "whichisexact" ? (
        <ProjectionView data={data} kind={view.kind} />
      ) : null;
    case "target":
      // Not a slice-drawer either: both views draw both performers and the
      // whole axis. What the reveal adds is a second cut through bars that are
      // already on screen, so nothing may change length between the beats.
      return view.kind === "oncompliance" || view.kind === "insidewindow" ? (
        <TargetView data={data} kind={view.kind} />
      ) : null;
    case "series":
      // A slice-drawer, but of LINES rather than points: the setup draws one
      // instrument and the reveal adds the other. The full data is passed
      // alongside the restricted copy so the vertical scale and the time axis
      // stay fixed between the two beats.
      return view.kind === "oneinstrument" || view.kind === "bothinstruments" ? (
        <SeriesView
          data={restrictSeries(data, { groupIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "interval":
      // Not a slice-drawer. Both beats draw every published figure; what
      // changes is which quantity carries the interval.
      return view.kind === "oneshare" || view.kind === "thegap" ? (
        <IntervalView data={data} kind={view.kind} />
      ) : null;
    case "ceiling":
      // Not a slice-drawer. The setup draws the DERIVED difference and the
      // reveal draws the two arms it was subtracted from, so both beats already
      // use every observation; there is nothing to hold back.
      return view.kind === "thedifference" || view.kind === "bothcurves" ? (
        <CeilingView data={data} kind={view.kind} />
      ) : null;
    case "yield":
      // Same slicing contract as the rest: the setup draws what the programme
      // found, and the reveal adds the row saying what it changed.
      return view.kind === "whatitfound" || view.kind === "whatitchanged" ? (
        <YieldView
          data={restrictYield(data, { groupIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "unseen":
      // Deliberately NOT a slice-drawer. Both beats draw the same cohort and
      // the same reported estimate; the reveal ADDS the correction beside
      // them. Filtering anything would move the figure the reader is meant to
      // watch stay still.
      return view.kind === "asrecorded" || view.kind === "afterlooking" ? (
        <UnseenView data={data} kind={view.kind} />
      ) : null;
    case "delivered":
      // Deliberately NOT a slice-drawer either, and for a sharper reason than
      // `unseen`: both beats draw EVERY bar. The reveal is a column appearing
      // beside them, not a bar arriving, so there is nothing to hold back, and
      // holding anything back would break the one promise the figure makes.
      return view.kind === "asmeasured" || view.kind === "asdelivered" ? (
        <DeliveredView data={data} kind={view.kind} />
      ) : null;
    case "crossed":
      // A slice-drawer, and the slice is the point: the setup names the two
      // cells of the confounded diagonal and the reveal omits groupIds, so the
      // reveal adds the two that vary one factor at a time.
      return view.kind === "astested" || view.kind === "allfourways" ? (
        <CrossedView
          data={restrictCrossed(data, { groupIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "published":
      // A slice-drawer on the ARMS: the setup names one arm through strataIds
      // and the reveal omits it, so the reveal adds the arm where the reader
      // explanation of the gradient is not available.
      return view.kind === "onearm" || view.kind === "botharms" ? (
        <PublishedView
          data={restrictPublished(data, { strataIds: view.strataIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "conditional":
      // A slice-drawer on the ROWS: the setup names one row and the reveal
      // omits groupIds, so the reveal adds the row that carries the lesson.
      return view.kind === "onerow" || view.kind === "bothrows" ? (
        <ConditionalView
          data={restrictConditional(data, { groupIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "raters":
      // A slice-drawer on the RATERS: the setup names one judge and the reveal
      // omits groupIds, so the reveal adds the judges who disagreed with them.
      return view.kind === "onemarker" || view.kind === "everymarker" ? (
        <RatersView
          data={restrictRaters(data, { raterIds: view.groupIds })}
          full={data}
          kind={view.kind}
        />
      ) : null;
    case "attenuation":
      // Nothing filtered: the beats differ by which windows and outcomes are
      // drawn, and the reveal keeps the setup row untouched underneath.
      return view.kind === "atbaseline" || view.kind === "astrimmed" ? (
        <AttenuationView data={data} kind={view.kind} />
      ) : null;
    case "surrogate":
      // Nothing is filtered here: the beats differ by WHICH SECTIONS are
      // drawn, so the reveal carries the funnel unchanged plus the endpoint
      // counts underneath it, and is a superset by construction.
      return view.kind === "markeronly" || view.kind === "andoutcome" ? (
        <SurrogateView data={data} kind={view.kind} />
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
    case "whatisknown":
      return "What was already known";
    case "themissingrow":
      return "And the row that settles it";
    case "approaching":
      return "Running up to the line";
    case "acrossline":
      return "And just past it";
    case "asnumbers":
      return "What people guessed";
    case "againsttruth":
      return "And the real sizes";
    case "asdrawn":
      return "Just look at them";
    case "whichisexact":
      return "Which one is honest";
    case "oncompliance":
      return "Against the target";
    case "insidewindow":
      return "And where they finished";
    case "oneinstrument":
      return "One official count";
    case "bothinstruments":
      return "And the other one";
    case "oneshare":
      return "Each share, with the poll's margin";
    case "thegap":
      return "The lead, with its own";
    case "thedifference":
      return "The gap between them";
    case "bothcurves":
      return "And what the gap was drawn from";
    case "whatitfound":
      return "What the programme found";
    case "whatitchanged":
      return "And what it changed";
    case "asrecorded":
      return "As the records have it";
    case "afterlooking":
      return "And after somebody looked";
    case "asmeasured":
      return "What each group reported";
    case "asdelivered":
      return "And what each was actually given";
    case "astested":
      return "The comparison the trial made";
    case "allfourways":
      return "And the two nobody was told about";
    case "onearm":
      return "The arm that got the drug";
    case "botharms":
      return "And the arm that got nothing";
    case "markeronly":
      return "What the drug did to the marker";
    case "andoutcome":
      return "And what happened to the patients";
    case "atbaseline":
      return "Everyone, over the whole follow-up";
    case "astrimmed":
      return "And with the early deaths thrown away";
    /*
      Shape-generic, NOT halo's wording. These are keyed by view KIND, so the
      second puzzle on `conditional` inherits whatever is written here, and the
      first draft said "When the work was good", which describes one card's
      essays and nothing else. A card that wants its own phrasing sets an
      explicit `caption`, which is what `RevealView` prefers anyway; this is
      only the fallback.
    */
    case "onemarker":
      return "As one judge marked it";
    case "everymarker":
      return "As every judge marked it";
    case "onerow":
      return "In one case";
    case "bothrows":
      return "In every case";
    default:
      return "";
  }
}
