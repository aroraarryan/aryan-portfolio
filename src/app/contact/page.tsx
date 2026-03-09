"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import benchAnim from "@/assets/BenchIllustration.json";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
       return (
              <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
                     <div className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
                            {/* Header Section */}
                            <div className="mb-20 text-center md:text-left">
                                   <motion.h1
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.8 }}
                                          className="text-[12vw] md:text-[8vw] leading-none font-black uppercase tracking-tighter"
                                   >
                                          <span className="font-playfair italic font-light lowercase block md:inline mr-4">Let's</span>
                                          Collaborate
                                   </motion.h1>
                                   <motion.h2
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.8, delay: 0.2 }}
                                          className="text-[8vw] md:text-[5vw] leading-none font-medium tracking-tighter text-[#8A8A8A]"
                                   >
                                          And make good sh*t together
                                   </motion.h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-20 items-start">
                                   {/* Left Side: Illustration */}
                                   <motion.div
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.8, delay: 0.4 }}
                                          className="w-full md:w-1/2 flex justify-center sticky top-32"
                                   >
                                          <div className="w-full max-w-[500px] aspect-square">
                                                 <Lottie
                                                        animationData={benchAnim}
                                                        loop={true}
                                                        autoPlay={true}
                                                        className="w-full h-full object-contain"
                                                 />
                                          </div>
                                   </motion.div>

                                   {/* Right Side: Form */}
                                   <motion.div
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.8, delay: 0.6 }}
                                          className="w-full md:w-1/2"
                                   >
                                          <ContactForm />
                                   </motion.div>
                            </div>
                     </div>
                     <Footer />
              </main>
       );
}
