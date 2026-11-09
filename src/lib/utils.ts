import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Convert a Spotify playlist or track URL into an embeddable URL.
 * Returns null when the URL is empty or unsupported.
 * Embeds never autoplay until the user presses play inside the player.
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

    const playlist = parsed.pathname.match(/\/playlist\/([a-zA-Z0-9]+)/);
    if (playlist) {
      return `https://open.spotify.com/embed/playlist/${playlist[1]}?utm_source=generator&theme=0`;
    }

    const track = parsed.pathname.match(/\/track\/([a-zA-Z0-9]+)/);
    if (track) {
      return `https://open.spotify.com/embed/track/${track[1]}?utm_source=generator&theme=0`;
    }

    return null;
  } catch {
    return null;
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
