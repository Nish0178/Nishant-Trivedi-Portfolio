"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "@/lib/portfolio-data";
import { sendContactMessage } from "@/lib/api/contact";
import { useCmsContent } from "@/app/context/CmsContentContext";
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Code, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  ArrowUp
} from "lucide-react";

export default function ContactSection() {
  const { content } = useCmsContent();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const contactEmail = content.settings?.email || content.profile?.email || PERSONAL_INFO.email;
  const contactLocation = content.settings?.location || content.profile?.location || PERSONAL_INFO.location;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please complete all required fields.");
      return;
    }

    const visitorName = formData.name.trim();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await sendContactMessage({
        name: visitorName,
        email: formData.email.trim(),
        subject: formData.subject.trim() || "General Inquiry via Portfolio",
        message: formData.message.trim(),
      });

      if (res.success) {
        setStatus("success");
        setSubmittedName(visitorName);
        setStatusMessage(res.message || "Message received successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(res.message || "Transmission encountered an issue. Please email directly.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please reach out via email directly.");
    }
  };

  return (
    <section
      id="contact"
      className="relative pt-20 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            07 — CONTACT
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* Section Header matching Reference Frames 31, 32, 938 */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.04]">
            Let&apos;s build{" "}
            <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-neutral-500 dark:text-neutral-400">
              something together.
            </span>
          </h2>
        </div>

        {/* 2-Column Grid: Contact Information & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Direct Info, Socials, Status Indicator matching Frame 942 */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* WRITE TO ME Kicker */}
              <p className="text-xs font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
                WRITE TO ME
              </p>

              {/* Clickable Big Email */}
              <div className="mb-6">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-80 transition-opacity break-all"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="block text-xs font-mono text-neutral-500 hover:text-neutral-950 dark:hover:text-white mt-1 cursor-pointer"
                >
                  {copied ? "✓ Copied to clipboard" : "Click to copy email"}
                </button>
              </div>

              {/* LOCATION & AVAILABILITY */}
              <div className="space-y-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{contactLocation}</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    Open for Software Engineering Roles & Collaboration
                  </span>
                </div>
              </div>

              {/* SOCIAL CHANNELS */}
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
                  CHANNELS
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/Nish0178"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-black/[0.06] dark:border-white/[0.06] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-black/[0.06] dark:border-white/[0.06] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://leetcode.com/u/Nishant_trivedi01111/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-black/[0.06] dark:border-white/[0.06] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">LeetCode</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://www.hackerrank.com/profile/trivedinishant81"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-black/[0.06] dark:border-white/[0.06] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">HackerRank</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form matching Reference Frames 31-33 */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-2xl bg-white/80 dark:bg-[#14151B]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Engineering Opportunity / Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your role, challenge, or project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all resize-none"
                />
              </div>

              {/* Status Message Display */}
              {status === "success" && (
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-900 dark:text-emerald-100 flex items-start gap-3.5 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                      Message received successfully!
                    </p>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      Thank you for reaching out, <span className="font-medium text-neutral-900 dark:text-white">{submittedName || "friend"}</span>.<br />
                      Nishant will get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && statusMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                <span className="text-sm">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[10px] font-mono font-bold">
              NT
            </div>
            <span>© 2026 Nishant Trivedi. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <a
              href="#top"
              className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
