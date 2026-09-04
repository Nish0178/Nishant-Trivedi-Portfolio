"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

export default function AboutStory() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Background
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              About<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-sm">
            Bridging foundational CS principles with modern full-stack web and AI product engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              Engineering with curiosity, discipline, and architectural clarity.
            </h3>

            <p className="text-sm text-[#a8a49c] leading-relaxed">
              I am a Computer Science and Engineering undergraduate at Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow. My journey is centered around understanding how systems work under the hood — from object-oriented Java architecture and database indices to reactive web frontends and multimodal AI workflows.
            </p>

            <p className="text-sm text-[#a8a49c] leading-relaxed">
              Whether optimizing API latency at Astrospacious, experimenting with Gemini reasoning pipelines for LaunchPilot AI, or mentoring 50+ students as Campus Lead for Open Source Connect Global, I prioritize clean contracts, measurable outcomes, and continuous engineering rigor.
            </p>

            {/* Interest Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {[
                { title: "Java Systems & OOP", tag: "Backend Core" },
                { title: "Full-Stack MERN", tag: "Web Platforms" },
                { title: "Generative AI", tag: "Gemini & LLMs" },
                { title: "Open Source", tag: "Collaborative Git" },
                { title: "Cloud & DevOps", tag: "Deployment Flow" },
                { title: "Data Analytics", tag: "Metrics & BI" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#c9a84c]/20 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#f0ece4] font-display">{item.title}</p>
                  <span className="text-[9px] font-mono text-[#c9a84c] block mt-1">{item.tag}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Academic Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.07] p-6 sm:p-8 shadow-2xl">
              {/* Identity Header */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/[0.06]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#c9a84c]/30 shrink-0">
                  <Image
                    src="/images/nt-logo-raw.png"
                    alt="Nishant Trivedi"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-display">Nishant Trivedi</h4>
                  <p className="text-[11px] font-mono text-[#c9a84c]">B.Tech Computer Science & Engineering</p>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white text-xs block">
                      Dr. A.P.J. Abdul Kalam Technical University (AKTU)
                    </span>
                    <span className="text-[#6b6862] text-[10px] font-mono block">
                      Lucknow, India · July 2024 – September 2028
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.05]">
                  <span className="text-[9px] font-mono text-[#6b6862] tracking-[0.2em] uppercase block mb-2">
                    Core Coursework
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                    {[
                      "Data Structures & Algorithms",
                      "Database Management",
                      "Operating Systems",
                      "OOP (Java)",
                      "Computer Networks",
                    ].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[#a8a49c]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
