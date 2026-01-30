"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ContactPage() {
    const router = useRouter();
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.from(".contact-anim", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen w-full bg-[#FFE6BC] text-[#001D3D] relative overflow-hidden flex flex-col">
            {/* Header / Navigation Check */}
            <div className="w-full p-6 md:p-10 flex justify-between items-center z-20">
                <button
                    onClick={() => router.back()}
                    className="contact-anim w-12 h-12 rounded-full bg-[#001D3D] text-[#FFE6BC] flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <Link href="/" className="contact-anim w-12 h-12 rounded-full bg-[#001D3D] text-[#FFE6BC] flex items-center justify-center hover:scale-105 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>

            <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto px-6 md:px-10 pb-10">

                {/* Left Side: Illustration */}
                <div className="w-full md:w-5/12 flex items-center justify-center p-8 relative">
                    <div className="contact-anim relative w-full aspect-square max-w-xl mx-auto flex items-center justify-center">
                        <Image
                            src="/images/contact-page.png"
                            alt="Contact Illustration"
                            width={500}
                            height={500}
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 flex flex-col justify-center pl-0 md:pl-20">
                    <div className="mb-6">
                        <h1 className="contact-anim text-5xl md:text-7xl font-bold tracking-tight mb-2">
                            Get in touch with
                        </h1>
                        <h2 className="contact-anim text-5xl md:text-7xl font-serif italic text-opacity-90">
                            General Inquiries
                        </h2>
                    </div>

                    <form className="w-full max-w-2xl space-y-6">
                        <div className="contact-anim space-y-2">
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="First Name*"
                                className="w-full bg-white rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#001D3D]/20 transition-all placeholder:text-gray-500"
                            />
                        </div>

                        <div className="contact-anim space-y-2">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email*"
                                className="w-full bg-white rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#001D3D]/20 transition-all placeholder:text-gray-500"
                            />
                        </div>

                        <div className="contact-anim space-y-2">
                            <label htmlFor="message" className="sr-only">Message Area</label>
                            <textarea
                                id="message"
                                placeholder="Message Area*"
                                rows={4}
                                className="w-full bg-white rounded-2xl px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#001D3D]/20 transition-all placeholder:text-gray-500 resize-none"
                            ></textarea>
                        </div>

                        <div className="contact-anim flex items-center gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-[#001D3D] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all"
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                className="w-14 h-14 rounded-full bg-[#001D3D] text-white flex items-center justify-center hover:bg-opacity-90 transition-all group"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
