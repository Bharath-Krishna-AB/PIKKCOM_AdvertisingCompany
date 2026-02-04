"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const NewHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Ensure SplitText is available (fallback if not)
        let heroChars: Element[] = [];
        try {
            const split = new SplitText(titleRef.current, { type: "chars" });
            heroChars = split.chars;
        } catch (e) {
            console.warn("SplitText not loaded", e);
        }

        // Desktop Animations (Typewriter Effect)
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({ delay: 0.5 });
            if (heroChars.length > 0) {
                // Typewriter Reveal: Characters appear one by one
                gsap.set(heroChars, { opacity: 0 });

                tl.to(heroChars, {
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.1,
                    ease: "power1.inOut",
                });
            } else {
                tl.from(titleRef.current, { opacity: 0, duration: 1 });
            }
        });

        // Mobile/Tablet Animations (Typewriter Effect)
        mm.add("(max-width: 1023px)", () => {
            const tl = gsap.timeline({ delay: 0.5 });
            if (heroChars.length > 0) {
                // Typewriter Reveal
                gsap.set(heroChars, { opacity: 0 });

                tl.to(heroChars, {
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.1,
                    ease: "power1.inOut",
                });
            } else {
                tl.from(titleRef.current, { opacity: 0, duration: 1 });
            }
        });

        // Scroll Sync Rotation for Text Circle (Shared)
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

        // Scroll Center Icon Inverse Rotation (Shared)
        gsap.to(".scroll-center-icon", {
            rotation: -360,
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
        <div
            data-theme="light"
            ref={containerRef}
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidde text-secondary"
        >

            {/* Background Gradient/Noise Parallax */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[100px] mix-blend-multiply filter" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-secondary/5 rounded-full blur-[80px] mix-blend-multiply filter" />
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Centered Content Group */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">

                {/* Title */}
                <div className="relative z-20">
                    <h1
                        ref={titleRef}
                        style={{ fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        className="hero-text text-[13vw] md:text-[15vw] leading-[0.8] font-bold text-secondary tracking-tighter select-none perspective-500"
                    >
                        PIKKCOM<span className="text-accent font-fatkat text-[11vw] md:text-[12vw] inline-block">.</span>
                    </h1>
                </div>

                {/* Subtitle Content - Framer Motion Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                    className="w-full max-w-[90vw] md:max-w-none flex flex-col items-center gap-4 pointer-events-auto mt-8 md:mt-2 relative z-20"
                >
                    <p className="hero-subtitle text-2xl md:text-5xl font-clash-display text-secondary font-light leading-snug tracking-tight text-center max-w-4xl">
                        Blending Data, Media & Tech for <br className="hidden md:block" /> Enhanced Storytelling.
                    </p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1.6, duration: 1 }}
                        className="hero-subtitle font-sans font-normal text-center text-sm md:text-lg text-secondary max-w-2xl leading-relaxed tracking-wide"
                    >
                        We help brands with large product catalogs identify what customers truly want — and turn those insights into high-performing product campaigns.
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll Indicator - Interactive Framer Motion */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
                className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 pointer-events-auto"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center cursor-pointer">
                    {/* Rotating Text */}
                    <div className="scroll-text-circle absolute w-full h-full">
                        <svg className="w-full h-full text-secondary" viewBox="0 0 100 100">
                            <defs>
                                <path id="circle" d="M 50, 50 m -28, 0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" />
                            </defs>
                            <text fontSize="8" fontFamily="var(--font-anton)" letterSpacing="1px">
                                <textPath xlinkHref="#circle" textLength="175" lengthAdjust="spacingAndGlyphs" className="fill-current text-secondary font-medium tracking-widest">
                                    SCROLL • EXPLORE • SCROLL • EXPLORE •
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Center Icon */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center p-3 overflow-hidden"
                    >
                        <svg
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="scroll-center-icon w-full h-full text-accent"
                        >
                            <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
}

export default NewHero;
