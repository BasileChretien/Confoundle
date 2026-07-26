import { useT } from "../app/i18n";
import { UI } from "../app/ui";
import { colorFor, WINNER_GOLD } from "./charts/palette";

/**
 * The Confounder: the lurking variable made flesh, and the app's one mascot.
 *
 * It is not on your side. It set every trap you are learning to spot, so the
 * dashboard is really its scoreboard, and it narrates your progress as its own
 * slow defeat. The gold is deliberate: gold is the "lurking variable" accent
 * everywhere else in the app, so the creature literally is the thing you hunt.
 *
 * `pickQuip` is pure and returns a UI key plus an optional number, so every line
 * stays translatable (the view does the `{n}` substitution, as the account panel
 * already does) and the character's voice can be tested without rendering.
 */

const INK = "#221D15";
const PAPER = "#F2ECDE";

export interface ConfounderState {
  learned: number; // skills started
  dueNow: number; // reviews due right now
  streak: number; // current daily streak
  catchRate: number; // 0..1, all-time
  played: number; // reviews + plays measured
  burned: number; // skills burned for good
  misconceptions: number; // skills currently "sure and wrong"
  allDone: boolean; // every skill burned
}

export interface Quip {
  key: keyof typeof UI;
  /** Substituted into a `{n}` slot when present. */
  n?: number;
}

/**
 * What the Confounder says, by priority. The order is the point: a due pile is
 * more urgent than a compliment, and a fresh misconception is exactly the thing
 * it most wants to crow about.
 */
export function pickQuip(s: ConfounderState): Quip {
  if (s.learned === 0) return { key: "confounderWelcome" };
  if (s.allDone) return { key: "confounderAllDone" };
  if (s.dueNow > 0) return { key: "confounderDue", n: s.dueNow };
  if (s.misconceptions > 0) return { key: "confounderMisconceived" };
  if (s.played >= 8 && s.catchRate >= 0.8 && s.burned > 0)
    return { key: "confounderHighCatch" };
  if (s.streak >= 3) return { key: "confounderStreak", n: s.streak };
  if (s.burned > 0) return { key: "confounderBurned" };
  return { key: "confounderIdle" };
}

/** The creature, peeking between the two brand bars. Decorative. */
export function ConfounderMark({ size = 72 }: { size?: number }) {
  const teal = colorFor(0);
  const rust = colorFor(1);
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 80 72"
      role="img"
      aria-label="The Confounder"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* the two ascending bars from the brand motif, for it to hide behind */}
      <rect x="6" y="38" width="12" height="28" rx="3" fill={teal} opacity="0.9" />
      <rect x="62" y="26" width="12" height="40" rx="3" fill={rust} opacity="0.9" />
      {/* gold body */}
      <path
        d="M40 12 C 23 12 15 27 15 44 C 15 59 26 67 40 67 C 54 67 65 59 65 44 C 65 27 57 12 40 12 Z"
        fill={WINNER_GOLD}
        stroke={INK}
        strokeWidth="2.5"
      />
      {/* eyes */}
      <circle cx="31" cy="41" r="8.5" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      <circle cx="49" cy="41" r="8.5" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      <circle cx="33" cy="43" r="3.4" fill={INK} />
      <circle cx="51" cy="43" r="3.4" fill={INK} />
      {/* sly brows */}
      <path d="M23 31 L37 35" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M57 31 L43 35" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      {/* smirk */}
      <path
        d="M33 55 Q40 60 48 54"
        stroke={INK}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The mascot header: the creature and its current line. Given the derived
 * state, it needles or concedes accordingly.
 */
export function Confounder({ state }: { state: ConfounderState }) {
  const t = useT();
  const quip = pickQuip(state);
  const line =
    quip.n != null
      ? t(UI[quip.key]).replace("{n}", String(quip.n))
      : t(UI[quip.key]);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gold/30 bg-gold/[0.06] p-3">
      <ConfounderMark size={64} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.confounderName)}
        </span>
        <p className="font-display text-[14px] italic leading-snug text-ink">
          {line}
        </p>
      </div>
    </div>
  );
}
