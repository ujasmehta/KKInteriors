import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ["images.unsplash.com", "cdn.sanity.io"],
  },
};

export default nextConfig;
