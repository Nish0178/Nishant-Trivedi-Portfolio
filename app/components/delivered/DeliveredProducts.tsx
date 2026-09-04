"use client";

import React from "react";
import {
  Globe,
  Rocket,
  Users,
  Zap,
  Layers,
  Code2,
  CheckCircle,
  Briefcase,
  GitPullRequest,
  Gauge,
  Smartphone,
  Server,
} from "lucide-react";

export default function DeliveredProducts() {
  return (
    <section id="products" className="relative py-28 bg-[#080808] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>02 / DELIVERED WORK</span>
              <span className="text-white/20">·</span>
              <span>PRODUCTION PRODUCTS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Real-World Products<span className="text-[#D5B878]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-md">
            Commercial products and cross-functional team initiatives where I contributed to production web features, REST API integrations, and client-facing UI performance.
          </p>
        </div>

        {/* Featured Delivered Product: ASTROSPACIOUS */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0F0F0F] via-[#0A0A0A] to-[#070707] border border-white/[0.09] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#D5B878]/[0.05] via-transparent to-transparent rounded-full pointer-events-none" />

          {/* Top Label & Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] tracking-wider">
                  TEAM PRODUCTION WORK
                </span>
                <span className="text-[#8A8780] font-mono text-xs">
                  NOV 2025 – AUG 2026
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                Astrospacious
                <span className="text-sm font-normal font-mono text-[#D5B878] px-2.5 py-0.5 rounded bg-[#D5B878]/10 border border-[#D5B878]/20">
                  Web Development Intern
                </span>
              </h3>
            </div>

            {/* Tech Matrix */}
            <div className="flex flex-wrap gap-2">
              {["HTML5", "CSS3", "JavaScript (ES6+)", "Node.js", "REST APIs", "Agile / Scrum"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#EDE9E1]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Narrative & Impact Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 font-sans">
                  Engineering Contributions in a Production Environment
                </h4>
                <p className="text-sm text-[#A3A09A] leading-relaxed font-sans">
                  Contributed to developing, testing, and maintaining core web modules for Astrospacious. Collaborated inside an agile engineering squad to deliver responsive interfaces, hook into backend REST APIs, and ensure pixel-perfect cross-device consistency.
                </p>
              </div>

              {/* Specific Verifiable Responsibilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#D5B878]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D5B878] mb-2">
                    <Gauge className="w-4 h-4" />
                    <span>PERFORMANCE & OPTIMIZATION</span>
                  </div>
                  <p className="text-xs text-[#8A8780] leading-relaxed">
                    Improved frontend load performance by refactoring heavy DOM scripts, streamlining asset delivery, and optimizing layout rendering cycles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#D5B878]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D5B878] mb-2">
                    <Smartphone className="w-4 h-4" />
                    <span>RESPONSIVE ARCHITECTURE</span>
                  </div>
                  <p className="text-xs text-[#8A8780] leading-relaxed">
                    Refactored responsive UI viewports across mobile, tablet, and widescreen viewports using modern flexbox/grid layout systems.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#D5B878]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D5B878] mb-2">
                    <Server className="w-4 h-4" />
                    <span>REST API INTEGRATION</span>
                  </div>
                  <p className="text-xs text-[#8A8780] leading-relaxed">
                    Connected backend Node.js endpoints with dynamic client-side views with defensive error handling and loading feedback states.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#D5B878]/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D5B878] mb-2">
                    <Users className="w-4 h-4" />
                    <span>AGILE SQUAD WORKFLOW</span>
                  </div>
                  <p className="text-xs text-[#8A8780] leading-relaxed">
                    Participated in sprint planning, ticket estimates, Git branch management, and peer code reviews to maintain repository hygiene.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Telemetry & Production Highlights Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#050505] border border-white/10 p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-[#8A8780]">
                  <span className="text-[#D5B878]">ASTROSPACIOUS TELEMETRY</span>
                  <span>PRODUCTION REPORT</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[#8A8780]">ROLE FOCUS</span>
                    <span className="text-[#EDE9E1] font-semibold">Web Features & API Layer</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[#8A8780]">DEPLOYMENT TARGET</span>
                    <span className="text-[#EDE9E1]">Commercial Web Platform</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[#8A8780]">TEAM MODEL</span>
                    <span className="text-[#EDE9E1]">Agile Sprints & Git PRs</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[#8A8780]">CORE TECH</span>
                    <span className="text-[#D5B878]">JavaScript · Node.js · REST</span>
                  </div>
                </div>

                <div className="pt-2">
                  <blockquote className="p-3 rounded-lg bg-white/[0.02] border-l-2 border-[#D5B878] text-xs text-[#A3A09A] italic font-sans leading-relaxed">
                    "Engineering at Astrospacious reinforced the rigor required for production web codebases: maintaining clean architecture, respecting API contracts, and delivering responsive client experiences."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
