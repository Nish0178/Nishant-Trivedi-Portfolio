"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASING, DURATION } from "@/app/lib/motion";
import {
  FALLBACK_PROJECTS,
  UnifiedProject,
  GITHUB_USERNAME,
} from "@/lib/github";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // State initialized with verified fallback data for instant SSR & zero layout shift
  const [projects, setProjects] = useState<UnifiedProject[]>(FALLBACK_PROJECTS);
  const [syncStatus, setSyncStatus] = useState<"cached" | "synced" | "live">("cached");

  // Fetch live GitHub data on mount
  useEffect(() => {
    let isMounted = true;

    async function syncGitHubData() {
      try {
        const response = await fetch("/api/github/repos");
        if (!response.ok) return;

        const data = await response.json();
        if (isMounted && data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
          setSyncStatus("live");
        }
      } catch (err) {
        // Silently preserve verified fallback projects on network/API failure
        console.warn("GitHub project sync fallback retained:", err);
      }
    }

    syncGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Split into primary featured chapters (for cinematic physical stacking) and discovered repositories
  const featuredProjects = projects.filter((p) => p.featured);
  const secondaryProjects = projects.filter((p) => !p.featured);

  // Large typography scroll coupling for section header
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(sectionScroll, [0, 1], [25, 0]);
  const headlineScale = useTransform(sectionScroll, [0, 1], [0.97, 1]);

  // Card 01 Transform: As Card 02 moves up and stacks over Card 01, Card 01 gently scales down and recedes
  const { scrollYProgress: card2Scroll } = useScroll({
    target: card2Ref,
    offset: ["start end", "start 180px"],
  });

  const card1Scale = useTransform(card2Scroll, [0, 1], [1, shouldReduceMotion ? 1 : 0.95]);
  const card1Opacity = useTransform(card2Scroll, [0, 1], [1, shouldReduceMotion ? 1 : 0.65]);
  const card1Brightness = useTransform(card2Scroll, [0, 1], ["brightness(1)", shouldReduceMotion ? "brightness(1)" : "brightness(0.75)"]);

  // Card 02 Transform: As Card 03 moves up and stacks over Card 02, Card 02 gently scales down and recedes
  const { scrollYProgress: card3Scroll } = useScroll({
    target: card3Ref,
    offset: ["start end", "start 210px"],
  });

  const card2Scale = useTransform(card3Scroll, [0, 1], [1, shouldReduceMotion ? 1 : 0.96]);
  const card2Opacity = useTransform(card3Scroll, [0, 1], [1, shouldReduceMotion ? 1 : 0.7]);
  const card2Brightness = useTransform(card3Scroll, [0, 1], ["brightness(1)", shouldReduceMotion ? "brightness(1)" : "brightness(0.8)"]);

  // Safe accessor for featured projects
  const p1 = featuredProjects[0] || FALLBACK_PROJECTS[0];
  const p2 = featuredProjects[1] || FALLBACK_PROJECTS[1];
  const p3 = featuredProjects[2] || FALLBACK_PROJECTS[2];

  // Helper for language color badges
  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "typescript":
        return "bg-blue-400 text-blue-300 border-blue-400/30";
      case "javascript":
        return "bg-amber-400 text-amber-300 border-amber-400/30";
      case "python":
        return "bg-emerald-400 text-emerald-300 border-emerald-400/30";
      case "html":
        return "bg-orange-400 text-orange-300 border-orange-400/30";
      case "css":
        return "bg-purple-400 text-purple-300 border-purple-400/30";
      case "java":
        return "bg-rose-400 text-rose-300 border-rose-400/30";
      default:
        return "bg-slate-400 text-slate-300 border-slate-400/30";
    }
  };

  const formatUpdatedDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 overflow-visible bg-[#07080c]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll Coupling */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
              className="flex items-center gap-2"
            >
              <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
                02 / FEATURED WORK
              </span>
              <span className="w-8 h-[1px] bg-amber-500/40" />
            </motion.div>

            {/* Live GitHub Sync Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-slate-400">GITHUB SYNC:</span>
              <span className="text-amber-400 font-semibold uppercase">
                @{GITHUB_USERNAME} · {projects.length} PROJECTS
              </span>
            </motion.div>
          </div>

          <motion.h2
            style={{ y: headlineY, scale: headlineScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-white">SELECTED WORKS.</span>
            <span className="block text-gold-gradient serif-italic">ENGINEERED VALUE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed"
          >
            Scroll down to experience the physical architecture card stack. Each platform was built to solve complex operational challenges with rigorous engineering.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            CINEMATIC STACKING SCENE:
            Project 01 anchors at top.
            Project 02 stacks physically over Project 01.
            Project 03 stacks physically over Project 02.
            Fully 2-way reversible on scroll up and down.
           ═════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          
          {/* ═════════════════════════════════════════════════════════
              PROJECT CARD 01: LAUNCHPILOT AI (FLAGSHIP CHAPTER)
              Sticky Anchor · Layer Z-10
             ═════════════════════════════════════════════════════════ */}
          <div className="sticky top-20 sm:top-24 lg:top-28 z-10 mb-36 sm:mb-48">
            <motion.div
              style={{
                scale: card1Scale,
                opacity: card1Opacity,
                filter: card1Brightness,
              }}
              transition={{ ease: EASING.smooth }}
              className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border border-amber-500/40 bg-[#0d101c] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_-5px_rgba(245,158,11,0.2)] group transition-colors duration-500 hover:border-amber-400/70"
            >
              {/* Card Top Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-[0.16em] uppercase">
                    01 // {p1.category}
                  </span>
                  <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                    FLAGSHIP SYSTEM
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {p1.stars > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                      <span>★</span>
                      <span>{p1.stars} {p1.stars === 1 ? "STAR" : "STARS"}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span className="text-xs text-emerald-400 font-bold tracking-[0.16em] uppercase">
                      PRODUCTION READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Content & Telemetry Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Project Description */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors group-hover:translate-x-1">
                      {p1.displayTitle}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      {p1.description}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p1.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Architectural highlights list */}
                  {p1.features && (
                    <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                      {p1.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-amber-400">▸</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {p1.homepage && (
                      <a
                        href={p1.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase"
                      >
                        <span>LIVE PLATFORM</span>
                        <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </a>
                    )}
                    <a
                      href={p1.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                    >
                      <span>VIEW ON GITHUB</span>
                      <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Architecture Telemetry Table */}
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span>ARCHITECTURE TELEMETRY</span>
                    <span className="text-amber-400 font-bold">NODE // 01</span>
                  </div>

                  <div className="space-y-3.5">
                    {p1.telemetry?.specs.map((spec, i) => (
                      <div key={i} className={`flex justify-between items-center py-1 ${i < (p1.telemetry?.specs.length || 0) - 1 ? "border-b border-white/5" : ""}`}>
                        <span className="text-slate-400">{spec.label}</span>
                        <span className={`${spec.highlight ? "text-amber-300 font-bold serif-italic" : "text-white font-medium"} text-right`}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Code contract snippet preview */}
                  {p1.telemetry?.codeSnippet && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/70 p-3 rounded text-[11px] text-amber-300 leading-normal overflow-x-auto">
                      <pre className="font-mono">
                        <code>{p1.telemetry.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>

          {/* ═════════════════════════════════════════════════════════
              PROJECT CARD 02: TODOPRO ENGINE (STACKS OVER CARD 01)
              Sticky Layer Z-20 · Offsets to top-24/top-32
             ═════════════════════════════════════════════════════════ */}
          <div
            ref={card2Ref}
            className="sticky top-24 sm:top-28 lg:top-32 z-20 mb-36 sm:mb-48"
          >
            <motion.div
              style={{
                scale: card2Scale,
                opacity: card2Opacity,
                filter: card2Brightness,
              }}
              transition={{ ease: EASING.smooth }}
              className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border border-blue-500/40 bg-[#0d101c] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_-5px_rgba(59,130,246,0.2)] group transition-colors duration-500 hover:border-blue-400/70"
            >
              {/* Top Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/40 text-blue-400 text-xs font-bold tracking-[0.16em] uppercase">
                    02 // {p2.category}
                  </span>
                  <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                    CRUD + ANALYTICS PLATFORM
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {p2.stars > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                      <span>★</span>
                      <span>{p2.stars} {p2.stars === 1 ? "STAR" : "STARS"}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span className="text-xs text-emerald-400 font-bold tracking-[0.16em] uppercase">
                      DEPLOYED ON RENDER
                    </span>
                  </div>
                </div>
              </div>

              {/* Content & Telemetry Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Description & Highlights */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-blue-300 transition-colors group-hover:translate-x-1">
                      {p2.displayTitle}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      {p2.description}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p2.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Architectural highlights list */}
                  {p2.features && (
                    <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                      {p2.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-amber-400">▸</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {p2.homepage && (
                      <a
                        href={p2.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase"
                      >
                        <span>LIVE APP</span>
                        <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </a>
                    )}
                    <a
                      href={p2.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                    >
                      <span>VIEW ON GITHUB</span>
                      <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Architecture Telemetry Table */}
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span>ARCHITECTURE TELEMETRY</span>
                    <span className="text-blue-400 font-bold">NODE // 02</span>
                  </div>

                  <div className="space-y-3.5">
                    {p2.telemetry?.specs.map((spec, i) => (
                      <div key={i} className={`flex justify-between items-center py-1 ${i < (p2.telemetry?.specs.length || 0) - 1 ? "border-b border-white/5" : ""}`}>
                        <span className="text-slate-400">{spec.label}</span>
                        <span className={`${spec.highlight ? "text-blue-300 font-bold" : "text-white font-medium"} text-right`}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Telemetry Indicator */}
                  {p2.telemetry?.p95Latency && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/70 p-3 rounded flex items-center justify-between text-[11px] text-slate-300">
                      <span>API Response P95:</span>
                      <span className="text-emerald-400 font-bold">{p2.telemetry.p95Latency}</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>

          {/* ═════════════════════════════════════════════════════════
              PROJECT CARD 03: ASTROSPACIOUS (STACKS OVER CARD 02)
              Sticky Layer Z-30 · Offsets to top-28/top-36
             ═════════════════════════════════════════════════════════ */}
          <div
            ref={card3Ref}
            className="sticky top-28 sm:top-32 lg:top-36 z-30 mb-16 sm:mb-24"
          >
            <motion.div
              transition={{ ease: EASING.smooth }}
              className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border border-purple-500/40 bg-[#0d101c] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_-5px_rgba(168,85,247,0.2)] group transition-colors duration-500 hover:border-purple-400/70"
            >
              {/* Top Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/40 text-purple-400 text-xs font-bold tracking-[0.16em] uppercase">
                    03 // {p3.category}
                  </span>
                  <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                    COMMERCIAL INTERNSHIP PROJECT
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                  <span className="text-xs text-amber-400 font-bold tracking-[0.16em] uppercase">
                    NOV 2025 – AUG 2026
                  </span>
                </div>
              </div>

              {/* Content & Telemetry Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Project Description */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-purple-300 transition-colors group-hover:translate-x-1">
                      {p3.displayTitle}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      {p3.description}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p3.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Architectural highlights list */}
                  {p3.features && (
                    <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                      {p3.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-amber-400">▸</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Deliverable Telemetry Table */}
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span>DELIVERABLE TELEMETRY</span>
                    <span className="text-purple-400 font-bold">NODE // 03</span>
                  </div>

                  <div className="space-y-3.5">
                    {p3.telemetry?.specs.map((spec, i) => (
                      <div key={i} className={`flex justify-between items-center py-1 ${i < (p3.telemetry?.specs.length || 0) - 1 ? "border-b border-white/5" : ""}`}>
                        <span className="text-slate-400">{spec.label}</span>
                        <span className={`${spec.highlight ? "text-purple-300 font-bold" : "text-white font-medium"} text-right`}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════
            AUTOMATIC REPOSITORY DISCOVERY & OPEN SOURCE SYSTEMS LAB:
            Dynamically populates from Nishant's GitHub profile (@Nish0178).
            Scales gracefully from 5 to 50+ repositories with refined visual hierarchy.
           ═════════════════════════════════════════════════════════════════ */}
        {secondaryProjects.length > 0 && (
          <div className="mt-28 pt-16 border-t border-white/[0.08]">
            
            {/* Lab Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase font-mono">
                    02.2 // OPEN SOURCE REPOSITORIES
                  </span>
                  <span className="w-8 h-[1px] bg-amber-500/40" />
                </div>
                <h3 className="serif-headline text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                  ENGINEERING LAB &amp; REPOSITORIES.
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                  Public repositories and utilities discovered automatically from GitHub profile. Real-time stars, languages, and direct source links.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase"
                >
                  <span>EXPLORE ALL ON GITHUB</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>
            </div>

            {/* Grid of Discovered Repositories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((repo, idx) => {
                const projectNumber = String(featuredProjects.length + idx + 1).padStart(2, "0");
                const langColorClass = getLanguageColor(repo.language);

                return (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: DURATION.normal, delay: idx * 0.06, ease: EASING.cinematic }}
                    className="rounded-xl p-6 bg-[#0c0e18] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_35px_-10px_rgba(245,158,11,0.1)] relative overflow-hidden"
                  >
                    {/* Top ambient hover glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] group-hover:bg-amber-500/[0.08] rounded-full blur-2xl transition-all pointer-events-none" />

                    <div>
                      {/* Card Top Metadata */}
                      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06] text-xs font-mono">
                        <span className="text-slate-400 font-bold">
                          // {projectNumber}
                        </span>

                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${langColorClass} bg-white/[0.02]`}>
                              {repo.language}
                            </span>
                          )}

                          {repo.stars > 0 && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                              <span>★</span>
                              <span>{repo.stars}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2">
                        {repo.displayTitle}
                      </h4>

                      {/* Real description if available, otherwise omitted without fabrication */}
                      {repo.description ? (
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                          {repo.description}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic mb-4">
                          Verified open-source repository under @{GITHUB_USERNAME}.
                        </p>
                      )}

                      {/* Tech topics / tags */}
                      {repo.technologies && repo.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {repo.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/[0.03] border border-white/[0.06]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Links & Updated Timestamp */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs mt-auto">
                      <span className="text-[10px] font-mono text-slate-400">
                        {repo.updatedAt ? formatUpdatedDate(repo.updatedAt) : "ACTIVE REPO"}
                      </span>

                      <div className="flex items-center gap-3">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 font-semibold tracking-wider text-[11px] uppercase flex items-center gap-1 transition-colors"
                          >
                            <span>DEMO</span>
                            <span>↗</span>
                          </a>
                        )}

                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 font-semibold tracking-wider text-[11px] uppercase flex items-center gap-1 transition-colors"
                        >
                          <span>GITHUB</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
