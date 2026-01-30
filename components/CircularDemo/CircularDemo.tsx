import React from 'react';
import CircularDemoRenderer from './CircularDemoRenderer';

export type DemoItem = {
    image: string; // Used as a fallback or background if needed, but primarily we draw via canvas
    text: string;
    type: 'green' | 'black' | 'white';
    title: string;
    description: string;
    badge?: string;
}

const demoItems: DemoItem[] = [
    {
        image: '',
        text: 'Page Transition Course',
        type: 'green',
        title: 'Page Transition\nCourse',
        description: 'How to create page transitions\nto take your websites to the next level.',
        badge: 'FEB 2026'
    },
    {
        image: '',
        text: 'Icons',
        type: 'black',
        title: 'Icons',
        description: 'A uniform library of clean, scalable SVG\nicons you can copy or download in seconds.',
        badge: 'PART OF THE MEMBERSHIP'
    },
    {
        image: '',
        text: 'Easings',
        type: 'white',
        title: 'Easings',
        description: 'Coming soon, ready-to-paste easings for\nCSS and GSAP inside the Osmo platform.',
        badge: 'EXPECTED EARLY 2026'
    },
    {
        image: '',
        text: 'Page Transition Course',
        type: 'green',
        title: 'Page Transition\nCourse',
        description: 'How to create page transitions\nto take your websites to the next level.',
        badge: 'FEB 2026'
    },
    {
        image: '',
        text: 'Icons',
        type: 'black',
        title: 'Icons',
        description: 'A uniform library of clean, scalable SVG\nicons you can copy or download in seconds.',
        badge: 'PART OF THE MEMBERSHIP'
    },
    {
        image: '',
        text: 'Easings',
        type: 'white',
        title: 'Easings',
        description: 'Coming soon, ready-to-paste easings for\nCSS and GSAP inside the Osmo platform.',
        badge: 'EXPECTED EARLY 2026'
    }
];

const CircularDemo = () => {
    return (
        <section className="w-full min-h-screen  relative flex flex-col items-center pt-24 overflow-hidden font-[family-name:var(--font-figtree)]">
            {/* Header Section */}
            <div className="text-center z-10 space-y-6 mb-8 max-w-5xl mx-auto px-4">
                <h2 className="text-[5rem] leading-none font-medium tracking-tight text-[#2D2D2D]">
                    A growing toolkit for
                    <br />
                    creative developers
                </h2>

                <p className="text-lg text-neutral-600">
                    Access everything with a single membership:
                </p>
            </div>

            {/* Gallery Section */}
            <div className="w-full h-[100vh] relative mt-8 ">
                <div className="absolute inset-0 mask-linear-fade">
                    <CircularDemoRenderer
                        items={demoItems}
                        bend={2}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        font="bold 24px Figtree"
                        scrollEase={0.05}
                        scrollSpeed={2.5}
                    />
                </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-neutral-100 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default CircularDemo;
