"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Heart, Lock, Unlock } from "lucide-react";
import { StarField } from "@/components/StarField";

export default function UnlockPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden hero-gradient px-5">
      <StarField count={70} />
      <div className="absolute inset-0 romantic-glow opacity-60" aria-hidden="true" />

      <motion.div
        className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-champagne/25 p-7 sm:p-9 text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </div>

        <p className="text-[0.7rem] tracking-[0.28em] uppercase text-champagne/80">
          Private little universe
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-[2.1rem] font-light text-ivory">
          This is just for you
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Enter the password to open your birthday surprise.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-lavender">
              Password
            </span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-champagne/25 bg-midnight/50 px-4 py-3 text-ivory outline-none transition placeholder:text-muted/60 focus:border-champagne/60"
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </label>

          {error ? (
            <p className="text-sm text-rose" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-6 py-3.5 text-sm tracking-[0.12em] uppercase text-champagne transition hover:bg-champagne/20 disabled:opacity-40"
          >
            {loading ? "Opening..." : "Unlock"}
            <Unlock className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted">
          <Heart className="h-3 w-3 text-rose" aria-hidden="true" />
          Made with love — keep it between us
        </p>
      </motion.div>
    </main>
  );
}
