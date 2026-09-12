"use client";

import React, { useState, useEffect } from "react";
import {
  AchievementRecord,
  fetchAdminAchievements,
  saveAdminAchievement,
  deleteAdminAchievement,
} from "@/lib/api/admin";

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<AchievementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editing, setEditing] = useState<Partial<AchievementRecord> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminAchievements();
      setAchievements(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load achievements." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditing({
      title: "",
      badge: "HACKATHON",
      issuerOrVenue: "",
      year: "2026",
      description: "",
      sortOrder: achievements.length + 1,
      visible: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.title?.trim()) {
      setFeedback({ type: "error", message: "Achievement title is required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: AchievementRecord = {
      id: editing.id,
      title: editing.title.trim(),
      badge: editing.badge?.trim() || "HONOR",
      issuerOrVenue: editing.issuerOrVenue || "",
      year: editing.year || "",
      description: editing.description || "",
      sortOrder: editing.sortOrder ?? 1,
      visible: editing.visible ?? true,
    };

    const saved = await saveAdminAchievement(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Achievement "${payload.title}" saved.` });
      setEditing(null);
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to persist achievement." });
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Delete achievement "${title}"?`)) return;
    const ok = await deleteAdminAchievement(id);
    if (ok) {
      setFeedback({ type: "success", message: `Achievement removed.` });
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to delete achievement." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            DISTINCTIONS & AWARDS
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Achievements
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Showcase hackathon accolades, competitive programming ranks, and recognized honors.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>+</span>
          <span>ADD ACHIEVEMENT</span>
        </button>
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

      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
          LOADING ACHIEVEMENTS FROM POSTGRESQL...
        </div>
      ) : achievements.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No achievements configured.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase">
                    {ach.badge}
                  </span>
                  {ach.year && (
                    <span className="text-xs font-mono text-zinc-400">
                      {ach.year}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {ach.title}
                </h3>
                {ach.issuerOrVenue && (
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {ach.issuerOrVenue}
                  </div>
                )}
                {ach.description && (
                  <p className="text-xs text-zinc-300 mt-2 font-sans">
                    {ach.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5 justify-end">
                <button
                  onClick={() => setEditing(ach)}
                  className="px-2.5 py-1 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono"
                >
                  EDIT
                </button>
                <button
                  onClick={() => ach.id && handleDelete(ach.id, ach.title)}
                  className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editing.id ? "Edit Achievement" : "Add Achievement"}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  TITLE
                </label>
                <input
                  type="text"
                  required
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. QBX Arena 2026 Runner-Up"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    BADGE TAG
                  </label>
                  <input
                    type="text"
                    value={editing.badge || ""}
                    onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                    placeholder="e.g. HACKATHON, LEETCODE"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    YEAR
                  </label>
                  <input
                    type="text"
                    value={editing.year || ""}
                    onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  VENUE / ISSUER
                </label>
                <input
                  type="text"
                  value={editing.issuerOrVenue || ""}
                  onChange={(e) => setEditing({ ...editing, issuerOrVenue: e.target.value })}
                  placeholder="e.g. AKTU Innovation Cell"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Built an autonomous multi-agent system in 36 hours..."
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-amber-500 text-zinc-950 font-bold text-xs font-mono uppercase"
                >
                  {saving ? "SAVING..." : "SAVE ACHIEVEMENT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
