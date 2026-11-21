// Cut one section out of a full-page screenshot as a 16:10 gallery frame.
// Sections shorter than 16:10 are padded top/bottom with the page's own background colour.
// Usage: node scripts/crop-section.mjs <src.png> <dest.webp> <top> <height>
import sharp from "sharp";
const [src, dest, topArg, heightArg] = process.argv.slice(2);
const { width, height } = await sharp(src).metadata();
const top = Number(topArg);
const h = Math.min(Number(heightArg), height - top);
const target = Math.round((width * 10) / 16);
// background = colour of the pixel just inside the left edge at the crop's first row
const { data } = await sharp(src).extract({ left: 4, top, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
const background = { r: data[0], g: data[1], b: data[2] };
let img = sharp(src).extract({ left: 0, top, width, height: h });
if (h < target) {
  const pad = target - h;
  img = sharp(await img.png().toBuffer()).extend({ top: Math.floor(pad / 2), bottom: Math.ceil(pad / 2), background });
}
await sharp(await img.png().toBuffer()).resize({ width: 1440 }).webp({ quality: 82 }).toFile(dest);
console.log("ok", dest, `bg rgb(${background.r},${background.g},${background.b})`);
