"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CERTIFICATIONS } from "@/lib/portfolio-data";
import { ArrowUpRight, Award, CheckCircle2 } from "lucide-react";

export default function CertificationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(2); // Default to item 3 as seen in reference frame 24

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            04 — CERTIFICATIONS
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* 2-Column Layout matching Reference Frame 24 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Subtitle */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-4">
              Always{" "}
              <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
                learning.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed max-w-md">
              {CERTIFICATIONS.length} verified certifications across cloud infrastructure, Java systems, full-stack engineering, and AI pipelines.
            </p>

            {/* Verification Guarantee Pill */}
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Grounded in verified institutional credentials</span>
            </div>
          </div>

          {/* Right Column: Interactive Certifications List (Exact Frame 24 Presentation) */}
          <div className="lg:col-span-7 flex flex-col gap-1.5 w-full">
            {CERTIFICATIONS.map((cert, idx) => {
              const isHovered = hoveredIndex === idx;
              const indexStr = `0${idx + 1}`;

              return (
                <div
                  key={cert.name}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative px-5 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isHovered
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md scale-[1.01]"
                      : "bg-transparent text-neutral-800 dark:text-neutral-200 border-b border-black/[0.06] dark:border-white/[0.06] hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40"
                  }`}
                >
                  {/* Left info: Index, Title, Issuer */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 pr-4">
                    <span
                      className={`text-xs font-mono font-medium ${
                        isHovered ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      {indexStr}
                    </span>

                    <div className="min-w-0">
                      <h4
                        className={`text-sm sm:text-base font-semibold tracking-tight truncate ${
                          isHovered ? "text-white dark:text-neutral-950" : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        {cert.name}
                      </h4>
                      <p
                        className={`text-xs font-mono mt-0.5 ${
                          isHovered ? "text-neutral-300 dark:text-neutral-700" : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {cert.issuer} · {cert.domain}
                      </p>
                    </div>
                  </div>

                  {/* Right Action: Arrow icon indicating credentials */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-opacity ${
                      isHovered ? "opacity-100" : "opacity-0 sm:opacity-40"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 ${
                        isHovered ? "text-white dark:text-neutral-950" : "text-neutral-400"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
