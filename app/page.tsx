import React from "react";
import Header from "./components/navigation/Header";
import CustomCursor from "./components/navigation/CustomCursor";
import AmbientBackdrop from "./components/3d/AmbientBackdrop";
import Hero from "./components/hero/Hero";
import Manifesto from "./components/intro/Manifesto";
import SelectedWork from "./components/work/SelectedWork";
import TodoProWork from "./components/work/TodoProWork";
import DeliveredProducts from "./components/delivered/DeliveredProducts";
import ExperienceTimeline from "./components/experience/ExperienceTimeline";
import TechStackMatrix from "./components/stack/TechStackMatrix";
import ProblemSolving from "./components/dsa/ProblemSolving";
import AboutStory from "./components/about/AboutStory";
import Achievements from "./components/achievements/Achievements";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-[#EDE9E1] selection:bg-[#D5B878] selection:text-black">
      {/* Interactive Custom Desktop Cursor */}
      <CustomCursor />

      {/* Subtle Mathematical Particle Canvas */}
      <AmbientBackdrop />

      {/* Fixed Luxury Navigation Header */}
      <Header />

      {/* Main Interactive Storytelling Flow */}
      <main className="relative z-10">
        {/* 01: ME — Cinematic Hero with Real Nishant Walking Video & Authentic Identity */}
        <Hero />

        {/* 02: HOW I THINK — Engineering Manifesto & Philosophy */}
        <Manifesto />

        {/* 03: WHAT I BUILD — Case Study 01: LaunchPilot AI (Interactive Pipeline Engine) */}
        <SelectedWork />

        {/* 03b: WHAT I BUILD — Case Study 02: TodoPro (Interactive Architecture Engine) */}
        <TodoProWork />

        {/* 04: WHAT I HAVE SHIPPED — Delivered Products / Team Engineering (Astrospacious) */}
        <DeliveredProducts />

        {/* 05: WHERE I HAVE WORKED — Interactive Engineering Experience Timeline */}
        <ExperienceTimeline />

        {/* 06: WHAT I USE — Layered Technical Stack Ecosystem */}
        <TechStackMatrix />

        {/* 07: HOW I SOLVE — Algorithmic Rigor & DSA Mindset (LeetCode Telemetry) */}
        <ProblemSolving />

        {/* 08: WHO I AM — Authentic Narrative & Academic Education (AKTU Lucknow) */}
        <AboutStory />

        {/* 08b: WHAT I HAVE ACHIEVED — Verified Hackathons & Industry Certifications */}
        <Achievements />

        {/* 09: LET'S BUILD — Interactive Contact Hub & Footer */}
        <ContactSection />
      </main>
    </div>
  );
}