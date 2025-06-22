import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: '/api/:path*', destination: `${process.env.API_BASE_URL}/:path*` }],
    };
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.ts',
      },
    },
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN!],
  },
};

export default nextConfig;
