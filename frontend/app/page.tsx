"use client";

import React from "react";
import Header from "./components/navigation/Header";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import TechStackMatrix from "./components/stack/TechStackMatrix";
import SelectedWork from "./components/work/SelectedWork";
import CertificationsSection from "./components/achievements/CertificationsSection";
import ExperienceTimeline from "./components/experience/ExperienceTimeline";
import Achievements from "./components/achievements/Achievements";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-clip max-w-full transition-colors duration-300">
      {/* Floating Header Navigation matching Reference */}
      <Header />

      {/* Main Flow following the Reference Video's exact section sequence */}
      <main className="relative z-10 overflow-x-clip max-w-full">
        {/* HERO */}
        <Hero />

        {/* 01: ABOUT */}
        <AboutSection />

        {/* 02: SKILLS (Periodic Table of Stack) */}
        <TechStackMatrix />

        {/* 03: WORK (Interactive Accordion Deck) */}
        <SelectedWork />

        {/* 04: CERTIFICATIONS (Always Learning) */}
        <CertificationsSection />

        {/* 05: EXPERIENCE & EDUCATION (Milestone Timeline) */}
        <ExperienceTimeline />

        {/* 06: ACHIEVEMENTS (Proud Moments) */}
        <Achievements />

        {/* 07: CONTACT & FOOTER */}
        <ContactSection />
      </main>
    </div>
  );
}