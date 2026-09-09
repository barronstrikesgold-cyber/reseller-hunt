import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
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
  "jordan-1.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Air_Jordan_1_Banned.jpg?width=800",
  "jordan-3.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Air_Jordan_3_Retro.jpg?width=800",
  "jordan-4.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Air_Jordan_4_(Cement).jpg?width=800",
  "jordan-11.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Air_Jordan_XI_(cropped).jpg?width=800",
  "dunk-sb.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Nike_SB_Dunk_Low_Pro_(2).jpg?width=800",
  "nb-990.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/New_Balance_Women%27s_990_Running_Shoes.jpg?width=800",
  "nb-2002r.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/New_Balance_2002R.jpg?width=800",
  "nb-550.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/New_Balance_550.jpg?width=800",
  "samba.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas_Samba_OG.jpg?width=800",
  "yeezy-350.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Adidas_Yeezy_Boost_350_V2_Sesame.jpg?width=800",
  "iphone.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_12_-_2.jpg?width=800",
  "ipad.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/IPad_Air.png?width=800",
  "macbook.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/MacBook_Pro_16_(M1_Pro,_2021)_-_Wikipedia.jpg?width=800",
  "airpods.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/AirPods_Pro_(2nd_generation).jpg?width=800",
  "watch.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Apple_Watch_Series_8.jpg?width=800",
  "switch.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo-Switch-Console-Docked-wJoyConRB.jpg?width=800",
  "bose.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bose_QuietComfort_35_II_Wireless_Headphones.jpg?width=800",
  "camera.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Sony_Alpha_7R_IV_body_with_Sony_Zeiss_55mm_lens.jpg?width=800",
  "supreme.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Supreme_Logo.svg?width=800",
  "bape.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bape_Store_Harajuku_2015.jpg?width=800",
  "palace.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Palace_Logo.jpg?width=800",
  "stussy.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/St%C3%BCssy_KL_230509.jpg?width=800",
  "chrome-hearts.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Chrome_Hearts_bracelet.jpg?width=800",
  "offwhite.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Off-White_x_Nike_Air_Force_1_%22MCA%22.png?width=800",
  "ambush.jpg":
    "https://commons.wikimedia.org/wiki/Special:FilePath/AMBUSH_x_Nike_Air_Max_180_High_Mens%27_sneakers.png?width=800",
};

const COPIES = {
  "nb-991.jpg": "nb-990.jpg",
  "nb-992.jpg": "nb-990.jpg",
  "nb-993.jpg": "nb-990.jpg",
  "yeezy-700.jpg": "yeezy-350.jpg",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

function isJpeg(buf) {
  return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

async function download(url) {
  let last = "no response";
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "image/*" },
      redirect: "follow",
    });
    if (res.status === 429 || res.status >= 500) {
      last = `HTTP ${res.status}`;
      await sleep(1200 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`${url} HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`${url} ${last}`);
}

mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(FILES)) {
  const raw = await download(url);
  const buf = toJpeg(raw);
  if (!isJpeg(buf)) throw new Error(`${name} is not a JPEG`);
  writeFileSync(join(outDir, name), buf);
  console.log("saved", name, buf.length);
  await sleep(250);
}

for (const [dest, src] of Object.entries(COPIES)) {
  copyFileSync(join(outDir, src), join(outDir, dest));
  console.log("copied", dest, "from", src);
}
