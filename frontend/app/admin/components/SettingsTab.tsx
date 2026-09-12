"use client";

import React, { useState, useEffect } from "react";
import { fetchAdminSection, updateAdminSection } from "@/lib/api/admin";

interface SettingsData {
  siteTitle?: string;
  metaDescription?: string;
  email?: string;
  location?: string;
  availabilityStatus?: string;
  maintenanceMode?: boolean;
}

export default function SettingsTab() {
  const [data, setData] = useState<SettingsData>({
    siteTitle: "Nishant Trivedi — Software Engineer & Systems Builder",
    metaDescription: "Building products, systems, and AI-powered experiences across the full stack.",
    email: "nishant.trivedi.dev@gmail.com",
    location: "Lucknow, Uttar Pradesh, India",
    availabilityStatus: "OPEN FOR FULL-STACK & AI ROLES",
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAdminSection("settings");
      if (res) {
        setData(res as unknown as SettingsData);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const ok = await updateAdminSection("settings", data as unknown as Record<string, unknown>);
    setSaving(false);
    if (ok) {
      setFeedback({ type: "success", message: "Global settings updated and persisted to PostgreSQL." });
    } else {
      setFeedback({ type: "error", message: "Failed to persist global settings." });
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
        LOADING SITE SETTINGS...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            GLOBAL CONFIGURATION & SEO
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Site Settings
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Configure site metadata, contact email destination, availability badge, and system toggles.
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

      <form onSubmit={handleSave} className="p-6 rounded-xl bg-[#0e111a] border border-white/10 space-y-4">
        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            SITE TITLE (HTML & SEO Title)
          </label>
          <input
            type="text"
            value={data.siteTitle || ""}
            onChange={(e) => setData({ ...data, siteTitle: e.target.value })}
            placeholder="Nishant Trivedi — Software Engineer"
            className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            META DESCRIPTION
          </label>
          <textarea
            rows={2}
            value={data.metaDescription || ""}
            onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
            placeholder="Software engineer building products, systems, and AI-powered experiences..."
            className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              PUBLIC CONTACT EMAIL
            </label>
            <input
              type="email"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="nishant.trivedi.dev@gmail.com"
              className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              GEOGRAPHIC LOCATION
            </label>
            <input
              type="text"
              value={data.location || ""}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="Lucknow, Uttar Pradesh, India"
              className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            AVAILABILITY STATUS BADGE
          </label>
          <input
            type="text"
            value={data.availabilityStatus || ""}
            onChange={(e) => setData({ ...data, availabilityStatus: e.target.value })}
            placeholder="OPEN FOR FULL-STACK & AI ROLES"
            className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            id="maintenance-mode"
            type="checkbox"
            checked={data.maintenanceMode ?? false}
            onChange={(e) => setData({ ...data, maintenanceMode: e.target.checked })}
            className="rounded bg-[#141824] border-white/20 text-amber-500"
          />
          <label htmlFor="maintenance-mode" className="text-xs font-mono text-zinc-300">
            MAINTENANCE MODE BANNER
          </label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {saving ? "SAVING..." : "PERSIST SITE SETTINGS"}
          </button>
        </div>
      </form>
    </div>
  );
}
