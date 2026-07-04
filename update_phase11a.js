const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const metaRegex = /export const metadata:\s*Metadata\s*=\s*{[\s\S]*?};/s;

const newMeta = `export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1021',
};

export const metadata: Metadata = {
  title: '3D Graph Calculator – Free Online 3D Plotter, Surface & Function Grapher',
  description: "Plot 3D functions, surfaces, equations and mathematical models using NepaCalc's free 3D Graph Calculator. Visualize spheres, paraboloids, saddle surfaces, Gaussian functions, parametric equations and engineering graphs instantly.",
  applicationName: 'NepaCalc 3D Graph Calculator',
  generator: '', // Removing Next.js generator by overriding it
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '3D Graph Calculator',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://nepacalc.com/engineering/3d/',
    languages: {
      'en': 'https://nepacalc.com/engineering/3d/',
      'en-NP': 'https://nepacalc.com/engineering/3d/',
      'x-default': 'https://nepacalc.com/engineering/3d/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  },
  openGraph: {
    type: 'website',
    title: '3D Graph Calculator – Free Online 3D Plotter',
    description: "Plot 3D functions, surfaces and engineering graphs instantly using NepaCalc's interactive 3D Graph Calculator.",
    url: 'https://nepacalc.com/engineering/3d/',
    siteName: 'NepaCalc',
    locale: 'en_NP',
    images: [
      {
        url: 'https://nepacalc.com/images/3d-graph-calculator-og.webp',
        width: 1200,
        height: 630,
        alt: 'Interactive 3D Graph Calculator by NepaCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Graph Calculator – Free Online 3D Plotter',
    description: 'Visualize mathematical surfaces, engineering models and 3D equations online.',
    images: ['https://nepacalc.com/images/3d-graph-calculator-og.webp'],
  },
};`;

if (!metaRegex.test(content)) {
    console.log("Meta regex not found");
} else {
    content = content.replace(metaRegex, newMeta);
    // Remove duplicate viewport imports if any
    fs.writeFileSync(file, content, 'utf8');
    console.log('Update script finished successfully.');
}
