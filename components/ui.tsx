import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "./motion";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`container-page py-20 sm:py-28 ${className}`} aria-labelledby={`${id}-title`}>
      <Reveal className="mb-10 max-w-2xl sm:mb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent-text">{`// ${eyebrow}`}</p>
        <h2 id={`${id}-title`} className="text-balance-tight text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-pretty leading-relaxed text-muted">{intro}</p>}
      </Reveal>
      {children}
    </section>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted ${className}`}
    >
      {children}
    </span>
  );
}

const btn = {
  primary:
    "bg-accent-gradient text-white shadow-[0_8px_30px_-8px_var(--glow)] hover:brightness-110",
  ghost: "border border-line-strong text-fg hover:bg-surface-2",
};

type BtnProps = { variant?: keyof typeof btn; className?: string; children: ReactNode };
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[filter,background-color,transform] active:scale-[0.98]";

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: BtnProps & ComponentProps<typeof Link>) {
  return (
    <Link className={`${btnBase} ${btn[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonA({
  variant = "primary",
  className = "",
  children,
  external,
  ...rest
}: BtnProps & ComponentProps<"a"> & { external?: boolean }) {
  return (
    <a
      className={`${btnBase} ${btn[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function initials(title: string) {
  return title
    .replace(/[—–-].*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
