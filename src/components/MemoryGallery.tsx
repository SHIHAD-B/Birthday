"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { PhotoFallback } from "./PhotoFallback";

export function MemoryGallery() {
  const reduceMotion = useReducedMotion();
  const photos = siteConfig.photos;
  const featured = photos.find((p) => p.featured) ?? photos[0];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? 0 : (i + 1) % photos.length
    );
  }, [photos.length]);
  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section
      id="memories"
      className="relative section-pad bg-plum/40"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Little Moments, Big Memories"
          scriptAccent="held gently, forever"
        />
        <h2 id="gallery-heading" className="sr-only">
          Little Moments, Big Memories
        </h2>

        {featured ? (
          <motion.figure
            className="mb-10 overflow-hidden rounded-[1.5rem] border border-champagne/20 glass-card"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <button
              type="button"
              className="group relative block w-full text-left"
              onClick={() =>
                setActiveIndex(photos.findIndex((p) => p === featured))
              }
              aria-label={`Open featured memory: ${featured.caption}`}
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <PhotoFallback
                  src={featured.src}
                  alt={featured.alt}
                  fill
                  sizes="100vw"
                  imageClassName="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/10 to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <p className="font-serif text-xl md:text-3xl text-ivory max-w-2xl text-balance">
                  {featured.caption}
                </p>
                {featured.date ? (
                  <p className="mt-2 text-xs tracking-[0.18em] uppercase text-champagne/80">
                    {featured.date}
                  </p>
                ) : null}
              </figcaption>
            </button>
          </motion.figure>
        ) : null}

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <motion.button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "mb-4 block w-full break-inside-avoid overflow-hidden text-left transition",
                photo.polaroid
                  ? "rounded-sm bg-[#f7ebe0] p-3 pb-8 shadow-lg rotate-[-1deg] hover:rotate-0"
                  : "rounded-2xl border border-champagne/15 glass-card"
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  photo.polaroid ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-[4/5]" : "aspect-[5/4]",
                  photo.polaroid ? "" : "rounded-2xl"
                )}
              >
                <PhotoFallback
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  imageClassName="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  photo.polaroid ? "px-1 text-[#4a3540] font-serif" : "px-4 pb-4 text-muted"
                )}
              >
                {photo.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-midnight/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            onClick={close}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-champagne/30 bg-night/70 p-2 text-ivory"
              onClick={close}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-champagne/25 bg-night/60 p-2 text-ivory md:left-6"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-champagne/25 bg-night/60 p-2 text-ivory md:right-6"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              className="relative w-full max-w-4xl"
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-champagne/25">
                <PhotoFallback
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  fill
                  sizes="90vw"
                  imageClassName="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-xl text-ivory">
                  {photos[activeIndex].caption}
                </p>
                {photos[activeIndex].date ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                    {photos[activeIndex].date}
                  </p>
                ) : null}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
