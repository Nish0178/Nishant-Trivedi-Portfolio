"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASING, DURATION, STAGGER } from "@/app/lib/motion";

const QUADRANTS = [
  {
    number: "01",
    title: "FRONTEND ARCHITECTURE",
    tag: "CORE RUNTIMES",
    tagColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    description:
      "Specialized in building high-performance client applications, modular design systems, and responsive zero-CLS web interfaces.",
    skills: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Chart.js", "Responsive Design"],
  },
  {
    number: "02",
    title: "DISTRIBUTED BACKEND",
    tag: "SERVER SYSTEMS",
    tagColor: "text-blue-400 border-blue-500/40 bg-blue-500/10",
    description:
      "Engineered resilient server architectures, RESTful API endpoints, stateless JWT authentication, and decoupled microservice pipelines.",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Prisma ORM", "Microservices", "Bcrypt"],
  },
  {
    number: "03",
    title: "DATA PLATFORMS",
    tag: "PERSISTENCE",
    tagColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    description:
      "Designing high-throughput relational and document database schemas with optimized indexing, transactions, and isolation.",
    skills: ["MongoDB Atlas", "PostgreSQL", "MySQL", "SQLite", "Mongoose", "Prisma Schema", "Database Design"],
  },
  {
    number: "04",
    title: "ALGORITHMS & MACHINE LEARNING",
    tag: "INTELLIGENCE & RIGOR",
    tagColor: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    description:
      "400+ algorithmic challenges solved in Java, applied multimodal prompt chains, and deterministic structured outputs.",
    skills: ["Java (Primary)", "JavaScript", "TypeScript", "C++", "Python", "Gemini 2.5 Flash", "DSA", "OOP", "DBMS", "OS"],
  },
];

export default function TechStackMatrix() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Large typography scroll coupling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#07080c]"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-amber-500/6 rounded-full blur-[160px] pointer-events-none" />

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
            <span className="text-amber-400 text-xs font-bold tracking-[0.24em] uppercase">
              03 / TECH MATRIX
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </motion.div>

          <motion.h2
            style={{ y: headlineY, scale: headlineScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.cinematic, ease: EASING.cinematic }}
            className="serif-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] max-w-4xl"
          >
            <span className="block text-white">ARCHITECTURAL MASTERY.</span>
            <span className="block text-gold-gradient serif-italic">PRECISION APPLIED.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASING.cinematic }}
            className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed"
          >
            Grouped technical capabilities and architectural domains. Engineered for resilience, performance, and scale.
          </motion.p>
        </div>

        {/* 4 Large Quadrant Cards Grid: Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {QUADRANTS.map((quad, idx) => (
            <motion.div
              key={quad.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DURATION.cinematic, delay: idx * STAGGER.editorial, ease: EASING.cinematic }}
              className="rounded-2xl aura-card p-6 sm:p-8 relative overflow-hidden group border border-white/[0.08] bg-[#0d101c]/95 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-500"
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/[0.08]">
                  <span className="text-xs text-slate-400 font-bold tracking-[0.16em] uppercase">
                    DOMAIN // {quad.number}
                  </span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.16em] uppercase border ${quad.tagColor}`}>
                    {quad.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="serif-headline text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase mb-3 group-hover:text-amber-300 transition-colors group-hover:translate-x-1">
                  {quad.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {quad.description}
                </p>
              </div>

              {/* Skills Pills Grouped by Domain */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                {quad.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-slate-200 bg-white/[0.05] border border-white/10 group-hover:border-amber-500/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Applied AI & Developer Toolkit Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.normal, delay: 0.2, ease: EASING.cinematic }}
          className="rounded-xl bg-[#0e1220] border border-amber-500/25 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase mb-1">
              APPLIED AI &amp; DEVELOPER TOOLKIT
            </div>
            <div className="text-sm text-slate-300">
              Multimodal Gemini 2.5 Flash orchestration, Git/GitHub version control, VS Code, Postman, Render Cloud, npm.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Gemini 2.5 Flash", "Git", "GitHub", "VS Code", "Postman", "Render", "npm", "Linux/Bash"].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded text-xs font-semibold tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/40"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
