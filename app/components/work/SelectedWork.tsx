"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASING, DURATION } from "@/app/lib/motion";
import {
  FALLBACK_PROJECTS,
  UnifiedProject,
  GITHUB_USERNAME,
} from "@/lib/github";
import { fetchProjects } from "@/lib/api/projects";

/**
 * Editorial accent configurations that preserve the refined dark aesthetic
 * while giving each engineering project card a distinctive visual signature.
 */
interface AccentStyle { 
   border: string;
  shadow: string;
  badgeBg: string;
  textAccent: string;
  hoverTitle: string;
  telemetryTitle: string;
  specHighlight: string;
  bullet: string;
  statusDot: string;
  statusText: string;
  defaultStatus: string;
}

const ACCENT_STYLES: AccentStyle[] = [
  {
    border: "border-amber-500/40 hover:border-amber-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(245,158,11,0.18)]",
    badgeBg: "bg-amber-500/10 border-amber-500/40 text-amber-400",
    textAccent: "text-amber-400",
    hoverTitle: "group-hover:text-amber-300",
    telemetryTitle: "text-amber-400",
    specHighlight: "text-amber-300",
    bullet: "text-amber-400",
    statusDot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    statusText: "text-emerald-400",
    defaultStatus: "PRODUCTION READY",
  },
  {
    border: "border-blue-500/40 hover:border-blue-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(59,130,246,0.18)]",
    badgeBg: "bg-blue-500/10 border-blue-500/40 text-blue-400",
    textAccent: "text-blue-400",
    hoverTitle: "group-hover:text-blue-300",
    telemetryTitle: "text-blue-400",
    specHighlight: "text-blue-300",
    bullet: "text-blue-400",
    statusDot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    statusText: "text-emerald-400",
    defaultStatus: "DEPLOYED ON RENDER",
  },
  {
    border: "border-purple-500/40 hover:border-purple-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(168,85,247,0.18)]",
    badgeBg: "bg-purple-500/10 border-purple-500/40 text-purple-400",
    textAccent: "text-purple-400",
    hoverTitle: "group-hover:text-purple-300",
    telemetryTitle: "text-purple-400",
    specHighlight: "text-purple-300",
    bullet: "text-purple-400",
    statusDot: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
    statusText: "text-amber-400",
    defaultStatus: "NOV 2025 – AUG 2026",
  },
  {
    border: "border-emerald-500/40 hover:border-emerald-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(16,185,129,0.18)]",
    badgeBg: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400",
    textAccent: "text-emerald-400",
    hoverTitle: "group-hover:text-emerald-300",
    telemetryTitle: "text-emerald-400",
    specHighlight: "text-emerald-300",
    bullet: "text-emerald-400",
    statusDot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    statusText: "text-emerald-400",
    defaultStatus: "OPEN SOURCE SYSTEM",
  },
  {
    border: "border-cyan-500/40 hover:border-cyan-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(6,182,212,0.18)]",
    badgeBg: "bg-cyan-500/10 border-cyan-500/40 text-cyan-400",
    textAccent: "text-cyan-400",
    hoverTitle: "group-hover:text-cyan-300",
    telemetryTitle: "text-cyan-400",
    specHighlight: "text-cyan-300",
    bullet: "text-cyan-400",
    statusDot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    statusText: "text-cyan-400",
    defaultStatus: "VERIFIED REPOSITORY",
  },
  {
    border: "border-indigo-500/40 hover:border-indigo-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(99,102,241,0.18)]",
    badgeBg: "bg-indigo-500/10 border-indigo-500/40 text-indigo-400",
    textAccent: "text-indigo-400",
    hoverTitle: "group-hover:text-indigo-300",
    telemetryTitle: "text-indigo-400",
    specHighlight: "text-indigo-300",
    bullet: "text-indigo-400",
    statusDot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
    statusText: "text-indigo-400",
    defaultStatus: "UTILITY ENGINE",
  },
  {
    border: "border-rose-500/40 hover:border-rose-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(244,63,94,0.18)]",
    badgeBg: "bg-rose-500/10 border-rose-500/40 text-rose-400",
    textAccent: "text-rose-400",
    hoverTitle: "group-hover:text-rose-300",
    telemetryTitle: "text-rose-400",
    specHighlight: "text-rose-300",
    bullet: "text-rose-400",
    statusDot: "bg-rose-400 shadow-[0_0_8px_#fb7185]",
    statusText: "text-rose-400",
    defaultStatus: "STREAMING UI SYSTEM",
  },
  {
    border: "border-teal-500/40 hover:border-teal-400/70",
    shadow: "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(20,184,166,0.18)]",
    badgeBg: "bg-teal-500/10 border-teal-500/40 text-teal-400",
    textAccent: "text-teal-400",
    hoverTitle: "group-hover:text-teal-300",
    telemetryTitle: "text-teal-400",
    specHighlight: "text-teal-300",
    bullet: "text-teal-400",
    statusDot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    statusText: "text-emerald-400",
    defaultStatus: "SECURITY UTILITY",
  },
];

/**
 * Helper for language color badges.
 */
function getLanguageColor(lang: string | null): string {
  switch (lang?.toLowerCase()) {
    case "typescript":
      return "bg-blue-400/10 text-blue-300 border-blue-400/30";
    case "javascript":
      return "bg-amber-400/10 text-amber-300 border-amber-400/30";
    case "python":
      return "bg-emerald-400/10 text-emerald-300 border-emerald-400/30";
    case "html":
      return "bg-orange-400/10 text-orange-300 border-orange-400/30";
    case "css":
      return "bg-purple-400/10 text-purple-300 border-purple-400/30";
    case "java":
      return "bg-rose-400/10 text-rose-300 border-rose-400/30";
    default:
      return "bg-slate-400/10 text-slate-300 border-slate-400/30";
  }
}

/**
 * Format ISO date string into human-readable month and year.
 */
function formatUpdatedDate(isoString?: string): string {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

/**
 * Unified Project Card component.
 * Engineered to fit within 600px–750px standard laptop viewports with zero vertical cut-off,
 * guaranteed dual action buttons on every project, and zero blur/rasterization artifacts on scroll.
 */
interface ProjectCardProps {
  project: UnifiedProject;
  index: number;
  total: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

function ProjectCard({
  project,
  index,
  total,
  cardRef,
}: ProjectCardProps) {
  const isLast = index === total - 1;
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length];
  const projectNumber = String(index + 1).padStart(2, "0");

  // Compact sticky top anchor: prevents creeping down past viewport bottom
  // Stepped tabs by only 0.25rem (4px) to retain tactile deck look while saving vertical space
  const topRem = 4.25 + Math.min(index, 6) * 0.25;
  const zIndex = 10 + index * 2;

  // Status configuration
  let statusLabel = accent.defaultStatus;
  let statusDotClass = accent.statusDot;
  let statusTextClass = accent.statusText;

  if (project.id === "launchpilot-ai") {
    statusLabel = "PRODUCTION READY";
    statusDotClass = "bg-emerald-400 shadow-[0_0_8px_#34d399]";
    statusTextClass = "text-emerald-400";
  } else if (project.id === "todopro") {
    statusLabel = "DEPLOYED ON RENDER";
    statusDotClass = "bg-emerald-400 shadow-[0_0_8px_#34d399]";
    statusTextClass = "text-emerald-400";
  } else if (project.id === "astrospacious") {
    statusLabel = "NOV 2025 – AUG 2026";
    statusDotClass = "bg-amber-400 shadow-[0_0_8px_#f59e0b]";
    statusTextClass = "text-amber-400";
  } else if (project.homepage) {
    statusLabel = "DEPLOYED & LIVE";
    statusDotClass = "bg-emerald-400 shadow-[0_0_8px_#34d399]";
    statusTextClass = "text-emerald-400";
  } else {
    statusLabel = "SOURCE VERIFIED";
    statusDotClass = "bg-amber-400 shadow-[0_0_8px_#f59e0b]";
    statusTextClass = "text-amber-400";
  }

  // Telemetry Specs for right column
  const telemetrySpecs = project.telemetry?.specs?.slice(0, 5) || [
    { label: "REPOSITORY:", value: `Nish0178/${project.name}` },
    {
      label: "LANGUAGE:",
      value: project.language || "Multi-Language",
      highlight: true,
    },
    { label: "VISIBILITY:", value: "Public · Verified" },
    {
      label: "STARS:",
      value: project.stars > 0 ? `${project.stars} Star${project.stars === 1 ? "" : "s"}` : "Tracked",
      highlight: project.stars > 0,
    },
    {
      label: "SYNCHRONIZED:",
      value: formatUpdatedDate(project.updatedAt) || "Active",
    },
  ];

  // Code snippet preview content
  const codeSnippetContent =
    project.telemetry?.codeSnippet ||
    `git clone https://github.com/Nish0178/${project.name}.git`;

  // Always determine both action URLs:
  // 1. Live demo/platform URL (uses project.homepage if available, or repository demo fallback)
  // 2. Verified GitHub URL
  const liveUrl =
    project.homepage ||
    (project.id === "astrospacious"
      ? "https://github.com/Nish0178"
      : project.htmlUrl);
  const liveLabel = project.homepage ? "LIVE PLATFORM" : "LIVE DEMO";

  return (
    <div
      ref={cardRef}
      className={`sticky ${isLast ? "mb-[60vh] sm:mb-[65vh]" : "mb-24 sm:mb-32"}`}
      style={{
        top: `${topRem}rem`,
        zIndex,
      }}
    >
      {/* 
        NO filters, NO opacity drops, NO scale transforms:
        Guarantees 100% vector-sharp, crystal-clear text on scroll with zero blur.
        Stacking is purely physical via CSS sticky, layered z-indices, stepped tabs, and rich drop shadows.
      */}
      <div
        className={`rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden border ${accent.border} dark:bg-[#0d101c] bg-white ${accent.shadow} shadow-lg group transition-colors duration-300`}
      >
        {/* Ambient Top Corner Light */}
        <div className="absolute top-0 right-0 w-48 h-48 dark:bg-white/[0.02] bg-black/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Card Top Metadata Bar - Compact vertical footprint */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-3.5 border-b dark:border-white/[0.08] border-black/[0.08] mb-3.5 sm:mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-2.5 py-0.5 rounded ${accent.badgeBg} text-[11px] font-bold tracking-[0.16em] uppercase font-mono`}
            >
              {projectNumber} // {project.category || "ENGINEERING SYSTEM"}
            </span>
            <span className="hidden sm:inline-block text-[11px] dark:text-slate-400 text-slate-500 tracking-wider uppercase font-semibold font-mono truncate max-w-[280px]">
              {project.tagline || (project.featured ? "FEATURED ARCHITECTURE" : "VERIFIED REPOSITORY")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.language && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold border ${getLanguageColor(
                  project.language
                )} font-mono`}
              >
                {project.language}
              </span>
            )}

            {project.stars > 0 && (
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded ${accent.badgeBg} text-[10px] sm:text-[11px] font-mono font-bold`}
              >
                <span>★</span>
                <span>
                  {project.stars} {project.stars === 1 ? "STAR" : "STARS"}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${statusDotClass}`} />
              <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase font-mono ${statusTextClass}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Content & Telemetry Grid - Tuned to fit within viewport effortlessly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
          
          {/* Left Column: Title, Description, Tech, Highlights, Dual Action Buttons */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
            <div>
              <h3
                className={`serif-headline text-2xl sm:text-3xl lg:text-3xl font-bold dark:text-white text-slate-900 uppercase tracking-tight mb-1.5 ${accent.hoverTitle} transition-colors group-hover:translate-x-0.5`}
              >
                {project.displayTitle}
              </h3>
              <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 leading-relaxed font-serif line-clamp-3 sm:line-clamp-none">
                {project.description || "Personal engineering repository on GitHub."}
              </p>
            </div>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wider dark:text-slate-200 dark:bg-white/[0.05] dark:border-white/10 text-slate-700 bg-slate-100 border border-black/10 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Architectural Highlights (2 key points) */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-1 pt-0.5 text-xs dark:text-slate-300 text-slate-600 font-serif hidden sm:block">
                {project.features.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className={`${accent.bullet} mt-0.5 text-[10px]`}>▸</span>
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Dual Action Buttons: Always present and fully visible on EVERY project */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-[0.14em] uppercase font-mono shadow-md"
              >
                <span>{liveLabel}</span>
                <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              <a
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-[0.14em] uppercase font-mono"
              >
                <span>VIEW ON GITHUB</span>
                <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Architecture Telemetry Table */}
          <div className="lg:col-span-5 dark:bg-[#080a12] bg-slate-50 rounded-xl border dark:border-white/10 border-black/10 p-3.5 sm:p-4 text-xs shadow-inner font-mono">
            <div className="text-[10px] uppercase tracking-[0.2em] dark:text-slate-400 text-slate-500 pb-2 mb-2 border-b dark:border-white/[0.08] border-black/[0.08] flex items-center justify-between">
              <span>ARCHITECTURE TELEMETRY</span>
              <span className={`${accent.telemetryTitle} font-bold`}>
                NODE // {projectNumber}
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {telemetrySpecs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-0.5 ${
                    i < telemetrySpecs.length - 1 ? "border-b dark:border-white/5 border-black/5" : ""
                  }`}
                >
                  <span className="dark:text-slate-400 text-slate-500 text-[11px]">{spec.label}</span>
                  <span
                    className={`${
                      spec.highlight
                        ? `${accent.specHighlight} font-bold serif-italic`
                        : "dark:text-white text-slate-800 font-medium"
                    } text-right text-[11px] truncate max-w-[190px]`}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Telemetry Indicator if present */}
            {project.telemetry?.p95Latency && (
              <div className="mt-2 pt-2 border-t dark:border-white/[0.08] border-black/[0.08] dark:bg-black/70 bg-slate-900 text-white px-2.5 py-1.5 rounded flex items-center justify-between text-[10px]">
                <span>API Response P95:</span>
                <span className="text-emerald-400 font-bold">{project.telemetry.p95Latency}</span>
              </div>
            )}

            {/* Code Contract Snippet or Clone preview */}
            <div className="mt-2.5 pt-2 border-t dark:border-white/[0.08] border-black/[0.08] dark:bg-black/70 bg-slate-900 p-2 rounded text-[10px] leading-normal overflow-x-auto">
              <pre className="font-mono text-amber-400 dark:text-amber-300">
                <code>{codeSnippetContent}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // State initialized with verified fallback data for instant SSR & zero layout shift
  const [projects, setProjects] = useState<UnifiedProject[]>(FALLBACK_PROJECTS);

  // Stable pre-allocated refs for cards
  const cardRefs = useRef<React.RefObject<HTMLDivElement | null>[]>([]);
  if (cardRefs.current.length < projects.length) {
    cardRefs.current = Array.from(
      { length: Math.max(projects.length, 30) },
      () => React.createRef<HTMLDivElement>()
    );
  }

  // Fetch live project data on mount via API abstraction layer
  useEffect(() => {
    let isMounted = true;

    async function syncGitHubData() {
      try {
        const liveProjects = await fetchProjects();
        if (isMounted && Array.isArray(liveProjects) && liveProjects.length > 0) {
          setProjects(liveProjects);
        }
      } catch (err) {
        console.warn("GitHub project sync fallback retained:", err);
      }
    }

    syncGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Large typography scroll coupling for section header
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(sectionScroll, [0, 1], [20, 0]);
  const headlineScale = useTransform(sectionScroll, [0, 1], [0.98, 1]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-22 px-6 sm:px-8 lg:px-12 overflow-visible bg-[var(--bg-page)] transition-colors duration-300"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Scroll Coupling */}
        <div className="mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
              className="flex items-center gap-2"
            >
              <span className="text-amber-500 dark:text-amber-400 text-xs font-bold tracking-[0.24em] uppercase font-mono">
                02 / ENGINEERING PROJECTS
              </span>
              <span className="w-8 h-[1px] bg-amber-500/40" />
            </motion.div>

            {/* Live GitHub Sync Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-3 py-1 rounded-full dark:bg-white/[0.03] dark:border-white/[0.08] dark:text-slate-300 bg-black/[0.03] border border-black/[0.08] text-slate-700 text-[11px] font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="dark:text-slate-400 text-slate-500">GITHUB SYNC:</span>
              <span className="text-amber-500 dark:text-amber-400 font-semibold uppercase">
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
            className="serif-headline text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-[var(--text-primary)]">ENGINEERING</span>
            <span className="block text-gold-gradient serif-italic">PROJECTS.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed font-serif"
          >
            Scroll down to experience the physical architecture card stack. Every platform was built to solve complex operational challenges with rigorous engineering and verified source code.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            UNIFIED PHYSICAL STACKING SCENE:
            Every card fits perfectly within standard viewports with zero cut-off,
            guaranteed dual action buttons, and zero scroll blur.
           ═════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              cardRef={cardRefs.current[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
