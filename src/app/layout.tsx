import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import dynamic from 'next/dynamic';

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nepacalc.com'),
  title: "Free Online Calculators for Nepal ,  NepaCalc",
  description: "Nepal's trusted free calculator platform for income tax, EMI planning, GPA tracking, unit conversions, and 80+ professional tools. Try NepaCalc now.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
    title: "Free Online Calculators for Nepal NepaCalc",
    description: "Use professional online calculators for Nepal income tax EMI GPA and engineering. Engineered for academic and financial precision. Try NepaCalc now",
    url: 'https://nepacalc.com',
    siteName: 'NepaCalc',
    images: [
      {
        url: '/logo.png?v=final',
        width: 1024,
        height: 1024,
        alt: 'NepaCalc Logo',
      },
    ],
    locale: 'en_NP',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nepacalc.com/',
    languages: {
      'en-NP': 'https://nepacalc.com/',
      'x-default': 'https://nepacalc.com/'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Online Calculators for Nepal NepaCalc",
    description: "Nepals leading utility laboratory for high precision mathematical tools and financial planning. Try NepaCalc now",
    images: ['/logo.png?v=final'],
  },
};

const MobileNav = dynamic(() => import("@/components/layout/MobileNav").then(mod => mod.MobileNav), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/layout/CookieBanner").then(mod => mod.CookieBanner), { ssr: false });
const GoogleAnalytics = dynamic(() => import("@/components/seo/GoogleAnalytics").then(mod => mod.GoogleAnalytics), { ssr: false });

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NepaCalc",
      "alternateName": ["NepaCalc", "NepaCalc.com"],
      "url": "https://nepacalc.com",
      "logo": "https://nepacalc.com/logo.png",
      "image": "https://nepacalc.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/nepacalc",
        "https://twitter.com/nepacalcnp"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com",
      "name": "NepaCalc",
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
      "name": "NepaCalc ,  Professional Mathematical & Engineering Suite",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Explicit Favicon for Google Search Results (managed by metadata export) */}
      </head>
      <body className={`${inter.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#1a73e8] focus:text-[#202124] focus:px-6 focus:py-3 focus:rounded-xl focus:font-black focus:uppercase focus:text-[10px] focus:tracking-widest shadow-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16 min-h-[85vh]">
          <div className="flex flex-col h-full">
            <div className="flex-grow pb-8">
              {children}
            </div>
            <Footer />
          </div>
        </main>
        <MobileNav />
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

