import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/projects";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const logo = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public", "brand", "logo-mark.svg"),
).toString("base64")}`;

/** Shared social card: dark background, logo mark, a title block and a footer line. */
export function renderOg({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0f1a",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 100% 100%, rgba(15,95,215,0.35), transparent 50%)",
          color: "#e6eaf0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={64} height={64} alt="" style={{ borderRadius: 16 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>{profile.shortName}</span>
            <span style={{ fontSize: 18, letterSpacing: 3, color: "#93a4b8" }}>
              {profile.title.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#6ea3ff" }}>{eyebrow}</span>
          <span style={{ fontSize: title.length > 28 ? 64 : 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {title}
          </span>
          <span style={{ fontSize: 30, color: "#93a4b8", lineHeight: 1.35, maxWidth: 980 }}>{subtitle}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#93a4b8" }}>
          <span>{footer}</span>
          <span style={{ display: "flex", width: 120, height: 6, borderRadius: 3, background: "linear-gradient(90deg, #3b82f6, #0f5fd7)" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
