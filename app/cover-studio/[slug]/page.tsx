import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PhoneFrame } from "@/components/phone-frame";
import { projects } from "@/content/projects";
import { getProjectImages } from "@/lib/images";

/**
 * Dev-only page that lays out a project's mobile shots as a 16:10 cover on a
 * transparent background (phones + shadow only); the card's CSS backdrop shows behind it.
 * `npm run covers` screenshots it into public/projects/<slug>/cover.webp.
 * Returns 404 in production builds.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const mobileOnly = projects.filter((p) => p.mobile && getProjectImages(p.slug).desktop.length === 0);

export function generateStaticParams() {
  return mobileOnly.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: PageProps<"/cover-studio/[slug]">) {
  return (
    <Suspense>
      <Studio params={params} />
    </Suspense>
  );
}

// Which mobile shot goes in front, per project (default: the first). Index into m01, m02...
const front: Record<string, number> = { "tbh-admin": 0 };

async function Studio({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const p = mobileOnly.find((x) => x.slug === slug);
  const shots = p ? getProjectImages(p.slug).mobile : [];
  if (!p || shots.length === 0) notFound();

  const fi = front[slug] ?? 0;
  const main = shots[fi]!;
  const back = shots.find((_, i) => i !== fi);
  const W = 230; // phone width in the 720x450 canvas

  return (
    <div className="grid min-h-dvh place-items-center">
      <div id="cover" className="relative h-[450px] w-[720px] overflow-hidden" data-theme="dark">
        {back && (
          <PhoneFrame
            width={W}
            className="absolute opacity-90"
            style={{ left: 360 - W / 2 + 95, top: 78, transform: "rotate(5deg)" }}
          >
            <Image src={back} alt="" fill sizes={`${W * 2}px`} className="object-cover object-top" priority />
          </PhoneFrame>
        )}
        <PhoneFrame
          width={W}
          className="absolute shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]"
          style={{ left: 360 - W / 2 - (back ? 70 : 0), top: 48 }}
        >
          <Image src={main} alt="" fill sizes={`${W * 2}px`} className="object-cover object-top" priority />
        </PhoneFrame>
      </div>
    </div>
  );
}
