"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  GitBranch,
  Video,
  Code,
  Users,
  Award,
  Calendar,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

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
      "Managed, tracked, and stored high-resolution project video assets using Google Cloud Platform infrastructure.",
      "Established systematic production workflow tracking to increase multimodal delivery throughput.",
    ],
    highlight: "Generative AI Video Workflows & GCP Asset Infrastructure",
  },
  {
    id: "staxtech",
    category: "internships",
    company: "StaxTech",
    role: "Full-Stack Developer Intern",
    period: "January 2026 – April 2026",
    type: "Full-Stack Engineering (MERN)",
    tech: ["MongoDB", "Express.js", "Node.js", "JavaScript", "JWT Auth", "REST APIs"],
    responsibilities: [
      "Architected full-stack modules using the MERN ecosystem with focus on secure Node.js REST services.",
      "Implemented robust JWT token-based authentication and role authorization checks for application endpoints.",
      "Engineered third-party API integrations, robust error middleware, and database index optimizations.",
      "Conducted thorough code reviews, resolved production bugs, and authored comprehensive technical documentation.",
    ],
    highlight: "MERN Stack, JWT Security & Third-Party API Architecture",
  },
  {
    id: "astrospacious",
    category: "internships",
    company: "Astrospacious",
    role: "Web Development Intern",
    period: "November 2025 – August 2026",
    type: "Web Engineering",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs", "Agile"],
    responsibilities: [
      "Developed and maintained responsive web features and reusable UI modules for commercial platforms.",
      "Integrated backend REST APIs with client-side views ensuring clean asynchronous state management.",
      "Boosted frontend speed and responsiveness across mobile, tablet, and desktop screens.",
      "Collaborated in agile sprint cycles, standups, code reviews, and Git version control workflows.",
    ],
    highlight: "Commercial Web Features & Frontend Performance Tuning",
  },
  {
    id: "osc-lead",
    category: "opensource",
    company: "Open Source Connect Global 2026",
    role: "Campus Lead / Contributor",
    period: "2026",
    type: "Leadership & Community",
    tech: ["Git", "GitHub", "Community Leadership", "Technical Mentoring", "Open Source Workflows"],
    responsibilities: [
      "Spearheaded campus-level open source initiatives, successfully onboarding and mentoring 50+ engineering students.",
      "Organized and led technical workshops on Git workflows, pull requests, issue triaging, and collaborative development.",
      "Mentored peers on open source best practices, repository hygiene, and code review etiquette.",
    ],
    highlight: "Onboarded 50+ Students & Led Campus Open-Source Initiatives",
  },
  {
    id: "osc-contributor",
    category: "opensource",
    company: "Open Source Connect",
    role: "Official Contributor",
    period: "2026",
    type: "Open Source Engineering",
    tech: ["Git", "GitHub", "Code Reviews", "Issue Resolution", "Collaborative PRs"],
    responsibilities: [
      "Contributed to production-grade repositories by identifying bugs, fixing issues, and shipping feature improvements.",
      "Participated actively in peer code reviews and collaborated directly with maintainers and international contributors.",
    ],
    highlight: "Direct Contributions to Production-Grade Open Source Repositories",
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
      "Contributed code to open source software repositories as an official Winter of Code 2026 participant.",
      "Engineered algorithms and documentation improvements to enhance developer usability across program projects.",
    ],
    highlight: "Winter of Code 2026 Engineering Participant",
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
    <section id="experience" className="relative py-28 bg-[#070707] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>03 / CAREER & IMPACT</span>
              <span className="text-white/20">·</span>
              <span>ENGINEERING TIMELINE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Experience<span className="text-[#D5B878]">.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "all"
                  ? "bg-[#D5B878] text-black border-[#D5B878] font-semibold"
                  : "bg-white/[0.02] border-white/10 text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              ALL TRACKS ({EXPERIENCES.length})
            </button>
            <button
              onClick={() => setFilter("internships")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "internships"
                  ? "bg-[#D5B878] text-black border-[#D5B878] font-semibold"
                  : "bg-white/[0.02] border-white/10 text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              INTERNSHIPS (3)
            </button>
            <button
              onClick={() => setFilter("opensource")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "opensource"
                  ? "bg-[#D5B878] text-black border-[#D5B878] font-semibold"
                  : "bg-white/[0.02] border-white/10 text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              OPEN SOURCE (3)
            </button>
          </div>
        </div>

        {/* Master Timeline & Detail Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Timeline List */}
          <div className="lg:col-span-5 space-y-3">
            {filtered.map((exp) => {
              const isSelected = exp.id === activeExp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? "bg-[#0E0E0E] border-[#D5B878]/60 shadow-lg"
                      : "bg-[#0A0A0A]/60 border-white/[0.06] hover:border-white/20 hover:bg-[#0C0C0C]"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="exp-bar"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[#D5B878] rounded-r"
                    />
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-[#8A8780] mb-2">
                    <span className="text-[#D5B878]">{exp.period}</span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#A3A09A]">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">{exp.company}</h3>
                  <p className="text-xs font-mono text-[#C5C2BB] mt-0.5">{exp.role}</p>

                  <p className="text-xs text-[#8A8780] mt-2 line-clamp-2 font-sans">
                    {exp.highlight}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Deep-Dive Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-[#0B0B0B] border border-white/[0.09] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Header of Active Item */}
                <div className="pb-6 mb-6 border-b border-white/[0.08]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-[#D5B878] tracking-widest uppercase">
                      {activeExp.type}
                    </span>
                    <span className="text-[#8A8780] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeExp.period}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    {activeExp.company}
                  </h3>
                  <p className="text-sm font-mono text-[#EDE9E1] mt-1">
                    {activeExp.role}
                  </p>
                </div>

                {/* Verified Responsibilities & Contributions */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-mono text-xs text-[#8A8780] tracking-wider uppercase">
                    Key Engineering Contributions
                  </h4>
                  <ul className="space-y-3 font-sans text-sm text-[#C5C2BB]">
                    {activeExp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5B878] mt-2 shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Employed */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <h4 className="font-mono text-xs text-[#8A8780] tracking-wider uppercase mb-3">
                    Technologies & Ecosystem
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#EDE9E1]"
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
