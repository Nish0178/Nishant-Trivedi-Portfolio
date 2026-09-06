"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PERSONAL_INFO } from "@/lib/portfolio-data";
import { EASING, DURATION } from "@/app/lib/motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Large typography scroll coupling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

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
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#07080c]"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: Slower, cinematic pacing like film ending */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
              05 / CONTACT
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

          <motion.h2
            style={{ y: headlineY, scale: headlineScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.slow, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-white">INITIALIZE</span>
            <span className="block text-gold-gradient serif-italic">TRANSMISSION.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.slow, delay: 0.18, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed"
          >
            Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.
          </motion.p>
        </div>

        {/* Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Interactive Dispatch Terminal Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.slow, delay: 0.15, ease: EASING.cinematic }}
            className="lg:col-span-7 rounded-2xl aura-card p-6 sm:p-10 border border-amber-500/35 bg-[#0d101c]/98 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                <span className="text-emerald-400 font-bold tracking-wider uppercase">STATUS: READY_FOR_DISPATCH</span>
              </div>
              <span className="text-slate-400 tracking-wider uppercase">CHANNEL: ENCRYPTED // TLS</span>
            </div>

            <form onSubmit={handleDispatch} className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-[0.16em] text-slate-300 uppercase mb-2">
                  01 // SENDER IDENTITY (NAME / COMPANY)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Reed / Engineering Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.16em] text-slate-300 uppercase mb-2">
                  02 // RETURN DISPATCH EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.16em] text-slate-300 uppercase mb-2">
                  03 // TRANSMISSION PAYLOAD (PROJECT / INQUIRY)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your engineering requirements, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXECUTE DISPATCH</span>
                <span className="text-base">↗</span>
              </button>
            </form>
          </motion.div>

          {/* Right Column: Direct Channels & Verified Details */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.slow, delay: 0.3, ease: EASING.cinematic }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Card with Copy Feature */}
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/95">
              <div className="text-xs text-slate-400 uppercase tracking-[0.16em] font-bold mb-2">
                DIRECT INBOX
              </div>
              <div className="text-base sm:text-lg text-white font-bold tracking-tight mb-4 break-all">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer tracking-wider uppercase"
                >
                  <span>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-white border border-white/10 transition-colors tracking-wider uppercase"
                >
                  OPEN EMAIL CLIENT ↗
                </a>
              </div>
            </div>

            {/* Canonical Social Channels */}
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/95">
              <div className="text-xs text-slate-400 uppercase tracking-[0.16em] font-bold mb-4">
                CANONICAL CHANNELS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 hover:bg-white/[0.06] transition-all flex items-center justify-between text-xs text-slate-200 group"
                  >
                    <span className="font-semibold">{link.name}</span>
                    <span className="text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="p-6 rounded-2xl bg-[#090b14] border border-white/[0.06] text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-white font-semibold">Lucknow, India (UTC +05:30)</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY:</span>
                <span className="text-emerald-400 font-bold tracking-wider">OPEN FOR ROLES &amp; PROJECTS</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* 22. Footer: Very subtle reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
          className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="text-white font-semibold tracking-wider">NISHANT TRIVEDI</span>
            <span>·</span>
            <span className="tracking-wider">SOFTWARE ENGINEER</span>
          </div>

          <div className="tracking-wider">
            © {new Date().getFullYear()} NISHANT TRIVEDI. ALL RIGHTS RESERVED.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
