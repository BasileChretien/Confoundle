import { useEffect, useRef, useState } from "react";
import { useT } from "../../../app/i18n";
import {
  ENEMIES,
  LOADOUT_SIZE,
  WEAPON_IDS,
  waveAt,
  type EnemyKind,
  type WeaponId,
} from "./content";
import { drawPathogen } from "./render";
import { WeaponIcon } from "./WeaponIcon";

/**
 * The briefing: here is what is coming, choose what to send at it.
 *
 * WORDLESS, AND NOT AS A STYLE CHOICE. This screen has to work in ten
 * languages, and every word on it would be a dictionary key in nine of them
 * plus a sentence somebody has to translate without seeing the game. More to
 * the point, a caption is where the answer would leak: "Staphylococcus aureus,
 * gram positive" under the picture turns the whole design into a lookup table,
 * because from there the correct effector is a fact to be memorised rather
 * than something to work out. So the screen shows the THREAT and never the
 * answer, and it shows it as the same silhouette the player will meet a second
 * later, drawn by the same function the arena draws it with.
 *
 * The pips are the loadout slots, filling as you pick. The arrow commits, and
 * is dead until all three are filled, so there is no way to walk into a wave
 * half deployed by mistapping.
 */
export function BriefingSheet({
  waveIndex,
  unlocked,
  active,
  onDeploy,
}: {
  waveIndex: number;
  unlocked: readonly WeaponId[];
  active: readonly WeaponId[];
  onDeploy: (ids: readonly WeaponId[]) => void;
}) {
  const t = useT();
  // Opens on what is already deployed, so a wave that changes nothing costs
  // one tap rather than four, and the default is never an empty board.
  const [picked, setPicked] = useState<readonly WeaponId[]>(() =>
    active.filter((id) => unlocked.includes(id)).slice(0, LOADOUT_SIZE),
  );
  const ready = picked.length === LOADOUT_SIZE;

  const toggle = (id: WeaponId) => {
    setPicked((was) => {
      if (was.includes(id)) return was.filter((x) => x !== id);
      if (was.length >= LOADOUT_SIZE) return was;
      return [...was, id];
    });
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-950/95 p-4">
        <ThreatPortrait waveIndex={waveIndex} />

        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {Array.from({ length: LOADOUT_SIZE }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${
                i < picked.length ? "bg-slate-200" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Fixed order, off WEAPON_IDS rather than off `unlocked`, so an
            effector never moves once it has appeared: the muscle memory a
            player builds over five waves is the whole reason this can be fast
            enough to sit between waves. */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {WEAPON_IDS.filter((id) => unlocked.includes(id)).map((id) => {
            const on = picked.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                aria-pressed={on}
                className={`flex items-center justify-center rounded-md border py-3 active:bg-slate-800 ${
                  on ? "border-slate-300 bg-slate-800/80" : "border-slate-700 bg-slate-900/60"
                }`}
              >
                <WeaponIcon id={id} size={30} dim={!on} />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!ready}
          // LABELLED, because the glyph inside is `aria-hidden` and a button
          // whose only content is a hidden decoration has no accessible name
          // at all: a screen reader announces "button" and nothing else. The
          // rest of the sheet is deliberately wordless, which is fine for
          // pictures of pathogens and not fine for the control that commits.
          aria-label={t({ en: "Deploy" })}
          onClick={() => onDeploy(picked)}
          className={`mt-4 flex w-full items-center justify-center rounded-md py-3 ${
            ready ? "bg-slate-100 active:bg-white" : "bg-slate-800"
          }`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 12h15M13 6l6 6-6 6"
              fill="none"
              stroke={ready ? "#0f172a" : "#475569"}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export interface PortraitItem {
  readonly kind: EnemyKind;
  readonly x: number;
  readonly y: number;
  readonly r: number;
  /** An animation offset, so three of the same thing do not move in lockstep. */
  readonly phase: number;
}

export interface PortraitPlan {
  readonly pathogens: readonly PortraitItem[];
  readonly arrowAt: { readonly x: number; readonly y: number } | null;
}

/**
 * WHAT THE BRIEFING DRAWS, as data rather than as canvas calls.
 *
 * Pure so the fairness property can be tested at all: a canvas effect cannot
 * be inspected in this suite, and the property that matters is not how it
 * looks but WHICH PATHOGENS IT NAMES. `briefing.test.ts` asserts that every
 * phase of every wave appears here, off `WAVES` itself, so a second turning
 * wave added later is covered without its author knowing this exists.
 */
export function portraitPlan(waveIndex: number, width: number, height: number): PortraitPlan {
  const wave = waveAt(waveIndex);
  const cy = height / 2;
  const sizeOf = (k: EnemyKind) => 92 / (ENEMIES[k].radius > 12 ? 2.4 : 1.6);
  const becomes = turnsIntoKind(wave);

  if (becomes === null) {
    const cx = width / 2;
    const r = sizeOf(wave.headline);
    // Three of them, the middle one large: a wave rather than a specimen.
    return {
      pathogens: [
        { kind: wave.headline, x: cx - 76, y: cy + 14, r: r * 0.55, phase: 40 },
        { kind: wave.headline, x: cx + 78, y: cy - 10, r: r * 0.62, phase: 90 },
        { kind: wave.headline, x: cx, y: cy, r, phase: 0 },
      ],
      arrowAt: null,
    };
  }

  // Two halves and an arrow: this, and then this. The whole wave, before the
  // player is asked to answer it.
  const left = width * 0.26;
  const right = width * 0.74;
  const rl = sizeOf(wave.headline) * 0.78;
  const rr = sizeOf(becomes) * 0.78;
  return {
    pathogens: [
      { kind: wave.headline, x: left - 26, y: cy + 16, r: rl * 0.55, phase: 40 },
      { kind: wave.headline, x: left, y: cy - 4, r: rl, phase: 0 },
      { kind: becomes, x: right + 26, y: cy + 16, r: rr * 0.55, phase: 70 },
      { kind: becomes, x: right, y: cy - 4, r: rr, phase: 20 },
    ],
    arrowAt: { x: width / 2, y: cy },
  };
}

/**
 * What a turning wave turns into: the heaviest kind in its second phase, or
 * null for a wave that stays what it started as.
 *
 * Read off the data rather than written out per wave, so a second turning wave
 * added later announces itself without anybody remembering this exists.
 */
function turnsIntoKind(wave: ReturnType<typeof waveAt>): EnemyKind | null {
  if (wave.turnsInto === undefined) return null;
  let best: EnemyKind | null = null;
  let weight = -1;
  for (const [kind, w] of wave.turnsInto.mix) {
    if (w > weight) {
      weight = w;
      best = kind;
    }
  }
  return best;
}

/**
 * What is coming, drawn large and drawn moving, by the arena's own function.
 *
 * Deliberately the same code path: if the wall on the gram positive ever stops
 * being visibly thicker in the arena, it stops being thicker here too, and the
 * briefing cannot quietly promise a distinction the game no longer draws.
 *
 * IT SHOWS BOTH HALVES OF A WAVE THAT TURNS OVER, and it did not, which was a
 * violation of this project's oldest rule about never marking a well-reasoning
 * player wrong in order to land a surprise.
 *
 * The influenza wave announces free virions and then, at 38 seconds, becomes
 * infected host cells. A player who reasons correctly from what they were
 * shown deploys antibody, which is the right answer to a free virion and
 * cannot reach a virus that is inside one of your own cells. The loadout is
 * then LOCKED for the rest of the wave, so there is no remedy: the game asked
 * a question, accepted the correct answer, and killed them for it.
 *
 * CLAUDE.md is explicit that the fix is to put the discriminator in the
 * framing rather than to enjoy the reveal, so the briefing now draws the
 * second phase beside the first with an arrow between them. The surprise that
 * remains is the interesting one, which is that the answer inverts. The one
 * that is removed is the unfair one, which is that you were not told.
 */
function ThreatPortrait({ waveIndex }: { waveIndex: number }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    c.width = Math.round(c.clientWidth * dpr);
    c.height = Math.round(c.clientHeight * dpr);
    let raf = 0;
    let tick = 0;
    // Motion is decoration here; the shapes carry everything. Frozen rather
    // than animated for a reader who asked not to be moved at.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const plan = portraitPlan(waveIndex, c.clientWidth, c.clientHeight);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!still) tick += 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
      for (const item of plan.pathogens) {
        drawPathogen(ctx, item.kind, item.x, item.y, item.r, tick + item.phase, false);
      }
      if (plan.arrowAt !== null) {
        const { x, y } = plan.arrowAt;
        ctx.strokeStyle = "#64748B";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - 14, y);
        ctx.lineTo(x + 12, y);
        ctx.moveTo(x + 4, y - 7);
        ctx.lineTo(x + 12, y);
        ctx.lineTo(x + 4, y + 7);
        ctx.stroke();
        ctx.lineCap = "butt";
      }
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [waveIndex]);

  return <canvas ref={canvas} className="h-28 w-full" aria-hidden />;
}
