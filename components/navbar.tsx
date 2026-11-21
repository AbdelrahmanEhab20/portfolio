"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { navLinks } from "@/lib/site";
import { profile } from "@/content/projects";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle band of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  const current = isHome ? active : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href="/" aria-label={`${profile.shortName} — home`} className="flex items-center gap-2.5 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <LogoMark size={30} />
          <span className="hidden sm:inline">{profile.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id} className="relative">
              <Link
                href={`/#${l.id}`}
                className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  current === l.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
              {current === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-1.5 rounded-full bg-accent-gradient px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset] transition-[filter,transform] hover:brightness-110 active:scale-[0.98] sm:inline-flex"
          >
            <Download size={15} /> Download CV
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pb-5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-lg text-muted hover:bg-surface-2 hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv}
                  download
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent-gradient px-4 py-3 font-medium text-white"
                >
                  <Download size={16} /> Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
