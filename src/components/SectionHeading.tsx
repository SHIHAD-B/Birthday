"use client";

import { motion, useReducedMotion } from "motion/react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  scriptAccent?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  scriptAccent,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`mb-10 md:mb-14 max-w-3xl ${alignClass}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <p className="mb-3 text-[0.7rem] tracking-[0.28em] uppercase text-champagne/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.15] text-ivory text-balance">
        {title}
      </h2>
      {scriptAccent ? (
        <p className="mt-3 font-script text-2xl md:text-3xl text-rose/90">
          {scriptAccent}
        </p>
      ) : null}
      {subtitle ? (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted whitespace-pre-line text-balance">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
