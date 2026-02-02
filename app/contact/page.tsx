"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Kept for potential future use or if we add an image back
import emailjs from '@emailjs/browser';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Magnetic from "@/components/Magnetic";

export default function ContactPage() {
    const router = useRouter();
    const containerRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    // Floating Label State
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({ user_name: '', user_email: '', message: '' });

    const handleFocus = (field: string) => setFocusedField(field);
    const handleBlur = (field: string) => setFocusedField(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };


    useGSAP(() => {
        const tl = gsap.timeline();

        // Background entrance
        tl.from(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // Left Side Stagger
        tl.from(".hero-text-anim", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
        }, "-=0.4");

        // Form Side Stagger
        tl.from(".form-anim", {
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.6");

    }, { scope: containerRef });

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        emailjs.sendForm(
            'service_3r3aroq',
            'template_vedme79',
            formRef.current,
            'z-JqCBqYp5_JSluFX'
        )
            .then((result) => {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                if (formRef.current) formRef.current.reset();
                setFormValues({ user_name: '', user_email: '', message: '' });
            }, (error) => {
                setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-primary text-secondary overflow-x-hidden flex flex-col md:flex-row">

            {/* Mobile Header / Back Button (visible on all) */}
            <div className="absolute top-0 left-0 p-6 md:p-10 z-50">
                <Magnetic>
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </Magnetic>
            </div>


            {/* Left Section: Hero / Text */}
            <div className="w-full md:w-1/2 p-6 md:p-20 pt-32 md:pt-20 flex flex-col justify-center relative">
                <div className="relative z-10">
                    <h1 className="hero-text-anim text-[12vw] md:text-[8vw] leading-none tracking-tight font-anton text-secondary mb-4">
                        LET'S<br /> START A<br /> PROJECT
                    </h1>
                    <p className="hero-text-anim text-xl md:text-2xl font-instrument italic text-secondary/70 max-w-md mt-8">
                        We help brands turn demand into performance through culture, creativity, and data.
                    </p>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col justify-center">
                <div className="max-w-xl w-full mx-auto">
                    <h2 className="form-anim text-4xl font-anton mb-12 text-secondary">Hello!</h2>

                    <form ref={formRef} onSubmit={sendEmail} className="space-y-12">

                        {/* Name Input */}
                        <div className="form-anim group relative w-full">
                            <input
                                type="text"
                                name="user_name"
                                id="firstName"
                                required
                                value={formValues.user_name}
                                onChange={handleChange}
                                onFocus={() => handleFocus('user_name')}
                                onBlur={() => handleBlur('user_name')}
                                className="peer w-full bg-transparent border-b border-secondary/20 py-4 text-xl md:text-2xl font-proxima outline-none transition-colors focus:border-accent"
                            />
                            <label
                                htmlFor="firstName"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none 
                                    ${(focusedField === 'user_name' || formValues.user_name)
                                        ? '-top-6 text-sm text-accent'
                                        : 'top-4 text-xl md:text-2xl text-secondary/40'}`}
                            >
                                What's your name?
                            </label>
                        </div>

                        {/* Email Input */}
                        <div className="form-anim group relative w-full">
                            <input
                                type="email"
                                name="user_email"
                                id="email"
                                required
                                value={formValues.user_email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('user_email')}
                                onBlur={() => handleBlur('user_email')}
                                className="peer w-full bg-transparent border-b border-secondary/20 py-4 text-xl md:text-2xl font-proxima outline-none transition-colors focus:border-accent"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none 
                                    ${(focusedField === 'user_email' || formValues.user_email)
                                        ? '-top-6 text-sm text-accent'
                                        : 'top-4 text-xl md:text-2xl text-secondary/40'}`}
                            >
                                What's your email?
                            </label>
                        </div>

                        {/* Message Input */}
                        <div className="form-anim group relative w-full">
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={1}
                                value={formValues.message}
                                onChange={handleChange}
                                onFocus={() => handleFocus('message')}
                                onBlur={() => handleBlur('message')}
                                className="peer w-full bg-transparent border-b border-secondary/20 py-4 text-xl md:text-2xl font-proxima outline-none transition-colors focus:border-accent resize-none min-h-[60px]"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none 
                                    ${(focusedField === 'message' || formValues.message)
                                        ? '-top-6 text-sm text-accent'
                                        : 'top-4 text-xl md:text-2xl text-secondary/40'}`}
                            >
                                Tell us about your project...
                            </label>
                        </div>

                        {/* Status Message */}
                        {status.message && (
                            <div className={`form-anim text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {status.message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="form-anim pt-8 flex justify-end">
                            <Magnetic>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative overflow-hidden rounded-full bg-secondary text-primary px-8 py-4 md:px-10 md:py-5 text-lg font-anton tracking-wider hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                        {!isSubmitting && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
