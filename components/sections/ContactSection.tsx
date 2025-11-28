"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

const socialLinks = [
  {
    name: "GitHub",
    url: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const contactInfo = [
  {
    label: "Email",
    value: "shafin3024344@gmail.com",
    href: "mailto:shafin3024344@gmail.com",
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-32 relative overflow-hidden">
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
          <p className="text-[#6366f1] font-mono mb-2 text-sm">05. Contact</p>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.05}
          >
            Get In Touch
          </ScrollFloat>
          <p className="text-[#a1a1aa] mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Contact Info</h3>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <span className="text-[#6366f1] font-mono text-xs sm:text-sm min-w-[60px] sm:min-w-[80px]">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-[#a1a1aa] hover:text-white transition-colors text-sm sm:text-base break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-[#a1a1aa] text-sm sm:text-base">{info.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xs sm:text-sm font-mono text-[#6366f1] mb-3 sm:mb-4">Follow Me</h4>
              <div className="flex gap-3 sm:gap-4 flex-wrap w-fit">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18181b] border border-[#27272a] grid place-items-center text-[#a1a1aa] hover:text-[#6366f1] hover:border-[#6366f1]/50 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#27272a]">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Let&apos;s work together
              </h3>
              <p className="text-[#71717a] text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out if you&apos;d like to collaborate or just have a chat.
              </p>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366f1] px-5 sm:px-6 py-2.5 sm:py-3 font-medium text-white text-sm sm:text-base transition-colors hover:bg-[#818cf8] w-full sm:w-auto"
              >
                <span>Say Hello</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
