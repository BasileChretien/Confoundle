import { useLocale, useT } from "../../app/i18n";
import type { ClassifierData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { ratesFor, spreadAmongFlagged, spreadFlaggedInError } from "./classifier";

/**
 * One confusion matrix per group, asked two different questions.
 *
 * `whenitflagged` (setup) draws a single reading: of the people the tool
 * flagged, how many did the thing. The two bars come out nearly level, which
 * is what the tool's makers pointed at and is not wrong. `everyoutcome`
 * (reveal) keeps that reading and adds the other one underneath: of the people
 * the thing did NOT happen to, how many were flagged anyway. Same four counts,
 * opposite verdict.
 *
 * THE BASE RATES ARE PART OF THE REVEAL, not a footnote. Without them the gap
 * between the two readings looks like a defect somebody could have avoided.
 * With them it is forced: the identity in `classifier.ts` binds the two
 * readings to the base rate, so holding one equal across groups whose base
 * rates differ pushes the other apart. A reveal that showed only the second
 * reading would be teaching outrage where the lesson is arithmetic.
 *
 * EVERY BAR IS DRAWN AGAINST THE SAME 0 TO 100 SCALE, deliberately, even
 * though the setup's bars would read more dramatically stretched to their own
 * range. The whole point is a comparison between two readings, so the two
 * blocks must be measurable against each other by eye.
 */

const AXIS = "#DCD2BC";

export function ClassifierView({
  data,
  full,
  kind,
}: {
  data: ClassifierData;
  /**
   * The declared group list, which today is the same object as `data`.
   *
   * Said plainly rather than left to be discovered: this shape never hands the
   * renderer a slice, so there is nothing for `full` to hold that `data` does
   * not. It is here because every renderer in this directory that resolves
   * colour takes it, `declaredColors.test.ts` enforces that colour is read
   * through it, and a required prop is a `tsc` error rather than a thing to
   * remember. The day a beat draws one group instead of one reading, the
   * correct plumbing is already in place.
   *
   * The alternative was a `restrictClassifier` that returned its argument, and
   * that one WAS refused: see the note at the foot of `classifier.ts`. A prop
   * naming the declared list is true today; a function claiming to filter and
   * filtering nothing is not.
   */
  full: ClassifierData;
  kind: "whenitflagged" | "everyoutcome";
}) {
  const t = useT();
  const locale = useLocale();
  const colorOf = declaredColors(full.groups);

  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const count = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  const rates = ratesFor(data);
  const reveal = kind === "everyoutcome";

  const cellsFor = (id: string) => data.groups.find((g) => g.id === id)!;

  /*
    AN AUTHORED SENTENCE WITH SLOTS, never assembled from fragments, and it
    carries no list: the rows below already announce each group with its own
    label and figure, and a joined list inside a sentence hands a translator an
    English comma and an English clause order. Percentages are formatted whole
    so nothing has to agree with a bare numeral.
  */
  const announce = reveal
    ? fillSlots(
        t({
          en: "The same groups on two readings of one table: they differ by {agree} on the first and by {differ} on the second.",
        }),
        {
          agree: percent.format(spreadAmongFlagged(data)),
          differ: percent.format(spreadFlaggedInError(data)),
        },
      )
    : fillSlots(
        t({
          en: "Each group's result on one reading of the table, where they differ by {agree}.",
        }),
        { agree: percent.format(spreadAmongFlagged(data)) },
      );

  const Reading = ({
    heading,
    value,
    numerator,
    denominator,
  }: {
    heading: string;
    value: (r: (typeof rates)[number]) => number;
    numerator: (g: ClassifierData["groups"][number]) => number;
    denominator: (g: ClassifierData["groups"][number]) => number;
  }) => (
    <div>
      <p className="mb-1 text-[11px] font-semibold text-ink">{heading}</p>
      <div className="flex flex-col gap-1.5">
        {rates.map((r) => {
          const g = cellsFor(r.id);
          return (
            <div key={r.id} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-[10px] text-ink">{t(g.short)}</span>
              <span className="relative h-3.5 flex-1 overflow-hidden rounded-sm bg-paper-2">
                <span
                  className="absolute inset-y-0 left-0 rounded-sm"
                  style={{
                    width: `${value(r) * 100}%`,
                    backgroundColor: colorOf(r.id),
                  }}
                />
              </span>
              <span className="w-11 shrink-0 text-right font-mono text-[10px] font-semibold tabular-nums text-ink">
                {percent.format(value(r))}
              </span>
              <span className="w-24 shrink-0 text-right font-mono text-[9px] tabular-nums text-ink-mute">
                {fillSlots(t({ en: "{a} of {b}" }), {
                  a: count.format(numerator(g)),
                  b: count.format(denominator(g)),
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <figure className="w-full" aria-label={announce}>
      <figcaption className="mb-2 text-[11px] font-semibold text-ink">
        {t(data.label)}
      </figcaption>

      <div className="flex flex-col gap-3">
        <Reading
          heading={t(data.amongFlaggedLabel)}
          value={(r) => r.amongFlagged}
          numerator={(g) => g.flaggedAndHappened}
          denominator={(g) => g.flaggedAndHappened + g.flaggedNotHappened}
        />

        {reveal && (
          <Reading
            heading={t(data.amongUneventfulLabel)}
            value={(r) => r.flaggedInError}
            numerator={(g) => g.flaggedNotHappened}
            denominator={(g) => g.flaggedNotHappened + g.notFlaggedNorHappened}
          />
        )}

        {reveal && (
          <div className="border-t pt-1.5" style={{ borderColor: AXIS }}>
            <p className="mb-1 text-[11px] font-semibold text-ink">
              {t({ en: "How often it happened at all" })}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5">
              {rates.map((r) => (
                <span key={r.id} className="flex items-baseline gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-sm"
                    style={{ backgroundColor: colorOf(r.id) }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] text-ink-mute">
                    {t(cellsFor(r.id).short)}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tabular-nums text-ink">
                    {percent.format(r.baseRate)}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p
        className="mt-2 border-t pt-1 text-[10px] leading-snug text-ink-mute"
        style={{ borderColor: AXIS }}
      >
        {t(data.cohortNote)}
      </p>
    </figure>
  );
}
