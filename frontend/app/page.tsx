"use client";

import React from "react";
import Header from "./components/navigation/Header";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import SelectedWork from "./components/work/SelectedWork";
import TechStackMatrix from "./components/stack/TechStackMatrix";
import ExperienceTimeline from "./components/experience/ExperienceTimeline";
import ProblemSolving from "./components/dsa/ProblemSolving";
import Achievements from "./components/achievements/Achievements";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] aura-grid-bg selection:bg-amber-400 selection:text-black overflow-x-clip max-w-full transition-colors duration-300">
      {/* Top Floating Glow Backdrop */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-500/2 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Fixed Cinematic Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10 overflow-x-clip max-w-full">
        {/* HERO SECTION */}
        <Hero />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* 01: ABOUT ME */}
        <AboutSection />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* 02: SELECTED WORK */}
        <SelectedWork />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* 03: TECH MATRIX / SKILLS */}
        <TechStackMatrix />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* 04: EXPERIENCE & MILESTONES */}
        <ExperienceTimeline />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* ALGORITHMIC RIGOR / PROBLEM SOLVING */}
        <ProblemSolving />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* ACHIEVEMENTS & CERTIFICATIONS */}
        <Achievements />

        {/* Cinematic Divider */}
        <div className="aura-divider" />

        {/* 05: CONTACT / INITIALIZE TRANSMISSION */}
        <ContactSection />
      </main>
    </div>
  );
}