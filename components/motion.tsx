"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

// reducedMotion="user": transforms are dropped for people who ask for less motion, opacity stays.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const group = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

type DivProps = ComponentProps<typeof motion.div>;

/** Fades + lifts its content once when scrolled into view. */
export function Reveal({ children, delay = 0, ...rest }: DivProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.45, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers <StaggerItem> children when in view (or on mount with `onMount`). */
export function Stagger({
  children,
  stagger,
  delay,
  onMount,
  ...rest
}: DivProps & { stagger?: number; delay?: number; onMount?: boolean }) {
  return (
    <motion.div
      variants={group(stagger, delay)}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -80px 0px" } })}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: DivProps) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  );
}
