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
  const [reordering, setReordering] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editing, setEditing] = useState<Partial<AchievementRecord> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminAchievements();
      data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setAchievements(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load achievements from PostgreSQL." });
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
      url: "",
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
      issuerOrVenue: editing.issuerOrVenue?.trim() || "",
      year: editing.year?.trim() || "",
      description: editing.description?.trim() || "",
      url: editing.url?.trim() || "",
      sortOrder: editing.sortOrder ?? 1,
      visible: editing.visible ?? true,
    };

    const saved = await saveAdminAchievement(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Achievement "${payload.title}" saved to PostgreSQL.` });
      setEditing(null);
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to persist achievement to backend." });
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

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;

    setReordering(true);
    const currentItem = achievements[index];
    const targetItem = achievements[targetIndex];

    const currentSort = currentItem.sortOrder ?? index + 1;
    const targetSort = targetItem.sortOrder ?? targetIndex + 1;

    try {
      await Promise.all([
        saveAdminAchievement({ ...currentItem, sortOrder: targetSort }),
        saveAdminAchievement({ ...targetItem, sortOrder: currentSort }),
      ]);
      await loadData();
      setFeedback({ type: "success", message: "Achievement order updated." });
    } catch {
      setFeedback({ type: "error", message: "Failed to update achievement ordering." });
    } finally {
      setReordering(false);
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
            Achievements CMS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage hackathon honors, certifications, algorithmic milestones, and verified links.
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
          No achievement records found.
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((ach, idx) => (
            <div
              key={ach.id || idx}
              className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-3"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400">
                    #{ach.sortOrder ?? idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold uppercase">
                    {ach.badge}
                  </span>
                  {!ach.visible && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                      HIDDEN
                    </span>
                  )}
                  <h4 className="text-sm font-semibold text-white">
                    {ach.title}
                  </h4>
                  {ach.year && (
                    <span className="text-xs font-mono text-zinc-400">
                      · {ach.year}
                    </span>
                  )}
                  {ach.issuerOrVenue && (
                    <span className="text-xs font-sans text-zinc-400">
                      via {ach.issuerOrVenue}
                    </span>
                  )}
                </div>

                {ach.description && (
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                )}

                {ach.url && (
                  <div className="text-[11px] font-mono text-amber-400/80 hover:text-amber-300 truncate">
                    <a href={ach.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      <span>🔗 {ach.url}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-start shrink-0 flex-wrap">
                <div className="flex items-center border border-white/10 rounded overflow-hidden">
                  <button
                    disabled={idx === 0 || reordering}
                    onClick={() => handleMove(idx, "up")}
                    title="Move Up"
                    className="px-2 py-1.5 bg-[#141824] hover:bg-[#1c2233] text-zinc-300 disabled:opacity-30 text-xs font-mono cursor-pointer disabled:cursor-not-allowed"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === achievements.length - 1 || reordering}
                    onClick={() => handleMove(idx, "down")}
                    title="Move Down"
                    className="px-2 py-1.5 bg-[#141824] hover:bg-[#1c2233] text-zinc-300 disabled:opacity-30 text-xs font-mono border-l border-white/10 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>
                </div>

                <button
                  onClick={() => setEditing(ach)}
                  className="px-3 py-1.5 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  onClick={() => ach.id && handleDelete(ach.id, ach.title)}
                  className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 my-8">
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
                  TITLE <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. QBX Arena 2026 Runner-Up"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
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
                    YEAR / DATE
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
                  VENUE / ISSUING BODY
                </label>
                <input
                  type="text"
                  value={editing.issuerOrVenue || ""}
                  onChange={(e) => setEditing({ ...editing, issuerOrVenue: e.target.value })}
                  placeholder="e.g. QBX Arena Hackathon / AKTU"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  VERIFICATION / CREDENTIAL URL
                </label>
                <input
                  type="url"
                  value={editing.url || ""}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none"
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
                  placeholder="Top 10 Runner-Up out of 200+ teams for LaunchPilot AI..."
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    SORT ORDER
                  </label>
                  <input
                    type="number"
                    value={editing.sortOrder ?? 1}
                    onChange={(e) =>
                      setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-24 px-3 py-1.5 rounded bg-[#141824] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    id="ach-visible"
                    type="checkbox"
                    checked={editing.visible ?? true}
                    onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                    className="rounded bg-[#141824] border-white/20 text-amber-500"
                  />
                  <label htmlFor="ach-visible" className="text-xs font-mono text-zinc-300 cursor-pointer">
                    PUBLISHED / VISIBLE
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono uppercase cursor-pointer disabled:opacity-50"
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
