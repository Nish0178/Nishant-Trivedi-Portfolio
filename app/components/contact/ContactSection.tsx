"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowUp,
  Sparkles,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("trivedinishant880@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-24 sm:pt-32 pb-8 bg-[#050505]">
      {/* Gradient Divider */}
      <div className="gradient-divider mb-24 sm:mb-32" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero CTA */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[10px] font-mono tracking-widest text-[#c9a84c] mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
          >
            <span className="text-gradient-gold">Let&apos;s Build</span>
            <span className="text-[#c9a84c]">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#6b6862] leading-relaxed"
          >
            Have an engineering challenge, product build, or team opportunity? Let&apos;s discuss how we can build resilient systems together.
          </motion.p>
        </div>

        {/* Form & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left: Direct Connect */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] shadow-2xl">
              <h3 className="font-display font-bold text-lg text-white mb-2">Direct Connect</h3>
              <p className="text-[11px] text-[#6b6862] mb-6">Reach out anytime. Response within 24 hours.</p>

              {/* Email Pill */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[9px] font-mono text-[#6b6862] block">PRIMARY</span>
                    <span className="text-[11px] font-mono text-[#f0ece4] truncate block">trivedinishant880@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#c9a84c] hover:text-[#050505] border border-white/10 text-[10px] font-mono transition-all shrink-0 flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#c9a84c]/30 text-[11px] font-mono transition-all group"
                >
                  <span className="text-[#a8a49c] group-hover:text-[#c9a84c]">LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6b6862] group-hover:text-[#c9a84c]" />
                </a>
                <a
                  href="mailto:trivedinishant880@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#c9a84c]/30 text-[11px] font-mono transition-all group"
                >
                  <span className="text-[#a8a49c] group-hover:text-[#c9a84c]">Email Client</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6b6862] group-hover:text-[#c9a84c]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] shadow-2xl">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Message Sent</h3>
                  <p className="text-[11px] text-[#6b6862] font-mono max-w-sm mx-auto">
                    Thank you, {formData.name}. Nishant will get in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-[#c9a84c] hover:bg-white/[0.08] transition-colors"
                  >
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono text-[#6b6862] tracking-[0.2em] uppercase mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/[0.08] text-[11px] font-mono text-[#f0ece4] placeholder-[#6b6862] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-[#6b6862] tracking-[0.2em] uppercase mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/[0.08] text-[11px] font-mono text-[#f0ece4] placeholder-[#6b6862] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-[#6b6862] tracking-[0.2em] uppercase mb-1.5">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Role Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/[0.08] text-[11px] font-mono text-[#f0ece4] placeholder-[#6b6862] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-[#6b6862] tracking-[0.2em] uppercase mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050505] border border-white/[0.08] text-[11px] font-mono text-[#f0ece4] placeholder-[#6b6862] focus:outline-none focus:border-[#c9a84c]/50 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-full bg-[#c9a84c] text-[#050505] font-mono text-xs font-semibold tracking-wider hover:bg-[#dfc06a] transition-all flex items-center justify-center gap-2 disabled:opacity-50 glow-gold"
                  >
                    {status === "loading" ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono text-[#6b6862]">
          <div className="flex items-center gap-3">
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#c9a84c]/20">
              <Image
                src="/images/nt-logo-raw.png"
                alt="NT"
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            <span>© 2026 NISHANT TRIVEDI</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#6b6862]">BUILT WITH PRECISION</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#c9a84c] hover:text-white transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
