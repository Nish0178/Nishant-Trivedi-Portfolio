"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden">
      {/* Ambient background aura glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Bold Typography & Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Top Identifier */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#f59e0b]" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400/90 uppercase">
              NISHANT TRIVEDI · SOFTWARE ENGINEER
            </span>
          </div>

          {/* Massive 3-Line Heading */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[0.92] text-white uppercase mb-8">
            <span className="block text-slate-100">I BUILD</span>
            <span className="block text-slate-100">DIGITAL</span>
            <span className="block text-gold-gradient">EXPERIENCES</span>
          </h1>

          {/* Sub-roles Tag Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            {["FULL STACK DEVELOPER", "AI / SYSTEMS BUILDER", "DATA SCIENCE & DSA"].map((role, idx) => (
              <span
                key={role}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-wider text-slate-300 bg-white/[0.04] border border-white/10 backdrop-blur-sm"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300/90 font-normal leading-relaxed max-w-xl mb-10">
            I turn bold ideas into seamless digital experiences, where intuitive frontend meets powerful backend architectures, and code transforms vision into impact.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href="#work"
              className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase font-bold"
            >
              <span>EXPLORE MY WORK</span>
              <span className="text-base">↗</span>
            </Link>

            <a
              href="mailto:trivedinishant880@gmail.com?subject=Engineering%20Opportunity%20-%20Nishant%20Trivedi"
              className="btn-outline-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase font-semibold"
            >
              <span>GET IN TOUCH</span>
              <span className="text-base">↓</span>
            </a>
          </div>

          {/* Bottom Quick Metric Pills */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/[0.08] max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-white">400+</div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">LeetCode Solved</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-amber-400">B.Tech</div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">AKTU CS &apos;28</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-white">Top 10</div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">QBX Runner-Up</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Stage with Walking Video & Signature Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Subtle Ambient Behind Media */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />

          {/* Video Container in 9:16 Aspect Ratio */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl overflow-hidden border border-amber-500/25 bg-[#0e111d] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(245,158,11,0.2)]">
            
            {/* Top Corner Crosshair Indicators */}
            <div className="absolute top-3 left-3 z-20 font-mono text-[9px] tracking-widest text-amber-400/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
              SYS // ACTIVE_FRAME
            </div>
            <div className="absolute top-3 right-3 z-20 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />

            {/* Native Video */}
            <div className="relative aspect-[9/16] w-full bg-black/40">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Meta Bar inside video container */}
            <div className="p-4 bg-[#0a0d18]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Nishant Trivedi</div>
                <div className="text-[10px] font-mono text-slate-400">Software Engineer · Lucknow, IN</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">
                NT
              </div>
            </div>
          </div>

          {/* Floating Signature Badge on Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 sm:-left-10 z-30 max-w-[240px] p-4 rounded-xl bg-[#0f1322]/95 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_-5px_rgba(245,158,11,0.2)]"
          >
            <p className="text-[11px] font-mono tracking-wider text-amber-300 font-semibold uppercase leading-tight mb-2">
              &ldquo;Code is my craft, impact is my goal.&rdquo;
            </p>
            <div className="font-signature text-2xl text-white font-bold tracking-wider">
              Nishant
            </div>
          </motion.div>

          {/* Golden Seal Emblem */}
          <div className="absolute -top-4 -right-4 sm:-right-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full rounded-full bg-[#090b12] flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-mono font-bold text-amber-400">ESTD</span>
              <span className="text-[11px] font-bold text-white tracking-tight">2026</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
