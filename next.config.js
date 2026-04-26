/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Target modern browsers — eliminates legacy polyfill JS (saves ~10 KiB)
  // Array.at, flatMap, Object.fromEntries are all natively supported
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'mathjs',
      'date-fns',
      'clsx',
      'tailwind-merge'
    ],
    optimizeCss: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Webpack: strip dev-only code in production
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
