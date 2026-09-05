"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const STATS = [
  {
    number: "400+",
    label: "DSA SOLVED",
    subtext: "Java & LeetCode Verified",
    highlight: true,
  },
  {
    number: "B.Tech",
    label: "AKTU CS '28",
    subtext: "CSE · Lucknow, IN",
    highlight: false,
  },
  {
    number: "10+",
    label: "SYSTEMS & REPOS",
    subtext: "Full-Stack & AI Tools",
    highlight: false,
  },
  {
    number: "TOP 10",
    label: "HACKATHON RUNNER-UP",
    subtext: "QBX Arena 2026",
    highlight: true,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              01 / ABOUT ME
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">I DON&apos;T JUST WRITE CODE.</span>
            <span className="block text-gold-gradient">I BUILD WHAT&apos;S NEXT.</span>
          </h2>
        </div>

        {/* Narrative & Portrait Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
              I&apos;m <strong className="text-amber-400 font-semibold">Nishant Trivedi</strong>, a Full Stack Developer and Computer Science undergraduate specializing in building scalable web architectures, AI-integrated platforms, and refined digital experiences.
            </p>

            <p className="text-base text-slate-300/80 leading-relaxed">
              With a strong algorithmic foundation (<span className="text-white font-mono font-medium">400+ algorithmic challenges solved in Java</span>) and a focus on clean engineering, I transform complex architectural requirements into reliable, responsive, and high-performance software.
            </p>

            <p className="text-base text-slate-300/80 leading-relaxed">
              Currently pursuing a B.Tech in Computer Science & Engineering at <strong className="text-slate-100">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</strong>, Lucknow (2024–2028). Active in open source, building AI agents, and engineering end-to-end full-stack systems.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0f1322] border border-white/[0.08] hover:border-amber-500/30 transition-colors">
                <div className="text-amber-400 font-mono text-xs font-bold mb-1">01 // RESILIENCE</div>
                <div className="text-xs text-slate-300">Clean backend pipelines, strict TypeScript Zod schemas, and relational integrity.</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1322] border border-white/[0.08] hover:border-amber-500/30 transition-colors">
                <div className="text-amber-400 font-mono text-xs font-bold mb-1">02 // APPLIED AI</div>
                <div className="text-xs text-slate-300">Multimodal Google Gemini orchestration, structured JSON outputs, and fast inference.</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1322] border border-white/[0.08] hover:border-amber-500/30 transition-colors">
                <div className="text-amber-400 font-mono text-xs font-bold mb-1">03 // ALGORITHMS</div>
                <div className="text-xs text-slate-300">Rigorous data structures, time complexity optimization, and LeetCode consistency.</div>
              </div>
            </div>
          </div>

          {/* Right Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] rounded-2xl overflow-hidden border border-amber-500/30 bg-[#0e1220] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(245,158,11,0.15)]">
              
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/60">
                <Image
                  src="/images/nishant-portrait.webp"
                  alt="Nishant Trivedi Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-50" />
              </div>

              {/* Bottom Quote & Signature Overlay */}
              <div className="pt-3 px-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Nishant Trivedi</div>
                  <div className="text-[10px] font-mono text-amber-400">AKTU CSE &apos;24–&apos;28</div>
                </div>
                <div className="font-signature text-xl text-amber-300 font-bold">
                  Nishant
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Bottom Stat Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl aura-card relative overflow-hidden group ${
                stat.highlight ? "border-amber-500/30 bg-[#121627]/80" : ""
              }`}
            >
              {stat.highlight && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              )}
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 group-hover:text-amber-400 transition-colors">
                {stat.number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
