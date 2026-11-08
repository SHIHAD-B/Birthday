"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Cake,
  Coffee,
  Heart,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";
import { PhotoFallback } from "./PhotoFallback";

const iconMap = {
  heart: Heart,
  star: Star,
  sparkles: Sparkles,
  coffee: Coffee,
  map: MapPin,
  cake: Cake,
};

export function StoryTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative section-pad bg-midnight"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="How Our Forever Started" />
        <h2 id="story-heading" className="sr-only">
          How Our Forever Started
        </h2>

        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-champagne/50 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-16">
            {siteConfig.milestones.map((milestone, index) => {
              const Icon = iconMap[milestone.icon ?? "heart"];
              const isLeft = index % 2 === 0;

              return (
                <motion.li
                  key={`${milestone.title}-${index}`}
                  className="relative grid md:grid-cols-2 md:gap-10"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                >
                  <div
                    className={`pl-12 md:pl-0 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="glass-card inline-block w-full rounded-2xl p-5 md:p-6 text-left">
                      <div className="mb-2 flex items-center gap-2 text-champagne/90">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                          {milestone.date}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-ivory">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base leading-relaxed text-muted">
                        {milestone.description}
                      </p>
                      {milestone.image ? (
                        <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-champagne/20">
                          <PhotoFallback
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 420px"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <span
                    className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-champagne shadow-[0_0_12px_rgba(232,200,158,0.7)] md:left-1/2"
                    aria-hidden="true"
                  />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
