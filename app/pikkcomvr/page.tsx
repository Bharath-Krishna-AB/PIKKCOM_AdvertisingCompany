'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  // ... existing MagneticButton code ...
  return (
    <motion.div
    // ...
    >
      {children}
    </motion.div>
  )
}

const page = () => {
  const arrowMainRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Helper to animate path drawing
    const animatePath = (element: SVGPathElement | null, delay: number = 0) => {
      if (!element) return;
      const length = element.getTotalLength();
      gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(element, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        }
      });
    };

    animatePath(arrowMainRef.current, 0.5);

  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="relative pt-24 px-6 md:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between overflow-hidden">

        {/* Big Hero Text */}
        <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
          <h1 className="text-[10vw] leading-none font-anton uppercase tracking-tight text-secondary relative">
            <AnimatedLine text="Cool sounds to" />
            <AnimatedLine text="supercharge digital" />
            <AnimatedLine text="and real-life" />
            <AnimatedLine text="moments." />

            {/* Arrow SVG - Absolute positioned below text and pointing to image */}
            <div className="absolute left-[15%] top-full w-[40vw] min-w-[350px] pointer-events-none z-0 hidden md:block rotate-0">
              <svg
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M 1,1 Q 5,3 1,5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
                  </marker>
                </defs>

                <path
                  ref={arrowMainRef}
                  d="M 80 80 
                     C 80 250, 200 250, 220 200
                     C 230 170, 180 170, 190 200
                     C 200 240, 300 180, 320 150"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  className="text-accent"
                />
              </svg>
            </div>
          </h1>
        </section>

        {/* Bottom Section */}
        <section className="flex justify-end items-end w-full">
          <div className="relative group cursor-pointer w-full md:w-auto max-w-full md:max-w-none">
            <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
            <div className="relative w-full md:w-[600px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              {/* Using a placeholder image that matches the vintage synth vibe of the reference */}
              <img
                src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop"
                alt="Vintage Synthesizers"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              Explore Studio
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

const AnimatedLine = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export default page