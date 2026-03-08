"use client";

import HeroIllustration from "./HeroIllustration";
import Magnetic from "./Magnetic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ANIMATED_WORDS = ["ecosystems", "architectures", "solutions", "worlds"];

interface HeroProps {
       isLoading?: boolean;
}

export default function Hero({ isLoading = false }: HeroProps) {
       const [wordIndex, setWordIndex] = useState(0);
       const [time, setTime] = useState("");
       const containerRef = useRef<HTMLElement>(null);

       const { scrollYProgress } = useScroll({
              target: containerRef,
              offset: ["start start", "end start"]
       });

       const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
       const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
       const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

       useEffect(() => {
              const interval = setInterval(() => {
                     setWordIndex((prev) => (prev + 1) % ANIMATED_WORDS.length);
              }, 2500);

              const timeInterval = setInterval(() => {
                     setTime(new Date().toLocaleTimeString(undefined, {
                            hour12: true,
                            hour: '2-digit',
                            minute: '2-digit'
                     }));
              }, 1000);

              return () => {
                     clearInterval(interval);
                     clearInterval(timeInterval);
              };
       }, []);

       return (
              <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col md:flex-row items-center px-4 md:px-12 pt-24 md:pt-0">

                     {/* Status Indicators */}
                     <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoading ? 0 : 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute top-24 left-4 md:left-12 z-20 hidden md:block"
                     >
                            <div className="flex flex-col gap-1">
                                   <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] opacity-80">
                                          Status: Available for freelance & full-time
                                   </span>
                                   <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                          Based in Dehradun, IN
                                   </span>
                            </div>
                     </motion.div>



                     <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoading ? 0 : 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute bottom-12 left-4 md:left-12 z-20 hidden md:block"
                     >
                            <div className="flex flex-col gap-1">
                                   <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                                          Local Time
                                   </span>
                                   <span className="text-xl font-mono text-white tracking-widest">
                                          {time}
                                   </span>
                            </div>
                     </motion.div>

                     {/* Typography Column */}
                     <div className="relative z-10 w-full md:w-[60%] flex flex-col mt-60 md:mt-66 order-2 md:order-1 pb-24 md:pb-0">
                            <motion.div
                                   style={{ opacity, scale, y }}
                                   initial={{ opacity: 0, y: 100 }}
                                   animate={isLoading ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
                                   transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                   className="flex flex-col relative"
                            >
                                   <Magnetic>
                                          <h1 className="text-[18vw] md:text-[7vw] leading-[0.9] font-black uppercase tracking-tighter text-white whitespace-nowrap cursor-default">
                                                 Building
                                          </h1>
                                   </Magnetic>
                                   <Magnetic>
                                          <h1 className="text-[18vw] md:text-[7vw] leading-[0.9] font-black uppercase tracking-tighter text-white whitespace-nowrap cursor-default">
                                                 Beautiful
                                          </h1>
                                   </Magnetic>
                                   <div className="flex flex-nowrap items-baseline gap-x-4 md:gap-x-6 relative w-full mt-[-0.5vw] md:mt-[-0.2vw]">
                                          <Magnetic>
                                                 <h1 className="text-[18vw] md:text-[7vw] leading-[0.9] font-black uppercase tracking-tighter text-white whitespace-nowrap cursor-default">
                                                        Modern
                                                 </h1>
                                          </Magnetic>
                                          <div className="relative flex items-end overflow-visible min-w-[30vw] md:min-w-[15vw]">
                                                 <AnimatePresence mode="wait">
                                                        <motion.div
                                                               key={wordIndex}
                                                               initial={{ opacity: 0, y: 15 }}
                                                               animate={{ opacity: 1, y: 0 }}
                                                               exit={{ opacity: 0, y: -15 }}
                                                               transition={{ duration: 0.4, ease: "easeInOut" }}
                                                               className="absolute left-0 bottom-[1.5vw] md:bottom-[0.8vw] font-playfair-serif italic font-light lowercase text-[#FF4500] text-[20vw] md:text-[8.5vw] leading-[0.8] tracking-normal whitespace-nowrap"
                                                        >
                                                               {ANIMATED_WORDS[wordIndex]}
                                                        </motion.div>
                                                 </AnimatePresence>
                                          </div>
                                   </div>
                            </motion.div>
                     </div>

                     {/* 2D Line-Art Lottie Column */}
                     <div className="relative z-0 w-full md:w-[40%] h-[40vh] md:h-screen flex items-center justify-end pointer-events-none order-1 md:order-2">
                            <HeroIllustration isLoading={isLoading} />
                     </div>

                     {/* Scroll Indicator */}
                     <motion.div
                            className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-20 flex flex-col items-center gap-2 text-white pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                     >
                            <span className="text-[8px] uppercase tracking-[0.3em] font-medium rotate-90 origin-right mr-2 mb-4 text-[#8A8A8A]">
                                   Scroll
                            </span>
                            <div className="w-[1px] h-10 md:h-16 bg-white/20 overflow-hidden relative">
                                   <div className="w-full h-1/2 bg-[#FF4500] absolute top-0 animate-scroll-down" />
                            </div>
                     </motion.div>

              </section>
       );
}
