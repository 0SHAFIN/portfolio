"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const RESUME_URL = "/resume/shafin_resume.pdf";

const navLinks = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Education", href: "#education", id: "education" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }

      // If at the very top, no section is active
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto"
    >
      <motion.div
        animate={{
          padding: isScrolled ? "8px 8px" : "8px 20px",
          gap: isScrolled ? "4px" : "8px",
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`flex items-center rounded-full border transition-all duration-500 ease-out ${isScrolled
          ? "bg-[#18181b]/90 backdrop-blur-md border-[#27272a]"
          : "bg-[#18181b]/50 backdrop-blur-sm border-[#27272a]/50"
          }`}
      >
        {/* Logo - Desktop only */}
        <a href="#" className="hidden md:flex items-center mr-2 md:mr-4 pl-2">
          <motion.div
            animate={{
              width: isScrolled ? 32 : 40,
              height: isScrolled ? 32 : 40,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-lg"
          >
            <Image
              src="/svg/logo.svg"
              alt="Shafin Logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </motion.div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              animate={{
                padding: isScrolled ? "8px 12px" : "8px 20px",
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={`relative text-sm transition-colors duration-200 ${activeSection === link.id
                ? "text-white"
                : "text-[#a1a1aa] hover:text-white"
                }`}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Underline indicator */}
              <motion.span
                className="absolute bottom-1 left-0 h-[2px] bg-[#6366f1] rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: activeSection === link.id ? "100%" : 0,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.a>
          ))}
        </div>

        {/* Resume Button */}
        <a
          href={RESUME_URL}
          download="Shafin_Resume.pdf"
          className="hidden md:block ml-2 px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-full hover:bg-[#818cf8] transition-colors"
        >
          Resume
        </a>

        {/* Mobile Logo (visible only on mobile) */}
        <a href="#" className="md:hidden flex items-center pl-2">
          <motion.div
            animate={{
              width: isScrolled ? 32 : 36,
              height: isScrolled ? 32 : 36,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-lg"
          >
            <Image
              src="/svg/logo.svg"
              alt="Shafin Logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </motion.div>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#a1a1aa] hover:text-white transition-colors ml-auto"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#18181b]/90 backdrop-blur-md border border-[#27272a]"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${activeSection === link.id
                    ? "text-white bg-[#27272a]"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={RESUME_URL}
                download="Shafin_Resume.pdf"
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg hover:bg-[#818cf8] transition-colors text-center"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
