'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import Footer from '@/components/Footer'
import HomeConnect from '@/components/HomeConnect'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger);

const ReflexnPage = () => {
  const arrowMainRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
      if (videoRef.current) { videoRef.current.muted = false }
    } else {
      document.body.style.overflow = ""
      if (videoRef.current) { videoRef.current.muted = true }
    }
    return () => { document.body.style.overflow = "" }
  }, [isExpanded])

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

    // Fade in sections
    gsap.utils.toArray('.content-section').forEach((section: any) => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      })
    });

  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="relative w-full text-secondary overflow-hidden">

        {/* HERO SECTION */}
        <div className="relative pt-24 px-4 md:px-8 lg:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">
          {/* Big Hero Text */}
          <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
            <h1 className="text-[14vw] md:text-[10vw] lg:text-[10vw] leading-none font-anton uppercase tracking-tight relative wrap-break-word">
              <AnimatedLine text="Confident" />
              <AnimatedLine text="decisions at" />
              <AnimatedLine text="the moment" />
              <AnimatedLine text="of choice." />

              {/* Arrow SVG */}
              <div className="absolute left-[15%] top-full w-[40vw] min-w-[350px] pointer-events-none z-0 hidden lg:block rotate-0">
                <svg
                  viewBox="0 0 1080 659.23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    className="fill-[#703fff]"
                    d="M63.47,25.6c-54.54,120.22-24.02,270.36,88.82,345.1,31.06,21.01,66.88,35.14,104.17,39.55,36.98,4.11,75.5-1.53,108.76-18.55,18.63-9.83,35.86-23.01,48.21-40.22,26.97-36.3,41.55-96.65-8.83-119.8-43.55-19.59-96.85-4.58-130.22,27.96-63.17,59.24-65.56,163.86-17.43,233.08,49.86,71.04,135.13,106.89,217.97,122.83,193.05,33.05,390.26-3.65,576.48-56.79,4.13-1.19,8.44,1.2,9.63,5.33,1.19,4.13-1.2,8.44-5.33,9.63-167.65,47.42-343.13,79.63-517.92,63.38-106.97-9.5-226.06-46.04-290.14-138.05-37.62-55.54-46.14-130.46-18.71-192.09,18.25-40.86,52.93-75.56,96.52-88.08,27.03-8.02,57.22-7.46,83.06,4.47,55.86,26.36,42.59,91.99,11.74,133.14-13.15,18.13-31.55,32.17-51.31,42.43-34.76,17.58-74.84,23.3-113.35,18.82-82.55-10.2-156.25-65.84-193.97-139.22-20.06-39.22-29.96-83.27-30.08-127.22-.15-43.92,9.23-87.81,27.4-127.77.57-1.25,2.05-1.81,3.3-1.24,1.25.57,1.8,2.04,1.24,3.29h0Z"
                  />
                  <path
                    ref={arrowMainRef}
                    className="fill-none stroke-[#703fff]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="15.56px"
                    d="M982.8,626.65c6.25-7.98,13.8-16.55,22.85-25.17,16.88-16.09,33.78-27.38,47.87-35.24-15.83,1.12-38.85.48-64.09-8.8-8.11-2.98-15.28-6.42-21.52-9.93"
                  />
                </svg>
              </div>
            </h1>
          </section>

          {/* Bottom Section */}
          <section className="flex justify-end items-end w-full">
            <motion.div
              layoutId="expandable-video-container"
              className="relative group cursor-pointer w-full md:w-auto max-w-full md:max-w-none"
              onClick={() => setIsExpanded(true)}
            >
              <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
              <div className="relative w-full md:w-[600px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-black">
                <motion.video
                  layoutId="expandable-video"
                  src="/videos/reflexn-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                <motion.div
                  layoutId="expand-button"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                >
                  <Maximize2 size={32} />
                </motion.div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
                Reflexn Mirror
              </div>
            </motion.div>
          </section>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-12"
                onClick={() => setIsExpanded(false)}
              >
                <button
                  className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  <X size={24} />
                </button>

                <motion.div
                  layoutId="expandable-video-container"
                  className="relative w-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.video
                    layoutId="expandable-video"
                    src="/videos/reflexn-video.mp4"
                    ref={videoRef}
                    autoPlay
                    loop
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTAINER FOR CONTENT SECTIONS */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pb-24 md:pb-32 space-y-20 md:space-y-32">

          {/* SECTION 1: CUSTOMER IMPACT */}
          <section className="content-section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-instrument italic text-accent mb-6 leading-tight">Customer Impact</h2>
              <h3 className="text-xl font-sans uppercase tracking-widest text-secondary/50 mb-4">The Experience</h3>
              <ul className="space-y-4">
                {[
                  "Faster outfit decisions with real-time guidance",
                  "Instantly personalized recommendations",
                  "Increased confidence through style and fit feedback",
                  "Reduced decision fatigue during try-ons"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-accent text-lg mt-1">✦</span>
                    <span className="text-xl md:text-2xl font-clash-display font-medium text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg md:text-2xl font-sans font-light text-secondary/90 leading-relaxed">
                Reflexn empowers customers to make confident decisions at the moment of choice. With <span className="font-semibold text-secondary">real-time style guidance</span> and AI-driven outfit recommendations, shoppers receive instant, personalized suggestions tailored to their body type, preferences, and context. Visual feedback and style match insights reduce uncertainty, helping customers <span className="bg-accent/10 px-2 rounded-md">decide faster</span>, feel more confident in their selections, and enjoy a smoother, more engaging try-on experience.
              </p>
            </div>
          </section>

          {/* SECTION 2: RETAIL IMPACT */}
          <section className="content-section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="text-lg md:text-2xl font-sans font-light text-secondary/90 leading-relaxed text-right md:text-left">
                For retailers, Reflexn turns mirrors into <span className="font-semibold text-secondary">performance-driven touchpoints</span>. By guiding customers toward better decisions, the smart mirror increases conversion rates, shortens the path to purchase, and reduces drop-offs at critical moments. The enhanced in-store experience keeps customers engaged longer, supports staff with <span className="font-semibold underline decoration-accent decoration-2 underline-offset-4">intelligent assistance</span>, and creates new opportunities for data-driven upselling and brand partnerships.
              </p>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-instrument italic text-accent mb-6 leading-tight">Retail Impact</h2>
              <h3 className="text-xl font-sans uppercase tracking-widest text-secondary/50 mb-4">Business Value</h3>
              <ul className="space-y-4">
                {[
                  "Elevated in-store experience through interactive engagement",
                  "Higher conversion rates and faster sales cycles",
                  "Reduced decision abandonment and bounce-offs",
                  "Smarter upselling and cross-selling opportunities",
                  "Actionable insights into customer preferences and behavior"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-accent text-lg mt-1">✦</span>
                    <span className="text-xl md:text-2xl font-clash-display font-medium text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 3: PUBLISHER MODEL */}
          <section className="content-section relative py-12 md:py-20 border-t border-secondary/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-7xl font-anton uppercase text-secondary mb-6 md:mb-8">Reflexn as a <br /><span className="text-accent">Publisher Model</span></h2>
              <p className="text-xl md:text-3xl font-instrument italic text-secondary/80 leading-relaxed">
                "Using real-time context, customer preferences, and intent signals, Reflexn turns the smart mirror into an <span className="font-sans font-bold not-italic text-secondary">intelligent in-store publisher</span>, enabling dynamic ad bidding where brands compete to appear at the <span className="bg-accent/10 px-2 rounded-md not-italic">exact moment of decision</span>—monetizing high-attention interactions while maintaining trust and a seamless experience."
              </p>
            </div>
          </section>

        </div>

      </main>
      <HomeConnect />
      <Footer />
    </>
  )
}

export default ReflexnPage