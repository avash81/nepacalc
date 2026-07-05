/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove dead code in production
    reactRemoveProperties: process.env.NODE_ENV === 'production'
      ? { properties: ['^data-testid$'] }
      : false,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'mathjs',
      'date-fns',
      'clsx',
      'tailwind-merge',
      '@heroicons/react',
    ],
    // optimizeCss requires 'critters' package — disabled until installed
    optimizeCss: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  async redirects() {
    return [
      // ── Canonical Domain Enforcement ─────────────────────────────────────
      // 301: www.nepacalc.com/* → nepacalc.com/*
      // Prevents duplicate content, consolidates link signals, saves crawl budget.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.nepacalc.com',
          },
        ],
        destination: 'https://nepacalc.com/:path*',
        permanent: true,
      },
      // ── Trailing Slash Enforcement ────────────────────────────────────────
      {
        source: '/calculator/nepal-income-tax',
        destination: '/calculator/nepal-income-tax/',
        permanent: true,
      },
      {
        source: '/calculator/nepal-salary',
        destination: '/calculator/nepal-salary/',
        permanent: true,
      },
      {
        source: '/calculator/nepal-vehicle-tax',
        destination: '/calculator/nepal-vehicle-tax/',
        permanent: true,
      },
      {
        source: '/calculator/nea-bill',
        destination: '/calculator/nea-bill/',
        permanent: true,
      },
      {
        source: '/calculator/loan-emi',
        destination: '/calculator/loan-emi/',
        permanent: true,
      },
      {
        source: '/calculator/nepal-land',
        destination: '/calculator/nepal-land/',
        permanent: true,
      },
      {
        source: '/calculator/property-tax',
        destination: '/calculator/property-tax/',
        permanent: true,
      },
      {
        source: '/market-rates/remittance',
        destination: '/market-rates/remittance/',
        permanent: true,
      },
      {
        source: '/market-rates/exchange-rate',
        destination: '/market-rates/exchange-rate-nepal/',
        permanent: true,
      },
      {
        source: '/market-rates/exchange-rate/',
        destination: '/market-rates/exchange-rate-nepal/',
        permanent: true,
      },
      // ── Legacy / Removed Routes ────────────────────────────────────────
      {
        source: '/market/',
        destination: '/market-rates/',
        permanent: true,
      },
      {
        source: '/market',
        destination: '/market-rates/',
        permanent: true,
      },
      {
        source: '/utility/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/utility',
        destination: '/',
        permanent: true,
      },
      {
        source: '/calculators/',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculators',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/finance/',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/finance',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/category/nepal/',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/category/nepal',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/retirement/',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/retirement',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/swp-calculator/',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/swp-calculator',
        destination: '/calculator/',
        permanent: true,
      },
      {
        source: '/calculator/formulas-lab/',
        destination: '/engineering/formulas/',
        permanent: true,
      },
      {
        source: '/calculator/formulas-lab',
        destination: '/engineering/formulas/',
        permanent: true,
      },
    ];
  },
  // Webpack: tree shaking only
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
