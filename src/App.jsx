import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const PROJECTS = [
  {
    id: 1,
    title: "ATS-Friendly Resume Checker",
    category: "Full-Stack Web App",
    badge: "React • Node.js • AWS EC2",
    description:
      "Automated resume parsing and ATS compatibility scoring platform engineered to help job seekers optimize keyword density, formatting, and structure.",
    liveUrl: "https://apexfast.ooguy.com",
    repoUrl: "https://github.com",
    accent: "#00b4d8",
  },
  {
    id: 2,
    title: "iClub UWU Official Portal",
    category: "Interactive Web Experience",
    badge: "React • GSAP • Canvas 2D",
    description:
      "Immersive horizontal-scroll timeline and glassmorphic community portal built for the ICT Society of Uva Wellassa University.",
    liveUrl: "#projects",
    repoUrl: "https://github.com",
    accent: "#38bdf8",
  },
  {
    id: 3,
    title: "3D Digital Assets & Environments",
    category: "3D Modeling & CG Design",
    badge: "CGTrader • 3D Web Graphics",
    description:
      "Commercial game-ready 3D models, hard-surface assets, and high-contrast promotional visual renders published on CGTrader since 2019.",
    liveUrl: "https://www.cgtrader.com",
    repoUrl: "#projects",
    accent: "#6366f1",
  },
  {
    id: 4,
    title: "Custom Roleplay Server Architecture",
    category: "Game Server & Scripting",
    badge: "Lua • Linux VPS • Networking",
    description:
      "Custom economy systems, character creation UIs, anti-cheat modules, and low-latency VPS proxy routing for multiplayer gaming servers.",
    liveUrl: "#projects",
    repoUrl: "https://github.com",
    accent: "#10b981",
  },
];

const SKILL_GROUPS = [
  {
    title: "Frontend & UI Engineering",
    tag: "CLIENT ARCHITECTURE",
    skills: ["React.js", "Vite", "Tailwind CSS", "GSAP Animations", "HTML5 / CSS3", "JavaScript (ES6+)", "Glassmorphism UI"],
  },
  {
    title: "Backend, Cloud & DevOps",
    tag: "SERVER & INFRASTRUCTURE",
    skills: ["Node.js", "Python", "C / C++", "Linux Administration", "AWS EC2", "Oracle Cloud ARM", "Nginx & PM2"],
  },
  {
    title: "3D Design & Creative Tech",
    tag: "DIGITAL MEDIA & SCRIPTING",
    skills: ["3D Digital Modeling", "CGTrader Asset Creation", "Lua Scripting", "WebRTC / WebSockets", "Git & GitHub", "ATS Optimization"],
  },
];

const TIMELINE = [
  {
    year: "2025 — PRESENT",
    role: "BSc in Information & Communication Technology",
    org: "Uva Wellassa University of Sri Lanka",
    desc: "Undergraduate at the Faculty of Technological Studies, focusing on software engineering, web architecture, and active leadership in university tech initiatives.",
  },
  {
    year: "2023 — PRESENT",
    role: "Full-Stack & ATS Web Application Developer",
    org: "Independent / Freelance Developer",
    desc: "Designing and deploying high-performance React web apps, ATS-compliant tools, and cloud-hosted solutions on AWS and Oracle VPS instances.",
  },
  {
    year: "2019 — PRESENT",
    role: "3D Digital Modeler & Graphic Designer",
    org: "CGTrader (@ISHANTHILINA678) & Digital Media",
    desc: "Creating detailed 3D digital models, visual brand identities, and high-contrast motion graphics for global clients and digital marketplaces.",
  },
];

export default function App() {
  const canvasRef = useRef(null);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.2 - Math.random() * 0.4,
      alpha: 0.2 + Math.random() * 0.55,
      isCyan: i % 2 === 0,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        20,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.55
      );
      grad.addColorStop(0, "rgba(0, 180, 216, 0.14)");
      grad.addColorStop(0.5, "rgba(13, 74, 117, 0.06)");
      grad.addColorStop(1, "rgba(2, 11, 22, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isCyan
          ? `rgba(56, 189, 248, ${p.alpha})`
          : `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pf-wrapper">
      <canvas ref={canvasRef} className="pf-bg-canvas" aria-hidden="true" />

      {/* Floating Glass Navbar */}
      <header className="pf-navbar-wrap">
        <nav className="pf-navbar">
          <div className="pf-brand" onClick={() => scrollToSection("home")}>
            <span className="pf-brand-dot"></span>
            <span className="pf-brand-text">
              ISHAN <em>THILINA</em>
            </span>
          </div>

          <div className="pf-nav-links">
            {["home", "skills", "projects", "journey", "contact"].map((item) => (
              <button
                key={item}
                type="button"
                className={`pf-nav-btn ${activeNav === item ? "active" : ""}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <a
            href="https://apexfast.ooguy.com"
            target="_blank"
            rel="noreferrer"
            className="pf-cta-pill"
          >
            Live Portal &#8599;
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pf-hero">
        <div className="pf-container pf-hero-grid">
          <div className="pf-hero-left">
            <div className="pf-badge-pill">
              <span className="pf-pulse-dot"></span>
              <span>AVAILABLE FOR FREELANCE & COLLABORATIONS</span>
            </div>

            <h1 className="pf-hero-title">
              Engineering <span className="pf-gradient-text">ATS-Friendly</span>{" "}
              Web Apps & Immersive Digital Worlds.
            </h1>

            <p className="pf-hero-desc">
              Hi, I’m <strong>Ishan Thilina</strong> — an Information &
              Communication Technology undergraduate at{" "}
              <strong>Uva Wellassa University</strong>, Full-Stack Web Developer,
              and 3D Digital Artist crafting high-contrast interfaces and
              scalable cloud deployments.
            </p>

            <div className="pf-hero-actions">
              <button
                type="button"
                className="pf-btn pf-btn-primary"
                onClick={() => scrollToSection("projects")}
              >
                Explore Featured Work &#8594;
              </button>
              <button
                type="button"
                className="pf-btn pf-btn-glass"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </button>
            </div>

            <div className="pf-stats-row">
              <div className="pf-stat-card">
                <strong>5+ Yrs</strong>
                <span>3D & Digital Design</span>
              </div>
              <div className="pf-stat-card">
                <strong>Full-Stack</strong>
                <span>React • Node • Cloud</span>
              </div>
              <div className="pf-stat-card">
                <strong>BSc ICT</strong>
                <span>UWU Sri Lanka</span>
              </div>
            </div>
          </div>

          <div className="pf-hero-right">
            <div className="pf-profile-holo-card">
              <div className="pf-holo-top">
                <span className="pf-holo-tag">DEVELOPER PROFILE</span>
                <span className="pf-holo-status">● ONLINE</span>
              </div>

              <div className="pf-code-window">
                <div className="pf-code-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <pre className="pf-code-block">
{`const developer = {
  name: "Ishan Thilina",
  role: "ATS-Friendly Web Developer",
  university: "Uva Wellassa University",
  stack: ["React", "Node.js", "Tailwind", "Python"],
  cloud: ["AWS EC2", "Oracle ARM", "Nginx"],
  creative: "3D Modeler @CGTrader",
  website: "apexfast.ooguy.com"
};`}
                </pre>
              </div>

              <div className="pf-holo-footer">
                <div>
                  <span>PRIMARY FOCUS</span>
                  <strong>Web UI • Cloud VPS • 3D Assets</strong>
                </div>
                <a
                  href="https://apexfast.ooguy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-holo-link"
                >
                  Visit Site &#8599;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tech Arsenal Section */}
      <section id="skills" className="pf-section">
        <div className="pf-container">
          <div className="pf-section-header">
            <div>
              <div className="pf-badge-pill">
                <span className="pf-pulse-dot"></span> TECHNICAL ARSENAL
              </div>
              <h2 className="pf-section-title">Skills & Architecture</h2>
            </div>
            <div className="pf-watermark">
              <span className="pf-wm-outline">Core</span>
              <span className="pf-wm-solid">Stack</span>
            </div>
          </div>

          <div className="pf-skills-grid">
            {SKILL_GROUPS.map((group, idx) => (
              <div key={idx} className="pf-glass-card pf-skill-card">
                <span className="pf-card-tag">{group.tag}</span>
                <h3>{group.title}</h3>
                <div className="pf-skill-pills">
                  {group.skills.map((sk, sIdx) => (
                    <span key={sIdx} className="pf-skill-chip">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Bento Grid */}
      <section id="projects" className="pf-section">
        <div className="pf-container">
          <div className="pf-section-header">
            <div>
              <div className="pf-badge-pill">
                <span className="pf-pulse-dot"></span> SELECTED WORKS
              </div>
              <h2 className="pf-section-title">Featured Projects</h2>
            </div>
            <div className="pf-watermark">
              <span className="pf-wm-outline">Built</span>
              <span className="pf-wm-solid">Works</span>
            </div>
          </div>

          <div className="pf-projects-grid">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="pf-glass-card pf-project-card"
                style={{ "--proj-accent": proj.accent }}
              >
                <div className="pf-proj-top">
                  <span className="pf-proj-cat">{proj.category}</span>
                  <span className="pf-proj-badge">{proj.badge}</span>
                </div>

                <h3>{proj.title}</h3>
                <p>{proj.description}</p>

                <div className="pf-proj-actions">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-proj-link primary"
                  >
                    Live Preview &#8599;
                  </a>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-proj-link secondary"
                  >
                    Source / Info
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic & Professional Journey */}
      <section id="journey" className="pf-section">
        <div className="pf-container">
          <div className="pf-section-header">
            <div>
              <div className="pf-badge-pill">
                <span className="pf-pulse-dot"></span> MILESTONES
              </div>
              <h2 className="pf-section-title">Education & Experience</h2>
            </div>
            <div className="pf-watermark">
              <span className="pf-wm-outline">Path</span>
              <span className="pf-wm-solid">Timeline</span>
            </div>
          </div>

          <div className="pf-timeline-list">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="pf-glass-card pf-timeline-item">
                <div className="pf-tl-year">{item.year}</div>
                <div className="pf-tl-body">
                  <h3>{item.role}</h3>
                  <span className="pf-tl-org">{item.org}</span>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pf-section">
        <div className="pf-container">
          <div className="pf-glass-card pf-contact-banner">
            <div className="pf-contact-left">
              <div className="pf-badge-pill">
                <span className="pf-pulse-dot"></span> LET'S CONNECT
              </div>
              <h2>Have a Project or Idea in Mind?</h2>
              <p>
                Whether you need an ATS-optimized web application, custom React
                UI, VPS server deployment, or 3D digital assets, feel free to
                reach out directly.
              </p>

              <div className="pf-contact-links">
                <a
                  href="https://apexfast.ooguy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-contact-tile"
                >
                  <span>OFFICIAL WEBSITE</span>
                  <strong>apexfast.ooguy.com &#8599;</strong>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-contact-tile"
                >
                  <span>GITHUB REPOSITORIES</span>
                  <strong>View Code & Projects &#8599;</strong>
                </a>
                <a
                  href="https://www.cgtrader.com"
                  target="_blank"
                  rel="noreferrer"
                  className="pf-contact-tile"
                >
                  <span>3D ASSET STORE</span>
                  <strong>CGTrader • ISHANTHILINA678 &#8599;</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Official Footer (MoraSpirit + NVIDIA Style) */}
      <footer className="pf-footer">
        <div className="pf-ft-glow-line"></div>
        <div className="pf-container">
          <div className="pf-ft-top">
            <div>
              <div className="pf-brand-text">
                ISHAN <em>THILINA</em>
              </div>
              <p className="pf-ft-org">
                ATS-FRIENDLY DEVELOPER • UI/UX & 3D MODELER • BSc ICT (UWU)
              </p>
            </div>

            <button
              type="button"
              className="pf-scroll-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              &#8593;
            </button>
          </div>

          <div className="pf-ft-divider"></div>

      <div className="pf-ft-bottom">
            <div className="pf-ft-nav">
              <a href="#home">Home</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#journey">Journey</a>
              <a
                href="https://apexfast.ooguy.com"
                target="_blank"
                rel="noreferrer"
              >
                apexfast.ooguy.com
              </a>
            </div>
            <span className="pf-ft-copy">
              © {new Date().getFullYear()} Ishan Thilina. Hosted on GitHub Pages.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}