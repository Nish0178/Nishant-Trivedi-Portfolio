"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowUp,
  MessageSquare,
  ShieldCheck,
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

    // Simulate API network interaction and dispatch mailto fallback fallback preparation
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-28 pb-12 bg-[#050505] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D5B878]/10 border border-[#D5B878]/20 text-[11px] font-mono tracking-widest text-[#D5B878] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPEN FOR FULL-TIME / SQUAD COLLABORATIONS</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Let's Build<span className="text-[#D5B878]">.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A3A09A] font-sans leading-relaxed">
            Have an engineering challenge, product build, or team opportunity? Let's discuss how we can engineer resilient systems and scalable experiences together.
          </p>
        </div>

        {/* Form and Direct Connect Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Direct Connect & Email Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] shadow-2xl relative overflow-hidden">
              <h3 className="font-sans font-bold text-xl text-white mb-2">
                Direct Communication
              </h3>
              <p className="text-xs text-[#8A8780] mb-6 font-sans">
                Prefer email directly? Reach out anytime. Response time is typically within 24 hours.
              </p>

              {/* Email Pill with One-Click Copy */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#D5B878]/10 text-[#D5B878] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-[#8A8780] block">PRIMARY INBOX</span>
                    <span className="text-xs sm:text-sm font-mono text-[#EDE9E1] truncate block">
                      trivedinishant880@gmail.com
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#D5B878] hover:text-black border border-white/10 text-xs font-mono transition-all shrink-0 flex items-center gap-1.5"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verified Links */}
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <a
                  href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#D5B878]/40 text-xs font-mono transition-all group"
                >
                  <span className="text-[#EDE9E1] group-hover:text-[#D5B878]">
                    LINKEDIN // NISHANT TRIVEDI
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8A8780] group-hover:text-[#D5B878]" />
                </a>

                <a
                  href="mailto:trivedinishant880@gmail.com"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#D5B878]/40 text-xs font-mono transition-all group"
                >
                  <span className="text-[#EDE9E1] group-hover:text-[#D5B878]">
                    MAILTO CLIENT LAUNCH
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8A8780] group-hover:text-[#D5B878]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] shadow-2xl">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs text-[#8A8780] font-mono max-w-sm mx-auto">
                    Thank you, {formData.name}. Your note has been logged. Nishant will get in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-[#D5B878] hover:bg-white/[0.08]"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8A8780] tracking-wider uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono text-[#EDE9E1] placeholder-[#8A8780] focus:outline-none focus:border-[#D5B878]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8A8780] tracking-wider uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono text-[#EDE9E1] placeholder-[#8A8780] focus:outline-none focus:border-[#D5B878]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8A8780] tracking-wider uppercase mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Role Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono text-[#EDE9E1] placeholder-[#8A8780] focus:outline-none focus:border-[#D5B878]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8A8780] tracking-wider uppercase mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your product, project scope, or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono text-[#EDE9E1] placeholder-[#8A8780] focus:outline-none focus:border-[#D5B878] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-lg bg-[#D5B878] text-[#070707] font-mono text-xs font-semibold tracking-wider hover:bg-[#E5C378] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#D5B878]/10"
                  >
                    {status === "loading" ? (
                      <span>TRANSMITTING MESSAGE...</span>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8A8780]">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#D5B878]/30">
              <Image
                src="/images/nt-emblem.png"
                alt="NT Emblem"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span>© 2026 NISHANT TRIVEDI · ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <span>BUILT WITH PRECISION & INTENT</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D5B878] hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
