import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fatkat = localFont({
  src: "./fonts/FatKat.otf",
  variable: "--font-fatkat",
});

const proxima = localFont({
  src: "./fonts/ProximaNova-Regular.otf",
  variable: "--font-proxima",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pikkcom.com"), // Update with actual domain
  title: {
    default: "Pikkcom - Turn Demand Into Performance",
    template: "%s | Pikkcom",
  },
  description:
    "Award-winning digital advertising agency maximizing brand value through culture, creativity, and data-driven performance.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pikkcom.com",
    title: "Pikkcom - Turn Demand Into Performance",
    description: "Maximizing brand value through culture, creativity, and data.",
    siteName: "Pikkcom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pikkcom - Turn Demand Into Performance",
    description: "Maximizing brand value through culture, creativity, and data.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fatkat.variable} ${proxima.variable} antialiased`}
      >
        <CustomCursor />
        {/* Global Vertical Lines */}
        <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0">
          {/* Mobile: 1 Line (Center) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-secondary/10 -translate-x-1/2 md:hidden"></div>

          {/* Desktop: 4 Lines (Evenly Distributed) */}
          <div className="hidden md:flex justify-evenly w-full h-full">
            <div className="w-px h-full bg-secondary/10"></div>
            <div className="w-px h-full bg-secondary/10"></div>
            <div className="w-px h-full bg-secondary/10"></div>
            <div className="w-px h-full bg-secondary/10"></div>
          </div>
        </div>
        <div className="relative z-10">
          <Navbar />
          {children}
          <WhatsAppWidget />
        </div>
      </body>
    </html>
  );
}
