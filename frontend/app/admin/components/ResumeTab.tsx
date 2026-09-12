"use client";

import React, { useState, useEffect } from "react";
import { fetchAdminSection, updateAdminSection } from "@/lib/api/admin";

interface ResumeData {
  title?: string;
  fileUrl?: string;
  lastUpdated?: string;
  downloadCount?: number;
  visible?: boolean;
}

export default function ResumeTab() {
  const [data, setData] = useState<ResumeData>({
    title: "Nishant Trivedi — Software Engineer Resume",
    fileUrl: "/resume/Nishant_Trivedi_Resume.pdf",
    lastUpdated: "September 2026",
    downloadCount: 142,
    visible: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAdminSection("resume");
      if (res) {
        setData(res as unknown as ResumeData);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const ok = await updateAdminSection("resume", data as unknown as Record<string, unknown>);
    setSaving(false);
    if (ok) {
      setFeedback({ type: "success", message: "Resume metadata updated and persisted to PostgreSQL." });
    } else {
      setFeedback({ type: "error", message: "Failed to persist resume updates." });
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
        LOADING RESUME METADATA...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            CURRICULUM VITAE & DOSSIER
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Resume Metadata
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage resume document URL, version label, and visibility settings.
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
            RESUME TITLE / LABEL
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Nishant Trivedi — Software Engineer Resume"
            className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
            DOCUMENT PATH / URL
          </label>
          <input
            type="text"
            value={data.fileUrl || ""}
            onChange={(e) => setData({ ...data, fileUrl: e.target.value })}
            placeholder="/resume/Nishant_Trivedi_Resume.pdf"
            className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              LAST UPDATED DATE / BADGE
            </label>
            <input
              type="text"
              value={data.lastUpdated || ""}
              onChange={(e) => setData({ ...data, lastUpdated: e.target.value })}
              placeholder="e.g. September 2026"
              className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
              DOWNLOAD COUNTER
            </label>
            <input
              type="number"
              value={data.downloadCount || 0}
              onChange={(e) => setData({ ...data, downloadCount: parseInt(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            id="resume-visible"
            type="checkbox"
            checked={data.visible ?? true}
            onChange={(e) => setData({ ...data, visible: e.target.checked })}
            className="rounded bg-[#141824] border-white/20 text-amber-500"
          />
          <label htmlFor="resume-visible" className="text-xs font-mono text-zinc-300">
            PUBLICLY DOWNLOADABLE ACROSS PORTFOLIO
          </label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {saving ? "SAVING..." : "UPDATE RESUME CONFIG"}
          </button>
        </div>
      </form>
    </div>
  );
}
