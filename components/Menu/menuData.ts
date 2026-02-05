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
    { label: "HOME", href: "/", src: "/images/menu/home-hamburger-final.jpeg" },
    {
        label: "SOLUTIONS",
        href: "",
        src: "/images/menu/solutions-hamburger-v2.jpeg",
        subItems: [
            { label: "INTELLIGENCE", href: "/solutions/intelligence", src: "/images/solutions/intelligence.jpeg" },
            { label: "SELECTION", href: "/solutions/selection", src: "/images/solutions/selection.jpeg" },
            { label: "MEDIA", href: "/solutions/media", src: "/images/solutions/media.jpeg" },
            { label: "OPTIMISATION", href: "/solutions/optimisation", src: "/images/solutions/optimization.jpeg" },
        ]
    },
    {
        label: "PRODUCTS",
        href: "",
        src: "/images/menu/products-hamburger-v2.jpeg",
        subItems: [
            { label: "REFLEXN", href: "/products/reflexn", src: "/images/menu/reflexn-hamburger-v2.jpeg" },
            { label: "PIKKCOM VR", href: "/products/pikkcomvr", src: "/images/menu/vr-hamburger-v2.jpeg" },
            { label: "INSIGHTS", href: "/products/insights", src: "/images/menu/insight-hamburger-v2.jpg" },
        ]
    },
    { label: "COMPANY", href: "/company", src: "/images/menu/company-hamburger-v2.jpeg" },
    { label: "CONTACTS", href: "/contact", src: "/images/menu/contact-hamburger-v2.jpeg" },
];
