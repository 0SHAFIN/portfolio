"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronUp,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { profile, skillGroups } from "@/lib/portfolio";
import WorkshopEnvironment from "./workshop-environment";
import TechIcon from "./tech-icon";

function ToolArtwork({ kind }: { kind: "window" | "database" | "tools" }) {
  return (
    <svg
      className="loadout-art"
      viewBox="0 0 180 140"
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        d="M25 122h130v6H25zM35 128h110v4H35z"
        fill="#161f31"
        opacity=".22"
      />
      <path d="M24 111h132v8h-10v8H34v-8H24z" fill="#3b654d" />
      <path
        d="M24 109h132v7H24zM31 105h15v5H31zm105 0h13v5h-13z"
        fill="#a6c486"
      />
      {kind === "window" ? (
        <>
          <path d="M44 26h87v6h6v57h-6v6H44v-6h-6V32h6z" fill="#172f35" />
          <path d="M47 31h81v6h5v47h-5v7H47v-7h-5V37h5z" fill="#fff0c7" />
          <path d="M50 39h75v42H50z" fill="#224c4d" />
          <path d="M50 39h75v8H50z" fill="#3c7168" />
          <path d="M55 41h3v3h-3zm6 0h3v3h-3zm6 0h3v3h-3z" fill="#f1b462" />
          <path
            d="m65 54-8 8 8 8m42-16 8 8-8 8"
            stroke="#a9d6a2"
            strokeWidth="4"
          />
          <path d="M75 55h23v4H75zm0 10h18v4H75z" fill="#f3b66e" />
          <path className="tool-led" d="M119 85h5v3h-5z" fill="#63bb8a" />
          <path d="M80 95h16v10H80zm-10 10h37v5H70z" fill="#fff0c7" />
          <path d="M44 108h88v6H44z" fill="#d6b990" />
          <path d="M143 84h13v19h-13zm13 4h6v11h-6z" fill="#ed925b" />
          <path d="M147 75h3v6h-3zm6-5h3v7h-3z" fill="#fff0c7" opacity=".6" />
        </>
      ) : kind === "database" ? (
        <>
          <path d="M48 25h78v7h6v78H42V32h6z" fill="#172f35" />
          <path
            d="M48 32h77v22H48zm0 27h77v22H48zm0 27h77v20H48z"
            fill="#bdd1bf"
          />
          <path
            d="M56 38h42v4H56zm0 8h30v3H56zm0 19h42v4H56zm0 8h30v3H56zm0 19h42v4H56zm0 7h30v3H56z"
            fill="#406d66"
          />
          <path
            className="tool-led"
            d="M111 39h6v6h-6zm0 27h6v6h-6zm0 26h6v6h-6z"
            fill="#eab95f"
          />
          <path
            d="M29 51h9v5h-4v36h4v5h-9zm108 13h10v5h-5v19h5v5h-10z"
            fill="#91b8b3"
          />
          <path d="M65 9h10v-5h22v5h9v13H65z" fill="#e4e5d3" />
          <path d="M73 14h8v5h-8zm14 0h10v5H87z" fill="#a8c2b5" />
        </>
      ) : (
        <>
          <path d="M64 37h49v8h8v18h-12V48H68v15H56V45h8z" fill="#172f35" />
          <path d="M36 58h104v8h7v42h-7v7H36v-7h-7V66h7z" fill="#172f35" />
          <path d="M37 64h102v44H37z" fill="#e58c57" />
          <path d="M37 65h102v15H37z" fill="#f7b26b" />
          <path d="M37 80h102v6H37z" fill="#9d553f" />
          <path d="M80 75h17v17H80z" fill="#fff0c7" />
          <path d="M85 80h7v7h-7z" fill="#9d553f" />
          <path
            d="m130 20 14-6 8 6v11l-10 7-12 28-10-5 13-29-7-4z"
            fill="#e9e6cb"
          />
          <path d="m137 16 1 9 9-2 1-5" fill="#172f35" />
          <path d="m49 15 9-3 14 37-9 4z" fill="#a7c3a5" />
          <path d="m61 45 12-4 8 20-12 4z" fill="#426e64" />
          <path className="tool-led" d="M45 96h14v4H45z" fill="#fff0c7" />
        </>
      )}
      <path
        d="M19 93h4v13h-4zm-5 2h5v5h-5zm9-6h5v7h-5zm130 11h4v8h-4zm4-5h5v6h-5z"
        fill="#a6c486"
      />
    </svg>
  );
}

export function ToolkitSection() {
  const [selected, setSelected] = useState(0);
  const group = skillGroups[selected];
  const labels = [
    "THE INTERFACE BUILDER",
    "THE ENGINE ROOM",
    "THE EVERYDAY ESSENTIALS",
  ];
  return (
    <section className="toolkit-chapter section-pad" id="skills">
      <div className="chapter-heading reveal">
        <span className="chapter-label">04 / THE TOOLKIT</span>
        <h2>
          A few tools.
          <br />
          <span>Endless possibilities.</span>
        </h2>
        <p>
          Every adventure needs a good loadout.
          <br />
          Meet the tools I bring along for the build.
        </p>
      </div>
      <div
        className="loadout-tabs"
        role="tablist"
        aria-label="Technology categories"
      >
        {skillGroups.map((item, index) => (
          <button
            className={`loadout-tab loadout-${index} reveal`}
            key={item.name}
            role="tab"
            aria-label={item.name}
            id={`skill-tab-${index}`}
            aria-selected={selected === index}
            aria-controls="skill-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? 2
                    : (selected + (event.key === "ArrowRight" ? 1 : 2)) % 3;
              setSelected(next);
              document.getElementById(`skill-tab-${next}`)?.focus();
            }}
          >
            <span className="loadout-slot">
              LOADOUT 0{index + 1}
              <span>{selected === index ? "EQUIPPED" : "SELECT"}</span>
            </span>
            <ToolArtwork kind={item.icon} />
            <span className="loadout-name">
              {item.name}
              <span>
                {selected === index ? (
                  <Check size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </span>
            </span>
            <span className="loadout-subtitle">{labels[index]}</span>
          </button>
        ))}
      </div>
      <div
        id="skill-panel"
        className="loadout-inventory reveal"
        role="tabpanel"
        aria-labelledby={`skill-tab-${selected}`}
        tabIndex={0}
      >
        <div className="inventory-copy">
          <span className="inventory-label">INSIDE THE LOADOUT</span>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
          <span className="inventory-count">
            {String(group.skills.length).padStart(2, "0")} TOOLS · READY TO
            BUILD
          </span>
        </div>
        <ul className="inventory-items" key={selected}>
          {group.skills.map((skill, index) => (
            <li key={skill} style={{ animationDelay: `${index * 35}ms` }}>
              <span className="inventory-symbol">
                <TechIcon name={skill} />
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="chapter-footnote">
        <span className="status-light" /> ALWAYS LEARNING. ALWAYS LEVELING UP.
      </p>
    </section>
  );
}

export { default as JourneySection } from "./journey-section";

export function PortfolioFinale({
  paused,
  brand,
}: {
  paused: boolean;
  brand: ReactNode;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    let visible = false;
    const update = () => {
      element.dataset.sceneActive = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <div
      ref={scene}
      className={`finale-world${paused ? " is-paused" : ""}`}
      data-world-scene="workshop"
      data-scene-active="false"
    >
      <div className="finale-above">
        <div className="finale-surface-art" aria-hidden="true">
          <Image
            src="/art/footer-workshop-surface.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
          />
          <span className="finale-canopy" />
          <span className="workshop-smoke smoke-one" />
          <span className="workshop-smoke smoke-two" />
          <span className="workshop-smoke smoke-three" />
          <span className="workshop-lantern" />
        </div>
        <WorkshopEnvironment paused={paused} />
        <div className="finale-pollen" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              style={{
                left: `${8 + ((index * 19) % 84)}%`,
                bottom: `${7 + ((index * 13) % 28)}%`,
                animationDelay: `${index * -0.8}s`,
                animationDuration: `${7 + (index % 4)}s`,
              }}
            />
          ))}
        </div>
        <section className="finale-cta" id="contact">
          <div className="finale-cta-content reveal">
            <span className="chapter-label">05 / THE NEXT ADVENTURE</span>
            <span className="finale-availability">
              <span className="status-light" /> OPEN TO NEW OPPORTUNITIES
            </span>
            <h2>
              Your next idea.
              <br />
              <span>Our next adventure.</span>
            </h2>
            <p>
              A new project, a good opportunity, or a friendly hello.{" "}
              <br />
              Let’s make something worth putting into the world.
            </p>
            <div className="contact-actions">
              <a
                className="button button-orange"
                href={`mailto:${profile.email}`}
              >
                Say hello <Mail size={18} />
              </a>
              <button className="button button-outline" onClick={copyEmail}>
                {copied ? (
                  <>
                    <Check size={16} /> Email copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy email
                  </>
                )}
              </button>
            </div>
            <a className="finale-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={15} />
            </a>
            <span className="copy-status" role="status">
              {copyError
                ? `You can email me at ${profile.email}`
                : copied
                  ? "Email address copied to clipboard."
                  : ""}
            </span>
          </div>
        </section>
        <div className="finale-character-stage" aria-hidden="true">
          <div className="finale-player">
            <span className="finale-player-shadow" />
            <span className="finale-idle-sprite" />
          </div>
          <span className="finale-level-label">
            GOOD THINGS GROW FROM HERE <ArrowDown size={12} />
          </span>
        </div>
      </div>
      <footer className="finale-footer finale-underground">
        <Image
          className="finale-underground-art"
          src="/art/footer-underground.webp"
          alt=""
          fill
          unoptimized
          sizes="100vw"
        />
        <span className="finale-root-wall root-wall-left" aria-hidden="true" />
        <span className="finale-root-wall root-wall-right" aria-hidden="true" />
        <div className="finale-crystal-glow" aria-hidden="true" />
        <div className="finale-cave-particles" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              className={index < 6 ? "crystal-sparkle" : "cave-drip"}
              key={index}
              style={{
                left: `${index % 2 === 0 ? 2 + (index % 4) * 2 : 94 + (index % 3)}%`,
                top: `${index < 6 ? 68 + ((index * 7) % 26) : 8 + ((index * 3) % 19)}%`,
                animationDelay: `${index * -0.73}s`,
              }}
            />
          ))}
        </div>
        <div className="finale-footer-card reveal">
          <div className="finale-footer-grid">
            <div className="finale-about">
              <a
                className="brand"
                href="#home"
                aria-label="Shafin, back to top"
              >
                {brand}
              </a>
              <p>
                A full-stack developer with a curious mind and a love for
                thoughtful digital experiences. From Dhaka, building for
                wherever your next idea takes us.
              </p>
              <div className="finale-socials">
                <a
                  href={profile.github}
                  aria-label="Shafin on GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={23} />
                </a>
                <a
                  href={profile.linkedin}
                  aria-label="Shafin on LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={23} />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email Shafin">
                  <Mail size={23} />
                </a>
              </div>
            </div>
            <div className="finale-link-column">
              <span>EXPLORE</span>
              <a href="#about">
                The story <ArrowUpRight size={13} />
              </a>
              <a href="#journey">
                The journey <ArrowUpRight size={13} />
              </a>
              <a href="#projects">
                The work <ArrowUpRight size={13} />
              </a>
              <a href="#skills">
                The toolkit <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="finale-link-column">
              <span>LET’S CONNECT</span>
              <a href={`mailto:${profile.email}`}>
                Send an email <ArrowUpRight size={13} />
              </a>
              <a href={profile.resume} download="Shafin-Resume.pdf">
                Download résumé <Download size={13} />
              </a>
              <p>
                <MapPin size={14} /> Dhaka, Bangladesh
              </p>
              <span className="finale-local-note">
                <span className="status-light" /> OPEN TO THE NEXT THING
              </span>
            </div>
          </div>
          <div className="finale-stack">
            <span>A FEW TRUSTY COMPANIONS</span>
            <div>
              <span>
                N <strong>Next.js</strong>
              </span>
              <span>
                Re <strong>React</strong>
              </span>
              <span>
                TS <strong>TypeScript</strong>
              </span>
              <span>
                Pg <strong>PostgreSQL</strong>
              </span>
            </div>
          </div>
          <div className="finale-copyright">
            <span>
              © {new Date().getFullYear()} SHAFIN. MADE WITH CURIOSITY.
            </span>
            <a href="#home">
              BACK TO THE TOP <ChevronUp size={15} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
