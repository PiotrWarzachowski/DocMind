/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol : 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname : '/u/**',
      }
    ]
  }
};

module.exports = nextConfig;
