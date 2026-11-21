"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard, type CardProject } from "../project-card";

const filters = ["All", "Web", "Mobile", "SaaS", "AI", "Freelance"] as const;
type Filter = (typeof filters)[number];

export function ProjectsGrid({ projects }: { projects: CardProject[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          if (count === 0) return null;
          const selected = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={selected}
              aria-controls="projects-panel"
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                selected ? "text-white" : "text-muted hover:text-fg"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent-gradient"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">
                {f} <span className={`font-mono text-[11px] ${selected ? "text-white/70" : "text-muted/70"}`}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="projects-panel" role="tabpanel" aria-label={`${filter} projects`}>
      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      </div>
    </div>
  );
}
