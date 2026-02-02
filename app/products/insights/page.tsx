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

  const modules = [
    {
      title: "Product Ranking Dashboard",
      desc: "A live dashboard that ranks products based on demand, performance, trends, and profitability — helping brands quickly identify their best products to focus on."
    },
    {
      title: "Customer Preference Segmentation",
      desc: "Groups customers into preference-based segments (style, price range, category interest, buying behavior) so brands can understand what different audiences want."
    },
    {
      title: "Campaign-ready Product Recommendations",
      desc: "AI recommends the best products to advertise by matching customer preferences with product potential — creating ready lists of products for campaigns."
    },
    {
      title: "Ad Product Automation System",
      desc: "Automatically selects and updates products inside ad campaigns based on data + AI, so brands always promote the right products without manual effort."
    }
  ]

  return (
    <>
      <main ref={containerRef} className="relative w-full text-secondary overflow-hidden">

        {/* HERO SECTION */}
        <div className="relative pt-24 px-6 md:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">
          {/* Big Hero Text */}
          <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
            <h1 className="text-[10vw] md:text-[7vw] leading-none font-anton uppercase tracking-tight relative">
              <AnimatedLine text="Focus," />
              <AnimatedLine text="Plan, and" />
              <AnimatedLine text="Grow" />
              <AnimatedLine text="Profitably." />

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
                  src="/images/insight-hamburger-v2.jpg"
                  alt="Pikkcom Insights Dashboard"
                  width={2070}
                  height={1553}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKAP/2Q=="
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Pikkcom Insights
              </div>
            </div>
          </section>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 pb-32 space-y-32">

          {/* INTRO */}
          <section className="content-section max-w-4xl">
            <p className="text-2xl md:text-5xl font-clash-display font-medium text-secondary leading-tight">
              A product intelligence platform that helps brands <span className="text-accent italic font-instrument">focus, plan campaigns</span>, and grow profitably.
            </p>
          </section>

          {/* MODULES GRID */}
          <section className="content-section">
            <h2 className="text-sm font-sans uppercase tracking-widest text-secondary/50 mb-12">Key Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {modules.map((mod, i) => (
                <div key={i} className="group">
                  <h3 className="text-2xl md:text-3xl font-clash-display font-semibold text-secondary mb-4 group-hover:text-accent transition-colors duration-300">
                    {mod.title}
                  </h3>
                  <p className="text-lg md:text-xl font-sans font-light text-secondary/80 leading-relaxed border-l-2 border-secondary/10 pl-6 group-hover:border-accent transition-colors duration-300">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PROBLEM DEFINITION SECTION */}
          <section className="content-section bg-secondary text-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-anton uppercase mb-8">The Challenge</h2>
                <p className="text-xl md:text-2xl font-sans font-light opacity-90 mb-8">
                  When a brand has <span className="font-bold text-accent">1000+ products</span>, they can’t manually decide:
                </p>
                <ul className="space-y-4">
                  {[
                    "Which products to run ads for",
                    "Which products to stop advertising",
                    "Which products to push today / this week / this season",
                    "Which products match which customers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg md:text-xl font-clash-display">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-primary/20 pt-12 lg:pt-0 lg:pl-16">
                <h2 className="text-4xl md:text-6xl font-anton uppercase mb-8 text-accent">The Solution</h2>
                <p className="text-xl md:text-3xl font-instrument italic leading-relaxed">
                  "The <span className="not-italic font-bold font-sans">Ad Product Automation System</span> does this automatically using <span className="bg-primary/20 px-2 rounded-md">data + AI</span>, ensuring campaigns always focus on the right products."
                </p>
              </div>
            </div>

            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </section>

        </div>

      </main>
      <HomeConnect />
      <Footer />
    </>
  )
}

export default InsightsPage