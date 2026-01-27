"use client"

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeSolution from "@/components/HomeProducts";
import Testimonial from "@/components/Testimonial";
import Message from "@/components/Message";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import CircularDemo from "@/components/CircularDemo/CircularDemo";
import HomeConnect from "@/components/HomeConnect";

gsap.registerPlugin(ScrollSmoother)

const GridSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative border-b border-neutral-200 ${className}`}>
    <div className="relative z-10 w-full">
      {children}
    </div>
  </div>
);

export default function Home() {

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <GridSection>
            <Hero />
          </GridSection>
          <GridSection>
            <Message />
          </GridSection>
          <GridSection>
            <HomeSolution />
          </GridSection>
          <GridSection>
            <CircularDemo />
          </GridSection>
          <GridSection>
            <HomeConnect />
          </GridSection>
          <Footer />
        </div>
      </div>
    </>
  );
}
