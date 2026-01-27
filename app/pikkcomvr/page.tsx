'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX, y: middleY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

const page = () => {
  return (

    <main className="relative pt-24 px-6 md:px-12 pb-12 w-full max-w-screen mx-auto min-h-screen flex flex-col justify-between">

      {/* Big Hero Text */}
      <section className="relative z-10 my-10 md:my-0 flex-1 flex flex-col justify-center">
        <h1 className="text-[10vw] leading-none font-anton uppercase tracking-tight text-secondary">
          <AnimatedLine text="Cool sounds to" />
          <AnimatedLine text="supercharge digital" />
          <AnimatedLine text="and real-life" />
          <AnimatedLine text="moments." />
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