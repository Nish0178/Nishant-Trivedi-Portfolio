"use client";

import React, { useState, useEffect } from "react";
import {
  ExperienceRecord,
  fetchAdminExperiences,
  saveAdminExperience,
  deleteAdminExperience,
} from "@/lib/api/admin";

function validateDateRange(start?: string, end?: string, current?: boolean): string | null {
  if (current) return null;
  if (!start || !start.trim() || !end || !end.trim()) return null;

  const sTrim = start.trim();
  const eTrim = end.trim();

  // If ISO YYYY-MM or YYYY-MM-DD
  if (/^\d{4}(-\d{2})?(-\d{2})?$/.test(sTrim) && /^\d{4}(-\d{2})?(-\d{2})?$/.test(eTrim)) {
    if (sTrim > eTrim) {
      return "Start date cannot be after end date.";
    }
  }

  // Extract years
  const yearRegex = /\b(19\d\d|20\d\d)\b/g;
  const startYears = sTrim.match(yearRegex);
  const endYears = eTrim.match(yearRegex);

  if (startYears && endYears) {
    const sYear = parseInt(startYears[0]);
    const eYear = parseInt(endYears[0]);
    if (sYear > eYear) {
      return `Start year (${sYear}) cannot be after end year (${eYear}).`;
    }
    if (sYear === eYear) {
      const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      const sLower = sTrim.toLowerCase();
      const eLower = eTrim.toLowerCase();
      let sMonth = -1;
      let eMonth = -1;
      months.forEach((m, idx) => {
        if (sLower.includes(m)) sMonth = idx;
        if (eLower.includes(m)) eMonth = idx;
      });
      if (sMonth !== -1 && eMonth !== -1 && sMonth > eMonth) {
        return "Start month cannot be after end month in the same year.";
      }
    }
  }

  return null;
}

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingExp, setEditingExp] = useState<Partial<ExperienceRecord> | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminExperiences();
      // Ensure sorted by sortOrder asc
      data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
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
    setDateError(null);
    setEditingExp({
      period: "2024 – Present",
      company: "",
      role: "Software Engineering Intern",
      location: "Remote / Lucknow, IN",
      type: "Internship",
      contributions: "",
      technologies: "Java, Spring Boot, React, PostgreSQL",
      startDate: "2024",
      endDate: "",
      current: true,
      sortOrder: experiences.length + 1,
      visible: true,
    });
  };

  const handleDateChange = (field: "startDate" | "endDate" | "current", value: unknown) => {
    if (!editingExp) return;
    const updated = { ...editingExp, [field]: value };
    const err = validateDateRange(
      field === "startDate" ? (value as string) : updated.startDate,
      field === "endDate" ? (value as string) : updated.endDate,
      field === "current" ? (value as boolean) : updated.current
    );
    setDateError(err);

    // Auto-compute period string if not explicitly custom
    const start = (field === "startDate" ? (value as string) : updated.startDate) || "";
    const isCurr = field === "current" ? (value as boolean) : updated.current;
    const end = (field === "endDate" ? (value as string) : updated.endDate) || "";

    let newPeriod = updated.period;
    if (start.trim()) {
      if (isCurr) {
        newPeriod = `${start.trim()} – Present`;
      } else if (end.trim()) {
        newPeriod = `${start.trim()} – ${end.trim()}`;
      } else {
        newPeriod = start.trim();
      }
    }
    updated.period = newPeriod;
    setEditingExp(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.company?.trim() || !editingExp.role?.trim()) {
      setFeedback({ type: "error", message: "Company and Role are required." });
      return;
    }

    const err = validateDateRange(editingExp.startDate, editingExp.endDate, editingExp.current);
    if (err) {
      setDateError(err);
      setFeedback({ type: "error", message: err });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: ExperienceRecord = {
      id: editingExp.id,
      period: editingExp.period?.trim() || "Present",
      company: editingExp.company.trim(),
      role: editingExp.role.trim(),
      location: editingExp.location || "",
      type: editingExp.type || "",
      contributions: editingExp.contributions || "",
      technologies: editingExp.technologies || "",
      startDate: editingExp.startDate?.trim() || "",
      endDate: editingExp.endDate?.trim() || "",
      current: Boolean(editingExp.current),
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
      setFeedback({ type: "error", message: "Failed to persist experience to backend." });
    }
  };

  const handleDelete = async (id: number, company: string) => {
    if (!window.confirm(`Delete experience record for "${company}"?`)) return;
    const ok = await deleteAdminExperience(id);
    if (ok) {
      setFeedback({ type: "success", message: `Experience record deleted.` });
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to delete experience." });
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    setReordering(true);
    const currentItem = experiences[index];
    const targetItem = experiences[targetIndex];

    const currentSort = currentItem.sortOrder ?? index + 1;
    const targetSort = targetItem.sortOrder ?? targetIndex + 1;

    // Swap sort orders
    const updatedCurrent: ExperienceRecord = { ...currentItem, sortOrder: targetSort };
    const updatedTarget: ExperienceRecord = { ...targetItem, sortOrder: currentSort };

    try {
      await Promise.all([
        saveAdminExperience(updatedCurrent),
        saveAdminExperience(updatedTarget),
      ]);
      await loadData();
      setFeedback({ type: "success", message: "Experience order updated." });
    } catch {
      setFeedback({ type: "error", message: "Failed to update experience ordering." });
    } finally {
      setReordering(false);
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
            Experience CMS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage professional roles, timeline ranges, engineering contributions, and public ordering.
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
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400">
                    #{exp.sortOrder ?? idx + 1}
                  </span>
                  <span className="text-xs font-mono text-amber-300 font-semibold">
                    [{exp.period}]
                  </span>
                  {exp.current && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      CURRENT
                    </span>
                  )}
                  {!exp.visible && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                      HIDDEN
                    </span>
                  )}
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
                  <div className="text-xs text-zinc-300 font-sans whitespace-pre-line leading-relaxed pl-2 border-l border-white/10">
                    {exp.contributions}
                  </div>
                )}

                {exp.technologies && (
                  <div className="text-[11px] font-mono text-zinc-400 pt-1">
                    <span className="text-zinc-500">Tech:</span> {exp.technologies}
                  </div>
                )}
              </div>

              {/* Action and Reorder Buttons */}
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
                    disabled={idx === experiences.length - 1 || reordering}
                    onClick={() => handleMove(idx, "down")}
                    title="Move Down"
                    className="px-2 py-1.5 bg-[#141824] hover:bg-[#1c2233] text-zinc-300 disabled:opacity-30 text-xs font-mono border-l border-white/10 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>
                </div>

                <button
                  onClick={() => {
                    setDateError(null);
                    setEditingExp(exp);
                  }}
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
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-normal text-white">
                {editingExp.id ? "Edit Experience Role" : "Add Experience Role"}
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
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
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
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Date Controls */}
              <div className="p-4 rounded-xl bg-[#141824] border border-white/5 space-y-3">
                <div className="text-xs font-mono text-amber-400 uppercase">
                  TIMELINE & DATE VALIDATION
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      START DATE
                    </label>
                    <input
                      type="text"
                      value={editingExp.startDate || ""}
                      onChange={(e) => handleDateChange("startDate", e.target.value)}
                      placeholder="e.g. July 2026 or 2026-07"
                      className="w-full px-3 py-1.5 rounded bg-[#0e111a] border border-white/10 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      END DATE
                    </label>
                    <input
                      type="text"
                      disabled={editingExp.current}
                      value={editingExp.current ? "Present" : editingExp.endDate || ""}
                      onChange={(e) => handleDateChange("endDate", e.target.value)}
                      placeholder="e.g. August 2026 or 2026-08"
                      className="w-full px-3 py-1.5 rounded bg-[#0e111a] border border-white/10 text-white text-xs font-mono focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingExp.current ?? false}
                      onChange={(e) => handleDateChange("current", e.target.checked)}
                      className="rounded bg-[#0e111a] border-white/20 text-amber-500"
                    />
                    <span className="text-xs font-mono text-zinc-300">
                      Currently Working Here (Present)
                    </span>
                  </label>
                </div>

                {dateError && (
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    ⚠ {dateError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    DISPLAY PERIOD
                  </label>
                  <input
                    type="text"
                    value={editingExp.period || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    placeholder="e.g. July 2026 – Present"
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
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none leading-relaxed"
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

              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    SORT ORDER
                  </label>
                  <input
                    type="number"
                    value={editingExp.sortOrder ?? 1}
                    onChange={(e) => setEditingExp({ ...editingExp, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-24 px-3 py-1.5 rounded bg-[#141824] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    id="exp-visible"
                    type="checkbox"
                    checked={editingExp.visible ?? true}
                    onChange={(e) => setEditingExp({ ...editingExp, visible: e.target.checked })}
                    className="rounded bg-[#141824] border-white/20 text-amber-500"
                  />
                  <label htmlFor="exp-visible" className="text-xs font-mono text-zinc-300 cursor-pointer">
                    PUBLISHED / VISIBLE
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded bg-[#141824] text-zinc-400 text-xs font-mono cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving || Boolean(dateError)}
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono uppercase cursor-pointer disabled:opacity-50"
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
