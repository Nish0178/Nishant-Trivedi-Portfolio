"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { id: "work", label: "Selected Work", index: "01" },
  { id: "products", label: "Delivered Products", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "stack", label: "Tech Matrix", index: "04" },
  { id: "dsa", label: "DSA & Systems", index: "05" },
  { id: "about", label: "About", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["work", "products", "experience", "stack", "dsa", "about", "contact"];
      const scrollPos = window.scrollY + 200;

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
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070707]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl"
            : "bg-transparent py-4 sm:py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Authentic Brand Banner Logo */}
          <a
            href="#"
            className="flex items-center group focus:outline-none rounded-lg p-1"
            aria-label="Nishant Trivedi home"
          >
            <div className="relative h-8 sm:h-9 w-auto">
              <Image
                src="/images/nt-banner-logo.png"
                alt="Nishant Trivedi — Software Engineer"
                width={210}
                height={70}
                priority
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(213,184,120,0.2)]"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-mono tracking-widest text-[#8A8780]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`transition-all duration-200 hover:text-[#EDE9E1] flex items-center gap-1.5 py-1 ${
                    isActive ? "text-[#D5B878] font-medium" : ""
                  }`}
                >
                  <span className="text-white/30 text-[9px]">{link.index}</span>
                  <span>{link.label.toUpperCase()}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="w-1 h-1 rounded-full bg-[#D5B878]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Rail */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono tracking-wider text-[#A3A09A]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>OPEN TO OPPORTUNITIES</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3.5 py-1.5 rounded-md border border-[#D5B878]/30 bg-[#D5B878]/10 text-[#EDE9E1] hover:bg-[#D5B878]/20 hover:border-[#D5B878] transition-all duration-200"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D5B878]" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg border border-white/10 text-[#EDE9E1] hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-6 xl:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A3A09A]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>OPEN TO OPPORTUNITIES</span>
              </div>
              <span className="text-[11px] font-mono text-white/40">2026 IDENTITY</span>
            </div>

            <nav className="flex flex-col gap-4 font-mono text-sm">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 text-[#C5C2BB] hover:text-[#D5B878] transition-colors border-b border-white/[0.04]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-white/30">{link.index}</span>
                    <span className="tracking-wider">{link.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30" />
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#D5B878] text-[#070707] font-mono text-xs font-semibold tracking-wider hover:bg-[#E5C378] transition-colors"
              >
                LET'S TALK / GET IN TOUCH
              </a>
              <a
                href="mailto:trivedinishant880@gmail.com"
                className="text-center font-mono text-xs text-[#8A8780] hover:text-[#EDE9E1] transition-colors"
              >
                trivedinishant880@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
