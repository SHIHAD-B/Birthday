"use client";

import { useSyncExternalStore, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IntroScreen } from "@/components/IntroScreen";
import { BirthdayHero } from "@/components/BirthdayHero";
import { RelationshipTimer } from "@/components/RelationshipTimer";
import { StoryTimeline } from "@/components/StoryTimeline";
import { MemoryGallery } from "@/components/MemoryGallery";
import { PlaylistSection } from "@/components/PlaylistSection";
import { LoveReasons } from "@/components/LoveReasons";
import { OpenWhenLetters } from "@/components/OpenWhenLetters";
import { BirthdayCake } from "@/components/BirthdayCake";
import { LittleUniverse } from "@/components/LittleUniverse";
import { FutureDreams } from "@/components/FutureDreams";
import { FinalLoveLetter } from "@/components/FinalLoveLetter";
import { MusicController } from "@/components/MusicController";
import {
  FloatingHearts,
  MiniNav,
  ScrollProgress,
  ScrollToTop,
} from "@/components/FloatingControls";

const INTRO_KEY = "birthday-intro-dismissed";

function subscribeIntro(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("birthday-intro-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("birthday-intro-change", onStoreChange);
  };
}

function getIntroDismissed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function getIntroServerSnapshot() {
  return false;
}

export default function HomePage() {
  const introDismissed = useSyncExternalStore(
    subscribeIntro,
    getIntroDismissed,
    getIntroServerSnapshot
  );

  const dismissIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("birthday-intro-change"));
  }, []);

  const showIntro = !introDismissed;

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroScreen key="intro" onComplete={dismissIntro} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrollProgress />
          <MiniNav />
          <FloatingHearts />
          <MusicController />
          <ScrollToTop />

          <main>
            <BirthdayHero />
            <RelationshipTimer />
            <StoryTimeline />
            <MemoryGallery />
            <PlaylistSection />
            <LoveReasons />
            <OpenWhenLetters />
            <BirthdayCake />
            <LittleUniverse />
            <FutureDreams />
            <FinalLoveLetter />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
