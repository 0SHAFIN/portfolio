"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Brand from "./Brand";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, MapPin, Code2 } from "lucide-react";
import { projects, experiences, education } from "./portfolio-data";

const skills = {
  Frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Framer Motion",
    "Flutter",
  ],
  Backend: [
    "NestJS",
    "Express",
    "Node.js",
    "Python",
    "C++",
    "Dart",
    "PostgreSQL",
    "REST API",
    "Prisma",
  ],
  Tools: ["Git", "GitHub", "Postman", "Arduino", "VS Code"],
};
const skillLogos: Record<string, string> = {
  "Next.js": "nextjs",
  React: "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwind",
  "Framer Motion": "framer",
  Flutter: "flutter",
  NestJS: "nestjs",
  Express: "express",
  "Node.js": "nodejs",
  Python: "python",
  "C++": "cplusplus",
  Dart: "dart",
  PostgreSQL: "postgresql",
  "REST API": "rest-api",
  Prisma: "prisma",
  Git: "git",
  GitHub: "github",
  Postman: "postman",
  Arduino: "arduino",
  "VS Code": "vscode",
};
const socials = [
  ["GitHub", "https://github.com/0SHAFIN"],
  ["LinkedIn", "https://www.linkedin.com/in/tafsirulshafin"],
  ["Facebook", "https://www.facebook.com/share/1J5McdBun3/"],
  [
    "Instagram",
    "https://www.instagram.com/tafsirul_shafin?igsh=eDVlN3d0YW55ZWI2",
  ],
  ["Twitter", "https://x.com/insofx71?t=el4fJanYT5JXaIQbcloq3Q&s=09"],
];
function Heading({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2>
          {title}
          <span>.</span>
        </h2>
      </div>
      <span className="heading-cross" aria-hidden="true">
        ✳
      </span>
    </div>
  );
}
function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export default function PixelPortfolio() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const landscapeY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const [category, setCategory] = useState<keyof typeof skills>("Frontend");
  return (
    <main id="home">
      <section className="hero" ref={hero} aria-label="Introduction">
        <motion.div
          className="hero-background"
          style={{ y: reduced ? 0 : landscapeY }}
          aria-hidden="true"
        >
          <Image
            src="/art/pixel-world-blue-hour.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-role">
              <i className="status-dot" /> FULL-STACK DEVELOPER
            </p>
            <p className="intro">Hi, my name is</p>
            <h1>SHAFIN</h1>
            <h2 className="hero-headline">
              I build things
              <br />
              for the <span>web.</span>
            </h2>
            <p className="hero-summary">
              I&apos;m a full-stack developer building clean, user-friendly, and
              accessible web applications.
            </p>
            <div className="hero-actions">
              <a className="pixel-button" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a className="hero-contact" href="#contact">
                Get in touch <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-details">
              <span>
                <MapPin size={14} /> Dhaka, Bangladesh
              </span>
              <a
                href="https://github.com/0SHAFIN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} /> Visit GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>BUILDING DIGITAL EXPERIENCES, ONE PIXEL AT A TIME.</span>
          <a href="#projects">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <section id="projects" className="section">
        <Heading number="01" label="SELECTED WORK" title="Built with purpose" />
        <p className="section-intro">
          A selection of high-impact products I&apos;ve built, ranging from
          massive full-stack marketplaces to specialized frontend tools.
        </p>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              className={`project-card project-${i}`}
              key={project.title}
            >
              <a
                className="project-art"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
              >
                <span className="project-number">
                  0{i + 1} / FEATURED PROJECT
                </span>
                <div className="project-logo">
                  <Image
                    src={project.image}
                    alt={`${project.title} logo`}
                    width={76}
                    height={76}
                  />
                  <span>{project.title}</span>
                </div>
                <span className="project-art-arrow">
                  <ArrowUpRight />
                </span>
                <div className="pixel-terrain" aria-hidden="true" />
              </a>
              <div className="project-content">
                <p className="eyebrow">{project.role}</p>
                <h3>{project.title}</h3>
                <p className="project-period">{project.period}</p>
                <p>{project.description}</p>
                <Tags items={project.tech} />
                <a
                  className="text-link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="about" className="section about-section">
        <div className="about-copy">
          <Heading
            number="02"
            label="BEHIND THE PIXELS"
            title="A little about me"
          />
          <p className="about-lead">
            Thoughtful design.
            <br />
            <span>Efficient code.</span>
          </p>
          <p>
            Hi, I’m Shafin — a full-stack developer passionate about creating
            clean, modern, and user-friendly web applications. I focus on
            building accessible, human-centered products that not only look
            great but also provide seamless experiences.
          </p>
          <p>
            Every project I work on reflects my dedication to combining
            thoughtful design with efficient code to deliver applications that
            people enjoy using.
          </p>
          <a className="text-link" href="/resume/shafin_resume.pdf" download>
            Download my resume <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="portrait-card">
          <div className="portrait-top">
            <span>PLAYER_01</span>
            <span>● ONLINE</span>
          </div>
          <div className="portrait">
            <Image
              src="/image/shafin.jpg"
              alt="Portrait of Shafin in front of an ornate golden doorway"
              fill
              sizes="(max-width: 760px) 90vw, 400px"
            />
          </div>
          <div className="portrait-bottom">
            <strong>SHAFIN</strong>
            <span>DEVELOPER / CREATOR</span>
          </div>
          <span className="portrait-spark" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
      <section id="experience" className="section">
        <Heading number="03" label="THE JOURNEY" title="Experience points" />
        <p className="section-intro">
          My professional journey structured by company and projects.
        </p>
        <div className="career">
          {experiences.map((experience, i) => (
            <article className="career-row" key={experience.company}>
              <div className="career-company">
                <span className="eyebrow">
                  LEVEL 0{i + 1}{" "}
                  {experience.status === "current" && " / CURRENT"}
                </span>
                <h3>
                  {experience.link ? (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {experience.company} <ArrowUpRight size={21} />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <p className="project-period">{experience.period}</p>
                <p>{experience.description}</p>
              </div>
              <div className="career-projects">
                {experience.projects.map((project) => (
                  <div className="career-project" key={project.name}>
                    <div className="career-project-title">
                      <h4>{project.name}</h4>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ArrowUpRight size={22} />
                      </a>
                    </div>
                    <p className="eyebrow">{project.role}</p>
                    <p className="project-period">{project.period}</p>
                    <p>{project.description}</p>
                    <Tags items={project.tech} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="skills" className="section">
        <Heading number="04" label="MY INVENTORY" title="Tools of the trade" />
        <p className="section-intro">
          Technologies and tools I use to bring ideas to life.
        </p>
        <div className="inventory">
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Technology category"
          >
            {(Object.keys(skills) as (keyof typeof skills)[]).map((name) => (
              <button
                key={name}
                role="tab"
                id={`tab-${name}`}
                aria-controls={`panel-${name}`}
                aria-selected={category === name}
                className={category === name ? "active" : ""}
                onClick={() => setCategory(name)}
              >
                <Code2 size={18} /> {name}
                <span>{String(skills[name].length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div
            className="skill-grid"
            role="tabpanel"
            id={`panel-${category}`}
            aria-labelledby={`tab-${category}`}
          >
            {skills[category].map((skill) => (
              <div className="skill-item" key={skill}>
                <span className="skill-logo-frame" aria-hidden="true">
                  <Image
                    className="skill-logo"
                    src={`/art/tech/${skillLogos[skill]}.png`}
                    alt=""
                    width={48}
                    height={48}
                    sizes="48px"
                  />
                </span>
                <span className="skill-name">{skill}</span>
                <span className="skill-check">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="education" className="section">
        <Heading number="05" label="FOUNDATIONS" title="Always learning" />
        <div className="education-list">
          {education.map((edu, i) => (
            <article className="education-row" key={edu.degree}>
              <span className="education-index">0{i + 1}</span>
              <div>
                <p className="eyebrow">{edu.period}</p>
                <h3>{edu.degree}</h3>
                <p className="education-institution">
                  <Image
                    className="education-logo"
                    src={edu.logo}
                    alt=""
                    width={28}
                    height={28}
                    sizes="28px"
                  />
                  <span>{edu.institution}</span>
                </p>
                {edu.major && (
                  <p className="project-period">Major: {edu.major}</p>
                )}
                {edu.description && <p>{edu.description}</p>}
              </div>
              <span className="result">{edu.result}</span>
            </article>
          ))}
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="section contact-inner">
          <p className="eyebrow">06 / NEXT CHAPTER</p>
          <h2>
            Let&apos;s build
            <br />
            something <span>great.</span>
            <ArrowUpRight className="contact-arrow" />
          </h2>
          <div className="contact-grid">
            <div>
              <p>
                I&apos;m currently looking for new opportunities. Whether you
                have a question or just want to say hi, my inbox is always open!
              </p>
              <p>
                I&apos;m always interested in hearing about new projects and
                opportunities. Feel free to reach out if you&apos;d like to
                collaborate or just have a chat.
              </p>
              <span className="contact-location">
                <MapPin size={15} /> Dhaka, Bangladesh
              </span>
            </div>
            <div>
              <a
                className="contact-email"
                href="mailto:shafin3024344@gmail.com"
              >
                shafin3024344@gmail.com <ArrowUpRight size={20} />
              </a>
              <a
                className="pixel-button dark-button"
                href="mailto:shafin3024344@gmail.com"
              >
                Say hello <ArrowUpRight size={18} />
              </a>
              <div className="social-links">
                {socials.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <Brand />
        <p>Designed &amp; Built by Shafin</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
