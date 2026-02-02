"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    useGSAP(
        () => {
            const videoContainer = document.querySelector(".video-container");
            const video = videoContainer?.querySelector("video");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "center center",
                    scrub: 1.2,
                },
            });

            // Container Animation: Expand Width, Reduce Radius, Slide Up
            tl.fromTo(
                videoContainer,
                {
                    width: "50%",
                    scale: 1, // Ensure exact 50% width
                    boxShadow: "0px 20px 40px rgba(0,0,0,0.2)"
                },
                {
                    width: "100%",
                    scale: .9,
                    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                    ease: "power3.out",
                }
            );

            // Inner Parallax: Scale Video Down as Container Expands
            if (video) {
                tl.fromTo(
                    video,
                    { scale: 1.1 },
                    { scale: 1, ease: "power3.out" },
                    "<"
                );
            }
        },
        { scope: containerRef }
    );

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col justify-center bg-[#f4f4f4] py-24 overflow-hidden"
        >
            {/* Heading Container - Constrained with padding */}
            <div className="max-w-[90rem] mx-auto w-full px-4 md:px-8 relative z-10 mb-12 md:mb-24">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-clash-display leading-tight tracking-tight w-full text-[#2d2d2d] text-left">
                    Your trusted partner for innovation across four strategic service offerings <span className="text-accent">:</span>
                </h2>
            </div>

            {/* Video Outer Wrapper - Full Width (No padding) */}
            <div className="w-full flex justify-center">
                {/* Video Container - Animates width */}
                <div
                    className="video-container relative h-[50vh] md:h-[80vh] overflow-hidden shadow-2xl mx-auto z-0"
                    style={{ willChange: "width, transform, border-radius" }}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src="/videos/main-video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />

                    {/* Controls */}
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-4 z-20">
                        <motion.button
                            onClick={togglePlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            {isPlaying ? (
                                <div className="w-3 h-3 bg-white mx-0.5 rounded-sm flex gap-1">
                                    <div className="w-1 h-3 bg-white"></div>
                                    <div className="w-1 h-3 bg-white"></div>
                                </div>
                            ) : (
                                <Play size={20} fill="currentColor" />
                            )}
                        </motion.button>

                        <motion.button
                            onClick={toggleMute}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </motion.button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;