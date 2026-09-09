import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "photos");
const dataDir = join(root, "scripts", "photo-data");

const FILES = {
  "hw-cuda-sth.jpg":
    "https://164custom.com/images/HW/10900/super_treasure_hunt_2026_1.jpg",
  "hw-skyline-th.jpg":
    "https://164custom.com/images/HW/10650/Nissan-Skyline-HT-2000GT-X-RTH-Hot-Wheels-2026-Case-P.jpg",
  "hw-firebird-sth.jpg":
    "https://164custom.com/images/HW/10949/2026-hot-Wheels-Case-Q-67-Pontiac-Firebird-400-SUPER-TH.jpg",
  "hw-f40-sth.jpg":
    "https://164custom.com/images/HW/9877/2026-Hot-Wheels-Super-Treasure-Hunt-STH-Ferrari-F40-Black-02.jpg",
  "hw-civic-sth.jpg": null,
  "hw-elise-sth.jpg":
    "https://164custom.com/images/HW/10220/2026_Hot_wheels_Super_treasure_hunt.jpg",
  "mb-integra.jpg":
    "https://www.heavymetaldiecast.com/cdn/shop/files/20260721-060209.jpg?v=1784629077",
  "pk-30th-etb.jpg":
    "https://obsidia-tcg.store/cdn/shop/files/30thCelebrationEliteTrainerBox1_dd0eab59-d95a-448a-91db-96d60d7c1c43.webp?v=1782915396",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

function isJpeg(buf) {
  return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function fromB64(name) {
  const b64Path = join(dataDir, `${name}.b64`);
  if (!existsSync(b64Path)) return null;
  return Buffer.from(readFileSync(b64Path, "utf8").trim(), "base64");
}

async function fromUrl(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "image/*" } });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(FILES)) {
  const dest = join(outDir, name);
  if (existsSync(dest) && isJpeg(readFileSync(dest))) continue;

  let buf = fromB64(name);
  if (!buf && url) buf = await fromUrl(url);
  if (!buf || !isJpeg(buf)) {
    throw new Error(`Missing bundled photo ${name}`);
  }
  writeFileSync(dest, buf);
}

console.log(`photos ready in ${outDir}`);
