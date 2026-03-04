import { Project, TimelineItem, Service, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
    { label: "About", href: "#about" },
    { label: "Resume", href: "#resume" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" }
];

export const PROJECTS: Project[] = [
    {
        id: "online-learning-platform",
        title: "Online Learning Platform",
        description: "Responsive e-learning portal with course recommendations and instructor content management.",
        longDescription: "Full-featured online learning platform using HTML, CSS, JavaScript, and Django. Supports learner registration, instructor dashboards for uploading content, and a course recommendation engine based on user interests.",
        tags: ["Django", "JavaScript", "CSS", "HTML"],
        category: "fullstack",
        stack: ["HTML", "CSS", "JavaScript", "Django", "Python", "SQLite"],
        githubUrl: "https://github.com/aroraarryan",
        featured: true,
        year: 2024
    },
    {
        id: "react-spa",
        title: "Dynamic React SPA",
        description: "Modern single-page application with React frontend and Express backend.",
        longDescription: "Developed as part of the Scrimba Fullstack Developer Path. Demonstrates state management, API integration, routing, and Express backend with RESTful endpoints.",
        tags: ["React", "Node.js", "Express"],
        category: "fullstack",
        stack: ["React.js", "Node.js", "Express.js", "JavaScript"],
        featured: true,
        year: 2025
    }
];

export const TIMELINE: TimelineItem[] = [
    {
        id: "bca",
        type: "education",
        title: "Bachelor in Computer Applications",
        organization: "Graphic Era Hill University",
        period: "Aug 2022 – Jun 2025",
        description: "Core CS program covering data structures, algorithms, web development, and software engineering.",
        highlights: ["CGPA: 8.49", "Java, Python, Web Dev, DSA coursework"],
        badge: "8.49 CGPA"
    },
    {
        id: "scrimba",
        type: "course",
        title: "The Fullstack Developer Path",
        organization: "Scrimba",
        period: "2025",
        description: "End-to-end fullstack training — React.js, Node.js with Express, AI engineering, database integration.",
        highlights: ["Built SPAs with React.js", "REST APIs with Node.js + Express", "AI engineering modules"]
    },
    {
        id: "class12",
        type: "education",
        title: "Higher Secondary (Class XII)",
        organization: "The Heritage School",
        period: "Apr 2021 – May 2022",
        description: "Completed with Computer Science specialisation.",
        highlights: ["61% aggregate", "Computer Science focus"]
    }
];

export const SERVICES: Service[] = [
    {
        id: "fullstack",
        title: "FULL-STACK DEVELOPMENT",
        description: "End-to-end web apps with React/Next.js frontend and Node.js or Django backend.",
        deliverables: ["React/Next.js frontend", "REST or GraphQL API", "Database design", "Deployment on Vercel"],
        startingPrice: "₹15,000"
    },
    {
        id: "frontend",
        title: "FRONTEND DEVELOPMENT",
        description: "Pixel-perfect UI from Figma or briefs using React and Tailwind CSS.",
        deliverables: ["Component library", "Animations", "Responsive layouts", "WCAG AA accessibility"],
        startingPrice: "₹8,000"
    },
    {
        id: "ai",
        title: "AI INTEGRATION",
        description: "Add intelligent features — recommendations, LLM integrations, Python data pipelines.",
        deliverables: ["API integration", "Custom recommendation logic", "Python pipeline", "Documentation"],
        startingPrice: "₹12,000"
    },
    {
        id: "landing",
        title: "LANDING PAGES",
        description: "High-converting, SEO-optimised landing pages and portfolio sites.",
        deliverables: ["Design + development", "SEO metadata", "Contact form", "Live in 5 days"],
        startingPrice: "₹5,000"
    }
];

export const SKILLS = {
    languages: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "Tailwind CSS"],
    ai_ml: ["NumPy", "Pandas", "Jupyter Notebook", "OpenAI API"],
    tools: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "Figma"]
};
