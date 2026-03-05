export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    category: "web" | "ai" | "fullstack" | "backend";
    stack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured?: boolean;
    year: number;
}

export interface TimelineItem {
    id: string;
    type: "education" | "course" | "work";
    title: string;
    organization: string;
    period: string;
    description: string;
    highlights?: string[];
    badge?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    deliverables: string[];
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    quote: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    projectType: string;
    message: string;
    honeypot?: string;
}

export interface NavItem {
    label: string;
    href: string;
}
