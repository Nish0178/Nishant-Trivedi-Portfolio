"use client";

import React, { useState, useEffect } from "react";
import {
  ExperienceRecord,
  fetchAdminExperiences,
  saveAdminExperience,
  deleteAdminExperience,
} from "@/lib/api/admin";

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingExp, setEditingExp] = useState<Partial<ExperienceRecord> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminExperiences();
      setExperiences(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load experiences." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp({
      period: "2024 - PRESENT",
      company: "",
      role: "Software Engineering Intern",
      location: "Remote / Lucknow, IN",
      type: "Full-Time",
      contributions: "",
      technologies: "Java, Spring Boot, React",
      sortOrder: experiences.length + 1,
      visible: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.company?.trim() || !editingExp.role?.trim()) {
      setFeedback({ type: "error", message: "Company and Role are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: ExperienceRecord = {
      id: editingExp.id,
      period: editingExp.period || "",
      company: editingExp.company.trim(),
      role: editingExp.role.trim(),
      location: editingExp.location || "",
      type: editingExp.type || "",
      contributions: editingExp.contributions || "",
      technologies: editingExp.technologies || "",
      sortOrder: editingExp.sortOrder ?? 1,
      visible: editingExp.visible ?? true,
    };

    const saved = await saveAdminExperience(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Experience at "${payload.company}" saved to PostgreSQL.` });
      setEditingExp(null);
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to persist experience." });
    }
  };

  const handleDelete = async (id: number, company: string) => {
    if (!window.confirm(`Delete experience record for "${company}"?`)) return;
    const ok = await deleteAdminExperience(id);
    if (ok) {
      setFeedback({ type: "success", message: `Record deleted.` });
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to delete experience." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            CAREER TRAJECTORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Experience & Roles
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage professional roles, contributions, and organizational impact.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>+</span>
          <span>ADD EXPERIENCE</span>
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
          LOADING EXPERIENCES FROM POSTGRESQL...
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No experience records found.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-amber-400">
                    [{exp.period}]
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-zinc-400 font-sans">
                    @ {exp.company}
                  </span>
                  {exp.location && (
                    <span className="text-xs font-mono text-zinc-500">
                      · {exp.location}
                    </span>
                  )}
                </div>

                {exp.contributions && (
                  <div className="text-xs text-zinc-300 font-sans whitespace-pre-line mt-2 leading-relaxed">
                    {exp.contributions}
                  </div>
                )}

                {exp.technologies && (
                  <div className="text-[11px] font-mono text-zinc-400 pt-1">
                    Tech: {exp.technologies}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-start shrink-0">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="px-3 py-1.5 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  onClick={() => exp.id && handleDelete(exp.id, exp.company)}
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
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editingExp.id ? "Edit Experience" : "Add Experience"}
              </h3>
              <button
                onClick={() => setEditingExp(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    COMPANY / ORG <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="e.g. Acme Systems"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    ROLE TITLE <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="e.g. Full-Stack Developer"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    PERIOD
                  </label>
                  <input
                    type="text"
                    value={editingExp.period || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    placeholder="e.g. 2024 - PRESENT"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    LOCATION & TYPE
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    placeholder="e.g. Remote / Lucknow, IN"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  KEY CONTRIBUTIONS (New line separated)
                </label>
                <textarea
                  rows={4}
                  value={editingExp.contributions || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, contributions: e.target.value })}
                  placeholder="Architected backend microservices using Spring Boot...&#10;Integrated real-time websocket data..."
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  TECHNOLOGY STACK
                </label>
                <input
                  type="text"
                  value={editingExp.technologies || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value })}
                  placeholder="Java, Spring Boot, React, Next.js, PostgreSQL"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded bg-amber-500 text-zinc-950 font-bold text-xs font-mono uppercase"
                >
                  {saving ? "SAVING..." : "SAVE EXPERIENCE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
