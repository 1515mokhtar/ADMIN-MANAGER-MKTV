/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  // Disable static page generation for pages that use Firebase
  experimental: {
    // This will make all pages dynamic by default
    // Pages that don't use Firebase can still be static by using getStaticProps
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig; 