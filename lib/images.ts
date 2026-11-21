import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ProjectImages = {
  cover: string | null;
  desktop: string[]; // 01.webp, 02.webp ...
  mobile: string[]; // m01.webp, m02.webp ...
};

const exts = /\.(webp|png|jpe?g|avif)$/i;

/**
 * Reads public/projects/<slug>/ at build time.
 * Drop files named cover.webp, 01.webp, m01.webp... and they show up automatically.
 */
export function getProjectImages(slug: string): ProjectImages {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => exts.test(f)).sort();
  } catch {
    return { cover: null, desktop: [], mobile: [] };
  }
  const url = (f: string) => `/projects/${slug}/${f}`;
  const cover = files.find((f) => /^cover\./i.test(f));
  const desktop = files.filter((f) => /^\d+\./.test(f)).map(url);
  const mobile = files.filter((f) => /^m\d+\./i.test(f)).map(url);
  return {
    cover: cover ? url(cover) : (desktop[0] ?? null),
    desktop,
    mobile,
  };
}
