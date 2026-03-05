"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Full-Stack", value: "fullstack" },
    { label: "Web", value: "web" },
    { label: "AI/ML", value: "ai" },
    { label: "Backend", value: "backend" },
];

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = PROJECTS.filter((p) =>
        activeFilter === "All" || p.category === activeFilter
    );

    return (
        <section
            id="projects"
            className="section-pad bg-[#5c1a0f] text-[#f0ece0] relative overflow-hidden"
        >
            {/* Background Texture/Decorative */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="absolute -top-20 -right-20 text-[20vw] font-bold leading-none rotate-12">
                    PROJECTS
                </div>
            </div>

            <div className="container-site relative">
                {/* Header Area */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20 lg:mb-28 gap-12">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-offwhite/40 block mb-6 font-bold">Project Archive</span>
                        <h2 className="display-md text-offwhite leading-[1.1]">
                            Selected works & <br />
                            <em className="serif not-italic opacity-80 text-[#f5f0e8]">technical experiments.</em>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-6">
                        <p className="text-offwhite/50 text-xs uppercase tracking-widest font-bold">Filter by Category</p>
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                            {FILTER_OPTIONS.map((filter) => (
                                <button
                                    key={filter.value}
                                    onClick={() => setActiveFilter(filter.value)}
                                    className={cn(
                                        "px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-400 border",
                                        activeFilter === filter.value
                                            ? "bg-offwhite text-[#5c1a0f] border-offwhite"
                                            : "border-offwhite/20 text-offwhite/60 hover:border-offwhite/50 hover:text-offwhite"
                                    )}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Body Layout */}
                <div className="grid grid-cols-1 gap-0">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 border-t border-offwhite/10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={idx}
                                    total={filteredProjects.length}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Footer Indicator */}
                <div className="mt-20 flex justify-center lg:justify-end">
                    <div className="flex items-center gap-4 text-offwhite/30">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Collection 01 — 25</span>
                        <div className="w-12 h-[1px] bg-offwhite/20" />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const ProjectCard = ({
    project,
    onClick,
    index,
}: {
    project: Project;
    onClick: () => void;
    index: number;
    total: number;
}) => {
    const num = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
            onClick={onClick}
            className={cn(
                "group cursor-pointer relative overflow-hidden py-16 px-8 md:px-12 lg:px-16",
                "border-b border-offwhite/10",
                index % 2 === 0 && "md:border-r"
            )}
        >
            {/* Hover Background Layer */}
            <div className="absolute inset-0 bg-[#4a150c] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-editorial" />

            <div className="relative z-10">
                {/* Metadata */}
                <div className="flex items-center justify-between mb-12">
                    <span className="text-xs font-mono text-offwhite/30 font-bold tracking-tighter">{num}</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/40 font-bold border border-white/10 px-3 py-1">
                        {project.category}
                    </span>
                </div>

                {/* Title & Description */}
                <div className="mb-14">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite mb-6 leading-tight group-hover:pl-4 transition-all duration-500">
                        {project.title}
                    </h3>
                    <p className="text-offwhite/50 text-sm leading-relaxed max-w-sm group-hover:text-offwhite/80 transition-colors duration-500">
                        {project.description}
                    </p>
                </div>

                {/* Visual Preview / Thumbnail Area */}
                <div className="aspect-[16/9] bg-offwhite/5 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span className="text-6xl">
                                {project.category === "ai" ? "🤖" :
                                    project.category === "backend" ? "⚡" : "🌐"}
                            </span>
                        </div>
                    )}

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-offwhite text-[#5c1a0f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-lg">→</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-center mt-8">
                    <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[8px] uppercase tracking-widest text-offwhite/30 bg-white/5 px-2 py-0.5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-[10px] font-mono text-offwhite/20">{project.year}</span>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({
    project,
    onClose
}: {
    project: Project;
    onClose: () => void;
}) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#2a1a0e]/95 backdrop-blur-xl"
            />

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="relative w-full max-w-6xl bg-linen dark:bg-[#1a1008] shadow-2xl flex flex-col lg:flex-row max-h-full overflow-hidden"
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-6 right-6 z-20 w-10 h-10 bg-rust text-white flex items-center justify-center rounded-none"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Left: Image/Media Column */}
                <div className="lg:w-3/5 relative bg-white dark:bg-black/20 p-4 md:p-8 flex items-center justify-center aspect-video lg:aspect-auto">
                    <div className="relative w-full h-full min-h-[300px] border border-black/5 shadow-inner">
                        {project.imageUrl ? (
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-rust/5">
                                <span className="text-[10vw] opacity-10 grayscale">
                                    {project.category === "ai" ? "🤖" :
                                        project.category === "backend" ? "⚡" : "🌐"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Content Column */}
                <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col border-t lg:border-t-0 lg:border-l border-[var(--color-border-light)]">
                    <div className="flex items-center justify-between mb-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Case Study</span>
                        <button
                            onClick={onClose}
                            className="hidden lg:flex w-10 h-10 border border-[var(--color-border-light)] items-center justify-center text-inkbrown hover:bg-rust hover:border-rust hover:text-white transition-all duration-300"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex-grow">
                        <header className="mb-10">
                            <h2 className="display-sm text-inkbrown dark:text-offwhite leading-tight mb-4">
                                {project.title}
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono text-rust font-bold">{project.year}</span>
                                <span className="w-1.5 h-1.5 bg-rust rounded-full" />
                                <span className="text-[10px] uppercase tracking-widest text-muted font-bold">{project.category}</span>
                            </div>
                        </header>

                        <div className="space-y-10">
                            <p className="text-muted-brown dark:text-offwhite/70 text-sm md:text-base leading-relaxed">
                                {project.longDescription}
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Technology Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="border border-rust/30 text-rust dark:text-rust text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-[var(--color-border-light)]">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-rust justify-center py-4 flex-1 text-xs"
                            >
                                VIEW LIVE SITE
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-4 text-[10px] uppercase tracking-widest font-bold border border-[var(--color-border-light)] hover:bg-inkbrown hover:text-white transition-all duration-300"
                            >
                                SOURCE CODE
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;
