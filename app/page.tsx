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
    <div className="relative min-h-screen bg-[#050505] text-[#f0ece4]">
      {/* Interactive Custom Cursor (Desktop) */}
      <CustomCursor />

      {/* Subtle Ambient Glow Backdrop */}
      <AmbientBackdrop />

      {/* Fixed Navigation */}
      <Header />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 01: Cinematic Full-Viewport Hero with Walking Video */}
        <Hero />

        {/* Gradient divider between hero and manifesto */}
        <div className="gradient-divider" />

        {/* 02: Engineering Manifesto & Philosophy */}
        <Manifesto />

        {/* 03: Case Study 01 — LaunchPilot AI */}
        <SelectedWork />

        {/* 03b: Case Study 02 — TodoPro */}
        <TodoProWork />

        {/* Gradient divider */}
        <div className="gradient-divider" />

        {/* 04: Delivered Products / Team Work */}
        <DeliveredProducts />

        {/* 05: Experience Timeline */}
        <ExperienceTimeline />

        {/* Gradient divider */}
        <div className="gradient-divider" />

        {/* 06: Tech Stack Matrix */}
        <TechStackMatrix />

        {/* 07: DSA & Systems */}
        <ProblemSolving />

        {/* Gradient divider */}
        <div className="gradient-divider" />

        {/* 08: About & Background */}
        <AboutStory />

        {/* 08b: Achievements & Certifications */}
        <Achievements />

        {/* 09: Contact & Footer */}
        <ContactSection />
      </main>
    </div>
  );
}