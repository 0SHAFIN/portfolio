"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/lib/portfolio";
import StoryByte from "./story-byte";

const chapters = [
  { name: "University", label: "01 / THE FOUNDATION", context: "2022 — 2025", role: "BSc in Computer Science & Engineering", copy: "American International University–Bangladesh. A major in Software Engineering, a foundation in algorithms, and a growing love for building things on the web.", tags: ["AIUB", "Software Engineering", "CGPA 3.62 / 4.00"], art: "journey-education-logo", url: undefined },
  { name: "Rovalty", label: "PRODUCT 01 / THE CURRENT QUEST", context: "Upstal · Currently working on", role: "Connecting brands & creators", copy: "Currently working on Rovalty at Upstal. The platform connects Shopify brands and creators through campaigns, content submissions, and performance tracking.", tags: ["Creator partnerships", "Shopify ecosystem"], art: "journey-rovalty-logo", url: "https://rovalty.com/" },
  { name: "Leadstal", label: "PRODUCT 02 / BUSINESS CONNECTIONS", context: "Upstal · Product work", role: "Lead discovery & email campaigns", copy: "Working on tools that help businesses discover leads and manage email campaigns. Building software around everyday business needs.", tags: ["Lead discovery", "Email campaigns"], art: "journey-leadstal-logo", url: "https://leadstal.com/" },
  { name: "10xProfit", label: "PRODUCT 03 / SELLER TOOLS", context: "Upstal · Product work", role: "Tools for Amazon sellers", copy: "Contributing to tools for Amazon sellers, making business information easier to navigate and use through thoughtful product interfaces.", tags: ["Seller tools", "Product interfaces"], art: "journey-10xprofit-logo", url: "https://10xprofit.io/" },
];

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export default function JourneySection({ paused }: { paused: boolean }) {
  const section = useRef<HTMLElement>(null);
  const isPaused = useRef(paused);
  useEffect(() => { isPaused.current = paused; }, [paused]);

  useEffect(() => {
    const root = section.current!;
    const trail = root.querySelector<HTMLElement>(".journey-projects")!;
    const route = root.querySelector<SVGPathElement>(".journey-snake-base")!;
    const ink = root.querySelector<SVGPathElement>(".journey-snake-ink")!;
    const runner = root.querySelector<HTMLElement>(".journey-runner")!;
    const flight = root.querySelector<HTMLElement>(".journey-flight")!;
    const focus = root.querySelector<HTMLElement>(".journey-focus")!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".journey-project"));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let length = 0, endY = 0, frame = 0, previous = scrollY;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    const update = () => {
      frame = 0;
      if (isPaused.current || !length) return;
      if (motion.matches) {
        flight.dataset.visible = "false";
        root.dataset.phase = "static";
        return;
      }
      const rect = trail.getBoundingClientRect();
      const targetY = Math.max(40, Math.min(endY, innerHeight * 0.55 - rect.top));
      // The route is monotonic in Y: find its arc length at the reading line.
      // This keeps Byte on screen through both wide bends and vertical stretches.
      let low = 0, high = length;
      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        if (route.getPointAtLength(mid).y < targetY) low = mid;
        else high = mid;
      }
      const distance = (low + high) / 2;
      const point = route.getPointAtLength(distance);
      runner.style.left = `${point.x}px`;
      runner.style.top = `${point.y}px`;
      ink.style.strokeDashoffset = String(length - distance);
      root.style.setProperty("--journey-progress", String(distance / length));
      const delta = scrollY - previous;
      if (Math.abs(delta) > 0.2) {
        const tangent = route.getPointAtLength(Math.min(length, distance + 3)).x - route.getPointAtLength(Math.max(0, distance - 3)).x;
        if (Math.abs(tangent) > 0.02) root.dataset.facing = tangent * delta < 0 ? "left" : "right";
        root.dataset.running = "true";
        clearTimeout(idle);
        idle = setTimeout(() => { root.dataset.running = "false"; }, 140);
      }
      previous = scrollY;
      for (const card of cards) {
        const bounds = card.getBoundingClientRect();
        const p = clamp((innerHeight - bounds.top) / (innerHeight + bounds.height));
        card.style.setProperty("--row-parallax", `${(p - 0.5) * 26}px`);
      }
      // The final path point hands off to a reversible viewport flight.
      const focusBounds = focus.getBoundingClientRect();
      const start = innerHeight * 0.55 + (trail.offsetHeight - endY);
      const raw = (start - focusBounds.top) / focus.offsetHeight;
      const p = clamp(raw);
      flight.dataset.visible = String(raw >= 0 && raw < 1);
      runner.style.visibility = raw >= 0 ? "hidden" : "visible";
      const arrival = ease(p / 0.22);
      const departure = ease((p - 0.74) / 0.26);
      const initial = runner.offsetWidth;
      const large = Math.min(innerHeight * 0.79, innerWidth * 0.92);
      const size = mix(mix(initial, large, arrival), 65, departure);
      // Center the whole portrait on narrow screens so the scarf and feet fit.
      const portraitOffset = innerWidth <= 700 ? large * 0.14 * arrival : 0;
      const x = mix(innerWidth * 0.5 + portraitOffset, innerWidth * 0.58, departure);
      const y = mix(mix(innerHeight * 0.55 - initial * 0.48, innerHeight * 0.48, arrival), innerHeight * 0.86, departure);
      flight.style.setProperty("--flight-size", `${size}px`);
      flight.style.setProperty("--flight-x", `${x}px`);
      flight.style.setProperty("--flight-y", `${y}px`);
      flight.style.setProperty("--flight-turn", `${mix(-12 * (1 - arrival), 16, departure)}deg`);
      flight.style.setProperty("--focus-opacity", String(arrival * (1 - departure)));
      flight.style.setProperty("--flight-opacity", String(raw < 0 || raw >= 1 ? 0 : 1 - ease((p - 0.94) / 0.06)));
      flight.dataset.expression = p < 0.35 ? "curious" : p < 0.53 ? "happy" : p < 0.74 ? "wink" : "happy";
      root.dataset.phase = raw < 0 ? "walking" : raw >= 1 ? "complete" : p < 0.22 ? "arriving" : p < 0.74 ? "expression" : "departing";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      const width = trail.clientWidth;
      const bounds = trail.getBoundingClientRect();
      const mobile = width <= 700;
      const points = [{ x: width / 2, y: 40 }];
      cards.forEach((card, index) => {
        const art = card.querySelector<HTMLElement>(".journey-project-art")!;
        const box = art.getBoundingClientRect();
        const center = box.left - bounds.left + box.width / 2;
        if (mobile) {
          const side = index % 2 === 0 ? 29 : width - 29;
          // Reserve the narrow gutter beside the copy, then curve into the art.
          points.push({ x: side, y: card.getBoundingClientRect().top - bounds.top + 45 });
          points.push({ x: side, y: box.top - bounds.top - 65 });
        }
        // The turn lives INSIDE the illustration. Its foreground frame naturally
        // occludes both the trail and Byte, who emerges below the opposite edge.
        points.push({ x: center, y: box.top - bounds.top + box.height * 0.52 });
        if (mobile && index < cards.length - 1) {
          // Keep an organic bend when the illustrations stack in one column.
          points.push({ x: index % 2 === 0 ? width - 29 : 29, y: box.bottom - bounds.top + 60 });
        }
      });
      endY = trail.offsetHeight - 40;
      points.push({ x: width / 2, y: endY });
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const from = points[i - 1], to = points[i];
        const bend = (to.y - from.y) * 0.5;
        // Shared vertical tangents form a continuous, rounded S-curve; no
        // long straight edges or tight corners. Y stays monotonic for scrubbing.
        d += ` C ${from.x} ${from.y + bend} ${to.x} ${to.y - bend} ${to.x} ${to.y}`;
      }
      route.setAttribute("d", d);
      ink.setAttribute("d", d);
      length = route.getTotalLength();
      ink.style.strokeDasharray = String(length);
      root.dataset.pathReady = "true";
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(trail);
    cards.forEach((card) => resize.observe(card));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", schedule);
    const pauseObserver = new MutationObserver(schedule);
    pauseObserver.observe(root, { attributes: true, attributeFilter: ["data-paused"] });
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      resize.disconnect();
      pauseObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  function renderChapter(project: typeof chapters[number], index: number) {
    const Heading = index === 0 ? "h3" : "h4";
    return (
      <article className={`journey-project${index % 2 ? " journey-project-reversed" : ""}${project.name === "Rovalty" ? " current-stop" : ""}`} key={project.name} id={`journey-project-${index + 1}`} aria-labelledby={`journey-title-${index + 1}`}>
            <div className="journey-project-copy">
              <div className="journey-project-eyebrow"><span>0{index + 1}</span>{project.label}</div>
              <p className="journey-project-context">{project.context}</p>
              <Heading id={`journey-title-${index + 1}`}>{project.name}</Heading>
              <strong>{project.role}</strong>
              <p className="journey-project-description">{project.copy}</p>
              <div className="chapter-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {project.url && <a className="journey-project-link" href={project.url} target="_blank" rel="noreferrer">Explore {project.name}<ArrowUpRight size={16} /></a>}
            </div>
            <div className="journey-project-art"><div className="journey-art-window"><Image src={`/art/${project.art}.webp`} alt="" fill unoptimized sizes="(max-width: 700px) 80vw, 42vw" /></div><span className="journey-art-caption">FIELD NOTES / 0{index + 1}<span>{project.name === "Rovalty" ? "IN PROGRESS ●" : "A LITTLE WORLD, BUILT."}</span></span></div>
          </article>
    );
  }

  return (
    <section ref={section} id="journey" className="journey-chapter journey-story" data-paused={paused} data-running="false" data-phase="walking" aria-labelledby="journey-heading">
      <div className="chapter-heading journey-heading">
        <span className="chapter-label">02 / THE JOURNEY</span>
        <h2 id="journey-heading">Learning the craft.<br /><span>Building for real.</span></h2>
        <p>From university to the team at Upstal.<span className="journey-intro-detail"><br />A little learning, a lot of building, and a few worlds along the way.</span></p>
        <a className="journey-start" href="#journey-project-1">FOLLOW THE TRAIL <ArrowDown size={14} /></a>
      </div>
      <div className="journey-projects">
        <svg className="journey-snake" aria-hidden="true"><path className="journey-snake-base" /><path className="journey-snake-ink" /></svg>
        <div className="journey-runner" aria-hidden="true"><div className="journey-runner-facing"><span className="map-byte" /></div><span className="journey-runner-shadow" /></div>
        {renderChapter(chapters[0], 0)}
        <div className="journey-employment-group" role="group" aria-labelledby="journey-job-heading">
          <header className="journey-employment">
            <span className="chapter-label">02 / THE PROFESSIONAL CHAPTER</span>
            <h3 id="journey-job-heading">Upstal</h3>
            <strong>Full-stack & frontend developer</strong>
            <p>June 2025 — Present</p>
            <span className="journey-employment-note">THREE PRODUCTS. ONE TEAM. STILL BUILDING.</span>
          </header>
          {chapters.slice(1).map((project, offset) => renderChapter(project, offset + 1))}
        </div>
        <span className="journey-destination" aria-hidden="true" />
      </div>
      <div className="journey-focus">
        <div className="journey-focus-sticky"><span className="chapter-label">THE ADVENTURE CONTINUES</span><h3>Still curious.<br />Still building.</h3><p>One more idea. One more adventure.<br />Maybe the next one is ours.</p><a className="button button-outline" href={profile.resume} download="Shafin-Resume.pdf">Get the full story <Download size={16} /></a><a className="journey-next-link" href="#projects">Explore my projects <ArrowDown size={16} /></a></div>
      </div>
      <div className="journey-flight" data-visible="false" data-expression="curious" aria-hidden="true">
        <div className="journey-flight-backdrop" />
        <div className="journey-flight-character"><StoryByte expressive /></div>
        <div className="journey-flight-caption"><span>STILL CURIOUS. STILL BUILDING.</span><span>KEEP SCROLLING <ArrowDown size={12} /></span></div>
      </div>
    </section>
  );
}
