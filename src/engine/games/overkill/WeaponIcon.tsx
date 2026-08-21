import { type WeaponId } from "./content";
import { WEAPON_COLOR } from "./render";

/**
 * A weapon as a shape, not as a colour.
 *
 * THIS IS WHY THE LEVEL UPS WERE UNPLAYABLE. The cards were three coloured
 * squares, so every single one meant reading a legend off the meter, working
 * out which colour was which, and only then deciding, several times a minute,
 * with the game held still. That is not a decision under pressure, it is a
 * quiz, and it broke the rhythm of the run more thoroughly than the pause
 * itself ever could.
 *
 * A shape is recognised rather than decoded. The Y of an antibody, a blade, a
 * spiked virus: these are read at a glance and they carry the fiction at the
 * same time, which is what lets the whole game stay wordless in ten languages.
 * Colour is kept, but as reinforcement rather than as the only channel, which
 * also means the eight per cent of men who cannot separate red from green are
 * not playing a different game.
 */

export function WeaponIcon({
  id,
  size = 28,
  dim = false,
}: {
  id: WeaponId;
  size?: number;
  dim?: boolean;
}) {
  const c = WEAPON_COLOR[id];
  const common = {
    stroke: c,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ opacity: dim ? 0.3 : 1, display: "block" }}
    >
      {id === "antibody" && (
        <g {...common}>
          <path d="M12 21V13" />
          <path d="M12 13L6 5" />
          <path d="M12 13L18 5" />
          <circle cx="6" cy="4" r="1.6" fill={c} stroke="none" />
          <circle cx="18" cy="4" r="1.6" fill={c} stroke="none" />
        </g>
      )}

      {id === "neutrophil" && (
        <g {...common}>
          <path d="M5 19L14 10" />
          <path d="M13 4L20 11L16.5 12.5L11.5 7.5Z" fill={c} />
          <path d="M5 19L7.5 18.5L8 16" />
        </g>
      )}

      {id === "cytokine" && (
        <g {...common}>
          <circle cx="12" cy="12" r="2.6" fill={c} stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path key={deg} d="M12 7.5V4" transform={`rotate(${deg} 12 12)`} />
          ))}
        </g>
      )}

      {id === "burst" && (
        <g {...common}>
          <path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" fill={c} fillOpacity="0.25" />
          <path d="M12 20a3 3 0 0 1-3-3c0-2 3-3 3-6 2 3 3 4 3 6a3 3 0 0 1-3 3Z" fill={c} />
        </g>
      )}

      {id === "complement" && (
        <g {...common}>
          {/* A pore punched through a membrane, which is what it does. */}
          <circle cx="12" cy="12" r="6.5" />
          <circle cx="12" cy="12" r="2.2" fill={c} stroke="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path key={deg} d="M12 5.5V2.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </g>
      )}

      {id === "killerT" && (
        <g {...common}>
          <circle cx="12" cy="12" r="7.5" fill={c} fillOpacity="0.22" />
          <path d="M8 9.5h8" />
          <path d="M12 9.5v7" />
        </g>
      )}

      {id === "nk" && (
        <g {...common}>
          {/* A cell with a bite taken out: missing self, which is the cue. */}
          <path d="M12 4.5a7.5 7.5 0 1 0 7.4 8.7L15 12l4.2-3.1A7.5 7.5 0 0 0 12 4.5Z" fill={c} fillOpacity="0.22" />
          <circle cx="10.5" cy="12" r="2" fill={c} stroke="none" />
        </g>
      )}

      {id === "eosinophil" && (
        <g {...common}>
          {/* A bilobed nucleus and granules, which is how you know one. */}
          <circle cx="12" cy="12" r="7.5" fill={c} fillOpacity="0.18" />
          <path d="M9.5 8.5a3 3 0 0 0 0 7" />
          <path d="M14.5 8.5a3 3 0 0 1 0 7" />
          <circle cx="12" cy="7" r="1" fill={c} stroke="none" />
          <circle cx="12" cy="17" r="1" fill={c} stroke="none" />
        </g>
      )}

    </svg>
  );
}
