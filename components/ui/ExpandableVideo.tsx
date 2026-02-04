"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableVideoProps {
    src: string;
    className?: string;
    containerClassName?: string;
    title?: string;
}

const ExpandableVideo: React.FC<ExpandableVideoProps> = ({
    src,
    className,
    containerClassName,
    title = "Reflexn", // Default fallback
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Lock body scroll when expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
            if (videoRef.current) {
                videoRef.current.muted = false; // Unmute on expand? Maybe keep muted or let user toggle. 
                // Let's reset volume to 1 but keep muted prop responsive to state if needed.
                // Actually safer to keep simple: loop everywhere.
            }
        } else {
            document.body.style.overflow = "";
            if (videoRef.current) {
                videoRef.current.muted = true;
            }
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isExpanded]);

    return (
        <>
            {/* Placeholder / Collapsed State */}
            <motion.div
                layoutId="expandable-video-container"
                className={cn(
                    "relative overflow-hidden cursor-pointer group",
                    containerClassName
                )}
                onClick={() => setIsExpanded(true)}
            >
                <motion.video
                    layoutId="expandable-video"
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={cn("w-full h-full object-cover", className)}
                />

                {/* Overlay & Button */}
                <motion.div
                    className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"
                    layoutId="video-overlay"
                />

                <motion.div
                    layoutId="expand-button"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                >
                    <Maximize2 size={32} />
                </motion.div>

                <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
                    {title}
                </div>
            </motion.div>

            {/* Expanded State (Overlay) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-12"
                        onClick={() => setIsExpanded(false)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* Expanded Video Container */}
                        <motion.div
                            layoutId="expandable-video-container"
                            className="relative w-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.video
                                layoutId="expandable-video"
                                src={src}
                                ref={videoRef}
                                autoPlay
                                loop
                                // Start muted to safely autoplay, user can unmute with controls if enabled
                                // For "good way", showing native controls in expanded mode is usually best
                                controls
                                className="w-full h-full object-contain bg-black"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ExpandableVideo;
