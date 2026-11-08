"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { cn, scrollToId } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "together", label: "Us" },
  { id: "story", label: "Story" },
  { id: "memories", label: "Memories" },
  { id: "playlist", label: "Music" },
  { id: "reasons", label: "Reasons" },
  { id: "letters", label: "Letters" },
  { id: "cake", label: "Cake" },
  { id: "universe", label: "Stars" },
  { id: "dreams", label: "Dreams" },
  { id: "letter", label: "Letter" },
];

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-champagne via-rose to-lavender transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 bg-night/80 text-champagne backdrop-blur-md transition hover:border-champagne/60"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export function MiniNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-5 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-full border border-champagne/30 bg-night/75 px-3 text-xs tracking-[0.14em] uppercase text-champagne backdrop-blur-md"
        aria-expanded={open}
        aria-label="Section navigation"
      >
        <Heart className="h-3.5 w-3.5" aria-hidden="true" />
        Chapters
      </button>

      {open ? (
        <nav
          className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-champagne/20 bg-night/90 p-2 backdrop-blur-md"
          aria-label="Page chapters"
        >
          <ul className="min-w-[9.5rem] space-y-1">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left text-sm text-muted transition hover:bg-white/5 hover:text-ivory"
                  )}
                  onClick={() => {
                    scrollToId(section.id);
                    setOpen(false);
                  }}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {[12, 28, 55, 72, 88].map((left, i) => (
        <Heart
          key={left}
          className="absolute bottom-[8%] h-3 w-3 fill-rose/20 text-rose/30 animate-float-heart"
          style={{
            left: `${left}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${7 + i}s`,
          }}
        />
      ))}
    </div>
  );
}
