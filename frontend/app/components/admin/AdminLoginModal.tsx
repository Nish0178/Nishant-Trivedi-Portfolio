"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { loginAdmin } from "@/lib/api/admin";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear states when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsLocked(false);
      setLockoutCountdown(null);
    } else {
      setEmail("");
      setPassword("");
      setError(null);
      setIsLocked(false);
      setLockoutCountdown(null);
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    }
  }, [isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading]);

  // Handle 5-second countdown on lockout
  useEffect(() => {
    if (isLocked && lockoutCountdown !== null) {
      if (lockoutCountdown <= 0) {
        handleDismiss();
        return;
      }

      countdownTimerRef.current = setInterval(() => {
        setLockoutCountdown((prev) => {
          if (prev === null || prev <= 1) {
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
              countdownTimerRef.current = null;
            }
            handleDismiss();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
      };
    }
  }, [isLocked, lockoutCountdown]);

  const handleDismiss = () => {
    if (loading) return;
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isLocked) return;

    setError(null);

    if (!email.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(email.trim(), password);

      if (res.success) {
        handleDismiss();
        router.push("/admin");
      } else {
        if (res.locked || res.remainingAttempts === 0) {
          setIsLocked(true);
          setError(
            "Sorry, you have failed 3 login attempts. I think you are not the admin of this profile. Please contact the admin."
          );
          setLockoutCountdown(5);
        } else {
          setError(res.error || "Invalid credentials. Please try again.");
        }
      }
    } catch {
      setError("An unexpected network error occurred while connecting to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
        >
          {/* Backdrop dimming and blur layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#0e111a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
          >
            {/* Ambient subtle glow inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              disabled={loading}
              type="button"
              aria-label="Close Admin Login Modal"
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/[0.04] hover:bg-white/[0.1] transition-all cursor-pointer disabled:opacity-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header / Brand */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                <span>ADMIN ACCESS PORTAL</span>
              </div>
              <h2
                id="admin-modal-title"
                className="text-2xl sm:text-3xl font-serif text-white tracking-tight"
              >
                Administrator Login
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                SECURE AUTHENTICATION · PORTFOLIO CONTROL
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error or Lockout Notification */}
              {error && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-mono flex flex-col space-y-1.5 ${
                    isLocked
                      ? "bg-red-500/15 border border-red-500/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-red-400">{isLocked ? "LOCKOUT:" : "ERR:"}</span>
                    <span className="leading-relaxed">{error}</span>
                  </div>
                  {isLocked && lockoutCountdown !== null && (
                    <div className="text-amber-400 text-[11px] pt-1 border-t border-red-500/20 flex items-center justify-between">
                      <span>Access blocked.</span>
                      <span>Closing in {lockoutCountdown}s...</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-modal-email"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                >
                  ADMINISTRATOR EMAIL <span className="text-amber-500">*</span>
                </label>
                <input
                  id="admin-modal-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@nishanttrivedi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || isLocked}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white placeholder-zinc-500 text-sm font-sans focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-modal-password"
                  className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                >
                  ACCESS PASSWORD <span className="text-amber-500">*</span>
                </label>
                <input
                  id="admin-modal-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || isLocked}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#141824] border border-white/10 text-white placeholder-zinc-500 text-sm font-sans focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isLocked}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-sans font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer mt-5"
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

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <button
                type="button"
                onClick={handleDismiss}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                ← RETURN TO PORTFOLIO
              </button>
              <span className="text-zinc-600">HMAC · SHA256</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
