import type {
  DataViewKind,
  FrequenciesData,
  LocalizedText,
} from "../../puzzles/schema";
import { useLocale, useT } from "../../app/i18n";
import { fillSlots } from "./announce";
import { frequencyBreakdown } from "./frequencies";

const TRUE_COLOR = "#0E8C7A"; // teal, actually has the condition
const FALSE_COLOR = "#D8C6A6"; // pale, false alarm

/**
 * Every sentence on this figure is authored whole, with `{slot}` placeholders,
 * and every numeral goes through the reader's locale.
 *
 * BOTH HALVES OF THIS FILE USED TO BE BUILT BY CONCATENATION, and it is the
 * clearest case in the deck of why the project forbids it. The counts line read
 * `` {b.truePositive} {t({ en: "of" })} {b.allPositive} ``, which is the exact
 * example CLAUDE.md names: "3 of 40" is 40人中3人 in Japanese, whole before
 * part, so a translator handed only the middle word cannot reach the right
 * sentence from where they are standing. What they did instead is the evidence.
 * Asked to translate "of" alone, Japanese and Chinese both returned "/", and
 * "1 in" came back as "1 /": a translator with no way to reorder the operands
 * fell back on notation, and the figure quietly stopped speaking either
 * language. Hindi got "बटा", which reads as a division rather than a
 * proportion, and Bengali got the postposition "এর মধ্যে", which put the
 * operands in the wrong order outright and looked fine doing it.
 *
 * None of that could fail a test. The fragments WERE in all nine dictionaries,
 * so `inlineChrome.test.ts` was satisfied, and each one WAS translated, so
 * `chartsLocalized.test.ts` found no Latin word to complain about. A sentence
 * assembled in English word order out of correctly translated pieces is
 * invisible to both. Only a reader of the language can see it.
 *
 * So the four fragments are retired and their sentences authored whole. The
 * counters are deliberately avoided in Japanese, Chinese and Bengali (人, 組,
 * জন): this shape serves `base-rate`, where the subject is people, and
 * `prosecutors-fallacy`, where it is couples, and a counter baked into the
 * chrome would be wrong for one of them. The neutral fraction forms carry both.
 *
 * `≈`, `~`, `%` and `·` stay outside the sentences, as `SurrogateView` keeps
 * `%` outside: they are notation rather than words, and a translator handed
 * `"~{percent}"` has nothing to decide.
 */
function useNumerals() {
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  // Rounded exactly as `formatPct` in `./rates` rounds, so no puzzle's figure
  // changes value here; the only difference is which locale groups the digits.
  const pct = (v: number) => `${nf.format(Math.round(v * 100))}%`;
  return { nf, pct };
}

function oneIn(
  t: (x: LocalizedText) => string,
  nf: Intl.NumberFormat,
  withCondition: number,
  total: number,
): string {
  // Reachable: the schema allows `withCondition: 0`, since it is `nonnegative`
  // rather than `positive`. Keyed rather than left as the bare "n/a" it was,
  // because an abbreviation is exactly the kind of string that differs by
  // language and gets missed for looking like notation.
  if (withCondition <= 0) return t({ en: "n/a" });
  const n = Math.round(total / withCondition);
  return fillSlots(t({ en: "1 in {count}" }), { count: nf.format(n) });
}

/** Setup view: the given facts a player is handed (and tends to neglect). */
function Facts({ data }: { data: FrequenciesData }) {
  const t = useT();
  const { nf, pct } = useNumerals();
  const b = frequencyBreakdown(data);
  const rows = [
    { k: t({ en: "How common it is" }), v: oneIn(t, nf, b.withCondition, b.total) },
    {
      k: t({ en: "Test catches it" }),
      v: b.sensitivity >= 1 ? t({ en: "Always" }) : pct(b.sensitivity),
    },
    { k: t({ en: "False-alarm rate" }), v: `~${pct(b.falsePositiveRate)}` },
  ];
  return (
    <dl className="flex flex-col divide-y divide-rule">
      {rows.map((r) => (
        <div
          key={r.k}
          className="flex items-center justify-between gap-3 py-2.5"
        >
          <dt className="text-[13px] text-ink-soft">{r.k}</dt>
          <dd className="text-[15px] font-semibold tabular-nums text-ink">
            {r.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Reveal view: the positive group, dominated by false alarms. */
function Breakdown({ data }: { data: FrequenciesData }) {
  const t = useT();
  const { nf, pct } = useNumerals();
  const b = frequencyBreakdown(data);
  const asDots = b.allPositive <= 120;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        {fillSlots(t({ en: "Positive tests · {count}" }), {
          count: nf.format(b.allPositive),
        })}
      </div>

      {asDots ? (
        <div className="flex max-w-68 flex-wrap justify-center gap-1">
          {Array.from({ length: b.truePositive }).map((_, i) => (
            <span
              key={`t${i}`}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/20"
              style={{ backgroundColor: TRUE_COLOR }}
            />
          ))}
          {Array.from({ length: b.falsePositive }).map((_, i) => (
            <span
              key={`f${i}`}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/15"
              style={{ backgroundColor: FALSE_COLOR }}
            />
          ))}
        </div>
      ) : (
        <div
          className="h-3 w-full max-w-68 overflow-hidden rounded-full ring-1 ring-inset ring-black/15"
          style={{ backgroundColor: FALSE_COLOR }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${b.allPositive > 0 ? (b.truePositive / b.allPositive) * 100 : 0}%`,
              backgroundColor: TRUE_COLOR,
            }}
          />
        </div>
      )}

      <div className="text-center">
        <div className="font-display text-2xl font-semibold text-ink">
          {fillSlots(t({ en: "{part} of {whole}" }), {
            part: nf.format(b.truePositive),
            whole: nf.format(b.allPositive),
          })}
        </div>
        <div className="text-sm text-ink-soft">
          {fillSlots(t({ en: "actually {condition}" }), {
            condition: t(data.conditionLabel),
          })}
        </div>
        <div className="mt-1 text-sm font-semibold text-gold-ink">
          ≈{" "}
          {fillSlots(t({ en: "{percent} chance" }), { percent: pct(b.ppv) })}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/20"
            style={{ backgroundColor: TRUE_COLOR }}
          />
          {t(data.conditionLabel)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/15"
            style={{ backgroundColor: FALSE_COLOR }}
          />
          {t({ en: "false alarm" })}
        </span>
      </div>
    </div>
  );
}

export function FrequencyView({
  data,
  view,
}: {
  data: FrequenciesData;
  view: DataViewKind;
  animate?: boolean;
}) {
  if (view === "headline") return <Facts data={data} />;
  return <Breakdown data={data} />;
}
