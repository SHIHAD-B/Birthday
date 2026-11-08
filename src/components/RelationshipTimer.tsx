"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/siteConfig";
import {
  formatCommitmentDate,
  formatPad,
  getCalendarDuration,
  getElapsedParts,
  type ElapsedParts,
} from "@/lib/dateUtils";
import { SectionHeading } from "./SectionHeading";

const EMPTY: ElapsedParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalMs: 0,
  isValid: false,
  isFuture: false,
};

function subscribeNowhere() {
  return () => {};
}

export function RelationshipTimer() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeNowhere,
    () => true,
    () => false
  );

  const [parts, setParts] = useState<ElapsedParts>(EMPTY);
  const [calendar, setCalendar] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setParts(getElapsedParts(siteConfig.committedAt, now));
      setCalendar(getCalendarDuration(siteConfig.committedAt, now));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = mounted ? parts : EMPTY;
  const commitmentLabel = formatCommitmentDate(siteConfig.committedAt);

  const units = [
    { label: "Days", value: display.days, pad: display.days >= 1000 ? 4 : 3 },
    { label: "Hours", value: display.hours, pad: 2 },
    { label: "Minutes", value: display.minutes, pad: 2 },
    { label: "Seconds", value: display.seconds, pad: 2 },
  ];

  return (
    <section
      id="together"
      className="relative section-pad bg-night/60"
      aria-labelledby="timer-heading"
    >
      <div className="absolute inset-0 romantic-glow opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="Every Second With You"
          subtitle={`Our story began on ${commitmentLabel},\nand every moment since has been my favorite.`}
        />
        <h2 id="timer-heading" className="sr-only">
          Every Second With You
        </h2>

        {!display.isValid && mounted ? (
          <p className="text-center text-rose/90">
            Please set a valid <code>committedAt</code> date in siteConfig.
          </p>
        ) : display.isFuture && mounted ? (
          <p className="mb-8 text-center text-muted">
            Our countdown to forever is still warming up — the date is in the
            future.
          </p>
        ) : null}

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="glass-card rounded-2xl px-3 py-5 text-center gold-glow sm:px-4 sm:py-7"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <p className="font-serif text-[clamp(1.8rem,6vw,3rem)] font-medium tracking-wide text-champagne tabular-nums">
                {mounted ? formatPad(unit.value, unit.pad) : "––"}
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>

        {calendar && mounted && display.isValid && !display.isFuture ? (
          <p className="mt-6 text-center text-sm text-lavender/90">
            That&apos;s {calendar.years}{" "}
            {calendar.years === 1 ? "year" : "years"}, {calendar.months}{" "}
            {calendar.months === 1 ? "month" : "months"}, and {calendar.days}{" "}
            {calendar.days === 1 ? "day" : "days"} of us.
          </p>
        ) : null}

        <p className="mt-8 text-center font-script text-2xl md:text-3xl text-rose/90">
          And still, forever doesn&apos;t feel long enough.
        </p>
      </div>
    </section>
  );
}
