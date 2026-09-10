"use client";

import React from "react";
import { motion } from "motion/react";

const TECH_TICKER = [
  "Next.js", "TypeScript", "React", "Node.js", "Java", "MongoDB",
  "PostgreSQL", "Prisma", "Google Gemini", "Express.js", "REST APIs",
  "JWT Auth", "Git", "Python", "C++", "TailwindCSS",
];

export default function Manifesto() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[1px] bg-[#c9a84c]" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
            Philosophy
          </span>
        </motion.div>

        {/* Large Editorial Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-light tracking-tight text-[#f0ece4] leading-[1.2] max-w-5xl"
        >
          I build systems where{" "}
          <span className="font-serif italic text-[#c9a84c]">
            product thinking
          </span>
          , engineering discipline, and{" "}
          <span className="relative inline-block">
            <span className="relative z-10">AI workflows</span>
            <span className="absolute bottom-1 left-0 w-full h-[1px] bg-[#c9a84c]/40" />
          </span>{" "}
          converge — shipping resilient software that{" "}
          <span className="text-white font-medium">
            scales beyond the prototype
          </span>.
        </motion.h2>

        {/* Three Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {[
            {
              num: "01",
              title: "Architectural Rigor",
              desc: "Clean schemas, modular architectures, defensive validation — systems engineered for long-term scalability.",
            },
            {
              num: "02",
              title: "AI & Workflow Design",
              desc: "Multi-stage LLM reasoning pipelines with structured constraint matrices and deterministic outputs.",
            },
            {
              num: "03",
              title: "Human-Centered UX",
              desc: "Responsive micro-interactions, editorial typography, zero-latency feedback loops, and purposeful motion.",
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c9a84c]/30 transition-all duration-300"
            >
              <span className="font-mono text-[10px] text-[#c9a84c] tracking-[0.3em] block mb-3">
                {pillar.num}
              </span>
              <h3 className="text-base font-semibold text-white mb-2 font-display">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#6b6862] leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="gradient-divider mt-24 sm:mt-32" />

      {/* Technology Ticker / Marquee */}
      <div className="relative mt-12 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TECH_TICKER, ...TECH_TICKER].map((tech, idx) => (
            <span
              key={idx}
              className="mx-6 text-xs sm:text-sm font-mono text-[#2a2926] tracking-wider uppercase select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
