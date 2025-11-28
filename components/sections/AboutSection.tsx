"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import {TextReveal} from "@/components/ui/text-reveal";
import ChromaGrid from "@/components/ChromaGrid";

export default function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutY = useTransform(aboutProgress, [0, 1], ["100px", "-100px"]);

  return (
    <section ref={aboutRef} id="about" className="py-16 md:py-32 relative overflow-x-clip">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]" />

      <motion.div style={{ y: aboutY }} className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24 w-full flex flex-col items-center justify-center"
        >
          <p className="text-[#6366f1] font-mono mb-2">01. About</p>
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            textClassName="text-2xl "
          >
            About Me
          </ScrollFloat>
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10 mx-auto items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:max-w-xl"
          >
            <TextReveal>
              I&apos;m a passionate developer with a strong background in full-stack
              development. I have experience working on a variety of projects,
              and I&apos;m always looking for new challenges to take on.
              My journey in web development started several years ago, and since then
              I&apos;ve had the privilege of working on diverse projects that have
              helped me grow as a developer.
            </TextReveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center shrink-0"
          >
            <div className="relative group">
              {/* Main image container */}
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 md:w-72 md:h-80 rounded-2xl overflow-hidden">
                <ChromaGrid
                  src="/image/photo.webp"
                  radius={150}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-14 h-14 md:w-20 md:h-20 border border-[#6366f1]/30 rounded-xl -z-10" />
              <div className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 w-10 h-10 md:w-16 md:h-16 border border-[#6366f1]/30 rounded-xl -z-10" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-[#6366f1] rounded-tl-lg -translate-x-1.5 -translate-y-1.5 md:-translate-x-2 md:-translate-y-2" />
              <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-[#6366f1] rounded-br-lg translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
