import { useLocale, useT } from "../../app/i18n";
import type { PublishedData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
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
  full,
  kind: _kind,
}: {
  data: PublishedData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictPublished` filters `arms`,
   * so `data.arms` is the list this beat draws and its indices are a property
   * of the beat rather than of the puzzle. See `declaredColors`.
   */
  full: PublishedData;
  kind: "onearm" | "botharms";
}) {
  void _kind;
  const t = useT();
  /**
   * EVERY numeral in this figure goes through the reader's locale, which is the
   * rule `SurrogateView` states and the reason it states it: formatting only
   * some of them produced a Bengali line reading "১,৭২৭ · 75%", one number in
   * Bengali digits and its neighbour in Western ones, inside a single row.
   * Here the row is worse placed than that, because the rate and its
   * denominator sit two lines apart in the same block and are read together.
   *
   * So the rates go through `num` rather than `toFixed`, and the axis ends go
   * through `nf` rather than being printed raw. The digits themselves are left
   * as each locale's default rather than forced to Western, so nothing here
   * decides for an Arabic or Bengali reader which numerals they want.
   */
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const num = (v: number, digits: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
  const shown = publishedPairs(data);
  const colorOf = declaredColors(full.arms);
  const anyAdjusted = data.observations.some((o) => o.adjusted !== undefined);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {data.arms.map((a) => (
          <span key={a.id} className="flex items-center gap-1.5 text-[11px] text-ink">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorOf(a.id) }}
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
                  {p.values.map((v) => num(v.rate, 1)).join(" · ")}
                </span>
              </div>
              <div aria-hidden="true">
                {p.values.map((v) => (
                  <Track
                    key={v.armId}
                    point={axisFraction(data, v.rate)}
                    low={axisFraction(data, Math.max(v.rate - v.se, 0))}
                    high={axisFraction(data, v.rate + v.se)}
                    adjusted={
                      v.adjusted === undefined ? undefined : axisFraction(data, v.adjusted)
                    }
                    color={colorOf(v.armId)}
                  />
                ))}
              </div>
              {/*
                The denominator is notation rather than prose, and most locales
                keep the Latin `n`, but it is still a label a reader sees, so it
                is keyed rather than inlined: a translator whose convention
                differs has somewhere to put it, and the digits already group
                per locale through `nf`.

                It survived as a bare template literal because nothing could see
                it. `coverage.test.ts` walks authored puzzle content and
                `inlineChrome.test.ts` reads the source for the `t({ en: ... })`
                form, so a string that was never wrapped is invisible to both;
                and `chartsLocalized.test.ts`, which does render every chart in
                six non-Latin locales, matches runs of TWO or more Latin letters
                because one letter is an axis label rather than a word. A label
                whose only Latin is `n` falls through all three.
              */}
              <span className="font-mono text-[10px] tabular-nums text-ink-soft">
                {p.values
                  .map((v) => fillSlots(t({ en: "n = {count}" }), { count: nf.format(v.n) }))
                  .join(" · ")}
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
        <span>{nf.format(0)}</span>
        <span>{nf.format(data.axisMax)}</span>
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
