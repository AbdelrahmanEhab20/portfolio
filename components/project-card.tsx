"use client";

import Link from "next/link";
import { ArrowUpRight, Lock, Play } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { ProjectCover } from "./project-cover";
import { Chip } from "./ui";
import { GithubIcon } from "./icons";
import type { Project } from "@/content/projects";

export type CardProject = Pick<
  Project,
  "slug" | "title" | "tagline" | "year" | "type" | "stack" | "links" | "private" | "status" | "categories"
> & { cover: string | null };

const linkIcon = {
  live: <ArrowUpRight size={14} />,
  demo: <Play size={13} />,
  github: <GithubIcon size={13} />,
  other: <ArrowUpRight size={14} />,
};

export function ProjectCard({ project, large = false }: { project: CardProject; large?: boolean }) {
  // Spotlight that follows the cursor along the card border.
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const border = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgb(59 130 246 / 0.55), transparent 65%)`;
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const kinds = Array.from(new Set(project.links.map((l) => l.kind)));

  return (
    <motion.article
      onPointerMove={onMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative h-full rounded-2xl p-px"
    >
      {/* border + glow layers */}
      <div aria-hidden className="absolute inset-0 rounded-2xl bg-line transition-colors group-hover:bg-line-strong" />
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: border }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-surface shadow-[0_20px_60px_-30px_var(--glow)]">
        <div className={`relative overflow-hidden border-b border-line ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <ProjectCover
            title={project.title}
            src={project.cover}
            type={project.type}
            sizes={large ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {project.private && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[11px] text-white backdrop-blur">
              <Lock size={11} /> Private
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={`font-semibold tracking-tight ${large ? "text-xl" : "text-lg"}`}>
              <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {project.title}
              </Link>
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack
                .filter((s) => !s.startsWith("TODO"))
                .slice(0, 4)
                .map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
            </div>
            <div className="flex shrink-0 gap-1 text-muted" aria-hidden>
              {kinds.map((k) => (
                <span key={k} className="grid size-7 place-items-center rounded-full border border-line">
                  {linkIcon[k]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
