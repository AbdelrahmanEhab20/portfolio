import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowUpRight, Briefcase, Globe, Layers, LayoutDashboard, MapPin, Server, Smartphone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { ButtonA, Chip, Section } from "../ui";
import { profile, services, skills } from "@/content/projects";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", profile.photo.replace(/^\//, "")));

const facts = [
  { icon: Briefcase, label: "4+ years experience" },
  { icon: Layers, label: "Web + Mobile + Backend" },
  { icon: MapPin, label: "Based in Cairo, working remote with UAE teams" },
];

export function About() {
  const hire = profile.hireUrl || "#contact";
  return (
    <Section id="about" eyebrow="about" title="Shipping products end to end.">
      <div className="grid items-start gap-10 md:grid-cols-[260px_1fr] md:gap-14">
        <Reveal className="mx-auto w-full max-w-[260px]">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface">
            {hasPhoto ? (
              <Image src={profile.photo} alt={profile.shortName} fill sizes="260px" className="object-cover" />
            ) : (
              <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]">
                <Image src="/brand/logo-mark.svg" alt="" width={120} height={120} className="rounded-[25%]" />
              </div>
            )}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-pretty text-lg leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <StaggerItem key={f.label} className="rounded-2xl border border-line bg-surface p-4">
                <f.icon size={18} className="mb-3 text-accent-text" />
                <p className="text-sm leading-snug">{f.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <ButtonA href={hire} external={hire.startsWith("http")}>
              Hire me <ArrowUpRight size={16} />
            </ButtonA>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const serviceIcons = { LayoutDashboard, Smartphone, Server, Globe } as const;

export function Services() {
  return (
    <Section id="services" eyebrow="services" title="What I can build for you." className="!pt-0">
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon as keyof typeof serviceIcons] ?? Globe;
          return (
            <StaggerItem
              key={s.title}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong"
            >
              <span className="mb-5 grid size-10 place-items-center rounded-xl bg-accent/10 text-accent-text">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-text">
                Start a project
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="Tools I work with every day." className="!pt-0">
      <Stagger className="gap-4 md:columns-2 lg:columns-3">
        {Object.entries(skills).map(([group, items]) => (
          <StaggerItem key={group} className="mb-4 break-inside-avoid rounded-2xl border border-line bg-surface p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <Chip key={s} className="!text-xs !text-fg">
                  {s}
                </Chip>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
