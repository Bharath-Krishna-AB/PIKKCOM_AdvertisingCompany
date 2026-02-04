import React from 'react';
import Image from 'next/image'; // Ensure Next.js Image is imported
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CircularDemoRenderer from './CircularDemoRenderer';

export type DemoItem = {
    image: string; // Used as a fallback or background if needed, but primarily we draw via canvas
    text: string;
    type: 'green' | 'black' | 'white';
    title: string;
    description: string;
    badge?: string;
    link: string;
}

const demoItems: DemoItem[] = [
    {
        image: '/images/reflexn-hamburger-v2.jpeg',
        text: 'Reflexn',
        type: 'black',
        title: 'Confident\ndecisions at the\nmoment of choice.',
        description: 'Smart Mirror Intelligence for Retail\nand Customer Experience.',
        badge: 'REFLEXN',
        link: '/products/reflexn'
    },
    {
        image: '/images/vr-hamburger-v2.jpeg',
        text: 'Pikkcom VR',
        type: 'black',
        title: 'Place users\ninside products,\nplaces & processes.',
        description: 'Immersive Storytelling with VR\nand 360° Environments.',
        badge: 'PIKKCOM VR',
        link: '/products/pikkcomvr'
    },
    {
        image: '/images/insight-hamburger-v2.jpg',
        text: 'Insights',
        type: 'black',
        title: 'Focus, Plan,\nand Grow\nProfitably.',
        description: 'Product Intelligence Platform\nfor Data-Driven Growth.',
        badge: 'PIKKCOM INSIGHTS',
        link: '/products/insights'
    },
    {
        image: '/images/reflexn-hamburger-v2.jpeg',
        text: 'Reflexn',
        type: 'black',
        title: 'Confident\ndecisions at the\nmoment of choice.',
        description: 'Smart Mirror Intelligence for Retail\nand Customer Experience.',
        badge: 'REFLEXN',
        link: '/products/reflexn'
    },
    {
        image: '/images/vr-hamburger-v2.jpeg',
        text: 'Pikkcom VR',
        type: 'black',
        title: 'Place users\ninside products,\nplaces & processes.',
        description: 'Immersive Storytelling with VR\nand 360° Environments.',
        badge: 'PIKKCOM VR',
        link: '/products/pikkcomvr'
    },
    {
        image: '/images/insight-hamburger-v2.jpg',
        text: 'Insights',
        type: 'black',
        title: 'Focus, Plan,\nand Grow\nProfitably.',
        description: 'Product Intelligence Platform\nfor Data-Driven Growth.',
        badge: 'PIKKCOM INSIGHTS',
        link: '/products/insights'
    }
];

const MobileCard = ({ item }: { item: DemoItem }) => {
    const isDark = item.type === 'black';
    const isGreen = item.type === 'green';

    // Exact colors from renderer
    const bgColor = isGreen ? '#703EFF' : isDark ? '#0f0f0f' : '#ffffff';
    const textColor = isDark || isGreen ? '#ffffff' : '#2D2D2D';
    const subTextColor = isDark || isGreen ? '#a0a0a0' : '#555555';
    const accentColor = isGreen ? '#1a1a1a' : '#703EFF';

    return (
        <div
            className="w-full relative overflow-hidden rounded-[32px] sm:rounded-[40px] flex flex-col p-5 sm:p-8 min-h-[400px] sm:min-h-[500px]"
            style={{ backgroundColor: bgColor }}
        >
            {/* Badge */}
            <div className="mb-6 sm:mb-8">
                <span
                    className="font-clash-display font-semibold text-lg sm:text-2xl"
                    style={{ color: isDark || isGreen ? accentColor : '#2D2D2D' }}
                >
                    {item.badge}
                </span>
            </div>

            {/* Title */}
            <h3
                className="font-anton font-bold text-[clamp(2.5rem,12vw,3.75rem)] sm:text-6xl mb-4 sm:mb-6 leading-none tracking-wide"
                style={{ color: textColor }}
            >
                {item.title.toUpperCase()}
            </h3>

            {/* Description */}
            <p
                className="font-figtree text-lg sm:text-2xl mb-6 sm:mb-8 whitespace-pre-line"
                style={{ color: subTextColor }}
            >
                {item.description}
            </p>

            {/* Action Button */}
            <Link
                href={item.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all mb-8 self-start hover:scale-105 active:scale-95"
                style={{
                    backgroundColor: isDark ? '#ffffff' : '#0f0f0f',
                    color: isDark ? '#0f0f0f' : '#ffffff'
                }}
            >
                Explore {item.text}
                <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Image Area - Pushed to bottom */}
            <div className="mt-auto relative w-full aspect-4/3 rounded-[20px] overflow-hidden">
                {item.image && (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                )}
            </div>
        </div>
    );
};

const CircularDemo = () => {
    return (
        <section data-theme="light" className="w-full min-h-screen relative flex flex-col items-center pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden font-[family-name:var(--font-figtree)]">
            {/* Header Section */}
            <div className="text-center z-10 space-y-4 sm:space-y-6 mb-8 max-w-5xl mx-auto px-4">
                <h2 className="text-[clamp(2.5rem,10vw,5rem)] lg:text-[10vw] leading-[0.9] font-medium tracking-tight text-[#2D2D2D]">
                    Our Strategic
                    <br />
                    Products
                </h2>

                <p className="text-base sm:text-lg text-neutral-600 max-w-[90%] mx-auto">
                    Innovation driven solutions for modern brands:
                </p>
            </div>

            {/* Desktop Gallery Section (3D) */}
            <div className="hidden lg:block w-full h-[100vh] relative mt-8">
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

            {/* Mobile/Tablet Gallery Section (Vertical List) */}
            <div className="lg:hidden w-full px-4 mt-4 sm:mt-8 flex flex-col gap-4 sm:gap-6 max-w-xl mx-auto z-10 relative">
                {demoItems.slice(0, 3).map((item, index) => (
                    <MobileCard key={index} item={item} />
                ))}
            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-neutral-100 rounded-full blur-3xl" />
            </div>
        </section >
    );
};

export default CircularDemo;
