import React from "react";

interface GridSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const GridSection: React.FC<GridSectionProps> = ({ children, className = "", id }) => (
    <div id={id} className={`relative border-b border-neutral-200 ${className}`}>
        <div className="relative z-10 w-full">
            {children}
        </div>
    </div>
);

export default GridSection;
