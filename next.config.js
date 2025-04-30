/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  // Configure for Vercel deployment
  output: 'export',
  distDir: '.next',
  experimental: {
    // Enable app directory features
    appDir: true,
  },
};

module.exports = nextConfig; 