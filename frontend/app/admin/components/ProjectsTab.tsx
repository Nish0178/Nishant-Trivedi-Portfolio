"use client";

import React, { useState, useEffect } from "react";
import {
  ProjectRecord,
  fetchAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
} from "@/lib/api/admin";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal / Editing state
  const [editingProject, setEditingProject] = useState<Partial<ProjectRecord> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProjects();
      setProjects(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load projects from backend." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingProject({
      id: "",
      title: "",
      name: "",
      description: "",
      category: "Full-Stack AI",
      tagline: "",
      githubUrl: "",
      liveUrl: "",
      language: "TypeScript",
      technologies: "Next.js, TypeScript, Tailwind CSS",
      stargazersCount: 0,
      forksCount: 0,
      featured: true,
      visible: true,
      sortOrder: projects.length + 1,
      curated: true,
    });
  };

  const handleOpenEdit = (p: ProjectRecord) => {
    setIsCreating(false);
    setEditingProject({ ...p });
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title?.trim() && !editingProject.name?.trim()) {
      setFeedback({ type: "error", message: "Project title is required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const projectPayload: ProjectRecord = {
      id: editingProject.id?.trim() || editingProject.title!.toLowerCase().replace(/\s+/g, "-"),
      title: editingProject.title || editingProject.name || "",
      name: editingProject.name || editingProject.title || "",
      description: editingProject.description || "",
      category: editingProject.category || "General",
      tagline: editingProject.tagline || "",
      githubUrl: editingProject.githubUrl || "",
      liveUrl: editingProject.liveUrl || "",
      language: editingProject.language || "TypeScript",
      technologies: editingProject.technologies || "",
      features: editingProject.features || "",
      stargazersCount: editingProject.stargazersCount || 0,
      forksCount: editingProject.forksCount || 0,
      featured: editingProject.featured ?? true,
      visible: editingProject.visible ?? true,
      sortOrder: editingProject.sortOrder ?? 1,
      curated: editingProject.curated ?? true,
    };

    let success = false;
    if (isCreating) {
      const created = await createAdminProject(projectPayload);
      success = !!created;
    } else {
      success = await updateAdminProject(projectPayload.id, projectPayload);
    }

    setSaving(false);
    if (success) {
      setFeedback({
        type: "success",
        message: `Project "${projectPayload.title}" saved successfully to PostgreSQL.`,
      });
      handleCloseModal();
      loadProjects();
    } else {
      setFeedback({ type: "error", message: "Failed to persist project. Please check backend logs." });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove project "${title}"?`)) return;

    const ok = await deleteAdminProject(id);
    if (ok) {
      setFeedback({ type: "success", message: `Project "${title}" removed.` });
      loadProjects();
    } else {
      setFeedback({ type: "error", message: "Failed to delete project." });
    }
  };

  const handleToggleVisible = async (p: ProjectRecord) => {
    const updated = { ...p, visible: !p.visible };
    const ok = await updateAdminProject(p.id, updated);
    if (ok) {
      setProjects((prev) => prev.map((item) => (item.id === p.id ? updated : item)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            PROJECT REPOSITORY & SHOWCASE
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Projects Management
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage flagship curated projects and synchronized GitHub repositories.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center space-x-1.5"
          >
            <span>+</span>
            <span>ADD PROJECT</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
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

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
          LOADING PROJECTS FROM POSTGRESQL...
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0e111a] border border-white/10 text-zinc-400 text-xs font-mono">
          No projects registered. Click &quot;ADD PROJECT&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-white truncate">
                    {p.title || p.name}
                  </h3>
                  {p.curated ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      CURATED FLAGSHIP
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                      GITHUB SYNC
                    </span>
                  )}
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      FEATURED
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-zinc-400">
                    Order: #{p.sortOrder}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 pt-1">
                  {p.category && <span className="text-amber-400/80">[{p.category}]</span>}
                  {p.technologies && <span>Tech: {p.technologies}</span>}
                  {p.stargazersCount > 0 && <span>★ {p.stargazersCount}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => handleToggleVisible(p)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase cursor-pointer transition-all ${
                    p.visible
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {p.visible ? "LIVE" : "HIDDEN"}
                </button>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white cursor-pointer transition-all"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.title || p.name)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 cursor-pointer transition-all"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-normal text-white">
                {isCreating ? "Add New Project" : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    PROJECT ID / SLUG <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!isCreating}
                    value={editingProject.id || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    placeholder="e.g. launchpilot-ai"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm font-mono focus:border-amber-500/70 focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    PROJECT TITLE <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. LaunchPilot AI"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  CATEGORY & TAGLINE
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Category, e.g. Full-Stack AI Platform"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editingProject.tagline || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    placeholder="Tagline, e.g. Autonomous AI co-pilot"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Detailed project description..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    GITHUB REPOSITORY URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    LIVE DEPLOYMENT URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  TECHNOLOGY STACK (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                  placeholder="Next.js, TypeScript, PostgreSQL, Spring Boot"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    SORT ORDER
                  </label>
                  <input
                    type="number"
                    value={editingProject.sortOrder || 1}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, sortOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-6 space-x-2">
                  <input
                    id="edit-curated"
                    type="checkbox"
                    checked={editingProject.curated ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, curated: e.target.checked })}
                    className="rounded border-white/20 bg-[#141824] text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="edit-curated" className="text-xs font-mono text-zinc-300">
                    CURATED
                  </label>
                </div>

                <div className="flex items-center pt-6 space-x-2">
                  <input
                    id="edit-featured"
                    type="checkbox"
                    checked={editingProject.featured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded border-white/20 bg-[#141824] text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="edit-featured" className="text-xs font-mono text-zinc-300">
                    FEATURED
                  </label>
                </div>

                <div className="flex items-center pt-6 space-x-2">
                  <input
                    id="edit-visible"
                    type="checkbox"
                    checked={editingProject.visible ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, visible: e.target.checked })}
                    className="rounded border-white/20 bg-[#141824] text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="edit-visible" className="text-xs font-mono text-zinc-300">
                    VISIBLE
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] text-zinc-400 text-xs font-mono uppercase cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {saving ? "SAVING..." : "SAVE PROJECT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
