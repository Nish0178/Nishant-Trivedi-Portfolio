"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ArrowUpRight,
  Sparkles,
  GitPullRequest
} from "lucide-react";
import { useCmsContent } from "@/app/context/CmsContentContext";

interface Milestone {
  id: string;
  year: string;
  tag: "EXPERIENCE" | "EDUCATION" | "CONTRIBUTION";
  title: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  bullets: string[];
  tech: string[];
}

const DEFAULT_MILESTONES: Milestone[] = [
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
];

export default function ExperienceTimeline() {
  const { content } = useCmsContent();

  const milestones = useMemo<Milestone[]>(() => {
    if (Array.isArray(content?.experiences) && content.experiences.length > 0) {
      const expItems: Milestone[] = content.experiences.map((exp, idx) => {
        const yearMatch = exp.period?.match(/\b(20\d\d|19\d\d)\b/);
        const year = yearMatch ? yearMatch[0] : "2026";
        const tag = (exp.type?.toUpperCase() === "EDUCATION"
          ? "EDUCATION"
          : exp.type?.toUpperCase() === "CONTRIBUTION"
          ? "CONTRIBUTION"
          : "EXPERIENCE") as "EXPERIENCE" | "EDUCATION" | "CONTRIBUTION";

        const bullets = exp.contributions
          ? exp.contributions
              .split(/[\n•\r]+/)
              .map((b) => b.trim())
              .filter(Boolean)
          : [];

        const tech = exp.technologies
          ? exp.technologies
              .split(/[,|]+/)
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

        return {
          id: `exp-${exp.id || idx}`,
          year,
          tag,
          title: exp.role || "Software Engineer",
          organization: exp.company || "Company",
          location: exp.location || "Remote",
          period: exp.period || "2026",
          bullets: bullets.length > 0 ? bullets : ["Software engineering and full-stack development contributions."],
          tech,
        };
      });

      // If education items exist in CMS, prepend or append them
      if (Array.isArray(content?.education) && content.education.length > 0) {
        const eduItems: Milestone[] = content.education.map((edu, idx) => ({
          id: `edu-${edu.id || idx}`,
          year: edu.period?.match(/\b(20\d\d|19\d\d)\b/)?.[0] || "2026",
          tag: "EDUCATION",
          title: edu.degree,
          organization: edu.institution,
          location: edu.location || "Lucknow, India",
          period: edu.period || "2024 – 2028",
          badge: "★ Systems & AI Specialization",
          bullets: edu.details
            ? edu.details.split(/[\n•\r]+/).map((b) => b.trim()).filter(Boolean)
            : ["Core studies in Computer Science and Engineering."],
          tech: ["Java", "Data Structures", "Algorithms", "DBMS", "Operating Systems"],
        }));
        return [...eduItems, ...expItems];
      }

      return expItems;
    }

    return DEFAULT_MILESTONES;
  }, [content?.experiences, content?.education]);

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

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-6 lg:gap-12`}
                >
                  {/* Left or Right Card Content */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="bg-white/70 dark:bg-[#14151B]/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all">
                      {/* Top Meta Line: Tag & Period */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? "lg:justify-end" : "lg:justify-start"
                        }`}
                      >
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase ${
                            item.tag === "EDUCATION"
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                              : item.tag === "CONTRIBUTION"
                              ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                          }`}
                        >
                          {item.tag}
                        </span>

                        <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.period}</span>
                        </span>
                      </div>

                      {/* Role / Degree Title */}
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                        {item.title}
                      </h3>

                      {/* Organization / Company */}
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1 flex items-center gap-1.5 justify-start lg:justify-inherit">
                        <span>{item.organization}</span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="text-xs text-neutral-400 font-normal flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </span>
                      </p>

                      {/* Bullet Highlights */}
                      <ul
                        className={`mt-4 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed ${
                          isEven ? "lg:text-right" : "lg:text-left"
                        }`}
                      >
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-neutral-400 mt-1 shrink-0">•</span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      {item.tech.length > 0 && (
                        <div
                          className={`mt-5 pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-wrap gap-1.5 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central Node Indicator */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white items-center justify-center shadow-md z-10">
                    <span className="text-[10px] font-mono font-bold text-neutral-950 dark:text-white">
                      {item.year.slice(-2)}
                    </span>
                  </div>

                  {/* Empty Spacer on opposite side */}
                  <div className="hidden lg:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
