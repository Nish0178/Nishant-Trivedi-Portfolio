 "use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="hero">
      <motion.div
        className="hero-media"
        style={{ y: mediaY, scale: mediaScale }}
        aria-hidden="true"
      >
        <video
          className="hero-video"
          src="/video/hero-walking.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </motion.div>

      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <p className="kicker">SOFTWARE ENGINEER / BUILDER</p>
        <h1>
          Nishant
          <br />
          <em>Trivedi.</em>
        </h1>
        <p className="hero-sub">
          I design and engineer digital products where thoughtful systems meet
          sharp interfaces.
        </p>
      </motion.div>

      <div className="hero-meta">
        <span>Scroll to explore</span>
        <span className="hero-line" />
        <span>01 — 04</span>
      </div>
    </section>
  );
}
