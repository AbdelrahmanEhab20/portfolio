"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { Stagger, StaggerItem } from "../motion";
import { ButtonA, ButtonLink } from "../ui";
import { GithubIcon, LinkedinIcon } from "../icons";
import { profile } from "@/content/projects";

export function Hero() {
  // Soft spotlight that trails the cursor (desktop pointers only).
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, var(--glow), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const socials = [
    { href: profile.github, label: "GitHub", icon: <GithubIcon size={18} /> },
    { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={18} /> },
    { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={18} /> },
  ];

  return (
    <section
      onPointerMove={onMove}
      className="relative isolate overflow-hidden pb-15 pt-32 sm:pb-21 sm:pt-40"
      aria-label="Introduction"
    >
      {/* background layers */}
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 -z-10" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block" style={{ background: spotlight }} />

      <Stagger onMount stagger={0.08} delay={0.05} className="container-page">
        {profile.availableForFreelance && (
          <StaggerItem>
            <a
              href="#contact"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for freelance work
            </a>
          </StaggerItem>
        )}

        <StaggerItem>
          <p className="mb-3 font-mono text-sm text-accent-text">Hi, I&apos;m</p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="text-balance-tight text-5xl font-semibold leading-[1.02] sm:text-7xl">
            {profile.shortName}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-balance-tight mt-3 bg-gradient-to-r from-fg to-muted bg-clip-text text-3xl font-medium text-transparent sm:text-5xl">
            {profile.title}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{profile.headline}</p>
        </StaggerItem>

        <StaggerItem className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href="/#projects">
            View projects <ArrowRight size={16} />
          </ButtonLink>
          <ButtonA href={profile.cv} download variant="ghost">
            <Download size={16} /> Download CV
          </ButtonA>
          <div className="ml-1 flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="mt-14 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
          <span>{profile.location}</span>
          <span>4+ years experience</span>
          <span>Web · Mobile · Backend</span>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
