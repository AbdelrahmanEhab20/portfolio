"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

// Fade between routes on client navigation only. The first page load renders visible
// (no opacity:0 in the server HTML), so content can paint before JavaScript runs.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const initial = hasMounted ? { opacity: 0 } : false;
  useEffect(() => {
    hasMounted = true;
  }, []);
  return (
    <motion.div initial={initial} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
