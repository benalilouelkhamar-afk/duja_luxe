"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product photo with an elegant lilac placeholder when the image is missing or fails to load.
 * The parent must be `relative` with a set aspect ratio.
 */
export function ProductImage({
  src,
  alt,
  label,
  sizes,
  priority = false,
  className = "",
}: {
  src?: string;
  alt: string;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#f6ecf8] via-[#ead9ee] to-[#dcc3e2] p-4 text-center"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6b4a72" strokeWidth="1.4" aria-hidden>
          <path d="M8 3 4 6l2 4 2-1v12h8V9l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z" />
        </svg>
        <span className="font-serif text-[11px] tracking-[0.25em] text-plum">DUJA LUXE</span>
        <span className="text-sm font-bold text-plum-800">{label}</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
