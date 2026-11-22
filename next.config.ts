import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy: only what the site actually loads.
// - Scripts: own origin, plus Vercel's script host (Analytics/Speed Insights load from
//   /_vercel/* on Vercel, and from va.vercel-scripts.com in debug/dev mode).
//   'unsafe-inline' is required because every page is prerendered: Next.js streams page
//   data in inline <script> tags and the theme script runs inline before paint. Nonces
//   would force dynamic rendering. Dev also needs 'unsafe-eval' for Fast Refresh.
// - Styles: inline style attributes come from Motion animations and next/font.
// - Images: own origin (next/image), data: and blob:. Fonts are self-hosted by next/font.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDev ? " ws: wss:" : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  // Only on Vercel: upgrading would break `npm run start` over plain http://localhost.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
