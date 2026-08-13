import { useLocale, useT } from "../../app/i18n";
import type { BunchingData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { bunchingShape, cliffAcross } from "./bunching";

/**
 * Counts in ordered bins, with the threshold drawn as a line between them.
 *
 * `approaching` draws only the bins the setup shows, which look like an
 * ordinary gentle slope. `acrossline` adds the bins past the threshold, and the
 * cliff appears. The bars that were already on screen do not move or rescale
 * between the two views, because the tallest bin is in the setup either way,
 * so the reader can see it is the same data with more of it shown.
 *
 * The threshold rule is drawn between two bars rather than under one, since the
 * line falls at an instant, not in a bin. Counts are printed above each bar
 * because the whole lesson is the size of the step and reading it off bar
 * heights alone would be asking the eye to do arithmetic.
 */
function Bar({
  name,
  count,
  height,
  past,
  formatCount,
}: {
  name: string;
  count: number;
  height: number;
  past: boolean;
  formatCount: (n: number) => string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <span className="font-mono text-[9px] tabular-nums leading-none text-ink-soft">
        {formatCount(count)}
      </span>
      <div className="flex h-20 w-full items-end justify-center">
        <div
          className="w-full rounded-t-[2px]"
          style={{
            height: `${Math.max(height * 100, 1.5)}%`,
            backgroundColor: colorFor(past ? 1 : 0),
          }}
        />
      </div>
      <span className="truncate text-[10px] leading-none text-ink-mute">
        {name}
      </span>
    </div>
  );
}

export function BunchingView({
  data,
  kind,
}: {
  data: BunchingData;
  kind: "approaching" | "acrossline";
}) {
  const t = useT();
  const shape = bunchingShape(data);
  const cliff = cliffAcross(data);

  // Locale-aware grouping, so 97,012 is not 97,012 in every language. The
  // locale is the one the READER PICKED, which is the whole of the fix here:
  // this was `n.toLocaleString()` with no argument, and an argument-less call
  // follows the JavaScript runtime's default locale, which in a browser is the
  // browser's. So a reader who had switched the app to Bengali still got
  // English grouping unless their browser happened to agree, and nothing
  // anywhere failed, because the comment above was already true in spirit.
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const formatCount = (n: number) => nf.format(n);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">
        {t(data.metricLabel)}
      </p>

      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex items-end gap-1">
          {shape.bars.map((bar, i) => {
            const next = shape.bars[i + 1];
            // The rule sits in the gap, so it renders after the last bin before
            // the line rather than inside either neighbour.
            const lineAfterThis = next && !bar.past && next.past;
            return (
              <div key={bar.id} className="flex min-w-0 flex-1 items-end gap-1">
                <Bar
                  name={t(bar.short ?? bar.label)}
                  count={bar.count}
                  height={bar.height}
                  past={bar.past}
                  formatCount={formatCount}
                />
                {lineAfterThis ? (
                  <div
                    className="relative -mx-0.5 h-24 w-px shrink-0 bg-ink-mute"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mt-1.5 text-center font-sans text-[9px] uppercase tracking-eyebrow text-ink-mute">
          {kind === "acrossline"
            ? t(data.thresholdLabel)
            : t(data.itemLabel)}
        </p>
      </div>

      {/*
        The drop is stated only once both sides are drawn. `cliffAcross` returns
        null at the setup, so this cannot leak the answer into the first beat
        even if a puzzle miswires its views.
      */}
      {kind === "acrossline" && cliff && data.dropLabel ? (
        <p className="text-[11px] leading-snug text-ink-soft">
          {t(data.dropLabel).replace("{count}", formatCount(cliff.drop))}
        </p>
      ) : null}

      {data.thresholdNote ? (
        <p className="text-[11px] leading-snug text-ink-mute">
          {t(data.thresholdNote)}
        </p>
      ) : null}
    </div>
  );
}
