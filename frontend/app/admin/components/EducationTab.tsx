"use client";

import React, { useState, useEffect } from "react";
import {
  EducationRecord,
  fetchAdminEducations,
  saveAdminEducation,
  deleteAdminEducation,
} from "@/lib/api/admin";

export default function EducationTab() {
  const [educations, setEducations] = useState<EducationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editing, setEditing] = useState<Partial<EducationRecord> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminEducations();
      setEducations(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load education records." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditing({
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      location: "Lucknow, Uttar Pradesh, India",
      period: "2024 - 2028",
      details: "Focus on Data Structures, Algorithms, Systems Architecture & AI.",
      sortOrder: educations.length + 1,
      visible: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.degree?.trim() || !editing.institution?.trim()) {
      setFeedback({ type: "error", message: "Degree and Institution are required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload: EducationRecord = {
      id: editing.id,
      degree: editing.degree.trim(),
      institution: editing.institution.trim(),
      location: editing.location || "",
      period: editing.period || "",
      details: editing.details || "",
      sortOrder: editing.sortOrder ?? 1,
      visible: editing.visible ?? true,
    };

    const saved = await saveAdminEducation(payload);
    setSaving(false);
    if (saved) {
      setFeedback({ type: "success", message: `Education record saved to PostgreSQL.` });
      setEditing(null);
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to persist education record." });
    }
  };

  const handleDelete = async (id: number, inst: string) => {
    if (!window.confirm(`Delete education record for "${inst}"?`)) return;
    const ok = await deleteAdminEducation(id);
    if (ok) {
      setFeedback({ type: "success", message: `Record deleted.` });
      loadData();
    } else {
      setFeedback({ type: "error", message: "Failed to delete record." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            ACADEMIC FOUNDATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Education
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage academic degrees, universities, institutions, and specializations.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>+</span>
          <span>ADD DEGREE</span>
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
          LOADING EDUCATION FROM POSTGRESQL...
        </div>
      ) : educations.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No education entries registered.
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-amber-400">
                    [{edu.period}]
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {edu.degree}
                  </h3>
                </div>
                <div className="text-sm text-zinc-300 font-sans">
                  {edu.institution} {edu.location && `· ${edu.location}`}
                </div>
                {edu.details && (
                  <p className="text-xs text-zinc-400 font-sans mt-1">
                    {edu.details}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start shrink-0">
                <button
                  onClick={() => setEditing(edu)}
                  className="px-3 py-1.5 rounded bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  onClick={() => edu.id && handleDelete(edu.id, edu.institution)}
                  className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono cursor-pointer"
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
                {editing.id ? "Edit Education" : "Add Education"}
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
                  DEGREE / PROGRAM
                </label>
                <input
                  type="text"
                  required
                  value={editing.degree || ""}
                  onChange={(e) => setEditing({ ...editing, degree: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science & Engineering"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  INSTITUTION / UNIVERSITY
                </label>
                <input
                  type="text"
                  required
                  value={editing.institution || ""}
                  onChange={(e) => setEditing({ ...editing, institution: e.target.value })}
                  placeholder="e.g. Dr. A.P.J. Abdul Kalam Technical University (AKTU)"
                  className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    PERIOD
                  </label>
                  <input
                    type="text"
                    value={editing.period || ""}
                    onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                    placeholder="2024 - 2028"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={editing.location || ""}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    placeholder="Lucknow, India"
                    className="w-full px-3 py-2 rounded bg-[#141824] border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  SPECIALIZATION & DETAILS
                </label>
                <input
                  type="text"
                  value={editing.details || ""}
                  onChange={(e) => setEditing({ ...editing, details: e.target.value })}
                  placeholder="Focus on Data Structures, Algorithms, and Distributed Systems"
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
                  {saving ? "SAVING..." : "SAVE RECORD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
