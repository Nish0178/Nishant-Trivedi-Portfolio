"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FALLBACK_PROJECTS, 
  UnifiedProject 
} from "@/lib/github";
import { fetchProjects } from "@/lib/api/projects";
import { 
  Plus, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers 
} from "lucide-react";

export default function SelectedWork() {
  const [projects, setProjects] = useState<UnifiedProject[]>(FALLBACK_PROJECTS);
  const [activeId, setActiveId] = useState<string>(FALLBACK_PROJECTS[0]?.id || "launchpilot-ai");

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((data) => {
      if (mounted && Array.isArray(data) && data.length > 0) {
        setProjects(data);
        if (!data.some((p) => p.id === activeId)) {
          setActiveId(data[0].id);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, [activeId]);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            03 — WORK
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* Section Header matching Reference Frame 21 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              Things I&apos;ve{" "}
              <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
                built.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal max-w-sm tracking-wide md:text-right">
            Featured engineering systems across AI, cloud pipelines, and full-stack architecture. Hover or tap a panel to open it.
          </p>
        </div>

        {/* Interactive Expandable Horizontal Accordion Deck matching Frame 21 */}
        <div className="hidden lg:flex gap-4 h-[580px] w-full items-stretch">
          {projects.slice(0, 4).map((p, idx) => {
            const isExpanded = p.id === activeId;
            const indexStr = `0${idx + 1}`;

            if (!isExpanded) {
              return (
                <motion.div
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  className="w-20 bg-[#EAE6DC]/70 dark:bg-[#1A1C22]/70 backdrop-blur-md rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between items-center cursor-pointer hover:bg-[#E2DDD3] dark:hover:bg-[#22252E] transition-all duration-300 relative overflow-hidden group shadow-sm"
                  layout
                >
                  <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
                    {indexStr}
                  </span>

                  {/* Rotated Vertical Title */}
                  <div className="[writing-mode:vertical-rl] rotate-180 text-sm font-bold tracking-wider text-neutral-700 dark:text-neutral-300 uppercase whitespace-nowrap group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    {p.displayTitle || p.name}
                  </div>

                  {/* Plus Icon Button */}
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs shadow-sm group-hover:scale-110 transition-transform">
                    <Plus className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={p.id}
                layout
                className="flex-1 bg-[#ECE8DF] dark:bg-[#18191E] rounded-3xl p-8 sm:p-10 border border-black/[0.08] dark:border-white/[0.08] shadow-lg flex flex-col justify-between overflow-hidden relative"
              >
                {/* Background Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-900/[0.03] dark:bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-12 gap-8 h-full items-center">
                  {/* Left Column: Information, Features, Tech Pills, Actions */}
                  <div className="col-span-7 flex flex-col justify-between h-full py-1">
                    <div>
                      {/* Chapter / Category Kicker */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                          {p.chapter || `${indexStr} — ${p.category?.toUpperCase() || "FEATURED PRODUCT"}`}
                        </span>
                        {p.recognition && (
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                            {p.recognition}
                          </span>
                        )}
                      </div>

                      {/* Main Title */}
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3">
                        {p.displayTitle || p.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mb-6 max-w-xl">
                        {p.description}
                      </p>

                      {/* Key Features Bullets (2-column layout matching frame 21) */}
                      {p.features && p.features.length > 0 && (
                        <div className="grid grid-cols-2 gap-2.5 mb-6">
                          {p.features.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white mt-1.5 shrink-0" />
                              <span className="leading-tight">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Badges & Action Buttons */}
                    <div>
                      {/* Tech Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        {p.technologies?.slice(0, 7).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-black/[0.04] dark:border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                        {p.technologies && p.technologies.length > 7 && (
                          <span className="text-[11px] text-neutral-500 font-mono px-1">
                            +{p.technologies.length - 7}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3">
                        {p.htmlUrl && (
                          <a
                            href={p.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md inline-flex items-center gap-1.5"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>View on GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                          </a>
                        )}

                        {p.homepage && (
                          <a
                            href={p.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium active:scale-95 transition-all inline-flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Illustrative Live Visual Preview (Exact Reference Layout Frame 21) */}
                  <div className="col-span-5 h-full flex items-center justify-center">
                    <div className="w-full h-[90%] bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col justify-between overflow-hidden relative">
                      {/* Top Preview Bar */}
                      <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3 mb-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                          SYSTEM TELEMETRY
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            LIVE RUNTIME
                          </span>
                        </div>
                      </div>

                      {/* Mockup Dynamic Content */}
                      {p.id === "launchpilot-ai" ? (
                        <div className="space-y-4 my-auto">
                          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-black/[0.04] dark:border-white/[0.04]">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                Investor Readiness Score
                              </span>
                              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                94/100
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                              <div className="w-[94%] h-full bg-neutral-900 dark:bg-white rounded-full" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.04] dark:border-white/[0.04]">
                              <p className="font-mono text-neutral-400 text-[9px] uppercase">Market Depth</p>
                              <p className="font-semibold text-neutral-900 dark:text-white">$4.2B TAM</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-black/[0.04] dark:border-white/[0.04]">
                              <p className="font-mono text-neutral-400 text-[9px] uppercase">Unit Economics</p>
                              <p className="font-semibold text-neutral-900 dark:text-white">LTV/CAC 4.8x</p>
                            </div>
                          </div>
                        </div>
                      ) : p.id === "todopro" ? (
                        <div className="space-y-3 my-auto">
                          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                            Task Velocity & Completion Heatmap
                          </p>
                          <div className="grid grid-cols-7 gap-1.5">
                            {Array.from({ length: 28 }).map((_, i) => (
                              <div
                                key={i}
                                className={`aspect-square rounded-sm ${
                                  i % 5 === 0
                                    ? "bg-neutral-900 dark:bg-white"
                                    : i % 3 === 0
                                    ? "bg-neutral-600 dark:bg-neutral-400"
                                    : i % 2 === 0
                                    ? "bg-neutral-400 dark:bg-neutral-600"
                                    : "bg-neutral-200 dark:bg-neutral-800"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 my-auto">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span>Signal Optimization</span>
                            <span className="text-emerald-500 font-mono">-38% Congestion</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded flex overflow-hidden text-[9px] font-mono">
                              <div className="bg-emerald-500 w-[45%] text-white text-center leading-4">North 45s</div>
                              <div className="bg-amber-500 w-[30%] text-white text-center leading-4">East 30s</div>
                              <div className="bg-neutral-400 w-[25%] text-white text-center leading-4">West 25s</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Caption */}
                      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span>MODEL: GEMINI 2.5 FLASH</span>
                        <span>LATENCY: 240MS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet Responsive Stack */}
        <div className="lg:hidden flex flex-col gap-6">
          {projects.map((p, idx) => {
            const indexStr = `0${idx + 1}`;
            return (
              <div
                key={p.id}
                className="bg-[#ECE8DF] dark:bg-[#18191E] rounded-2xl p-6 sm:p-8 border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    {p.chapter || `${indexStr} — ${p.category?.toUpperCase() || "FEATURED PRODUCT"}`}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1 mb-3">
                    {p.displayTitle || p.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mb-5">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {p.technologies?.slice(0, 6).map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  {p.htmlUrl && (
                    <a
                      href={p.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold tracking-wide inline-flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.homepage && (
                    <a
                      href={p.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
