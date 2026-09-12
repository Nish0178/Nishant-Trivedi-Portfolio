"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AdminUser,
  DashboardStats,
  verifyAdminSession,
  logoutAdmin,
  fetchDashboardStats,
} from "@/lib/api/admin";

import DashboardTab from "./components/DashboardTab";
import HeroTab from "./components/HeroTab";
import AboutTab from "./components/AboutTab";
import ProjectsTab from "./components/ProjectsTab";
import SkillsTab from "./components/SkillsTab";
import ExperienceTab from "./components/ExperienceTab";
import EducationTab from "./components/EducationTab";
import AchievementsTab from "./components/AchievementsTab";
import SocialsTab from "./components/SocialsTab";
import ResumeTab from "./components/ResumeTab";
import SettingsTab from "./components/SettingsTab";
import MessagesTab from "./components/MessagesTab";

const NAV_TABS = [
  { id: "dashboard", label: "Dashboard", icon: "✦" },
  { id: "hero", label: "Hero", icon: "★" },
  { id: "about", label: "About & Bio", icon: "◈" },
  { id: "projects", label: "Projects", icon: "◩" },
  { id: "skills", label: "Skills", icon: "⚙" },
  { id: "experience", label: "Experience", icon: "⏱" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "achievements", label: "Achievements", icon: "🏆" },
  { id: "socials", label: "Social / Links", icon: "🔗" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "settings", label: "Site Settings", icon: "❖" },
  { id: "messages", label: "Contact Messages", icon: "✉" },
];

export default function AdminPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Authentication check
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await verifyAdminSession();
        if (!user) {
          router.replace("/admin/login");
          return;
        }
        setAdminUser(user);
        loadStats();
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    const data = await fetchDashboardStats();
    if (data) {
      setStats(data);
    }
    setStatsLoading(false);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page,#07080c)] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3 text-sm font-mono text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>AUTHENTICATING COMMAND SESSION...</span>
        </div>
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-page,#07080c)] text-[var(--text-primary,#ffffff)] flex flex-col font-sans">
      {/* Top Command Bar */}
      <header className="sticky top-0 z-40 bg-[#0e111a]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg bg-[#141824] text-zinc-400 hover:text-white"
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <Link href="/" className="flex items-center space-x-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-serif text-lg tracking-tight font-normal text-white group-hover:text-amber-400 transition-colors">
              Nishant Trivedi
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold hidden sm:inline-block">
              CMS ADMIN
            </span>
          </Link>
        </div>

        {/* User Session & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>SESSION:</span>
            <span className="text-zinc-200">{adminUser.email}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <span>VIEW LIVE SITE</span>
            <span className="text-amber-500">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 transition-all cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0a0c14] p-4 shrink-0 overflow-y-auto">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider px-3 mb-2">
            NAVIGATION MATRIX
          </div>

          <nav className="space-y-1">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const unreadCount = tab.id === "messages" && stats ? stats.unreadMessages : 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={isActive ? "text-amber-400" : "text-zinc-500"}>
                      {tab.icon}
                    </span>
                    <span className="truncate">{tab.label}</span>
                  </div>

                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 text-[11px] font-mono text-zinc-500 space-y-1 px-3">
            <div>PostgreSQL Engine: Live</div>
            <div>Auth: HMAC-SHA256</div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex"
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="w-4/5 max-w-xs bg-[#0e111a] border-r border-white/10 p-5 space-y-4 h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-amber-500">ADMIN MATRIX</span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                {NAV_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all text-left ${
                      activeTab === tab.id
                        ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold"
                        : "text-zinc-400 hover:bg-white/5"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.id === "messages" && stats && stats.unreadMessages > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px]">
                        {stats.unreadMessages}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Tab Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardTab
              stats={stats}
              loading={statsLoading}
              onRefresh={loadStats}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
          {activeTab === "hero" && <HeroTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "education" && <EducationTab />}
          {activeTab === "achievements" && <AchievementsTab />}
          {activeTab === "socials" && <SocialsTab />}
          {activeTab === "resume" && <ResumeTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "messages" && <MessagesTab />}
        </main>
      </div>
    </div>
  );
}
