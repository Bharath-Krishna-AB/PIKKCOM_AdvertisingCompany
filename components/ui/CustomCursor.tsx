"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    // Interactive state (for visual changes)
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for the main cursor (instant but smooth)
    const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        // Add global listeners for interactive elements
        const anchors = document.querySelectorAll("a, button, input, textarea, [role='button']");
        anchors.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // MutationObserver to attach listeners to dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newAnchors = document.querySelectorAll("a, button, input, textarea, [role='button']");
                    newAnchors.forEach((el) => {
                        el.addEventListener("mouseenter", handleMouseEnter);
                        el.addEventListener("mouseleave", handleMouseLeave);
                    })
                }
            })
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            anchors.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-visible mix-blend-difference">
            {/* Main Dot Cursor */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1, // Subtle grow on hover, kept it simpler than ring
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-4 h-4 bg-white rounded-full z-50 will-change-transform"
            />
        </div>
    );
};

export default CustomCursor;
