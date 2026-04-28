/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'export',
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

  // Webpack: aggressive chunking + tree shaking for mobile TBT reduction
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        // Split large chunks to avoid blocking the main thread
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 80000,
          cacheGroups: {
            // Keep lucide-react isolated (heavy icon library)
            icons: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'icons',
              chunks: 'all',
              priority: 30,
            },
            // Math.js is large — isolate it
            math: {
              test: /[\\/]node_modules[\\/](mathjs|fraction\.js|decimal\.js)[\\/]/,
              name: 'math',
              chunks: 'async',
              priority: 25,
            },
            // Common vendor libs
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
