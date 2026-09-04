"use client";

import React, { useRef, useEffect, useState } from "react";

const TOTAL_FRAMES = 144;
const FPS = 24;
const FRAME_DURATION = 1000 / FPS; // ~41.67ms
const PAUSE_DURATION = 5000; // 5.0 seconds pause at end

interface HeroVideoProps {
  className?: string;
}

export default function HeroVideo({ className = "" }: HeroVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    canvas.width = 720;
    canvas.height = 1280;

    // Preload all 144 original video frames
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        if (i === 0 && ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setFirstFrameLoaded(true);
        }
      };
      images.push(img);
    }

    let animId: number;
    let lastTime = performance.now();
    let frameIdx = 0;
    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout | null = null;

    const loop = (now: number) => {
      const delta = now - lastTime;

      if (!isPaused && delta >= FRAME_DURATION) {
        lastTime = now - (delta % FRAME_DURATION);

        const currentImg = images[frameIdx];
        if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
          ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
          if (!firstFrameLoaded) setFirstFrameLoaded(true);
        }

        frameIdx++;

        // When reaching the end of the walking sequence (frame 144)
        if (frameIdx >= TOTAL_FRAMES) {
          frameIdx = TOTAL_FRAMES - 1; // Hold on the final completed pose
          isPaused = true;

          // Pause on final completed pose for 5.0 seconds, then restart
          pauseTimeout = setTimeout(() => {
            frameIdx = 0;
            isPaused = false;
            lastTime = performance.now();
          }, PAUSE_DURATION);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [firstFrameLoaded]);

  return (
    <div className={`relative flex items-center justify-center select-none w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px] mx-auto ${className}`}>
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D5B878]/15 via-transparent to-transparent rounded-3xl filter blur-2xl opacity-60 pointer-events-none" />

      {/* Frame Container with Exact 9:16 Aspect Ratio to Ensure Zero Cutoff */}
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl">
        {/* Instant Fallback Poster */}
        <img
          src="/frames/frame_000.webp"
          alt="Nishant Trivedi"
          className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 ${
            firstFrameLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Original Video Canvas Frame Player */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain object-center relative z-10"
        />

        {/* Minimal Holographic Corner Tag */}
        <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#A3A09A]">
          <span className="flex items-center gap-1.5 text-[#D5B878]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NISHANT TRIVEDI
          </span>
          <span className="text-white/40">ORIGINAL · 5S LOOP</span>
        </div>
      </div>

      {/* Luxury Gold Corner Brackets */}
      <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D5B878] rounded-tl pointer-events-none z-30" />
      <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D5B878] rounded-tr pointer-events-none z-30" />
      <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D5B878] rounded-bl pointer-events-none z-30" />
      <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D5B878] rounded-br pointer-events-none z-30" />
    </div>
  );
}
