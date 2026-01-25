import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 select-none bg-primary" >
            {/* Logo */}
            <div className="text-4xl font-bold cursor-pointer text-secondary" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                pikkcom
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
                FIND IN STORES
            </button>
        </nav>
    );
};

export default Navbar;
