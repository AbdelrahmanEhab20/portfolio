import { Award, GraduationCap } from "lucide-react";
import { Stagger, StaggerItem } from "../motion";
import { Section } from "../ui";
import { certifications, education, testimonials } from "@/content/projects";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow="testimonials" title="What people say.">
      <Stagger className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <StaggerItem key={t.name} className="rounded-2xl border border-line bg-surface p-6">
            <blockquote className="text-pretty leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
            <p className="mt-4 text-sm font-medium">{t.name}</p>
            <p className="text-sm text-muted">{t.role}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" eyebrow="education" title="Education & certifications.">
      <Stagger className="grid gap-4 md:grid-cols-2">
        <StaggerItem className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <GraduationCap size={16} className="text-accent-text" /> Education
          </h3>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-medium">{e.title}</p>
                  <p className="font-mono text-xs text-muted">{e.dates}</p>
                </div>
                <p className="text-sm text-muted">{e.org}</p>
                {"note" in e && e.note && <p className="mt-1 text-sm text-muted">{e.note}</p>}
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <Award size={16} className="text-accent-text" /> Certifications
          </h3>
          <ul className="space-y-2.5 text-sm">
            {certifications.map((c) => {
              const [name, by] = c.split(" — ");
              return (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    {name}
                    {by && <span className="text-muted"> — {by}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
