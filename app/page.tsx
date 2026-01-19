"use client";

import {
  HeroSection,
  AboutSection,
  TechStackSection,
  ExperienceSection,
  ProjectSection,
  EducationSection,
  ContactSection,
  Footer,
} from "@/components/sections";

import Noise from "@/components/Noise";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-[1000] pointer-events-none">
        <Noise
          patternSize={50}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={5}
        />
      </div>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectSection />
      <EducationSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
