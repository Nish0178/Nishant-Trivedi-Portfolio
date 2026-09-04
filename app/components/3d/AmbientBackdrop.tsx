"use client";

import React from "react";

/**
 * AmbientBackdrop — Replaced the particle canvas with a lightweight
 * static grain / noise texture via CSS. The noise-overlay class on <body>
 * in layout.tsx handles the visual texture. This component now just
 * provides a subtle radial ambient glow.
 */
export default function AmbientBackdrop() {
  return (
    <>
      {/* Subtle warm radial glow — fixed behind all content */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a84c]/[0.015] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/[0.01] rounded-full blur-[180px]" />
      </div>
    </>
  );
}
