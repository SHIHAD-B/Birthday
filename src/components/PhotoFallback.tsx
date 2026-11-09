"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoFallbackProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function PhotoFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  imageClassName,
  sizes,
  priority,
}: PhotoFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-night via-plum to-midnight",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 romantic-glow opacity-60" />
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
          <Heart className="h-7 w-7 text-champagne/70" aria-hidden="true" />
          <p className="font-script text-xl text-ivory/80">A memory waiting</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className={cn("object-cover", imageClassName)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cn(imageClassName, className)}
      onError={() => setFailed(true)}
    />
  );
}
