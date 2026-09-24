"use client";

import React, { useState, useEffect } from "react";
import {
  ProfileRecord,
  fetchAdminProfile,
  updateAdminProfile,
} from "@/lib/api/admin";

function isValidUrl(str?: string): boolean {
  if (!str || str.trim() === "") return true;
  try {
    const url = new URL(str.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(email?: string): boolean {
  if (!email || email.trim() === "") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function CoreProfileTab() {
  const [profile, setProfile] = useState<ProfileRecord>({
    name: "",
    headline: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    instagram: "",
    leetcode: "",
    hackerrank: "",
    resumeUrl: "",
    updatedAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProfile();
      if (data) {
        setProfile({
          name: data.name || "",
          headline: data.headline || "",
          bio: data.bio || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram || "",
          leetcode: data.leetcode || "",
          hackerrank: data.hackerrank || "",
          resumeUrl: data.resumeUrl || "",
          updatedAt: data.updatedAt || "",
        });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to load profile data from backend." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!profile.name.trim()) errors.name = "Full name is required.";
    if (!profile.headline.trim()) errors.headline = "Headline is required.";
    if (!profile.email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(profile.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (profile.github && !isValidUrl(profile.github)) {
      errors.github = "GitHub URL must start with http:// or https://";
    }
    if (profile.linkedin && !isValidUrl(profile.linkedin)) {
      errors.linkedin = "LinkedIn URL must start with http:// or https://";
    }
    if (profile.instagram && !isValidUrl(profile.instagram)) {
      errors.instagram = "Instagram URL must start with http:// or https://";
    }
    if (profile.leetcode && !isValidUrl(profile.leetcode)) {
      errors.leetcode = "LeetCode URL must start with http:// or https://";
    }
    if (profile.hackerrank && !isValidUrl(profile.hackerrank)) {
      errors.hackerrank = "HackerRank URL must start with http:// or https://";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!validate()) {
      setFeedback({ type: "error", message: "Please resolve the highlighted validation errors." });
      return;
    }

    setSaving(true);
    try {
      const updated = await updateAdminProfile(profile);
      if (updated) {
        setProfile((prev) => ({
          ...prev,
          ...updated,
        }));
        setFeedback({ type: "success", message: "Profile updated and synchronized successfully across portfolio sections." });
      } else {
        setFeedback({ type: "error", message: "Failed to persist profile changes to PostgreSQL." });
      }
    } catch {
      setFeedback({ type: "error", message: "Network or server error while saving profile." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-amber-500 animate-pulse">
        FETCHING PROFILE TELEMETRY FROM POSTGRESQL...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
            CORE IDENTITY & BIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Profile CMS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Manage canonical personal facts, hero headline, biography, contact vectors, and verified social rails.
          </p>
        </div>
        {profile.updatedAt && (
          <div className="text-xs font-mono text-zinc-500 self-start sm:self-auto">
            Last updated: {new Date(profile.updatedAt).toLocaleString()}
          </div>
        )}
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Personal Details Card */}
        <div className="p-6 rounded-2xl bg-[#0e111a] border border-white/10 space-y-4">
          <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider">
            01 // Personal Facts & Headline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Full Name <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Nishant Trivedi"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.name ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Professional Headline <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                placeholder="Software Engineer · Full-Stack · Systems · AI Workflows"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.headline ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.headline && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.headline}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              Bio / Executive Narrative
            </label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Software engineer building products, systems, and AI-powered experiences across the full stack..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/60 leading-relaxed"
            />
          </div>
        </div>

        {/* Contact Vectors Card */}
        <div className="p-6 rounded-2xl bg-[#0e111a] border border-white/10 space-y-4">
          <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider">
            02 // Contact Vectors & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="trivedinishant880@gmail.com"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.email ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+91..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Geographic Location
              </label>
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Lucknow, Uttar Pradesh, India"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              Resume Document URL / Path
            </label>
            <input
              type="text"
              value={profile.resumeUrl || ""}
              onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
              placeholder="/resume/Nishant_Trivedi_Resume.pdf"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-amber-500/60"
            />
          </div>
        </div>

        {/* Canonical Developer Links Card */}
        <div className="p-6 rounded-2xl bg-[#0e111a] border border-white/10 space-y-4">
          <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider">
            03 // Verified Platforms & Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={profile.github || ""}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                placeholder="https://github.com/Nish0178"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.github ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.github && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.github}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={profile.linkedin || ""}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.linkedin ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.linkedin && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.linkedin}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                LeetCode Profile URL
              </label>
              <input
                type="url"
                value={profile.leetcode || ""}
                onChange={(e) => setProfile({ ...profile, leetcode: e.target.value })}
                placeholder="https://leetcode.com/u/Nishant_trivedi01111/"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.leetcode ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.leetcode && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.leetcode}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                HackerRank Profile URL
              </label>
              <input
                type="url"
                value={profile.hackerrank || ""}
                onChange={(e) => setProfile({ ...profile, hackerrank: e.target.value })}
                placeholder="https://www.hackerrank.com/profile/trivedinishant81"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.hackerrank ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.hackerrank && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.hackerrank}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={profile.instagram || ""}
                onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                placeholder="https://www.instagram.com/nishant_trivedi.2111/"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border text-white text-sm font-mono focus:outline-none focus:border-amber-500/60 ${
                  fieldErrors.instagram ? "border-red-500" : "border-white/10"
                }`}
              />
              {fieldErrors.instagram && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.instagram}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={loadProfile}
            disabled={saving}
            className="px-4 py-2.5 rounded-lg bg-[#141824] hover:bg-[#1a2030] text-zinc-300 text-xs font-mono transition-all cursor-pointer"
          >
            DISCARD CHANGES
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? "SAVING CHANGES..." : "SAVE PROFILE"}
          </button>
        </div>
      </form>
    </div>
  );
}
