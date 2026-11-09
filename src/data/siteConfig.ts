/**
 * ============================================================
 * PERSONALIZATION CONFIG — edit this file to customize the site
 * All values below are DEMO PLACEHOLDERS. Replace with your own.
 * ============================================================
 */

export type Photo = {
  src: string;
  caption: string;
  date?: string;
  alt: string;
  featured?: boolean;
  polaroid?: boolean;
};

export type Milestone = {
  date: string;
  title: string;
  description: string;
  image?: string;
  icon?: "heart" | "star" | "sparkles" | "coffee" | "map" | "cake";
};

export type OpenWhenLetter = {
  id: string;
  title: string;
  message: string;
};

export type FutureDream = {
  title: string;
  description: string;
  icon?: "sunrise" | "plane" | "car" | "utensils" | "music" | "camera" | "walk";
};

export type SongNote = {
  title: string;
  artist: string;
  note: string;
};

export type SpotifyTrack = {
  title: string;
  artist: string;
  /** Optional Spotify link (opens externally) */
  url?: string;
  /**
   * Local audio file under /public/audio (e.g. "/audio/song.mp3").
   * Add your own legally owned MP3s — do not use pirated downloads.
   */
  src?: string;
  note?: string;
};

export const siteConfig = {
  // --- Names (DEMO PLACEHOLDERS) ---
  boyfriendName: "Better Half",
  girlfriendName: "Meghanandhana",

  // --- Dates (DEMO PLACEHOLDERS) ---
  birthday: "2001-08-20",
  /** ISO 8601 with timezone offset — used by the live relationship timer */
  committedAt: "2025-04-15T00:00:00+04:00",

  // --- SEO ---
  siteTitle: "Happy Birthday, My Love ♡",
  siteDescription:
    "A private little universe made just for you — a birthday surprise filled with memories, letters, and love.",
  noIndex: true,

  // --- Hero ---
  heroEyebrow: "TO MY FAVORITE HUMAN",
  heroSubtitle:
    "Of all the stories in the universe,\nours will always be my favorite.",
  heroPortraitSrc: "/images/hero-portrait.jpg",
  heroPortraitAlt: "A portrait of my better half",

  // --- Music ---
  /** Paste a Spotify playlist URL (e.g. https://open.spotify.com/playlist/...) */
  spotifyPlaylistUrl: "",
  /** Optional local MP3 path, e.g. "/audio/background.mp3" */
  backgroundAudioUrl: "",

  /**
   * Local playlist — put MP3/M4A files in /public/audio with these names
   * (or change the src paths). Playback starts only after you press play.
   */
  spotifyTracks: [
    {
      title: "Nenjin Ezhuth",
      artist: "Our song",
      url: "https://open.spotify.com/track/7Et1EN5V7xAyPjYOk8nSh3",
      src: "/audio/nenjin-ezhuth.mp3",
      note: "Every time this plays, I think of you.",
    },
    {
      title: "Minnalvala",
      artist: "Sid Sriram · Narivetta",
      url: "https://open.spotify.com/track/5yAfCVJwa3r9wAQSOfawqm",
      src: "/audio/minnalvala.mp3",
      note: "This one feels like all our quiet moments.",
    },
    {
      title: "The Life of Ram",
      artist: "Our song",
      url: "https://open.spotify.com/track/3hXX5v2JaVqDR3aeQcPAU9",
      src: "/audio/the-life-of-ram.mp3",
      note: "It sounds like coming home to you.",
    },
    {
      title: "Pagal Iravai | Maraigirai",
      artist: "Our song",
      url: "https://open.spotify.com/track/2jQQTuzwJWEtwayffAADIe",
      src: "/audio/pagal-iravai.mp3",
      note: "Our soft night song.",
    },
  ] as SpotifyTrack[],

  songNotes: [] as SongNote[],

  // --- Photos (unique images only; hero portrait is separate) ---
  photos: [
    {
      src: "/images/memory-1.jpg",
      caption: "If I could relive one day, I'd probably choose the one with you.",
      date: "A little moment, a big memory",
      alt: "A special memory together",
      featured: true,
      polaroid: true,
    },
    {
      src: "/images/memory-2.jpg",
      caption: "A quiet little moment that somehow became everything.",
      date: "Us",
      alt: "Memory photo 2",
    },
    {
      src: "/images/memory-3.jpg",
      caption: "Laughing until we forgot what started it.",
      date: "Us",
      alt: "Memory photo 3",
      polaroid: true,
    },
    {
      src: "/images/memory-4.jpg",
      caption: "Golden hour looked better next to you.",
      date: "Us",
      alt: "Memory photo 4",
    },
    {
      src: "/images/memory-5.jpg",
      caption: "Proof that home can be a person.",
      date: "Us",
      alt: "Memory photo 5",
      polaroid: true,
    },
  ] as Photo[],

  // --- Timeline ---
  milestones: [
    {
      date: "15 April 2025 · ~12:15 PM",
      title: "The Day We Met",
      description:
        "From that day, around 12:15 pm, we saw each other and got lost in each other's eyes. That was the first melting moment of our journey. Thank you for coming into my life — I love you.\n\nThat was a special day alle etta.... Enikk ippozhum oormmayind — Njan Preethi Silks il kayariyathum Shebinettane kandu. Then njn ettanu text cheythu \"Your frnd is here, Shebin I think\". Nn kelkkenda thamasam njn nokkumbol, dhoore ninn oral varunnu — minnayam pole kandu. Njn mind aakkiyilla. Then ettan staircase lott kayariyille — ah tym il ahn njn ettane nokkiyath. Ettan also enne nokkunnayrunu. That was our first eye contact. Heart beat ellam kooduthal aayrunu. Ntha athine parayendath — magic aano, soul connection aano — onnum ariyilla. It was very, very special to both of us.",
      icon: "sparkles",
    },
    {
      date: "16 April 2025",
      title: "Our First Conversation",
      description:
        "Do you remember our first conversation? It was the very next day after my birthday. From that conversation itself, I felt a soulmate connection. And I will never forget your birthday wish on that day.",
      icon: "coffee",
    },
    {
      date: "Our Kochi Date",
      title: "Our First Date",
      description:
        "Our most awaited first date. From the day we started talking, I had dreamed of a Kochi date with you. By God's grace, it happened in a short time. On that day, we covered almost all the places I had wished to visit with you, especially in my college.",
      icon: "heart",
    },
    {
      date: "Thrissur Railway Station",
      title: "The Day We Became Us",
      description:
        "For the very first time in my life, I held the hand of my special one. At that moment, I truly felt the magic of holding hands. Yes, it was at Thrissur Railway Station with a slow, romantic song playing. I just got goosebumps.",
      icon: "star",
    },
    {
      date: "A rainy night",
      title: "Our Favorite Adventure",
      description:
        "We will never forget the day we went for a rainy night ride. It was such a beautiful experience. Thank you so much, love, for that. Also, that thattukada food + rain + night ride + you — that was a magical moment.",
      icon: "map",
    },
    {
      date: "Today",
      title: "Today, Your Birthday",
      description:
        "On your special day, I'm very grateful to have you in my life. Today, I wish all your dreams come true and that you achieve everything you dream of. I promise I will always be here for you — no matter what happens in our lives, we will fight through it together.\n\nAlways us against the world.\n\nHappy Birthday, Jilju. I love you.",
      icon: "cake",
    },
  ] as Milestone[],

  // --- Reasons I Love You ---
  loveReasons: [
    "You make ordinary days feel special.",
    "You remember the little things.",
    "Your laugh is my favorite sound.",
    "You make life feel like an adventure.",
    "I feel at home when I'm with you.",
    "You listen like my words matter.",
    "You turn quiet moments into magic.",
    "Your kindness softens the whole world.",
    "You believe in me even when I forget how.",
    "You make me want to be gentler with myself.",
    "Every version of me feels safer with you.",
    "Loving you is the easiest thing I've ever done.",
  ],

  // --- Open When Letters ---
  openWhenLetters: [
    {
      id: "miss-me",
      title: "Open When You Miss Me",
      message:
        "Ettaa...\n\nIf you're reading this because the distance feels loud tonight — know that I'm carrying you with me, in every quiet minute.\n\nClose your eyes. Imagine my hand in your cheek. I'm already on my way back to that feeling.\n\nI miss you too. Always.",
    },
    {
      id: "feeling-low",
      title: "Open When You're Feeling Low",
      message:
        "Jiljuuu...,\n\nYou don't have to be strong for me right now. You can rest. You can feel everything.\n\nThis hard day is not who you are — it's only weather passing through. And I'll still be here when the sky clears.\n\nI'm proud of you for existing through it.",
    },
    {
      id: "need-smile",
      title: "Open When You Need a Smile",
      message:
        "Quick reminder:\n\nYou once made me laugh so hard I forgot what we were even talking about. That version of us still exists.\n\nAlso — your face is objectively my favorite view. Scientifically proven. By me. Repeatedly.\n\nYes, you are my 360° always ...\nSmile for me?",
    },
    {
      id: "cant-sleep",
      title: "Open When You Can't Sleep",
      message:
        "It's late, and your mind is probably wandering.\n\nBreathe with me for a second. In... and out...\n\nWherever you are, I hope you feel wrapped in my arms — like I always hug and cuddle you.\n\nSleep when you're ready. I'll always love you.",
    },
    {
      id: "reminder",
      title: "Open When You Need a Reminder",
      message:
        "You are enough.\n\nNot when you achieve more. Not when everything is perfect. Right now — as you are.\n\nYou are loved on the ordinary days, the messy days, and the days you don't feel like yourself.\n\nEspecially then.",
    },
    {
      id: "birthday",
      title: "Open On Your Birthday",
      message:
        "Happy birthday, my favorite person.\n\nThank you for being born — for growing into someone so rare, so gentle, so entirely you.\n\nThis whole little universe was made because loving you made me want to build something beautiful.\n\nHere's to another year of us.",
    },
  ] as OpenWhenLetter[],

  // --- Star messages for "Our Little Universe" ---
  starMessages: [
    "You're my favorite coincidence.",
    "In every sky, I'd still look for you.",
    "You turned my ordinary into constellation.",
    "I'd choose this love a thousand times.",
    "You are my 360°.",
    "Even the quiet between us is golden.",
    "You are my favourite person in the universe.",
  ],

  // --- Future dreams ---
  futureDreams: [
    {
      title: "Watch the sunrise together",
      description: "Coffee in hand, soft light, no rush — just us and a new day beginning.",
      icon: "sunrise",
    },
    {
      title: "Visit our dream destination",
      description: "Wherever we've whispered about going — let's make the map real.",
      icon: "plane",
    },
    {
      title: "Take a spontaneous road trip",
      description: "Windows down, playlist up, getting beautifully lost on purpose.",
      icon: "car",
    },
    {
      title: "Cook our favorite meal",
      description: "A tiny kitchen adventure ending in laughter, crumbs, and full hearts.",
      icon: "utensils",
    },
    {
      title: "A night walk",
      description:
        "An empty road, no crowd — only you and me, holding hands together on a long walk.",
      icon: "walk",
    },
    {
      title: "Make a thousand more memories",
      description: "Not grand ones only — the small, soft ones that quietly become everything.",
      icon: "camera",
    },
  ] as FutureDream[],

  // --- Cake surprise ---
  cakeWishMessage:
    "Whatever you wished for,\nI hope this year brings you even more.",
  surpriseMessage:
    "Here's a little promise wrapped like a gift: I will keep choosing you — on the bright days, the quiet days, and every birthday still waiting for us.\n\nAlways us against the world.",

  // --- Final letter ---
  finalLetter: `Happy birthday, my love.

I don't think you'll ever fully understand
how much happiness you bring into my life.

You make even the smallest moments feel
like memories I want to keep forever.

If I had to choose again,
in any lifetime,
in any universe,
I'd still choose you.

Here's to your dreams, your happiness,
and all the beautiful memories
we haven't made yet.

Happy birthday, my favorite person.

Forever yours,
Meghanandhana`,

  footerNote: "Made with all my love ♡",
} as const;

export type SiteConfig = typeof siteConfig;
