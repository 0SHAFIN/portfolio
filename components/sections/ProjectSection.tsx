"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import ScrollFloat from "@/components/ScrollFloat";

const projects = [
    {
        title: "Hattim",
        role: "Lead Full-Stack Developer",
        period: "December 2025 – Present",
        description: "Hattim – Online toy car store. I designed and developed the entire platform from start to end as a comprehensive full-stack application, ensuring a seamless shopping experience with complex product logic and secure processing.",
        tech: ["Nextjs", "Nodejs", "Prisma", "PostgreSQL", "REST API", "Tailwind CSS"],
        link: "https://hattimbd.com/",
        image: "/logo/hattim.webp",
    },
    {
        title: "Velopage",
        role: "Frontend Developer",
        period: "1st November 2025 - Present",
        description: "Velopage.io – AI-powered tool for high-converting landing pages. Serving as the solo frontend developer, I am responsible for building the entire user interface and ensuring a blazing-fast, responsive experience for dropshipping stores.",
        tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Git"],
        link: "https://velopage.io/",
        image: "/logo/velo.webp",
    },
    {
        title: "MJ Properties",
        role: "Full-Stack Developer",
        period: "1st September 2025 - 15th October 2025",
        description: "MJ Properties – Dubai-based luxury real estate agency. Worked as a full-stack developer within a professional team to build a sophisticated property portal, specializing in buy/sell/rental listing management and client-facing features.",
        tech: ["Nextjs", "Nodejs", "Typescript", "Supabase", "Tailwind CSS", "Git"],
        link: "https://www.mjproperties.ae/",
        image: "/logo/mj.webp",
    },
];

function ProjectCard({ project, index, isMobile = false }: { project: typeof projects[0]; index: number; isMobile?: boolean }) {
    return (
        <motion.div
            initial={!isMobile ? { opacity: 0, y: 30 } : {}}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative bg-[#18181b]/50 border border-[#27272a] rounded-3xl overflow-hidden hover:border-[#6366f1]/50 transition-all duration-500 h-full ${isMobile ? 'min-w-[80vw] sm:min-w-[400px] snap-center' : 'w-full'
                }`}
        >
            <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-[#18181b] border border-[#27272a] p-0.5 group-hover:border-[#6366f1]/50 transition-colors shrink-0 shadow-lg">
                            <Image
                                src={project.image}
                                alt={`${project.title} logo`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${project.role.toLowerCase().includes('full-stack') || project.role.toLowerCase().includes('fullstack')
                                    ? 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20'
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    }`}>
                                    {project.role.toLowerCase().includes('full-stack') || project.role.toLowerCase().includes('fullstack')
                                        ? 'Full-Stack Developer'
                                        : 'Frontend Developer'}
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-3xl font-black text-white group-hover:text-[#6366f1] transition-colors tracking-tight">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                    <span className="text-[#6366f1] font-mono text-xs sm:text-sm font-semibold sm:text-right">
                        {project.period}
                    </span>
                </div>

                <p className="text-[#a1a1aa] text-sm sm:text-base mb-6 leading-relaxed font-medium">
                    {project.description}
                </p>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6 w-full">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono bg-[#0a0a0a]/50 text-[#71717a] border border-[#27272a] hover:border-[#6366f1]/30 transition-colors"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto text-sm font-bold text-white bg-linear-to-r from-[#6366f1] to-[#818cf8] px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 group/link active:scale-95"
                    >
                        <span>Visit Live Site</span>
                        <svg
                            className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-[#6366f1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
        </motion.div>
    );
}

export default function ProjectSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} id="projects" className="py-20 md:py-40 relative overflow-hidden">
            {/* Animated background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0a0a14] to-[#0a0a0a]"
            />

            <div className="mx-auto max-w-5xl px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-28 text-center"
                >
                    <p className="text-[#6366f1] font-mono mb-4 tracking-[0.2em] uppercase text-sm font-bold">03. Works</p>
                    <ScrollFloat
                        scrollContainerRef={sectionRef}
                        animationDuration={1}
                        ease="back.inOut(2)"
                        scrollStart="center bottom+=50%"
                        scrollEnd="bottom bottom-=40%"
                        stagger={0.05}
                    >
                        Projects
                    </ScrollFloat>
                    <p className="text-[#a1a1aa] mt-6 max-w-3xl mx-auto text-base sm:text-xl leading-relaxed font-medium">
                        A selection of high-impact products I've built, ranging from massive full-stack marketplaces to specialized frontend tools.
                    </p>
                </motion.div>

                {/* Projects Display */}
                {isMobile ? (
                    <div className="relative -mx-6 px-6">
                        <div
                            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
                        >
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                    index={index}
                                    isMobile={true}
                                />
                            ))}
                        </div>
                        {/* Mobile Swipe Hint */}
                        <div className="flex justify-center gap-2 mt-4 md:hidden">
                            {projects.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6366f1]/30" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12 md:gap-20">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
