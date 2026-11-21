import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { projects } from "@/content/projects";

export const alt = "Project by Abdelrahman Ehab";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return renderOg({ eyebrow: "PROJECT", title: "Project", subtitle: "", footer: "" });
  }
  const stack = p.stack.filter((s) => !s.startsWith("TODO")).slice(0, 5).join(" · ");
  return renderOg({
    eyebrow: `${p.type.toUpperCase()} · ${p.year}`,
    title: p.title,
    subtitle: p.tagline,
    footer: stack || p.role,
  });
}
