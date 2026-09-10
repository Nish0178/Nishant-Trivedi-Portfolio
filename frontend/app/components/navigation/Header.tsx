"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/app/context/ThemeContext";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-[#07080c]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3 sm:py-3.5"
            : "bg-white/90 backdrop-blur-md border-b border-black/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.06)] py-3 sm:py-3.5"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo - Dynamically switches between dark and light versions */}
        <Link
          href="/"
          className="group flex items-center transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Nishant Trivedi - Full Stack Developer"
        >
          <div className="relative h-7 sm:h-8 md:h-8.5 w-[180px] sm:w-[210px] flex items-center">
            {isDark ? (
              <Image
                src="/images/navbar-logo-dark.png"
                alt="Nishant Trivedi"
                width={200}
                height={35}
                priority
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain brightness-105 group-hover:brightness-125 transition-all duration-300"
              />
            ) : (
              <Image
                src="/images/navbar-logo-light.png"
                alt="Nishant Trivedi"
                width={200}
                height={35}
                priority
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain group-hover:brightness-110 transition-all duration-300"
              />
            )}
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs font-bold tracking-[0.22em] transition-colors duration-200 relative group py-1 uppercase ${
                isDark
                  ? "text-slate-300 hover:text-amber-400"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                  isDark ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-amber-600 shadow-[0_0_6px_#d97706]"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right Controls: Theme Toggle, CTA, & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
            title={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
            className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
              isDark
                ? "bg-white/[0.06] hover:bg-white/[0.12] text-amber-400 border border-white/10 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                : "bg-slate-100 hover:bg-slate-200 text-amber-600 border border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  {/* Sun Icon */}
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  {/* Moon Icon */}
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Let's Talk CTA */}
          <Link
            href="#contact"
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 ${
              isDark
                ? "text-amber-300 bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]"
                : "text-amber-700 bg-amber-50 border border-amber-500/30 hover:bg-amber-100 hover:border-amber-500 hover:text-amber-800 shadow-[0_2px_12px_rgba(217,119,6,0.12)]"
            }`}
          >
            <span>LET&apos;S TALK</span>
            <span className="text-sm">↗</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus:outline-none transition-colors ${
              isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-black"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  isDark ? "bg-white" : "bg-slate-900"
                } ${mobileMenuOpen ? "rotate-45 translate-y-1.5 bg-amber-500" : ""}`}
              />
              <span
                className={`w-full h-0.5 transition-opacity duration-300 ${
                  isDark ? "bg-white" : "bg-slate-900"
                } ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  isDark ? "bg-white" : "bg-slate-900"
                } ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5 bg-amber-500" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b px-6 py-6 backdrop-blur-xl ${
              isDark
                ? "bg-[#07080c]/98 border-white/10"
                : "bg-white/98 border-black/10 shadow-lg"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-mono tracking-widest py-2 border-b transition-colors ${
                    isDark
                      ? "text-slate-300 hover:text-amber-400 border-white/5"
                      : "text-slate-800 hover:text-amber-600 border-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center justify-between pt-2">
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Theme: {theme.toUpperCase()}
                </span>
                <button
                  onClick={toggleTheme}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 ${
                    isDark
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                      : "bg-amber-100 text-amber-800 border border-amber-500/30"
                  }`}
                >
                  Switch to {isDark ? "Light" : "Dark"}
                </button>
              </div>

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2.5 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                LET&apos;S TALK ↗
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
