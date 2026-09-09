import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "photos");

const FILES = {
  "cuda.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/size/w960/2026/05/26-STH-70-Plymouth-AAR-Cuda-1-1.jpg",
  "firebird.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2026/05/26-STH-67-Pontiac-Firebird-400-1.jpg",
  "skyline.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2026/07/26-TH-Nissan-Skyline-HT-2000GT-X--1w.jpg",
  "f40.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2025/09/2026-STH-Ferrari-F40-Competizione-L-4.jpg",
  "civic.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2025/10/26-STH-Honda-Civic-Custom-2.jpg",
  "lotus.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2025/12/26-STH-Lotus-Sport-Elise-2.jpg",
  "mustang.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2025/06/2026-STH-Ford-Mustang-GTD-3.jpg",
  "impala.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2025/10/26-STH-64-Impala-1.jpg",
  "porsche.jpg":
    "https://storage.ghost.io/c/81/4f/814f42c9-9554-47a0-a5c0-499b2f9606cf/content/images/2026/01/26-STH-Porsche-911-Carrera-RS-27-1.jpg",
  "matchbox.jpg":
    "https://s1.cdn.autoevolution.com/images/news/gallery/next-two-matchbox-super-chase-collectibles-are-a-ford-and-a-nissan_1.jpg",
  "etb.jpg":
    "https://www.codedyellow.com/wp-content/uploads/2026/07/ETB-FI.jpg",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

function isJpeg(buf) {
  return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(FILES)) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "image/*" },
  });
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!isJpeg(buf)) throw new Error(`${name} is not a JPEG`);
  writeFileSync(join(outDir, name), buf);
  console.log("saved", name, buf.length);
}
