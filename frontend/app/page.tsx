"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  type: string;
  desc: string;
}

interface SkillItem {
  name: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

interface AchievementItem {
  title: string;
  role: string;
  org: string;
  desc: string;
}

interface CertificateItem {
  title: string;
  issuer: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Jul 2026 — Now",
    company: "Techdock Labs",
    role: "AI Video Editor Intern",
    type: "Internship",
    desc: "Engineering multimodal AI video workflows with Google Veo, Google Flow and Claude prompts; building repeatable prompt frameworks and managing media pipelines on Google Cloud Platform.",
  },
  {
    period: "Jul 2026 — Now",
    company: "Open Source Connect Global",
    role: "Campus Lead & Contributor",
    type: "Leadership",
    desc: "Leading the campus developer chapter, running open-source onboarding workshops and mentoring 50+ students on Git workflows; submitting pull requests and documentation fixes to community repositories.",
  },
  {
    period: "Nov 2025 — Aug 2026",
    company: "Astrospacious",
    role: "Web Development Intern",
    type: "Internship",
    desc: "Built responsive interface modules in semantic HTML5, CSS3 and JavaScript, integrated backend REST endpoints with structured error fallbacks, and delivered feature tickets in agile sprints.",
  },
  {
    period: "Jan — Apr 2026",
    company: "StaxTech",
    role: "Full-Stack Developer Intern",
    type: "Internship",
    desc: "Engineered Node.js / Express REST microservices with JWT authentication and middleware guards, built indexed MongoDB schemas, and validated API contracts with Postman.",
  },
  {
    period: "Jan — Apr 2026",
    company: "Techkriti, IIT Kanpur",
    role: "Campus Ambassador",
    type: "Leadership",
    desc: "Represented IIT Kanpur’s annual technical festival on campus, driving competition and hackathon participation and coordinating delegate registrations.",
  },
  {
    period: "Nov 2025 — Feb 2026",
    company: "IIT Guwahati",
    role: "Campus Ambassador",
    type: "Leadership",
    desc: "Led technical promotion and student engagement for collegiate events, and ran workshops on algorithmic problem-solving and software engineering awareness.",
  },
];

const SKILL_LAYERS: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Java", desc: "Primary OOP, backend services, algorithms" },
      { name: "JavaScript", desc: "Modern async web, ES6+" },
      { name: "TypeScript", desc: "Type-safe contracts and interfaces" },
      { name: "C++", desc: "Systems foundations, problem solving" },
      { name: "C", desc: "Low-level memory foundations" },
      { name: "Python", desc: "Scripting, automation, AI integration" },
      { name: "SQL", desc: "Relational queries, schema normalization" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", desc: "Component architecture, responsive interfaces" },
      { name: "Next.js", desc: "App Router, SSR/SSG, server and client components" },
      { name: "React Native", desc: "Cross-platform mobile for iOS and Android" },
      { name: "Tailwind CSS", desc: "Utility-first design tokens" },
      { name: "Chart.js", desc: "Telemetry and velocity charts" },
      { name: "HTML5 & CSS3", desc: "Semantic structure, custom properties, responsive layout" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", desc: "High-concurrency async runtime" },
      { name: "Express.js", desc: "REST microservices, routing and middleware" },
      { name: "Spring Boot", desc: "Java 21 REST controllers, JPA persistence, Spring Security" },
      { name: "REST APIs", desc: "Stateless resources, defensive error handling" },
      { name: "JWT", desc: "Token-based stateless auth and route guards" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "MongoDB", desc: "Document NoSQL, aggregation, compound indexing" },
      { name: "PostgreSQL", desc: "Relational integrity, foreign keys, ACID" },
      { name: "MySQL", desc: "Structured queries, ACID compliance" },
      { name: "SQLite", desc: "Embedded storage, fast prototyping" },
      { name: "Prisma", desc: "Type-safe client and migrations" },
    ],
  },
  {
    category: "Cloud & tools",
    skills: [
      { name: "Git & GitHub", desc: "Branching strategy, PR code reviews" },
      { name: "Render", desc: "Continuous deployment" },
      { name: "GCP", desc: "Media asset storage and cloud services" },
      { name: "Postman", desc: "API debugging and contract testing" },
    ],
  },
  {
    category: "AI",
    skills: [
      { name: "Gemini 2.5 Flash", desc: "Structured JSON output, fast inference" },
      { name: "Claude", desc: "Prompt chaining, architectural analysis" },
      { name: "OpenAI GPT", desc: "Synthetic twin simulation and analysis" },
      { name: "Cursor · Antigravity · n8n", desc: "AI tooling for accelerated engineering" },
    ],
  },
  {
    category: "Fundamentals",
    skills: [
      { name: "DSA", desc: "Trees, graphs, DP, sliding window, monotonic stacks" },
      { name: "OOP", desc: "Encapsulation, polymorphism, design patterns" },
      { name: "DBMS", desc: "Indexing, transactions, normalization" },
      { name: "Operating systems", desc: "Scheduling, concurrency, memory management" },
    ],
  },
];

const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "QBX Arena Hackathon 2026",
    role: "Top 10 Runner-Up",
    org: "GGES University, Unnao",
    desc: "Recognised for engineering LaunchPilot AI, an AI-powered startup validation and simulation platform.",
  },
  {
    title: "Open Source Connect Global",
    role: "Campus Lead",
    org: "2026",
    desc: "Spearheaded a campus open-source initiative with onboarding workshops and mentoring for 50+ developers.",
  },
  {
    title: "Elite Coders Winter of Code",
    role: "Official Contributor",
    org: "2026",
    desc: "Contributed code patches, algorithmic implementations and documentation to active open-source repositories.",
  },
  {
    title: "Algorithmic problem solving",
    role: "400+ solved · 1415 rating",
    org: "LeetCode",
    desc: "Sustained rigor across core data structures and algorithms in Java; 50 Days Badge 2026.",
  },
];

const CERTIFICATIONS: CertificateItem[] = [
  { title: "Oracle Cloud Infrastructure AI Foundations Associate", issuer: "Oracle" },
  { title: "Java (Basic) Skills Assessment", issuer: "HackerRank" },
  { title: "Software Engineer Intern Certificate", issuer: "HackerRank" },
  { title: "Data Analysis / Business Intelligence", issuer: "Microsoft / LinkedIn" },
  { title: "Web Development with HTML, CSS & JavaScript", issuer: "Simplilearn" },
  { title: "Front-End Development Foundations", issuer: "DevTown" },
  { title: "Google Developers Community Member", issuer: "Google" },
  { title: "Microsoft Student Chapter Member", issuer: "Microsoft" },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [copiedStatus, setCopiedStatus] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Toggle video playback
  const toggleVideo = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPaused(false);
    } else {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  }, []);

  // Toggle menu overlay
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Copy email
  const copyEmail = useCallback(async () => {
    const text = "trivedinishant880@gmail.com";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const range = document.createRange();
      const mailElem = document.getElementById("mail");
      if (mailElem) {
        range.selectNode(mailElem);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
    setCopiedStatus("Copied");
    setTimeout(() => setCopiedStatus(""), 2200);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("js");

    // Reduced motion handling
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }

    // Escape key listener for menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Scroll reveal IntersectionObserver
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => revealObserver.observe(el));

    // Section highlight in navbar IntersectionObserver
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll(".links a").forEach((a) => {
              a.classList.toggle("on", a.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section, #contact").forEach((s) => sectionObserver.observe(s));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [isMenuOpen, closeMenu]);

  // Skill readout text
  const currentReadout = hoveredSkill || selectedSkill;

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>

      {/* Navbar */}
      <header className="bar">
        <a href="#top" className="lg" aria-label="Nishant Trivedi — top">
          N·T<i>Nishant Trivedi</i>
        </a>
        <nav className="links mono" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#achievements">Achievements</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="adm mono" href="/admin" title="Open the admin page" aria-label="Open admin page">
          Admin ↗
        </a>
        <button
          id="idx-b"
          ref={menuButtonRef}
          className="mono"
          aria-expanded={isMenuOpen}
          aria-controls="idx"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Fullscreen Mobile Index Menu */}
      <nav id="idx" className={isMenuOpen ? "on" : ""} aria-label="Sections">
        <a href="#about" onClick={closeMenu}>
          <span>01</span>About
        </a>
        <a href="#work" onClick={closeMenu}>
          <span>02</span>Work
        </a>
        <a href="#experience" onClick={closeMenu}>
          <span>03</span>Experience
        </a>
        <a href="#skills" onClick={closeMenu}>
          <span>04</span>Skills
        </a>
        <a href="#achievements" onClick={closeMenu}>
          <span>05</span>Achievements
        </a>
        <a href="#contact" onClick={closeMenu}>
          <span>06</span>Contact
        </a>
        <a className="ad" href="/admin" onClick={closeMenu}>
          <span>↗</span>Admin
        </a>
      </nav>

      {/* Main Content */}
      <main id="top">
        {/* HERO */}
        <section className="hero" aria-labelledby="h1">
          <div className="stage">
            <div className="plate">
              <video
                id="pv-v"
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/hero-poster.jpg"
                aria-label="Nishant Trivedi stands up from an office chair and walks toward the camera"
              >
                <source src="/assets/hero-walking.mp4" type="video/mp4" />
              </video>
            </div>
            <button id="pv" aria-pressed={isVideoPaused} onClick={toggleVideo}>
              {isVideoPaused ? "Play" : "Pause"}
            </button>
            <h1 id="h1" className="name">
              <span>Nishant</span>
              <span>Trivedi</span>
            </h1>
          </div>

          <div className="lede">
            <p className="serif">
              Software engineer building products, systems and AI-powered experiences across the full stack.
            </p>
            <p className="mono">
              Full-Stack Developer
              <br />
              Software Engineer
              <br />
              <span className="mute">B.Tech CSE · AKTU · 2024–2028</span>
            </p>
            <p style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
              <a className="btn f" href="#work">
                See the work ↓
              </a>
              <a className="btn" href="#contact">
                Contact
              </a>
            </p>
          </div>

          <div className="mq" aria-hidden="true">
            <div className="mono">
              <span>Full-Stack</span>
              <span>★</span>
              <span>Systems</span>
              <span>★</span>
              <span>AI Workflows</span>
              <span>★</span>
              <span>Java</span>
              <span>★</span>
              <span>Next.js</span>
              <span>★</span>
              <span>Node.js</span>
              <span>★</span>
              <span>Spring Boot</span>
              <span>★</span>
              <span>Full-Stack</span>
              <span>★</span>
              <span>Systems</span>
              <span>★</span>
              <span>AI Workflows</span>
              <span>★</span>
              <span>Java</span>
              <span>★</span>
              <span>Next.js</span>
              <span>★</span>
              <span>Node.js</span>
              <span>★</span>
              <span>Spring Boot</span>
              <span>★</span>
            </div>
          </div>
        </section>

        {/* 01: ABOUT */}
        <section id="about" aria-labelledby="ab">
          <div className="h mono">
            <span>01 — About</span>
            <span className="mute">The person</span>
          </div>
          <div className="about">
            <div className="plate rv">
              <img
                src="/assets/about-portrait.jpg"
                alt="Nishant Trivedi seated in an office chair, wearing a grey blazer and navy trousers"
                loading="lazy"
              />
            </div>
            <div className="rv">
              <h2 id="ab" className="big">
                Builder, <em>not just</em> coder
              </h2>
              <p className="serif">
                I work across frontend architecture, backend microservices, generative AI workflows and relational
                databases — with meticulous attention to detail.
              </p>
              <dl>
                <dt className="mono">Role</dt>
                <dd>Software Engineer — Full-Stack · Systems · AI Workflows</dd>
                <dt className="mono">Based</dt>
                <dd>Lucknow, Uttar Pradesh, India</dd>
                <dt className="mono">Studying</dt>
                <dd>B.Tech Computer Science &amp; Engineering, AKTU Lucknow (Jul 2024 – Sep 2028)</dd>
                <dt className="mono">Now</dt>
                <dd>AI video workflows at Techdock Labs · Campus Lead at Open Source Connect Global</dd>
                <dt className="mono">Strong in</dt>
                <dd>API development, distributed systems, algorithmic problem solving</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 02: WORK */}
        <section id="work" aria-labelledby="wk">
          <div className="h mono">
            <span>02 — Work</span>
            <span className="mute">3 projects · open any row</span>
          </div>
          <h2 id="wk" className="big rv">
            What I <em>built</em>
          </h2>
          <div className="rv">
            {/* Project 01 */}
            <details open {...({ name: "p" } as React.HTMLAttributes<HTMLDetailsElement>)}>
              <summary>
                <span className="n">01</span>
                <span className="t">
                  LaunchPilot AI<small>Full-stack AI platform</small>
                </span>
                <span className="tag mono">Top 10 · QBX Arena 2026</span>
              </summary>
              <div className="pn">
                <h3>Built</h3>
                <div>
                  <p>
                    A production-ready startup validation engine: it analyses market feasibility, builds multi-angle SWOT
                    assessments, challenges unit economics through synthetic digital-twin co-founders, and outputs
                    structured investor dossiers.
                  </p>
                  <h3>Why it matters</h3>
                  <p className="serif">
                    Deterministic, schema-checked AI output — an idea becomes an investor-readiness report, not a chat
                    transcript.
                  </p>
                </div>
                <div>
                  <h3>Role</h3>
                  <p>Engineer — full-stack build</p>
                  <h3>Technology</h3>
                  <p>
                    Next.js 15, TypeScript, Node.js, Express.js, Prisma ORM, SQLite, Gemini 2.5 Flash, Clerk Auth,
                    Tailwind CSS, Render
                  </p>
                  <h3>Result</h3>
                  <p>Top 10 Runner-Up, QBX Arena Hackathon 2026</p>
                  <p className="lk">
                    <a href="https://launch-pilot-eta.vercel.app" target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                    <a href="https://github.com/Nish0178/Launch-pilot" target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  </p>
                </div>
                <div className="flow">
                  <div>
                    <b>01</b>Constraint ingestion — typed schemas for industry, ICP, monetization, competitors
                  </div>
                  <div>
                    <b>02</b>Multi-pass prompt chaining — market viability, gap models, SWOT
                  </div>
                  <div>
                    <b>03</b>Synthetic co-founder — CAC/LTV, regulatory risk, defensibility
                  </div>
                  <div>
                    <b>04</b>Dossier persistence — versioned reports via Prisma
                  </div>
                </div>
              </div>
            </details>

            {/* Project 02 */}
            <details {...({ name: "p" } as React.HTMLAttributes<HTMLDetailsElement>)}>
              <summary>
                <span className="n">02</span>
                <span className="t">
                  TodoPro Engine<small>Full-stack task &amp; productivity system</small>
                </span>
                <span className="tag mono">Deployed · Render</span>
              </summary>
              <div className="pn">
                <h3>Built</h3>
                <div>
                  <p>
                    A task-management engine with stateless JWT authentication, bcrypt-hashed credentials,
                    compound-indexed MongoDB collections, productivity telemetry in Chart.js, and client-side PDF and
                    CSV export.
                  </p>
                  <h3>Why it matters</h3>
                  <p className="serif">Auth, indexed queries and velocity charts working as one deployed system.</p>
                </div>
                <div>
                  <h3>Role</h3>
                  <p>Architect and deployer</p>
                  <h3>Technology</h3>
                  <p>Node.js, Express.js, MongoDB, Mongoose, JWT, Chart.js, jsPDF, Vanilla JavaScript, Render</p>
                  <h3>Result</h3>
                  <p>Live in production on Render Cloud</p>
                  <p className="lk">
                    <a href="https://todo-pro-web-frontend.onrender.com" target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                    <a href="https://github.com/Nish0178/todo-pro-web" target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  </p>
                </div>
              </div>
            </details>

            {/* Project 03 */}
            <details {...({ name: "p" } as React.HTMLAttributes<HTMLDetailsElement>)}>
              <summary>
                <span className="n">03</span>
                <span className="t">
                  Astrospacious<small>Commercial web platform delivery</small>
                </span>
                <span className="tag mono">Intern · Nov 25 – Aug 26</span>
              </summary>
              <div className="pn">
                <h3>Built</h3>
                <div>
                  <p>
                    Responsive commercial interface modules across mobile, tablet and desktop, wired to Node.js REST
                    endpoints with defensive error handling, plus an audit of client scripts to cut layout repaints.
                  </p>
                  <h3>Why it matters</h3>
                  <p className="serif">
                    Production web work, shipped inside an agile squad with pull requests and peer review.
                  </p>
                </div>
                <div>
                  <h3>Role</h3>
                  <p>Web Development Intern</p>
                  <h3>Technology</h3>
                  <p>HTML5, CSS3, JavaScript (ES6+), Node.js, REST APIs, Git flow</p>
                  <h3>Result</h3>
                  <p>Faster, more consistent rendering across devices</p>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* 03: EXPERIENCE */}
        <section id="experience" aria-labelledby="xp">
          <div className="h mono">
            <span>03 — Experience</span>
            <span className="mute">Career index · newest first</span>
          </div>
          <h2 id="xp" className="big rv">
            Where I’ve <em>worked</em>
          </h2>
          <div id="ex" className="rv">
            {EXPERIENCES.map((x, i) => (
              <details key={i} className="ex-r">
                <summary>
                  <span className="mono">{x.period}</span>
                  <h3>
                    {x.company}
                    <small>{x.role}</small>
                  </h3>
                  <span className="mono mute">{x.type}</span>
                </summary>
                <p>{x.desc}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 04: SKILLS */}
        <section id="skills" aria-labelledby="sk">
          <div className="h mono">
            <span>04 — Skills</span>
            <span className="mute">Seven layers · tap a name</span>
          </div>
          <h2 id="sk" className="big rv">
            The <em>stack</em>
          </h2>
          <div id="lay" className="rv">
            {SKILL_LAYERS.map((layer, li) => (
              <div key={li} className="lay">
                <span className="mono mute">{layer.category}</span>
                <ul>
                  {layer.skills.map((skill, si) => {
                    const isPressed = selectedSkill?.name === skill.name;
                    return (
                      <li key={si}>
                        <button
                          type="button"
                          aria-pressed={isPressed}
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {skill.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p id="ro" className="mono" aria-live="polite">
            <b>{currentReadout ? currentReadout.name : "Readout"}</b>
            {currentReadout ? currentReadout.desc : "Select any technology to see what I use it for."}
          </p>
        </section>

        {/* 05: ACHIEVEMENTS */}
        <section id="achievements" aria-labelledby="ac">
          <div className="h mono">
            <span>05 — Achievements</span>
            <span className="mute">Archive</span>
          </div>
          <h2 id="ac" className="big rv">
            On the <em>record</em>
          </h2>
          <div className="nums rv">
            <div>
              <b>400+</b>
              <span className="mono mute">LeetCode problems solved</span>
            </div>
            <div>
              <b>1415</b>
              <span className="mono mute">LeetCode contest rating</span>
            </div>
            <div>
              <b>Top 10</b>
              <span className="mono mute">QBX Arena Hackathon 2026</span>
            </div>
            <div>
              <b>50+</b>
              <span className="mono mute">Students mentored on Git</span>
            </div>
          </div>

          <div id="ar" className="rv">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="ar">
                <span className="mono mute">{`0${i + 1}`}</span>
                <h3>{a.title}</h3>
                <p className="mono">
                  {a.role}
                  <br />
                  <span className="mute">{a.org}</span>
                </p>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>

          <ul className="certs rv" id="certs" aria-label="Certifications">
            {CERTIFICATIONS.map((c, i) => (
              <li key={i}>
                {c.title}
                <br />
                <span className="mono mute">{c.issuer} · Verified</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 06: CONTACT */}
      <div className="dk" id="contact">
        <section aria-labelledby="ct" style={{ paddingBottom: 0 }}>
          <div className="h mono">
            <span>06 — Contact</span>
            <span className="mute">Open to opportunities</span>
          </div>
          <h2 id="ct" className="lb rv">
            Let’s <em>build</em>
          </h2>
          <a className="em rv" id="mail" href="mailto:trivedinishant880@gmail.com?subject=Hello%20Nishant">
            trivedinishant880@gmail.com
          </a>
          <div className="row">
            <a className="btn f" href="mailto:trivedinishant880@gmail.com?subject=Hello%20Nishant">
              Write an email →
            </a>
            <button className="btn" id="cp" type="button" onClick={copyEmail}>
              Copy address
            </button>
            <span id="cps" className="mono mute" role="status">
              {copiedStatus}
            </span>
          </div>
          <img className="sig" src="/assets/signature.png" alt="Nishant Trivedi signature" loading="lazy" />
          <footer>
            <div>
              <b className="mono">Nishant Trivedi</b>
              <p className="mono mute">
                Full-Stack Developer · Software Engineer
                <br />
                © 2026 · Lucknow, India
              </p>
            </div>
            <nav aria-label="Social links" className="mono">
              <a href="https://github.com/Nish0178" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nishant-trivedi-363ba3249"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="https://leetcode.com/u/Nishant_trivedi01111/" target="_blank" rel="noopener noreferrer">
                LeetCode
              </a>
              <a href="https://www.hackerrank.com/profile/trivedinishant81" target="_blank" rel="noopener noreferrer">
                HackerRank
              </a>
              <a href="https://www.instagram.com/nishant_trivedi.2111/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="mailto:trivedinishant880@gmail.com">Email</a>
            </nav>
          </footer>
        </section>
      </div>
    </>
  );
}