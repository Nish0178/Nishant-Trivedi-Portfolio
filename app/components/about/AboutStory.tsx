"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCap,
  Code2,
  Cpu,
  Globe,
  Compass,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function AboutStory() {
  return (
    <section id="about" className="relative py-28 bg-[#080808] text-[#EDE9E1] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5B878] tracking-widest uppercase mb-3">
              <span>06 / BACKGROUND & PHILOSOPHY</span>
              <span className="text-white/20">·</span>
              <span>ABOUT NISHANT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              About & Direction<span className="text-[#D5B878]">.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 font-mono text-xs text-[#8A8780] max-w-sm">
            Bridging foundational computer science principles with modern full-stack web and AI product engineering.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Engineering with curiosity, discipline, and architectural clarity.
            </h3>

            <p className="text-sm sm:text-base text-[#A3A09A] leading-relaxed font-sans">
              I am a Computer Science and Engineering undergraduate at Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow. My journey is centered around understanding how systems work under the hood — from object-oriented Java architecture and database indices to reactive web frontends and multimodal AI workflows.
            </p>

            <p className="text-sm sm:text-base text-[#A3A09A] leading-relaxed font-sans">
              Whether optimizing API latency in a team sprint at Astrospacious, experimenting with Gemini reasoning pipelines for LaunchPilot AI, or mentoring over 50 students as Campus Lead for Open Source Connect Global, I prioritize clean contracts, measurable outcomes, and continuous engineering rigor.
            </p>

            {/* Core Pillars / Interests */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {[
                { title: "Java Systems & OOP", tag: "Backend Core" },
                { title: "Full-Stack MERN", tag: "Web Platforms" },
                { title: "Generative AI", tag: "Gemini & LLMs" },
                { title: "Open Source", tag: "Collaborative Git" },
                { title: "Cloud & DevOps", tag: "Deployment Flow" },
                { title: "Data Analytics", tag: "Metrics & Telemetry" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <p className="text-xs font-semibold text-[#EDE9E1] font-sans">
                    {item.title}
                  </p>
                  <span className="text-[10px] font-mono text-[#D5B878] block mt-1">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Credential & Identity Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0B0B0B] border border-white/[0.09] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Top Banner Emblem */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/[0.08]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D5B878]/40 shrink-0">
                  <Image
                    src="/images/nt-emblem.png"
                    alt="Nishant Trivedi Emblem"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-sans">Nishant Trivedi</h4>
                  <p className="text-xs font-mono text-[#D5B878]">B.Tech Computer Science & Engineering</p>
                </div>
              </div>

              {/* Education Spec */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-xs">
                  <GraduationCap className="w-4 h-4 text-[#D5B878] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">
                      Dr. A.P.J. Abdul Kalam Technical University (AKTU)
                    </span>
                    <span className="text-[#8A8780] block font-mono">Lucknow, India · July 2024 – September 2028</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#8A8780] tracking-wider uppercase block mb-2">
                    Core Coursework & Foundations
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {[
                      "Data Structures & Algorithms",
                      "Database Management (DBMS)",
                      "Operating Systems",
                      "Object-Oriented Programming (OOP)",
                      "Computer Networks",
                      "Java Development",
                    ].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[#C5C2BB]"
                      >
                        {c}
                      </span>
                    ))}
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
