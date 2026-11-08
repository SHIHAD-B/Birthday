"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";

export function FinalLoveLetter() {
  const reduceMotion = useReducedMotion();
  const [celebrated, setCelebrated] = useState(false);

  const lines = useMemo(
    () =>
      siteConfig.finalLetter
        .replaceAll("[GIRLFRIEND_NAME]", siteConfig.girlfriendName)
        .split("\n"),
    []
  );

  const celebrate = () => {
    setCelebrated(true);
    if (reduceMotion) return;

    const end = Date.now() + 1200;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors: ["#E8C89E", "#D9A5AD", "#FFF6ED"],
        shapes: ["circle"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors: ["#E8C89E", "#D9A5AD", "#A899C4"],
        shapes: ["circle"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section
      id="letter"
      className="relative section-pad overflow-hidden bg-gradient-to-b from-plum via-[#2a1a30] to-midnight"
      aria-labelledby="final-letter-heading"
    >
      <div
        className="absolute left-1/2 top-1/3 h-[50vmin] w-[50vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,200,158,0.16),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading title="One Last Thing, My Love..." />
        <h2 id="final-letter-heading" className="sr-only">
          One Last Thing, My Love...
        </h2>

        <motion.article
          className="letter-paper relative rounded-[1.5rem] px-6 py-8 md:px-10 md:py-12"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-[#e8c89e]/35"
            aria-hidden="true"
          />

          <div className="relative space-y-1 font-serif text-[clamp(1.05rem,2.6vw,1.3rem)] leading-[1.85] text-[#3a2a32]">
            {lines.map((line, index) => (
              <motion.p
                key={`${index}-${line.slice(0, 12)}`}
                className={line.trim() === "" ? "h-4" : undefined}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 1.2) }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.article>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="font-script text-2xl md:text-3xl text-rose/90">
            {siteConfig.footerNote}
          </p>

          <button
            type="button"
            onClick={celebrate}
            className="group inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-champagne/10 px-5 py-2.5 text-sm text-champagne transition hover:bg-champagne/20"
            aria-label="Send a final heart"
          >
            <Heart
              className={`h-4 w-4 transition ${
                celebrated
                  ? "fill-rose text-rose scale-110"
                  : "text-champagne group-hover:fill-rose group-hover:text-rose"
              }`}
              aria-hidden="true"
            />
            {celebrated ? "All my love, always" : "Tap for one last heart"}
          </button>
        </div>
      </div>
    </section>
  );
}
