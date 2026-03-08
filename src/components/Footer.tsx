"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform, useMotionTemplate } from "framer-motion";

export default function Footer() {
       const footerRef = useRef<HTMLElement>(null);
       const [isHovered, setIsHovered] = useState(false);

       // 1. Raw mouse coordinates relative to the footer
       const mouseX = useMotionValue(0);
       const mouseY = useMotionValue(0);

       // 2. Smooth "lagging" coordinates using a spring
       const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
       const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

       // 3. Calculate velocity (speed) of the cursor movement
       const velocityX = useVelocity(smoothX);
       const velocityY = useVelocity(smoothY);

       // Combine X and Y velocity into an absolute magnitude
       const combinedVelocity = useTransform([velocityX, velocityY], ([x, y]) => {
              return Math.sqrt(Math.pow(x as number, 2) + Math.pow(y as number, 2));
       });

       // 4. Transform velocity into mask radius size 
       // When stationary (0 velocity), the radius is 0 (invisible). 
       // Normal movement (~100-500 velocity) creates a 150px-200px mask.
       // Fast swipes (>1000 velocity) cause the mask to flare out hugely.
       const targetMaskSize = useTransform(combinedVelocity, [0, 50, 1500], [0, 150, 600]);

       // Squeeze the size transition through a spring so the expansion and contraction 
       // is smooth rather than abruptly snapping when velocity violently drops to 0.
       const maskSize = useSpring(targetMaskSize, { damping: 25, stiffness: 120, mass: 0.8 });

       // 5. Construct the dynamic CSS mask string
       const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

       const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
              if (!footerRef.current) return;
              const rect = footerRef.current.getBoundingClientRect();

              // Only update coordinates if within the bounds of the footer
              // (Prevents the mask from snapping to 0,0 when mouse leaves)
              if (e.clientY >= rect.top) {
                     mouseX.set(e.clientX - rect.left);
                     mouseY.set(e.clientY - rect.top);
              }
       };

       return (
              <footer
                     ref={footerRef}
                     onMouseMove={handleMouseMove}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     className="relative w-full bg-black text-white flex flex-col justify-end min-h-[50vh] pt-32 overflow-hidden group"
                     id="contact"
              >
                     {/* Interactive Dot Grid Background with Physics */}
                     <motion.div
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 pointer-events-none z-0"
                            style={{
                                   backgroundImage: "radial-gradient(#FF4500 1.5px, transparent 1.5px)",
                                   backgroundSize: "36px 36px",
                                   backgroundPosition: "center center",
                                   WebkitMaskImage: maskImage,
                                   maskImage: maskImage,
                            }}
                     />

                     <div className="flex flex-col md:flex-row px-8 md:px-24 mb-32 z-10">

                            {/* Navigation Links */}
                            <div className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3 mb-16 md:mb-0">
                                   <Link href="#contact" className="text-[#FF4500] text-sm md:text-base font-medium tracking-widest uppercase hover:text-white transition-colors w-max">
                                          CONTACT
                                   </Link>
                                   <Link href="#projects" className="text-[#FF4500] text-sm md:text-base font-medium tracking-widest uppercase hover:text-white transition-colors w-max">
                                          PROJECTS
                                   </Link>
                                   <Link href="#about" className="text-[#FF4500] text-sm md:text-base font-medium tracking-widest uppercase hover:text-white transition-colors w-max">
                                          ABOUT
                                   </Link>

                                   <div className="mt-12 text-[#8A8A8A] text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                                          <p>© 2026 — DESIGNED + BUILT</p>
                                          <p>BY ARYAN ARORA</p>
                                   </div>
                            </div>
                     </div>

                     {/* Bottom Pink Bar */}
                     <div className="relative w-full text-black py-4 px-4 md:px-8 mt-auto flex justify-between items-center">
                            {/* Orange Background Layer */}
                            <div className="absolute inset-0 bg-[#FF4500] z-[40]" />

                            {/* Interactive Buttons Layer */}
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="relative z-[60] text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity">
                                   GitHub
                            </a>
                            <a href="mailto:aryanarora28march@gmail.com" className="relative z-[60] text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity">
                                   Email
                            </a>
                            <a href="https://linkedin.com/in/aroraarryan" target="_blank" rel="noopener noreferrer" className="relative z-[60] text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity">
                                   LinkedIn
                            </a>
                     </div>
              </footer>
       );
}
