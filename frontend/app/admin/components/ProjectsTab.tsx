"use client";

import React, { useState, useEffect } from "react";
import {
  ProjectRecord,
  fetchAdminProjects,
  saveAdminProjectDetailed,
  updateAdminProject,
  deleteAdminProject,
  syncGitHubProjects,
} from "@/lib/api/admin";

function isValidUrl(str: string): boolean {
  if (!str || str.trim() === "") return true;
  try {
    const url = new URL(str.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function formatDate(iso?: string): string {
  if (!iso) return "Not recorded";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal / Editing state
  const [editingProject, setEditingProject] = useState<Partial<ProjectRecord> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<ProjectRecord | null>(null);

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

  const handleSyncGitHub = async () => {
    setSyncing(true);
    setFeedback(null);
    try {
      const res = await syncGitHubProjects();
      if (res.success) {
        setFeedback({
          type: "success",
          message: res.message || "GitHub repositories synchronized successfully into PostgreSQL.",
        });
        loadProjects();
      } else {
        setFeedback({
          type: "error",
          message: res.message || "Failed to synchronize GitHub repositories.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Unexpected error occurred during GitHub sync.",
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setModalErrors([]);
    setEditingProject({
      id: "",
      title: "",
      name: "",
      description: "",
      category: "Full-Stack AI",
      tagline: "",
      githubUrl: "",
      liveUrl: "",
      imageUrl: "",
      language: "TypeScript",
      technologies: "Next.js, TypeScript, Tailwind CSS",
      features: "",
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
    setModalErrors([]);
    setEditingProject({ ...p });
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsCreating(false);
    setModalErrors([]);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    // Client-side validation
    const errors: string[] = [];
    const title = (editingProject.title || editingProject.name || "").trim();
    if (!title) {
      errors.push("Project name / title is required.");
    }

    if (editingProject.description && editingProject.description.length > 3000) {
      errors.push("Description is too long (maximum 3000 characters).");
    }

    if (editingProject.githubUrl && !isValidUrl(editingProject.githubUrl)) {
      errors.push("GitHub URL must start with http:// or https://");
    }

    if (editingProject.liveUrl && !isValidUrl(editingProject.liveUrl)) {
      errors.push("Live URL must start with http:// or https://");
    }

    if (editingProject.imageUrl && !isValidUrl(editingProject.imageUrl) && !editingProject.imageUrl.startsWith("/")) {
      errors.push("Image URL must be a valid URL or path starting with /");
    }

    if (editingProject.sortOrder !== undefined && editingProject.sortOrder < 0) {
      errors.push("Display order must be 0 or greater.");
    }

    if (errors.length > 0) {
      setModalErrors(errors);
      return;
    }

    setSaving(true);
    setModalErrors([]);
    setFeedback(null);

    const slug =
      editingProject.id?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const projectPayload: ProjectRecord = {
      id: slug,
      title: title,
      name: editingProject.name?.trim() || title,
      description: editingProject.description?.trim() || "",
      category: editingProject.category?.trim() || "ENGINEERING PROJECT",
      tagline: editingProject.tagline?.trim() || "",
      githubUrl: editingProject.githubUrl?.trim() || "",
      liveUrl: editingProject.liveUrl?.trim() || "",
      imageUrl: editingProject.imageUrl?.trim() || "",
      language: editingProject.language?.trim() || "TypeScript",
      technologies: editingProject.technologies?.trim() || "",
      features: editingProject.features?.trim() || "",
      stargazersCount: editingProject.stargazersCount || 0,
      forksCount: editingProject.forksCount || 0,
      featured: editingProject.featured ?? false,
      visible: editingProject.visible ?? true,
      sortOrder: Number(editingProject.sortOrder) || 0,
      curated: editingProject.curated ?? true,
    };

    const result = await saveAdminProjectDetailed(projectPayload, isCreating);
    setSaving(false);

    if (result.success && result.project) {
      setFeedback({
        type: "success",
        message: `Project "${result.project.title}" saved successfully to PostgreSQL.`,
      });
      handleCloseModal();
      loadProjects();
    } else {
      const errMsg = result.error || "Failed to persist project to database.";
      setModalErrors([errMsg]);
    }
  };

  const handlePromptDelete = (p: ProjectRecord) => {
    setDeleteTarget(p);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const targetTitle = deleteTarget.title || deleteTarget.name;
    const ok = await deleteAdminProject(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);

    if (ok) {
      setFeedback({
        type: "success",
        message: `Project "${targetTitle}" was deleted from PostgreSQL.`,
      });
      loadProjects();
    } else {
      setFeedback({
        type: "error",
        message: `Failed to delete project "${targetTitle}". Please check server logs.`,
      });
    }
  };

  const handleToggleVisible = async (p: ProjectRecord) => {
    const updated = { ...p, visible: !p.visible };
    const ok = await updateAdminProject(p.id, updated);
    if (ok) {
      setProjects((prev) => prev.map((item) => (item.id === p.id ? updated : item)));
      setFeedback({
        type: "success",
        message: `Project "${p.title}" is now ${updated.visible ? "PUBLISHED (LIVE)" : "HIDDEN"}.`,
      });
    } else {
      setFeedback({
        type: "error",
        message: `Failed to toggle publication state for "${p.title}".`,
      });
    }
  };

  const handleToggleFeatured = async (p: ProjectRecord) => {
    const updated = { ...p, featured: !p.featured };
    const ok = await updateAdminProject(p.id, updated);
    if (ok) {
      setProjects((prev) => prev.map((item) => (item.id === p.id ? updated : item)));
      setFeedback({
        type: "success",
        message: `Project "${p.title}" is now ${updated.featured ? "FEATURED" : "STANDARD"}.`,
      });
    } else {
      setFeedback({
        type: "error",
        message: `Failed to toggle featured status for "${p.title}".`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            PROJECTS
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Project Repository & Showcase
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage portfolio projects and GitHub synchronization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncGitHub}
            disabled={syncing || loading}
            className="px-4 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
          >
            <span className={syncing ? "animate-spin inline-block" : ""}>↻</span>
            <span>{syncing ? "SYNCING..." : "SYNC GITHUB"}</span>
          </button>
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
          className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
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
          No projects registered in database. Click &quot;ADD PROJECT&quot; to create one, or &quot;SYNC GITHUB&quot; to import repositories.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Left Column: Project Details */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-white truncate">
                    {p.title || p.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    ({p.id})
                  </span>
                  {p.curated ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                      CURATED FLAGSHIP
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
                      GITHUB SYNC
                    </span>
                  )}
                  {p.featured ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 border border-amber-400/50 text-amber-300 font-bold">
                      ★ FEATURED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 border border-zinc-700 text-zinc-400">
                      STANDARD
                    </span>
                  )}
                  {p.visible ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                      ● PUBLISHED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                      ○ HIDDEN
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">
                    Order: #{p.sortOrder}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2">
                  {p.description || "No description provided."}
                </p>

                {/* Tech & Links Metadata Row */}
                <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400 flex-wrap pt-1">
                  {p.category && (
                    <span className="text-amber-400/90 font-medium">
                      [{p.category}]
                    </span>
                  )}
                  {p.language && (
                    <span className="text-zinc-300">
                      Lang: {p.language}
                    </span>
                  )}
                  {p.technologies && (
                    <span className="text-zinc-400 truncate max-w-md">
                      Tech: {p.technologies}
                    </span>
                  )}
                  {p.stargazersCount > 0 && (
                    <span className="text-amber-400">
                      ★ {p.stargazersCount}
                    </span>
                  )}
                  {p.forksCount > 0 && (
                    <span className="text-zinc-400">
                      ⑂ {p.forksCount}
                    </span>
                  )}
                </div>

                {/* External Links & Updated Date */}
                <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400 pt-1">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400/90 hover:text-amber-300 underline flex items-center gap-1"
                    >
                      <span>GitHub ↗</span>
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                    >
                      <span>Live Demo ↗</span>
                    </a>
                  )}
                  <span className="text-zinc-400 ml-auto">
                    Updated: {formatDate(p.updatedAt)}
                  </span>
                </div>
              </div>

              {/* Right Column: Controls & Actions */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0 flex-wrap">
                <button
                  onClick={() => handleToggleVisible(p)}
                  title="Toggle publication on public website"
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase cursor-pointer transition-all ${
                    p.visible
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {p.visible ? "LIVE" : "HIDDEN"}
                </button>
                <button
                  onClick={() => handleToggleFeatured(p)}
                  title="Toggle featured status on public card stack"
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase cursor-pointer transition-all ${
                    p.featured
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {p.featured ? "FEATURED" : "STANDARD"}
                </button>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1c2233] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white cursor-pointer transition-all font-semibold"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handlePromptDelete(p)}
                  className="px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 cursor-pointer transition-all font-semibold"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111a] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                <span>⚠️</span> Confirm Deletion
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono text-zinc-300">
              <p>
                Are you sure you want to permanently delete:
              </p>
              <div className="p-3 rounded-lg bg-[#141824] border border-white/10 text-white font-bold">
                {deleteTarget.title || deleteTarget.name} ({deleteTarget.id})
              </div>

              {deleteTarget.visible && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
                  <strong>Notice:</strong> This project is currently <strong>PUBLISHED (LIVE)</strong>. Deleting it will remove it immediately from your public portfolio.
                </div>
              )}

              {deleteTarget.featured && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <strong>Notice:</strong> This project is marked as <strong>FEATURED</strong>.
                </div>
              )}

              <p className="text-zinc-400">
                This action will delete the record from PostgreSQL. It cannot be undone automatically.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-[#141824] hover:bg-[#1c2233] text-zinc-300 text-xs font-mono uppercase cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold uppercase cursor-pointer transition-all disabled:opacity-50"
              >
                {deleting ? "DELETING..." : "CONFIRM DELETE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Modal (Section 15: Project Editor) */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e111a] border border-white/10 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-normal text-white">
                  {isCreating ? "Add New Project" : `Edit Project: ${editingProject.title || editingProject.name}`}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Changes persist directly to PostgreSQL database.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Validation Errors */}
            {modalErrors.length > 0 && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <span>✕</span> Please correct the following errors:
                </div>
                <ul className="list-disc pl-5 space-y-0.5">
                  {modalErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-6">
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  1. Basic Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      PROJECT NAME / TITLE <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                          name: editingProject.name || e.target.value,
                        })
                      }
                      placeholder="e.g. LaunchPilot AI"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      PROJECT SLUG / ID <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={!isCreating}
                      value={editingProject.id || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                      placeholder="e.g. launchpilot-ai (auto-generated if blank)"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm font-mono focus:border-amber-500/70 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      CATEGORY
                    </label>
                    <input
                      type="text"
                      value={editingProject.category || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      placeholder="e.g. Full-Stack AI Platform"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      TAGLINE
                    </label>
                    <input
                      type="text"
                      value={editingProject.tagline || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      placeholder="e.g. Deterministic startup validation engine"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase">
                      DESCRIPTION
                    </label>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {(editingProject.description || "").length}/3000 chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={3000}
                    value={editingProject.description || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    placeholder="Detailed architecture and accomplishments description..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION 2: LINKS */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  2. Links
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      LIVE / DEMO DEPLOYMENT URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: TECHNOLOGY */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  3. Technology
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      PRIMARY LANGUAGE
                    </label>
                    <input
                      type="text"
                      value={editingProject.language || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, language: e.target.value })}
                      placeholder="e.g. TypeScript, Java, Rust"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      TECHNOLOGY STACK (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.technologies || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                      placeholder="e.g. Next.js 15, TypeScript, Prisma, Gemini 2.5 Flash, Tailwind CSS"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: CONTENT */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  4. Content & Key Features
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    KEY HIGHLIGHTS & ARCHITECTURE BULLETS (One feature per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.features || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value })}
                    placeholder="Top 10 Runner-Up at QBX Arena Hackathon 2026&#10;Deterministic prompt chaining with strict schema parsing&#10;Sub-millisecond query latency through compound indexing"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>

              {/* SECTION 5: MEDIA */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  5. Media & Thumbnail
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    THUMBNAIL / IMAGE URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.imageUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    placeholder="https://... or /images/..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono"
                  />
                  {editingProject.imageUrl && (
                    <div className="mt-2 p-2 rounded-lg bg-[#141824] border border-white/10 inline-block">
                      <span className="text-[10px] font-mono text-zinc-400 block mb-1">
                        Preview:
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingProject.imageUrl}
                        alt="Project thumbnail preview"
                        className="h-16 w-28 object-cover rounded border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 6: PUBLISHING & ORDER */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold border-b border-white/10 pb-1">
                  6. Publishing & Visibility
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      DISPLAY ORDER (Priority)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editingProject.sortOrder ?? 0}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, sortOrder: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:border-amber-500/70 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center pt-5 space-x-2">
                    <input
                      id="edit-visible"
                      type="checkbox"
                      checked={editingProject.visible ?? true}
                      onChange={(e) => setEditingProject({ ...editingProject, visible: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-[#141824] text-emerald-500 focus:ring-emerald-500"
                    />
                    <label htmlFor="edit-visible" className="text-xs font-mono text-zinc-200 cursor-pointer">
                      PUBLISHED (LIVE)
                    </label>
                  </div>

                  <div className="flex items-center pt-5 space-x-2">
                    <input
                      id="edit-featured"
                      type="checkbox"
                      checked={editingProject.featured ?? false}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-[#141824] text-amber-500 focus:ring-amber-500"
                    />
                    <label htmlFor="edit-featured" className="text-xs font-mono text-zinc-200 cursor-pointer">
                      FEATURED CARD
                    </label>
                  </div>

                  <div className="flex items-center pt-5 space-x-2">
                    <input
                      id="edit-curated"
                      type="checkbox"
                      checked={editingProject.curated ?? true}
                      onChange={(e) => setEditingProject({ ...editingProject, curated: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-[#141824] text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor="edit-curated" className="text-xs font-mono text-zinc-200 cursor-pointer">
                      CURATED
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
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
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="animate-spin inline-block">↻</span>
                      <span>SAVING...</span>
                    </>
                  ) : (
                    <span>SAVE PROJECT</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
