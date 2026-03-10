"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
       const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
       const [formData, setFormData] = useState({
              name: "",
              email: "",
              subject: "",
              message: "",
              honeypot: "", // Honeypot field for bot protection
       });

       const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();

              // Simple honeypot check
              if (formData.honeypot) {
                     console.log("Bot detected!");
                     setStatus("success"); // Fake success to mislead bot
                     return;
              }

              setStatus("loading");

              try {
                     const { honeypot, ...dataToSend } = formData;
                     const response = await fetch("/api/send", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(dataToSend),
                     });

                     if (response.ok) {
                            setStatus("success");
                            setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
                     } else {
                            setStatus("error");
                     }
              } catch {
                     setStatus("error");
              }
       };

       const inputStyles = "w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FF4500] transition-colors duration-500 placeholder:text-[#444] text-lg md:text-xl font-light";

       return (
              <div className="w-full">
                     <AnimatePresence mode="wait">
                            {status === "success" ? (
                                   <motion.div
                                          key="success"
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="flex flex-col items-center justify-center py-20 text-center border border-white/5 bg-white/[0.02]"
                                   >
                                          <CheckCircle2 className="w-16 h-16 text-[#FF4500] mb-6" />
                                          <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Message Sent</h3>
                                          <p className="text-[#8A8A8A] max-w-xs">
                                                 Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
                                          </p>
                                          <button
                                                 onClick={() => setStatus("idle")}
                                                 className="mt-10 text-xs tracking-widest uppercase border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all"
                                          >
                                                 Send Another
                                          </button>
                                   </motion.div>
                            ) : (
                                   <motion.form
                                          key="form"
                                          onSubmit={handleSubmit}
                                          className="space-y-12"
                                   >
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                 <div className="relative group">
                                                        <span className="text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block mb-2">Your Name</span>
                                                        <input
                                                               required
                                                               type="text"
                                                               placeholder="John Doe"
                                                               className={inputStyles}
                                                               value={formData.name}
                                                               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                 </div>
                                                 <div className="relative group">
                                                        <span className="text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block mb-2">Email Address</span>
                                                        <input
                                                               required
                                                               type="email"
                                                               placeholder="john@example.com"
                                                               className={inputStyles}
                                                               value={formData.email}
                                                               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                 </div>
                                          </div>

                                          <div className="relative group">
                                                 <span className="text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block mb-2">Subject</span>
                                                 <input
                                                        required
                                                        type="text"
                                                        placeholder="Project Collaboration"
                                                        className={inputStyles}
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                 />
                                          </div>

                                          <div className="relative group">
                                                 <span className="text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase block mb-2">Message</span>
                                                 <textarea
                                                        required
                                                        rows={4}
                                                        placeholder="What's on your mind?"
                                                        className={`${inputStyles} resize-none`}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                 />
                                          </div>

                                          {/* Honeypot field (hidden from users) */}
                                          <div className="hidden" aria-hidden="true">
                                                 <input
                                                        type="text"
                                                        name="subject_alt"
                                                        tabIndex={-1}
                                                        autoComplete="off"
                                                        value={formData.honeypot}
                                                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                                 />
                                          </div>

                                          <button
                                                 disabled={status === "loading"}
                                                 className="group relative w-full md:w-auto px-12 py-5 bg-[#FF4500] text-white overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                          >
                                                 <div className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm">
                                                        {status === "loading" ? (
                                                               <>
                                                                      <Loader2 className="w-4 h-4 animate-spin" />
                                                                      Sending...
                                                               </>
                                                        ) : (
                                                               <>
                                                                      <Send className="w-4 h-4" />
                                                                      Send Message
                                                               </>
                                                        )}
                                                 </div>
                                          </button>

                                          {status === "error" && (
                                                 <div className="flex items-center gap-2 text-red-500 text-sm mt-4">
                                                        <AlertCircle className="w-4 h-4" />
                                                        Something went wrong. Please try again.
                                                 </div>
                                          )}
                                   </motion.form>
                            )}
                     </AnimatePresence>
              </div>
       );
}
