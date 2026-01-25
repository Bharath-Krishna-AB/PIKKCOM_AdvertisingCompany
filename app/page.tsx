"use client"

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeSolution from "@/components/HomeSolution";
import Message from "@/components/Message";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";

gsap.registerPlugin(ScrollSmoother)

export default function Home() {

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <Message />
          <HomeSolution />
          <Footer />
        </div>
      </div>
    </>
  );
}
