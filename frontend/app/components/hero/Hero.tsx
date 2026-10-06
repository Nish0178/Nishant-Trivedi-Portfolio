"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { fetchPublicCmsContent, FALLBACK_PUBLIC_CONTENT } from "@/lib/api/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cmsHero, setCmsHero] = useState(FALLBACK_PUBLIC_CONTENT.hero);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchPublicCmsContent().then((content) => {
      if (mounted && content?.hero) {
        setCmsHero((prev) => ({ ...prev, ...content.hero }));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Subtle parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* 1. Giant Watermark Background Typography (Exact Reference Feature) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[17vw] font-black tracking-tighter text-neutral-900/[0.04] dark:text-white/[0.035] uppercase select-none leading-none scale-y-110">
          {cmsHero.badgeName || "NISHANT"}
        </span>
      </div>

      {/* Top Spacer for layout balance */}
      <div className="hidden lg:block w-full h-4" />

      {/* 2. Center Silhouette Cutout / Video of Nishant (Alive & Dynamic) */}
      <motion.div
        style={{ y: videoY, opacity }}
        className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto min-h-[260px] sm:min-h-[380px] lg:min-h-[500px]"
      >
        <div className="relative w-[240px] sm:w-[340px] lg:w-[400px] h-[260px] sm:h-[380px] lg:h-[500px] flex items-center justify-center">
          {/* Walking video with graceful fallback to high-res portrait */}
          <video
            ref={videoRef}
            src="/video/hero-walking.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-contain filter drop-shadow-xl transition-opacity duration-700 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Fallback image if video is loading or unsupported */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/nishant-portrait.webp"
                alt="Nishant Trivedi"
                width={380}
                height={500}
                priority
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>
          )}

          {/* Gentle ground contact shadow */}
          <div className="absolute -bottom-2 w-48 sm:w-64 h-6 bg-black/15 dark:bg-black/40 blur-md rounded-full pointer-events-none" />
        </div>
      </motion.div>

      {/* 3. Bottom Layer: Typography on Left & CTAs on Right (Exact Reference Layout) */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4"
      >
        {/* Left Side: Kicker, Big Headline, Subtitle */}
        <div className="max-w-xl">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
            {cmsHero.badgeName ? `${cmsHero.badgeName} TRIVEDI` : "NISHANT TRIVEDI"}
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.02]">
            Full Stack
            <br />
            Developer.
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 font-normal tracking-wide">
            Creative developer · AI & web technology
          </p>
        </div>

        {/* Right Side: CTA Button Pills */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          {/* Explore work primary solid pill button */}
          <Link
            href="#work"
            className="px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore work</span>
            <span className="text-sm">→</span>
          </Link>

          {/* Secondary outline pill buttons */}
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium active:scale-95 transition-all"
          >
            Let&apos;s talk
          </Link>

          <a
            href="/resume/Nishant_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium active:scale-95 transition-all inline-flex items-center gap-1.5"
          >
            <span>Resume</span>
            <span className="text-xs">↓</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
