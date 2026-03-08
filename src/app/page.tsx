"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen isLoading={isLoading} onComplete={() => setIsLoading(false)} />

      <main className="flex min-h-screen flex-col bg-black">
        <GrainOverlay />
        <Hero isLoading={isLoading} />
        <ProjectsGallery />
        <Footer />
      </main>
    </>
  );
}
