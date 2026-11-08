"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Music2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { toSpotifyEmbedUrl } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function PlaylistSection() {
  const reduceMotion = useReducedMotion();
  const embedUrl = toSpotifyEmbedUrl(siteConfig.spotifyPlaylistUrl);
  const externalUrl = siteConfig.spotifyPlaylistUrl.trim() || null;

  return (
    <section
      id="playlist"
      className="relative section-pad bg-night"
      aria-labelledby="playlist-heading"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50 romantic-glow" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="If Our Love Had a Soundtrack"
          subtitle="Some songs just sound like you."
        />
        <h2 id="playlist-heading" className="sr-only">
          If Our Love Had a Soundtrack
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="glass-card overflow-hidden rounded-3xl border border-champagne/20"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 border-b border-champagne/15 bg-gradient-to-r from-plum/50 to-transparent p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-champagne/30 to-rose/30">
                <Music2 className="h-7 w-7 text-champagne" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-2xl text-ivory">Our Playlist</p>
                <p className="text-sm text-muted">
                  Soft nights, shared drives, and forever feelings
                </p>
              </div>
            </div>

            {embedUrl ? (
              <iframe
                title="Spotify playlist embed"
                src={embedUrl}
                className="h-[380px] w-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center">
                <Music2 className="h-8 w-8 text-lavender" aria-hidden="true" />
                <p className="max-w-sm text-muted">
                  Add your Spotify playlist URL in{" "}
                  <code className="text-champagne">siteConfig.spotifyPlaylistUrl</code>{" "}
                  to embed it here.
                </p>
              </div>
            )}

            {externalUrl ? (
              <div className="border-t border-champagne/15 p-4">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-champagne transition hover:text-ivory"
                >
                  Open in Spotify
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </motion.div>

          <ul className="space-y-4">
            {siteConfig.songNotes.map((song, index) => (
              <motion.li
                key={`${song.title}-${index}`}
                className="glass-card rounded-2xl p-5"
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-champagne" aria-hidden="true">
                    <Music2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-serif text-xl text-ivory">{song.title}</p>
                    <p className="text-sm text-lavender">{song.artist}</p>
                    <p className="mt-2 text-sm italic leading-relaxed text-muted">
                      &ldquo;{song.note}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
