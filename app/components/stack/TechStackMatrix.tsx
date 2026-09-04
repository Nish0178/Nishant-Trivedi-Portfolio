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
      { name: "Node.js", tag: "Event-Driven" },
      { name: "Express.js", tag: "REST Services" },
      { name: "REST APIs", tag: "HTTP Contracts" },
      { name: "JWT", tag: "Stateless Auth" },
    ],
  },
  {
    id: "databases",
    name: "Databases & ORM",
    icon: Database,
    items: [
      { name: "MongoDB", tag: "NoSQL" },
      { name: "MySQL", tag: "RDBMS" },
      { name: "PostgreSQL", tag: "Advanced" },
      { name: "SQLite", tag: "Embedded" },
      { name: "Prisma", tag: "Type-Safe ORM" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Infra",
    icon: Wrench,
    items: [
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Collaboration" },
      { name: "VS Code", tag: "IDE" },
      { name: "Postman", tag: "API Debugging" },
      { name: "Render", tag: "Cloud Deploy" },
      { name: "npm", tag: "Packages" },
    ],
  },
  {
    id: "ai",
    name: "AI & Dev Ecosystem",
    icon: Bot,
    items: [
      { name: "Google Gemini", tag: "LLM Orchestration" },
      { name: "Claude", tag: "Anthropic" },
      { name: "GPT", tag: "OpenAI" },
      { name: "Cursor", tag: "AI Editor" },
      { name: "GitHub Copilot", tag: "Inline Coding" },
      { name: "Antigravity", tag: "Coding Agent" },
      { name: "n8n", tag: "Workflow Auto" },
      { name: "Power BI", tag: "Analytics" },
    ],
  },
];

export default function TechStackMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGroups = TECH_GROUPS.map((group) => {
    if (selectedCategory !== "all" && group.id !== selectedCategory) return null;
    const filteredItems = group.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length === 0) return null;
    return { ...group, items: filteredItems };
  }).filter(Boolean) as TechGroup[];

  return (
    <section id="stack" className="relative py-24 sm:py-32 bg-[#050505]">
      {/* Tech Marquee Background */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="flex animate-marquee-slow whitespace-nowrap py-6">
          {[...TECH_GROUPS.flatMap(g => g.items.map(i => i.name)), ...TECH_GROUPS.flatMap(g => g.items.map(i => i.name))].map((name, idx) => (
            <span key={idx} className="mx-8 text-6xl font-display font-bold text-white uppercase">{name}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Technical Matrix
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Tech Stack<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-sm">
            Carefully curated stack organized by layer, verified experience, and modern developer tooling.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                selectedCategory === "all"
                  ? "bg-[#c9a84c] text-[#050505] border-[#c9a84c] font-semibold"
                  : "bg-transparent border-white/10 text-[#6b6862] hover:text-[#a8a49c]"
              }`}
            >
              ALL ({TECH_GROUPS.reduce((acc, g) => acc + g.items.length, 0)})
            </button>
            {TECH_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedCategory(g.id)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === g.id
                    ? "bg-[#c9a84c] text-[#050505] border-[#c9a84c] font-semibold"
                    : "bg-transparent border-white/10 text-[#6b6862] hover:text-[#a8a49c]"
                }`}
              >
                {g.name.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-56">
            <Search className="w-3.5 h-3.5 text-[#6b6862] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-white/[0.08] rounded-full pl-9 pr-4 py-1.5 text-[11px] font-mono text-[#f0ece4] placeholder-[#6b6862] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all"
                >
                  {/* Group Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c]">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-display font-semibold text-sm text-white">{group.name}</h3>
                    </div>
                    <span className="font-mono text-[9px] text-[#6b6862]">{group.items.length}</span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5">
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02] transition-all group"
                      >
                        <span className="font-mono text-[11px] text-[#a8a49c] group-hover:text-[#c9a84c] transition-colors">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-[#6b6862] bg-white/[0.03] px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                    ))}
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
