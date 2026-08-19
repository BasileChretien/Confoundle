import { describe, it, expect } from "vitest";

/**
 * The card the player earned comes before the report about them.
 *
 * `HomeView` argues that a screen opening on data displays is what "feels like
 * studying" rendered in DOM, and the home screen was rebuilt around that. The
 * puzzle still ENDED on the same thing: score, streak, best streak, catch rate,
 * a calibration table, a global percentile, then a leaderboard with a nickname
 * field and a paste box, and only then the share card.
 *
 * WHY THIS READS THE SOURCE INSTEAD OF RENDERING. The share beat is reachable
 * only after a commit and two more taps, through a component that holds its own
 * state, so `renderToStaticMarkup` shows the setup beat and nothing else. The
 * alternative was to leave the ordering unguarded, which is how it drifted into
 * this shape in the first place: nothing was ever wrong, each panel was simply
 * appended where it was easiest.
 *
 * What this therefore proves is narrow and worth stating: the ORDER of three
 * elements in one file. It cannot see layout, and it would not notice a fourth
 * panel added above the card. It is a tripwire on a known regression, not a
 * description of the beat.
 */
const SOURCES = import.meta.glob("./PuzzleFlow.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

describe("the share beat", () => {
  const source = Object.values(SOURCES)[0];

  it("actually read the file, rather than an empty glob", () => {
    // A scan that reads nothing passes everything.
    expect(source).toBeDefined();
    expect(source!.length).toBeGreaterThan(1000);
    expect(source).toContain('beat === "share"');
  });

  it("puts the share card before the panels that assess the player", () => {
    const beat = source!.slice(source!.indexOf('beat === "share"'));
    const card = beat.indexOf("<ShareCard");
    const stats = beat.indexOf("<StatsPanel");
    const board = beat.indexOf("<FriendsBoard");
    expect(card, "no ShareCard in the share beat").toBeGreaterThan(-1);
    expect(stats, "no StatsPanel in the share beat").toBeGreaterThan(-1);
    expect(board, "no FriendsBoard in the share beat").toBeGreaterThan(-1);
    expect(card, "StatsPanel greets the player before their card").toBeLessThan(
      stats,
    );
    expect(card, "FriendsBoard greets the player before their card").toBeLessThan(
      board,
    );
  });

  it("still renders all three, so the fix is an order and not a deletion", () => {
    // Which of these belongs in the product at all is a separate question from
    // which of them should greet you, and this change answers only the second.
    for (const tag of ["<ShareCard", "<StatsPanel", "<FriendsBoard"]) {
      expect(source!.split(tag).length - 1, `${tag} count`).toBe(1);
    }
  });
});
