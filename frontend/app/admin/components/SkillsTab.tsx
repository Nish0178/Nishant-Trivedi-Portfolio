"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  const [reordering, setReordering] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingSkill, setEditingSkill] = useState<Partial<SkillRecord> | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSkills();
      data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setSkills(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load skills from PostgreSQL." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => {
      if (s.category && s.category.trim()) set.add(s.category.trim());
    });
    return ["ALL", ...Array.from(set)];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "ALL") return skills;
    return skills.filter((s) => s.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase());
  }, [skills, activeCategory]);

  const handleOpenAdd = () => {
    setEditingSkill({
      category: activeCategory !== "ALL" ? activeCategory : "Core Languages",
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
      category: editingSkill.category?.trim() || "Core Languages",
      name: editingSkill.name.trim(),
      roleDesc: editingSkill.roleDesc?.trim() || "",
      sortOrder: editingSkill.sortOrder ?? 1,
      visible: editingSkill.visible ?? true,
    };

    const saved = await saveAdminSkill(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Skill "${payload.name}" persisted to PostgreSQL.` });
      setEditingSkill(null);
      loadSkills();
    } else {
      setFeedback({ type: "error", message: "Failed to persist skill to backend." });
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

  const handleMove = async (indexInFiltered: number, direction: "up" | "down") => {
    const targetFilteredIndex = direction === "up" ? indexInFiltered - 1 : indexInFiltered + 1;
    if (targetFilteredIndex < 0 || targetFilteredIndex >= filteredSkills.length) return;

    setReordering(true);
    const currentItem = filteredSkills[indexInFiltered];
    const targetItem = filteredSkills[targetFilteredIndex];

    const currentSort = currentItem.sortOrder ?? indexInFiltered + 1;
    const targetSort = targetItem.sortOrder ?? targetFilteredIndex + 1;

    try {
      await Promise.all([
        saveAdminSkill({ ...currentItem, sortOrder: targetSort }),
        saveAdminSkill({ ...targetItem, sortOrder: currentSort }),
      ]);
      await loadSkills();
      setFeedback({ type: "success", message: "Skill reordered successfully." });
    } catch {
      setFeedback({ type: "error", message: "Failed to update skill ordering." });
    } finally {
      setReordering(false);
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
            Skills & Competencies CMS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage technologies, frameworks, specialization descriptions, and categories.
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

      {/* Category Filter Bar */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0e111a] border border-white/10 w-fit">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
          LOADING SKILLS FROM POSTGRESQL...
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No skills found under category &quot;{activeCategory}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400">
                    #{skill.sortOrder ?? idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase">
                    {skill.category}
                  </span>
                  {!skill.visible && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                      HIDDEN
                    </span>
                  )}
                  <h4 className="text-sm font-semibold text-white truncate">
                    {skill.name}
                  </h4>
                </div>
                {skill.roleDesc && (
                  <p className="text-xs text-zinc-400 font-sans truncate">
                    {skill.roleDesc}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center border border-white/10 rounded overflow-hidden">
                  <button
                    disabled={idx === 0 || reordering}
                    onClick={() => handleMove(idx, "up")}
                    title="Move Up"
                    className="px-2 py-1 bg-[#141824] hover:bg-[#1c2233] text-zinc-300 disabled:opacity-30 text-xs font-mono cursor-pointer disabled:cursor-not-allowed"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === filteredSkills.length - 1 || reordering}
                    onClick={() => handleMove(idx, "down")}
                    title="Move Down"
                    className="px-2 py-1 bg-[#141824] hover:bg-[#1c2233] text-zinc-300 disabled:opacity-30 text-xs font-mono border-l border-white/10 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>
                </div>

                <button
                  onClick={() => setEditingSkill(skill)}
                  className="px-2.5 py-1 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  onClick={() => skill.id && handleDelete(skill.id, skill.name)}
                  className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editingSkill.id ? "Edit Technical Skill" : "Add Technical Skill"}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  CATEGORY <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.category || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  placeholder="e.g. Core Languages, Distributed Systems, Web & Frontend"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  SKILL NAME <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. Java, Next.js, Docker, PostgreSQL"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  SPECIALIZATION / ROLE DESCRIPTION
                </label>
                <input
                  type="text"
                  value={editingSkill.roleDesc || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, roleDesc: e.target.value })}
                  placeholder="e.g. Enterprise Systems & Relational Persistence"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    SORT ORDER
                  </label>
                  <input
                    type="number"
                    value={editingSkill.sortOrder ?? 1}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, sortOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-24 px-3 py-1.5 rounded bg-[#141824] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    id="skill-visible"
                    type="checkbox"
                    checked={editingSkill.visible ?? true}
                    onChange={(e) => setEditingSkill({ ...editingSkill, visible: e.target.checked })}
                    className="rounded bg-[#141824] border-white/20 text-amber-500"
                  />
                  <label htmlFor="skill-visible" className="text-xs font-mono text-zinc-300 cursor-pointer">
                    PUBLISHED / VISIBLE
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono uppercase cursor-pointer disabled:opacity-50"
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
