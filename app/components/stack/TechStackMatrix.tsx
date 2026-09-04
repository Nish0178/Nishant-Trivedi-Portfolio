"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Layout,
  Server,
  Database,
  Wrench,
  Bot,
  Search,
  Sparkles,
  Terminal,
  Cpu,
} from "lucide-react";

interface TechGroup {
  id: string;
  name: string;
  icon: React.ElementType;
  items: { name: string; tag: string }[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    id: "languages",
    name: "Languages",
    icon: Code,
    items: [
      { name: "Java", tag: "Primary / OOP" },
      { name: "JavaScript", tag: "ES6+ / Modern" },
      { name: "TypeScript", tag: "Type-Safe" },
      { name: "C++", tag: "Systems / DSA" },
      { name: "C", tag: "Low-Level" },
      { name: "Python", tag: "Scripting & AI" },
      { name: "SQL", tag: "Relational Queries" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Layout,
    items: [
      { name: "HTML5", tag: "Semantic DOM" },
      { name: "CSS3", tag: "Modern Layouts" },
      { name: "React", tag: "Components & State" },
      { name: "Next.js", tag: "Full-Stack SSR/SSG" },
      { name: "Chart.js", tag: "Data Visualization" },
      { name: "Responsive Design", tag: "Mobile-First" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", tag: "Event-Driven Runtime" },
      { name: "Express.js", tag: "REST Microservices" },
      { name: "REST APIs", tag: "HTTP Contracts" },
      { name: "JWT", tag: "Stateless Security" },
    ],
  },
  {
    id: "databases",
    name: "Databases & ORM",
    icon: Database,
    items: [
      { name: "MongoDB", tag: "NoSQL Documents" },
      { name: "MySQL", tag: "RDBMS" },
      { name: "PostgreSQL", tag: "Advanced Relational" },
      { name: "SQLite", tag: "Embedded Store" },
      { name: "Prisma", tag: "Type-Safe ORM" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Infrastructure",
    icon: Wrench,
    items: [
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Collaboration & CI" },
      { name: "VS Code", tag: "Development IDE" },
      { name: "Postman", tag: "API Debugging" },
      { name: "Render", tag: "Cloud Deployment" },
      { name: "npm", tag: "Package Manager" },
    ],
  },
  {
    id: "ai",
    name: "AI & Dev Ecosystem",
    icon: Bot,
    items: [
      { name: "Google Gemini", tag: "LLM Orchestration" },
      { name: "Claude", tag: "Anthropic Reasoning" },
      { name: "GPT", tag: "OpenAI Foundation" },
      { name: "Grok", tag: "xAI Inference" },
      { name: "Cursor", tag: "AI Pair Editor" },
      { name: "GitHub Copilot", tag: "Inline Coding" },
      { name: "Claude Code", tag: "Agentic Terminal" },
      { name: "Gemini CLI", tag: "Command Line AI" },
      { name: "Antigravity", tag: "Advanced Coding Agent" },
      { name: "n8n", tag: "Workflow Automation" },
      { name: "Power BI", tag: "BI Analytics" },
      { name: "NotebookLM", tag: "Grounded Research" },
      { name: "Codex", tag: "Code Synthesis" },
      { name: "OpenClaw", tag: "AI Tooling" },
    ],
  },
];

export default function TechStackMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGroups = TECH_GROUPS.map((group) => {
    if (selectedCategory !== "all" && group.id !== selectedCategory) {
      return null;
    }

    const filteredItems = group.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredItems.length === 0) return null;

    return { ...group, items: filteredItems };
  }).filter(Boolean) as TechGroup[];

  return (
    <section id="stack" className="relative py-28 bg-[#080808] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>04 / TECHNICAL MATRIX</span>
              <span className="text-white/20">·</span>
              <span>ENGINEERING ECOSYSTEM</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Tech Stack<span className="text-[#D5B878]">.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-sm">
            Carefully curated technical stack organized by layer, verified experience, and modern developer tooling.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#D5B878] text-black border-[#D5B878] font-semibold"
                  : "bg-white/[0.02] border-white/10 text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              ALL ({TECH_GROUPS.reduce((acc, g) => acc + g.items.length, 0)})
            </button>
            {TECH_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedCategory(g.id)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  selectedCategory === g.id
                    ? "bg-[#D5B878] text-black border-[#D5B878] font-semibold"
                    : "bg-white/[0.02] border-white/10 text-[#8A8780] hover:text-[#EDE9E1]"
                }`}
              >
                {g.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#8A8780] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs font-mono text-[#EDE9E1] placeholder-[#8A8780] focus:outline-none focus:border-[#D5B878]"
            />
          </div>
        </div>

        {/* Matrix Grid of Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGroups.map((group) => {
              const IconComponent = group.icon;
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-[#0A0A0A] border border-white/[0.07] p-6 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Group Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#D5B878]/10 text-[#D5B878]">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="font-sans font-bold text-base text-white">
                          {group.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] text-[#8A8780]">
                        {group.items.length} TECHNOLOGIES
                      </span>
                    </div>

                    {/* Tech Items List */}
                    <div className="space-y-2">
                      {group.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#D5B878]/30 transition-all group"
                        >
                          <span className="font-mono text-xs text-[#EDE9E1] group-hover:text-[#D5B878] transition-colors">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#8A8780] bg-white/[0.03] px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
