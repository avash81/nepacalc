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

  // Webpack: tree shaking only — no manual splitting (caused 1MB bundle bloat)
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
