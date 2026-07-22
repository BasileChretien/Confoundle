import type { DataViewKind, FrequenciesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { frequencyBreakdown } from "./frequencies";
import { formatPct } from "./rates";

const TRUE_COLOR = "#0E8C7A"; // teal — actually has the condition
const FALSE_COLOR = "#D8C6A6"; // pale — false alarm

function oneIn(withCondition: number, total: number): string {
  if (withCondition <= 0) return "—";
  const n = Math.round(total / withCondition);
  return `1 in ${n.toLocaleString("en-US")}`;
}

/** Setup view: the given facts a player is handed (and tends to neglect). */
function Facts({ data }: { data: FrequenciesData }) {
  const b = frequencyBreakdown(data);
  const rows = [
    { k: "How common it is", v: oneIn(b.withCondition, b.total) },
    {
      k: "Test catches it",
      v: b.sensitivity >= 1 ? "Always" : formatPct(b.sensitivity),
    },
    { k: "False-alarm rate", v: `~${formatPct(b.falsePositiveRate)}` },
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
  const b = frequencyBreakdown(data);
  const asDots = b.allPositive <= 120;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        Positive tests · {b.allPositive}
      </div>

      {asDots ? (
        <div className="flex max-w-[17rem] flex-wrap justify-center gap-1">
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
          className="h-3 w-full max-w-[17rem] overflow-hidden rounded-full ring-1 ring-inset ring-black/15"
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
          {b.truePositive} of {b.allPositive}
        </div>
        <div className="text-sm text-ink-soft">actually {t(data.conditionLabel)}</div>
        <div className="mt-1 text-sm font-semibold text-gold-ink">
          ≈ {formatPct(b.ppv)} chance
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
          false alarm
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
