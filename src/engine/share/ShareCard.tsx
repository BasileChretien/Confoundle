import { useRef, useState } from "react";
import type { Choice, Puzzle, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { track } from "../../app/analytics";
import { Badge, Button } from "../ui";
import { aggregateRates, bestGroupId, stratifiedRates } from "../charts/rates";
import { shareOrDownloadCard, type ExportResult } from "./exportCard";

type Framing = "competitive" | "selfDeprecating";

// Card-specific colors: brighter tones for legibility on the dark plate.
const CARD = {
  bg: "#201B14",
  text: "#F2ECDE",
  muted: "#C9BEA6",
  gold: "#D6A43A",
  teal: "#2AB39C",
  rust: "#E06A45",
  rule: "rgba(242,236,222,0.16)",
};

function humanize(category: string): string {
  const s = category.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** True when the pooled winner differs from the (consistent) subgroup winner. */
function hasReversal(data: RatesData): boolean {
  const agg = bestGroupId(aggregateRates(data), data.higherIsBetter);
  const winners = stratifiedRates(data).map((s) =>
    bestGroupId(s.rates, data.higherIsBetter),
  );
  const champ =
    winners.length > 0 && winners.every((w) => w === winners[0])
      ? winners[0]
      : null;
  return Boolean(champ && agg && champ !== agg);
}

/**
 * Abstract illustration of the paradox — the trend rises within each group but
 * falls once the groups are pooled. Deliberately carries no case-specific
 * numbers or labels: the card teaches the concept, not this one puzzle.
 */
function ReversalGlyph() {
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox="0 0 260 84"
        width="100%"
        role="img"
        aria-label="Within each group the trend rises, but pooled together it reverses and falls."
        style={{ display: "block" }}
      >
        <line
          x1="20" y1="30" x2="240" y2="66"
          stroke={CARD.rust} strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round"
        />
        <line x1="26" y1="52" x2="98" y2="28" stroke={CARD.teal} strokeWidth="4" strokeLinecap="round" />
        <circle cx="26" cy="52" r="3.6" fill={CARD.teal} />
        <circle cx="98" cy="28" r="3.6" fill={CARD.teal} />
        <line x1="162" y1="74" x2="234" y2="50" stroke={CARD.teal} strokeWidth="4" strokeLinecap="round" />
        <circle cx="162" cy="74" r="3.6" fill={CARD.teal} />
        <circle cx="234" cy="50" r="3.6" fill={CARD.teal} />
      </svg>
      <div
        className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px]"
        style={{ color: CARD.muted }}
      >
        <span className="inline-flex items-center gap-1.5">
          <span style={{ width: 14, height: 3, background: CARD.teal, borderRadius: 2, display: "inline-block" }} />
          within each group ↑
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span style={{ width: 14, borderTop: `2px dashed ${CARD.rust}`, display: "inline-block" }} />
          pooled together ↓
        </span>
      </div>
    </div>
  );
}

/**
 * Beat 5: the shareable result card. The card node (cardRef) is what gets
 * rendered to PNG. It explains the reasoning skill itself (name + definition +
 * an abstract diagram) so it teaches anyone who sees it, independent of the
 * specific puzzle. Both caption framings are offered side-by-side.
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
  const showGlyph = data.type === "rates" && hasReversal(data);

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
      { title: t(puzzle.share.title), text: `${caption} — Confoundle` },
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

      {/* The screenshot-able card — a dark almanac plate that explains the skill */}
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
              {humanize(puzzle.category)}
            </span>
          </div>

          <div className="mt-3 font-display text-[26px] font-semibold leading-[1.05]">
            {t(puzzle.lesson.skillName)}
          </div>

          <p className="mt-2 text-[14px] leading-snug" style={{ color: CARD.text }}>
            {t(puzzle.lesson.takeaway)}
          </p>

          {showGlyph ? <ReversalGlyph /> : null}

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
