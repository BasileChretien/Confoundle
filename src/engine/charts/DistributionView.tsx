import { useT } from "../../app/i18n";
import type { DistributionData, DistributionGroup } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { formatPercent, placementOf, splitOf } from "./distribution";

/**
 * One published mean, and where it actually sits in the spread it came from.
 *
 * `average` shows the mean on its own, which is how such a number is always
 * quoted and reads as a fair summary. `spread` keeps the identical number and
 * adds the only thing that was missing: the share of items that never reach it.
 * Nothing is recomputed between the two views, and the share reaching the mean
 * is derived rather than authored (see ./distribution.ts), so the two segments
 * always account for everybody.
 */
function MeanRow({ group }: { group: DistributionGroup }) {
  const t = useT();
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-rule/60 py-1.5 last:border-b-0">
      <span className="min-w-0 truncate text-[12px] leading-snug text-ink">
        {t(group.short ?? group.label)}
      </span>
      <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-ink">
        {group.mean}
      </span>
    </div>
  );
}

function SpreadRow({ group }: { group: DistributionGroup }) {
  const t = useT();
  const p = placementOf(group);
  const s = splitOf(group);
  const name = t(group.short ?? group.label);

  return (
    <div className="flex flex-col gap-1 py-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate text-[12px] leading-snug text-ink">{name}</span>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
          {group.mean}
        </span>
      </div>
      <div
        className="flex h-4 w-full overflow-hidden rounded-[3px]"
        role="img"
        // "reached it" refers back to the mean, which is the slot before it.
        // That anaphora is not free in every language, so the sentence is
        // authored whole and a translator can repeat the value instead of
        // pointing back at it.
        aria-label={fillSlots(
          t({ en: "{group}: {below} below {mean}, {above} reached it" }),
          {
            group: name,
            below: formatPercent(s.belowPercent),
            mean: group.mean,
            above: formatPercent(s.abovePercent),
          },
        )}
      >
        <div
          className="h-full"
          style={{ width: `${p.below * 100}%`, backgroundColor: colorFor(1) }}
        />
        <div
          className="h-full"
          style={{ width: `${p.atOrAbove * 100}%`, backgroundColor: colorFor(0) }}
        />
      </div>
      <div className="flex justify-between font-mono text-[10px] tabular-nums text-ink-mute">
        <span>{formatPercent(s.belowPercent)}</span>
        <span>{formatPercent(s.abovePercent)}</span>
      </div>
    </div>
  );
}

export function DistributionView({
  data,
  kind,
}: {
  data: DistributionData;
  kind: "average" | "spread";
}) {
  const t = useT();

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">
        {t(data.meanLabel)}
      </p>

      {kind === "spread" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] uppercase tracking-eyebrow text-ink-soft">
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-[1px]"
              style={{ backgroundColor: colorFor(1) }}
              aria-hidden="true"
            />
            {t(data.belowLabel)}
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-[1px]"
              style={{ backgroundColor: colorFor(0) }}
              aria-hidden="true"
            />
            {t(data.aboveLabel)}
          </span>
        </div>
      ) : null}

      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-1">
        {data.groups.map((g) =>
          kind === "average" ? (
            <MeanRow key={g.id} group={g} />
          ) : (
            <SpreadRow key={g.id} group={g} />
          ),
        )}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">
        {kind === "spread" ? t(data.percentNote) : t(data.valueLabel)}
      </p>
    </div>
  );
}
