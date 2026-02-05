'use client'

import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import Footer from '@/components/Footer'
import HomeConnect from '@/components/HomeConnect'
import { AnimatedLine } from '@/components/ui/AnimatedLine'
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger);

const PikkcomVRPage = () => {
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
        <div className="relative pt-24 px-4 md:px-8 lg:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">
          {/* Big Hero Text */}
          <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
            <h1 className="text-[14vw] md:text-[10vw] lg:text-[10vw] leading-none font-anton uppercase tracking-tight relative wrap-break-word">
              <AnimatedLine text="Place users" />
              {/* Custom Layout for "inside products," */}
              <div className="overflow-hidden" style={{ display: 'block' }}>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block', marginRight: '0.2em' }}
                >
                  inside
                </motion.div>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block', backgroundColor: '#B3D9FF' }}
                >
                  <span style={{ display: 'block', paddingLeft: '0.1em', paddingRight: '0.1em' }}>products</span>
                </motion.div>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  ,
                </motion.div>
              </div>
              <AnimatedLine text="places and" />
              {/* Custom Layout for "processes." */}
              <div className="overflow-hidden" style={{ display: 'block' }}>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block', backgroundColor: '#B3D9FF' }}
                >
                  <span style={{ display: 'block', paddingLeft: '0.1em', paddingRight: '0.1em' }}>processes</span>
                </motion.div>
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  .
                </motion.div>
              </div>

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
            <div className="relative group cursor-pointer w-full md:w-auto max-w-full md:max-w-none">
              <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
              <div className="relative w-full md:w-[600px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/vr-hamburger-v2.jpeg"
                  alt="Virtual Reality Experience"
                  width={2070}
                  height={1553}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYW1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oADAMBAAIRAxAPwD9U6KKKAP/2Q=="
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-4 py-3 rounded-full font-anton text-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Explore VR
              </div>
            </div>
          </section>
        </div>

        {/* EDITORIAL HEADLINE SECTION */}
        <section className="relative w-full max-w-screen mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-24 pb-12 text-[#2D2D2D]">
          <div className="w-full flex justify-end">
            <h1 className="text-5xl md:text-6xl lg:text-[7vw] text-right leading-none font-anton uppercase tracking-tight relative">
              <AnimatedLine text="Turning" />
              <AnimatedLine text="environments" />
              <AnimatedLine text="into powerful" />
              <AnimatedLine text="experiences." />
            </h1>
          </div>
        </section>

        {/* EDITORIAL PARAGRAPH SECTION */}
        <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pb-24 md:pb-32 text-[#2D2D2D]">
          <div className="w-full space-y-8 md:space-y-16 ">
            <p className="text-lg md:text-3xl font-medium leading-relaxed md:leading-snug text-secondary text-justify tracking-tight">
              We build <span className="font-semibold text-secondary">immersive, technology-driven</span> storytelling experiences that <span style={{ fontFamily: 'var(--font-instrument)' }} className="text-accent text-3xl md:text-4xl italic align-middle mx-1">place users inside</span> products, places, and processes.
              Using <span className="bg-accent/10 px-2 rounded-md">VR, 360° environments</span>, and interactive simulations, we enable virtual product showcases, guided tourism experiences, and advanced industrial walkthroughs for training, sales, and remote collaboration.
              These experiences allow audiences to <span className="font-semibold underline decoration-accent decoration-2 underline-offset-4">explore, interact, and understand</span> complex offerings in intuitive ways—driving deeper engagement, stronger recall, and clearer decision-making. By turning environments into experiences, immersive storytelling becomes a powerful tool for <span className="inline-block bg-secondary text-primary px-4 py-1 rounded-full italic text-xl md:text-2xl mx-1 align-middle" style={{ fontFamily: 'var(--font-instrument)' }}>demonstration, education</span>, and differentiation at scale.
            </p>

          </div>
        </section>

      </main>
      <HomeConnect />
      <Footer />
    </>
  )
}

export default PikkcomVRPage