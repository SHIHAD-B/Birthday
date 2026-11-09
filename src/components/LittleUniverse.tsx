"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";
import { StarField } from "./StarField";

/** Exactly 7 stars — all kept inside the rounded galaxy box */
const STAR_POSITIONS = [
  { x: 18, y: 20, size: 32, delay: "0s", duration: "3.2s" },
  { x: 56, y: 14, size: 28, delay: "0.45s", duration: "3.7s" },
  { x: 82, y: 32, size: 32, delay: "0.9s", duration: "3.1s" },
  { x: 40, y: 38, size: 36, delay: "0.25s", duration: "3.5s" },
  { x: 16, y: 56, size: 30, delay: "1.2s", duration: "4s" },
  { x: 74, y: 58, size: 32, delay: "0.7s", duration: "2.9s" },
  { x: 46, y: 70, size: 32, delay: "1.5s", duration: "3.4s" },
] as const;

function GalaxyStar({
  id,
  tone,
}: {
  id: string;
  tone: "gold" | "rose" | "ivory";
}) {
  const glowId = `galaxy-glow-${id}`;
  const fill =
    tone === "rose" ? "#D9A5AD" : tone === "ivory" ? "#FFF6ED" : "#E8C89E";

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="overflow-visible">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor={fill} />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="20" fill={`url(#${glowId})`} opacity="0.85" />
      <path
        d="M32 2 L37 27 L62 32 L37 37 L32 62 L27 37 L2 32 L27 27 Z"
        fill="#FFF6ED"
      />
      <path
        d="M32 12 L34 30 L52 32 L34 34 L32 52 L30 34 L12 32 L30 30 Z"
        fill={fill}
      />
      <circle cx="32" cy="32" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

export function LittleUniverse() {
  const reduceMotion = useReducedMotion();
  const messages = siteConfig.starMessages;
  const [active, setActive] = useState<number | null>(null);
  const tones = [
    "gold",
    "rose",
    "ivory",
    "gold",
    "rose",
    "ivory",
    "gold",
  ] as const;

  // Hard guarantee: always 7 buttons
  const stars = STAR_POSITIONS;

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
          className="relative mx-auto aspect-[4/5] w-full max-w-3xl sm:aspect-[5/4]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Galaxy clipped to rounded frame */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-champagne/20">
            <div className="galaxy-sky absolute inset-0" aria-hidden="true">
              <div className="galaxy-core" />
              <div className="galaxy-arm galaxy-arm-a" />
              <div className="galaxy-arm galaxy-arm-b" />
              <div className="galaxy-dust" />
              <StarField count={40} className="opacity-70" />
            </div>
          </div>

          <p className="pointer-events-none absolute left-0 right-0 top-4 z-30 text-center text-xs tracking-[0.2em] uppercase text-muted">
            Tap a star to reveal a message
          </p>

          {/* Stars inside the frame — inset keeps all 7 within the border */}
          <div className="absolute inset-[16%] z-20 sm:inset-[14%]">
            {stars.map((pos, index) => (
              <button
                key={`interactive-star-${index}`}
                type="button"
                className="sky-star absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                style={{
                  top: `${pos.y}%`,
                  left: `${pos.x}%`,
                  width: pos.size,
                  height: pos.size,
                  ["--twinkle" as string]: pos.duration,
                  ["--twinkle-delay" as string]: pos.delay,
                  animation: reduceMotion ? "none" : undefined,
                }}
                onClick={() => setActive(index)}
                aria-label={`Star ${index + 1} of ${stars.length}: reveal hidden message`}
              >
                <GalaxyStar id={String(index)} tone={tones[index]} />
              </button>
            ))}
          </div>
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
