"use client";
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Footer = () => {

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".footer-content",
                start: "top 40%",
                end: "bottom bottom",
                scrub: true,
            }
        });

        // Split text for brand name - Massive parallax effect
        const footerBrandText = SplitText.create(".footer-brand-text", { type: "chars" });
        tl.from(footerBrandText.chars, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotationX: -45,
            transformOrigin: "center bottom",
            ease: "power3.out",
            stagger: 0.05,
            duration: 1.5,
        });

        // Header Text - Reveal Animation
        const footerHeaderText = SplitText.create(".footer-header", { type: "words, chars" });
        gsap.from(footerHeaderText.chars, {
            scrollTrigger: {
                trigger: ".footer-header",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            rotation: 5,
            stagger: 0.02,
            duration: 1,
            ease: "back.out(1.7)"
        });

        // Staggered Columns Entry
        gsap.from(".footer-column", {
            scrollTrigger: {
                trigger: ".footer-content",
                start: "top 60%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Bottom Bar Slide Up
        gsap.from(".footer-bottom-bar", {
            scrollTrigger: {
                trigger: ".footer-content",
                start: "bottom 95%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5
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
                    <h2 className="footer-header text-4xl md:text-6xl font-anton uppercase leading-none text-primary/90">
                        Future <br />
                        <span className="text-accent"> Built on Legacy</span>
                    </h2>
                </div>

                <Magnetic>
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
                </Magnetic>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 w-full mb-32 font-proxima">


                {/* Column 2: Navigation */}
                <div className="footer-column md:col-span-4 flex flex-col gap-6">
                    <h3 className="text-accent font-bold tracking-wider uppercase opacity-80 text-sm">NAVIGATION</h3>
                    <div className="grid grid-cols-2 gap-4 text-lg font-bold">
                        <Link href="/" className="group relative inline-block w-fit">
                            <span className="relative z-10">HOME</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">OUR WORK</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">SOLUTIONS</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">COMPANY</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">PRODUCTS</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">CONTACT</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>

                {/* Column 3: Follow */}
                <div className="footer-column md:col-span-4 flex flex-col gap-6">
                    <h3 className="text-accent font-bold tracking-wider uppercase opacity-80 text-sm">FOLLOW</h3>
                    <div className="grid grid-cols-1 gap-4 text-lg font-bold">
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">LINKEDIN</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">INSTAGRAM</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        <Link href="#" className="group relative inline-block w-fit">
                            <span className="relative z-10">YOUTUBE</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Massive Brand Text */}
            <div className="relative w-full mb-20">
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
