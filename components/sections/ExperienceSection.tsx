"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  link: string;
}

interface Experience {
  company: string;
  period: string;
  status: "current" | "completed";
  description?: string;
  projects: Project[];
}

const experiences: Experience[] = [
  {
    company: "Upstal",
    period: "June 2025 - Present",
    status: "current",
    description: "Digital solutions company specializing in e-commerce tools and high-performance web applications.",
    projects: [
      {
        name: "10xProfit",
        role: "Frontend Developer",
        period: "June 2025 - Present",
        description: "10XProfit.io – All-in-one toolkit and training for Amazon sellers, offering tools for product research, profit calculation, and business growth.",
        tech: ["Nextjs", "Typescript", "Tailwind CSS", "Git", "Docker"],
        link: "https://10xprofit.io/",
      }
    ]
  },
  {
    company: "Codesurge",
    period: "13th January 2025 - 15th June 2025",
    status: "completed",
    description: "A subsidiary company of Upstal focusing on digital product innovation and mobile solutions.",
    projects: [
      {
        name: "Popsurge",
        role: "Frontend Developer",
        period: "January 2025 - February 2025",
        description: "PopSurge – A tool for website owners to display popups, discounts, and promotional messages to engage users.",
        tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Supabase", "Git"],
        link: "https://www.getpopsurge.com/",
      },
      {
        name: "Testotrack",
        role: "Frontend Developer",
        period: "March 2025 - May 2025",
        description: "Testotrack – A cross-platform mobile application designed for efficient testing process management and tracking.",
        tech: ["Flutter", "Dart", "Firebase", "Nodejs", "Express"],
        link: "https://play.google.com/store/apps/details?id=com.codesurge.testotrack&hl=en",
      }
    ]
  }
];

function TimelineItem({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-8 sm:pl-10 md:pl-16"
    >
      {/* Timeline line */}
      <div className="absolute left-[5px] sm:left-[7px] top-4 bottom-0 w-[2px] bg-[#27272a]">
        {!isLast && (
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-linear-to-b from-[#6366f1] to-[#6366f1]/20"
          />
        )}
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute left-0 top-3 z-10"
      >
        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${experience.status === "current"
          ? "bg-[#6366f1] border-[#6366f1]"
          : "bg-[#0a0a0a] border-[#6366f1]"
          }`}>
          {experience.status === "current" && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#6366f1]"
            />
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, x }}
        className={isLast ? "pb-0" : "pb-12 sm:pb-20 md:pb-24"}
      >
        {/* Company Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2"
          >
            <span className="text-[#6366f1] font-mono text-sm sm:text-base font-bold">
              {experience.period}
            </span>
            {experience.status === "current" && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#6366f1]/20 text-[#6366f1]">
                Present
              </span>
            )}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3"
          >
            {experience.company}
          </motion.h3>

          {experience.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              className="text-[#a1a1aa] text-sm sm:text-base italic max-w-2xl border-l border-[#6366f1]/30 pl-4 py-1"
            >
              {experience.description}
            </motion.p>
          )}
        </div>

        {/* Projects within the company */}
        <div className="space-y-12 sm:space-y-16">
          {experience.projects.map((project, idx) => (
            <div key={project.name} className="relative group/project">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#18181b]/30 p-6 sm:p-8 rounded-2xl border border-[#27272a] hover:border-[#6366f1]/30 transition-all duration-300"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white group-hover/project:text-[#6366f1] transition-colors">
                    {project.name}
                  </h4>
                  <span className="text-[#6366f1]/80 text-sm font-mono font-medium">{project.role}</span>
                </div>

                <p className="text-[#a1a1aa] text-xs sm:text-sm font-mono mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                  {project.period}
                </p>

                <p className="text-[#71717a] leading-relaxed text-sm md:text-base mb-6 max-w-4xl">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono bg-[#0a0a0a] text-[#a1a1aa] border border-[#27272a]/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1] hover:text-[#818cf8] transition-colors group/visit"
                >
                  <span>Visit Website</span>
                  <svg
                    className="w-4 h-4 transform group-hover/visit:translate-x-1 group-hover/visit:-translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="experience" className="py-16 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0a0a14] to-[#0a0a0a]"
      />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0 }}
          className="mb-16 md:mb-24 text-center"
        >
          <p className="text-[#6366f1] font-mono mb-2">02. Career</p>
          <ScrollFloat
            scrollContainerRef={sectionRef}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="top 30%"
            stagger={0.05}
            textClassName="text-4xl md:text-7xl font-extrabold tracking-tight"
          >
            Experience
          </ScrollFloat>
          <p className="text-[#a1a1aa] mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            My professional journey structured by company and projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.company}
              experience={experience}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
