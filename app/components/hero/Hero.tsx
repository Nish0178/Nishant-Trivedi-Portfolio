"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, ArrowDown, Award, Code2, GitPullRequest, ExternalLink, Terminal, ShieldCheck } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });

  const moveX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const moveY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] pt-24 pb-12 lg:pt-28 lg:pb-12 flex flex-col justify-between overflow-hidden bg-[#070707] text-[#EDE9E1] selection:bg-[#D5B878] selection:text-black"
    >
      {/* Dynamic Background Grid & Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* Subtle Warm Accent Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D5B878]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Editorial Typography & Engineering Narrative */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top Kicker / Monogram Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#D5B878]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5B878]" />
                <span>DIGITAL IDENTITY · 2026</span>
              </div>
              <span className="text-[#8A8780] text-xs font-mono">/</span>
              <span className="text-[#8A8780] text-xs font-mono tracking-wider">FULL-STACK & AI</span>
            </div>

            {/* Role Header */}
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#A3A09A] uppercase mb-2">
              Software Engineer <span className="text-[#D5B878]">·</span> Full-Stack Developer <span className="text-[#D5B878]">·</span> Builder
            </p>

            {/* Grand Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-5">
              <span className="block font-sans text-white">Nishant</span>
              <span className="block font-serif italic font-normal text-[#D5B878] mt-1">Trivedi</span>
            </h1>

            {/* Core Value Proposition Statement */}
            <p className="text-sm sm:text-base text-[#A3A09A] max-w-xl font-sans leading-relaxed mb-6">
              I build thoughtful digital products and reliable systems — from first interaction to high-scale production. Driven by algorithmic precision, MERN architectures, and real-world software delivery.
            </p>

            {/* Proof Points & Verified Credentials Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#D5B878]/30 transition-colors">
                <div className="flex items-center gap-2 text-[#D5B878] text-xs font-mono mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>QBX ARENA '26</span>
                </div>
                <p className="text-xs text-[#EDE9E1] font-medium">Top 10 Runner-Up</p>
                <p className="text-[10px] text-[#8A8780] font-mono">LaunchPilot AI</p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#D5B878]/30 transition-colors">
                <div className="flex items-center gap-2 text-[#D5B878] text-xs font-mono mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>LEETCODE</span>
                </div>
                <p className="text-xs text-[#EDE9E1] font-medium">355+ Solved</p>
                <p className="text-[10px] text-[#8A8780] font-mono">1415 Rating · 73d Streak</p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#D5B878]/30 transition-colors">
                <div className="flex items-center gap-2 text-[#D5B878] text-xs font-mono mb-1">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>OPEN SOURCE</span>
                </div>
                <p className="text-xs text-[#EDE9E1] font-medium">Campus Lead</p>
                <p className="text-[10px] text-[#8A8780] font-mono">OSC Global & Winter of Code</p>
              </div>
            </div>

            {/* CTAs and External Quick Connect */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D5B878] text-[#070707] font-mono text-xs font-semibold tracking-wider hover:bg-[#E5C378] shadow-[0_0_20px_rgba(213,184,120,0.2)] transition-all duration-200"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#EDE9E1] font-mono text-xs tracking-wider transition-all duration-200"
              >
                <span>LET'S BUILD</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#D5B878]" />
              </a>

              <a
                href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-[#8A8780] hover:text-[#EDE9E1] font-mono text-xs transition-colors"
              >
                <span>LINKEDIN</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Clean Walking Video with Scaled Framing */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            style={{
              x: moveX,
              y: moveY,
            }}
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>

      {/* Hero Footer Telemetry Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8A8780]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            LOCATION: LUCKNOW, INDIA
          </span>
          <span className="hidden md:inline">TIMEZONE: GMT +5:30</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a href="mailto:trivedinishant880@gmail.com" className="hover:text-[#D5B878] transition-colors">
            trivedinishant880@gmail.com
          </a>
          <span className="text-white/20">|</span>
          <span>B.TECH CSE (AKTU)</span>
        </div>
      </div>
    </section>
  );
}
