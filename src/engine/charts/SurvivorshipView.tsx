import type { DataViewKind, SurvivorshipData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";

const PLANE_FILL = "#BDB39C";
const PLANE_STROKE = "#8A7E6A";
const HIT = "#BE4A2F"; // rust — bullet holes on survivors
const ARMOR = "#9A6B12"; // gold — the vulnerable, under-observed areas

// Holes cluster on the wings and body — never on the engines/cockpit/tail,
// because planes hit there didn't come back.
const DAMAGE_DOTS: ReadonlyArray<readonly [number, number]> = [
  [26, 72],
  [70, 70],
  [82, 80],
  [118, 71],
  [130, 80],
  [176, 72],
  [100, 96],
  [94, 110],
  [107, 124],
  [99, 138],
  [92, 102],
  [108, 118],
];

function Plane({ armor }: { armor: boolean }) {
  const zoneFill = armor ? "rgba(154,107,18,0.30)" : PLANE_FILL;
  const zoneStroke = armor ? ARMOR : PLANE_STROKE;
  const zoneW = armor ? 2.5 : 1.5;
  return (
    <svg
      viewBox="0 0 200 168"
      role="img"
      aria-label={
        armor
          ? "The engines and cockpit — clean on returning planes — are the vulnerable spots to armour"
          : "Bullet holes on returning planes cluster on the wings and body"
      }
      style={{ display: "block", width: "100%", maxWidth: 220, margin: "0 auto" }}
    >
      <rect x="14" y="60" width="172" height="24" rx="11" fill={PLANE_FILL} stroke={PLANE_STROKE} strokeWidth="1.5" />
      <rect x="64" y="128" width="72" height="15" rx="7" fill={PLANE_FILL} stroke={PLANE_STROKE} strokeWidth="1.5" />
      <rect x="88" y="22" width="24" height="128" rx="12" fill={PLANE_FILL} stroke={PLANE_STROKE} strokeWidth="1.5" />
      {/* cockpit + engines — highlighted gold in the armour view */}
      <circle cx="100" cy="38" r="9" fill={zoneFill} stroke={zoneStroke} strokeWidth={zoneW} />
      <rect x="42" y="64" width="16" height="16" rx="4" fill={zoneFill} stroke={zoneStroke} strokeWidth={zoneW} />
      <rect x="142" y="64" width="16" height="16" rx="4" fill={zoneFill} stroke={zoneStroke} strokeWidth={zoneW} />
      {/* bullet holes on the survivors */}
      {DAMAGE_DOTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill={HIT} opacity={armor ? 0.22 : 1} />
      ))}
    </svg>
  );
}

export function SurvivorshipView({
  data,
  view,
}: {
  data: SurvivorshipData;
  view: DataViewKind;
  animate?: boolean;
}) {
  const t = useT();
  const armor = view === "armor";
  return (
    <div className="flex flex-col items-center gap-2.5">
      <Plane armor={armor} />
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
        {armor ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{
                backgroundColor: "rgba(154,107,18,0.30)",
                boxShadow: `inset 0 0 0 2px ${ARMOR}`,
              }}
            />
            {t(data.armorLabel)}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: HIT }}
            />
            {t(data.hitLabel)}
          </span>
        )}
      </div>
    </div>
  );
}
