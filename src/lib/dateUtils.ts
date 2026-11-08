export type ElapsedParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isValid: boolean;
  isFuture: boolean;
};

export type CalendarDuration = {
  years: number;
  months: number;
  days: number;
};

/**
 * Parse an ISO 8601 date (with timezone offset preferred) into a Date.
 */
export function parseCommittedAt(iso: string): Date | null {
  if (!iso?.trim()) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/**
 * Live elapsed time since commitment, based on absolute ms difference.
 * Safe for any timezone as long as committedAt includes an offset / Z.
 */
export function getElapsedParts(
  committedAt: string,
  now: Date = new Date()
): ElapsedParts {
  const start = parseCommittedAt(committedAt);

  if (!start) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isValid: false,
      isFuture: false,
    };
  }

  const totalMs = now.getTime() - start.getTime();

  if (totalMs < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs,
      isValid: true,
      isFuture: true,
    };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs,
    isValid: true,
    isFuture: false,
  };
}

/**
 * Calendar-style duration (years, months, days) between two dates.
 * Uses local calendar arithmetic; complementary to the live second timer.
 */
export function getCalendarDuration(
  committedAt: string,
  now: Date = new Date()
): CalendarDuration | null {
  const start = parseCommittedAt(committedAt);
  if (!start) return null;
  if (now.getTime() < start.getTime()) {
    return { years: 0, months: 0, days: 0 };
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function formatPad(n: number, size = 2): string {
  return String(Math.max(0, n)).padStart(size, "0");
}

export function formatCommitmentDate(iso: string): string {
  const date = parseCommittedAt(iso);
  if (!date) return "our special day";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: extractTimezone(iso) ?? undefined,
  }).format(date);
}

function extractTimezone(iso: string): string | null {
  const match = iso.match(/([+-]\d{2}:\d{2}|Z)$/);
  if (!match) return null;
  if (match[1] === "Z") return "UTC";
  // Intl accepts IANA zones better, but offset-based formatting via the Date itself is fine.
  return null;
}
