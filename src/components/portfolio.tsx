"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  MapPin,
  Menu,
  Moon,
  Pause,
  Play,
  RefreshCw,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { profile, projects, type Project } from "@/lib/portfolio";
import {
  BYTE_LINES,
  BYTE_BUBBLES,
  type ByteGreeting,
} from "@/lib/byte-dialogue";
import HeroEnvironment from "./hero-environment";
import StoryByte from "./story-byte";
import ByteFace from "./byte-faces";
import TechIcon from "./tech-icon";
import {
  ToolkitSection,
  JourneySection,
  PortfolioFinale,
} from "./portfolio-chapters";
import type { LightingMode } from "./world-renderer";

gsap.registerPlugin(ScrollTrigger);

function PixelMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d="M14 2h8v6h-8z" fill="currentColor" />
      <path d="M8 10h20v4h4v16h-4v4H8v-4H4V14h4z" fill="currentColor" />
      <path d="M10 16h16v12H10z" fill="var(--logo-face, var(--cream))" />
      <path d="M12 18h4v4h-4zm8 0h4v4h-4z" fill="currentColor" />
    </svg>
  );
}

function AmbientParticles({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    if (
      !element ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      width = element.width = element.clientWidth;
      height = element.height = element.clientHeight;
    };
    resize();
    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: ((i * 173 + 41) % 997) / 997,
      y: ((i * 107 + 29) % 991) / 991,
      size: i % 4 === 0 ? 4 : 2,
      speed: 0.04 + (i % 5) * 0.012,
    }));
    let previous = 0;
    const draw = (time: number) => {
      if (time - previous > 32) {
        previous = time;
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
          ctx.globalAlpha = 0.2 + (Math.sin(time / 1200 + p.x * 50) + 1) * 0.2;
          const night = Number(
            element
              .closest<HTMLElement>(".portfolio")
              ?.style.getPropertyValue("--night-mix") || 0,
          );
          const x = ((p.x * width + time * p.speed * 0.8) % (width + 30)) - 15;
          const y =
            height * (0.54 + p.y * 0.4) + Math.sin(time / 1000 + p.x * 30) * 24;
          ctx.save();
          ctx.translate(Math.round(x), Math.round(y));
          ctx.rotate(Math.sin(time / 900 + p.x * 20) * 0.6);
          ctx.fillStyle =
            night > 0.5 ? "#e6efa0" : p.size === 4 ? "#8ca95a" : "#e4d48b";
          ctx.globalAlpha *= night > 0.5 ? 1 : 0.8;
          ctx.fillRect(0, 0, night > 0.5 ? p.size : p.size * 2.2, p.size);
          if (night < 0.5) ctx.fillRect(p.size, -p.size, p.size * 1.5, p.size);
          ctx.restore();
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [paused]);
  return (
    <canvas ref={canvas} className="ambient-particles" aria-hidden="true" />
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) {
      dialog.current?.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
      };
    }
    dialog.current?.close();
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="project-dialog-title"
    >
      {project && (
        <div className="dialog-inner">
          <button
            className="dialog-close icon-button"
            onClick={onClose}
            aria-label="Close project"
          >
            <X size={22} />
          </button>
          <div
            className="project-art dialog-art"
            style={{ backgroundImage: `url("${project.artwork}")` }}
            role="img"
            aria-label={`Original pixel art world for ${project.name}`}
          />
          <div className="dialog-copy">
            <span className="eyebrow">{project.label}</span>
            <h2 id="project-dialog-title">{project.name}</h2>
            <p className="dialog-role">
              {project.category} developer · {project.period}
            </p>
            <p>{project.detail}</p>
            <div className="tags">
              {project.stack.map((skill) => (
                <span key={skill}><TechIcon name={skill} />{skill}</span>
              ))}
            </div>
            <a
              className="button button-orange"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Explore live project <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const explorer = useRef<HTMLButtonElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const soundTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const greetingIndex = useRef(0);
  const greetingSequence = useRef(0);
  const explorerJump = useRef<gsap.core.Tween | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [filter, setFilter] = useState("All projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [collected, setCollected] = useState<number[]>([]);
  const [greeting, setGreeting] = useState<ByteGreeting | null>(null);
  const [lightingMode, setLightingMode] = useState<LightingMode>("auto");

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      document.querySelector<HTMLButtonElement>(".mobile-menu")?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".header")) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (paused) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".header", { opacity: 0, duration: 0.7 })
          .from(
            ".hero-reveal",
            { y: 34, opacity: 0, duration: 0.95, stagger: 0.12 },
            "-=0.4",
          )
          .from(
            ".hero-explorer",
            { y: 70, opacity: 0, duration: 1, ease: "back.out(1.3)" },
            "-=0.5",
          );
        gsap.to(".hero-copy", {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".cloud-one", {
          x: 80,
          y: -20,
          duration: 32,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".cloud-two", {
          x: -100,
          duration: 42,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 42,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [paused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -45% 0px" },
    );
    document
      .querySelectorAll("main section[id], #contact")
      .forEach((section) => observer.observe(section));
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(
    () => () => {
      if (soundTimer.current) clearInterval(soundTimer.current);
      if (greetingTimer.current) clearTimeout(greetingTimer.current);
      explorerJump.current?.kill();
      void audio.current?.close();
    },
    [],
  );

  const toggleSound = async () => {
    if (soundOn) {
      if (soundTimer.current) clearInterval(soundTimer.current);
      await audio.current?.suspend();
      setSoundOn(false);
      return;
    }
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audio.current) audio.current = new AudioContextClass();
    await audio.current.resume();
    let note = 0;
    const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
    const playNote = () => {
      const context = audio.current;
      if (!context || context.state !== "running") return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = melody[note++ % melody.length];
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, context.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1.2);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    };
    playNote();
    soundTimer.current = setInterval(playNote, 650);
    setSoundOn(true);
  };

  const showGreeting = (text: string) => {
    const sequence = greetingSequence.current++;
    setGreeting({
      id: sequence,
      text,
      ...BYTE_BUBBLES[sequence % BYTE_BUBBLES.length],
    });
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
    greetingTimer.current = setTimeout(() => setGreeting(null), 2800);
    const sprite = explorer.current?.querySelector(".byte-run-sprite");
    if (
      sprite &&
      !paused &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      explorerJump.current?.kill();
      explorerJump.current = gsap.fromTo(
        sprite,
        { y: 0 },
        {
          y: -46,
          duration: 0.27,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }
  };

  const sayHello = () => {
    const text = BYTE_LINES[greetingIndex.current % BYTE_LINES.length];
    greetingIndex.current += 1;
    showGreeting(text);
  };

  const filteredProjects = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );

  return (
    <div
      ref={root}
      className={`portfolio${paused ? " is-paused" : ""}`}
      data-world-mode={lightingMode}
      data-world-scope="hero"
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="brand" href="#home" aria-label="Shafin home">
          <PixelMark />
          <span>
            shafin<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          className={`navigation${menuOpen ? " is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["about", "The story"],
            ["journey", "The journey"],
            ["projects", "The work"],
            ["skills", "The toolkit"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="button button-orange nav-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="mobile-menu icon-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main id="main">
        <section
          className="hero"
          data-world-scene="hero"
          id="home"
          aria-label="Welcome to Shafin's world"
        >
          <div className="landscape">
            <HeroEnvironment paused={paused} mode={lightingMode} />
          </div>
          <Image
            className="pixel-cloud cloud-one"
            src="/art/cloud.svg"
            alt=""
            width={180}
            height={56}
          />
          <Image
            className="pixel-cloud cloud-two"
            src="/art/cloud.svg"
            alt=""
            width={180}
            height={56}
          />
          <AmbientParticles paused={paused} />
          <div className="hero-copy">
            <h1 className="hero-reveal">
              Big ideas.
              <br />
              Built with{" "}
              <span className="code-word">
                code
                <svg
                  viewBox="0 0 320 15"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 10 62 5 122 9 183 3 243 7 318 2" />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-reveal hero-description">
              Hey, I’m Shafin. I turn curious ideas into thoughtful
              <br className="desktop-break" /> digital experiences. Welcome to
              my little world.
            </p>
            <div className="hero-reveal hero-actions">
              <a className="button button-orange" href="#projects">
                Explore my work <ArrowDown size={18} />
              </a>
              <a
                className="button button-outline"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={19} /> Meet me on GitHub{" "}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="hero-side-note">
            <span>PORTFOLIO · VOL. 01</span>
            <span>CRAFTED WITH CURIOSITY</span>
          </div>
          <div className="hero-run-track">
            <div className="hero-explorer">
              <div
                className="explorer-speech"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {greeting && (
                  <div
                    key={greeting.id}
                    className="explorer-bubble-slot"
                    data-position={greeting.position}
                  >
                    <div
                      className={`explorer-bubble is-visible speech-${greeting.animation}`}
                    >
                      {greeting.text}
                    </div>
                  </div>
                )}
              </div>
              <button
                ref={explorer}
                className="explorer-button"
                onClick={sayHello}
                aria-label="Say hello to Byte the explorer"
              >
                <span className="runner-shadow" aria-hidden="true" />
                <span className="byte-run-sprite" aria-hidden="true" />
                <span className="runner-dust" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <span className="explorer-hint">↑ SAY HELLO TO BYTE</span>
            </div>
          </div>
          <div
            className="world-light-controls"
            role="group"
            aria-label="World lighting"
          >
            <span className="world-live-label">
              <span className="status-light" /> A LIVING LITTLE WORLD
            </span>
            <div>
              <button
                aria-label="Automatic day and night cycle"
                aria-pressed={lightingMode === "auto"}
                onClick={() => setLightingMode("auto")}
              >
                <RefreshCw size={13} />
                <span>AUTO</span>
              </button>
              <button
                aria-label="Set world to day"
                aria-pressed={lightingMode === "day"}
                onClick={() => setLightingMode("day")}
              >
                <Sun size={15} />
                <span>DAY</span>
              </button>
              <button
                aria-label="Set world to night"
                aria-pressed={lightingMode === "night"}
                onClick={() => setLightingMode("night")}
              >
                <Moon size={14} />
                <span>NIGHT</span>
              </button>
            </div>
          </div>
          <div className="gems" aria-label="Find three hidden gems">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`gem gem-${i}${collected.includes(i) ? " is-collected" : ""}`}
                aria-label={
                  collected.includes(i)
                    ? `Gem ${i + 1} collected`
                    : `Collect hidden gem ${i + 1}`
                }
                disabled={collected.includes(i)}
                onClick={() => {
                  setCollected((current) => [...current, i]);
                  showGreeting(
                    collected.length === 2
                      ? "All gems found. Nice work!"
                      : collected.length === 0
                        ? "A little treasure!"
                        : "One gem to go!",
                  );
                }}
              >
                <span className="pixel-gem" />
                <span className="gem-popup">+1</span>
              </button>
            ))}
          </div>
          <a className="scroll-cue" href="#about">
            <span className="scroll-arrow">
              <ArrowDown size={17} />
            </span>
            <span>EVERY GOOD THING STARTS WITH CURIOSITY</span>
          </a>
          <div className="hero-coordinates">
            <MapPin size={13} /> DHAKA, BD <span>23.8103° N · 90.4125° E</span>
          </div>
          <div className="pixel-edge" />
        </section>

        <div className="world-bar">
          <div>
            <span className="status-light" /> OPEN TO NEW OPPORTUNITIES
          </div>
          <span>CODE. CREATE. EXPLORE. REPEAT.</span>
          <div className="gem-counter" aria-live="polite">
            <span className="mini-gem" /> {collected.length}/3 GEMS FOUND
          </div>
        </div>

        <section className="about section-pad" id="about">
          <div className="section-topline reveal">
            <span className="eyebrow">
              <span className="section-number">01</span> THE STORY
            </span>
            <span className="mono-note">A HUMAN BEHIND THE CODE</span>
          </div>
          <div className="about-grid">
            <div className="about-art reveal">
              <div className="art-label">
                <span className="status-light" /> PLAYER ONE
              </div>
              <div className="pixel-orbit orbit-one" />
              <div className="pixel-orbit orbit-two" />
              <StoryByte />
              <div className="player-card">
                <span className="pixel-star">✦</span>
                <div>
                  <strong>Shafin</strong>
                  <span>Developer. Maker. Curious human.</span>
                </div>
                <span className="player-level">P1</span>
              </div>
              <span className="art-coordinate">EST. DHAKA, BANGLADESH</span>
            </div>
            <div className="about-copy reveal">
              <h2>
                It started with
                <br />a little curiosity.
              </h2>
              <p className="lead">
                And turned into a love for building things.
              </p>
              <p>
                I’m Shafin, a full-stack developer based in Dhaka. I build
                clean, accessible web applications that bring thoughtful design
                and efficient code together.
              </p>
              <p>
                From the first sketch to the last little interaction, I care
                about making products feel good to use. E-commerce platforms,
                creative tools, or a whole new idea — I’m always up for the next
                adventure.
              </p>
              <a
                className="button button-outline"
                href={profile.resume}
                download="Shafin-Resume.pdf"
              >
                A little more about me <Download size={17} />
              </a>
              <div className="about-footnote">
                <Code2 size={17} />
                <span>Human-centered thinking. Developer-powered doing.</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((i) => (
              <div key={i}>
                <span>THOUGHTFUL DESIGN</span>
                <ByteFace expression="happy" />
                <span>PLAYFUL POSSIBILITIES</span>
                <ByteFace expression="wink" />
                <span>CODE WITH PURPOSE</span>
                <ByteFace expression="curious" />
              </div>
            ))}
          </div>
        </div>

        <JourneySection paused={paused} />

        <section className="projects section-pad" id="projects">
          <div className="section-topline reveal">
            <span className="eyebrow">
              <span className="section-number">03</span> THE WORK
            </span>
            <span className="mono-note">SMALL IDEAS. REAL-WORLD IMPACT.</span>
          </div>
          <div className="section-heading-row reveal">
            <h2>
              Different worlds.
              <br />
              Same love for building.
            </h2>
            <p>
              A few places my curiosity has taken me.
              <br />
              Pick a world. Take a look around.
            </p>
          </div>
          <div
            className="project-filters reveal"
            role="group"
            aria-label="Filter projects"
          >
            {["All projects", ...new Set(projects.map((project) => project.category))].map((item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
                {item === "All projects" && <span>{String(projects.length).padStart(2, "0")}</span>}
              </button>
            ))}
          </div>
          <div className="project-grid" aria-live="polite">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <button
                  className="project-image-button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.name} project`}
                >
                  <div
                    className="project-art"
                    style={{ backgroundImage: `url("${project.artwork}")` }}
                  />
                  <span className="project-world">
                    WORLD 0{project.world + 1}
                  </span>
                  <span className="project-enter">
                    <ArrowUpRight size={23} />
                  </span>
                </button>
                <div className="project-copy">
                  <div className="project-type">
                    <span>{project.category} development</span>
                    <span>0{project.world + 1}</span>
                  </div>
                  <button
                    className="project-title"
                    onClick={() => setSelectedProject(project)}
                  >
                    <h3>{project.name}</h3>
                    <ArrowUpRight size={24} />
                  </button>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.stack.slice(0, 3).map((skill) => (
                      <span key={skill}><TechIcon name={skill} />{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="more-work reveal">
            <span>There’s always another idea in the works.</span>
            <a
              className="text-button"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <Github size={17} />
              <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <ToolkitSection />
      </main>
      <PortfolioFinale
        paused={paused}
        brand={
          <>
            <PixelMark />
            <span>
              shafin<span className="brand-dot">.</span>
            </span>
          </>
        }
      />

      <div className="experience-controls" aria-label="Experience controls">
        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute ambient sound" : "Enable ambient sound"}
          aria-pressed={soundOn}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>SOUND {soundOn ? "ON" : "OFF"}</span>
        </button>
        <span className="control-divider" />
        <button
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Resume animations" : "Pause animations"}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? "PLAY" : "PAUSE"}</span>
        </button>
      </div>
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
