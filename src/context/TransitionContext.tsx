"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
       isTransitioning: boolean;
       progress: number;
       startTransition: (href: string) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
       const [isTransitioning, setIsTransitioning] = useState(false);
       const [progress, setProgress] = useState(0);
       const router = useRouter();

       const startTransition = async (href: string) => {
              setIsTransitioning(true);
              setProgress(0);

              // Simulate progress
              const duration = 3000; // Increased to 3 seconds as requested
              const interval = 20;
              const increment = (interval / duration) * 100;

              const timer = setInterval(() => {
                     setProgress((prev) => {
                            if (prev >= 100) {
                                   clearInterval(timer);
                                   return 100;
                            }
                            return prev + increment;
                     });
              }, interval);

              // Wait for the loader to reach 100% or close to it
              await new Promise((resolve) => setTimeout(resolve, duration));

              // Redirect
              router.push(href);

              // Give some time for the new page to load (or at least start loading)
              // and then reset the transition state
              setTimeout(() => {
                     setIsTransitioning(false);
                     setProgress(0);
              }, 1000); // Wait for fade out
       };

       return (
              <TransitionContext.Provider value={{ isTransitioning, progress, startTransition }}>
                     {children}
              </TransitionContext.Provider>
       );
}

export function useTransition() {
       const context = useContext(TransitionContext);
       if (context === undefined) {
              throw new Error("useTransition must be used within a TransitionProvider");
       }
       return context;
}
