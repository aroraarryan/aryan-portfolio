"use client";

import React from "react";
import Lottie from "lottie-react";
import skillsAnimationData from "@/assets/SkillsIllustration.json";

interface SkillsIllustrationProps {
       className?: string;
}

export default function SkillsIllustration({ className = "" }: SkillsIllustrationProps) {
       return (
              <div className={`w-full h-full relative flex items-center justify-center ${className}`}>
                     <div className="w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center invert filter brightness-90 contrast-125">
                            <Lottie
                                   animationData={skillsAnimationData}
                                   loop={true}
                                   autoPlay={true}
                                   className="w-full h-full object-contain"
                            />
                     </div>
              </div>
       );
}
