"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASING, DURATION } from "@/app/lib/motion";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
                    01 // AI + PRODUCT VALIDATION PLATFORM
                  </span>
                  <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                    FLAGSHIP SYSTEM
                  </span>
                </div>

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
                    <h3 className="serif-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors group-hover:translate-x-1">
                      LAUNCHPILOT AI
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      AI-powered startup validation and product engineering engine. Orchestrates multi-stage idea analysis, market feasibility scoring, and automated tech stack generation via structured multimodal AI workflows.
                    </p>
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
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
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
                  <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/70 p-3 rounded text-[11px] text-amber-300 leading-normal overflow-x-auto">
                    <code>
                      export const ValidationSchema = z.object({`{`}<br />
                      &nbsp;&nbsp;viabilityScore: z.number().min(0).max(100),<br />
                      &nbsp;&nbsp;marketFit: z.enum([&quot;HIGH&quot;, &quot;MODERATE&quot;, &quot;LOW&quot;]),<br />
                      &nbsp;&nbsp;techStack: z.array(z.string()),<br />
                      {`}`});
                    </code>
                  </div>
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

              {/* Content & Telemetry Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Description & Highlights */}
                <div className="lg:col-span-7 space-y-6">
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
                </div>

                {/* Right Column: Architecture Telemetry Table */}
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
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
                  <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/70 p-3 rounded flex items-center justify-between text-[11px] text-slate-300">
                    <span>API Response P95:</span>
                    <span className="text-emerald-400 font-bold">&lt; 120ms</span>
                  </div>
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
                <div className="lg:col-span-5 bg-[#080a12] rounded-xl border border-white/10 p-5 text-xs shadow-inner">
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

      </div>
    </section>
  );
}
