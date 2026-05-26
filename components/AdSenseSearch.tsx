'use client';

import { useEffect } from "react";

declare global {
  interface Window {
    _googCsa: (type: string, config: Record<string, unknown>, queryConfig: Record<string, unknown>) => void;
  }
}

export default function AdSenseSearch() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/adsense/search/ads.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full">
      <div id="afscontainer1"></div>
    </div>
  );
}
