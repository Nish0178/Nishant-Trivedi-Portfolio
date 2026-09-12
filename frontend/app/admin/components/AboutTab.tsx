"use client";

import React, { useState, useEffect } from "react";
import { fetchAdminSection, updateAdminSection } from "@/lib/api/admin";

interface StatItem {
  number: string;
  label: string;
  subtext: string;
  highlight: boolean;
}

interface AboutData {
  title?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  stats?: StatItem[];
}

export default function AboutTab() {
  const [title, setTitle] = useState("SYSTEMS BUILDER & FULL-STACK ENGINEER");
  const [bio1, setBio1] = useState("");
  const [bio2, setBio2] = useState("");
  const [stats, setStats] = useState<StatItem[]>([
    { number: "400+", label: "DSA SOLVED", subtext: "Java & LeetCode Verified", highlight: true },
    { number: "B.Tech", label: "AKTU CS '28", subtext: "CSE · Lucknow, IN", highlight: false },
    { number: "10+", label: "PROJECTS & REPOS", subtext: "Full-Stack & AI Tools", highlight: false },
    { number: "TOP 10", label: "HACKATHON RUNNER-UP", subtext: "QBX Arena 2026", highlight: true },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAdminSection("about");
      if (res) {
        const d = res as unknown as AboutData;
        if (d.title) setTitle(d.title);
        if (d.bioParagraph1) setBio1(d.bioParagraph1);
        if (d.bioParagraph2) setBio2(d.bioParagraph2);
        if (Array.isArray(d.stats)) setStats(d.stats);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleUpdateStat = (index: number, field: keyof StatItem, value: unknown) => {
    const next = [...stats];
    next[index] = { ...next[index], [field]: value };
    setStats(next);
  };

  const handleAddStat = () => {
    setStats([...stats, { number: "0", label: "NEW METRIC", subtext: "Description", highlight: false }]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload: AboutData = {
      title,
      bioParagraph1: bio1,
      bioParagraph2: bio2,
      stats,
    };

    const ok = await updateAdminSection("about", payload as unknown as Record<string, unknown>);
    setSaving(false);
    if (ok) {
      setFeedback({ type: "success", message: "About section persisted successfully to PostgreSQL." });
    } else {
      setFeedback({ type: "error", message: "Failed to persist About section." });
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
        LOADING ABOUT & PROFILE CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            BIOGRAPHY & METRICS CMS
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            About Section
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Configure narrative background, core philosophy, and achievement telemetry.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-white ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-xl bg-[#0e111a] border border-white/10 space-y-6">
        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            SECTION SUB-HEADING TITLE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="SYSTEMS BUILDER & FULL-STACK ENGINEER"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              BIOGRAPHY PARAGRAPH 1 (Background & Core Strengths)
            </label>
            <textarea
              rows={3}
              value={bio1}
              onChange={(e) => setBio1(e.target.value)}
              placeholder="I am a computer science undergraduate and software engineer..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              BIOGRAPHY PARAGRAPH 2 (Engineering Philosophy & Tech Stack)
            </label>
            <textarea
              rows={3}
              value={bio2}
              onChange={(e) => setBio2(e.target.value)}
              placeholder="With deep experience in Java, Spring Boot, React, Next.js, and modern databases..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
            />
          </div>
        </div>

        {/* Stats Grid Editor */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              KEY STATS & TELEMETRY BADGES
            </label>
            <button
              type="button"
              onClick={handleAddStat}
              className="px-3 py-1 rounded bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white cursor-pointer"
            >
              + ADD METRIC
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#141824] border border-white/5 space-y-3 relative group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 text-xs font-mono cursor-pointer"
                >
                  ✕ REMOVE
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1">METRIC VALUE</span>
                    <input
                      type="text"
                      value={s.number}
                      onChange={(e) => handleUpdateStat(idx, "number", e.target.value)}
                      placeholder="e.g. 400+"
                      className="w-full px-2.5 py-1.5 rounded bg-[#0e111a] border border-white/10 text-white text-sm font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1">LABEL</span>
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                      placeholder="e.g. DSA SOLVED"
                      className="w-full px-2.5 py-1.5 rounded bg-[#0e111a] border border-white/10 text-white text-sm font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">SUBTEXT</span>
                  <input
                    type="text"
                    value={s.subtext}
                    onChange={(e) => handleUpdateStat(idx, "subtext", e.target.value)}
                    placeholder="e.g. Java & LeetCode Verified"
                    className="w-full px-2.5 py-1.5 rounded bg-[#0e111a] border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    id={`stat-highlight-${idx}`}
                    type="checkbox"
                    checked={s.highlight}
                    onChange={(e) => handleUpdateStat(idx, "highlight", e.target.checked)}
                    className="rounded bg-[#0e111a] border-white/20 text-amber-500"
                  />
                  <label htmlFor={`stat-highlight-${idx}`} className="text-[11px] font-mono text-zinc-400">
                    GOLD HIGHLIGHT EMPHASIS
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {saving ? "SAVING..." : "PERSIST ABOUT UPDATES"}
          </button>
        </div>
      </form>
    </div>
  );
}
