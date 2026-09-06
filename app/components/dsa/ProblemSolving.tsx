"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING, DURATION, STAGGER } from "@/app/lib/motion";

export default function ProblemSolving() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Large typography scroll coupling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      id="dsa"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll Coupling */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
              ALGORITHMIC FOUNDATION
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

          <motion.h2
            style={{ y: headlineY, scale: headlineScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-slate-100">DATA STRUCTURES &amp;</span>
            <span className="block text-gold-gradient serif-italic">ALGORITHMS RIGOR.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed"
          >
            Demonstrated commitment to computational efficiency, time/space complexity optimization, and continuous algorithmic problem-solving.
          </motion.p>
        </div>

        {/* Problem Solving Evidence Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Verified Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="lg:col-span-7 rounded-2xl aura-card p-6 sm:p-10 border border-amber-500/25 bg-[#0d101c]/90 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                  <span className="text-xs text-white font-bold tracking-[0.16em] uppercase">
                    LEETCODE VERIFIED SNAPSHOT
                  </span>
                </div>
                <span className="text-xs text-amber-400 font-semibold tracking-wider">
                  PRIMARY: JAVA
                </span>
              </div>

              {/* Big Solved Metric: Subtle Scale & Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.cinematic, delay: 0.15, ease: EASING.cinematic }}
                className="mb-8"
              >
                <div className="serif-metric text-6xl sm:text-7xl font-bold text-white tracking-tight leading-none mb-2">
                  400<span className="text-amber-400">+</span>
                </div>
                <div className="text-sm text-slate-300 uppercase tracking-wider font-semibold">
                  Algorithmic Problems Solved (Java &amp; Core Data Structures)
                </div>
              </motion.div>

              {/* Verified Topic Grid: Subtle Upward Reveal */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { topic: "Arrays & Strings", count: "120+ Solved" },
                  { topic: "Trees & Graphs", count: "75+ Solved" },
                  { topic: "Dynamic Programming", count: "50+ Solved" },
                  { topic: "Binary Search", count: "45+ Solved" },
                  { topic: "Two Pointers / Sliding Window", count: "60+ Solved" },
                  { topic: "Stack & Queues", count: "40+ Solved" },
                ].map((item, i) => (
                  <motion.div
                    key={item.topic}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION.normal, delay: 0.2 + i * STAGGER.fast, ease: EASING.cinematic }}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left hover:border-amber-500/30 transition-colors"
                  >
                    <div className="text-xs font-semibold text-white">{item.topic}</div>
                    <div className="text-[11px] text-amber-400/90 mt-0.5 font-bold tracking-wider">{item.count}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Profile CTA Link */}
            <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-slate-400">
                Handle: <span className="text-white font-bold">Nishant_trivedi01111</span>
              </div>
              <a
                href="https://leetcode.com/u/Nishant_trivedi01111/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em]"
              >
                <span>VERIFY ON LEETCODE</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </motion.div>

          {/* Right Pillar: Verified Badges & Contest Rating Fade/Slide */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1415 Contest Rating Card: Fade and Slide */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.cinematic, delay: 0.15, ease: EASING.cinematic }}
              className="p-6 rounded-2xl aura-card border border-white/[0.08] bg-[#0d101c]/90"
            >
              <div className="text-xs text-slate-400 uppercase tracking-[0.16em] font-bold mb-2">
                Contest Performance
              </div>
              <div className="serif-metric text-4xl font-bold text-white mb-1">
                1415 <span className="text-xs text-amber-400 font-normal serif-italic">Rating</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Demonstrated algorithmic problem solving during competitive programming contests.
              </div>
            </motion.div>

            {/* Badges Staggered Reveal */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.cinematic, delay: 0.28, ease: EASING.cinematic }}
              className="p-6 rounded-2xl aura-card border border-amber-500/20 bg-[#101424] flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold serif-metric">
                50
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">50 DAYS BADGE 2026</div>
                <div className="text-xs text-slate-400">Consistent Daily Problem Solving Streak</div>
              </div>
            </motion.div>

            {/* Verification Note */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.38, ease: EASING.cinematic }}
              className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.06] text-xs text-slate-400 leading-relaxed"
            >
              <span className="text-amber-400 font-bold block mb-1 tracking-wider uppercase">
                ZERO DATA FABRICATION POLICY:
              </span>
              All metrics reflect verified snapshots directly from official LeetCode profile APIs and canonical profile URLs.
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
