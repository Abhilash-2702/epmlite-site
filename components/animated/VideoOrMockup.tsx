"use client";

import { useEffect, useState } from "react";

/**
 * Renders a real <video> if `videoSrc` is provided AND the file exists,
 * otherwise falls back to the children (animated CSS/Framer Motion mockup).
 *
 * Drop a screen recording at e.g. /public/videos/dashboard.mp4 and pass
 * videoSrc="/videos/dashboard.mp4" to swap it in without code changes.
 */
export default function VideoOrMockup({
  videoSrc,
  poster,
  children,
  className = "",
  ariaLabel,
}: {
  videoSrc?: string;
  poster?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const [videoExists, setVideoExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!videoSrc) {
      setVideoExists(false);
      return;
    }
    let cancelled = false;
    fetch(videoSrc, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setVideoExists(r.ok);
      })
      .catch(() => {
        if (!cancelled) setVideoExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [videoSrc]);

  if (videoSrc && videoExists) {
    return (
      <video
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={ariaLabel}
        className={className}
      />
    );
  }

  return <div className={className}>{children}</div>;
}
