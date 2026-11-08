# Happy Birthday, My Love ♡

A cinematic, interactive romantic birthday website — a private digital love letter built with Next.js.

All personal content lives in one file so you can customize names, dates, photos, letters, and music without touching components.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

---

## Personalize everything

Edit **`src/data/siteConfig.ts`**.

### Names

```ts
boyfriendName: "Alex",
girlfriendName: "Sam",
```

Also update the final letter signature — `[GIRLFRIEND_NAME]` is replaced automatically, or edit `finalLetter` directly.

### Commitment date (live timer)

Use a full ISO 8601 datetime **with timezone offset**:

```ts
committedAt: "2024-02-14T00:00:00+04:00",
```

The timer updates every second and shows days / hours / minutes / seconds, plus a calendar-style years–months–days summary.

### Photos

1. Add images to `public/images/` (e.g. `portrait.jpg`, `memory-1.jpg`).
2. Update paths in `siteConfig`:

```ts
heroPortraitSrc: "/images/portrait.jpg",
photos: [
  {
    src: "/images/memory-1.jpg",
    caption: "Our favorite evening",
    date: "June 2024",
    alt: "Us smiling at sunset",
    featured: true,
    polaroid: true,
  },
],
```

Missing images fall back to a soft romantic placeholder.

### Spotify playlist

```ts
spotifyPlaylistUrl: "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID",
```

The site converts supported playlist URLs into an embed and also offers an “Open in Spotify” link. Leave empty to show a gentle setup hint.

### Background music (optional)

1. Add a licensed/owned MP3 to `public/audio/` (example: `public/audio/oursong.mp3`).
2. Set:

```ts
backgroundAudioUrl: "/audio/oursong.mp3",
```

A floating music control appears. Audio never autoplays before user interaction.

### Birthday letter & surprises

Edit these fields in `siteConfig.ts`:

- `finalLetter`
- `loveReasons`
- `openWhenLetters`
- `starMessages`
- `futureDreams`
- `milestones`
- `cakeWishMessage`
- `surpriseMessage`

---

## Project structure

```
src/
  app/           # layout, page, global styles
  components/    # intro, hero, timer, gallery, cake, letters, ...
  data/          # siteConfig.ts (edit this)
  lib/           # date + helper utils
public/
  images/        # your photos
  audio/         # optional background music
  favicon.svg
```

---

## Deploy to Vercel

1. Push this project to GitHub / GitLab / Bitbucket.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Deploy.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

After deploy, open the URL on your phone too — the experience is mobile-first.

---

## Notes

- Default metadata is `noindex, nofollow` (`noIndex: true`) so this private surprise stays out of search engines.
- The magical intro is remembered for the current browser session via `sessionStorage`.
- Respects `prefers-reduced-motion`.
- Demo content is clearly placeholder — replace it with your real story.
