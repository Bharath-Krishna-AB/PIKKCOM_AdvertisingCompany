"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!magnetic.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetic.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(magnetic.current, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 1,
                ease: "power3.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(magnetic.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)",
            });
        };

        const element = magnetic.current;
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return React.cloneElement(children as React.ReactElement<any>, { ref: magnetic });
}
