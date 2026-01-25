"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Magnetic from "./Magnetic";
import Menu from "./Menu";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

    useGSAP(() => {
        const tl1 = gsap.timeline();
        tl1.from(".logo", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut"
        }).from(".menu-icon", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut"
        }, "-=0.4").from(".action-button", {
            duration: 0.5,
            ease: "power2.inOut"
        }, "-=0.4");

        // ScrollTrigger for Message Section
        ScrollTrigger.create({
            trigger: ".message-content",
            start: "top top",
            end: "bottom top",
            onEnter: () => {
                gsap.to("nav", {
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    borderColor: "transparent",
                    duration: 0.3
                });
                gsap.to(".logo", {
                    color: "var(--color-primary)",
                    duration: 0.3
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "var(--color-primary)",
                    duration: 0.3
                });
            },
            onLeave: () => {
                gsap.to("nav", {
                    backgroundColor: "rgba(244, 244, 244, 0.7)", // primary with opacity
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(34, 29, 29, 0.05)", // secondary/5
                    duration: 0.3,
                    clearProps: "backdropFilter" // clear to let CSS handle it if needed
                });
                gsap.to(".logo", {
                    color: "var(--color-secondary)",
                    duration: 0.3 
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "var(--color-secondary)",
                    duration: 0.3
                });
            },
            onEnterBack: () => {
                gsap.to("nav", {
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    borderColor: "transparent",
                    duration: 0.3
                });
                gsap.to(".logo", {
                    color: "var(--color-primary)",
                    duration: 0.3
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "var(--color-primary)",
                    duration: 0.3
                });
            },
            onLeaveBack: () => {
                gsap.to("nav", {
                    backgroundColor: "rgba(244, 244, 244, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(34, 29, 29, 0.05)",
                    duration: 0.3,
                    clearProps: "backdropFilter"
                });
                gsap.to(".logo", {
                    color: "var(--color-secondary)",
                    duration: 0.3
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "var(--color-secondary)",
                    duration: 0.3
                });
            }
        });
    })

    const handleMenuMouseEnter = () => {
        gsap.to(".menu-icon", {
            scale: 1.1,
            opacity: .9,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }

    const handleMenuMouseLeave = () => {
        gsap.to(".menu-icon", {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    const handleActionMouseEnter = () => {
        gsap.to(".action-button", {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }

    const handleActionMouseLeave = () => {
        gsap.to(".action-button", {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Animate hamburger to X
    React.useEffect(() => {
        if (isMenuOpen) {
            gsap.to(".burger-line-1", { rotate: 45, y: 5, duration: 0.3 });
            gsap.to(".burger-line-2", { rotate: -45, y: -5, duration: 0.3 });
        } else {
            gsap.to(".burger-line-1", { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(".burger-line-2", { rotate: 0, y: 0, duration: 0.3 });
        }
    }, [isMenuOpen]);

    return (
        <>
            <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 select-none bg-primary/70 backdrop-blur-md border-b border-secondary/5" >
                {/* Logo */}
                <Magnetic>
                    <div className="logo text-xl font-fatkat cursor-pointer text-secondary relative z-50">
                        pikkcom<span className="text-accent">.</span>
                    </div>
                </Magnetic>

                {/* Menu Icon - Custom Double Line */}
                <Magnetic>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        onMouseEnter={() => handleMenuMouseEnter()}
                        onMouseLeave={() => handleMenuMouseLeave()}
                        className="menu-icon flex flex-col gap-2 cursor-pointer p-2 relative z-50"
                        aria-label="Menu"
                    >
                        <div className="burger-line-1 w-8 h-0.5 bg-secondary origin-center"></div>
                        <div className="burger-line-2 w-8 h-0.5 bg-secondary origin-center"></div>
                    </button>
                </Magnetic>

                {/* Right Action Button */}
                <Magnetic>
                    <button
                        onMouseEnter={() => handleActionMouseEnter()}
                        onMouseLeave={() => handleActionMouseLeave()}
                        className="action-button px-8 py-3 rounded-full text-sm font-bold tracking-wider shadow-sm bg-accent text-primary cursor-pointer relative z-50"
                    >
                        LET'S TALK
                    </button>
                </Magnetic>
            </nav>
        </>
    );
};

export default Navbar;
