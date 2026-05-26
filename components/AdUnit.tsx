'use client';

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format: "leaderboard" | "rectangle" | "large-leaderboard" | "anchor";
  className?: string;
}

const DIMENSIONS = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  "large-leaderboard": { width: 970, height: 90 },
  anchor: { width: "100%", height: 60 },
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, format, className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  const dims = DIMENSIONS[format];

  useEffect(() => {
    if (loaded.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded.current) {
          loaded.current = true;
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch {
            // AdSense not loaded yet
          }
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  if (format === "anchor") {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center ${className}`}
        style={{ height: 60, minHeight: 60 }}
        ref={adRef}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 50 }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        minWidth: typeof dims.width === "number" ? dims.width : undefined,
        minHeight: dims.height,
        width: typeof dims.width === "string" ? dims.width : dims.width,
        height: dims.height,
      }}
      aria-label="Anuncio"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: typeof dims.width === "number" ? dims.width : "100%", height: dims.height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
      />
    </div>
  );
}
