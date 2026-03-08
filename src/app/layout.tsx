import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aryan Arora",
  description: "Minimalist and brutalist portfolio website",
};

import { TransitionProvider } from "@/context/TransitionContext";
import PageTransitionLoader from "@/components/PageTransitionLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-black text-white`}
      >
        <TransitionProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <PageTransitionLoader />
            {children}
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
