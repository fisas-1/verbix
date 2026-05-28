// Generates all icon assets from public/logo.png
// Usage: node scripts/process-logo.mjs
// Requires: npm install --save-dev sharp

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

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

// ── 1. app/favicon.ico (PNG data — accepted by all modern browsers) ──────────
await sharp(circleTransparent)
  .resize(48, 48)
  .toFile(join(ROOT, "app", "favicon.ico"));
console.log("✅  app/favicon.ico (48×48)");

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
