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

/**
 * The creature: a rounded-square gold head that echoes the app's own icon (a
 * rounded square holding two bars), peeking up from behind the teal and rust
 * data bars it hides among. Drawn on a strict grid with one stroke weight
 * throughout, an asymmetric brow and off-centre pupils for a sidelong,
 * knowing look. It is a character, not a UI icon, which is why it survives the
 * otherwise icon-free interface.
 */
export function ConfounderMark({ size = 72 }: { size?: number }) {
  const teal = colorFor(0);
  const rust = colorFor(1);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      role="img"
      aria-label="The Confounder"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* the two ascending bars of the brand motif, for it to hide among */}
      <rect x="8" y="42" width="12" height="22" rx="3" fill={teal} />
      <rect x="52" y="34" width="12" height="30" rx="3" fill={rust} />
      {/* gold head, a rounded square like the app icon, peeking up from behind */}
      <rect
        x="16"
        y="10"
        width="40"
        height="40"
        rx="13"
        fill={WINNER_GOLD}
        stroke={INK}
        strokeWidth="3"
      />
      {/* eyes, pupils pushed to one side for a sidelong look */}
      <circle cx="28" cy="30" r="7" fill={PAPER} stroke={INK} strokeWidth="2" />
      <circle cx="44" cy="30" r="7" fill={PAPER} stroke={INK} strokeWidth="2" />
      <circle cx="30.5" cy="31" r="3" fill={INK} />
      <circle cx="46.5" cy="31" r="3" fill={INK} />
      {/* one arched brow: the tell of someone enjoying your mistake */}
      <path
        d="M22 20 Q28 16 34 20"
        fill="none"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* a small, confident smirk */}
      <path
        d="M30 41 Q37 45 44 40"
        fill="none"
        stroke={INK}
        strokeWidth="3"
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
