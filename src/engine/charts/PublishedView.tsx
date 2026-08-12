import { useT } from "../../app/i18n";
import type { PublishedData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { axisFraction, publishedPairs } from "./published";

/**
 * Published rates in arms, one row per stratum of the thing being compared,
 * drawn as points with a one standard error whisker on a shared axis.
 *
 * `onearm` draws the arms a beat has been given; `botharms` draws all of them.
 * Nothing is recomputed between the two views, the same contract `yield` and
 * `forest` use: the reveal differs by carrying MORE arms, so the restriction
 * lives in `restrictPublished` and the kind only names the beat.
 *
 * THE WHISKER IS ONE STANDARD ERROR AND THE FIGURE SAYS SO, in its own line of
 * text rather than a legend a reader might skip. It is not a confidence
 * interval and must not be drawn as one: the source printed a standard error,
 * and widening it to 95 per cent here would put this deck's arithmetic on a
 * figure whose whole lesson is about reading published numbers carefully.
 *
 * The adjusted rate, where the source published one, is drawn as a hollow
 * marker on the same line as the point it belongs to. That placement is the
 * argument: a reader can see at a glance how far the adjustment moved things,
 * which for this shape's usual subject is hardly at all.
 */
function Track({
  point,
  low,
  high,
  adjusted,
  color,
}: {
  point: number;
  low: number;
  high: number;
  adjusted?: number;
  color: string;
}) {
  return (
    <div dir="ltr" className="relative h-4">
      <div
        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
        style={{
          left: `${low * 100}%`,
          width: `${Math.max(high - low, 0.004) * 100}%`,
          backgroundColor: color,
          opacity: 0.32,
        }}
      />
      {adjusted !== undefined ? (
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{ left: `${adjusted * 100}%`, border: `2px solid ${color}`, opacity: 0.75 }}
        />
      ) : null}
      <div
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: `${point * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function PublishedView({
  data,
  kind: _kind,
}: {
  data: PublishedData;
  kind: "onearm" | "botharms";
}) {
  void _kind;
  const t = useT();
  const shown = publishedPairs(data);
  const anyAdjusted = data.observations.some((o) => o.adjusted !== undefined);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {data.arms.map((a, i) => (
          <span key={a.id} className="flex items-center gap-1.5 text-[11px] text-ink">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorFor(i) }}
            />
            {t(a.short ?? a.label)}
          </span>
        ))}
      </div>

      <div className="relative rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex flex-col gap-2.5">
          {shown.map((p) => (
            <div key={p.rowId} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] leading-snug text-ink">{t(p.short ?? p.label)}</span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                  {p.values.map((v) => v.rate.toFixed(1)).join(" · ")}
                </span>
              </div>
              <div aria-hidden="true">
                {p.values.map((v, i) => (
                  <Track
                    key={v.armId}
                    point={axisFraction(data, v.rate)}
                    low={axisFraction(data, Math.max(v.rate - v.se, 0))}
                    high={axisFraction(data, v.rate + v.se)}
                    adjusted={
                      v.adjusted === undefined ? undefined : axisFraction(data, v.adjusted)
                    }
                    color={colorFor(i)}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] tabular-nums text-ink-soft">
                {p.values.map((v) => `n = ${v.n.toLocaleString("en")}`).join(" · ")}
              </span>
              {p.note ? (
                <span className="text-[10px] leading-snug text-ink-soft">{t(p.note)}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/*
        dir="ltr" IS LOAD-BEARING and must not be removed, for the reason
        `YieldView` spells out: the axis runs low to high left to right in every
        locale because the tracks above are positioned from the left and do not
        mirror. Without it the two ends would swap in Arabic while the geometry
        stayed put, labelling the axis backwards.
      */}
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 font-mono text-[10px] tabular-nums text-ink-soft"
      >
        <span>0</span>
        <span>{data.axisMax}</span>
      </div>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.perLabel)}</p>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.dispersionLabel)}</p>
      {anyAdjusted && data.adjustedLabel ? (
        <p className="text-[10px] leading-snug text-ink-soft">
          {t(data.adjustedLabel)}
        </p>
      ) : null}
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.rateNote)}</p>
    </div>
  );
}
