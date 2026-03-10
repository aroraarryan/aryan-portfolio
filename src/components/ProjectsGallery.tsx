"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity, useMotionTemplate } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
       {
              id: "01",
              title: "ONLINE LEARNING PLATFORM",
              description: "Curated digital archive exploring the life and artistic legacy of Myra Landau, tracing her artistic journey.",
              category: "DJANGO / FULLSTACK",
              year: "2024",
              image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
       },
       {
              id: "02",
              title: "BRANDFUL",
              description: "Independent brand consultancy crafting custom-tailored transformations through one-on-one partnerships.",
              category: "AGENCY",
              year: "2025",
              image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
       },
       {
              id: "03",
              title: "DESIGN + PEACE",
              description: "Nonprofit organization supporting communities through research, education, and art programs.",
              category: "NONPROFIT",
              year: "2025",
              image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop",
       },
       {
              id: "04",
              title: "REGIMENT",
              description: "New York-based real estate development firm operating as a design-build developer.",
              category: "REAL ESTATE",
              year: "2024",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
       },
];

export default function ProjectsGallery() {
       const targetRef = useRef<HTMLDivElement>(null);
       const [isHovered, setIsHovered] = useState(false);

       // Setup Scroll logic for the gallery
       const { scrollYProgress, scrollY } = useScroll({ target: targetRef });
       const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

       // Physics-based cursor and scroll interaction for the background
       const mouseX = useMotionValue(0);
       const mouseY = useMotionValue(0);

       const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
       const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

       const velocityX = useVelocity(smoothX);
       const velocityY = useVelocity(smoothY);
       const scrollVelocity = useVelocity(scrollY);

       // Combine mouse velocity and wheel scroll velocity into an absolute magnitude
       const combinedVelocity = useTransform(
              [velocityX, velocityY, scrollVelocity],
              ([vx, vy, sv]) => {
                     const mouseSpeed = Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2));
                     const wheelSpeed = Math.abs(sv as number) * 0.5; // Dampen scroll speed slightly as it can be very high
                     return mouseSpeed + wheelSpeed;
              }
       );

       const targetMaskSize = useTransform(combinedVelocity, [0, 50, 1500], [0, 150, 600]);
       const maskSize = useSpring(targetMaskSize, { damping: 25, stiffness: 120, mass: 0.8 });
       const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize}px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

       const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
              // The sticky container fills the viewport, so clientX/Y map 1:1 to the background
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
       };

       return (
              <section
                     ref={targetRef}
                     onMouseMove={handleMouseMove}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     className="relative h-[400vh] bg-black text-white"
                     id="projects"
              >
                     <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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

                            {/* Main Gallery Content */}
                            <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-8 md:px-24 w-[400vw] relative z-10">

                                   {/* Introductory Heading for the section */}
                                   <div className="w-[100vw] shrink-0 flex flex-col justify-center">
                                          <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none mb-4">
                                                 Selected
                                                 <br />
                                                 <span className="font-playfair-serif italic font-light lowercase text-[#FF4500]">Works</span>
                                          </h2>
                                          <p className="max-w-md text-lg text-[#8A8A8A]">
                                                 A collection of recent projects focused on editorial design, creative development, and interactive experiences.
                                          </p>
                                   </div>

                                   {/* Project Items */}
                                   {projects.map((project, index) => (
                                          <div
                                                 key={project.id}
                                                 className="w-[85vw] md:w-[60vw] shrink-0 flex justify-center items-center"
                                          >
                                                 <div className="flex flex-col md:flex-row w-full h-[70vh] gap-8 md:gap-16">

                                                        {/* Text Content */}
                                                        <div className={`flex flex-col justify-between w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                                                               <div>
                                                                      <span className="text-2xl md:text-4xl text-[#8A8A8A] font-bold mb-4 block">({project.id})</span>
                                                                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                                                             {project.title}
                                                                      </h3>
                                                                      <p className="text-lg md:text-xl text-[#8A8A8A] max-w-sm">
                                                                             {project.description}
                                                                      </p>
                                                               </div>

                                                               <div className="flex justify-between items-center border-t border-white/20 pt-6 mt-12 md:mt-0 font-medium tracking-widest text-sm uppercase">
                                                                      <span>{project.category}</span>
                                                                      <span>{project.year}</span>
                                                               </div>
                                                        </div>

                                                        {/* Project Image */}
                                                        <div className={`w-full md:w-1/2 h-full overflow-hidden ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                                                               <div className="w-full h-full relative group cursor-pointer overflow-hidden">
                                                                      <Image
                                                                             src={project.image}
                                                                             alt={project.title}
                                                                             fill
                                                                             className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                                                                             sizes="(max-width: 768px) 100vw, 50vw"
                                                                      />
                                                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                                               </div>
                                                        </div>

                                                 </div>
                                          </div>
                                   ))}

                            </motion.div>
                     </div>
              </section>
       );
}
