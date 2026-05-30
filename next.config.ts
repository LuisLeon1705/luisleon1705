import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const repo = 'LuisLeon1705';

const nextConfig: NextConfig = {
  // 1. Enable Static HTML Export
  output: "export",

  // 2. Set the Base Path for GitHub Pages
  // In production (GitHub), we need the repo name. In development or Vercel, we use the root.
  basePath: (isProd && !isVercel) ? `/${repo}` : '',

  // 3. Disable Image Optimization (GitHub Pages doesn't support the image optimization server)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
