"use client";

import React from "react";
import { motion } from "motion/react";
import {
  CheckSquare,
  BarChart3,
  Database,
  KeyRound,
  Server,
  Activity,
} from "lucide-react";

export default function TodoProWork() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[#c9a84c]" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
            Case Study 02
          </span>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#070707] border border-white/[0.07] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Product Overview */}
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-3">
                TodoPro
              </h3>
              <p className="text-xs font-mono text-[#c9a84c] mb-4 tracking-wider">
                SMART TASK & PRODUCTIVITY ENGINE
              </p>

              <p className="text-sm text-[#a8a49c] leading-relaxed mb-6">
                High-resilience task management platform with persistent MongoDB storage, stateless JWT authentication, and real-time Chart.js productivity telemetry.
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Node.js", "Express.js", "MongoDB", "JWT Auth", "Chart.js", "Vanilla JS", "Render Cloud"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-[#a8a49c]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Feature Matrix */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: KeyRound, label: "JWT Security", desc: "Stateless token auth with bcrypt hashing" },
                  { icon: BarChart3, label: "Productivity Telemetry", desc: "Chart.js completion velocity tracking" },
                  { icon: Database, label: "MongoDB CRUD", desc: "Indexed schemas with rapid lookups" },
                  { icon: Server, label: "Render Cloud", desc: "Automated pipeline deployments" },
                ].map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#c9a84c]/20 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#c9a84c] mb-1.5">
                        <Icon className="w-3 h-3" />
                        <span className="tracking-wider">{feat.label.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-[#6b6862] leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.08] p-5 shadow-2xl">
                {/* Browser Chrome */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="ml-2 font-mono text-[10px] text-[#6b6862]">todopro.app/dashboard</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    200 OK
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-center">
                  {[
                    { label: "COMPLETION", value: "94.2%", color: "text-emerald-400" },
                    { label: "VELOCITY", value: "18/day", color: "text-[#c9a84c]" },
                    { label: "LATENCY", value: "14ms", color: "text-white" },
                  ].map((stat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[9px] text-[#6b6862] block">{stat.label}</span>
                      <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Weekly Chart */}
                <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.04] mb-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6862] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#c9a84c]" />
                      WEEKLY FLOW
                    </span>
                    <span className="text-emerald-500">+12%</span>
                  </div>
                  <div className="h-20 flex items-end justify-between gap-1.5">
                    {[
                      { day: "M", h: "60%" },
                      { day: "T", h: "85%" },
                      { day: "W", h: "70%" },
                      { day: "T", h: "95%" },
                      { day: "F", h: "90%" },
                      { day: "S", h: "45%" },
                      { day: "S", h: "35%" },
                    ].map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-[#c9a84c]/30 to-[#c9a84c] hover:brightness-125 transition-all"
                          style={{ height: item.h }}
                        />
                        <span className="font-mono text-[8px] text-[#6b6862]">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Stream */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  {[
                    "Implement JWT refresh rotation",
                    "Optimize MongoDB compound indexes",
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                      <span className="flex items-center gap-2 text-[#a8a49c]">
                        <CheckSquare className="w-3 h-3 text-emerald-500" />
                        {task}
                      </span>
                      <span className="text-[8px] text-[#6b6862]">DONE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
