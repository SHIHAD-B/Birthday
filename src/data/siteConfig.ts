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
  icon?: "sunrise" | "plane" | "car" | "utensils" | "music" | "camera";
};

export type SongNote = {
  title: string;
  artist: string;
  note: string;
};

export const siteConfig = {
  // --- Names (DEMO PLACEHOLDERS) ---
  boyfriendName: "[BOYFRIEND_NAME]",
  girlfriendName: "[GIRLFRIEND_NAME]",

  // --- Dates (DEMO PLACEHOLDERS) ---
  birthday: "2001-08-20",
  /** ISO 8601 with timezone offset — used by the live relationship timer */
  committedAt: "2024-02-14T00:00:00+04:00",

  // --- SEO ---
  siteTitle: "Happy Birthday, My Love ♡",
  siteDescription:
    "A private little universe made just for you — a birthday surprise filled with memories, letters, and love.",
  noIndex: true,

  // --- Hero ---
  heroEyebrow: "TO MY FAVORITE HUMAN",
  heroSubtitle:
    "Of all the stories in the universe,\nours will always be my favorite.",
  heroPortraitSrc: "/images/portrait.svg",
  heroPortraitAlt: "A soft portrait placeholder — replace with your photo",

  // --- Music ---
  /** Paste a Spotify playlist URL (e.g. https://open.spotify.com/playlist/...) */
  spotifyPlaylistUrl: "",
  /** Optional local MP3 path, e.g. "/audio/background.mp3" */
  backgroundAudioUrl: "",

  songNotes: [
    {
      title: "Our Song (Demo)",
      artist: "Favorite Artist",
      note: "Every time this plays, I think of you.",
    },
    {
      title: "Late Night Drive (Demo)",
      artist: "Another Artist",
      note: "This one feels like all our quiet moments.",
    },
    {
      title: "Soft Glow (Demo)",
      artist: "Someone Special",
      note: "It sounds like coming home to you.",
    },
  ] as SongNote[],

  // --- Photos (DEMO PLACEHOLDERS — add real files under /public/images) ---
  photos: [
    {
      src: "/images/memory.svg",
      caption: "If I could relive one day, I'd probably choose the one with you.",
      date: "Demo · Spring",
      alt: "Demo memory photo placeholder 1",
      featured: true,
      polaroid: true,
    },
    {
      src: "/images/memory.svg",
      caption: "A quiet little moment that somehow became everything.",
      date: "Demo · Summer",
      alt: "Demo memory photo placeholder 2",
    },
    {
      src: "/images/memory.svg",
      caption: "Laughing until we forgot what started it.",
      date: "Demo · Autumn",
      alt: "Demo memory photo placeholder 3",
      polaroid: true,
    },
    {
      src: "/images/memory.svg",
      caption: "Golden hour looked better next to you.",
      date: "Demo · Evening",
      alt: "Demo memory photo placeholder 4",
    },
    {
      src: "/images/memory.svg",
      caption: "The kind of ordinary day I never want to forget.",
      date: "Demo · Weekend",
      alt: "Demo memory photo placeholder 5",
    },
    {
      src: "/images/memory.svg",
      caption: "Proof that home can be a person.",
      date: "Demo · Night",
      alt: "Demo memory photo placeholder 6",
      polaroid: true,
    },
  ] as Photo[],

  // --- Timeline (DEMO PLACEHOLDERS — not real milestones) ---
  milestones: [
    {
      date: "Demo Date",
      title: "The Day We Met",
      description:
        "Replace this with the real story — the first glance, the first hello, the beginning of everything.",
      icon: "sparkles",
    },
    {
      date: "Demo Date",
      title: "Our First Conversation",
      description:
        "The words that somehow felt easy. Edit this with the detail only the two of you would know.",
      icon: "coffee",
    },
    {
      date: "Demo Date",
      title: "Our First Date",
      description:
        "Nerves, laughter, and the quiet realization that time moved differently with you.",
      icon: "heart",
    },
    {
      date: "Demo Date",
      title: "The Day We Became Us",
      description:
        "Not a dramatic movie scene — just a soft, certain kind of yes. Personalize this freely.",
      icon: "star",
    },
    {
      date: "Demo Date",
      title: "Our Favorite Adventure",
      description:
        "A trip, a walk, a night that still lives rent-free in both your hearts. Tell it here.",
      icon: "map",
    },
    {
      date: "Today",
      title: "Today, Your Birthday",
      description:
        "Another year of you — and another reason I'm grateful the universe made us find each other.",
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
        "Hey, love.\n\nIf you're reading this because the distance feels loud tonight — know that I'm carrying you with me, in every quiet minute.\n\nClose your eyes. Imagine my hand in yours. I'm already on my way back to that feeling.\n\nI miss you too. Always.",
    },
    {
      id: "feeling-low",
      title: "Open When You're Feeling Low",
      message:
        "My love,\n\nYou don't have to be strong for me right now. You can rest. You can feel everything.\n\nThis hard day is not who you are — it's only weather passing through. And I'll still be here when the sky clears.\n\nI'm proud of you for existing through it.",
    },
    {
      id: "need-smile",
      title: "Open When You Need a Smile",
      message:
        "Quick reminder:\n\nYou once made me laugh so hard I forgot what we were even talking about. That version of us still exists.\n\nAlso — your face is objectively my favorite view. Scientifically proven. By me. Repeatedly.\n\nSmile for me?",
    },
    {
      id: "cant-sleep",
      title: "Open When You Can't Sleep",
      message:
        "It's late, and your mind is probably wandering.\n\nBreathe with me for a second. In... and out...\n\nWherever you are, I hope you feel wrapped in something soft — like knowing someone loves you in the dark, without needing a reason.\n\nSleep when you're ready. I'll still love you in the morning.",
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
    "Your name feels like home in my mouth.",
    "Even the quiet between us is golden.",
    "Forever started the day I met you.",
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
      title: "Dance under the stars",
      description: "No stage, no audience — just two people and a sky full of witnesses.",
      icon: "music",
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
    "Here's a little promise wrapped like a gift: I will keep choosing you — on the bright days, the quiet days, and every birthday still waiting for us.",

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
[GIRLFRIEND_NAME]`,

  footerNote: "Made with all my love ♡",
} as const;

export type SiteConfig = typeof siteConfig;
