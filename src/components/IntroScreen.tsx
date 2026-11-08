"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { StarField } from "./StarField";

type IntroScreenProps = {
  onComplete: () => void;
};

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(() => (reduceMotion ? 2 : 0));

  useEffect(() => {
    if (reduceMotion) return;

    const t1 = window.setTimeout(() => setPhase(1), 1400);
    const t2 = window.setTimeout(() => setPhase(2), 3000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center hero-gradient"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Birthday surprise introduction"
    >
      <StarField count={80} />
      <div
        className="absolute inset-0 romantic-glow opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 text-center max-w-xl">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="line1"
              className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light text-ivory"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8 }}
            >
              Hey, my love...
            </motion.p>
          )}

          {phase >= 1 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
            >
              <p className="font-serif text-[clamp(1.6rem,4.5vw,2.6rem)] font-light text-ivory/95 leading-snug">
                I made a little something for you.
              </p>

              {phase >= 2 && (
                <motion.button
                  type="button"
                  onClick={onComplete}
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-7 py-3.5 text-sm tracking-[0.12em] uppercase text-champagne transition hover:bg-champagne/20 hover:border-champagne/70 animate-pulse-glow focus-visible:outline-none"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  Open Your Surprise
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
