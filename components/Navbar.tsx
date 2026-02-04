"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Magnetic from "./Magnetic";
import Menu from "./Menu";
import React from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";


gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

    const currentPath = usePathname();



    const navRef = React.useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        const updateNavbarTheme = (theme: string) => {
            if (theme === "dark") {
                // Dark Theme: Navbar Transparent/Dark, Text White
                gsap.to("nav", {
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    borderColor: "transparent",
                    duration: 0.3,
                    overwrite: "auto"
                });
                gsap.to(".logo", {
                    color: "white", // Direct white for contrast on dark
                    duration: 0.3,
                    overwrite: "auto"
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "white",
                    duration: 0.3,
                    overwrite: "auto"
                });
                gsap.to(".action-button", {
                    backgroundColor: "#DCFF93", // Accent
                    color: "#0f0f0f",
                    duration: 0.3,
                    overwrite: "auto"
                });
            } else {
                // Light Theme: Navbar Light/Glass, Text Dark
                gsap.to("nav", {
                    backgroundColor: "rgba(244, 244, 244, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(34, 29, 29, 0.05)",
                    duration: 0.3,
                    clearProps: "backdropFilter",
                    overwrite: "auto"
                });
                gsap.to(".logo", {
                    color: "var(--color-secondary)", // Dark
                    duration: 0.3,
                    overwrite: "auto"
                });
                gsap.to(".burger-line-1, .burger-line-2", {
                    backgroundColor: "var(--color-secondary)",
                    duration: 0.3,
                    overwrite: "auto"
                });
                gsap.to(".action-button", {
                    backgroundColor: "var(--accent)", // Keep accent or specific styling
                    color: "var(--primary)",
                    duration: 0.3,
                    overwrite: "auto"
                });
            }
        };

        if (currentPath === "/") {
            // Initial Animation
            const tl1 = gsap.timeline();
            tl1.fromTo(".logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" })
                .fromTo(".menu-icon", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.4")
                .fromTo(".action-button", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.4");

            // Dynamic Theme Switching based on data-theme attribute
            const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");

            sections.forEach((section) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top+=50",
                    end: "bottom top+=50",
                    onEnter: () => updateNavbarTheme(section.dataset.theme || "light"),
                    onEnterBack: () => updateNavbarTheme(section.dataset.theme || "light"),
                    // Ensure we check on refresh/load to prevent FOUC
                    onRefresh: (self) => {
                        if (self.isActive) {
                            updateNavbarTheme(section.dataset.theme || "light");
                        }
                    }
                });
            });

            // Set initial state based on the first section if at top (and not covered by onRefresh which runs later)
            const firstSection = sections[0] as HTMLElement;
            if (window.scrollY < 50 && firstSection) {
                updateNavbarTheme(firstSection.dataset.theme || "light");
            }
        }
    }, { scope: navRef, dependencies: [currentPath] });

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

    if (currentPath === "/contact") return null;

    return (
        <>
            <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <nav ref={navRef} className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 select-none bg-primary/70 backdrop-blur-md border-b border-secondary/5" >
                {/* Logo */}
                <Magnetic>
                    <Link href="/" className="logo text-xl font-fatkat cursor-pointer text-secondary relative z-50">
                        pikkcom<span className="text-accent">.</span>
                    </Link>
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
                    <Link
                        href="/contact"
                        onMouseEnter={() => handleActionMouseEnter()}
                        onMouseLeave={() => handleActionMouseLeave()}
                        className="action-button px-8 py-3 rounded-full text-sm font-bold tracking-wider shadow-sm bg-accent text-primary cursor-pointer relative z-50"
                    >
                        LET'S TALK
                    </Link>
                </Magnetic>
            </nav>
        </>
    );
};

export default Navbar;
