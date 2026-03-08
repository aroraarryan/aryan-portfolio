"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

import { useTransition } from "@/context/TransitionContext";

export default function Navbar() {
       const pathname = usePathname();
       const { scrollY } = useScroll();
       const { startTransition } = useTransition();

       const navY = useMotionValue(-100);
       const yTemplate = useMotionTemplate`${navY}%`;
       const navOpacity = useMotionValue(0);

       // Initial load animation
       useEffect(() => {
              animate(navY, 0, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
              animate(navOpacity, 1, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
       }, [navY, navOpacity]);

       useMotionValueEvent(scrollY, "change", (latest) => {
              const previous = scrollY.getPrevious() ?? 0;
              const direction = latest - previous;

              if (latest <= 200) {
                     // Scrubbing zone (0-200px from top)
                     // Stop active triggered animations to prioritize math
                     navY.stop();
                     navOpacity.stop();

                     const progress = latest / 200;
                     navY.set(-100 * progress);
                     navOpacity.set(1 - progress);
              } else {
                     // Trigger zone (Deep in page)
                     if (direction < -5) {
                            // Scrolling UP -> animate to visible
                            animate(navY, 0, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
                            animate(navOpacity, 1, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
                     } else if (direction > 5) {
                            // Scrolling DOWN -> animate to hidden
                            animate(navY, -100, { duration: 0.4, ease: "easeInOut" });
                            animate(navOpacity, 0, { duration: 0.4, ease: "easeInOut" });
                     }
              }
       });

       return (
              <motion.nav
                     style={{ y: yTemplate, opacity: navOpacity }}
                     className="fixed top-0 left-0 w-full z-40 text-white mix-blend-difference flex select-none"
              >
                     {/* Left section: Name */}
                     <div className="w-1/3 md:w-1/4 lg:w-1/5 flex items-center px-4 md:px-8 py-5">
                            <Link
                                   href="/"
                                   className="text-xs md:text-sm font-medium tracking-widest uppercase hover:opacity-75 transition-opacity"
                            >
                                   ARYAN ARORA
                            </Link>
                     </div>

                     {/* Middle section: Links */}
                     <div className="flex-1 flex justify-around items-center px-4 md:px-8">
                            <Link
                                   href={pathname === "/" ? "#projects" : "/#projects"}
                                   className="text-xs md:text-sm font-medium tracking-widest uppercase hover:opacity-75 transition-opacity"
                            >
                                   PROJECTS
                            </Link>
                            <div
                                   onClick={() => startTransition("/about")}
                                   className="text-xs md:text-sm font-medium tracking-widest uppercase hover:opacity-75 transition-opacity cursor-pointer"
                            >
                                   ABOUT
                            </div>
                     </div>

                     {/* Right section: Contact */}
                     <div className="w-1/4 md:w-1/5 flex justify-end items-center px-4 md:px-8">
                            <Link
                                   href={pathname === "/" ? "#contact" : "/#contact"}
                                   className="text-xs md:text-sm font-medium tracking-widest uppercase hover:opacity-75 transition-opacity"
                            >
                                   CONTACT
                            </Link>
                     </div>
              </motion.nav>
       );
}
