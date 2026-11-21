/**
 * Captures project screenshots from the public URLs in content/projects.ts.
 *
 *   npm run screenshots              # only missing files
 *   npm run screenshots -- --force   # overwrite everything it captures
 *   npm run screenshots -- flickit   # only these slugs
 *
 * For each project with `autoScreenshot` URLs:
 *   URL 1 -> cover.webp (1440x900 @2x) and m01.webp (390x844 @3x)
 *   URL 2 -> 01.webp, URL 3 -> 02.webp, ...
 * Object entries ({ url, file, theme?, mobile? }) capture exactly that file instead,
 * e.g. cover in dark theme and 02 in light theme.
 * Existing files are never overwritten without --force, so manual screenshots are safe.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";
import { projects, type ScreenshotShot } from "../content/projects";

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const outRoot = path.join(process.cwd(), "public", "projects");

// Common "accept / close" buttons on cookie and promo banners.
const dismissSelectors = [
  "#onetrust-accept-btn-handler",
  "button#accept-cookies",
  "[aria-label='Close']",
  "button:has-text('Accept all')",
  "button:has-text('Accept')",
  "button:has-text('I agree')",
  "button:has-text('Got it')",
  "button:has-text('Allow all')",
  "button:has-text('موافق')",
  "button:has-text('قبول')",
];

async function dismissBanners(page: Page) {
  for (const sel of dismissSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 300 })) {
        await el.click({ timeout: 1000 });
        await page.waitForTimeout(300);
      }
    } catch {}
  }
}

async function isBlank(png: Buffer) {
  const { channels } = await sharp(png).stats();
  return channels.slice(0, 3).every((c) => c.stdev < 6);
}

async function capture(
  browser: Browser,
  url: string,
  dest: string,
  device: { width: number; height: number; scale: number; mobile?: boolean },
  colorScheme?: "dark" | "light",
) {
  if (fs.existsSync(dest) && !force) {
    console.log(`  skip  ${path.relative(process.cwd(), dest)} (exists)`);
    return;
  }
  const ctx = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.scale,
    isMobile: device.mobile ?? false,
    hasTouch: device.mobile ?? false,
    reducedMotion: "reduce",
    locale: "en-US",
    ...(colorScheme ? { colorScheme } : {}),
  });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 }).catch(async () => {
      // Some sites never go fully idle (analytics, sockets) — settle for "load".
      await page.waitForLoadState("load", { timeout: 15_000 });
    });
    await page.waitForTimeout(1500);
    await dismissBanners(page);
    // Scroll through once so lazy-loaded images and entrance animations fire.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    let png = await page.screenshot({ type: "png" });
    // A near-uniform image means the page hadn't painted yet: wait and retry once.
    if (await isBlank(png)) {
      await page.waitForTimeout(5000);
      png = await page.screenshot({ type: "png" });
      if (await isBlank(png)) console.warn(`  WARN  ${url} still looks blank`);
    }
    await sharp(png).webp({ quality: 82 }).toFile(dest);
    console.log(`  saved ${path.relative(process.cwd(), dest)}`);
  } catch (e) {
    console.warn(`  FAIL  ${url}: ${(e as Error).message.split("\n")[0]}`);
  } finally {
    await ctx.close();
  }
}

const desktop = { width: 1440, height: 900, scale: 2 };
const mobile = { width: 390, height: 844, scale: 3, mobile: true };

async function main() {
  const targets = projects.filter(
    (p) => p.autoScreenshot?.length && (only.length === 0 || only.includes(p.slug)),
  );
  if (targets.length === 0) return console.log("Nothing to capture.");

  const browser = await chromium.launch();
  try {
    for (const p of targets) {
      console.log(`\n${p.slug}`);
      const dir = path.join(outRoot, p.slug);
      fs.mkdirSync(dir, { recursive: true });
      const entries = p.autoScreenshot!;
      const shots = entries.filter((e): e is ScreenshotShot => typeof e !== "string");
      if (shots.length > 0) {
        for (const s of shots) {
          const device = s.mobile ? mobile : desktop;
          await capture(browser, s.url, path.join(dir, `${s.file}.webp`), device, s.theme);
        }
        continue;
      }
      const urls = entries as string[];
      for (const [i, url] of urls.entries()) {
        const name = i === 0 ? "cover" : String(i).padStart(2, "0");
        await capture(browser, url, path.join(dir, `${name}.webp`), desktop);
      }
      await capture(browser, urls[0]!, path.join(dir, "m01.webp"), mobile);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
