"use client"

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




        const heroSubtext = new SplitText(".hero-subtext", {
            type: "lines",
        });

        tl1.from(heroSubtext.lines, {
            opacity: 0,
            yPercent: 100,
            ease: "power2.out",
            duration: 1,
            stagger: 0.1,
        });
    })
    return (
        <section className="flex flex-col items-center justify-center px-4 text-center overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center justify-center">
                        {/* Headline */}
                        {/* Headline Removed */}

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