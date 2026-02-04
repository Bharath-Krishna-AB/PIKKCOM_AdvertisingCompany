"use client"

import { ContainerScroll } from "./ui/container-scroll-animation";
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
        <section data-theme="light" className="flex flex-col items-center justify-center px-4 text-center overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center justify-center">
                        {/* Headline */}
                        {/* Headline Removed */}

                        {/* Subtext */}
                        <div className="hero-subtext text-[0.95rem] sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary/80 w-full max-w-[95%] sm:max-w-xl md:max-w-3xl mx-auto px-2 sm:px-4 text-balance">
                            <p>
                                PIKKCOM combines <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">intelligence</span>, <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">technology</span> and <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">media</span> to help
                            </p>
                            <p className="mt-4">
                                <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">brands</span> spot winning products, understand true <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">customer intent</span>, and launch high-impact campaigns that <span className="bg-[#DCFF93] px-1 sm:px-1.5 py-0.5 rounded-md text-secondary font-medium mx-0.5">convert</span>.
                            </p>
                        </div>
                    </div>
                }
            >
                <video
                    src="/videos/work-syso.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover rounded-2xl"
                />
            </ContainerScroll>
        </section>
    );
};

export default Hero;