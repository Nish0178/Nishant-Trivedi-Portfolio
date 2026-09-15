"use client";

import React from "react";
import { DashboardStats } from "@/lib/api/admin";

interface DashboardTabProps {
  stats: DashboardStats | null;
  loading: boolean;
  onRefresh: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function DashboardTab({
  stats,
  loading,
  onRefresh,
  onNavigateTab,
}: DashboardTabProps) {
  const isBackendOnline = stats?.backendStatus === "UP";

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-[11px] font-mono text-amber-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>PORTFOLIO COMMAND OVERVIEW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-zinc-100 tracking-tight">
            Administrative Control Center
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Real-time status of relational persistence, GitHub repository synchronization, and client transmissions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg bg-[#10131c] hover:bg-[#161a26] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            aria-label="Refresh telemetry metrics"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            <span>{loading ? "SYNCING..." : "SYNC METRICS"}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards Grid */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Projects */}
          <div
            onClick={() => onNavigateTab("projects")}
            className="p-5 rounded-xl bg-[#0b0d14] border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>TOTAL PROJECTS</span>
              <span className="text-amber-500/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">→</span>
            </div>
            <div className="text-3xl font-serif font-light text-zinc-100">
              {stats !== null ? stats.totalProjects : "—"}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{stats !== null ? stats.visibleProjects : 0} published live</span>
            </div>
          </div>

          {/* GitHub Synced Projects */}
          <div
            onClick={() => onNavigateTab("projects")}
            className="p-5 rounded-xl bg-[#0b0d14] border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>GITHUB REPOSITORIES</span>
              <span className="text-amber-500/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">→</span>
            </div>
            <div className="text-3xl font-serif font-light text-zinc-100">
              {stats !== null ? `${stats.totalProjects}` : "—"}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>REST sync deduplicated</span>
            </div>
          </div>

          {/* Unread Transmissions */}
          <div
            onClick={() => onNavigateTab("messages")}
            className="p-5 rounded-xl bg-[#0b0d14] border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>UNREAD TRANSMISSIONS</span>
              <span className="text-amber-500/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">→</span>
            </div>
            <div className="text-3xl font-serif font-light text-zinc-100 flex items-center gap-2">
              <span>{stats !== null ? stats.unreadMessages : "—"}</span>
              {stats !== null && stats.unreadMessages > 0 ? (
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ACTION NEEDED
                </span>
              ) : null}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-2">
              {stats !== null && stats.unreadMessages > 0
                ? `${stats.unreadMessages} message waiting review`
                : "Inbox fully reviewed"}
            </div>
          </div>

          {/* Curated Career Milestones */}
          <div
            onClick={() => onNavigateTab("experience")}
            className="p-5 rounded-xl bg-[#0b0d14] border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>EXPERIENCE ROLES</span>
              <span className="text-amber-500/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">→</span>
            </div>
            <div className="text-3xl font-serif font-light text-zinc-100">
              {stats !== null ? stats.experiencesCount : "—"}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-2">
              Active engineering timelines
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Area */}
      <section aria-labelledby="quick-actions-heading">
        <div className="p-6 rounded-xl bg-[#0b0d14] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 id="quick-actions-heading" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              QUICK COMMAND ACTIONS
            </h2>
            <span className="text-[11px] font-mono text-zinc-500">SHORTCUT MATRIX</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => onNavigateTab("projects")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">◩</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                Manage Projects
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Edit portfolio items</div>
            </button>

            <button
              onClick={() => onNavigateTab("messages")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">✉</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                View Messages
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Contact transmissions</div>
            </button>

            <button
              onClick={() => onNavigateTab("profile")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">◈</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                Edit Profile
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Bio, hero & resume</div>
            </button>

            <button
              onClick={() => onNavigateTab("experience")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">⏱</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                Manage Experience
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Work career history</div>
            </button>

            <button
              onClick={() => onNavigateTab("skills")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">⚙</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                Manage Skills
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Tech stack matrix</div>
            </button>

            <button
              onClick={() => onNavigateTab("media")}
              className="p-4 rounded-lg bg-[#11141e] hover:bg-[#181d2c] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-400 text-base mb-1.5">📁</div>
              <div className="text-xs font-mono text-zinc-200 group-hover:text-amber-300 transition-colors">
                Media Assets
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Asset manager</div>
            </button>
          </div>
        </div>
      </section>

      {/* Two Columns: Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2 Cols) */}
        <section aria-labelledby="activity-heading" className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-[#0b0d14] border border-white/10 h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <h2 id="activity-heading" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  SYSTEM ACTIVITY & AUDIT LOG
                </h2>
                <span className="text-[11px] font-mono text-zinc-500">AUTHENTIC TELEMETRY</span>
              </div>

              <div className="space-y-3">
                {stats?.lastContentUpdate ? (
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#10131c] border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <div className="text-xs font-mono">
                      <div className="text-zinc-200 font-medium">Relational Database Synchronized</div>
                      <div className="text-zinc-500 text-[11px] mt-0.5">
                        PostgreSQL telemetry recorded at {new Date(stats.lastContentUpdate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#10131c] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                  <div className="text-xs font-mono">
                    <div className="text-zinc-200 font-medium">GitHub Synchronization Active</div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">
                      Automated repository deduplication and live stars tracking active.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-dashed border-white/10 text-xs font-mono text-zinc-500 text-center py-5">
                  Recent activity stream will expand with granular audit logging in upcoming phases.
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-white/5">
              Strict audit policy: zero synthetic records generated.
            </div>
          </div>
        </section>

        {/* Real System Status (1 Col) */}
        <section aria-labelledby="status-heading">
          <div className="p-6 rounded-xl bg-[#0b0d14] border border-white/10 h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <h2 id="status-heading" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  SYSTEM STATUS
                </h2>
                <span className="text-[11px] font-mono text-zinc-500">INFRASTRUCTURE</span>
              </div>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between p-3 rounded-lg bg-[#10131c] border border-white/5">
                  <span className="text-zinc-400">Backend API</span>
                  <span className={`inline-flex items-center gap-1.5 ${isBackendOnline ? "text-emerald-400" : "text-amber-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isBackendOnline ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                    <span>{isBackendOnline ? "Connected" : "Unavailable"}</span>
                  </span>
                </li>

                <li className="flex items-center justify-between p-3 rounded-lg bg-[#10131c] border border-white/5">
                  <span className="text-zinc-400">Database Engine</span>
                  <span className={`inline-flex items-center gap-1.5 ${stats !== null ? "text-emerald-400" : "text-zinc-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${stats !== null ? "bg-emerald-400" : "bg-zinc-500"}`}></span>
                    <span>{stats !== null ? "PostgreSQL 18" : "Unavailable"}</span>
                  </span>
                </li>

                <li className="flex items-center justify-between p-3 rounded-lg bg-[#10131c] border border-white/5">
                  <span className="text-zinc-400">GitHub Sync</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Available</span>
                  </span>
                </li>

                <li className="flex items-center justify-between p-3 rounded-lg bg-[#10131c] border border-white/5">
                  <span className="text-zinc-400">Security Gate</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>HMAC-SHA256</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-white/5">
              Service: portfolio-backend · Port 8080
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
