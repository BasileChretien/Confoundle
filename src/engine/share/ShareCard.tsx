import { useRef, useState } from "react";
import type { Choice, Puzzle, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { track } from "../../app/analytics";
import { Badge, Button } from "../ui";
import { colorFor } from "../charts/palette";
import {
  aggregateRates,
  bestGroupId,
  formatPct,
  stratifiedRates,
} from "../charts/rates";
import { shareOrDownloadCard, type ExportResult } from "./exportCard";

type Framing = "competitive" | "selfDeprecating";

/** Compact, static reversal graphic for the share card (no animation). */
function MiniReversal({ data }: { data: RatesData }) {
  const t = useT();
  const indexOf = new Map(data.groups.map((g, i) => [g.id, i]));
  const short = (id: string) => {
    const g = data.groups.find((x) => x.id === id)!;
    return t(g.short ?? g.label);
  };

  const agg = aggregateRates(data);
  const aggWinner = bestGroupId(agg, data.higherIsBetter);
  const strata = stratifiedRates(data);
  const stratumWinners = strata.map((s) =>
    bestGroupId(s.rates, data.higherIsBetter),
  );
  const subgroupChamp =
    stratumWinners.length > 0 &&
    stratumWinners.every((w) => w === stratumWinners[0])
      ? stratumWinners[0]
      : null;
  const isReversal =
    subgroupChamp && aggWinner && subgroupChamp !== aggWinner;

  return (
    <div className="rounded-2xl bg-black/25 p-3">
      {strata.map((s) => {
        const stratum = data.strata.find((x) => x.id === s.stratumId)!;
        const winner = bestGroupId(s.rates, data.higherIsBetter);
        return (
          <div key={s.stratumId} className="mb-2 last:mb-0">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-white/50">
              {t(stratum.label)}
            </div>
            {s.rates.map((r) => (
              <div key={r.groupId} className="mb-1 flex items-center gap-2">
                <span className="w-4 text-[11px] font-bold text-white/90">
                  {short(r.groupId)}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round(r.rate * 100)}%`,
                      backgroundColor: colorFor(indexOf.get(r.groupId) ?? 0),
                    }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] tabular-nums text-white/80">
                  {formatPct(r.rate)}
                </span>
                <span className="w-2 text-[11px] text-emerald-300">
                  {winner === r.groupId ? "✓" : ""}
                </span>
              </div>
            ))}
          </div>
        );
      })}
      {isReversal ? (
        <div className="mt-2 text-center text-[11px] font-semibold text-emerald-300">
          {short(subgroupChamp)} wins every subgroup — {short(aggWinner)} only
          wins the average.
        </div>
      ) : null}
    </div>
  );
}

/**
 * Beat 5: the shareable result card. The card node (cardRef) is what gets
 * rendered to PNG. Both caption framings are offered side-by-side at the moment
 * of sharing (PROJECT_PLAN §6) and update the card live.
 */
export function ShareCard({
  puzzle,
  committed,
  onReplay,
}: {
  puzzle: Puzzle;
  committed: Choice;
  onReplay: () => void;
}) {
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  const [framing, setFraming] = useState<Framing>(
    committed.isCorrect ? "competitive" : "selfDeprecating",
  );
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const data = puzzle.setup.data;
  const caption = t(puzzle.share.captions[framing]);

  function selectFraming(next: Framing) {
    setFraming(next);
    track("share_caption_select", { slug: puzzle.slug, framing: next });
  }

  async function handleShare() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setStatus("Rendering card…");
    const result: ExportResult = await shareOrDownloadCard(
      cardRef.current,
      `confoundle-${puzzle.slug}.png`,
      { title: "Confoundle", text: `${caption} — Confoundle` },
    );
    track("share_export", { slug: puzzle.slug, framing, result });
    setStatus(
      result === "shared"
        ? "Shared!"
        : result === "downloaded"
          ? "Saved to your device."
          : result === "cancelled"
            ? null
            : "Couldn't create the image — try again.",
    );
    setBusy(false);
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <Badge>Your card</Badge>
        <h2 className="text-xl font-extrabold text-white">
          Nice — now catch a friend.
        </h2>
      </header>

      {/* The screenshot-able card */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="flex w-[320px] flex-col gap-3 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900 p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold tracking-tight">Confoundle</span>
            <span className="text-[11px] font-medium text-white/60">
              {t(puzzle.share.title)}
            </span>
          </div>

          <div className="text-2xl font-extrabold leading-tight">
            {t(puzzle.lesson.skillName)}
          </div>

          {data.type === "rates" ? <MiniReversal data={data} /> : null}

          <p className="text-[15px] font-medium italic leading-snug text-white">
            “{caption}”
          </p>

          <div className="mt-1 border-t border-white/15 pt-2 text-[11px] text-white/60">
            Spot the hidden variable · confoundle
          </div>
        </div>
      </div>

      {/* Caption framing — both offered side by side */}
      <div>
        <p className="mb-2 text-center text-xs text-slate-400">
          Pick your caption
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { key: "competitive", label: "Competitive" },
              { key: "selfDeprecating", label: "Self-deprecating" },
            ] as const
          ).map((opt) => {
            const active = framing === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={active}
                onClick={() => selectFraming(opt.key)}
                className={
                  "rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 " +
                  (active
                    ? "bg-white text-slate-900"
                    : "bg-white/10 text-slate-200 hover:bg-white/15")
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={handleShare} disabled={busy}>
        {busy ? "Working…" : "Share / save card"}
      </Button>
      <p className="min-h-[1.25rem] text-center text-sm text-slate-400" aria-live="polite">
        {status}
      </p>

      <Button variant="ghost" onClick={onReplay}>
        Play again
      </Button>
    </section>
  );
}
