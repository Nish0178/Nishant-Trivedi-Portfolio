"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/portfolio-data";
import { EASING, DURATION, STAGGER } from "@/app/lib/motion";

export default function Achievements() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Large typography scroll coupling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[var(--bg-page)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll Coupling */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-500 dark:text-amber-400 text-xs font-bold tracking-[0.24em] uppercase font-mono">
              RECOGNITION &amp; CREDENTIALS
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

          <motion.h2
            style={{ y: headlineY, scale: headlineScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-[var(--text-primary)]">PROVEN IMPACT.</span>
            <span className="block text-gold-gradient serif-italic">VERIFIED ACHIEVEMENTS.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 max-w-2xl leading-relaxed"
          >
            Hackathon honors, technical certifications, and verified credentials across full-stack engineering and cloud AI.
          </motion.p>
        </div>

        {/* Hackathon & Honors Grid: Staggered Editorial Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 font-sans">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DURATION.cinematic, delay: idx * STAGGER.editorial, ease: EASING.cinematic }}
              className="rounded-2xl aura-card p-6 sm:p-8 border border-amber-500/25 bg-[var(--bg-surface)] flex flex-col justify-between group hover:border-amber-400/50 transition-all duration-500 shadow-md"
            >
              <div>
                {/* 1. Top metadata */}
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[var(--border-subtle)]">
                  <span className="text-xs text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.16em] font-mono">
                    {item.year || "2026"} // {item.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 tracking-wider font-mono">
                    VERIFIED
                  </span>
                </div>

                {/* 2. Title */}
                <h3 className="serif-headline text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight uppercase mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                {/* 3. Organization */}
                <div className="text-xs text-amber-600 dark:text-amber-300 font-semibold mb-3 serif-italic">
                  {item.issuerOrVenue}
                </div>

                {/* 4. Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Certifications Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
          className="rounded-2xl aura-card p-6 sm:p-10 border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md font-sans"
        >
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border-subtle)]">
            <h3 className="serif-headline text-2xl font-bold text-[var(--text-primary)] tracking-tight uppercase">
              VERIFIED TECHNICAL CERTIFICATIONS
            </h3>
            <span className="text-xs text-[var(--text-muted)] tracking-wider uppercase font-semibold font-mono">
              {CERTIFICATIONS.length} CREDENTIALS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, cIdx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.normal, delay: cIdx * STAGGER.fast, ease: EASING.cinematic }}
                className="p-4 rounded-xl dark:bg-white/[0.03] dark:border-white/[0.06] bg-slate-50 border border-black/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.16em] mb-1 font-mono">
                    {cert.issuer}
                  </div>
                  <div className="text-xs font-bold text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                    {cert.name}
                  </div>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)] flex justify-between items-center font-mono">
                  <span>{cert.domain}</span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{cert.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
