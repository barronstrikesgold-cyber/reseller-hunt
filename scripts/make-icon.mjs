import { mkdirSync, writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { Buffer } from "node:buffer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 180;
const H = 180;
const bg = [242, 242, 247, 255];
const white = [255, 255, 255, 255];
const blue = [0, 122, 255, 255];

function inRoundRect(x, y, l, t, r, b, rad) {
  if (x >= l + rad && x <= r - rad && y >= t && y <= b) return true;
  if (x >= l && x <= r && y >= t + rad && y <= b - rad) return true;
  const corners = [
    [l + rad, t + rad],
    [r - rad, t + rad],
    [l + rad, b - rad],
    [r - rad, b - rad],
  ];
  for (const [cx, cy] of corners) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy <= rad * rad) {
      const inX = (cx === l + rad && x <= cx) || (cx === r - rad && x >= cx);
      const inY = (cy === t + rad && y <= cy) || (cy === b - rad && y >= cy);
      if (inX && inY) return true;
    }
  }
  return false;
}

function nearLine(x, y, y0, x0, x1) {
  return Math.abs(y - y0) <= 2 && x >= x0 && x <= x1;
}

function pixel(x, y) {
  if (inRoundRect(x, y, 34, 40, 146, 140, 16)) {
    if (
      nearLine(x, y, 72, 52, 128) ||
      nearLine(x, y, 90, 52, 128) ||
      nearLine(x, y, 108, 52, 100)
    ) {
      return blue;
    }
    return white;
  }
  return bg;
}

function crc(buf) {
  let c = 0xffffffff;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(tag, data) {
  const t = Buffer.from(tag);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crcBuf]);
}

const raw = [];
for (let y = 0; y < H; y++) {
  raw.push(0);
  for (let x = 0; x < W; x++) raw.push(...pixel(x, y));
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6;

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(Buffer.from(raw), { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "apple-touch-icon.png"), png);
