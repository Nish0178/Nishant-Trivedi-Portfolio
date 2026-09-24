"use client";

import React, { useState } from "react";
import CoreProfileTab from "./CoreProfileTab";
import AboutTab from "./AboutTab";
import HeroTab from "./HeroTab";
import ResumeTab from "./ResumeTab";
import EducationTab from "./EducationTab";
import SocialsTab from "./SocialsTab";

const PROFILE_SUBSECTIONS = [
  { id: "core", label: "Core Profile" },
  { id: "about", label: "About & Bio" },
  { id: "hero", label: "Hero Headline" },
  { id: "resume", label: "Resume CV" },
  { id: "education", label: "Education" },
  { id: "socials", label: "Social Links" },
];

export default function ProfileTab() {
  const [subSection, setSubSection] = useState("core");

  return (
    <div className="space-y-6">
      {/* Sub-navigation pill bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0e111a] border border-white/10 w-fit">
        {PROFILE_SUBSECTIONS.map((item) => {
          const isActive = subSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubSection(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Render selected subsection */}
      <div>
        {subSection === "core" && <CoreProfileTab />}
        {subSection === "about" && <AboutTab />}
        {subSection === "hero" && <HeroTab />}
        {subSection === "resume" && <ResumeTab />}
        {subSection === "education" && <EducationTab />}
        {subSection === "socials" && <SocialsTab />}
      </div>
    </div>
  );
}
