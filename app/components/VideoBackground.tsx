"use client";

import { memo, useEffect, useState } from "react";

interface BackgroundProps {
  messages: Record<string, string>;
}

/**
 * Background component that renders a full-screen video background with animated text messages.
 * @param messages An object containing 'main_message' and 'secondary_message' for display.
 * @returns A full-screen animated background component.
 */
const VideoBackground = memo(({ messages }: BackgroundProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="flex flex-col items-center">
      <h1 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg opacity-0 animate-fade-in">
  {messages.main_message}
</h1>
<h2 className="text-white text-2xl md:text-4xl font-semibold text-center drop-shadow-lg mt-2 opacity-0 animate-fade-in animate-pulse delay-1000">
  {messages.secondary_message}
</h2>
      </div>
    </div>
  );
});

VideoBackground.displayName = "Background";

export default VideoBackground;
