"use client";

import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/HomeLoop.json";

interface LoadingScreenProps {
       isLoading: boolean;
       onComplete: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
       const [isVisible, setIsVisible] = useState(true);
       const [stage, setStage] = useState<"initial" | "text-appear" | "text-split" | "done">("initial");

       useEffect(() => {
              // Lock scrolling while the loader is active
              document.body.style.overflow = "hidden";

              const sequence = async () => {
                     // 1. Initial short pause
                     await new Promise((r) => setTimeout(r, 600));

                     // 2. Text fades in
                     setStage("text-appear");
                     await new Promise((r) => setTimeout(r, 1200)); // wait for text fade in and let user read it

                     // 3. Text splits vertically revealing illustration
                     setStage("text-split");
                     await new Promise((r) => setTimeout(r, 1800)); // wait for text to split and illustration to appear

                     // 4. Trigger the additive transition to the Hero
                     setStage("done");
                     onComplete();

                     // 5. Remove loading screen from DOM after its fade out
                     setTimeout(() => {
                            setIsVisible(false);
                            document.body.style.overflow = ""; // Re-enable scrolling
                     }, 1500);
              };

              sequence();

              return () => {
                     document.body.style.overflow = "";
              };
       }, [onComplete]);

       if (!isVisible) return null;

       return (
              <AnimatePresence>
                     {isLoading && (
                            <motion.div
                                   key="loading-screen"
                                   initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                   exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                   transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                                   className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                            >
                                   {/* The Splitting Text Lines */}
                                   <motion.div
                                          initial={{ y: 0, opacity: 0 }}
                                          animate={{
                                                 y: (stage === "text-split" || stage === "done") ? "-35vh" : 0,
                                                 opacity: stage === "initial" || stage === "done" ? 0 : 1
                                          }}
                                          transition={{
                                                 y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                                                 opacity: { duration: 0.5 }
                                          }}
                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] z-20 w-full text-center pb-[2px]"
                                   >
                                          <p className="text-[#8A8A8A] text-[10px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase leading-relaxed">
                                                 Just an ordinary Software Developer.
                                          </p>
                                   </motion.div>

                                   <motion.div
                                          initial={{ y: 0, opacity: 0 }}
                                          animate={{
                                                 y: (stage === "text-split" || stage === "done") ? "35vh" : 0,
                                                 opacity: stage === "initial" || stage === "done" ? 0 : 1
                                          }}
                                          transition={{
                                                 y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                                                 opacity: { duration: 0.5 }
                                          }}
                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 w-full text-center pt-[2px]"
                                   >
                                          <p className="text-[#8A8A8A] text-[10px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase leading-relaxed">
                                                 From India with love.
                                          </p>
                                   </motion.div>

                                   {/* The Hero Illustration Shared Element */}
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] z-10 overflow-hidden pointer-events-none">
                                          <AnimatePresence>
                                                 {stage === "text-split" && (
                                                        <motion.div
                                                               initial={{ opacity: 0 }}
                                                               animate={{ opacity: 1 }}
                                                               exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                               transition={{ duration: 0.4, delay: 0.4 }} // Wait briefly for text to start splitting before fading in illustration
                                                               className="w-full h-full"
                                                        >
                                                               <Lottie
                                                                      animationData={animationData}
                                                                      loop={true}
                                                                      autoPlay={true}
                                                                      className="w-full h-full object-contain"
                                                               />
                                                        </motion.div>
                                                 )}
                                          </AnimatePresence>
                                   </div>
                            </motion.div>
                     )}
              </AnimatePresence>
       );
}


