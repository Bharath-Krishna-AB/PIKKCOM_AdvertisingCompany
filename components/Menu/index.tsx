"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "../Magnetic";
import { menuItems } from "./menuData";
import MenuItem from "./MenuItem";
import MenuImagePreview from "./MenuImagePreview";

export default function Menu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(menuItems[0].src);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const tl = useRef<gsap.core.Timeline>(null);
    const pathname = usePathname();

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
            document.body.style.overflow = "hidden"; // Lock scroll
        } else {
            tl.current?.reverse();
            document.body.style.overflow = ""; // Unlock scroll
        }

        // Cleanup on unmount or if isOpen changes unexpectedly
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close menu on route change logic is handled by handleLinkClick mostly, 
    // but this acts as a failsafe for browser navigation.
    useEffect(() => {
        setIsOpen(false);
    }, [pathname, setIsOpen]);

    const handleLinkClick = () => {
        // Instantly reset animation to start state (closed) to avoid reverse animation lag
        tl.current?.progress(0).pause();
        gsap.set(container.current, { yPercent: -100 });
        setIsOpen(false);
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
                        onClick={handleLinkClick}
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
                        <MenuItem
                            key={index}
                            item={item}
                            onMouseEnter={(i) => setActiveImage(i.src)}
                            onLinkClick={handleLinkClick}
                            expandedItem={expandedItem}
                            setExpandedItem={setExpandedItem}
                        />
                    ))}
                </div>

                {/* Footer Links */}
                <div className="flex justify-center gap-12 text-secondary/60 font-medium text-sm tracking-wide mt-8 md:mt-0">
                    <a href="#" className="hover:text-secondary transition-colors uppercase">YouTube</a>
                    <a href="https://www.instagram.com/pikkcom?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="hover:text-secondary transition-colors uppercase">Instagram</a>
                    <a href="#" className="hover:text-secondary transition-colors uppercase">LinkedIn</a>
                </div>
            </div>

            {/* Right Column: Image Preview */}
            <MenuImagePreview items={menuItems} activeImage={activeImage} />
        </div>
    );
}
