"use client";

import React from "react";

export default function MediaTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
          ASSET REPOSITORY // PHASE 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
          Media Asset Manager
        </h2>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Centralized asset staging, cloud media hosting, and portfolio file pipelines.
        </p>
      </div>

      {/* Placeholder / Scope Boundary Card */}
      <div className="p-8 rounded-xl bg-[#0d0f17] border border-white/10 space-y-6">
        <div className="flex items-center space-x-3 text-amber-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>PHASE 4 SCHEDULED CAPABILITY</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-serif text-white">
            Direct Cloud Media Management
          </h3>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-2xl">
            Static portfolio media, PDF documents, and demonstration videos are currently distributed through the optimized Next.js static asset pipeline under <code className="text-amber-300 font-mono">/public</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-lg bg-[#121520] border border-white/5">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">CURRENT STORAGE</div>
            <div className="text-sm font-mono text-white mt-1">Local /public Pipeline</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-2">● Active & Served</div>
          </div>

          <div className="p-4 rounded-lg bg-[#121520] border border-white/5">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">RESUME ARTIFACT</div>
            <div className="text-sm font-mono text-white mt-1">PDF Engine v2.4</div>
            <div className="text-[11px] font-mono text-zinc-400 mt-2">Direct download active</div>
          </div>

          <div className="p-4 rounded-lg bg-[#121520] border border-white/5">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">REMOTE S3 / R2 UPLOADS</div>
            <div className="text-sm font-mono text-white mt-1">Phase 4 Integration</div>
            <div className="text-[11px] font-mono text-amber-400 mt-2">Pending CMS Phase 4</div>
          </div>
        </div>
      </div>
    </div>
  );
}
