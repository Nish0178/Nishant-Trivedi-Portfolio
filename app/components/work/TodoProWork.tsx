"use client";

import React from "react";
import {
  CheckSquare,
  Shield,
  Database,
  BarChart3,
  Server,
  KeyRound,
  Layers,
  ArrowUpRight,
  Activity,
  LineChart,
  HardDrive,
} from "lucide-react";

export default function TodoProWork() {
  return (
    <section className="relative py-20 bg-[#070707] text-[#EDE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project 02 Card Header */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0C0C0C] to-[#080808] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D5B878]/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Product Overview & Core Architecture */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
                  <span>02 / FULL-STACK APPLICATION</span>
                  <span className="text-white/20">·</span>
                  <span>PRODUCTION ARCHITECTURE</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  TodoPro — Smart Task & Productivity Engine
                </h3>

                <p className="text-[#A3A09A] text-sm leading-relaxed mb-6 font-sans">
                  A high-resilience task management web platform engineered with persistent MongoDB storage, stateless JWT authentication, and real-time Chart.js productivity telemetry.
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Node.js", "Express.js", "MongoDB", "JWT Auth", "Chart.js", "Vanilla JavaScript", "Render Cloud"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#EDE9E1]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Feature Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/[0.06]">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#D5B878] mb-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>JWT SECURITY</span>
                  </div>
                  <p className="text-[11px] text-[#8A8780]">
                    Stateless token auth with secure HTTP-only cookies and bcrypt password hashing.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#D5B878] mb-1">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>PRODUCTIVITY TELEMETRY</span>
                  </div>
                  <p className="text-[11px] text-[#8A8780]">
                    Interactive Chart.js visualizations for task completion velocity and weekly trends.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#D5B878] mb-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>MONGODB CRUD</span>
                  </div>
                  <p className="text-[11px] text-[#8A8780]">
                    Indexed document schemas with relational user-task associations and rapid lookup.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#D5B878] mb-1">
                    <Server className="w-3.5 h-3.5" />
                    <span>RENDER CLOUD</span>
                  </div>
                  <p className="text-[11px] text-[#8A8780]">
                    Environment-based configuration with automated cloud pipeline deployments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Analytics UI Mockup / Telemetry Dashboard */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-[#050505] border border-white/10 p-5 shadow-2xl relative overflow-hidden">
                {/* Simulated Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-[#8A8780]">todopro.app/dashboard</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#D5B878] bg-[#D5B878]/10 px-2 py-0.5 rounded">
                    REST API 200 OK
                  </span>
                </div>

                {/* Simulated Telemetry Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-center">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-[#8A8780] block">COMPLETION</span>
                    <span className="text-base font-bold text-emerald-400">94.2%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-[#8A8780] block">VELOCITY</span>
                    <span className="text-base font-bold text-[#D5B878]">18 tasks/d</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-[#8A8780] block">DB LATENCY</span>
                    <span className="text-base font-bold text-[#EDE9E1]">14ms</span>
                  </div>
                </div>

                {/* Simulated Visual Graph / Bars */}
                <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.05] mb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8A8780] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#D5B878]" />
                      WEEKLY PRODUCTIVITY FLOW (CHART.JS)
                    </span>
                    <span className="text-[10px] text-emerald-400">+12% vs last week</span>
                  </div>
                  <div className="h-24 flex items-end justify-between gap-2 pt-2">
                    {[
                      { day: "MON", h: "60%", count: 12 },
                      { day: "TUE", h: "85%", count: 17 },
                      { day: "WED", h: "70%", count: 14 },
                      { day: "THU", h: "95%", count: 21 },
                      { day: "FRI", h: "90%", count: 19 },
                      { day: "SAT", h: "45%", count: 8 },
                      { day: "SUN", h: "35%", count: 6 },
                    ].map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#D5B878]/30 to-[#D5B878] hover:brightness-125 transition-all"
                          style={{ height: item.h }}
                        />
                        <span className="font-mono text-[9px] text-[#8A8780]">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Live Task Ingestion Stream */}
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <span className="flex items-center gap-2 text-[#EDE9E1]">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Implement JWT refresh rotation strategy</span>
                    </span>
                    <span className="text-[9px] text-[#8A8780]">DONE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <span className="flex items-center gap-2 text-[#EDE9E1]">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Optimize MongoDB compound indexes for user query</span>
                    </span>
                    <span className="text-[9px] text-[#8A8780]">DONE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
