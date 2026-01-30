"use client"
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import heroImage from "@/public/images/hero.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const Hero = () => {



    useGSAP(() => {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const tl1 = gsap.timeline();


        const heroHeadline = new SplitText(".hero-headline", {
            type: "words",
        });

        tl1.from(heroHeadline.words, {
            opacity: 0,
            y: 20,
            scale: .95,
            duration: 2,
            ease: "elastic.out(1,0.3)",
            stagger: 0.2,
        })

        const heroSubtext = new SplitText(".hero-subtext", {
            type: "lines",
        });

        tl1.from(heroSubtext.lines, {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
        }, "-=2").from(".hero-svg", {
            opacity: 0,
            duration: 1,
            scale: 0,
            rotate: 180,
            ease: "power4.inOut"
        }, "-=1.5");


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
                        <h1 className="hero-headline flex flex-nowrap whitespace-nowrap items-center justify-center text-[3.5vw] md:text-[5vw] lg:text-[6vw] font-medium tracking-tighter text-[#2d2d2d] mb-8 md:mb-12">
                            <span>Turn Demand </span>
                            <span className="text-accent flex items-center justify-center relative mx-[1vw] md:mx-[1.5vw]">
                                <svg width="0.8em" height="0.8em" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow hero-svg">
                                    <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span>Into Performance</span>
                        </h1>

                        {/* Subtext */}
                        <div className="hero-subtext text-base sm:text-xl md:text-2xl leading-relaxed text-secondary/80 max-w-sm sm:max-w-xl md:max-w-3xl mx-auto">
                            <p>
                                PIKKCOM combines <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">intelligence</span> , <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">technology</span> and <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">media</span> to help
                            </p>
                            <p className="mt-2">
                                <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">brands</span> spot winning products, understand true <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">customer intent</span> , and launch high-impact campaigns that <span className="bg-[#DCFF93] px-2 py-0.5 rounded-md text-secondary font-medium mx-1">convert</span>.
                            </p>
                        </div>
                    </div>
                }
            >
                <Image
                    src={heroImage}
                    alt="Pikkcom Digital Advertising Hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-top-left"
                    draggable={false}
                    priority
                />
            </ContainerScroll>
        </section>
    );
};

export default Hero;