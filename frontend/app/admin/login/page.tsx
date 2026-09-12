"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin, verifyAdminSession } from "@/lib/api/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);

  // If already authenticated, redirect to /admin directly
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await verifyAdminSession();
        if (user) {
          router.replace("/admin");
          return;
        }
      } catch {
        // Not logged in
      } finally {
        setVerifying(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(email.trim(), password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Authentication failed. Please verify credentials.");
      }
    } catch {
      setError("An unexpected network error occurred while connecting to the backend.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-[var(--bg-page,#07080c)] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3 text-sm font-mono text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>INITIALIZING SECURITY PROTOCOLS...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-page,#07080c)] text-[var(--text-primary,#ffffff)] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>RESTRICTED ACCESS · ADMIN CMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight mb-2">
            Nishant Trivedi
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            ENGINEERING PORTFOLIO CONTROL TERMINAL
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0e111a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start space-x-2">
                <span className="font-bold">ERR:</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
              >
                ADMINISTRATOR EMAIL <span className="text-amber-500">*</span>
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@nishanttrivedi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-[#141824] border border-white/10 text-white placeholder-zinc-500 text-sm font-sans focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
              >
                ACCESS PASSWORD <span className="text-amber-500">*</span>
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-[#141824] border border-white/10 text-white placeholder-zinc-500 text-sm font-sans focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-sans font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer mt-6"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                  <span className="font-mono text-xs uppercase tracking-widest">
                    AUTHENTICATING...
                  </span>
                </>
              ) : (
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  AUTHORIZE SESSION →
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <Link
              href="/"
              className="hover:text-amber-400 transition-colors flex items-center space-x-1"
            >
              <span>← RETURN TO PORTFOLIO</span>
            </Link>
            <span className="text-zinc-600">v2.4.0 · BCrypt & JWT</span>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] font-mono text-zinc-400 mt-6">
          Protected route with HMAC-SHA256 bearer tokens. Unauthorized access attempts are monitored and logged.
        </p>
      </div>
    </main>
  );
}
