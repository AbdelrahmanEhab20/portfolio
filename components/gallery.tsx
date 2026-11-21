"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneFrame } from "./phone-frame";

type Shot = { src: string; mobile: boolean };

export function Gallery({ title, desktop, mobile }: { title: string; desktop: string[]; mobile: string[] }) {
  const shots: Shot[] = [...desktop.map((src) => ({ src, mobile: false })), ...mobile.map((src) => ({ src, mobile: true }))];
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  if (shots.length === 0) return null;
  const current = index === null ? null : shots[index];

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
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full ${current.mobile ? "aspect-[9/19.5] max-h-[85vh] max-w-[min(390px,40vh)]" : "aspect-[16/10] max-w-6xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={`${title} screenshot ${index! + 1}`} fill sizes="100vw" className="rounded-xl object-contain" />
            </motion.div>

            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X size={18} />
            </button>
            {shots.length > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous screenshot" className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next screenshot" className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRight size={20} />
                </button>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/70">
                  {index! + 1} / {shots.length}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
