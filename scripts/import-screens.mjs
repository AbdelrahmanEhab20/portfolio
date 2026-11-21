// One-off helper: turn a raw screenshot into a 1440px-wide WebP frame (max 16:10 tall).
// Usage: node scripts/import-screens.mjs <src.png> <dest.webp> [topCropPx] [bottomCropPx]
import sharp from "sharp";
const [src, dest, top = "0", bottom = "0"] = process.argv.slice(2);
const { width, height } = await sharp(src).metadata();
const t = Number(top), b = Number(bottom);
const h = Math.min(height - t - b, Math.round((width * 900) / 1440));
await sharp(src).extract({ left: 0, top: t, width, height: h })
  .resize({ width: 1440 }).webp({ quality: 82 }).toFile(dest);
console.log("ok", dest);
