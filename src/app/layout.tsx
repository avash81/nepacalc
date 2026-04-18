import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com'),
  title: "Free Online Calculators for Nepal — Tax, EMI, GPA & More | NEPACALC",
  description: "Nepal's authoritative laboratory for high-precision income tax calculation, EMI planning, GPA tracking, and 75+ professional utility tools. Updated for latest IRD mandates.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    google: "TTNOlEjZe-wjCOkIv-nBIKN2uv_rFFfb9w71xj6B8LM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Free Online Calculators for Nepal | NEPACALC",
    description: "75+ Professional-grade online calculators for Nepal income tax, EMI, GPA, and engineering. Engineered for academic and financial precision.",
    url: 'https://nepacalc.com',
    siteName: 'NEPACALC',
    locale: 'en_NP',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nepacalc.com',
    languages: {
      'en-NP': 'https://nepacalc.com',
      'en-US': 'https://nepacalc.com',
      'x-default': 'https://nepacalc.com',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Online Calculators for Nepal | NEPACALC",
    description: "Nepal's leading utility laboratory for high-precision mathematical tools and financial planning.",
  },
};

import { CookieBanner } from "@/components/layout/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-black focus:uppercase focus:text-[10px] focus:tracking-widest shadow-2xl"
        >
          Skip to content
        </a>
        <Navbar />
        {/* Add bottom padding on mobile so content is not hidden behind MobileNav */}
        <main id="main-content">
          <div className="pb-0 lg:pb-0">
            {children}
          </div>
        </main>
        <Footer />
        <MobileNav />
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}

