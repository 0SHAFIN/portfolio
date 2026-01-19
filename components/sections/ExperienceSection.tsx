"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

const experiences = [
  {
    project: "10xProfit",
    company: "Upstal",
    role: "Frontend Developer",
    period: "15th June 2025 - Present",
    status: "current",
    description: "10XProfit.io – All-in-one toolkit and training for Amazon sellers, offering tools for product research, profit calculation, and business growth.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Git", "Docker"],
    link: "https://10xprofit.io/",
  },
  {
    project: "Hattim",
    role: "Lead Full-Stack Developer",
    period: "December 2025 – Present",
    status: "current",
    description: "Hattim – Online toy car store. Engineered as a comprehensive full-stack platform with complex product listings, order processing, and type-safe database operations using Prisma and PostgreSQL.",
    tech: ["Nextjs", "Nodejs", "Prisma", "PostgreSQL", "REST API", "Tailwind CSS"],
    link: "https://hattimbd.com/",
  },
  {
    project: "Velopage",
    // company: "Velopage Inc",
    role: "Frontend Developer",
    period: "1st November 2025 - Present",
    status: "current",
    description: "Velopage.io – AI-powered tool to quickly create professional e-commerce product pages for Shopify and dropshipping stores.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Git"],
    link: "https://velopage.io/",
  },
  {
    project: "MJ Properties",
    // company: "MJ Properties",
    role: "Full-Stack Developer",
    period: "1st september 2025 - 15th October 2025",
    status: "completed",
    description: "MJ Properties – Dubai-based real estate agency specializing in luxury residential and commercial properties, buying, selling, and rentals.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Supabase", "Tailwind CSS", "Git"],
    link: "https://www.mjproperties.ae/",
  },
  {
    project: "Popsurge",
    // company: "Popsurge Media",
    role: "Frontend Developer",
    period: "15th january 2025 - 15th february 2025",
    status: "completed",
    description: "PopSurge – A tool for website owners to display popups, discounts, and promotional messages to engage users.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Supabase", "Git"],
    link: "https://www.getpopsurge.com/",
  },
];

function TimelineItem({ experience, index, isLast }: { experience: typeof experiences[0]; index: number; isLast: boolean }) {
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
      <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-0 w-[2px] bg-[#27272a]">
        {!isLast && (
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-[#6366f1] to-[#6366f1]/20"
          />
        )}
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute left-0 top-1 z-10"
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
        className={isLast ? "pb-0" : "pb-8 sm:pb-12 md:pb-16"}
      >
        {/* Period */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2"
        >
          <span className="text-[#6366f1] font-mono text-xs sm:text-sm">
            {experience.period}
          </span>
          {experience.status === "current" && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#6366f1]/20 text-[#6366f1]">
              Current
            </span>
          )}
        </motion.div>

        {/* Project */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1"
        >
          {experience.project}
        </motion.h3>

        {/* Company & Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-[#a1a1aa] text-sm sm:text-base mb-3"
        >
          {experience.role} {experience.company && <span className="text-[#6366f1]">@ {experience.company}</span>}
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-[#71717a] leading-relaxed text-sm md:text-base">
            {experience.description}
          </p>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-4 w-fit"
        >
          {experience.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              viewport={{ once: true }}
              className="px-2 md:px-3 py-1 rounded-md text-xs font-mono bg-[#18181b] text-[#a1a1aa] border border-[#27272a]"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

        {/* Visit Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors"
          >
            <span>Visit Website</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
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
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a14] to-[#0a0a0a]"
      />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 text-center"
        >
          <p className="text-[#6366f1] font-mono mb-2">03. Work</p>
          <ScrollFloat
            scrollContainerRef={sectionRef}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.05}
          >
            Experience
          </ScrollFloat>
          <p className="text-[#a1a1aa] mt-4 max-w-2xl mx-auto">
            My professional journey and the projects I&apos;ve contributed to
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.project}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
