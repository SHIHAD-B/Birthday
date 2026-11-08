"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";
import { StarField } from "./StarField";

const STAR_POSITIONS = [
  { top: "18%", left: "20%" },
  { top: "28%", left: "68%" },
  { top: "46%", left: "38%" },
  { top: "58%", left: "78%" },
  { top: "70%", left: "24%" },
  { top: "35%", left: "50%" },
  { top: "75%", left: "55%" },
];

export function LittleUniverse() {
  const reduceMotion = useReducedMotion();
  const messages = siteConfig.starMessages;
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="universe"
      className="relative section-pad overflow-hidden bg-midnight"
      aria-labelledby="universe-heading"
    >
      <StarField count={90} />
      <div className="absolute inset-0 romantic-glow opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading title="In Every Universe, I'd Find You" />
        <h2 id="universe-heading" className="sr-only">
          In Every Universe, I&apos;d Find You
        </h2>

        <motion.div
          className="relative mx-auto h-[420px] max-w-3xl overflow-hidden rounded-[2rem] border border-champagne/20 bg-[radial-gradient(circle_at_center,#151B30_0%,#0B1020_70%)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="absolute left-0 right-0 top-4 z-10 text-center text-xs tracking-[0.2em] uppercase text-muted">
            Tap a star to reveal a message
          </p>

          {messages.slice(0, STAR_POSITIONS.length).map((message, index) => {
            const pos = STAR_POSITIONS[index];
            return (
              <button
                key={index}
                type="button"
                className="absolute z-10 rounded-full focus-visible:outline-none"
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setActive(index)}
                aria-label={`Star ${index + 1}: reveal hidden message`}
              >
                <span
                  className="relative block h-4 w-4 rounded-full bg-champagne shadow-[0_0_16px_rgba(232,200,158,0.85)] transition hover:scale-125 sm:h-5 sm:w-5"
                  aria-hidden="true"
                >
                  <span className="absolute inset-[-8px] rounded-full border border-champagne/25 animate-pulse-glow" />
                </span>
              </button>
            );
          })}

          {/* Constellation lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-30"
            aria-hidden="true"
          >
            <line x1="22%" y1="20%" x2="40%" y2="48%" stroke="#A899C4" strokeWidth="1" />
            <line x1="40%" y1="48%" x2="52%" y2="37%" stroke="#A899C4" strokeWidth="1" />
            <line x1="52%" y1="37%" x2="70%" y2="30%" stroke="#E8C89E" strokeWidth="1" />
            <line x1="40%" y1="48%" x2="26%" y2="72%" stroke="#D9A5AD" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-midnight/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Star message"
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass-card relative max-w-sm rounded-2xl border border-champagne/30 p-7 text-center"
              initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-2 top-2 rounded-full p-2 text-muted hover:text-ivory"
                onClick={() => setActive(null)}
                aria-label="Close message"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-script text-3xl text-rose">✦</p>
              <p className="mt-3 font-serif text-2xl leading-snug text-ivory">
                {messages[active]}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
