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

    // Attempt autoplay
    video.play().catch(() => {
      // Autoplay blocked — still show the video element
      setIsLoaded(true);
    });

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Video Element — Full Cover */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/frames/frame_000.webp"
      >
        <source src="/video/hero-walking.mp4" type="video/mp4" />
        <source src="/video/hero-walking.m4v" type="video/x-m4v" />
      </video>

      {/* Cinematic Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />
      <div className="absolute inset-0 bg-[#050505]/20 z-10" />
    </div>
  );
}
