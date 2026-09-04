"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Layers,
  Cpu,
  ShieldAlert,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Database,
  GitBranch,
  Bot,
  Zap,
  TrendingUp,
  FileCode2,
} from "lucide-react";

const ARCHITECTURE_STEPS = [
  {
    step: "01. INGESTION",
    title: "Idea Intake & Constraint Matrix",
    desc: "Structured schema capturing domain parameters, target audience, monetization models, and competitive assumptions with strict TypeScript validation.",
  },
  {
    step: "02. AI ORCHESTRATION",
    title: "Multi-Pass Gemini Reasoning Pipeline",
    desc: "Hierarchical prompt chaining querying Google Gemini for market validation, automated SWOT analysis, competitor gap detection, and risk modeling.",
  },
  {
    step: "03. DIGITAL TWIN",
    title: "Co-Founder Simulation Engine",
    desc: "Persona-driven synthetic simulations questioning unit economics, TAM/SAM/SOM estimates, and go-to-market resilience before investor pitch generation.",
  },
  {
    step: "04. PERSISTENCE & TELEMETRY",
    title: "Prisma & SQLite/Postgres Store",
    desc: "Relational persistence storing versioned validation reports, investor readiness metrics (0-100 score), structured pitch decks, and brand playbooks.",
  },
];

const CAPABILITIES = [
  "Algorithmic Startup Idea Validation",
  "Automated Market Research & SWOT Engine",
  "Competitor Intelligence & Defensibility Matrix",
  "Investor-Readiness Assessment Scoring",
  "AI Co-Founder Persona Simulation",
  "Automated Pitch Deck & Business Plan Synthesis",
  "Branding & Value Proposition Directives",
  "Secure Authentication & Interactive Analytics",
];

const CODE_PREVIEW = `// LaunchPilot AI: Deterministic Gemini Prompt Pipeline Engine
export async function generateValidationReport(input: StartupPayload): Promise<ValidationReport> {
  const systemPrompt = buildSystemConstraintPrompt({
    domain: input.industry,
    targetAudience: input.targetPersona,
    monetization: input.pricingModel
  });

  const [marketAnalysis, swotMatrix, competitorGaps, investorScore] = await Promise.all([
    geminiClient.generateStructuredJSON<MarketReport>(systemPrompt, input.problemStatement),
    geminiClient.generateStructuredJSON<SWOTReport>(systemPrompt, input.valueProposition),
    geminiClient.generateStructuredJSON<CompetitorAnalysis>(systemPrompt, input.competitors),
    evaluateInvestorReadiness(input)
  ]);

  return prisma.validationReport.create({
    data: {
      userId: input.userId,
      projectName: input.name,
      investorReadinessScore: investorScore.score,
      metrics: { marketAnalysis, swotMatrix, competitorGaps },
      simulatedCoFounderNotes: await runDigitalTwinSimulation(input)
    }
  });
}`;

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState<"system" | "code" | "capabilities">("system");

  return (
    <section id="work" className="relative py-28 bg-[#070707] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>01 / CASE STUDY</span>
              <span className="text-white/20">·</span>
              <span>FLAGSHIP FEATURED BUILD</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Selected Work<span className="text-[#D5B878]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-sm">
            In-depth engineering case studies highlighting architectural decisions, AI pipelines, and production systems.
          </p>
        </div>

        {/* Featured Case Study 01: LaunchPilot AI */}
        <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Top Decorative Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D5B878]/[0.04] rounded-full blur-[120px] pointer-events-none" />

          {/* Project Title & Recognition Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5B878]/10 border border-[#D5B878]/30 text-[#D5B878] text-[11px] font-mono tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>TOP 10 RUNNER-UP · QBX ARENA HACKATHON 2026</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                LaunchPilot AI
              </h3>
              <p className="text-[#A3A09A] text-sm sm:text-base mt-2 max-w-2xl font-sans">
                AI-powered startup validation and product intelligence platform engineered to simulate digital twin co-founders, model market viability, and synthesize investor-ready dossiers.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 max-w-md">
              {["Next.js", "TypeScript", "Node.js", "Express.js", "Prisma", "SQLite", "Google Gemini AI"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#EDE9E1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Case Study Breakdown Tabs */}
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 mb-8">
            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-2 font-mono text-xs tracking-wider px-3.5 py-2 rounded-lg transition-all ${
                activeTab === "system"
                  ? "bg-[#D5B878] text-black font-semibold shadow-md"
                  : "bg-white/[0.03] text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE</span>
            </button>

            <button
              onClick={() => setActiveTab("capabilities")}
              className={`flex items-center gap-2 font-mono text-xs tracking-wider px-3.5 py-2 rounded-lg transition-all ${
                activeTab === "capabilities"
                  ? "bg-[#D5B878] text-black font-semibold shadow-md"
                  : "bg-white/[0.03] text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES</span>
            </button>

            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 font-mono text-xs tracking-wider px-3.5 py-2 rounded-lg transition-all ${
                activeTab === "code"
                  ? "bg-[#D5B878] text-black font-semibold shadow-md"
                  : "bg-white/[0.03] text-[#8A8780] hover:text-[#EDE9E1]"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>ENGINEERING IMPLEMENTATION</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            {activeTab === "system" && (
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {ARCHITECTURE_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#D5B878]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-[#D5B878] tracking-widest block mb-2">
                        {step.step}
                      </span>
                      <h4 className="text-base font-semibold text-white mb-2 font-sans">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#8A8780] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] text-[#A3A09A]">
                      <span>STAGE VERIFIED</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "capabilities" && (
              <motion.div
                key="capabilities"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {CAPABILITIES.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-[#D5B878]/10 text-[#D5B878] mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#EDE9E1] font-sans">
                        {cap}
                      </p>
                      <span className="text-[10px] font-mono text-[#8A8780] block mt-1">
                        Production feature
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-[#050505] border border-white/10 p-5 font-mono text-xs overflow-x-auto shadow-inner"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] text-[#8A8780]">
                  <span className="text-[#D5B878]">lib/gemini-validation-engine.ts</span>
                  <span>TYPESCRIPT · GEMINI SDK</span>
                </div>
                <pre className="text-[#C5C2BB] leading-relaxed">
                  <code>{CODE_PREVIEW}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deep Engineering Narrative Box */}
          <div className="mt-8 pt-8 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-[#8A8780] font-sans">
            <div>
              <span className="font-mono text-[10px] text-[#D5B878] tracking-wider block mb-1 uppercase">
                The Problem
              </span>
              <p className="leading-relaxed">
                Founders face unstructured market discovery and cognitive bias, burning capital on unvalidated ideas without systematic competitive analysis.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#D5B878] tracking-wider block mb-1 uppercase">
                The Engineering Decisions
              </span>
              <p className="leading-relaxed">
                Implemented multi-turn Gemini prompt chaining, structured JSON schema parsing with defensive fallbacks, and Prisma ORM persistence for instant report hydration.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#D5B878] tracking-wider block mb-1 uppercase">
                The Outcome
              </span>
              <p className="leading-relaxed text-[#EDE9E1]">
                Awarded Top 10 Runner-Up at the prestigious QBX Arena Hackathon 2026 for high architectural completeness and practical product intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
