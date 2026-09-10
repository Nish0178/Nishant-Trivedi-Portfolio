"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroV2() {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const videoX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const videoY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="hero-v2">
      <div className="hero-v2__grid" />
      <div className="hero-v2__noise" />

      <header className="hero-nav">
        <a href="/" className="hero-logo" aria-label="Nishant Trivedi home">
          NT<span>/</span>
        </a>

        <nav className="hero-nav__links">
          <a href="#work">
            <span>01</span> WORK
          </a>
          <a href="#about">
            <span>02</span> ABOUT
          </a>
          <a href="#experience">
            <span>03</span> EXPERIENCE
          </a>
          <a href="#contact">
            <span>04</span> CONTACT
          </a>
        </nav>

        <div className="hero-availability">
          <i />
          OPEN TO OPPORTUNITIES
        </div>
      </header>

      <div className="hero-v2__content">
        <motion.div
          className="hero-v2__copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-kicker">
            <span>PORTFOLIO</span>
            <span>/</span>
            <span>2026</span>
          </div>

          <p className="hero-role">
            SOFTWARE ENGINEER
            <span>·</span>
            FULL-STACK DEVELOPER
            <span>·</span>
            BUILDER
          </p>

          <h1>
            <span>Nishant</span>
            <em>Trivedi</em>
          </h1>

          <p className="hero-description">
            I build thoughtful digital products and reliable systems —
            from first interaction to production.
          </p>

          <a href="#work" className="hero-cta">
            <span>EXPLORE SELECTED WORK</span>
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </a>
        </motion.div>

        <motion.div
          className="hero-v2__media"
          style={{
            x: videoX,
            y: videoY,
          }}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hero-media-frame">
            <video
              src="/video/hero-walking.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="hero-media-overlay" />

            <div className="hero-media-label">
              <span>NT — 001</span>
              <span>SOFTWARE / HUMAN</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-v2__footer">
        <div className="hero-socials">
          <a href="#" aria-label="GitHub">
            GH
          </a>
          <a href="#" aria-label="LinkedIn">
            IN
          </a>
          <a href="mailto:trivedinishant880@gmail.com" aria-label="Email">
            @
          </a>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight size={17} strokeWidth={1.5} />
        </div>

        <div className="hero-location">
          LUCKNOW, INDIA
          <span>GMT +5:30</span>
        </div>
      </div>
    </section>
  );
}