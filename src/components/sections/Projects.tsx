"use client";

import React, { useState, useEffect } from "react";
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
            className="section-pad bg-[#5c1a0f] text-[#f0ece0]"
        >
            <div className="container-site">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                    <div className="reveal visible">
                        <span className="section-label text-offwhite/60">Featured Work</span>
                        <h2 className="display-sm text-offwhite mt-2">Projects</h2>
                    </div>

                    {/* Filter Tabs (Desktop/Tablet) */}
                    <div className="hidden sm:flex gap-2 flex-wrap">
                        {FILTER_OPTIONS.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-medium transition-all duration-300 border",
                                    activeFilter === filter.value
                                        ? "bg-[#f0ece0] text-[#2a1a0e] border-[#f0ece0]"
                                        : "border-offwhite/30 text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Filter Mobile (Simple Select placeholder or just Scrollable list) */}
                    <div className="sm:hidden flex gap-2 overflow-x-auto pb-4 w-full no-scrollbar">
                        {FILTER_OPTIONS.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-medium border whitespace-nowrap",
                                    activeFilter === filter.value
                                        ? "bg-[#f0ece0] text-[#2a1a0e] border-[#f0ece0]"
                                        : "border-offwhite/30 text-offwhite/70"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    {/* LEFT: Description */}
                    <div className="reveal visible delay-100">
                        <p className="text-offwhite/60 text-sm leading-relaxed max-w-xs">
                            A selection of web and AI projects — from academic builds to self-initiated experiments in fullstack architecture and intelligent systems.
                        </p>
                    </div>

                    {/* RIGHT: Project Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-0"
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
    total
}: {
    project: Project;
    onClick: () => void;
    index: number;
    total: number;
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onClick={onClick}
            className={cn(
                "group cursor-pointer border-offwhite/15 py-10 px-8 sm:px-12",
                "border-b",
                index % 2 === 0 && "md:border-r"
            )}
        >
            {/* Image Area */}
            <div className="aspect-video bg-offwhite/10 flex items-center justify-center overflow-hidden mb-6 relative transition-colors duration-500 group-hover:bg-offwhite/15">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-4xl opacity-40">
                        {project.category === "ai" ? "🤖" :
                            project.category === "backend" ? "⚡" : "🌐"}
                    </span>
                )}
            </div>

            {/* Breadcrumb Info */}
            <div className="border-t border-offwhite/15 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-offwhite/50 flex items-center gap-1.5">
                    {project.category} / <em className="not-italic text-offwhite/80">{project.title}</em>
                </p>
                <div className="flex justify-between items-center mt-3">
                    <span className="mono-tag text-offwhite/30 text-[9px]">{project.year}</span>
                    {project.featured && (
                        <span className="mono-tag text-offwhite/50 text-[9px]">★ FEATURED</span>
                    )}
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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#1a1008]/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-2xl bg-[#f5f0e8] dark:bg-[#1a1008] p-8 sm:p-12 shadow-2xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh] outline-none"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[var(--color-border-light)] flex items-center justify-center text-inkbrown hover:bg-inkbrown hover:text-offwhite transition-colors"
                >
                    ✕
                </button>

                <p className="text-[10px] uppercase tracking-widest text-muted mb-4">
                    {project.category} / <em>{project.title}</em>
                </p>

                <h2 className="font-fraunces text-3xl font-bold text-inkbrown dark:text-offwhite mb-6">
                    {project.title}
                </h2>

                <div className="space-y-8">
                    <p className="text-muted-brown dark:text-offwhite/70 text-base leading-relaxed">
                        {project.longDescription}
                    </p>

                    <div>
                        <h4 className="mono-tag text-muted mb-4 uppercase">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                                <span key={tech} className="border border-rust text-rust px-4 py-1 text-xs font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-rust px-8 py-3"
                            >
                                GitHub Repo
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline px-8 py-3"
                            >
                                Launch Site
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;
