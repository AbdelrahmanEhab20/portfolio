import Image from "next/image";
import type { ReactNode } from "react";

/** The card background: soft blue glows over a faint dot pattern. Shared by placeholders and phone covers. */
export function CardBackdrop({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-surface-2 bg-[radial-gradient(120%_90%_at_15%_0%,rgb(59_130_246/0.28),transparent_55%),radial-gradient(90%_80%_at_100%_100%,rgb(15_95_215/0.30),transparent_60%)] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1.4px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black_35%,transparent_85%)]"
      />
      {children}
    </div>
  );
}

/**
 * Cover image over the card backdrop (transparent covers, e.g. generated phone covers,
 * let the theme-aware backdrop show through), or a placeholder with title and type.
 */
export function ProjectCover({
  title,
  type,
  src,
  sizes,
  priority,
  className = "",
}: {
  title: string;
  type?: string;
  src: string | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <>
        <CardBackdrop className={className} />
        <Image
          src={src}
          alt={`${title} screenshot`}
          fill
          sizes={sizes}
          {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
          className={`object-cover object-top ${className}`}
        />
      </>
    );
  }
  return (
    <CardBackdrop className={className}>
      <div
        role="img"
        aria-label={`${title}${type ? ` — ${type}` : ""}. Screenshots coming soon.`}
        className="relative flex size-full flex-col items-center justify-center gap-2 px-6 text-center"
      >
        <span className="text-balance-tight text-2xl font-semibold text-fg/90 sm:text-3xl">
          {title}
        </span>
        {type && (
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{type}</span>
        )}
      </div>
    </CardBackdrop>
  );
}
