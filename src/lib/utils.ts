import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Convert a Spotify playlist URL into an embeddable URL.
 * Returns null when the URL is empty or unsupported.
 */
export function toSpotifyEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    if (
      parsed.hostname !== "open.spotify.com" &&
      parsed.hostname !== "spotify.com"
    ) {
      return null;
    }

    const match = parsed.pathname.match(/\/playlist\/([a-zA-Z0-9]+)/);
    if (!match) return null;

    return `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
