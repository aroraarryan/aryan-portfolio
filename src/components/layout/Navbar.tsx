"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navClasses = cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[var(--nav-height)]",
        scrolled
            ? "bg-[#f5f0e8]/90 dark:bg-[#1a1008]/90 backdrop-blur-md border-b border-[rgba(42,26,14,0.1)] dark:border-[rgba(240,236,224,0.1)]"
            : "bg-transparent"
    );

    if (!mounted) return <header className={navClasses} />;

    return (
        <header className={navClasses}>
            <div className="container-site flex items-center justify-between h-full">
                {/* Logo */}
                <Link href="/" className="text-xl font-fraunces flex items-center gap-0.5">
                    <span className="font-extrabold tracking-tight">Aryan</span>
                    <span className="font-light">Arora</span>
                    <span className="w-1.5 h-1.5 bg-[#5c1a0f] rounded-full mt-2" />
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="nav-link"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Toggle + Hire Me */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="pill-toggle flex items-center px-1"
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            animate={{
                                x: theme === "dark" ? 24 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f0ece0] dark:bg-[#2a1a0e]"
                        >
                            {theme === "dark" ? (
                                <MoonIcon className="w-3 h-3 text-[#f0ece0]" />
                            ) : (
                                <SunIcon className="w-3 h-3 text-[#2a1a0e]" />
                            )}
                        </motion.div>
                    </button>

                    {/* Hire Me Button */}
                    <Link href="#contact" className="btn-rust hidden md:inline-flex">
                        Hire Me
                    </Link>

                    {/* Hamburger Menu */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50"
                        onClick={toggleMenu}
                    >
                        <motion.span
                            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
                            className="w-6 h-0.5 bg-current transition-colors"
                        />
                        <motion.span
                            animate={{ opacity: menuOpen ? 0 : 1 }}
                            className="w-6 h-0.5 bg-current transition-colors"
                        />
                        <motion.span
                            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
                            className="w-6 h-0.5 bg-current transition-colors"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="fixed inset-x-0 top-[var(--nav-height)] bg-[#f5f0e8] dark:bg-[#1a1008] border-b border-[rgba(42,26,14,0.1)] dark:border-[rgba(240,236,224,0.1)] z-40"
                        >
                            <nav className="flex flex-col">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="px-6 py-4 label-sm text-inkbrown/70 dark:text-offwhite/70 border-b border-[rgba(42,26,14,0.05)] dark:border-[rgba(240,236,224,0.05)] hover:bg-[rgba(42,26,14,0.02)]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="p-6">
                                    <Link
                                        href="#contact"
                                        onClick={() => setMenuOpen(false)}
                                        className="btn-rust w-full justify-center"
                                    >
                                        Hire Me
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

const SunIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
);

export default Navbar;
