"use client";

import { Check, Copy, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "../motion";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { profile } from "@/content/projects";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { }
  };

  const channels = [
    { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={18} /> },
    { href: profile.github, label: "GitHub", icon: <GithubIcon size={18} /> },
    { href: profile.whatsapp, label: `WhatsApp  ${profile.phone}`, icon: <WhatsappIcon size={18} /> },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-15 sm:py-21">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 h-96 w-[760px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(59_130_246/0.28),transparent)]" />
        <div className="relative">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent-text">{"// contact"}</p>
          <h2 id="contact-title" className="text-balance-tight text-4xl font-semibold sm:text-6xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Have a product, a dashboard or an app in mind? Send me a message and I&apos;ll get back to you.
          </p>

          <div className="mx-auto mt-9 flex max-w-md items-center gap-1 rounded-full border border-line-strong bg-bg/60 p-1.5 pl-5 backdrop-blur">
            <Mail size={16} className="shrink-0 text-muted" />
            <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate text-left text-sm hover:text-accent-text sm:text-base">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="relative inline-flex h-9 w-[92px] shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-accent-gradient text-sm font-medium text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email copied to clipboard" : ""}
          </span>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {c.icon} {c.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-xs text-muted">{profile.location}</p>
        </div>
      </Reveal>
    </section>
  );
}
