"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

type MusicControllerProps = {
  className?: string;
};

export function MusicController({ className }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const src = siteConfig.backgroundAudioUrl.trim();

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "metadata";
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audioRef.current = null;
    };
  }, [src]);

  if (!src) return null;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 left-4 z-50 flex items-center gap-2",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 bg-night/80 text-champagne backdrop-blur-md transition hover:border-champagne/60"
        aria-expanded={expanded}
        aria-label="Music controls"
      >
        <Music2 className="h-4 w-4" />
      </button>

      {expanded ? (
        <div className="flex items-center gap-2 rounded-full border border-champagne/25 bg-night/85 px-2 py-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={togglePlay}
            disabled={!ready}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ivory disabled:opacity-40"
            aria-label={playing ? "Pause background music" : "Play background music"}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ivory"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
