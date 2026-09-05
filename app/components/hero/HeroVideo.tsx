"use client";

import React, { useRef, useEffect, useState } from "react";

interface HeroVideoProps {
  className?: string;
}

export default function HeroVideo({ className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener("canplaythrough", handleCanPlay);

    // Attempt autoplay gracefully
    video.play().catch(() => {
      setIsLoaded(true);
    });

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#f4f4f2] ${className}`}>
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/hero-walking.mp4" type="video/mp4" />
        <source src="/video/hero-walking.m4v" type="video/x-m4v" />
      </video>
    </div>
  );
}
