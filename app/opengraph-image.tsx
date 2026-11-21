import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { profile } from "@/content/projects";

export const alt = `${profile.shortName} — ${profile.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "PORTFOLIO",
    title: "Web & mobile products, end to end.",
    subtitle: "React, Next.js, TypeScript, Node.js and Flutter — from SaaS dashboards to AI platforms.",
    footer: `${profile.location} · Available for freelance work`,
  });
}
