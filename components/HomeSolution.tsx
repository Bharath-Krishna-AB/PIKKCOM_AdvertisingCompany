"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
// Using placeholder images for now as specific assets weren't provided
import hatImage from "@/public/images/hat.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
    {
        id: "01",
        label: "Solutions",
        title: "Real-Time Brands",
        image: hatImage, // Placeholder
        link: "#",
        color: "#ffb400" // Mustard yellow-ish from design
    },
    {
        id: "02",
        label: "Solutions",
        title: "Marketing Orchestration",
        image: hatImage, // Placeholder
        link: "#",
        color: "#a0a0ff" // Light blue-ish
    },
    {
        id: "03",
        label: "Solutions",
        title: "Glass Box Media",
        image: hatImage, // Placeholder
        link: "#",
        color: "#b0e0b0" // Green-ish
    },
    {
        id: "04",
        label: "Solutions",
        title: "Technology Services",
        image: hatImage, // Placeholder
        link: "#",
        color: "#e0b0b0" // Pink-ish
    }
];

const HomeSolution = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !titleRef.current) return;

        // Title Animation
        const splitTitle = new SplitText(titleRef.current, { type: "words, chars" });
        gsap.from(splitTitle.words, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        // Cards Animation
        const cards = gsap.utils.toArray<HTMLElement>(".solution-card");

        cards.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 100,
                duration: 1,
                delay: i * 0.1, // Staggered delay
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            // Hover effects handled via CSS/GSAP context if needed, 
            // but simpler to do primarily in CSS for performance with some GSAP spice
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-8 text-secondary overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-6xl font-proxima font-bold mb-20 max-w-full leading-tighter tracking-tighter">
                    Your trusted partner for innovation across four strategic service offerings:
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="solution-card group relative flex flex-col"
                        >
                            {/* Background Number */}
                            <div className="absolute -top-16 -right-4 md:-right-8 text-9xl font-bold text-secondary/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500 font-proxima select-none pointer-events-none z-0 transform group-hover:-translate-y-4">
                                {service.id}
                            </div>

                            {/* Image Container */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500 bg-gray-100">
                                <div className="absolute inset-0 bg-secondary/10 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col grow">
                                <span className="text-sm font-medium text-secondary/60 mb-2 block uppercase tracking-wide">
                                    {service.label}
                                </span>

                                <div className="flex items-end justify-between gap-4 mt-auto">
                                    <h3 className="text-2xl font-proxima font-bold leading-tight group-hover:text-accent transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <Link
                                        href={service.link}
                                        className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary/20 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                        >
                                            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeSolution;
