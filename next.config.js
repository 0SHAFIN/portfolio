/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel expects production manifests directly inside .next.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  experimental: {}
};

module.exports = nextConfig;
