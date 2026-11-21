"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { PhoneFrame } from "./phone-frame";
import { Lightbox, type Shot } from "./lightbox";

export function Gallery({ title, desktop, mobile }: { title: string; desktop: string[]; mobile: string[] }) {
  // One sequence: desktop shots first, then mobile ones (shown in a phone frame).
  const shots: Shot[] = [
    ...desktop.map((src, i) => ({ src, mobile: false, alt: `${title} screenshot ${i + 1}` })),
    ...mobile.map((src, i) => ({ src, mobile: true, alt: `${title} mobile screenshot ${i + 1}` })),
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
          {mobile.map((src, i) => (
            <li key={src}>
              <button type="button" onClick={() => open(desktop.length + i)} aria-label={`Open mobile screenshot ${i + 1} of ${title}`} className="group block">
                <PhoneFrame>
                  <Image src={src} alt={`${title} mobile screenshot ${i + 1}`} fill sizes="200px" className="object-cover object-top" />
                </PhoneFrame>
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
