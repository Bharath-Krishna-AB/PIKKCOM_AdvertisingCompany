"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const NewHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: 1
        });

        const heroText = SplitText.create(".hero-text", {
            type: "chars",
        });

        // Staggered Title Animation
        tl.from(heroText.chars, {
            yPercent: 100,
            rotate: 360,
            opacity: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
        }, "-=0.5");

        // Subtitle Animation
        tl.from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        }, "-=0.8");

        // Scroll Indicator Entrance
        tl.from(".scroll-indicator", {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");

        // Scroll Sync Rotation for Text Circle (Outer)
        gsap.to(".scroll-text-circle", {
            rotation: 360,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // Scroll Sync Rotation for Center Icon (Inner) - Opposite direction for dynamic feel
        gsap.to(".scroll-center-icon", {
            rotation: 360,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Centered Content Group */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">

                {/* Title */}
                <h1 ref={titleRef} style={{ fontFamily: "Helvetica Now, Helvetica Neue, Helvetica, Arial, sans-serif" }} className="hero-text text-[12vw] md:text-[15vw] leading-[0.8] font-bold text-secondary tracking-tighter select-none opacity-20 md:opacity-100 mt-20 md:mt-0">
                    PIKKCOM<span className="text-accent font-fatkat text-[9vw] md:text-[12vw]">.</span>
                </h1>

                {/* Subtitle Content - Pulled up to overlap/tighten gap */}
                <div className="w-screen flex flex-col items-center gap-3 pointer-events-auto mt-5">
                    <p className="hero-subtitle text-3xl md:text-5xl font-clash-display text-secondary font-light leading-normal tracking-tight text-center">
                        Blending Data | Media | Tech for <br /> Enhanced Storytelling.
                    </p>
                    <p className="hero-subtitle font-sans font-normal text-center text-sm md:text-base text-secondary/80 max-w-3xl leading-relaxed tracking-wide">
                        We help brands with large product catalogs identify what customers truly want — and turn those insights into high-performing product campaigns.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator - Aligned Right */}
            <div className="scroll-indicator absolute bottom-10 right-6 md:bottom-12 md:right-12 z-20 cursor-pointer group flex flex-col items-center gap-2 mix-blend-difference">
                <div className="relative w-26 h-26 md:w-34 md:h-34 flex items-center justify-center">
                    {/* Rotating Text */}
                    <div className="scroll-text-circle absolute w-full h-full animate-spin-slow">
                        <svg className="w-full h-full text-secondary" viewBox="0 0 100 100">
                            <defs>
                                <path id="circle" d="M 50, 50 m -28, 0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" />
                            </defs>
                            <text fontSize="7.5" fontFamily="var(--font-anton)" letterSpacing="1.5px">
                                <textPath xlinkHref="#circle" className="fill-current text-secondary opacity-80">
                                    SCROLL DOWN • EXPLORE MORE • SCROLL DOWN • EXPLORE MORE •
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Center Icon (Complex Geometric from Hero) */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm overflow-hidden p-2.5">
                        <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="scroll-center-icon w-full h-full text-accent">
                            <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Background Grain/Texture (Optional subtle detail) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

        </div>
    );
}

export default NewHero;