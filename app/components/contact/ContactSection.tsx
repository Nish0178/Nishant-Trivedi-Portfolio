"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "@/lib/portfolio-data";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Transmission from ${formData.name || "Engineering Partner"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nPayload:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const socialLinks = [
    { name: "GitHub", url: PERSONAL_INFO.socials.github },
    { name: "LinkedIn", url: PERSONAL_INFO.socials.linkedin },
    { name: "LeetCode", url: PERSONAL_INFO.socials.leetcode },
    { name: "Instagram", url: PERSONAL_INFO.socials.instagram },
    { name: "HackerRank", url: PERSONAL_INFO.socials.hackerrank },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              05 / CONTACT
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">INITIALIZE</span>
            <span className="block text-gold-gradient">TRANSMISSION.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-mono mt-4 max-w-2xl">
            Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.
          </p>
        </div>

        {/* Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Interactive Dispatch Terminal Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-2xl aura-card p-6 sm:p-10 border border-amber-500/30 bg-[#0d101c]/95"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08] font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-emerald-400 font-bold">STATUS: READY_FOR_DISPATCH</span>
              </div>
              <span className="text-slate-400">CHANNEL: ENCRYPTED // TLS</span>
            </div>

            <form onSubmit={handleDispatch} className="space-y-6 font-mono">
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                  01 // SENDER IDENTITY (NAME / COMPANY)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Reed / Engineering Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                  02 // RETURN DISPATCH EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                  03 // TRANSMISSION PAYLOAD (PROJECT / INQUIRY)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your engineering requirements, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <span>EXECUTE DISPATCH</span>
                <span className="text-base">↗</span>
              </button>
            </form>
          </motion.div>

          {/* Right Column: Direct Channels & Verified Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Card with Copy Feature */}
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/90">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                DIRECT INBOX
              </div>
              <div className="font-mono text-base sm:text-lg text-white font-bold tracking-tight mb-4 break-all">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5"
                >
                  <span>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-white border border-white/10 transition-colors"
                >
                  OPEN EMAIL CLIENT ↗
                </a>
              </div>
            </div>

            {/* Canonical Social Channels */}
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/90">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                CANONICAL CHANNELS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 hover:bg-white/[0.06] transition-all flex items-center justify-between font-mono text-xs text-slate-200"
                  >
                    <span>{link.name}</span>
                    <span className="text-amber-400">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.06] font-mono text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-white">Lucknow, India (UTC +05:30)</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY:</span>
                <span className="text-emerald-400 font-bold">OPEN FOR ROLES &amp; PROJECTS</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="text-white font-semibold">NISHANT TRIVEDI</span>
            <span>·</span>
            <span>SOFTWARE ENGINEER</span>
          </div>

          <div>
            © {new Date().getFullYear()} NISHANT TRIVEDI. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </section>
  );
}
