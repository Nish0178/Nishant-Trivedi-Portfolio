"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* Dynamic Background Technical Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Ambient background aura glow */}
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
        
        {/* Left Column: Bold Editorial Typography, CTAs, Signature & Metrics */}
        <motion.div
          style={{ y: heroHeadlineY, opacity: heroTextOpacity }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Top Identifier */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASING.cinematic }}
            className="flex items-center gap-1.5 mb-6 font-sans"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-white uppercase">
              NISHANT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </motion.div>

          {/* Main Headline (3 Lines) */}
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
              className="block text-[#f59e0b]"
            >
              EXPERIENCES
            </motion.span>
          </h1>

          {/* Sub-roles Tag Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8 font-sans"
          >
            {["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"].map((role) => (
              <span
                key={role}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-slate-300 bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-sm uppercase"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASING.cinematic }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mb-10"
          >
            I turn bold ideas into seamless digital experiences, where frontend meets powerful backend, and code transforms vision into impact.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-4 mb-12 font-sans"
          >
            <Link
              href="#work"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              <span>EXPLORE MY WORK</span>
              <span className="text-sm">↗</span>
            </Link>

            <a
              href="mailto:trivedinishant880@gmail.com?subject=Inquiry%20-%20Nishant%20Trivedi"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-black/50 border border-white/20 hover:border-amber-400 hover:text-amber-300 hover:-translate-y-0.5 transition-all"
            >
              <span>DOWNLOAD RESUME</span>
              <span className="text-sm">↓</span>
            </a>
          </motion.div>

          {/* Bottom Quick Metric Strip & Authentic Handwritten Signature Block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASING.cinematic }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t border-white/[0.08]"
          >
            {/* 3 Metric Columns with Dividers */}
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="pr-5 sm:pr-7 border-r border-white/10">
                <div className="serif-metric text-3xl sm:text-4xl font-bold text-white">400+</div>
                <div className="text-[10px] font-sans font-bold tracking-[0.16em] text-slate-400 uppercase mt-1">
                  LEETCODE SOLVED
                </div>
              </div>
              <div className="px-3 sm:px-5 border-r border-white/10">
                <div className="serif-metric text-3xl sm:text-4xl font-bold text-amber-400">B.Tech</div>
                <div className="text-[10px] font-sans font-bold tracking-[0.16em] text-slate-400 uppercase mt-1">
                  AKTU CS &apos;28
                </div>
              </div>
              <div className="pl-3 sm:pl-5">
                <div className="serif-metric text-3xl sm:text-4xl font-bold text-white">Top 10</div>
                <div className="text-[10px] font-sans font-bold tracking-[0.16em] text-slate-400 uppercase mt-1">
                  HACKATHON RUNNER-UP
                </div>
              </div>
            </div>

            {/* Authentic Signature & Tagline */}
            <div className="relative flex flex-col items-center sm:items-end select-none group">
              <Image
                src="/images/nishant-signature.webp"
                alt="Nishant Trivedi Signature - Code x Create x Impact"
                width={250}
                height={145}
                className="w-[190px] sm:w-[220px] md:w-[240px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Stage with Walking Video, ESTD Seal, & Quote Box */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(10% 0% 0% 0%)", scale: 0.95 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          style={{ scale: heroVideoScale, y: heroVideoY }}
          transition={{ duration: 1.0, delay: 0.48, ease: EASING.cinematic }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end relative"
        >
          {/* Subtle Ambient Glow Behind Media */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-amber-500/5 to-transparent rounded-3xl blur-3xl -z-10" />

          {/* Video Container in 9:16 Aspect Ratio */}
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] rounded-2xl overflow-hidden border border-amber-500/40 bg-[#0e111d] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.9),0_0_40px_-5px_rgba(245,158,11,0.25)]">
            
            {/* Top Corner Crosshair Indicators */}
            <div className="absolute top-3.5 left-3.5 z-20 font-mono text-[10px] tracking-[0.2em] text-amber-400 font-bold bg-black/80 px-2.5 py-1 rounded backdrop-blur-md border border-amber-500/50 uppercase">
              SYS // ACTIVE_FRAME
            </div>

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
            <div className="p-4 bg-[#0a0d18]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between font-sans">
              <div>
                <div className="text-sm font-bold text-white tracking-wide">Nishant Trivedi</div>
                <div className="text-[11px] text-slate-400">Full Stack Developer · Lucknow, IN</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400 font-mono">
                NT
              </div>
            </div>

            {/* Floating Golden Seal Emblem overlapping top-right */}
            <div className="absolute top-2 right-2 sm:-top-1 sm:-right-1 z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-[1.5px] shadow-[0_0_25px_rgba(245,158,11,0.6)]">
              <div className="w-full h-full rounded-full bg-[#07080c] flex flex-col items-center justify-center text-center">
                <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider">ESTD</span>
                <span className="text-[11px] font-mono font-bold text-white tracking-tight">2026</span>
              </div>
            </div>
          </div>

          {/* Horizontal Quote Card Directly Below Video */}
          <div className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] rounded-2xl border border-amber-500/40 bg-[#0b0e18]/90 p-5 mt-4 flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_-5px_rgba(245,158,11,0.2)]">
            <div className="font-mono text-xs sm:text-sm font-bold tracking-wider text-amber-400 uppercase leading-relaxed">
              <div>&ldquo;CODE IS MY CRAFT,</div>
              <div>IMPACT IS MY GOAL.&rdquo;</div>
            </div>
            <div className="w-10 sm:w-14 h-0.5 bg-amber-400 rounded-full ml-4" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
