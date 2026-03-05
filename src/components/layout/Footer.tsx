"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-linen dark:bg-[#0d0603] border-t border-[var(--color-border-light)]">
            {/* Top section */}
            <div className="py-[60px] pb-[40px]">
                <div className="container-site grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr_1fr] gap-12">
                    {/* Column 1: Logo & Social */}
                    <div className="flex flex-col">
                        <Link href="/" className="group flex items-baseline">
                            <span className="font-display font-bold text-xl text-inkbrown dark:text-offwhite tracking-tight">
                                Aryan Arora
                            </span>
                            <span className="w-1.5 h-1.5 bg-rust rounded-full ml-1" />
                        </Link>
                        <p className="text-xs text-muted mt-1 uppercase tracking-wider font-medium">
                            Full-Stack Developer & AI Engineer
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                            <a
                                href="https://github.com/aroraarryan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-rust transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/aroraarryan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-rust transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Work */}
                    <div>
                        <h4 className="mono-tag text-muted mb-4">WORK</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#projects"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#services"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/Aryan_Arora_Resume.pdf"
                                    download
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    Download CV
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Info */}
                    <div>
                        <h4 className="mono-tag text-muted mb-4">INFO</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#about"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#resume"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    Resume
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#contact"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h4 className="mono-tag text-muted mb-4">CONNECT</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="mailto:aryanarora28march@gmail.com"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    aryanarora28march@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/aroraarryan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    linkedin.com/in/aroraarryan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+918272060480"
                                    className="text-sm text-inkbrown dark:text-offwhite/70 hover:text-rust transition-colors duration-300 block mb-2"
                                >
                                    +91 82720 60480
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--color-border-light)] py-5">
                <div className="container-site flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted">
                        © 2025 Aryan Arora. All rights reserved
                    </p>
                    <p className="text-xs text-muted">
                        Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
