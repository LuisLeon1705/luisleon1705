import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const isGH = process.env.GITHUB_ACTIONS === 'true';
const repo = 'LuisLeon1705';

const nextConfig: NextConfig = {
  // 1. Enable Static HTML Export
  output: "export",

  // 2. Set the Base Path for GitHub Pages
  // Priority: GitHub Actions needs the repo name. Vercel and Local use the root.
  basePath: isGH ? `/${repo}` : (isProd && !isVercel ? `/${repo}` : ''),

  // 3. Disable Image Optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
