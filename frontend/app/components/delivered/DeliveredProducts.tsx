"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Globe,
  Gauge,
  Smartphone,
  Server,
  Users,
} from "lucide-react";

export default function DeliveredProducts() {
  return (
    <section id="products" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Delivered Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Real-World Products<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-md">
            Commercial products and cross-functional team initiatives where I shipped production web features.
          </p>
        </div>

        {/* Astrospacious Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/[0.07] overflow-hidden shadow-2xl"
        >
          {/* Header Strip */}
          <div className="p-6 sm:p-10 pb-6 border-b border-white/[0.05]">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] tracking-wider">
                TEAM PRODUCTION
              </span>
              <span className="text-[#6b6862] font-mono text-[10px]">
                NOV 2025 – AUG 2026
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                Astrospacious
              </h3>
              <span className="text-xs font-mono text-[#c9a84c] px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                Web Dev Intern
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Contributions */}
            <div className="lg:col-span-7 p-6 sm:p-10">
              <p className="text-sm text-[#a8a49c] leading-relaxed mb-6">
                Contributed to developing, testing, and maintaining core web modules. Collaborated in an agile squad delivering responsive interfaces, REST API integrations, and cross-device consistency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Gauge, label: "Performance", desc: "Refactored DOM scripts, streamlined asset delivery and rendering cycles" },
                  { icon: Smartphone, label: "Responsive", desc: "Architected responsive viewports across mobile, tablet, and desktop" },
                  { icon: Server, label: "API Integration", desc: "Connected Node.js endpoints with defensive error handling" },
                  { icon: Users, label: "Agile Squad", desc: "Sprint planning, Git branch management, and peer code reviews" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#c9a84c]/20 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#c9a84c] mb-2 tracking-wider">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-[#6b6862] leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Info Panel */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-[#0a0a0a]/50 border-l border-white/[0.04]">
              <div className="space-y-4 font-mono text-[11px]">
                {[
                  { label: "ROLE", value: "Web Features & API Layer" },
                  { label: "TARGET", value: "Commercial Web Platform" },
                  { label: "WORKFLOW", value: "Agile Sprints & Git PRs" },
                  { label: "STACK", value: "JS · Node.js · REST APIs" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[#6b6862]">{row.label}</span>
                    <span className="text-[#a8a49c] font-medium">{row.value}</span>
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 p-4 rounded-xl bg-white/[0.02] border-l-2 border-[#c9a84c] text-[11px] text-[#6b6862] italic leading-relaxed">
                &ldquo;Engineering at Astrospacious reinforced the rigor required for production web codebases — clean architecture, API contracts, and responsive client experiences.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-2 mt-6">
                {["HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs", "Agile"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[9px] font-mono text-[#6b6862]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
