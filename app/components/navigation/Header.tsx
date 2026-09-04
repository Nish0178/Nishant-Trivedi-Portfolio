"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "products", label: "Products" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "dsa", label: "DSA" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
      setScrolled(currentY > 60);
      
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);

      // Active section detection
      const sections = ["work", "products", "experience", "stack", "dsa", "about", "contact"];
      const scrollPos = currentY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06] py-3"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Full Banner Logo */}
          <a
            href="#"
            className="flex items-center group focus:outline-none rounded-lg"
            aria-label="Nishant Trivedi home"
          >
            <div className="relative h-7 sm:h-8 w-auto">
              <Image
                src="/images/nt-banner-logo.png"
                alt="Nishant Trivedi — Software Engineer"
                width={200}
                height={64}
                priority
                className="h-7 sm:h-8 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all duration-200 rounded-full ${
                    isActive
                      ? "text-[#c9a84c]"
                      : "text-[#6b6862] hover:text-[#f0ece4]"
                  }`}
                >
                  {link.label.toUpperCase()}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[#c9a84c]/[0.08] border border-[#c9a84c]/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Status Badge (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono tracking-wider text-[#6b6862]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>AVAILABLE</span>
            </div>

            {/* Connect CTA (Desktop) */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-4 py-2 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-200"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full border border-white/10 text-[#f0ece4] hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="text-3xl sm:text-4xl font-display font-bold text-[#f0ece4] hover:text-[#c9a84c] transition-colors py-3 border-b border-white/[0.04]"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-12 space-y-4">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 rounded-full bg-[#c9a84c] text-[#050505] font-mono text-xs font-semibold tracking-wider"
              >
                GET IN TOUCH
              </a>
              <p className="text-center font-mono text-xs text-[#6b6862]">
                trivedinishant880@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
