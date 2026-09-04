"use client";

import React from "react";
import {
  Terminal,
  Activity,
  Flame,
  Trophy,
  BrainCircuit,
  Binary,
  GitCommit,
  CheckCircle2,
  Code2,
  Cpu,
} from "lucide-react";

const DSA_TOPICS = [
  { topic: "Arrays & Hashing", count: "90+ Solved", mastery: "Advanced", desc: "Lookup optimizations, frequency hashing, sliding window" },
  { topic: "Two Pointers & Sliding Window", count: "45+ Solved", mastery: "Advanced", desc: "Monotonic queues, subarray bounds, pointer convergence" },
  { topic: "Trees & Binary Search Trees", count: "65+ Solved", mastery: "Proficient", desc: "DFS/BFS traversals, LCA, subtree recursion, level-order" },
  { topic: "Graphs & BFS/DFS", count: "40+ Solved", mastery: "Proficient", desc: "Adjacency lists, cycle detection, topological sort, Dijkstra" },
  { topic: "Dynamic Programming", count: "50+ Solved", mastery: "Core", desc: "1D/2D memoization, knapsack variants, state transitions" },
  { topic: "Binary Search & Math", count: "40+ Solved", mastery: "Advanced", desc: "Search space reduction, bitwise manipulation, monotonic ranges" },
  { topic: "Linked Lists & Stacks/Queues", count: "25+ Solved", mastery: "Proficient", desc: "Pointer manipulation, monotonic stacks, LRU cache pattern" },
];

export default function ProblemSolving() {
  return (
    <section id="dsa" className="relative py-28 bg-[#070707] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>05 / ALGORITHMIC RIGOR</span>
              <span className="text-white/20">·</span>
              <span>ENGINEERING MINDSET</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              DSA & Systems<span className="text-[#D5B878]">.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-sm">
            I don't just build interfaces. I think deeply about time/space complexity, data structures, and computational trade-offs.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#8A8780] mb-3">
              <span className="flex items-center gap-1.5 text-[#D5B878]">
                <Code2 className="w-4 h-4" />
                TOTAL PROBLEMS
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#D5B878]/10 text-[#D5B878]">
                VERIFIED
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white font-mono">
              355<span className="text-[#D5B878]">+</span>
            </div>
            <p className="text-xs text-[#8A8780] mt-2 font-sans">
              Solved across LeetCode covering fundamental & advanced algorithms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#8A8780] mb-3">
              <span className="flex items-center gap-1.5 text-[#D5B878]">
                <Trophy className="w-4 h-4" />
                CONTEST RATING
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#A3A09A]">
                LEETCODE
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white font-mono">
              1415
            </div>
            <p className="text-xs text-[#8A8780] mt-2 font-sans">
              Contest rating demonstrating timed algorithmic problem solving.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#8A8780] mb-3">
              <span className="flex items-center gap-1.5 text-[#D5B878]">
                <Flame className="w-4 h-4" />
                MAX CODING STREAK
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                ACTIVE
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white font-mono">
              73<span className="text-[#D5B878]"> Days</span>
            </div>
            <p className="text-xs text-[#8A8780] mt-2 font-sans">
              Continuous daily algorithmic problem-solving commitment.
            </p>
          </div>
        </div>

        {/* Terminal Telemetry / Topic Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Terminal Console View */}
          <div className="lg:col-span-5 rounded-2xl bg-[#050505] border border-white/10 p-5 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-[11px] text-[#8A8780]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-white/50">dsa-telemetry.sh</span>
              </div>
              <span className="text-[#D5B878]">PASS 100%</span>
            </div>

            <div className="space-y-3 text-[#A3A09A]">
              <p className="text-[#D5B878]">$ leetcode --stats --user=nishant_trivedi</p>
              <p>&gt; Fetching algorithmic graph profile...</p>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5 text-[11px]">
                <div className="flex justify-between text-[#EDE9E1]">
                  <span>Total Submissions:</span>
                  <span className="text-[#D5B878] font-bold">750+</span>
                </div>
                <div className="flex justify-between text-[#EDE9E1]">
                  <span>Acceptance Rate:</span>
                  <span className="text-emerald-400 font-bold">~68.4%</span>
                </div>
                <div className="flex justify-between text-[#EDE9E1]">
                  <span>Primary Languages:</span>
                  <span>Java · C++ · Python</span>
                </div>
                <div className="flex justify-between text-[#EDE9E1]">
                  <span>Complexity Focus:</span>
                  <span>O(N log N) / O(N) Bounds</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-[#8A8780] leading-relaxed">
                <p>&gt; Continuous practice in asymptotic analysis, memory locality, and defensive corner case testing.</p>
              </div>
            </div>
          </div>

          {/* Right: Data Structure Domain Matrix */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-mono text-xs text-[#8A8780] tracking-wider uppercase mb-2">
              Algorithmic Core Focus Areas
            </h3>

            {DSA_TOPICS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0A0A0A] border border-white/[0.06] hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-sans font-semibold text-sm text-white">
                      {item.topic}
                    </h4>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-[#D5B878]">
                      {item.mastery}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8780] font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="font-mono text-xs text-[#EDE9E1] font-semibold sm:text-right shrink-0">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
