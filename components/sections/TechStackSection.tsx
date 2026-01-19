"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiFlutter,
  SiNestjs,
  SiExpress,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiDart,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
  SiArduino,
  SiPrisma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import { TbApi } from "react-icons/tb";

// Icons using react-icons
const Icons = {
  React: () => <SiReact className="w-8 h-8" color="#61DAFB" />,
  NextJS: () => <SiNextdotjs className="w-8 h-8" color="white" />,
  TypeScript: () => <SiTypescript className="w-8 h-8" color="#3178C6" />,
  JavaScript: () => <SiJavascript className="w-8 h-8" color="#F7DF1E" />,
  TailwindCSS: () => <SiTailwindcss className="w-8 h-8" color="#06B6D4" />,
  FramerMotion: () => <SiFramer className="w-8 h-8" color="#0055FF" />,
  Flutter: () => <SiFlutter className="w-8 h-8" color="#02569B" />,
  NestJS: () => <SiNestjs className="w-8 h-8" color="#E0234E" />,
  Express: () => <SiExpress className="w-8 h-8" color="white" />,
  NodeJS: () => <SiNodedotjs className="w-8 h-8" color="#339933" />,
  Python: () => <SiPython className="w-8 h-8" color="#3776AB" />,
  CPlusPlus: () => <SiCplusplus className="w-8 h-8" color="#00599C" />,
  Dart: () => <SiDart className="w-8 h-8" color="#0175C2" />,
  PostgreSQL: () => <SiPostgresql className="w-8 h-8" color="#4169E1" />,
  RestAPI: () => <TbApi className="w-8 h-8" color="#61DAFB" />,
  Git: () => <SiGit className="w-8 h-8" color="#F05032" />,
  GitHub: () => <SiGithub className="w-8 h-8" color="white" />,
  Postman: () => <SiPostman className="w-8 h-8" color="#FF6C37" />,
  Arduino: () => <SiArduino className="w-8 h-8" color="#00979D" />,
  Prisma: () => <SiPrisma className="w-8 h-8" color="white" />,
  VSCode: () => <VscVscode className="w-8 h-8" color="#007ACC" />,
};

const techStack = [
  { name: "Next.js", icon: Icons.NextJS, category: "frontend" },
  { name: "React", icon: Icons.React, category: "frontend" },
  { name: "TypeScript", icon: Icons.TypeScript, category: "frontend" },
  { name: "JavaScript", icon: Icons.JavaScript, category: "frontend" },
  { name: "Tailwind CSS", icon: Icons.TailwindCSS, category: "frontend" },
  { name: "Framer Motion", icon: Icons.FramerMotion, category: "frontend" },
  { name: "Flutter", icon: Icons.Flutter, category: "frontend" },
  { name: "NestJS", icon: Icons.NestJS, category: "backend" },
  { name: "Express", icon: Icons.Express, category: "backend" },
  { name: "Node.js", icon: Icons.NodeJS, category: "backend" },
  { name: "Python", icon: Icons.Python, category: "backend" },
  { name: "C++", icon: Icons.CPlusPlus, category: "backend" },
  { name: "Dart", icon: Icons.Dart, category: "backend" },
  { name: "PostgreSQL", icon: Icons.PostgreSQL, category: "backend" },
  { name: "REST API", icon: Icons.RestAPI, category: "backend" },
  { name: "Git", icon: Icons.Git, category: "tools" },
  { name: "GitHub", icon: Icons.GitHub, category: "tools" },
  { name: "Postman", icon: Icons.Postman, category: "tools" },
  { name: "Prisma", icon: Icons.Prisma, category: "backend" },
  { name: "Arduino", icon: Icons.Arduino, category: "tools" },
  { name: "VS Code", icon: Icons.VSCode, category: "tools" },
];

// Small icons for orbiting background
const OrbitIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-6 h-6 rounded-lg bg-[#18181b]/80 border border-[#27272a]/50 flex items-center justify-center p-1 opacity-40">
    {children}
  </div>
);

export default function TechStackSection() {
  const techRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: techProgress } = useScroll({
    target: techRef,
    offset: ["start end", "end start"],
  });
  const techY = useTransform(techProgress, [0, 1], ["80px", "-80px"]);

  return (
    <section ref={techRef} id="skills" className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0f14] to-[#0a0a0a]" />

      {/* Orbiting Circles Background - hidden on mobile */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]">
          {/* Inner orbit */}
          <OrbitingCircles
            radius={150}
            duration={40}
            speed={1}
            path={true}
            iconSize={28}
          >
            <OrbitIcon><Icons.React /></OrbitIcon>
            <OrbitIcon><Icons.NextJS /></OrbitIcon>
            <OrbitIcon><Icons.TypeScript /></OrbitIcon>
            <OrbitIcon><Icons.JavaScript /></OrbitIcon>
            <OrbitIcon><Icons.TailwindCSS /></OrbitIcon>
          </OrbitingCircles>

          {/* Middle orbit - reverse */}
          <OrbitingCircles
            radius={250}
            duration={50}
            speed={1}
            reverse={true}
            path={true}
            iconSize={28}
          >
            <OrbitIcon><Icons.NestJS /></OrbitIcon>
            <OrbitIcon><Icons.NodeJS /></OrbitIcon>
            <OrbitIcon><Icons.Python /></OrbitIcon>
            <OrbitIcon><Icons.PostgreSQL /></OrbitIcon>
            <OrbitIcon><Icons.Express /></OrbitIcon>
            <OrbitIcon><Icons.Flutter /></OrbitIcon>
          </OrbitingCircles>

          {/* Outer orbit */}
          <OrbitingCircles
            radius={350}
            duration={60}
            speed={1}
            path={true}
            iconSize={28}
          >
            <OrbitIcon><Icons.Git /></OrbitIcon>
            <OrbitIcon><Icons.GitHub /></OrbitIcon>
            <OrbitIcon><Icons.Postman /></OrbitIcon>
            <OrbitIcon><Icons.Arduino /></OrbitIcon>
            <OrbitIcon><Icons.VSCode /></OrbitIcon>
            <OrbitIcon><Icons.FramerMotion /></OrbitIcon>
          </OrbitingCircles>
        </div>
      </div>

      <motion.div style={{ y: techY }} className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 w-full flex flex-col items-center justify-center text-center"
        >
          <p className="text-[#6366f1] font-mono mb-2">02. Skills</p>
          <ScrollFloat
            scrollContainerRef={scrollContainerRef}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.05}
          >
            Tech Stack
          </ScrollFloat>
          <p className="text-[#a1a1aa] mt-4 max-w-2xl">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
        <div className="absolute right-0 hidden lg:flex items-center justify-center pointer-events-none">
          <OrbitingCircles
            radius={150}
            duration={40}
            speed={1}
            path={true}
            iconSize={28}
          >
            <OrbitIcon><Icons.React /></OrbitIcon>
            <OrbitIcon><Icons.NextJS /></OrbitIcon>
            <OrbitIcon><Icons.TypeScript /></OrbitIcon>
            <OrbitIcon><Icons.TailwindCSS /></OrbitIcon>
          </OrbitingCircles>

        </div>
        <div className="absolute right-10 hidden lg:flex items-center justify-center pointer-events-none">
          <OrbitingCircles
            radius={250}
            duration={30}
            speed={1.3}
            path={true}
            iconSize={28}
          >
            <OrbitIcon><Icons.React /></OrbitIcon>
            <OrbitIcon><Icons.NextJS /></OrbitIcon>
            <OrbitIcon><Icons.TypeScript /></OrbitIcon>
            <OrbitIcon><Icons.TailwindCSS /></OrbitIcon>
          </OrbitingCircles>

        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-[#18181b]/60 backdrop-blur-sm rounded-xl md:rounded-2xl border border-[#27272a] hover:border-[#6366f1]/50 transition-all duration-300 h-full">
                  <div className="mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300 [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-7 sm:[&_svg]:h-7 md:[&_svg]:w-8 md:[&_svg]:h-8">
                    <Icon />
                  </div>
                  <span className="text-xs sm:text-sm text-[#a1a1aa] group-hover:text-white transition-colors text-center">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Category Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-fit mx-auto flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 md:mt-12"
        >
          {[
            { label: "Frontend", color: "#6366f1" },
            { label: "Backend", color: "#10b981" },
            { label: "Tools", color: "#f59e0b" },
          ].map((category) => (
            <div
              key={category.label}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#27272a] bg-[#18181b]/40"
            >
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs sm:text-sm text-[#a1a1aa]">{category.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
