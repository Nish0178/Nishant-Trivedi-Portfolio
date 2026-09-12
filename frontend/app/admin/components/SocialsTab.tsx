"use client";

import React, { useState, useEffect } from "react";
import {
  SocialRecord,
  fetchAdminSocials,
  saveAdminSocial,
  deleteAdminSocial,
} from "@/lib/api/admin";

export default function SocialsTab() {
  const [socials, setSocials] = useState<SocialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editing, setEditing] = useState<Partial<SocialRecord> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSocials();
      setSocials(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load social links." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditing({
      platform: "GitHub",
      url: "https://github.com/Nish0178",
      icon: "github",
      sortOrder: socials.length + 1,
      visible: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.platform?.trim() || !editing.url?.trim()) {
      setFeedback({ type: "error", message: "Platform and URL are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: SocialRecord = {
      id: editing.id,
      platform: editing.platform.trim(),
      url: editing.url.trim(),
      icon: editing.icon || "",
      sortOrder: editing.sortOrder ?? 1,
      visible: editing.visible ?? true,
    };

    const saved = await saveAdminSocial(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Social link "${payload.platform}" saved.` });
      setEditing(null);
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to persist social link." });
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete social link for "${name}"?`)) return;
    const ok = await deleteAdminSocial(id);
    if (ok) {
      setFeedback({ type: "success", message: `Social link deleted.` });
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to delete link." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            EXTERNAL PRESENCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Social & Contact Links
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage links to GitHub, LinkedIn, X / Twitter, LeetCode, and email.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>+</span>
          <span>ADD SOCIAL LINK</span>
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
          LOADING SOCIAL LINKS FROM POSTGRESQL...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <span className="text-sm font-semibold text-white block">
                  {s.platform}
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-amber-400/80 hover:text-amber-300 truncate block mt-0.5"
                >
                  {s.url}
                </a>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setEditing(s)}
                  className="p-1.5 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono"
                >
                  EDIT
                </button>
                <button
                  onClick={() => s.id && handleDelete(s.id, s.platform)}
                  className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editing.id ? "Edit Link" : "Add Link"}
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
                  PLATFORM NAME
                </label>
                <input
                  type="text"
                  required
                  value={editing.platform || ""}
                  onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                  placeholder="e.g. GitHub, LinkedIn, X"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  DESTINATION URL
                </label>
                <input
                  type="url"
                  required
                  value={editing.url || ""}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  placeholder="https://..."
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
                  {saving ? "SAVING..." : "SAVE LINK"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
