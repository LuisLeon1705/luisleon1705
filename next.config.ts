import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const repo = 'LuisLeon1705';

// If we are in production and NOT on Vercel, we assume it's GitHub Pages
const ghBasePath = (isProd && !isVercel) ? `/${repo}` : '';

const nextConfig: NextConfig = {
  // 1. Enable Static HTML Export
  output: "export",

  // 2. Set the Base Path for GitHub Pages
  basePath: ghBasePath,

  // 3. Disable Image Optimization
  images: {
    unoptimized: true,
  },

  // 4. Force the base path to be available in the browser
  env: {
    NEXT_PUBLIC_BASE_PATH: ghBasePath,
  },
};

export default nextConfig;
