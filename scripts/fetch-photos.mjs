import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

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
  "topps-s1.jpg":
    "https://cdn11.bigcommerce.com/s-2781s2b091/images/stencil/1280x1280/products/10242/45432/2026-topps-series-1-baseball-blaster-box__53886.1771297513__90385.1781198919.jpg?c=1",
  "topps-fb.jpg":
    "https://monmouthcards.com/cdn/shop/files/e2b50203383bcf1ea607f59cd659e9253b40eb2d_Slice_1_1.webp?v=1787592534",
  "optic-fb.jpg":
    "https://smashitcards.com/cdn/shop/files/2025_Panini_Donruss_Optic_Football_Blaster_Box_Purple_Shock_Parallels.jpg?v=1787522360",
  "chrome-fb.jpg":
    "https://cdn11.bigcommerce.com/s-cft20qcvqs/images/stencil/1280x1280/products/15833/486988/2025-topps-chrome-football-hanger-box__30848.1776825168.jpg?c=1",
  "select-fb.jpg":
    "https://target.scene7.com/is/image/Target/GUEST_3779af15-1b94-4d77-b00a-c78afd282c06?wid=1200&fmt=jpg",
  "wnba.jpg":
    "https://cdn11.bigcommerce.com/s-cft20qcvqs/images/stencil/1280x1280/products/15415/474083/2025-panini-prizm-wnba-basketball-blaster-wnba-logo-prizms-box__90839.1772499572.jpg?c=1",
  "bowman-bb.jpg":
    "https://jbssportscards.net/cdn/shop/files/2025-26_Bowman_Basketball_Value_Box_Pic_5_1200x1200.jpg?v=1777160882",
  "fifa.jpg":
    "https://pastimesports.ca/cdn/shop/files/11_7_bbf9db69-9179-4c98-b611-061fa7671715_1200x1200.jpg?v=1787261311",
  "artifacts.jpg":
    "https://cdn11.bigcommerce.com/s-cft20qcvqs/images/stencil/1280x1280/products/13078/512149/202627-upper-deck-artifacts-hockey-blaster-box__86148.1785571754.jpg?c=1",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

function isJpeg(buf) {
  return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function toJpeg(buf) {
  if (isJpeg(buf)) return buf;
  const convert = () =>
    spawnSync(
      "python3",
      [
        "-c",
        "import sys; from PIL import Image; import io; im=Image.open(io.BytesIO(sys.stdin.buffer.read())).convert('RGB'); out=io.BytesIO(); im.save(out, format='JPEG', quality=82); sys.stdout.buffer.write(out.getvalue())",
      ],
      { input: buf, maxBuffer: 20_000_000 },
    );
  let result = convert();
  if (result.status !== 0) {
    spawnSync("python3", ["-m", "pip", "install", "--user", "pillow", "-q"], {
      stdio: "inherit",
    });
    result = convert();
  }
  if (result.status !== 0) {
    throw new Error(result.stderr.toString() || "jpeg convert failed");
  }
  return result.stdout;
}

mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(FILES)) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}`);
  const raw = Buffer.from(await res.arrayBuffer());
  const buf = toJpeg(raw);
  if (!isJpeg(buf)) throw new Error(`${name} is not a JPEG`);
  writeFileSync(join(outDir, name), buf);
  console.log("saved", name, buf.length);
}
