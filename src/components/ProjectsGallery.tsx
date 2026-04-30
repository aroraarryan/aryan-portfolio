"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity, useMotionTemplate, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
       {
              id: "01",
              title: "Mero Yuva",
              description: "Official youth portal for the Government of Uttarakhand — a single platform for 12.5L+ youth to discover 118+ government schemes.",
              category: "Next.js / Government / Civic Tech",
              year: "2026",
              image: "/mero-yuva-actual.png",
              link: "https://meroyuva.com",
       },
       {
              id: "02",
              title: "ONLINE LEARNING PLATFORM",
              description: "Curated digital archive exploring the life and artistic legacy of Myra Landau, tracing her artistic journey.",
              category: "DJANGO / FULLSTACK",
              year: "2024",
              image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
              link: "#",
       },
       {
              id: "03",
              title: "BRANDFUL",
              description: "Independent brand consultancy crafting custom-tailored transformations through one-on-one partnerships.",
              category: "AGENCY",
              year: "2025",
              image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
              link: "#",
       },
       {
              id: "04",
              title: "DESIGN + PEACE",
              description: "Nonprofit organization supporting communities through research, education, and art programs.",
              category: "NONPROFIT",
              year: "2025",
              image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop",
              link: "#",
       },
       {
              id: "05",
              title: "REGIMENT",
              description: "New York-based real estate development firm operating as a design-build developer.",
              category: "REAL ESTATE",
              year: "2024",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
              link: "#",
       },
];

export default function ProjectsGallery() {
       const targetRef = useRef<HTMLDivElement>(null);
       const { scrollYProgress } = useScroll({
              target: targetRef,
              offset: ["start end", "end start"]
       });
       
       const [isHovered, setIsHovered] = useState(false);

       // Physics-based cursor interaction for the background
       const mouseX = useMotionValue(0);
       const mouseY = useMotionValue(0);

       const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
       const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

       const velocityX = useVelocity(smoothX);
       const velocityY = useVelocity(smoothY);
       const velocityScroll = useVelocity(scrollYProgress);

       const combinedVelocity = useTransform(
              [velocityX, velocityY, velocityScroll],
              ([vx, vy, vs]) => {
                     const mouseVel = Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2));
                     const scrollVel = Math.abs(vs as number) * 1000;
                     return mouseVel + scrollVel;
              }
       );

       const targetMaskSize = useTransform(combinedVelocity, [0, 50, 1500], [0, 150, 600]);
       const maskSize = useSpring(targetMaskSize, { damping: 25, stiffness: 120, mass: 0.8 });
       const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

       const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
       };

       return (
              <section
                     ref={targetRef}
                     onMouseMove={handleMouseMove}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     className="relative py-32 bg-black text-white"
                     id="projects"
              >
                     {/* Interactive Dot Grid Background - Sticky to follow viewport within section */}
                     <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                                   <motion.div
                                          animate={{ opacity: isHovered ? 1 : 0 }}
                                          transition={{ duration: 0.5 }}
                                          className="absolute inset-0"
                                          style={{
                                                 backgroundImage: "radial-gradient(#FF4500 1.5px, transparent 1.5px)",
                                                 backgroundSize: "36px 36px",
                                                 backgroundPosition: "center center",
                                                 WebkitMaskImage: maskImage,
                                                 maskImage: maskImage,
                                          }}
                                   />
                            </div>
                     </div>

                     <div className="container mx-auto px-6 md:px-12 relative z-10">
                            {/* Introductory Heading */}
                            <motion.div
                                   initial={{ opacity: 0, y: 50 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                   className="mb-32"
                            >
                                   <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-6">
                                          Selected
                                          <br />
                                          <span className="font-playfair-serif italic font-light lowercase text-[#FF4500]">Works</span>
                                   </h2>
                                   <p className="max-w-md text-xl text-[#8A8A8A] border-l border-white/20 pl-6 ml-2">
                                          A collection of recent projects focused on editorial design, creative development, and interactive experiences.
                                   </p>
                            </motion.div>

                            {/* Project Items List */}
                            <div className="flex flex-col gap-32 md:gap-64">
                                   {projects.map((project, index) => (
                                          <motion.div
                                                 key={project.id}
                                                 initial={{ opacity: 0, y: 100 }}
                                                 whileInView={{ opacity: 1, y: 0 }}
                                                 viewport={{ once: true, margin: "-10%" }}
                                                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                 className="group"
                                          >
                                                 <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                                        {/* Text Content */}
                                                        <div className="w-full md:w-5/12 flex flex-col justify-center">
                                                               <div className="mb-8">
                                                                      <span className="text-xl md:text-2xl text-[#FF4500] font-mono mb-4 block">[{project.id}]</span>
                                                                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8 group-hover:text-[#FF4500] transition-colors duration-500">
                                                                             {project.title}
                                                                      </h3>
                                                                      <p className="text-lg md:text-xl text-[#8A8A8A] leading-relaxed">
                                                                             {project.description}
                                                                      </p>
                                                               </div>

                                                               <div className="flex flex-wrap gap-4 md:gap-8 pt-8 border-t border-white/10 font-medium tracking-[0.2em] text-xs uppercase text-[#555]">
                                                                      <span className="px-3 py-1 border border-white/10 rounded-full">{project.category}</span>
                                                                      <span className="flex items-center">
                                                                             <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] mr-2" />
                                                                             {project.year}
                                                                      </span>
                                                               </div>
                                                        </div>

                                                        {/* Project Image Wrapper */}
                                                        <div className="w-full md:w-7/12 relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-[#111]">
                                                               <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                                                      <motion.div
                                                                             whileHover={{ scale: 1.05 }}
                                                                             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                                                             className="w-full h-full relative cursor-pointer"
                                                                      >
                                                                             <Image
                                                                                    src={project.image}
                                                                                    alt={project.title}
                                                                                    fill
                                                                                    className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]"
                                                                                    sizes="(max-width: 768px) 100vw, 60vw"
                                                                             />
                                                                             {/* Overlay gradient */}
                                                                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                                                                      </motion.div>
                                                               </a>

                                                               {/* View Project Button (Floating) */}
                                                               <div className="absolute bottom-8 right-8 overflow-hidden pointer-events-none">
                                                                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="pointer-events-auto">
                                                                             <motion.div
                                                                                    initial={{ y: "100%" }}
                                                                                    whileInView={{ y: 0 }}
                                                                                    transition={{ delay: 0.5 }}
                                                                                    className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-[#FF4500] hover:text-white transition-colors duration-300"
                                                                             >
                                                                                    Explore Project
                                                                             </motion.div>
                                                                      </a>
                                                               </div>
                                                        </div>

                                                 </div>
                                          </motion.div>
                                   ))}
                            </div>
                     </div>
              </section>
       );
}


