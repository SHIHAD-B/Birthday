"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, Heart } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { scrollToId } from "@/lib/utils";
import { StarField } from "./StarField";
import { PhotoFallback } from "./PhotoFallback";

export function BirthdayHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden hero-gradient"
      aria-label="Birthday hero"
    >
      <StarField count={70} />
      <div
        className="absolute right-[-10%] top-[10%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(232,200,158,0.18),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-[-5%] bottom-[5%] h-[50vmin] w-[50vmin] rounded-full romantic-glow"
        aria-hidden="true"
      />

      {/* Soft moon */}
      <div
        className="absolute right-[8%] top-[14%] h-20 w-20 md:h-28 md:w-28 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff6ed_0%,#e8c89e_45%,transparent_72%)] opacity-70 animate-float"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14 md:px-8">
        <div>
          <motion.p
            className="mb-4 text-[0.7rem] tracking-[0.3em] uppercase text-champagne/85"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {siteConfig.heroEyebrow}
          </motion.p>

          <motion.h1
            className="font-serif text-[clamp(2.6rem,8vw,5rem)] font-light leading-[1.05] text-ivory"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
          >
            Happy Birthday,
            <span className="block mt-1 text-champagne">
              {siteConfig.boyfriendName}
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md font-script text-2xl md:text-3xl text-rose/90"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            A little universe, made just for you.
          </motion.p>

          <motion.p
            className="mt-5 max-w-lg whitespace-pre-line text-base md:text-lg leading-relaxed text-muted"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55 }}
          >
            {siteConfig.heroSubtitle}
          </motion.p>

          <motion.button
            type="button"
            onClick={() => scrollToId("together")}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-white/5 px-6 py-3 text-sm text-ivory transition hover:border-champagne/70 hover:bg-champagne/10"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Come see what I made for you
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <div className="absolute -inset-3 rounded-[1.6rem] bg-gradient-to-br from-champagne/30 via-rose/20 to-transparent blur-md opacity-70" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-champagne/30 gold-glow">
            <PhotoFallback
              src={siteConfig.heroPortraitSrc}
              alt={siteConfig.heroPortraitAlt}
              fill
              sizes="(max-width: 768px) 85vw, 380px"
              priority
              imageClassName="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-3 -left-2 flex items-center gap-2 rounded-full border border-champagne/25 bg-night/80 px-3 py-1.5 backdrop-blur-md animate-float-heart">
            <Heart
              className="h-3.5 w-3.5 fill-rose text-rose"
              aria-hidden="true"
            />
            <span className="text-xs tracking-wide text-ivory/90">
              forever starts here
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
