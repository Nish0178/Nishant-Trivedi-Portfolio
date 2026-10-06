"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/app/context/ThemeContext";
import AdminLoginModal from "@/app/components/admin/AdminLoginModal";
import { Volume2, VolumeX, Shield, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracker
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMediaPlayback = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      // Toggle video in hero
      const heroVideo = document.querySelector("video") as HTMLVideoElement | null;
      if (heroVideo) {
        if (next) heroVideo.play().catch(() => {});
        else heroVideo.pause();
      }
      return next;
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#F6F4EE]/85 dark:bg-[#101114]/85 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram + Full Name */}
          <Link
            href="/"
            className="group flex items-center gap-3 select-none"
            aria-label="Nishant Trivedi"
          >
            <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs font-semibold tracking-wider font-mono shadow-sm group-hover:scale-105 transition-transform">
              NT
            </div>
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
              Nishant Trivedi
            </span>
          </Link>

          {/* Desktop Floating Pill Navigation */}
          <nav className="hidden lg:flex items-center bg-[#ECE8DF]/90 dark:bg-[#1C1E24]/90 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] rounded-full p-1 shadow-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Media Toggle, Theme, Admin Access, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Play/Pause circular button as seen in reference frame */}
            <button
              type="button"
              onClick={toggleMediaPlayback}
              title={isPlaying ? "Pause video/audio" : "Play video/audio"}
              className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <span className="text-[11px] font-mono leading-none tracking-tighter">⏸</span>
              ) : (
                <span className="text-[11px] font-mono leading-none pl-0.5">▶</span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title="Toggle theme"
              className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Admin Portal Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              title="Admin Portal Access"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all cursor-pointer"
            >
              <Shield className="w-3 h-3 text-neutral-500" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-200 flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-[#F6F4EE] dark:bg-[#101114] border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-5 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 border-b border-black/[0.04] dark:border-white/[0.04] hover:text-black dark:hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="flex items-center justify-between py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mt-1"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    Admin Portal
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Bottom-Left Monogram Badge as seen in reference frame */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex">
        <Link
          href="#top"
          className="w-9 h-9 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shadow-md border border-neutral-300 dark:border-neutral-700 hover:scale-110 active:scale-95 transition-all"
          title="Scroll to Top"
        >
          N
        </Link>
      </div>

      {/* Admin Login Modal (Preserved exactly) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
