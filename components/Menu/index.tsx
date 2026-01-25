"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    { label: "HOME", href: "/", src: "/images/hero.png" },
    { label: "SOLUTIONS", href: "/solutions", src: "/images/hero.png" },
    { label: "PRODUCTS", href: "/products", src: "/images/hero.png" },
    { label: "OUR WORK", href: "/our-work", src: "/images/hero.png" },
    { label: "COMPANY", href: "/company", src: "/images/hero.png" },
    { label: "CONTACTS", href: "/contact", src: "/images/hero.png" },
];

export default function Menu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(menuItems[0].src);
    const tl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        gsap.set(container.current, { yPercent: -100 });

        tl.current = gsap.timeline({ paused: true })
            .to(container.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power4.inOut",
            })
            .from(".menu-item", {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.4");

    });

    useEffect(() => {
        if (isOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isOpen]);

    const handleMouseEnter = (item: any) => {
        setActiveImage(item.src);
    };

    return (
        <div
            ref={container}
            className="fixed inset-0 bg-primary z-60 flex flex-col md:flex-row h-screen w-screen overflow-hidden"
        >
            {/* Left Column: Navigation */}
            <div className="flex-1 flex flex-col justify-between px-6 py-6 md:px-12 md:py-10 relative z-10 h-full">

                {/* Header: Logo & Close Button */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-xl font-fatkat cursor-pointer text-secondary">
                        pikkcom<span className="text-accent">.</span>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-12 h-12 rounded-full border cursor-pointer border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors duration-300"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Main Navigation */}
                <div className="flex flex-col gap-2 items-center justify-center flex-1">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="menu-item-wrapper relative w-full p-0 overflow-hidden"
                            onMouseEnter={() => handleMouseEnter(item)}
                        >
                            <Link
                                href={item.href}
                                className="menu-item block text-8xl leading-tight tracking-tighter font-anton font-black text-secondary uppercase hover:text-accent text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer Links */}
                <div className="flex justify-center gap-12 text-secondary/60 font-medium text-sm tracking-wide">
                    <a href="#" className="hover:text-secondary transition-colors uppercase">YouTube</a>
                    <a href="#" className="hover:text-secondary transition-colors uppercase">Instagram</a>
                    <a href="#" className="hover:text-secondary transition-colors uppercase">TikTok</a>
                </div>
            </div>

            {/* Right Column: Image Preview */}
            <div className="hidden md:flex flex-1 relative h-full w-full bg-secondary/5">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeImage === item.src ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                ))}
            </div>
        </div >
    );
}
