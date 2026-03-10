"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import Lottie from "lottie-react";
import homeLoopAnim from "@/assets/HomeLoop.json";

export default function PageTransitionLoader() {
       const { isTransitioning, progress, title } = useTransition();

       return (
              <AnimatePresence>
                     {isTransitioning && (
                            <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   exit={{ opacity: 0 }}
                                   transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                   className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
                            >
                                   {/* Main Title */}
                                   <motion.h1
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                                          className="text-7xl md:text-9xl font-playfair font-light tracking-tighter mb-4"
                                   >
                                          {title}
                                   </motion.h1>

                                   {/* Progress Percent */}
                                   <motion.p
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.5, delay: 0.4 }}
                                          className="text-sm md:text-base font-playfair italic text-[#8A8A8A] mb-12"
                                   >
                                          Loading — {Math.round(progress)}%
                                   </motion.p>

                                   {/* Minimalist Illustration */}
                                   <motion.div
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ duration: 0.8, delay: 0.5 }}
                                          className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-80 invert filter"
                                   >
                                          <Lottie
                                                 animationData={homeLoopAnim}
                                                 loop={true}
                                                 autoPlay={true}
                                                 className="w-full h-full object-contain"
                                          />
                                   </motion.div>

                                   {/* Credits/Footer (Optional but matches huyml style) */}
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 0.5 }}
                                          transition={{ duration: 0.5, delay: 0.7 }}
                                          className="absolute bottom-12 text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A]"
                                   >
                                          Just an ordinary designer. From India with love.
                                   </motion.div>
                            </motion.div>
                     )}
              </AnimatePresence>
       );
}
