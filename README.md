# Abdelrahman Ehab — Portfolio

Personal portfolio of Abdelrahman Ehab, Full Stack Developer. A fully static Next.js site: home page, one detail page per project, light/dark theme, social share images, sitemap.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion · lucide-react · Playwright + sharp (screenshot scripts only)

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all pages prerendered)
npm run start        # serve the production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `content/projects.ts` | **All content**: profile, services, skills, experience, projects, education, certifications, testimonials |
| `public/projects/<slug>/` | Project screenshots (picked up automatically) |
| `public/Abdelrahman_Mohamed_Ehab_CV.pdf` | The "Download CV" file |
| `public/me.webp` | Profile photo for About (optional; the logo is shown until it exists) |
| `public/brand/` | Logo files |
| `app/` | Routes: home, `projects/[slug]`, OG images, `sitemap.ts`, `robots.ts` |
| `components/` | UI: sections, project card, gallery/lightbox, phone frame, theme toggle |
| `scripts/` | `screenshots.ts`, `mobile-covers.ts`, `import-screens.mjs` |

## Add a project

1. Add an entry to the `projects` array in `content/projects.ts`. The `Project` type at the top of the file lists every field. Projects are sorted by `sortDate` (newest first).
   - `featured: true` puts it in the 4 large cards at the top of Projects (it is then left out of "More projects").
   - `categories` drives the filter tabs (Web, Mobile, SaaS, AI, Freelance).
   - `private: true` shows a "Private" badge and "demo available on request".
   - `mobile: true` marks it as a phone app (see covers below).
   - Lines starting with `TODO` are hidden on the site.
2. Add screenshots (next section). Without any, the card shows a placeholder with the title and type.

The detail page, sitemap entry and share image are generated automatically.

## Add screenshots

Put files in `public/projects/<slug>/`:

| File | Used for |
| --- | --- |
| `cover.webp` | Card image and the big image on the detail page (16:10, e.g. 1440×900) |
| `01.webp`, `02.webp`, … | Desktop gallery |
| `m01.webp`, `m02.webp`, … | Mobile gallery, shown inside a phone frame (portrait) |

If there is no `cover.webp`, the first numbered image is used.

**Automatic captures from live sites**:

```bash
npm run screenshots                 # every project with autoScreenshot URLs; skips files that exist
npm run screenshots -- flickit      # only some projects
npm run screenshots -- --force      # overwrite
```

The first URL in `autoScreenshot` becomes `cover.webp` and `m01.webp`, and the others become `01.webp`, `02.webp`, and so on. The first run needs a browser: `npx playwright install chromium`.

**Phone covers for mobile-only apps** (projects with `mobile: true` and only `m*` shots): start `npm run dev` first, then:

```bash
npm run covers                      # add -- --force to regenerate
COVERS_URL=http://localhost:3123 npm run covers   # if dev runs on another port
```

This renders the phones on a transparent background, so the card's own backdrop shows through in both themes. In `app/cover-studio/[slug]/page.tsx`, the `front` map picks which shot sits in front.

**Turning a raw screenshot into a frame**: `node scripts/import-screens.mjs <src.png> <dest.webp> [topCropPx] [bottomCropPx]`. Use the crop values to cut off browser tabs and bars.

**Cutting one section out of a full-page screenshot**: `node scripts/crop-section.mjs <src.png> <dest.webp> <top> <height>`. This saves a 16:10 frame, and pads short sections with the page's own background colour.

> If an updated image still shows the old version locally, delete the `.next` folder and restart (the image optimizer caches by file name).

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New… → Project**, import the repo, and keep the detected defaults (framework Next.js, build `npm run build`). Then click **Deploy**.
3. (After adding a domain) In **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = `https://your-domain` for Production, then redeploy. Until then, canonical URLs, the sitemap and share images use Vercel's production URL automatically.

### Custom domain

1. Buy the domain (e.g. at Namecheap, Porkbun or Cloudflare), or buy it inside Vercel.
2. In Vercel, open **Project → Settings → Domains → Add**, enter `yourdomain.dev`, and also add `www.yourdomain.dev` with a redirect to the apex.
3. At your registrar, create the DNS records Vercel shows. Usually that's an `A` record for `@` pointing to Vercel's IP, and a `CNAME` for `www` pointing to Vercel's CNAME target. Copy the exact values from the Domains page, since they can change.
4. Wait for the domain to verify (minutes, up to a few hours). Vercel issues HTTPS automatically.
5. Set `NEXT_PUBLIC_SITE_URL` to the domain (step 3 above) and redeploy.

## Quality checks

The project was tested with Lighthouse (mobile) on the home page and project pages. Targets: Performance ≥ 95, Accessibility / Best Practices / SEO 100. To re-run against a local production build:

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --view
```
