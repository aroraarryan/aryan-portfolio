"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TIMELINE, SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

const Resume = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="resume"
            className="section-pad bg-linen dark:bg-[#0d0603] transition-colors duration-300"
        >
            <div className="container-site">
                {/* Header Row */}
                <div
                    ref={headerRef}
                    className={cn(
                        "flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--color-border-light)] pb-6 mb-16 reveal",
                        headerInView && "visible"
                    )}
                >
                    <div>
                        <span className="section-label">Background</span>
                        <h2 className="display-sm mt-2">Education & Training</h2>
                    </div>
                    <a
                        href="/Aryan_Arora_Resume.pdf"
                        download
                        className="btn-rust text-sm mt-6 md:mt-0 px-6 py-3"
                    >
                        ↓ Download CV
                    </a>
                </div>

                {/* Two-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

                    {/* LEFT — Timeline */}
                    <div className="space-y-0">
                        {TIMELINE.map((item, index) => (
                            <TimelineRow key={item.id} item={item} delay={index * 100} />
                        ))}
                    </div>

                    {/* RIGHT — Skills Panel */}
                    <aside className="lg:sticky lg:top-[calc(var(--nav-height)+24px)] h-fit">
                        <h3 className="display-sm mb-8 text-2xl">Skills</h3>

                        <div className="space-y-10">
                            {Object.entries(SKILLS).map(([category, items]) => (
                                <div key={category}>
                                    <h4 className="mono-tag text-muted mb-4">
                                        {category.replace(/_/g, " / ")}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="border border-[var(--color-border-light)] dark:border-white/10 px-[14px] py-[6px] text-xs font-medium cursor-default transition-all duration-300 hover:border-rust hover:text-rust dark:text-offwhite/80"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8 border-t border-[var(--color-border-light)] dark:border-white/10">
                                <h4 className="mono-tag text-muted mb-4 uppercase">Strengths</h4>
                                <ul className="space-y-3">
                                    {["Leadership", "Teamwork", "Communication", "Quick Learner"].map((strength) => (
                                        <li key={strength} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-rust flex-shrink-0" />
                                            <span className="text-sm font-medium text-inkbrown dark:text-offwhite">
                                                {strength}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
};

const TimelineRow = ({ item, delay }: { item: any; delay: number }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                "relative border-t border-[var(--color-border-light)] dark:border-white/10 py-8 reveal",
                inView && "visible"
            )}
        >
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8">
                {/* Left Cell */}
                <div className="pt-1">
                    <div className="mono-tag text-muted">{item.period}</div>
                    <div className="mt-2">
                        <span className="bg-rust/10 text-rust text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block">
                            {item.type}
                        </span>
                    </div>
                </div>

                {/* Right Cell */}
                <div className="relative">
                    {item.badge && (
                        <div className="absolute -top-1 right-0">
                            <span className="mono-tag bg-rust text-offwhite px-2 py-1 text-[9px] leading-tight">
                                {item.badge}
                            </span>
                        </div>
                    )}

                    <h3 className="font-fraunces font-semibold text-xl text-inkbrown dark:text-offwhite leading-snug">
                        {item.title}
                    </h3>
                    <div className="text-rust font-medium text-sm mt-1">
                        {item.organization}
                    </div>
                    <p className="text-muted text-sm mt-3 leading-relaxed max-w-2xl">
                        {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-4 space-y-1.5">
                            {item.highlights.map((highlight: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-muted-brown dark:text-offwhite/50 leading-relaxed">
                                    <span className="text-rust mt-0.5 flex-shrink-0">›</span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Resume;
