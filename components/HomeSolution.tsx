"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// Using placeholder images for now as specific assets weren't provided
import hatImage from "@/public/images/hat.png";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger,SplitText);

const services = [
    {
        id: "01",
        label: "Solutions",
        title: "Real-Time Brands",
        image: hatImage,
        link: "#",
        color: "#ffb400"
    },
    {
        id: "02",
        label: "Solutions",
        title: "Marketing Orchestration",
        image: hatImage,
        link: "#",
        color: "#a0a0ff"
    },
    {
        id: "03",
        label: "Solutions",
        title: "Glass Box Media",
        image: hatImage,
        link: "#",
        color: "#b0e0b0"
    },
    {
        id: "04",
        label: "Solutions",
        title: "Technology Services",
        image: hatImage,
        link: "#",
        color: "#e0b0b0"
    }
];

const HomeSolution = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {

        const title = SplitText.create(".home-solution h2", {
            type: "words",
        })

        const HeadingTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".home-solution h2",
                start: "top bottom",
            }
        })

        HeadingTl.from(title.words, {
            yPercent: 200,
            opacity: 0,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.1,
        })

        if (!containerRef.current) return;

        // Title Animation
        gsap.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        const cards = gsap.utils.toArray<HTMLElement>(".service-card");

        // Staggered Entrance
        gsap.from(cards, {
            y: 150,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2, // Defined stagger
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        // Parallax Effect for Offset Columns (2 & 4)
        // They should move slightly differently to enhance the staggered feel
        const evenCards = cards.filter((_, i) => i % 2 !== 0);
        gsap.to(evenCards, {
            y: -30, // Move up slightly faster
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="home-solution py-24 px-4 md:px-8 text-secondary overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-[90rem] mx-auto w-full relative z-10">

                {/* Header */}
                <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-proxima leading-tighter tracking-tight mb-24 md:mb-32 max-w-5xl">
                    Your trusted partner for innovation across four strategic service offerings <span className="text-accent">:</span>
                </h2>

                {/* Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 w-full">
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            className={`service-card group relative flex flex-col ${i % 2 !== 0 ? "lg:translate-y-24" : ""}`} // Zigzag offset on desktop
                        >
                            {/* Giant Background Number */}
                            <div className="absolute -top-16 lg:-top-24 right-0 lg:left-0 z-0 select-none pointer-events-none">
                                <span className="text-[8rem] lg:text-[10rem] font-bold text-white leading-none tracking-tighter"
                                    style={{ textShadow: "0px 0px 30px rgba(0,0,0,0.02)" }}>
                                    {service.id}
                                </span>
                            </div>

                            {/* Image Container */}
                            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-sm group-hover:shadow-2xl transition-all duration-500 z-10 bg-white">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 pl-2">
                                <span className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-1 block">
                                    {service.label}
                                </span>

                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-2xl lg:text-3xl font-bold font-proxima leading-tight group-hover:text-[var(--accent)] transition-colors duration-300 max-w-[80%]">
                                        {service.title}
                                    </h3>

                                    <Link
                                        href={service.link}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--secondary)] text-[var(--primary)] group-hover:bg-[var(--accent)] transition-colors duration-300 shrink-0 mt-1"
                                    >
                                        <ArrowRight
                                            size={20}
                                            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                        />
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
