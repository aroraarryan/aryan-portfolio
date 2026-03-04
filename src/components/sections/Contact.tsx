"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(4, "Subject must be at least 4 characters"),
    projectType: z.enum(["web", "ai", "fullstack", "landing", "other"], {
        errorMap: () => ({ message: "Please select a project type" }),
    }),
    budget: z.string().optional(),
    message: z.string().min(20, "Message must be at least 20 characters"),
    honeypot: z.string().max(0, "Spam detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            honeypot: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="bg-linen dark:bg-[#0d0603] section-pad border-t border-[var(--color-border-light)]">
            <div className="container-site">
                <span className="section-label">Get in Touch</span>
                <h2 className="display-sm mt-2 mb-4">
                    Let&apos;s build something<br />
                    <em className="text-rust not-italic">great together.</em>
                </h2>
                <p className="text-muted text-base mb-12 max-w-lg">
                    Whether you need a full product, a landing page, or an AI-powered feature — response within 24 hours.
                </p>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT — contact info */}
                    <div className="space-y-0">
                        <ContactInfoRow
                            emoji="📧"
                            label="EMAIL"
                            value="aryanarora28march@gmail.com"
                            href="mailto:aryanarora28march@gmail.com"
                        />
                        <ContactInfoRow
                            emoji="📱"
                            label="PHONE"
                            value="+91 82720 60480"
                            href="tel:+918272060480"
                        />
                        <ContactInfoRow
                            emoji="💼"
                            label="LINKEDIN"
                            value="linkedin.com/in/aroraarryan"
                            href="https://linkedin.com/in/aroraarryan"
                            isExternal
                        />
                    </div>

                    {/* RIGHT — form card */}
                    <div className="bg-white dark:bg-[#1a1a14] border border-[var(--color-border-light)] p-10 shadow-sm">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-rust/10 text-rust rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border border-rust/20">
                                        ✓
                                    </div>
                                    <h3 className="display-sm mb-4">Message sent!</h3>
                                    <p className="text-muted text-sm mb-8">
                                        I&apos;ll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-sm text-rust font-medium hover:underline"
                                    >
                                        Send another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField label="Full Name" error={errors.name?.message}>
                                            <input
                                                {...register("name")}
                                                placeholder="Aryan Arora"
                                                className={cn("input-base", errors.name && "border-red-400")}
                                            />
                                        </FormField>
                                        <FormField label="Email Address" error={errors.email?.message}>
                                            <input
                                                {...register("email")}
                                                placeholder="hello@example.com"
                                                className={cn("input-base", errors.email && "border-red-400")}
                                            />
                                        </FormField>
                                    </div>

                                    <FormField label="Subject" error={errors.subject?.message}>
                                        <input
                                            {...register("subject")}
                                            placeholder="What's this about?"
                                            className={cn("input-base", errors.subject && "border-red-400")}
                                        />
                                    </FormField>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField label="Project Type" error={errors.projectType?.message}>
                                            <select
                                                {...register("projectType")}
                                                className={cn("input-base", errors.projectType && "border-red-400")}
                                            >
                                                <option value="">Select type...</option>
                                                <option value="web">Web App</option>
                                                <option value="fullstack">Full-Stack</option>
                                                <option value="ai">AI Integration</option>
                                                <option value="landing">Landing Page</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </FormField>
                                        <FormField label="Budget Range" error={errors.budget?.message}>
                                            <select
                                                {...register("budget")}
                                                className={cn("input-base", errors.budget && "border-red-400")}
                                            >
                                                <option value="">Select range...</option>
                                                <option value="under-5k">Under ₹5,000</option>
                                                <option value="5k-15k">₹5,000–₹15,000</option>
                                                <option value="15k-30k">₹15,000–₹30,000</option>
                                                <option value="30k-plus">₹30,000+</option>
                                            </select>
                                        </FormField>
                                    </div>

                                    <FormField label="Message" error={errors.message?.message}>
                                        <textarea
                                            {...register("message")}
                                            rows={5}
                                            placeholder="Tell me about your project dreams..."
                                            className={cn("input-base resize-none", errors.message && "border-red-400")}
                                        />
                                    </FormField>

                                    <input type="text" {...register("honeypot")} className="sr-only" tabIndex={-1} aria-hidden="true" />

                                    {status === "error" && (
                                        <p className="text-xs text-red-400 text-center">Something went wrong — please try again.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="btn-rust w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed group"
                                    >
                                        {status === "loading" ? "Sending..." : "Send Message"}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .input-base {
                    width: 100%;
                    border: 1px solid var(--color-border-light);
                    padding: 12px 16px;
                    background: transparent;
                    font-family: inherit;
                    font-size: 0.875rem;
                    color: var(--color-inkbrown);
                    outline: none;
                    transition: border-color var(--transition);
                    border-radius: 0;
                }
                .dark .input-base {
                    color: var(--color-offwhite);
                }
                .input-base:focus {
                    border-color: var(--color-rust);
                }
            `}</style>
        </section>
    );
};

interface ContactInfoRowProps {
    emoji: string;
    label: string;
    value: string;
    href: string;
    isExternal?: boolean;
}

const ContactInfoRow = ({ emoji, label, value, href, isExternal }: ContactInfoRowProps) => (
    <div className="flex items-center gap-4 py-4 border-b border-[var(--color-border-light)] group">
        <div className="w-10 h-10 bg-rust/10 flex items-center justify-center text-xl shrink-0">
            {emoji}
        </div>
        <div className="flex flex-col min-w-0">
            <span className="mono-tag text-muted mb-0.5">{label}</span>
            <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-sm text-inkbrown dark:text-offwhite hover:text-rust transition-colors truncate"
            >
                {value}
            </a>
        </div>
    </div>
);

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
    error?: string;
}

const FormField = ({ label, children, error }: FormFieldProps) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-muted font-bold pl-0.5">
            {label}
        </label>
        {children}
        {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
);

export default Contact;
