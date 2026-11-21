import Image from "next/image";
import { initials } from "./ui";

/** Cover screenshot, or a tidy gradient placeholder with the project's initials. */
export function ProjectCover({
  title,
  src,
  tags = [],
  sizes,
  priority,
  className = "",
}: {
  title: string;
  src: string | null;
  tags?: string[];
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${title} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${title} — screenshot coming soon`}
      className={`absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(120%_90%_at_20%_0%,rgb(59_130_246/0.35),transparent_55%),radial-gradient(90%_80%_at_100%_100%,rgb(15_95_215/0.35),transparent_60%)] bg-surface-2 ${className}`}
    >
      <div aria-hidden className="hero-grid absolute inset-0 opacity-70" />
      <div className="relative flex flex-col items-center gap-3">
        <span className="text-5xl font-semibold tracking-tight text-fg/85 sm:text-6xl">{initials(title)}</span>
        {tags.length > 0 && (
          <span className="font-mono text-[11px] text-muted">{tags.slice(0, 3).join(" · ")}</span>
        )}
      </div>
    </div>
  );
}
