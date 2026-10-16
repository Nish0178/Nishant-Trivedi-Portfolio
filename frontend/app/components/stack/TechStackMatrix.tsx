"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Wrench, 
  BrainCircuit, 
  Sparkles,
  ArrowUpRight 
} from "lucide-react";
import { useCmsContent } from "@/app/context/CmsContentContext";

interface ElementData {
  number: string;
  symbol: string;
  name: string;
  family: "Languages" | "Frontend" | "Backend" | "Databases" | "Tools" | "Core";
  categoryLabel: string;
  description: string;
  iconType: string;
}

const DEFAULT_ELEMENTS: ElementData[] = [
  // Row 1
  { number: "01", symbol: "C++", name: "C++", family: "Languages", categoryLabel: "PROGRAMMING LANGUAGE", description: "Systems programming foundations and high-performance algorithms.", iconType: "code" },
  { number: "02", symbol: "Jv", name: "Java", family: "Languages", categoryLabel: "PRIMARY LANGUAGE", description: "Enterprise OOP, Spring Boot services, and 400+ DSA algorithmic solutions.", iconType: "code" },
  { number: "03", symbol: "Py", name: "Python", family: "Languages", categoryLabel: "PROGRAMMING LANGUAGE", description: "Scripting, generative AI pipelines, and data workflow orchestration.", iconType: "code" },
  { number: "04", symbol: "Js", name: "JavaScript", family: "Languages", categoryLabel: "WEB RUNTIME", description: "Modern ES6+ asynchronous web architecture and full-stack application development.", iconType: "code" },
  { number: "05", symbol: "Sq", name: "SQL", family: "Languages", categoryLabel: "QUERY LANGUAGE", description: "Relational queries, ACID transactions, and database schema normalization.", iconType: "database" },
  { number: "06", symbol: "Re", name: "React.js", family: "Frontend", categoryLabel: "FRONTEND FRAMEWORK", description: "Modern component architecture, custom reactive hooks, and responsive interfaces.", iconType: "layers" },
  { number: "07", symbol: "Rn", name: "React Native", family: "Frontend", categoryLabel: "MOBILE FRAMEWORK", description: "Cross-platform mobile application development for iOS and Android.", iconType: "layers" },
  { number: "08", symbol: "Ht", name: "HTML5", family: "Frontend", categoryLabel: "WEB FOUNDATIONS", description: "Semantic markup, modern accessibility standards, and SEO architecture.", iconType: "layers" },

  // Row 2
  { number: "09", symbol: "Cs", name: "CSS3", family: "Frontend", categoryLabel: "STYLING SYSTEM", description: "Responsive layouts, flexbox/grid, custom properties, and fluid typography.", iconType: "layers" },
  { number: "10", symbol: "Tw", name: "Tailwind CSS", family: "Frontend", categoryLabel: "CSS FRAMEWORK", description: "Utility-first design tokens, modern dark/light modes, and custom components.", iconType: "layers" },
  { number: "11", symbol: "No", name: "Node.js", family: "Backend", categoryLabel: "ASYNC RUNTIME", description: "High-concurrency server microservices, event-driven I/O, and npm tooling.", iconType: "server" },
  { number: "12", symbol: "Ex", name: "Express.js", family: "Backend", categoryLabel: "WEB FRAMEWORK", description: "REST API microservices, middleware routing, and defensive endpoint security.", iconType: "server" },
  { number: "13", symbol: "Ra", name: "REST APIs", family: "Backend", categoryLabel: "API ARCHITECTURE", description: "Stateless HTTP resource design, standard status codes, and JSON schemas.", iconType: "server" },
  { number: "14", symbol: "Sb", name: "Spring Boot", family: "Backend", categoryLabel: "ENTERPRISE BACKEND", description: "Robust Java 21 REST controllers, JPA/Hibernate persistence, and Spring Security.", iconType: "server" },
  { number: "15", symbol: "Mg", name: "MongoDB", family: "Databases", categoryLabel: "DATABASE", description: "Document NoSQL, high-throughput aggregation pipelines, and compound index modeling.", iconType: "database" },
  { number: "16", symbol: "Pg", name: "PostgreSQL", family: "Databases", categoryLabel: "RELATIONAL DATABASE", description: "Advanced relational integrity, foreign key cascades, and complex SQL joins.", iconType: "database" },

  // Row 3
  { number: "17", symbol: "My", name: "MySQL", family: "Databases", categoryLabel: "RELATIONAL DATABASE", description: "Structured query optimization, stored procedures, and ACID compliance.", iconType: "database" },
  { number: "18", symbol: "Ma", name: "MongoDB Atlas", family: "Databases", categoryLabel: "CLOUD DATABASE", description: "Managed cloud clusters, automated backups, and global shard replication.", iconType: "database" },
  { number: "19", symbol: "Dk", name: "Docker", family: "Tools", categoryLabel: "CONTAINERIZATION", description: "Multi-stage container builds, Docker Compose environments, and reproducible runtimes.", iconType: "tool" },
  { number: "20", symbol: "Gt", name: "Git", family: "Tools", categoryLabel: "VERSION CONTROL", description: "Distributed branching workflows, interactive rebasing, and merge resolution.", iconType: "tool" },
  { number: "21", symbol: "Rd", name: "Redis", family: "Databases", categoryLabel: "IN-MEMORY CACHE", description: "Key-value cache layers, rate-limiting, and distributed session storage.", iconType: "database" },
  { number: "22", symbol: "Jw", name: "JWT", family: "Backend", categoryLabel: "AUTHENTICATION", description: "Stateless token-based authorization, HMAC/RSA signatures, and secure cookies.", iconType: "server" },
  { number: "23", symbol: "Pm", name: "Postman", family: "Tools", categoryLabel: "API TESTING", description: "Automated test suites, API contracts, environment variables, and mock servers.", iconType: "tool" },
  { number: "24", symbol: "El", name: "Electron.js", family: "Tools", categoryLabel: "DESKTOP RUNTIME", description: "Cross-platform desktop application packaging with Chromium and Node.", iconType: "tool" },

  // Row 4
  { number: "25", symbol: "Ds", name: "Data Structures", family: "Core", categoryLabel: "COMPUTER SCIENCE", description: "Monotonic stacks, binary search trees, hash maps, graphs, and linked lists.", iconType: "brain" },
  { number: "26", symbol: "Al", name: "Algorithms", family: "Core", categoryLabel: "COMPUTER SCIENCE", description: "Dynamic programming, sliding window, binary search, DFS/BFS, and greedy approaches.", iconType: "brain" },
  { number: "27", symbol: "Op", name: "OOP", family: "Core", categoryLabel: "DESIGN PARADIGM", description: "Encapsulation, inheritance, polymorphism, abstraction, and SOLID design principles.", iconType: "brain" },
  { number: "28", symbol: "Sd", name: "System Design", family: "Core", categoryLabel: "ARCHITECTURE", description: "Horizontal scaling, load balancing, caching tiers, and microservice decoupling.", iconType: "brain" },
  { number: "29", symbol: "Ad", name: "API Design", family: "Core", categoryLabel: "ARCHITECTURE", description: "Idempotency, rate limiting, versioning, defensive validation, and clear documentation.", iconType: "brain" },
  { number: "30", symbol: "Ai", name: "Artificial Intelligence", family: "Core", categoryLabel: "INTELLIGENCE", description: "LLM prompt chaining, structured JSON outputs, and multimodal agent workflows.", iconType: "brain" },
  { number: "31", symbol: "Ml", name: "Machine Learning", family: "Core", categoryLabel: "INTELLIGENCE", description: "Feature engineering, classification algorithms, regression, and model evaluation.", iconType: "brain" },
  { number: "32", symbol: "Dt", name: "Data Science", family: "Core", categoryLabel: "INTELLIGENCE", description: "Data exploration, statistical distributions, predictive modeling, and insights.", iconType: "brain" },
];

const FAMILIES = [
  { name: "Languages", color: "bg-[#1A1C22] text-white border-neutral-700", dot: "bg-neutral-800" },
  { name: "Frontend", color: "bg-[#333A48] text-white border-slate-600", dot: "bg-slate-700" },
  { name: "Backend", color: "bg-[#485366] text-white border-slate-500", dot: "bg-slate-600" },
  { name: "Databases", color: "bg-[#8A7663] text-white border-stone-600", dot: "bg-stone-500" },
  { name: "Tools", color: "bg-[#CBD5E1] text-neutral-900 border-slate-300", dot: "bg-slate-300" },
  { name: "Core", color: "bg-[#EDE8DE] text-neutral-900 border-neutral-300", dot: "bg-neutral-200" },
] as const;

function resolveFamily(cat?: string): ElementData["family"] {
  if (!cat) return "Core";
  const c = cat.toLowerCase();
  if (c.includes("lang")) return "Languages";
  if (c.includes("front") || c.includes("ui") || c.includes("web")) return "Frontend";
  if (c.includes("back") || c.includes("server") || c.includes("api")) return "Backend";
  if (c.includes("data") || c.includes("db") || c.includes("sql") || c.includes("nosql")) return "Databases";
  if (c.includes("tool") || c.includes("devops") || c.includes("cloud") || c.includes("git")) return "Tools";
  return "Core";
}

function resolveIconType(family: ElementData["family"]): string {
  switch (family) {
    case "Languages": return "code";
    case "Frontend": return "layers";
    case "Backend": return "server";
    case "Databases": return "database";
    case "Tools": return "tool";
    case "Core": return "brain";
  }
}

export default function TechStackMatrix() {
  const { content } = useCmsContent();
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const elements = useMemo<ElementData[]>(() => {
    if (Array.isArray(content?.skills) && content.skills.length > 0) {
      const defaultMap = new Map<string, ElementData>();
      DEFAULT_ELEMENTS.forEach((el) => defaultMap.set(el.name.toLowerCase(), el));

      return content.skills.map((skill, idx) => {
        const lowerName = (skill.name || "").trim().toLowerCase();
        const known = defaultMap.get(lowerName);
        const family = resolveFamily(skill.category);
        const symbol = known
          ? known.symbol
          : (skill.name || "Sk").trim().slice(0, 2).replace(/^./, (c) => c.toUpperCase());
        const description = skill.roleDesc || (known ? known.description : `${skill.name} core engineering competency.`);
        const iconType = known ? known.iconType : resolveIconType(family);

        return {
          number: String(idx + 1).padStart(2, "0"),
          symbol,
          name: skill.name || "Skill",
          family,
          categoryLabel: (skill.category || "TECHNOLOGY").toUpperCase(),
          description,
          iconType,
        };
      });
    }
    return DEFAULT_ELEMENTS;
  }, [content?.skills]);

  const [activeElement, setActiveElement] = useState<ElementData>(() => elements[14] || elements[0] || DEFAULT_ELEMENTS[14]);

  const filteredElements = useMemo(() => {
    return elements;
  }, [elements]);

  const getFamilyColor = (family: string) => {
    switch (family) {
      case "Languages":
        return "bg-[#17191E] text-white border-neutral-800 dark:bg-[#1E2026] dark:border-neutral-700";
      case "Frontend":
        return "bg-[#383E4C] text-white border-slate-700 dark:bg-[#2F3542] dark:border-slate-600";
      case "Backend":
        return "bg-[#4D586B] text-white border-slate-600 dark:bg-[#434E5F] dark:border-slate-500";
      case "Databases":
        return "bg-[#8C7A67] text-white border-stone-600 dark:bg-[#7D6C5A] dark:border-stone-500";
      case "Tools":
        return "bg-[#D6DCE5] text-neutral-900 border-slate-300 dark:bg-[#4A4E58] dark:text-white dark:border-slate-600";
      case "Core":
        return "bg-[#ECE8DF] text-neutral-900 border-neutral-300 dark:bg-[#2A2C34] dark:text-neutral-200 dark:border-neutral-700";
      default:
        return "bg-neutral-800 text-white";
    }
  };

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            02 — SKILLS
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-neutral-300 dark:bg-neutral-800" />
        </div>

        {/* Section Heading & Category Filter Legend */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              Periodic Table{" "}
              <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
                of stack.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2.5 font-normal tracking-wide">
              Hover over an element to inspect telemetry, runtime role, and architectural scope.
            </p>
          </div>

          {/* Interactive Family Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
            <button
              onClick={() => setSelectedFamily(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedFamily === null
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              All ({elements.length})
            </button>
            {FAMILIES.map((f) => {
              const count = elements.filter((e) => e.family === f.name).length;
              if (count === 0) return null;
              const isSelected = selectedFamily === f.name;

              return (
                <button
                  key={f.name}
                  onClick={() => setSelectedFamily(isSelected ? null : f.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${f.dot}`} />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Layout: Periodic Grid on Left (8 Cols), Interactive Inspection Drawer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Responsive Periodic Table Grid (8 Columns on desktop matching Reference) */}
          <div className="lg:col-span-8 overflow-x-auto pb-4 pt-1">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 min-w-[320px]">
              {filteredElements.map((el) => {
                const isSelected = activeElement.name === el.name;
                const isDimmed = selectedFamily !== null && el.family !== selectedFamily;

                return (
                  <motion.div
                    key={`${el.number}-${el.name}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveElement(el)}
                    onMouseEnter={() => setActiveElement(el)}
                    className={`relative aspect-square rounded-xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer border transition-all duration-200 select-none ${getFamilyColor(
                      el.family
                    )} ${
                      isSelected
                        ? "ring-2 ring-neutral-950 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900 shadow-lg scale-105 z-10"
                        : "hover:shadow-md"
                    } ${isDimmed ? "opacity-25 grayscale" : "opacity-100"}`}
                  >
                    {/* Top Row: Atomic Number */}
                    <div className="flex items-center justify-between text-[9px] font-mono opacity-80">
                      <span>{el.number}</span>
                      <span className="text-[8px] uppercase tracking-wider hidden sm:inline">
                        {el.family.slice(0, 3)}
                      </span>
                    </div>

                    {/* Center: Big Atomic Symbol */}
                    <div className="text-center my-auto">
                      <span className="text-lg sm:text-xl font-bold tracking-tight block font-mono">
                        {el.symbol}
                      </span>
                    </div>

                    {/* Bottom: Full Element Name */}
                    <div className="text-center">
                      <span className="text-[10px] sm:text-[11px] font-medium leading-tight line-clamp-1 block opacity-90">
                        {el.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Element Inspection Card matching Reference Frame 16 */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white/80 dark:bg-[#14151B]/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-black/[0.06] dark:border-white/[0.08] shadow-lg relative overflow-hidden">
              {/* Subtle accent glow matching element family */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

              {/* Element Header */}
              <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block">
                    ATOMIC NO. {activeElement.number} · {activeElement.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
                    {activeElement.name}
                  </h3>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg shadow-sm border ${getFamilyColor(
                    activeElement.family
                  )}`}
                >
                  {activeElement.symbol}
                </div>
              </div>

              {/* Classification Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Family: {activeElement.family}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Status: Production Verified
                </span>
              </div>

              {/* Description & Engineering Role */}
              <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>{activeElement.description}</p>
              </div>

              {/* Architectural Telemetry Box */}
              <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                  RUNTIME PROFILE
                </div>
                <div className="bg-[#FAF9F5] dark:bg-[#1A1C23] p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.04] space-y-1 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Layer:</span>
                    <span>{activeElement.family}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Specialization:</span>
                    <span>Full-Stack & Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
