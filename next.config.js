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

  // Security + performance headers
  // Note: For 'output: export', headers are managed via hosting config (e.g., firebase.json)

  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'mathjs',
      'date-fns',
      'clsx',
      'tailwind-merge'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
