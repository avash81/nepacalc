import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com'),
  title: "NEPACALC | Nepal's Precision Mathematical Laboratory",
  description: "Advanced online calculators and mathematical visualization tools engineered for precision. Professional-grade financial, scientific, and engineering solutions.",
  verification: {
    google: "TTNOlEjZe-wjCOkIv-nBIKN2uv_rFFfb9w71xj6B8LM",
  },
  openGraph: {
    title: "NEPACALC | Precision Mathematical Laboratory",
    description: "75+ Professional-grade online calculators engineered for precision. Authorized Nepal edition for specialized utility.",
    url: 'https://nepacalc.com',
    siteName: 'NEPACALC',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NEPACALC | Precision Mathematical Laboratory",
    description: "Advanced mathematical visualization tools and calculators built for technical precision.",
  },
};

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
      </body>
    </html>
  );
}

