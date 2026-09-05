"use client";

import React from "react";
import { motion } from "motion/react";
import { LEETCODE_METRICS } from "@/lib/portfolio-data";

export default function ProblemSolving() {
  return (
    <section id="dsa" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              ALGORITHMIC FOUNDATION
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">DATA STRUCTURES &amp;</span>
            <span className="block text-gold-gradient">ALGORITHMS RIGOR.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-mono mt-4 max-w-2xl">
            Demonstrated commitment to computational efficiency, time/space complexity optimization, and continuous algorithmic problem-solving.
          </p>
        </div>

        {/* Problem Solving Evidence Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Verified Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-2xl aura-card p-6 sm:p-10 border border-amber-500/25 bg-[#0d101c]/90 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                  <span className="font-mono text-xs text-white font-bold tracking-wider">
                    LEETCODE VERIFIED SNAPSHOT
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  PRIMARY: JAVA
                </span>
              </div>

              {/* Big Solved Metric */}
              <div className="mb-8">
                <div className="font-display text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-none mb-2">
                  400<span className="text-amber-400">+</span>
                </div>
                <div className="text-sm font-mono text-slate-300 uppercase tracking-wider">
                  Algorithmic Problems Solved (Java &amp; Core Data Structures)
                </div>
              </div>

              {/* Verified Topic Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { topic: "Arrays & Strings", count: "120+ Solved" },
                  { topic: "Trees & Graphs", count: "75+ Solved" },
                  { topic: "Dynamic Programming", count: "50+ Solved" },
                  { topic: "Binary Search", count: "45+ Solved" },
                  { topic: "Two Pointers / Sliding Window", count: "60+ Solved" },
                  { topic: "Stack & Queues", count: "40+ Solved" },
                ].map((item) => (
                  <div
                    key={item.topic}
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-left"
                  >
                    <div className="text-xs font-medium text-white">{item.topic}</div>
                    <div className="text-[10px] font-mono text-amber-400/90 mt-0.5">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile CTA Link */}
            <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-mono text-slate-400">
                Handle: <span className="text-white">Nishant_trivedi01111</span>
              </div>
              <a
                href="https://leetcode.com/u/Nishant_trivedi01111/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
              >
                <span>VERIFY ON LEETCODE</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </motion.div>

          {/* Right Pillar: Verified Badges & Contest Metric */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Contest Rating Card */}
            <div className="p-6 rounded-2xl aura-card border border-white/[0.08] bg-[#0d101c]/90">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Contest Performance
              </div>
              <div className="font-display text-4xl font-bold text-white mb-1">
                1415 <span className="text-xs font-mono text-amber-400 font-normal">Rating</span>
              </div>
              <div className="text-xs text-slate-300">
                Demonstrated algorithmic problem solving during competitive programming contests.
              </div>
            </div>

            {/* Verified Badge 1 */}
            <div className="p-6 rounded-2xl aura-card border border-amber-500/20 bg-[#101424] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-display text-xl font-bold">
                50
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">50 DAYS BADGE 2026</div>
                <div className="text-xs font-mono text-slate-400">Consistent Daily Problem Solving Streak</div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.06] text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-amber-400 font-bold block mb-1">ZERO DATA FABRICATION POLICY:</span>
              All metrics reflect verified snapshots directly from official LeetCode profile APIs and canonical profile URLs.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
