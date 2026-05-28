// Generates all icon assets from public/logo.png
// Usage: node scripts/process-logo.mjs
// Requires: npm install --save-dev sharp

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, writeFileSync } from "fs";

// Wraps a PNG buffer into a valid ICO container (PNG-in-ICO, Vista+ format).
// sharp cannot write real .ico files — this does it manually.
function pngToIco(pngBuf, size) {
  const ICONDIR_SIZE = 6;
  const ICONDIRENTRY_SIZE = 16;
  const dataOffset = ICONDIR_SIZE + ICONDIRENTRY_SIZE;

  const header = Buffer.alloc(ICONDIR_SIZE);
  header.writeUInt16LE(0, 0);  // reserved
  header.writeUInt16LE(1, 2);  // type: 1 = icon
  header.writeUInt16LE(1, 4);  // image count

  const entry = Buffer.alloc(ICONDIRENTRY_SIZE);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2);   // color count
  entry.writeUInt8(0, 3);   // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(pngBuf.length, 8);  // bytes in image
  entry.writeUInt32LE(dataOffset, 12);    // offset to image data

  return Buffer.concat([header, entry, pngBuf]);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO = join(ROOT, "public", "logo.png");

if (!existsSync(LOGO)) {
  console.error("❌  public/logo.png not found. Save the logo image there first.");
  process.exit(1);
}

const meta = await sharp(LOGO).metadata();
const size = Math.min(meta.width, meta.height);

// The logo is a rounded-square with black BG + white circle (≈85% of image).
// We extract the inner circle region to get a clean logo without black corners.
const innerSize = Math.round(size * 0.86);
const offset = Math.round((size - innerSize) / 2);

const circleBuf = await sharp(LOGO)
  .extract({ left: offset, top: offset, width: innerSize, height: innerSize })
  .toBuffer();

// Apply a circular mask so corners are transparent (PNG with alpha)
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${innerSize}" height="${innerSize}">
    <circle cx="${innerSize / 2}" cy="${innerSize / 2}" r="${innerSize / 2}" fill="white"/>
  </svg>`
);

const circleTransparent = await sharp(circleBuf)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

// ── 1. app/favicon.ico (proper ICO container with embedded PNG) ───────────────
const pngFor32 = await sharp(circleTransparent).resize(32, 32).png().toBuffer();
const pngFor16 = await sharp(circleTransparent).resize(16, 16).png().toBuffer();
// Multi-size ICO: 32×32 + 16×16
const ICONDIR_SIZE = 6;
const ENTRY_SIZE = 16;
const countBuf = Buffer.alloc(ICONDIR_SIZE);
countBuf.writeUInt16LE(0, 0);
countBuf.writeUInt16LE(1, 2);
countBuf.writeUInt16LE(2, 4); // 2 images
const offset32 = ICONDIR_SIZE + ENTRY_SIZE * 2;
const offset16 = offset32 + pngFor32.length;
const e32 = Buffer.alloc(ENTRY_SIZE);
e32.writeUInt8(32, 0); e32.writeUInt8(32, 1); e32.writeUInt8(0, 2); e32.writeUInt8(0, 3);
e32.writeUInt16LE(1, 4); e32.writeUInt16LE(32, 6);
e32.writeUInt32LE(pngFor32.length, 8); e32.writeUInt32LE(offset32, 12);
const e16 = Buffer.alloc(ENTRY_SIZE);
e16.writeUInt8(16, 0); e16.writeUInt8(16, 1); e16.writeUInt8(0, 2); e16.writeUInt8(0, 3);
e16.writeUInt16LE(1, 4); e16.writeUInt16LE(32, 6);
e16.writeUInt32LE(pngFor16.length, 8); e16.writeUInt32LE(offset16, 12);
writeFileSync(join(ROOT, "app", "favicon.ico"), Buffer.concat([countBuf, e32, e16, pngFor32, pngFor16]));
console.log("✅  app/favicon.ico (32×32 + 16×16, ICO vàlid)");

// ── 2. app/icon.png (used by Next.js for <link rel="icon">) ──────────────────
await sharp(circleTransparent)
  .resize(32, 32)
  .toFile(join(ROOT, "app", "icon.png"));
console.log("✅  app/icon.png (32×32)");

// ── 3. app/apple-icon.png ─────────────────────────────────────────────────────
await sharp(circleTransparent)
  .resize(180, 180)
  .toFile(join(ROOT, "app", "apple-icon.png"));
console.log("✅  app/apple-icon.png (180×180)");

// ── 4. app/opengraph-image.png (1200×630, white bg + logo + text) ─────────────
const ogLogoSize = 240;
const ogLogo = await sharp(circleTransparent).resize(ogLogoSize, ogLogoSize).toBuffer();

const textSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="100">
    <text font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold"
      fill="#111827" x="250" y="72" text-anchor="middle">Verblop</text>
  </svg>`
);

const logoLeft = Math.round((1200 - ogLogoSize - 40 - 500) / 2);
const textLeft = logoLeft + ogLogoSize + 40;
const topCenter = Math.round((630 - ogLogoSize) / 2);
const textTop = Math.round((630 - 100) / 2) + 8;

const og = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([
    { input: ogLogo, left: logoLeft, top: topCenter },
    { input: textSvg, left: textLeft, top: textTop },
  ])
  .png()
  .toBuffer();

await sharp(og).toFile(join(ROOT, "app", "opengraph-image.png"));
console.log("✅  app/opengraph-image.png (1200×630)");

// ── 5. PWA icons (public/) ────────────────────────────────────────────────────
await sharp(circleTransparent).resize(192, 192).toFile(join(ROOT, "public", "logo-192.png"));
console.log("✅  public/logo-192.png (192×192)");

await sharp(circleTransparent).resize(512, 512).toFile(join(ROOT, "public", "logo-512.png"));
console.log("✅  public/logo-512.png (512×512)");

// ── Done ──────────────────────────────────────────────────────────────────────
console.log("\n🎉  Tots els assets generats. Ara executa: npm run build");
