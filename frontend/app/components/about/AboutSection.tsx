"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { fetchPublicCmsContent, FALLBACK_PUBLIC_CONTENT } from "@/lib/api/content";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cmsAbout, setCmsAbout] = useState(FALLBACK_PUBLIC_CONTENT.about);

  useEffect(() => {
    let mounted = true;
    fetchPublicCmsContent().then((content) => {
      if (mounted && content?.about) {
        setCmsAbout((prev) => ({ ...prev, ...content.about }));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const badgeRotate = useTransform(scrollYProgress, [0, 1], [-4, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            01 — ABOUT
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* 3-Column Layout: Bio on Left, Hanging Lanyard Badge in Center, Quick Facts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Heading & Detailed Bio */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-6">
              Hi, I&apos;m{" "}
              <span className="font-serif italic font-normal text-neutral-800 dark:text-neutral-200">
                Nishant.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              <p>
                {cmsAbout.bioParagraph1 ||
                  "Motivated Full Stack Developer and Software Engineer skilled in building scalable applications with React, Next.js, Node.js, Spring Boot, and modern cloud technologies. Strong in API development, distributed systems, and algorithmic problem solving."}
              </p>
              <p>
                {cmsAbout.bioParagraph2 ||
                  "I work across frontend architecture, backend microservices, generative AI workflows, relational databases, and high-performance digital platforms with meticulous attention to detail."}
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#EAE6DC] dark:bg-[#1E2026] text-neutral-800 dark:text-neutral-200 text-xs font-medium border border-black/[0.04] dark:border-white/[0.06]">
                AKTU CSE &apos;28
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EAE6DC] dark:bg-[#1E2026] text-neutral-800 dark:text-neutral-200 text-xs font-medium border border-black/[0.04] dark:border-white/[0.06]">
                400+ DSA Solved
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EAE6DC] dark:bg-[#1E2026] text-neutral-800 dark:text-neutral-200 text-xs font-medium border border-black/[0.04] dark:border-white/[0.06]">
                QBX Hackathon Top 10
              </span>
            </div>
          </div>

          {/* Center Column: Physical Lanyard Developer ID Badge (Exact Reference Feature) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center pt-2">
            {/* Lanyard Top Strap */}
            <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-800 border-x border-neutral-700/60 rounded-t-sm shadow-inner" />
            {/* Metal Clip */}
            <div className="w-6 h-5 bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm shadow-md border border-neutral-400/50 mb-[-4px] z-10" />

            {/* Developer ID Card */}
            <motion.div
              style={{ rotate: badgeRotate }}
              whileHover={{ rotate: 1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-64 sm:w-72 bg-[#17181D] text-white rounded-2xl p-5 shadow-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Subtle lanyard punch hole */}
              <div className="w-6 h-1.5 bg-neutral-900 rounded-full mx-auto mb-4 border border-white/10" />

              {/* ID Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white text-neutral-900 text-[10px] font-bold font-mono flex items-center justify-center">
                    NT
                  </div>
                  <span className="text-[11px] font-bold tracking-wider font-mono text-neutral-200 uppercase">
                    DEVELOPER ID
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Portfolio · 2026
                </span>
              </div>

              {/* Portrait Photo in Rounded Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner group">
                <Image
                  src="/images/nishant-portrait.webp"
                  alt="Nishant Trivedi"
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Identity Details */}
              <div className="mt-4 text-center">
                <p className="text-sm font-bold tracking-wider uppercase text-white">
                  NISHANT TRIVEDI
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Software & AI Engineer
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Quick Facts & Philosophy Quote */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full pt-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 font-semibold">
                QUICK FACTS
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">Based in</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">
                    Lucknow, India
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">Studying</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">
                    B.Tech CSE &apos;28
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">Best at</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">
                    Full Stack · AI
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">Focus</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 text-right">
                    Systems & Cloud
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Serif Philosophy Quote (Exact Reference Feature) */}
            <div className="mt-12 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 leading-snug">
                &ldquo;From the database to the last pixel.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
