"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

const education = [
  {
    degree: "Bachelor in Computer Science and Engineering",
    institution: "American International University - Bangladesh",
    major: "Software Engineering",
    period: "2022 - 2025",
    description: "Focused on software engineering, algorithms, and web development.",
    result: "GPA: 3.6/4.0",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Adamjee Cantonment College",
    period: "2018 - 2020",
    // description: "Science major with focus on mathematics and computer studies.",
    result: "Grade: 5.00",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Adamjee Cantonment Public School",
    period: "2012 - 2018",
    // description: "Science major with focus on mathematics and computer studies.",
    result: "Grade: 5.00",
  },
];

function EducationItem({ edu, index, isLast }: { edu: typeof education[0]; index: number; isLast: boolean }) {
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
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 bg-[#0a0a0a] border-[#6366f1]" />
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
          className="flex items-center gap-2 sm:gap-3 mb-2"
        >
          <span className="text-[#6366f1] font-mono text-xs sm:text-sm">
            {edu.period}
          </span>
        </motion.div>

        {/* Degree */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1"
        >
          {edu.degree}
        </motion.h3>

        {/* Institution & Major */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-[#a1a1aa] text-sm sm:text-base mb-3"
        >
          {edu.institution}
          {edu.major && <span className="text-[#6366f1]"> - Major in {edu.major}</span>}
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
            {edu.description}
          </p>
        </motion.div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#18181b] text-[#6366f1] border border-[#27272a]">
            {edu.result}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="education" className="py-16 md:py-32 relative overflow-hidden">
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
          <p className="text-[#6366f1] font-mono mb-2">04. Education</p>
          <ScrollFloat
            scrollContainerRef={sectionRef}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.05}
          >
            Education
          </ScrollFloat>
          <p className="text-[#a1a1aa] mt-4 max-w-2xl mx-auto">
            My academic background and qualifications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {education.map((edu, index) => (
            <EducationItem
              key={edu.degree}
              edu={edu}
              index={index}
              isLast={index === education.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
