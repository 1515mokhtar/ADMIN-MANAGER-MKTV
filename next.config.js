/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 120,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'react-leaflet'],
  },
};

module.exports = nextConfig; 