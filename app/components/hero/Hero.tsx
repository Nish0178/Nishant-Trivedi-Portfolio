"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING } from "@/app/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll-based cinematic hero exit transition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroHeadlineY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const heroVideoScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroVideoY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* STEP 1: Ambient background aura appears quietly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: ambientOpacity }}
        transition={{ duration: 1.4, ease: EASING.cinematic }}
        className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-amber-500/12 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: ambientOpacity }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASING.cinematic }}
        className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Bold Editorial Typography & Narrative */}
        <motion.div
          style={{ y: heroHeadlineY, opacity: heroTextOpacity }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* STEP 2: Small "NISHANT." identity reveals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASING.cinematic }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-sm font-bold tracking-[0.24em] text-white uppercase">
              NISHANT<span className="text-amber-400">.</span>
            </span>
          </motion.div>

          {/* STEP 3 & 4: Main headline reveals line-by-line + Highlighted word */}
          <h1 className="serif-headline text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.92] text-white uppercase mb-8">
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASING.cinematic }}
              className="block text-white"
            >
              I BUILD
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASING.cinematic }}
              className="block text-white"
            >
              DIGITAL
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.58, ease: EASING.cinematic }}
              className="block text-gold-gradient serif-italic"
            >
              EXPERIENCES
            </motion.span>
          </h1>

          {/* STEP 6: Sub-roles Tag Strip & Supporting narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-8"
          >
            {["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"].map((role) => (
              <span
                key={role}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase text-slate-200 bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASING.cinematic }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mb-10"
          >
            I turn bold ideas into seamless digital experiences, where frontend meets powerful backend, and code transforms vision into impact.
          </motion.p>

          {/* STEP 7: Action CTAs appear last */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <Link
              href="#work"
              className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase font-bold"
            >
              <span>EXPLORE MY WORK</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="mailto:trivedinishant880@gmail.com?subject=Inquiry%20-%20Nishant%20Trivedi"
              className="btn-outline-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold"
            >
              <span>DOWNLOAD RESUME</span>
              <span className="text-base">↓</span>
            </a>
          </motion.div>

          {/* Bottom Quick Metric Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASING.cinematic }}
            className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/[0.08] max-w-lg"
          >
            <div>
              <div className="serif-metric text-2xl sm:text-3xl font-bold text-white">400+</div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mt-1">LeetCode Solved</div>
            </div>
            <div>
              <div className="serif-metric text-2xl sm:text-3xl font-bold text-amber-400">B.Tech</div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mt-1">AKTU CS &apos;28</div>
            </div>
            <div>
              <div className="serif-metric text-2xl sm:text-3xl font-bold text-white">Top 10</div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mt-1">Hackathon Runner-Up</div>
            </div>
          </motion.div>
        </motion.div>

        {/* STEP 5: Right Column: Visual Stage with Walking Video & Mask Reveal */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(10% 0% 0% 0%)", scale: 0.95 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          style={{ scale: heroVideoScale, y: heroVideoY }}
          transition={{ duration: 1.0, delay: 0.48, ease: EASING.cinematic }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Subtle Ambient Behind Media */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-amber-500/5 to-transparent rounded-3xl blur-3xl -z-10" />

          {/* Video Container in 9:16 Aspect Ratio - Video remains 100% untouched */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl overflow-hidden border border-amber-500/30 bg-[#0e111d] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.85),0_0_40px_-5px_rgba(245,158,11,0.25)]">
            
            {/* Top Corner Crosshair Indicators */}
            <div className="absolute top-3 left-3 z-20 text-[9px] tracking-[0.2em] text-amber-400 font-bold bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-amber-500/40 uppercase">
              SYS // ACTIVE_FRAME
            </div>
            <div className="absolute top-3 right-3 z-20 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

            {/* Native Video */}
            <div className="relative aspect-[9/16] w-full bg-black/50">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/nishant-portrait.webp"
                className="w-full h-full object-cover object-center"
              >
                <source src="/video/hero-walking.mp4" type="video/mp4" />
                <source src="/video/hero-walking.m4v" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Meta Bar inside video container */}
            <div className="p-4 bg-[#0a0d18]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Nishant Trivedi</div>
                <div className="text-[10px] tracking-wider text-slate-400">Software Engineer · Lucknow, IN</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">
                NT
              </div>
            </div>
          </div>

          {/* Floating Signature Badge on Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASING.cinematic }}
            className="absolute -bottom-6 -left-6 sm:-left-10 z-30 max-w-[240px] p-4 rounded-xl bg-[#0f1322]/98 backdrop-blur-xl border border-amber-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_-5px_rgba(245,158,11,0.3)]"
          >
            <p className="text-[11px] tracking-wider text-amber-300 font-semibold uppercase leading-tight mb-1.5 serif-italic">
              &ldquo;Code is my craft, impact is my goal.&rdquo;
            </p>
            <div className="font-signature text-2xl text-white font-bold tracking-wider">
              Nishant
            </div>
          </motion.div>

          {/* Golden Seal Emblem */}
          <div className="absolute -top-4 -right-4 sm:-right-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-[0_0_25px_rgba(245,158,11,0.5)]">
            <div className="w-full h-full rounded-full bg-[#07080c] flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-bold text-amber-400 tracking-wider">ESTD</span>
              <span className="text-[11px] font-bold text-white tracking-tight">2026</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
