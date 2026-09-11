"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING } from "@/app/lib/motion";
import { useTheme } from "@/app/context/ThemeContext";
import { fetchPublicCmsContent, FALLBACK_PUBLIC_CONTENT } from "@/lib/api/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [cmsHero, setCmsHero] = useState(FALLBACK_PUBLIC_CONTENT.hero);

  useEffect(() => {
    let mounted = true;
    fetchPublicCmsContent().then((content) => {
      if (mounted && content?.hero) {
        setCmsHero((prev) => ({ ...prev, ...content.hero }));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Scroll-based cinematic hero exit transition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroHeadlineY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const heroVideoScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const heroVideoY = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative lg:h-[100svh] lg:max-h-[100svh] min-h-[100svh] h-auto flex flex-col justify-center pt-20 sm:pt-22 lg:pt-18 pb-4 sm:pb-6 px-6 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic Background Technical Grid */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] ${
          isDark
            ? "opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
            : "opacity-35 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]"
        }`}
      />

      {/* Ambient background aura glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: ambientOpacity }}
        transition={{ duration: 1.4, ease: EASING.cinematic }}
        className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: ambientOpacity }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASING.cinematic }}
        className={`absolute bottom-10 left-10 w-[380px] h-[380px] rounded-full blur-[130px] pointer-events-none ${
          isDark ? "bg-blue-500/8" : "bg-amber-400/8"
        }`}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto relative z-10">
        
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
            className="flex items-center gap-1.5 mb-2.5 sm:mb-3 font-sans"
          >
            <span
              className={`text-xs sm:text-sm font-bold tracking-[0.24em] uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {cmsHero.badgeName || "NISHANT"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </motion.div>

          {/* Main Headline (3 Lines) */}
          <h1
            className={`serif-headline text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.25rem] font-bold tracking-tight leading-[0.92] uppercase mb-3.5 sm:mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASING.cinematic }}
              className="block"
            >
              {cmsHero.headlineLine1 || "I BUILD"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASING.cinematic }}
              className="block"
            >
              {cmsHero.headlineLine2 || "DIGITAL"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.58, ease: EASING.cinematic }}
              className="block text-[#f59e0b] dark:text-[#f59e0b]"
            >
              {cmsHero.headlineLine3 || "EXPERIENCES"}
            </motion.span>
          </h1>

          {/* Sub-roles Tag Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 font-sans"
          >
            {(cmsHero.subRoles && cmsHero.subRoles.length > 0
              ? cmsHero.subRoles
              : ["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"]
            ).map((role) => (
              <span
                key={role}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider backdrop-blur-md shadow-sm uppercase font-mono border ${
                  isDark
                    ? "text-slate-300 bg-white/[0.04] border-white/15"
                    : "text-slate-700 bg-black/[0.04] border-black/10"
                }`}
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
            className={`text-xs sm:text-sm lg:text-[14px] font-normal leading-relaxed max-w-lg mb-4 sm:mb-5 font-serif ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {cmsHero.bio || "I turn bold ideas into seamless digital experiences, where frontend meets powerful backend, and code transforms vision into impact."}
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASING.cinematic }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-5 font-sans"
          >
            <Link
              href="#work"
              className="btn-gold inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs font-bold tracking-wider uppercase font-mono shadow-md"
            >
              <span>EXPLORE MY WORK</span>
              <span className="text-sm">↗</span>
            </Link>

            <a
              href="mailto:trivedinishant880@gmail.com?subject=Inquiry%20-%20Nishant%20Trivedi"
              className="btn-secondary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold tracking-wider uppercase font-mono shadow-sm"
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
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-3 sm:pt-3.5 border-t ${
              isDark ? "border-white/[0.08]" : "border-black/[0.08]"
            }`}
          >
            {/* 3 Metric Columns with Dividers */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className={`pr-4 sm:pr-6 border-r ${isDark ? "border-white/10" : "border-black/10"}`}>
                <div
                  className={`serif-metric text-2xl sm:text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  400+
                </div>
                <div
                  className={`text-[9px] font-sans font-bold tracking-[0.16em] uppercase mt-0.5 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  LEETCODE SOLVED
                </div>
              </div>
              <div className={`px-3 sm:px-5 border-r ${isDark ? "border-white/10" : "border-black/10"}`}>
                <div className="serif-metric text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400">
                  B.Tech
                </div>
                <div
                  className={`text-[9px] font-sans font-bold tracking-[0.16em] uppercase mt-0.5 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  AKTU CS &apos;28
                </div>
              </div>
              <div className="pl-3 sm:pl-4">
                <div
                  className={`serif-metric text-2xl sm:text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Top 10
                </div>
                <div
                  className={`text-[9px] font-sans font-bold tracking-[0.16em] uppercase mt-0.5 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  HACKATHON RUNNER-UP
                </div>
              </div>
            </div>

            {/* Authentic Signature */}
            <div className="relative flex flex-col items-center sm:items-end select-none group">
              <Image
                src="/images/nishant-signature.webp"
                alt="Nishant Trivedi Signature - Code x Create x Impact"
                width={200}
                height={116}
                className={`w-[140px] sm:w-[160px] lg:w-[170px] h-auto object-contain group-hover:scale-105 transition-transform duration-300 ${
                  isDark
                    ? "drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                    : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] filter brightness-75"
                }`}
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Walking Video Card - Centered in available column space */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(10% 0% 0% 0%)", scale: 0.95 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          style={{ scale: heroVideoScale, y: heroVideoY }}
          transition={{ duration: 1.0, delay: 0.48, ease: EASING.cinematic }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
        >
          {/* Subtle Ambient Glow Behind Media */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-amber-500/5 to-transparent rounded-3xl blur-3xl -z-10" />

          {/* Video Container - centered, properly constrained */}
          <div
            className={`relative w-full max-w-[250px] sm:max-w-[270px] lg:max-w-[290px] xl:max-w-[305px] mx-auto rounded-2xl overflow-hidden border transition-all duration-300 ${
              isDark
                ? "border-amber-500/40 bg-[#0e111d] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_-5px_rgba(245,158,11,0.22)]"
                : "border-amber-500/35 bg-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12),0_0_25px_-5px_rgba(217,119,6,0.15)]"
            }`}
          >
            {/* Native Video - extended upward with object-position focused on upper torso/head */}
            <div className="relative aspect-[9/16] w-full bg-black/40 max-h-[min(52vh,430px)] sm:max-h-[min(54vh,450px)] overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/nishant-portrait.webp"
                className="w-full h-full object-cover object-[center_6%]"
              >
                <source src="/video/hero-walking.mp4" type="video/mp4" />
                <source src="/video/hero-walking.m4v" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              
              {/* Subtle gradient vignette at bottom */}
              <div
                className={`absolute inset-0 bg-gradient-to-t pointer-events-none opacity-60 ${
                  isDark ? "from-[#07080c] via-transparent to-transparent" : "from-black/40 via-transparent to-transparent"
                }`}
              />
            </div>

            {/* Bottom Meta Bar inside video container - Preserved */}
            <div
              className={`py-2 px-3 sm:px-3.5 backdrop-blur-md border-t flex items-center justify-between font-sans ${
                isDark
                  ? "bg-[#0a0d18]/95 border-white/10"
                  : "bg-white/95 border-black/8"
              }`}
            >
              <div>
                <div className={`text-xs font-bold tracking-wide ${isDark ? "text-white" : "text-slate-900"}`}>
                  Nishant Trivedi
                </div>
                <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Full Stack Developer · Lucknow, IN
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[9px] font-bold text-amber-500 dark:text-amber-400 font-mono">
                NT
              </div>
            </div>
          </div>

          {/* Horizontal Quote Card Directly Below Video - Preserved & Centered */}
          <div
            className={`w-full max-w-[250px] sm:max-w-[270px] lg:max-w-[290px] xl:max-w-[305px] mx-auto rounded-xl border py-2.5 px-3.5 mt-2.5 flex items-center justify-between transition-all duration-300 ${
              isDark
                ? "border-amber-500/40 bg-[#0b0e18]/90 shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_20px_-5px_rgba(245,158,11,0.18)]"
                : "border-amber-500/35 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.06),0_0_15px_-4px_rgba(217,119,6,0.12)]"
            }`}
          >
            <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-amber-500 dark:text-amber-400 uppercase leading-tight">
              <div>&ldquo;CODE IS MY CRAFT,</div>
              <div>IMPACT IS MY GOAL.&rdquo;</div>
            </div>
            <div className="w-8 sm:w-10 h-0.5 bg-amber-400 rounded-full ml-3" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
