"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-[100dvh] overflow-hidden bg-[#1a1008] flex flex-col justify-end">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full"
                    style={{
                        background: "radial-gradient(ellipse at 70% 40%, #3d1a08 0%, #1a1008 60%, #0d0603 100%)"
                    }}
                />
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                        <filter id="noiseFilter">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.65"
                                numOctaves="3"
                                stitchTiles="stitch"
                            />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>
            </div>

            {/* Content Container */}
            <div className="container-site relative z-10 w-full pb-[60px]">
                <div className="max-w-6xl">
                    {/* Availability Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <div className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                        <span className="mono-tag text-[#f0ece0] opacity-70">
                            Available for freelance & full-time
                        </span>
                    </motion.div>

                    {/* H1 Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="display-hero text-[#f0ece0] block"
                    >
                        Aryan Arora
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-4 max-w-[480px] text-[0.9rem] leading-[1.7] text-[#f0ece0] opacity-65"
                    >
                        BCA graduate skilled in full-stack web development, React, Node.js, Python, and AI integration. Based in India — available worldwide.
                    </motion.p>

                    {/* CTA Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        <Link href="#projects" className="btn-rust">
                            View Projects
                        </Link>
                        <a
                            href="/Aryan_Arora_Resume.pdf"
                            download
                            className="btn-outline border-[#f0ece0] text-[#f0ece0] hover:bg-[#f0ece0] hover:text-[#1a1008]"
                        >
                            Download CV
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-1"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                        </a>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[rgba(240,236,224,0.15)] pt-8"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="font-fraunces text-2xl font-bold text-[#f0ece0]">8.49</span>
                            <span className="mono-tag text-[#f0ece0] opacity-50">University CGPA</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-fraunces text-2xl font-bold text-[#f0ece0]">3+</span>
                            <span className="mono-tag text-[#f0ece0] opacity-50">Projects Shipped</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-fraunces text-2xl font-bold text-[#f0ece0]">5+</span>
                            <span className="mono-tag text-[#f0ece0] opacity-50">Technologies</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-fraunces text-2xl font-bold text-[#f0ece0]">2025</span>
                            <span className="mono-tag text-[#f0ece0] opacity-50">Seeking Roles</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 right-8 flex flex-col items-center gap-2 sm:right-[var(--page-gutter)]"
            >
                <span className="mono-tag text-[#f0ece0] opacity-40 [writing-mode:vertical-rl]">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-[#f0ece0] opacity-40"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
