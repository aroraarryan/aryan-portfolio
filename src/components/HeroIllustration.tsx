"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import animationData from "../assets/HomeLoop.json";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface HeroIllustrationProps {
       isLoading?: boolean;
}

export default function HeroIllustration({ isLoading = false }: HeroIllustrationProps) {
       const { scrollYProgress } = useScroll();

       const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
       const yParallax = useTransform(scrollYProgress, [0, 0.4], ["-65%", "-85%"]);

       return (
              <motion.div
                     style={{ opacity }}
                     className="w-full h-full flex items-center justify-center pointer-events-none z-0"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={isLoading ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                     transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              >
                     <motion.div
                            style={{ y: yParallax }}
                            className="absolute right-0 md:right-[-5vw] top-1/2 w-[200%] md:w-[50vw] md:h-[50vw] h-[200%] z-0 pointer-events-none"
                     >
                            <Lottie
                                   animationData={animationData}
                                   loop={true}
                                   autoPlay={true}
                                   className="w-full h-full object-contain"
                            />
                     </motion.div>
              </motion.div>
       );
}
