/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'static1.millenium.org',
          port: '',
          pathname: '/entity_articles/**',
        },
      ],
    },
  }