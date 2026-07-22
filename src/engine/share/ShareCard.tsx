import { useRef, useState } from "react";
import type { Choice, Puzzle, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { track } from "../../app/analytics";
import { Badge, Button } from "../ui";
import {
  aggregateRates,
  bestGroupId,
  formatPct,
  stratifiedRates,
} from "../charts/rates";
import { shareOrDownloadCard, type ExportResult } from "./exportCard";

type Framing = "competitive" | "selfDeprecating";

// Card-specific colors: brighter data tones for legibility on the dark plate.
const CARD = {
  bg: "#201B14",
  text: "#F2ECDE",
  muted: "#C9BEA6",
  gold: "#D6A43A",
  rule: "rgba(242,236,222,0.16)",
  track: "rgba(242,236,222,0.14)",
};
const CARD_SERIES = ["#2AB39C", "#E06A45", "#D6A43A", "#8CA0C0", "#C08BB0"];
const cardColor = (i: number) => CARD_SERIES[i % CARD_SERIES.length];

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
  const isReversal = subgroupChamp && aggWinner && subgroupChamp !== aggWinner;

  return (
    <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: "rgba(0,0,0,0.28)" }}>
      {strata.map((s) => {
        const stratum = data.strata.find((x) => x.id === s.stratumId)!;
        const winner = bestGroupId(s.rates, data.higherIsBetter);
        return (
          <div key={s.stratumId} className="mb-2 last:mb-0">
            <div
              className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
              style={{ color: CARD.muted }}
            >
              {t(stratum.label)}
            </div>
            {s.rates.map((r) => (
              <div key={r.groupId} className="mb-1 flex items-center gap-2">
                <span
                  className="w-4 font-sans text-[11px] font-bold"
                  style={{ color: CARD.text }}
                >
                  {short(r.groupId)}
                </span>
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: CARD.track }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round(r.rate * 100)}%`,
                      backgroundColor: cardColor(indexOf.get(r.groupId) ?? 0),
                    }}
                  />
                </div>
                <span
                  className="w-9 text-right font-sans text-[11px] tabular-nums"
                  style={{ color: winner === r.groupId ? CARD.gold : CARD.muted }}
                >
                  {formatPct(r.rate)}
                </span>
                <span className="w-2 text-[11px]" style={{ color: CARD.gold }}>
                  {winner === r.groupId ? "✓" : ""}
                </span>
              </div>
            ))}
          </div>
        );
      })}
      {isReversal ? (
        <div
          className="mt-2 text-center font-sans text-[11px] font-semibold"
          style={{ color: CARD.gold }}
        >
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
 * of sharing and update the card live.
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
        <Badge tone="brand">Your card</Badge>
        <h2 className="font-display text-xl font-semibold text-ink">
          Nice — now catch a friend.
        </h2>
      </header>

      {/* The screenshot-able card — a dark almanac plate */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="w-[320px] rounded-2xl p-6"
          style={{ backgroundColor: CARD.bg, color: CARD.text }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-base font-semibold">
              Confoundle
            </span>
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
              style={{ color: CARD.muted }}
            >
              {t(puzzle.share.title)}
            </span>
          </div>

          <div className="mt-3 font-display text-[26px] font-semibold leading-[1.05]">
            {t(puzzle.lesson.skillName)}
          </div>

          {data.type === "rates" ? <MiniReversal data={data} /> : null}

          <p className="mt-4 font-display text-[17px] font-medium leading-snug">
            <span style={{ color: CARD.gold }}>“</span>
            {caption}
            <span style={{ color: CARD.gold }}>”</span>
          </p>

          <div
            className="mt-4 border-t pt-2 font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
            style={{ borderColor: CARD.rule, color: CARD.muted }}
          >
            Spot the hidden variable · confoundle
          </div>
        </div>
      </div>

      {/* Caption framing — both offered side by side */}
      <div>
        <p className="mb-2 text-center font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
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
                  "rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
                  (active
                    ? "bg-ink text-paper"
                    : "border border-rule bg-paper-2 text-ink hover:bg-paper-3")
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
      <p
        className="min-h-[1.25rem] text-center text-sm text-ink-soft"
        aria-live="polite"
      >
        {status}
      </p>

      <Button variant="ghost" onClick={onReplay}>
        Play again
      </Button>
    </section>
  );
}
