"use client";

type StarFieldProps = {
  count?: number;
  className?: string;
};

/** Deterministic pseudo-random in [0, 1) from an integer seed */
function hash01(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function round(n: number, digits = 2) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

export function StarField({ count = 60, className = "" }: StarFieldProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const size = round(hash01(i * 3 + 1) * 2.2 + 0.6, 2);
    const top = round(hash01(i * 3 + 2) * 100, 2);
    const left = round(hash01(i * 3 + 3) * 100, 2);
    const duration = round(3 + hash01(i * 5 + 4) * 5, 2);
    const delay = round(hash01(i * 7 + 5) * 6, 2);
    const tone =
      i % 11 === 0 ? "star-gold" : i % 17 === 0 ? "star-rose" : "";

    return { id: i, size, top, left, duration, delay, tone };
  });

  return (
    <div className={`star-field ${className}`} aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className={`star ${star.tone}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            ["--duration" as string]: `${star.duration}s`,
            ["--delay" as string]: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
