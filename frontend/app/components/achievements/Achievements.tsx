"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Trophy, 
  Code, 
  Terminal, 
  Award, 
  Globe2, 
  Star, 
  ChevronRight,
  ChevronLeft 
} from "lucide-react";

interface ProudMoment {
  id: string;
  index: string;
  platform: string;
  kicker: string;
  metric: string;
  description: string;
  iconBg: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const PROUD_MOMENTS: ProudMoment[] = [
  {
    id: "leetcode",
    index: "01 / 06",
    platform: "LeetCode",
    kicker: "PROBLEMS SOLVED",
    metric: "400+",
    description: "Algorithmic challenges solved across dynamic programming, trees, graphs, and sliding window in Java.",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: ({ className }) => <Code className={className} />,
  },
  {
    id: "codechef",
    index: "02 / 06",
    platform: "CodeChef",
    kicker: "PROBLEMS SOLVED",
    metric: "500+",
    description: "Competitive programming across algorithmic contests, division rounds, and data structure tracks.",
    iconBg: "bg-stone-500/10 text-stone-600 dark:text-stone-300",
    icon: ({ className }) => <Terminal className={className} />,
  },
  {
    id: "hackerrank",
    index: "03 / 06",
    platform: "HackerRank",
    kicker: "STARS EARNED",
    metric: "20+",
    description: "Skill badges across Problem Solving, Java (Basic Assessment), SQL Relational Queries, and C++.",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: ({ className }) => <Star className={className} />,
  },
  {
    id: "hackathon",
    index: "04 / 06",
    platform: "QBX Arena Hackathon",
    kicker: "NATIONAL COMPETITION",
    metric: "Top 10",
    description: "Nationally recognized runner-up for engineering LaunchPilot AI — deterministic startup validation platform.",
    iconBg: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    icon: ({ className }) => <Trophy className={className} />,
  },
  {
    id: "opensource",
    index: "05 / 06",
    platform: "Open Source Connect",
    kicker: "DEVELOPERS MENTORED",
    metric: "50+",
    description: "Spearheaded campus developer chapter, conducting Git workshops and open-source onboarding sessions.",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: ({ className }) => <Globe2 className={className} />,
  },
  {
    id: "ambassador",
    index: "06 / 06",
    platform: "IIT Kanpur & IIT Guwahati",
    kicker: "CAMPUS AMBASSADOR",
    metric: "No. 1",
    description: "Selected to drive campus outreach and collegiate hackathon delegations for Techkriti & Advaya.",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    icon: ({ className }) => <Award className={className} />,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            06 — ACHIEVEMENTS
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* Section Headline matching Reference Frames 29 & 30 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              Proud{" "}
              <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
                moments.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal tracking-wide sm:text-right">
            Competitive programming milestones, national hackathon podiums, and leadership.
          </p>
        </div>

        {/* Responsive Grid matching Reference Frames 29-31 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PROUD_MOMENTS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-[#ECE8DF] dark:bg-[#18191E] rounded-3xl p-7 sm:p-8 border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top Row: Icon & Index Indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-inner`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
                    {item.index}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
                  {item.platform}
                </h3>
                <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {item.kicker}
                </p>

                {/* Description */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mt-3 mb-6">
                  {item.description}
                </p>
              </div>

              {/* Huge Bold Metric Callout */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-end justify-between">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-none">
                  {item.metric}
                </span>
                <span className="text-xs font-serif italic text-neutral-400 dark:text-neutral-500">
                  verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
