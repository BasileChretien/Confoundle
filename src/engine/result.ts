/**
 * The spoiler-free result line. It carries who, which day, whether they caught
 * the trap, their score and streak, but never the puzzle's answer, so it's safe
 * to paste into a group chat. It is also the format the local friends board
 * parses, so buildResultLine and parseResultLine are exact inverses.
 */
export interface ResultData {
  name: string;
  puzzleNo: number;
  caught: boolean;
  score: number;
  streak: number;
}

const CAUGHT = "🎯";
const FOOLED = "🫠";

export function buildResultLine(r: ResultData): string {
  const mark = r.caught ? CAUGHT : FOOLED;
  const score = r.score >= 0 ? `+${r.score}` : String(r.score);
  const name = r.name.trim() || "Anon";
  return `${name} · Confoundle #${r.puzzleNo} · ${mark} ${score} · 🔥${r.streak}`;
}

const LINE_RE =
  /^(.+?)\s*·\s*Confoundle\s*#(\d+)\s*·\s*(🎯|🫠)\s*([+-]?\d+)\s*·\s*🔥\s*(\d+)/u;

export function parseResultLine(line: string): ResultData | null {
  const m = line.trim().match(LINE_RE);
  if (!m) return null;
  return {
    name: m[1].trim().slice(0, 24),
    puzzleNo: Number(m[2]),
    caught: m[3] === CAUGHT,
    score: Number(m[4]),
    streak: Number(m[5]),
  };
}

/** Parse many pasted lines (chat dumps), keeping only valid result lines. */
export function parseResults(text: string): ResultData[] {
  return text
    .split("\n")
    .map(parseResultLine)
    .filter((r): r is ResultData => r !== null);
}
