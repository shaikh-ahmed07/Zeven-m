import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    // Placeholder photography is served from Unsplash. Replace with local
    // images in /public (or your CDN) once real project imagery is available.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
