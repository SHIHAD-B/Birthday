"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";

export function OpenWhenLetters() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const active = siteConfig.openWhenLetters.find((l) => l.id === openId);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  return (
    <section
      id="letters"
      className="relative section-pad bg-plum/50"
      aria-labelledby="letters-heading"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Letters For Every Version of You" />
        <h2 id="letters-heading" className="sr-only">
          Letters For Every Version of You
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.openWhenLetters.map((letter, index) => (
            <motion.button
              key={letter.id}
              type="button"
              onClick={() => setOpenId(letter.id)}
              className="group relative overflow-hidden rounded-2xl envelope-face p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              aria-label={`Open letter: ${letter.title}`}
            >
              <div
                className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#c9979f]/70 to-transparent"
                aria-hidden="true"
              />
              <div
                className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#8b5e4b]/50 bg-gradient-to-br from-[#c47a5a] to-[#8b4a3a] shadow-md"
                aria-hidden="true"
              >
                <span className="font-script text-sm text-[#fff6ed]">♡</span>
              </div>
              <p className="relative font-serif text-xl text-[#3f2a30]">
                {letter.title}
              </p>
              <p className="relative mt-2 text-xs uppercase tracking-[0.18em] text-[#6d4d56]/80">
                Tap to open
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-midnight/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="letter-paper relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 md:p-8"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full p-2 text-[#5a3d45] hover:bg-black/5"
                onClick={() => setOpenId(null)}
                aria-label="Close letter"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="pr-8 font-serif text-2xl text-[#3a2a32]">
                {active.title}
              </p>
              <div className="mt-5 whitespace-pre-line font-serif text-base leading-relaxed text-[#4a3540]">
                {active.message}
              </div>
              <p className="mt-8 font-script text-2xl text-[#8b4a5a]">
                With love, {siteConfig.girlfriendName}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
