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

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: ContactFormData) => {
        setStatus("loading");
        setErrorMessage(null);
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
                const errorData = await response.json().catch(() => ({}));
                setErrorMessage(errorData.message || "Unable to transmit message. Please try again.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setErrorMessage("Network error. Please check your connection.");
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="bg-linen dark:bg-[#0d0603] section-pad border-t border-[var(--color-border-light)] overflow-hidden">
            <div className="container-site">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                    {/* LEFT — Intro & Info */}
                    <div className="lg:w-1/3 space-y-12">
                        <div>
                            <span className="section-label mb-8 block">Connect</span>
                            <h2 className="display-sm mt-4 mb-6 leading-[1.1]">
                                Let&apos;s build something<br />
                                <em className="text-rust not-italic serif">extraordinary.</em>
                            </h2>
                            <p className="text-muted text-sm leading-relaxed max-w-sm">
                                Have a project in mind or just want to say hello?
                                I typically respond within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-0 border-t border-[var(--color-border-light)]">
                            <ContactInfoRow
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                }
                                label="EMAIL"
                                value="aryanarora28march@gmail.com"
                                href="mailto:aryanarora28march@gmail.com"
                            />
                            <ContactInfoRow
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                }
                                label="PHONE"
                                value="+91 82720 60480"
                                href="tel:+918272060480"
                            />
                            <ContactInfoRow
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                }
                                label="LINKEDIN"
                                value="linkedin.com/in/aroraarryan"
                                href="https://linkedin.com/in/aroraarryan"
                                isExternal
                            />
                        </div>
                    </div>

                    {/* RIGHT — The Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white/50 dark:bg-[#1a1a14]/30 backdrop-blur-sm border border-[var(--color-border-light)] p-8 md:p-12 lg:p-16 relative">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-rust/30 pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-rust text-white flex items-center justify-center mx-auto mb-8 text-3xl">
                                            ✓
                                        </div>
                                        <h3 className="display-sm mb-4">Transmission Received</h3>
                                        <p className="text-muted text-sm mb-10 max-w-xs mx-auto leading-relaxed">
                                            Thank you for reaching out. I will review your inquiry and get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="text-xs uppercase tracking-[0.2em] font-bold text-rust hover:text-inkbrown dark:hover:text-offwhite transition-colors"
                                        >
                                            [ Send Another Message ]
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-10"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                                            <FormField label="Full Name" error={errors.name?.message}>
                                                <input
                                                    {...register("name")}
                                                    placeholder="e.g. Aryan Arora"
                                                    className={cn("input-minimal", errors.name && "border-red-400")}
                                                />
                                            </FormField>
                                            <FormField label="Email Address" error={errors.email?.message}>
                                                <input
                                                    {...register("email")}
                                                    placeholder="hello@example.com"
                                                    className={cn("input-minimal", errors.email && "border-red-400")}
                                                />
                                            </FormField>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                                            <FormField label="Subject / Topic" error={errors.subject?.message}>
                                                <input
                                                    {...register("subject")}
                                                    placeholder="Project Inquiry"
                                                    className={cn("input-minimal", errors.subject && "border-red-400")}
                                                />
                                            </FormField>
                                            <FormField label="Service Required" error={errors.projectType?.message}>
                                                <select
                                                    {...register("projectType")}
                                                    className={cn("input-minimal appearance-none", errors.projectType && "border-red-400")}
                                                >
                                                    <option value="">Select service...</option>
                                                    <option value="web">Web Development</option>
                                                    <option value="ai">AI Integration</option>
                                                    <option value="fullstack">Full-Stack Solution</option>
                                                    <option value="landing">Premium Landing Page</option>
                                                    <option value="other">Other Inquiry</option>
                                                </select>
                                            </FormField>
                                        </div>

                                        <FormField label="Your Message" error={errors.message?.message}>
                                            <textarea
                                                {...register("message")}
                                                rows={4}
                                                placeholder="Tell me about your objectives..."
                                                className={cn("input-minimal resize-none pt-4", errors.message && "border-red-400")}
                                            />
                                        </FormField>

                                        <input type="text" {...register("honeypot")} className="sr-only" tabIndex={-1} aria-hidden="true" />

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="btn-rust w-full md:w-auto px-12 py-5 justify-center disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
                                            >
                                                <span className="relative z-10 flex items-center gap-3">
                                                    {status === "loading" ? "SENDING..." : "INITIALIZE CONTACT"}
                                                    {!status.includes("loading") && <span className="text-lg">→</span>}
                                                </span>
                                            </button>

                                            {status === "error" && (
                                                <div className="mt-4">
                                                    <p className="text-xs text-red-500 font-mono uppercase tracking-wider">
                                                        Error: {errorMessage || "Unable to transmit message. Please try again."}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .input-minimal {
                    width: 100%;
                    border: none;
                    border-bottom: 1px solid var(--color-border-light);
                    padding: 8px 0 12px 0;
                    background: transparent;
                    font-family: inherit;
                    font-size: 0.95rem;
                    color: var(--color-inkbrown);
                    outline: none;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    border-radius: 0;
                }
                .dark .input-minimal {
                    color: var(--color-offwhite);
                }
                .input-minimal:focus {
                    border-color: var(--color-rust);
                    padding-left: 8px;
                }
                .input-minimal::placeholder {
                    color: var(--color-muted);
                    opacity: 0.5;
                }
                select.input-minimal {
                    cursor: pointer;
                }
            `}</style>
        </section>
    );
};

interface ContactInfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    isExternal?: boolean;
}

const ContactInfoRow = ({ icon, label, value, href, isExternal }: ContactInfoRowProps) => (
    <div className="flex items-center gap-6 py-6 border-b border-[var(--color-border-light)] group transition-all duration-300">
        <div className="w-12 h-12 bg-white dark:bg-[#1a1a14] border border-[var(--color-border-light)] flex items-center justify-center shrink-0 group-hover:border-rust group-hover:bg-rust group-hover:text-white transition-all duration-300">
            {icon}
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1 font-bold">{label}</span>
            <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-sm md:text-base text-inkbrown dark:text-offwhite hover:text-rust transition-colors truncate font-medium"
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
    <div className="flex flex-col gap-1 group">
        <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold pl-0 transition-colors group-focus-within:text-rust">
            {label}
        </label>
        {children}
        <AnimatePresence>
            {error && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-[10px] uppercase tracking-wider font-bold mt-2"
                >
                    * {error}
                </motion.span>
            )}
        </AnimatePresence>
    </div>
);

export default Contact;
