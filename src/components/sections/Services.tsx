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
        <section id="services" className="bg-linen dark:bg-[#0d0603] section-pad">
            <div className="container-site">
                {/* Header */}
                <span className="section-label">What I Offer</span>
                <hr className="border-t border-[var(--color-border-light)] mb-10" />

                <div className="grid lg:grid-cols-[280px_1fr] gap-16">
                    {/* LEFT column */}
                    <div>
                        <h2 className="display-sm text-inkbrown dark:text-offwhite mb-6">All Services</h2>
                        <p className="text-muted text-sm leading-relaxed mb-4">
                            From pixel-perfect frontends to intelligent backend systems. Every project delivered with clean code, clear communication, and fast turnaround.
                        </p>
                        <p className="text-muted text-sm leading-relaxed">
                            Transparent pricing, clear deliverables, and post-delivery support included on all projects.
                        </p>

                        <div className="mt-8">
                            <a href="#contact" className="text-sm text-rust font-medium hover:underline inline-flex items-center gap-2">
                                <span>→</span> Discuss your project
                            </a>
                        </div>
                    </div>

                    {/* RIGHT column — editorial service index */}
                    <div className="border-b border-[var(--color-border-light)]">
                        {SERVICES.map((service) => {
                            const isExpanded = expandedId === service.id;

                            return (
                                <div
                                    key={service.id}
                                    className="group border-t border-[var(--color-border-light)] transition-colors cursor-pointer"
                                    onClick={() => toggleService(service.id)}
                                >
                                    <div className="flex items-start justify-between gap-8 py-7">
                                        <h3 className={cn(
                                            "display-lg uppercase transition-colors duration-200",
                                            "text-inkbrown dark:text-offwhite group-hover:text-rust",
                                            isExpanded && "text-rust"
                                        )}>
                                            {service.title}
                                        </h3>

                                        {!isExpanded && (
                                            <span className="mono-tag text-muted self-end py-2">
                                                Starts {service.startingPrice}
                                            </span>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-10 grid md:grid-cols-2 gap-8">
                                                    <div>
                                                        <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
                                                            {service.description}
                                                        </p>
                                                        <div className="space-y-2">
                                                            {service.deliverables.map((item, idx) => (
                                                                <div key={idx} className="flex gap-2 items-start">
                                                                    <span className="text-rust text-xs mt-0.5">✓</span>
                                                                    <span className="text-xs text-inkbrown dark:text-offwhite/80">{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start md:items-end justify-between">
                                                        <div className="text-left md:text-right">
                                                            <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Starting From</p>
                                                            <p className="font-fraunces font-bold text-2xl text-rust">{service.startingPrice}</p>
                                                        </div>
                                                        <a href="#contact" className="btn-rust mt-6">Book Service</a>
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
                <div className="text-center mt-16 pt-8 border-t border-[var(--color-border-light)]">
                    <a href="#contact" className="btn-rust">Start a Project →</a>
                </div>
            </div>
        </section>
    );
};

export default Services;
