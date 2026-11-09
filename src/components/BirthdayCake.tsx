"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import confetti from "canvas-confetti";
import { Gift, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";

function fireConfetti() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.65 },
    colors: ["#E8C89E", "#D9A5AD", "#FFF6ED", "#A899C4"],
  });
}

export function BirthdayCake() {
  const reduceMotion = useReducedMotion();
  const [blown, setBlown] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const blowOut = () => {
    if (blown) return;
    setBlown(true);
    fireConfetti();
  };

  return (
    <section
      id="cake"
      className="relative section-pad overflow-hidden bg-night"
      aria-labelledby="cake-heading"
    >
      <div className="absolute inset-0 romantic-glow opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading title="Make a Wish, My Love" />
        <h2 id="cake-heading" className="sr-only">
          Make a Wish, My Love
        </h2>

        <motion.div
          className="mx-auto mt-2 flex w-full max-w-md flex-col items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <svg
            viewBox="0 0 320 280"
            className="w-full max-w-xs drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            role="img"
            aria-label={
              blown
                ? "Birthday cake with candles blown out"
                : "Birthday cake with glowing candles"
            }
          >
            {/* Candles */}
            {[80, 120, 160, 200, 240].map((x, i) => (
              <g key={x}>
                <rect
                  x={x - 5}
                  y={70}
                  width="10"
                  height="42"
                  rx="2"
                  fill={i % 2 === 0 ? "#E8C89E" : "#D9A5AD"}
                />
                {!blown ? (
                  <g className="animate-flicker" style={{ transformOrigin: `${x}px 70px` }}>
                    <ellipse
                      cx={x}
                      cy={58}
                      rx="7"
                      ry="12"
                      fill="#FFD89A"
                      opacity="0.95"
                    />
                    <ellipse
                      cx={x}
                      cy={54}
                      rx="3.5"
                      ry="6"
                      fill="#FFF6ED"
                    />
                  </g>
                ) : (
                  <circle cx={x} cy={66} r="2" fill="#B8AEC5" opacity="0.5" />
                )}
              </g>
            ))}

            {/* Cake tiers */}
            <rect x="50" y="110" width="220" height="50" rx="12" fill="#F7E8DA" />
            <rect x="50" y="110" width="220" height="14" rx="7" fill="#D9A5AD" opacity="0.85" />
            <rect x="35" y="158" width="250" height="58" rx="14" fill="#F3DCC8" />
            <rect x="35" y="158" width="250" height="16" rx="8" fill="#E8C89E" opacity="0.75" />
            <rect x="20" y="214" width="280" height="46" rx="16" fill="#EFD4BC" />
            <ellipse cx="160" cy="258" rx="140" ry="10" fill="#0B1020" opacity="0.35" />

            {/* Decorations */}
            <circle cx="90" cy="185" r="4" fill="#A899C4" />
            <circle cx="160" cy="190" r="4" fill="#D9A5AD" />
            <circle cx="230" cy="185" r="4" fill="#E8C89E" />
          </svg>

          {!blown ? (
            <button
              type="button"
              onClick={blowOut}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-6 py-3 text-sm tracking-wide text-champagne transition hover:bg-champagne/20"
            >
              Blow Out the Candles
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <motion.div
              className="mt-6 space-y-5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="whitespace-pre-line font-serif text-xl md:text-2xl text-ivory">
                {siteConfig.cakeWishMessage}
              </p>
              <button
                type="button"
                onClick={() => setShowGift(true)}
                className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm text-ivory transition hover:bg-rose/20"
              >
                One More Little Surprise
                <Gift className="h-4 w-4 text-champagne" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showGift ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-midnight/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Surprise gift message"
            onClick={() => setShowGift(false)}
          >
            <motion.div
              className="letter-paper relative w-full max-w-md rounded-2xl p-7"
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full p-2 text-[#5a3d45] hover:bg-black/5"
                onClick={() => setShowGift(false)}
                aria-label="Close surprise"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="font-script text-3xl text-[#8b4a5a]">A little gift</p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-[#3a2a32] whitespace-pre-line">
                {siteConfig.surpriseMessage}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
