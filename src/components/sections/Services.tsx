"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const Services = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleService = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="services" className="bg-linen dark:bg-[#0d0603] pt-20 pb-12 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-rust/[0.02] pointer-events-none" />

            <div className="container-site relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <div className="max-w-2xl">
                        <span className="section-label mb-6 block">Capabilities</span>
                        <h2 className="display-md leading-[1.1]">
                            Specialized solutions for the<br />
                            <em className="text-rust not-italic serif">modern digital landscape.</em>
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="mono-tag text-muted mb-2">Service Index</p>
                        <p className="text-xs font-bold tracking-widest text-inkbrown dark:text-offwhite">VOL. 2025</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-16 xl:gap-24">
                    {/* LEFT: Context */}
                    <div className="space-y-8">
                        <div className="p-8 border border-[var(--color-border-light)] bg-white/30 dark:bg-[#1a1a14]/30 backdrop-blur-sm">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-inkbrown dark:text-offwhite mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-rust" />
                                The Approach
                            </h3>
                            <p className="text-muted text-sm leading-relaxed mb-6">
                                My workflow is centered around transparency and technical excellence.
                                I don&apos;t just build features; I architect solutions that scale with your ambitions.
                            </p>
                            <ul className="space-y-4">
                                {["Strategic Planning", "Clean Architecture", "Performance First"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-inkbrown dark:text-offwhite">
                                        <span className="text-rust">0{i + 1}</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 px-2">
                            <p className="text-xs text-muted leading-relaxed italic">
                                &quot;Complexity is handled through elegant code and focused deliverables.&quot;
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Service Accordion */}
                    <div className="border-b border-[var(--color-border-light)]">
                        {SERVICES.map((service, index) => {
                            const isExpanded = expandedId === service.id;
                            const num = (index + 1).toString().padStart(2, '0');

                            return (
                                <div
                                    key={service.id}
                                    className="group border-t border-[var(--color-border-light)] transition-all duration-500 cursor-pointer"
                                    onClick={() => toggleService(service.id)}
                                >
                                    <div className="flex items-center justify-between gap-8 py-8 md:py-10">
                                        <div className="flex items-baseline gap-6 md:gap-10">
                                            <span className="text-xs font-mono text-rust opacity-50 font-bold">{num}</span>
                                            <h3 className={cn(
                                                "text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter transition-all duration-500 font-bold",
                                                "text-inkbrown/40 dark:text-offwhite/30 group-hover:text-inkbrown dark:group-hover:text-offwhite group-hover:pl-4",
                                                isExpanded && "text-inkbrown dark:text-offwhite pl-4"
                                            )}>
                                                {service.title}
                                            </h3>
                                        </div>

                                        <div className={cn(
                                            "w-10 h-10 border border-[var(--color-border-light)] flex items-center justify-center transition-all duration-500",
                                            isExpanded ? "bg-rust border-rust text-white rotate-45" : "group-hover:border-rust group-hover:text-rust"
                                        )}>
                                            <span className="text-xl leading-none">+</span>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-12 pl-12 md:pl-20 pr-4 grid md:grid-cols-[1.5fr_1fr] gap-12">
                                                    <div>
                                                        <p className="text-sm md:text-base text-muted leading-relaxed mb-8 max-w-md">
                                                            {service.description}
                                                        </p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                                            {service.deliverables.map((item, idx) => (
                                                                <div key={idx} className="flex gap-3 items-center">
                                                                    <div className="w-1.5 h-1.5 bg-rust rounded-full" />
                                                                    <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-inkbrown dark:text-offwhite/80">{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start md:items-end justify-end">
                                                        <a
                                                            href="#contact"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="btn-rust group/btn px-8 py-4 w-full md:w-auto text-center justify-center relative z-10"
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                Book Service
                                                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-16 pb-4 border-t border-[var(--color-border-light)] flex flex-col items-center text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted mb-8 font-bold">Ready to Start?</p>
                    <a href="#contact" className="display-sm hover:text-rust transition-colors duration-300">
                        Let&apos;s define your <em className="serif not-italic text-rust">next project.</em>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
