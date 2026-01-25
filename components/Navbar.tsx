"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Magnetic from "./Magnetic";

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
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut"
        }, "-=0.4");
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

    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 select-none bg-primary/70 backdrop-blur-md border-b border-secondary/5" >
            {/* Logo */}
            <Magnetic>
                <div className="logo text-xl font-fatkat cursor-pointer text-secondary">
                    pikkcom<span className="text-accent">.</span>
                </div>
            </Magnetic>

            {/* Menu Icon - Custom Double Line */}
            <Magnetic>
                <button onMouseEnter={() => handleMenuMouseEnter()} onMouseLeave={() => handleMenuMouseLeave()} className=" menu-icon flex flex-col gap-2 cursor-pointer p-2" aria-label="Menu">
                    <div className="w-8 h-0.5 bg-secondary"></div>
                    <div className="w-8 h-0.5 bg-secondary"></div>
                </button>
            </Magnetic>

            {/* Right Action Button */}
            <Magnetic>
                <button
                    onMouseEnter={() => handleActionMouseEnter()}
                    onMouseLeave={() => handleActionMouseLeave()}
                    className="action-button px-8 py-3 rounded-full text-sm font-bold tracking-wider shadow-sm bg-accent text-primary cursor-pointer"
                >
                    LET'S TALK
                </button>
            </Magnetic>
        </nav>
    );
};

export default Navbar;
