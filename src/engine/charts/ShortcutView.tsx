import { useLocale, useT } from "../../app/i18n";
import type { ShortcutData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { prevalenceRatio, shortcutShare } from "./shortcut";

/**
 * Predictors of one thing, scored on one pooled set whose parts differ.
 *
 * `asscored` (setup) draws the models that were allowed to see the evidence,
 * and the composition of the set they were scored on. That composition is
 * NOT a footnote: it is what lets a reader work out that the site is itself
 * informative, which is what makes the commit beat answerable instead of a
 * guess. `whatitsaw` (reveal) adds the model that saw none of the evidence.
 *
 * THE SCORE AXIS STARTS AT CHANCE, not at zero, and that is the figure's main
 * argument rather than a scaling preference. Drawn from zero, 0.931 and 0.861
 * are two nearly identical bars and the reveal looks like a quibble. Drawn
 * from the chance line, where discrimination actually begins, the blind model
 * visibly covers most of the distance, which is the claim. The axis says
 * where it starts, because an axis that begins somewhere other than zero and
 * does not say so is the trick `misleading-axis` exists to teach against.
 *
 * COLOUR COMES FROM `declaredColors`, because the setup draws a SLICE of the
 * models. Resolved by position in the drawn list, the blind model would take
 * whatever slot the real model held at the setup, and a reader tracking a
 * colour across the beats would be tracking two different things.
 */

const AXIS = "#DCD2BC";

export function ShortcutView({
  data,
  full,
  kind,
}: {
  data: ShortcutData;
  /** The unrestricted data, so colour cannot drift between the beats. */
  full: ShortcutData;
  kind: "asscored" | "whatitsaw";
}) {
  const t = useT();
  const locale = useLocale();
  const colorOf = declaredColors(full.models);
  const colorOfSite = declaredColors(full.sites);

  /*
    TWO PERCENT FORMATTERS, because they are printing two different kinds of
    thing. `share` is derived here and a whole per cent is the honest precision
    for it. The prevalences and the separability are figures a SOURCE printed,
    and rounding them to whole per cent makes the figure contradict its own
    caption: 34.2 and 1.2 drawn as "34%" and "1%" invite the reader to divide
    them and get 34, beside a sentence saying 28.5, and 99.95 drawn as "100%"
    claims a perfection the paper does not report.
  */
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const ratePercent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const oneDecimal = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const three = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  const count = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  const reveal = kind === "whatitsaw";
  const top = Math.max(...full.models.map((m) => m.score), 1);
  /** Where a bar starts and ends on an axis running from chance to the top. */
  const width = (score: number) =>
    Math.max(0, ((score - full.chance) / (top - full.chance)) * 100);

  const share = shortcutShare(full);
  const ratio = prevalenceRatio(full);

  /*
    AN AUTHORED SENTENCE WITH SLOTS, carrying no list and no bare numeral in
    front of a noun that must agree with it. The rows below already announce
    each model with its own label and score, so the figure's own label states
    the comparison rather than enumerating it.
  */
  const announce = reveal
    ? fillSlots(
        t({
          en: "The same test set scored again by a model shown none of the evidence, which reaches {share} of the discrimination the best model reached.",
        }),
        { share: share === null ? percent.format(0) : percent.format(share) },
      )
    : fillSlots(
        t({
          en: "One score of {metric} on a set pooled from collections whose outcome rates differ by {ratio} times.",
        }),
        {
          metric: t(full.metricLabel),
          ratio: ratio === null ? oneDecimal.format(0) : oneDecimal.format(ratio),
        },
      );

  return (
    <figure className="w-full" aria-label={announce}>
      <figcaption className="mb-2 text-[11px] font-semibold text-ink">
        {t(data.label)}
      </figcaption>

      <div className="flex flex-col gap-1.5">
        {data.models.map((m) => (
          <div key={m.id}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-ink">{t(m.label)}</span>
              <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-ink">
                {three.format(m.score)}
              </span>
            </div>
            <span className="relative mt-0.5 block h-3.5 w-full overflow-hidden rounded-sm bg-paper-2">
              <span
                className="absolute inset-y-0 left-0 rounded-sm"
                style={{ width: `${width(m.score)}%`, backgroundColor: colorOf(m.id) }}
              />
            </span>
            {m.note !== undefined && (
              <p className="mt-0.5 text-[10px] leading-snug text-ink-mute">{t(m.note)}</p>
            )}
          </div>
        ))}
      </div>

      {/* The axis says where it begins. */}
      <div className="mt-1 flex justify-between border-t pt-1" style={{ borderColor: AXIS }}>
        <span className="font-mono text-[9px] tabular-nums text-ink-mute">
          {fillSlots(t({ en: "{value}, chance" }), { value: three.format(full.chance) })}
        </span>
        <span className="font-mono text-[9px] tabular-nums text-ink-mute">
          {three.format(top)}
        </span>
      </div>

      {reveal && share !== null && (
        <p className="mt-1.5 text-[10px] leading-snug text-ink-mute">
          {fillSlots(
            t({
              en: "Measured from chance, the blind model covers {share} of the distance the best one covered.",
            }),
            { share: percent.format(share) },
          )}
        </p>
      )}

      {/* The composition, which is on screen at BOTH beats. */}
      <div className="mt-2.5 border-t pt-1.5" style={{ borderColor: AXIS }}>
        <p className="mb-1 text-[11px] font-semibold text-ink">{t(data.prevalenceLabel)}</p>
        <div className="flex flex-col gap-0.5">
          {data.sites.map((s) => (
            <div key={s.id} className="flex items-baseline gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: colorOfSite(s.id) }}
                aria-hidden="true"
              />
              <span className="text-[10px] text-ink">{t(s.short)}</span>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-ink">
                {ratePercent.format(s.prevalence / 100)}
              </span>
              <span className="ml-auto font-mono text-[9px] tabular-nums text-ink-mute">
                {fillSlots(t({ en: "{n} images" }), { n: count.format(s.n) })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {reveal && full.separability !== undefined && (
        <p className="mt-1.5 text-[10px] leading-snug text-ink-mute">
          {fillSlots(t({ en: "A model {what}, {accuracy} of the time." }), {
            what: t(full.separabilityLabel),
            accuracy: ratePercent.format(full.separability / 100),
          })}
        </p>
      )}

      <p
        className="mt-1.5 border-t pt-1 text-[10px] leading-snug text-ink-mute"
        style={{ borderColor: AXIS }}
      >
        {t(data.cohortNote)}
      </p>
    </figure>
  );
}
