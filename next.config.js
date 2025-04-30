/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  // Configure dynamic routes and disable static optimization for pages using Firebase
  output: 'standalone',
  experimental: {
    // Enable app directory features
    appDir: true,
  },
};

module.exports = nextConfig; 