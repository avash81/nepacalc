import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nepacalc.com'),
  title: "Free Online Calculators for Nepal | NEPACALC",
  description: "Nepal's trusted free calculator platform for income tax, EMI planning, GPA tracking, unit conversions & 80+ professional tools. No registration needed.",
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: "IoM3eC1OeiymFDD1h8N5MWQlfN-5tUmRxpj-e1BFIT8",
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
    canonical: '/',
    languages: {
      'en-NP': 'https://nepacalc.com/',
      'x-default': 'https://nepacalc.com/'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Online Calculators for Nepal | NEPACALC",
    description: "Nepal's leading utility laboratory for high-precision mathematical tools and financial planning.",
  },
};

import dynamic from 'next/dynamic';
const MobileNav = dynamic(() => import("@/components/layout/MobileNav").then(mod => mod.MobileNav), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/layout/CookieBanner").then(mod => mod.CookieBanner), { ssr: false });
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NEPACALC",
      "url": "https://nepacalc.com",
      "logo": "https://nepacalc.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/nepacalc",
        "https://twitter.com/nepacalc"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com",
      "name": "NEPACALC",
      "description": "Free online scientific calculator with real-time graphing, maths solver, and 80+ professional calculators for Nepal.",
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://nepacalc.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/#calculator",
      "name": "NEPACALC — Professional Mathematical & Engineering Suite",
      "url": "https://nepacalc.com",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript, HTML5 Canvas",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" },
      "featureList": [
        "Scientific calculator with Deg/Rad toggle",
        "Interactive 3D Surface Plotter with Orbit Camera",
        "Wireframe Mesh and Solid Rendering Modes",
        "Maths Solver with Algebra, Trigonometry, Calculus tabs",
        "Real-time interactive Canvas graphing engine",
        "80+ specialized professional calculators for Nepal",
        "Institutional IRD-verified tax calculations"
      ],
      "isPartOf": { "@id": "https://nepacalc.com/#website" }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-black focus:uppercase focus:text-[10px] focus:tracking-widest shadow-2xl"
        >
          Skip to content
        </a>
        <Navbar />
        {/* Add bottom padding on mobile so content is not hidden behind MobileNav */}
        <main id="main-content">
          <div className="lg:pb-0">
            {children}
            <Footer />
          </div>
        </main>
        <MobileNav />
        <CookieBanner />
      </body>
    </html>
  );
}

