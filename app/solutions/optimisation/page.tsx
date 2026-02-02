"use client";
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HomeConnect from '@/components/HomeConnect';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const OptimisationPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Text Stagger
        tl.from(".solution-title-char", {
            y: 100,
            opacity: 0,
            rotate: 5,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
            delay: 0.2
        });

        tl.from(".solution-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

        // Content Reveal
        gsap.from(".content-block", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: ".content-section",
                start: "top 80%"
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-primary min-h-screen selection:bg-accent/30">
            <Navbar />

            {/* Hero Section */}
            <header className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[60vh] flex flex-col justify-center">
                <div className="max-w-7xl">
                    <p className="solution-subtitle text-xl md:text-3xl font-instrument italic text-accent mb-6">
                        Continuously optimize performance
                    </p>
                    <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-anton text-secondary uppercase tracking-tight break-words">
                        {"OPTIMISATION".split("").map((char, i) => (
                            <span key={i} className="solution-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
                        ))}
                    </h1>
                </div>
            </header>

            {/* Content Section */}
            <main className="content-section px-6 md:px-12 max-w-[1920px] mx-auto pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left: Description */}
                    <div className="lg:col-span-7 content-block">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-secondary/50 mb-6 border-b border-secondary/10 pb-2">Description</h3>
                        <p className="text-lg md:text-2xl font-sans font-light text-secondary/90 leading-relaxed whitespace-pre-line">
                            Using AI-driven analysis of real-time signals across platforms, we refine conversion paths, improve ROAS, and dynamically reallocate budgets toward the highest-performing products, audiences, and channels. Machine learning models identify winning patterns early, enabling faster decisions and smarter scaling across markets and regions. The result is sustained performance improvement, greater efficiency at scale, and growth that compounds over time rather than plateauing.
                        </p>
                    </div>

                    {/* Right: Capabilities */}
                    <div className="lg:col-span-5 content-block">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-secondary/50 mb-6 border-b border-secondary/10 pb-2">Capabilities</h3>
                        {/* Note: User didn't strictly provide bullets for Optimisation like others, inferring from description if needed or just showing key benefits styled similar */}
                        <div className="bg-secondary/5 p-8 rounded-lg">
                            <p className="text-xl font-clash-display font-medium text-secondary mb-4">
                                "The result is sustained performance improvement, greater efficiency at scale, and growth that compounds over time."
                            </p>
                            <div className="h-1 w-20 bg-accent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky "Next" Navigation - Loop back to Intelligence */}
            <div className="px-6 md:px-12 max-w-[1920px] mx-auto mb-20 content-block">
                <Link href="/solutions/intelligence" className="group inline-flex flex-col gap-2">
                    <span className="text-sm font-sans uppercase tracking-widest text-secondary/50">Next Solution</span>
                    <span className="text-4xl md:text-6xl font-instrument italic text-secondary group-hover:text-accent transition-colors flex items-center gap-4">
                        Intelligence
                        <ArrowRight className="w-8 h-8 md:w-12 md:h-12 transform group-hover:translate-x-4 transition-transform" />
                    </span>
                </Link>
            </div>

            {/* Background Texture */}
            <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <HomeConnect />
            <Footer/>
        </div>
    );
};

export default OptimisationPage;
