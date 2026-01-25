"use client";
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

    useGSAP(() => {
        // Parallax effect for the large text
        gsap.to(".footer-brand-text", {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }
        });
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer-content bg-secondary text-primary relative overflow-hidden pt-20 pb-5 px-6 md:px-12 flex flex-col justify-between min-h-screen">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-20 border-b border-primary/10 pb-10">
                <div className="max-w-xl mb-10 md:mb-0">
                    <h2 className="text-4xl md:text-6xl font-anton uppercase leading-none text-primary/90">
                        Future <br />
                        <span className="text-accent"> Built on Legacy</span>
                    </h2>
                </div>

                <button
                    onClick={scrollToTop}
                    className="w-16 h-16 rounded-full bg-primary/10 hover:bg-accent flex items-center justify-center group transition-colors duration-300"
                    aria-label="Scroll to top"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary group-hover:text-white transform group-hover:-translate-y-1 transition-transform duration-300"
                    >
                        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 w-full mb-32 font-proxima">
                {/* Column 1: Address/Contact */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <h3 className="text-accent font-bold tracking-wider uppercase opacity-80 text-sm">PIKKCOM</h3>
                    <div className="flex flex-col gap-1 text-lg opacity-80 leading-relaxed font-bold">
                        <p>Infopark Park Centre,</p>
                        <p>Infopark Phase 1,</p>
                        <p>Infopark Kochi P.O, Kakkanad,</p>
                        <p>Kochi, Ernakulam, Kerala - 682042</p>
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <h3 className="text-accent font-bold tracking-wider uppercase opacity-80 text-sm">NAVIGATION</h3>
                    <div className="grid grid-cols-2 gap-4 text-lg font-bold">
                        <Link href="/" className="hover:text-accent transition-colors">HOME</Link>
                        <Link href="#" className="hover:text-accent transition-colors">OUR WORK</Link>
                        <Link href="#" className="hover:text-accent transition-colors">SOLUTIONS</Link>
                        <Link href="#" className="hover:text-accent transition-colors">COMPANY</Link>
                        <Link href="#" className="hover:text-accent transition-colors">PRODUCTS</Link>
                        <Link href="#" className="hover:text-accent transition-colors">CONTACT</Link>
                    </div>
                </div>

                {/* Column 3: Follow */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <h3 className="text-accent font-bold tracking-wider uppercase opacity-80 text-sm">FOLLOW</h3>
                    <div className="grid grid-cols-1 gap-4 text-lg font-bold">
                        <Link href="#" className="hover:text-accent transition-colors">LINKEDIN</Link>
                        <Link href="#" className="hover:text-accent transition-colors">INSTAGRAM</Link>
                        <Link href="#" className="hover:text-accent transition-colors">YOUTUBE</Link>
                    </div>
                </div>
            </div>

            {/* Massive Brand Text */}
            <div className="relative w-full mb-8">
                <h1 className="footer-brand-text text-[15vw] md:text-[18vw] leading-[0.8] font-fatkat text-center text-primary/10 select-none pointer-events-none w-full">
                    pikkcom
                </h1>
            </div>

            {/* Bottom Bar */}
            {/* Bottom Bar - Stand Alone Capsule */}
            <div className="w-full mt-4 md:mt-0 flex justify-center pb-2">
                <div className="w-full bg-primary/5 border border-primary/10 rounded-full px-4 py-3 md:px-6 md:py-4 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0">
                        {/* Left: Brand & Status */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-primary/60">
                                © 2026 PIKKCOM
                            </span>
                            <span className="hidden md:block w-px h-3 bg-primary/20"></span>
                            <span className="hidden md:block text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-primary/40">
                                INNOVATING FOR TOMORROW
                            </span>
                        </div>

                        {/* Right: Interactive Links */}
                        <div className="flex items-center gap-6 md:gap-8">
                            <Link href="#" className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-primary/60 hover:text-accent transition-colors">
                                LEGAL
                            </Link>
                            <span className="text-primary/20">—</span>
                            <Link href="#" className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-primary/60 hover:text-accent transition-colors">
                                PRIVACY
                            </Link>
                            <span className="text-primary/20">—</span>
                            <Link href="#" className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-primary/60 hover:text-accent transition-colors">
                                COOKIES
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
