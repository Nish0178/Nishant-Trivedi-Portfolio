"use client";

import React, { useState, useEffect } from "react";
import {
  SkillRecord,
  fetchAdminSkills,
  saveAdminSkill,
  deleteAdminSkill,
} from "@/lib/api/admin";

export default function SkillsTab() {
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingSkill, setEditingSkill] = useState<Partial<SkillRecord> | null>(null);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSkills();
      setSkills(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load skills." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill({
      category: "Core Languages",
      name: "",
      roleDesc: "",
      sortOrder: skills.length + 1,
      visible: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name?.trim()) {
      setFeedback({ type: "error", message: "Skill name is required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: SkillRecord = {
      id: editingSkill.id,
      category: editingSkill.category?.trim() || "Languages",
      name: editingSkill.name.trim(),
      roleDesc: editingSkill.roleDesc || "",
      sortOrder: editingSkill.sortOrder ?? 1,
      visible: editingSkill.visible ?? true,
    };

    const saved = await saveAdminSkill(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Skill "${payload.name}" saved to PostgreSQL.` });
      setEditingSkill(null);
      loadSkills();
    } else {
      setFeedback({ type: "error", message: "Failed to persist skill." });
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    const ok = await deleteAdminSkill(id);
    if (ok) {
      setFeedback({ type: "success", message: `Skill "${name}" deleted.` });
      loadSkills();
    } else {
      setFeedback({ type: "error", message: "Failed to delete skill." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            TECHNICAL REPERTOIRE
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Skills & Competencies
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage technologies, frameworks, libraries, and categorizations.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>+</span>
          <span>ADD SKILL</span>
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
          LOADING SKILLS FROM POSTGRESQL...
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No skills registered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-500/80 uppercase block">
                  {s.category}
                </span>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {s.name}
                </div>
                {s.roleDesc && (
                  <div className="text-xs text-zinc-400 mt-1">{s.roleDesc}</div>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setEditingSkill(s)}
                  className="p-1.5 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 hover:text-white text-xs font-mono"
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  onClick={() => s.id && handleDelete(s.id, s.name)}
                  className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editingSkill.id ? "Edit Skill" : "Add Skill"}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  CATEGORY
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.category || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  placeholder="e.g. Core Languages, AI & ML, Systems"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  SKILL NAME
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. Java, Next.js, Docker"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  LEVEL OR ROLE DESCRIPTION
                </label>
                <input
                  type="text"
                  value={editingSkill.roleDesc || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, roleDesc: e.target.value })}
                  placeholder="e.g. Enterprise Systems & Microservices"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    ORDER
                  </label>
                  <input
                    type="number"
                    value={editingSkill.sortOrder || 1}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, sortOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-20 px-2 py-1.5 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <input
                    id="skill-visible"
                    type="checkbox"
                    checked={editingSkill.visible ?? true}
                    onChange={(e) => setEditingSkill({ ...editingSkill, visible: e.target.checked })}
                    className="rounded bg-[#141824] border-white/20 text-amber-500"
                  />
                  <label htmlFor="skill-visible" className="text-xs font-mono text-zinc-300">
                    VISIBLE
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-amber-500 text-zinc-950 font-bold text-xs font-mono uppercase"
                >
                  {saving ? "SAVING..." : "SAVE SKILL"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
