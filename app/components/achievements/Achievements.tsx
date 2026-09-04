"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Trophy,
  GitPullRequest,
  Terminal,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "QBX Arena Hackathon 2026",
    badge: "Top 10 Runner-Up",
    desc: "Recognized nationally for engineering LaunchPilot AI — AI-powered startup validation platform.",
    icon: Trophy,
    year: "2026",
  },
  {
    title: "Open Source Connect Global",
    badge: "Campus Lead",
    desc: "Led campus open-source initiative, organizing workshops and mentoring 50+ developers.",
    icon: Users,
    year: "2026",
  },
  {
    title: "Elite Coders Winter of Code",
    badge: "Official Contributor",
    desc: "Contributed code, algorithm patches, and documentation to OSS repositories.",
    icon: GitPullRequest,
    year: "2026",
  },
  {
    title: "LeetCode Algorithmic Milestones",
    badge: "355+ · 1415 Rating",
    desc: "Consistent algorithmic problem-solving with 73-day maximum streak and competitive contest rating.",
    icon: Terminal,
    year: "2026",
  },
];

const CERTIFICATIONS = [
  { name: "Oracle Cloud Infrastructure AI Foundations", issuer: "Oracle", tag: "Cloud & AI" },
  { name: "HackerRank Java Basic", issuer: "HackerRank", tag: "Java" },
  { name: "HackerRank SWE Intern", issuer: "HackerRank", tag: "Problem Solving" },
  { name: "Microsoft Data Analysis", issuer: "Microsoft / LinkedIn", tag: "Data & BI" },
  { name: "Web Development (HTML/CSS/JS)", issuer: "Simplilearn", tag: "Web" },
  { name: "Front-End Development", issuer: "DevTown", tag: "Frontend" },
  { name: "Google Developers Community", issuer: "Google", tag: "Community" },
  { name: "Microsoft Student Chapter", issuer: "Microsoft", tag: "Community" },
];

export default function Achievements() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Honors & Credentials
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Achievements<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-sm">
            Hackathon recognitions, open source leadership, algorithmic milestones, and industry certifications.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ACHIEVEMENTS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#c9a84c]/30 transition-all relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-[#6b6862]">{item.year}</span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[9px] font-mono text-[#c9a84c] mb-2">
                    {item.badge}
                  </span>

                  <h3 className="font-display font-bold text-sm text-white mb-2">{item.title}</h3>
                  <p className="text-[11px] text-[#6b6862] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#6b6862] tracking-[0.2em] uppercase mb-6 pb-4 border-b border-white/[0.05]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>CERTIFICATIONS & COMMUNITY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.03] transition-all"
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-[#6b6862] mb-2">
                  <span>{cert.issuer}</span>
                  <span className="text-[#c9a84c]">{cert.tag}</span>
                </div>
                <h4 className="text-[11px] font-medium text-[#a8a49c] leading-snug">{cert.name}</h4>
                <div className="mt-3 pt-2 border-t border-white/[0.03] flex items-center gap-1.5 text-[8px] font-mono text-emerald-500">
                  <CheckCircle2 className="w-2.5 h-2.5" />
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
