"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText,ScrollTrigger)


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
        start: "top center",
      }
    })

    paraTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
    })
  });

  return (
    <section className=" message-content bg-secondary font-anton h-screen overflow-hidden flex justify-center items-center relative z-20">
      <div className="container mx-auto flex justify-center items-center py-28 relative">
        <div className="w-full h-full">
          <div className="2xl:text-[8rem] md:text-8xl text-5xl font-bold uppercase flex flex-col justify-center items-center md:gap-24 gap-14">
            <h1 className="first-message leading-none 2xl:max-w-7xl md:max-w-2xl max-w-xs text-center  text-[#faeade10]">We identify winning products, decode real </h1>
            <div style={{
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
            }} className="msg-text-scroll rotate-3 2xl:translate-y-5 -translate-y-5 absolute z-10">
              <div className=" md:pb-5 pb-3 px-5">
                <h2 className="text-accent leading-none">demand</h2>
              </div>
            </div>
            <h1 className="second-message leading-none 2xl:max-w-7xl md:max-w-4xl max-w-xs text-center text-[#faeade10]">
                 and build converting campaigns.
            </h1>
          </div>

          <div className="flex justify-center items-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex justify-center items-center overflow-hidden">
              <p className='text-center font-proxima text-primary'>
                Rev up your rebel spirit and feed the adventure of life with
                SPLYT, where you're one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Message