"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneFrame } from "./phone-frame";

export type Shot = { src: string; mobile: boolean; alt: string };

// Same `sizes` everywhere a shot is rendered in the viewer, so the preloaded
// neighbours request exactly the file the slide will show (no flash).
const SIZES = { desktop: "(min-width: 1280px) 1152px, 100vw", mobile: "420px" } as const;

const slide = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
};

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

/** Full-screen carousel for project screenshots. Render it only while open. */
export function Lightbox({
  shots,
  startIndex,
  title,
  onClose,
}: {
  shots: Shot[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [[index, dir], setState] = useState<[number, number]>([startIndex, 0]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const phoneWidth = usePhoneWidth();
  const many = shots.length > 1;
  const n = shots.length;

  const go = useCallback(
    (d: number) => many && setState(([i]) => [(i + d + n) % n, d]),
    [many, n],
  );
  const jump = (j: number) => setState(([i]) => (j === i ? [i, 0] : [j, j > i ? 1 : -1]));

  // Keyboard, focus trap, scroll lock.
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"),
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.y) > Math.abs(offset.x)) {
      if (offset.y > SWIPE_DISTANCE * 1.5 || velocity.y > SWIPE_VELOCITY) onClose();
      return;
    }
    if (!many) return;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) go(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const current = shots[index]!;
  const neighbours = many ? Array.from(new Set([(index + 1) % n, (index - 1 + n) % n])).filter((i) => i !== index) : [];

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 text-white backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
        <p className="font-mono text-xs text-white/70" aria-live="polite">
          {many ? (
            <>
              {index + 1} / {n}
              <span className="sr-only">, {current.mobile ? "mobile" : "desktop"} screenshot</span>
            </>
          ) : (
            <span className="sr-only">{title} screenshot</span>
          )}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            drag
            dragDirectionLock
            dragSnapToOrigin
            dragElastic={0.6}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={onDragEnd}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="absolute inset-0 flex cursor-grab touch-none items-center justify-center px-4 py-2 active:cursor-grabbing sm:px-20"
          >
            <Slide shot={current} phoneWidth={phoneWidth} priority />
          </motion.div>
        </AnimatePresence>

        {/* Preload neighbours with the same sizes so switching never flashes. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
          {neighbours.map((i) => (
            <div key={shots[i]!.src} className="absolute inset-0">
              <Image
                src={shots[i]!.src}
                alt=""
                fill
                sizes={shots[i]!.mobile ? SIZES.mobile : SIZES.desktop}
                loading="eager"
              />
            </div>
          ))}
        </div>

        {many && (
          <>
            <NavButton side="left" label="Previous screenshot" onClick={() => go(-1)} />
            <NavButton side="right" label="Next screenshot" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Thumbnails */}
      {many && (
        <div
          ref={thumbsRef}
          className="flex shrink-0 justify-start gap-2 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 [scrollbar-width:none] sm:justify-center"
          role="group"
          aria-label="Screenshots"
        >
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              data-thumb={i}
              onClick={() => jump(i)}
              aria-label={`Show screenshot ${i + 1} of ${n}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative h-14 shrink-0 overflow-hidden rounded-md border transition-[opacity,border-color,box-shadow] duration-200 ${
                s.mobile ? "aspect-[9/19.5]" : "aspect-[16/10]"
              } ${
                i === index
                  ? "border-white opacity-100 shadow-[0_0_0_2px_var(--accent)]"
                  : "border-white/15 opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={s.src} alt="" fill sizes="120px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Slide({ shot, phoneWidth, priority }: { shot: Shot; phoneWidth: number; priority?: boolean }) {
  if (shot.mobile) {
    return (
      <PhoneFrame width={phoneWidth}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={SIZES.mobile}
          draggable={false}
          {...(priority ? { loading: "eager" as const } : {})}
          className="object-cover object-top"
        />
      </PhoneFrame>
    );
  }
  return (
    <div className="relative h-full w-full max-w-6xl">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={SIZES.desktop}
        draggable={false}
        {...(priority ? { loading: "eager" as const } : {})}
        className="object-contain"
      />
    </div>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20 sm:size-12 ${
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5"
      }`}
    >
      <Icon size={22} />
    </button>
  );
}

/** Phone frame width that fits the stage height (top bar + thumbnails ≈ 170px). */
const phoneWidthFor = () =>
  typeof window === "undefined"
    ? 320
    : Math.round(Math.min(380, window.innerWidth - 120, Math.max(160, ((window.innerHeight - 190) * 9) / 19.5 / 1.08)));

function usePhoneWidth() {
  const [w, setW] = useState(phoneWidthFor);
  useEffect(() => {
    const onResize = () => setW(phoneWidthFor());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}
