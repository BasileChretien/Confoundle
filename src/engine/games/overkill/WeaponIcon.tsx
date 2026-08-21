import { useEffect, useRef } from "react";
import { type WeaponId } from "./content";
import { drawEffector } from "./cells";

/**
 * An effector, drawn as the thing it is.
 *
 * THIS USED TO BE EIGHT HAND-DRAWN SVG GLYPHS and they were the wrong idea in
 * a way that took a play session to see. They were fine glyphs. They were also
 * a SECOND visual language, with no relationship to what the arena drew, so
 * learning the icons taught you nothing about the game and playing the game
 * taught you nothing about the icons. Picking a card meant choosing between
 * abstract marks and then watching an unrelated abstract effect happen.
 *
 * So the icon is now a canvas running the SAME `drawEffector` the battlefield
 * runs. The cell on the card is the cell that appears beside you. There is
 * exactly one visual language, it is anatomical rather than invented, and
 * nothing can drift because there is only one drawing.
 *
 * DRAWN ONCE, NOT ANIMATED. A briefing shows eight of these at a time and a
 * level up shows three; eight animation loops to wiggle a nucleus is real
 * battery on a phone for no legibility gain, since what distinguishes these is
 * shape rather than motion.
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
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    c.width = Math.round(size * dpr);
    c.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    // A third rather than a half, so a cell that spills past its own radius
    // (the eosinophil degranulating, the plasma cell's antibodies) is not
    // clipped at the edge of its box.
    drawEffector(ctx, id, size / 2, size / 2, size * 0.33, 0);
  }, [id, size]);

  return (
    <canvas
      ref={canvas}
      width={size}
      height={size}
      style={{ width: size, height: size, opacity: dim ? 0.3 : 1, display: "block" }}
      aria-hidden
    />
  );
}
