"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PROJECTS } from "@/lib/portfolio-data";

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState<Record<string, "overview" | "schema">>({
    "launchpilot-ai": "overview",
  });

  const toggleTab = (id: string, tab: "overview" | "schema") => {
    setActiveTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              02 / FEATURED WORK
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">SELECTED WORKS.</span>
            <span className="block text-gold-gradient">ENGINEERED VALUE.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-mono mt-4 max-w-2xl">
            Scroll down to inspect the system architecture cards. Each platform was built to solve complex operational challenges with rigorous engineering.
          </p>
        </div>

        {/* Project Architecture Cards Stack */}
        <div className="space-y-12">
          
          {/* PROJECT 01: LAUNCHPILOT AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-amber-500/25 bg-[#0d101c]/90"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  01 // AI + PRODUCT VALIDATION
                </span>
                <span className="text-xs font-mono text-slate-400">FLAGSHIP SYSTEM</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">PRODUCTION READY</span>
              </div>
            </div>

            {/* Content & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Description */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
                    LAUNCHPILOT AI
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed">
                    AI-powered startup validation and product engineering engine. Orchestrates multi-stage idea analysis, market feasibility scoring, and automated tech stack generation via structured multimodal AI workflows.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Next.js", "TypeScript", "Express.js", "Prisma", "SQLite", "Gemini 2.5 Flash", "Zod", "REST API"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono text-slate-200 bg-white/[0.04] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">▸</span>
                    <span>Multi-stage prompt pipelines generating deterministic, schema-validated JSON.</span>
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
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                  >
                    <span>LIVE PLATFORM</span>
                    <span className="text-sm">↗</span>
                  </a>
                  <a
                    href="https://github.com/Nish0178/Launch-pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase"
                  >
                    <span>VIEW ON GITHUB</span>
                    <span className="text-sm">↗</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Architecture Telemetry Table */}
              <div className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 font-mono text-xs shadow-inner">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>ARCHITECTURE TELEMETRY</span>
                  <span className="text-amber-400">NODE // 01</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ARCHITECTURE:</span>
                    <span className="text-white font-medium text-right">Next.js + Express Pipeline</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">AI CORE:</span>
                    <span className="text-amber-300 font-semibold text-right">Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATABASE:</span>
                    <span className="text-white font-medium text-right">SQLite via Prisma ORM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">VALIDATION:</span>
                    <span className="text-emerald-400 font-medium text-right">Strict Zod Type Schemas</span>
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
                <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/40 p-3 rounded text-[11px] text-amber-300/90 font-mono leading-tight overflow-x-auto">
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

          {/* PROJECT 02: TODOPRO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-white/10 bg-[#0d101c]/90"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
                  02 // FULL-STACK TASK ENGINE
                </span>
                <span className="text-xs font-mono text-slate-400">CRUD + ANALYTICS PLATFORM</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">DEPLOYED ON RENDER</span>
              </div>
            </div>

            {/* Content & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Description */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
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
                      className="px-3 py-1 rounded-md text-xs font-mono text-slate-200 bg-white/[0.04] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
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
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                  >
                    <span>LIVE APP</span>
                    <span className="text-sm">↗</span>
                  </a>
                  <a
                    href="https://github.com/Nish0178/todo-pro-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase"
                  >
                    <span>VIEW ON GITHUB</span>
                    <span className="text-sm">↗</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Architecture Telemetry Table */}
              <div className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 font-mono text-xs shadow-inner">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>ARCHITECTURE TELEMETRY</span>
                  <span className="text-blue-400">NODE // 02</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">AUTH PROTOCOL:</span>
                    <span className="text-white font-medium text-right">Stateless JWT + Bcrypt</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATABASE:</span>
                    <span className="text-blue-300 font-semibold text-right">MongoDB Atlas + Mongoose</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">VISUALIZATION:</span>
                    <span className="text-white font-medium text-right">Chart.js Velocity Engine</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DATA EXPORT:</span>
                    <span className="text-emerald-400 font-medium text-right">jsPDF + Dynamic CSV</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">HOSTING:</span>
                    <span className="text-white font-medium text-right">Render Cloud Deployment</span>
                  </div>
                </div>

                {/* Telemetry Indicator */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] bg-black/40 p-3 rounded flex items-center justify-between text-[11px] text-slate-300">
                  <span>API Response P95:</span>
                  <span className="text-emerald-400 font-mono font-bold">&lt; 120ms</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* PROJECT 03: ASTROSPACIOUS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl aura-card p-6 sm:p-10 relative overflow-hidden border border-white/10 bg-[#0d101c]/90"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold">
                  03 // ENTERPRISE FRONTEND
                </span>
                <span className="text-xs font-mono text-slate-400">COMMERCIAL INTERNSHIP PROJECT</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">NOV 2025 – AUG 2026</span>
              </div>
            </div>

            {/* Content & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Description */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
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
                      className="px-3 py-1 rounded-md text-xs font-mono text-slate-200 bg-white/[0.04] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architectural highlights list */}
                <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
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

              {/* Right Column: Architecture Telemetry Table */}
              <div className="lg:col-span-5 bg-[#090b14] rounded-xl border border-white/10 p-5 font-mono text-xs shadow-inner">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>DELIVERABLE TELEMETRY</span>
                  <span className="text-purple-400">NODE // 03</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ORGANIZATION:</span>
                    <span className="text-white font-medium text-right">ASTROSPACIOUS</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">ROLE:</span>
                    <span className="text-purple-300 font-semibold text-right">Web Development Intern</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">DURATION:</span>
                    <span className="text-white font-medium text-right">Nov 2025 – Aug 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-slate-400">FOCUS:</span>
                    <span className="text-emerald-400 font-medium text-right">Commercial UI Architecture</span>
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
