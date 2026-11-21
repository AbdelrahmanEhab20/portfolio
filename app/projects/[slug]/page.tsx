import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, Play } from "lucide-react";
import { Reveal } from "@/components/motion";
import { ProjectCover } from "@/components/project-cover";
import { Gallery } from "@/components/gallery";
import { GithubIcon } from "@/components/icons";
import { ButtonA, Chip } from "@/components/ui";
import { sortedProjects } from "@/lib/projects";
import { getProjectImages } from "@/lib/images";

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = sortedProjects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.tagline,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, type: "article", url: `/projects/${p.slug}` },
    twitter: { card: "summary_large_image", title: p.title, description: p.tagline },
  };
}

const isTodo = (s: string) => s.trim().startsWith("TODO");

// Every slug is prerendered; the Suspense shell only shows during client navigation.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="container-page min-h-[80vh] pt-32" aria-busy="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = sortedProjects[i]!;
  const prev = sortedProjects[i - 1];
  const next = sortedProjects[i + 1];
  const img = getProjectImages(p.slug);
  const gallery = img.desktop.filter((s) => s !== img.cover);

  const meta = [
    { k: "Year", v: p.year },
    { k: "Role", v: p.role },
    { k: "Type", v: p.type },
    { k: "Status", v: p.status },
    ...(p.company ? [{ k: "Company", v: p.company }] : []),
  ];

  const whatIDid = p.whatIDid.filter((s) => !isTodo(s));
  const features = p.features.filter((s) => !isTodo(s));
  const stack = p.stack.filter((s) => !isTodo(s));

  return (
    <article className="container-page pb-24 pt-28 sm:pt-32">
      <div>
        <div className="hero-in" style={{ animationDelay: "0.00s" }}>
          <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={15} /> All projects
          </Link>
        </div>
        <div className="hero-in" style={{ animationDelay: "0.04s" }}>
          <h1 className="text-balance-tight mt-6 text-4xl font-semibold sm:text-6xl">{p.title}</h1>
        </div>
        <div className="hero-in" style={{ animationDelay: "0.08s" }}>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">{p.tagline}</p>
        </div>

        <div className="hero-in" style={{ animationDelay: "0.12s" }}>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:flex sm:flex-wrap sm:gap-x-10">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{m.k}</dt>
                <dd className="mt-1 text-sm">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-in mt-6 flex flex-wrap gap-2.5" style={{ animationDelay: "0.16s" }}>
          {p.links.map((l, idx) => (
            <ButtonA key={l.url} href={l.url} external variant={idx === 0 ? "primary" : "ghost"}>
              {l.kind === "demo" ? <Play size={15} /> : l.kind === "github" ? <GithubIcon size={15} /> : null}
              {l.label}
              <ArrowUpRight size={15} />
            </ButtonA>
          ))}
        </div>
        {p.private && (
          <div className="hero-in" style={{ animationDelay: "0.20s" }}>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
              <Lock size={14} /> Private platform — demo available on request
            </p>
          </div>
        )}

        <div className="hero-in" style={{ animationDelay: "0.24s" }}>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-50px_var(--glow)]">
            <ProjectCover title={p.title} type={p.type} src={img.cover} sizes="(min-width: 1152px) 1120px, 100vw" priority />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_300px]">
        <div className="space-y-14">
          <Reveal>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="text-pretty text-lg leading-relaxed text-muted">{p.overview}</p>
          </Reveal>
          {whatIDid.length > 0 && (
            <Reveal>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">What I did</h2>
              <BulletList items={whatIDid} />
            </Reveal>
          )}
          {features.length > 0 && (
            <Reveal>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Key features</h2>
              <BulletList items={features} />
            </Reveal>
          )}
        </div>
        {stack.length > 0 && (
          <Reveal>
            <aside className="rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <Chip key={s} className="!text-xs !text-fg">
                    {s}
                  </Chip>
                ))}
              </div>
            </aside>
          </Reveal>
        )}
      </div>

      {(gallery.length > 0 || img.mobile.length > 0) && (
        <Reveal className="mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Gallery</h2>
          <Gallery title={p.title} desktop={gallery} mobile={img.mobile} />
        </Reveal>
      )}

      <nav aria-label="More projects" className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" /> Previous
            </span>
            <span className="mt-2 block font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-surface">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              Next <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-2 block font-medium">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}
