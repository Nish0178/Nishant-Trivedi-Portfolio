"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const bgX = useTransform(smoothX, [-0.5, 0.5], [5, -5]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] flex flex-col justify-end overflow-hidden bg-[#050505]"
    >
      {/* Full-Viewport Walking Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY, scale: 1.05 }}
      >
        <HeroVideo />
      </motion.div>

      {/* Main Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-12 sm:pb-16 lg:pb-20">
        {/* Kicker Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-12 h-[1px] bg-[#c9a84c]" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#c9a84c] uppercase">
            Software Engineer · Full-Stack · AI
          </span>
        </motion.div>

        {/* Grand Headline — Display Scale */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="block text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] text-white font-display">
            Nishant
          </span>
          <span className="block text-[clamp(3rem,10vw,8rem)] font-serif italic font-normal tracking-[-0.02em] leading-[0.9] text-[#c9a84c]">
            Trivedi
          </span>
        </motion.h1>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base text-[#a8a49c] max-w-lg leading-relaxed mb-8 font-display"
        >
          I build thoughtful digital products and resilient systems — from first
          interaction to high-scale production. Driven by algorithmic precision,
          modern web architectures, and real-world delivery.
        </motion.p>

        {/* Bottom Bar: Stats + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          {/* Compact Proof Points */}
          <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
            <div>
              <span className="block text-2xl font-bold text-white">355+</span>
              <span className="text-[#6b6862] tracking-wider">LEETCODE</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-white">Top 10</span>
              <span className="text-[#6b6862] tracking-wider">QBX ARENA</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-white">3+</span>
              <span className="text-[#6b6862] tracking-wider">INTERNSHIPS</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#work"
              className="magnetic-btn px-6 py-3 rounded-full bg-[#c9a84c] text-[#050505] font-mono text-xs font-semibold tracking-wider hover:bg-[#dfc06a] transition-all duration-300 glow-gold"
            >
              VIEW WORK
            </a>
            <a
              href="#contact"
              className="magnetic-btn px-6 py-3 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 text-[#f0ece4] font-mono text-xs tracking-wider hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
            >
              CONTACT
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#c9a84c]" />
        </motion.div>
      </motion.div>

      {/* Side Social Strip (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-white/10" />
        <a
          href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b6862] hover:text-[#c9a84c] transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="mailto:trivedinishant880@gmail.com"
          className="text-[#6b6862] hover:text-[#c9a84c] transition-colors"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
        <div className="w-[1px] h-16 bg-white/10" />
      </motion.div>
    </section>
  );
}
