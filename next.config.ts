import type { NextConfig } from "next";

const nextConfig:NextConfig = {
  reactStrictMode: false,
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}
export default nextConfig;
