"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger)


const Message = () => {


  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secondMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create('.message-content p', {
      type: 'words, lines',
      linesClass: "paragraph-line"
    })

    gsap.to(firstMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top center",
        end: "30% center",
        scrub: true,
      }
    })


    gsap.to(secondMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    })

    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top 20%",
      }
    })

    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "circ.inOut",
    })

    const paraTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top 90%",
      }
    })

    paraTl.from(paragraphSplit.words, {
      opacity: 0,
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 0.8,
      stagger: 0.005,
    })
  });

  return (
    <section data-theme="dark" className="message-content bg-secondary font-anton flex justify-center items-center relative z-20 py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative w-full">
        <div className="w-full h-full flex flex-col items-center">

          {/* Main Headline Container */}
          <div className="relative flex flex-col items-center justify-center text-center gap-2 md:gap-4 lg:gap-6 w-full">

            {/* First Line */}
            <h1 className="first-message text-[#faeade10] font-bold uppercase leading-[1.1]
                           text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8rem]
                           max-w-full md:max-w-[90%] lg:max-w-[85%] xl:max-w-7xl">
              We identify winning products, decode real
            </h1>

            {/* Accent Word (Rotated) */}
            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              className="msg-text-scroll relative z-10 rotate-2 
                         -my-2 md:-my-4 
                         scale-[0.8] md:scale-100" // Scale down on mobile slightly if needed
            >
              <div className="bg-secondary/10 px-4 py-1 backdrop-blur-sm rounded-lg">
                <h2 className="text-accent font-bold uppercase leading-[1.1]
                               text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] 2xl:text-[7rem]">
                  demand
                </h2>
              </div>
            </div>

            {/* Second Line */}
            <h1 className="second-message text-[#faeade10] font-bold uppercase leading-[1.1]
                           text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8rem]
                           max-w-full md:max-w-[90%] lg:max-w-[85%] xl:max-w-[1400px]">
              and build converting campaigns.
            </h1>
          </div>

          {/* Subtext Paragraph */}
          <div className="flex justify-center items-center mt-12 md:mt-20 lg:mt-24 w-full">
            <div className="w-full max-w-[90%] sm:max-w-lg md:max-w-2xl px-4 md:px-0 overflow-hidden">
              <p className='message-content-p text-center font-proxima text-primary text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90'>
                Fuel smarter growth and unlock real performance
                with PIKKCOM, where every campaign is driven by
                proven demand, sharp intelligence, and results that convert.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Message