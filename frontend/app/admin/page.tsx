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
import ProfileTab from "./components/ProfileTab";
import ProjectsTab from "./components/ProjectsTab";
import SkillsTab from "./components/SkillsTab";
import ExperienceTab from "./components/ExperienceTab";
import AchievementsTab from "./components/AchievementsTab";
import MessagesTab from "./components/MessagesTab";
import MediaTab from "./components/MediaTab";
import SettingsTab from "./components/SettingsTab";

interface NavItem {
  id: string;
  label: string;
  badgeKey?: "messages";
  icon: (props: { className?: string }) => React.JSX.Element;
}

const SIDEBAR_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m11.142 0L21.75 12l-4.179-2.25m-6.321 6l3-12" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V9A4.5 4.5 0 0010.5 4.5h-.75A4.5 4.5 0 005.25 9v5.25" />
      </svg>
    ),
  },
  {
    id: "messages",
    label: "Messages",
    badgeKey: "messages",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: "media",
    label: "Media",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const SECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "System Telemetry & Overview" },
  profile: { title: "Profile CMS", subtitle: "Bio, Hero, Resume & Links" },
  projects: { title: "Projects Management", subtitle: "Curated Showcase & GitHub Sync" },
  experience: { title: "Career Experience", subtitle: "Timeline Roles & Engineering Contributions" },
  skills: { title: "Technical Skills", subtitle: "Categorized Engineering Matrix" },
  achievements: { title: "Achievements", subtitle: "Hackathons, Honors & Community Leadership" },
  messages: { title: "Transmissions Inbox", subtitle: "Contact Messages & Inquiries" },
  media: { title: "Media Asset Manager", subtitle: "Cloud Hosting & File Pipelines" },
  settings: { title: "Site Settings", subtitle: "Global Metadata, Status & Availability" },
};

export default function AdminPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    const data = await fetchDashboardStats();
    if (data) {
      setStats(data);
    }
    setStatsLoading(false);
  }, []);

  // Strict Authentication Check
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const user = await verifyAdminSession();
        if (!user) {
          if (isMounted) router.replace("/admin/login");
          return;
        }
        if (isMounted) {
          setAdminUser(user);
          loadStats();
        }
      } catch {
        if (isMounted) router.replace("/admin/login");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router, loadStats]);

  // Keyboard accessibility: ESC closes mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileDrawerOpen]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileDrawerOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07080c] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3 text-xs font-mono text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>AUTHENTICATING COMMAND SESSION...</span>
        </div>
      </div>
    );
  }

  if (!adminUser) return null;

  const currentSection = SECTION_TITLES[activeTab] || { title: "Admin CMS", subtitle: "Control Center" };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 flex font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR (Fixed / Sticky) */}
      {/* ========================================================================= */}
      <aside
        aria-label="Admin Navigation Sidebar"
        className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#090b10] h-screen sticky top-0 shrink-0 select-none z-30"
      >
        {/* Identity Area */}
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="block group">
            <div className="text-[11px] font-mono tracking-widest text-amber-500 uppercase font-bold">
              NISHANT TRIVEDI
            </div>
            <div className="text-xs font-mono text-zinc-400 tracking-wider mt-0.5 group-hover:text-zinc-200 transition-colors">
              PORTFOLIO CMS
            </div>
          </Link>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>SYSTEM LIVE · v2.4</span>
          </div>
        </div>

        {/* Navigation Items (9 Items) */}
        <nav aria-label="Main Navigation" className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1.5">
            CONTROL MODULES
          </div>

          {SIDEBAR_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const unreadCount = item.badgeKey === "messages" && stats ? stats.unreadMessages : 0;
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all text-left cursor-pointer group ${
                  isActive
                    ? "bg-amber-500/10 text-amber-300 font-medium border-l-2 border-amber-400 pl-2.5"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {unreadCount > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] shrink-0 font-mono">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Identity / Session Footer with Logout */}
        <div className="p-4 border-t border-white/10 bg-[#07080d] space-y-3">
          <div className="text-[11px] font-mono text-zinc-500 truncate">
            <span className="text-zinc-400">SESSION:</span> {adminUser.email}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            aria-label="Logout from Admin CMS"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER (Slide-over with Backdrop) */}
      {/* ========================================================================= */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] bg-[#090b10] border-r border-white/10 flex flex-col h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-amber-500 font-bold tracking-wider">
                  NISHANT TRIVEDI
                </div>
                <div className="text-[11px] font-mono text-zinc-500">PORTFOLIO CMS</div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            {/* Drawer Nav Items */}
            <nav className="flex-1 p-3 space-y-1">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                const unreadCount = item.badgeKey === "messages" && stats ? stats.unreadMessages : 0;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <IconComponent className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-zinc-500"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {unreadCount > 0 ? (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px]">
                        {unreadCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-white/10 space-y-3 bg-[#07080d]">
              <div className="text-[11px] font-mono text-zinc-500 truncate">
                {adminUser.email}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 cursor-pointer"
              >
                <span>LOGOUT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN APPLICATION SHELL (Topbar + Scrollable Main Content) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOPBAR */}
        <header
          aria-label="Admin Topbar"
          className="sticky top-0 z-20 bg-[#090b10]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4"
        >
          {/* Left: Mobile Menu Trigger & Current Section Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg bg-[#121520] text-zinc-400 hover:text-white border border-white/5 cursor-pointer"
              aria-label="Open mobile navigation drawer"
              aria-expanded={mobileDrawerOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 truncate">
                <span className="text-zinc-600 hidden sm:inline">CMS</span>
                <span className="text-zinc-600 hidden sm:inline">/</span>
                <span className="text-zinc-200 font-medium truncate">{currentSection.title}</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 hidden sm:block truncate">
                {currentSection.subtitle}
              </div>
            </div>
          </div>

          {/* Right: Status, Email, View Site, Logout */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Live session indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121520] border border-white/5 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-300">{adminUser.email}</span>
            </div>

            {/* Public Portfolio Link */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121520] hover:bg-[#181d2c] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open live portfolio in a new window"
            >
              <span className="hidden sm:inline">VIEW LIVE SITE</span>
              <span className="sm:hidden">SITE</span>
              <span className="text-amber-400 text-xs">↗</span>
            </Link>

            {/* Quick Logout (Desktop Topbar) */}
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              aria-label="Logout"
            >
              LOGOUT
            </button>
          </div>
        </header>

        {/* INDEPENDENTLY SCROLLING MAIN CONTENT CANVAS */}
        <main
          aria-label="Admin Content Area"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"
        >
          {activeTab === "dashboard" && (
            <DashboardTab
              stats={stats}
              loading={statsLoading}
              onRefresh={loadStats}
              onNavigateTab={handleSelectTab}
            />
          )}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "achievements" && <AchievementsTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "media" && <MediaTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
