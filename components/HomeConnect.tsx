"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeConnect = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<SVGPathElement>(null);

    useGSAP(
        () => {
            if (!circleRef.current) return;

            // Circle drawing animation
            if (circleRef.current) {
                const pathLength = circleRef.current.getTotalLength();
                gsap.set(circleRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

                gsap.to(
                    circleRef.current,
                    {
                        strokeDashoffset: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 60%", // Start when component is 60% into view
                        },
                    }
                );
            }

            // Text reveal animation
            gsap.from(".connect-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });


            // Button reveal animation
            gsap.from(".connect-btn", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[60vh] flex flex-col justify-between py-20 px-8 md:px-16"
        >
            {/* Top Label */}
            <div className="w-full">
                <span className="connect-text block text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    Connect
                </span>
            </div>

            {/* Main Headline */}
            <div className="flex-1 flex items-center justify-center my-12">
                <h2 className="connect-text text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#1a1a1a] text-center relative z-10">
                    What can we do for{" "}
                    <span className="relative inline-block px-4">
                        you?
                        {/* SVG Circle Overlay */}
                        <svg
                            width="250"
                            height="160"
                            viewBox="0 0 200 140"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute bg-transparent left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
                        >
                            <path
                                ref={circleRef}
                                d="M40,55C40,25 70,12 110,12C160,12 185,35 185,65C185,95 160,118 110,118C60,118 15,95 15,65C15,35 50,15 90,15C130,15 175,35 175,70"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                className="text-accent"
                            />
                        </svg>
                    </span>
                </h2>
            </div>

            {/* Bottom Buttons */}
            <div className="w-full flex items-center justify-between md:justify-start gap-6">
                <button
                    className="connect-btn group relative h-16 px-10 rounded-full bg-[#1a1a1a] text-white overflow-hidden transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <span className="text-xl font-medium relative overflow-hidden h-7 block">
                            <span className="block transition-transform duration-500 group-hover:-translate-y-full">Reach out</span>
                            <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-neutral-300">Let's talk</span>
                        </span>
                    </div>
                    {/* Fill effect */}
                    <div className="absolute inset-0 bg-neutral-800 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                </button>
            </div>
        </section>
    );
};

export default HomeConnect;
