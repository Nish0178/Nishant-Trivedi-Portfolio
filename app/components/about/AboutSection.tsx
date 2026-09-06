"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING, DURATION, STAGGER } from "@/app/lib/motion";

const STATS = [
  {
    number: "400+",
    label: "DSA SOLVED",
    subtext: "Java & LeetCode Verified",
    highlight: true,
  },
  {
    number: "B.Tech",
    label: "AKTU CS '28",
    subtext: "CSE · Lucknow, IN",
    highlight: false,
  },
  {
    number: "10+",
    label: "PROJECTS & REPOS",
    subtext: "Full-Stack & AI Tools",
    highlight: false,
  },
  {
    number: "TOP 10",
    label: "HACKATHON RUNNER-UP",
    subtext: "QBX Arena 2026",
    highlight: true,
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Large typography scroll-linked effect (scale 0.96 -> 1, subtle y movement)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#07080c]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-amber-500/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll-Linked Headline */}
        <div className="mb-14">
          {/* 1. Section label reveals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
              01 / ABOUT ME
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

          {/* 2. Giant headline reveals from below with scroll coupling */}
          <motion.h2
            style={{ scale: headlineScale, y: headlineY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-white">I DON&apos;T JUST WRITE CODE.</span>
            <span className="block text-gold-gradient serif-italic">I BUILD WHAT&apos;S NEXT.</span>
          </motion.h2>
        </div>

        {/* Narrative & Portrait Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* 3. Left Bio Column: Paragraph blocks appear with stagger (0.08s - 0.15s) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.normal, ease: EASING.cinematic }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.08, ease: EASING.cinematic }}
              className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal"
            >
              I&apos;m <strong className="text-amber-400 font-semibold serif-italic">Nishant Trivedi</strong>, a Full Stack Developer and Computer Science undergraduate specializing in building scalable web architectures, AI-integrated platforms, and refined digital experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.18, ease: EASING.cinematic }}
              className="text-base text-slate-300 leading-relaxed"
            >
              With a strong algorithmic foundation (<span className="text-white font-semibold">400+ problems solved in Java</span>) and a focus on clean engineering, I transform complex requirements into high-performance, resilient products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.28, ease: EASING.cinematic }}
              className="text-base text-slate-300 leading-relaxed"
            >
              Currently pursuing a B.Tech in Computer Science &amp; Engineering at <strong className="text-slate-100">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</strong>, Lucknow (2024–2028).
            </motion.p>

            {/* 5. Supporting focus cards appear sequentially */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, delay: 0.35, ease: EASING.cinematic }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
            >
              <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08] hover:border-amber-500/40 transition-colors group">
                <div className="text-amber-400 text-xs font-bold tracking-[0.16em] mb-1 uppercase">
                  01 // RESILIENCE
                </div>
                <div className="text-xs text-slate-300 leading-normal">
                  Clean backend pipelines, strict TypeScript Zod schemas, and relational integrity.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08] hover:border-amber-500/40 transition-colors group">
                <div className="text-amber-400 text-xs font-bold tracking-[0.16em] mb-1 uppercase">
                  02 // APPLIED AI
                </div>
                <div className="text-xs text-slate-300 leading-normal">
                  Multimodal Gemini 2.5 Flash orchestration, structured JSON outputs, and fast inference.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08] hover:border-amber-500/40 transition-colors group">
                <div className="text-amber-400 text-xs font-bold tracking-[0.16em] mb-1 uppercase">
                  03 // ALGORITHMS
                </div>
                <div className="text-xs text-slate-300 leading-normal">
                  Rigorous data structures, time complexity optimization, and LeetCode consistency.
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 4. Right Portrait Column: Reveals through an elegant clip-path mask */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(12% 0% 0% 0%)", scale: 0.96 }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASING.cinematic }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] rounded-2xl overflow-hidden border border-amber-500/40 bg-[#0e1220] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.75),0_0_35px_rgba(245,158,11,0.2)]"
            >
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/60">
                <Image
                  src="/images/nishant-portrait.webp"
                  alt="Nishant Trivedi Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-102"
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-50" />
              </div>

              {/* Bottom Quote & Signature Overlay */}
              <div className="pt-3 px-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Nishant Trivedi</div>
                  <div className="text-[10px] text-amber-400 tracking-wider uppercase font-semibold">
                    AKTU CSE &apos;24–&apos;28
                  </div>
                </div>
                <div className="font-signature text-2xl text-amber-300 font-bold">
                  Nishant
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* 4 Bottom Stat Metric Cards Staggered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: DURATION.normal, delay: idx * STAGGER.normal, ease: EASING.cinematic }}
              className={`p-6 rounded-2xl aura-card relative overflow-hidden group ${
                stat.highlight ? "border-amber-500/40 bg-[#121627]/90" : ""
              }`}
            >
              {stat.highlight && (
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
              )}
              <div className="serif-metric text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 group-hover:text-amber-400 transition-colors">
                {stat.number}
              </div>
              <div className="text-xs font-bold tracking-[0.16em] text-amber-400 uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
