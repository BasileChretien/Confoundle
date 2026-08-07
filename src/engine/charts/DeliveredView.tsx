import { useT } from "../../app/i18n";
import type { DeliveredData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { axisFraction, deliveredPairs, showsExposure } from "./delivered";

/**
 * Two or more tiers, each measured under the same two conditions, drawn as
 * paired bars on one shared scale, with an optional column saying what each bar
 * was actually given.
 *
 * `asmeasured` draws the bars alone. `asdelivered` draws exactly the same bars
 * and adds the exposure against each. NOTHING MOVES BETWEEN THE TWO VIEWS: the
 * bars are computed from the same observations in the same order at the same
 * widths, and the only difference is a column appearing on the right. That is
 * deliberate, and it is the reason the shape exists. A reveal that redrew the
 * figure would let a reader believe the numbers had changed, when the point is
 * that the numbers were always these and the reader was judging them without
 * the one column that made them legible.
 *
 * Which is also why the exposure is not merely styled differently in the setup:
 * it is absent. A greyed-out or blurred column tells the reader there is
 * something they are not being shown, and the setup beat has to read as an
 * ordinary, complete-looking figure, because ordinary complete-looking figures
 * are the thing this puzzle is about.
 */
function Bar({ fraction, color }: { fraction: number; color: string }) {
  return (
    <div dir="ltr" className="relative h-2.5 flex-1 rounded-full bg-rule/40">
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${Math.max(Math.min(fraction, 1), 0) * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export function DeliveredView({
  data,
  kind,
}: {
  data: DeliveredData;
  kind: "asmeasured" | "asdelivered";
}) {
  const t = useT();
  const pairs = deliveredPairs(data);
  const withExposure = showsExposure(kind);
  const unit = t(data.exposureUnit);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="relative flex flex-col gap-3 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        {withExposure ? (
          <p className="text-[11px] font-medium leading-snug text-ink">
            {t(data.exposureLabel)}
          </p>
        ) : null}

        {pairs.map((p) => (
          <div key={p.tierId} className="flex flex-col gap-1.5">
            <span className="text-[12px] leading-snug text-ink">{t(p.short ?? p.label)}</span>

            {p.values.map((v, i) => {
              const arm = data.arms.find((a) => a.id === v.armId);
              return (
                <div key={v.armId} className="flex items-center gap-2">
                  <span className="w-[34%] shrink-0 text-[11px] leading-snug text-ink-soft">
                    {arm ? t(arm.short ?? arm.label) : v.armId}
                  </span>
                  <Bar fraction={axisFraction(data, v.mean)} color={colorFor(i)} />
                  <span className="w-9 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">
                    {v.mean.toFixed(1)}
                  </span>
                  {withExposure ? (
                    <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-soft">
                      {v.exposure}
                      {unit}
                    </span>
                  ) : null}
                </div>
              );
            })}

            {p.note ? (
              <span className="text-[10px] leading-snug text-ink-soft">{t(p.note)}</span>
            ) : null}
          </div>
        ))}
      </div>

      {/*
        dir="ltr" IS LOAD-BEARING and must not be removed, for the reason
        `YieldView` spells out: the scale runs low to high left to right in
        every locale, because the bars above are absolutely positioned from the
        left and do not mirror. Without it the two ends would swap in Arabic
        while the bars stayed put, labelling the scale backwards.
      */}
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 text-[10px] leading-snug text-ink-soft"
      >
        <span>{t(data.scale.minLabel)}</span>
        <span className="text-right">{t(data.scale.maxLabel)}</span>
      </div>
    </div>
  );
}
