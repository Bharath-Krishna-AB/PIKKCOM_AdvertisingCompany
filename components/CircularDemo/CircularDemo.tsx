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
        image: '/images/reflexn-hamburger-v2.jpeg',
        text: 'Reflexn',
        type: 'black',
        title: 'Confident\ndecisions at the\nmoment of choice.',
        description: 'Smart Mirror Intelligence for Retail\nand Customer Experience.',
        badge: 'REFLEXN'
    },
    {
        image: '/images/hat.png',
        text: 'Pikkcom VR',
        type: 'black',
        title: 'Place users\ninside products,\nplaces & processes.',
        description: 'Immersive Storytelling with VR\nand 360° Environments.',
        badge: 'PIKKCOM VR'
    },
    {
        image: '/images/insight-hamburger-v2.jpg',
        text: 'Insights',
        type: 'black',
        title: 'Focus, Plan,\nand Grow\nProfitably.',
        description: 'Product Intelligence Platform\nfor Data-Driven Growth.',
        badge: 'PIKKCOM INSIGHTS'
    },
    {
        image: '/images/reflexn-hamburger-v2.jpeg',
        text: 'Reflexn',
        type: 'black',
        title: 'Confident\ndecisions at the\nmoment of choice.',
        description: 'Smart Mirror Intelligence for Retail\nand Customer Experience.',
        badge: 'REFLEXN'
    },
    {
        image: '/images/hat.png',
        text: 'Pikkcom VR',
        type: 'black',
        title: 'Place users\ninside products,\nplaces & processes.',
        description: 'Immersive Storytelling with VR\nand 360° Environments.',
        badge: 'PIKKCOM VR'
    },
    {
        image: '/images/insight-hamburger-v2.jpg',
        text: 'Insights',
        type: 'black',
        title: 'Focus, Plan,\nand Grow\nProfitably.',
        description: 'Product Intelligence Platform\nfor Data-Driven Growth.',
        badge: 'PIKKCOM INSIGHTS'
    }
];

const CircularDemo = () => {
    return (
        <section className="w-full min-h-screen  relative flex flex-col items-center pt-24 overflow-hidden font-[family-name:var(--font-figtree)]">
            {/* Header Section */}
            <div className="text-center z-10 space-y-6 mb-8 max-w-5xl mx-auto px-4">
                <h2 className="text-[5rem] leading-none font-medium tracking-tight text-[#2D2D2D]">
                    Our Strategic
                    <br />
                    Products
                </h2>

                <p className="text-lg text-neutral-600">
                    Innovation driven solutions for modern brands:
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
        </section >
    );
};

export default CircularDemo;
