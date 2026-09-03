"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MoveDown } from "lucide-react";
import { useRef } from "react";

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-nav">
        <a href="#top" className="brand" aria-label="Nishant Trivedi home">
          NT<span>/</span>
        </a>

        <nav aria-label="Primary navigation">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>

        <a className="availability" href="#contact">
          <span className="status-dot" />
          Open to opportunities
        </a>
      </header>

      <aside className="social-rail" aria-label="Social links">
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} aria-label={label}>
            <Icon size={15} strokeWidth={1.5} />
          </a>
        ))}
      </aside>

      <section id="top" ref={heroRef} className="hero">
        <div className="hero-grid">
          <motion.div className="hero-copy" style={{ y: titleY, opacity: titleOpacity }}>
            <div className="hero-index">PORTFOLIO / 2026</div>
            <p className="hero-kicker">Software Engineer · Builder · Problem Solver</p>
            <h1>
              Nishant
              <br />
              <span>Trivedi</span>
            </h1>
            <div className="hero-bottom">
              <p>
                I build thoughtful digital products and reliable systems —
                from first interaction to production.
              </p>
              <a className="text-link" href="#work">
                Explore selected work <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div className="hero-video-wrap" style={{ y: videoY, scale: videoScale }}>
            <div className="hero-video-frame">
              <video
                className="hero-video"
                src="/video/hero-walking.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Nishant Trivedi walking toward the camera"
              />
              <div className="video-shade" />
              <div className="video-caption">
                <span>NT — 01</span>
                <span>Software Engineer</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-scroll">
          <MoveDown size={15} />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section id="work" className="section work-section">
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="section-main">
          <div className="section-intro">
            <p className="display-copy">Engineering that earns its complexity.</p>
            <p className="body-copy">
              A focused collection of products, systems, experiments, and the
              engineering decisions behind them.
            </p>
          </div>
          <div className="project-placeholder">
            <div>
              <span className="project-number">01</span>
              <span className="project-title">Featured project</span>
            </div>
            <span className="placeholder-note">REAL PROJECT DATA COMING NEXT</span>
            <ArrowUpRight size={20} strokeWidth={1.4} />
          </div>
          <div className="project-placeholder muted-row">
            <div>
              <span className="project-number">02</span>
              <span className="project-title">Second project</span>
            </div>
            <span className="placeholder-note">CASE STUDY</span>
            <ArrowUpRight size={20} strokeWidth={1.4} />
          </div>
        </div>
      </section>

      <section id="about" className="section split-section">
        <SectionLabel number="02">About</SectionLabel>
        <div className="section-main split-main">
          <p className="display-copy">A developer's portfolio should feel like a workspace, not a résumé.</p>
          <p className="body-copy wide-copy">
            This section will become the real story behind Nishant: what he
            builds, how he thinks, what he is learning, and the principles he
            brings to engineering. No filler copy — only verified details.
          </p>
        </div>
      </section>

      <section id="experience" className="section split-section">
        <SectionLabel number="03">Experience</SectionLabel>
        <div className="section-main">
          <p className="display-copy">Trajectory, not a list of job titles.</p>
          <div className="experience-placeholder">
            <span>Experience timeline</span>
            <span>Awaiting verified roles &amp; impact</span>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <SectionLabel number="04">Contact</SectionLabel>
        <div className="section-main contact-main">
          <p className="display-copy">Have something worth building?</p>
          <a className="contact-email" href="mailto:hello@example.com">
            hello@example.com <ArrowUpRight size={25} strokeWidth={1.3} />
          </a>
          <p className="body-copy">Real contact details and form integration will be connected in the next content pass.</p>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Nishant Trivedi</span>
        <span>Designed &amp; engineered with intent.</span>
      </footer>
    </main>
  );
}
