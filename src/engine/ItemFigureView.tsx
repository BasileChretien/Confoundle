import { useT } from "../app/i18n";
import type { ItemFigure } from "../puzzles/testItems";
import { DataViewRenderer, dataTitle, scopeLabel } from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";
import { Badge } from "./ui";

/**
 * A test item's figure, drawn like a puzzle's because it is one.
 *
 * TWO VIEWS OF ONE DATASET, which is the deck's whole method and the thing the
 * repeatable modes never had. Before the call the reader sees `initialView`;
 * after it, `revealView`. Nothing about the data changes, only what is drawn
 * from it, and that is the reversal the prose items can describe but not
 * perform.
 *
 * THE NOTICE IS THE DEFAULT, NOT A FIELD SOMEBODY REMEMBERS. Prose is read as
 * a hypothetical and a chart is read as a measurement, so a figure with no
 * provenance says its numbers were built to show the shape. Removing the
 * notice takes a real source; forgetting leaves it in place. `CausalView` had
 * to learn this the expensive way, when invented scatter points shipped looking
 * like data and `schematicNote` went from optional to required.
 */
export function ItemFigureView({
  figure,
  revealed,
}: {
  figure: ItemFigure;
  revealed: boolean;
}) {
  const t = useT();
  const view = revealed ? figure.revealView : figure.initialView;

  return (
    <figure className="mt-3 rounded-lg border border-rule bg-paper-2 p-3">
      <figcaption className="mb-2.5 flex items-center justify-between gap-2 border-b border-rule pb-2">
        <Badge tone="ink">{t(dataTitle(figure.data))}</Badge>
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {view.caption ? t(view.caption) : t({ en: scopeLabel(view.kind) })}
        </span>
      </figcaption>

      <DataViewRenderer data={figure.data} view={view} animate={false} />
      {figure.data.type === "rates" ? (
        <Legend data={figure.data} view={view} />
      ) : null}

      <p className="mt-2.5 border-t border-rule pt-2 font-sans text-[11px] leading-snug text-ink-mute">
        {figure.provenance ? (
          figure.provenance.source
        ) : (
          t({
            en: "Numbers built to show the shape, not measured from anything.",
          })
        )}
      </p>
    </figure>
  );
}
