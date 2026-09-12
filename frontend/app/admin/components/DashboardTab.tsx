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
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            EXECUTIVE TELEMETRY
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            System Overview
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Real-time status of portfolio persistence, GitHub synchronization, and incoming transmissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            <span>SYNC METRICS</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>TOTAL PROJECTS</span>
            <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <div className="text-3xl font-light text-white font-mono">
            {stats ? stats.totalProjects : "—"}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{stats ? stats.visibleProjects : 0} published live</span>
          </div>
        </div>

        {/* Unread Transmissions */}
        <div
          onClick={() => onNavigateTab("messages")}
          className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>CONTACT MESSAGES</span>
            <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <div className="text-3xl font-light text-white font-mono flex items-center gap-2">
            <span>{stats ? stats.unreadMessages : "—"}</span>
            {stats && stats.unreadMessages > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                UNREAD
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-2">
            {stats && stats.unreadMessages > 0
              ? "Action needed in transmissions inbox"
              : "All transmissions reviewed"}
          </div>
        </div>

        {/* Experiences */}
        <div
          onClick={() => onNavigateTab("experience")}
          className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>WORK TIMELINES</span>
            <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <div className="text-3xl font-light text-white font-mono">
            {stats ? stats.experiencesCount : "—"}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-2">
            Active roles & contributions
          </div>
        </div>

        {/* Backend & Persistence Status */}
        <div className="p-5 rounded-xl bg-[#0e111a] border border-white/10">
          <div className="text-xs font-mono text-zinc-400 mb-2">BACKEND SYSTEM</div>
          <div className="text-lg font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{stats?.backendStatus || "ONLINE"}</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-3 truncate">
            Updated: {stats?.lastContentUpdate ? new Date(stats.lastContentUpdate).toLocaleTimeString() : "Synchronized"}
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="p-6 rounded-xl bg-[#0e111a] border border-white/10">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 mb-4">
          QUICK ACTIONS & CONTENT MANAGEMENT
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: "hero", label: "HERO SECTION", icon: "✦" },
            { id: "about", label: "ABOUT & BIO", icon: "◈" },
            { id: "projects", label: "PROJECTS", icon: "◩" },
            { id: "skills", label: "SKILLS & TECH", icon: "⚙" },
            { id: "messages", label: "INBOX", icon: "✉" },
            { id: "settings", label: "SETTINGS", icon: "❖" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateTab(item.id)}
              className="p-3.5 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/5 hover:border-amber-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="text-amber-500 text-lg mb-1 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-xs font-mono text-zinc-300 group-hover:text-amber-400 transition-colors">
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Architectural Guarantee Notice */}
      <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono text-zinc-300 space-y-2">
        <div className="text-amber-400 font-bold flex items-center gap-2">
          <span>●</span>
          <span>CMS & REPOSITORY COEXISTENCE ACTIVE</span>
        </div>
        <p className="leading-relaxed">
          The CMS seamlessly unifies curated flagship projects (<span className="text-amber-300 font-sans">LaunchPilot AI</span>, <span className="text-amber-300 font-sans">TodoPro</span>, <span className="text-amber-300 font-sans">Astrospacious</span>) with automated GitHub repository synchronization. Database modifications persist immediately to PostgreSQL.
        </p>
      </div>
    </div>
  );
}
