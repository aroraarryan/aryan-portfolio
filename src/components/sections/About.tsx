"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { cn } from "@/lib/utils";

const facts = [
    {
        emoji: "🎓",
        value: "BCA Graduate",
        label: "Graphic Era Hill University",
        delay: "delay-100",
    },
    {
        emoji: "⭐",
        value: "8.49 CGPA",
        label: "Academic performance",
        delay: "delay-200",
    },
    {
        emoji: "🌍",
        value: "India",
        label: "Available worldwide",
        delay: "delay-300",
    },
    {
        emoji: "⚡",
        value: "< 24h",
        label: "Response time",
        delay: "delay-400",
    },
];

const About = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            id="about"
            ref={ref}
            className="section-pad bg-[#f5f0e8] dark:bg-[#1a1008] transition-colors duration-300"
        >
            <div className="container-site">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT COLUMN */}
                    <div className={cn("reveal", inView && "visible")}>
                        <span className="section-label">About</span>
                        <h2 className="display-sm text-inkbrown dark:text-offwhite mt-2 mb-6">
                            Detail-oriented developer,<br />
                            <em className="text-rust not-italic text-shadow-none">passionate learner.</em>
                        </h2>

                        <div className="space-y-4 text-muted-brown dark:text-offwhite/70 text-base leading-relaxed max-w-md">
                            <p>
                                I&apos;m Aryan Arora, a BCA graduate from Graphic Era Hill University (CGPA 8.49) with hands-on experience in full-stack web development, Python data tooling, and AI integrations.
                            </p>
                            <p>
                                I believe great software lives at the intersection of clean code, thoughtful UX, and continuous learning. Currently available for freelance projects and full-time opportunities.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link href="#resume" className="btn-outline">
                                See my background →
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {facts.map((fact, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "reveal bg-white dark:bg-[#2a1a0e] border border-[var(--color-border-light)] p-8 transition-all duration-300",
                                    inView && "visible",
                                    fact.delay
                                )}
                            >
                                <div className="text-3xl mb-3">{fact.emoji}</div>
                                <div className="font-fraunces font-bold text-xl text-inkbrown dark:text-offwhite">
                                    {fact.value}
                                </div>
                                <div className="mono-tag text-muted-brown dark:text-offwhite/50 mt-1">
                                    {fact.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
