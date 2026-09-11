"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PERSONAL_INFO } from "@/lib/portfolio-data";
import { EASING, DURATION } from "@/app/lib/motion";
import { sendContactMessage } from "@/lib/api/contact";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please provide your name or organization (minimum 2 characters).";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please provide a valid return email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = "Please enter a subject (minimum 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message payload must be at least 10 characters in length.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClient()) return;

    setStatus("submitting");
    setFieldErrors({});

    const res = await sendContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });

    if (res.success) {
      setStatus("success");
      setStatusMessage(res.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setStatusMessage(res.message);
      if (res.errors) {
        setFieldErrors(res.errors);
      }
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || `Transmission from ${formData.name || "Engineering Partner"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nPayload:\n${formData.message}`
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
      className="relative py-16 sm:py-20 lg:py-22 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[var(--bg-page)] transition-colors duration-300"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-500 dark:text-amber-400 text-xs font-bold tracking-[0.24em] uppercase font-mono">
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
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-[var(--text-primary)]">INITIALIZE</span>
            <span className="block text-gold-gradient serif-italic">TRANSMISSION.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.slow, delay: 0.18, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 max-w-2xl leading-relaxed font-serif"
          >
            Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.
          </motion.p>
        </div>

        {/* Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 font-sans">
          
          {/* Left Column: Interactive Dispatch Terminal Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.slow, delay: 0.15, ease: EASING.cinematic }}
            className="lg:col-span-7 rounded-2xl aura-card p-6 sm:p-10 border border-amber-500/35 bg-[var(--bg-surface)] shadow-lg"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border-subtle)] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${status === "submitting" ? "bg-amber-400 animate-ping" : status === "success" ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"}`} />
                <span className="text-emerald-500 dark:text-emerald-400 font-bold tracking-wider uppercase">
                  {status === "submitting" ? "STATUS: TRANSMITTING..." : status === "success" ? "STATUS: DISPATCH_CONFIRMED" : "STATUS: READY_FOR_DISPATCH"}
                </span>
              </div>
              <span className="text-[var(--text-muted)] tracking-wider uppercase">CHANNEL: SPRING_BOOT // REST</span>
            </div>

            {status === "success" ? (
              <div className="py-8 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div className="serif-headline text-2xl font-bold text-[var(--text-primary)] uppercase">
                  TRANSMISSION RECEIVED
                </div>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  {statusMessage || "Your message has been securely recorded in the PostgreSQL database and queued for email delivery."}
                </p>
                <div className="text-[11px] text-emerald-400/90 font-mono">
                  PostgreSQL Persistence: Confirmed · Notification: Dispatched
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase mt-4 cursor-pointer"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleDispatch} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold tracking-[0.16em] text-[var(--text-secondary)] uppercase mb-2 font-mono">
                    01 // SENDER IDENTITY (NAME / COMPANY) <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={status === "submitting"}
                    placeholder="e.g. Alex Reed / Engineering Lead"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl dark:bg-black/50 dark:border-white/10 dark:text-white bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 ${
                      fieldErrors.name ? "border-rose-500/70" : ""
                    }`}
                  />
                  {fieldErrors.name && (
                    <span className="text-xs text-rose-500 font-mono mt-1 block">{fieldErrors.name}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold tracking-[0.16em] text-[var(--text-secondary)] uppercase mb-2 font-mono">
                    02 // RETURN DISPATCH EMAIL <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={status === "submitting"}
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl dark:bg-black/50 dark:border-white/10 dark:text-white bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 ${
                      fieldErrors.email ? "border-rose-500/70" : ""
                    }`}
                  />
                  {fieldErrors.email && (
                    <span className="text-xs text-rose-500 font-mono mt-1 block">{fieldErrors.email}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold tracking-[0.16em] text-[var(--text-secondary)] uppercase mb-2 font-mono">
                    03 // SUBJECT <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    disabled={status === "submitting"}
                    placeholder="e.g. Full-Stack Engineering Role / Systems Architecture"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: "" });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl dark:bg-black/50 dark:border-white/10 dark:text-white bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50 ${
                      fieldErrors.subject ? "border-rose-500/70" : ""
                    }`}
                  />
                  {fieldErrors.subject && (
                    <span className="text-xs text-rose-500 font-mono mt-1 block">{fieldErrors.subject}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold tracking-[0.16em] text-[var(--text-secondary)] uppercase mb-2 font-mono">
                    04 // TRANSMISSION PAYLOAD (PROJECT / INQUIRY) <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    disabled={status === "submitting"}
                    placeholder="Detail your engineering requirements, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl dark:bg-black/50 dark:border-white/10 dark:text-white bg-slate-50 border border-black/10 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none leading-relaxed disabled:opacity-50 ${
                      fieldErrors.message ? "border-rose-500/70" : ""
                    }`}
                  />
                  {fieldErrors.message && (
                    <span className="text-xs text-rose-500 font-mono mt-1 block">{fieldErrors.message}</span>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono space-y-2">
                    <div>{statusMessage || "Unable to dispatch message directly to server."}</div>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="btn-secondary px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>DISPATCH VIA DIRECT MAIL CLIENT</span>
                      <span>↗</span>
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gold w-full py-4 rounded-xl text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer font-mono disabled:opacity-60 transition-all"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>STATUS: TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>EXECUTE DISPATCH</span>
                      <span className="text-base">↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
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
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-[0.16em] font-bold mb-2 font-mono">
                DIRECT INBOX
              </div>
              <div className="text-base sm:text-lg text-[var(--text-primary)] font-bold tracking-tight mb-4 break-all">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex flex-wrap gap-3 font-mono">
                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer tracking-wider uppercase"
                >
                  <span>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="btn-outline-gold px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
                >
                  OPEN EMAIL CLIENT ↗
                </a>
              </div>
            </div>

            {/* Canonical Social Channels */}
            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-[0.16em] font-bold mb-4 font-mono">
                CANONICAL CHANNELS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg dark:bg-white/[0.03] dark:border-white/[0.06] dark:hover:bg-white/[0.06] bg-slate-50 border border-black/10 hover:border-amber-500/30 hover:bg-slate-100 transition-all flex items-center justify-between text-xs text-[var(--text-primary)] group font-mono"
                  >
                    <span className="font-semibold">{link.name}</span>
                    <span className="text-amber-500 dark:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2 font-mono shadow-sm">
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-[var(--text-primary)] font-semibold">Lucknow, India (UTC +05:30)</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY:</span>
                <span className="text-emerald-500 dark:text-emerald-400 font-bold tracking-wider">OPEN FOR ROLES &amp; PROJECTS</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
          className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="text-[var(--text-primary)] font-semibold tracking-wider">NISHANT TRIVEDI</span>
            <span>·</span>
            <span className="tracking-wider">SOFTWARE ENGINEER</span>
          </div>

          <div className="tracking-wider">
            © 2026 NISHANT TRIVEDI. ALL RIGHTS RESERVED.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
