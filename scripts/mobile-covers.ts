/**
 * Builds cover.webp for mobile-only projects from their phone screenshots
 * (m01.webp, m02.webp...), using the same PhoneFrame as the gallery.
 *
 * Needs the dev server running:  npm run dev   then   npm run covers [-- --force] [slug...]
 * Set COVERS_URL if the dev server isn't on http://localhost:3000.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";
import { projects } from "../content/projects";

const base = process.env.COVERS_URL ?? "http://localhost:3000";
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const list = (slug: string) => {
  try {
    return fs.readdirSync(path.join("public", "projects", slug));
  } catch {
    return [];
  }
};

const targets = projects.filter((p) => {
  const files = list(p.slug);
  return (
    p.mobile &&
    files.some((f) => /^m\d+\./.test(f)) &&
    !files.some((f) => /^\d+\./.test(f)) && // no desktop shots
    (only.length === 0 || only.includes(p.slug))
  );
});

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 600 }, deviceScaleFactor: 2 });
  try {
    for (const p of targets) {
      const dest = path.join("public", "projects", p.slug, "cover.webp");
      if (fs.existsSync(dest) && !force) {
        console.log(`skip  ${dest} (exists)`);
        continue;
      }
      await page.goto(`${base}/cover-studio/${p.slug}`, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: "header, footer, nextjs-portal { display: none !important }" });
      await page.waitForFunction(() =>
        Array.from(document.querySelectorAll<HTMLImageElement>("#cover img")).every((i) => i.complete && i.naturalWidth > 0),
      );
      await page.waitForTimeout(600); // let the route fade-in finish
      const png = await page.locator("#cover").screenshot({ type: "png" });
      await sharp(png).webp({ quality: 85 }).toFile(dest);
      console.log(`saved ${dest}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
