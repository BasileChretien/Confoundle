import { useLocale, useT } from "../../app/i18n";
import type { ProxyData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { gapsFor, gapsForScale, widestGap, type MeasureGap } from "./proxy";

/**
 * A model's two scales, drawn as paired bars, one pair per measure.
 *
 * `astrained` (setup) draws only what the model was trained to predict. The two
 * groups sit almost level, which is exactly what every accuracy check anyone
 * would run says: the thing is well calibrated. `asithappened` (reveal) keeps
 * those rows and adds the ones nobody trained on, and the pairs come apart.
 *
 * THE X AXIS IS THE MEASURE, NOT A RISK SCORE, and that is a constraint from
 * the source rather than a layout preference. The paper prints its cost figures
 * at the median and in the top five per cent, and its illness figure at the
 * ninety seventh percentile, and it prints both at no single point. A figure
 * with risk on the axis would have to place a cost number and an illness number
 * together to be drawn at all, which would be inventing a reading the paper
 * does not support. One row per measure asks nothing of the source it did not
 * already say.
 *
 * BARS ARE SCALED WITHIN THEIR OWN ROW. Dollars and admissions per patient-year
 * have no common length, so a shared axis would draw the admissions pair as two
 * invisible slivers beside a cost pair that fills the row, and the reader would
 * conclude the admissions gap was the small one. Each row is scaled to its own
 * larger value, and what carries across rows is the printed gap.
 *
 * COLOUR COMES FROM `declaredColors`, because the setup draws a SLICE. Resolved
 * by position in the drawn list, a group would take slot 0 at the setup and
 * move when the reveal brought the other rows in, so a reader tracking a colour
 * across the two beats would be tracking two different things.
 */

const AXIS = "#DCD2BC";

export function ProxyView({
  data,
  full,
  kind,
}: {
  data: ProxyData;
  /** The unrestricted data, so colour cannot drift between the beats. */
  full: ProxyData;
  kind: "astrained" | "asithappened";
}) {
  const t = useT();
  const locale = useLocale();
  const colorOf = declaredColors(full.groups);

  const money = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const plain = new Intl.NumberFormat(locale);
  const twoDecimals = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  /*
    A GAP IS FORMATTED WHOLE, number and unit together, and that is a
    translation constraint rather than a style choice. Written as "{gap} per
    cent", the slot hands a translator a bare numeral with a noun standing
    after it that has to agree with it: Russian wants процент, процента or
    процентов depending on the value, and Arabic wants the dual at two. The
    translator never sees the number, so no translation can be right. A percent
    style formatter puts the sign inside the slot, where nothing has to agree
    with anything, and gives each locale its own spacing and numerals for free.
  */
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const show = (g: MeasureGap, value: number): string => {
    if (g.unit === "currency") return `$${money.format(value)}`;
    if (g.unit === "percentile") return plain.format(value);
    // Counts per patient-year are fractions and rounding them to whole numbers
    // would turn 0.09 and 0.13 into the same number, which is the gap.
    return twoDecimals.format(value);
  };

  // `data` is already the slice for this beat; `full` is everything, and the
  // two summary gaps below are read off `full` so the reveal can say how the
  // two scales compare without re-deriving one of them from a restricted copy.
  const gaps = gapsFor(data);
  const trained = gapsForScale(full, ["proxy"]);
  const mattered = gapsForScale(full, ["truth"]);
  const trainedWidest = widestGap(trained);
  const matteredWidest = widestGap(mattered);

  /*
    AN AUTHORED SENTENCE WITH SLOTS, never a template literal assembled from
    fragments. A translator has to be free to put the numbers where their own
    language puts them, and a conditional tail is written as a whole second
    sentence rather than appended, because a fragment has no sentence to sit in.

    IT NAMES NO MEASURES, and that is deliberate rather than lazy. The obvious
    version dropped a joined list of the drawn measures into a slot, which asks
    a translator to accept an English comma, an English conjunction and an
    English clause order inside a sentence they are otherwise free to build. It
    also duplicates what a screen reader already reaches: every row below
    carries its own translated label and its own gap. So the figure's label
    states what kind of comparison this is and how wide the widest gap runs,
    and the enumeration stays where it is already correct.
  */
  const gapText = (widest: number | null): string =>
    percent.format(widest === null ? 0 : widest - 1);

  const announce =
    kind === "astrained"
      ? fillSlots(
          t({
            en: "Each group's result on the scale the model was trained on. The widest gap between them is {gap}.",
          }),
          { gap: gapText(trainedWidest) },
        )
      : fillSlots(
          t({
            en: "The same groups on the scale nobody trained on. The widest gap between them is {gap}.",
          }),
          { gap: gapText(matteredWidest) },
        );

  return (
    <figure className="w-full" aria-label={announce}>
      <figcaption className="mb-1 text-[11px] font-semibold text-ink">
        {t(data.label)}
      </figcaption>

      {/* Which group is which, once, above everything. */}
      <div className="mb-2 flex flex-wrap gap-3">
        {full.groups.map((g) => (
          <span key={g.id} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: colorOf(g.id) }}
              aria-hidden="true"
            />
            <span className="text-[11px] text-ink">{t(g.label)}</span>
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {gaps.map((g) => {
          const largest = Math.max(...g.values.map((v) => v.value), 1e-9);
          return (
            <div key={g.measureId}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-semibold text-ink">{t(g.label)}</span>
                <span className="font-mono text-[10px] tabular-nums text-ink-mute">
                  {g.ratio === null ? "" : `+${percent.format(g.ratio - 1)}`}
                </span>
              </div>
              {g.values.map((v) => (
                <div key={v.groupId} className="flex items-center gap-2">
                  <span className="relative h-3.5 flex-1 overflow-hidden rounded-sm bg-paper-2">
                    <span
                      className="absolute inset-y-0 left-0 rounded-sm"
                      style={{
                        width: `${(v.value / largest) * 100}%`,
                        backgroundColor: colorOf(v.groupId),
                      }}
                    />
                  </span>
                  <span className="w-16 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink">
                    {show(g, v.value)}
                  </span>
                </div>
              ))}
              {g.per !== undefined && (
                <div className="text-[10px] text-ink-mute">{t(g.per)}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 border-t pt-1.5 text-[10px] leading-snug text-ink-mute" style={{ borderColor: AXIS }}>
        <div>{t(data.basisNote)}</div>
        <div>{kind === "astrained" ? t(data.trainedOnLabel) : t(data.mattersLabel)}</div>
      </div>
    </figure>
  );
}
