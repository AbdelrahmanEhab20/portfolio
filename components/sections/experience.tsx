import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../motion";
import { Chip, Section } from "../ui";
import { experience, projects } from "@/content/projects";

export function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've worked.">
      <ol className="relative ml-1.5 border-l border-line">
        {experience.map((job, i) => {
          const related = (("projects" in job ? job.projects : []) ?? [])
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p) => !!p);
          const links = "links" in job ? job.links : [];
          return (
            <li key={job.company} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden
                className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-bg ${
                  i === 0 ? "bg-accent shadow-[0_0_0_4px_var(--glow)]" : "bg-line-strong"
                }`}
              />
              <Reveal>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {job.role} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-muted">{job.dates}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {job.location}
                  {"note" in job && job.note ? ` · ${job.note}` : ""}
                </p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
                  {job.bullets.map((b) => (
                    <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line-strong">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
                {(related.length > 0 || links?.length) && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {related.map((p) => (
                      <Link key={p.slug} href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 text-accent-text hover:underline">
                        {p.title} <ArrowUpRight size={14} />
                      </Link>
                    ))}
                    {links?.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-text hover:underline">
                        {l.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
