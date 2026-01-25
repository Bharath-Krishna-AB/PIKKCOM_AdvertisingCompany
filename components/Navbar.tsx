import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 select-none bg-primary/70 backdrop-blur-md border-b border-secondary/5" >
            {/* Logo */}
            <div className="text-xl font-fatkat cursor-pointer text-secondary">
                pikkcom<span className="text-accent">.</span>
            </div>

            {/* Menu Icon - Custom Double Line */}
            <button className="flex flex-col gap-2 cursor-pointer p-2 hover:opacity-70 transition-opacity" aria-label="Menu">
                <div className="w-8 h-0.5 bg-secondary"></div>
                <div className="w-8 h-0.5 bg-secondary"></div>
            </button>

            {/* Right Action Button */}
            <button
                className="px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm bg-accent text-primary cursor-pointer"
            >
                LET'S TALK
            </button>
        </nav>
    );
};

export default Navbar;
