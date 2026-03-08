"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Lottie from "lottie-react";
import homeLoopAnim from "@/assets/HomeLoop.json";
import benchAnim from "@/assets/BenchIllustration.json";
import Footer from "@/components/Footer";
import SkillsIllustration from "@/components/SkillsIllustration";

export default function AboutPage() {
       const imageSectionRef = useRef(null);
       const { scrollYProgress } = useScroll({
              target: imageSectionRef,
              offset: ["start end", "end start"],
       });

       const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

       return (
              <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">

                     {/* 2. Introductory Section with sticky me.JPG */}
                     <section className="relative w-full bg-[#0a0a0a] text-white z-20 min-h-screen flex items-center">
                            <div className="flex flex-col md:flex-row w-full h-full items-center">
                                   {/* Sticky Image Column (Left) */}
                                   <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20">
                                          <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] overflow-hidden">
                                                 <Image
                                                        src="/me.JPG"
                                                        alt="Aryan Portrait"
                                                        fill
                                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                                 />
                                          </div>
                                   </div>

                                   {/* Scrollable Text Column (Right) */}
                                   <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pr-24 py-12 md:py-0">
                                          <div className="max-w-md ml-auto md:mr-auto md:ml-0">
                                                 <span className="text-[10px] md:text-xs tracking-[0.2em] text-[#8A8A8A] uppercase block mb-16">
                                                        ABOUT ME
                                                 </span>
                                                 <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8 }}
                                                        className="text-2xl md:text-4xl leading-[1.4] font-light mb-12 tracking-tight"
                                                 >
                                                        I am a passionate <span className="font-playfair italic pr-1">developer</span> and builder based in India. Currently pursuing my BCA at Graphic Era.
                                                 </motion.p>
                                                 <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                        className="text-[#8A8A8A] text-sm md:text-base leading-relaxed max-w-sm"
                                                 >
                                                        My approach to digital creation is deeply rooted in <span className="text-white">minimalist aesthetics</span> and brutalist structural design. I believe in giving elegant content the <span className="font-playfair italic pr-1">negative space</span> it deserves to breathe, while maintaining rigorous engineering standards beneath the surface.
                                                 </motion.p>
                                          </div>
                                   </div>
                            </div>
                     </section>

                     {/* 3. Education Section */}
                     <section className="relative w-full bg-[#0a0a0a] text-white z-20 border-t border-white/5">
                            <div className="flex flex-col md:flex-row-reverse w-full min-h-[100vh]">
                                   {/* Sticky Anchor Column (Right) */}
                                   <div className="w-full md:w-1/2 md:sticky md:top-0 h-[30vh] md:h-screen flex items-center justify-center p-8 md:p-20">
                                          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-[#8A8A8A]">
                                                 [ <span className="font-playfair italic text-white md:px-2">01</span> ] <br className="hidden md:block" /> Education
                                          </h2>
                                   </div>

                                   {/* Scrollable Text Column (Left) */}
                                   <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-24 py-24 md:py-[30vh]">
                                          <div className="max-w-md mr-auto">
                                                 <span className="text-[10px] md:text-xs tracking-[0.2em] text-[#8A8A8A] uppercase block mb-16">
                                                        (b) Academic Background
                                                 </span>

                                                 <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8 }}
                                                        className="mb-16"
                                                 >
                                                        <h3 className="text-xl md:text-2xl font-medium mb-2">Bachelor in Computer Applications</h3>
                                                        <p className="text-sm md:text-base text-[#8A8A8A] mb-4">Graphic Era Hill University | Aug 2022 - June 2025</p>
                                                        <p className="text-sm font-playfair italic">CGPA: 8.49</p>
                                                        <p className="text-sm text-[#8A8A8A] mt-4 leading-relaxed">
                                                               Relevant Coursework: Java, Python, Web Development, DSA.
                                                        </p>
                                                 </motion.div>

                                                 <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                 >
                                                        <h3 className="text-xl md:text-2xl font-medium mb-2">Higher Secondary (Class XII)</h3>
                                                        <p className="text-sm md:text-base text-[#8A8A8A] mb-4">The Heritage School | April 2021 - May 2022</p>
                                                        <p className="text-sm text-[#8A8A8A] leading-relaxed">
                                                               Focused on Computer Science and foundational mathematics.
                                                        </p>
                                                 </motion.div>
                                          </div>
                                   </div>
                            </div>
                     </section>

                     {/* 4. Skills Section */}
                     <section className="relative w-full bg-[#0a0a0a] text-white z-20 border-t border-white/5">
                            <div className="flex flex-col md:flex-row w-full min-h-[150vh]">
                                   {/* Sticky Lottie Column (Left) */}
                                   <div className="w-full md:w-1/2 md:sticky md:top-0 h-[50vh] md:h-screen flex items-center justify-center p-8 md:p-20">
                                          <div className="w-full max-w-[500px] h-[500px] md:h-[650px]">
                                                 <SkillsIllustration />
                                          </div>
                                   </div>

                                   {/* Scrollable Text Column (Right) */}
                                   <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pr-24 py-24 md:py-[30vh]">
                                          <div className="max-w-md ml-auto md:mr-auto md:ml-0">
                                                 <span className="text-[10px] md:text-xs tracking-[0.2em] text-[#8A8A8A] uppercase block mb-16">
                                                        (c) Technical Expertise
                                                 </span>

                                                 <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8 }}
                                                        className="mb-12"
                                                 >
                                                        <h3 className="text-sm tracking-[0.2em] text-[#8A8A8A] uppercase mb-6">Languages</h3>
                                                        <p className="text-2xl md:text-3xl font-light leading-relaxed">
                                                               C++, Java, Python, <span className="font-playfair italic pr-1">JavaScript</span>.
                                                        </p>
                                                 </motion.div>

                                                 <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8, delay: 0.1 }}
                                                        className="mb-12"
                                                 >
                                                        <h3 className="text-sm tracking-[0.2em] text-[#8A8A8A] uppercase mb-6">Frameworks & Libraries</h3>
                                                        <p className="text-2xl md:text-3xl font-light leading-relaxed">
                                                               React.js, Node.js, Next.js, Django, <span className="font-playfair italic pr-1">Tailwind CSS</span>, Numpy, Pandas.
                                                        </p>
                                                 </motion.div>

                                                 <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                 >
                                                        <h3 className="text-sm tracking-[0.2em] text-[#8A8A8A] uppercase mb-6">Tools & Soft Skills</h3>
                                                        <p className="text-2xl md:text-3xl font-light leading-relaxed">
                                                               Git, VS Code, Leadership, <span className="font-playfair italic pr-1">Communication</span>, and Teamwork.
                                                        </p>
                                                 </motion.div>
                                          </div>
                                   </div>
                            </div>
                     </section>

                     {/* 4.5. Personal Image Showcase */}
                     <section ref={imageSectionRef} className="relative w-full h-[80vh] md:h-[110vh] overflow-hidden z-20 border-t border-white/5 group">
                            <motion.div style={{ y: imageY, height: "130%", top: "-15%" }} className="absolute inset-0 w-full">
                                   <Image
                                          src="/me.JPG"
                                          alt="Personal Showcase"
                                          fill
                                          className="object-cover transition-all duration-1000"
                                          priority
                                   />
                            </motion.div>
                     </section>

                     {/* 5. Grand Contact/Say Hello Section */}
                     <section className="relative w-full bg-[#111111] text-white z-20 flex flex-col items-center justify-start min-h-[100vh] pt-10 md:pt-16 pb-32 border-t border-white/5">
                            {/* Central Lottie */}
                            <div className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] mb-4 md:mb-4">
                                   <Lottie animationData={benchAnim} loop={true} autoPlay={true} className="w-full h-full object-contain" />
                            </div>

                            {/* Short Bio Tagline */}
                            <motion.p
                                   initial={{ opacity: 0, y: 10 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.8 }}
                                   className="text-white/60 text-sm md:text-base font-medium tracking-wide -mt-10 md:-mt-20 mb-12 md:mb-20 text-center"
                            >
                                   Just an ordinary software developer. From India with love
                            </motion.p>

                            {/* Massive Typography */}
                            <div className="text-center group cursor-pointer flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
                                   <motion.a
                                          href="mailto:aryanarora28march@gmail.com"
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1 }}
                                          className="text-[10vw] md:text-[7vw] font-playfair italic lowercase leading-none hover:text-[#FF4500] transition-colors"
                                   >
                                          Say
                                   </motion.a>
                                   <motion.a
                                          href="mailto:aryanarora28march@gmail.com"
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, delay: 0.1 }}
                                          className="text-[10vw] md:text-[7vw] font-bold uppercase tracking-tighter leading-none hover:text-[#FF4500] transition-colors"
                                   >
                                          Hello.
                                   </motion.a>
                            </div>
                     </section>

                     <Footer />
              </main>
       );
}
