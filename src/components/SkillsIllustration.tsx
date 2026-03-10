"use client";

import React from "react";
import dynamic from "next/dynamic";
import animationData from "../assets/SkillsIllustration.json";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function SkillsIllustration() {
       return (
              <div className="w-full h-full relative flex items-center justify-center">
                     <div className="w-full h-full max-w-[650px] max-h-[650px] flex items-center justify-center invert filter brightness-90 contrast-125">
                            <Lottie
                                   animationData={animationData}
                                   loop={true}
                                   autoPlay={true}
                                   className="w-full h-full object-contain"
                            />
                     </div>
              </div>
       );
}
