import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://calcpro.com.np'),
  title: "CalcPro Nepal | Free Online Calculators",
  description: "75+ free online calculators for finance, health, science, and more. Built for Nepal and the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        {/* Add bottom padding on mobile so content is not hidden behind MobileNav */}
        <div className="pb-0 lg:pb-0">
          {children}
        </div>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}

