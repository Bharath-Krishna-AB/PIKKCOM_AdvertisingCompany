'use client'

import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import Footer from '@/components/Footer'
import HomeConnect from '@/components/HomeConnect'
import { AnimatedLine } from '@/components/ui/AnimatedLine'

gsap.registerPlugin(ScrollTrigger);

const ReflexnPage = () => {
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
        <div className="relative pt-24 px-6 md:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">
          {/* Big Hero Text */}
          <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
            <h1 className="text-[10vw] leading-none font-anton uppercase tracking-tight relative">
              <AnimatedLine text="Confident" />
              <AnimatedLine text="decisions at" />
              <AnimatedLine text="the moment" />
              <AnimatedLine text="of choice." />

              {/* Arrow SVG */}
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
                <Image
                  src="/images/reflexn-hamburger-v2.jpeg" // Assuming this image exists based on Menu.tsx, fallback if not? Menu uses .jpeg, let's use hat.png fallback if needed but user mentioned reflexn folder
                  alt="Reflexn Smart Mirror"
                  width={2070}
                  height={1553}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKAP/2Q=="
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Reflexn Mirror
              </div>
            </div>
          </section>
        </div>

        {/* CONTAINER FOR CONTENT SECTIONS */}
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-32 space-y-32">

          {/* SECTION 1: CUSTOMER IMPACT */}
          <section className="content-section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
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
          <section className="content-section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
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
          <section className="content-section relative py-20 border-t border-secondary/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-7xl font-anton uppercase text-secondary mb-8">Reflexn as a <br /><span className="text-accent">Publisher Model</span></h2>
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