"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
       isTransitioning: boolean;
       progress: number;
       title: string;
       startTransition: (href: string) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
       const [isTransitioning, setIsTransitioning] = useState(false);
       const [progress, setProgress] = useState(0);
       const [title, setTitle] = useState("");
       const router = useRouter();

       const startTransition = async (href: string) => {
              // Infer title from href
              const targetTitle = href.includes("about") ? "About" :
                     href.includes("contact") ? "Contact" : "";

              setTitle(targetTitle);
              setIsTransitioning(true);
              setProgress(0);

              // Simulate progress
              const duration = 3000;
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

              await new Promise((resolve) => setTimeout(resolve, duration));

              router.push(href);

              setTimeout(() => {
                     setIsTransitioning(false);
                     setProgress(0);
                     setTitle("");
              }, 1000);
       };

       return (
              <TransitionContext.Provider value={{ isTransitioning, progress, title, startTransition }}>
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
