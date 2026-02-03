export interface SubItem {
    label: string;
    href: string;
    src: string;
}

export interface MenuItem {
    label: string;
    href: string;
    src: string;
    subItems?: SubItem[];
}

export const menuItems: MenuItem[] = [
    { label: "HOME", href: "/", src: "/images/home-hamburger-final.jpeg" },
    {
        label: "SOLUTIONS",
        href: "",
        src: "/images/solutions-hamburger-v2.jpeg",
        subItems: [
            { label: "INTELLIGENCE", href: "/solutions/intelligence", src: "/images/intelligence.jpeg" },
            { label: "SELECTION", href: "/solutions/selection", src: "/images/selection.jpeg" },
            { label: "MEDIA", href: "/solutions/media", src: "/images/media.jpeg" },
            { label: "OPTIMISATION", href: "/solutions/optimisation", src: "/images/optimization.jpeg" },
        ]
    },
    {
        label: "PRODUCTS",
        href: "",
        src: "/images/products-hamburger-v2.jpeg",
        subItems: [
            { label: "REFLEXN", href: "/products/reflexn", src: "/images/reflexn-hamburger-v2.jpeg" },
            { label: "PIKKCOM VR", href: "/products/pikkcomvr", src: "/images/vr-hamburger-v2.jpeg" },
            { label: "INSIGHTS", href: "/products/insights", src: "/images/insight-hamburger-v2.jpg" },
        ]
    },
    { label: "COMPANY", href: "/company", src: "/images/company-hamburger-v2.jpeg" },
    { label: "CONTACTS", href: "/contact", src: "/images/contact-hamburger-v2.jpeg" },
];
