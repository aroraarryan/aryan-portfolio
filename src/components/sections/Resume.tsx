"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TIMELINE, SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

const Resume = () => {
    return (
        <section
            id="resume"
            className="section-pad bg-linen dark:bg-[#0d0603] transition-colors duration-300 relative overflow-hidden"
        >
            {/* Background Text Accent */}
            <div className="absolute left-0 bottom-0 opacity-[0.02] pointer-events-none select-none">
                <div className="text-[25vw] font-bold leading-none -translate-x-1/4 translate-y-1/4 uppercase">
                    Journey
                </div>
            </div>

            <div className="container-site relative">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border-light)] pb-10 mb-20">
                    <div className="max-w-xl">
                        <span className="section-label mb-6 block">Evolution</span>
                        <h2 className="display-md leading-[1.1]">
                            Educational path & <br />
                            <em className="serif not-italic text-rust uppercase tracking-tighter">milestones.</em>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 mt-10 md:mt-0">
                        <p className="text-muted text-xs uppercase tracking-widest font-bold">Curriculum Vitae</p>
                        <a
                            href="/Aryan_resume.pdf"
                            download
                            className="group flex items-center gap-4 text-sm font-bold text-inkbrown dark:text-offwhite hover:text-rust transition-colors"
                        >
                            <span className="w-12 h-12 rounded-full border border-[var(--color-border-light)] flex items-center justify-center group-hover:bg-rust group-hover:border-rust group-hover:text-white transition-all duration-300">
                                ↓
                            </span>
                            [ DOWNLOAD CV ]
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20 xl:gap-32">
                    {/* LEFT — The Journey Timeline */}
                    <div className="relative">
                        {/* The Central Line */}
                        <div className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[1px] bg-rust/20" />

                        <div className="space-y-0">
                            {TIMELINE.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    item={item}
                                    isLast={index === TIMELINE.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Technical Specialization */}
                    <aside className="lg:sticky lg:top-32 h-fit space-y-16">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-inkbrown dark:text-offwhite mb-10 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-rust" />
                                Toolstack
                            </h3>

                            <div className="space-y-12">
                                {Object.entries(SKILLS).map(([category, items]) => (
                                    <div key={category} className="group">
                                        <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold mb-5 group-hover:text-rust transition-colors">
                                            {category.replace(/_/g, " / ")}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[var(--color-border-light)] dark:border-white/5 bg-white/30 dark:bg-white/2 hover:border-rust hover:text-rust transition-all duration-300 cursor-default"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 border border-rust/10 bg-rust/[0.02] relative group">
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-rust/30 transition-all duration-500 group-hover:w-full group-hover:h-full" />
                            <h4 className="text-[10px] uppercase tracking-widest text-rust font-bold mb-6">Core Competencies</h4>
                            <ul className="grid grid-cols-1 gap-4">
                                {["Analytical Thought", "Agile Execution", "Fast Adaptation", "Collective Leadership"].map((strength) => (
                                    <li key={strength} className="flex items-center gap-4 group/item">
                                        <div className="w-1.5 h-1.5 bg-rust rotate-45 group-hover/item:rotate-90 transition-transform duration-300" />
                                        <span className="text-xs font-bold text-inkbrown dark:text-offwhite opacity-70 group-hover/item:opacity-100 transition-opacity">
                                            {strength}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            className={cn(
                "relative pl-12 md:pl-20 pb-16 last:pb-0 group"
            )}
        >
            {/* The Node Marker */}
            <div className="absolute left-0 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] bg-linen dark:bg-[#0d0603] border-2 border-rust z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-45 group-hover:bg-rust group-hover:shadow-[0_0_15px_rgba(92,26,15,0.4)]" />

            <div className="grid grid-cols-1 gap-6">
                {/* Period & Category */}
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs font-mono font-bold text-rust bg-rust/5 px-3 py-1 border border-rust/10">
                        {item.period}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted border-l border-[var(--color-border-light)] pl-4">
                        {item.type}
                    </span>
                    {item.badge && (
                        <span className="text-[9px] uppercase tracking-widest font-black text-white bg-rust px-2 py-0.5">
                            {item.badge}
                        </span>
                    )}
                </div>

                {/* Content Area */}
                <div className="max-w-3xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-inkbrown dark:text-offwhite leading-tight mb-2 group-hover:text-rust transition-colors duration-500">
                        {item.title}
                    </h3>
                    <div className="text-rust/80 dark:text-rust font-bold text-xs uppercase tracking-widest mb-6">
                        {item.organization}
                    </div>

                    <p className="text-muted text-sm md:text-base leading-relaxed mb-8 opacity-80">
                        {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {item.highlights.map((highlight: string, i: number) => (
                                <div key={i} className="p-4 bg-white/20 dark:bg-white/5 border border-black/5 hover:border-rust/20 transition-all group/quote">
                                    <p className="text-[11px] md:text-xs text-muted-brown dark:text-offwhite/60 leading-relaxed font-medium">
                                        <span className="text-rust text-lg font-serif leading-none mr-1">“</span>
                                        {highlight}
                                        <span className="text-rust text-lg font-serif leading-none ml-1">”</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;
