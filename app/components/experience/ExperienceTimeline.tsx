"use client";

import React from "react";
import { motion } from "motion/react";
import { EXPERIENCES } from "@/lib/portfolio-data";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              04 / EXPERIENCE
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">EXPERIENCE &amp;</span>
            <span className="block text-gold-gradient">MILESTONES.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-mono mt-4 max-w-2xl">
            A chronological timeline of professional engineering internships, open-source initiatives, and academic training.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-2 sm:ml-6 space-y-10">
          
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#08090d] shadow-[0_0_10px_#f59e0b] group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/90 group-hover:border-amber-500/30 transition-all">
                
                {/* Header Row: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08]">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight uppercase group-hover:text-amber-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-mono text-amber-300 font-semibold mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="text-xs font-mono px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-slate-300 w-fit">
                    {exp.period}
                  </div>
                </div>

                {/* Bullet Contributions */}
                {exp.contributions && exp.contributions.length > 0 && (
                  <ul className="space-y-1.5 mb-5 text-xs text-slate-300 font-mono">
                    {exp.contributions.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-white/[0.03] border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}

          {/* Academic Milestone Entry */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-[#08090d] shadow-[0_0_10px_#60a5fa]" />

            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-white/[0.08] bg-[#0d101c]/90">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                    B.TECH IN COMPUTER SCIENCE &amp; ENGINEERING
                  </h3>
                  <div className="text-sm font-mono text-blue-300 font-semibold mt-0.5">
                    Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
                  </div>
                </div>

                <div className="text-xs font-mono px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-slate-300 w-fit">
                  July 2024 – September 2028
                </div>
              </div>

              <p className="text-sm text-slate-300/90 leading-relaxed">
                Core academic coursework focused on Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Distributed Computing.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
