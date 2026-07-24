import { useT } from "../../app/i18n";
import type { AgreementData } from "../../puzzles/schema";
import { agreementRows, agreementScale, type AgreementRow } from "./agreement";

/**
 * Two measurements of the same people, drawn twice.
 *
 * The setup view shows only what appeared at the second measurement with
 * nothing behind it, which is all a retrospective study can see and is exactly
 * what looks like one group misremembering more than the other. The reveal view
 * puts that beside what those same people had said the first time, where the
 * story changes: both groups kept almost none of their own earlier answers.
 *
 * Same numbers, two framings, which is the whole design tenet.
 */

function pct(x: number | null): string {
  return x == null ? "—" : `${Math.round(x * 100)}%`;
}

function Bar({
  segments,
  scale,
}: {
  segments: { value: number; className: string; key: string }[];
  scale: number;
}) {
  return (
    <div className="flex h-5 w-full overflow-hidden rounded-[3px] bg-rule/60">
      {segments.map((s) =>
        s.value > 0 ? (
          <div
            key={s.key}
            className={s.className}
            style={{ width: `${(s.value / scale) * 100}%` }}
          />
        ) : null,
      )}
    </div>
  );
}

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-[2px] ${className}`} aria-hidden="true" />
      <span className="text-[11px] text-ink-soft">{label}</span>
    </span>
  );
}

export function AgreementView({
  data,
  kind,
}: {
  data: AgreementData;
  kind: "invented" | "agreement";
}) {
  const t = useT();
  const rows = agreementRows(data);
  const scale = agreementScale(rows);

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row: AgreementRow) => (
        <div key={t(row.label)} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-[12px] font-semibold text-ink">
              {t(row.short ?? row.label)}
            </span>
            <span className="font-mono text-[12px] tabular-nums text-ink-soft">
              {kind === "invented"
                ? `${row.invented} / ${row.n}`
                : `${row.repeated} / ${row.reportedBefore} (${pct(row.repeatedShare)})`}
            </span>
          </div>

          {kind === "invented" ? (
            <Bar
              scale={scale}
              segments={[{ key: "invented", value: row.invented, className: "bg-rust" }]}
            />
          ) : (
            <Bar
              scale={scale}
              segments={[
                { key: "repeated", value: row.repeated, className: "bg-brand" },
                { key: "forgotten", value: row.forgotten, className: "bg-ink-mute/45" },
                { key: "invented", value: row.invented, className: "bg-rust" },
              ]}
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
        {kind === "invented" ? (
          <Swatch className="bg-rust" label={t(data.inventedLabel)} />
        ) : (
          <>
            <Swatch className="bg-brand" label={t(data.repeatedLabel)} />
            <Swatch className="bg-ink-mute/45" label={t(data.forgottenLabel)} />
            <Swatch className="bg-rust" label={t(data.inventedLabel)} />
          </>
        )}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">
        {kind === "invented"
          ? t(data.afterLabel)
          : `${t(data.beforeLabel)} · ${t(data.afterLabel)}`}
      </p>
    </div>
  );
}
