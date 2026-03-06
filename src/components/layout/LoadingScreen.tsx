"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRevealing, setIsRevealing] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Lock scroll on mount
        document.body.style.overflow = "hidden";

        // Start reveal animation after 2.5s
        const revealTimer = setTimeout(() => {
            setIsRevealing(true);
        }, 2500);

        // Remove component from DOM after reveal animation finishes (~3.7s total)
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }, 3700);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(removeTimer);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1008] transition-all duration-1000 ${isRevealing ? "clip-reveal-active" : ""
                        } clip-reveal`}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-fraunces text-4xl md:text-6xl font-black text-[#f0ece0] tracking-tight"
                        >
                            Aryan Arora
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mono-tag mt-3 text-[#f0ece0] opacity-60"
                        >
                            Full-Stack Developer
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="mt-8 h-[2px] w-48 overflow-hidden bg-white/10">
                            <div className="h-full bg-[#5c1a0f] animate-progress" />
                        </div>
                    </div>

                    {/* Grain Overlay to match the site aesthetic */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                            <filter id="loadingNoise">
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.65"
                                    numOctaves="3"
                                    stitchTiles="stitch"
                                />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#loadingNoise)" />
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
