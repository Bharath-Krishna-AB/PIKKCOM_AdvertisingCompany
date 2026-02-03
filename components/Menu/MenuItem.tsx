"use client";
import React from "react";
import Link from "next/link";
import { MenuItem as MenuItemType, SubItem } from "./menuData";

interface MenuItemProps {
    item: MenuItemType;
    onMouseEnter: (item: MenuItemType | SubItem) => void;
    onLinkClick: () => void;
    expandedItem: string | null;
    setExpandedItem: (label: string | null) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onMouseEnter, onLinkClick, expandedItem, setExpandedItem }) => {
    return (
        <div
            className="menu-item-wrapper relative w-full flex flex-col items-center justify-center transition-all duration-300"
            onMouseEnter={() => {
                onMouseEnter(item);
                if (item.subItems) setExpandedItem(item.label);
                else setExpandedItem(null);
            }}
            onMouseLeave={() => {
                // Optional: logic to close submenu on leave or timer
            }}
        >
            {item.href ? (
                <Link
                    href={item.href}
                    className="menu-item-anim block text-6xl md:text-8xl font-anton font-black text-secondary uppercase hover:text-accent text-center transition-colors duration-300"
                    onClick={onLinkClick}
                    onMouseEnter={() => onMouseEnter(item)}
                >
                    {item.label}
                </Link>
            ) : (
                <span
                    className="menu-item-anim block text-6xl md:text-8xl font-anton font-black text-secondary uppercase hover:text-accent text-center transition-colors duration-300 cursor-default"
                    onMouseEnter={() => onMouseEnter(item)}
                >
                    {item.label}
                </span>
            )}

            {/* Submenu Render */}
            {item.subItems && (
                <div
                    className={`flex flex-col gap-2 items-center overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.label ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                        }`}
                >
                    {item.subItems.map((subItem, subIndex) => (
                        <Link
                            key={subIndex}
                            href={subItem.href}
                            className="menu-item-anim block text-3xl md:text-4xl font-anton text-secondary/70 hover:text-accent uppercase transition-colors duration-300"
                            onClick={onLinkClick}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                onMouseEnter(subItem);
                            }}
                        >
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;
