"use client";

import React from "react";
import {
  Trophy,
  Award,
  GitPullRequest,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Users,
} from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "QBX Arena Hackathon 2026",
    badge: "Top 10 Runner-Up",
    desc: "Recognized nationally for engineering LaunchPilot AI — an intelligent startup validation platform powered by Google Gemini and Prisma.",
    icon: Trophy,
    year: "2026",
  },
  {
    title: "Open Source Connect Global 2026",
    badge: "Campus Lead",
    desc: "Spearheaded campus open-source initiative, organizing Git/GitHub workshops and mentoring 50+ junior developers.",
    icon: Users,
    year: "2026",
  },
  {
    title: "Elite Coders Winter of Code 2026",
    badge: "Official Contributor",
    desc: "Contributed code, algorithm patches, and documentation to open-source software repositories.",
    icon: GitPullRequest,
    year: "2026",
  },
  {
    title: "LeetCode Algorithmic Milestones",
    badge: "355+ Problems · 1415 Rating",
    desc: "Consistently solved algorithmic problems with 73-day maximum active streak and competitive contest rating.",
    icon: Terminal,
    year: "2026",
  },
];

const CERTIFICATIONS = [
  {
    name: "Oracle Cloud Infrastructure AI Foundations Associate",
    issuer: "Oracle",
    tag: "Cloud & AI",
  },
  {
    name: "HackerRank Java Basic Certification",
    issuer: "HackerRank",
    tag: "Java & OOP",
  },
  {
    name: "HackerRank Software Engineer Intern Certification",
    issuer: "HackerRank",
    tag: "Problem Solving",
  },
  {
    name: "Microsoft & LinkedIn Data Analysis Certification",
    issuer: "Microsoft / LinkedIn",
    tag: "Data & BI",
  },
  {
    name: "Simplilearn Web Development with HTML, CSS & JavaScript",
    issuer: "Simplilearn",
    tag: "Web Foundations",
  },
  {
    name: "DevTown Front-End Development Certification",
    issuer: "DevTown",
    tag: "Frontend",
  },
  {
    name: "Google Developers Community Membership",
    issuer: "Google Developers",
    tag: "Community",
  },
  {
    name: "Microsoft Student Chapter Membership",
    issuer: "Microsoft Student Chapter",
    tag: "Community",
  },
];

export default function Achievements() {
  return (
    <section className="relative py-28 bg-[#070707] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>07 / HONORS & CREDENTIALS</span>
              <span className="text-white/20">·</span>
              <span>VERIFIED RECOGNITION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Achievements & Certs<span className="text-[#D5B878]">.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-sm">
            Recognitions from competitive hackathons, open source leadership, algorithmic milestones, and industry certifications.
          </p>
        </div>

        {/* Major Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ACHIEVEMENTS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/[0.07] hover:border-[#D5B878]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#D5B878]/10 text-[#D5B878]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-[#8A8780]">
                      {item.year}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-[#D5B878] mb-2">
                    {item.badge}
                  </span>

                  <h3 className="font-sans font-bold text-base text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8A8780] font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications Matrix */}
        <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.07] p-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8A8780] tracking-wider uppercase mb-6 pb-4 border-b border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-[#D5B878]" />
            <span>INDUSTRY CERTIFICATIONS & COMMUNITY ROLES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.03] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8780] mb-2">
                    <span>{cert.issuer}</span>
                    <span className="text-[#D5B878]">{cert.tag}</span>
                  </div>
                  <h4 className="font-sans text-xs font-medium text-[#EDE9E1] leading-snug">
                    {cert.name}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-white/[0.03] flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
