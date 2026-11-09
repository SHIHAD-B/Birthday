"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ExternalLink,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function PlaylistSection() {
  const reduceMotion = useReducedMotion();
  const tracks = siteConfig.spotifyTracks;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [missing, setMissing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const current = tracks[index];
  const src = current?.src?.trim() ?? "";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    setMissing(false);
    setErrorMsg("");
    setProgress(0);
    setDuration(0);
    setPlaying(false);
    audio.pause();
    audio.src = src;
    audio.load();
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (index < tracks.length - 1) {
        setIndex((i) => i + 1);
        // next track loads via effect; user can press play — or auto-advance after user already started
        window.setTimeout(() => {
          void audioRef.current
            ?.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        }, 120);
      } else {
        setPlaying(false);
        setProgress(0);
      }
    };
    const onError = () => {
      setMissing(true);
      setPlaying(false);
      setErrorMsg(
        `Missing file: ${src || "(no src)"}. Add your MP3 in /public/audio`
      );
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [index, src, tracks.length]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio || !src) {
      setMissing(true);
      setErrorMsg("Add MP3 files to /public/audio first.");
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setMissing(false);
      setErrorMsg("");
    } catch {
      setPlaying(false);
      setErrorMsg("Could not play this file. Check the MP3 path and format.");
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) pause();
    else void play();
  };

  const selectTrack = (i: number) => {
    if (i === index) {
      void toggle();
      return;
    }
    setIndex(i);
    setPlaying(false);
    // Play only after explicit press — selecting alone does not autoplay
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const prev = () => {
    setIndex((i) => (i > 0 ? i - 1 : tracks.length - 1));
    setPlaying(false);
  };

  const next = () => {
    setIndex((i) => (i < tracks.length - 1 ? i + 1 : 0));
    setPlaying(false);
  };

  return (
    <section
      id="playlist"
      className="relative section-pad bg-night"
      aria-labelledby="playlist-heading"
    >
      <audio ref={audioRef} preload="metadata" playsInline />
      <div className="absolute inset-0 pointer-events-none opacity-50 romantic-glow" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="If Our Love Had a Soundtrack"
          subtitle="Some songs just sound like you. Nothing plays until you press play."
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
            <div className="relative overflow-hidden bg-gradient-to-br from-plum/80 via-night to-midnight p-6 sm:p-8">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-champagne/10 blur-2xl" />
              <div className="absolute -bottom-10 left-10 h-36 w-36 rounded-full romantic-glow" />

              <div className="relative flex flex-col items-center text-center">
                <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-2xl border border-champagne/25 bg-gradient-to-br from-champagne/25 to-rose/20 shadow-[0_0_40px_rgba(232,200,158,0.2)]">
                  <Music2 className="h-10 w-10 text-champagne" aria-hidden="true" />
                </div>

                <p className="font-serif text-2xl sm:text-3xl text-ivory">
                  {current?.title ?? "Our Songs"}
                </p>
                <p className="mt-1 text-sm text-lavender">{current?.artist}</p>
                {current?.note ? (
                  <p className="mt-3 max-w-sm text-sm italic text-muted">
                    &ldquo;{current.note}&rdquo;
                  </p>
                ) : null}

                <div className="mt-6 w-full max-w-md space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-champagne"
                    aria-label="Seek"
                    disabled={!src || missing}
                  />
                  <div className="flex justify-between text-xs tabular-nums text-muted">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full p-2 text-muted transition hover:text-ivory"
                    aria-label="Previous song"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={toggle}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40 bg-champagne/15 text-champagne transition hover:bg-champagne/25"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 translate-x-0.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full p-2 text-muted transition hover:text-ivory"
                    aria-label="Next song"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex w-full max-w-xs items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className="text-champagne"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setVolume(v);
                      setMuted(v === 0);
                    }}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-champagne"
                    aria-label="Volume"
                  />
                </div>

                {errorMsg ? (
                  <p className="mt-4 max-w-sm text-xs leading-relaxed text-rose/90">
                    {errorMsg}
                  </p>
                ) : null}

                {current?.url ? (
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-lavender transition hover:text-champagne"
                  >
                    Open on Spotify
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>

          <ul className="space-y-3" aria-label="Song list">
            {tracks.map((song, i) => {
              const isActive = i === index;
              return (
                <motion.li
                  key={`${song.title}-${i}`}
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <button
                    type="button"
                    onClick={() => selectTrack(i)}
                    className={cn(
                      "glass-card flex w-full items-start gap-3 rounded-2xl p-4 text-left transition",
                      isActive
                        ? "border-champagne/50 bg-champagne/10"
                        : "hover:border-champagne/35"
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                        isActive
                          ? "border-champagne/50 bg-champagne/20 text-champagne"
                          : "border-champagne/20 text-lavender"
                      )}
                      aria-hidden="true"
                    >
                      {isActive && playing ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="font-serif text-xl text-ivory">{song.title}</p>
                      <p className="text-sm text-lavender">{song.artist}</p>
                      {song.note ? (
                        <p className="mt-2 text-sm italic leading-relaxed text-muted">
                          &ldquo;{song.note}&rdquo;
                        </p>
                      ) : null}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
