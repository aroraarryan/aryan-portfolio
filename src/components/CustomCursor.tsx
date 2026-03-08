"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
       const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
       const [isHovered, setIsHovered] = useState(false);
       const [isOnOrange, setIsOnOrange] = useState(false);

       useEffect(() => {
              const handleMouseMove = (e: MouseEvent) => {
                     setMousePosition({ x: e.clientX, y: e.clientY });
              };

              const handleMouseOver = (e: MouseEvent) => {
                     const target = e.target as HTMLElement;

                     // Check if cursor is over the orange footer bar
                     if (target.closest(".bg-\\[\\#FF4500\\]")) {
                            setIsOnOrange(true);
                     } else {
                            setIsOnOrange(false);
                     }

                     if (
                            target.tagName.toLowerCase() === "a" ||
                            target.tagName.toLowerCase() === "button" ||
                            target.closest("a") ||
                            target.closest("button")
                     ) {
                            setIsHovered(true);
                     } else {
                            setIsHovered(false);
                     }
              };

              window.addEventListener("mousemove", handleMouseMove);
              window.addEventListener("mouseover", handleMouseOver);

              return () => {
                     window.removeEventListener("mousemove", handleMouseMove);
                     window.removeEventListener("mouseover", handleMouseOver);
              };
       }, []);

       return (
              <motion.div
                     className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 bg-white ${isOnOrange ? '' : 'mix-blend-difference'}`}
                     animate={{
                            x: mousePosition.x - 16,
                            y: mousePosition.y - 16,
                            scale: isHovered ? 2.5 : 1,
                     }}
                     transition={{
                            type: "tween",
                            ease: "backOut",
                            duration: 0.15,
                     }}
              />
       );
}
