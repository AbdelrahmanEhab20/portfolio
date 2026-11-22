"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { PhoneFrame } from "./phone-frame";
import { Lightbox, type Shot } from "./lightbox";

export type MobileShot = { src: string; framed: boolean };

export function Gallery({ title, desktop, mobile }: { title: string; desktop: string[]; mobile: MobileShot[] }) {
  // One sequence: desktop shots first, then mobile ones (in a phone frame unless `framed` is false,
  // e.g. store graphics that already show a phone).
  const shots: Shot[] = [
    ...desktop.map((src, i) => ({ src, mobile: false, framed: false, alt: `${title} screenshot ${i + 1}` })),
    ...mobile.map((m, i) => ({ src: m.src, mobile: true, framed: m.framed, alt: `${title} mobile screenshot ${i + 1}` })),
  ];
  const [index, setIndex] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    // Return focus to the thumbnail that opened the viewer.
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);

  if (shots.length === 0) return null;

  return (
    <>
      {desktop.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {desktop.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface-2"
                aria-label={`Open screenshot ${i + 1} of ${title}`}
              >
                <Image src={src} alt={`${title} screenshot ${i + 1}`} fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {mobile.length > 0 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-6 sm:justify-start">
          {mobile.map(({ src, framed }, i) => (
            <li key={src}>
              <button type="button" onClick={() => open(desktop.length + i)} aria-label={`Open mobile screenshot ${i + 1} of ${title}`} className="group block">
                {framed ? (
                  <PhoneFrame>
                    <Image src={src} alt={`${title} mobile screenshot ${i + 1}`} fill sizes="200px" className="object-cover object-top" />
                  </PhoneFrame>
                ) : (
                  <span className="relative block aspect-[921/2000] w-[180px] overflow-hidden rounded-[1.4rem] border border-line bg-surface-2 shadow-[0_30px_60px_-30px_var(--glow)] transition-transform duration-300 group-hover:-translate-y-1 sm:w-[200px]">
                    <Image src={src} alt={`${title} mobile screenshot ${i + 1}`} fill sizes="200px" className="object-cover" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {index !== null && <Lightbox shots={shots} startIndex={index} title={title} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
