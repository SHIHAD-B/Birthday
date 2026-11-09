"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Camera,
  Car,
  Footprints,
  Music,
  Plane,
  Sunrise,
  Utensils,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionHeading } from "./SectionHeading";

const iconMap = {
  sunrise: Sunrise,
  plane: Plane,
  car: Car,
  utensils: Utensils,
  music: Music,
  camera: Camera,
  walk: Footprints,
};

export function FutureDreams() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="dreams"
      className="relative section-pad bg-plum/35"
      aria-labelledby="dreams-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="All the Tomorrows I Want With You" />
        <h2 id="dreams-heading" className="sr-only">
          All the Tomorrows I Want With You
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.futureDreams.map((dream, index) => {
            const Icon = iconMap[dream.icon ?? "camera"];
            return (
              <motion.article
                key={dream.title}
                className="group glass-card rounded-2xl p-6 transition hover:border-champagne/40"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="mb-4 inline-flex rounded-full border border-champagne/25 bg-champagne/10 p-3 text-champagne transition group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl text-ivory">{dream.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {dream.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
