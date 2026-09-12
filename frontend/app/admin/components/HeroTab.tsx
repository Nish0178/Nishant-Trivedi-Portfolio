"use client";

import React, { useState, useEffect } from "react";
import { fetchAdminSection, updateAdminSection } from "@/lib/api/admin";

interface HeroData {
  badgeName?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  headlineLine3?: string;
  subRoles?: string[];
  bio?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
}

export default function HeroTab() {
  const [data, setData] = useState<HeroData>({
    badgeName: "NISHANT",
    headlineLine1: "I BUILD",
    headlineLine2: "DIGITAL",
    headlineLine3: "EXPERIENCES",
    subRoles: ["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"],
    bio: "Building products, systems, and AI-powered experiences across the full stack.",
    ctaPrimaryText: "EXPLORE WORK",
    ctaPrimaryHref: "#work",
    ctaSecondaryText: "INITIALIZE TRANSMISSION",
    ctaSecondaryHref: "#contact",
  });
  const [subRolesInput, setSubRolesInput] = useState("FULL STACK DEVELOPER, UI/UX DESIGNER, DATA SCIENCE");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAdminSection("hero");
      if (res) {
        const d = res as unknown as HeroData;
        setData(d);
        if (Array.isArray(d.subRoles)) {
          setSubRolesInput(d.subRoles.join(", "));
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload: HeroData = {
      ...data,
      subRoles: subRolesInput.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const ok = await updateAdminSection("hero", payload as unknown as Record<string, unknown>);
    setSaving(false);
    if (ok) {
      setFeedback({ type: "success", message: "Hero configuration updated and persisted to PostgreSQL." });
    } else {
      setFeedback({ type: "error", message: "Failed to persist Hero updates. Please check backend connection." });
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
        RETRIEVING HERO CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            HERO PRESENTATION LAYER
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Hero Section CMS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Customize headlines, sub-roles, bio, and call-to-action buttons. (9:16 background video remains intact).
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              PILL BADGE NAME
            </label>
            <input
              type="text"
              value={data.badgeName || ""}
              onChange={(e) => setData({ ...data, badgeName: e.target.value })}
              placeholder="NISHANT"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              SUB-ROLES (Comma-separated)
            </label>
            <input
              type="text"
              value={subRolesInput}
              onChange={(e) => setSubRolesInput(e.target.value)}
              placeholder="FULL STACK DEVELOPER, UI/UX DESIGNER, DATA SCIENCE"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
            />
          </div>
        </div>

        {/* 3-Line Headline */}
        <div className="space-y-3">
          <label className="block text-xs font-mono text-zinc-400 uppercase">
            3-LINE DISPLAY HEADLINE (Times New Roman)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block mb-1">LINE 1</span>
              <input
                type="text"
                value={data.headlineLine1 || ""}
                onChange={(e) => setData({ ...data, headlineLine1: e.target.value })}
                placeholder="I BUILD"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block mb-1">LINE 2</span>
              <input
                type="text"
                value={data.headlineLine2 || ""}
                onChange={(e) => setData({ ...data, headlineLine2: e.target.value })}
                placeholder="DIGITAL"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block mb-1">LINE 3</span>
              <input
                type="text"
                value={data.headlineLine3 || ""}
                onChange={(e) => setData({ ...data, headlineLine3: e.target.value })}
                placeholder="EXPERIENCES"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            HERO BIO & INTRODUCTORY COPY
          </label>
          <textarea
            rows={3}
            value={data.bio || ""}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            placeholder="Building products, systems, and AI-powered experiences across the full stack..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-lg bg-[#141824] border border-white/5 space-y-3">
            <span className="text-xs font-mono text-amber-400 block">PRIMARY CTA</span>
            <input
              type="text"
              value={data.ctaPrimaryText || ""}
              onChange={(e) => setData({ ...data, ctaPrimaryText: e.target.value })}
              placeholder="Button Text (e.g. EXPLORE WORK)"
              className="w-full px-3 py-2 rounded bg-[#0e111a] border border-white/10 text-white text-sm focus:outline-none"
            />
            <input
              type="text"
              value={data.ctaPrimaryHref || ""}
              onChange={(e) => setData({ ...data, ctaPrimaryHref: e.target.value })}
              placeholder="Target Link / Anchor (e.g. #work)"
              className="w-full px-3 py-2 rounded bg-[#0e111a] border border-white/10 text-white text-sm focus:outline-none font-mono"
            />
          </div>

          <div className="p-4 rounded-lg bg-[#141824] border border-white/5 space-y-3">
            <span className="text-xs font-mono text-zinc-300 block">SECONDARY CTA</span>
            <input
              type="text"
              value={data.ctaSecondaryText || ""}
              onChange={(e) => setData({ ...data, ctaSecondaryText: e.target.value })}
              placeholder="Button Text (e.g. INITIALIZE TRANSMISSION)"
              className="w-full px-3 py-2 rounded bg-[#0e111a] border border-white/10 text-white text-sm focus:outline-none"
            />
            <input
              type="text"
              value={data.ctaSecondaryHref || ""}
              onChange={(e) => setData({ ...data, ctaSecondaryHref: e.target.value })}
              placeholder="Target Link / Anchor (e.g. #contact)"
              className="w-full px-3 py-2 rounded bg-[#0e111a] border border-white/10 text-white text-sm focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {saving ? "PERSISTING TO POSTGRESQL..." : "PERSIST HERO UPDATES"}
          </button>
        </div>
      </form>
    </div>
  );
}
