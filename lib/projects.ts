import "server-only";
import { projects } from "@/content/projects";
import { getProjectImages } from "./images";
import type { CardProject } from "@/components/project-card";

/** Projects newest first (by sortDate), with cover images resolved from public/. */
export const sortedProjects = [...projects].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

export function toCard(p: (typeof projects)[number]): CardProject {
  return {
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    year: p.year,
    type: p.type,
    stack: p.stack,
    links: p.links,
    private: p.private,
    status: p.status,
    categories: p.categories,
    cover: getProjectImages(p.slug).cover,
  };
}
