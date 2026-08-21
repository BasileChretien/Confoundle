import { useEffect, useRef, useState } from "react";
import { useT } from "../../../app/i18n";
import {
  ENEMIES,
  LOADOUT_SIZE,
  WEAPON_IDS,
  waveAt,
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

/**
 * The threat, drawn large and drawn moving, by the arena's own function.
 *
 * Deliberately the same code path: if the wall on the gram positive ever stops
 * being visibly thicker in the arena, it stops being thicker here too, and the
 * briefing cannot quietly promise a distinction the game no longer draws.
 */
function ThreatPortrait({ waveIndex }: { waveIndex: number }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const wave = waveAt(waveIndex);

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
    const spec = ENEMIES[wave.headline];
    const draw = () => {
      raf = requestAnimationFrame(draw);
      tick += 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
      const cx = c.clientWidth / 2;
      const cy = c.clientHeight / 2;
      // Three of them, the middle one large: a wave rather than a specimen.
      const r = 92 / (spec.radius > 12 ? 2.4 : 1.6);
      drawPathogen(ctx, wave.headline, cx - 76, cy + 14, r * 0.55, tick + 40, false);
      drawPathogen(ctx, wave.headline, cx + 78, cy - 10, r * 0.62, tick + 90, false);
      drawPathogen(ctx, wave.headline, cx, cy, r, tick, false);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [wave.headline, waveIndex]);

  return <canvas ref={canvas} className="h-28 w-full" aria-hidden />;
}
