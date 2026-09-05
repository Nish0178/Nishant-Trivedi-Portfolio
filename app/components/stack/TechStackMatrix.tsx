"use client";

import React from "react";
import { motion } from "motion/react";

const QUADRANTS = [
  {
    number: "01",
    title: "FRONTEND ARCHITECTURE",
    tag: "CLIENT RUNTIMES",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    description:
      "Specialized in building high-performance client applications, modular design systems, and responsive zero-CLS web interfaces.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Chart.js", "Responsive Design"],
  },
  {
    number: "02",
    title: "DISTRIBUTED BACKEND",
    tag: "SERVER SYSTEMS",
    tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    description:
      "Engineered resilient server architectures, RESTful API endpoints, stateless JWT authentication, and decoupled microservice pipelines.",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Prisma ORM", "Microservices", "Bcrypt"],
  },
  {
    number: "03",
    title: "DATA PLATFORMS",
    tag: "PERSISTENCE & SCHEMAS",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description:
      "Designing high-throughput relational and document database schemas with optimized indexing and ACID transactions.",
    skills: ["MongoDB Atlas", "PostgreSQL", "MySQL", "SQLite", "Mongoose", "Prisma Schema", "Database Design"],
  },
  {
    number: "04",
    title: "LANGUAGES & CS RIGOR",
    tag: "ALGORITHMIC CORE",
    tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    description:
      "400+ algorithmic challenges solved in Java, robust Object-Oriented Design, and solid computer science principles.",
    skills: ["Java (Primary)", "JavaScript", "TypeScript", "C++", "C", "Python", "DSA", "OOP", "DBMS", "OS"],
  },
];

export default function TechStackMatrix() {
  return (
    <section id="skills" className="relative py-28 px-6 sm:px-8 overflow-hidden bg-[#08090d]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
              03 / TECH MATRIX
            </span>
            <span className="w-8 h-[1px] bg-amber-500/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
            <span className="block text-slate-100">ARCHITECTURAL MASTERY.</span>
            <span className="block text-gold-gradient">PRECISION APPLIED.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-mono mt-4 max-w-2xl">
            Grouped technical capabilities and architectural domains. Engineered for resilience, performance, and scale.
          </p>
        </div>

        {/* 4 Large Quadrant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {QUADRANTS.map((quad, idx) => (
            <motion.div
              key={quad.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl aura-card p-6 sm:p-8 relative overflow-hidden group border border-white/[0.08] bg-[#0d101c]/90 flex flex-col justify-between"
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    DOMAIN // {quad.number}
                  </span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${quad.tagColor}`}>
                    {quad.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-3 group-hover:text-amber-400 transition-colors">
                  {quad.title}
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed mb-6">
                  {quad.description}
                </p>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                {quad.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md text-xs font-mono font-medium text-slate-200 bg-white/[0.04] border border-white/10 group-hover:border-amber-500/20 transition-colors"
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
          className="rounded-xl bg-[#0e1220] border border-amber-500/20 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-1">
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
                className="px-3 py-1 rounded text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30"
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
