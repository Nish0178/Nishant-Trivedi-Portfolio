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

interface ElementData {
  number: string;
  symbol: string;
  name: string;
  family: "Languages" | "Frontend" | "Backend" | "Databases" | "Tools" | "Core";
  categoryLabel: string;
  description: string;
  iconType: string;
}

const ELEMENTS: ElementData[] = [
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

export default function TechStackMatrix() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<ElementData>(ELEMENTS[14]); // Default to MongoDB as seen in reference frame 15!

  const filteredElements = useMemo(() => {
    return ELEMENTS;
  }, []);

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

        {/* Section Headline & Subtitle matching Reference Frame 12 */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            The periodic table{" "}
            <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
              of my stack.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2.5 font-normal tracking-wide">
            32 elements in six families. Hover a tile to see its details, or pick a family to light it up.
          </p>
        </div>

        {/* Family Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8">
          <button
            type="button"
            onClick={() => setSelectedFamily(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedFamily === null
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                : "bg-[#EDE9DF]/60 dark:bg-[#1E2026]/60 text-neutral-600 dark:text-neutral-300 hover:bg-[#E2DDD3] dark:hover:bg-[#282B34]"
            }`}
          >
            All Elements
          </button>

          {FAMILIES.map((f) => {
            const isSelected = selectedFamily === f.name;
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => setSelectedFamily(isSelected ? null : f.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm scale-105"
                    : "bg-[#EDE9DF]/60 dark:bg-[#1E2026]/60 text-neutral-700 dark:text-neutral-300 hover:bg-[#E2DDD3] dark:hover:bg-[#282B34]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${f.dot}`} />
                <span>{f.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Periodic Table Grid (8 Columns on desktop) */}
          <div className="lg:col-span-9 overflow-x-auto pb-4">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5 min-w-[560px] sm:min-w-0">
              {filteredElements.map((el) => {
                const isFamilyMatch = selectedFamily === null || el.family === selectedFamily;
                const isActive = activeElement.symbol === el.symbol;

                return (
                  <motion.div
                    key={el.number}
                    onMouseEnter={() => setActiveElement(el)}
                    onClick={() => setActiveElement(el)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative aspect-square rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border cursor-pointer select-none transition-all duration-300 ${getFamilyColor(
                      el.family
                    )} ${
                      !isFamilyMatch ? "opacity-20 scale-95" : "opacity-100 shadow-sm"
                    } ${
                      isActive ? "ring-2 ring-neutral-900 dark:ring-white scale-105 shadow-md z-10" : ""
                    }`}
                  >
                    {/* Element Number */}
                    <span className="text-[9px] sm:text-[10px] font-mono opacity-60 leading-none">
                      {el.number}
                    </span>

                    {/* Chemical Symbol */}
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-center my-auto leading-none">
                      {el.symbol}
                    </span>

                    {/* Full Name */}
                    <span className="text-[9px] sm:text-[10px] truncate text-center opacity-80 leading-none">
                      {el.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Inspection Card on the Right matching Reference Frame 15 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeElement.symbol}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-[#EAE6DC]/90 dark:bg-[#1A1C22]/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Family Accent Bar */}
                <div className="w-12 h-1 rounded-full bg-neutral-900 dark:bg-white mb-6 opacity-80" />

                {/* Big Visual Logo / Icon Presentation */}
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-neutral-800 shadow-md border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center mb-5">
                  {activeElement.symbol === "Mg" ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-2xl">🍃</span>
                    </div>
                  ) : activeElement.symbol === "Jv" ? (
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <span className="text-2xl">☕</span>
                    </div>
                  ) : activeElement.symbol === "Py" ? (
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-2xl">🐍</span>
                    </div>
                  ) : activeElement.symbol === "Re" ? (
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <span className="text-2xl">⚛️</span>
                    </div>
                  ) : activeElement.symbol === "Dk" ? (
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-2xl">🐳</span>
                    </div>
                  ) : activeElement.symbol === "Gt" ? (
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <span className="text-2xl">🐙</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                      {activeElement.symbol}
                    </span>
                  )}
                </div>

                {/* Element Name */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  {activeElement.name}
                </h3>

                {/* Category Subtitle */}
                <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mt-1 mb-4">
                  {activeElement.categoryLabel}
                </p>

                {/* Detailed Description */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {activeElement.description}
                </p>

                {/* Family Pill Tag */}
                <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] w-full flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span>Family</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {activeElement.family}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
