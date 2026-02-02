"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "../Magnetic";

const menuItems = [
    { label: "HOME", href: "/", src: "/images/home-hamburger-final.jpeg" },
    {
        label: "SOLUTIONS",
        href: "",
        src: "/images/solutions-hamburger-v2.jpeg",
        subItems: [
            { label: "INTELLIGENCE", href: "/solutions/intelligence", src: "/images/intelligence.jpeg" },
            { label: "SELECTION", href: "/solutions/selection", src: "/images/selection.jpeg" },
            { label: "MEDIA", href: "/solutions/media", src: "/images/media.jpeg" },
            { label: "OPTIMISATION", href: "/solutions/optimisation", src: "/images/optimization.jpeg" },
        ]
    },
    {
        label: "PRODUCTS",
        href: "",
        src: "/images/products-hamburger-v2.jpeg",
        subItems: [
            { label: "REFLEXN", href: "/products/reflexn", src: "/images/reflexn-hamburger-v2.jpeg" },
            { label: "PIKKCOM VR", href: "/products/pikkcomvr", src: "/images/vr-hamburger-v2.jpeg" },
            { label: "INSIGHTS", href: "/products/insights", src: "/images/insight-hamburger-v2.jpg" }, // TODO: Updates specific images if available
        ]
    },
    // { label: "OUR WORK", href: "/our-work", src: "/images/hero.png" },
    { label: "COMPANY", href: "/company", src: "/images/company-hamburger-v2.jpeg" },
    { label: "CONTACTS", href: "/contact", src: "/images/contact-hamburger-v2.jpeg" },
];

export default function Menu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(menuItems[0].src);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const tl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        gsap.set(container.current, { yPercent: -100, autoAlpha: 1 });

        tl.current = gsap.timeline({ paused: true })
            .to(container.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power4.inOut",
            })
            .from(".menu-item-anim", {
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
            setActiveImage(menuItems[0].src);
            setExpandedItem(null);
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
            className="fixed inset-0 bg-primary z-60 flex flex-col md:flex-row h-screen w-screen overflow-hidden invisible"
        >
            {/* Left Column: Navigation */}
            <div className="flex-1 flex flex-col justify-between px-6 py-6 md:px-12 md:py-10 relative z-10 h-full overflow-y-auto no-scrollbar">

                {/* Header: Logo & Close Button */}
                <div className="flex items-center justify-between w-full mb-8 md:mb-0">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-fatkat cursor-pointer text-secondary"
                    >
                        pikkcom<span className="text-accent">.</span>
                    </Link>

                    <Magnetic>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-12 h-12 rounded-full border cursor-pointer border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors duration-300"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </Magnetic>
                </div>

                {/* Main Navigation */}
                <div className="flex flex-col gap-2 items-center justify-center flex-1 w-full">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="menu-item-wrapper relative w-full flex flex-col items-center justify-center"
                            onMouseEnter={() => {
                                handleMouseEnter(item);
                                if (item.subItems) setExpandedItem(item.label);
                                else setExpandedItem(null);
                            }}
                            onMouseLeave={() => {
                                // Optional: collapse on leave, or keep expanded until another hover
                            }}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="menu-item-anim block text-5xl md:text-8xl font-anton! font-black text-secondary uppercase hover:text-accent text-center transition-colors duration-300"
                                    onClick={() => setIsOpen(false)}
                                    onMouseEnter={() => handleMouseEnter(item)}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className="menu-item-anim block text-5xl md:text-8xl font-anton! font-black text-secondary uppercase hover:text-accent text-center transition-colors duration-300 cursor-default"
                                    onMouseEnter={() => handleMouseEnter(item)}
                                >
                                    {item.label}
                                </span>
                            )}

                            {/* Submenu Render */}
                            {item.subItems && (
                                <div className={`flex flex-col gap-2 items-center overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={subItem.href}
                                            className="menu-item-anim block text-2xl md:text-4xl font-anton! text-secondary/70 hover:text-accent uppercase transition-colors duration-300"
                                            onClick={() => setIsOpen(false)}
                                            onMouseEnter={(e) => {
                                                e.stopPropagation();
                                                handleMouseEnter(subItem);
                                            }}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Links */}
                <div className="flex justify-center gap-12 text-secondary/60 font-medium text-sm tracking-wide mt-8 md:mt-0">
                    <a href="#" className="hover:text-secondary transition-colors uppercase">YouTube</a>
                    <a href="https://www.instagram.com/pikkcom?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="hover:text-secondary transition-colors uppercase">Instagram</a>
                    <a href="#" className="hover:text-secondary transition-colors uppercase">TikTok</a>
                </div>
            </div>

            {/* Right Column: Image Preview */}
            <div className="hidden md:flex flex-1 relative h-full w-full bg-secondary/5">
                {menuItems.flatMap(i => i.subItems ? [i, ...i.subItems] : [i]).map((item, index) => (
                    <div
                        key={index} // Using unique key strategy might be needed if duplicates exist, but here href/src combo is unique enough or index in flat map
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
        </div>
    );
}
