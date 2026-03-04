import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                linen: "#f5f0e8",
                rust: "#5c1a0f",
                darkbrown: "#1a1008",
                offwhite: "#f0ece0",
                muted: "#8a6a50",
                inkbrown: "#2a1a0e",
            },
            fontFamily: {
                display: ["Fraunces", "Georgia", "serif"],
                body: ["DM Sans", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            fontSize: {
                "display-hero": "clamp(4rem, 10vw, 9rem)",
                "display-lg": "clamp(2.5rem, 5vw, 5rem)",
                "display-sm": "clamp(1.5rem, 3vw, 2.5rem)",
            },
            spacing: {
                section: "80px",
            },
            borderRadius: {
                pill: "9999px",
            },
        },
    },
    plugins: [],
};
export default config;
