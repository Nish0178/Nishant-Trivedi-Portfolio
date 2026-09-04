"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Cpu } from "lucide-react";

export default function Manifesto() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#070707] border-y border-white/[0.05] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#D5B878]/10 via-[#D5B878]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#D5B878] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D5B878]" />
            <span>02 // ENGINEERING MANIFESTO</span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-[#EDE9E1] max-w-4xl leading-[1.15]"
          >
            I build systems where{" "}
            <span className="font-serif italic font-normal text-[#D5B878]">product thinking</span>,{" "}
            engineering discipline, and{" "}
            <span className="text-white font-medium underline decoration-[#D5B878]/50 underline-offset-8">
              AI workflows
            </span>{" "}
            converge.
          </motion.h2>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#0C0C0C] border border-white/[0.06] relative group hover:border-[#D5B878]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D5B878] mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-[#EDE9E1] mb-2 font-mono">01 / Architectural Rigor</h3>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Clean schemas, defensive input validation, structured JSON serialization, and modular layered architectures built for long-term scalability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#0C0C0C] border border-white/[0.06] relative group hover:border-[#D5B878]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D5B878] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-[#EDE9E1] mb-2 font-mono">02 / AI & Workflow Design</h3>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Orchestrating multi-stage LLM reasoning pipelines with Google Gemini, structured constraint matrices, and predictable deterministic state outputs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-2xl bg-[#0C0C0C] border border-white/[0.06] relative group hover:border-[#D5B878]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D5B878] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-[#EDE9E1] mb-2 font-mono">03 / Human-Centered UX</h3>
              <p className="text-xs text-[#8A8780] leading-relaxed">
                Elevating functional software with responsive micro-interactions, editorial typography, zero latency feedback loops, and purposeful motion design.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
