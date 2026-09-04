"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Code2,
  Trophy,
  Flame,
  Activity,
} from "lucide-react";

const DSA_TOPICS = [
  { topic: "Arrays & Hashing", count: "90+", mastery: "Advanced", desc: "Lookup optimizations, frequency hashing, sliding window" },
  { topic: "Two Pointers & Sliding Window", count: "45+", mastery: "Advanced", desc: "Monotonic queues, subarray bounds, pointer convergence" },
  { topic: "Trees & BSTs", count: "65+", mastery: "Proficient", desc: "DFS/BFS traversals, LCA, subtree recursion" },
  { topic: "Graphs & BFS/DFS", count: "40+", mastery: "Proficient", desc: "Cycle detection, topological sort, Dijkstra" },
  { topic: "Dynamic Programming", count: "50+", mastery: "Core", desc: "1D/2D memoization, knapsack variants, state transitions" },
  { topic: "Binary Search & Math", count: "40+", mastery: "Advanced", desc: "Search space reduction, bitwise manipulation" },
  { topic: "Linked Lists & Stacks", count: "25+", mastery: "Proficient", desc: "Pointer manipulation, monotonic stacks, LRU cache" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl sm:text-6xl font-bold text-white font-mono tabular-nums">
      {count}{suffix}
    </div>
  );
}

export default function ProblemSolving() {
  return (
    <section id="dsa" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Algorithmic Rigor
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              DSA & Systems<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-sm">
            I think deeply about time/space complexity, data structures, and computational trade-offs.
          </p>
        </div>

        {/* Animated Stats — Large Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Code2, target: 355, suffix: "+", label: "PROBLEMS SOLVED", sublabel: "LeetCode", color: "text-[#c9a84c]" },
            { icon: Trophy, target: 1415, suffix: "", label: "CONTEST RATING", sublabel: "Competitive", color: "text-[#c9a84c]" },
            { icon: Flame, target: 73, suffix: " Days", label: "MAX STREAK", sublabel: "Daily Commitment", color: "text-[#c9a84c]" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#c9a84c]/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-[#c9a84c]/10 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-[#6b6862] tracking-wider">{stat.sublabel.toUpperCase()}</span>
                </div>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-[10px] font-mono text-[#6b6862] mt-2 tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Topic Breakdown */}
        <div className="space-y-2">
          <h3 className="font-mono text-[9px] text-[#6b6862] tracking-[0.2em] uppercase mb-4">
            Core Focus Areas
          </h3>

          {DSA_TOPICS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.1] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-display font-semibold text-sm text-white">{item.topic}</h4>
                  <span className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c]">
                    {item.mastery}
                  </span>
                </div>
                <p className="text-[11px] text-[#6b6862]">{item.desc}</p>
              </div>
              <span className="font-mono text-sm text-white font-bold shrink-0">{item.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
