"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  ArrowUpRight,
  Cpu,
  Zap,
  FileCode2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ARCHITECTURE_STEPS = [
  {
    step: "01",
    title: "Idea Intake & Constraint Matrix",
    desc: "Structured schema capturing domain parameters, audience, monetization models, and competitive assumptions.",
  },
  {
    step: "02",
    title: "Multi-Pass Gemini Pipeline",
    desc: "Hierarchical prompt chaining for market validation, SWOT analysis, competitor gap detection, and risk modeling.",
  },
  {
    step: "03",
    title: "Co-Founder Simulation",
    desc: "Persona-driven synthetic simulations questioning unit economics, TAM/SAM/SOM, and go-to-market resilience.",
  },
  {
    step: "04",
    title: "Persistence & Telemetry",
    desc: "Relational persistence storing versioned reports, investor readiness metrics, pitch decks, and brand playbooks.",
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

const CODE_PREVIEW = `// LaunchPilot AI: Deterministic Gemini Prompt Pipeline
export async function generateValidationReport(
  input: StartupPayload
): Promise<ValidationReport> {
  const systemPrompt = buildSystemConstraintPrompt({
    domain: input.industry,
    targetAudience: input.targetPersona,
    monetization: input.pricingModel
  });

  const [market, swot, competitors, score] =
    await Promise.all([
      geminiClient.generateStructuredJSON<MarketReport>(
        systemPrompt, input.problemStatement
      ),
      geminiClient.generateStructuredJSON<SWOTReport>(
        systemPrompt, input.valueProposition
      ),
      geminiClient.generateStructuredJSON<CompetitorAnalysis>(
        systemPrompt, input.competitors
      ),
      evaluateInvestorReadiness(input)
    ]);

  return prisma.validationReport.create({
    data: {
      userId: input.userId,
      projectName: input.name,
      investorReadinessScore: score.score,
      metrics: { market, swot, competitors },
      simulatedNotes: await runDigitalTwin(input)
    }
  });
}`;

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState<"system" | "code" | "capabilities">("system");

  const tabs = [
    { id: "system" as const, label: "Architecture", icon: Cpu },
    { id: "capabilities" as const, label: "Capabilities", icon: Zap },
    { id: "code" as const, label: "Implementation", icon: FileCode2 },
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase">
                Case Study 01
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Selected Work<span className="text-[#c9a84c]">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#6b6862] max-w-sm">
            In-depth engineering case studies with architectural decisions, AI pipelines, and production systems.
          </p>
        </div>

        {/* Featured Case Study Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#080808] border border-white/[0.07] overflow-hidden shadow-2xl">
          {/* Project Header with Gradient Accent */}
          <div className="relative p-6 sm:p-10 pb-0">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#c9a84c]/[0.05] via-transparent to-transparent rounded-full pointer-events-none" />

            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-[10px] font-mono tracking-wider mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>TOP 10 RUNNER-UP · QBX ARENA 2026</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
                  LaunchPilot AI
                </h3>
                <p className="text-[#a8a49c] text-sm mt-3 max-w-2xl">
                  AI-powered startup validation platform that simulates digital twin co-founders, models market viability, and synthesizes investor-ready dossiers.
                </p>
              </div>
            </div>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Next.js", "TypeScript", "Node.js", "Express.js", "Prisma", "SQLite", "Google Gemini"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-[#a8a49c]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Bar */}
          <div className="px-6 sm:px-10 border-b border-white/[0.06]">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 font-mono text-[10px] tracking-wider transition-colors ${
                      isActive ? "text-[#c9a84c]" : "text-[#6b6862] hover:text-[#a8a49c]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label.toUpperCase()}</span>
                    {isActive && (
                      <motion.div
                        layoutId="work-tab"
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c9a84c]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "system" && (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {ARCHITECTURE_STEPS.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#c9a84c]/20 transition-all group"
                    >
                      <span className="font-mono text-[9px] text-[#c9a84c] tracking-[0.3em] block mb-3">
                        STAGE {step.step}
                      </span>
                      <h4 className="text-sm font-semibold text-white mb-2 font-display">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-[#6b6862] leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-[#6b6862]">
                        <span>VERIFIED</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "capabilities" && (
                <motion.div
                  key="capabilities"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {CAPABILITIES.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-md bg-[#c9a84c]/10 text-[#c9a84c] mt-0.5 shrink-0">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-[#f0ece4]">{cap}</p>
                        <span className="text-[9px] font-mono text-[#6b6862] mt-1 block">
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl bg-[#0a0a0a] border border-white/[0.08] p-5 font-mono text-xs overflow-x-auto"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-[10px] text-[#6b6862]">
                    <span className="text-[#c9a84c]">lib/gemini-validation-engine.ts</span>
                    <span>TYPESCRIPT · GEMINI SDK</span>
                  </div>
                  <pre className="text-[#a8a49c] leading-relaxed text-[11px]">
                    <code>{CODE_PREVIEW}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Narrative Strip */}
          <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-white/[0.04]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-[#6b6862]">
              <div>
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-[0.2em] block mb-1 uppercase">The Problem</span>
                <p className="leading-relaxed">Founders face unstructured market discovery and cognitive bias, burning capital on unvalidated ideas.</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-[0.2em] block mb-1 uppercase">The Decision</span>
                <p className="leading-relaxed">Multi-turn Gemini prompt chaining, structured JSON schema parsing, and Prisma ORM persistence.</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-[0.2em] block mb-1 uppercase">The Outcome</span>
                <p className="leading-relaxed text-[#a8a49c]">Top 10 Runner-Up at QBX Arena Hackathon 2026 for architectural completeness and product intelligence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
