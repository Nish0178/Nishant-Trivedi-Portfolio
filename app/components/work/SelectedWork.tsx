"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING, DURATION } from "@/app/lib/motion";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Large typography scroll coupling for section header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#07080c]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-amber-500/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll Coupling */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
              02 / FEATURED WORK
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

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
            Scroll down to unlock the system architecture cards. Each platform was built to solve complex operational challenges with rigorous engineering.
          </motion.p>
        </div>

        {/* Project Architecture Cards Stack with Distinct Motion Personalities */}
        <div className="space-y-16">
          
          {/* ═════════════════════════════════════════════════════════
              PROJECT 01: LAUNCHPILOT AI (FLAGSHIP CHAPTER MOTION)
              Sequential reveal: 01 badge -> label -> title -> content
              Container scales subtly 0.94 -> 1 with smooth cinematic ease
             ═════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-amber-500/35 bg-[#0d101c]/95 group transition-all duration-500 hover:border-amber-400/60"
          >
            {/* 1. Project number: 01 reveals first + status */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.normal, delay: 0.1, ease: EASING.cinematic }}
                className="flex items-center gap-3"
              >
                <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-[0.16em] uppercase">
                  01 // AI + PRODUCT VALIDATION PLATFORM
                </span>
                <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                  FLAGSHIP SYSTEM
                </span>
              </motion.div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="text-xs text-emerald-400 font-bold tracking-[0.16em] uppercase">
                  PRODUCTION READY
                </span>
              </div>
            </div>

            {/* Content & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Description */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  {/* 2. LAUNCHPILOT AI title with subtle hover drift */}
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION.normal, delay: 0.2, ease: EASING.cinematic }}
                    className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors group-hover:translate-x-1"
                  >
                    LAUNCHPILOT AI
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION.normal, delay: 0.3, ease: EASING.cinematic }}
                    className="text-base text-slate-300 leading-relaxed"
                  >
                    AI-powered startup validation and product engineering engine. Orchestrates multi-stage idea analysis, market feasibility scoring, and automated tech stack generation via structured multimodal AI workflows.
                  </motion.p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Next.js 15", "TypeScript", "Express.js", "Prisma", "SQLite", "Gemini 2.5 Flash", "Zod", "REST API"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Multi-pass prompt pipelines generating deterministic, schema-validated JSON.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Decoupled Express backend orchestrating Gemini inference and Prisma ORM data storage.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Sub-2.5s end-to-end report generation with full TypeScript type safety across boundaries.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="https://launch-pilot-eta.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase"
                  >
                    <span>LIVE PLATFORM</span>
                    <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                  <a
                    href="https://github.com/Nish0178/Launch-pilot"
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
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.cinematic, delay: 0.25, ease: EASING.cinematic }}
                className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 text-xs shadow-inner"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>ARCHITECTURE TELEMETRY</span>
                  <span className="text-amber-400 font-bold">NODE // 01</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ARCHITECTURE:</span>
                    <span className="text-white font-medium text-right">Next.js + Express Pipeline</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">AI CORE:</span>
                    <span className="text-amber-300 font-bold text-right serif-italic">Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATABASE:</span>
                    <span className="text-white font-medium text-right">SQLite via Prisma ORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">VALIDATION:</span>
                    <span className="text-emerald-400 font-bold text-right">Strict Zod Type Schemas</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATAFLOW:</span>
                    <span className="text-slate-200 font-medium text-right">Client → Express → AI → DB</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">DEPLOYMENT:</span>
                    <span className="text-white font-medium text-right">Vercel (Production)</span>
                  </div>
                </div>

                {/* Code contract snippet preview */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/60 p-3 rounded text-[11px] text-amber-300 leading-normal overflow-x-auto">
                  <code>
                    export const ValidationSchema = z.object({`{`}<br />
                    &nbsp;&nbsp;viabilityScore: z.number().min(0).max(100),<br />
                    &nbsp;&nbsp;marketFit: z.enum([&quot;HIGH&quot;, &quot;MODERATE&quot;, &quot;LOW&quot;]),<br />
                    &nbsp;&nbsp;techStack: z.array(z.string()),<br />
                    {`}`});
                  </code>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════
              PROJECT 02: TODOPRO ENGINE (DIFFERENT MOTION PERSONALITY)
              Counter-drift: text enters from left, visual enters from right
              Settles cleanly into balanced layout
             ═════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-white/10 bg-[#0d101c]/95 group transition-all duration-500 hover:border-blue-400/50"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/40 text-blue-400 text-xs font-bold tracking-[0.16em] uppercase">
                  02 // FULL-STACK TASK ENGINE
                </span>
                <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                  CRUD + ANALYTICS PLATFORM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="text-xs text-emerald-400 font-bold tracking-[0.16em] uppercase">
                  DEPLOYED ON RENDER
                </span>
              </div>
            </div>

            {/* Content & Telemetry Grid with Horizontal Counter-Entrance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Text Enters from Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.cinematic, delay: 0.15, ease: EASING.cinematic }}
                className="lg:col-span-7 space-y-6"
              >
                <div>
                  <h3 className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-blue-300 transition-colors group-hover:translate-x-1">
                    TODOPRO ENGINE
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Full-stack task management application featuring stateless JWT authentication, MongoDB indexing, priority scheduling, dynamic Chart.js productivity telemetry, and client-side jsPDF/CSV report generation.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["JavaScript", "Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "Chart.js", "jsPDF", "JWT Auth"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Stateless authentication with bcrypt password hashing and secure HTTP cookies.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Visual completion metrics and velocity graphing powered by Chart.js.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Client-side PDF compilation and CSV exports for full task data portability.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="https://todo-pro-web-frontend.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase"
                  >
                    <span>LIVE APP</span>
                    <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                  <a
                    href="https://github.com/Nish0178/todo-pro-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase"
                  >
                    <span>VIEW ON GITHUB</span>
                    <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Visual Telemetry Enters from Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.cinematic, delay: 0.25, ease: EASING.cinematic }}
                className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 text-xs shadow-inner"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>ARCHITECTURE TELEMETRY</span>
                  <span className="text-blue-400 font-bold">NODE // 02</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">AUTH PROTOCOL:</span>
                    <span className="text-white font-medium text-right">Stateless JWT + Bcrypt</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATABASE:</span>
                    <span className="text-blue-300 font-bold text-right">MongoDB Atlas + Mongoose</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">VISUALIZATION:</span>
                    <span className="text-white font-medium text-right">Chart.js Velocity Engine</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATA EXPORT:</span>
                    <span className="text-emerald-400 font-bold text-right">jsPDF + Dynamic CSV</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">HOSTING:</span>
                    <span className="text-white font-medium text-right">Render Cloud Deployment</span>
                  </div>
                </div>

                {/* Telemetry Indicator */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/60 p-3 rounded flex items-center justify-between text-[11px] text-slate-300">
                  <span>API Response P95:</span>
                  <span className="text-emerald-400 font-bold">&lt; 120ms</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ═════════════════════════════════════════════════════════
              PROJECT 03: ASTROSPACIOUS (VERTICAL CLIP-PATH MASK MOTION)
              Vertical clip reveal with typography fade and upward movement
             ═════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(12% 0% 0% 0%)", y: 25 }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-white/10 bg-[#0d101c]/95 group transition-all duration-500 hover:border-purple-400/50"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/40 text-purple-400 text-xs font-bold tracking-[0.16em] uppercase">
                  03 // COMMERCIAL WEB PLATFORM
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
                    ASTROSPACIOUS
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Commercial web application interfaces and frontend modules built as a Web Development Intern, delivering high-performance UI components, seamless mobile responsiveness, and clean Git collaboration.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["React.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Responsive UI", "Git Workflow"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Engineered modular UI components with zero layout shift across 320px–1920px viewports.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Collaborated within agile sprint cycles with strict code reviews and Git branching strategies.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Optimized DOM rendering performance and client bundle size for fast initial load.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverable Telemetry Table */}
              <div className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>DELIVERABLE TELEMETRY</span>
                  <span className="text-purple-400 font-bold">NODE // 03</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ORGANIZATION:</span>
                    <span className="text-white font-medium text-right">ASTROSPACIOUS</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ROLE:</span>
                    <span className="text-purple-300 font-bold text-right">Web Development Intern</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DURATION:</span>
                    <span className="text-white font-medium text-right">Nov 2025 – Aug 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">FOCUS:</span>
                    <span className="text-emerald-400 font-bold text-right">Commercial UI Architecture</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">CONTRIBUTION:</span>
                    <span className="text-slate-200 font-medium text-right">Verified Internship Engineering</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
