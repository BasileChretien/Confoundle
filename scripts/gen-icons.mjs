/**
 * Generates the PWA PNG icons from a tiny brand motif (two ascending bars on an
 * indigo→violet gradient), with a dependency-free PNG encoder so the repo needs
 * no native image library. Run: `pnpm gen:icons`. Output: public/icons/*.png.
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

function drawIcon(size, motifScale) {
  const rgba = Buffer.alloc(size * size * 4);
  const set = (x, y, r, g, b, a) => {
    const i = (y * size + x) * 4;
    rgba[i] = r;
    rgba[i + 1] = g;
    rgba[i + 2] = b;
    rgba[i + 3] = a;
  };

  // indigo (#4f46e5) → violet (#7c3aed) vertical gradient
  for (let y = 0; y < size; y++) {
    const t = y / (size - 1);
    const r = lerp(0x4f, 0x7c, t);
    const g = lerp(0x46, 0x3a, t);
    const b = lerp(0xe5, 0xed, t);
    for (let x = 0; x < size; x++) set(x, y, r, g, b, 255);
  }

  // two white bars within the (maskable-safe) motif area
  const area = size * motifScale;
  const ox = (size - area) / 2;
  const oy = (size - area) / 2;
  const barW = Math.round(area * 0.24);
  const gap = Math.round(area * 0.14);
  const totalW = barW * 2 + gap;
  const startX = Math.round(ox + (area - totalW) / 2);
  const baseY = Math.round(oy + area * 0.84);

  const drawBar = (x, h) => {
    const top = Math.round(baseY - h);
    for (let yy = top; yy < baseY; yy++)
      for (let xx = x; xx < x + barW; xx++)
        if (xx >= 0 && xx < size && yy >= 0 && yy < size)
          set(xx, yy, 255, 255, 255, 255);
  };
  drawBar(startX, Math.round(area * 0.4));
  drawBar(startX + barW + gap, Math.round(area * 0.64));

  return rgba;
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");
mkdirSync(outDir, { recursive: true });

const targets = [
  ["icon-192.png", 192, 0.74],
  ["icon-512.png", 512, 0.74],
  ["icon-512-maskable.png", 512, 0.6],
];

for (const [name, size, scale] of targets) {
  const buf = encodePng(size, drawIcon(size, scale));
  writeFileSync(join(outDir, name), buf);
  console.log(`wrote public/icons/${name} (${buf.length} bytes)`);
}
