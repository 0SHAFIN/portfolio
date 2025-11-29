"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RippleGrid from "@/components/RippleGrid";
import { Fugaz_One } from "next/font/google";
import TextPressure from "@/components/TextPressure";
import { SiGithub } from "react-icons/si";


const fugazOne = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden pt-20 md:pt-30">
      {/* Background Effect - Fixed */}
      <div className="absolute inset-0 z-0 opacity-50 w-full h-full">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Hero Content - Parallax */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="flex h-full flex-col items-center justify-center px-6 pt-16 relative z-20 pointer-events-none"
      >
        <div className="mx-auto max-w-4xl text-center relative">
          <div className="absolute inset-0 -m-8 bg-[#0a0a0a]/70 blur-3xl rounded-3xl" />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 font-mono text-[#6366f1] text-lg"
            >
              Hi, my name is
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg ${fugazOne.className}`}
            >
              <TextPressure
                text="SHAFIN"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-xl font-semibold text-[#d4d4d8] sm:text-2xl md:text-3xl lg:text-4xl"
            >
              I build things for the web.
            </motion.h2>
           <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mb-8 md:mb-10 max-w-2xl text-base md:text-lg text-[#a1a1aa] leading-relaxed px-2"
          >
            I&apos;m a full-stack developer building clean, user-friendly, and accessible web applications.
          </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full sm:w-fit mx-auto flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row pointer-events-auto px-4 sm:px-0"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto text-center rounded-lg bg-[#6366f1] px-6 sm:px-8 py-3 font-medium text-white transition-all hover:bg-[#818cf8] hover:scale-105"
              >
                Get In Touch
              </a>
              <a
                href="https://github.com/0SHAFIN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center rounded-lg border border-[#6366f1] px-6 sm:px-8 py-3 font-medium text-[#6366f1] transition-all hover:bg-[#6366f1]/10 hover:scale-105 flex items-center justify-center gap-2"
              >
                <SiGithub className="w-5 h-5" />
                Visit GitHub
              </a>
            </motion.div>
          </div>
        </div>

      </motion.section>

      {/* Scroll indicator - hidden on very small screens, synced with hero parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: heroOpacity }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block z-20"
      >
        <div className="flex flex-col items-center gap-2 text-[#a1a1aa]">
          <span className="text-xs md:text-sm">Scroll</span>
          <div className="h-5 md:h-6 w-3 md:w-4 rounded-full border-2 border-[#a1a1aa] p-1">
            <div className="h-1 md:h-1.5 w-0.5 md:w-1 animate-bounce rounded-full bg-[#a1a1aa]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
