"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {

    useGSAP(() => {
        const tl1 = gsap.timeline();
        tl1.from(".logo", {
            opacity: 0,
            y: 20,
            duration: 0.5
        }).from(".menu-icon", {
            opacity: 0,
            y: 20,
            duration: 0.5
        }).from(".action-button", {
            opacity: 0,
            y: 20,
            duration: 0.5
        });
    })

    const handleMouseEnter = () => {
        gsap.to(".menu-icon", {
            scale: 1.1,
            opacity: .9,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }

    const handleMouseLeave = () => {
        gsap.to(".menu-icon", {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 select-none bg-primary/70 backdrop-blur-md border-b border-secondary/5" >
            {/* Logo */}
            <div className="logo text-xl font-fatkat cursor-pointer text-secondary">
                pikkcom<span className="text-accent">.</span>
            </div>

            {/* Menu Icon - Custom Double Line */}
            <button onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} className=" menu-icon flex flex-col gap-2 cursor-pointer p-2" aria-label="Menu">
                <div className="w-8 h-0.5 bg-secondary"></div>
                <div className="w-8 h-0.5 bg-secondary"></div>
            </button>

            {/* Right Action Button */}
            <button
                className="action-button px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm bg-accent text-primary cursor-pointer"
            >
                LET'S TALK
            </button>
        </nav>
    );
};

export default Navbar;
