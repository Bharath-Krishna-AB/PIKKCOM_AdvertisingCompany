"use client";
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import optimizationImage from '@/public/images/optimization.jpeg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CompanyPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Image Reveal
        tl.from(imageRef.current, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2
        });

        // Image Scale Effect opacity 
        tl.from(".company-image", {
            scale: 1.2,
            duration: 1.8,
            ease: "power2.out"
        }, "<");

        // Text Stagger
        tl.from(".animate-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=1");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-primary min-h-screen">
            <Navbar />

            <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Left: Visual/Image Section */}
                    <div className="lg:col-span-6 relative">
                        <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                            <Image
                                src={optimizationImage}
                                alt="Pikkcom Office Aesthetics"
                                fill
                                className="company-image object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                                priority
                            />
                            {/* Overlay Texture */}
                            <div className="absolute inset-0 bg-secondary/10 pointer-events-none mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="lg:col-span-6 flex flex-col justify-center h-full">
                        <div className="space-y-8">
                            <div className="overflow-hidden">
                                <h1 className="animate-text text-6xl md:text-8xl font-clash-display font-medium text-secondary leading-[0.9] tracking-tighter">
                                    CRAFTING <br /> THE FUTURE.
                                </h1>
                            </div>

                            <div className="space-y-6 max-w-xl">
                                <p className="animate-text text-2xl md:text-3xl font-instrument italic text-secondary/90 leading-snug">
                                    We are a collective of digital artisans, blending data science with creative expression.
                                </p>
                                <div className="animate-text h-px w-24 bg-accent/50"></div>
                                <p className="animate-text font-sans text-base md:text-lg text-secondary/70 leading-relaxed">
                                    With over a decade of expertise, we've redefined how brands connect with their audience.
                                    Our philosophy is simple: **Simplicity is the ultimate sophistication.**
                                    We strip away the noise to reveal the core essence of your business, delivering digital experiences that are not just seen, but felt.
                                </p>
                            </div>

                            {/* Stats or subtle details */}
                            <div className="animate-text pt-8 grid grid-cols-2 gap-8 border-t border-secondary/10">
                                <div>
                                    <span className="block text-4xl font-anton text-secondary">10+</span>
                                    <span className="text-sm font-sans text-secondary/60 uppercase tracking-widest mt-1">Years Experience</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-anton text-secondary">global</span>
                                    <span className="text-sm font-sans text-secondary/60 uppercase tracking-widest mt-1">Client Base</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Background Texture */}
            <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
        </div>
    );
};

export default CompanyPage;
