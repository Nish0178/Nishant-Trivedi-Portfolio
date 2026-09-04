"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronRight } from "lucide-react";

type ExperienceCategory = "all" | "internships" | "opensource";

interface ExperienceItem {
  id: string;
  category: "internships" | "opensource";
  company: string;
  role: string;
  period: string;
  type: string;
  tech: string[];
  responsibilities: string[];
  highlight?: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "techdock",
    category: "internships",
    company: "Techdock Labs",
    role: "AI Video Editor Intern",
    period: "July 2026 – Present",
    type: "AI & Multimodal Production",
    tech: ["ChatGPT", "Claude AI", "Google Veo", "Google Flow", "Prompt Engineering", "Google Cloud"],
    responsibilities: [
      "Engineered generative AI video pipelines utilizing state-of-the-art vision models including Google Veo and Flow.",
      "Designed domain-specific prompt engineering frameworks across Claude and ChatGPT for production multimedia synthesis.",
      "Managed high-resolution project video assets using Google Cloud Platform infrastructure.",
      "Established systematic production workflow tracking to increase multimodal delivery throughput.",
    ],
    highlight: "Generative AI Video Workflows & GCP Asset Infrastructure",
  },
  {
    id: "staxtech",
    category: "internships",
    company: "StaxTech",
    role: "Full-Stack Developer Intern",
    period: "Jan 2026 – Apr 2026",
    type: "Full-Stack Engineering (MERN)",
    tech: ["MongoDB", "Express.js", "Node.js", "JavaScript", "JWT Auth", "REST APIs"],
    responsibilities: [
      "Architected full-stack modules using the MERN ecosystem with secure Node.js REST services.",
      "Implemented robust JWT token-based authentication and role authorization for endpoints.",
      "Engineered third-party API integrations, error middleware, and database index optimizations.",
      "Conducted code reviews, resolved production bugs, and authored technical documentation.",
    ],
    highlight: "MERN Stack, JWT Security & Third-Party API Architecture",
  },
  {
    id: "astrospacious",
    category: "internships",
    company: "Astrospacious",
    role: "Web Development Intern",
    period: "Nov 2025 – Aug 2026",
    type: "Web Engineering",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs", "Agile"],
    responsibilities: [
      "Developed responsive web features and reusable UI modules for commercial platforms.",
      "Integrated backend REST APIs with client-side views and clean async state management.",
      "Boosted frontend speed and responsiveness across all screen sizes.",
      "Collaborated in agile sprint cycles, standups, and Git version control workflows.",
    ],
    highlight: "Commercial Web Features & Frontend Performance Tuning",
  },
  {
    id: "osc-lead",
    category: "opensource",
    company: "Open Source Connect Global",
    role: "Campus Lead / Contributor",
    period: "2026",
    type: "Leadership & Community",
    tech: ["Git", "GitHub", "Community Leadership", "Technical Mentoring"],
    responsibilities: [
      "Spearheaded campus-level open source initiatives, onboarding 50+ engineering students.",
      "Organized technical workshops on Git workflows, pull requests, and collaborative development.",
      "Mentored peers on open source best practices and code review etiquette.",
    ],
    highlight: "Onboarded 50+ Students & Led Campus Initiatives",
  },
  {
    id: "osc-contributor",
    category: "opensource",
    company: "Open Source Connect",
    role: "Official Contributor",
    period: "2026",
    type: "Open Source Engineering",
    tech: ["Git", "GitHub", "Code Reviews", "Collaborative PRs"],
    responsibilities: [
      "Contributed to production-grade repositories by fixing bugs and shipping feature improvements.",
      "Participated in peer code reviews and collaborated with international contributors.",
    ],
    highlight: "Direct Contributions to Production OSS Repositories",
  },
  {
    id: "elite-coders",
    category: "opensource",
    company: "Elite Coders",
    role: "Winter of Code 2026 Contributor",
    period: "Winter 2026",
    type: "Open Source Program",
    tech: ["JavaScript", "Python", "Data Structures", "Open Source"],
    responsibilities: [
      "Contributed code to open source repositories as Winter of Code 2026 participant.",
      "Engineered algorithms and documentation improvements for developer usability.",
    ],
    highlight: "Winter of Code 2026 Participant",
  },
];

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<ExperienceCategory>("all");
  const [selectedId, setSelectedId] = useState<string>("techdock");

  const filtered = EXPERIENCES.filter((exp) => {
    if (filter === "all") return true;
    return exp.category === filter;
  });

  const activeExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0];

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Career & Impact
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Experience<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0 font-mono text-[10px]">
            {(["all", "internships", "opensource"] as ExperienceCategory[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  filter === f
                    ? "bg-[#c9a84c] text-[#050505] border-[#c9a84c] font-semibold"
                    : "bg-transparent border-white/10 text-[#6b6862] hover:text-[#a8a49c] hover:border-white/20"
                }`}
              >
                {f === "all" ? `ALL (${EXPERIENCES.length})` : f === "internships" ? "INTERNSHIPS" : "OPEN SOURCE"}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline + Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Timeline List */}
          <div className="lg:col-span-5 space-y-2">
            {filtered.map((exp) => {
              const isSelected = exp.id === activeExp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#0d0d0d] border-[#c9a84c]/40 shadow-lg"
                      : "bg-transparent border-white/[0.04] hover:border-white/10 hover:bg-white/[0.01]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="exp-indicator"
                      className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#c9a84c] rounded-r"
                    />
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6862] mb-1.5">
                    <span className={isSelected ? "text-[#c9a84c]" : ""}>{exp.period}</span>
                    <span className="uppercase px-2 py-0.5 rounded-full bg-white/[0.03] text-[9px]">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">{exp.company}</h3>
                  <p className="text-[11px] font-mono text-[#a8a49c] mt-0.5">{exp.role}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Detail Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-[#0a0a0a] border border-white/[0.07] p-6 sm:p-8 shadow-2xl"
              >
                <div className="pb-5 mb-5 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                    <span className="text-[#c9a84c] tracking-[0.2em] uppercase">{activeExp.type}</span>
                    <span className="text-[#6b6862] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {activeExp.period}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">{activeExp.company}</h3>
                  <p className="text-xs font-mono text-[#a8a49c] mt-1">{activeExp.role}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-[9px] text-[#6b6862] tracking-[0.2em] uppercase">
                    Key Contributions
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#a8a49c]">
                    {activeExp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                        <span className="leading-relaxed text-[13px]">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-white/[0.05]">
                  <h4 className="font-mono text-[9px] text-[#6b6862] tracking-[0.2em] uppercase mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-[#a8a49c]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
