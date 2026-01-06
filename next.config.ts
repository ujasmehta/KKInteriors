import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizeCss: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images. unsplash.com',
      },
      {
        protocol:  'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    unoptimized: true, // This disables Next.js image optimization
  },
};

export default nextConfig;