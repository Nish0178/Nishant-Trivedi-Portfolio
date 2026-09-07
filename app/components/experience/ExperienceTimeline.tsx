"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EXPERIENCES } from "@/lib/portfolio-data";
import { EASING, DURATION, STAGGER } from "@/app/lib/motion";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Section headline scroll coupling
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(sectionScroll, [0, 1], [25, 0]);
  const headlineScale = useTransform(sectionScroll, [0, 1], [0.97, 1]);

  // Progressive timeline line scroll reveal
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  const timelineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[var(--bg-page)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-amber-500/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll-Coupled Typography */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-500 dark:text-amber-400 text-xs font-bold tracking-[0.24em] uppercase font-mono">
              04 / EXPERIENCE
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
            <span className="block text-[var(--text-primary)]">EXPERIENCE &amp;</span>
            <span className="block text-gold-gradient serif-italic">MILESTONES.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 max-w-2xl leading-relaxed"
          >
            A chronological timeline of professional engineering internships, open-source initiatives, and academic training.
          </motion.p>
        </div>

        {/* Timeline Stack with Progressive Line Reveal */}
        <div
          ref={timelineRef}
          className="relative pl-6 sm:pl-10 ml-2 sm:ml-6 space-y-12 font-sans"
        >
          {/* Base Background Track Line */}
          <div className="absolute left-0 top-3 bottom-6 w-[1px] bg-[var(--border-subtle)]" />

          {/* Progressive Glowing Gold Progress Line */}
          <motion.div
            style={{ height: timelineHeight }}
            className="absolute left-0 top-3 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_12px_#f59e0b]"
          />
          
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DURATION.normal, delay: idx * STAGGER.fast, ease: EASING.cinematic }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-[var(--bg-page)] shadow-[0_0_12px_#f59e0b] group-hover:scale-125 transition-transform duration-300" />

              {/* Experience Card */}
              <div className="rounded-2xl aura-card p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] group-hover:border-amber-500/40 transition-all duration-500">
                
                {/* Header Row: Role & Period Stagger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="serif-headline text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight uppercase group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors group-hover:translate-x-0.5">
                      {exp.role}
                    </h3>
                    <div className="text-sm text-amber-600 dark:text-amber-300 font-semibold mt-0.5 serif-italic">
                      {exp.company}
                    </div>
                  </div>

                  <div className="text-xs px-3 py-1 rounded dark:bg-white/[0.05] dark:border-white/10 dark:text-slate-200 bg-slate-100 border border-black/10 text-slate-700 w-fit tracking-wider font-semibold font-mono">
                    {exp.period}
                  </div>
                </div>

                {/* Bullet Contributions */}
                {exp.contributions && exp.contributions.length > 0 && (
                  <ul className="space-y-1.5 mb-5 text-xs text-[var(--text-secondary)]">
                    {exp.contributions.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-amber-500 dark:text-amber-400 mt-0.5">▸</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border-subtle)]">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[11px] font-medium dark:text-slate-300 dark:bg-white/[0.04] dark:border-white/[0.08] text-slate-700 bg-slate-100 border border-black/10 font-mono"
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
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="relative group"
          >
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[var(--bg-page)] shadow-[0_0_12px_#60a5fa] group-hover:scale-125 transition-transform duration-300" />

            <div className="rounded-2xl aura-card p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] group-hover:border-blue-500/40 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="serif-headline text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight uppercase group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                    B.TECH IN COMPUTER SCIENCE &amp; ENGINEERING
                  </h3>
                  <div className="text-sm text-blue-600 dark:text-blue-300 font-semibold mt-0.5 serif-italic">
                    Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
                  </div>
                </div>

                <div className="text-xs px-3 py-1 rounded dark:bg-white/[0.05] dark:border-white/10 dark:text-slate-200 bg-slate-100 border border-black/10 text-slate-700 w-fit tracking-wider font-semibold font-mono">
                  July 2024 – September 2028
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Core academic coursework focused on Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Distributed Computing.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
