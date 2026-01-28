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

const InsightsPage = () => {
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
      <main ref={containerRef} className="relative w-full text-secondary overflow-hidden">

        {/* HERO SECTION */}
        <div className="relative pt-24 px-6 md:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">
          {/* Big Hero Text */}
          <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
            <h1 className="text-[10vw] leading-none font-anton uppercase tracking-tight relative">
              <AnimatedLine text="Insights" />
              <AnimatedLine text="supercharge digital" />
              <AnimatedLine text="and real-life" />
              <AnimatedLine text="moments." />

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
                  src="/images/hat.png"
                  alt="Vintage Synthesizers"
                  width={2070}
                  height={1553}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKAP/2Q=="
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Explore Studio
              </div>
            </div>
          </section>
        </div>

        {/* EDITORIAL HEADLINE SECTION */}
        <section className="relative w-full max-w-screen mx-auto px-6 md:px-12 pt-24 pb-12 text-[#1a1a1a]">
          <div className="w-full flex justify-end">
            <h1 className="text-[7vw] text-right leading-none font-anton uppercase tracking-tight relative">
              <AnimatedLine text="We maximize" />
              <AnimatedLine text="the value of" />
              <AnimatedLine text="each opportunity" />
              <AnimatedLine text="your brand has" />
              <AnimatedLine text="to connect." />
            </h1>
          </div>
        </section>

        {/* EDITORIAL PARAGRAPH SECTION */}
        <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32 text-[#1a1a1a]">
          <div className="w-full space-y-8 md:space-y-16 ">
            <p className="text-xl md:text-4xl font-normal leading-relaxed text-neutral-800 font-geist-mono">
              We create <span className="font-semibold text-secondary">impactful brand expressions</span> that are <span style={{ fontFamily: 'var(--font-instrument)' }} className="text-accent text-3xl md:text-4xl italic align-middle mx-1">thoughtfully contextualized</span> across multiple dimensions—including audience, channel, timing and desired outcomes—to deliver truly <span className="bg-accent/10 px-2 rounded-md">optimized experiences</span> in a fast-moving world.
              Drawing on our broad expertise in <span style={{ fontFamily: 'var(--font-instrument)' }} className="text-2xl md:text-3xl italic align-middle mx-1">culture & creativity</span>, experience design, production, media investment, and measurement, we help position your brand as the <span className="font-semibold underline decoration-accent decoration-2 underline-offset-4">top choice</span> for your audiences. By embedding an intelligent and streamlined operational model, powered by <span className="inline-flex items-center mx-1 align-middle bg-accent text-white px-3 py-1 rounded-full text-base font-medium">data & AI</span>, we create the agile foundation that allows you to do more with less, making every dollar work as hard as your creative.
              Every engagement we design not only connects with people in meaningful moments but also generates <span className="inline-block bg-secondary text-primary px-4 py-1 rounded-full italic text-xl md:text-2xl mx-1 align-middle" style={{ fontFamily: 'var(--font-instrument)' }}>valuable data</span>, enabling your brand to remain <span className="font-semibold">agile, responsive, and relevant</span>—both in real time and over the long term.
            </p>

          </div>
        </section>

      </main>
      <HomeConnect />
      <Footer />
    </>
  )
}

export default InsightsPage