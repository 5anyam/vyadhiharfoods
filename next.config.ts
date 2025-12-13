import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {}, // ⬅️ Ye add karo to silence the error
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
};

export default nextConfig;
