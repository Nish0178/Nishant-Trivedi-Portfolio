"use client";

import React from "react";
import { motion } from "motion/react";
import { ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/portfolio-data";

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              RECOGNITION &amp; CREDENTIALS
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">PROVEN IMPACT.</span>
            <span className="block text-gold-gradient">VERIFIED ACHIEVEMENTS.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-mono mt-4 max-w-2xl">
            Hackathon honors, technical certifications, and verified credentials across full-stack engineering and cloud AI.
          </p>
        </div>

        {/* Hackathon & Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl aura-card p-6 sm:p-8 border border-amber-500/25 bg-[#0d101c]/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    {item.year || "2026"} // {item.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight uppercase mb-2">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-amber-300 font-semibold mb-3">
                  {item.issuerOrVenue}
                </div>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Certifications Matrix */}
        <div className="rounded-2xl aura-card p-6 sm:p-10 border border-white/10 bg-[#0c0f1b]/90">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase">
              VERIFIED TECHNICAL CERTIFICATIONS
            </h3>
            <span className="text-xs font-mono text-slate-400">{CERTIFICATIONS.length} CREDENTIALS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    {cert.issuer}
                  </div>
                  <div className="text-xs font-bold text-white tracking-tight mb-2">
                    {cert.name}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5 flex justify-between items-center">
                  <span>{cert.domain}</span>
                  <span className="text-emerald-400">{cert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
