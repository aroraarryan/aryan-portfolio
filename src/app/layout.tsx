import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    style: ["normal", "italic"],
    variable: "--font-fraunces",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: {
        default: "Aryan Arora | Portfolio",
        template: "Aryan Arora | %s",
    },
    description:
        "BCA graduate and full-stack developer skilled in React, Node.js, Python, and AI/ML. Available for freelance and full-time roles.",
    keywords: [
        "Aryan Arora",
        "Full-stack Developer",
        "React Developer",
        "Next.js Portfolio",
        "AI Engineer Dehradun",
        "Graphic Era Hill University",
        "Scrimba Fullstack",
    ],
    authors: [{ name: "Aryan Arora" }],
    creator: "Aryan Arora",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://aryanarora.dev",
        title: "Aryan Arora | Full-stack Developer",
        description:
            "Explore the portfolio of Aryan Arora, a full-stack developer specializing in modern web applications and AI integrations.",
        siteName: "Aryan Arora Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aryan Arora | Portfolio",
        description:
            "BCA graduate and full-stack developer skilled in React, Node.js, Python, and AI/ML.",
        creator: "@aroraarryan",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1008" },
    ],
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
