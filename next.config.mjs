/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // P3 from 2026-06-05 20:00 + 21:00 dream scans: stale external link
      // points at /we-buy-houses-damaged-house (with -house suffix); the
      // real route is /we-buy-houses-damaged. 301 the suffix variant.
      { source: '/we-buy-houses-damaged-house', destination: '/we-buy-houses-damaged', permanent: true },
    ];
  },
};

export default nextConfig;
