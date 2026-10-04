"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EXPERIENCES, PERSONAL_INFO } from "@/lib/portfolio-data";
import { fetchPublicCmsContent } from "@/lib/api/content";
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  tag: "EDUCATION" | "EXPERIENCE";
  title: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  bullets: string[];
  tech: string[];
}

export default function ExperienceTimeline() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "edu-1",
      year: "2026",
      tag: "EDUCATION",
      title: "B.Tech in Computer Science & Engineering",
      organization: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      location: "Lucknow, India",
      period: "2024 – 2028",
      badge: "★ Systems & AI Specialization",
      bullets: [
        "Core study in Distributed Systems, Object-Oriented Architecture, and Algorithm Design.",
        "Active member of Google Developers Community and Microsoft Student Chapter.",
      ],
      tech: ["Java", "Data Structures", "Algorithms", "DBMS", "Operating Systems"],
    },
    {
      id: "exp-1",
      year: "2026",
      tag: "EXPERIENCE",
      title: "AI Video Editor Intern",
      organization: "Techdock Labs",
      location: "Remote / Lucknow",
      period: "July 2026 – Present",
      bullets: [
        "Engineering multimodal generative video workflows utilizing Google Veo, Google Flow, and Claude prompt architectures.",
        "Constructing repeatable prompt frameworks and automated asset transformation pipelines on Google Cloud Platform.",
      ],
      tech: ["Google Veo", "Google Flow", "Claude AI", "Prompt Engineering", "GCP"],
    },
    {
      id: "exp-2",
      year: "2026",
      tag: "EXPERIENCE",
      title: "Campus Lead & Contributor",
      organization: "Open Source Connect Global",
      location: "Campus / Remote",
      period: "July 2026 – Present",
      bullets: [
        "Leading the campus developer chapter, organizing open-source onboarding workshops, and mentoring 50+ developers on Git workflows.",
        "Reviewing and submitting pull requests, bug fixes, and documentation improvements to active community repositories.",
      ],
      tech: ["Git", "GitHub", "OSS Mentorship", "Code Reviews", "JavaScript"],
    },
    {
      id: "exp-3",
      year: "2025",
      tag: "EXPERIENCE",
      title: "Web Development Intern",
      organization: "ASTROSPACIOUS",
      location: "Remote",
      period: "Nov 2025 – Aug 2026",
      bullets: [
        "Developed responsive client interface modules with clean semantic HTML5, modern CSS3 custom properties, and JavaScript.",
        "Integrated backend REST endpoints for dynamic data delivery with structured error fallbacks.",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs"],
    },
    {
      id: "exp-4",
      year: "2025",
      tag: "EXPERIENCE",
      title: "Full-Stack Developer Intern",
      organization: "StaxTech",
      location: "Remote",
      period: "Jan 2026 – Apr 2026",
      bullets: [
        "Engineered backend REST microservices in Node.js/Express.js with JWT authentication and middleware guards.",
        "Constructed MongoDB schemas with index optimization for high-throughput queries.",
      ],
      tech: ["Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs"],
    },
  ]);

  useEffect(() => {
    let mounted = true;
    fetchPublicCmsContent().then((content) => {
      if (mounted && Array.isArray(content?.experiences) && content.experiences.length > 0) {
        // Can augment with CMS data if available
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            05 — EXPERIENCE
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            My{" "}
            <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
              journey.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2.5 font-normal tracking-wide">
            Engineering internships, community leadership, and academic foundations.
          </p>
        </div>

        {/* Central Timeline Layout matching Reference Frame 27 */}
        <div className="relative">
          {/* Central Vertical Line (visible on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 -translate-x-1/2" />

          {/* Timeline Nodes & Cards */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={m.id}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
                >
                  {/* Left Column / Card on desktop */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:text-right" : "lg:order-3"}`}>
                    {isEven ? (
                      <div className="bg-[#ECE8DF] dark:bg-[#18191E] rounded-2xl p-6 sm:p-7 border border-black/[0.08] dark:border-white/[0.08] shadow-sm text-left">
                        {/* Tag & Period */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-mono font-semibold uppercase tracking-wider">
                            {m.tag}
                          </span>
                          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                            {m.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                          {m.title}
                        </h3>
                        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5 mb-4">
                          {m.organization} · {m.location}
                        </p>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-5">
                          {m.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white mt-1.5 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                          {m.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 text-[10px] font-medium border border-black/[0.04] dark:border-white/[0.06]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Big Bold Year Marker on opposite side */
                      <div className="hidden lg:flex items-center justify-end pr-6">
                        <span className="text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
                          {m.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Center Node Dot & Year (Desktop) */}
                  <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 dark:bg-white border-4 border-[#F6F4EE] dark:border-[#101114] shadow-sm z-10" />
                  </div>

                  {/* Right Column / Card on desktop */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-3" : "lg:text-left"}`}>
                    {!isEven ? (
                      <div className="bg-[#ECE8DF] dark:bg-[#18191E] rounded-2xl p-6 sm:p-7 border border-black/[0.08] dark:border-white/[0.08] shadow-sm text-left">
                        {/* Tag & Period */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-mono font-semibold uppercase tracking-wider">
                            {m.tag}
                          </span>
                          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                            {m.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                          {m.title}
                        </h3>
                        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5 mb-4">
                          {m.organization} · {m.location}
                        </p>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-5">
                          {m.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white mt-1.5 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                          {m.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 text-[10px] font-medium border border-black/[0.04] dark:border-white/[0.06]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Big Bold Year Marker on opposite side */
                      <div className="hidden lg:flex items-center justify-start pl-6">
                        <span className="text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
                          {m.year}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
