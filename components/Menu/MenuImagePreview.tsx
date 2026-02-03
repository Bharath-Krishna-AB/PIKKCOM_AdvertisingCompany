"use client";
import React from "react";
import Image from "next/image";
import { MenuItem, SubItem } from "./menuData";

interface MenuImagePreviewProps {
    items: MenuItem[];
    activeImage: string;
}

const MenuImagePreview: React.FC<MenuImagePreviewProps> = ({ items, activeImage }) => {
    // Flatten logic to get all possible images
    const allItems = items.flatMap((i) => (i.subItems ? [i, ...i.subItems] : [i]));

    return (
        <div className="hidden md:flex flex-1 relative h-full w-full bg-secondary/5">
            {allItems.map((item, index) => (
                <div
                    key={`${index}-${item.src}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeImage === item.src ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            ))}
        </div>
    );
};

export default MenuImagePreview;
