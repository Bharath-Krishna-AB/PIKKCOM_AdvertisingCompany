"use client"
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import heroImage from "@/public/images/hero.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const Hero = () => {

    useGSAP(() => {
        const tl1 = gsap.timeline();
        tl1.from(".hero-svg", {
            rotate: 360,
            repeat: -1,
            duration: 7,
            ease: "none"
        });
    })
    return (
        <section className="flex flex-col items-center justify-center px-4 text-center overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center justify-center">
                        {/* Headline */}
                        <h1 className="flex flex-wrap items-center justify-center gap-4 text-7xl md:text-8xl font-medium tracking-tighter text-secondary mb-12">
                            <span>Dev Toolkit</span>
                            <span className="text-accent flex items-center justify-center relative">
                                <svg width="0.8em" height="0.8em" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow hero-svg">
                                    <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span>Built to Flex</span>
                        </h1>

                        {/* Subtext */}
                        <div className="text-xl md:text-2xl leading-relaxed text-secondary/80 max-w-3xl">
                            <p>
                                Platform packed with <span className="bg-gray-200/80 px-2 py-0.5 rounded-md text-secondary font-medium mx-1">Webflow</span> & <span className="bg-gray-200/80 px-2 py-0.5 rounded-md text-secondary font-medium mx-1">HTML</span> resources,
                            </p>
                            <p className="mt-2">
                                <span className="bg-gray-200/80 px-2 py-0.5 rounded-md text-secondary font-medium mx-1">icons</span> , <span className="bg-gray-200/80 px-2 py-0.5 rounded-md text-secondary font-medium mx-1">easings</span> and a page transition <span className="bg-gray-200/80 px-2 py-0.5 rounded-md text-secondary font-medium mx-1">course</span>
                            </p>
                        </div>
                    </div>
                }
            >
                <Image
                    src={heroImage}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-top-left"
                    draggable={false}
                />
            </ContainerScroll>
        </section>
    );
};

export default Hero;