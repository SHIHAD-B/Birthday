"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function LoveReasons() {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section
      id="reasons"
      className="relative section-pad bg-midnight"
      aria-labelledby="reasons-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="A Thousand Reasons, But Here Are a Few" />
        <h2 id="reasons-heading" className="sr-only">
          A Thousand Reasons, But Here Are a Few
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {siteConfig.loveReasons.map((reason, index) => {
            const isFlipped = !!flipped[index];

            return (
              <motion.div
                key={index}
                className="flip-scene h-[150px] sm:h-[170px]"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
              >
                <button
                  type="button"
                  className="h-full w-full text-left focus-visible:outline-none"
                  onClick={() => toggle(index)}
                  aria-pressed={isFlipped}
                  aria-label={
                    isFlipped
                      ? `Reason ${index + 1}: ${reason}. Tap to flip back.`
                      : `Reason ${index + 1}. Tap to reveal.`
                  }
                >
                  <div
                    className={cn("flip-card", isFlipped && "is-flipped")}
                  >
                    <div className="flip-face glass-card flex flex-col items-center justify-center gap-3 border border-champagne/20 p-4">
                      <Heart
                        className="h-6 w-6 fill-rose/80 text-rose"
                        aria-hidden="true"
                      />
                      <span className="font-serif text-3xl text-champagne">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                        Tap to open
                      </span>
                    </div>
                    <div className="flip-face flip-back glass-card flex items-center justify-center border border-rose/25 bg-plum/50 p-4">
                      <p className="text-center text-sm leading-relaxed text-ivory">
                        {reason}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
